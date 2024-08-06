import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import getUserId from '@/api/common/getUserId';

// 회원 정보 조회 API
const getUserInfo = async (): Promise<{
	name: string;
	workPlace: string;
	workingSets: { times: []; weeks: [] };
}> => {
	const q = query(collection(db, 'User'), where('userId', '==', getUserId()));
	const querySnapshot = await getDocs(q);
	const docData = querySnapshot.docs.map((doc) => doc.data());
	const userInfoData = docData.map((obj) => {
		const newObj = {
			name: obj.name,
			workPlace: obj.workPlace,
			workingSets: obj.workingSets,
		};
		return newObj;
	});

	return userInfoData[0];
};

export default getUserInfo;
