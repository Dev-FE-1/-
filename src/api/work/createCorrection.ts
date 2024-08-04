import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

type TWorkingTimes = 'open' | 'middle' | 'close';
type TType = 'cover' | 'special' | 'vacation' | 'early';

// 근무 정정신청
const createCorrection = async (
	workDate: string,
	workingTimes: TWorkingTimes,
	type: TType,
	description: string,
) => {
	try {
		await addDoc(collection(db, 'WorkCorrections'), {
			userId: getUserId(),
			workDate: new Date(workDate),
			requestDate: new Date(),
			workingTimes,
			type,
			approveStatus: 'pending',
			description,
		});

		return true;
	} catch (error) {
		return false;
	}
};

export default createCorrection;
