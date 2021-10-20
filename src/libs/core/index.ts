import { renderToStaticMarkup } from 'react-dom/server';
import { EmailBuilder, HTMLTransformer } from './types';
import { parseHTML, serializeHTML } from './utils/dom';

export class EmailBuilderBase<Params = void> implements EmailBuilder<Params> {
  protected transformations: HTMLTransformer[] = [];

  constructor(
    public title: string,
    protected template: (params: Params) => string
  ) {}

  protected async applyTransformations(document: Document) {
    if (!this.transformations.length) {
      return document;
    }
    return this.transformations.reduce(
      (res, next) => res.then((r) => next(r)),
      Promise.resolve(document)
    );
  }

  async build(params: Params) {
    const html = this.template(params);
    const document = parseHTML(html);
    const newDocument = await this.applyTransformations(document);
    return serializeHTML(newDocument);
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
