import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  lines3g90sq0zeq43v as lines,
  isBlank1dvkhjjvox3p0 as isBlank,
} from './Strings.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../collections/Iterables.mjs';
import {
  minOrNull1g8m0136x75mg as minOrNull,
  joinTo3lkanfaxbzac2 as joinTo,
} from '../collections/_Collections.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from '../collections/CollectionsKt.mjs';
import { checkIndexOverflow3frtmheghr0th as checkIndexOverflow } from '../collections/collectionJs.mjs';
import { drop336950s126lmj as drop } from './_Strings.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from './StringBuilderJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../js/charSequenceJs.mjs';
import { isWhitespace25occ8z1ed1s9 as isWhitespace } from './charJs.mjs';
import { substring3saq8ornu0luv as substring } from './stringJs.mjs';
import { startsWith5hna0vjiqaqm as startsWith } from './stringsCode.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function trimIndent(_this__u8e3s4) {
  return replaceIndent(_this__u8e3s4, '');
}
function trimMargin(_this__u8e3s4, marginPrefix) {
  marginPrefix = marginPrefix === VOID ? '|' : marginPrefix;
  return replaceIndentByMargin(_this__u8e3s4, '', marginPrefix);
}
function replaceIndent(_this__u8e3s4, newIndent) {
  newIndent = newIndent === VOID ? '' : newIndent;
  var lines_0 = lines(_this__u8e3s4);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = lines_0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.text.isNotBlank' call
    if (!isBlank(element)) {
      destination.i(element);
    }
  }
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination_0 = ArrayList().w(collectionSizeOrDefault(destination, 10));
  var _iterator__ex2g4s_0 = destination.x();
  while (_iterator__ex2g4s_0.y()) {
    var item = _iterator__ex2g4s_0.z();
    var tmp$ret$4 = indentWidth(item);
    destination_0.i(tmp$ret$4);
  }
  var tmp0_elvis_lhs = minOrNull(destination_0);
  var minCommonIndent = tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs;
  var tmp2 = _this__u8e3s4.length + imul(newIndent.length, lines_0.c1()) | 0;
  // Inline function 'kotlin.text.reindent' call
  var indentAddFunction = getIndentFunction(newIndent);
  var lastIndex = get_lastIndex(lines_0);
  // Inline function 'kotlin.collections.mapIndexedNotNull' call
  // Inline function 'kotlin.collections.mapIndexedNotNullTo' call
  var destination_1 = ArrayList().g1();
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s_1 = lines_0.x();
  while (_iterator__ex2g4s_1.y()) {
    var item_0 = _iterator__ex2g4s_1.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    var tmp;
    if ((index_0 === 0 || index_0 === lastIndex) && isBlank(item_0)) {
      tmp = null;
    } else {
      var tmp0_safe_receiver = drop(item_0, minCommonIndent);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_0 = indentAddFunction(tmp0_safe_receiver);
      }
      var tmp1_elvis_lhs = tmp_0;
      tmp = tmp1_elvis_lhs == null ? item_0 : tmp1_elvis_lhs;
    }
    var tmp0_safe_receiver_0 = tmp;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination_1.i(tmp0_safe_receiver_0);
    }
  }
  return joinTo(destination_1, StringBuilder().kc(tmp2), '\n').toString();
}
function replaceIndentByMargin(_this__u8e3s4, newIndent, marginPrefix) {
  newIndent = newIndent === VOID ? '' : newIndent;
  marginPrefix = marginPrefix === VOID ? '|' : marginPrefix;
  // Inline function 'kotlin.text.isNotBlank' call
  // Inline function 'kotlin.require' call
  if (!!isBlank(marginPrefix)) {
    var message = 'marginPrefix must be non-blank string.';
    throw IllegalArgumentException().q(toString(message));
  }
  var lines_0 = lines(_this__u8e3s4);
  var tmp2 = _this__u8e3s4.length + imul(newIndent.length, lines_0.c1()) | 0;
  // Inline function 'kotlin.text.reindent' call
  var indentAddFunction = getIndentFunction(newIndent);
  var lastIndex = get_lastIndex(lines_0);
  // Inline function 'kotlin.collections.mapIndexedNotNull' call
  // Inline function 'kotlin.collections.mapIndexedNotNullTo' call
  var destination = ArrayList().g1();
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = lines_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    var tmp;
    if ((index_0 === 0 || index_0 === lastIndex) && isBlank(item)) {
      tmp = null;
    } else {
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.text.indexOfFirst' call
        var inductionVariable = 0;
        var last = charSequenceLength(item) - 1 | 0;
        if (inductionVariable <= last)
          do {
            var index_1 = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = charSequenceGet(item, index_1);
            if (!isWhitespace(it)) {
              tmp$ret$4 = index_1;
              break $l$block;
            }
          }
           while (inductionVariable <= last);
        tmp$ret$4 = -1;
      }
      var firstNonWhitespaceIndex = tmp$ret$4;
      var tmp0_safe_receiver = firstNonWhitespaceIndex === -1 ? null : startsWith(item, marginPrefix, firstNonWhitespaceIndex) ? substring(item, firstNonWhitespaceIndex + marginPrefix.length | 0) : null;
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_0 = indentAddFunction(tmp0_safe_receiver);
      }
      var tmp1_elvis_lhs = tmp_0;
      tmp = tmp1_elvis_lhs == null ? item : tmp1_elvis_lhs;
    }
    var tmp0_safe_receiver_0 = tmp;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.i(tmp0_safe_receiver_0);
    }
  }
  return joinTo(destination, StringBuilder().kc(tmp2), '\n').toString();
}
function indentWidth(_this__u8e3s4) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.indexOfFirst' call
    var inductionVariable = 0;
    var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var it = charSequenceGet(_this__u8e3s4, index);
        if (!isWhitespace(it)) {
          tmp$ret$1 = index;
          break $l$block;
        }
      }
       while (inductionVariable <= last);
    tmp$ret$1 = -1;
  }
  // Inline function 'kotlin.let' call
  var it_0 = tmp$ret$1;
  return it_0 === -1 ? _this__u8e3s4.length : it_0;
}
function getIndentFunction(indent) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(indent) === 0) {
    tmp = getIndentFunction$lambda;
  } else {
    tmp = getIndentFunction$lambda_0(indent);
  }
  return tmp;
}
function getIndentFunction$lambda(line) {
  return line;
}
function getIndentFunction$lambda_0($indent) {
  return function (line) {
    return $indent + line;
  };
}
//region block: exports
export {
  trimIndent as trimIndent1qytc1wvt8suh,
  trimMargin as trimMarginhyd3fsmh8iev,
};
//endregion

//# sourceMappingURL=Indent.mjs.map
