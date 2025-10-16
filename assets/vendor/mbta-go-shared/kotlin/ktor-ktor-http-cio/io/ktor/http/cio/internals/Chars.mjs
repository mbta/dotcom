import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  toString3o7ifthqydp6e as toString,
  Char19o2r8palgjof as Char,
  Char__plus_impl_qi7pgj3akekecdud2w6 as Char__plus_impl_qi7pgj,
  Char__minus_impl_a2frrh3t0v4pviuv4om as Char__minus_impl_a2frrh,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
  toByte4i43936u611k as toByte,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { NumberFormatException3bgsm2s9o4t55 as NumberFormatException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_instance221g6q0tngtzz as Companion_instance } from './AsciiCharTree.mjs';
import { Companion_getInstance1p3cpld7r1jz3 as Companion_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  toLongArray23ixicpzp5r3w as toLongArray,
  toByteArray3caw0hip00os as toByteArray,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var DefaultHttpMethods;
var HexTable;
var HexLetterTable;
function parseDecLong(_this__u8e3s4) {
  _init_properties_Chars_kt__d3i39x();
  var length = charSequenceLength(_this__u8e3s4);
  if (length > 19) {
    numberFormatException(_this__u8e3s4);
  }
  if (length === 19)
    return parseDecLongWithCheck(_this__u8e3s4);
  var result = new (Long())(0, 0);
  var inductionVariable = 0;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(_this__u8e3s4, i);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      var digit = toLong(tmp$ret$0).g4(new (Long())(48, 0));
      if (digit.d2(new (Long())(0, 0)) < 0 || digit.d2(new (Long())(9, 0)) > 0) {
        numberFormatException_0(_this__u8e3s4, i);
      }
      result = result.p4(3).f4(result.p4(1)).f4(digit);
    }
     while (inductionVariable < length);
  return result;
}
function hashCodeLowerCase(_this__u8e3s4, start, end) {
  start = start === VOID ? 0 : start;
  end = end === VOID ? charSequenceLength(_this__u8e3s4) : end;
  _init_properties_Chars_kt__d3i39x();
  var hashCode = 0;
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var pos = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(_this__u8e3s4, pos);
      // Inline function 'io.ktor.http.cio.internals.toLowerCase' call
      var this_1 = Char__toInt_impl_vasixd(this_0);
      var tmp;
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      var containsLower = Char__toInt_impl_vasixd(this_2);
      var tmp_0;
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(90);
      if (this_1 <= Char__toInt_impl_vasixd(this_3)) {
        tmp_0 = containsLower <= this_1;
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        // Inline function 'kotlin.code' call
        var this_4 = _Char___init__impl__6a9atx(97);
        var tmp_1 = Char__toInt_impl_vasixd(this_4);
        // Inline function 'kotlin.code' call
        var this_5 = _Char___init__impl__6a9atx(65);
        tmp = tmp_1 + (this_1 - Char__toInt_impl_vasixd(this_5) | 0) | 0;
      } else {
        tmp = this_1;
      }
      var v = tmp;
      hashCode = imul(31, hashCode) + v | 0;
    }
     while (inductionVariable < end);
  return hashCode;
}
function equalsLowerCase(_this__u8e3s4, start, end, other) {
  start = start === VOID ? 0 : start;
  end = end === VOID ? charSequenceLength(_this__u8e3s4) : end;
  _init_properties_Chars_kt__d3i39x();
  if (!((end - start | 0) === charSequenceLength(other)))
    return false;
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var pos = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(_this__u8e3s4, pos);
      // Inline function 'io.ktor.http.cio.internals.toLowerCase' call
      var this_1 = Char__toInt_impl_vasixd(this_0);
      var tmp;
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      var containsLower = Char__toInt_impl_vasixd(this_2);
      var tmp_0;
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(90);
      if (this_1 <= Char__toInt_impl_vasixd(this_3)) {
        tmp_0 = containsLower <= this_1;
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        // Inline function 'kotlin.code' call
        var this_4 = _Char___init__impl__6a9atx(97);
        var tmp_1 = Char__toInt_impl_vasixd(this_4);
        // Inline function 'kotlin.code' call
        var this_5 = _Char___init__impl__6a9atx(65);
        tmp = tmp_1 + (this_1 - Char__toInt_impl_vasixd(this_5) | 0) | 0;
      } else {
        tmp = this_1;
      }
      var tmp_2 = tmp;
      // Inline function 'kotlin.code' call
      var this_6 = charSequenceGet(other, pos - start | 0);
      // Inline function 'io.ktor.http.cio.internals.toLowerCase' call
      var this_7 = Char__toInt_impl_vasixd(this_6);
      var tmp_3;
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(65);
      var containsLower_0 = Char__toInt_impl_vasixd(this_8);
      var tmp_4;
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(90);
      if (this_7 <= Char__toInt_impl_vasixd(this_9)) {
        tmp_4 = containsLower_0 <= this_7;
      } else {
        tmp_4 = false;
      }
      if (tmp_4) {
        // Inline function 'kotlin.code' call
        var this_10 = _Char___init__impl__6a9atx(97);
        var tmp_5 = Char__toInt_impl_vasixd(this_10);
        // Inline function 'kotlin.code' call
        var this_11 = _Char___init__impl__6a9atx(65);
        tmp_3 = tmp_5 + (this_7 - Char__toInt_impl_vasixd(this_11) | 0) | 0;
      } else {
        tmp_3 = this_7;
      }
      if (!(tmp_2 === tmp_3))
        return false;
    }
     while (inductionVariable < end);
  return true;
}
function numberFormatException(cs) {
  _init_properties_Chars_kt__d3i39x();
  throw NumberFormatException().yg('Invalid number ' + toString_0(cs) + ': too large for Long type');
}
function parseDecLongWithCheck(_this__u8e3s4) {
  _init_properties_Chars_kt__d3i39x();
  var result = new (Long())(0, 0);
  var inductionVariable = 0;
  var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(_this__u8e3s4, i);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      var digit = toLong(tmp$ret$0).g4(new (Long())(48, 0));
      if (digit.d2(new (Long())(0, 0)) < 0 || digit.d2(new (Long())(9, 0)) > 0) {
        numberFormatException_0(_this__u8e3s4, i);
      }
      result = result.p4(3).f4(result.p4(1)).f4(digit);
      if (result.d2(new (Long())(0, 0)) < 0) {
        numberFormatException(_this__u8e3s4);
      }
    }
     while (inductionVariable <= last);
  return result;
}
function numberFormatException_0(cs, idx) {
  _init_properties_Chars_kt__d3i39x();
  throw NumberFormatException().yg('Invalid number: ' + toString_0(cs) + ', wrong digit: ' + toString(charSequenceGet(cs, idx)) + ' at position ' + idx);
}
function DefaultHttpMethods$lambda(it) {
  _init_properties_Chars_kt__d3i39x();
  return it.u3v_1.length;
}
function DefaultHttpMethods$lambda_0(m, idx) {
  _init_properties_Chars_kt__d3i39x();
  return new (Char())(charCodeAt(m.u3v_1, idx));
}
var properties_initialized_Chars_kt_phjfhp;
function _init_properties_Chars_kt__d3i39x() {
  if (!properties_initialized_Chars_kt_phjfhp) {
    properties_initialized_Chars_kt_phjfhp = true;
    var tmp = Companion_instance;
    var tmp_0 = Companion_getInstance().t3v_1;
    var tmp_1 = DefaultHttpMethods$lambda;
    DefaultHttpMethods = tmp.c49(tmp_0, tmp_1, DefaultHttpMethods$lambda_0);
    // Inline function 'kotlin.collections.map' call
    var this_0 = numberRangeToNumber(0, 255);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
    var inductionVariable = this_0.x1_1;
    var last = this_0.y1_1;
    if (inductionVariable <= last)
      do {
        var item = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var v = item;
        var tmp_2;
        if (48 <= v ? v <= 57 : false) {
          tmp_2 = numberToLong(v).g4(new (Long())(48, 0));
        } else {
          var tmp_3;
          var tmp_4 = toLong(v);
          // Inline function 'kotlin.code' call
          var this_1 = _Char___init__impl__6a9atx(97);
          var tmp$ret$0 = Char__toInt_impl_vasixd(this_1);
          if (tmp_4.d2(toLong(tmp$ret$0)) >= 0) {
            var tmp_5 = toLong(v);
            // Inline function 'kotlin.code' call
            var this_2 = _Char___init__impl__6a9atx(102);
            var tmp$ret$1 = Char__toInt_impl_vasixd(this_2);
            tmp_3 = tmp_5.d2(toLong(tmp$ret$1)) <= 0;
          } else {
            tmp_3 = false;
          }
          if (tmp_3) {
            // Inline function 'kotlin.code' call
            var this_3 = _Char___init__impl__6a9atx(97);
            var tmp$ret$2 = Char__toInt_impl_vasixd(this_3);
            // Inline function 'kotlin.Long.plus' call
            tmp_2 = numberToLong(v).g4(toLong(tmp$ret$2)).f4(toLong(10));
          } else {
            var tmp_6;
            var tmp_7 = toLong(v);
            // Inline function 'kotlin.code' call
            var this_4 = _Char___init__impl__6a9atx(65);
            var tmp$ret$4 = Char__toInt_impl_vasixd(this_4);
            if (tmp_7.d2(toLong(tmp$ret$4)) >= 0) {
              var tmp_8 = toLong(v);
              // Inline function 'kotlin.code' call
              var this_5 = _Char___init__impl__6a9atx(70);
              var tmp$ret$5 = Char__toInt_impl_vasixd(this_5);
              tmp_6 = tmp_8.d2(toLong(tmp$ret$5)) <= 0;
            } else {
              tmp_6 = false;
            }
            if (tmp_6) {
              // Inline function 'kotlin.code' call
              var this_6 = _Char___init__impl__6a9atx(65);
              var tmp$ret$6 = Char__toInt_impl_vasixd(this_6);
              // Inline function 'kotlin.Long.plus' call
              tmp_2 = numberToLong(v).g4(toLong(tmp$ret$6)).f4(toLong(10));
            } else {
              tmp_2 = new (Long())(-1, -1);
            }
          }
        }
        var tmp$ret$8 = tmp_2;
        destination.i(tmp$ret$8);
      }
       while (!(item === last));
    HexTable = toLongArray(destination);
    // Inline function 'kotlin.collections.map' call
    var this_7 = numberRangeToNumber(0, 15);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList().w(collectionSizeOrDefault(this_7, 10));
    var inductionVariable_0 = this_7.x1_1;
    var last_0 = this_7.y1_1;
    if (inductionVariable_0 <= last_0)
      do {
        var item_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var it = item_0;
        var tmp_9;
        if (it < 10) {
          tmp_9 = toByte(48 + it | 0);
        } else {
          // Inline function 'kotlin.code' call
          var this_8 = Char__minus_impl_a2frrh(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(97), it), 10);
          var tmp$ret$0_0 = Char__toInt_impl_vasixd(this_8);
          tmp_9 = toByte(tmp$ret$0_0);
        }
        var tmp$ret$1_0 = tmp_9;
        destination_0.i(tmp$ret$1_0);
      }
       while (!(item_0 === last_0));
    HexLetterTable = toByteArray(destination_0);
  }
}
//region block: exports
export {
  equalsLowerCase as equalsLowerCase1477z9rxwgcv2,
  hashCodeLowerCase as hashCodeLowerCase2r6jfpu8gi2u9,
  parseDecLong as parseDecLongacrqck1443il,
};
//endregion

//# sourceMappingURL=Chars.mjs.map
