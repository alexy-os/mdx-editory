import { useLanguage } from '../i18n';
import { cn } from '../utils';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { setLanguage, currentLang } = useLanguage();
  
  const handleToggle = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
  };
  
  return (
    <button
      onClick={handleToggle}
      className={cn(
        'px-3 py-1 text-sm rounded transition-colors',
        'bg-muted',
        'text-secondary-foreground hover:text-white',
        'hover:bg-accent',
        'border border-transparent hover:border-accent',
        'font-medium',
        className
      )}
      title={`Switch to ${currentLang === 'en' ? 'Russian' : 'English'}`}
    >
      {currentLang === 'en' ? 'EN' : 'RU'}
    </button>
  );
}
