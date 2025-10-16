import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './void.mjs';
import { DoubleIteratorpyjiqhzm6h4f as DoubleIterator } from '../collections/PrimitiveIterators.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function arrayIterator(array) {
  return new (arrayIterator$1())(array);
}
function doubleArrayIterator(array) {
  return new (doubleArrayIterator$1())(array);
}
function booleanArray(size) {
  var tmp0 = 'BooleanArray';
  // Inline function 'withType' call
  var array = fillArrayVal(Array(size), false);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function fillArrayVal(array, initValue) {
  var inductionVariable = 0;
  var last = array.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      array[i] = initValue;
    }
     while (!(i === last));
  return array;
}
function charArray(size) {
  var tmp0 = 'CharArray';
  // Inline function 'withType' call
  var array = new Uint16Array(size);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function longArray(size) {
  var tmp0 = 'LongArray';
  // Inline function 'withType' call
  var array = fillArrayVal(Array(size), new (Long())(0, 0));
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function charArrayOf(arr) {
  var tmp0 = 'CharArray';
  // Inline function 'withType' call
  var array = new Uint16Array(arr);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function longArrayOf(arr) {
  var tmp0 = 'LongArray';
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'withType' call
  var array = arr.slice();
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
var arrayIterator$1Class;
function arrayIterator$1() {
  if (arrayIterator$1Class === VOID) {
    class $ {
      constructor($array) {
        this.b5_1 = $array;
        this.a5_1 = 0;
      }
      y() {
        return !(this.a5_1 === this.b5_1.length);
      }
      z() {
        var tmp;
        if (!(this.a5_1 === this.b5_1.length)) {
          var _unary__edvuaz = this.a5_1;
          this.a5_1 = _unary__edvuaz + 1 | 0;
          tmp = this.b5_1[_unary__edvuaz];
        } else {
          throw NoSuchElementException().m('' + this.a5_1);
        }
        return tmp;
      }
    }
    initMetadataForClass($);
    arrayIterator$1Class = $;
  }
  return arrayIterator$1Class;
}
var doubleArrayIterator$1Class;
function doubleArrayIterator$1() {
  if (doubleArrayIterator$1Class === VOID) {
    class $ extends DoubleIterator() {
      constructor($array, $box) {
        if ($box === VOID)
          $box = {};
        $box.d5_1 = $array;
        super($box);
        this.c5_1 = 0;
      }
      y() {
        return !(this.c5_1 === this.d5_1.length);
      }
      e5() {
        var tmp;
        if (!(this.c5_1 === this.d5_1.length)) {
          var _unary__edvuaz = this.c5_1;
          this.c5_1 = _unary__edvuaz + 1 | 0;
          tmp = this.d5_1[_unary__edvuaz];
        } else {
          throw NoSuchElementException().m('' + this.c5_1);
        }
        return tmp;
      }
    }
    initMetadataForClass($);
    doubleArrayIterator$1Class = $;
  }
  return doubleArrayIterator$1Class;
}
//region block: exports
export {
  arrayIterator as arrayIterator3lgwvgteckzhv,
  booleanArray as booleanArray2jdug9b51huk7,
  charArrayOf as charArrayOf27f4r3dozbrk1,
  charArray as charArray2ujmm1qusno00,
  doubleArrayIterator as doubleArrayIterator3t8gohbqilipn,
  longArrayOf as longArrayOf1jqne2a8v34i5,
  longArray as longArray288a0fctlmjmj,
};
//endregion

//# sourceMappingURL=arrays.mjs.map
