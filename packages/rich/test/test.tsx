import React from 'react';
import ReactDOM from 'react-dom/client';
import { RichEditorApp } from '../dist/rich-editor.es.js';
import '../src/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RichEditorApp className="" />
  </React.StrictMode>,
); 