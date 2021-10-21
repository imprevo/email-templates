import { renderToStaticMarkup } from 'react-dom/server';
import { TemplateBuilder } from '../core';
import { inlineCSS } from '../plugins';

const plugins = [inlineCSS];

export const createStringTemplate = <Params = void>(
  title: string,
  template: (params: Params) => string
) => {
  return new TemplateBuilder<Params>(title, template, plugins);
};

export const createReactTemplate = <Params = void>(
  title: string,
  template: (params: Params) => JSX.Element
) => {
  return new TemplateBuilder<Params>(
    title,
    (params) => renderToStaticMarkup(template(params)),
    plugins
  );
};
