import React from 'react';
import { cn } from '../utils';

interface QuickStartProps {
  onLoadExample: (content: string, filename: string) => void;
  isDarkMode?: boolean;
}

const exampleFiles = [
  {
    name: 'example-blog-post.mdx',
    title: 'Пример блог-поста',
    content: `---
title: "Введение в современную веб-разработку"
slug: "intro-to-modern-web-dev"
excerpt: "Обзор ключевых технологий и подходов в современной веб-разработке"
categories: ["Веб-разработка", "JavaScript", "React"]
featuredImage:
  url: "/images/web-dev-intro.jpg"
  alt: "Современная веб-разработка"
  width: 1200
  height: 630
---

# Введение в современную веб-разработку

Современная веб-разработка — это динамично развивающаяся область, которая постоянно предлагает новые инструменты, фреймворки и подходы.

## Ключевые технологии

### Frontend

- **React** — библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript
- **Tailwind CSS** — utility-first CSS фреймворк

### Backend

- **Node.js** — серверная платформа JavaScript
- **Express** — минималистичный веб-фреймворк
- **PostgreSQL** — реляционная база данных

## Современные подходы

1. **Component-based архитектура**
2. **JAMstack** (JavaScript, APIs, Markup)
3. **Serverless функции**
4. **Static Site Generation**

## Заключение

Веб-разработка продолжает эволюционировать, и важно оставаться в курсе последних тенденций и лучших практик.

> "Лучший способ изучить веб-разработку — это практика и постоянное обучение."

\`\`\`javascript
// Пример современного React компонента
function WelcomeMessage({ name }) {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold">Добро пожаловать, {name}!</h2>
    </div>
  );
}
\`\`\`
`
  },
  {
    name: 'tutorial-guide.md',
    title: 'Руководство по туториалу',
    content: `---
title: "Как создать свой первый React приложение"
slug: "first-react-app-tutorial"
excerpt: "Пошаговое руководство по созданию React приложения с нуля"
categories: ["Туториал", "React", "Начинающим"]
---

# Как создать свой первый React приложение

В этом руководстве мы пошагово создадим простое React приложение.

## Требования

Перед началом убедитесь, что у вас установлены:

- Node.js (версия 14 или выше)
- npm или yarn
- Редактор кода (VS Code рекомендуется)

## Шаг 1: Создание проекта

\`\`\`bash
npx create-react-app my-first-app
cd my-first-app
npm start
\`\`\`

## Шаг 2: Структура проекта

После создания проекта вы увидите следующую структуру:

\`\`\`
my-first-app/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── ...
\`\`\`

## Шаг 3: Создание первого компонента

Создайте файл \`src/Welcome.js\`:

\`\`\`jsx
import React from 'react';

function Welcome({ name }) {
  return (
    <div>
      <h1>Привет, {name}!</h1>
      <p>Добро пожаловать в мир React!</p>
    </div>
  );
}

export default Welcome;
\`\`\`

## Заключение

Поздравляем! Вы создали свое первое React приложение. Теперь вы можете:

- [ ] Добавить больше компонентов
- [ ] Изучить состояние (state)
- [ ] Попробовать хуки (hooks)
- [ ] Добавить стилизацию
`
  },
  {
    name: 'tech-review.mdx',
    title: 'Обзор технологий',
    content: `---
title: "Обзор фронтенд технологий 2024"
slug: "frontend-tech-review-2024"
excerpt: "Актуальный обзор технологий фронтенд разработки в 2024 году"
categories: ["Обзор", "Frontend", "Технологии"]
featuredImage:
  url: "/images/tech-2024.jpg"
  alt: "Технологии 2024"
  width: 1200
  height: 630
---

import { TechCard } from '../components/TechCard';
import { ComparisonTable } from '../components/ComparisonTable';

# Обзор фронтенд технологий 2024

2024 год принес множество интересных изменений в мире фронтенд разработки.

## Топ фреймворков

<TechCard 
  name="React 18" 
  description="Concurrent features и улучшенная производительность"
  popularity={95}
/>

<TechCard 
  name="Vue 3" 
  description="Composition API и улучшенная TypeScript поддержка"
  popularity={85}
/>

<TechCard 
  name="Svelte 4" 
  description="Компактность и высокая производительность"
  popularity={75}
/>

## Сравнение производительности

<ComparisonTable 
  data={[
    { framework: 'React', bundleSize: '42KB', renderTime: '16ms' },
    { framework: 'Vue', bundleSize: '38KB', renderTime: '14ms' },
    { framework: 'Svelte', bundleSize: '10KB', renderTime: '12ms' }
  ]}
/>

## Новые тренды

### 1. Server Components

React Server Components меняют подход к рендерингу:

\`\`\`jsx
// Серверный компонент
async function BlogPost({ id }) {
  const post = await fetchPost(id);
  return <article>{post.content}</article>;
}
\`\`\`

### 2. Edge Computing

Развертывание на edge серверах для лучшей производительности.

### 3. AI-powered Development

Инструменты с ИИ помогают в написании кода:

- GitHub Copilot
- Tabnine
- Kite

## Заключение

Фронтенд разработка продолжает развиваться быстрыми темпами. Важно следить за трендами, но не забывать о фундаментальных принципах.

---

**Статистика использования:**
- React: 40.14%
- Vue: 18.82%
- Angular: 17.96%
- Svelte: 4.58%
`
  }
];

export function QuickStart({ onLoadExample, isDarkMode = false }: QuickStartProps) {
  const handleLoadExample = (example: typeof exampleFiles[0]) => {
    // Создаем File объект из строки
    const blob = new Blob([example.content], { type: 'text/markdown' });
    const file = new File([blob], example.name, { type: 'text/markdown' });
    
    // Используем FileReader для чтения как обычного файла
    const reader = new FileReader();
    reader.onload = () => {
      onLoadExample(reader.result as string, example.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={cn(
          'text-lg font-semibold mb-2',
          'text-gray-900 dark:text-gray-100'
        )}>
          Быстрый старт
        </h3>
        <p className={cn(
          'text-sm',
          'text-gray-500 dark:text-gray-400'
        )}>
          Загрузите пример файла для знакомства с редактором
        </p>
      </div>

      <div className="grid gap-4">
        {exampleFiles.map((example, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-lg border cursor-pointer transition-all',
              'border-gray-200 dark:border-gray-700',
              'hover:border-blue-300 dark:hover:border-blue-600',
              'hover:bg-blue-50 dark:hover:bg-blue-900/20'
            )}
            onClick={() => handleLoadExample(example)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={cn(
                  'font-medium mb-1',
                  'text-gray-900 dark:text-gray-100'
                )}>
                  {example.title}
                </h4>
                <p className={cn(
                  'text-sm mb-2',
                  'text-gray-600 dark:text-gray-400'
                )}>
                  {example.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs px-2 py-1 rounded',
                    'bg-gray-100 dark:bg-gray-700',
                    'text-gray-600 dark:text-gray-400'
                  )}>
                    {example.name.endsWith('.mdx') ? 'MDX' : 'MD'}
                  </span>
                  <span className={cn(
                    'text-xs',
                    'text-gray-500 dark:text-gray-500'
                  )}>
                    ~{Math.ceil(example.content.length / 100)} строк
                  </span>
                </div>
              </div>
              
              <div className={cn(
                'p-2 rounded-lg',
                'bg-blue-100 dark:bg-blue-900/30',
                'text-blue-600 dark:text-blue-400'
              )}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={cn(
        'p-4 rounded-lg',
        'bg-yellow-50 dark:bg-yellow-900/20',
        'border border-yellow-200 dark:border-yellow-800'
      )}>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className={cn(
              'text-sm font-medium mb-1',
              'text-yellow-800 dark:text-yellow-200'
            )}>
              Совет
            </p>
            <p className={cn(
              'text-sm',
              'text-yellow-700 dark:text-yellow-300'
            )}>
              После загрузки примера вы можете редактировать его, менять метаданные и экспортировать результат.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 