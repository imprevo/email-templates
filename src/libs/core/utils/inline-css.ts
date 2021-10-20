import CSSOM from 'cssom';
import { EmailPlugin } from '../types';

export const inlineCSS: EmailPlugin = (document) => {
  const styleSheet = getStyleSheet(document);
  inlineCssRules(document, styleSheet);
  removeStyleTags(document);
  return document;
};

const getStyleSheet = (document: Document) => {
  const stylesheetList = findAllStyleTags(document)
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
    if (rule instanceof CSSOM.CSSStyleRule) {
      const elements = document.querySelectorAll<HTMLElement>(
        rule.selectorText
      );
      elements.forEach((element) => {
        inlineRule(element, rule);
      });
    }
  });
};

const inlineRule = (element: HTMLElement, rule: CSSOM.CSSStyleRule) => {
  const properties = getCSSProperties(rule);
  properties.forEach(({ property, value }) => {
    element.style.setProperty(property, value);
  });
};

const getCSSProperties = (rule: CSSOM.CSSStyleRule) => {
  const rules: { property: string; value: string }[] = [];
  for (let i = 0; i < rule.style.length; i++) {
    const property = rule.style[i];
    const value = rule.style.getPropertyValue(property);
    rules.push({ property, value });
  }
  return rules;
};

const removeStyleTags = (document: Document) => {
  findAllStyleTags(document).forEach((style) => {
    style.parentNode?.removeChild(style);
  });
  return document;
};

const findAllStyleTags = (document: Document) =>
  Array.from(document.querySelectorAll('style'));
