export default {
	/**
	 * Загрузка комментариев
	 * @param id индикатор товара
	 * @return {Function}
	 */

	load: (id) => {
		return async (dispatch, getState, services) => {
			dispatch({ type: 'comments/load-start' });

			try {
				const res = await services.api.request({
					url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
				});

				//Комментарии загружены успешно
				dispatch({
					type: 'comments/load-success',
					payload: { data: res.data.result.items },
				});
			} catch (err) {
				// Ошибка загрузки
				dispatch({ type: 'comments/load-error' });
			}
		};
	},
	addComment: (id, token, comment, commentType) => {
		
		return async (dispatch, getState, services) => {
			dispatch({ type: 'comment/addComment-start' });
			try {
				const res = await services.api.request({
					url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Token': token,
					},
					body: JSON.stringify({
						text: comment,
						parent: {
							_id: id,
							_type: commentType,
						},
					}),
				});
				console.log(res.data.result);
				// Комментарий опубликован успешно
				dispatch({
					type: 'comment/addComment-success',
					payload: { data: res.data.result },
					
				});
			} catch (err) {
				dispatch('comment/addComment-error');
			}
		};
	},
};
