import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';

interface IUserProfileProps {
	name: string;
	workPlace: string;
	workTime: string;
}

const UserProfile = ({ name, workPlace, workTime }: IUserProfileProps) => {
	return (
		<ProfileContainer>
			<Header>
				<Avatar />
				<UserInfo>
					<UserName>{name}</UserName>
					<UserWorkPlace>{workPlace} 근무</UserWorkPlace>
				</UserInfo>
			</Header>
			<Schedule>
				<ScheduleTitle>근무스케줄</ScheduleTitle>
				<ScheduleDetails>{workTime}</ScheduleDetails>
			</Schedule>
		</ProfileContainer>
	);
};

// 스타일 정의
const ProfileContainer = styled.div`
	padding: 20px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Avatar = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #f2f3f6;
	margin-right: 20px;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserName = styled.div`
	font-size: ${fontSize.xxxxl};
	font-weight: ${fontWeight.bold};
`;

const UserWorkPlace = styled.div`
	padding: 5px 10px;
	border-radius: 5px;
	margin-top: 5px;
	background-color: ${colors.primaryYellow};
	color: white;
`;

const Schedule = styled.div`
	background-color: ${colors.lightestGray};
	padding: 20px;
	border-radius: 5px;
	margin-bottom: 20px;
`;

const ScheduleTitle = styled.div`
	font-size: ${fontSize.lg};
	font-weight: ${fontWeight.medium};
	color: ${colors.gray};
	margin-bottom: 5px;
`;

const ScheduleDetails = styled.div`
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.bold};
`;

export default UserProfile;
