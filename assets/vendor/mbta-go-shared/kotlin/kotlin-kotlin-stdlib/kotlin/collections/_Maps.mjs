import { emptyList1g2z5xcrvp2zy as emptyList } from './CollectionsKt.mjs';
import { Paire9pteg33gng7 as Pair } from '../Tuples.mjs';
import { listOfvhqybd2zx248 as listOf } from './collectionJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toList(_this__u8e3s4) {
  if (_this__u8e3s4.c1() === 0)
    return emptyList();
  var iterator = _this__u8e3s4.t1().x();
  if (!iterator.y())
    return emptyList();
  var first = iterator.z();
  if (!iterator.y()) {
    // Inline function 'kotlin.collections.toPair' call
    var tmp$ret$0 = new (Pair())(first.u1(), first.v1());
    return listOf(tmp$ret$0);
  }
  var result = ArrayList().w(_this__u8e3s4.c1());
  // Inline function 'kotlin.collections.toPair' call
  var tmp$ret$1 = new (Pair())(first.u1(), first.v1());
  result.i(tmp$ret$1);
  do {
    // Inline function 'kotlin.collections.toPair' call
    var this_0 = iterator.z();
    var tmp$ret$2 = new (Pair())(this_0.u1(), this_0.v1());
    result.i(tmp$ret$2);
  }
   while (iterator.y());
  return result;
}
//region block: exports
export {
  toList as toList2zksu85ukrmi,
};
//endregion

//# sourceMappingURL=_Maps.mjs.map
