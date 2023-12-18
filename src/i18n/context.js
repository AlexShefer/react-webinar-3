import {createContext, useMemo, useState, useEffect} from "react";
import translate from "./translate";

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({children}) {

  const initialLang = localStorage.getItem("lang") || "ru";
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang,
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => translate(lang, text, number)
  }), [lang]);

  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}
