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
        const html = '<p style="color:black;">hello world</p>';
        const result = inlineCSS(html);
        expect(result).toContain(`<body>${html}</body>`);
      });
    });

    describe('<style> tag', () => {
      it('should be inlined', () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const result = inlineCSS(styles + html);
        expect(result).toContain('<p style="color: black;">hello world</p>');
      });

      it('should be inlined and merged', () => {
        const styles = '<style>p {padding:10px}</style>';
        const html = '<p style="color:black;">hello world</p>';
        const result = inlineCSS(styles + html);
        expect(result).toContain(
          '<p style="color: black; padding: 10px;">hello world</p>'
        );
      });

      it('should be removed from <head>', () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const result = inlineCSS(styles + html);
        expect(result).toContain('<head></head>');
      });
    });
  });
});
