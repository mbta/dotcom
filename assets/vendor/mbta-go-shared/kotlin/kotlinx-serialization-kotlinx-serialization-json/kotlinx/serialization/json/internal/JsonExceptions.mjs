import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function invalidTrailingComma(_this__u8e3s4, entity) {
  entity = entity === VOID ? 'object' : entity;
  _this__u8e3s4.i1q('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.r1l_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.j1q('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
}
var JsonEncodingExceptionClass;
function JsonEncodingException() {
  if (JsonEncodingExceptionClass === VOID) {
    class $ extends JsonException() {
      static q1q(message) {
        var $this = this.w1q(message);
        captureStack($this, $this.p1q_1);
        return $this;
      }
    }
    initMetadataForClass($, 'JsonEncodingException');
    JsonEncodingExceptionClass = $;
  }
  return JsonEncodingExceptionClass;
}
function InvalidKeyKindException(keyDescriptor) {
  return JsonEncodingException().q1q("Value of type '" + keyDescriptor.j10() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.x11().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
}
var JsonDecodingExceptionClass;
function JsonDecodingException() {
  if (JsonDecodingExceptionClass === VOID) {
    class $ extends JsonException() {
      static v1o(message) {
        var $this = this.w1q(message);
        captureStack($this, $this.u1o_1);
        return $this;
      }
    }
    initMetadataForClass($, 'JsonDecodingException');
    JsonDecodingExceptionClass = $;
  }
  return JsonDecodingExceptionClass;
}
function JsonDecodingException_0(offset, message, input) {
  return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
}
function InvalidFloatingPointDecoded(value, key, output) {
  return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
}
function JsonDecodingException_1(offset, message) {
  return JsonDecodingException().v1o(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
}
function minify(_this__u8e3s4, offset) {
  offset = offset === VOID ? -1 : offset;
  if (charSequenceLength(_this__u8e3s4) < 200)
    return _this__u8e3s4;
  if (offset === -1) {
    var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
    if (start <= 0)
      return _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    var endIndex = charSequenceLength(_this__u8e3s4);
    return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
  }
  var start_0 = offset - 30 | 0;
  var end = offset + 30 | 0;
  var prefix = start_0 <= 0 ? '' : '.....';
  var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
  var tmp2 = coerceAtLeast(start_0, 0);
  // Inline function 'kotlin.text.substring' call
  var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
  return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
}
function InvalidFloatingPointEncoded(value, output) {
  return JsonEncodingException().q1q('Unexpected special floating-point value ' + toString(value) + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
}
var JsonExceptionClass;
function JsonException() {
  if (JsonExceptionClass === VOID) {
    class $ extends SerializationException() {
      static w1q(message) {
        var $this = this.w10(message);
        captureStack($this, $this.v1q_1);
        return $this;
      }
    }
    initMetadataForClass($, 'JsonException');
    JsonExceptionClass = $;
  }
  return JsonExceptionClass;
}
function unexpectedFpErrorMessage(value, key, output) {
  return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
}
//region block: exports
export {
  InvalidFloatingPointDecoded as InvalidFloatingPointDecoded2q5szzjempb3,
  InvalidFloatingPointEncoded as InvalidFloatingPointEncoded3n0aum4e9o5qi,
  InvalidKeyKindException as InvalidKeyKindException3b5w96w0jjxof,
  JsonDecodingException_0 as JsonDecodingException1p97qvfqhd5n3,
  JsonDecodingException_1 as JsonDecodingExceptiong65jdof8puc,
  JsonDecodingException as JsonDecodingException278mackfi1uuk,
  JsonEncodingException as JsonEncodingException1thxguokvyir3,
  JsonException as JsonException2av85ax2o0gno,
  invalidTrailingComma as invalidTrailingComma2uwwnmbqspks2,
  minify as minify1kh64osmcox7j,
  throwInvalidFloatingPointDecoded as throwInvalidFloatingPointDecoded3ghwdo6vya1kj,
};
//endregion

//# sourceMappingURL=JsonExceptions.mjs.map
