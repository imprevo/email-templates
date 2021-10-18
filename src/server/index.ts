import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';
import { responsiveTemplateV1 } from '../emails/responsive-template-v1';
import { responsiveTemplateV2 } from '../emails/responsive-template-v2';
import { userWelcome } from '../emails/user-welcome';

const main = async () => {
  console.log(`[${exampleEmail1.title}]`, await exampleEmail1.build());
  console.log(`[${exampleEmail2.title}]`, await exampleEmail2.build());
  console.log(`[${exampleEmail3.title}]`, await exampleEmail3.build());
  console.log(
    `[${userWelcome.title}]`,
    await userWelcome.build({ name: 'John', product: 'Super Product' })
  );
  console.log(
    `[${responsiveTemplateV1.title}]`,
    await responsiveTemplateV1.build()
  );
  console.log(
    `[${responsiveTemplateV2.title}]`,
    await responsiveTemplateV2.build()
  );
};

main();
