import 'server-only'

const dictionaries = {
  en_US: () => import('./en_US.json').then((module) => module.default),
  zh: () => import('./zh.json').then((module) => module.default)
}

export const getDictionary = async (locale) => dictionaries[locale]()
