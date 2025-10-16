import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
} from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../ranges/_Ranges.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import {
  arrayCopytctsywo3h7gj as arrayCopy,
  copyToArray2j022khrow2yi as copyToArray,
  arrayOfNulls3cqbl98qmfq5b as arrayOfNulls,
  terminateCollectionToArray12671uhv05xea as terminateCollectionToArray,
} from './collectionJs.mjs';
import { get_lastIndexx0qsydpfv3mu as get_lastIndex } from './_Arrays.mjs';
import { fill3hcjvebk42tyx as fill } from './_ArraysJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { AbstractMutableList192xfq8ycgofs as AbstractMutableList } from './AbstractMutableListJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex_0 } from './CollectionsKt.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
import { isArray1hxjqtqy632bc as isArray } from '../js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ensureCapacity($this, minCapacity) {
  if (minCapacity < 0)
    throw IllegalStateException().o5('Deque is too big.');
  if (minCapacity <= $this.fn_1.length)
    return Unit_instance;
  if ($this.fn_1 === Companion_getInstance().hn_1) {
    var tmp = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = coerceAtLeast(minCapacity, 10);
    tmp.fn_1 = Array(size);
    return Unit_instance;
  }
  var newCapacity = Companion_instance.gb($this.fn_1.length, minCapacity);
  copyElements($this, newCapacity);
}
function copyElements($this, newCapacity) {
  // Inline function 'kotlin.arrayOfNulls' call
  var newElements = Array(newCapacity);
  var tmp0 = $this.fn_1;
  var tmp6 = $this.en_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = $this.fn_1.length;
  arrayCopy(tmp0, newElements, 0, tmp6, endIndex);
  var tmp0_0 = $this.fn_1;
  var tmp4 = $this.fn_1.length - $this.en_1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex_0 = $this.en_1;
  arrayCopy(tmp0_0, newElements, tmp4, 0, endIndex_0);
  $this.en_1 = 0;
  $this.fn_1 = newElements;
}
function positiveMod($this, index) {
  return index >= $this.fn_1.length ? index - $this.fn_1.length | 0 : index;
}
function negativeMod($this, index) {
  return index < 0 ? index + $this.fn_1.length | 0 : index;
}
function incremented($this, index) {
  return index === get_lastIndex($this.fn_1) ? 0 : index + 1 | 0;
}
function decremented($this, index) {
  return index === 0 ? get_lastIndex($this.fn_1) : index - 1 | 0;
}
function copyCollectionElements($this, internalIndex, elements) {
  var iterator = elements.x();
  var inductionVariable = internalIndex;
  var last = $this.fn_1.length;
  if (inductionVariable < last)
    $l$loop: do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!iterator.y())
        break $l$loop;
      $this.fn_1[index] = iterator.z();
    }
     while (inductionVariable < last);
  var inductionVariable_0 = 0;
  var last_0 = $this.en_1;
  if (inductionVariable_0 < last_0)
    $l$loop_0: do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if (!iterator.y())
        break $l$loop_0;
      $this.fn_1[index_0] = iterator.z();
    }
     while (inductionVariable_0 < last_0);
  $this.gn_1 = $this.gn_1 + elements.c1() | 0;
}
function removeRangeShiftPreceding($this, fromIndex, toIndex) {
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = fromIndex - 1 | 0;
  var copyFromIndex = positiveMod($this, $this.en_1 + index | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index_0 = toIndex - 1 | 0;
  var copyToIndex = positiveMod($this, $this.en_1 + index_0 | 0);
  var copyCount = fromIndex;
  while (copyCount > 0) {
    var tmp0 = copyCount;
    var tmp2 = copyFromIndex + 1 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var c = copyToIndex + 1 | 0;
    var segmentLength = Math.min(tmp0, tmp2, c);
    var tmp0_0 = $this.fn_1;
    var tmp2_0 = $this.fn_1;
    var tmp4 = (copyToIndex - segmentLength | 0) + 1 | 0;
    var tmp6 = (copyFromIndex - segmentLength | 0) + 1 | 0;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = copyFromIndex + 1 | 0;
    arrayCopy(tmp0_0, tmp2_0, tmp4, tmp6, endIndex);
    copyFromIndex = negativeMod($this, copyFromIndex - segmentLength | 0);
    copyToIndex = negativeMod($this, copyToIndex - segmentLength | 0);
    copyCount = copyCount - segmentLength | 0;
  }
}
function removeRangeShiftSucceeding($this, fromIndex, toIndex) {
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var copyFromIndex = positiveMod($this, $this.en_1 + toIndex | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var copyToIndex = positiveMod($this, $this.en_1 + fromIndex | 0);
  var copyCount = $this.gn_1 - toIndex | 0;
  while (copyCount > 0) {
    var tmp0 = copyCount;
    var tmp2 = $this.fn_1.length - copyFromIndex | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var c = $this.fn_1.length - copyToIndex | 0;
    var segmentLength = Math.min(tmp0, tmp2, c);
    var tmp0_0 = $this.fn_1;
    var tmp2_0 = $this.fn_1;
    var tmp4 = copyToIndex;
    var tmp6 = copyFromIndex;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = copyFromIndex + segmentLength | 0;
    arrayCopy(tmp0_0, tmp2_0, tmp4, tmp6, endIndex);
    copyFromIndex = positiveMod($this, copyFromIndex + segmentLength | 0);
    copyToIndex = positiveMod($this, copyToIndex + segmentLength | 0);
    copyCount = copyCount - segmentLength | 0;
  }
}
function nullifyNonEmpty($this, internalFromIndex, internalToIndex) {
  if (internalFromIndex < internalToIndex) {
    fill($this.fn_1, null, internalFromIndex, internalToIndex);
  } else {
    fill($this.fn_1, null, internalFromIndex, $this.fn_1.length);
    fill($this.fn_1, null, 0, internalToIndex);
  }
}
function registerModification($this) {
  $this.d7_1 = $this.d7_1 + 1 | 0;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        // Inline function 'kotlin.emptyArray' call
        tmp.hn_1 = [];
        this.in_1 = 10;
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
function init_kotlin_collections_ArrayDeque(_this__u8e3s4) {
  Companion_getInstance();
  _this__u8e3s4.en_1 = 0;
  _this__u8e3s4.gn_1 = 0;
}
var ArrayDequeClass;
function ArrayDeque() {
  if (ArrayDequeClass === VOID) {
    class $ extends AbstractMutableList() {
      c1() {
        return this.gn_1;
      }
      static jn() {
        Companion_getInstance();
        var $this = this.s7();
        init_kotlin_collections_ArrayDeque($this);
        $this.fn_1 = Companion_getInstance().hn_1;
        return $this;
      }
      static kn(elements) {
        Companion_getInstance();
        var $this = this.s7();
        init_kotlin_collections_ArrayDeque($this);
        var tmp = $this;
        // Inline function 'kotlin.collections.toTypedArray' call
        tmp.fn_1 = copyToArray(elements);
        $this.gn_1 = $this.fn_1.length;
        // Inline function 'kotlin.collections.isEmpty' call
        if ($this.fn_1.length === 0)
          $this.fn_1 = Companion_getInstance().hn_1;
        return $this;
      }
      h1() {
        return this.gn_1 === 0;
      }
      ln() {
        var tmp;
        if (this.h1()) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
          var internalIndex = this.en_1;
          var tmp_0 = this.fn_1[internalIndex];
          tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        }
        return tmp;
      }
      mn(element) {
        registerModification(this);
        ensureCapacity(this, this.gn_1 + 1 | 0);
        this.en_1 = decremented(this, this.en_1);
        this.fn_1[this.en_1] = element;
        this.gn_1 = this.gn_1 + 1 | 0;
      }
      nn(element) {
        registerModification(this);
        ensureCapacity(this, this.gn_1 + 1 | 0);
        var tmp = this.fn_1;
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = this.gn_1;
        tmp[positiveMod(this, this.en_1 + index | 0)] = element;
        this.gn_1 = this.gn_1 + 1 | 0;
      }
      on() {
        if (this.h1())
          throw NoSuchElementException().m('ArrayDeque is empty.');
        registerModification(this);
        // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
        var internalIndex = this.en_1;
        var tmp = this.fn_1[internalIndex];
        var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        this.fn_1[this.en_1] = null;
        this.en_1 = incremented(this, this.en_1);
        this.gn_1 = this.gn_1 - 1 | 0;
        return element;
      }
      pn() {
        return this.h1() ? null : this.on();
      }
      qn() {
        if (this.h1())
          throw NoSuchElementException().m('ArrayDeque is empty.');
        registerModification(this);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = get_lastIndex_0(this);
        var internalLastIndex = positiveMod(this, this.en_1 + index | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
        var tmp = this.fn_1[internalLastIndex];
        var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        this.fn_1[internalLastIndex] = null;
        this.gn_1 = this.gn_1 - 1 | 0;
        return element;
      }
      i(element) {
        this.nn(element);
        return true;
      }
      r3(index, element) {
        Companion_instance.i7(index, this.gn_1);
        if (index === this.gn_1) {
          this.nn(element);
          return Unit_instance;
        } else if (index === 0) {
          this.mn(element);
          return Unit_instance;
        }
        registerModification(this);
        ensureCapacity(this, this.gn_1 + 1 | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var internalIndex = positiveMod(this, this.en_1 + index | 0);
        if (index < (this.gn_1 + 1 | 0) >> 1) {
          var decrementedInternalIndex = decremented(this, internalIndex);
          var decrementedHead = decremented(this, this.en_1);
          if (decrementedInternalIndex >= this.en_1) {
            this.fn_1[decrementedHead] = this.fn_1[this.en_1];
            var tmp0 = this.fn_1;
            var tmp2 = this.fn_1;
            var tmp4 = this.en_1;
            var tmp6 = this.en_1 + 1 | 0;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex = decrementedInternalIndex + 1 | 0;
            arrayCopy(tmp0, tmp2, tmp4, tmp6, endIndex);
          } else {
            var tmp0_0 = this.fn_1;
            var tmp2_0 = this.fn_1;
            var tmp4_0 = this.en_1 - 1 | 0;
            var tmp6_0 = this.en_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_0 = this.fn_1.length;
            arrayCopy(tmp0_0, tmp2_0, tmp4_0, tmp6_0, endIndex_0);
            this.fn_1[this.fn_1.length - 1 | 0] = this.fn_1[0];
            var tmp0_1 = this.fn_1;
            var tmp2_1 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_1 = decrementedInternalIndex + 1 | 0;
            arrayCopy(tmp0_1, tmp2_1, 0, 1, endIndex_1);
          }
          this.fn_1[decrementedInternalIndex] = element;
          this.en_1 = decrementedHead;
        } else {
          // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
          var index_0 = this.gn_1;
          var tail = positiveMod(this, this.en_1 + index_0 | 0);
          if (internalIndex < tail) {
            var tmp0_2 = this.fn_1;
            var tmp2_2 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var destinationOffset = internalIndex + 1 | 0;
            arrayCopy(tmp0_2, tmp2_2, destinationOffset, internalIndex, tail);
          } else {
            var tmp0_3 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var destination = this.fn_1;
            arrayCopy(tmp0_3, destination, 1, 0, tail);
            this.fn_1[0] = this.fn_1[this.fn_1.length - 1 | 0];
            var tmp0_4 = this.fn_1;
            var tmp2_3 = this.fn_1;
            var tmp4_1 = internalIndex + 1 | 0;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_2 = this.fn_1.length - 1 | 0;
            arrayCopy(tmp0_4, tmp2_3, tmp4_1, internalIndex, endIndex_2);
          }
          this.fn_1[internalIndex] = element;
        }
        this.gn_1 = this.gn_1 + 1 | 0;
      }
      d1(elements) {
        if (elements.h1())
          return false;
        registerModification(this);
        ensureCapacity(this, this.gn_1 + elements.c1() | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = this.gn_1;
        var tmp$ret$0 = positiveMod(this, this.en_1 + index | 0);
        copyCollectionElements(this, tmp$ret$0, elements);
        return true;
      }
      n3(index, elements) {
        Companion_instance.i7(index, this.gn_1);
        if (elements.h1()) {
          return false;
        } else if (index === this.gn_1) {
          return this.d1(elements);
        }
        registerModification(this);
        ensureCapacity(this, this.gn_1 + elements.c1() | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index_0 = this.gn_1;
        var tail = positiveMod(this, this.en_1 + index_0 | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var internalIndex = positiveMod(this, this.en_1 + index | 0);
        var elementsSize = elements.c1();
        if (index < (this.gn_1 + 1 | 0) >> 1) {
          var shiftedHead = this.en_1 - elementsSize | 0;
          if (internalIndex >= this.en_1) {
            if (shiftedHead >= 0) {
              var tmp0 = this.fn_1;
              var tmp2 = this.fn_1;
              var tmp4 = shiftedHead;
              // Inline function 'kotlin.collections.copyInto' call
              var startIndex = this.en_1;
              arrayCopy(tmp0, tmp2, tmp4, startIndex, internalIndex);
            } else {
              shiftedHead = shiftedHead + this.fn_1.length | 0;
              var elementsToShift = internalIndex - this.en_1 | 0;
              var shiftToBack = this.fn_1.length - shiftedHead | 0;
              if (shiftToBack >= elementsToShift) {
                var tmp0_0 = this.fn_1;
                var tmp2_0 = this.fn_1;
                var tmp4_0 = shiftedHead;
                // Inline function 'kotlin.collections.copyInto' call
                var startIndex_0 = this.en_1;
                arrayCopy(tmp0_0, tmp2_0, tmp4_0, startIndex_0, internalIndex);
              } else {
                var tmp0_1 = this.fn_1;
                var tmp2_1 = this.fn_1;
                var tmp4_1 = shiftedHead;
                var tmp6 = this.en_1;
                // Inline function 'kotlin.collections.copyInto' call
                var endIndex = this.en_1 + shiftToBack | 0;
                arrayCopy(tmp0_1, tmp2_1, tmp4_1, tmp6, endIndex);
                var tmp0_2 = this.fn_1;
                var tmp2_2 = this.fn_1;
                // Inline function 'kotlin.collections.copyInto' call
                var startIndex_1 = this.en_1 + shiftToBack | 0;
                arrayCopy(tmp0_2, tmp2_2, 0, startIndex_1, internalIndex);
              }
            }
          } else {
            var tmp0_3 = this.fn_1;
            var tmp2_3 = this.fn_1;
            var tmp4_2 = shiftedHead;
            var tmp6_0 = this.en_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_0 = this.fn_1.length;
            arrayCopy(tmp0_3, tmp2_3, tmp4_2, tmp6_0, endIndex_0);
            if (elementsSize >= internalIndex) {
              var tmp0_4 = this.fn_1;
              var tmp2_4 = this.fn_1;
              // Inline function 'kotlin.collections.copyInto' call
              var destinationOffset = this.fn_1.length - elementsSize | 0;
              arrayCopy(tmp0_4, tmp2_4, destinationOffset, 0, internalIndex);
            } else {
              var tmp0_5 = this.fn_1;
              var tmp2_5 = this.fn_1;
              // Inline function 'kotlin.collections.copyInto' call
              var destinationOffset_0 = this.fn_1.length - elementsSize | 0;
              arrayCopy(tmp0_5, tmp2_5, destinationOffset_0, 0, elementsSize);
              var tmp0_6 = this.fn_1;
              // Inline function 'kotlin.collections.copyInto' call
              var destination = this.fn_1;
              arrayCopy(tmp0_6, destination, 0, elementsSize, internalIndex);
            }
          }
          this.en_1 = shiftedHead;
          copyCollectionElements(this, negativeMod(this, internalIndex - elementsSize | 0), elements);
        } else {
          var shiftedInternalIndex = internalIndex + elementsSize | 0;
          if (internalIndex < tail) {
            if ((tail + elementsSize | 0) <= this.fn_1.length) {
              var tmp0_7 = this.fn_1;
              // Inline function 'kotlin.collections.copyInto' call
              var destination_0 = this.fn_1;
              arrayCopy(tmp0_7, destination_0, shiftedInternalIndex, internalIndex, tail);
            } else {
              if (shiftedInternalIndex >= this.fn_1.length) {
                var tmp0_8 = this.fn_1;
                var tmp2_6 = this.fn_1;
                // Inline function 'kotlin.collections.copyInto' call
                var destinationOffset_1 = shiftedInternalIndex - this.fn_1.length | 0;
                arrayCopy(tmp0_8, tmp2_6, destinationOffset_1, internalIndex, tail);
              } else {
                var shiftToFront = (tail + elementsSize | 0) - this.fn_1.length | 0;
                var tmp0_9 = this.fn_1;
                var tmp2_7 = this.fn_1;
                // Inline function 'kotlin.collections.copyInto' call
                var startIndex_2 = tail - shiftToFront | 0;
                arrayCopy(tmp0_9, tmp2_7, 0, startIndex_2, tail);
                var tmp0_10 = this.fn_1;
                var tmp2_8 = this.fn_1;
                // Inline function 'kotlin.collections.copyInto' call
                var endIndex_1 = tail - shiftToFront | 0;
                arrayCopy(tmp0_10, tmp2_8, shiftedInternalIndex, internalIndex, endIndex_1);
              }
            }
          } else {
            var tmp0_11 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var destination_1 = this.fn_1;
            arrayCopy(tmp0_11, destination_1, elementsSize, 0, tail);
            if (shiftedInternalIndex >= this.fn_1.length) {
              var tmp0_12 = this.fn_1;
              var tmp2_9 = this.fn_1;
              var tmp4_3 = shiftedInternalIndex - this.fn_1.length | 0;
              // Inline function 'kotlin.collections.copyInto' call
              var endIndex_2 = this.fn_1.length;
              arrayCopy(tmp0_12, tmp2_9, tmp4_3, internalIndex, endIndex_2);
            } else {
              var tmp0_13 = this.fn_1;
              var tmp2_10 = this.fn_1;
              var tmp6_1 = this.fn_1.length - elementsSize | 0;
              // Inline function 'kotlin.collections.copyInto' call
              var endIndex_3 = this.fn_1.length;
              arrayCopy(tmp0_13, tmp2_10, 0, tmp6_1, endIndex_3);
              var tmp0_14 = this.fn_1;
              var tmp2_11 = this.fn_1;
              // Inline function 'kotlin.collections.copyInto' call
              var endIndex_4 = this.fn_1.length - elementsSize | 0;
              arrayCopy(tmp0_14, tmp2_11, shiftedInternalIndex, internalIndex, endIndex_4);
            }
          }
          copyCollectionElements(this, internalIndex, elements);
        }
        return true;
      }
      e1(index) {
        Companion_instance.t7(index, this.gn_1);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
        var internalIndex = positiveMod(this, this.en_1 + index | 0);
        var tmp = this.fn_1[internalIndex];
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      q3(index, element) {
        Companion_instance.t7(index, this.gn_1);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var internalIndex = positiveMod(this, this.en_1 + index | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
        var tmp = this.fn_1[internalIndex];
        var oldElement = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        this.fn_1[internalIndex] = element;
        return oldElement;
      }
      j1(element) {
        return !(this.l1(element) === -1);
      }
      l1(element) {
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = this.gn_1;
        var tail = positiveMod(this, this.en_1 + index | 0);
        if (this.en_1 < tail) {
          var inductionVariable = this.en_1;
          if (inductionVariable < tail)
            do {
              var index_0 = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              if (equals(element, this.fn_1[index_0]))
                return index_0 - this.en_1 | 0;
            }
             while (inductionVariable < tail);
        } else if (this.en_1 >= tail) {
          var inductionVariable_0 = this.en_1;
          var last = this.fn_1.length;
          if (inductionVariable_0 < last)
            do {
              var index_1 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              if (equals(element, this.fn_1[index_1]))
                return index_1 - this.en_1 | 0;
            }
             while (inductionVariable_0 < last);
          var inductionVariable_1 = 0;
          if (inductionVariable_1 < tail)
            do {
              var index_2 = inductionVariable_1;
              inductionVariable_1 = inductionVariable_1 + 1 | 0;
              if (equals(element, this.fn_1[index_2]))
                return (index_2 + this.fn_1.length | 0) - this.en_1 | 0;
            }
             while (inductionVariable_1 < tail);
        }
        return -1;
      }
      e3(element) {
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = this.gn_1;
        var tail = positiveMod(this, this.en_1 + index | 0);
        if (this.en_1 < tail) {
          var inductionVariable = tail - 1 | 0;
          var last = this.en_1;
          if (last <= inductionVariable)
            do {
              var index_0 = inductionVariable;
              inductionVariable = inductionVariable + -1 | 0;
              if (equals(element, this.fn_1[index_0]))
                return index_0 - this.en_1 | 0;
            }
             while (!(index_0 === last));
        } else if (this.en_1 > tail) {
          var inductionVariable_0 = tail - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var index_1 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              if (equals(element, this.fn_1[index_1]))
                return (index_1 + this.fn_1.length | 0) - this.en_1 | 0;
            }
             while (0 <= inductionVariable_0);
          var inductionVariable_1 = get_lastIndex(this.fn_1);
          var last_0 = this.en_1;
          if (last_0 <= inductionVariable_1)
            do {
              var index_2 = inductionVariable_1;
              inductionVariable_1 = inductionVariable_1 + -1 | 0;
              if (equals(element, this.fn_1[index_2]))
                return index_2 - this.en_1 | 0;
            }
             while (!(index_2 === last_0));
        }
        return -1;
      }
      m3(element) {
        var index = this.l1(element);
        if (index === -1)
          return false;
        this.s3(index);
        return true;
      }
      s3(index) {
        Companion_instance.t7(index, this.gn_1);
        if (index === get_lastIndex_0(this)) {
          return this.qn();
        } else if (index === 0) {
          return this.on();
        }
        registerModification(this);
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var internalIndex = positiveMod(this, this.en_1 + index | 0);
        // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
        var tmp = this.fn_1[internalIndex];
        var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        if (index < this.gn_1 >> 1) {
          if (internalIndex >= this.en_1) {
            var tmp0 = this.fn_1;
            var tmp2 = this.fn_1;
            var tmp4 = this.en_1 + 1 | 0;
            // Inline function 'kotlin.collections.copyInto' call
            var startIndex = this.en_1;
            arrayCopy(tmp0, tmp2, tmp4, startIndex, internalIndex);
          } else {
            var tmp0_0 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var destination = this.fn_1;
            arrayCopy(tmp0_0, destination, 1, 0, internalIndex);
            this.fn_1[0] = this.fn_1[this.fn_1.length - 1 | 0];
            var tmp0_1 = this.fn_1;
            var tmp2_0 = this.fn_1;
            var tmp4_0 = this.en_1 + 1 | 0;
            var tmp6 = this.en_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex = this.fn_1.length - 1 | 0;
            arrayCopy(tmp0_1, tmp2_0, tmp4_0, tmp6, endIndex);
          }
          this.fn_1[this.en_1] = null;
          this.en_1 = incremented(this, this.en_1);
        } else {
          // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
          var index_0 = get_lastIndex_0(this);
          var internalLastIndex = positiveMod(this, this.en_1 + index_0 | 0);
          if (internalIndex <= internalLastIndex) {
            var tmp0_2 = this.fn_1;
            var tmp2_1 = this.fn_1;
            var tmp6_0 = internalIndex + 1 | 0;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_0 = internalLastIndex + 1 | 0;
            arrayCopy(tmp0_2, tmp2_1, internalIndex, tmp6_0, endIndex_0);
          } else {
            var tmp0_3 = this.fn_1;
            var tmp2_2 = this.fn_1;
            var tmp6_1 = internalIndex + 1 | 0;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_1 = this.fn_1.length;
            arrayCopy(tmp0_3, tmp2_2, internalIndex, tmp6_1, endIndex_1);
            this.fn_1[this.fn_1.length - 1 | 0] = this.fn_1[0];
            var tmp0_4 = this.fn_1;
            var tmp2_3 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex_2 = internalLastIndex + 1 | 0;
            arrayCopy(tmp0_4, tmp2_3, 0, 1, endIndex_2);
          }
          this.fn_1[internalLastIndex] = null;
        }
        this.gn_1 = this.gn_1 - 1 | 0;
        return element;
      }
      o3(elements) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.ArrayDeque.filterInPlace' call
          var tmp;
          if (this.h1()) {
            tmp = true;
          } else {
            // Inline function 'kotlin.collections.isEmpty' call
            tmp = this.fn_1.length === 0;
          }
          if (tmp) {
            tmp$ret$1 = false;
            break $l$block;
          }
          // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
          var index = this.gn_1;
          var tail = positiveMod(this, this.en_1 + index | 0);
          var newTail = this.en_1;
          var modified = false;
          if (this.en_1 < tail) {
            var inductionVariable = this.en_1;
            if (inductionVariable < tail)
              do {
                var index_0 = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var element = this.fn_1[index_0];
                var it = (element == null ? true : !(element == null)) ? element : THROW_CCE();
                if (elements.j1(it)) {
                  var tmp_0 = this.fn_1;
                  var _unary__edvuaz = newTail;
                  newTail = _unary__edvuaz + 1 | 0;
                  tmp_0[_unary__edvuaz] = element;
                } else {
                  modified = true;
                }
              }
               while (inductionVariable < tail);
            fill(this.fn_1, null, newTail, tail);
          } else {
            var inductionVariable_0 = this.en_1;
            var last = this.fn_1.length;
            if (inductionVariable_0 < last)
              do {
                var index_1 = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var element_0 = this.fn_1[index_1];
                this.fn_1[index_1] = null;
                var it_0 = (element_0 == null ? true : !(element_0 == null)) ? element_0 : THROW_CCE();
                if (elements.j1(it_0)) {
                  var tmp_1 = this.fn_1;
                  var _unary__edvuaz_0 = newTail;
                  newTail = _unary__edvuaz_0 + 1 | 0;
                  tmp_1[_unary__edvuaz_0] = element_0;
                } else {
                  modified = true;
                }
              }
               while (inductionVariable_0 < last);
            newTail = positiveMod(this, newTail);
            var inductionVariable_1 = 0;
            if (inductionVariable_1 < tail)
              do {
                var index_2 = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var element_1 = this.fn_1[index_2];
                this.fn_1[index_2] = null;
                var it_1 = (element_1 == null ? true : !(element_1 == null)) ? element_1 : THROW_CCE();
                if (elements.j1(it_1)) {
                  this.fn_1[newTail] = element_1;
                  newTail = incremented(this, newTail);
                } else {
                  modified = true;
                }
              }
               while (inductionVariable_1 < tail);
          }
          if (modified) {
            registerModification(this);
            this.gn_1 = negativeMod(this, newTail - this.en_1 | 0);
          }
          tmp$ret$1 = modified;
        }
        return tmp$ret$1;
      }
      p3() {
        // Inline function 'kotlin.collections.isNotEmpty' call
        if (!this.h1()) {
          registerModification(this);
          // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
          var index = this.gn_1;
          var tail = positiveMod(this, this.en_1 + index | 0);
          nullifyNonEmpty(this, this.en_1, tail);
        }
        this.en_1 = 0;
        this.gn_1 = 0;
      }
      rn(array) {
        var tmp = array.length >= this.gn_1 ? array : arrayOfNulls(array, this.gn_1);
        var dest = isArray(tmp) ? tmp : THROW_CCE();
        // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
        var index = this.gn_1;
        var tail = positiveMod(this, this.en_1 + index | 0);
        if (this.en_1 < tail) {
          var tmp0 = this.fn_1;
          // Inline function 'kotlin.collections.copyInto' call
          var startIndex = this.en_1;
          arrayCopy(tmp0, dest, 0, startIndex, tail);
        } else {
          // Inline function 'kotlin.collections.isNotEmpty' call
          if (!this.h1()) {
            var tmp0_0 = this.fn_1;
            var tmp6 = this.en_1;
            // Inline function 'kotlin.collections.copyInto' call
            var endIndex = this.fn_1.length;
            arrayCopy(tmp0_0, dest, 0, tmp6, endIndex);
            var tmp0_1 = this.fn_1;
            // Inline function 'kotlin.collections.copyInto' call
            var destinationOffset = this.fn_1.length - this.en_1 | 0;
            arrayCopy(tmp0_1, dest, destinationOffset, 0, tail);
          }
        }
        var tmp_0 = terminateCollectionToArray(this.gn_1, dest);
        return isArray(tmp_0) ? tmp_0 : THROW_CCE();
      }
      s8() {
        // Inline function 'kotlin.arrayOfNulls' call
        var size = this.gn_1;
        var tmp$ret$0 = Array(size);
        return this.rn(tmp$ret$0);
      }
      toArray() {
        return this.s8();
      }
      u7(fromIndex, toIndex) {
        Companion_instance.q6(fromIndex, toIndex, this.gn_1);
        var length = toIndex - fromIndex | 0;
        if (length === 0)
          return Unit_instance;
        else if (length === this.gn_1) {
          this.p3();
          return Unit_instance;
        } else if (length === 1) {
          this.s3(fromIndex);
          return Unit_instance;
        }
        registerModification(this);
        if (fromIndex < (this.gn_1 - toIndex | 0)) {
          removeRangeShiftPreceding(this, fromIndex, toIndex);
          var newHead = positiveMod(this, this.en_1 + length | 0);
          nullifyNonEmpty(this, this.en_1, newHead);
          this.en_1 = newHead;
        } else {
          removeRangeShiftSucceeding(this, fromIndex, toIndex);
          // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
          var index = this.gn_1;
          var tail = positiveMod(this, this.en_1 + index | 0);
          nullifyNonEmpty(this, negativeMod(this, tail - length | 0), tail);
        }
        this.gn_1 = this.gn_1 - length | 0;
      }
    }
    initMetadataForClass($, 'ArrayDeque', $.jn);
    ArrayDequeClass = $;
  }
  return ArrayDequeClass;
}
//region block: exports
export {
  ArrayDeque as ArrayDeque2dzc9uld4xi7n,
};
//endregion

//# sourceMappingURL=ArrayDeque.mjs.map
