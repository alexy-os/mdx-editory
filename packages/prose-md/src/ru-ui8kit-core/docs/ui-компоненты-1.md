---
{
  "title": "UI-компоненты",
  "generatedAt": "2025-11-04T12:14:44.855Z"
}
---

# UI-компоненты

## Цель и область применения

Данный документ предоставляет полную документацию API для расширенных составных компонентов, расположенных в `src/components/ui/`. Эти компоненты формируют Слой 2 трехуровневой архитектуры, находясь между базовыми примитивами (документированы в [Базовые компоненты](#4.1)) и шаблонами макетов (документированы в [Компоненты макетов](#4.3)).

UI-компоненты расширяют базовые примитивы через **проброс пропсов**, наследуя возможности вариантов и добавляя специфичную для компонента функциональность. Они предоставляют удобный для разработчика API, который устраняет ручное управление className, предоставляя типизированные пропсы вариантов, такие как `p='lg'`, `rounded='md'` и `shadow='sm'`.

Для общих паттернов использования и лучших практик см. [Базовый рабочий процесс](#5.1). Для изучения базовой системы вариантов см. [Система вариантов](#3.2).

---

## Архитектура компонентов

### Позиция Слоя 2 в системе

```
Основа: Варианты CVA (core/variants)

Слой 1: Базовые примитивы (core/ui)

Слой 2: Составные компоненты (components/ui)

API разработчика

импортирует

импортирует

импортирует

расширяет

расширяет

расширяет

компонует

применяет

применяет

применяет

применяет

рендерит с

рендерит с

Использование компонента
JSX с пропсами вариантов

Card.tsx
BaseBadge + варианты

Button.tsx
BaseButton + варианты

Badge.tsx
BaseBadge + варианты

Accordion.tsx
Context + Button

Title.tsx
только варианты

Text.tsx
только варианты

Icon.tsx
обертка lucide-react

Image.tsx
варианты + aspect

Card (примитив)

Button (примитив)

Badge (примитив)

Block

Box

spacingVariants

roundedVariants

shadowVariants

badgeStyleVariants

buttonStyleVariants
```

**Источники:** [src/components/README.md1-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L19) [src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18) Диаграмма 1 из высокоуровневой архитектуры

---

## Паттерн проброса пропсов

### Базовый принцип

UI-компоненты реализуют **проброс пропсов** для расширения базовых примитивов пропсами вариантов. Этот паттерн:

1. Импортирует функции вариантов из `@ui8kit/core`
2. Принимает пропсы вариантов в TypeScript-интерфейсе компонента
3. Применяет варианты, используя утилиту `cn()` с функциями вариантов CVA
4. Пробрасывает остальные пропсы в базовый примитив

```
Результат рендеринга

Логика рендеринга

Определение компонента Badge

Интерфейс BadgeProps
расширяет HTMLAttributes
+ VariantSpacingProps
+ RoundedProps
+ BadgeSizeProps

Импорт вариантов:
spacingVariants
roundedVariants
badgeSizeVariants
badgeStyleVariants

Деструктуризация пропсов:
m, mx, my
rounded, shadow
size, variant

Примитив BaseBadge
из core/ui

Утилита cn() комбинирует:
базовые классы
+ функции вариантов
+ пользовательский className

HTML элемент с:
data-class='badge'
вычисленные Tailwind классы
проброшенные HTML атрибуты
```

**Источники:** [src/components/ui/Badge/Badge.tsx20-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L95) [src/components/README.md10-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L10-L19)

### Пример реализации: компонент Badge

Компонент `Badge` демонстрирует полный паттерн проброса пропсов:

[src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18)

- **Строка 3-18**: Импорт базового примитива `Badge` и функций вариантов (`spacingVariants`, `roundedVariants`, `shadowVariants`, `borderVariants`, `badgeSizeVariants`, `badgeStyleVariants`)

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

- **Строка 20-32**: Интерфейс `BadgeProps` расширяет `HTMLAttributes<HTMLDivElement>` и выбирает конкретные пропсы из интерфейсов вариантов, используя утилиту TypeScript `Pick<>`

[src/components/ui/Badge/Badge.tsx34-55](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L55)

- **Строка 34-55**: Деструктурирует пропсы вариантов (`m`, `mx`, `my`, `rounded`, `shadow`, `border` и т.д.) отдельно от HTML-пропсов

[src/components/ui/Badge/Badge.tsx56-73](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L73)

- **Строка 56-73**: Применяет варианты, используя утилиту `cn()`, комбинируя:

  - Базовые классы компонента (строка 62)
  - Стили фокуса (строка 63)
  - Функции вариантов CVA (строки 65-70)
  - Пользовательский проп `className` (строка 71)

**Источники:** [src/components/ui/Badge/Badge.tsx1-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L95)

---

## Интеграция вариантов

### Категории вариантов, доступные UI-компонентам

UI-компоненты получают доступ к 12 категориям вариантов из базового слоя. Каждый компонент выборочно импортирует только необходимые ему варианты:

| Категория варианта | Пропсы                                                                           | Значения                                                               | Распространенные компоненты |
| ------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------- |
| **Отступы**        | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`                    | Все компоненты              |
| **Скругление**     | `rounded`                                                                        | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`                   | Card, Badge, Button, Image  |
| **Тень**           | `shadow`                                                                         | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                                  | Card, Badge, Image          |
| **Граница**        | `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight`               | `none`, `default`, `border`                                            | Card, Badge                 |
| **Цвета**          | `bg`, `c`, `borderColor`                                                         | Цвета дизайн-системы                                                   | Card, Badge, Title, Text    |
| **Макет**          | `w`, `h`, `minH`, `maxW`, `position`                                             | `auto`, `full`, `screen`, `fit`, `min`, `max`                          | Accordion, Container, Stack |
| **Типографика**    | `size`, `weight`, `align`, `leading`                                             | Свойства шрифта                                                        | Title, Text                 |
| **Стиль Badge**    | `variant`                                                                        | `default`, `secondary`, `destructive`, `outline`, `success`, `warning` | Badge                       |
| **Стиль Button**   | `variant`, `size`, `contentAlign`                                                | Специфичные варианты кнопки                                            | Button                      |
| **Flexbox**        | `gap`, `direction`, `align`, `justify`                                           | Свойства flex                                                          | Group, Stack, AccordionItem |
| **Grid**           | `cols`, `gap`                                                                    | Свойства grid                                                          | Grid, GridCol               |
| **Эффекты**        | Различные визуальные эффекты                                                     | Специфичные для компонента                                             | Множественные               |

**Источники:** [src/components/README.md205-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L205-L222) [.devin/wiki.json20-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L20-L22)

### Поток применения вариантов

```
Вывод рендеринга

Слияние классов

Разрешение вариантов CVA

Обработка компонента

Пропсы разработчика

<Badge
  p='lg'
  rounded='xl'
  shadow='md'
  variant='success'
/>

TypeScript проверяет пропсы
против интерфейса BadgeProps

Деструктурирует пропсы вариантов:
p, rounded, shadow, variant

Разделяет HTML пропсы:
...props

spacingVariants({ p: 'lg' })
→ 'p-8'

roundedVariants({ rounded: 'xl' })
→ 'rounded-xl'

shadowVariants({ shadow: 'md' })
→ 'shadow-md'

badgeStyleVariants({ variant: 'success' })
→ 'bg-green-500...'

Утилита cn() объединяет:
базовые классы + варианты
используя tw-merge

Итоговая строка className

BaseBadge рендерит с:
className
data-class='badge'
HTML пропсы
```

**Источники:** [src/components/ui/Badge/Badge.tsx56-73](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L73) Диаграмма 3 из высокоуровневой архитектуры

---

## Атрибуты data-class

### Назначение и соглашение

Каждый UI-компонент включает атрибут **`data-class`** для консистентного таргетинга DOM и семантической идентификации. Этот паттерн обеспечивает:

- Таргетинг CSS-селекторами без хрупких зависимостей от className
- Селекторы для тестирования, которые остаются стабильными при изменении стилей
- Инспекцию и отладку DOM
- Семантическое понимание структуры компонента

[src/components/README.md223-236](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L236)

### Соглашение об именовании

Атрибут `data-class` следует паттерну именования в **kebab-case**, который отражает иерархию компонентов:

| Компонент   | Главный элемент          | Дочерние элементы                                                              |
| ----------- | ------------------------ | ------------------------------------------------------------------------------ |
| `Card`      | `data-class="card"`      | `card-header`, `card-title`, `card-description`, `card-content`, `card-footer` |
| `Badge`     | `data-class="badge"`     | `badge-dot`, `badge-left-section`, `badge-right-section`                       |
| `Accordion` | `data-class="accordion"` | `accordion-item`, `accordion-trigger`, `accordion-content`                     |
| `Button`    | `data-class="button"`    | `button-left-section`, `button-right-section`                                  |

**Источники:** [src/components/README.md223-236](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L236) [src/components/ui/Badge/Badge.tsx59](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L59-L59)

### Паттерн реализации

[src/components/ui/Badge/Badge.tsx56-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L92)

- **Строка 59**: Корневой компонент получает `data-class="badge"`
- **Строка 77**: Элемент точки получает `data-class="badge-dot"`
- **Строка 82**: Левая секция получает `data-class="badge-left-section"`
- **Строка 88**: Правая секция получает `data-class="badge-right-section"`

[src/components/ui/Accordion/Accordion.tsx64-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L64-L180)

- **Строка 67**: Корневой `Accordion` получает `data-class="accordion"`
- **Строка 108**: `AccordionItem` получает `data-class="accordion-item"`
- **Строка 142**: `AccordionTrigger` получает `data-class="accordion-trigger"`
- **Строка 169**: `AccordionContent` получает `data-class="accordion-content"`

**Источники:** [src/components/ui/Badge/Badge.tsx56-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L92) [src/components/ui/Accordion/Accordion.tsx64-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L64-L180)

---

## Типобезопасность и паттерны TypeScript

### Композиция интерфейсов с помощью Pick<>

UI-компоненты используют утилиту TypeScript `Pick<>` для выборочного включения пропсов вариантов, избегая загрязнения интерфейса:

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

```
export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
    RoundedProps,
    ShadowProps,
    BorderProps,
    BadgeSizeProps,
    BadgeStyleProps {
  // Специфичные для компонента пропсы
}
```

Этот паттерн:

- Предотвращает случайное включение пропсов (например, `Badge` не нужны `p`, `px`, `py`)
- Предоставляет автодополнение только для релевантных пропсов
- Поддерживает типобезопасность в системе вариантов

**Источники:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

### Паттерн ForwardRef

Все UI-компоненты используют `React.forwardRef` для проброса ref к базовым DOM-элементам:

[src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

```
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, className, variant = 'default', ... }, ref) => {
    return (
      <BaseBadge
        ref={ref}
        // ...
      />
    );
  }
);

Badge.displayName = "Badge";
```

[src/components/ui/Accordion/Accordion.tsx34-75](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L75)

```
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", collapsible = false, ... }, ref) => {
    // ...
  }
);
Accordion.displayName = "Accordion";
```

**Источники:** [src/components/ui/Badge/Badge.tsx34-96](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L96) [src/components/ui/Accordion/Accordion.tsx34-75](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L75)

### Компоненты на основе контекста

Сложные компоненты используют React Context для совместного использования состояния между составными компонентами:

```
Пользовательские хуки

Значения контекста

Архитектура компонента Accordion

предоставляет

предоставляет

потребляет через

потребляет через

потребляет через

обращается к

обращается к

Accordion
AccordionContext.Provider

AccordionItem
AccordionItemContext.Provider

AccordionTrigger
useAccordionContext()
useAccordionItemContext()

AccordionContent
useAccordionItemContext()

AccordionContext:
value: string | string[]
onItemClick: function
type: single | multiple
collapsible: boolean

AccordionItemContext:
value: string

useAccordionContext()
проверяет существование контекста
возвращает значение контекста

useAccordionItemContext()
проверяет существование контекста
возвращает значение элемента
```

**Источники:** [src/components/ui/Accordion/Accordion.tsx9-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L89)

[src/components/ui/Accordion/Accordion.tsx9-24](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L24)

- **Строка 9-14**: Определение типа `AccordionContextValue`
- **Строка 16**: Создание контекста
- **Строка 18-24**: Хук `useAccordionContext()` с валидацией

[src/components/ui/Accordion/Accordion.tsx77-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L77-L89)

- **Строка 77-79**: Определение типа `AccordionItemContextValue`
- **Строка 81**: Создание контекста
- **Строка 83-89**: Хук `useAccordionItemContext()` с валидацией

**Источники:** [src/components/ui/Accordion/Accordion.tsx9-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L89)

---

## Каталог компонентов

### Компоненты макетов

#### Block

Компонент-обертка секции с полным контролем стилизации. Семантический контейнер для секций контента.

**Основные пропсы:**

- `component`: HTML-элемент для рендеринга (по умолчанию: `'div'`)
- Поддерживает все варианты отступов, цвета, макета, скругления, тени и границ

**Расположение:** [src/components/ui/Block/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/) (упоминается в [src/components/README.md25-37](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L25-L37))

#### Container

Адаптивный контейнер с предустановками размеров и центрированием.

**Основные пропсы:**

- `size`: `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'full'`
- `centered`: Boolean для центрирования
- Поддерживает варианты отступов и макета

**Расположение:** [src/components/ui/Container/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Container/) (упоминается в [src/components/README.md39-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L39-L50))

#### Stack

Вертикальный flex-макет для расположения элементов друг под другом.

**Основные пропсы:**

- `gap`: Отступ между дочерними элементами
- `align`: Выравнивание (`'start'` | `'center'` | `'end'` | `'stretch'`)
- Поддерживает все варианты отступов и макета

**Расположение:** [src/components/ui/Stack/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Stack/) (упоминается в [src/components/README.md52-64](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L52-L64))

#### Group

Горизонтальный flex-макет для расположения элементов в ряд.

**Основные пропсы:**

- `gap`: Отступ между дочерними элементами
- `align`: Вертикальное выравнивание
- `justify`: Горизонтальное распределение (`'start'` | `'center'` | `'end'` | `'between'` | `'around'`)

**Расположение:** [src/components/ui/Group/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Group/) (упоминается в [src/components/README.md66-78](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L66-L78))

#### Grid

CSS Grid макет с адаптивными предустановками колонок.

**Основные пропсы:**

- `cols`: Адаптивные колонки (`'1'` | `'2'` | `'3'` | `'1-2'` | `'1-2-3'` | `'1-2-3-4'`)
- `gap`: Отступ между элементами сетки
- Поддерживает все варианты отступов и макета

**Подкомпонент:** `GridCol` с пропом `span` для растягивания на несколько колонок

**Расположение:** [src/components/ui/Grid/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Grid/) (упоминается в [src/components/README.md80-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L80-L92))

**Источники:** [src/components/README.md23-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L92)

---

### UI-компоненты

#### Card

Компонент карточки с составной структурой для заголовков, контента и подвалов.

**Структура:**

- `Card`: Корневой контейнер
- `Card.Header` / `CardHeader`: Верхняя секция
- `Card.Title` / `CardTitle`: Заголовок
- `Card.Description` / `CardDescription`: Подзаголовок
- `Card.Content` / `CardContent`: Основная область контента
- `Card.Footer` / `CardFooter`: Нижняя секция

**Основные пропсы:**

- Поддерживает все варианты отступов, скругления, тени, границ и цвета
- Каждый подкомпонент имеет соответствующие атрибуты `data-class`

**Расположение:** [src/components/ui/Card/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card/) (упоминается в [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117))

#### Button

Интерактивная кнопка с вариантами, размерами и состояниями загрузки.

**Основные пропсы:**

- `variant`: `'default'` | `'secondary'` | `'destructive'` | `'outline'` | `'ghost'` | `'link'`
- `size`: `'sm'` | `'default'` | `'lg'` | `'icon'`
- `contentAlign`: `'start'` | `'center'` | `'end'` | `'between'`
- `leftSection`, `rightSection`: Слоты для иконок или контента
- `loading`: Boolean для состояния загрузки
- Поддерживает варианты отступов, скругления и тени

**Расположение:** [src/components/ui/Button/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button/) (упоминается в [src/components/README.md119-133](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L119-L133))

#### Badge

Небольшие индикаторы статуса с точками и секциями.

**Основные пропсы:**

- `variant`: `'default'` | `'secondary'` | `'destructive'` | `'outline'` | `'success'` | `'warning'`
- `size`: `'sm'` | `'default'` | `'lg'`
- `dot`: Boolean для точки статуса
- `leftSection`, `rightSection`: Слоты для контента
- Поддерживает варианты margin, скругления, тени и границ

**Реализация:** [src/components/ui/Badge/Badge.tsx1-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L97)

#### Title

Семантические элементы заголовков с контролем типографики.

**Основные пропсы:**

- `order`: `1` | `2` | `3` | `4` | `5` | `6` (соответствует `h1`-`h6`)
- `size`: Вариант размера шрифта
- `fw`: Вес шрифта
- `c`: Цвет текста
- Поддерживает варианты отступов

**Расположение:** [src/components/ui/Title/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title/) (упоминается в [src/components/README.md150-163](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L150-L163))

#### Text

Текстовые элементы с полным контролем типографики.

**Основные пропсы:**

- `size`: Вариант размера шрифта
- `c`: Цвет текста
- `ta`: Выравнивание текста (`'left'` | `'center'` | `'right'` | `'justify'`)
- `truncate`: Boolean для обрезки текста
- Поддерживает варианты отступов

**Расположение:** [src/components/ui/Text/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text/) (упоминается в [src/components/README.md165-177](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L165-L177))

#### Image

Улучшенный компонент изображения с контролем соотношения сторон и заполнения.

**Основные пропсы:**

- `src`, `alt`: Стандартные атрибуты изображения
- `aspect`: `'square'` | `'video'` | `'portrait'` | `'landscape'`
- `fit`: `'contain'` | `'cover'` | `'fill'` | `'none'`
- Поддерживает варианты скругления и тени

**Расположение:** [src/components/ui/Image/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Image/) (упоминается в [src/components/README.md179-191](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L179-L191))

#### Icon

Обертка иконок для иконок lucide-react с контролем размера и цвета.

**Основные пропсы:**

- `lucideIcon`: Компонент иконки Lucide
- `size`: Вариант размера
- `c`: Вариант цвета
- Поддерживает варианты отступов

**Расположение:** [src/components/ui/Icon/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Icon/) (упоминается в [src/components/README.md193-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L193-L203))

#### Accordion

Раскрывающиеся/сворачивающиеся секции с управлением состоянием.

**Структура:**

- `Accordion`: Корень с контролируемым/неконтролируемым состоянием
- `AccordionItem`: Отдельная сворачиваемая секция
- `AccordionTrigger`: Кликабельный заголовок (использует `Button`)
- `AccordionContent`: Область сворачиваемого контента

**Основные пропсы (Accordion):**

- `type`: `'single'` | `'multiple'`
- `collapsible`: Boolean для закрытия активного элемента
- `value`, `onValueChange`, `defaultValue`: Контроль состояния
- `w`: Вариант ширины

**Основные пропсы (AccordionItem):**

- `value`: Уникальный идентификатор (обязательный)
- `w`: Вариант ширины
- `gap`, `direction`: Варианты flex

**Основные пропсы (AccordionTrigger):**

- Расширяет все `ButtonProps`
- `w`: Вариант ширины (по умолчанию `'full'`)

**Основные пропсы (AccordionContent):**

- `w`: Вариант ширины
- Автоматическая анимация через CSS-переходы

**Реализация:** [src/components/ui/Accordion/Accordion.tsx1-184](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L1-L184)

**Источники:** [src/components/README.md94-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L94-L203) [src/components/ui/Badge/Badge.tsx1-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L97) [src/components/ui/Accordion/Accordion.tsx1-184](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L1-L184)

---

## Справочник универсальных пропсов

Все UI-компоненты поддерживают эти пропсы через систему вариантов CVA:

### Пропсы отступов

| Проп                   | Описание                     | Значения                                            |
| ---------------------- | ---------------------------- | --------------------------------------------------- |
| `p`                    | Padding (все стороны)        | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         |
| `px`                   | Padding по горизонтали       | Такие же как `p`                                    |
| `py`                   | Padding по вертикали         | Такие же как `p`                                    |
| `pt`, `pb`, `pl`, `pr` | Padding для отдельных сторон | Такие же как `p`                                    |
| `m`                    | Margin (все стороны)         | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto` |
| `mx`                   | Margin по горизонтали        | Такие же как `m`                                    |
| `my`                   | Margin по вертикали          | Такие же как `m`                                    |
| `mt`, `mb`, `ml`, `mr` | Margin для отдельных сторон  | Такие же как `m`                                    |

### Визуальные пропсы

| Проп                                                               | Описание      | Значения                                             |
| ------------------------------------------------------------------ | ------------- | ---------------------------------------------------- |
| `rounded`                                                          | Радиус границ | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` |
| `shadow`                                                           | Тень блока    | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                |
| `bg`                                                               | Цвет фона     | Цвета дизайн-системы                                 |
| `c`                                                                | Цвет текста   | Цвета дизайн-системы                                 |
| `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight` | Стили границ  | `none`, `default`, `border`                          |

### Пропсы макета

| Проп       | Описание             | Значения                                            |
| ---------- | -------------------- | --------------------------------------------------- |
| `w`        | Ширина               | `auto`, `full`, `screen`, `fit`, `min`, `max`       |
| `h`        | Высота               | Такие же как `w`                                    |
| `minH`     | Минимальная высота   | Такие же как `w`                                    |
| `maxW`     | Максимальная ширина  | Такие же как `w`                                    |
| `position` | CSS позиционирование | `static`, `relative`, `absolute`, `fixed`, `sticky` |

**Источники:** [src/components/README.md205-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L205-L222)

---

## Паттерны использования

### Базовое использование компонента

```
import { Badge } from '@ui8kit/core';

<Badge 
  variant="success" 
  size="sm" 
  rounded="full"
  m="xs"
  dot
>
  Active
</Badge>
```

### Паттерн составных компонентов

```
import { Card, CardHeader, CardTitle, CardContent } from '@ui8kit/core';

<Card p="lg" rounded="xl" shadow="md" bg="card">
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Компоненты на основе контекста

```
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ui8kit/core';

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Источники:** [src/components/README.md96-133](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L133) [src/components/ui/Accordion/Accordion.tsx34-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L180)

---

## Возможности расширения

### Добавление пользовательских вариантов

Компоненты могут быть расширены дополнительными вариантами путем:

1. Создания новых определений вариантов в `src/core/variants/`
2. Импорта функции варианта и типов
3. Добавления пропсов в интерфейс компонента с использованием `Pick<>`
4. Применения варианта в вызове `cn()`

### Паттерны композиции

UI-компоненты служат строительными блоками для паттернов более высокого уровня:

- **Формы**: Комбинация `Block`, `Stack`, `Group`, `Button` и пользовательских компонентов ввода
- **Отображение данных**: Композиция `Card`, `Title`, `Text`, `Badge`, `Image`
- **Навигация**: Использование `Group`, `Button`, `Icon` для навигационных панелей
- **Секции контента**: Построение с помощью `Block`, `Container`, `Grid`, `Stack`

Для подробных примеров композиции см. [Руководство разработчика](#5) и [Компоненты макетов](#4.3).

**Источники:** [src/components/README.md237-259](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L259) [.devin/wiki.json12-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L12-L14)