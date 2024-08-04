// 토큰 유효성 검증 API
const checkAuth = (): boolean => {
	const sessionKey = `firebase:authUser:${import.meta.env.VITE_FIREBASE_API_KEY as string}:[DEFAULT]`;
	const isLogin = sessionStorage.getItem(sessionKey);

	return !!isLogin;
};

export default checkAuth;
