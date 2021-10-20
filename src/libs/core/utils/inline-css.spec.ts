import { parseHTML } from './dom';
import { inlineCSS } from './inline-css';

describe('inlineCSS utils', () => {
  describe('inlineCSS', () => {
    describe('<body> tag', () => {
      it('should contain <p> with inline styles', async () => {
        const html = '<p style="color:black;">hello world</p>';
        const dom = parseHTML(html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(html);
      });
    });

    describe('<style> tag', () => {
      it('should be inlined', async () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(
          '<p style="color: black;">hello world</p>'
        );
      });

      it('should be inlined and merged', async () => {
        const styles = '<style>p {padding:10px}</style>';
        const html = '<p style="color:black;">hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(
          '<p style="color: black; padding: 10px;">hello world</p>'
        );
      });

      it('should be removed from <head>', async () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.head.innerHTML).toContain('');
      });
    });
  });
});
