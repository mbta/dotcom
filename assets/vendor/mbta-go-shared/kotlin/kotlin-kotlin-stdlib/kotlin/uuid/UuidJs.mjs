import {
  coerceAtMost322komnqp70ag as coerceAtMost,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
} from '../ranges/_Ranges.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  hexToInt2afwk02t24u35 as hexToInt,
  get_BYTE_TO_LOWER_CASE_HEX_DIGITS2mrc5tv7dfn1l as get_BYTE_TO_LOWER_CASE_HEX_DIGITS,
} from '../text/HexExtensions.mjs';
import {
  checkHyphenAt7pl6v3cdv93i as checkHyphenAt,
  Companion_getInstance1cdckxf15vkye as Companion_getInstance,
  uuidFromRandomBytes2q8crvps0uzc as uuidFromRandomBytes,
} from './Uuid.mjs';
import { toByte4i43936u611k as toByte } from '../js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function formatBytesInto(_this__u8e3s4, dst, dstOffset, startIndex, endIndex) {
  var dstIndex = dstOffset;
  if (startIndex < 4) {
    dstIndex = formatBytesInto_0(_this__u8e3s4.c2_1, dst, dstIndex, startIndex, coerceAtMost(endIndex, 4));
  }
  if (endIndex > 4) {
    formatBytesInto_0(_this__u8e3s4.b2_1, dst, dstIndex, coerceAtLeast(startIndex - 4 | 0, 0), endIndex - 4 | 0);
  }
}
function getLongAt(_this__u8e3s4, index) {
  var tmp0_high = getIntAt(_this__u8e3s4, index);
  var tmp1_low = getIntAt(_this__u8e3s4, index + 4 | 0);
  return new (Long())(tmp1_low, tmp0_high);
}
function uuidParseHexDash(hexDashString) {
  var part1 = hexToInt(hexDashString, 0, 8);
  checkHyphenAt(hexDashString, 8);
  var part2 = hexToInt(hexDashString, 9, 13);
  checkHyphenAt(hexDashString, 13);
  var part3 = hexToInt(hexDashString, 14, 18);
  checkHyphenAt(hexDashString, 18);
  var part4 = hexToInt(hexDashString, 19, 23);
  checkHyphenAt(hexDashString, 23);
  var part5a = hexToInt(hexDashString, 24, 28);
  var part5b = hexToInt(hexDashString, 28, 36);
  var tmp0_low = part2 << 16 | part3;
  var msb = new (Long())(tmp0_low, part1);
  var tmp1_high = part4 << 16 | part5a;
  var lsb = new (Long())(part5b, tmp1_high);
  return Companion_getInstance().gm(msb, lsb);
}
function uuidParseHex(hexString) {
  var tmp0_high = hexToInt(hexString, 0, 8);
  var tmp1_low = hexToInt(hexString, 8, 16);
  var msb = new (Long())(tmp1_low, tmp0_high);
  var tmp2_high = hexToInt(hexString, 16, 24);
  var tmp3_low = hexToInt(hexString, 24, 32);
  var lsb = new (Long())(tmp3_low, tmp2_high);
  return Companion_getInstance().gm(msb, lsb);
}
function secureRandomUuid() {
  var randomBytes = new Int8Array(16);
  crypto.getRandomValues(randomBytes);
  return uuidFromRandomBytes(randomBytes);
}
function formatBytesInto_0(_this__u8e3s4, dst, dstOffset, startIndex, endIndex) {
  var dstIndex = dstOffset;
  var inductionVariable = 3 - startIndex | 0;
  var last = 4 - endIndex | 0;
  if (last <= inductionVariable)
    do {
      var reversedIndex = inductionVariable;
      inductionVariable = inductionVariable + -1 | 0;
      var shift = reversedIndex << 3;
      var byte = _this__u8e3s4 >> shift & 255;
      var byteDigits = get_BYTE_TO_LOWER_CASE_HEX_DIGITS()[byte];
      var _unary__edvuaz = dstIndex;
      dstIndex = _unary__edvuaz + 1 | 0;
      dst[_unary__edvuaz] = toByte(byteDigits >> 8);
      var _unary__edvuaz_0 = dstIndex;
      dstIndex = _unary__edvuaz_0 + 1 | 0;
      dst[_unary__edvuaz_0] = toByte(byteDigits);
    }
     while (!(reversedIndex === last));
  return dstIndex;
}
function getIntAt(_this__u8e3s4, index) {
  return (_this__u8e3s4[index + 0 | 0] & 255) << 24 | (_this__u8e3s4[index + 1 | 0] & 255) << 16 | (_this__u8e3s4[index + 2 | 0] & 255) << 8 | _this__u8e3s4[index + 3 | 0] & 255;
}
//region block: exports
export {
  formatBytesInto as formatBytesInto37zm00l0btni2,
  getLongAt as getLongAt2xo9o2feqbs0,
  secureRandomUuid as secureRandomUuid33vm90zpurzrd,
  uuidParseHexDash as uuidParseHexDash18eiuoxladbda,
  uuidParseHex as uuidParseHex3eqot5o6m8iet,
};
//endregion

//# sourceMappingURL=UuidJs.mjs.map
