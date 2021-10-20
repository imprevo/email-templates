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

  describe('plugin', () => {
    it('should not be applied before build', async () => {
      const plugin = jest.fn((document: Document) => document);
      new TemplateBuilder('Email title', () => 'Email content', [plugin]);
      expect(plugin).not.toBeCalled();
    });

    it('should be applied during build', async () => {
      const plugin = jest.fn((document: Document) => document);
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [plugin]
      );
      await builder.build();
      expect(plugin).toBeCalled();
    });

    it('should modify email template', async () => {
      const plugin = (document: Document) => {
        document.body.innerHTML = 'Replaced content';
        return document;
      };
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [plugin]
      );
      const result = await builder.build();
      expect(result).toContain('<body>Replaced content</body>');
    });
  });

  describe('multiple plugins', () => {
    it('should be applied', async () => {
      const plugin = jest.fn((document: Document) => document);
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [plugin, plugin]
      );
      await builder.build();
      expect(plugin).toBeCalledTimes(2);
    });

    it('should be applied in order', async () => {
      const plugin1 = (document: Document) => {
        document.body.innerHTML += ' first';
        return document;
      };
      const plugin2 = (document: Document) => {
        document.body.innerHTML += ' second';
        return document;
      };
      const builder = new TemplateBuilder(
        'Email title',
        () => 'Email content',
        [plugin1, plugin2]
      );
      const result = await builder.build();
      expect(result).toContain('<body>Email content first second</body>');
    });
  });
});
