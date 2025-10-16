import { WindowDispatcheram3q94j2gxvn as WindowDispatcher } from './JSDispatcher.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function asCoroutineDispatcher(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_elvis_lhs = _this__u8e3s4.coroutineDispatcher;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = new (WindowDispatcher())(_this__u8e3s4);
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.coroutineDispatcher = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
//region block: exports
export {
  asCoroutineDispatcher as asCoroutineDispatcher25c53h6jk6y75,
};
//endregion

//# sourceMappingURL=Window.mjs.map
