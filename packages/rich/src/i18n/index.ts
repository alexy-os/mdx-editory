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

    // Quick Start
    'Load a .md or .mdx file to start working': 'Load a .md or .mdx file to start working',
    'EditorY is optimized for desktop use. Please access this editor from a computer for the best experience with keyboard shortcuts and split-screen features.': 'EditorY is optimized for desktop use. Please access this editor from a computer for the best experience with keyboard shortcuts and split-screen features.',
    
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
    'Create New Post': 'Create New Post',
    
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
    'Link URL:': 'Link URL:',
    'Post metadata': 'Post metadata',
    'Title *': 'Title *',
    'Slug *': 'Slug *',
    'ID': 'ID',
    'Short description': 'Short description',
    'Alt text of the image': 'Alt text of the image',
    'Categories': 'Categories',
    'URL-address of the post. Automatically generated from the title.': 'URL-address of the post. Automatically generated from the title.',
    '**bold**': '**bold**',
    '*italic*': '*italic*',
    '`code`': '`code`',
    '# Header': '# Header',
    '- List': '- List',
    '[Link](url)': '[Link](url)',
    '![Image](url)': '![Image](url)',
    'Markdown editor': 'Markdown editor',
    'GitHub Flavored Markdown support': 'GitHub Flavored Markdown support',
    '* - required fields': '* - required fields',
    'Separate categories by commas.': 'Separate categories by commas.',
    'Automatically generated from the post content.': 'Automatically generated from the post content.',
    'Unique identifier of the post. Automatically generated.': 'Unique identifier of the post. Automatically generated.',
    'Autofill': 'Autofill',

    // Info Panel
    'Rich Editor - Instructions': 'Rich Editor - Instructions',
    'Main features': 'Main features',
    'Quick start': 'Quick start',
    'Automatic functions': 'Automatic functions',
    'Saving data': 'Saving data',
    'Hotkeys': 'Hotkeys',
    'Rich Editor v.0.0.1 - Powered by TipTap & MDX': 'Rich Editor v.0.0.1 - Powered by TipTap & MDX',
    'I understand': 'I understand',
    'Select a file for editing from the list': 'Select a file for editing from the list',
    'Editing Markdown and MDX files with rich-text interface': 'Editing Markdown and MDX files with rich-text interface',
    'Managing article metadata (title, slug, excerpt, categories)': 'Managing article metadata (title, slug, excerpt, categories)',
    'Full-screen preview with MDX rendering': 'Full-screen preview with MDX rendering',
    'Switching between multiple files': 'Switching between multiple files',
    'Automatic saving in context.json and menu.json': 'Automatic saving in context.json and menu.json',
    'Export to MDX format': 'Export to MDX format',
    'Dark and light themes': 'Dark and light themes',
    'Drag and drop .md or .mdx files to the left panel or use the "Upload" button': 'Drag and drop .md or .mdx files to the left panel or use the "Upload" button',
    'Select a file for editing': 'Select a file for editing',
    'Use the toolbar to format text': 'Use the toolbar to format text',
    'Fill in the metadata in the right panel (or switch to the "Metadata" view)': 'Fill in the metadata in the right panel (or switch to the "Metadata" view)',
    'Click "Preview" for full-screen view': 'Click "Preview" for full-screen view',
    'Use "Save" to save a single file or "Update" to update all data': 'Use "Save" to save a single file or "Update" to update all data',
    'Slug auto-generation:': 'Slug auto-generation:',
    'If slug is not specified, it is automatically generated from the title': 'If slug is not specified, it is automatically generated from the title',
    'Excerpt auto-generation:': 'Excerpt auto-generation:',
    'If excerpt is not specified, it is automatically generated from the first 160 characters of the content': 'If excerpt is not specified, it is automatically generated from the first 160 characters of the content',
    'ID auto-generation:': 'ID auto-generation:',
    'Each file is automatically assigned a unique ID': 'Each file is automatically assigned a unique ID',
    'In the current version, data is saved in the browser\'s localStorage:': 'In the current version, data is saved in the browser\'s localStorage:',
    'database of posts': 'database of posts',
    'menu structure': 'menu structure',
    'In the production version, data will be saved in the files src/~data/context.json and src/~data/menu.json': 'In the production version, data will be saved in the files src/~data/context.json and src/~data/menu.json',
  },
  ru: {
    // Header & Navigation
    'Rich Editor': 'Редактор',
    'Welcome to EditorY': 'Добро пожаловать в EditorY',
    'Professional Markdown editing meets modern web standards': 'Профессиональное редактирование Markdown соответствует современным веб-стандартам. Пишите в Markdown, просматривайте в реальном времени, экспортируйте как семантический HTML5. Идеально для блогов, документации и создания контента.',
    
    // File Manager
    'Files': 'Файлы',
    'Upload': 'Загрузить',
    'Auto-save context.json and menu.json': 'Будет автоматически сохраняться в localStorage',
    'Total files': 'Всего файлов',

    // Quick Start
    'Load a .md or .mdx file to start working': 'Загрузите .md или .mdx файл для начала работы',
    'EditorY is optimized for desktop use. Please access this editor from a computer for the best experience with keyboard shortcuts and split-screen features.': 'EditorY оптимизирован для использования на компьютере. Пожалуйста, откройте этот редактор с компьютера для лучшего опыта с клавиатурными сочетаниями и разделенным экраном.',  
    
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
    'Save MDX': 'Экспорт MDX',
    'Export Context': 'Экспорт JSON',
    'Import Context': 'Импорт JSON',
    'Update': 'Обновить',
    'Clear Storage': 'Разэтовать',
    'Save': 'Сохранить',
    'Cancel': 'Отмена',
    'Delete': 'Удалить',
    'Create New Post': 'Добавить запись',
    
    // View Modes
    'View mode: Visual': '<WYSIWYG>',
    'View mode: Markdown': '[Markdown]',
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
    'Link URL:': 'URL ссылки:',
    'Post metadata': 'Метаданные  ',
    'Title *': 'Заголовок *',
    'Slug *': 'Ссылка *',
    'ID': 'ID',
    'Short description': 'Короткое описание',
    'Alt text of the image': 'Альтернативный текст изображения',
    'Categories': 'Категории',
    'URL-address of the post. Automatically generated from the title.': 'URL-адрес поста. Автоматически генерируется из заголовка.',
    '**bold**': '**жирный**',
    '*italic*': '*курсив*',
    '`code`': '`код`',
    '# Header': '# Заголовок',
    '- List': '- Список',
    '[Link](url)': '[Ссылка](url)',
    '![Image](url)': '![Изображение](url)',
    'Markdown editor': 'Редактор Markdown',
    'GitHub Flavored Markdown support': 'Поддержка GitHub Flavored Markdown',
    '* - required fields': '* - обязательные поля',
    'Separate categories by commas.': 'Разделяйте категории запятыми.',
    'Automatically generated from the post content.': 'Автоматически генерируется из содержимого поста.',
    'Unique identifier of the post. Automatically generated.': 'Уникальный идентификатор поста. Автоматически генерируется.',
    'Autofill': 'Заполнить',

    // Info Panel
    'Rich Editor - Instructions': 'Инструкции по использованию Rich Editor',
    'Main features': 'Основные возможности',
    'Quick start': 'Быстрый старт',
    'Automatic functions': 'Автоматические функции',
    'Saving data': 'Сохранение данных',
    'Hotkeys': 'Горячие клавиши',
    'Rich Editor v.0.0.1 - Powered by TipTap & MDX': 'Rich Editor v1.0.0 - Powered by TipTap & MDX',
    'I understand': 'Принято!',
    'Editing Markdown and MDX files with rich-text interface': 'Редактирование Markdown и MDX файлов с богатым текстовым интерфейсом',
    'Managing article metadata (title, slug, excerpt, categories)': 'Управление метаданными статьи (заголовок, ссылка, краткое описание, категории)',
    'Full-screen preview with MDX rendering': 'Полноэкранный просмотр с рендером MDX',
    'Switching between multiple files': 'Переключение между несколькими файлами',
    'Automatic saving in context.json and menu.json': 'Автоматическое сохранение в context.json и menu.json',
    'Export to MDX format': 'Экспорт в формат MDX',
    'Dark and light themes': 'Темная и светлая темы',
    'Drag and drop .md or .mdx files to the left panel or use the "Upload" button': 'Перетащите .md или .mdx файлы в левую панель или используйте кнопку "Загрузить"',
    'Select a file for editing from the list': 'Выберите файл с устройства',
    'Use the toolbar to format text': 'Используйте панель инструментов для форматирования текста',
    'Fill in the metadata in the right panel (or switch to the "Metadata" view)': 'Заполните метаданные в правой панели (или переключитесь на представление "Метаданные")',
    'Click "Preview" for full-screen view': 'Нажмите "Просмотр" для полноэкранного просмотра',
    'Use "Save" to save a single file or "Update" to update all data': 'Используйте "Сохранить" для сохранения одного файла или "Обновить" для обновления всех данных',
    'Slug auto-generation:': 'Автоматическое создание ссылки:',
    'If slug is not specified, it is automatically generated from the title': 'Если ссылка не указана, она автоматически генерируется из заголовка',
    'Excerpt auto-generation:': 'Автоматическое создание краткого описания:',
    'If excerpt is not specified, it is automatically generated from the first 160 characters of the content': 'Если краткое описание не указано, оно автоматически генерируется из первых 160 символов содержимого',
    'ID auto-generation:': 'Автоматическое создание ID:',
    'Each file is automatically assigned a unique ID': 'Каждому файлу автоматически назначается уникальный ID',
    'In the current version, data is saved in the browser\'s localStorage:': 'В текущей версии данные сохраняются в localStorage браузера:',
    'database of posts': 'база данных постов',
    'menu structure': 'структура меню',
    'In the production version, data will be saved in the files src/~data/context.json and src/~data/menu.json': 'В производственной версии данные будут сохранены в файлах src/~data/context.json и src/~data/menu.json',
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