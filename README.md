# Email templates

![Prerequisite](https://img.shields.io/badge/npm-%3E%3D6.0.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D14.0.0-blue.svg)

> Sandbox for developing email templates

### 🏠 [Homepage](https://github.com/imprevo/email-templates)

## Motivation

I like the idea of [Storybook](https://github.com/storybookjs/storybook).
DX is great!
I was wondering about similar DX for email templates.
It would be great to edit a email template and see the result in the browser without manual compilation and page refresh.

## Prerequisites

- npm >=6.0.0
- node >=14.0.0

## Installation

```sh
npm install
```

## Usage

1. Import the library

```ts
// Import the library
import { createStringTemplate } from '../libs/builders';

// Create template
const emailTemplate = createStringTemplate(
  'Email template',
  (params) => `Hello, ${params.name}!`
);
```

2. Build email

```ts
const email = emailTemplate.build({ name: 'World' });
```

## Playground

1. Run `npm run start:playground` and open http://localhost:8080 to view emails in the browser
2. Add or edit a template in `src/emails`.
3. Update `src/playground/config.ts` if necessary

## Running tests

Run `npm run test` or `npm run test:watch`

## Author

👤 **Evgeniy Mokeev**

- Github: [@imprevo](https://github.com/imprevo)

## Show your support

Give a ⭐️ if this project helped you!

I would really appreciate if you could give me some feedback 🙏

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
