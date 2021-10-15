import { AppConfig } from './types/config';
import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';
import { UserWelcome } from '../emails/user-welcome';

export const config: AppConfig = {
  emails: [
    {
      title: 'Example 1',
      template: exampleEmail1,
    },
    {
      title: 'Example 2',
      template: exampleEmail2,
    },
    {
      title: 'Example 3 (react)',
      template: exampleEmail3,
    },
    {
      title: 'React example',
      template: UserWelcome,
      data: [
        {
          description: 'Welcome John',
          params: { name: 'John', product: 'Super Product' },
        },
        {
          description: 'Welcome Anna',
          params: { name: 'Anna', product: 'Another Super Product' },
        },
      ],
    },
  ],
};
