import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 개인 스케줄에 따른 특정 달의 예상 급여액 조회 API
const getPersonalWage = async (year: number, month: number) => {
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

	// 특정 달의 개인 근무 시간과 그에 따른 예상 급여액
	const totalWorkHour = docData.reduce((acc, curr) => acc + curr.workingTimes.length, 0) * 5;
	const totalWage = (totalWorkHour * 45135) / 5;

	return {
		totalWorkHour,
		totalWage,
	};
};

export default getPersonalWage;
