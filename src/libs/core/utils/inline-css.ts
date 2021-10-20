import CSSOM from 'cssom';
import { HTMLTransformer } from '../types';

export const inlineCSS: HTMLTransformer = (document) => {
  const styleSheet = getStyleSheet(document);
  inlineCssRules(document, styleSheet);
  removeStyles(document);
  return document;
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
    if (rule instanceof CSSOM.CSSStyleRule) {
      const elements = findElementsByRule(document, rule);
      elements.forEach((element) => {
        inlineRule(element, rule);
      });
    }
  });
};

const findElementsByRule = (document: Document, rule: CSSOM.CSSStyleRule) => {
  return document.querySelectorAll<HTMLElement>(rule.selectorText);
};

const inlineRule = (element: HTMLElement, rule: CSSOM.CSSStyleRule) => {
  const properties = getCSSProperties(rule);
  properties.forEach(({ property, value }) => {
    // @ts-ignore TODO: fix error
    element.style[property] = value;
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

const removeStyles = (document: Document) => {
  // TODO: remove only styles
  document.head.innerHTML = '';
  return document;
};
