import { compareTo3ankvs086tmwq as compareTo } from './js/compareTo.mjs';
import {
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
} from './UInt.mjs';
import { toLongw1zpgk99d84b as toLong } from './js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from './Primitives.mjs';
import {
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
} from './ULong.mjs';
import { toString28s61jeiy4rb0 as toString } from './text/numberConversions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function uintCompare(v1, v2) {
  return compareTo(v1 ^ -2147483648, v2 ^ -2147483648);
}
function uintDivide(v1, v2) {
  // Inline function 'kotlin.UInt.toLong' call
  // Inline function 'kotlin.uintToLong' call
  var value = _UInt___get_data__impl__f0vqqw(v1);
  var tmp = toLong(value).s4(new (Long())(-1, 0));
  // Inline function 'kotlin.UInt.toLong' call
  // Inline function 'kotlin.uintToLong' call
  var value_0 = _UInt___get_data__impl__f0vqqw(v2);
  var tmp$ret$3 = toLong(value_0).s4(new (Long())(-1, 0));
  // Inline function 'kotlin.toUInt' call
  var this_0 = tmp.i4(tmp$ret$3);
  return _UInt___init__impl__l7qpdl(this_0.f2());
}
function ulongCompare(v1, v2) {
  return v1.u4(new (Long())(0, -2147483648)).d2(v2.u4(new (Long())(0, -2147483648)));
}
function ulongDivide(v1, v2) {
  // Inline function 'kotlin.ULong.toLong' call
  var dividend = _ULong___get_data__impl__fggpzb(v1);
  // Inline function 'kotlin.ULong.toLong' call
  var divisor = _ULong___get_data__impl__fggpzb(v2);
  if (divisor.d2(new (Long())(0, 0)) < 0) {
    var tmp;
    // Inline function 'kotlin.ULong.compareTo' call
    if (ulongCompare(_ULong___get_data__impl__fggpzb(v1), _ULong___get_data__impl__fggpzb(v2)) < 0) {
      tmp = _ULong___init__impl__c78o9k(new (Long())(0, 0));
    } else {
      tmp = _ULong___init__impl__c78o9k(new (Long())(1, 0));
    }
    return tmp;
  }
  if (dividend.d2(new (Long())(0, 0)) >= 0) {
    return _ULong___init__impl__c78o9k(dividend.i4(divisor));
  }
  var quotient = dividend.r4(1).i4(divisor).p4(1);
  var rem = dividend.g4(quotient.h4(divisor));
  var tmp_0;
  var tmp0 = _ULong___init__impl__c78o9k(rem);
  // Inline function 'kotlin.ULong.compareTo' call
  var other = _ULong___init__impl__c78o9k(divisor);
  if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other)) >= 0) {
    tmp_0 = 1;
  } else {
    tmp_0 = 0;
  }
  // Inline function 'kotlin.Long.plus' call
  var other_0 = tmp_0;
  var tmp$ret$4 = quotient.f4(toLong(other_0));
  return _ULong___init__impl__c78o9k(tmp$ret$4);
}
function ulongToString(value, base) {
  if (value.d2(new (Long())(0, 0)) >= 0)
    return toString(value, base);
  // Inline function 'kotlin.Long.div' call
  var quotient = value.r4(1).i4(toLong(base)).p4(1);
  // Inline function 'kotlin.Long.times' call
  var tmp$ret$1 = quotient.h4(toLong(base));
  var rem = value.g4(tmp$ret$1);
  if (rem.d2(toLong(base)) >= 0) {
    // Inline function 'kotlin.Long.minus' call
    rem = rem.g4(toLong(base));
    // Inline function 'kotlin.Long.plus' call
    quotient = quotient.f4(toLong(1));
  }
  return toString(quotient, base) + toString(rem, base);
}
//region block: exports
export {
  uintCompare as uintCompare18k97xs29243i,
  uintDivide as uintDivide3r5nfwgstcow1,
  ulongCompare as ulongCompare29yg6v52hxi4l,
  ulongDivide as ulongDivide3e52ct8hxp5n7,
  ulongToString as ulongToString1zq54ldfaf473,
};
//endregion

//# sourceMappingURL=UnsignedJs.mjs.map
