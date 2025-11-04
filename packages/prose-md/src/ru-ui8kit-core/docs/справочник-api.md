---
{
  "title": "Справочник API",
  "generatedAt": "2025-11-04T12:14:44.398Z"
}
---

# Справочник API

Этот документ предоставляет исчерпывающий справочник по всем экспортируемым API из библиотеки `@ui8kit/core`. Он охватывает экспорт компонентов, свойства вариантов, интерфейсы TypeScript и соглашения об именовании, используемые во всей кодовой базе.

Для архитектурного контекста и взаимосвязей компонентов см. [Архитектура](#3). Для подробной документации API отдельных компонентов см. подразделы: [Базовые компоненты](#4.1), [UI-компоненты](#4.2) и [Компоненты макетов](#4.3). Для паттернов использования и примеров см. [Руководство разработчика](#5).

## Структура экспорта

Библиотека следует плоской структуре экспорта из [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) Все компоненты, варианты, хуки и утилиты реэкспортируются из этой единственной точки входа для упрощения импортов.

```
Вспомогательные хуки

Система тем

Экспорт вариантов

Компоненты макетов

UI-компоненты

Базовые примитивы

Точка входа пакета

src/index.ts
Основной бочонок экспорта

Block
BlockProps

Box
BoxProps

Grid
GridProps

Flex
FlexProps

Stack
StackProps

Button
BaseButtonProps

Card + Card.Header/Content/Footer
CardProps, CardHeaderProps

Text
TextProps

Title
TitleProps

Badge
BadgeProps

Container
ContainerProps

Icon
IconProps

Image
ImageProps

Group
GroupProps

Sheet
SheetProps

Accordion
AccordionProps

DashLayout
DashLayoutProps

LayoutBlock
LayoutBlockProps

SplitBlock
SplitBlockProps

spacingVariants
marginVariants, paddingVariants

backgroundColorVariants
textColorVariants, borderColorVariants

widthVariants, heightVariants
positionVariants

fontSizeVariants, fontWeightVariants
textAlignVariants, lineHeightVariants

roundedVariants, shadowVariants
borderVariants

ThemeProvider
ThemeProviderProps

useTheme()
ThemeContextValue

modernUITheme
ThemeConfig

useMediaQuery(query)
boolean

useMobile()
boolean

useViewport()
ViewportSize
```

**Источники:** [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md362-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L362-L386) [.devin/wiki.json136-139](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L136-L139)

## Каталог экспортируемых компонентов

Следующая таблица документирует все экспорты компонентов с их исходными расположениями и интерфейсами TypeScript:

| Имя экспорта       | Тип       | Исходный файл                                                                                                   | Интерфейс свойств      | Описание                                                     |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------ |
| `Block`            | Компонент | [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx)                     | `BlockProps`           | Семантический блочный контейнер с поддержкой элементов HTML5 |
| `Box`              | Компонент | [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx)                         | `BoxProps`             | Гибкий примитив с полной поддержкой вариантов                |
| `Grid`             | Компонент | [src/core/ui/Grid.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Grid.tsx)                       | `GridProps`            | Примитив макета CSS Grid                                     |
| `Flex`             | Компонент | [src/core/ui/Flex.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Flex.tsx)                       | `FlexProps`            | Примитив макета Flexbox                                      |
| `Stack`            | Компонент | [src/core/ui/Stack.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Stack.tsx)                     | `StackProps`           | Вертикальное/горизонтальное расположение с промежутками      |
| `Button`           | Компонент | [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx)       | `BaseButtonProps`      | Кнопка действия с вариантами                                 |
| `Card`             | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardProps`            | Гибкая карточка с составными частями                         |
| `Card.Header`      | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardHeaderProps`      | Секция заголовка карточки                                    |
| `Card.Content`     | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardContentProps`     | Секция содержимого карточки                                  |
| `Card.Footer`      | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardFooterProps`      | Секция подвала карточки                                      |
| `Card.Title`       | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardTitleProps`       | Элемент заголовка карточки                                   |
| `Card.Description` | Компонент | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardDescriptionProps` | Текст описания карточки                                      |
| `Text`             | Компонент | [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx)           | `TextProps`            | Семантическая отрисовка текста                               |
| `Title`            | Компонент | [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx)         | `TitleProps`           | Иерархия заголовков (h1-h6)                                  |
| `Badge`            | Компонент | [src/components/ui/Badge.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge.tsx)         | `BadgeProps`           | Компонент небольшой метки                                    |
| `Container`        | Компонент | [src/components/ui/Container.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Container.tsx) | `ContainerProps`       | Адаптивный контейнер                                         |
| `Icon`             | Компонент | [src/components/ui/Icon.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Icon.tsx)           | `IconProps`            | Обертка для SVG-иконок                                       |
| `Image`            | Компонент | [src/components/ui/Image.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Image.tsx)         | `ImageProps`           | Оптимизированный компонент изображения                       |
| `Group`            | Компонент | [src/components/ui/Group.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Group.tsx)         | `GroupProps`           | Группировка связанных элементов                              |
| `Sheet`            | Компонент | [src/components/ui/Sheet.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Sheet.tsx)         | `SheetProps`           | Компонент выдвижной панели                                   |
| `Accordion`        | Компонент | [src/components/ui/Accordion.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion.tsx) | `AccordionProps`       | Раскрывающиеся секции содержимого                            |
| `DashLayout`       | Компонент | [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx)           | `DashLayoutProps`      | Шаблон макета дашборда                                       |
| `LayoutBlock`      | Компонент | [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)         | `LayoutBlockProps`     | Гибкий макет блока содержимого                               |
| `SplitBlock`       | Компонент | [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)           | `SplitBlockProps`      | Макет с двумя колонками                                      |

**Источники:** [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md362-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L362-L386) [src/registry.json2-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L244)

## API системы вариантов

Система вариантов предоставляет 12 компонуемых категорий свойств, которые применяются ко всем компонентам через движок CVA (class-variance-authority). Каждая категория вариантов сопоставляется с конкретными типами TypeScript и утилитарными классами Tailwind CSS.

### Типы свойств вариантов

```
Исходные файлы

Варианты эффектов

Варианты типографики

Варианты макета

Варианты цветов

Варианты отступов

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

определено в

p, px, py, pt, pb, pl, pr
Тип: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

m, mx, my, mt, mb, ml, mr
Тип: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto'

bg
Тип: 'background' | 'card' | 'primary' | 'secondary' | и др.

c
Тип: 'foreground' | 'primary' | 'secondary' | 'muted' | и др.

borderColor
Тип: 'border' | 'input' | 'primary' | и др.

w
Тип: 'auto' | 'full' | 'screen' | 'fit' | 'min' | 'max'

h, minH
Тип: 'auto' | 'full' | 'screen' | 'fit' | 'min'

maxW
Тип: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | и др.

position
Тип: 'relative' | 'absolute' | 'fixed' | 'sticky'

size
Тип: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | и др.

weight
Тип: 'normal' | 'medium' | 'semibold' | 'bold'

align
Тип: 'left' | 'center' | 'right' | 'justify'

leading
Тип: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

rounded
Тип: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

shadow
Тип: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

border
Тип: '1px solid border' | '2px solid border' | и др.

src/core/variants/spacing.ts
paddingVariants, marginVariants

src/core/variants/colors.ts
backgroundColorVariants, textColorVariants

src/core/variants/layout.ts
widthVariants, heightVariants, positionVariants

src/core/variants/typography.ts
fontSizeVariants, fontWeightVariants

src/core/variants/effects.ts
roundedVariants, shadowVariants, borderVariants
```

**Источники:** [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

### Справочная таблица свойств вариантов

| Категория варианта       | Свойства                                | Допустимые значения                                                                                    | Имя экспорта              | Исходный файл                                                                                                   |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Внутренние отступы**   | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | `'none'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`                                              | `paddingVariants`         | [src/core/variants/spacing.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/spacing.ts)       |
| **Внешние отступы**      | `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `'none'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'auto'`                                    | `marginVariants`          | [src/core/variants/spacing.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/spacing.ts)       |
| **Фон**                  | `bg`                                    | `'background'`, `'card'`, `'primary'`, `'secondary'`, `'destructive'`, `'muted'`, `'accent'`           | `backgroundColorVariants` | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Цвет текста**          | `c`                                     | `'foreground'`, `'primary'`, `'secondary'`, `'muted'`, `'accent'`, `'destructive'`                     | `textColorVariants`       | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Цвет границы**         | `borderColor`                           | `'border'`, `'input'`, `'primary'`, `'secondary'`, `'destructive'`                                     | `borderColorVariants`     | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Ширина**               | `w`                                     | `'auto'`, `'full'`, `'screen'`, `'fit'`, `'min'`, `'max'`                                              | `widthVariants`           | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Высота**               | `h`, `minH`                             | `'auto'`, `'full'`, `'screen'`, `'fit'`, `'min'`                                                       | `heightVariants`          | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Максимальная ширина**  | `maxW`                                  | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'6xl'`, `'7xl'`, `'full'` | `maxWidthVariants`        | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Позиционирование**     | `position`                              | `'relative'`, `'absolute'`, `'fixed'`, `'sticky'`                                                      | `positionVariants`        | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Размер шрифта**        | `size`                                  | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`                             | `fontSizeVariants`        | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Толщина шрифта**       | `weight`                                | `'normal'`, `'medium'`, `'semibold'`, `'bold'`                                                         | `fontWeightVariants`      | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Выравнивание текста**  | `align`                                 | `'left'`, `'center'`, `'right'`, `'justify'`                                                           | `textAlignVariants`       | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Межстрочный интервал** | `leading`                               | `'none'`, `'tight'`, `'snug'`, `'normal'`, `'relaxed'`, `'loose'`                                      | `lineHeightVariants`      | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Закругление**          | `rounded`                               | `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'full'`                                            | `roundedVariants`         | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |
| **Тень**                 | `shadow`                                | `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`                                                      | `shadowVariants`          | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |
| **Граница**              | `border`                                | `'1px solid border'`, `'2px solid border'`, `'default'`                                                | `borderVariants`          | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |

**Источники:** [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) [README.md174-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L174-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

## Паттерн пробрасывания свойств

Компоненты в библиотеке реализуют последовательный паттерн пробрасывания свойств, где составные компоненты расширяют базовые примитивы дополнительными свойствами вариантов. Это создает типобезопасную цепочку наследования.

```
Вывод

Разрешение вариантов

Слой примитива

Слой компонента

API разработчика

пробрасывает отступы и эффекты

применяет варианты кнопки

применяет базовые варианты

  p='md'
  rounded='lg'
  variant='primary'
  size='md'
/>

Button
src/components/ui/Button.tsx

BaseButtonProps расширяет
- ButtonHTMLAttributes
- Варианты отступов
- Варианты эффектов
- Пользовательские: variant, size

Box
src/core/ui/Box.tsx

BoxProps расширяет
- HTMLAttributes
- Все свойства вариантов
- свойство component

Движок CVA
class-variance-authority

Сгенерированные классы:
'p-4 rounded-lg'
+ специфичные классы кнопки

  class='...'
  data-class='button'
/>
```

**Источники:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14) [README.md14-17](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L17)

### Примеры пробрасывания свойств

Следующие примеры демонстрируют, как свойства вариантов пробрасываются от составных компонентов к их базовым примитивам:

**Button расширяет Box:**

```
// Button получает варианты отступов и эффектов от Box
<Button 
  p="md"           // пробрасывается в Box → paddingVariants
  rounded="lg"     // пробрасывается в Box → roundedVariants
  variant="primary" // специфичное для Button свойство
  size="md"        // специфичное для Button свойство
/>
```

**Card расширяет Block:**

```
// Card получает все варианты Block
<Card 
  p="xl"           // пробрасывается в Block → paddingVariants
  shadow="md"      // пробрасывается в Block → shadowVariants
  rounded="2xl"    // пробрасывается в Block → roundedVariants
  bg="card"        // пробрасывается в Block → backgroundColorVariants
/>
```

**Text расширяет Box:**

```
// Text получает варианты Box плюс варианты типографики
<Text 
  size="lg"        // специфичный для Text вариант типографики
  weight="bold"    // специфичный для Text вариант типографики
  c="primary"      // пробрасывается в Box → textColorVariants
  mb="md"          // пробрасывается в Box → marginVariants
/>
```

**Источники:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx) [README.md38-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L60)

## Система типов TypeScript

Библиотека предоставляет всестороннюю поддержку TypeScript с точными определениями типов для всех компонентов, вариантов и утилит.

### Иерархия базовых типов

```
Свойства компонентов макетов

Свойства UI-компонентов

Свойства базовых компонентов

Типы вариантов

Базовые типы

React.HTMLAttributes

React.ComponentPropsWithRef

React.ForwardRefExoticComponent

SpacingProps
из paddingVariants, marginVariants
VariantProps

ColorProps
из backgroundColorVariants, textColorVariants
VariantProps

LayoutProps
из widthVariants, heightVariants
VariantProps

TypographyProps
из fontSizeVariants, fontWeightVariants
VariantProps

EffectsProps
из roundedVariants, shadowVariants
VariantProps

BoxProps расширяет
HTMLAttributes & SpacingProps
& ColorProps & LayoutProps
& EffectsProps & TypographyProps

BlockProps расширяет
BoxProps & { component?: 'section' | 'article' | ... }

GridProps расширяет
BlockProps & { cols?: number, gap?: string }

FlexProps расширяет
BoxProps & { direction?: 'row' | 'column' }

StackProps расширяет
BoxProps & { gap?: string, direction?: 'vertical' | 'horizontal' }

BaseButtonProps расширяет
ButtonHTMLAttributes & SpacingProps
& EffectsProps & { variant, size, ... }

CardProps расширяет
BlockProps & { variant?: string }

TextProps расширяет
BoxProps & TypographyProps
& { as?: 'p' | 'span' | ... }

TitleProps расширяет
BoxProps & TypographyProps
& { order: 1 | 2 | 3 | 4 | 5 | 6 }

DashLayoutProps расширяет
{ sidebar, header, children, ... }

LayoutBlockProps расширяет
BlockProps & { layout?: 'default' | 'grid' | 'flex' }

SplitBlockProps расширяет
{ left, right, ratio?, ... }
```

**Источники:** [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx) [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/layouts/](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/)

### Общие паттерны типов

| Паттерн                  | Описание                                                                                           | Пример интерфейса                                                                                   | Источник                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Свойства вариантов**   | Свойства, извлеченные из определений вариантов CVA с использованием `VariantProps<typeof variant>` | `VariantProps<typeof paddingVariants>`                                                              | [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/)                   |
| **Свойство Component**   | Тип объединения, позволяющий выбор семантического HTML-элемента                                    | `component?: 'section' \| 'article' \| 'nav' \| 'header' \| 'footer' \| 'aside' \| 'main' \| 'div'` | [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx)             |
| **Свойство As**          | Тип объединения для полиморфной отрисовки текста                                                   | `as?: 'p' \| 'span' \| 'div' \| 'em' \| 'strong' \| 'small'`                                        | [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx)   |
| **Свойство Order**       | Числовой литеральный тип для уровней заголовков                                                    | `order: 1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                 | [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx) |
| **Пробрасывание Ref**    | `ForwardRefExoticComponent` с `ComponentPropsWithRef`                                              | `React.forwardRef<HTMLDivElement, BoxProps>`                                                        | [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx)                 |
| **Составные компоненты** | Паттерн пространства имен для связанных частей компонента                                          | `Card.Header`, `Card.Content`, `Card.Footer`                                                        | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)   |

**Источники:** [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## Общие свойства компонентов

Все компоненты в библиотеке разделяют последовательный набор базовых свойств, унаследованных от HTML-атрибутов React и системы вариантов.

### Стандартные React-свойства

| Свойство    | Тип                | Описание                                                               | Унаследовано от         |
| ----------- | ------------------ | ---------------------------------------------------------------------- | ----------------------- |
| `className` | `string`           | Дополнительные CSS-классы для объединения со сгенерированными классами | `HTMLAttributes`        |
| `style`     | `CSSProperties`    | Встроенные стили                                                       | `HTMLAttributes`        |
| `children`  | `ReactNode`        | Дочерние элементы для отрисовки                                        | `HTMLAttributes`        |
| `ref`       | `Ref<HTMLElement>` | Ссылка на базовый DOM-элемент                                          | `ComponentPropsWithRef` |
| `data-*`    | `string`           | Атрибуты данных для таргетирования DOM                                 | `HTMLAttributes`        |
| `aria-*`    | `string`           | Атрибуты доступности                                                   | `HTMLAttributes`        |

### Пользовательские свойства компонентов

| Свойство     | Тип                                                                                     | По умолчанию   | Описание                                        | Доступность     |
| ------------ | --------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------- | --------------- |
| `component`  | `'section' \| 'article' \| 'nav' \| 'header' \| 'footer' \| 'aside' \| 'main' \| 'div'` | `'div'`        | Семантический HTML-элемент для отрисовки        | `Block`, `Grid` |
| `as`         | `'p' \| 'span' \| 'div' \| 'em' \| 'strong' \| 'small'`                                 | `'p'`          | Тип текстового элемента                         | `Text`          |
| `order`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                            | Обязательно    | Уровень заголовка                               | `Title`         |
| `data-class` | `string`                                                                                | Имя компонента | Идентификатор компонента для таргетирования DOM | Все компоненты  |

**Источники:** [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx) [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx) [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## API системы тем

Система тем предоставляет поддержку темной темы, настройки доступности и сохранение темы через React Context.

### Провайдер темы

```
// Экспорт: ThemeProvider
// Интерфейс: ThemeProviderProps
interface ThemeProviderProps {
  theme: ThemeConfig;
  children: ReactNode;
  defaultMode?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

// Экспорт: useTheme
// Возвращает: ThemeContextValue
interface ThemeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  preferences: ThemePreferences;
  updatePreferences: (preferences: Partial<ThemePreferences>) => void;
}

// Экспорт: modernUITheme
// Тип: ThemeConfig
interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  author: string;
  version: string;
  colors: ColorScheme;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  effects: EffectsConfig;
}
```

**Источники:** [src/themes/providers/ThemeProvider.tsx1-109](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L109) [src/themes/modern-ui.ts](https://github.com/ui8kit/core/blob/2afe2195/src/themes/modern-ui.ts) [README.md219-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L249)

## API вспомогательных хуков

Библиотека экспортирует утилиты адаптивного дизайна для определения области просмотра и медиа-запросов.

| Хук             | Параметры       | Возвращаемый тип                    | Описание                                         | Источник                                                                                                      |
| --------------- | --------------- | ----------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `useMediaQuery` | `query: string` | `boolean`                           | Соответствует CSS медиа-запросу                  | [src/lib/hooks/useMediaQuery.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useMediaQuery.ts) |
| `useMobile`     | Нет             | `boolean`                           | Определяет мобильную область просмотра (< 768px) | [src/lib/hooks/useMobile.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useMobile.ts)         |
| `useViewport`   | Нет             | `{ width: number, height: number }` | Возвращает текущие размеры области просмотра     | [src/lib/hooks/useViewport.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useViewport.ts)     |

**Пример использования:**

```
import { useMediaQuery, useMobile, useViewport } from '@ui8kit/core';

function ResponsiveComponent() {
  const isMobile = useMobile();
  const isSmall = useMediaQuery('(max-width: 640px)');
  const { width, height } = useViewport();
  
  return <Box>{isMobile ? 'Мобильная' : 'Десктопная'}</Box>;
}
```

**Источники:** [src/lib/hooks/](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/) [README.md341-359](https://github.com/ui8kit/core/blob/2afe2195/README.md#L341-L359)

## Специфичные для компонентов варианты

Некоторые компоненты определяют дополнительные варианты помимо основной системы вариантов для специализированной стилизации.

### Варианты кнопок

```
// Определено в: src/components/ui/Button.tsx
export const buttonStyleVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    }
  }
});

export const buttonSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10'
    }
  }
});
```

**Источники:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [README.md284-303](https://github.com/ui8kit/core/blob/2afe2195/README.md#L284-L303)

### Варианты карточек

```
// Определено в: src/components/ui/Card.tsx
export const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      outlined: 'border border-border bg-card text-card-foreground'
    }
  }
});
```

**Источники:** [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144)

## Атрибуты данных

Все компоненты отрисовываются с атрибутами `data-class` для последовательного таргетирования DOM и стилизации.

| Компонент      | Значение `data-class` | Назначение                         |
| -------------- | --------------------- | ---------------------------------- |
| `Block`        | `'block'`             | Идентифицирует примитив Block      |
| `Box`          | `'box'`               | Идентифицирует примитив Box        |
| `Grid`         | `'grid'`              | Идентифицирует примитив Grid       |
| `Flex`         | `'flex'`              | Идентифицирует примитив Flex       |
| `Stack`        | `'stack'`             | Идентифицирует примитив Stack      |
| `Button`       | `'button'`            | Идентифицирует компонент Button    |
| `Card`         | `'card'`              | Идентифицирует компонент Card      |
| `Card.Header`  | `'card-header'`       | Идентифицирует заголовок Card      |
| `Card.Content` | `'card-content'`      | Идентифицирует содержимое Card     |
| `Card.Footer`  | `'card-footer'`       | Идентифицирует подвал Card         |
| `Text`         | `'text'`              | Идентифицирует компонент Text      |
| `Title`        | `'title'`             | Идентифицирует компонент Title     |
| `Badge`        | `'badge'`             | Идентифицирует компонент Badge     |
| `Container`    | `'container'`         | Идентифицирует компонент Container |

**Пример использования:**

```
// Таргетирование в тестах или таблицах стилей
const button = document.querySelector('[data-class="button"]');

// CSS таргетирование
[data-class="card"] {
  /* Пользовательские стили */
}
```

**Источники:** [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## Подробная документация API

Для полной документации API отдельных компонентов со всеми свойствами, методами и примерами использования см.:

- **[Базовые компоненты](#4.1)** - Примитивы: `Block`, `Box`, `Grid`, `Flex`, `Stack`
- **[UI-компоненты](#4.2)** - Составные компоненты: `Button`, `Card`, `Text`, `Title`, `Badge` и др.
- **[Компоненты макетов](#4.3)** - Шаблоны макетов: `DashLayout`, `LayoutBlock`, `SplitBlock`

**Источники:** [.devin/wiki.json135-168](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L135-L168) [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453)