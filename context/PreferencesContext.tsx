import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Currency = 'KES' | 'USD' | 'EUR' | 'GBP';
export type Language = string;

/** Google Translate languages commonly available in the website widget. */
export const GOOGLE_TRANSLATE_LANGUAGES: Array<{ label: string; code: string }> = [
  { label: 'English', code: 'en' }, { label: 'Afrikaans', code: 'af' }, { label: 'Albanian', code: 'sq' },
  { label: 'Arabic', code: 'ar' }, { label: 'Amharic', code: 'am' }, { label: 'Armenian', code: 'hy' },
  { label: 'Azerbaijani', code: 'az' }, { label: 'Basque', code: 'eu' }, { label: 'Belarusian', code: 'be' },
  { label: 'Bengali', code: 'bn' }, { label: 'Bulgarian', code: 'bg' }, { label: 'Catalan', code: 'ca' },
  { label: 'Chinese (Simplified)', code: 'zh-CN' }, { label: 'Chinese (Traditional)', code: 'zh-TW' },
  { label: 'Croatian', code: 'hr' }, { label: 'Czech', code: 'cs' }, { label: 'Danish', code: 'da' },
  { label: 'Dutch', code: 'nl' }, { label: 'Estonian', code: 'et' }, { label: 'Filipino', code: 'tl' },
  { label: 'Finnish', code: 'fi' }, { label: 'French', code: 'fr' }, { label: 'Galician', code: 'gl' },
  { label: 'Georgian', code: 'ka' }, { label: 'German', code: 'de' }, { label: 'Greek', code: 'el' },
  { label: 'Gujarati', code: 'gu' }, { label: 'Hebrew', code: 'iw' }, { label: 'Hindi', code: 'hi' },
  { label: 'Hungarian', code: 'hu' }, { label: 'Icelandic', code: 'is' }, { label: 'Indonesian', code: 'id' },
  { label: 'Irish', code: 'ga' }, { label: 'Italian', code: 'it' }, { label: 'Japanese', code: 'ja' },
  { label: 'Kannada', code: 'kn' }, { label: 'Korean', code: 'ko' }, { label: 'Latvian', code: 'lv' },
  { label: 'Lithuanian', code: 'lt' }, { label: 'Malay', code: 'ms' }, { label: 'Malayalam', code: 'ml' },
  { label: 'Marathi', code: 'mr' }, { label: 'Norwegian', code: 'no' }, { label: 'Persian', code: 'fa' },
  { label: 'Polish', code: 'pl' }, { label: 'Portuguese', code: 'pt' }, { label: 'Punjabi', code: 'pa' },
  { label: 'Romanian', code: 'ro' }, { label: 'Russian', code: 'ru' }, { label: 'Serbian', code: 'sr' },
  { label: 'Slovak', code: 'sk' }, { label: 'Slovenian', code: 'sl' }, { label: 'Spanish', code: 'es' },
  { label: 'Swahili', code: 'sw' }, { label: 'Swedish', code: 'sv' }, { label: 'Tamil', code: 'ta' },
  { label: 'Telugu', code: 'te' }, { label: 'Thai', code: 'th' }, { label: 'Turkish', code: 'tr' },
  { label: 'Ukrainian', code: 'uk' }, { label: 'Urdu', code: 'ur' }, { label: 'Vietnamese', code: 'vi' },
  { label: 'Welsh', code: 'cy' }, { label: 'Yiddish', code: 'yi' },
];

const currencyRates: Record<Currency, number> = {
  KES: 1,
  USD: 1 / 129,
  EUR: 1 / 140,
  GBP: 1 / 164,
};

const currencyLocales: Record<Currency, string> = {
  KES: 'en-KE',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
};

interface PreferencesContextValue {
  currency: Currency;
  language: Language;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  formatPrice: (amount: number | string, sourceCurrency?: string) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('KES');
  const [language, setLanguage] = useState<Language>('English');

  useEffect(() => {
    const storedCurrency = window.sessionStorage.getItem('manyatta-currency') as Currency | null;
    const storedLanguage = window.sessionStorage.getItem('manyatta-language') as Language | null;
    if (storedCurrency && storedCurrency in currencyRates) setCurrency(storedCurrency);
    if (storedLanguage && GOOGLE_TRANSLATE_LANGUAGES.some((option) => option.label === storedLanguage)) setLanguage(storedLanguage);
  }, []);

  const value = useMemo(() => ({
    currency,
    language,
    setCurrency: (next: Currency) => {
      setCurrency(next);
      window.sessionStorage.setItem('manyatta-currency', next);
    },
    setLanguage: (next: Language) => {
      setLanguage(next);
      window.sessionStorage.setItem('manyatta-language', next);
    },
    formatPrice: (amount: number | string, sourceCurrency = 'KES') => {
      if (!amount) return '';
      const strAmount = String(amount);
      const matches = strAmount.match(/[\d.,]+/);
      
      if (!matches) {
        return strAmount; // Return as is (e.g. "Price on request")
      }
      
      const numericAmount = Number(matches[0].replace(/,/g, '')) || 0;
      const source = sourceCurrency.toUpperCase() as Currency;
      const inKes = source === 'KES' ? numericAmount : numericAmount / currencyRates[source] || numericAmount;
      
      const formatted = new Intl.NumberFormat(currencyLocales[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'KES' ? 0 : 2,
      }).format(inKes * currencyRates[currency]);
      
      // If the original string had text around the number, we might want to keep it, but for now just returning formatted is fine
      return formatted;
    },
  }), [currency, language]);

  // Google Translate Integration
  useEffect(() => {
    const applyTranslation = () => {
      const targetLang = GOOGLE_TRANSLATE_LANGUAGES.find((option) => option.label === language)?.code ?? 'en';
      const googtransCookie = `/en/${targetLang}`;

      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      
      if (selectElement) {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event('change'));
      } else {
        // Fallback or before initialized
        if (targetLang === 'en') {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        } else {
            document.cookie = `googtrans=${googtransCookie}; path=/;`;
            document.cookie = `googtrans=${googtransCookie}; path=/; domain=${window.location.hostname};`;
        }
      }
    };
    
    // Slight delay to ensure widget is loaded if it was just mounted
    setTimeout(applyTranslation, 300);
  }, [language]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider');
  return context;
};
