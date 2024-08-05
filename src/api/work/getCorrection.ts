import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 근무 정정신청 내역 조회 API
const getCorrection = async () => {
	const q = query(collection(db, 'WorkCorrections'), where('userId', '==', getUserId()));
	const querySnapshot = await getDocs(q);
	const docData = querySnapshot.docs.map((doc) => doc.data());
	const workCorrections = docData.map((obj) => {
		const workDate = new Date(obj.workDate.seconds * 1000);
		const reqDate = new Date(obj.requestDate.seconds * 1000);
		const newObj = {
			workDate: `${workDate.getUTCFullYear()}-${workDate.getUTCMonth() + 1}-${workDate.getUTCDate()}`,
			reqDate: `${reqDate.getUTCFullYear()}-${reqDate.getUTCMonth() + 1}-${reqDate.getUTCDate()}`,
			workingTimes: obj.workingTimes,
			type: obj.type,
			approveStatus: obj.approveStatus,
			description: obj.description,
		};
		return newObj;
	});

	return { workCorrections };
};

export default getCorrection;
