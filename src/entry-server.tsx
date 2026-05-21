import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { AppProvider } from './context/AppContext';

export function render(path: string) {
  const html = renderToString(
    <React.StrictMode>
      <AppProvider>
        <App ssrPath={path} />
      </AppProvider>
    </React.StrictMode>
  );
  return { html };
}
