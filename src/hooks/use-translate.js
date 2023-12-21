import { useCallback, useState, useEffect } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
	const { i18n } = useServices();
	const [lang, setLang] = useState();

	const t = (text, number) => i18n.translate(lang, text, number);

	return { lang, setLang, t };
}
