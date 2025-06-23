import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { common, createLowlight } from 'lowlight';
import { cn } from '../utils';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  isDarkMode?: boolean;
}

export function RichEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing...',  
  className,
  isDarkMode = false 
}: RichEditorProps) {
  const lowlight = createLowlight(common);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Typography,
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 dark:text-blue-400 hover:underline',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'dark:prose-invert',
          'prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100',
          'prose-p:text-gray-700 dark:prose-p:text-gray-300',
          'prose-a:text-blue-600 dark:prose-a:text-blue-400',
          'prose-strong:text-gray-900 dark:prose-strong:text-gray-100',
          'prose-code:text-pink-600 dark:prose-code:text-pink-400',
          'prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800',
          'prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400',
          'prose-hr:border-gray-300 dark:prose-hr:border-gray-600',
          'min-h-[400px] p-4',
          className
        ),
      },
    },
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className={cn(
        'min-h-[400px] p-4 rounded-lg border-2 border-dashed',
        'border-gray-300 dark:border-gray-600',
        'bg-gray-50 dark:bg-gray-800',
        'flex items-center justify-center',
        className
      )}>
        <div className="text-gray-500 dark:text-gray-400">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-lg border',
      'border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      className
    )}>
      <EditorToolbar editor={editor} isDarkMode={isDarkMode} />
      <div className="p-4">
        {React.createElement(EditorContent as any, { editor })}
      </div>
    </div>
  );
}

interface EditorToolbarProps {
  editor: any;
  isDarkMode: boolean;
}

function EditorToolbar({ editor, isDarkMode }: EditorToolbarProps) {
  if (!editor) return null;

  const buttonClass = cn(
    'p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700',
    'text-gray-600 dark:text-gray-400',
    'border border-transparent hover:border-gray-300 dark:hover:border-gray-600',
    'transition-colors'
  );

  const activeButtonClass = cn(
    buttonClass,
    'bg-blue-100 dark:bg-blue-900/30',
    'text-blue-600 dark:text-blue-400',
    'border-blue-300 dark:border-blue-600'
  );

  return (
    <div className={cn(
      'flex flex-wrap gap-1 p-3 border-b',
      'border-gray-200 dark:border-gray-700',
      'bg-gray-50 dark:bg-gray-800'
    )}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? activeButtonClass : buttonClass}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? activeButtonClass : buttonClass}
        title="Italic"
      >
        <em>I</em>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? activeButtonClass : buttonClass}
        title="Code"
      >
        {'</>'}
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? activeButtonClass : buttonClass}
        title="Heading 1"
      >
        H1
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? activeButtonClass : buttonClass}
        title="Heading 2"
      >
        H2
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? activeButtonClass : buttonClass}
        title="Heading 3"
      >
        H3
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
        title="Bullet list"
      >
        •
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
        title="Ordered list"
      >
        1.
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? activeButtonClass : buttonClass}
        title="Quote"
      >
        "
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? activeButtonClass : buttonClass}
        title="Code block"
      >
        {'{}'}
      </button>
      
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
      
      <button
        onClick={() => {
          const url = window.prompt('Image URL:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className={buttonClass}
        title="Image"
      >
        🖼️
      </button>
      
      <button
        onClick={() => {
          const url = window.prompt('Link URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? activeButtonClass : buttonClass}
        title="Link"
      >
        🔗
      </button>
    </div>
  );
} 