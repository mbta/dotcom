import { charCodeAt1yspne1d8erbm as charCodeAt } from '../js/charSequenceJs.mjs';
import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function decodeVarLenBase64(base64, fromBase64, resultLength) {
  var result = new Int32Array(resultLength);
  var index = 0;
  var int = 0;
  var shift = 0;
  var inductionVariable = 0;
  var last = base64.length;
  while (inductionVariable < last) {
    var char = charCodeAt(base64, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    // Inline function 'kotlin.code' call
    var sixBit = fromBase64[Char__toInt_impl_vasixd(char)];
    int = int | (sixBit & 31) << shift;
    if (sixBit < 32) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      result[_unary__edvuaz] = int;
      int = 0;
      shift = 0;
    } else {
      shift = shift + 5 | 0;
    }
  }
  return result;
}
//region block: exports
export {
  decodeVarLenBase64 as decodeVarLenBase64j8bxa3rbltzu,
};
//endregion

//# sourceMappingURL=_CharCategories.mjs.map
