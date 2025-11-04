---
{
  "title": "UI-компоненты",
  "generatedAt": "2025-11-04T12:14:43.452Z"
}
---

# UI-компоненты

## Назначение и область применения

Эта страница документирует композитные UI-компоненты **уровня 2**, расположенные в `src/components/ui/`. Эти 15 компонентов предоставляют удобный для разработчиков API, который расширяет базовые примитивы с помощью проброса пропсов, интеграции вариантов и семантических паттернов композиции.

Для документации по базовым примитивам (Box, Block, Grid, Flex, Stack) см. [Базовые компоненты](#3.1). Для системы вариантов, обеспечивающей стилизацию, см. [Система вариантов](#3.2). Для полного справочника API, включая все пропсы, см. [Справочник API UI-компонентов](#4.2).

**Источники:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md1-20](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L20) [.devin/wiki.json75-84](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L75-L84)

---

## Позиция в архитектуре

UI-компоненты занимают **уровень 2** в трёхуровневой архитектуре, располагаясь между базовыми примитивами и шаблонами макетов:

```
Основа: Система вариантов

Уровень 1: Базовые примитивы

Уровень 2: UI-компоненты (Текущий)

расширяет

расширяет

использует

использует

импортирует и применяет

пробрасывает пропсы

пробрасывает пропсы

импортирует и применяет

пробрасывает пропсы

пробрасывает пропсы

пробрасывает пропсы

пробрасывает пропсы

пробрасывает пропсы

Button
src/components/ui/Button

Card + составные части
src/components/ui/Card

Badge
src/components/ui/Badge

Text
src/components/ui/Text

Title
src/components/ui/Title

Icon
src/components/ui/Icon

Image
src/components/ui/Image

Group
src/components/ui/Group

Container
src/components/ui/Container

Sheet
src/components/ui/Sheet

Accordion
src/components/ui/Accordion

BaseButton
src/core/ui/Button

BaseCard
src/core/ui/Card

Box
src/core/ui/Box

Block
src/core/ui/Block

spacingVariants
src/core/variants/spacing.ts

roundedVariants
src/core/variants/rounded.ts

shadowVariants
src/core/variants/shadow.ts

buttonSizeVariants
buttonStyleVariants

badgeSizeVariants
badgeStyleVariants
```

**Источники:** [README.md62-79](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L79) [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19)

---

## Основные принципы

### 1. Архитектура проброса пропсов

UI-компоненты расширяют базовые примитивы, **пробрасывая пропсы вариантов** и добавляя специфичную для компонента функциональность. Этот паттерн позволяет разработчикам использовать пропсы для отступов, макетов и стилизации напрямую без управления `className`:

```
Код разработчика
<Badge p='md' rounded='lg'
variant='success' />

Компонент Badge
src/components/ui/Badge/Badge.tsx

Пропсы вариантов
p, m, rounded, shadow, border

Пропсы компонента
variant, size, dot
leftSection, rightSection

BaseBadge
src/core/ui/Badge

Разрешение CVA
spacingVariants()
roundedVariants()
badgeStyleVariants()

Отрисованный DOM
<div class='inline-flex
p-4 rounded-lg...'
data-class='badge' />
```

**Источники:** [src/components/ui/Badge/Badge.tsx1-96](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L96) [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19)

### 2. Композиция типов TypeScript

Компоненты достигают типобезопасности путём **композиции интерфейсов** из нескольких источников типов вариантов:

```
Интерфейс BadgeProps

React.HTMLAttributes<HTMLDivElement>
Стандартные HTML-пропсы

Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>
Выбранные пропсы отступов

RoundedProps
rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'...

ShadowProps
shadow?: 'none' | 'sm' | 'md' | 'lg'...

BorderProps
border, borderTop, borderBottom...

BadgeSizeProps
size?: 'default' | 'sm' | 'lg'

BadgeStyleProps
variant?: 'default' | 'secondary'...

Пользовательские пропсы
leftSection, rightSection, dot
```

**Источники:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32) [src/components/README.md206-221](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L206-L221)

### 3. Соглашение data-class

Все UI-компоненты применяют **семантические атрибуты `data-class`** для согласованного таргетирования DOM и тестирования. Это соглашение позволяет использовать CSS-селекторы и запросы для тестов без зависимости от динамически генерируемых имён классов:

| Компонент | Корневой data-class      | data-class подкомпонентов                                                      |
| --------- | ------------------------ | ------------------------------------------------------------------------------ |
| Badge     | `data-class="badge"`     | `badge-dot`, `badge-left-section`, `badge-right-section`                       |
| Card      | `data-class="card"`      | `card-header`, `card-title`, `card-description`, `card-content`, `card-footer` |
| Accordion | `data-class="accordion"` | `accordion-item`, `accordion-trigger`, `accordion-content`                     |
| Button    | `data-class="button"`    | `button-left-section`, `button-right-section`                                  |

**Источники:** [src/components/ui/Badge/Badge.tsx59-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L59-L92) [src/components/ui/Accordion/Accordion.tsx67-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L67-L182) [src/components/README.md223-235](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L235)

### 4. Паттерн составных компонентов

Сложные компоненты используют **вложенные подкомпоненты** с общим контекстом для гибкой композиции:

```
Card
Предоставляет контекст стилизации

Card.Header
data-class='card-header'

Card.Title
data-class='card-title'

Card.Description
data-class='card-description'

Card.Content
data-class='card-content'

Card.Footer
data-class='card-footer'

Accordion
Управляет состоянием открытия/закрытия

AccordionContext
value, onItemClick, type

AccordionItem
Предоставляет значение элемента

AccordionItemContext
строка value

AccordionTrigger
Читает контексты, переключает

AccordionContent
Условная отрисовка
```

**Источники:** [src/components/ui/Accordion/Accordion.tsx9-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L182) [README.md17](https://github.com/ui8kit/core/blob/2afe2195/README.md#L17-L17) [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144)

---

## Полный каталог компонентов

Библиотека предоставляет 15 композитных UI-компонентов, организованных по функциональным категориям:

| Компонент     | Расположение                  | Базовый примитив    | Основное назначение                    | Ключевые варианты                                      |
| ------------- | ----------------------------- | ------------------- | -------------------------------------- | ------------------------------------------------------ |
| **Button**    | `src/components/ui/Button`    | `BaseButton`        | Интерактивные действия                 | `buttonStyleVariants`, `buttonSizeVariants`            |
| **Card**      | `src/components/ui/Card`      | `BaseCard`          | Контейнеры для контента                | `spacingVariants`, `roundedVariants`, `shadowVariants` |
| **Badge**     | `src/components/ui/Badge`     | `BaseBadge`         | Индикаторы статуса                     | `badgeSizeVariants`, `badgeStyleVariants`              |
| **Text**      | `src/components/ui/Text`      | `Box`               | Семантические текстовые элементы       | `typographyVariants`, `colorVariants`                  |
| **Title**     | `src/components/ui/Title`     | `Box`               | Иерархия заголовков (h1-h6)            | `typographyVariants`, `colorVariants`                  |
| **Container** | `src/components/ui/Container` | `Block`             | Адаптивные контейнеры                  | `layoutVariants`, `spacingVariants`                    |
| **Icon**      | `src/components/ui/Icon`      | `Box`               | Обёртка для SVG-иконок                 | `colorVariants`, `spacingVariants`                     |
| **Image**     | `src/components/ui/Image`     | `Box`               | Оптимизированные изображения           | `roundedVariants`, `shadowVariants`, `layoutVariants`  |
| **Group**     | `src/components/ui/Group`     | `Flex`              | Горизонтальная группировка             | `flexVariants`, `spacingVariants`                      |
| **Stack**     | `src/components/ui/Stack`     | `Flex`              | Вертикальное/горизонтальное размещение | `flexVariants`, `spacingVariants`                      |
| **Grid**      | `src/components/ui/Grid`      | `Grid`              | CSS Grid макеты                        | `gridVariants`, `spacingVariants`                      |
| **Sheet**     | `src/components/ui/Sheet`     | `Block`             | Выдвижные панели/шиты                  | `layoutVariants`, `shadowVariants`                     |
| **Accordion** | `src/components/ui/Accordion` | На основе контекста | Раскрывающиеся секции                  | `flexVariants`, `layoutVariants`                       |
| **Flex**      | `src/components/ui/Flex`      | `Flex`              | Flexbox макеты                         | `flexVariants`, `spacingVariants`                      |
| **Block**     | `src/components/ui/Block`     | `Block`             | Семантические секции                   | Все варианты через проброс                             |

**Источники:** [README.md370-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L370-L386) [src/components/README.md21-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L21-L203)

---

## Реализация проброса пропсов

### Паттерн деструктуризации и проброса

UI-компоненты используют согласованный паттерн для проброса пропсов, проиллюстрированный реализацией Badge:

```
Объект пропсов Badge
{variant, size, rounded,
m, mx, my, shadow,
border, className, ...rest}

Деструктуризация пропсов
Извлечение известных пропсов
Сбор ...rest

Применение вариантов CVA
badgeStyleVariants({variant})
badgeSizeVariants({size})
spacingVariants({m, mx, my})
roundedVariants({rounded})
shadowVariants({shadow})

Слияние с cn()
Базовые классы +
классы вариантов +
пользовательский className

Проброс в BaseBadge
className={merged}
...rest пропсы
```

**Пример реализации из Badge:**

[src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

Ключевые характеристики:

1. **Выборочная деструктуризация** - Извлечение только тех пропсов вариантов, которые использует компонент
2. **Оператор spread** - Сбор оставшихся HTML-атрибутов в `...props`
3. **Разрешение CVA** - Применение каждой функции варианта с соответствующим пропсом
4. **Слияние классов** - Использование утилиты `cn()` для слияния всех строк классов
5. **Проброс** - Передача объединённого className и распакованных пропсов в базовый компонент

**Источники:** [src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

---

## Паттерны интеграции вариантов

### Мультивариантная композиция

Компоненты обычно интегрируют 3-7 категорий вариантов одновременно:

```
Пропсы компонента
(например, Card, Badge, Button)

Базовые варианты стилизации

spacingVariants
p, px, py, m, mx, my

roundedVariants
rounded: 'none' до 'full'

shadowVariants
shadow: 'none' до '2xl'

borderVariants
border, borderTop, и т.д.

Специфичные для компонента варианты

sizeVariants
size: 'sm' | 'md' | 'lg'

styleVariants
variant: 'default' | 'primary'...

Варианты макета

layoutVariants
w: 'full' | 'auto' | 'fit'
```

### Паттерн импорта и применения

Каждый UI-компонент следует этой структуре импорта:

```
// 1. Импорт базового примитива
import { Badge as BaseBadge } from "@ui8kit/core";

// 2. Импорт функций вариантов
import {
  spacingVariants,
  roundedVariants,
  shadowVariants,
  borderVariants,
  badgeSizeVariants,    // Специфичный для компонента
  badgeStyleVariants,   // Специфичный для компонента
} from "@ui8kit/core";

// 3. Импорт типов пропсов вариантов
import type {
  VariantSpacingProps,
  RoundedProps,
  ShadowProps,
  BorderProps,
  BadgeSizeProps,
  BadgeStyleProps,
} from "@ui8kit/core";

// 4. Импорт утилиты cn для слияния классов
import { cn } from "@ui8kit/core";
```

**Источники:** [src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18) [src/components/ui/Accordion/Accordion.tsx5-7](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L5-L7)

---

## Архитектура типобезопасности

### Стратегия композиции интерфейсов

UI-компоненты составляют свои TypeScript-интерфейсы из нескольких источников, используя утилитные типы `Pick` для выборочного включения пропсов:

```
Интерфейс пропсов компонента

Базовый HTML интерфейс
React.HTMLAttributes<T>
onClick, onMouseEnter, и т.д.

Выборочные пропсы вариантов

Pick<VariantSpacingProps,
'p' | 'px' | 'py' | 'm'>

Pick<VariantLayoutProps,
'w' | 'h'>

Pick<VariantFlexProps,
'gap' | 'direction'>

Полные пропсы вариантов

RoundedProps
Все значения rounded

ShadowProps
Все значения shadow

Специфичные для компонента пропсы

Пользовательский интерфейс
leftSection?: ReactNode
rightSection?: ReactNode
dot?: boolean
```

### Пример: композиция типов Badge

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

Этот паттерн достигает:

- **Выборочное включение** - Экспонировать только необходимые пропсы отступов (m, mx, my), а не все пропсы padding
- **Наследование типов** - Расширить базовые HTML-пропсы для обработчиков событий
- **Интеграцию вариантов** - Включить все пропсы из интерфейсов вариантов
- **Пользовательское расширение** - Добавить специфичные для компонента пропсы (leftSection, rightSection, dot)

### Пример: композиция типов Accordion

[src/components/ui/Accordion/Accordion.tsx26-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L26-L32) [src/components/ui/Accordion/Accordion.tsx91-93](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L91-L93)

Демонстрирует:

- **Контролируемый/неконтролируемый** - Поддержку обоих паттернов значения
- **Выборочную ширину** - Выбор только `w` из вариантов макета
- **Типизацию контекста** - Типобезопасные значения контекста для составных компонентов

**Источники:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32) [src/components/ui/Accordion/Accordion.tsx26-93](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L26-L93)

---

## Реализация составных компонентов

### Разделение состояния на основе контекста

Сложные компоненты, такие как Accordion, используют React Context для управления состоянием между подкомпонентами:

```
Корневой компонент
(Accordion, Sheet)

Провайдер контекста
value={{state, actions}}

Подкомпонент 1
(AccordionItem)

Подкомпонент 2
(AccordionTrigger)

Подкомпонент 3
(AccordionContent)

Хук useContext
Доступ к состоянию

Хук useContext
Доступ к действиям

Хук useContext
Доступ к состоянию
```

### Паттерн реализации Accordion

Компонент Accordion демонстрирует двухуровневую иерархию контекста:

1. **AccordionContext** - Управляет глобальным состоянием аккордеона (открытые элементы, обработчики кликов)

   - [src/components/ui/Accordion/Accordion.tsx9-24](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L24)

2. **AccordionItemContext** - Предоставляет специфичное для элемента значение триггерам/контенту

   - [src/components/ui/Accordion/Accordion.tsx77-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L77-L89)

3. **Управление состоянием** - Поддерживает контролируемый и неконтролируемый режимы

   - [src/components/ui/Accordion/Accordion.tsx36-60](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L36-L60)

4. **Координация подкомпонентов** - Триггер читает контекст для переключения, контент читает для отрисовки

   - [src/components/ui/Accordion/Accordion.tsx125-153](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L125-L153)
   - [src/components/ui/Accordion/Accordion.tsx157-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L157-L182)

**Источники:** [src/components/ui/Accordion/Accordion.tsx9-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L182)

### Паттерн составного Card

Card использует более простой паттерн без контекста, опираясь на композицию пропсов:

```
Card (корневой контейнер с вариантами)
├── Card.Header (семантическая секция заголовка)
│   ├── Card.Title (элемент заголовка)
│   └── Card.Description (приглушённый текст)
├── Card.Content (основная область контента)
└── Card.Footer (область действий)
```

Каждый подкомпонент:

- Получает все пропсы вариантов независимо
- Применяет семантические атрибуты `data-class`
- Пробрасывает refs для доступа к DOM
- Расширяет базовые примитивы

**Источники:** [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144) [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117)

---

## Паттерны использования

### Базовое использование компонентов

Простые компоненты с пропсами вариантов:

```
// Badge с вариантами
<Badge 
  variant="success" 
  size="sm" 
  rounded="full"
  m="xs"
  dot
>
  Active
</Badge>

// Button с секциями и вариантами
<Button 
  variant="primary" 
  size="lg"
  rounded="md"
  shadow="sm"
  leftSection={<Icon lucideIcon={Heart} />}
>
  Save
</Button>
```

### Композиция составных компонентов

Сложные компоненты с вложенной структурой:

```
// Card со всеми подкомпонентами
<Card p="lg" rounded="xl" shadow="md" bg="card">
  <Card.Header>
    <Card.Title>Dashboard</Card.Title>
    <Card.Description>Overview of your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <Stack gap="md">
      {/* Контент здесь */}
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Group gap="md" justify="end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </Group>
  </Card.Footer>
</Card>

// Accordion с управлением состоянием
<Accordion type="single" collapsible w="full">
  <AccordionItem value="item-1" gap="sm">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" gap="sm">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Использование компонентов макета

Адаптивные макеты с пропсами вариантов:

```
// Container с размерами
<Container size="lg" px="md" centered>
  <Stack gap="xl" align="stretch">
    {/* Контент страницы */}
  </Stack>
</Container>

// Макет Grid
<Grid cols="1-2-3" gap="lg" p="md">
  <GridCol span={2}>Wide content</GridCol>
  <GridCol>Regular content</GridCol>
</Grid>

// Group для горизонтального макета
<Group gap="md" align="center" justify="between">
  <Title order={2}>Page Title</Title>
  <Button>Action</Button>
</Group>
```

**Источники:** [README.md121-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L121-L145) [src/components/README.md23-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L203)

---

## Интеграция с базовыми примитивами

UI-компоненты расширяют базовые примитивы, сохраняя тот же API пропсов вариантов:

| UI-компонент | Расширяет примитив | Добавленные возможности                                             |
| ------------ | ------------------ | ------------------------------------------------------------------- |
| Button       | BaseButton         | Варианты размера, варианты стиля, состояние загрузки, секции иконок |
| Badge        | BaseBadge          | Варианты размера, варианты стиля, индикатор точки, секции иконок    |
| Card         | BaseCard           | Составная структура (Header, Content, Footer, Title, Description)   |
| Text         | Box                | Семантические текстовые элементы (p, span, em, strong), усечение    |
| Title        | Box                | Иерархия заголовков (h1-h6), семантический проп order               |
| Container    | Block              | Предустановки адаптивных размеров, проп centered                    |
| Icon         | Box                | Интеграция Lucide-иконок, масштабирование размера                   |
| Group        | Flex               | Горизонтальные значения по умолчанию, упрощённые justify/align      |
| Stack        | Flex               | Вертикальное/горизонтальное размещение, упрощённый проп gap         |

Отношение наследования обеспечивает:

1. **Повторное использование вариантов** - Все варианты отступов, макета, цветов из примитивов
2. **Проброс refs** - Доступ к базовым DOM-элементам через forwardRef
3. **HTML-атрибуты** - Все стандартные HTML-пропсы проходят через
4. **Типобезопасность** - Полная поддержка TypeScript через цепочку композиции

**Источники:** [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19) [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103)

---

## Лучшие практики

### 1. Предпочитайте варианты вместо className

Используйте пропсы вариантов вместо ручного `className` для согласованности:

```
// ❌ Избегайте
<Badge className="px-4 py-2 rounded-lg shadow-md">Status</Badge>

// ✅ Предпочтительно
<Badge px="md" py="sm" rounded="lg" shadow="md">Status</Badge>
```

### 2. Используйте data-class для пользовательской стилизации

Таргетируйте компоненты через атрибуты `data-class` в пользовательском CSS:

```
/* ✅ Стабильный селектор */
[data-class="badge"] {
  /* Пользовательские стили */
}

[data-class="card-header"] {
  /* Стили для заголовка */
}
```

### 3. Используйте составные компоненты

Используйте подкомпоненты для семантической структуры:

```
// ✅ Семантично и гибко
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ Менее семантично
<Card>
  <div className="header">
    <h3>Title</h3>
  </div>
  <div>Content</div>
</Card>
```

### 4. Применяйте типобезопасность

Используйте TypeScript-интерфейсы для валидации пропсов:

```
// Интерфейс пропсов компонента обеспечивает типобезопасность
interface MyComponentProps {
  badge: BadgeProps;
  onAction: () => void;
}

export function MyComponent({ badge, onAction }: MyComponentProps) {
  return (
    <Card p="lg">
      <Badge {...badge} />
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
}
```

**Источники:** [src/components/README.md237-258](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L258) [.devin/wiki.json200-209](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L200-L209)

---

## Резюме

UI-компоненты на уровне 2 предоставляют:

- **15 композитных компонентов**, охватывающих общие UI-паттерны
- **Проброс пропсов** от базовых примитивов к пользовательскому API
- **Типобезопасность** через составленные TypeScript-интерфейсы
- **Интеграцию вариантов** через 12 переиспользуемых категорий вариантов
- **Соглашение data-class** для стабильного таргетирования DOM
- **Составные паттерны** для гибкой композиции
- **Семантический HTML** со встроенной доступностью

Эта архитектура достигает цели библиотеки — построения сложных интерфейсов с минимальным кодом при сохранении типобезопасности, гибкости и согласованности.

Для подробной документации API по каждому компоненту см. [Справочник API UI-компонентов](#4.2). Для примеров использования и рабочих процессов см. [Базовый рабочий процесс](#5.1).

**Источники:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md1-258](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L258) [.devin/wiki.json75-84](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L75-L84)