import { inlineCSS } from './inline-css';

describe('inlineCSS utils', () => {
  describe('inlineCSS', () => {
    describe('document', () => {
      it('should return empty document', () => {
        const result = inlineCSS('');
        expect(result).toBe(
          '<!DOCTYPE html><html><head></head><body></body></html>'
        );
      });
    });

    describe('<body> tag', () => {
      it('should contain text to the body', () => {
        const html = 'hello world';
        const result = inlineCSS(html);
        expect(result).toContain(`<body>${html}</body>`);
      });

      it('should contain <p>', () => {
        const html = '<p>hello world</p>';
        const result = inlineCSS(html);
        expect(result).toContain(`<body>${html}</body>`);
      });

      it('should contain <p> with inline styles', () => {
        const html = '<p style="color:red;">hello world</p>';
        const result = inlineCSS(html);
        expect(result).toContain(`<body>${html}</body>`);
      });
    });

    describe('<style> tag', () => {
      it('should be inlined', () => {
        const styles = '<style>p {color:red}</style>';
        const html = '<p>hello world</p>';
        const result = inlineCSS(styles + html);
        expect(result).toContain(
          '<body><p style="color: rgb(255, 0, 0);">hello world</p></body>'
        );
      });

      it('should be removed from <head>', () => {
        const styles = '<style>p {color:red}</style>';
        const html = '<p>hello world</p>';
        const result = inlineCSS(styles + html);
        expect(result).toContain('<head></head>');
      });
    });
  });
});
