import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 특정 달의 개인 근무 일정 조회 API
const getPersonalSchedule = async (year: number, month: number) => {
	const startOfMonth = new Date(year, month - 1, 1);
	const endOfMonth = new Date(year, month, 0, 23, 59, 59);

	const q = query(
		collection(db, 'PersonalSchedules'),
		where('userId', '==', getUserId()),
		where('date', '>=', startOfMonth),
		where('date', '<=', endOfMonth),
	);
	const querySnapshot = await getDocs(q);
	const docData = querySnapshot.docs.map((doc) => doc.data());
	const personalScheduleArray = docData.map((obj) => {
		const date = new Date(obj.date.seconds * 1000);
		const newObj = {
			date: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
			workingTimes: obj.workingTimes,
			memos: obj.memos,
		};
		return newObj;
	});

	return { personalScheduleData: personalScheduleArray };
};

export default getPersonalSchedule;
