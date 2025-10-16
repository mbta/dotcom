import { charArray2ujmm1qusno00 as charArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { concatToString3cxf0c1gqonpo as concatToString } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { numberToChar93r9buh19yek as numberToChar } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { indexOf1xbs558u7wr52 as indexOf } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var BASE64_INVERSE_ALPHABET;
function encodeBase64(_this__u8e3s4) {
  _init_properties_Base64_kt__ymmsz3();
  var array = _this__u8e3s4;
  var position = 0;
  var writeOffset = 0;
  var charArray_0 = charArray((imul(_this__u8e3s4.length, 8) / 6 | 0) + 3 | 0);
  while ((position + 3 | 0) <= array.length) {
    var first = array[position];
    var second = array[position + 1 | 0];
    var third = array[position + 2 | 0];
    position = position + 3 | 0;
    var chunk = (first & 255) << 16 | (second & 255) << 8 | third & 255;
    var inductionVariable = 3;
    if (0 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        var char = chunk >> imul(6, index) & 63;
        var _unary__edvuaz = writeOffset;
        writeOffset = _unary__edvuaz + 1 | 0;
        // Inline function 'io.ktor.util.toBase64' call
        charArray_0[_unary__edvuaz] = charCodeAt('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', char);
      }
       while (0 <= inductionVariable);
  }
  var remaining = array.length - position | 0;
  if (remaining === 0)
    return concatToString(charArray_0, 0, writeOffset);
  var tmp;
  if (remaining === 1) {
    tmp = (array[position] & 255) << 16 | 0 | 0;
  } else {
    tmp = (array[position] & 255) << 16 | (array[position + 1 | 0] & 255) << 8 | 0;
  }
  var chunk_0 = tmp;
  var padSize = imul(3 - remaining | 0, 8) / 6 | 0;
  var inductionVariable_0 = 3;
  if (padSize <= inductionVariable_0)
    do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + -1 | 0;
      var char_0 = chunk_0 >> imul(6, index_0) & 63;
      var _unary__edvuaz_0 = writeOffset;
      writeOffset = _unary__edvuaz_0 + 1 | 0;
      // Inline function 'io.ktor.util.toBase64' call
      charArray_0[_unary__edvuaz_0] = charCodeAt('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', char_0);
    }
     while (!(index_0 === padSize));
  // Inline function 'kotlin.repeat' call
  var inductionVariable_1 = 0;
  if (inductionVariable_1 < padSize)
    do {
      var index_1 = inductionVariable_1;
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      var _unary__edvuaz_1 = writeOffset;
      writeOffset = _unary__edvuaz_1 + 1 | 0;
      charArray_0[_unary__edvuaz_1] = _Char___init__impl__6a9atx(61);
    }
     while (inductionVariable_1 < padSize);
  return concatToString(charArray_0, 0, writeOffset);
}
var properties_initialized_Base64_kt_5g824v;
function _init_properties_Base64_kt__ymmsz3() {
  if (!properties_initialized_Base64_kt_5g824v) {
    properties_initialized_Base64_kt_5g824v = true;
    var tmp = 0;
    var tmp_0 = new Int32Array(256);
    while (tmp < 256) {
      var tmp_1 = tmp;
      tmp_0[tmp_1] = indexOf('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', numberToChar(tmp_1));
      tmp = tmp + 1 | 0;
    }
    // Inline function 'kotlin.also' call
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(45);
    var tmp_2 = Char__toInt_impl_vasixd(this_0);
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(43);
    tmp_0[tmp_2] = tmp_0[Char__toInt_impl_vasixd(this_1)];
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(95);
    var tmp_3 = Char__toInt_impl_vasixd(this_2);
    // Inline function 'kotlin.code' call
    var this_3 = _Char___init__impl__6a9atx(47);
    tmp_0[tmp_3] = tmp_0[Char__toInt_impl_vasixd(this_3)];
    BASE64_INVERSE_ALPHABET = tmp_0;
  }
}
//region block: exports
export {
  encodeBase64 as encodeBase6432vm5zx1em8c4,
};
//endregion

//# sourceMappingURL=Base64.mjs.map
