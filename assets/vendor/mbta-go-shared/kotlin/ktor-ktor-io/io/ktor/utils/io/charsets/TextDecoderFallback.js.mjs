import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { trim11nh7r46at6sx as trim } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { writeFully359t6q8kam2g5 as writeFully } from '../core/BytePacketBuilder.mjs';
import { toByte4i43936u611k as toByte } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { decodeToString1x4faah2liw2p as decodeToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_WIN1252_TABLE5rmtwfdzssem as get_WIN1252_TABLE } from './Win1252Table.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ENCODING_ALIASES() {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return ENCODING_ALIASES;
}
var ENCODING_ALIASES;
function get_REPLACEMENT() {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return REPLACEMENT;
}
var REPLACEMENT;
var TextDecoderFallbackClass;
function TextDecoderFallback() {
  if (TextDecoderFallbackClass === VOID) {
    class $ {
      constructor(encoding, fatal) {
        this.c3h_1 = fatal;
        // Inline function 'kotlin.text.trim' call
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var requestedEncoding = toString(trim(isCharSequence(encoding) ? encoding : THROW_CCE())).toLowerCase();
        // Inline function 'kotlin.check' call
        if (!get_ENCODING_ALIASES().j1(requestedEncoding)) {
          var message = encoding + ' is not supported.';
          throw IllegalStateException().o5(toString(message));
        }
      }
      a3h(buffer) {
        // Inline function 'io.ktor.utils.io.core.buildPacket' call
        var builder = new (Buffer())();
        var bytes = buffer instanceof Int8Array ? buffer : THROW_CCE();
        var inductionVariable = 0;
        var last = bytes.length;
        if (inductionVariable < last)
          $l$loop: do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'org.khronos.webgl.get' call
            // Inline function 'kotlin.js.asDynamic' call
            var byte = bytes[index];
            var point = toCodePoint(byte);
            if (point < 0) {
              // Inline function 'kotlin.check' call
              if (!!this.c3h_1) {
                var message = 'Invalid character: ' + point;
                throw IllegalStateException().o5(toString(message));
              }
              writeFully(builder, get_REPLACEMENT());
              continue $l$loop;
            }
            if (point > 255) {
              builder.l31(toByte(point >> 8));
            }
            builder.l31(toByte(point & 255));
          }
           while (inductionVariable < last);
        return decodeToString(readByteArray(builder));
      }
    }
    initMetadataForClass($, 'TextDecoderFallback');
    TextDecoderFallbackClass = $;
  }
  return TextDecoderFallbackClass;
}
function toCodePoint(_this__u8e3s4) {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  var value = _this__u8e3s4 & 255;
  if (isASCII(value)) {
    return value;
  }
  return get_WIN1252_TABLE()[value - 128 | 0];
}
function isASCII(_this__u8e3s4) {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return 0 <= _this__u8e3s4 ? _this__u8e3s4 <= 127 : false;
}
var properties_initialized_TextDecoderFallback_js_kt_6rekzk;
function _init_properties_TextDecoderFallback_js_kt__an7r6m() {
  if (!properties_initialized_TextDecoderFallback_js_kt_6rekzk) {
    properties_initialized_TextDecoderFallback_js_kt_6rekzk = true;
    ENCODING_ALIASES = setOf(['ansi_x3.4-1968', 'ascii', 'cp1252', 'cp819', 'csisolatin1', 'ibm819', 'iso-8859-1', 'iso-ir-100', 'iso8859-1', 'iso88591', 'iso_8859-1', 'iso_8859-1:1987', 'l1', 'latin1', 'us-ascii', 'windows-1252', 'x-cp1252']);
    // Inline function 'kotlin.byteArrayOf' call
    REPLACEMENT = new Int8Array([-17, -65, -67]);
  }
}
//region block: exports
export {
  TextDecoderFallback as TextDecoderFallback90zn71e530wg,
};
//endregion

//# sourceMappingURL=TextDecoderFallback.js.mjs.map
