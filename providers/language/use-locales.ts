'use client';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './locales-config';

import type { LanguageValue } from './locales-config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const router = useRouter();

  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.language);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue , skip_toast?:boolean) => {
      try {
        const langChangePromise = i18n.changeLanguage(newLang);

        const currentMessages = messages[newLang] || messages.en;

        if( !skip_toast ){

          toast.promise(langChangePromise, {
            loading: currentMessages.loading,
            success: () => currentMessages.success,
            error: currentMessages.error,
          });
          
        }

        await langChangePromise;

        if (currentLang) {
          dayjs.locale(currentLang.adapterLocale);
        }

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [currentLang, i18n, router]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
