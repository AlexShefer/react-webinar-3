export function formatDate(str, lang) {
	if (str) {
		const date = new Date(str);
		return new Intl.DateTimeFormat(lang, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		}).format(date);
	}
}
