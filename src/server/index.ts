import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';
import { userWelcome } from '../emails/user-welcome';

console.log(`[${exampleEmail1.title}]`, exampleEmail1.build());
console.log(`[${exampleEmail2.title}]`, exampleEmail2.build());
console.log(`[${exampleEmail3.title}]`, exampleEmail3.build());
console.log(
  `[${userWelcome.title}]`,
  userWelcome.build({ name: 'John', product: 'Super Product' })
);
