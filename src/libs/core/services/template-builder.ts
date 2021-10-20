import { EmailBuilder, HTMLTransformer } from '../types';
import { parseHTML, serializeHTML } from '../utils/dom';

export class TemplateBuilder<Params = void> implements EmailBuilder<Params> {
  constructor(
    public title: string,
    protected template: (params: Params) => string,
    protected transformations: HTMLTransformer[] = []
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
