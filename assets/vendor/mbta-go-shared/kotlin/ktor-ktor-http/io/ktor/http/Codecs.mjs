import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Charsets_getInstanceqs70pvl4noow as Charsets_getInstance } from '../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { encode35e4rpnc94tb5 as encode } from '../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Encoding.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char19o2r8palgjof as Char,
  Char__plus_impl_qi7pgj3akekecdud2w6 as Char__plus_impl_qi7pgj,
  Char__minus_impl_a2frrh3t0v4pviuv4om as Char__minus_impl_a2frrh,
  toString3o7ifthqydp6e as toString,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh_0,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  Char__rangeTo_impl_tkncvp2wb70up86k2i2 as Char__rangeTo_impl_tkncvp,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { isSurrogatewe8xicw8z84n as isSurrogate } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Char.mjs';
import { takeWhile34751tcfg6owx as takeWhile } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/ByteReadPacket.mjs';
import { charArray2ujmm1qusno00 as charArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  concatToString2syawgu50khxi as concatToString,
  substringiqarkczpya5m as substring,
  decodeToString1dbzcjd620q25 as decodeToString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  toString1pkumu07cwy4m as toString_0,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  toByte4i43936u611k as toByte,
  numberToChar93r9buh19yek as numberToChar,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { canRead1guo8vbveth0f as canRead } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/Buffer.mjs';
import {
  plus39kp8wyage607 as plus,
  plus310ted5e4i90h as plus_0,
  toSet2orjxp16sotqu as toSet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { plus1ogy4liedzq5j as plus_1 } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_URL_ALPHABET() {
  _init_properties_Codecs_kt__fudxxf();
  return URL_ALPHABET;
}
var URL_ALPHABET;
function get_URL_ALPHABET_CHARS() {
  _init_properties_Codecs_kt__fudxxf();
  return URL_ALPHABET_CHARS;
}
var URL_ALPHABET_CHARS;
function get_HEX_ALPHABET() {
  _init_properties_Codecs_kt__fudxxf();
  return HEX_ALPHABET;
}
var HEX_ALPHABET;
function get_URL_PROTOCOL_PART() {
  _init_properties_Codecs_kt__fudxxf();
  return URL_PROTOCOL_PART;
}
var URL_PROTOCOL_PART;
function get_VALID_PATH_PART() {
  _init_properties_Codecs_kt__fudxxf();
  return VALID_PATH_PART;
}
var VALID_PATH_PART;
var ATTRIBUTE_CHARACTERS;
function get_SPECIAL_SYMBOLS() {
  _init_properties_Codecs_kt__fudxxf();
  return SPECIAL_SYMBOLS;
}
var SPECIAL_SYMBOLS;
function encodeURLParameter(_this__u8e3s4, spaceToPlus) {
  spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
  _init_properties_Codecs_kt__fudxxf();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var content = encode(Charsets_getInstance().a3g_1.d3g(), _this__u8e3s4);
  forEach(content, encodeURLParameter$lambda(this_0, spaceToPlus));
  return this_0.toString();
}
function decodeURLPart(_this__u8e3s4, start, end, charset) {
  start = start === VOID ? 0 : start;
  end = end === VOID ? _this__u8e3s4.length : end;
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  _init_properties_Codecs_kt__fudxxf();
  return decodeScan(_this__u8e3s4, start, end, false, charset);
}
function encodeURLQueryComponent(_this__u8e3s4, encodeFull, spaceToPlus, charset) {
  encodeFull = encodeFull === VOID ? false : encodeFull;
  spaceToPlus = spaceToPlus === VOID ? false : spaceToPlus;
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  _init_properties_Codecs_kt__fudxxf();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var content = encode(charset.d3g(), _this__u8e3s4);
  forEach(content, encodeURLQueryComponent$lambda(spaceToPlus, this_0, encodeFull));
  return this_0.toString();
}
function decodeURLQueryComponent(_this__u8e3s4, start, end, plusIsSpace, charset) {
  start = start === VOID ? 0 : start;
  end = end === VOID ? _this__u8e3s4.length : end;
  plusIsSpace = plusIsSpace === VOID ? false : plusIsSpace;
  charset = charset === VOID ? Charsets_getInstance().a3g_1 : charset;
  _init_properties_Codecs_kt__fudxxf();
  return decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset);
}
function encodeURLPathPart(_this__u8e3s4) {
  _init_properties_Codecs_kt__fudxxf();
  return encodeURLPath(_this__u8e3s4, true);
}
function encodeURLPath(_this__u8e3s4, encodeSlash, encodeEncoded) {
  encodeSlash = encodeSlash === VOID ? false : encodeSlash;
  encodeEncoded = encodeEncoded === VOID ? true : encodeEncoded;
  _init_properties_Codecs_kt__fudxxf();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var charset = Charsets_getInstance().a3g_1;
  var index = 0;
  $l$loop_0: while (index < _this__u8e3s4.length) {
    var current = charCodeAt(_this__u8e3s4, index);
    if (!encodeSlash && current === _Char___init__impl__6a9atx(47) || get_URL_ALPHABET_CHARS().j1(new (Char())(current)) || get_VALID_PATH_PART().j1(new (Char())(current))) {
      this_0.ic(current);
      index = index + 1 | 0;
      continue $l$loop_0;
    }
    if (!encodeEncoded && current === _Char___init__impl__6a9atx(37) && (index + 2 | 0) < _this__u8e3s4.length && get_HEX_ALPHABET().j1(new (Char())(charCodeAt(_this__u8e3s4, index + 1 | 0))) && get_HEX_ALPHABET().j1(new (Char())(charCodeAt(_this__u8e3s4, index + 2 | 0)))) {
      this_0.ic(current);
      this_0.ic(charCodeAt(_this__u8e3s4, index + 1 | 0));
      this_0.ic(charCodeAt(_this__u8e3s4, index + 2 | 0));
      index = index + 3 | 0;
      continue $l$loop_0;
    }
    var symbolSize = isSurrogate(current) ? 2 : 1;
    var tmp = encode(charset.d3g(), _this__u8e3s4, index, index + symbolSize | 0);
    forEach(tmp, encodeURLPath$lambda(this_0));
    index = index + symbolSize | 0;
  }
  return this_0.toString();
}
function forEach(_this__u8e3s4, block) {
  _init_properties_Codecs_kt__fudxxf();
  takeWhile(_this__u8e3s4, forEach$lambda(block));
}
function percentEncode(_this__u8e3s4) {
  _init_properties_Codecs_kt__fudxxf();
  var code = _this__u8e3s4 & 255;
  var array = charArray(3);
  array[0] = _Char___init__impl__6a9atx(37);
  array[1] = hexDigitToChar(code >> 4);
  array[2] = hexDigitToChar(code & 15);
  return concatToString(array);
}
function decodeScan(_this__u8e3s4, start, end, plusIsSpace, charset) {
  _init_properties_Codecs_kt__fudxxf();
  var inductionVariable = start;
  if (inductionVariable < end)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var ch = charCodeAt(_this__u8e3s4, index);
      if (ch === _Char___init__impl__6a9atx(37) || (plusIsSpace && ch === _Char___init__impl__6a9atx(43))) {
        return decodeImpl(_this__u8e3s4, start, end, index, plusIsSpace, charset);
      }
    }
     while (inductionVariable < end);
  return start === 0 && end === _this__u8e3s4.length ? toString_0(_this__u8e3s4) : substring(_this__u8e3s4, start, end);
}
function hexDigitToChar(digit) {
  _init_properties_Codecs_kt__fudxxf();
  return (0 <= digit ? digit <= 9 : false) ? Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(48), digit) : Char__minus_impl_a2frrh(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), digit), 10);
}
function decodeImpl(_this__u8e3s4, start, end, prefixEnd, plusIsSpace, charset) {
  _init_properties_Codecs_kt__fudxxf();
  var length = end - start | 0;
  var sbSize = length > 255 ? length / 3 | 0 : length;
  var sb = StringBuilder().kc(sbSize);
  if (prefixEnd > start) {
    sb.bj(_this__u8e3s4, start, prefixEnd);
  }
  var index = prefixEnd;
  var bytes = null;
  while (index < end) {
    var c = charSequenceGet(_this__u8e3s4, index);
    if (plusIsSpace && c === _Char___init__impl__6a9atx(43)) {
      sb.ic(_Char___init__impl__6a9atx(32));
      index = index + 1 | 0;
    } else if (c === _Char___init__impl__6a9atx(37)) {
      if (bytes == null) {
        bytes = new Int8Array((end - index | 0) / 3 | 0);
      }
      var count = 0;
      while (index < end && charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(37)) {
        if ((index + 2 | 0) >= end) {
          // Inline function 'kotlin.text.substring' call
          var startIndex = index;
          var endIndex = charSequenceLength(_this__u8e3s4);
          var tmp$ret$0 = toString_0(charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex));
          throw URLDecodeException().x3n('Incomplete trailing HEX escape: ' + tmp$ret$0 + ', in ' + toString_0(_this__u8e3s4) + ' at ' + index);
        }
        var digit1 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 1 | 0));
        var digit2 = charToHexDigit(charSequenceGet(_this__u8e3s4, index + 2 | 0));
        if (digit1 === -1 || digit2 === -1) {
          throw URLDecodeException().x3n('Wrong HEX escape: %' + toString(charSequenceGet(_this__u8e3s4, index + 1 | 0)) + toString(charSequenceGet(_this__u8e3s4, index + 2 | 0)) + ', in ' + toString_0(_this__u8e3s4) + ', at ' + index);
        }
        var tmp = bytes;
        var _unary__edvuaz = count;
        count = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = toByte(imul(digit1, 16) + digit2 | 0);
        index = index + 3 | 0;
      }
      sb.hc(decodeToString(bytes, 0, 0 + count | 0));
    } else {
      sb.ic(c);
      index = index + 1 | 0;
    }
  }
  return sb.toString();
}
var URLDecodeExceptionClass;
function URLDecodeException() {
  if (URLDecodeExceptionClass === VOID) {
    class $ extends Exception() {
      static x3n(message) {
        var $this = this.h6(message);
        captureStack($this, $this.w3n_1);
        return $this;
      }
    }
    initMetadataForClass($, 'URLDecodeException');
    URLDecodeExceptionClass = $;
  }
  return URLDecodeExceptionClass;
}
function charToHexDigit(c2) {
  _init_properties_Codecs_kt__fudxxf();
  return (_Char___init__impl__6a9atx(48) <= c2 ? c2 <= _Char___init__impl__6a9atx(57) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(48)) : (_Char___init__impl__6a9atx(65) <= c2 ? c2 <= _Char___init__impl__6a9atx(70) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(65)) + 10 | 0 : (_Char___init__impl__6a9atx(97) <= c2 ? c2 <= _Char___init__impl__6a9atx(102) : false) ? Char__minus_impl_a2frrh_0(c2, _Char___init__impl__6a9atx(97)) + 10 | 0 : -1;
}
function encodeURLParameterValue(_this__u8e3s4) {
  _init_properties_Codecs_kt__fudxxf();
  return encodeURLParameter(_this__u8e3s4, true);
}
function encodeURLParameter$lambda($$this$buildString, $spaceToPlus) {
  return function (it) {
    if (get_URL_ALPHABET().j1(it) || get_SPECIAL_SYMBOLS().j1(it))
      $$this$buildString.ic(numberToChar(it));
    else {
      var tmp;
      if ($spaceToPlus) {
        var tmp_0 = it;
        // Inline function 'kotlin.code' call
        var this_0 = _Char___init__impl__6a9atx(32);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        tmp = tmp_0 === toByte(tmp$ret$0);
      } else {
        tmp = false;
      }
      if (tmp)
        $$this$buildString.ic(_Char___init__impl__6a9atx(43));
      else {
        $$this$buildString.hc(percentEncode(it));
      }
    }
    return Unit_instance;
  };
}
function encodeURLQueryComponent$lambda($spaceToPlus, $$this$buildString, $encodeFull) {
  return function (it) {
    var tmp = it;
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(32);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    if (tmp === toByte(tmp$ret$0))
      if ($spaceToPlus)
        $$this$buildString.ic(_Char___init__impl__6a9atx(43));
      else
        $$this$buildString.hc('%20');
    else {
      if (get_URL_ALPHABET().j1(it) || (!$encodeFull && get_URL_PROTOCOL_PART().j1(it)))
        $$this$buildString.ic(numberToChar(it));
      else {
        $$this$buildString.hc(percentEncode(it));
      }
    }
    return Unit_instance;
  };
}
function encodeURLPath$lambda($$this$buildString) {
  return function (it) {
    $$this$buildString.hc(percentEncode(it));
    return Unit_instance;
  };
}
function forEach$lambda($block) {
  return function (buffer) {
    while (canRead(buffer)) {
      $block(buffer.w2z());
    }
    return true;
  };
}
var properties_initialized_Codecs_kt_hkj9s1;
function _init_properties_Codecs_kt__fudxxf() {
  if (!properties_initialized_Codecs_kt_hkj9s1) {
    properties_initialized_Codecs_kt_hkj9s1 = true;
    // Inline function 'kotlin.collections.map' call
    var this_0 = plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57)));
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.x();
    while (_iterator__ex2g4s.y()) {
      var item = _iterator__ex2g4s.z();
      // Inline function 'kotlin.code' call
      var this_1 = item.r2_1;
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_1);
      var tmp$ret$1 = toByte(tmp$ret$0);
      destination.i(tmp$ret$1);
    }
    URL_ALPHABET = toSet(destination);
    URL_ALPHABET_CHARS = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(122)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(90))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
    HEX_ALPHABET = toSet(plus_0(plus(Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(102)), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(65), _Char___init__impl__6a9atx(70))), Char__rangeTo_impl_tkncvp(_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(57))));
    // Inline function 'kotlin.collections.map' call
    var this_2 = setOf([new (Char())(_Char___init__impl__6a9atx(58)), new (Char())(_Char___init__impl__6a9atx(47)), new (Char())(_Char___init__impl__6a9atx(63)), new (Char())(_Char___init__impl__6a9atx(35)), new (Char())(_Char___init__impl__6a9atx(91)), new (Char())(_Char___init__impl__6a9atx(93)), new (Char())(_Char___init__impl__6a9atx(64)), new (Char())(_Char___init__impl__6a9atx(33)), new (Char())(_Char___init__impl__6a9atx(36)), new (Char())(_Char___init__impl__6a9atx(38)), new (Char())(_Char___init__impl__6a9atx(39)), new (Char())(_Char___init__impl__6a9atx(40)), new (Char())(_Char___init__impl__6a9atx(41)), new (Char())(_Char___init__impl__6a9atx(42)), new (Char())(_Char___init__impl__6a9atx(44)), new (Char())(_Char___init__impl__6a9atx(59)), new (Char())(_Char___init__impl__6a9atx(61)), new (Char())(_Char___init__impl__6a9atx(45)), new (Char())(_Char___init__impl__6a9atx(46)), new (Char())(_Char___init__impl__6a9atx(95)), new (Char())(_Char___init__impl__6a9atx(126)), new (Char())(_Char___init__impl__6a9atx(43))]);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList().w(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s_0 = this_2.x();
    while (_iterator__ex2g4s_0.y()) {
      var item_0 = _iterator__ex2g4s_0.z();
      // Inline function 'kotlin.code' call
      var this_3 = item_0.r2_1;
      var tmp$ret$0_0 = Char__toInt_impl_vasixd(this_3);
      var tmp$ret$1_0 = toByte(tmp$ret$0_0);
      destination_0.i(tmp$ret$1_0);
    }
    URL_PROTOCOL_PART = destination_0;
    VALID_PATH_PART = setOf([new (Char())(_Char___init__impl__6a9atx(58)), new (Char())(_Char___init__impl__6a9atx(64)), new (Char())(_Char___init__impl__6a9atx(33)), new (Char())(_Char___init__impl__6a9atx(36)), new (Char())(_Char___init__impl__6a9atx(38)), new (Char())(_Char___init__impl__6a9atx(39)), new (Char())(_Char___init__impl__6a9atx(40)), new (Char())(_Char___init__impl__6a9atx(41)), new (Char())(_Char___init__impl__6a9atx(42)), new (Char())(_Char___init__impl__6a9atx(43)), new (Char())(_Char___init__impl__6a9atx(44)), new (Char())(_Char___init__impl__6a9atx(59)), new (Char())(_Char___init__impl__6a9atx(61)), new (Char())(_Char___init__impl__6a9atx(45)), new (Char())(_Char___init__impl__6a9atx(46)), new (Char())(_Char___init__impl__6a9atx(95)), new (Char())(_Char___init__impl__6a9atx(126))]);
    ATTRIBUTE_CHARACTERS = plus_1(get_URL_ALPHABET_CHARS(), setOf([new (Char())(_Char___init__impl__6a9atx(33)), new (Char())(_Char___init__impl__6a9atx(35)), new (Char())(_Char___init__impl__6a9atx(36)), new (Char())(_Char___init__impl__6a9atx(38)), new (Char())(_Char___init__impl__6a9atx(43)), new (Char())(_Char___init__impl__6a9atx(45)), new (Char())(_Char___init__impl__6a9atx(46)), new (Char())(_Char___init__impl__6a9atx(94)), new (Char())(_Char___init__impl__6a9atx(95)), new (Char())(_Char___init__impl__6a9atx(96)), new (Char())(_Char___init__impl__6a9atx(124)), new (Char())(_Char___init__impl__6a9atx(126))]));
    // Inline function 'kotlin.collections.map' call
    var this_4 = listOf([new (Char())(_Char___init__impl__6a9atx(45)), new (Char())(_Char___init__impl__6a9atx(46)), new (Char())(_Char___init__impl__6a9atx(95)), new (Char())(_Char___init__impl__6a9atx(126))]);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_1 = ArrayList().w(collectionSizeOrDefault(this_4, 10));
    var _iterator__ex2g4s_1 = this_4.x();
    while (_iterator__ex2g4s_1.y()) {
      var item_1 = _iterator__ex2g4s_1.z();
      // Inline function 'kotlin.code' call
      var this_5 = item_1.r2_1;
      var tmp$ret$0_1 = Char__toInt_impl_vasixd(this_5);
      var tmp$ret$1_1 = toByte(tmp$ret$0_1);
      destination_1.i(tmp$ret$1_1);
    }
    SPECIAL_SYMBOLS = destination_1;
  }
}
//region block: exports
export {
  decodeURLPart as decodeURLPart53igalrwb9si,
  decodeURLQueryComponent as decodeURLQueryComponent1psnpw5x5jp3h,
  encodeURLParameterValue as encodeURLParameterValueqlj48e6qtqd4,
  encodeURLParameter as encodeURLParameter1u3y18ab0iker,
  encodeURLPathPart as encodeURLPathPart6y0hlser8v0t,
  encodeURLPath as encodeURLPath2fwba5way5jjt,
  encodeURLQueryComponent as encodeURLQueryComponent1fjq9wb8rn8hq,
};
//endregion

//# sourceMappingURL=Codecs.mjs.map
