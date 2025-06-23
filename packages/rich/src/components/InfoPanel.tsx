import React from 'react';
import { cn } from '../utils';

interface InfoPanelProps {
  isDarkMode?: boolean;
  onClose: () => void;
}

export function InfoPanel({ isDarkMode = false, onClose }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={cn(
        'max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg',
        'bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-700'
      )}>
        {/* Заголовок */}
        <div className={cn(
          'p-6 border-b',
          'border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800'
        )}>
          <div className="flex items-center justify-between">
            <h2 className={cn(
              'text-xl font-semibold',
              'text-gray-900 dark:text-gray-100'
            )}>
              Rich Editor - Инструкция по использованию
            </h2>
            <button
              onClick={onClose}
              className={cn(
                'p-2 rounded-lg',
                'text-gray-500 dark:text-gray-400',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'transition-colors'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Содержимое */}
        <div className="p-6 space-y-6">
          {/* Основные возможности */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-gray-900 dark:text-gray-100'
            )}>
              Основные возможности
            </h3>
            <ul className={cn(
              'space-y-2 text-sm',
              'text-gray-700 dark:text-gray-300'
            )}>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Редактирование Markdown и MDX файлов с rich-text интерфейсом</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Управление метаданными статей (title, slug, excerpt, categories)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Полноэкранный предпросмотр с рендерингом MDX</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Переключение между несколькими файлами</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Автоматическое сохранение в context.json и menu.json</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Экспорт в MDX формат</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Темная и светлая темы</span>
              </li>
            </ul>
          </section>

          {/* Быстрый старт */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-gray-900 dark:text-gray-100'
            )}>
              Быстрый старт
            </h3>
            <ol className={cn(
              'space-y-2 text-sm list-decimal list-inside',
              'text-gray-700 dark:text-gray-300'
            )}>
              <li>Перетащите .md или .mdx файлы в левую панель или используйте кнопку "Загрузить"</li>
              <li>Выберите файл для редактирования из списка</li>
              <li>Используйте панель инструментов для форматирования текста</li>
              <li>Заполните метаданные в правой панели (или переключитесь на вид "Метаданные")</li>
              <li>Нажмите "Предпросмотр" для полноэкранного просмотра</li>
              <li>Используйте "Сохранить" для сохранения отдельного файла или "Обновить" для обновления всех данных</li>
            </ol>
          </section>

          {/* Автоматические функции */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-gray-900 dark:text-gray-100'
            )}>
              Автоматические функции
            </h3>
            <div className={cn(
              'space-y-3 text-sm',
              'text-gray-700 dark:text-gray-300'
            )}>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <strong className="text-blue-800 dark:text-blue-200">Автогенерация slug:</strong>
                <p className="mt-1">Если slug не указан, он автоматически генерируется из заголовка</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <strong className="text-green-800 dark:text-green-200">Автогенерация excerpt:</strong>
                <p className="mt-1">Если описание не указано, создается автоматически из первых 160 символов контента</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <strong className="text-purple-800 dark:text-purple-200">Автогенерация ID:</strong>
                <p className="mt-1">Каждому файлу автоматически присваивается уникальный ID</p>
              </div>
            </div>
          </section>

          {/* Файловая структура */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-gray-900 dark:text-gray-100'
            )}>
              Сохранение данных
            </h3>
            <div className={cn(
              'p-4 rounded-lg',
              'bg-gray-50 dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700'
            )}>
              <p className={cn(
                'text-sm mb-2',
                'text-gray-700 dark:text-gray-300'
              )}>
                В текущей версии данные сохраняются в localStorage браузера:
              </p>
              <ul className={cn(
                'space-y-1 text-sm',
                'text-gray-600 dark:text-gray-400'
              )}>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">rich-editor-context</code> - база данных постов</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">rich-editor-menu</code> - структура меню</li>
              </ul>
              <p className={cn(
                'text-xs mt-2 text-yellow-600 dark:text-yellow-400'
              )}>
                В продакшн версии данные будут сохраняться в файлы src/~data/context.json и src/~data/menu.json
              </p>
            </div>
          </section>

          {/* Горячие клавиши */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-gray-900 dark:text-gray-100'
            )}>
              Горячие клавиши
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Жирный</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+B</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Курсив</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+I</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Код</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+E</kbd>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Отмена</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Повтор</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Y</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Сохранить</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+S</kbd>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Подвал */}
        <div className={cn(
          'p-4 border-t',
          'border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800'
        )}>
          <div className="flex justify-between items-center">
            <span className={cn(
              'text-xs',
              'text-gray-500 dark:text-gray-400'
            )}>
              Rich Editor v1.0.0 - Powered by TipTap & MDX
            </span>
            <button
              onClick={onClose}
              className={cn(
                'px-4 py-2 text-sm rounded',
                'bg-blue-600 dark:bg-blue-500',
                'text-white',
                'hover:bg-blue-700 dark:hover:bg-blue-600',
                'transition-colors'
              )}
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 