import { cn } from '../utils';
import { useQuickStart } from '../hooks/useQuickStart';
import { useLanguage } from '../i18n';

interface QuickStartProps {
  onLoadExample?: (content: string, filename: string) => void;
  variant?: 'full' | 'cards' | 'list';
  showHeader?: boolean;
  showCards?: boolean;
  showTip?: boolean;
  className?: string;
  examples?: Array<{
    name: string;
    title: string;
    content: string;
  }>;
}

const defaultExampleFiles = [
  {
    name: 'three-pillars-modern-frontend-architecture.md',
    title: 'Three Pillars of Modern Frontend Architecture',
    content: `---
title: "Three Pillars of Modern Frontend Architecture"
slug: "three-pillars-modern-frontend-architecture"
excerpt: "Discover the three foundational pillars that define modern frontend architecture: semantic HTML5, component-driven development, and utility-to-semantic transformation."
categories: ["Architecture", "Semantic HTML"]
featuredImage:
  url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
  alt: "Three pillars of modern frontend architecture visualization"
  width: 800
  height: 600
---

# Three Pillars of Modern Frontend Architecture

The future of scalable frontend development rests on three fundamental pillars that transform how we build web applications.

## Semantic HTML5 Foundation

**Semantic HTML5 Foundation** ensures accessibility, SEO optimization, and future-proof markup that follows W3C standards. Every component generates clean, semantic HTML5 elements with meaningful class names that screen readers, search engines, and developers can understand instantly.

## Component-Driven Architecture

**Component-Driven Architecture** leverages atomic design principles with TypeScript-first development, creating reusable, testable components that scale across enterprise applications.

## Utility-to-Semantic Transformation

**Utility-to-Semantic Transformation** bridges the gap between rapid prototyping with Tailwind CSS and production-ready semantic classes, delivering the best of both worlds: developer experience and maintainable code.

These three pillars work together to create a robust foundation for modern web applications that are both developer-friendly and production-ready.
`
  },
  {
    name: 'clean-code-principles-semantic-html5-components.md',
    title: 'Clean Code Principles for Semantic HTML5 Components',
    content: `---
title: "Clean Code Principles for Semantic HTML5 Components"
slug: "clean-code-principles-semantic-html5-components"
excerpt: "Learn how to write clean, maintainable frontend code using semantic HTML5 elements, BEM methodology, and component composition patterns."
categories: ["Clean Code", "Component Design"]
featuredImage:
  url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  alt: "Clean code principles and semantic HTML5 structure"
  width: 800
  height: 600
---

# Clean Code Principles for Semantic HTML5 Components

Writing clean, maintainable frontend code starts with semantic HTML5 foundations and extends through every layer of your component architecture.

## Meaningful Markup

**Meaningful Markup** means every HTML element serves a semantic purpose - using \`<article>\`, \`<section>\`, \`<nav>\`, and \`<aside>\` elements correctly improves accessibility scores and SEO rankings.

## BEM-Inspired Class Naming

**BEM-Inspired Class Naming** creates self-documenting CSS that follows \`.block__element--modifier\` conventions, making your stylesheets readable and maintainable.

## Component Composition

**Component Composition** over inheritance ensures your React components remain testable, reusable, and easy to debug.

## TypeScript Integration

**TypeScript Integration** provides compile-time safety with proper prop validation and IntelliSense support.

Clean code isn't just about aesthetics - it's about building systems that scale, perform, and remain maintainable as your team grows.

\`\`\`jsx
// Example of clean semantic component
function ArticleCard({ title, excerpt, date }) {
  return (
    <article className="article-card">
      <header className="article-card__header">
        <h2 className="article-card__title">{title}</h2>
        <time className="article-card__date">{date}</time>
      </header>
      <div className="article-card__content">
        <p className="article-card__excerpt">{excerpt}</p>
      </div>
    </article>
  );
}
\`\`\`
`
  },
  {
    name: 'tailwind-utilities-production-semantic-classes.md',
    title: 'From Tailwind Utilities to Production-Ready Semantic Classes',
    content: `---
title: "From Tailwind Utilities to Production-Ready Semantic Classes"
slug: "tailwind-utilities-production-semantic-classes"
excerpt: "Transform Tailwind utility classes into production-ready semantic HTML5 with automated extraction, CVA patterns, and framework-agnostic output."
categories: ["Tailwind CSS", "Semantic HTML"]
featuredImage:
  url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop"
  alt: "Tailwind CSS transformation to semantic HTML5 classes"
  width: 800
  height: 600
---

# From Tailwind Utilities to Production-Ready Semantic Classes

The journey from utility-first development to semantic HTML5 production code represents a paradigm shift in modern frontend workflows.

## Development Velocity

**Development Velocity** with Tailwind CSS enables rapid prototyping using utility classes like \`flex items-center justify-between\`, while **Automated Extraction** transforms these utilities into semantic classes like \`.header-navigation\` and \`.button-primary\`.

## Class Variance Authority (CVA)

**Class Variance Authority (CVA)** patterns provide the bridge between utility chaos and semantic clarity, generating type-safe component variants that compile to clean CSS.

\`\`\`typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
\`\`\`

## Production Optimization

**Production Optimization** results in smaller bundle sizes, improved Core Web Vitals scores, and better accessibility compliance.

## Framework-Agnostic Output

**Framework-Agnostic Output** means your semantic HTML5 and CSS work perfectly in React, Vue, Angular, or vanilla JavaScript environments.

This approach eliminates the traditional trade-off between developer experience and code quality - you get both.
`
  }
];

const defaultExampleFilesRu = [
  {
    name: 'tri-stolpa-sovremennoy-frontend-arkhitektury.md',
    title: 'Три столпа современной фронтенд-архитектуры',
    content: `---
title: "Три столпа современной фронтенд-архитектуры"
slug: "tri-stolpa-sovremennoy-frontend-arkhitektury"
excerpt: "Откройте для себя три основополагающих столпа, которые определяют современную фронтенд-архитектуру: семантический HTML5, компонентно-ориентированная разработка и трансформация утилит в семантику."
categories: ["Архитектура", "Семантический HTML"]
featuredImage:
  url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
  alt: "Визуализация трех столпов современной фронтенд-архитектуры"
  width: 800
  height: 600
---

# Три столпа современной фронтенд-архитектуры

Будущее масштабируемой фронтенд-разработки основывается на трех фундаментальных столпах, которые трансформируют способ создания веб-приложений.

## Семантический HTML5 фундамент

**Семантический HTML5 фундамент** обеспечивает доступность, SEO-оптимизацию и разметку, готовую к будущему, которая следует стандартам W3C. Каждый компонент генерирует чистые, семантические HTML5 элементы с осмысленными именами классов, которые программы чтения с экрана, поисковые системы и разработчики могут понять мгновенно.

## Компонентно-ориентированная архитектура

**Компонентно-ориентированная архитектура** использует принципы атомарного дизайна с разработкой TypeScript-first, создавая многократно используемые, тестируемые компоненты, которые масштабируются в корпоративных приложениях.

## Трансформация утилит в семантику

**Трансформация утилит в семантику** устраняет разрыв между быстрым прототипированием с Tailwind CSS и готовыми к продакшену семантическими классами, обеспечивая лучшее из обоих миров: опыт разработчика и поддерживаемый код.

Эти три столпа работают вместе, создавая надежную основу для современных веб-приложений, которые одновременно удобны для разработчиков и готовы к продакшену.
`
  },
  {
    name: 'printsipy-chistogo-koda-semanticheskie-html5-komponenty.md',
    title: 'Принципы чистого кода для семантических HTML5 компонентов',
    content: `---
title: "Принципы чистого кода для семантических HTML5 компонентов"
slug: "printsipy-chistogo-koda-semanticheskie-html5-komponenty"
excerpt: "Изучите, как писать чистый, поддерживаемый фронтенд-код, используя семантические HTML5 элементы, методологию BEM и паттерны композиции компонентов."
categories: ["Чистый код", "Дизайн компонентов"]
featuredImage:
  url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  alt: "Принципы чистого кода и семантическая HTML5 структура"
  width: 800
  height: 600
---

# Принципы чистого кода для семантических HTML5 компонентов

Написание чистого, поддерживаемого фронтенд-кода начинается с семантических HTML5 основ и распространяется через каждый слой архитектуры ваших компонентов.

## Осмысленная разметка

**Осмысленная разметка** означает, что каждый HTML элемент служит семантической цели - правильное использование элементов \`<article>\`, \`<section>\`, \`<nav>\` и \`<aside>\` улучшает показатели доступности и SEO рейтинги.

## Именование классов в стиле BEM

**Именование классов в стиле BEM** создает самодокументируемый CSS, который следует конвенциям \`.block__element--modifier\`, делая ваши таблицы стилей читаемыми и поддерживаемыми.

## Композиция компонентов

**Композиция компонентов** вместо наследования гарантирует, что ваши React компоненты остаются тестируемыми, многократно используемыми и легкими для отладки.

## Интеграция TypeScript

**Интеграция TypeScript** обеспечивает безопасность во время компиляции с правильной валидацией пропсов и поддержкой IntelliSense.

Чистый код - это не только об эстетике - это о создании систем, которые масштабируются, работают и остаются поддерживаемыми по мере роста вашей команды.

\`\`\`jsx
// Пример чистого семантического компонента
function ArticleCard({ title, excerpt, date }) {
  return (
    <article className="article-card">
      <header className="article-card__header">
        <h2 className="article-card__title">{title}</h2>
        <time className="article-card__date">{date}</time>
      </header>
      <div className="article-card__content">
        <p className="article-card__excerpt">{excerpt}</p>
      </div>
    </article>
  );
}
\`\`\`
`
  },
  {
    name: 'ot-tailwind-utilit-k-semanticheskim-klassam.md',
    title: 'От утилит Tailwind к готовым семантическим классам',
    content: `---
title: "От утилит Tailwind к готовым семантическим классам"
slug: "ot-tailwind-utilit-k-semanticheskim-klassam"
excerpt: "Трансформируйте утилитарные классы Tailwind в готовый к продакшену семантический HTML5 с автоматизированным извлечением, паттернами CVA и фреймворк-агностическим выводом."
categories: ["Tailwind CSS", "Семантический HTML"]
featuredImage:
  url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop"
  alt: "Трансформация Tailwind CSS в семантические HTML5 классы"
  width: 800
  height: 600
---

# От утилит Tailwind к готовым семантическим классам

Путь от utility-first разработки к семантическому HTML5 продакшн-коду представляет парадигмальный сдвиг в современных фронтенд-процессах.

## Скорость разработки

**Скорость разработки** с Tailwind CSS обеспечивает быстрое прототипирование, используя утилитарные классы как \`flex items-center justify-between\`, в то время как **Автоматизированное извлечение** трансформирует эти утилиты в семантические классы как \`.header-navigation\` и \`.button-primary\`.

## Class Variance Authority (CVA)

**Class Variance Authority (CVA)** паттерны обеспечивают мост между утилитарным хаосом и семантической ясностью, генерируя типобезопасные варианты компонентов, которые компилируются в чистый CSS.

\`\`\`typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
\`\`\`

## Оптимизация для продакшена

**Оптимизация для продакшена** приводит к меньшим размерам бандлов, улучшенным показателям Core Web Vitals и лучшему соответствию требованиям доступности.

## Фреймворк-агностический вывод

**Фреймворк-агностический вывод** означает, что ваш семантический HTML5 и CSS отлично работают в React, Vue, Angular или vanilla JavaScript окружениях.

Этот подход устраняет традиционный компромисс между опытом разработчика и качеством кода - вы получаете и то, и другое.
`
  }
];

export function QuickStart({
  onLoadExample,
  variant = 'full',
  showHeader = true,
  showCards = true,
  showTip = true,
  className,
  examples
}: QuickStartProps) {
  const { currentLang } = useLanguage();
  let contextQuickStart = null;
  try {
    contextQuickStart = useQuickStart();
  } catch {
    // context unknown
  }

  // Use external examples or default based on language
  const exampleFiles = examples || (currentLang === 'ru' ? defaultExampleFilesRu : defaultExampleFiles);

  const handleLoadExample = (example: typeof exampleFiles[0]) => {
    const loadFn = onLoadExample || contextQuickStart?.onLoadExample;
    if (!loadFn) return;

    // Create File object from string
    const blob = new Blob([example.content], { type: 'text/markdown' });
    const file = new File([blob], example.name, { type: 'text/markdown' });

    // Use FileReader to read as a regular file
    const reader = new FileReader();
    reader.onload = () => {
      loadFn(reader.result as string, example.name);
    };
    reader.readAsText(file);
  };

  const renderCards = () => (
    <div className={cn(
      variant === 'list' ? 'space-y-2' : 'grid gap-4',
      variant === 'cards' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    )}>
      {exampleFiles.map((example, index) => (
        <div
          key={index}
          className={cn(
            'p-4 rounded-lg border cursor-pointer transition-colors',
            'border-primary/50 bg-primary/10 text-primary-foreground',
            'hover:border-primary',
            variant === 'list' && 'flex items-center gap-4'
          )}
          onClick={() => handleLoadExample(example)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={cn(
                'font-medium mb-1',
                'text-foreground'
              )}>
                {example.title}
              </h4>
              <p className={cn(
                'text-sm mb-2',
                'text-muted-foreground'
              )}>
                {example.name}
              </p>
              <div className="flex items-center gap-2">
                <span className={cn(
                  'text-xs px-2 py-1 rounded',
                  'bg-muted',
                  'text-muted-foreground'
                )}>
                  {example.name.endsWith('.mdx') ? 'MDX' : 'MD'}
                </span>
                <span className={cn(
                  'text-xs',
                  'text-muted-foreground'
                )}>
                  ~{Math.ceil(example.content.length / 100)} lines
                </span>
              </div>
            </div>

            <div className={cn(
              'p-2 rounded-lg',
              'bg-accent',
              'text-accent-foreground'
            )}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn('space-y-6', className)}>
      {showHeader && (
        <div className="text-center">
          <div className={cn(
            'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
            'bg-muted'
          )}>
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={cn(
            'text-lg font-medium mb-2',
            'text-foreground'
          )}>
            {__('Select a file for editing')}
          </h3>
          <p className={cn(
            'text-sm',
            'text-muted-foreground'
          )}>
            {__('Load a .md or .mdx file to start working')}
          </p>
        </div>
      )}

      {showCards && renderCards()}

      {showTip && (
        <div className={cn(
          'p-4 rounded-lg text-left',
          'bg-secondary',
          'border border-border'
        )}>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-secondary-foreground mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className={cn(
                'text-sm font-medium mb-1',
                'text-secondary-foreground'
              )}>
                {__('Desktop Required')}
              </p>
              <p className={cn(
                'text-sm leading-relaxed',
                'text-secondary-foreground'
              )}>
                {__('EditorY is optimized for desktop use. Please access this editor from a computer for the best experience with keyboard shortcuts and split-screen features.')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 