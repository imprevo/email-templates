import { EmailBuilder, EmailPlugin } from '../types';
import { parseHTML, serializeHTML } from '../utils/dom';

export class TemplateBuilder<Params = void> implements EmailBuilder<Params> {
  constructor(
    public title: string,
    protected template: (params: Params) => string,
    protected plugins: EmailPlugin[] = []
  ) {}

  protected async applyPlugins(document: Document) {
    if (!this.plugins.length) {
      return document;
    }
    return this.plugins.reduce(
      (res, next) => res.then((r) => next(r)),
      Promise.resolve(document)
    );
  }

  async build(params: Params) {
    const html = this.template(params);
    const document = parseHTML(html);
    const newDocument = await this.applyPlugins(document);
    return serializeHTML(newDocument);
  }
}
