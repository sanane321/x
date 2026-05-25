import React from 'react';
import { renderToString } from 'react-dom/server';
// @ts-ignore
import { StaticRouter } from 'react-router';
import App from './App';
import { AppProvider } from './context/AppContext';

export function render(path: string) {
  const html = renderToString(
    <React.StrictMode>
      <AppProvider>
        <StaticRouter location={path}>
          <App ssrPath={path} />
        </StaticRouter>
      </AppProvider>
    </React.StrictMode>
  );
  return { html };
}
