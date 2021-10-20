export type EmailPlugin = (document: Document) => Promise<Document> | Document;

export interface EmailBuilder<Params = void> {
  readonly title: string;
  build(params: Params): Promise<string>;
}
