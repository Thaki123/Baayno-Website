import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export default function LanguageModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (!stored) {
      setOpen(true);
    }
  }, []);

  const select = (locale: string) => {
    localStorage.setItem('locale', locale);
    setOpen(false);
    router.push(router.asPath, undefined, { locale });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="language-modal"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="modal-content"
          >
            <p>{t('selectLanguage')}</p>
            <div className="buttons">
              <button onClick={() => select('en')}>English</button>
              <button onClick={() => select('ar')}>العربية</button>
              <button onClick={() => select('fr')}>Français</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
