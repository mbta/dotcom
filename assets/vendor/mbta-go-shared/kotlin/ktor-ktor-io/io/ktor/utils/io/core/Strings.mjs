import {
  Charsets_getInstanceqs70pvl4noow as Charsets_getInstance,
  encodeToByteArrayomtvgs5lyogm as encodeToByteArray,
} from '../charsets/Charset.js.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { encodeToByteArray22651fhg4p67t as encodeToByteArray_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  readString2nvggcfaijfhd as readString,
  readString3v6duspiz33tv as readString_0,
  writeString33ca4btrgctw7 as writeString,
} from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Utf8.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  decode1t43jmuxrxpmo as decode,
  encodeToImpl35qnqj6vvbsjt as encodeToImpl,
} from '../charsets/Encoding.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toByteArray(_this__u8e3s4, charset) {
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  if (charset.equals(Charsets_getInstance().a3g_1))
    return encodeToByteArray_0(_this__u8e3s4, VOID, VOID, true);
  return encodeToByteArray(charset.d3g(), _this__u8e3s4, 0, _this__u8e3s4.length);
}
function readText(_this__u8e3s4, charset, max) {
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  max = max === VOID ? 2147483647 : max;
  if (charset.equals(Charsets_getInstance().a3g_1)) {
    if (max === 2147483647)
      return readString(_this__u8e3s4);
    var tmp0 = _this__u8e3s4.s2z().c1();
    // Inline function 'kotlin.math.min' call
    var b = toLong(max);
    var count = tmp0.d2(b) <= 0 ? tmp0 : b;
    return readString_0(_this__u8e3s4, count);
  }
  return decode(charset.e3g(), _this__u8e3s4, max);
}
function writeText(_this__u8e3s4, text, fromIndex, toIndex, charset) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(text) : toIndex;
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  if (charset === Charsets_getInstance().a3g_1) {
    return writeString(_this__u8e3s4, toString(text), fromIndex, toIndex);
  }
  encodeToImpl(charset.d3g(), _this__u8e3s4, text, fromIndex, toIndex);
}
//region block: exports
export {
  readText as readText27783kyxjxi1g,
  toByteArray as toByteArray1i3ns5jnoqlv6,
  writeText as writeText19qfzm98fbm4l,
};
//endregion

//# sourceMappingURL=Strings.mjs.map
