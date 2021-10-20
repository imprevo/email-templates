import { parseHTML, serializeHTML } from './dom';

describe('dom utils', () => {
  describe('parseHTML', () => {
    describe('document', () => {
      it('should be created', () => {
        const result = parseHTML('');
        expect(result).toBeDefined();
      });

      it('should contain basic tags', () => {
        const result = parseHTML('');
        expect(result.head).toBeDefined();
        expect(result.body).toBeDefined();
      });

      it('should return empty document', () => {
        const result = parseHTML('');
        expect(result.head.children.length).toBe(0);
        expect(result.body.children.length).toBe(0);
      });
    });

    describe('<body> tag', () => {
      it('should contain text to the body', () => {
        const html = 'hello world';
        const result = parseHTML(html);
        expect(result.body.innerHTML).toContain(html);
      });

      it('should contain <p>', () => {
        const html = '<p>hello world</p>';
        const result = parseHTML(html);
        expect(result.body.innerHTML).toContain(html);
      });
    });
  });

  describe('serializeHTML', () => {
    describe('empty document', () => {
      it('should contain DOCTYPE', () => {
        const dom = parseHTML('');
        const result = serializeHTML(dom);
        expect(result.startsWith('<!DOCTYPE html>')).toBeTruthy();
      });

      it('should contain <html>', () => {
        const dom = parseHTML('');
        const result = serializeHTML(dom);
        expect(result).toContain('<html>');
        expect(result.endsWith('</html>')).toBeTruthy();
      });

      it('should contain <head>', () => {
        const dom = parseHTML('');
        const result = serializeHTML(dom);
        expect(result).toContain('<head></head>');
      });

      it('should contain <body>', () => {
        const dom = parseHTML('');
        const result = serializeHTML(dom);
        expect(result).toContain('<body></body>');
      });
    });

    describe('<body> tag', () => {
      it('should contain text to the body', () => {
        const html = 'hello world';
        const dom = parseHTML(html);
        const result = serializeHTML(dom);
        expect(result).toContain(html);
      });

      it('should contain <p>', () => {
        const html = '<p>hello world</p>';
        const dom = parseHTML(html);
        const result = serializeHTML(dom);
        expect(result).toContain(html);
      });
    });
  });
});
