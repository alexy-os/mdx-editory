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
import { Bold, Italic, Heading1, Heading2, Heading3, List, TextQuote, Code, Image as ImageIcon, Link as LinkIcon, Braces } from 'lucide-react';

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
          class: 'text-primary hover:underline',
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
          'prose-headings:font-bold prose-headings:text-foreground',
          'prose-p:text-foreground',
          'prose-a:text-primary',
          'prose-strong:text-foreground',
          'prose-code:text-accent-foreground',
          'prose-pre:bg-muted',
          'prose-blockquote:border-l-primary',
          'prose-hr:border-border',
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
        'p-4 rounded-lg border-2 border-dashed',
        'border-border',
        'bg-muted',
        'flex items-center justify-center',
        className
      )}>
        <div className="text-muted-foreground">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'rich-editor relative bg-muted/35 dark:bg-muted/75',
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

function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const buttonClass = cn(
    'p-2 hover:bg-accent/75 hover:text-accent-foreground',
    'text-secondary-foreground',
    'border border-transparent hover:border-border',
    'transition-colors'
  );

  const activeButtonClass = cn(
    buttonClass,
    'bg-accent',
    'text-accent-foreground',
    'border-border'
  );

  return (
    <div className={cn(
      'sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
      'flex flex-wrap',
    )}> 
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? activeButtonClass : buttonClass}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? activeButtonClass : buttonClass}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? activeButtonClass : buttonClass}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? activeButtonClass : buttonClass}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? activeButtonClass : buttonClass}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
        title="Bullet list"
      >
        <List className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
        title="Ordered list"
      >
        <List className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? activeButtonClass : buttonClass}
        title="Quote"
      >
        <TextQuote className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? activeButtonClass : buttonClass}
        title="Code"
      >
        <Code className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? activeButtonClass : buttonClass}
        title="Code block"
      >
        <Braces className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-border mx-1" />
      
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
        <ImageIcon className="w-4 h-4" />
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
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 