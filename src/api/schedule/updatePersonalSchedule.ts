import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

type TWorkingTimes = 'open' | 'middle' | 'close';

// 개인 근무 일정 수정 API
const updatePersonalSchedule = async (
	workDate: string,
	oldWorkingTimes: TWorkingTimes,
	newWorkingTimes: TWorkingTimes,
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
		const docRef = querySnapshot.docs[0].ref;
		const scheduleData = querySnapshot.docs[0].data();
		const workingTimesIndex = scheduleData.workingTimes.indexOf(oldWorkingTimes);
		const updatedWorkingTimes = [...scheduleData.workingTimes];
		const updatedMemos = [...scheduleData.memos];

		updatedWorkingTimes[workingTimesIndex] = newWorkingTimes;
		updatedMemos[workingTimesIndex] = memos;

		await updateDoc(docRef, {
			workingTimes: updatedWorkingTimes,
			memos: updatedMemos,
		});

		return true;
	} catch (error) {
		return false;
	}
};

export default updatePersonalSchedule;
