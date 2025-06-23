import React from 'react';
import ReactDOM from 'react-dom/client';
// Импортируем из собранной библиотеки
import { RichEditorApp } from '../dist/rich-editor.es.js';
// Подключаем стили
import '../src/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RichEditorApp />
  </React.StrictMode>,
); 