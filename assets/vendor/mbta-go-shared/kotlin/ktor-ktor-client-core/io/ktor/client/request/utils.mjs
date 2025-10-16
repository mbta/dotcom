import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function header(_this__u8e3s4, key, value) {
  var tmp;
  if (value == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    _this__u8e3s4.l3v().j3j(key, toString(value));
    tmp = Unit_instance;
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? Unit_instance : tmp1_elvis_lhs;
}
function accept(_this__u8e3s4, contentType) {
  return _this__u8e3s4.l3v().j3j(HttpHeaders_getInstance().s3q_1, contentType.toString());
}
function parameter(_this__u8e3s4, key, value) {
  var tmp;
  if (value == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    _this__u8e3s4.g4q_1.v3y_1.j3j(key, toString(value));
    tmp = Unit_instance;
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? Unit_instance : tmp1_elvis_lhs;
}
//region block: exports
export {
  accept as accept2gi3b7wj4jds9,
  header as header3kx6g3yb4df1r,
  parameter as parametera70jh5jb44wd,
};
//endregion

//# sourceMappingURL=utils.mjs.map
