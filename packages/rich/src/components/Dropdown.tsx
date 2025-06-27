import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';
import { ChevronDown, FileText, Plus } from 'lucide-react';
import { EditorFile } from '../types/editor';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  title?: string;
}

interface DropdownProps {
  files: EditorFile[];
  currentFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onCreateNew: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  files,
  currentFileId,
  onFileSelect,
  onCreateNew,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentFile = files.find(f => f.id === currentFileId);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <FileText size={16} />
        <span className="text-sm font-medium">
          {currentFile ? currentFile.name : 'Include File'}
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
          {/* Create New Button */}
          <button
            onClick={() => {
              onCreateNew();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-600"
          >
            <Plus size={16} className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {__('Create New Post')}
            </span>
          </button>

          {/* File List */}
          {files.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => {
                    onFileSelect(file.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    file.id === currentFileId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <FileText size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    {file.meta.title && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {file.meta.title}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 uppercase">
                    {file.type}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              Is not files upload
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}; 