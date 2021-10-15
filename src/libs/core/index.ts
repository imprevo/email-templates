import { renderToStaticMarkup } from 'react-dom/server';

export interface EmailBuilder {
  readonly title: string;
  build(data?: any): string;
}

export class StringEmailTemplate implements EmailBuilder {
  constructor(
    public title: string,
    protected template: (params?: any) => string
  ) {}

  build(params?: any) {
    return this.template(params);
  }
}

export class ReactEmailTemplate implements EmailBuilder {
  constructor(
    public title: string,
    protected template: (params?: any) => JSX.Element
  ) {}

  build(params?: any): string {
    return renderToStaticMarkup(this.template(params));
  }
}
