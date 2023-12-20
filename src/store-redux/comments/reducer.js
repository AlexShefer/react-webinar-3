export const initialState = {
	data: [],
	waiting: false, // ожидание загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
	switch (action.type) {
		case 'comments/load-start':
			return { ...state, data: [], waiting: true };
		case 'comments/load-success':
			return { ...state, data: action.payload.data, waiting: false };
		case 'comments/load-error':
			return { ...state, data: [], waiting: false }; // Добавить ошибку загрузки
		case 'comment/addComment-start':
			return { ...state, data: [...state.data], waiting: true };
		case 'comment/addComment-success':
			return { ...state, data: [...state.data, action.payload.data], waiting: false };
		case 'comment/addComment-error':
			return { ...state, data: [...state.data], waiting: false };
		default:
			// нет изменений
			return state;
	}
}

export default reducer