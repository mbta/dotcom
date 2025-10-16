import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { replaceqbix900hl8kl as replace } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import {
  readByteArray1ri21h2rciakw as readByteArray,
  readByteArray1fhzfwi2j014k as readByteArray_0,
} from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { encodeToImpl35qnqj6vvbsjt as encodeToImpl } from './Encoding.mjs';
import { encodeISO88591v742do8ms7fc as encodeISO88591 } from './ISO88591.mjs';
import { Decoder2ddeqv6fq19z5 as Decoder } from './Decoder.js.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      r3g(name) {
        switch (name) {
          case 'UTF-8':
          case 'utf-8':
          case 'UTF8':
          case 'utf8':
            return Charsets_getInstance().a3g_1;
        }
        var tmp;
        var tmp_0;
        switch (name) {
          case 'ISO-8859-1':
          case 'iso-8859-1':
            tmp_0 = true;
            break;
          default:
            // Inline function 'kotlin.let' call

            var it = replace(name, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45));
            var tmp_1;
            if (it === 'iso-8859-1') {
              tmp_1 = true;
            } else {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp_1 = it.toLowerCase() === 'iso-8859-1';
            }

            tmp_0 = tmp_1;
            break;
        }
        if (tmp_0) {
          tmp = true;
        } else {
          tmp = name === 'latin1' || name === 'Latin1';
        }
        if (tmp) {
          return Charsets_getInstance().b3g_1;
        }
        throw IllegalArgumentException().q('Charset ' + name + ' is not supported');
      }
      s3g(charset) {
        var tmp;
        switch (charset) {
          case 'UTF-8':
          case 'utf-8':
          case 'UTF8':
          case 'utf8':
            tmp = true;
            break;
          default:
            var tmp_0;
            var tmp_1;
            switch (charset) {
              case 'ISO-8859-1':
              case 'iso-8859-1':
                tmp_1 = true;
                break;
              default:
                // Inline function 'kotlin.let' call

                var it = replace(charset, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45));
                var tmp_2;
                if (it === 'iso-8859-1') {
                  tmp_2 = true;
                } else {
                  // Inline function 'kotlin.text.lowercase' call
                  // Inline function 'kotlin.js.asDynamic' call
                  tmp_2 = it.toLowerCase() === 'iso-8859-1';
                }

                tmp_1 = tmp_2;
                break;
            }

            if (tmp_1) {
              tmp_0 = true;
            } else {
              tmp_0 = charset === 'latin1';
            }

            if (tmp_0) {
              tmp = true;
            } else {
              tmp = false;
            }

            break;
        }
        return tmp;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var CharsetClass;
function Charset() {
  if (CharsetClass === VOID) {
    class $ {
      constructor(_name) {
        this.c3g_1 = _name;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !(this.constructor == other.constructor))
          return false;
        if (!(other instanceof Charset()))
          THROW_CCE();
        return this.c3g_1 === other.c3g_1;
      }
      hashCode() {
        return getStringHashCode(this.c3g_1);
      }
      toString() {
        return this.c3g_1;
      }
    }
    initMetadataForClass($, 'Charset');
    CharsetClass = $;
  }
  return CharsetClass;
}
function get_name(_this__u8e3s4) {
  return _this__u8e3s4.c3g_1;
}
var CharsetsClass;
function Charsets() {
  if (CharsetsClass === VOID) {
    class $ {
      constructor() {
        Charsets_instance = this;
        this.a3g_1 = new (CharsetImpl())('UTF-8');
        this.b3g_1 = new (CharsetImpl())('ISO-8859-1');
      }
    }
    initMetadataForObject($, 'Charsets');
    CharsetsClass = $;
  }
  return CharsetsClass;
}
var Charsets_instance;
function Charsets_getInstance() {
  if (Charsets_instance === VOID)
    new (Charsets())();
  return Charsets_instance;
}
var MalformedInputExceptionClass;
function MalformedInputException() {
  if (MalformedInputExceptionClass === VOID) {
    class $ extends IOException() {
      static z3f(message) {
        var $this = this.v32(message);
        captureStack($this, $this.y3f_1);
        return $this;
      }
    }
    initMetadataForClass($, 'MalformedInputException');
    MalformedInputExceptionClass = $;
  }
  return MalformedInputExceptionClass;
}
var CharsetDecoderClass;
function CharsetDecoder() {
  if (CharsetDecoderClass === VOID) {
    class $ {
      constructor(_charset) {
        this.t3g_1 = _charset;
      }
    }
    initMetadataForClass($, 'CharsetDecoder');
    CharsetDecoderClass = $;
  }
  return CharsetDecoderClass;
}
function encodeToByteArray(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  return encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex);
}
var CharsetEncoderClass;
function CharsetEncoder() {
  if (CharsetEncoderClass === VOID) {
    class $ {
      constructor(_charset) {
        this.u3g_1 = _charset;
      }
    }
    initMetadataForClass($, 'CharsetEncoder');
    CharsetEncoderClass = $;
  }
  return CharsetEncoderClass;
}
var CharsetImplClass;
function CharsetImpl() {
  if (CharsetImplClass === VOID) {
    class $ extends Charset() {
      d3g() {
        return new (CharsetEncoderImpl())(this);
      }
      e3g() {
        return new (CharsetDecoderImpl())(this);
      }
    }
    initMetadataForClass($, 'CharsetImpl');
    CharsetImplClass = $;
  }
  return CharsetImplClass;
}
function encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  var start = fromIndex;
  if (start >= toIndex)
    return new Int8Array(0);
  var dst = new (Buffer())();
  var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, dst);
  start = start + rc | 0;
  if (start === toIndex) {
    return readByteArray(dst);
  }
  encodeToImpl(_this__u8e3s4, dst, input, start, toIndex);
  return readByteArray(dst);
}
var CharsetEncoderImplClass;
function CharsetEncoderImpl() {
  if (CharsetEncoderImplClass === VOID) {
    class $ extends CharsetEncoder() {
      constructor(charset) {
        super(charset);
        this.x3g_1 = charset;
      }
      toString() {
        return 'CharsetEncoderImpl(charset=' + this.x3g_1.toString() + ')';
      }
      hashCode() {
        return this.x3g_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CharsetEncoderImpl()))
          return false;
        var tmp0_other_with_cast = other instanceof CharsetEncoderImpl() ? other : THROW_CCE();
        if (!this.x3g_1.equals(tmp0_other_with_cast.x3g_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'CharsetEncoderImpl');
    CharsetEncoderImplClass = $;
  }
  return CharsetEncoderImplClass;
}
var CharsetDecoderImplClass;
function CharsetDecoderImpl() {
  if (CharsetDecoderImplClass === VOID) {
    class $ extends CharsetDecoder() {
      constructor(charset) {
        super(charset);
        this.z3g_1 = charset;
      }
      toString() {
        return 'CharsetDecoderImpl(charset=' + this.z3g_1.toString() + ')';
      }
      hashCode() {
        return this.z3g_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CharsetDecoderImpl()))
          return false;
        var tmp0_other_with_cast = other instanceof CharsetDecoderImpl() ? other : THROW_CCE();
        if (!this.z3g_1.equals(tmp0_other_with_cast.z3g_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'CharsetDecoderImpl');
    CharsetDecoderImplClass = $;
  }
  return CharsetDecoderImplClass;
}
function encodeImpl(_this__u8e3s4, input, fromIndex, toIndex, dst) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(fromIndex <= toIndex)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException().q(toString(message));
  }
  if (get_charset(_this__u8e3s4).equals(Charsets_getInstance().b3g_1)) {
    return encodeISO88591(input, fromIndex, toIndex, dst);
  }
  // Inline function 'kotlin.require' call
  if (!(get_charset(_this__u8e3s4) === Charsets_getInstance().a3g_1)) {
    var message_0 = 'Only UTF-8 encoding is supported in JS';
    throw IllegalArgumentException().q(toString(message_0));
  }
  var encoder = new TextEncoder();
  // Inline function 'kotlin.text.substring' call
  var tmp$ret$5 = toString(charSequenceSubSequence(input, fromIndex, toIndex));
  var result = encoder.encode(tmp$ret$5);
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  dst.f31(result);
  return result.length;
}
function get_charset(_this__u8e3s4) {
  return _this__u8e3s4.u3g_1;
}
function decode(_this__u8e3s4, input, dst, max) {
  var decoder = Decoder(get_name(get_charset_0(_this__u8e3s4)), true);
  var tmp0 = input.s2z().c1();
  // Inline function 'kotlin.comparisons.minOf' call
  var b = toLong(max);
  var count = tmp0.d2(b) <= 0 ? tmp0 : b;
  var tmp = readByteArray_0(input, count.f2());
  var array = tmp instanceof Int8Array ? tmp : THROW_CCE();
  var tmp_0;
  try {
    tmp_0 = decoder.a3h(array);
  } catch ($p) {
    var tmp_1;
    if ($p instanceof Error) {
      var cause = $p;
      var tmp0_elvis_lhs = cause.message;
      throw MalformedInputException().z3f('Failed to decode bytes: ' + (tmp0_elvis_lhs == null ? 'no cause provided' : tmp0_elvis_lhs));
    } else {
      throw $p;
    }
  }
  var result = tmp_0;
  dst.v(result);
  return result.length;
}
function get_charset_0(_this__u8e3s4) {
  return _this__u8e3s4.t3g_1;
}
function forName(_this__u8e3s4, name) {
  return Companion_instance.r3g(name);
}
function isSupported(_this__u8e3s4, name) {
  return Companion_instance.s3g(name);
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Charsets_getInstance as Charsets_getInstanceqs70pvl4noow,
  MalformedInputException as MalformedInputExceptionbvc6h5ij0ias,
  decode as decode3smkguvhgu00o,
  encodeImpl as encodeImpl2q4xw7zvyejjm,
  encodeToByteArray as encodeToByteArrayomtvgs5lyogm,
  forName as forName2faodmskqnoz5,
  isSupported as isSupported2nf870ypy50et,
  get_name as get_name2f11g4r0d5pxp,
};
//endregion

//# sourceMappingURL=Charset.js.mjs.map
