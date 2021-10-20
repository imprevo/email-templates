export type HTMLTransformer = (html: string) => Promise<string> | string;

export interface EmailBuilder<Params = void> {
  readonly title: string;
  build(params: Params): Promise<string>;
}
