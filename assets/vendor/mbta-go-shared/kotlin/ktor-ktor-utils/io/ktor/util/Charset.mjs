import { charArray2ujmm1qusno00 as charArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { toString3o7ifthqydp6e as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toCharArray(_this__u8e3s4) {
  var tmp = 0;
  var tmp_0 = _this__u8e3s4.length;
  var tmp_1 = charArray(tmp_0);
  while (tmp < tmp_0) {
    var tmp_2 = tmp;
    tmp_1[tmp_2] = charCodeAt(_this__u8e3s4, tmp_2);
    tmp = tmp + 1 | 0;
  }
  return tmp_1;
}
function isLowerCase(_this__u8e3s4) {
  // Inline function 'kotlin.text.lowercaseChar' call
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var tmp$ret$2 = toString(_this__u8e3s4).toLowerCase();
  return charCodeAt(tmp$ret$2, 0) === _this__u8e3s4;
}
//region block: exports
export {
  isLowerCase as isLowerCase2jodys5jo7d58,
  toCharArray as toCharArray1qby3f4cdahde,
};
//endregion

//# sourceMappingURL=Charset.mjs.map
