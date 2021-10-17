import { AppConfig } from './types/config';
import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';
import { userWelcome } from '../emails/user-welcome';

export const config: AppConfig = {
  emails: [
    {
      builder: exampleEmail1,
    },
    {
      builder: exampleEmail2,
    },
    {
      builder: exampleEmail3,
    },
    {
      builder: userWelcome,
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
