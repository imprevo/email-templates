import React from 'react';
import { createReactTemplate, createStringTemplate } from '../libs/core';

export const exampleEmail1 = createStringTemplate(
  'Simple string',
  () => 'Example 1'
);

export const exampleEmail2 = createStringTemplate(
  'Simple tag',
  () => `<div>Example 2</div>`
);

export const exampleEmail3 = createReactTemplate(
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
