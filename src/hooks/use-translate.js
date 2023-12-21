import { useCallback, useState, useEffect, useLayoutEffect } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
	const { i18n } = useServices();
	const [lang, setLang] = useState(i18n.lang);
  
  useLayoutEffect(()=> {
		i18n.setLang(lang)
  }, [lang])
	const t = (text, number) => i18n.translate(lang, text, number);

	return { lang, setLang, t };
}
