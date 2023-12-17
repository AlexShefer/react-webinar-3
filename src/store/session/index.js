import StoreModule from '../module';

class SessionState extends StoreModule {
	/**
	 * Начальное состояние
	 */
	initState() {
		return {
			isLogged: false,
			token: '',
			username: '',
			error: '',
			waiting: true,
		};
	}

	async logout() {
		this.setState(
			{ ...this.getState(), waiting: true, error: '' },
			'Выполняется выход ...'
		);
		const token = this.getState().token;
		// Удаляем токен из хранилища
		localStorage.removeItem('token');

		if (token) {
			await fetch('/api/v1/users/sign', {
				method: 'DELETE',
				headers: {
					'X-Token': token,
					'Content-Type': 'application/json',
				},
			});
		}
		this.setState(
			{ ...this.initState() },
			'Выход выполнен данные профиля сброшены'
		);
	}

	async tokenValidation() {
		this.setState(
			{ ...this.getState(), waiting: true, error: '' },
			'Проверка данных авторизации'
		);
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const response = await fetch(
					'/api/v1/users/self?fields=email,profile(name,phone)',
					{
						method: 'GET',
						headers: {
							'X-Token': token,
							'Content-Type': 'application/json',
						},
					}
				);
				const json = await response.json();
				if (response.ok) {
					this.setState(
						{
							...this.getState(),
							token: token,
							isLogged: true,
							username: json.result.profile.name,
							waiting: false,
						},
						'Пользователь верифицирован, данные загружены'
					);
				} else {
					this.setState(
						{
							...this.getState(),
							user: '',
							token: '',
							isLogged: false,
						},
						'Удаляем токен не прошедший валидацию удаляем данные профиля'
					);
					// Удаляем токен не прошедший валидацию
					localStorage.removeItem('token');
				}
			} catch (err) {
				this.setState({ ...this.initState(), error: 'Ошибка Сервера' });
			}
		} else {
			this.setState(
				{ ...this.getState(), waiting: false },
				'Проверка данных завершена'
			);
		}
	}

	async login(body) {
		try {
			const response = await fetch('/api/v1/users/sign', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			const json = await response.json();
			if (response.ok) {
				this.setState(
					{
						...this.getState(),
						token: json.result.token,
						username: json.result.user.profile.name,
						waiting: false,
						error: '',
					},
					'Данные пользователя загружены'
				);
				localStorage.setItem('token', json.result.token);
			} else {
				console.log(json);
				this.setState({
					...this.getState(),
					error: json.error.data.issues[0].message,
					waiting: false,
				});
			}
		} catch (err) {
			this.setState({
				...this.getState(),
				error: 'Server Error',
				waiting: false,
			});
		}
	}
}

export default SessionState;
