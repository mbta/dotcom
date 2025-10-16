//region block: pre-declaration
//endregion
function set_nextHash(_set____db54di) {
  _init_properties_Utils_js_kt__vxye62();
  nextHash = _set____db54di;
}
function get_nextHash() {
  _init_properties_Utils_js_kt__vxye62();
  return nextHash;
}
var nextHash;
function get_weakMap() {
  _init_properties_Utils_js_kt__vxye62();
  return weakMap;
}
var weakMap;
function identityHashCode(instance) {
  _init_properties_Utils_js_kt__vxye62();
  if (instance == null) {
    return 0;
  }
  var tmp0_elvis_lhs = get_weakMap().get(instance);
  return tmp0_elvis_lhs == null ? memoizeIdentityHashCode(instance) : tmp0_elvis_lhs;
}
function memoizeIdentityHashCode(instance) {
  _init_properties_Utils_js_kt__vxye62();
  var _unary__edvuaz = get_nextHash();
  set_nextHash(_unary__edvuaz + 1 | 0);
  var value = _unary__edvuaz;
  get_weakMap().set(instance, value);
  return value;
}
var properties_initialized_Utils_js_kt_vu7oo8;
function _init_properties_Utils_js_kt__vxye62() {
  if (!properties_initialized_Utils_js_kt_vu7oo8) {
    properties_initialized_Utils_js_kt_vu7oo8 = true;
    nextHash = 1;
    weakMap = new WeakMap();
  }
}
//region block: exports
export {
  identityHashCode as identityHashCodew0qom0tyh9de,
};
//endregion

//# sourceMappingURL=Utils.js.mjs.map
