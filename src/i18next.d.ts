import 'i18next'

type DefaultResources = typeof import('../public/locales/zh_CN/translation.json')

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: DefaultResources
    }
  }
}
