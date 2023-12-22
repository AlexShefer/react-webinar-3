import { useCallback, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
	const { i18n } = useServices();
	const [lang, setLang] = useState(i18n.getState());

  const changeLang = useCallback(i18n.setLang.bind(i18n), [i18n]);
  
  const unsubscribe = useMemo((newLang) => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe((newLang) => {
      setLang(prevState => newLang);
    });
  }, [lang]); // Нет зависимостей - исполнится один раз

	// Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

	const t = (text, number) => i18n.translate(lang, text, number);

	return { lang, changeLang, t };
}
