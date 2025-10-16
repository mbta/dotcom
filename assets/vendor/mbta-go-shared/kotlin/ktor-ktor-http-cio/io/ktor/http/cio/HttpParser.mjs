import { MutableRange2j0kfnqv5bc35 as MutableRange } from './internals/MutableRange.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char19o2r8palgjof as Char,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { skipSpacesAndHorizontalTabs2u6kkzguaojc4 as skipSpacesAndHorizontalTabs } from './internals/Tokenizer.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  endsWith1a79dp5rc3sfv as endsWith,
  contains2el4s70rdq4ld as contains,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { HttpHeadersMapp7szignu4ex as HttpHeadersMap } from './HttpHeadersMap.mjs';
import { readUTF8LineTo3cgartetbq4tk as readUTF8LineTo } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  Companion_getInstance2zbi981hww1p4 as Companion_getInstance,
  LineEndingMode__plus_impl_ttpz2j1vdcj3ndf6qez as LineEndingMode__plus_impl_ttpz2j,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/LineEndingMode.mjs';
import { Companion_instance221g6q0tngtzz as Companion_instance } from './internals/AsciiCharTree.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_hostForbiddenSymbols() {
  _init_properties_HttpParser_kt__gbdom1();
  return hostForbiddenSymbols;
}
var hostForbiddenSymbols;
function get_httpLineEndings() {
  _init_properties_HttpParser_kt__gbdom1();
  return httpLineEndings;
}
var httpLineEndings;
var versions;
function parseHeaders(input, builder, range, $completion) {
  range = range === VOID ? new (MutableRange())(0, 0) : range;
  var tmp = new ($parseHeadersCOROUTINE$())(input, builder, range, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function parseHeaderName(text, range) {
  _init_properties_HttpParser_kt__gbdom1();
  var index = range.d45_1;
  var end = range.e45_1;
  while (index < end) {
    var ch = text.b(index);
    if (ch === _Char___init__impl__6a9atx(58) && !(index === range.d45_1)) {
      range.d45_1 = index + 1 | 0;
      return index;
    }
    if (isDelimiter(ch)) {
      parseHeaderNameFailed(text, index, range.d45_1, ch);
    }
    index = index + 1 | 0;
  }
  noColonFound(text, range);
}
function parseHeaderValue(text, range) {
  _init_properties_HttpParser_kt__gbdom1();
  var start = range.d45_1;
  var end = range.e45_1;
  var index = start;
  index = skipSpacesAndHorizontalTabs(text, index, end);
  if (index >= end) {
    range.d45_1 = end;
    return Unit_instance;
  }
  var valueStart = index;
  var valueLastIndex = index;
  while (index < end) {
    var ch = text.b(index);
    if (ch !== _Char___init__impl__6a9atx(9) && ch !== _Char___init__impl__6a9atx(32))
      if (ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(10)) {
        characterIsNotAllowed(text, ch);
      } else
        valueLastIndex = index;
    index = index + 1 | 0;
  }
  range.d45_1 = valueStart;
  range.e45_1 = valueLastIndex + 1 | 0;
}
function validateHostHeader(host) {
  _init_properties_HttpParser_kt__gbdom1();
  if (endsWith(host, ':')) {
    throw ParserException().j45("Host header with ':' should contains port: " + toString(host));
  }
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.any' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(host)) {
      var element = charSequenceGet(host, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (get_hostForbiddenSymbols().j1(new (Char())(element))) {
        tmp$ret$1 = true;
        break $l$block;
      }
    }
    tmp$ret$1 = false;
  }
  if (tmp$ret$1) {
    throw ParserException().j45('Host cannot contain any of the following symbols: ' + toString(get_hostForbiddenSymbols()));
  }
}
function isDelimiter(ch) {
  _init_properties_HttpParser_kt__gbdom1();
  return Char__compareTo_impl_ypi4mb(ch, _Char___init__impl__6a9atx(32)) <= 0 || contains('"(),/:;<=>?@[\\]{}', ch);
}
function parseHeaderNameFailed(text, index, start, ch) {
  _init_properties_HttpParser_kt__gbdom1();
  if (ch === _Char___init__impl__6a9atx(58)) {
    throw ParserException().j45('Empty header names are not allowed as per RFC7230.');
  }
  if (index === start) {
    throw ParserException().j45('Multiline headers via line folding is not supported since it is deprecated as per RFC7230.');
  }
  characterIsNotAllowed(text, ch);
}
function noColonFound(text, range) {
  _init_properties_HttpParser_kt__gbdom1();
  var tmp2 = range.d45_1;
  // Inline function 'kotlin.text.substring' call
  var endIndex = range.e45_1;
  var tmp$ret$0 = toString(charSequenceSubSequence(text, tmp2, endIndex));
  throw ParserException().j45('No colon in HTTP header in ' + tmp$ret$0 + ' in builder: \n' + toString(text));
}
function characterIsNotAllowed(text, ch) {
  _init_properties_HttpParser_kt__gbdom1();
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(ch);
  throw ParserException().j45('Character with code ' + (tmp$ret$0 & 255) + ' is not allowed in header names, \n' + toString(text));
}
var ParserExceptionClass;
function ParserException() {
  if (ParserExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static j45(message) {
        var $this = this.o5(message);
        captureStack($this, $this.i45_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ParserException');
    ParserExceptionClass = $;
  }
  return ParserExceptionClass;
}
var $parseHeadersCOROUTINE$Class;
function $parseHeadersCOROUTINE$() {
  if ($parseHeadersCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(input, builder, range, resultContinuation) {
        super(resultContinuation);
        this.z44_1 = input;
        this.a45_1 = builder;
        this.b45_1 = range;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 7;
                this.c45_1 = new (HttpHeadersMap())(this.a45_1);
                this.gd_1 = 6;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                this.fd_1 = 2;
                suspendResult = readUTF8LineTo(this.z44_1, this.a45_1, 8192, get_httpLineEndings(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var ARGUMENT = suspendResult;
                if (!ARGUMENT) {
                  this.c45_1.i1l();
                  return null;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 3:
                this.b45_1.e45_1 = this.a45_1.h44_1;
                var rangeLength = this.b45_1.e45_1 - this.b45_1.d45_1 | 0;
                if (rangeLength === 0) {
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 4:
                if (rangeLength >= 8192) {
                  var message = 'Header line length limit exceeded';
                  throw IllegalStateException().o5(toString(message));
                }

                var nameStart = this.b45_1.d45_1;
                var nameEnd = parseHeaderName(this.a45_1, this.b45_1);
                var headerEnd = this.b45_1.e45_1;
                parseHeaderValue(this.a45_1, this.b45_1);
                var valueStart = this.b45_1.d45_1;
                var valueEnd = this.b45_1.e45_1;
                this.b45_1.d45_1 = headerEnd;
                this.c45_1.y43(nameStart, nameEnd, valueStart, valueEnd);
                this.fd_1 = 1;
                continue $sm;
              case 5:
                var host = this.c45_1.lk(HttpHeaders_getInstance().w3r_1);
                if (!(host == null)) {
                  validateHostHeader(host);
                }

                return this.c45_1;
              case 6:
                this.gd_1 = 7;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  var t = this.id_1;
                  this.c45_1.i1l();
                  throw t;
                } else {
                  throw this.id_1;
                }

              case 7:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 7) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $parseHeadersCOROUTINE$Class = $;
  }
  return $parseHeadersCOROUTINE$Class;
}
var properties_initialized_HttpParser_kt_uedryv;
function _init_properties_HttpParser_kt__gbdom1() {
  if (!properties_initialized_HttpParser_kt_uedryv) {
    properties_initialized_HttpParser_kt_uedryv = true;
    hostForbiddenSymbols = setOf([new (Char())(_Char___init__impl__6a9atx(47)), new (Char())(_Char___init__impl__6a9atx(63)), new (Char())(_Char___init__impl__6a9atx(35)), new (Char())(_Char___init__impl__6a9atx(64))]);
    httpLineEndings = LineEndingMode__plus_impl_ttpz2j(Companion_getInstance().v3a_1, Companion_getInstance().u3a_1);
    versions = Companion_instance.k45(listOf(['HTTP/1.0', 'HTTP/1.1']));
  }
}
//region block: exports
export {
  parseHeaders as parseHeaders2ky2i7uxplga9,
};
//endregion

//# sourceMappingURL=HttpParser.mjs.map
