import StoreModule from '../module';

class ProfileState extends StoreModule {
	/**
	 * Начальное состояние
	 */
	initState() {
		return {
			token: '',
			phone: '',
			email: '',
			username: '',
			error: '',
			waiting: false,
		};
	}

	async getProfile(token) {
		this.setState(
			{ ...this.getState(), waiting: true, error: '' },
			'Проверка данных авторизации'
		);
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
							username: json.result.profile.name,
							phone: json.result.profile.phone,
							email: json.result.email,
							waiting: false
						},
						'Пользователь верифицирован, данные загружены'
					);
				} else {
					this.setState(
						{
							...this.initState(),
							user: '',
							token: '',
							error: 'Введены не правильные данные'
						},
						'Удаляем токен не прошедший валидацию удаляем данные профиля'
					);
					
				}
			} catch (err) {
				this.setState({ ...this.initState, error: 'Ошибка Сервера' });
			}
		} else {
			this.setState(
				{ ...this.getState(), waiting: false },
				'Проверка данных завершена'
			);
		}
	}

}

export default ProfileState;
