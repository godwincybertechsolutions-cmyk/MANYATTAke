import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Currency = 'KES' | 'USD' | 'EUR' | 'GBP';
export type Language = 'English' | 'Swahili' | 'French' | 'German';

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
    if (storedLanguage && ['English', 'Swahili', 'French', 'German'].includes(storedLanguage)) setLanguage(storedLanguage);
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
      const numericAmount = Number(String(amount).replace(/[^0-9.-]/g, '')) || 0;
      const source = sourceCurrency.toUpperCase() as Currency;
      const inKes = source === 'KES' ? numericAmount : numericAmount / currencyRates[source] || numericAmount;
      return new Intl.NumberFormat(currencyLocales[currency], {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'KES' ? 0 : 2,
      }).format(inKes * currencyRates[currency]);
    },
  }), [currency, language]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider');
  return context;
};
