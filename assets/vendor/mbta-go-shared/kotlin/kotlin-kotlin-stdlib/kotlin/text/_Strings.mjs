import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../js/charSequenceJs.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import { get_lastIndexld83bqhfgcdd as get_lastIndex } from './Strings.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  coerceAtMost322komnqp70ag as coerceAtMost,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
} from '../ranges/_Ranges.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from './stringJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function last(_this__u8e3s4) {
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(_this__u8e3s4) === 0)
    throw NoSuchElementException().m('Char sequence is empty.');
  return charSequenceGet(_this__u8e3s4, get_lastIndex(_this__u8e3s4));
}
function first(_this__u8e3s4) {
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(_this__u8e3s4) === 0)
    throw NoSuchElementException().m('Char sequence is empty.');
  return charSequenceGet(_this__u8e3s4, 0);
}
function take(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  return substring(_this__u8e3s4, 0, coerceAtMost(n, _this__u8e3s4.length));
}
function drop(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  return substring_0(_this__u8e3s4, coerceAtMost(n, _this__u8e3s4.length));
}
function dropLast(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException().q(toString(message));
  }
  return take(_this__u8e3s4, coerceAtLeast(_this__u8e3s4.length - n | 0, 0));
}
function single(_this__u8e3s4) {
  var tmp;
  switch (charSequenceLength(_this__u8e3s4)) {
    case 0:
      throw NoSuchElementException().m('Char sequence is empty.');
    case 1:
      tmp = charSequenceGet(_this__u8e3s4, 0);
      break;
    default:
      throw IllegalArgumentException().q('Char sequence has more than one element.');
  }
  return tmp;
}
//region block: exports
export {
  dropLast as dropLastlqc2oyv04br0,
  drop as drop336950s126lmj,
  first as first3kg261hmihapu,
  last as last2n4gf5az1lkn4,
  single as single29ec4rh52687r,
  take as take9j4462mea726,
};
//endregion

//# sourceMappingURL=_Strings.mjs.map
