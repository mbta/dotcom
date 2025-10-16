import {
  checkRadix3se2t8fmlp8f6 as checkRadix,
  digitOf3au6ftls3g9n1 as digitOf,
} from './numberConversions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
} from '../Char.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { toLongw1zpgk99d84b as toLong } from '../js/numberConversion.mjs';
import { NumberFormatException3bgsm2s9o4t55 as NumberFormatException } from '../exceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function toIntOrNull(_this__u8e3s4) {
  return toIntOrNull_0(_this__u8e3s4, 10);
}
function toLongOrNull(_this__u8e3s4) {
  return toLongOrNull_0(_this__u8e3s4, 10);
}
function toIntOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var start;
  var isNegative;
  var limit;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1)
      return null;
    start = 1;
    if (firstChar === _Char___init__impl__6a9atx(45)) {
      isNegative = true;
      limit = -2147483648;
    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
      isNegative = false;
      limit = -2147483647;
    } else
      return null;
  } else {
    start = 0;
    isNegative = false;
    limit = -2147483647;
  }
  var limitForMaxRadix = -59652323;
  var limitBeforeMul = limitForMaxRadix;
  var result = 0;
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      if (result < limitBeforeMul) {
        if (limitBeforeMul === limitForMaxRadix) {
          limitBeforeMul = limit / radix | 0;
          if (result < limitBeforeMul) {
            return null;
          }
        } else {
          return null;
        }
      }
      result = imul(result, radix);
      if (result < (limit + digit | 0))
        return null;
      result = result - digit | 0;
    }
     while (inductionVariable < length);
  return isNegative ? result : -result | 0;
}
function toLongOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var start;
  var isNegative;
  var limit;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1)
      return null;
    start = 1;
    if (firstChar === _Char___init__impl__6a9atx(45)) {
      isNegative = true;
      limit = new (Long())(0, -2147483648);
    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
      isNegative = false;
      limit = new (Long())(1, -2147483648);
    } else
      return null;
  } else {
    start = 0;
    isNegative = false;
    limit = new (Long())(1, -2147483648);
  }
  // Inline function 'kotlin.Long.div' call
  var limitForMaxRadix = (new (Long())(1, -2147483648)).i4(toLong(36));
  var limitBeforeMul = limitForMaxRadix;
  var result = new (Long())(0, 0);
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      if (result.d2(limitBeforeMul) < 0) {
        if (limitBeforeMul.equals(limitForMaxRadix)) {
          // Inline function 'kotlin.Long.div' call
          limitBeforeMul = limit.i4(toLong(radix));
          if (result.d2(limitBeforeMul) < 0) {
            return null;
          }
        } else {
          return null;
        }
      }
      // Inline function 'kotlin.Long.times' call
      result = result.h4(toLong(radix));
      var tmp = result;
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$3 = limit.f4(toLong(digit));
      if (tmp.d2(tmp$ret$3) < 0)
        return null;
      // Inline function 'kotlin.Long.minus' call
      result = result.g4(toLong(digit));
    }
     while (inductionVariable < length);
  return isNegative ? result : result.m4();
}
function numberFormatError(input) {
  throw NumberFormatException().yg("Invalid number format: '" + input + "'");
}
//region block: exports
export {
  numberFormatError as numberFormatErrorhrxz6mwzt3x8,
  toIntOrNull_0 as toIntOrNull1j8dcc6to13o4,
  toIntOrNull as toIntOrNull3w2d066r9pvwm,
  toLongOrNull as toLongOrNullutqivezb0wx1,
};
//endregion

//# sourceMappingURL=StringNumberConversions.mjs.map
