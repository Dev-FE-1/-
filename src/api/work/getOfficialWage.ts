import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 공식 스케줄에 따른 특정 달의 급여 내역 및 예상 급여액 조회
const getOfficialWage = async (year: number, month: number) => {
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
	const officialWageArray = docData.map((obj) => {
		const date = new Date(obj.date.seconds * 1000);
		const newObj = {
			date: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
			workingTimes: obj.workingTimes,
		};
		return newObj;
	});

	return {
		officialWage: officialWageArray,
		totalWorkHour: officialWageArray.length * 5,
		totalWage: officialWageArray.length * 45135,
	};
};

export default getOfficialWage;
