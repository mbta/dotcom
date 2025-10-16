import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../Char.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function digitToIntImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Digit_getInstance().r6_1, ch);
  var diff = ch - Digit_getInstance().r6_1[index] | 0;
  return diff < 10 ? diff : -1;
}
function binarySearchRange(array, needle) {
  var bottom = 0;
  var top = array.length - 1 | 0;
  var middle = -1;
  var value = 0;
  while (bottom <= top) {
    middle = (bottom + top | 0) / 2 | 0;
    value = array[middle];
    if (needle > value)
      bottom = middle + 1 | 0;
    else if (needle === value)
      return middle;
    else
      top = middle - 1 | 0;
  }
  return middle - (needle < value ? 1 : 0) | 0;
}
var DigitClass;
function Digit() {
  if (DigitClass === VOID) {
    class $ {
      constructor() {
        Digit_instance = this;
        var tmp = this;
        // Inline function 'kotlin.intArrayOf' call
        tmp.r6_1 = new Int32Array([48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296]);
      }
    }
    initMetadataForObject($, 'Digit');
    DigitClass = $;
  }
  return DigitClass;
}
var Digit_instance;
function Digit_getInstance() {
  if (Digit_instance === VOID)
    new (Digit())();
  return Digit_instance;
}
//region block: exports
export {
  binarySearchRange as binarySearchRange3kxkkwuchjxxl,
  digitToIntImpl as digitToIntImpl1nni1gbif0rxc,
};
//endregion

//# sourceMappingURL=_DigitChars.mjs.map
