import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { objectToQueryString } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm(props) {
	const [user, setUser] = useState({
		login: '',
		password: '',
	});
	const navigate = useNavigate()

	const cn = bem('LoginForm');
	const callbacks = {
		onChange: (e) => {
			setUser((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		},
		handleSubmitForm: (e) => {
			e.preventDefault();
			props.onLogin(user);
			if (props.location.state.location === "/" || props.location.state.location === "/user/login") {
				navigate(`/?${objectToQueryString(props.location.state.searchParams)}`)
			} else {
				navigate(props.location.state.location)
			}
		},
	};
	return (
		<div className={cn()}>
			<h2 className={cn('title')}>Вход</h2>
			<form className={cn('form')}>
				<label className={cn('label')} htmlFor="login">
					Логин
				</label>
				<input
					className={cn('input')}
					id="login"
					type="text"
					name="login"
					value={user.name}
					onChange={callbacks.onChange}
				/>
				<label className={cn('label')} htmlFor="password">
					Пароль
				</label>
				<input
					className={cn('input')}
					id="password"
					type="password"
					name="password"
					value={user.password}
					onChange={callbacks.onChange}
				/>
				{props.error ? (
					<p className={cn('error')}>{props.error}</p>
				) : (
					''
				)}
				<button
					className={cn('button')}
					onClick={callbacks.handleSubmitForm}
				>
					Войти
				</button>
			</form>
		</div>
	);
}

export default LoginForm;
