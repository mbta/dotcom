import {
  boxApply1qmzdb3dh90hg as boxApply,
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../js/coreRuntime.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Companion_instanceovl8he3jiijf as Companion_instance } from './AbstractList.mjs';
import { RandomAccess1jbw8sdogqb8x as RandomAccess } from './RandomAccess.mjs';
import { AbstractMutableCollections0bg6c40ztuj as AbstractMutableCollection } from './AbstractMutableCollectionJs.mjs';
import { removeAll3o43e67jmwdpc as removeAll } from './MutableCollections.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  asJsReadonlyArrayView237cu3jwn119s as asJsReadonlyArrayView,
  KtMutableList1beimitadwkna as KtMutableList,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var IteratorImplClass;
function IteratorImpl() {
  if (IteratorImplClass === VOID) {
    class $ {
      constructor($outer, $box) {
        boxApply(this, $box);
        this.c7_1 = $outer;
        this.a7_1 = 0;
        this.b7_1 = -1;
      }
      y() {
        return this.a7_1 < this.c7_1.c1();
      }
      z() {
        if (!this.y())
          throw NoSuchElementException().m1();
        var tmp = this;
        var _unary__edvuaz = this.a7_1;
        this.a7_1 = _unary__edvuaz + 1 | 0;
        tmp.b7_1 = _unary__edvuaz;
        return this.c7_1.e1(this.b7_1);
      }
      z6() {
        // Inline function 'kotlin.check' call
        if (!!(this.b7_1 === -1)) {
          var message = 'Call next() or previous() before removing element from the iterator.';
          throw IllegalStateException().o5(toString(message));
        }
        this.c7_1.s3(this.b7_1);
        this.a7_1 = this.b7_1;
        this.b7_1 = -1;
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
        $box.h7_1 = $outer;
        super($outer, $box);
        Companion_instance.i7(index, this.h7_1.c1());
        this.a7_1 = index;
      }
      j7() {
        return this.a7_1 > 0;
      }
      k7() {
        return this.a7_1;
      }
      l7() {
        if (!this.j7())
          throw NoSuchElementException().m1();
        var tmp = this;
        this.a7_1 = this.a7_1 - 1 | 0;
        tmp.b7_1 = this.a7_1;
        return this.h7_1.e1(this.b7_1);
      }
      m7() {
        return this.a7_1 - 1 | 0;
      }
    }
    initMetadataForClass($, 'ListIteratorImpl');
    ListIteratorImplClass = $;
  }
  return ListIteratorImplClass;
}
var SubListClass;
function SubList() {
  if (SubListClass === VOID) {
    class $ extends AbstractMutableList() {
      static r7(list, fromIndex, toIndex) {
        var $this = this.s7();
        $this.o7_1 = list;
        $this.p7_1 = fromIndex;
        $this.q7_1 = 0;
        Companion_instance.q6($this.p7_1, toIndex, $this.o7_1.c1());
        $this.q7_1 = toIndex - $this.p7_1 | 0;
        return $this;
      }
      r3(index, element) {
        Companion_instance.i7(index, this.q7_1);
        this.o7_1.r3(this.p7_1 + index | 0, element);
        this.q7_1 = this.q7_1 + 1 | 0;
      }
      e1(index) {
        Companion_instance.t7(index, this.q7_1);
        return this.o7_1.e1(this.p7_1 + index | 0);
      }
      s3(index) {
        Companion_instance.t7(index, this.q7_1);
        var result = this.o7_1.s3(this.p7_1 + index | 0);
        this.q7_1 = this.q7_1 - 1 | 0;
        return result;
      }
      q3(index, element) {
        Companion_instance.t7(index, this.q7_1);
        return this.o7_1.q3(this.p7_1 + index | 0, element);
      }
      u7(fromIndex, toIndex) {
        this.o7_1.u7(this.p7_1 + fromIndex | 0, this.p7_1 + toIndex | 0);
        this.q7_1 = this.q7_1 - (toIndex - fromIndex | 0) | 0;
      }
      c1() {
        return this.q7_1;
      }
      y6() {
        return this.o7_1.y6();
      }
    }
    initMetadataForClass($, 'SubList', VOID, VOID, [AbstractMutableList(), RandomAccess()]);
    SubListClass = $;
  }
  return SubListClass;
}
function AbstractMutableList$retainAll$lambda($elements) {
  return function (it) {
    return !$elements.j1(it);
  };
}
var AbstractMutableListClass;
function AbstractMutableList() {
  if (AbstractMutableListClass === VOID) {
    class $ extends AbstractMutableCollection() {
      static s7() {
        var $this = this.w6();
        $this.d7_1 = 0;
        return $this;
      }
      i(element) {
        this.y6();
        this.r3(this.c1(), element);
        return true;
      }
      n3(index, elements) {
        Companion_instance.i7(index, this.c1());
        this.y6();
        var _index = index;
        var changed = false;
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var e = _iterator__ex2g4s.z();
          var _unary__edvuaz = _index;
          _index = _unary__edvuaz + 1 | 0;
          this.r3(_unary__edvuaz, e);
          changed = true;
        }
        return changed;
      }
      p3() {
        this.y6();
        this.u7(0, this.c1());
      }
      o3(elements) {
        this.y6();
        return removeAll(this, AbstractMutableList$retainAll$lambda(elements));
      }
      x() {
        return new (IteratorImpl())(this);
      }
      j1(element) {
        return this.l1(element) >= 0;
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
        return this.k1(0);
      }
      k1(index) {
        return new (ListIteratorImpl())(this, index);
      }
      g3(fromIndex, toIndex) {
        return SubList().r7(this, fromIndex, toIndex);
      }
      u7(fromIndex, toIndex) {
        var iterator = this.k1(fromIndex);
        // Inline function 'kotlin.repeat' call
        var times = toIndex - fromIndex | 0;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            iterator.z();
            iterator.z6();
          }
           while (inductionVariable < times);
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
    initMetadataForClass($, 'AbstractMutableList', VOID, VOID, [AbstractMutableCollection(), KtMutableList()]);
    AbstractMutableListClass = $;
  }
  return AbstractMutableListClass;
}
//region block: exports
export {
  AbstractMutableList as AbstractMutableList192xfq8ycgofs,
};
//endregion

//# sourceMappingURL=AbstractMutableListJs.mjs.map
