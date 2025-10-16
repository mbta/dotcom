import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from './CollectionsKt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function reverse(_this__u8e3s4) {
  var midPoint = (_this__u8e3s4.c1() / 2 | 0) - 1 | 0;
  if (midPoint < 0)
    return Unit_instance;
  var reverseIndex = get_lastIndex(_this__u8e3s4);
  var inductionVariable = 0;
  if (inductionVariable <= midPoint)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = _this__u8e3s4.e1(index);
      _this__u8e3s4.q3(index, _this__u8e3s4.e1(reverseIndex));
      _this__u8e3s4.q3(reverseIndex, tmp);
      reverseIndex = reverseIndex - 1 | 0;
    }
     while (!(index === midPoint));
}
//region block: exports
export {
  reverse as reversenv3adafjrtzo,
};
//endregion

//# sourceMappingURL=_CollectionsJs.mjs.map
