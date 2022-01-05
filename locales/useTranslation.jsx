import { get } from 'lodash'
import { useRouter } from 'next/router'
import { allTranslationJson } from './index'


export const useTranslation = () => {
    const { locales = [], defaultLocale, ...nextRouter } = useRouter()
    const locale = locales.includes(nextRouter.locale || '')
        ? nextRouter.locale
        : defaultLocale

    return {
        t: (term) => {
            const translation = get(allTranslationJson, `[${locale}][${term}]`)

            return Boolean(translation) ? translation : term
        }
    }
}