import { renderToStaticMarkup } from 'react-dom/server';

export interface EmailBuilder<Params = void> {
  readonly title: string;
  build(params: Params): Promise<string>;
}

export class StringEmailTemplate<Params = void>
  implements EmailBuilder<Params>
{
  constructor(
    public title: string,
    protected template: (params: Params) => string
  ) {}

  async build(params: Params) {
    return this.template(params);
  }
}

export class ReactEmailTemplate<Params = void> implements EmailBuilder<Params> {
  constructor(
    public title: string,
    protected template: (params: Params) => JSX.Element
  ) {}

  async build(params: Params) {
    return renderToStaticMarkup(this.template(params));
  }
}
