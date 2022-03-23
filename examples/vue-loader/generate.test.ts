import fs from 'fs/promises';
import path from 'path';

import { parse, compileTemplate } from '@vue/compiler-sfc';

describe('how vue and vue-loader work', () => {
  it('should generate render fn by webpack', async()=> {
    const buffer = await fs.readFile(path.resolve(__dirname, './chenqu.vue'));
    const data = new TextDecoder().decode(buffer);

    const { descriptor } = parse(data, { sourceMap: false });

    const ret = compileTemplate({
      source: descriptor.template?.content as string,
      filename: 'chenqu',
      id: '12345',
    });

    await fs.writeFile(path.resolve(__dirname, './webpack-ouput/chenqu.js?vue&type=template'), ret.code);

    const templateImport = 'import { render } from \'./chenqu?vue&type=template\'';

    await fs.writeFile(path.resolve(__dirname, './webpack-ouput/chenqu.js?vue&type=script'), descriptor.script?.content ?? '');

    const scriptImport = 'import script from \'./chenqu?vue&type=script\'';

    const code = `// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${templateImport}
    ${scriptImport}
    script.render = render

    export * from './chenqu.js?vue&type=script'
    `;

    await fs.writeFile(path.resolve(__dirname, './webpack-ouput/chenqu.js'), code);
  });

  it('should output chenqu component options', async() => {
    const buffer = await fs.readFile(path.resolve(__dirname, './chenqu.vue'));
    const data = new TextDecoder().decode(buffer);

    const { descriptor } = parse(data, { sourceMap: false });

    const ret = compileTemplate({
      source: descriptor.template?.content as string,
      filename: 'chenqu',
      id: '12345',
    });

    await fs.writeFile(path.resolve(__dirname, './vnode-ouput/chenqu-template.ts'), `// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${ret.code}
    `);

    const templateImport = 'import { render } from \'./chenqu-template\'';

    await fs.writeFile(path.resolve(__dirname, './vnode-ouput/chenqu-script.ts'), `// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${descriptor.script?.content ?? ''}
    `);

    const scriptImport = 'import script from \'./chenqu-script\'';

    const code = `  // @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${templateImport}
    ${scriptImport}
    script.render = render

    export default script
    export * from './chenqu-script'
    `;

    await fs.writeFile(path.resolve(__dirname, './vnode-ouput/chenqu.vue.ts'), code);
  });

  it('should output other component options', async() => {
    const buffer = await fs.readFile(path.resolve(__dirname, './other.vue'));
    const data = new TextDecoder().decode(buffer);

    const { descriptor } = parse(data, { sourceMap: false });

    await fs.writeFile(path.resolve(__dirname, './vnode-ouput/other-script.ts'), `// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${descriptor.script?.content ?? ''}
    `);

    const scriptImport = 'import script from \'./other-script\'';

    const code = `  // @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
    ${scriptImport}

    export default script
    export * from './chenqu-script'
    `;

    await fs.writeFile(path.resolve(__dirname, './vnode-ouput/other.vue.ts'), code);
  });
});
