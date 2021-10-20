import CSSOM from 'cssom';
import { HTMLTransformer } from '../types';

export const inlineCSS: HTMLTransformer = (html) => {
  const document = parseHTML(html);
  const styleSheet = getStyleSheet(document);
  inlineCssRules(document, styleSheet);
  removeStyles(document);
  return serializeHTML(document);
};

const parseHTML = (html: string): Document => {
  if (typeof window === 'undefined') {
    // server side
    const { JSDOM } = require('jsdom');

    const dom = new JSDOM(html);
    return dom.window.document;
  }
  // browser side
  return new DOMParser().parseFromString(html, 'text/html');
};

const serializeHTML = (document: Document) => {
  // TODO: get doctype
  return '<!DOCTYPE html>' + document.documentElement.outerHTML;
};

const getStyleSheet = (document: Document) => {
  // TODO: get only styles
  const stylesheetList = Array.from(document.head.children)
    .map((el) => el.innerHTML)
    .join('\n');
  // TODO: sort by specificity
  return CSSOM.parse(stylesheetList);
};

const inlineCssRules = (
  document: Document,
  styleSheet: CSSOM.CSSStyleSheet
) => {
  styleSheet.cssRules.forEach((rule) => {
    const list = findElByRule(document, rule as any);
    list.forEach((el) => {
      if (el) {
        inlineRule(el, rule as any);
      }
    });
  });
};

const findElByRule = (document: Document, rule: CSSOM.CSSStyleRule) => {
  return document.querySelectorAll<HTMLElement>(rule.selectorText);
};

const inlineRule = (el: HTMLElement, rule: CSSOM.CSSStyleSheet) => {
  getCSSRules(rule).forEach(([property, value]) => {
    // @ts-ignore TODO: fix error
    el.style[property] = value;
  });
};

const getCSSRules = (rule: CSSOM.CSSStyleSheet): [string, string][] => {
  // TODO: how?
  return [['color', '#f00']];
};

const removeStyles = (document: Document) => {
  // TODO: remove only styles
  document.head.innerHTML = '';
  return document;
};
