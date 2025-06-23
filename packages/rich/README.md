# Rich Editor

Полнофункциональный редактор статей для блога на основе TipTap с поддержкой Markdown/MDX файлов и интеграцией с WordPress типами данных.

## Особенности

- 🚀 **Современный редактор** на основе TipTap с богатым функционалом
- 📝 **Поддержка Markdown/MDX** с автоматическим парсингом frontmatter
- 🌙 **Темная тема** с полной поддержкой dark: модификаторов
- 📊 **Управление метаданными** с автогенерацией slug, excerpt, id
- 👀 **Предпросмотр в реальном времени** в полноэкранном модальном окне
- 📁 **Менеджер файлов** с drag & drop поддержкой
- 💾 **Экспорт в MDX** с сохранением всех метаданных
- 🔄 **Интеграция с WordPress** типами данных

## Установка

```bash
cd packages/rich
bun install
```

## Запуск разработки

```bash
bun run dev
```

## Сборка

```bash
bun run build
```

## Использование

### Базовое использование

```tsx
import { RichEditorApp } from '@editory/rich';
import '@editory/rich/styles';

function App() {
  return <RichEditorApp />;
}
```

### Отдельные компоненты

```tsx
import { 
  RichEditor, 
  PostMetaEditor, 
  MarkdownPreview, 
  FileManager 
} from '@editory/rich';

function MyEditor() {
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({});

  return (
    <div>
      <RichEditor 
        content={content}
        onChange={setContent}
        isDarkMode={true}
      />
      
      <PostMetaEditor
        meta={meta}
        onChange={setMeta}
      />
    </div>
  );
}
```

## Структура проекта

```
packages/rich/
├── src/
│   ├── components/          # React компоненты
│   │   ├── RichEditor.tsx   # Основной редактор TipTap
│   │   ├── PostMetaEditor.tsx # Редактор метаданных
│   │   ├── MarkdownPreview.tsx # Предпросмотр
│   │   ├── FileManager.tsx  # Менеджер файлов
│   │   └── RichEditorApp.tsx # Главное приложение
│   ├── hooks/               # React хуки
│   │   ├── useEditor.ts     # Управление состоянием редактора
│   │   ├── useFileManager.ts # Управление файлами
│   │   └── useDarkMode.ts   # Управление темой
│   ├── types/               # TypeScript типы
│   │   ├── editor.ts        # Типы редактора
│   │   ├── post.ts          # WordPress Post типы
│   │   └── menu.ts          # WordPress Menu типы
│   ├── utils/               # Утилиты
│   │   └── index.ts         # Парсинг MD, генерация slug и т.д.
│   ├── styles/              # Стили
│   │   └── index.css        # Основные стили с Tailwind
│   └── ~data/               # Данные (будет создано автоматически)
│       ├── context.json     # База данных постов
│       └── menu.json        # Меню для сайдбара
└── dist/                    # Сборка
```

## Поддерживаемые форматы

### Markdown файлы (.md)
```markdown
---
title: "Заголовок статьи"
slug: "zagolovok-stati"
excerpt: "Краткое описание"
---

# Содержимое статьи

Текст статьи в формате Markdown.
```

### MDX файлы (.mdx)
```mdx
---
title: "Интерактивная статья"
slug: "interaktivnaya-statya"
categories: ["React", "MDX"]
---

import { CustomComponent } from './components';

# Статья с компонентами

<CustomComponent prop="value" />
```

## Метаданные поста

Редактор поддерживает следующие обязательные поля:

- **title** - Заголовок статьи
- **slug** - URL slug (автогенерация из title)
- **id** - Уникальный ID (автогенерация)
- **excerpt** - Краткое описание (автогенерация из содержимого)

Дополнительные поля:

- **featuredImage** - Главное изображение
- **categories** - Категории
- **date** - Дата публикации

## API

### useEditor Hook

```tsx
const { state, actions } = useEditor();

// state содержит:
// - currentFile: текущий файл
// - files: список всех файлов
// - isPreviewOpen: состояние предпросмотра
// - isDarkMode: состояние темы
// - context: база данных постов
// - menu: меню для навигации

// actions содержит:
// - loadFile: загрузка файла
// - saveFile: сохранение файла
// - updateContent: обновление содержимого
// - updateMeta: обновление метаданных
// - togglePreview: переключение предпросмотра
// - toggleDarkMode: переключение темы
// - exportToMDX: экспорт в MDX
```

## Интеграция с WordPress

Редактор полностью совместим с типами данных WordPress:

```typescript
// Автоматическое преобразование в WordPress Post формат
const wordpressPost: Post = {
  title: meta.title,
  content: content,
  slug: meta.slug,
  id: meta.id,
  excerpt: meta.excerpt,
  featuredImage: meta.featuredImage,
  categories: meta.categories,
  date: formatDate(new Date()),
  // ... остальные поля WordPress
};
```

## Кастомизация

### Темы

Редактор поддерживает кастомизацию через CSS переменные и Tailwind классы:

```css
/* Кастомная тема */
.my-editor-theme {
  --editor-bg: #f8f9fa;
  --editor-text: #212529;
  --editor-border: #dee2e6;
}

.dark .my-editor-theme {
  --editor-bg: #1a1d23;
  --editor-text: #e9ecef;
  --editor-border: #495057;
}
```

### Расширения TipTap

```tsx
import { Extension } from '@tiptap/core';

const CustomExtension = Extension.create({
  name: 'customExtension',
  // конфигурация расширения
});

<RichEditor
  content={content}
  onChange={setContent}
  extensions={[CustomExtension]}
/>
```

## Разработка

1. Клонируйте репозиторий
2. Установите зависимости: `bun install`
3. Запустите разработку: `bun run dev`
4. Откройте http://localhost:5173

## Лицензия

MIT 