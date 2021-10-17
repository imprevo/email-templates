import { renderToStaticMarkup } from 'react-dom/server';

export interface EmailBuilder<Params = void> {
  readonly title: string;
  build(params: Params): string;
}

export class StringEmailTemplate<Params = void>
  implements EmailBuilder<Params>
{
  constructor(
    public title: string,
    protected template: (params: Params) => string
  ) {}

  build(params: Params) {
    return this.template(params);
  }
}

export class ReactEmailTemplate<Params = void> implements EmailBuilder<Params> {
  constructor(
    public title: string,
    protected template: (params: Params) => JSX.Element
  ) {}

  build(params: Params): string {
    return renderToStaticMarkup(this.template(params));
  }
}
