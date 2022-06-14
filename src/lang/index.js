import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from 'react-i18next';
import uzbek from './uz.js'
import russian from './ru.js'

i18n.use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "ru",
        fallbackLng: "ru",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        resources: {
            uz: {
                translation: uzbek
            },
            ru: {
                translation: russian
            }
        },
        react: {
            useSuspense: false,
            wait: true
        }
    })
export default i18n;