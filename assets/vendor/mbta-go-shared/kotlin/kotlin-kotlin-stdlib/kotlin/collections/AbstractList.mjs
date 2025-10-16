import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  boxApply1qmzdb3dh90hg as boxApply,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../js/coreRuntime.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from './AbstractCollection.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  asJsReadonlyArrayView237cu3jwn119s as asJsReadonlyArrayView,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var SubListClass;
function SubList() {
  if (SubListClass === VOID) {
    class $ extends AbstractList() {
      static pm(list, fromIndex, toIndex) {
        var $this = this.qm();
        $this.mm_1 = list;
        $this.nm_1 = fromIndex;
        $this.om_1 = 0;
        Companion_instance.q6($this.nm_1, toIndex, $this.mm_1.c1());
        $this.om_1 = toIndex - $this.nm_1 | 0;
        return $this;
      }
      e1(index) {
        Companion_instance.t7(index, this.om_1);
        return this.mm_1.e1(this.nm_1 + index | 0);
      }
      c1() {
        return this.om_1;
      }
      g3(fromIndex, toIndex) {
        Companion_instance.q6(fromIndex, toIndex, this.om_1);
        return SubList().pm(this.mm_1, this.nm_1 + fromIndex | 0, this.nm_1 + toIndex | 0);
      }
    }
    initMetadataForClass($, 'SubList', VOID, VOID, [AbstractList(), RandomAccess()]);
    SubListClass = $;
  }
  return SubListClass;
}
var IteratorImplClass;
function IteratorImpl() {
  if (IteratorImplClass === VOID) {
    class $ {
      constructor($outer, $box) {
        boxApply(this, $box);
        this.sm_1 = $outer;
        this.rm_1 = 0;
      }
      y() {
        return this.rm_1 < this.sm_1.c1();
      }
      z() {
        if (!this.y())
          throw NoSuchElementException().m1();
        var _unary__edvuaz = this.rm_1;
        this.rm_1 = _unary__edvuaz + 1 | 0;
        return this.sm_1.e1(_unary__edvuaz);
      }
    }
    initMetadataForClass($, 'IteratorImpl');
    IteratorImplClass = $;
  }
  return IteratorImplClass;
}
var ListIteratorImplClass;
function ListIteratorImpl() {
  if (ListIteratorImplClass === VOID) {
    class $ extends IteratorImpl() {
      constructor($outer, index, $box) {
        if ($box === VOID)
          $box = {};
        $box.vm_1 = $outer;
        super($outer, $box);
        Companion_instance.i7(index, this.vm_1.c1());
        this.rm_1 = index;
      }
      j7() {
        return this.rm_1 > 0;
      }
      k7() {
        return this.rm_1;
      }
      l7() {
        if (!this.j7())
          throw NoSuchElementException().m1();
        this.rm_1 = this.rm_1 - 1 | 0;
        return this.vm_1.e1(this.rm_1);
      }
      m7() {
        return this.rm_1 - 1 | 0;
      }
    }
    initMetadataForClass($, 'ListIteratorImpl');
    ListIteratorImplClass = $;
  }
  return ListIteratorImplClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.p6_1 = 2147483639;
      }
      t7(index, size) {
        if (index < 0 || index >= size) {
          throw IndexOutOfBoundsException().jg('index: ' + index + ', size: ' + size);
        }
      }
      i7(index, size) {
        if (index < 0 || index > size) {
          throw IndexOutOfBoundsException().jg('index: ' + index + ', size: ' + size);
        }
      }
      q6(fromIndex, toIndex, size) {
        if (fromIndex < 0 || toIndex > size) {
          throw IndexOutOfBoundsException().jg('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
        }
        if (fromIndex > toIndex) {
          throw IllegalArgumentException().q('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
        }
      }
      mj(startIndex, endIndex, size) {
        if (startIndex < 0 || endIndex > size) {
          throw IndexOutOfBoundsException().jg('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
        }
        if (startIndex > endIndex) {
          throw IllegalArgumentException().q('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
        }
      }
      gb(oldCapacity, minCapacity) {
        var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
        if ((newCapacity - minCapacity | 0) < 0)
          newCapacity = minCapacity;
        if ((newCapacity - 2147483639 | 0) > 0)
          newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
        return newCapacity;
      }
      w7(c) {
        var hashCode_0 = 1;
        var _iterator__ex2g4s = c.x();
        while (_iterator__ex2g4s.y()) {
          var e = _iterator__ex2g4s.z();
          var tmp = imul(31, hashCode_0);
          var tmp1_elvis_lhs = e == null ? null : hashCode(e);
          hashCode_0 = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode_0;
      }
      v7(c, other) {
        if (!(c.c1() === other.c1()))
          return false;
        var otherIterator = other.x();
        var _iterator__ex2g4s = c.x();
        while (_iterator__ex2g4s.y()) {
          var elem = _iterator__ex2g4s.z();
          var elemOther = otherIterator.z();
          if (!equals(elem, elemOther)) {
            return false;
          }
        }
        return true;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var AbstractListClass;
function AbstractList() {
  if (AbstractListClass === VOID) {
    class $ extends AbstractCollection() {
      static qm() {
        return this.x6();
      }
      x() {
        return new (IteratorImpl())(this);
      }
      l1(element) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.indexOfFirst' call
          var index = 0;
          var _iterator__ex2g4s = this.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            if (equals(item, element)) {
              tmp$ret$1 = index;
              break $l$block;
            }
            index = index + 1 | 0;
          }
          tmp$ret$1 = -1;
        }
        return tmp$ret$1;
      }
      e3(element) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.indexOfLast' call
          var iterator = this.k1(this.c1());
          while (iterator.j7()) {
            var it = iterator.l7();
            if (equals(it, element)) {
              tmp$ret$1 = iterator.k7();
              break $l$block;
            }
          }
          tmp$ret$1 = -1;
        }
        return tmp$ret$1;
      }
      f3() {
        return new (ListIteratorImpl())(this, 0);
      }
      k1(index) {
        return new (ListIteratorImpl())(this, index);
      }
      g3(fromIndex, toIndex) {
        return SubList().pm(this, fromIndex, toIndex);
      }
      equals(other) {
        if (other === this)
          return true;
        if (!(!(other == null) ? isInterface(other, KtList()) : false))
          return false;
        return Companion_instance.v7(this, other);
      }
      hashCode() {
        return Companion_instance.w7(this);
      }
    }
    protoOf($).asJsReadonlyArrayView = asJsReadonlyArrayView;
    initMetadataForClass($, 'AbstractList', VOID, VOID, [AbstractCollection(), KtList()]);
    AbstractListClass = $;
  }
  return AbstractListClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instanceovl8he3jiijf,
  AbstractList as AbstractList3ck35puwbp1e9,
};
//endregion

//# sourceMappingURL=AbstractList.mjs.map
