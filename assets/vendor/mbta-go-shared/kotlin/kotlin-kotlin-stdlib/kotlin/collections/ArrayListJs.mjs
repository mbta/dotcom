import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import { AbstractMutableList192xfq8ycgofs as AbstractMutableList } from './AbstractMutableListJs.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
} from '../exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import {
  copyToArray2j022khrow2yi as copyToArray,
  checkIndexOverflow3frtmheghr0th as checkIndexOverflow,
} from './collectionJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from './CollectionsKt.mjs';
import {
  indexOf3ic8eacwbbrog as indexOf,
  lastIndexOf38r7ehtcodylq as lastIndexOf,
} from './_Arrays.mjs';
import { arrayToString1r7op7afgkivw as arrayToString } from './collectionsHacks.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from './Collections.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        // Inline function 'kotlin.also' call
        var this_0 = ArrayList().w(0);
        this_0.t_1 = true;
        tmp.p8_1 = this_0;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
function increaseLength($this, amount) {
  var previous = $this.c1();
  // Inline function 'kotlin.js.asDynamic' call
  $this.s_1.length = $this.c1() + amount | 0;
  return previous;
}
function rangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance.t7(index, $this.c1());
  return index;
}
function insertionRangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance.i7(index, $this.c1());
  return index;
}
var ArrayListClass;
function ArrayList() {
  if (ArrayListClass === VOID) {
    class $ extends AbstractMutableList() {
      static j5(array) {
        Companion_getInstance();
        var $this = this.s7();
        $this.s_1 = array;
        $this.t_1 = false;
        return $this;
      }
      static g1() {
        Companion_getInstance();
        // Inline function 'kotlin.emptyArray' call
        var tmp$ret$0 = [];
        return this.j5(tmp$ret$0);
      }
      static w(initialCapacity) {
        Companion_getInstance();
        // Inline function 'kotlin.emptyArray' call
        var tmp$ret$0 = [];
        var $this = this.j5(tmp$ret$0);
        // Inline function 'kotlin.require' call
        if (!(initialCapacity >= 0)) {
          var message = 'Negative initial capacity: ' + initialCapacity;
          throw IllegalArgumentException().q(toString(message));
        }
        return $this;
      }
      static u(elements) {
        Companion_getInstance();
        // Inline function 'kotlin.collections.toTypedArray' call
        var tmp$ret$0 = copyToArray(elements);
        return this.j5(tmp$ret$0);
      }
      k5() {
        this.y6();
        this.t_1 = true;
        return this.c1() > 0 ? this : Companion_getInstance().p8_1;
      }
      q8() {
      }
      r8(minCapacity) {
      }
      c1() {
        return this.s_1.length;
      }
      e1(index) {
        var tmp = this.s_1[rangeCheck(this, index)];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      q3(index, element) {
        this.y6();
        rangeCheck(this, index);
        // Inline function 'kotlin.apply' call
        var this_0 = this.s_1[index];
        this.s_1[index] = element;
        var tmp = this_0;
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      i(element) {
        this.y6();
        // Inline function 'kotlin.js.asDynamic' call
        this.s_1.push(element);
        this.d7_1 = this.d7_1 + 1 | 0;
        return true;
      }
      r3(index, element) {
        this.y6();
        // Inline function 'kotlin.js.asDynamic' call
        this.s_1.splice(insertionRangeCheck(this, index), 0, element);
        this.d7_1 = this.d7_1 + 1 | 0;
      }
      d1(elements) {
        this.y6();
        if (elements.h1())
          return false;
        var offset = increaseLength(this, elements.c1());
        // Inline function 'kotlin.collections.forEachIndexed' call
        var index = 0;
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          var index_0 = checkIndexOverflow(_unary__edvuaz);
          this.s_1[offset + index_0 | 0] = item;
        }
        this.d7_1 = this.d7_1 + 1 | 0;
        return true;
      }
      n3(index, elements) {
        this.y6();
        insertionRangeCheck(this, index);
        if (index === this.c1())
          return this.d1(elements);
        if (elements.h1())
          return false;
        // Inline function 'kotlin.js.asDynamic' call
        // Inline function 'kotlin.js.unsafeCast' call
        var tail = this.s_1.splice(index);
        this.d1(elements);
        var offset = increaseLength(this, tail.length);
        // Inline function 'kotlin.repeat' call
        var times = tail.length;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index_0 = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.s_1[offset + index_0 | 0] = tail[index_0];
          }
           while (inductionVariable < times);
        this.d7_1 = this.d7_1 + 1 | 0;
        return true;
      }
      s3(index) {
        this.y6();
        rangeCheck(this, index);
        this.d7_1 = this.d7_1 + 1 | 0;
        var tmp;
        if (index === get_lastIndex(this)) {
          // Inline function 'kotlin.js.asDynamic' call
          tmp = this.s_1.pop();
        } else {
          // Inline function 'kotlin.js.asDynamic' call
          tmp = this.s_1.splice(index, 1)[0];
        }
        return tmp;
      }
      m3(element) {
        this.y6();
        var inductionVariable = 0;
        var last = this.s_1.length - 1 | 0;
        if (inductionVariable <= last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.s_1[index], element)) {
              // Inline function 'kotlin.js.asDynamic' call
              this.s_1.splice(index, 1);
              this.d7_1 = this.d7_1 + 1 | 0;
              return true;
            }
          }
           while (inductionVariable <= last);
        return false;
      }
      u7(fromIndex, toIndex) {
        this.y6();
        this.d7_1 = this.d7_1 + 1 | 0;
        // Inline function 'kotlin.js.asDynamic' call
        this.s_1.splice(fromIndex, toIndex - fromIndex | 0);
      }
      p3() {
        this.y6();
        var tmp = this;
        // Inline function 'kotlin.emptyArray' call
        tmp.s_1 = [];
        this.d7_1 = this.d7_1 + 1 | 0;
      }
      l1(element) {
        return indexOf(this.s_1, element);
      }
      e3(element) {
        return lastIndexOf(this.s_1, element);
      }
      toString() {
        return arrayToString(this.s_1);
      }
      s8() {
        return [].slice.call(this.s_1);
      }
      toArray() {
        return this.s8();
      }
      y6() {
        if (this.t_1)
          throw UnsupportedOperationException().i5();
      }
    }
    initMetadataForClass($, 'ArrayList', $.g1, VOID, [AbstractMutableList(), KtMutableList(), RandomAccess()]);
    ArrayListClass = $;
  }
  return ArrayListClass;
}
//region block: exports
export {
  ArrayList as ArrayList3it5z8td81qkl,
};
//endregion

//# sourceMappingURL=ArrayListJs.mjs.map
