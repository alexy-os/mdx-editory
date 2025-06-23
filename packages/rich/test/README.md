# Rich Editor Library Test

Этот каталог содержит тестовое приложение для проверки собранной библиотеки Rich Editor.

## Как использовать

### 1. Сначала соберите библиотеку
```bash
cd packages/rich
npm run build
```

### 2. Запустите тест в dev режиме
```bash
npm run dev:test
```
Откроется на порту 5174: http://localhost:5174

### 3. Или соберите и preview тест
```bash
npm run build:test
npm run preview:test
```

## Что тестируется

- ✅ Импорт из собранной библиотеки `dist/rich-editor.es.js`
- ✅ Корректность экспортов компонентов
- ✅ Работа стилей
- ✅ Функциональность библиотеки как внешний пользователь

## Структура

- `index.html` - HTML страница для тестирования
- `test.tsx` - React компонент, использующий библиотеку
- `vite.config.ts` - Конфигурация Vite для тестирования
- `types.d.ts` - Типы для импорта из dist/

## Workflow

1. Изменили код библиотеки → `npm run build`
2. Тестируем изменения → `npm run dev:test`
3. Проверяем сборку → `npm run build:test && npm run preview:test` 