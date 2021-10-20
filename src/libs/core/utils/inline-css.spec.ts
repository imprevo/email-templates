import { parseHTML } from './dom';
import { inlineCSS } from './inline-css';

describe('inlineCSS utils', () => {
  describe('inlineCSS', () => {
    describe('should keep', () => {
      it('existing elements with inline styles', async () => {
        const html = '<p style="color:black;">hello world</p>';
        const dom = parseHTML(html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(html);
      });

      it('tags from <head>', async () => {
        const head = '<title>hello world</title>';
        const dom = parseHTML(head);
        const result = await inlineCSS(dom);
        expect(result.head.innerHTML).toContain(head);
      });
    });

    describe('should use <style> properties', () => {
      it('and inlined them to necessary tags', async () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(
          '<p style="color: black;">hello world</p>'
        );
      });

      it('and merged them with existing styles', async () => {
        const styles = '<style>p {padding:10px}</style>';
        const html = '<p style="color:black;">hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.body.innerHTML).toContain(
          '<p style="color: black; padding: 10px;">hello world</p>'
        );
      });
    });

    describe('should remove', () => {
      it('<style>', async () => {
        const styles = '<style>p {color:black}</style>';
        const html = '<p>hello world</p>';
        const dom = parseHTML(styles + html);
        const result = await inlineCSS(dom);
        expect(result.head.innerHTML).toContain('');
      });
    });
  });
});
