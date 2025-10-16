import {
  isBlank1dvkhjjvox3p0 as isBlank,
  indexOfAny2ijjuuzpljsyd as indexOfAny,
  split3d3yeauc4rm2n as split,
  indexOf1xbs558u7wr52 as indexOf,
  indexOfwa4w6635jewi as indexOf_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { isWhitespace25occ8z1ed1s9 as isWhitespace } from '../../../../kotlin-kotlin-stdlib/kotlin/text/charJs.mjs';
import { substringiqarkczpya5m as substring } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { Companion_getInstance2bb7s4bbcv546 as Companion_getInstance } from './URLProtocol.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toCharArray1qby3f4cdahde as toCharArray } from '../../../../ktor-ktor-utils/io/ktor/util/Charset.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  dropLast1vpiyky649o34 as dropLast,
  first58ocm7j58k3q as first,
  plus310ted5e4i90h as plus,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { set_encodedPath3q0i8nsv3a7qy as set_encodedPath } from './URLBuilder.mjs';
import { decodeURLPart53igalrwb9si as decodeURLPart } from './Codecs.mjs';
import { toInt2q8uldh7sc951 as toInt } from '../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { parseQueryString1nwcni3n22i7m as parseQueryString } from './Query.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ROOT_PATH() {
  _init_properties_URLParser_kt__sf11to();
  return ROOT_PATH;
}
var ROOT_PATH;
function takeFrom(_this__u8e3s4, urlString) {
  _init_properties_URLParser_kt__sf11to();
  if (isBlank(urlString))
    return _this__u8e3s4;
  var tmp;
  try {
    tmp = takeFromUnsafe(_this__u8e3s4, urlString);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var cause = $p;
      throw URLParserException().n40(urlString, cause);
    } else {
      throw $p;
    }
  }
  return tmp;
}
function takeFromUnsafe(_this__u8e3s4, urlString) {
  _init_properties_URLParser_kt__sf11to();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.indexOfFirst' call
    var inductionVariable = 0;
    var last = charSequenceLength(urlString) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var it = charSequenceGet(urlString, index);
        if (!isWhitespace(it)) {
          tmp$ret$1 = index;
          break $l$block;
        }
      }
       while (inductionVariable <= last);
    tmp$ret$1 = -1;
  }
  var startIndex = tmp$ret$1;
  var tmp$ret$3;
  $l$block_0: {
    // Inline function 'kotlin.text.indexOfLast' call
    var inductionVariable_0 = charSequenceLength(urlString) - 1 | 0;
    if (0 <= inductionVariable_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + -1 | 0;
        var it_0 = charSequenceGet(urlString, index_0);
        if (!isWhitespace(it_0)) {
          tmp$ret$3 = index_0;
          break $l$block_0;
        }
      }
       while (0 <= inductionVariable_0);
    tmp$ret$3 = -1;
  }
  var endIndex = tmp$ret$3 + 1 | 0;
  var schemeLength = findScheme(urlString, startIndex, endIndex);
  if (schemeLength > 0) {
    var scheme = substring(urlString, startIndex, startIndex + schemeLength | 0);
    _this__u8e3s4.v3z(Companion_getInstance().o40(scheme));
    startIndex = startIndex + (schemeLength + 1 | 0) | 0;
  }
  if (_this__u8e3s4.y3y().w3y_1 === 'data') {
    _this__u8e3s4.m3y_1 = substring(urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  var slashCount = count(urlString, startIndex, endIndex, _Char___init__impl__6a9atx(47));
  startIndex = startIndex + slashCount | 0;
  if (_this__u8e3s4.y3y().w3y_1 === 'file') {
    parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount);
    return _this__u8e3s4;
  }
  if (_this__u8e3s4.y3y().w3y_1 === 'mailto') {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(slashCount === 0)) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException().q(toString(message));
    }
    parseMailto(_this__u8e3s4, urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  if (_this__u8e3s4.y3y().w3y_1 === 'about') {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(slashCount === 0)) {
      var message_0 = 'Failed requirement.';
      throw IllegalArgumentException().q(toString(message_0));
    }
    _this__u8e3s4.m3y_1 = substring(urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  if (_this__u8e3s4.y3y().w3y_1 === 'tel') {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!(slashCount === 0)) {
      var message_1 = 'Failed requirement.';
      throw IllegalArgumentException().q(toString(message_1));
    }
    _this__u8e3s4.m3y_1 = substring(urlString, startIndex, endIndex);
    return _this__u8e3s4;
  }
  if (slashCount >= 2) {
    loop: while (true) {
      // Inline function 'kotlin.takeIf' call
      var this_0 = indexOfAny(urlString, toCharArray('@/\\?#'), startIndex);
      var tmp;
      if (this_0 > 0) {
        tmp = this_0;
      } else {
        tmp = null;
      }
      var tmp0_elvis_lhs = tmp;
      var delimiter = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
      if (delimiter < endIndex && charCodeAt(urlString, delimiter) === _Char___init__impl__6a9atx(64)) {
        var passwordIndex = indexOfColonInHostPort(urlString, startIndex, delimiter);
        if (!(passwordIndex === -1)) {
          _this__u8e3s4.q3y_1 = substring(urlString, startIndex, passwordIndex);
          _this__u8e3s4.r3y_1 = substring(urlString, passwordIndex + 1 | 0, delimiter);
        } else {
          _this__u8e3s4.q3y_1 = substring(urlString, startIndex, delimiter);
        }
        startIndex = delimiter + 1 | 0;
      } else {
        fillHost(_this__u8e3s4, urlString, startIndex, delimiter);
        startIndex = delimiter;
        break loop;
      }
    }
  }
  if (startIndex >= endIndex) {
    _this__u8e3s4.t3y_1 = charCodeAt(urlString, endIndex - 1 | 0) === _Char___init__impl__6a9atx(47) ? get_ROOT_PATH() : emptyList();
    return _this__u8e3s4;
  }
  var tmp_0 = _this__u8e3s4;
  var tmp_1;
  if (slashCount === 0) {
    tmp_1 = dropLast(_this__u8e3s4.t3y_1, 1);
  } else {
    tmp_1 = emptyList();
  }
  tmp_0.t3y_1 = tmp_1;
  // Inline function 'kotlin.takeIf' call
  var this_1 = indexOfAny(urlString, toCharArray('?#'), startIndex);
  var tmp_2;
  if (this_1 > 0) {
    tmp_2 = this_1;
  } else {
    tmp_2 = null;
  }
  var tmp1_elvis_lhs = tmp_2;
  var pathEnd = tmp1_elvis_lhs == null ? endIndex : tmp1_elvis_lhs;
  if (pathEnd > startIndex) {
    var rawPath = substring(urlString, startIndex, pathEnd);
    var tmp_3;
    var tmp_4;
    if (_this__u8e3s4.t3y_1.c1() === 1) {
      // Inline function 'kotlin.text.isEmpty' call
      var this_2 = first(_this__u8e3s4.t3y_1);
      tmp_4 = charSequenceLength(this_2) === 0;
    } else {
      tmp_4 = false;
    }
    if (tmp_4) {
      tmp_3 = emptyList();
    } else {
      tmp_3 = _this__u8e3s4.t3y_1;
    }
    var basePath = tmp_3;
    var rawChunks = rawPath === '/' ? get_ROOT_PATH() : split(rawPath, charArrayOf([_Char___init__impl__6a9atx(47)]));
    var relativePath = plus(slashCount === 1 ? get_ROOT_PATH() : emptyList(), rawChunks);
    _this__u8e3s4.t3y_1 = plus(basePath, relativePath);
    startIndex = pathEnd;
  }
  if (startIndex < endIndex && charCodeAt(urlString, startIndex) === _Char___init__impl__6a9atx(63)) {
    startIndex = parseQuery(_this__u8e3s4, urlString, startIndex, endIndex);
  }
  parseFragment(_this__u8e3s4, urlString, startIndex, endIndex);
  return _this__u8e3s4;
}
var URLParserExceptionClass;
function URLParserException() {
  if (URLParserExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static n40(urlString, cause) {
        var $this = this.je('Fail to parse url: ' + urlString, cause);
        captureStack($this, $this.m40_1);
        return $this;
      }
    }
    initMetadataForClass($, 'URLParserException');
    URLParserExceptionClass = $;
  }
  return URLParserExceptionClass;
}
function findScheme(urlString, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  var current = startIndex;
  var incorrectSchemePosition = -1;
  var firstChar = charCodeAt(urlString, current);
  if (!(_Char___init__impl__6a9atx(97) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= firstChar ? firstChar <= _Char___init__impl__6a9atx(90) : false)) {
    incorrectSchemePosition = current;
  }
  while (current < endIndex) {
    var char = charCodeAt(urlString, current);
    if (char === _Char___init__impl__6a9atx(58)) {
      if (!(incorrectSchemePosition === -1)) {
        throw IllegalArgumentException().q('Illegal character in scheme at position ' + incorrectSchemePosition);
      }
      return current - startIndex | 0;
    }
    if (char === _Char___init__impl__6a9atx(47) || char === _Char___init__impl__6a9atx(63) || char === _Char___init__impl__6a9atx(35))
      return -1;
    if (incorrectSchemePosition === -1 && !(_Char___init__impl__6a9atx(97) <= char ? char <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= char ? char <= _Char___init__impl__6a9atx(90) : false) && !(_Char___init__impl__6a9atx(48) <= char ? char <= _Char___init__impl__6a9atx(57) : false) && !(char === _Char___init__impl__6a9atx(46)) && !(char === _Char___init__impl__6a9atx(43)) && !(char === _Char___init__impl__6a9atx(45))) {
      incorrectSchemePosition = current;
    }
    current = current + 1 | 0;
  }
  return -1;
}
function count(urlString, startIndex, endIndex, char) {
  _init_properties_URLParser_kt__sf11to();
  var result = 0;
  $l$loop: while ((startIndex + result | 0) < endIndex && charCodeAt(urlString, startIndex + result | 0) === char) {
    result = result + 1 | 0;
  }
  return result;
}
function parseFile(_this__u8e3s4, urlString, startIndex, endIndex, slashCount) {
  _init_properties_URLParser_kt__sf11to();
  switch (slashCount) {
    case 1:
      _this__u8e3s4.m3y_1 = '';
      set_encodedPath(_this__u8e3s4, substring(urlString, startIndex, endIndex));
      break;
    case 2:
      var nextSlash = indexOf(urlString, _Char___init__impl__6a9atx(47), startIndex);
      if (nextSlash === -1 || nextSlash === endIndex) {
        _this__u8e3s4.m3y_1 = substring(urlString, startIndex, endIndex);
        return Unit_instance;
      }

      _this__u8e3s4.m3y_1 = substring(urlString, startIndex, nextSlash);
      set_encodedPath(_this__u8e3s4, substring(urlString, nextSlash, endIndex));
      break;
    case 3:
      _this__u8e3s4.m3y_1 = '';
      set_encodedPath(_this__u8e3s4, '/' + substring(urlString, startIndex, endIndex));
      break;
    default:
      throw IllegalArgumentException().q('Invalid file url: ' + urlString);
  }
}
function parseMailto(_this__u8e3s4, urlString, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  var delimiter = indexOf_0(urlString, '@', startIndex);
  if (delimiter === -1) {
    throw IllegalArgumentException().q('Invalid mailto url: ' + urlString + ", it should contain '@'.");
  }
  _this__u8e3s4.c40(decodeURLPart(substring(urlString, startIndex, delimiter)));
  _this__u8e3s4.m3y_1 = substring(urlString, delimiter + 1 | 0, endIndex);
}
function indexOfColonInHostPort(_this__u8e3s4, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  var skip = false;
  var inductionVariable = startIndex;
  if (inductionVariable < endIndex)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp0_subject = charCodeAt(_this__u8e3s4, index);
      if (tmp0_subject === _Char___init__impl__6a9atx(91))
        skip = true;
      else if (tmp0_subject === _Char___init__impl__6a9atx(93))
        skip = false;
      else if (tmp0_subject === _Char___init__impl__6a9atx(58))
        if (!skip)
          return index;
    }
     while (inductionVariable < endIndex);
  return -1;
}
function fillHost(_this__u8e3s4, urlString, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  // Inline function 'kotlin.takeIf' call
  var this_0 = indexOfColonInHostPort(urlString, startIndex, endIndex);
  var tmp;
  if (this_0 > 0) {
    tmp = this_0;
  } else {
    tmp = null;
  }
  var tmp0_elvis_lhs = tmp;
  var colonIndex = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
  _this__u8e3s4.m3y_1 = substring(urlString, startIndex, colonIndex);
  var tmp_0;
  if ((colonIndex + 1 | 0) < endIndex) {
    tmp_0 = toInt(substring(urlString, colonIndex + 1 | 0, endIndex));
  } else {
    tmp_0 = 0;
  }
  _this__u8e3s4.u3z(tmp_0);
}
function parseQuery(_this__u8e3s4, urlString, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  if ((startIndex + 1 | 0) === endIndex) {
    _this__u8e3s4.n3y_1 = true;
    return endIndex;
  }
  // Inline function 'kotlin.takeIf' call
  var this_0 = indexOf(urlString, _Char___init__impl__6a9atx(35), startIndex + 1 | 0);
  var tmp;
  if (this_0 > 0) {
    tmp = this_0;
  } else {
    tmp = null;
  }
  var tmp0_elvis_lhs = tmp;
  var fragmentStart = tmp0_elvis_lhs == null ? endIndex : tmp0_elvis_lhs;
  var rawParameters = parseQueryString(substring(urlString, startIndex + 1 | 0, fragmentStart), VOID, VOID, false);
  rawParameters.b3j(parseQuery$lambda(_this__u8e3s4));
  return fragmentStart;
}
function parseFragment(_this__u8e3s4, urlString, startIndex, endIndex) {
  _init_properties_URLParser_kt__sf11to();
  if (startIndex < endIndex && charCodeAt(urlString, startIndex) === _Char___init__impl__6a9atx(35)) {
    _this__u8e3s4.s3y_1 = substring(urlString, startIndex + 1 | 0, endIndex);
  }
}
function parseQuery$lambda($this_parseQuery) {
  return function (key, values) {
    $this_parseQuery.u3y_1.f3j(key, values);
    return Unit_instance;
  };
}
var properties_initialized_URLParser_kt_hd1g6a;
function _init_properties_URLParser_kt__sf11to() {
  if (!properties_initialized_URLParser_kt_hd1g6a) {
    properties_initialized_URLParser_kt_hd1g6a = true;
    ROOT_PATH = listOf('');
  }
}
//region block: exports
export {
  get_ROOT_PATH as get_ROOT_PATH1cfc0dxvljm6a,
  takeFrom as takeFrom3rd40szpqy350,
};
//endregion

//# sourceMappingURL=URLParser.mjs.map
