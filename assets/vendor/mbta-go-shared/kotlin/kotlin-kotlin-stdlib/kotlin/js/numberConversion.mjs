import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  fromNumberlmg4m4q7v1cx as fromNumber,
  fromIntrzjmhhsyxuf4 as fromInt,
} from '../longJs.mjs';
import { _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne } from '../UShort.mjs';
import { _Char___init__impl__6a9atx2jcqagb21vxrt as _Char___init__impl__6a9atx } from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toByte(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return a << 24 >> 24;
}
function numberToInt(a) {
  var tmp;
  if (a instanceof Long()) {
    tmp = a.f2();
  } else {
    tmp = doubleToInt(a);
  }
  return tmp;
}
function doubleToInt(a) {
  var tmp;
  if (a > 2147483647) {
    tmp = 2147483647;
  } else if (a < -2147483648) {
    tmp = -2147483648;
  } else {
    // Inline function 'kotlin.js.jsBitwiseOr' call
    tmp = a | 0;
  }
  return tmp;
}
function toShort(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return a << 16 >> 16;
}
function numberToLong(a) {
  var tmp;
  if (a instanceof Long()) {
    tmp = a;
  } else {
    tmp = fromNumber(a);
  }
  return tmp;
}
function numberToChar(a) {
  // Inline function 'kotlin.toUShort' call
  var this_0 = numberToInt(a);
  var tmp$ret$0 = _UShort___init__impl__jigrne(toShort(this_0));
  return _Char___init__impl__6a9atx(tmp$ret$0);
}
function toLong(a) {
  return fromInt(a);
}
//region block: exports
export {
  numberToChar as numberToChar93r9buh19yek,
  numberToInt as numberToInt1ygmcfwhs2fkq,
  numberToLong as numberToLong1a4cndvg6c52s,
  toByte as toByte4i43936u611k,
  toLong as toLongw1zpgk99d84b,
  toShort as toShort36kaw0zjdq3ex,
};
//endregion

//# sourceMappingURL=numberConversion.mjs.map
