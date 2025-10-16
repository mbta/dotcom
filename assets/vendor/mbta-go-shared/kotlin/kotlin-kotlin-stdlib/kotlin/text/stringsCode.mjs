import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceLength3278n89t01tmv as charSequenceLength,
} from '../js/charSequenceJs.mjs';
import { equals2ukvbdmtrnsss as equals } from './Char.mjs';
import { Companion_getInstanceduyatss8wab7 as Companion_getInstance } from './regex.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { regionMatchesImplsfmctm6zdxjp as regionMatchesImpl } from './Strings.mjs';
import { toString3o7ifthqydp6e as toString_0 } from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function startsWith(_this__u8e3s4, prefix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (!ignoreCase) {
    // Inline function 'kotlin.text.nativeStartsWith' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.startsWith(prefix, 0);
  } else
    return regionMatches(_this__u8e3s4, 0, prefix, 0, prefix.length, ignoreCase);
}
function equals_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (_this__u8e3s4 == null)
    return other == null;
  if (other == null)
    return false;
  if (!ignoreCase)
    return _this__u8e3s4 == other;
  if (!(_this__u8e3s4.length === other.length))
    return false;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var thisChar = charCodeAt(_this__u8e3s4, index);
      var otherChar = charCodeAt(other, index);
      if (!equals(thisChar, otherChar, ignoreCase)) {
        return false;
      }
    }
     while (inductionVariable < last);
  return true;
}
function endsWith(_this__u8e3s4, suffix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (!ignoreCase) {
    // Inline function 'kotlin.text.nativeEndsWith' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.endsWith(suffix);
  } else
    return regionMatches(_this__u8e3s4, _this__u8e3s4.length - suffix.length | 0, suffix, 0, suffix.length, ignoreCase);
}
function replace(_this__u8e3s4, oldValue, newValue, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp2 = new RegExp(Companion_getInstance().qj(oldValue), ignoreCase ? 'gui' : 'gu');
  // Inline function 'kotlin.text.nativeReplace' call
  var replacement = Companion_getInstance().rj(newValue);
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.replace(tmp2, replacement);
}
function repeat(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = "Count 'n' must be non-negative, but was " + n + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  var tmp;
  switch (n) {
    case 0:
      tmp = '';
      break;
    case 1:
      tmp = toString(_this__u8e3s4);
      break;
    default:
      var result = '';
      // Inline function 'kotlin.text.isEmpty' call

      if (!(charSequenceLength(_this__u8e3s4) === 0)) {
        var s = toString(_this__u8e3s4);
        var count = n;
        $l$loop: while (true) {
          if ((count & 1) === 1) {
            result = result + s;
          }
          count = count >>> 1 | 0;
          if (count === 0) {
            break $l$loop;
          }
          s = s + s;
        }
      }

      return result;
  }
  return tmp;
}
function regionMatches(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase);
}
function startsWith_0(_this__u8e3s4, prefix, startIndex, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (!ignoreCase) {
    // Inline function 'kotlin.text.nativeStartsWith' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.startsWith(prefix, startIndex);
  } else
    return regionMatches(_this__u8e3s4, startIndex, prefix, 0, prefix.length, ignoreCase);
}
function replace_0(_this__u8e3s4, oldChar, newChar, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp2 = new RegExp(Companion_getInstance().qj(toString_0(oldChar)), ignoreCase ? 'gui' : 'gu');
  // Inline function 'kotlin.text.nativeReplace' call
  var replacement = toString_0(newChar);
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.replace(tmp2, replacement);
}
//region block: exports
export {
  endsWith as endsWith3cq61xxngobwh,
  equals_0 as equals2v6cggk171b6e,
  regionMatches as regionMatches30ph926sbb53j,
  repeat as repeat2w4c6j8zoq09o,
  replace as replace3le3ie7l9k8aq,
  replace_0 as replaceqbix900hl8kl,
  startsWith as startsWith26w8qjqapeeq6,
  startsWith_0 as startsWith5hna0vjiqaqm,
};
//endregion

//# sourceMappingURL=stringsCode.mjs.map
