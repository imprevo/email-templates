import { TemplateBuilder } from './template-builder';

describe('TemplateBuilder', () => {
  it('should contain title', () => {
    const builder = new TemplateBuilder('Email title', () => 'Email content');
    expect(builder.title).toBe('Email title');
  });

  describe('should build email', () => {
    it('without parameters', async () => {
      const builder = new TemplateBuilder('Email title', () => 'Email content');
      const result = await builder.build();
      expect(result).toContain('<body>Email content</body>');
    });

    it('with parameters', async () => {
      const builder = new TemplateBuilder(
        'Email title',
        (name: string) => `hello ${name}`
      );
      const result = await builder.build('JS');
      expect(result).toContain('<body>hello JS</body>');
    });
  });

  describe('transformations', () => {
    it('should not be applied before build', async () => {
      const stub = jest.fn((dom: Document) => dom);
      new TemplateBuilder('Email title', () => 'Email content', [stub]);
      expect(stub).not.toBeCalled();
    });

    it('should be applied during build', async () => {
      const stub = jest.fn((dom: Document) => dom);
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [stub]
      );
      await builder.build();
      expect(stub).toBeCalled();
    });

    it('each should be applied', async () => {
      const transformer = jest.fn((dom: Document) => dom);
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [transformer, transformer]
      );
      await builder.build();
      expect(transformer).toBeCalledTimes(2);
    });

    it('should modify email template', async () => {
      const transformer = (dom: Document) => {
        dom.body.innerHTML = 'Replaced content';
        return dom;
      };
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [transformer]
      );
      const result = await builder.build();
      expect(result).toContain('<body>Replaced content</body>');
    });

    it('should be applied in order', async () => {
      const transformer1 = (dom: Document) => {
        dom.body.innerHTML += ' first';
        return dom;
      };
      const transformer2 = (dom: Document) => {
        dom.body.innerHTML += ' second';
        return dom;
      };
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [transformer1, transformer2]
      );
      const result = await builder.build();
      expect(result).toContain('<body>Email content first second</body>');
    });
  });
});
