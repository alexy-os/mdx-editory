import React, { createContext, useContext, ReactNode } from 'react';

interface QuickStartContextType {
  onLoadExample: (content: string, filename: string) => void;
}

const QuickStartContext = createContext<QuickStartContextType | null>(null);

export function QuickStartProvider({ 
  children, 
  onLoadExample 
}: { 
  children: ReactNode;
  onLoadExample: (content: string, filename: string) => void;
}) {
  return (
    <QuickStartContext.Provider value={{ onLoadExample }}>
      {children}
    </QuickStartContext.Provider>
  );
}

export function useQuickStart() {
  const context = useContext(QuickStartContext);
  if (!context) {
    throw new Error('useQuickStart must be used within QuickStartProvider');
  }
  return context;
} 