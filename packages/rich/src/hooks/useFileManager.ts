import { useState, useCallback } from 'react';
import { EditorFile } from '../types/editor';

export function useFileManager() {
  const [files, setFiles] = useState<EditorFile[]>([]);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);

  const addFile = useCallback((file: EditorFile) => {
    setFiles(prev => [...prev.filter(f => f.id !== file.id), file]);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (currentFileId === fileId) {
      setCurrentFileId(null);
    }
  }, [currentFileId]);

  const updateFile = useCallback((fileId: string, updates: Partial<EditorFile>) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, ...updates } : f
    ));
  }, []);

  const selectFile = useCallback((fileId: string) => {
    setCurrentFileId(fileId);
  }, []);

  const getCurrentFile = useCallback(() => {
    return files.find(f => f.id === currentFileId) || null;
  }, [files, currentFileId]);

  const saveContext = useCallback(() => {
    const context = files.reduce((acc, file) => {
      acc[file.id] = {
        ...file.frontmatter,
        content: file.content,
        path: file.path,
        lastModified: file.lastModified.toISOString()
      };
      return acc;
    }, {} as Record<string, any>);

    // Here will be logic to save in src/~data/context.json
    // console.log('Saving context:', context);
    return context;
  }, [files]);

  const generateMenu = useCallback(() => {
    const menu = files.map(file => ({
      title: file.frontmatter?.title || file.name,
      url: `/${file.frontmatter?.slug || file.name.replace(/\.(md|mdx)$/, '')}`,
      id: parseInt(file.id),
      order: files.indexOf(file),
      parent: null,
      classes: [],
      current: file.id === currentFileId
    }));

    // Here will be logic to save in src/~data/menu.json
    // console.log('Generating menu:', menu);
    return menu;
  }, [files, currentFileId]);

  return {
    files,
    currentFile: getCurrentFile(),
    currentFileId,
    addFile,
    removeFile,
    updateFile,
    selectFile,
    saveContext,
    generateMenu
  };
} 