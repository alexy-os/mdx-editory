import { useState, useEffect } from 'react';

const translations = {
  en: {
    // Header & Navigation
    'Rich Editor': 'Rich Editor',
    'Welcome to EditorY': 'Welcome to EditorY',
    'Professional Markdown editing meets modern web standards': 'Professional Markdown editing meets modern web standards. Write in Markdown, preview in real-time, export as semantic HTML5. Perfect for blogs, documentation, and content creation.',
    
    // File Manager
    'Files': 'Files',
    'Upload': 'Upload',
    'Auto-save context.json and menu.json': 'Auto-save context.json and menu.json',
    'Total files': 'Total files',
    
    // Editor Toolbar
    'Bold': 'Bold',
    'Italic': 'Italic',
    'Heading 1': 'Heading 1',
    'Heading 2': 'Heading 2',
    'Heading 3': 'Heading 3',
    'Bullet list': 'Bullet list',
    'Ordered list': 'Ordered list',
    'Quote': 'Quote',
    'Code': 'Code',
    'Code block': 'Code block',
    'Image': 'Image',
    'Link': 'Link',
    'Undo (Ctrl+Z)': 'Undo (Ctrl+Z)',
    'Redo (Ctrl+Y)': 'Redo (Ctrl+Y)',
    
    // Actions & Buttons
    'Actions': 'Actions',
    'Split': 'Split',
    'Editor': 'Editor',
    'Metadata': 'Metadata',
    'Preview': 'Preview',
    'Save MDX': 'Save MDX',
    'Export Context': 'Export Context',
    'Import Context': 'Import Context',
    'Update': 'Update',
    'Clear Storage': 'Clear Storage',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Delete': 'Delete',
    
    // View Modes
    'View mode: Visual': 'View mode: Visual',
    'View mode: Markdown': 'View mode: Markdown',
    'Switch between visual editor and Markdown': 'Switch between visual editor and Markdown',
    
    // Help & Settings
    'Help and instructions': 'Help and instructions',
    'Light theme': 'Light theme',
    'Dark theme': 'Dark theme',
    
    // Messages & Confirmations
    'Are you sure you want to clear all data? This action cannot be undone.': 'Are you sure you want to clear all data? This action cannot be undone.',
    'Loading editor...': 'Loading editor...',
    'Start writing...': 'Start writing...',
    'Start writing your article...': 'Start writing your article...',
    'Start writing in Markdown...': 'Start writing in Markdown...',
    
    // Tooltips & Titles
    'Save the current file as MDX': 'Save the current file as MDX',
    'Export context.json from localStorage': 'Export context.json from localStorage',
    'Import context.json and clear localStorage': 'Import context.json and clear localStorage',
    'Update context.json and menu.json': 'Update context.json and menu.json',
    'Clear localStorage and reset editor': 'Clear localStorage and reset editor',
    
    // Mobile
    'Desktop Required': 'Desktop Required',
    'EditorY is optimized for desktop use': 'EditorY is optimized for desktop use. Please access this editor from a computer for the best experience.',
    'Why Desktop?': 'Why Desktop?',
    'The rich editor, split-screen preview, and file management features work best with keyboard shortcuts and larger screens.': 'The rich editor, split-screen preview, and file management features work best with keyboard shortcuts and larger screens.',
    
    // Prompts
    'Image URL:': 'Image URL:',
    'Link URL:': 'Link URL:'
  },
  ru: {
    // Header & Navigation
    'Rich Editor': 'Редактор',
    'Welcome to EditorY': 'Добро пожаловать в EditorY',
    'Professional Markdown editing meets modern web standards': 'Профессиональное редактирование Markdown соответствует современным веб-стандартам. Пишите в Markdown, просматривайте в реальном времени, экспортируйте как семантический HTML5. Идеально для блогов, документации и создания контента.',
    
    // File Manager
    'Files': 'Файлы',
    'Upload': 'Загрузить',
    'Auto-save context.json and menu.json': 'Автосохранение context.json и menu.json',
    'Total files': 'Всего файлов',
    
    // Editor Toolbar
    'Bold': 'Жирный',
    'Italic': 'Курсив',
    'Heading 1': 'Заголовок 1',
    'Heading 2': 'Заголовок 2',
    'Heading 3': 'Заголовок 3',
    'Bullet list': 'Маркированный список',
    'Ordered list': 'Нумерованный список',
    'Quote': 'Цитата',
    'Code': 'Код',
    'Code block': 'Блок кода',
    'Image': 'Изображение',
    'Link': 'Ссылка',
    'Undo (Ctrl+Z)': 'Отменить (Ctrl+Z)',
    'Redo (Ctrl+Y)': 'Повторить (Ctrl+Y)',
    
    // Actions & Buttons
    'Actions': 'Действия',
    'Split': 'Разделить',
    'Editor': 'Редактор',
    'Metadata': 'Метаданные',
    'Preview': 'Просмотр',
    'Save MDX': 'Сохранить MDX',
    'Export Context': 'Экспорт контекста',
    'Import Context': 'Импорт контекста',
    'Update': 'Обновить',
    'Clear Storage': 'Очистить хранилище',
    'Save': 'Сохранить',
    'Cancel': 'Отмена',
    'Delete': 'Удалить',
    
    // View Modes
    'View mode: Visual': 'Режим: Визуальный',
    'View mode: Markdown': 'Режим: Markdown',
    'Switch between visual editor and Markdown': 'Переключение между визуальным редактором и Markdown',
    
    // Help & Settings
    'Help and instructions': 'Помощь и инструкции',
    'Light theme': 'Светлая тема',
    'Dark theme': 'Темная тема',
    
    // Messages & Confirmations
    'Are you sure you want to clear all data? This action cannot be undone.': 'Вы уверены, что хотите очистить все данные? Это действие нельзя отменить.',
    'Loading editor...': 'Загрузка редактора...',
    'Start writing...': 'Начните писать...',
    'Start writing your article...': 'Начните писать вашу статью...',
    'Start writing in Markdown...': 'Начните писать в Markdown...',
    
    // Tooltips & Titles
    'Save the current file as MDX': 'Сохранить текущий файл как MDX',
    'Export context.json from localStorage': 'Экспорт context.json из localStorage',
    'Import context.json and clear localStorage': 'Импорт context.json и очистка localStorage',
    'Update context.json and menu.json': 'Обновить context.json и menu.json',
    'Clear localStorage and reset editor': 'Очистить localStorage и сбросить редактор',
    
    // Mobile
    'Desktop Required': 'Требуется компьютер',
    'EditorY is optimized for desktop use': 'EditorY оптимизирован для использования на компьютере. Пожалуйста, откройте этот редактор с компьютера для лучшего опыта.',
    'Why Desktop?': 'Почему компьютер?',
    'The rich editor, split-screen preview, and file management features work best with keyboard shortcuts and larger screens.': 'Богатый редактор, предварительный просмотр с разделенным экраном и функции управления файлами лучше всего работают с клавиатурными сочетаниями и большими экранами.',
    
    // Prompts
    'Image URL:': 'URL изображения:',
    'Link URL:': 'URL ссылки:'
  }
};

type Language = 'en' | 'ru';
let currentLang: Language = 'en';
let listeners: (() => void)[] = [];

// Global __ function
export function __(key: keyof typeof translations[Language], fallback?: string): string {
  return translations[currentLang]?.[key] || fallback || key;
}

export function setLanguage(lang: Language) {
  currentLang = lang;
  localStorage.setItem('rich-editor-language', lang);
  
  // Notify all components about the language change
  listeners.forEach(listener => listener());
}

export function getCurrentLanguage(): Language {
  return currentLang;
}

// Hook for automatic re-rendering
export function useLanguage() {
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);
  
  return { 
    __,
    setLanguage,
    currentLang: getCurrentLanguage()
  };
}

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('rich-editor-language') as Language;
  if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
    currentLang = savedLang;
  }
  
  // Make the function globally available
  (window as any).__ = __;
}

// Export for TypeScript
declare global {
  var __: (key: string, fallback?: string) => string;
}