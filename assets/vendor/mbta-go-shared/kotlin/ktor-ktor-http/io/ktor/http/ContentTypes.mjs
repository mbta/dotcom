import { equals2v6cggk171b6e as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isCharSequence1ju9jr1w86plq as isCharSequence,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  isBlank1dvkhjjvox3p0 as isBlank,
  indexOf1xbs558u7wr52 as indexOf,
  trim11nh7r46at6sx as trim,
  contains2el4s70rdq4ld as contains,
  startsWith38d3sbg25w0lx as startsWith,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  Companion_instance2y99io54syq2d as Companion_instance,
  HeaderValueWithParameters2awuza444hhll as HeaderValueWithParameters,
} from './HeaderValueWithParameters.mjs';
import {
  parseHeaderValuealpos28fgp6t as parseHeaderValue,
  HeaderValueParam1kbqez3tb3lqp as HeaderValueParam,
} from './HttpHeaderValueParser.mjs';
import {
  last1vo29oleiqj36 as last,
  plus20p0vtfmu0596 as plus,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals_0,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  Exceptiondt2hlxn7j7vw as Exception,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  Charsets_getInstanceqs70pvl4noow as Charsets_getInstance,
  forName2faodmskqnoz5 as forName,
  get_name2f11g4r0d5pxp as get_name,
} from '../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function hasParameter($this, name, value) {
  var tmp;
  switch ($this.z3n_1.c1()) {
    case 0:
      tmp = false;
      break;
    case 1:
      // Inline function 'kotlin.let' call

      var it = $this.z3n_1.e1(0);
      tmp = (equals(it.a3o_1, name, true) && equals(it.b3o_1, value, true));
      break;
    default:
      var tmp0 = $this.z3n_1;
      var tmp$ret$2;
      $l$block_0: {
        // Inline function 'kotlin.collections.any' call
        var tmp_0;
        if (isInterface(tmp0, Collection())) {
          tmp_0 = tmp0.h1();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$2 = false;
          break $l$block_0;
        }
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (equals(element.a3o_1, name, true) && equals(element.b3o_1, value, true)) {
            tmp$ret$2 = true;
            break $l$block_0;
          }
        }
        tmp$ret$2 = false;
      }

      tmp = tmp$ret$2;
      break;
  }
  return tmp;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.d3o_1 = ContentType().i3o('*', '*');
      }
      dx(value) {
        if (isBlank(value))
          return this.d3o_1;
        // Inline function 'io.ktor.http.Companion.parse' call
        var headerValue = last(parseHeaderValue(value));
        var tmp0 = headerValue.j3o_1;
        var parameters = headerValue.k3o_1;
        var slash = indexOf(tmp0, _Char___init__impl__6a9atx(47));
        if (slash === -1) {
          // Inline function 'kotlin.text.trim' call
          if (toString(trim(isCharSequence(tmp0) ? tmp0 : THROW_CCE())) === '*')
            return Companion_getInstance().d3o_1;
          throw BadContentTypeFormatException().o3o(value);
        }
        // Inline function 'kotlin.text.trim' call
        var this_0 = substring(tmp0, 0, slash);
        var type = toString(trim(isCharSequence(this_0) ? this_0 : THROW_CCE()));
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(type) === 0) {
          throw BadContentTypeFormatException().o3o(value);
        }
        // Inline function 'kotlin.text.trim' call
        var this_1 = substring_0(tmp0, slash + 1 | 0);
        var subtype = toString(trim(isCharSequence(this_1) ? this_1 : THROW_CCE()));
        if (contains(type, _Char___init__impl__6a9atx(32)) || contains(subtype, _Char___init__impl__6a9atx(32))) {
          throw BadContentTypeFormatException().o3o(value);
        }
        var tmp;
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(subtype) === 0) {
          tmp = true;
        } else {
          tmp = contains(subtype, _Char___init__impl__6a9atx(47));
        }
        if (tmp) {
          throw BadContentTypeFormatException().o3o(value);
        }
        return ContentType().i3o(type, subtype, parameters);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var ApplicationClass;
function Application() {
  if (ApplicationClass === VOID) {
    class $ {
      constructor() {
        Application_instance = this;
        this.p3o_1 = 'application';
        this.q3o_1 = ContentType().i3o('application', '*');
        this.r3o_1 = ContentType().i3o('application', 'atom+xml');
        this.s3o_1 = ContentType().i3o('application', 'cbor');
        this.t3o_1 = ContentType().i3o('application', 'json');
        this.u3o_1 = ContentType().i3o('application', 'hal+json');
        this.v3o_1 = ContentType().i3o('application', 'javascript');
        this.w3o_1 = ContentType().i3o('application', 'octet-stream');
        this.x3o_1 = ContentType().i3o('application', 'rss+xml');
        this.y3o_1 = ContentType().i3o('application', 'soap+xml');
        this.z3o_1 = ContentType().i3o('application', 'xml');
        this.a3p_1 = ContentType().i3o('application', 'xml-dtd');
        this.b3p_1 = ContentType().i3o('application', 'yaml');
        this.c3p_1 = ContentType().i3o('application', 'zip');
        this.d3p_1 = ContentType().i3o('application', 'gzip');
        this.e3p_1 = ContentType().i3o('application', 'x-www-form-urlencoded');
        this.f3p_1 = ContentType().i3o('application', 'pdf');
        this.g3p_1 = ContentType().i3o('application', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.h3p_1 = ContentType().i3o('application', 'vnd.openxmlformats-officedocument.wordprocessingml.document');
        this.i3p_1 = ContentType().i3o('application', 'vnd.openxmlformats-officedocument.presentationml.presentation');
        this.j3p_1 = ContentType().i3o('application', 'protobuf');
        this.k3p_1 = ContentType().i3o('application', 'wasm');
        this.l3p_1 = ContentType().i3o('application', 'problem+json');
        this.m3p_1 = ContentType().i3o('application', 'problem+xml');
      }
      n3p(contentType) {
        return startsWith(contentType, 'application/', true);
      }
    }
    initMetadataForObject($, 'Application');
    ApplicationClass = $;
  }
  return ApplicationClass;
}
var Application_instance;
function Application_getInstance() {
  if (Application_instance === VOID)
    new (Application())();
  return Application_instance;
}
var MultiPartClass;
function MultiPart() {
  if (MultiPartClass === VOID) {
    class $ {
      constructor() {
        MultiPart_instance = this;
        this.o3p_1 = 'multipart';
        this.p3p_1 = ContentType().i3o('multipart', '*');
        this.q3p_1 = ContentType().i3o('multipart', 'mixed');
        this.r3p_1 = ContentType().i3o('multipart', 'alternative');
        this.s3p_1 = ContentType().i3o('multipart', 'related');
        this.t3p_1 = ContentType().i3o('multipart', 'form-data');
        this.u3p_1 = ContentType().i3o('multipart', 'signed');
        this.v3p_1 = ContentType().i3o('multipart', 'encrypted');
        this.w3p_1 = ContentType().i3o('multipart', 'byteranges');
      }
      n3p(contentType) {
        return startsWith(contentType, 'multipart/', true);
      }
    }
    initMetadataForObject($, 'MultiPart');
    MultiPartClass = $;
  }
  return MultiPartClass;
}
var MultiPart_instance;
function MultiPart_getInstance() {
  if (MultiPart_instance === VOID)
    new (MultiPart())();
  return MultiPart_instance;
}
var TextClass;
function Text() {
  if (TextClass === VOID) {
    class $ {
      constructor() {
        Text_instance = this;
        this.x3p_1 = 'text';
        this.y3p_1 = ContentType().i3o('text', '*');
        this.z3p_1 = ContentType().i3o('text', 'plain');
        this.a3q_1 = ContentType().i3o('text', 'css');
        this.b3q_1 = ContentType().i3o('text', 'csv');
        this.c3q_1 = ContentType().i3o('text', 'html');
        this.d3q_1 = ContentType().i3o('text', 'javascript');
        this.e3q_1 = ContentType().i3o('text', 'vcard');
        this.f3q_1 = ContentType().i3o('text', 'xml');
        this.g3q_1 = ContentType().i3o('text', 'event-stream');
      }
    }
    initMetadataForObject($, 'Text');
    TextClass = $;
  }
  return TextClass;
}
var Text_instance;
function Text_getInstance() {
  if (Text_instance === VOID)
    new (Text())();
  return Text_instance;
}
var ContentTypeClass;
function ContentType() {
  if (ContentTypeClass === VOID) {
    class $ extends HeaderValueWithParameters() {
      static h3q(contentType, contentSubtype, existingContent, parameters) {
        Companion_getInstance();
        parameters = parameters === VOID ? emptyList() : parameters;
        var $this = this.i3q(existingContent, parameters);
        $this.g3o_1 = contentType;
        $this.h3o_1 = contentSubtype;
        return $this;
      }
      static i3o(contentType, contentSubtype, parameters) {
        Companion_getInstance();
        parameters = parameters === VOID ? emptyList() : parameters;
        return this.h3q(contentType, contentSubtype, contentType + '/' + contentSubtype, parameters);
      }
      j3q(name, value) {
        if (hasParameter(this, name, value))
          return this;
        return ContentType().h3q(this.g3o_1, this.h3o_1, this.y3n_1, plus(this.z3n_1, HeaderValueParam().k3q(name, value)));
      }
      l3q() {
        return this.z3n_1.h1() ? this : ContentType().i3o(this.g3o_1, this.h3o_1);
      }
      m3q(pattern) {
        if (!(pattern.g3o_1 === '*') && !equals(pattern.g3o_1, this.g3o_1, true)) {
          return false;
        }
        if (!(pattern.h3o_1 === '*') && !equals(pattern.h3o_1, this.h3o_1, true)) {
          return false;
        }
        var _iterator__ex2g4s = pattern.z3n_1.x();
        while (_iterator__ex2g4s.y()) {
          var _destruct__k2r9zo = _iterator__ex2g4s.z();
          var patternName = _destruct__k2r9zo.ch();
          var patternValue = _destruct__k2r9zo.dh();
          var tmp;
          if (patternName === '*') {
            var tmp_0;
            if (patternValue === '*') {
              tmp_0 = true;
            } else {
              var tmp0 = this.z3n_1;
              var tmp$ret$0;
              $l$block_0: {
                // Inline function 'kotlin.collections.any' call
                var tmp_1;
                if (isInterface(tmp0, Collection())) {
                  tmp_1 = tmp0.h1();
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  tmp$ret$0 = false;
                  break $l$block_0;
                }
                var _iterator__ex2g4s_0 = tmp0.x();
                while (_iterator__ex2g4s_0.y()) {
                  var element = _iterator__ex2g4s_0.z();
                  if (equals(element.b3o_1, patternValue, true)) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                  }
                }
                tmp$ret$0 = false;
              }
              tmp_0 = tmp$ret$0;
            }
            tmp = tmp_0;
          } else {
            var value = this.n3q(patternName);
            tmp = patternValue === '*' ? !(value == null) : equals(value, patternValue, true);
          }
          var matches = tmp;
          if (!matches) {
            return false;
          }
        }
        return true;
      }
      equals(other) {
        var tmp;
        var tmp_0;
        var tmp_1;
        if (other instanceof ContentType()) {
          tmp_1 = equals(this.g3o_1, other.g3o_1, true);
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = equals(this.h3o_1, other.h3o_1, true);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals_0(this.z3n_1, other.z3n_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$1 = this.g3o_1.toLowerCase();
        var result = getStringHashCode(tmp$ret$1);
        var tmp = result;
        var tmp_0 = imul(31, result);
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$3 = this.h3o_1.toLowerCase();
        result = tmp + (tmp_0 + getStringHashCode(tmp$ret$3) | 0) | 0;
        result = result + imul(31, hashCode(this.z3n_1)) | 0;
        return result;
      }
    }
    initMetadataForClass($, 'ContentType');
    ContentTypeClass = $;
  }
  return ContentTypeClass;
}
var BadContentTypeFormatExceptionClass;
function BadContentTypeFormatException() {
  if (BadContentTypeFormatExceptionClass === VOID) {
    class $ extends Exception() {
      static o3o(value) {
        var $this = this.h6('Bad Content-Type format: ' + value);
        captureStack($this, $this.n3o_1);
        return $this;
      }
    }
    initMetadataForClass($, 'BadContentTypeFormatException');
    BadContentTypeFormatExceptionClass = $;
  }
  return BadContentTypeFormatExceptionClass;
}
function charset(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.n3q('charset');
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp_0;
    try {
      tmp_0 = forName(Charsets_getInstance(), tmp0_safe_receiver);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof IllegalArgumentException()) {
        var exception = $p;
        tmp_1 = null;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function withCharset(_this__u8e3s4, charset) {
  return _this__u8e3s4.j3q('charset', get_name(charset));
}
function withCharsetIfNeeded(_this__u8e3s4, charset) {
  var tmp;
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  if (!(_this__u8e3s4.g3o_1.toLowerCase() === 'text')) {
    tmp = _this__u8e3s4;
  } else {
    tmp = _this__u8e3s4.j3q('charset', get_name(charset));
  }
  return tmp;
}
//region block: exports
export {
  Application_getInstance as Application_getInstanceq87g3bor693u,
  Companion_getInstance as Companion_getInstancecf9b3ybko8sp,
  MultiPart_getInstance as MultiPart_getInstance1zzge3g94afj6,
  Text_getInstance as Text_getInstance1qa6l8g2r3h9g,
  ContentType as ContentType1svlpabm9v7iz,
  charset as charset1dribv3ku48b1,
  withCharsetIfNeeded as withCharsetIfNeeded3sz33ys0x9vfx,
  withCharset as withCharset27k3t3dvzhi4n,
};
//endregion

//# sourceMappingURL=ContentTypes.mjs.map
