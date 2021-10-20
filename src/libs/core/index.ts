import { renderToStaticMarkup } from 'react-dom/server';
import { EmailBuilder, HTMLTransformer } from './types';

export class EmailBuilderBase<Params = void> implements EmailBuilder<Params> {
  protected transformations: HTMLTransformer[] = [];

  constructor(
    public title: string,
    protected template: (params: Params) => string
  ) {}

  protected async applyTransformations(html: string) {
    if (!this.transformations.length) return html;
    return this.transformations.reduce(
      (res, next) => res.then((r) => next(r)),
      Promise.resolve(html)
    );
  }

  async build(params: Params) {
    const html = this.template(params);
    return this.applyTransformations(html);
  }
}

export const createStringTemplate = <Params = void>(
  title: string,
  template: (params: Params) => string
) => {
  return new EmailBuilderBase<Params>(title, template);
};

export const createReactTemplate = <Params = void>(
  title: string,
  template: (params: Params) => JSX.Element
) => {
  return new EmailBuilderBase<Params>(title, (params) =>
    renderToStaticMarkup(template(params))
  );
};
