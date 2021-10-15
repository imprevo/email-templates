import React from 'react';
import { ReactEmailTemplate, StringEmailTemplate } from '../libs/core';

export const exampleEmail1 = new StringEmailTemplate(
  'Simple string',
  () => 'Example 1'
);

export const exampleEmail2 = new StringEmailTemplate(
  'Simple tag',
  () => `<div>Example 2</div>`
);

export const exampleEmail3 = new ReactEmailTemplate(
  'Simple React template',
  () => (
    <div>
      <div style={{ color: 'red' }}>Example 3</div>
      <p>
        123
        <p>456</p>
      </p>
    </div>
  )
);
