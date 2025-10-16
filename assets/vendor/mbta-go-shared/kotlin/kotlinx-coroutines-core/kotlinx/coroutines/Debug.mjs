import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var counter;
function get_DEBUG() {
  return DEBUG;
}
var DEBUG;
function get_classSimpleName(_this__u8e3s4) {
  var tmp0_elvis_lhs = getKClassFromExpression(_this__u8e3s4).gh();
  return tmp0_elvis_lhs == null ? 'Unknown' : tmp0_elvis_lhs;
}
function get_hexAddress(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  var result = _this__u8e3s4.__debug_counter;
  if (!(typeof result === 'number')) {
    counter = counter + 1 | 0;
    result = counter;
    // Inline function 'kotlin.js.asDynamic' call
    _this__u8e3s4.__debug_counter = result;
  }
  return ((!(result == null) ? typeof result === 'number' : false) ? result : THROW_CCE()).toString();
}
//region block: init
counter = 0;
DEBUG = false;
//endregion
//region block: exports
export {
  get_DEBUG as get_DEBUG1a8uv2i5oid01,
  get_classSimpleName as get_classSimpleName2jgk6lzg9ft1,
  get_hexAddress as get_hexAddress1mxa7txdmiojm,
};
//endregion

//# sourceMappingURL=Debug.mjs.map
