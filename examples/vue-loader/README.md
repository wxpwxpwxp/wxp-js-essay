# why

作为一个臭写 vue 的，我觉得有必要知道从写代码到代码在浏览器中执行发生了什么

## coding

新建一个 vue sfc (single file component)

```vue
// chenqu.vue
<template>
  <div class="face">
    <div class="eye">
      {{ eye }}
    </div>
    <div
      class="mouth"
      @click="say"
    >
      {{ mouth }}
    </div>
    <other
      :foo="eye"
      :class="mouth"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import other from './other.vue';

export default defineComponent({
  name: 'ChenQu',
  components: {
    other,
  },
  setup() {
    const eyeRef = ref('小');
    const mouthRef = ref('大');

    const say = () => {
      alert('美女，约么');
    };

    return {
      eye: eyeRef,
      mouth: mouthRef,
      say,
    };
  },
});
</script>

<style scoped>
.face {
  position: relative;
}
</style>
```

这个 chenqu 组件的模板以及属性中有眼睛、嘴巴等值，以及用嘴巴撩妹这个函数，还使用了 ohter.vue 这个组件

```js
// ohter.vue
<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'OtHer',
  setup() {
    return () => h('div', '1111');
  },
});
</script>
```

## vue-loader & complier sfc

> 一个可视化 ast 生成的网站：[https://astexplorer.net/](https://astexplorer.net/)，可以切换为 vue + @vue/compiler-dom

这里简单的说下 vue-loader 干了什么，通过 [@vue/compiler-sfc](https://www.npmjs.com/package/@vue/compiler-sfc) 将一个 sfc 分为三个模块，并且得到编译 template 得到 ast 后生成 返回 vode 的 render  函数

还有一点组件 style 的 scopeId 就是在这一阶段生成的，以及一些其他需要编译阶段挂载的值，比如 dev tools 里一键打开 sfc 文件，文件路径也是在这个时候 挂载到 componentOptions 上的

```js
// chenqu.vue?vue&type=template
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, normalizeClass as _normalizeClass, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { class: "face" }
const _hoisted_2 = { class: "eye" }

export function render(_ctx, _cache) {
  const _component_other = _resolveComponent("other")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, _toDisplayString(_ctx.eye), 1 /* TEXT */),
    _createElementVNode("div", {
      class: "mouth",
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.say && _ctx.say(...args)))
    }, _toDisplayString(_ctx.mouth), 1 /* TEXT */),
    _createVNode(_component_other, {
      foo: _ctx.eye,
      class: _normalizeClass(_ctx.mouth)
    }, null, 8 /* PROPS */, ["foo", "class"])
  ]))
}
```

```js
// chenqu.vue?vue&type=script
import { defineComponent, ref } from 'vue';
import other from './other.vue';

export default defineComponent({
  name: 'ChenQu',
  components: {
    other,
  },
  setup() {
    const eyeRef = ref('小');
    const mouthRef = ref('大');

    const say = () => {
      alert('美女，约么');
    };

    return {
      eye: eyeRef,
      mouth: mouthRef,
      say,
    };
  },
});
```

```js
// chenqu.vue?vue&type=style
.face[data-v-xxxxx] {
  position: relative;
}
```

最终结果

```js
import { render } from './chenqu?vue&type=template'
import script from './chenqu?vue&type=script'
script.render = render

export * from './chenqu.js?vue&type=script'
```

## create sfc & mount in browser

理解 vue3 工作了解下以下几个函数
以 RootRenderFunction 这个函数（createApp）为入口（根节点），生成 vnodeTree 和 渲染

* effect：vue3 依赖收集
* mountComponent：创建 vm，初始化响应式 ctx，以及根据 setup 函数的 返回值，挂载组件的 render 函数
* setupRenderEffect：vm.update 挂载一个 effect 对象，用于 render 的时候依赖收集，以及 effect sheduler 将 当前 effect 加入 queueJob 下一个 tick 进行 diff 更新
* renderComponentRoot：调用组件 render
* createVNode：组件 render 函数，会返回根据 template 创建的 vnode， vnode 上会带有 componentOptions，以及 directive 等 template 标签上的属性
