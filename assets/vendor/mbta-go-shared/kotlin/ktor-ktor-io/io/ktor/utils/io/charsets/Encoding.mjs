import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import {
  decode3smkguvhgu00o as decode,
  encodeImpl2q4xw7zvyejjm as encodeImpl,
  MalformedInputExceptionbvc6h5ij0ias as MalformedInputException,
} from './Charset.js.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function decode_0(_this__u8e3s4, input, max) {
  max = max === VOID ? 2147483647 : max;
  var tmp0 = toLong(max);
  // Inline function 'kotlin.comparisons.minOf' call
  var b = input.s2z().c1();
  // Inline function 'kotlin.text.buildString' call
  var capacity = (tmp0.d2(b) <= 0 ? tmp0 : b).f2();
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().kc(capacity);
  decode(_this__u8e3s4, input, this_0, max);
  return this_0.toString();
}
function encodeToImpl(_this__u8e3s4, destination, input, fromIndex, toIndex) {
  var start = fromIndex;
  if (start >= toIndex)
    return Unit_instance;
  $l$loop: while (true) {
    var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, destination);
    // Inline function 'kotlin.check' call
    if (!(rc >= 0)) {
      throw IllegalStateException().o5('Check failed.');
    }
    start = start + rc | 0;
    if (start >= toIndex)
      break $l$loop;
  }
}
var TooLongLineExceptionClass;
function TooLongLineException() {
  if (TooLongLineExceptionClass === VOID) {
    class $ extends MalformedInputException() {
      static c3d(message) {
        var $this = this.z3f(message);
        captureStack($this, $this.b3d_1);
        return $this;
      }
    }
    initMetadataForClass($, 'TooLongLineException');
    TooLongLineExceptionClass = $;
  }
  return TooLongLineExceptionClass;
}
function encode(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new (Buffer())();
  encodeToImpl(_this__u8e3s4, builder, input, fromIndex, toIndex);
  return builder;
}
//region block: exports
export {
  TooLongLineException as TooLongLineException2d6ls946t46wx,
  decode_0 as decode1t43jmuxrxpmo,
  encodeToImpl as encodeToImpl35qnqj6vvbsjt,
  encode as encode35e4rpnc94tb5,
};
//endregion

//# sourceMappingURL=Encoding.mjs.map
