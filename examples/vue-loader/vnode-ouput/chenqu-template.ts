// @ts-nocheck
    /* eslint-disable */
    /* tslint:disable */
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
    