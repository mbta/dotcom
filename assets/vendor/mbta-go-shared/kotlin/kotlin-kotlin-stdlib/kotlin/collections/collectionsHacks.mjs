import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { joinToStringxqcavsxcmh4q as joinToString } from './_Arrays.mjs';
import { isArrayish54psvuvyhrq3 as isArrayish } from '../js/typeCheckUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../js/coreRuntime.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function arrayToString(array) {
  return joinToString(array, ', ', '[', ']', VOID, VOID, arrayToString$lambda);
}
function contentEqualsInternal(_this__u8e3s4, other) {
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  // Inline function 'kotlin.js.asDynamic' call
  var b = other;
  if (a === b)
    return true;
  if (a == null || b == null || !isArrayish(b) || a.length != b.length)
    return false;
  var inductionVariable = 0;
  var last = a.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
     while (inductionVariable < last);
  return true;
}
function contentHashCodeInternal(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  if (a == null)
    return 0;
  var result = 1;
  var inductionVariable = 0;
  var last = a.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      result = imul(result, 31) + hashCode(a[i]) | 0;
    }
     while (inductionVariable < last);
  return result;
}
function arrayToString$lambda(it) {
  return toString(it);
}
//region block: exports
export {
  arrayToString as arrayToString1r7op7afgkivw,
  contentEqualsInternal as contentEqualsInternal159ewkjhd68pe,
  contentHashCodeInternal as contentHashCodeInternal1u5qmd40n36g0,
};
//endregion

//# sourceMappingURL=collectionsHacks.mjs.map
