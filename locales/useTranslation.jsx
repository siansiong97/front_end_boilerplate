import localStorage from 'local-storage'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { allTranslationJson } from './index'


export const useTranslation = () => {
    const { locales = [], defaultLocale, pathname, asPath, ...nextRouter } = useRouter()
    const locale = locales.includes(nextRouter.locale || '')
        ? nextRouter.locale
        : defaultLocale

    return {
        t: (term) => {
            const translation = get(allTranslationJson, `[${locale}][${term}]`)

            return Boolean(translation) ? translation : term
        },
        languages: locales,
        changeLanguage: (lang) => {
            lang = locales.includes(lang || '')
                ? lang
                : defaultLocale

            localStorage.set('locale', lang)
            nextRouter.push(pathname, asPath, { locale: lang })
        },
        defaultLanguage: defaultLocale
    }
}