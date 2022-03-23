import componentOptions from './vnode-ouput/chenqu.vue';

describe('render get vnode', () => {
  it('should get right vnode', () => {
    console.log(componentOptions);
    console.log(componentOptions.render?.());
  });
});
