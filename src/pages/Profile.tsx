import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, clearUserInfo } from '@/stores/userInfoSlice';
import { AppDispatch, RootState } from '@/stores/store';
import { useEffect } from 'react';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import UserProfile from '@/components/Profile/UserProfile';

const Profile = () => {
	const dispatch: AppDispatch = useDispatch();
	const { name, workPlace, workingSets, loading, error } = useSelector(
		(state: RootState) => state.userInfo,
	);

	useEffect(() => {
		dispatch(fetchUserInfo());

		return () => {
			dispatch(clearUserInfo());
		};
	}, [dispatch]);

	return (
		<>
			{error ? (
				<div>{error}</div>
			) : (
				<>
					<UserProfile
						workPlace={workPlace || '근무지 없음'}
						name={name || '미정'}
						workTime={workingSets || { times: [], weeks: [] }}
					/>
					<ProfileMenu />
				</>
			)}
		</>
	);
};

export default Profile;
