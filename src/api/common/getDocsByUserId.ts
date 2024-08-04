import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

type TDocName = 'User' | 'OfficialSchedules' | 'PersonalSchedules' | 'WorkCorrections';

// Firestore DB에서 UID 값에 해당하는 데이터를 조회하는 로직
const getDocsByUserId = async (docName: TDocName, userId: string) => {
	const q = query(collection(db, docName), where('userId', '==', userId));
	const querySnapshot = await getDocs(q);
	const data = querySnapshot.docs.map((doc) => doc.data());

	return data;
};

export default getDocsByUserId;
