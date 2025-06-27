import React from 'react';
import { ChevronDown, FileText, Plus } from 'lucide-react';
import { EditorFile } from '../types/editor';

interface FileDropdownProps {
  files: EditorFile[];
  currentFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onCreateNew: () => void;
}

export const FileDropdown: React.FC<FileDropdownProps> = ({
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
        className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-accent text-muted-foreground rounded-md transition-colors"
      >
        <FileText size={16} />
        <span className="text-sm font-medium">
          {currentFile ? (currentFile.frontmatter?.title || currentFile.name) : 'Add file'}
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-card border border-border rounded-md shadow-lg z-50">
          {/* Create New Button */}
          <button
            onClick={() => {
              onCreateNew();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-accent transition-colors border-b border-border"
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
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-accent transition-colors ${
                    file.id === currentFileId ? 'bg-accent' : ''
                  }`}
                >
                  <FileText size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {file.frontmatter?.title || file.name}
                    </div>
                    {file.frontmatter?.excerpt && (
                      <div className="text-xs text-muted-foreground truncate">
                        {file.frontmatter.excerpt}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">
                    {file.type}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-sm text-muted-foreground text-center">
              Not found files
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