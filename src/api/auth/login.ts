import { auth } from '@/firebaseConfig';
import {
	browserSessionPersistence,
	setPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';

// 로그인 API
const login = async (id: string, pw: string) => {
	try {
		await setPersistence(auth, browserSessionPersistence);
		await signInWithEmailAndPassword(auth, id + '@woochee.com', pw);

		return true;
	} catch (error) {
		return false;
	}
};

export default login;
