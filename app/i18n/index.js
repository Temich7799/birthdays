import {
    createInstance
} from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import {
    initReactI18next
} from 'react-i18next/initReactI18next'
import {
    getOptions
} from './settings'

const initI18next = async (language, ns) => {

    const i18nInstance = createInstance()

    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language, namespace) => {
            return import(`../../src/lib/json/locales/${language}/${namespace}.json`)
        }))
        .init(getOptions(language, ns))
    return i18nInstance
}

export async function useTranslation(language, ns, options = {}) {

    const i18nextInstance = await initI18next(language, ns)

    return {
        t: i18nextInstance.getFixedT(language, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
        i18n: i18nextInstance
    }
}