// ----------------------------------------------------------------------

export const fallbackLng = 'en';
export const languages = ['en', 'nl'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export type LanguageValue = (typeof languages)[number];

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  nl: {
    success: 'De taal is gewijzigd!',
    error: 'Fout bij het wijzigen van de taal!',
    loading: 'Bezig met laden...',
  },
  fr: {
    success: 'La langue a été changée!',
    error: 'Erreur lors du changement de langue!',
    loading: 'Chargement...',
  },
  zh: {
    success: '语言已更改！',
    error: '更改语言时出错！',
    loading: '加载中...',
  },
};
