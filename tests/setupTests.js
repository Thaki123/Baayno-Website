import '@testing-library/jest-dom';
import en from '../public/locales/en.json';

jest.mock('next-translate/useTranslation', () => {
  return () => ({
    t: (key) => key.split('.').reduce((obj, part) => (obj && obj[part] ? obj[part] : key), en),
    lang: 'en',
  });
});
