import React from 'react';
import { cn } from '../utils';

interface QuickStartProps {
  onLoadExample: (content: string, filename: string) => void;
  isDarkMode?: boolean;
}

const exampleFiles = [
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

export function QuickStart({ onLoadExample, isDarkMode = false }: QuickStartProps) {
  const handleLoadExample = (example: typeof exampleFiles[0]) => {
    // Create File object from string
    const blob = new Blob([example.content], { type: 'text/markdown' });
    const file = new File([blob], example.name, { type: 'text/markdown' });
    
    // Use FileReader to read as a regular file
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
          Quick Start
        </h3>
        <p className={cn(
          'text-sm',
          'text-gray-500 dark:text-gray-400'
        )}>
          Load an example file to get started with the editor
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
                    ~{Math.ceil(example.content.length / 100)} lines
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
              Tip
            </p>
            <p className={cn(
              'text-sm',
              'text-yellow-700 dark:text-yellow-300'
            )}>
              After loading an example, you can edit it, change metadata, and export the result.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 