import styled from '@emotion/styled';
import logo from '@/assets/logo.svg';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button/Button';
import login from '@/api/auth/login';
import { messages } from '@/constants/messages';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const [isLoginError, setIsLoginError] = useState<boolean>(false);
	const navigate = useNavigate();

	const inputHandler =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setter(e.target.value);
		};

	const loginBtnHandler = async () => {
		const isLoginSuccess = await login(id, pw);

		if (isLoginSuccess) {
			navigate('/');
		} else {
			// 로그인 실패 시, 기존 입력한 로그인 데이터 초기화
			setIsLoginError(true);
			setId('');
			setPw('');
		}
	};

	return (
		<Container>
			<Logo src={logo} alt="logo" />
			<Input value={id} onChange={inputHandler(setId)} placeholder="아이디" />
			<Input
				type="password"
				value={pw}
				onChange={inputHandler(setPw)}
				placeholder="비밀번호"
			/>
			{isLoginError && <ErrorMassage>{messages.loginErrorMessage}</ErrorMassage>}
			<Button label="로그인" onClick={loginBtnHandler} />
			<InfoMassage>
				{messages.loginInfoMessage}
				<br />
				{messages.loginInfoEmail}
			</InfoMassage>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px;
	gap: 10px;

	& > Button {
		margin: 20px 0;
	}
`;

const Logo = styled.img`
	height: 36px;
	margin: 150px 0 50px 0;
`;

const ErrorMassage = styled.span`
	margin-left: 5px;
	color: ${colors.red};
	font-weight: bold;
`;

const InfoMassage = styled.span`
	color: ${colors.gray};
`;

export default Login;
