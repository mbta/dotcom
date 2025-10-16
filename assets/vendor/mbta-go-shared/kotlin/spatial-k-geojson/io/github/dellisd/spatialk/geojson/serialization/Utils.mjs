import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_double1785hcxaminy4 as get_double,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { BoundingBox1jv7w73fxljkp as BoundingBox } from '../BoundingBox.mjs';
import {
  toDoubleArray1tu5g57mgriew as toDoubleArray,
  getOrNull1go7ef9ldk0df as getOrNull,
  joinToString1cxrrlmo0chqs as joinToString,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { joinToString39rl9p9h59k3o as joinToString_0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { Position2rurtvk7dypvc as Position } from '../Position.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function jsonProp(_this__u8e3s4) {
  return _this__u8e3s4 == null ? '' : '"bbox":' + _this__u8e3s4.x1x() + ',';
}
function toBbox(_this__u8e3s4) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
  var _iterator__ex2g4s = _this__u8e3s4.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = get_double(get_jsonPrimitive(item));
    destination.i(tmp$ret$0);
  }
  return BoundingBox().p1x(toDoubleArray(destination));
}
function jsonJoin(_this__u8e3s4, transform) {
  transform = transform === VOID ? null : transform;
  return joinToString_0(_this__u8e3s4, ',', '[', ']', VOID, VOID, transform);
}
function toPosition(_this__u8e3s4) {
  var tmp = get_double(get_jsonPrimitive(_this__u8e3s4.e1(0)));
  var tmp_0 = get_double(get_jsonPrimitive(_this__u8e3s4.e1(1)));
  var tmp0_safe_receiver = getOrNull(_this__u8e3s4, 2);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
  return Position().a1z(tmp, tmp_0, tmp1_safe_receiver == null ? null : get_double(tmp1_safe_receiver));
}
function jsonJoin_0(_this__u8e3s4, transform) {
  transform = transform === VOID ? null : transform;
  return joinToString(_this__u8e3s4, ',', '[', ']', VOID, VOID, transform);
}
//region block: exports
export {
  jsonJoin as jsonJoinxlx6ovh9z3d1,
  jsonJoin_0 as jsonJoin1m0octu4cr9s7,
  jsonProp as jsonProp2nw2o9sd77omw,
  toBbox as toBboxw4lqf28jmpao,
  toPosition as toPosition5jfnwu8drugg,
};
//endregion

//# sourceMappingURL=Utils.mjs.map
