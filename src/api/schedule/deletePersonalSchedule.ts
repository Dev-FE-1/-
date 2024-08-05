import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

type TWorkingTimes = 'open' | 'middle' | 'close';

// 개인 근무 일정 삭제 API
const deletePersonalSchedule = async (workDate: string, workingTimes: TWorkingTimes) => {
	try {
		const userId = getUserId();
		const workDateObj = new Date(workDate);

		const q = query(
			collection(db, 'PersonalSchedules'),
			where('userId', '==', userId),
			where('date', '==', workDateObj),
		);

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async (doc) => {
			const data = doc.data();
			const workingTimesArray = data.workingTimes || [];
			const memosArray = data.memos || [];

			const index = workingTimesArray.indexOf(workingTimes);
			if (index > -1) {
				workingTimesArray.splice(index, 1);
				memosArray.splice(index, 1);

				// 해당 데이터에 아무 값도 없을 경우 데이터 자체를 삭제
				if (workingTimesArray.length === 0 && memosArray.length === 0) {
					await deleteDoc(doc.ref);
				} else {
					// 만약 남아있는 값이 있다면 해당 값은 유지하도록 업데이트
					await updateDoc(doc.ref, {
						workingTimes: workingTimesArray,
						memos: memosArray,
					});
				}
			}
		});

		return true;
	} catch (error) {
		return false;
	}
};

export default deletePersonalSchedule;
