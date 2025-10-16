import { numberFormatErrorhrxz6mwzt3x8 as numberFormatError } from './StringNumberConversions.mjs';
import {
  UInt1hthisrv6cndi as UInt,
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
} from '../UInt.mjs';
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
import {
  uintCompare18k97xs29243i as uintCompare,
  uintDivide3r5nfwgstcow1 as uintDivide,
  ulongCompare29yg6v52hxi4l as ulongCompare,
  ulongDivide3e52ct8hxp5n7 as ulongDivide,
} from '../UnsignedJs.mjs';
import {
  ULong3f9k7s38t3rfp as ULong,
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../ULong.mjs';
import {
  UBytep4j7r1t64gz1 as UByte,
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
} from '../UByte.mjs';
import {
  UShort26xnqty60t7le as UShort,
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
  _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245,
} from '../UShort.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  toByte4i43936u611k as toByte,
  toShort36kaw0zjdq3ex as toShort,
} from '../js/numberConversion.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function toUInt(_this__u8e3s4) {
  var tmp0_elvis_lhs = toUIntOrNull(_this__u8e3s4);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (UInt())(tmp_0)) == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toUIntOrNull(_this__u8e3s4) {
  return toUIntOrNull_0(_this__u8e3s4, 10);
}
function toUIntOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var limit = _UInt___init__impl__l7qpdl(-1);
  var start;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1 || !(firstChar === _Char___init__impl__6a9atx(43)))
      return null;
    start = 1;
  } else {
    start = 0;
  }
  var limitForMaxRadix = _UInt___init__impl__l7qpdl(119304647);
  var limitBeforeMul = limitForMaxRadix;
  // Inline function 'kotlin.toUInt' call
  var uradix = _UInt___init__impl__l7qpdl(radix);
  var result = _UInt___init__impl__l7qpdl(0);
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      var tmp0 = result;
      // Inline function 'kotlin.UInt.compareTo' call
      var other = limitBeforeMul;
      if (uintCompare(_UInt___get_data__impl__f0vqqw(tmp0), _UInt___get_data__impl__f0vqqw(other)) > 0) {
        if (limitBeforeMul === limitForMaxRadix) {
          // Inline function 'kotlin.UInt.div' call
          limitBeforeMul = uintDivide(limit, uradix);
          var tmp0_0 = result;
          // Inline function 'kotlin.UInt.compareTo' call
          var other_0 = limitBeforeMul;
          if (uintCompare(_UInt___get_data__impl__f0vqqw(tmp0_0), _UInt___get_data__impl__f0vqqw(other_0)) > 0) {
            return null;
          }
        } else {
          return null;
        }
      }
      // Inline function 'kotlin.UInt.times' call
      var this_0 = result;
      result = _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(uradix)));
      var beforeAdding = result;
      var tmp0_1 = result;
      // Inline function 'kotlin.toUInt' call
      // Inline function 'kotlin.UInt.plus' call
      var other_1 = _UInt___init__impl__l7qpdl(digit);
      result = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_1) + _UInt___get_data__impl__f0vqqw(other_1) | 0);
      // Inline function 'kotlin.UInt.compareTo' call
      var this_1 = result;
      if (uintCompare(_UInt___get_data__impl__f0vqqw(this_1), _UInt___get_data__impl__f0vqqw(beforeAdding)) < 0)
        return null;
    }
     while (inductionVariable < length);
  return result;
}
function toULong(_this__u8e3s4) {
  var tmp0_elvis_lhs = toULongOrNull(_this__u8e3s4);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (ULong())(tmp_0)) == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toUByte(_this__u8e3s4) {
  var tmp0_elvis_lhs = toUByteOrNull(_this__u8e3s4);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (UByte())(tmp_0)) == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toUShort(_this__u8e3s4) {
  var tmp0_elvis_lhs = toUShortOrNull(_this__u8e3s4);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (UShort())(tmp_0)) == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toULongOrNull(_this__u8e3s4) {
  return toULongOrNull_0(_this__u8e3s4, 10);
}
function toUByteOrNull(_this__u8e3s4) {
  return toUByteOrNull_0(_this__u8e3s4, 10);
}
function toUShortOrNull(_this__u8e3s4) {
  return toUShortOrNull_0(_this__u8e3s4, 10);
}
function toULongOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var limit = _ULong___init__impl__c78o9k(new (Long())(-1, -1));
  var start;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1 || !(firstChar === _Char___init__impl__6a9atx(43)))
      return null;
    start = 1;
  } else {
    start = 0;
  }
  var limitForMaxRadix = _ULong___init__impl__c78o9k(new (Long())(477218588, 119304647));
  var limitBeforeMul = limitForMaxRadix;
  // Inline function 'kotlin.toULong' call
  var uradix = _ULong___init__impl__c78o9k(toLong(radix));
  var result = _ULong___init__impl__c78o9k(new (Long())(0, 0));
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      var tmp0 = result;
      // Inline function 'kotlin.ULong.compareTo' call
      var other = limitBeforeMul;
      if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other)) > 0) {
        if (equals(limitBeforeMul, limitForMaxRadix)) {
          // Inline function 'kotlin.ULong.div' call
          limitBeforeMul = ulongDivide(limit, uradix);
          var tmp0_0 = result;
          // Inline function 'kotlin.ULong.compareTo' call
          var other_0 = limitBeforeMul;
          if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_0)) > 0) {
            return null;
          }
        } else {
          return null;
        }
      }
      // Inline function 'kotlin.ULong.times' call
      var this_0 = result;
      result = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).h4(_ULong___get_data__impl__fggpzb(uradix)));
      var beforeAdding = result;
      var tmp0_1 = result;
      // Inline function 'kotlin.toUInt' call
      // Inline function 'kotlin.ULong.plus' call
      // Inline function 'kotlin.UInt.toULong' call
      var this_1 = _UInt___init__impl__l7qpdl(digit);
      // Inline function 'kotlin.uintToULong' call
      // Inline function 'kotlin.uintToLong' call
      var value = _UInt___get_data__impl__f0vqqw(this_1);
      var tmp$ret$6 = toLong(value).s4(new (Long())(-1, 0));
      // Inline function 'kotlin.ULong.plus' call
      var other_1 = _ULong___init__impl__c78o9k(tmp$ret$6);
      result = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(tmp0_1).f4(_ULong___get_data__impl__fggpzb(other_1)));
      // Inline function 'kotlin.ULong.compareTo' call
      var this_2 = result;
      if (ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(beforeAdding)) < 0)
        return null;
    }
     while (inductionVariable < length);
  return result;
}
function toUByteOrNull_0(_this__u8e3s4, radix) {
  var tmp0_elvis_lhs = toUIntOrNull_0(_this__u8e3s4, radix);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (UInt())(tmp_0)) == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var int = tmp;
  // Inline function 'kotlin.UInt.compareTo' call
  // Inline function 'kotlin.UByte.toUInt' call
  var this_0 = _UByte___init__impl__g9hnc4(-1);
  // Inline function 'kotlin.UInt.compareTo' call
  var other = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(this_0) & 255);
  if (uintCompare(_UInt___get_data__impl__f0vqqw(int), _UInt___get_data__impl__f0vqqw(other)) > 0)
    return null;
  // Inline function 'kotlin.UInt.toUByte' call
  // Inline function 'kotlin.toUByte' call
  var this_1 = _UInt___get_data__impl__f0vqqw(int);
  return _UByte___init__impl__g9hnc4(toByte(this_1));
}
function toUShortOrNull_0(_this__u8e3s4, radix) {
  var tmp0_elvis_lhs = toUIntOrNull_0(_this__u8e3s4, radix);
  var tmp;
  var tmp_0 = tmp0_elvis_lhs;
  if ((tmp_0 == null ? null : new (UInt())(tmp_0)) == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var int = tmp;
  // Inline function 'kotlin.UInt.compareTo' call
  // Inline function 'kotlin.UShort.toUInt' call
  var this_0 = _UShort___init__impl__jigrne(-1);
  // Inline function 'kotlin.UInt.compareTo' call
  var other = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(this_0) & 65535);
  if (uintCompare(_UInt___get_data__impl__f0vqqw(int), _UInt___get_data__impl__f0vqqw(other)) > 0)
    return null;
  // Inline function 'kotlin.UInt.toUShort' call
  // Inline function 'kotlin.toUShort' call
  var this_1 = _UInt___get_data__impl__f0vqqw(int);
  return _UShort___init__impl__jigrne(toShort(this_1));
}
//region block: exports
export {
  toUByte as toUByteh6p4wmqswkrs,
  toUInt as toUInt21lx0mz8wkp7c,
  toULongOrNull as toULongOrNullojoyxi0i9tgj,
  toULong as toULong266mnyksbttkw,
  toUShort as toUShort7yqspfnhrot4,
};
//endregion

//# sourceMappingURL=UStrings.mjs.map
