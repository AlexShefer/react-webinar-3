import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { objectToQueryString } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm(props) {
	const [user, setUser] = useState({
		login: '',
		password: '',
	});
	const [error, setError] = useState()
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
		},
		onRedirect: () => {
			if (!props.error && props.isLogged) {
				if (props.location.state && props.location.state.location) {
					if (
						props.location.state.location === '/user/login' ||
						props.location.state.location === '/'
					) {
						return (
							<Navigate
								to={`/?${objectToQueryString(
									props.location.state.searchParams
								)}`}
							/>
						);
					} else {
						return <Navigate to={props.location.state.location} />;
					}
				} else {
					return <Navigate to={'/'} />;
				}
			} else {
				return null;
			}
		},
	};
	const option = {
		redirectionMessage: props.location.state?.message
			? props.location.state.message
			: '',
	};
	return (
		<>
			{callbacks.onRedirect()}
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
					) : option.redirectionMessage ? (
						<p className={cn('error')}>
							{option.redirectionMessage}
						</p>
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
		</>
	);
}

export default LoginForm;
