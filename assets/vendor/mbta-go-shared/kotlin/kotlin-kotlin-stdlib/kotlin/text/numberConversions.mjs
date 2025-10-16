import { toStringImpl1saq6ihtubqhu as toStringImpl } from '../longJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { isNaNymqb93xtq8w8 as isNaN_0 } from '../NumbersJs.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from './Strings.mjs';
import {
  toLongOrNullutqivezb0wx1 as toLongOrNull,
  numberFormatErrorhrxz6mwzt3x8 as numberFormatError,
  toIntOrNull3w2d066r9pvwm as toIntOrNull,
  toIntOrNull1j8dcc6to13o4 as toIntOrNull_0,
} from './StringNumberConversions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { digitToIntImpl1nni1gbif0rxc as digitToIntImpl } from './_DigitChars.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
} from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toString(_this__u8e3s4, radix) {
  return toStringImpl(_this__u8e3s4, checkRadix(radix));
}
function checkRadix(radix) {
  if (!(2 <= radix ? radix <= 36 : false)) {
    throw IllegalArgumentException().q('radix ' + radix + ' was not in valid range 2..36');
  }
  return radix;
}
function toDoubleOrNull(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.takeIf' call
  var this_0 = +_this__u8e3s4;
  var tmp;
  if (!(isNaN_0(this_0) && !isNaN_1(_this__u8e3s4) || (this_0 === 0.0 && isBlank(_this__u8e3s4)))) {
    tmp = this_0;
  } else {
    tmp = null;
  }
  return tmp;
}
function toLong(_this__u8e3s4) {
  var tmp0_elvis_lhs = toLongOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toInt(_this__u8e3s4) {
  var tmp0_elvis_lhs = toIntOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toString_0(_this__u8e3s4, radix) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.toString(checkRadix(radix));
}
function toDouble(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.also' call
  var this_0 = +_this__u8e3s4;
  if (isNaN_0(this_0) && !isNaN_1(_this__u8e3s4) || (this_0 === 0.0 && isBlank(_this__u8e3s4))) {
    numberFormatError(_this__u8e3s4);
  }
  return this_0;
}
function digitOf(char, radix) {
  // Inline function 'kotlin.let' call
  var it = Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(48)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(57)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(48)) : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(90)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(97)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(122)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(97)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(128)) < 0 ? -1 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65313)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65338)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65313)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65345)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65370)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65345)) + 10 | 0 : digitToIntImpl(char);
  return it >= radix ? -1 : it;
}
function isNaN_1(_this__u8e3s4) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  switch (_this__u8e3s4.toLowerCase()) {
    case 'nan':
    case '+nan':
    case '-nan':
      return true;
    default:
      return false;
  }
}
function toInt_0(_this__u8e3s4, radix) {
  var tmp0_elvis_lhs = toIntOrNull_0(_this__u8e3s4, radix);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
//region block: exports
export {
  checkRadix as checkRadix3se2t8fmlp8f6,
  digitOf as digitOf3au6ftls3g9n1,
  toDoubleOrNull as toDoubleOrNullkxwozihadygj,
  toDouble as toDouble1kn912gjoizjp,
  toInt as toInt2q8uldh7sc951,
  toInt_0 as toInt5qdj874w69jh,
  toLong as toLongkk4waq8msp1k,
  toString_0 as toString1h6jjoch8cjt8,
  toString as toString28s61jeiy4rb0,
};
//endregion

//# sourceMappingURL=numberConversions.mjs.map
