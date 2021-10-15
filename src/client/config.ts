import { AppConfig } from './types/config';
import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';

export const config: AppConfig = {
  emails: [exampleEmail1(), exampleEmail2(), exampleEmail3()],
};
