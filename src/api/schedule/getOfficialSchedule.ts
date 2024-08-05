import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 특정 달의 공식 근무 일정 조회 API
const getOfficialSchedule = async (year: number, month: number) => {
	const startOfMonth = new Date(year, month - 1, 1);
	const endOfMonth = new Date(year, month, 0, 23, 59, 59);

	const q = query(
		collection(db, 'OfficialSchedules'),
		where('userId', '==', getUserId()),
		where('date', '>=', startOfMonth),
		where('date', '<=', endOfMonth),
	);
	const querySnapshot = await getDocs(q);
	const docData = querySnapshot.docs.map((doc) => doc.data());
	const officialScheduleArray = docData.map((obj) => {
		const date = new Date(obj.date.seconds * 1000);
		const newObj = {
			date: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
			workingTimes: obj.workingTimes,
			isSub: obj.isSub,
		};
		return newObj;
	});

	return { officialScheduleData: officialScheduleArray };
};

export default getOfficialSchedule;
