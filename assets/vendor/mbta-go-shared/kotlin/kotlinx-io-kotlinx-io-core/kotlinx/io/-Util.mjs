import {
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_HEX_DIGIT_CHARS() {
  _init_properties__Util_kt__g8tcl9();
  return HEX_DIGIT_CHARS;
}
var HEX_DIGIT_CHARS;
function checkBounds(size, startIndex, endIndex) {
  _init_properties__Util_kt__g8tcl9();
  if (startIndex.d2(new (Long())(0, 0)) < 0 || endIndex.d2(size) > 0) {
    throw IndexOutOfBoundsException().jg('startIndex (' + startIndex.toString() + ') and endIndex (' + endIndex.toString() + ') are not within the range [0..size(' + size.toString() + '))');
  }
  if (startIndex.d2(endIndex) > 0) {
    throw IllegalArgumentException().q('startIndex (' + startIndex.toString() + ') > endIndex (' + endIndex.toString() + ')');
  }
}
function checkOffsetAndCount(size, offset, byteCount) {
  _init_properties__Util_kt__g8tcl9();
  if (offset.d2(new (Long())(0, 0)) < 0 || offset.d2(size) > 0 || size.g4(offset).d2(byteCount) < 0 || byteCount.d2(new (Long())(0, 0)) < 0) {
    throw IllegalArgumentException().q('offset (' + offset.toString() + ') and byteCount (' + byteCount.toString() + ') are not within the range [0..size(' + size.toString() + '))');
  }
}
var properties_initialized__Util_kt_67kc5b;
function _init_properties__Util_kt__g8tcl9() {
  if (!properties_initialized__Util_kt_67kc5b) {
    properties_initialized__Util_kt_67kc5b = true;
    // Inline function 'kotlin.charArrayOf' call
    HEX_DIGIT_CHARS = charArrayOf([_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(49), _Char___init__impl__6a9atx(50), _Char___init__impl__6a9atx(51), _Char___init__impl__6a9atx(52), _Char___init__impl__6a9atx(53), _Char___init__impl__6a9atx(54), _Char___init__impl__6a9atx(55), _Char___init__impl__6a9atx(56), _Char___init__impl__6a9atx(57), _Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(98), _Char___init__impl__6a9atx(99), _Char___init__impl__6a9atx(100), _Char___init__impl__6a9atx(101), _Char___init__impl__6a9atx(102)]);
  }
}
//region block: exports
export {
  get_HEX_DIGIT_CHARS as get_HEX_DIGIT_CHARS28oau3fmf5vf6,
  checkBounds as checkBoundsw7d8y6z7j2xc,
  checkOffsetAndCount as checkOffsetAndCountazlu23xkuwoi,
};
//endregion

//# sourceMappingURL=-Util.mjs.map
