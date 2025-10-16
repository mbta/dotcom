import { collectionSizeOrNull1v5nsm81on7r9 as collectionSizeOrNull } from './Iterables.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from './LinkedHashSet.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from './collectionJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  addAll1k27qatfgp3k5 as addAll,
  convertToListIfNotCollection2y7m25iq802o0 as convertToListIfNotCollection,
} from './MutableCollections.mjs';
import { toSet2orjxp16sotqu as toSet } from './_Collections.mjs';
import { KtSetjrjc7fhfd6b9 as KtSet } from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function plus(_this__u8e3s4, elements) {
  var tmp0_safe_receiver = collectionSizeOrNull(elements);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = _this__u8e3s4.c1() + tmp0_safe_receiver | 0;
  }
  var tmp1_elvis_lhs = tmp;
  var result = LinkedHashSet().h(mapCapacity(tmp1_elvis_lhs == null ? imul(_this__u8e3s4.c1(), 2) : tmp1_elvis_lhs));
  result.d1(_this__u8e3s4);
  addAll(result, elements);
  return result;
}
function minus(_this__u8e3s4, elements) {
  var other = convertToListIfNotCollection(elements);
  if (other.h1())
    return toSet(_this__u8e3s4);
  if (isInterface(other, KtSet())) {
    // Inline function 'kotlin.collections.filterNotTo' call
    var destination = LinkedHashSet().f1();
    var _iterator__ex2g4s = _this__u8e3s4.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (!other.j1(element)) {
        destination.i(element);
      }
    }
    return destination;
  }
  var result = LinkedHashSet().i1(_this__u8e3s4);
  result.h2(other);
  return result;
}
function plus_0(_this__u8e3s4, element) {
  var result = LinkedHashSet().h(mapCapacity(_this__u8e3s4.c1() + 1 | 0));
  result.d1(_this__u8e3s4);
  result.i(element);
  return result;
}
//region block: exports
export {
  minus as minus165a8u1e0x1lu,
  plus as plus1ogy4liedzq5j,
  plus_0 as plus18eogev54fmsa,
};
//endregion

//# sourceMappingURL=_Sets.mjs.map
