import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from './ArrayListJs.mjs';
import {
  contentEqualsInternal159ewkjhd68pe as contentEqualsInternal,
  contentHashCodeInternal1u5qmd40n36g0 as contentHashCodeInternal,
} from './collectionsHacks.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { charArray2ujmm1qusno00 as charArray } from '../js/arrays.mjs';
import {
  fillFrom3pz8g2cvpcwer as fillFrom,
  arrayCopyResize15cxrbbe9vpuk as arrayCopyResize,
  arrayPlusCollection1zlz5pt9o4ri5 as arrayPlusCollection,
} from '../kotlin.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  sortArray339a9f8uezkqr as sortArray,
  sortArrayWith2peqe6a4xxbw8 as sortArrayWith,
} from './ArraySorting.mjs';
import { joinToStringxqcavsxcmh4q as joinToString } from './_Arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function fill(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance.q6(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
}
function asList(_this__u8e3s4) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return ArrayList().j5(_this__u8e3s4);
}
function contentEquals(_this__u8e3s4, other) {
  return contentEqualsInternal(_this__u8e3s4, other);
}
function copyOf(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  var tmp0 = 'CharArray';
  // Inline function 'withType' call
  var array = fillFrom(_this__u8e3s4, charArray(newSize));
  array.$type$ = tmp0;
  return array;
}
function copyOf_0(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return fillFrom(_this__u8e3s4, new Float64Array(newSize));
}
function copyOf_1(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return fillFrom(_this__u8e3s4, new Float32Array(newSize));
}
function copyOf_2(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  var tmp0 = 'LongArray';
  // Inline function 'withType' call
  var array = arrayCopyResize(_this__u8e3s4, newSize, new (Long())(0, 0));
  array.$type$ = tmp0;
  return array;
}
function copyOf_3(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return fillFrom(_this__u8e3s4, new Int32Array(newSize));
}
function copyOf_4(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return fillFrom(_this__u8e3s4, new Int16Array(newSize));
}
function copyOf_5(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return fillFrom(_this__u8e3s4, new Int8Array(newSize));
}
function copyOf_6(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  var tmp0 = 'BooleanArray';
  // Inline function 'withType' call
  var array = arrayCopyResize(_this__u8e3s4, newSize, false);
  array.$type$ = tmp0;
  return array;
}
function contentHashCode(_this__u8e3s4) {
  return contentHashCodeInternal(_this__u8e3s4);
}
function toTypedArray(_this__u8e3s4) {
  return [].slice.call(_this__u8e3s4);
}
function fill_0(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance.q6(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
}
function fill_1(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance.q6(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
}
function copyOf_7(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException().q(toString(message));
  }
  return arrayCopyResize(_this__u8e3s4, newSize, null);
}
function plus(_this__u8e3s4, elements) {
  return arrayPlusCollection(_this__u8e3s4, elements);
}
function sort(_this__u8e3s4) {
  if (_this__u8e3s4.length > 1) {
    sortArray(_this__u8e3s4);
  }
}
function sortWith(_this__u8e3s4, comparator) {
  if (_this__u8e3s4.length > 1) {
    sortArrayWith(_this__u8e3s4, comparator);
  }
}
function contentToString(_this__u8e3s4) {
  var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : joinToString(_this__u8e3s4, ', ', '[', ']');
  return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
}
function contentEquals_0(_this__u8e3s4, other) {
  return contentEqualsInternal(_this__u8e3s4, other);
}
function contentHashCode_0(_this__u8e3s4) {
  return contentHashCodeInternal(_this__u8e3s4);
}
function copyOfRange(_this__u8e3s4, fromIndex, toIndex) {
  Companion_instance.q6(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.slice(fromIndex, toIndex);
}
function contentEquals_1(_this__u8e3s4, other) {
  return contentEqualsInternal(_this__u8e3s4, other);
}
function contentHashCode_1(_this__u8e3s4) {
  return contentHashCodeInternal(_this__u8e3s4);
}
//region block: exports
export {
  asList as asList2ho2pewtsfvv,
  contentEquals as contentEqualsaf55p28mnw74,
  contentEquals_0 as contentEquals5p44wfjhu6ta,
  contentEquals_1 as contentEquals1cdp6c846cfdi,
  contentHashCode_1 as contentHashCode25jw6rgkgywwr,
  contentHashCode as contentHashCode2i020q5tbeh2s,
  contentHashCode_0 as contentHashCodem24x0wy7gjt7,
  contentToString as contentToString3ujacv8hqfipd,
  copyOfRange as copyOfRange3alro60z4hhf8,
  copyOf_4 as copyOf39s58md6y6rn6,
  copyOf_2 as copyOf9mbsebmgnw4t,
  copyOf_6 as copyOf37mht4mx7mjgh,
  copyOf as copyOf2p23ljc5f5ea3,
  copyOf_5 as copyOfwy6h3t5vzqpl,
  copyOf_0 as copyOfgossjg6lh6js,
  copyOf_1 as copyOfq9pcgcgbldck,
  copyOf_7 as copyOf2ng0t8oizk6it,
  copyOf_3 as copyOf3rutauicler23,
  fill as fill2542d4m9l93pn,
  fill_0 as fillzcylmep0vxyi,
  fill_1 as fill3hcjvebk42tyx,
  plus as plus27p1csfyhycs6,
  sortWith as sortWith23lt7r6b8svqd,
  sort as sort1opyk0uibi7i3,
  toTypedArray as toTypedArray3sl1vhn8ifta0,
};
//endregion

//# sourceMappingURL=_ArraysJs.mjs.map
