export function formatDate(str) {
	if (str) {
		const date = new Date(str);
		return new Intl.DateTimeFormat('ru', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date);
	}
}
