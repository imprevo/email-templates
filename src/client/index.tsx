import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { config } from './config';
import { AppConfig } from './types/config';

const root = document.createElement('div');
document.body.append(root);

const renderApp = (Root: typeof App, config: AppConfig) =>
  render(<Root config={config} />, root);

renderApp(App, config);

if (module.hot) {
  module.hot.accept(['./components/App', './config'], () => {
    const { App } = require('./components/App');
    const { config } = require('./config');
    renderApp(App, config);
  });
}
