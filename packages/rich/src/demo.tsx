import React from 'react';
import ReactDOM from 'react-dom/client';
import { RichEditorApp } from './components/RichEditorApp';
import './styles/index.css';

function Demo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <RichEditorApp />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
); 