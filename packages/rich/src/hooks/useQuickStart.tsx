import { createContext, useContext, ReactNode } from 'react';

interface QuickStartContextType {
  onLoadExample: (content: string, filename: string) => void;
}

const QuickStartContext = createContext<QuickStartContextType | null>(null);

export const QuickStartProvider = ({ 
  children, 
  onLoadExample 
}: { 
  children: ReactNode;
  onLoadExample: (content: string, filename: string) => void;
}) => {
  const contextValue: QuickStartContextType = { onLoadExample };

  return (
    <QuickStartContext.Provider value={contextValue}>
      {children}
    </QuickStartContext.Provider>
  );
};

export function useQuickStart() {
  const context = useContext(QuickStartContext);
  if (!context) {
    throw new Error('useQuickStart must be used within QuickStartProvider');
  }
  return context;
} 