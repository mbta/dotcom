import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../Char.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../js/arrays.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../js/charSequenceJs.mjs';
import {
  asIterable1fxmj7vyh9cyo as asIterable,
  toListx6x8nvfmvvht as toList,
} from '../sequences/_Sequences.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { isWhitespace25occ8z1ed1s9 as isWhitespace } from './charJs.mjs';
import {
  startsWith26w8qjqapeeq6 as startsWith,
  startsWith5hna0vjiqaqm as startsWith_0,
  regionMatches30ph926sbb53j as regionMatches,
  endsWith3cq61xxngobwh as endsWith,
} from './stringsCode.mjs';
import {
  substring3saq8ornu0luv as substring,
  substringiqarkczpya5m as substring_0,
} from './stringJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../js/typeCheckUtils.mjs';
import { toString1pkumu07cwy4m as toString_0 } from '../js/coreRuntime.mjs';
import { equals2ukvbdmtrnsss as equals } from './Char.mjs';
import { single2hobxym0rz0fw as single } from '../collections/_Arrays.mjs';
import {
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
  downTo39qhfeycepm1j as downTo,
  until1jbpn0z3f8lbg as until,
  coerceIn10f36k81le1mm as coerceIn,
} from '../ranges/_Ranges.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import { listOfvhqybd2zx248 as listOf } from '../collections/collectionJs.mjs';
import { asList2ho2pewtsfvv as asList } from '../collections/_ArraysJs.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../js/rangeTo.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from './StringBuilderJs.mjs';
import { IntRange1cx8zvxgibbj2 as IntRange } from '../ranges/PrimitiveRanges.mjs';
import { single3ds7xj9roxi5z as single_0 } from '../collections/_Collections.mjs';
import { to2cs3ny02qtbcb as to } from '../Tuples.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function contains(_this__u8e3s4, char, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return indexOf(_this__u8e3s4, char, VOID, ignoreCase) >= 0;
}
function indexOf(_this__u8e3s4, char, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([char]);
    tmp = indexOfAny(_this__u8e3s4, tmp$ret$0, startIndex, ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(str, startIndex);
  }
  return tmp;
}
function lineSequence(_this__u8e3s4) {
  // Inline function 'kotlin.sequences.Sequence' call
  return new (lineSequence$$inlined$Sequence$1())(_this__u8e3s4);
}
function split(_this__u8e3s4, delimiters, ignoreCase, limit) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  if (delimiters.length === 1) {
    var delimiter = delimiters[0];
    // Inline function 'kotlin.text.isEmpty' call
    if (!(charSequenceLength(delimiter) === 0)) {
      return split_1(_this__u8e3s4, delimiter, ignoreCase, limit);
    }
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = asIterable(rangesDelimitedBy(_this__u8e3s4, delimiters, VOID, ignoreCase, limit));
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$1 = substring_1(_this__u8e3s4, item);
    destination.i(tmp$ret$1);
  }
  return destination;
}
function isBlank(_this__u8e3s4) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.all' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (!isWhitespace(element)) {
        tmp$ret$1 = false;
        break $l$block;
      }
    }
    tmp$ret$1 = true;
  }
  return tmp$ret$1;
}
function startsWith_1(_this__u8e3s4, prefix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (!ignoreCase) {
    tmp_0 = typeof _this__u8e3s4 === 'string';
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = typeof prefix === 'string';
  } else {
    tmp = false;
  }
  if (tmp)
    return startsWith(_this__u8e3s4, prefix);
  else {
    return regionMatchesImpl(_this__u8e3s4, 0, prefix, 0, charSequenceLength(prefix), ignoreCase);
  }
}
function get_lastIndex(_this__u8e3s4) {
  return charSequenceLength(_this__u8e3s4) - 1 | 0;
}
function removePrefix(_this__u8e3s4, prefix) {
  if (startsWith_1(_this__u8e3s4, prefix)) {
    return substring(_this__u8e3s4, charSequenceLength(prefix));
  }
  return _this__u8e3s4;
}
function contains_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (typeof other === 'string') {
    tmp = indexOf_0(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
  } else {
    tmp = indexOf_1(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
  }
  return tmp;
}
function removeSuffix(_this__u8e3s4, suffix) {
  if (endsWith_0(_this__u8e3s4, suffix)) {
    return substring_0(_this__u8e3s4, 0, _this__u8e3s4.length - charSequenceLength(suffix) | 0);
  }
  return _this__u8e3s4;
}
function indexOf_0(_this__u8e3s4, string, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    tmp = indexOf_1(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(string, startIndex);
  }
  return tmp;
}
function padStart(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  return toString_0(padStart_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
}
function startsWith_2(_this__u8e3s4, prefix, startIndex, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (!ignoreCase) {
    tmp_0 = typeof _this__u8e3s4 === 'string';
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = typeof prefix === 'string';
  } else {
    tmp = false;
  }
  if (tmp)
    return startsWith_0(_this__u8e3s4, prefix, startIndex);
  else {
    return regionMatchesImpl(_this__u8e3s4, startIndex, prefix, 0, charSequenceLength(prefix), ignoreCase);
  }
}
function split_0(_this__u8e3s4, delimiters, ignoreCase, limit) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  if (delimiters.length === 1) {
    return split_1(_this__u8e3s4, toString(delimiters[0]), ignoreCase, limit);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = asIterable(rangesDelimitedBy_0(_this__u8e3s4, delimiters, VOID, ignoreCase, limit));
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = substring_1(_this__u8e3s4, item);
    destination.i(tmp$ret$0);
  }
  return destination;
}
function startsWith_3(_this__u8e3s4, char, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return charSequenceLength(_this__u8e3s4) > 0 && equals(charSequenceGet(_this__u8e3s4, 0), char, ignoreCase);
}
function indexOfAny(_this__u8e3s4, chars, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (!ignoreCase && chars.length === 1) {
    tmp = typeof _this__u8e3s4 === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var char = single(chars);
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.indexOf(str, startIndex);
  }
  var inductionVariable = coerceAtLeast(startIndex, 0);
  var last = get_lastIndex(_this__u8e3s4);
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var charAtIndex = charSequenceGet(_this__u8e3s4, index);
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.collections.any' call
        var inductionVariable_0 = 0;
        var last_0 = chars.length;
        while (inductionVariable_0 < last_0) {
          var element = chars[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals(element, charAtIndex, ignoreCase)) {
            tmp$ret$4 = true;
            break $l$block;
          }
        }
        tmp$ret$4 = false;
      }
      if (tmp$ret$4)
        return index;
    }
     while (!(index === last));
  return -1;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor() {
        this.mu_1 = 0;
        this.nu_1 = 1;
        this.ou_1 = 2;
      }
    }
    initMetadataForObject($, 'State');
    StateClass = $;
  }
  return StateClass;
}
var State_instance;
function State_getInstance() {
  return State_instance;
}
var LinesIteratorClass;
function LinesIterator() {
  if (LinesIteratorClass === VOID) {
    class $ {
      constructor(string) {
        this.pu_1 = string;
        this.qu_1 = 0;
        this.ru_1 = 0;
        this.su_1 = 0;
        this.tu_1 = 0;
      }
      y() {
        if (!(this.qu_1 === 0)) {
          return this.qu_1 === 1;
        }
        if (this.tu_1 < 0) {
          this.qu_1 = 2;
          return false;
        }
        var _delimiterLength = -1;
        var _delimiterStartIndex = charSequenceLength(this.pu_1);
        var inductionVariable = this.ru_1;
        var last = charSequenceLength(this.pu_1);
        if (inductionVariable < last)
          $l$loop: do {
            var idx = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var c = charSequenceGet(this.pu_1, idx);
            if (c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13)) {
              _delimiterLength = c === _Char___init__impl__6a9atx(13) && (idx + 1 | 0) < charSequenceLength(this.pu_1) && charSequenceGet(this.pu_1, idx + 1 | 0) === _Char___init__impl__6a9atx(10) ? 2 : 1;
              _delimiterStartIndex = idx;
              break $l$loop;
            }
          }
           while (inductionVariable < last);
        this.qu_1 = 1;
        this.tu_1 = _delimiterLength;
        this.su_1 = _delimiterStartIndex;
        return true;
      }
      z() {
        if (!this.y()) {
          throw NoSuchElementException().m1();
        }
        this.qu_1 = 0;
        var lastIndex = this.su_1;
        var firstIndex = this.ru_1;
        this.ru_1 = this.su_1 + this.tu_1 | 0;
        // Inline function 'kotlin.text.substring' call
        var this_0 = this.pu_1;
        return toString_0(charSequenceSubSequence(this_0, firstIndex, lastIndex));
      }
    }
    initMetadataForClass($, 'LinesIterator');
    LinesIteratorClass = $;
  }
  return LinesIteratorClass;
}
function trim(_this__u8e3s4) {
  // Inline function 'kotlin.text.trim' call
  var startIndex = 0;
  var endIndex = charSequenceLength(_this__u8e3s4) - 1 | 0;
  var startFound = false;
  $l$loop: while (startIndex <= endIndex) {
    var index = !startFound ? startIndex : endIndex;
    var p0 = charSequenceGet(_this__u8e3s4, index);
    var match = isWhitespace(p0);
    if (!startFound) {
      if (!match)
        startFound = true;
      else
        startIndex = startIndex + 1 | 0;
    } else {
      if (!match)
        break $l$loop;
      else
        endIndex = endIndex - 1 | 0;
    }
  }
  return charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex + 1 | 0);
}
function split_1(_this__u8e3s4, delimiter, ignoreCase, limit) {
  requireNonNegativeLimit(limit);
  var currentOffset = 0;
  var nextIndex = indexOf_0(_this__u8e3s4, delimiter, currentOffset, ignoreCase);
  if (nextIndex === -1 || limit === 1) {
    return listOf(toString_0(_this__u8e3s4));
  }
  var isLimited = limit > 0;
  var result = ArrayList().w(isLimited ? coerceAtMost(limit, 10) : 10);
  $l$loop: do {
    var tmp2 = currentOffset;
    // Inline function 'kotlin.text.substring' call
    var endIndex = nextIndex;
    var tmp$ret$0 = toString_0(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex));
    result.i(tmp$ret$0);
    currentOffset = nextIndex + delimiter.length | 0;
    if (isLimited && result.c1() === (limit - 1 | 0))
      break $l$loop;
    nextIndex = indexOf_0(_this__u8e3s4, delimiter, currentOffset, ignoreCase);
  }
   while (!(nextIndex === -1));
  var tmp2_0 = currentOffset;
  // Inline function 'kotlin.text.substring' call
  var endIndex_0 = charSequenceLength(_this__u8e3s4);
  var tmp$ret$1 = toString_0(charSequenceSubSequence(_this__u8e3s4, tmp2_0, endIndex_0));
  result.i(tmp$ret$1);
  return result;
}
function rangesDelimitedBy(_this__u8e3s4, delimiters, startIndex, ignoreCase, limit) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  requireNonNegativeLimit(limit);
  var delimitersList = asList(delimiters);
  return new (DelimitedRangesSequence())(_this__u8e3s4, startIndex, limit, rangesDelimitedBy$lambda(delimitersList, ignoreCase));
}
function substring_1(_this__u8e3s4, range) {
  return toString_0(charSequenceSubSequence(_this__u8e3s4, range.hk(), range.ik() + 1 | 0));
}
function regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  if (otherOffset < 0 || thisOffset < 0 || thisOffset > (charSequenceLength(_this__u8e3s4) - length | 0) || otherOffset > (charSequenceLength(other) - length | 0)) {
    return false;
  }
  var inductionVariable = 0;
  if (inductionVariable < length)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!equals(charSequenceGet(_this__u8e3s4, thisOffset + index | 0), charSequenceGet(other, otherOffset + index | 0), ignoreCase))
        return false;
    }
     while (inductionVariable < length);
  return true;
}
function indexOf_1(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
  last = last === VOID ? false : last;
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
  var tmp;
  if (typeof _this__u8e3s4 === 'string') {
    tmp = typeof other === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var inductionVariable = indices.x1_1;
    var last_0 = indices.y1_1;
    var step = indices.z1_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        if (regionMatches(other, 0, _this__u8e3s4, index, other.length, ignoreCase))
          return index;
      }
       while (!(index === last_0));
  } else {
    var inductionVariable_0 = indices.x1_1;
    var last_1 = indices.y1_1;
    var step_0 = indices.z1_1;
    if (step_0 > 0 && inductionVariable_0 <= last_1 || (step_0 < 0 && last_1 <= inductionVariable_0))
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        if (regionMatchesImpl(other, 0, _this__u8e3s4, index_0, charSequenceLength(other), ignoreCase))
          return index_0;
      }
       while (!(index_0 === last_1));
  }
  return -1;
}
function endsWith_0(_this__u8e3s4, suffix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (!ignoreCase) {
    tmp_0 = typeof _this__u8e3s4 === 'string';
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = typeof suffix === 'string';
  } else {
    tmp = false;
  }
  if (tmp)
    return endsWith(_this__u8e3s4, suffix);
  else {
    return regionMatchesImpl(_this__u8e3s4, charSequenceLength(_this__u8e3s4) - charSequenceLength(suffix) | 0, suffix, 0, charSequenceLength(suffix), ignoreCase);
  }
}
function padStart_0(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  if (length < 0)
    throw IllegalArgumentException().q('Desired length ' + length + ' is less than zero.');
  if (length <= charSequenceLength(_this__u8e3s4))
    return charSequenceSubSequence(_this__u8e3s4, 0, charSequenceLength(_this__u8e3s4));
  var sb = StringBuilder().kc(length);
  var inductionVariable = 1;
  var last = length - charSequenceLength(_this__u8e3s4) | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      sb.ic(padChar);
    }
     while (!(i === last));
  sb.v(_this__u8e3s4);
  return sb;
}
function rangesDelimitedBy_0(_this__u8e3s4, delimiters, startIndex, ignoreCase, limit) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  requireNonNegativeLimit(limit);
  return new (DelimitedRangesSequence())(_this__u8e3s4, startIndex, limit, rangesDelimitedBy$lambda_0(delimiters, ignoreCase));
}
function requireNonNegativeLimit(limit) {
  // Inline function 'kotlin.require' call
  if (!(limit >= 0)) {
    var message = 'Limit must be non-negative, but was ' + limit;
    throw IllegalArgumentException().q(toString_0(message));
  }
  return Unit_instance;
}
function calcNext($this) {
  if ($this.wu_1 < 0) {
    $this.uu_1 = 0;
    $this.xu_1 = null;
  } else {
    var tmp;
    var tmp_0;
    if ($this.zu_1.cv_1 > 0) {
      $this.yu_1 = $this.yu_1 + 1 | 0;
      tmp_0 = $this.yu_1 >= $this.zu_1.cv_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = $this.wu_1 > charSequenceLength($this.zu_1.av_1);
    }
    if (tmp) {
      $this.xu_1 = numberRangeToNumber($this.vu_1, get_lastIndex($this.zu_1.av_1));
      $this.wu_1 = -1;
    } else {
      var match = $this.zu_1.dv_1($this.zu_1.av_1, $this.wu_1);
      if (match == null) {
        $this.xu_1 = numberRangeToNumber($this.vu_1, get_lastIndex($this.zu_1.av_1));
        $this.wu_1 = -1;
      } else {
        var index = match.ch();
        var length = match.dh();
        $this.xu_1 = until($this.vu_1, index);
        $this.vu_1 = index + length | 0;
        $this.wu_1 = $this.vu_1 + (length === 0 ? 1 : 0) | 0;
      }
    }
    $this.uu_1 = 1;
  }
}
var DelimitedRangesSequence$iterator$1Class;
function DelimitedRangesSequence$iterator$1() {
  if (DelimitedRangesSequence$iterator$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.zu_1 = this$0;
        this.uu_1 = -1;
        this.vu_1 = coerceIn(this$0.bv_1, 0, charSequenceLength(this$0.av_1));
        this.wu_1 = this.vu_1;
        this.xu_1 = null;
        this.yu_1 = 0;
      }
      z() {
        if (this.uu_1 === -1) {
          calcNext(this);
        }
        if (this.uu_1 === 0)
          throw NoSuchElementException().m1();
        var tmp = this.xu_1;
        var result = tmp instanceof IntRange() ? tmp : THROW_CCE();
        this.xu_1 = null;
        this.uu_1 = -1;
        return result;
      }
      y() {
        if (this.uu_1 === -1) {
          calcNext(this);
        }
        return this.uu_1 === 1;
      }
    }
    initMetadataForClass($);
    DelimitedRangesSequence$iterator$1Class = $;
  }
  return DelimitedRangesSequence$iterator$1Class;
}
var DelimitedRangesSequenceClass;
function DelimitedRangesSequence() {
  if (DelimitedRangesSequenceClass === VOID) {
    class $ {
      constructor(input, startIndex, limit, getNextMatch) {
        this.av_1 = input;
        this.bv_1 = startIndex;
        this.cv_1 = limit;
        this.dv_1 = getNextMatch;
      }
      x() {
        return new (DelimitedRangesSequence$iterator$1())(this);
      }
    }
    initMetadataForClass($, 'DelimitedRangesSequence');
    DelimitedRangesSequenceClass = $;
  }
  return DelimitedRangesSequenceClass;
}
function findAnyOf(_this__u8e3s4, strings, startIndex, ignoreCase, last) {
  if (!ignoreCase && strings.c1() === 1) {
    var string = single_0(strings);
    var index = !last ? indexOf_0(_this__u8e3s4, string, startIndex) : lastIndexOf(_this__u8e3s4, string, startIndex);
    return index < 0 ? null : to(index, string);
  }
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), charSequenceLength(_this__u8e3s4)) : downTo(coerceAtMost(startIndex, get_lastIndex(_this__u8e3s4)), 0);
  if (typeof _this__u8e3s4 === 'string') {
    var inductionVariable = indices.x1_1;
    var last_0 = indices.y1_1;
    var step = indices.z1_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index_0 = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = strings.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (regionMatches(element, 0, _this__u8e3s4, index_0, element.length, ignoreCase)) {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        var matchingString = tmp$ret$1;
        if (!(matchingString == null))
          return to(index_0, matchingString);
      }
       while (!(index_0 === last_0));
  } else {
    var inductionVariable_0 = indices.x1_1;
    var last_1 = indices.y1_1;
    var step_0 = indices.z1_1;
    if (step_0 > 0 && inductionVariable_0 <= last_1 || (step_0 < 0 && last_1 <= inductionVariable_0))
      do {
        var index_1 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        var tmp$ret$3;
        $l$block_0: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s_0 = strings.x();
          while (_iterator__ex2g4s_0.y()) {
            var element_0 = _iterator__ex2g4s_0.z();
            if (regionMatchesImpl(element_0, 0, _this__u8e3s4, index_1, element_0.length, ignoreCase)) {
              tmp$ret$3 = element_0;
              break $l$block_0;
            }
          }
          tmp$ret$3 = null;
        }
        var matchingString_0 = tmp$ret$3;
        if (!(matchingString_0 == null))
          return to(index_1, matchingString_0);
      }
       while (!(index_1 === last_1));
  }
  return null;
}
function lastIndexOf(_this__u8e3s4, string, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? get_lastIndex(_this__u8e3s4) : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    tmp = indexOf_1(_this__u8e3s4, string, startIndex, 0, ignoreCase, true);
  } else {
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.lastIndexOf(string, startIndex);
  }
  return tmp;
}
function lines(_this__u8e3s4) {
  return toList(lineSequence(_this__u8e3s4));
}
function substringBefore(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring_0(_this__u8e3s4, 0, index);
}
function substringAfter(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring_0(_this__u8e3s4, index + 1 | 0, _this__u8e3s4.length);
}
function toBooleanStrictOrNull(_this__u8e3s4) {
  switch (_this__u8e3s4) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}
var lineSequence$$inlined$Sequence$1Class;
function lineSequence$$inlined$Sequence$1() {
  if (lineSequence$$inlined$Sequence$1Class === VOID) {
    class $ {
      constructor($this_lineSequence) {
        this.ev_1 = $this_lineSequence;
      }
      x() {
        return new (LinesIterator())(this.ev_1);
      }
    }
    initMetadataForClass($);
    lineSequence$$inlined$Sequence$1Class = $;
  }
  return lineSequence$$inlined$Sequence$1Class;
}
function rangesDelimitedBy$lambda($delimitersList, $ignoreCase) {
  return function ($this$DelimitedRangesSequence, currentIndex) {
    var tmp0_safe_receiver = findAnyOf($this$DelimitedRangesSequence, $delimitersList, currentIndex, $ignoreCase, false);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = to(tmp0_safe_receiver.ah_1, tmp0_safe_receiver.bh_1.length);
    }
    return tmp;
  };
}
function rangesDelimitedBy$lambda_0($delimiters, $ignoreCase) {
  return function ($this$DelimitedRangesSequence, currentIndex) {
    // Inline function 'kotlin.let' call
    var it = indexOfAny($this$DelimitedRangesSequence, $delimiters, currentIndex, $ignoreCase);
    return it < 0 ? null : to(it, 1);
  };
}
//region block: init
State_instance = new (State())();
//endregion
//region block: exports
export {
  contains_0 as contains3ue2qo8xhmpf1,
  contains as contains2el4s70rdq4ld,
  endsWith_0 as endsWith1a79dp5rc3sfv,
  indexOfAny as indexOfAny2ijjuuzpljsyd,
  indexOf_0 as indexOfwa4w6635jewi,
  indexOf as indexOf1xbs558u7wr52,
  isBlank as isBlank1dvkhjjvox3p0,
  get_lastIndex as get_lastIndexld83bqhfgcdd,
  lastIndexOf as lastIndexOf2d52xhix5ymjr,
  lineSequence as lineSequencefj20mplblw0p,
  lines as lines3g90sq0zeq43v,
  padStart as padStart36w1507hs626a,
  regionMatchesImpl as regionMatchesImplsfmctm6zdxjp,
  removePrefix as removePrefix279df90bhrqqg,
  removeSuffix as removeSuffix3d61x5lsuvuho,
  split_0 as split3d3yeauc4rm2n,
  split as split2bvyvnrlcifjv,
  startsWith_3 as startsWith1bgirhbedtv2y,
  startsWith_1 as startsWith38d3sbg25w0lx,
  startsWith_2 as startsWith641pyr7vf687,
  substringAfter as substringAfter1hku067gwr5ve,
  substringBefore as substringBefore3n7kj60w69hju,
  toBooleanStrictOrNull as toBooleanStrictOrNull2j0md398tkvbj,
  trim as trim11nh7r46at6sx,
};
//endregion

//# sourceMappingURL=Strings.mjs.map
