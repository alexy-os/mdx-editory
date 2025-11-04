---
{
  "title": "Конфигурация TypeScript",
  "generatedAt": "2025-11-04T12:14:44.178Z"
}
---

# Конфигурация TypeScript

Этот документ предоставляет подробное объяснение конфигурации TypeScript в `@ui8kit/core`, охватывая настройки компиляции, генерацию типов, псевдонимы путей и разрешение модулей. Конфигурация определена в [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26) и интегрирована с системой сборки, описанной в [Система сборки](#3.6).

Для информации об артефактах дистрибуции, генерируемых компиляцией TypeScript, см. [Структура пакета](#3.5). Для деталей о том, как типы используются в API компонентов, см. [Справочник API](#4).

---

## Обзор конфигурации

Конфигурация TypeScript выполняет три основные функции: компиляция исходного кода из `src/` в модули ES2022 в `dist/`, генерация файлов объявлений типов (`.d.ts`) для автодополнения в IDE и проверки типов, а также установка псевдонимов путей для чистых импортов.

**Диаграмма: Конвейер компиляции TypeScript**

```
Выходные артефакты

Процесс сборки

Настройки tsconfig.json

Исходные файлы

src/core/ui/*.tsx
Примитивные компоненты

src/components/ui/*.tsx
Составные компоненты

src/layouts/*.tsx
Шаблоны макетов

src/core/variants/*.ts
Определения вариантов CVA

src/themes/**/*.tsx
Система тем

src/index.ts
Главная точка входа

rootDir: 'src'
Корневая директория исходников

outDir: './dist'
Выходная директория

target: 'ES2022'
Версия ECMAScript

module: 'ES2022'
Система модулей

declaration: true
Генерация .d.ts файлов

declarationDir: './dist'
Вывод определений типов

strict: true
Все строгие проверки включены

paths: @/* и @ui8kit/core
Сопоставления псевдонимов путей

tsc -p tsconfig.json
Компилятор TypeScript

tsc --noEmit
Только проверка типов

dist/index.js
Скомпилированный JavaScript

dist/index.d.ts
Определения типов

dist/components/**/*.js
Модули компонентов

dist/components/**/*.d.ts
Типы компонентов
```

**Источники**: [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26) [package.json22-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L25)

---

## Настройки целевой компиляции

Конфигурация нацелена на современные JavaScript-окружения с выводом ES2022, избегая транспиляции последних возможностей языка при сохранении широкой совместимости.

**Таблица настроек компиляции**

| Настройка          | Значение                      | Назначение                                            | Ссылка на строку                                                                      |
| ------------------ | ----------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `target`           | `ES2022`                      | Компиляция в синтаксис ECMAScript 2022                | [tsconfig.json5](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L5-L5)    |
| `module`           | `ES2022`                      | Использование системы модулей ES2022                  | [tsconfig.json6](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L6-L6)    |
| `lib`              | `["DOM", "ESNext", "ES2022"]` | Включение API DOM и последних возможностей JavaScript | [tsconfig.json14](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L14-L14) |
| `jsx`              | `react-jsx`                   | Использование автоматического JSX runtime React 17+   | [tsconfig.json15](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L15-L15) |
| `moduleResolution` | `Bundler`                     | Современное разрешение, совместимое с бандлерами      | [tsconfig.json7](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L7-L7)    |

### Target: ES2022

Настройка `target: "ES2022"` [tsconfig.json5](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L5-L5) компилирует TypeScript в ECMAScript 2022, который включает:

- Top-level await
- Поля классов и приватные методы
- Блоки статической инициализации
- Свойство error cause
- Метод `at()` для массивов

Это предполагает, что потребители используют современные браузеры или окружения Node.js 16+.

### Система модулей: ES2022

Настройка `module: "ES2022"` [tsconfig.json6](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L6-L6) генерирует ES-модули с расширениями `.js`, обеспечивая tree-shaking в приложениях потребителей. Это согласуется с объявлением `"type": "module"` в [package.json8](https://github.com/ui8kit/core/blob/2afe2195/package.json#L8-L8)

### Разрешение модулей: Bundler

Настройка `moduleResolution: "Bundler"` [tsconfig.json7](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L7-L7) использует специфичное для бандлеров разрешение, которое поддерживает:

- Импорты без расширений (`import { Button } from "./Button"`)
- Разрешение поля exports пакетов
- Условный экспорт для различных окружений
- Паттерны подпутей

Это беспрепятственно работает с современными бандлерами, такими как Vite, Webpack 5 и esbuild.

**Источники**: [tsconfig.json5-7](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L5-L7) [tsconfig.json14-15](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L14-L15) [package.json8](https://github.com/ui8kit/core/blob/2afe2195/package.json#L8-L8)

---

## Конфигурация системы типов

Конфигурация включает все опции строгой проверки типов и генерирует файлы объявлений для интеграции с IDE.

**Таблица настроек системы типов**

| Настройка         | Значение | Назначение                                  | Ссылка на строку                                                                      |
| ----------------- | -------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `strict`          | `true`   | Включение всех строгих проверок типов       | [tsconfig.json8](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L8-L8)    |
| `declaration`     | `true`   | Генерация объявлений типов `.d.ts`          | [tsconfig.json17](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L17-L17) |
| `declarationDir`  | `./dist` | Выходная директория для определений типов   | [tsconfig.json18](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L18-L18) |
| `composite`       | `true`   | Включение ссылок на проекты                 | [tsconfig.json16](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L16-L16) |
| `skipLibCheck`    | `true`   | Пропуск проверки типов файлов объявлений    | [tsconfig.json10](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L10-L10) |
| `esModuleInterop` | `true`   | Включение совместимости модулей CommonJS/ES | [tsconfig.json9](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L9-L9)    |

### Строгий режим

Флаг `strict: true` [tsconfig.json8](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L8-L8) включает все опции строгой проверки типов:

- `strictNullChecks`: Null и undefined не присваиваются другим типам
- `strictFunctionTypes`: Параметры функций проверяются контравариантно
- `strictBindCallApply`: Проверка типов методов `bind`, `call` и `apply`
- `strictPropertyInitialization`: Свойства классов должны быть инициализированы
- `noImplicitAny`: Переменные должны иметь явные типы
- `noImplicitThis`: Выражения `this` требуют явного типа
- `alwaysStrict`: Разбор в строгом режиме и вывод `"use strict"`

Это предотвращает распространенные ошибки и обеспечивает безопасность типов во всей библиотеке компонентов.

### Генерация объявлений

Настройка `declaration: true` [tsconfig.json17](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L17-L17) генерирует файлы `.d.ts` вместе со скомпилированным JavaScript. Эти определения типов:

- Обеспечивают автодополнение в IDE для всех экспортируемых компонентов
- Предоставляют встроенную документацию из комментариев JSDoc
- Поддерживают проверку типов в TypeScript-проектах потребителей
- Поддерживают запись `"types": "./dist/index.d.ts"` в [package.json32](https://github.com/ui8kit/core/blob/2afe2195/package.json#L32-L32)

**Диаграмма: Поток генерации определений типов**

```
Использование потребителем

Сгенерированные артефакты

Обработка компилятором

Исходный TypeScript

*.tsx компоненты
с JSDoc комментариями

*.ts утилиты
с экспортом типов

объявления interface
export type ButtonProps

tsc --declaration
Извлечение информации о типах

Разбор JSDoc комментариев
Конвертация в аннотации типов

dist/**/*.d.ts
Файлы объявлений типов

dist/index.d.ts
Главная точка входа типов

VSCode IntelliSense
Автодополнение свойств

tsc проверка типов
в проектах потребителей

IDE всплывающие подсказки
Показ документации
```

### Составные проекты

Флаг `composite: true` [tsconfig.json16](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L16-L16) включает ссылки на проекты TypeScript, что:

- Позволяет выполнять более быстрые инкрементальные сборки
- Обеспечивает графы зависимостей между проектами TypeScript
- Поддерживает архитектуры monorepo, описанные в [SUBMODULE\_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)

**Источники**: [tsconfig.json8-10](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L8-L10) [tsconfig.json16-18](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L16-L18) [package.json32](https://github.com/ui8kit/core/blob/2afe2195/package.json#L32-L32)

---

## Конфигурация псевдонимов путей

Псевдонимы путей обеспечивают чистые импорты с использованием префикса `@/` и ссылки на пакет `@ui8kit/core`.

**Настройки псевдонимов путей**

```
// Из tsconfig.json:20-24
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"],
    "@ui8kit/core": ["./src/index"]
  }
}
```

### Базовый URL

Настройка `baseUrl: "."` [tsconfig.json20](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L20-L20) устанавливает корень проекта как базу для всех неотносительных импортов. Это обеспечивает разрешение путей относительно корня репозитория.

### Сопоставления путей

Объект `paths` [tsconfig.json21-24](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L21-L24) определяет два паттерна псевдонимов:

**Таблица псевдонимов**

| Паттерн псевдонима | Разрешается в | Пример использования                              | Назначение                    |
| ------------------ | ------------- | ------------------------------------------------- | ----------------------------- |
| `@/*`              | `./src/*`     | `import { Button } from "@/components/ui/Button"` | Внутренние импорты исходников |
| `@ui8kit/core`     | `./src/index` | `import { Button } from "@ui8kit/core"`           | Главная точка входа пакета    |

### Внутренние импорты: `@/*`

Псевдоним `@/*` сопоставляется с `./src/*` [tsconfig.json22](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L22-L22) обеспечивая импорты вида:

- `import { Block } from "@/core/ui/Block"`
- `import { spacingVariants } from "@/core/variants/spacing"`
- `import { ThemeProvider } from "@/themes/providers/ThemeProvider"`

Это устраняет хрупкие относительные пути (`../../../core/ui/Block`) и делает рефакторинг более безопасным.

### Точка входа пакета: `@ui8kit/core`

Псевдоним `@ui8kit/core` сопоставляется с `./src/index` [tsconfig.json23](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L23-L23) позволяя внутренним файлам импортировать из пакета так же, как это делали бы потребители. Это полезно в:

- Примерах кода и документации
- Тестировании композиции компонентов
- Проверке публичной поверхности API

**Диаграмма: Поток разрешения путей**

```
Разрешение модулей во время выполнения

Разрешенные пути к файлам

Разрешение путей (tsconfig.json paths)

Операторы импорта

import { Button } from '@/components/ui/Button'

import { Block } from '@/core/ui/Block'

import { spacingVariants } from '@/core/variants/spacing'

import { ThemeProvider } from '@ui8kit/core'

baseUrl: '.'
Ссылка на корень проекта

@/* → ./src/*
Сопоставление внутренних исходников

@ui8kit/core → ./src/index
Точка входа пакета

./src/components/ui/Button.tsx

./src/core/ui/Block.tsx

./src/core/variants/spacing.ts

./src/index.ts

dist/index.js
Скомпилированная точка входа пакета

dist/components/ui/Button.js
Скомпилированный компонент
```

**Источники**: [tsconfig.json20-24](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L20-L24)

---

## Конфигурация выходных данных сборки

Конфигурация контролирует, куда записываются скомпилированные файлы и определения типов.

**Таблица настроек вывода**

| Настройка        | Значение | Назначение                         | Ссылка на строку                                                                      |
| ---------------- | -------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| `rootDir`        | `src`    | Корень директории исходников       | [tsconfig.json13](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L13-L13) |
| `outDir`         | `./dist` | Вывод скомпилированного JavaScript | [tsconfig.json19](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L19-L19) |
| `declarationDir` | `./dist` | Вывод определений типов            | [tsconfig.json18](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L18-L18) |

### Корневая директория

Настройка `rootDir: "src"` [tsconfig.json13](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L13-L13) устанавливает `src/` как корень для компиляции. Это обеспечивает соответствие структуры выходной директории исходной:

```
src/
├── index.ts              → dist/index.js + dist/index.d.ts
├── core/
│   └── ui/
│       └── Block.tsx     → dist/core/ui/Block.js + dist/core/ui/Block.d.ts
└── components/
    └── ui/
        └── Button.tsx    → dist/components/ui/Button.js + dist/components/ui/Button.d.ts
```

### Выходная директория

Настройка `outDir: "./dist"` [tsconfig.json19](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L19-L19) записывает скомпилированный JavaScript в `dist/`. Эта директория:

- Включена в NPM-пакет через `"files": ["dist/**/*"]` в [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43)
- Указана в `"main": "./dist/index.js"` в [package.json31](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L31)
- Исключена из системы контроля версий через `.gitignore`
- Генерируется скриптом `npm run build` в [package.json22](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L22)

### Директория объявлений

Настройка `declarationDir: "./dist"` [tsconfig.json18](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L18-L18) записывает файлы `.d.ts` рядом с файлами `.js` в той же структуре директорий. Такое размещение:

- Упрощает распространение пакета (одна папка `dist/`)
- Соответствует ожиданиям потребителей относительно расположения типов
- Обеспечивает запись `"types": "./dist/index.d.ts"` в [package.json32](https://github.com/ui8kit/core/blob/2afe2195/package.json#L32-L32)

**Источники**: [tsconfig.json13](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L13-L13) [tsconfig.json18-19](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L18-L19) [package.json31-32](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L32) [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43)

---

## Шаблоны включения и исключения

Конфигурация указывает, какие файлы компилировать, а какие игнорировать.

**Настройки шаблонов файлов**

```
// Из tsconfig.json:2-3
{
  "include": ["./src"],
  "exclude": ["./lib", "./dist"]
}
```

### Шаблон включения

Настройка `include: ["./src"]` [tsconfig.json2](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L2-L2) компилирует все файлы TypeScript в директории `src/`:

- `src/**/*.ts` - Все файлы TypeScript
- `src/**/*.tsx` - Все файлы React-компонентов
- `src/**/*.json` - JSON-модули (через `resolveJsonModule: true`)

Это охватывает:

- Базовые примитивы в `src/core/ui/`
- Определения вариантов в `src/core/variants/`
- UI-компоненты в `src/components/ui/`
- Шаблоны макетов в `src/layouts/`
- Систему тем в `src/themes/`
- Метаданные реестра в `src/registry.json`

### Шаблон исключения

Настройка `exclude: ["./lib", "./dist"]` [tsconfig.json3](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L3-L3) предотвращает компиляцию:

- `./lib/` - Сгенерированные артефакты, такие как `core-classes.json`, описанные в [Система сборки](#3.6)
- `./dist/` - Ранее скомпилированный вывод для избежания рекурсивной компиляции

**Источники**: [tsconfig.json2-3](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L2-L3)

---

## Специальные опции компилятора

Несколько дополнительных опций настраивают поведение TypeScript для конкретных случаев использования.

**Таблица специальных опций**

| Настройка           | Значение               | Назначение                           | Ссылка на строку                                                                      |
| ------------------- | ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| `types`             | `["bun-types"]`        | Включение типов среды выполнения Bun | [tsconfig.json11](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L11-L11) |
| `resolveJsonModule` | `true`                 | Разрешение импорта JSON-файлов       | [tsconfig.json12](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L12-L12) |
| `esModuleInterop`   | `true`                 | Включение совместимости с CommonJS   | [tsconfig.json9](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L9-L9)    |
| `skipLibCheck`      | `true`                 | Пропуск проверки типов библиотек     | [tsconfig.json10](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L10-L10) |
| `sideEffects`       | `false` (package.json) | Включение tree-shaking               | [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30)   |

### Типы среды выполнения Bun

Настройка `types: ["bun-types"]` [tsconfig.json11](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L11-L11) включает определения типов для среды выполнения Bun. Это обеспечивает:

- Проверку типов для специфичных API Bun
- Поддержку команд `bun` в скриптах, таких как `bunx buildy-ui@latest scan` в [package.json26](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L26)
- Разработку с быстрым транспилятором TypeScript от Bun

Зависимость `bun-types` объявлена в [package.json62](https://github.com/ui8kit/core/blob/2afe2195/package.json#L62-L62)

### Разрешение JSON-модулей

Настройка `resolveJsonModule: true` [tsconfig.json12](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L12-L12) позволяет импортировать JSON-файлы как типизированные модули:

```
// Импорт метаданных реестра с типами
import registry from "@/registry.json";

// TypeScript выводит тип из структуры JSON
const component = registry.registry.find(c => c.name === "button");
```

Это используется для импорта `src/registry.json` во всей кодовой базе, как описано в [Реестр компонентов](#3.7).

### Совместимость с CommonJS

Настройка `esModuleInterop: true` [tsconfig.json9](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L9-L9) обеспечивает беспрепятственный импорт модулей CommonJS в синтаксисе ES-модулей:

```
// Работает, даже если пакет использует module.exports
import cva from "class-variance-authority";
```

Это необходимо для совместимости с зависимостями, такими как `class-variance-authority` и `clsx`, объявленными в [package.json48-53](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L53)

### Проверка типов библиотек

Настройка `skipLibCheck: true` [tsconfig.json10](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L10-L10) пропускает проверку типов файлов `.d.ts` в `node_modules/`. Это:

- Значительно ускоряет компиляцию
- Избегает ошибок от несовместимых типов библиотек
- Фокусирует проверку типов на исходном коде проекта

Библиотека объявляет peer-зависимости для React 18/19 в [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) полагаясь на проекты потребителей для предоставления совместимых версий.

**Источники**: [tsconfig.json9-12](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L9-L12) [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30) [package.json48-53](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L53) [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) [package.json62](https://github.com/ui8kit/core/blob/2afe2195/package.json#L62-L62)

---

## Интеграция со скриптами сборки

Конфигурация TypeScript интегрируется с несколькими скриптами сборки, определенными в `package.json`.

**Диаграмма интеграции скриптов сборки**

```
Вывод/Проверка

Примененные настройки tsconfig.json

Режимы компилятора TypeScript

npm скрипты (package.json)

npm run build
tsc -p tsconfig.json

npm run type-check
tsc --noEmit

npm run lint
eslint src --ext .ts,.tsx

npm run lint:fix
eslint src --ext .ts,.tsx --fix

Полная компиляция
Генерация .js + .d.ts

Только проверка типов
Без выходных файлов

Все 20+ настроек
из tsconfig.json

Строгие проверки типов
strict: true

Генерация объявлений
declaration: true

Разрешение путей
@/* и @ui8kit/core

dist/
Скомпилированные модули

Ошибки типов сообщены
Код выхода 1 при ошибке

Ошибки ESLint
Стандарты кодирования
```

### Скрипт сборки

Команда `npm run build` [package.json22](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L22) выполняет:

```
tsc -p tsconfig.json
```

Это:

1. Читает все настройки из `tsconfig.json`
2. Компилирует `src/**/*.ts` и `src/**/*.tsx` в `dist/`
3. Генерирует определения типов `.d.ts` в `dist/`
4. Применяет преобразования псевдонимов путей
5. Включает строгую проверку типов
6. Завершается с кодом 1, если обнаружены какие-либо ошибки типов

Вывод используется для распространения NPM-пакета, описанного в [Структура пакета](#3.5).

### Скрипт проверки типов

Команда `npm run type-check` [package.json23](https://github.com/ui8kit/core/blob/2afe2195/package.json#L23-L23) выполняет:

```
tsc --noEmit
```

Флаг `--noEmit`:

- Выполняет полную проверку типов без генерации файлов
- Проверяет типы в локальной разработке
- Работает быстрее, чем полная компиляция
- Полезен в CI/CD конвейерах перед развертыванием

Этот скрипт проверяет безопасность типов без накладных расходов на генерацию JavaScript.

### Интеграция скрипта линтинга

Команда `npm run lint` [package.json24](https://github.com/ui8kit/core/blob/2afe2195/package.json#L24-L24) запускает ESLint на файлах TypeScript:

```
eslint src --ext .ts,.tsx
```

ESLint учитывает конфигурацию TypeScript через:

- Понимание псевдонимов путей, определенных в `tsconfig.json`
- Разбор синтаксиса TypeScript (расширения `.ts`, `.tsx`)
- Доступ к информации о типах для продвинутых правил линтинга

Вариант `npm run lint:fix` [package.json25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L25-L25) автоматически исправляет исправимые проблемы.

**Источники**: [package.json22-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L25) [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26)

---

## Резюме

Конфигурация TypeScript в `@ui8kit/core` устанавливает современный, типобезопасный конвейер сборки:

1. **Цель компиляции**: Модули ES2022 с разрешением, дружественным к бандлерам
2. **Генерация типов**: Полные файлы объявлений (`.d.ts`) для интеграции с IDE
3. **Строгая проверка**: Все опции строгого режима включены для безопасности типов
4. **Псевдонимы путей**: `@/*` для внутренних импортов, `@ui8kit/core` для ссылки на пакет
5. **Структура вывода**: Директория `dist/`, отражающая структуру `src/`
6. **Поддержка JSON**: Импорт метаданных реестра как типизированных модулей
7. **Интеграция сборки**: Скрипты для компиляции, проверки типов и линтинга

Эта конфигурация поддерживает трехслойную архитектуру, описанную в [Архитектура](#3), при этом обеспечивая множество методов распространения, описанных в [Структура пакета](#3.5).

**Источники**: [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26) [package.json22-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L25) [package.json30-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L43)