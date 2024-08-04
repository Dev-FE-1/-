import ProfileMenu from '@/components/Profile/ProfileMenu';
import UserProfile from '@/components/Profile/UserProfile';

const Profile = () => {
	return (
		<>
			<UserProfile
				workPlace="강남점"
				name="손성오"
				workTime="월(오픈) , 수(미들), 금(마감)"
			/>
			<ProfileMenu />
		</>
	);
};

export default Profile;
