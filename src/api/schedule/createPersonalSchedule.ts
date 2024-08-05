import { db } from '@/firebaseConfig';
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

type TWorkingTimes = 'open' | 'middle' | 'close';

// 개인 근무 일정 생성 API
const createPersonalSchedule = async (
	workDate: string,
	workingTimes: TWorkingTimes,
	memos: string,
) => {
	try {
		const userId = getUserId();
		const workDateObj = new Date(workDate);

		const q = query(
			collection(db, 'PersonalSchedules'),
			where('userId', '==', userId),
			where('date', '==', workDateObj),
		);

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			// 데이터가 이미 존재할 경우 업데이트
			const docRef = querySnapshot.docs[0].ref;
			await updateDoc(docRef, {
				workingTimes: arrayUnion(workingTimes),
				memos: arrayUnion(memos),
			});
		} else {
			// 데이터가 존재하지 않으면 새로 생성
			await addDoc(collection(db, 'PersonalSchedules'), {
				userId,
				date: workDateObj,
				workingTimes: [workingTimes],
				memos: [memos],
			});
		}

		return true;
	} catch (error) {
		return false;
	}
};

export default createPersonalSchedule;
