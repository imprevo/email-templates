import { renderToStaticMarkup } from 'react-dom/server';
import { exampleEmail1, exampleEmail2, exampleEmail3 } from '../emails/example';

console.log(exampleEmail1());
console.log(exampleEmail2());
console.log(renderToStaticMarkup(exampleEmail3()));
