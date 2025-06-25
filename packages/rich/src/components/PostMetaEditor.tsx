import React from 'react';
import { PostMeta } from '../types/editor';
import { cn } from '../utils';

interface PostMetaEditorProps {
  meta: Partial<PostMeta>;
  onChange: (meta: Partial<PostMeta>) => void;
  className?: string;
  isDarkMode?: boolean;
}

export function PostMetaEditor({ 
  meta, 
  onChange, 
  className,
  isDarkMode = false 
}: PostMetaEditorProps) {
  const handleChange = (field: keyof PostMeta, value: string | number | object) => {
    onChange({ ...meta, [field]: value });
  };

  const inputClass = cn(
    'w-full px-3 py-2 rounded-md border',
    'border-input',
    'bg-background',
    'text-foreground',
    'placeholder-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring',
    'focus:border-input'
  );

  const labelClass = cn(
    'block text-sm font-medium mb-2',
    'text-foreground'
  );

  return (
    <div className={cn(
      'post-meta-editor flex flex-col',
      className
    )}>
      {/* Fixed header */}
      <div className="flex-shrink-0 pb-4">
        <h3 className={cn(
          'text-lg font-semibold',
          'text-foreground'
        )}>
          Post metadata
        </h3>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4 text-sm">
          <div>
            <label className={labelClass}>
              Title *
            </label>
            <input
              type="text"
              value={meta.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClass}
              placeholder="Enter the post title"
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Slug *
            </label>
            <input
              type="text"
              value={meta.slug || ''}
              onChange={(e) => handleChange('slug', e.target.value)}
              className={inputClass}
              placeholder="url-slug-post"
              required
            />
            <p className={cn(
              'mt-1 text-xs',
              'text-muted-foreground'
            )}>
              URL-address of the post. Automatically generated from the title.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              ID
            </label>
            <input
              type="number"
              value={meta.id || ''}
              onChange={(e) => handleChange('id', parseInt(e.target.value) || 0)}
              className={inputClass}
              placeholder="123"
              required
            />
            <p className={cn(
              'mt-1 text-xs',
              'text-muted-foreground'
            )}>
              Unique identifier of the post. Automatically generated.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Short description
            </label>
            <textarea
              value={meta.excerpt || ''}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className={cn(inputClass, 'h-20 resize-none')}
              placeholder="Short description of the post for preview"
              required
            />
            <p className={cn(
              'mt-1 text-xs',
              'text-muted-foreground'
            )}>
              Automatically generated from the post content.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Image
            </label>
            <input
              type="url"
              value={meta.featuredImage?.url || ''}
              onChange={(e) => handleChange('featuredImage', {
                ...meta.featuredImage,
                url: e.target.value,
                alt: meta.featuredImage?.alt || ''
              })}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {meta.featuredImage?.url && (
            <div>
              <label className={labelClass}>
                Alt text of the image
              </label>
              <input
                type="text"
                value={meta.featuredImage?.alt || ''}
                onChange={(e) => handleChange('featuredImage', {
                  ...meta.featuredImage,
                  url: meta.featuredImage?.url || '',
                  alt: e.target.value
                })}
                className={inputClass}
                placeholder="Description of the image"
              />
            </div>
          )}

          <div>
            <label className={labelClass}>
              Categories
            </label>
            <input
              type="text"
              value={meta.categories?.map(cat => cat.name).join(', ') || ''}
              onChange={(e) => {
                const categoryNames = e.target.value.split(',').map(name => name.trim()).filter(Boolean);
                const categories = categoryNames.map((name, index) => ({
                  name,
                  slug: name.toLowerCase().replace(/\s+/g, '-'),
                  id: Date.now() + index
                }));
                handleChange('categories', categories);
              }}
              className={inputClass}
              placeholder="Technology, Programming, React"
            />
            <p className={cn(
              'mt-1 text-xs',
              'text-muted-foreground'
            )}>
              Separate categories by commas.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <div className={cn(
        'flex-shrink-0 mt-4 pt-4 border-t',
        'border-border'
      )}>
        <div className="flex items-center justify-between">
          <span className={cn(
            'text-sm',
            'text-muted-foreground'
          )}>
            * - required fields
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                // Autofill missing fields
                const updates: Partial<PostMeta> = {};
                
                if (!meta.slug && meta.title) {
                  updates.slug = meta.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-');
                }
                
                if (!meta.id) {
                  updates.id = Date.now();
                }
                
                onChange({ ...meta, ...updates });
              }}
              className={cn(
                'px-3 py-1 text-sm rounded',
                'bg-accent',
                'text-accent-foreground',
                'hover:bg-accent/80',
                'transition-colors'
              )}
            >
              Autofill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 