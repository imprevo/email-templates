export const parseHTML = (html: string): Document => {
  if (typeof window === 'undefined') {
    // server side
    const { JSDOM } = require('jsdom');

    const dom = new JSDOM(html);
    return dom.window.document;
  }
  // browser side
  return new DOMParser().parseFromString(html, 'text/html');
};

export const serializeHTML = (document: Document): string => {
  // TODO: get doctype
  return '<!DOCTYPE html>' + document.documentElement.outerHTML;
};
