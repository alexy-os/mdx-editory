import { useState, useCallback, useEffect } from 'react';
import { EditorState, EditorFile, PostMeta } from '../types/editor';
import { parseMarkdownFile, stringifyMarkdownFile, generateSlug, generateExcerpt, generateId, formatDate } from '../utils';
import { 
  generateContext, 
  generateMenu, 
  saveContext, 
  saveMenu, 
  loadContext, 
  loadMenu,
  saveMDXFile 
} from '../utils/fileSystem';
import { 
  prepareMarkdownForEditor, 
  prepareHtmlForMarkdown, 
  isMarkdownContent 
} from '../utils/markdown';

export function useEditor() {
  const [state, setState] = useState<EditorState>({
    currentFile: null,
    files: [],
    isPreviewOpen: false,
    isDarkMode: false,
    context: {},
    menu: []
  });

    const saveAllData = useCallback(async () => {
    try {
      // Генерируем и сохраняем context.json
      const context = generateContext(state.files);
      await saveContext(context);
      
      // Генерируем и сохраняем menu.json
      const menu = generateMenu(state.files);
      await saveMenu(menu);
      
      // Обновляем состояние
      setState(prev => ({
        ...prev,
        context,
        menu: menu.primary.items
      }));
      
      console.log('All data saved successfully');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }, [state.files]);

  // Загружаем сохраненные данные при инициализации
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [context, menu] = await Promise.all([
          loadContext(),
          loadMenu()
        ]);
        
        setState(prev => ({
          ...prev,
          context,
          menu: menu.primary.items
        }));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };
    
    loadSavedData();
  }, []);

  // Автоматически сохраняем context и menu при изменении файлов
  useEffect(() => {
    if (state.files.length > 0) {
      const timeoutId = setTimeout(() => {
        saveAllData();
      }, 1000); // Дебаунс 1 секунда
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.files, saveAllData]);

  const loadFile = useCallback(async (file: File) => {
    const content = await file.text();
    const { frontmatter, body } = parseMarkdownFile(content);
    
    // Конвертируем Markdown в HTML для редактора TipTap
    const htmlContent = isMarkdownContent(body) ? prepareMarkdownForEditor(body) : body;
    
    const editorFile: EditorFile = {
      id: generateId().toString(),
      name: file.name,
      path: file.name,
      content: htmlContent, // Сохраняем HTML для редактора
      originalMarkdown: body, // Сохраняем оригинальный Markdown
      frontmatter,
      type: file.name.endsWith('.mdx') ? 'mdx' : 'md',
      lastModified: new Date(file.lastModified)
    };

    setState(prev => ({
      ...prev,
      currentFile: editorFile,
      files: [...prev.files.filter(f => f.id !== editorFile.id), editorFile]
    }));
  }, []);

  const saveFile = useCallback(async (file: EditorFile) => {
    try {
      // Конвертируем HTML обратно в Markdown для сохранения
      const markdownContent = prepareHtmlForMarkdown(file.content);
      
      // Создаем копию файла с Markdown контентом для сохранения
      const fileToSave: EditorFile = {
        ...file,
        content: markdownContent
      };
      
      // Сохраняем MDX файл
      await saveMDXFile(fileToSave);
      
      // Обновляем состояние с новыми данными
      setState(prev => {
        const updatedFiles = prev.files.map(f => f.id === file.id ? file : f);
        return {
          ...prev,
          files: updatedFiles
        };
      });
      
      console.log('File saved successfully:', file.name);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  }, []);

  const updateContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        content,
        lastModified: new Date()
      } : null
    }));
  }, []);

  const updateMeta = useCallback((meta: Partial<PostMeta>) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        frontmatter: {
          ...prev.currentFile.frontmatter,
          ...meta,
          // Автогенерация slug если не указан
          slug: meta.slug || (meta.title ? generateSlug(meta.title) : prev.currentFile.frontmatter?.slug),
          // Автогенерация excerpt если не указан
          excerpt: meta.excerpt || generateExcerpt(prev.currentFile.content),
          // Автогенерация ID если не указан
          id: meta.id || prev.currentFile.frontmatter?.id || generateId(),
          // Обновление даты
          date: formatDate(new Date())
        }
      } : null
    }));
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPreviewOpen: !prev.isPreviewOpen
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDarkMode: !prev.isDarkMode
    }));
  }, []);

  const selectFile = useCallback((fileId: string) => {
    setState(prev => {
      const file = prev.files.find(f => f.id === fileId);
      if (file) {
        return {
          ...prev,
          currentFile: file
        };
      }
      return prev;
    });
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setState(prev => {
      const updatedFiles = prev.files.filter(f => f.id !== fileId);
      const newCurrentFile = prev.currentFile?.id === fileId 
        ? (updatedFiles.length > 0 ? updatedFiles[0] : null)
        : prev.currentFile;
      
      return {
        ...prev,
        files: updatedFiles,
        currentFile: newCurrentFile
      };
    });
  }, []);

  const updateCurrentFileInList = useCallback(() => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? prev.currentFile! : f
      );
      
      return {
        ...prev,
        files: updatedFiles
      };
    });
  }, []);

  const exportToMDX = useCallback(() => {
    if (!state.currentFile) return '';
    // Конвертируем HTML обратно в Markdown для экспорта
    const markdownContent = prepareHtmlForMarkdown(state.currentFile.content);
    return stringifyMarkdownFile(state.currentFile.frontmatter || {}, markdownContent);
  }, [state.currentFile]);

  // Обновляем файл в списке при изменении контента или метаданных
  const updateContentWithSync = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        content,
        lastModified: new Date()
      } : null
    }));
    // Синхронизируем с списком файлов
    setTimeout(updateCurrentFileInList, 0);
  }, [updateCurrentFileInList]);

  const updateMetaWithSync = useCallback((meta: Partial<PostMeta>) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        frontmatter: {
          ...prev.currentFile.frontmatter,
          ...meta,
          // Автогенерация slug если не указан
          slug: meta.slug || (meta.title ? generateSlug(meta.title) : prev.currentFile.frontmatter?.slug),
          // Автогенерация excerpt если не указан
          excerpt: meta.excerpt || generateExcerpt(prev.currentFile.content),
          // Автогенерация ID если не указан
          id: meta.id || prev.currentFile.frontmatter?.id || generateId(),
          // Обновление даты
          date: formatDate(new Date())
        }
      } : null
    }));
    // Синхронизируем с списком файлов
    setTimeout(updateCurrentFileInList, 0);
  }, [updateCurrentFileInList]);

  return {
    state,
    actions: {
      loadFile,
      saveFile,
      saveAllData,
      selectFile,
      removeFile,
      updateContent: updateContentWithSync,
      updateMeta: updateMetaWithSync,
      togglePreview,
      toggleDarkMode,
      exportToMDX
    }
  };
} 