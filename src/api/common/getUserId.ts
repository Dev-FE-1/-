// 현재 로그인한 사용자의 UID를 반환하는 로직
const getUserId = (): string => {
	const sessionKey = `firebase:authUser:${import.meta.env.VITE_FIREBASE_API_KEY as string}:[DEFAULT]`;
	const userSession = sessionStorage.getItem(sessionKey);

	if (userSession) {
		const userId = JSON.parse(userSession);
		return userId['uid'];
	} else {
		return '';
	}
};

export default getUserId;
