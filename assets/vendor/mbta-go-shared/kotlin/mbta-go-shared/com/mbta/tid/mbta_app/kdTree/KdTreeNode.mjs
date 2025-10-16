import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get90tqdh72cjio as get } from './Axis.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import {
  first58ocm7j58k3q as first,
  last1vo29oleiqj36 as last,
  sortedWith2csnbbb21k0lg as sortedWith,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_kdTree_KdTreeNode$stable;
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.c8p_1 = function_0;
      }
      al(a, b) {
        return this.c8p_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.c8p_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator(), FunctionAdapter()]);
    sam$kotlin_Comparator$0Class = $;
  }
  return sam$kotlin_Comparator$0Class;
}
function KdTreeNode$Companion$build$lambda($splitAxis) {
  return function (a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp = get(a, $splitAxis);
    var tmp$ret$1 = get(b, $splitAxis);
    return compareValues(tmp, tmp$ret$1);
  };
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      b8p(elements, splitAxis) {
        if (elements.h1())
          return null;
        var firstPosition = first(elements).bh_1;
        var middlePosition = elements.e1(elements.c1() / 2 | 0).bh_1;
        var lastPosition = last(elements).bh_1;
        // Inline function 'kotlin.collections.sortedBy' call
        var this_0 = listOf([firstPosition, middlePosition, lastPosition]);
        // Inline function 'kotlin.comparisons.compareBy' call
        var tmp = KdTreeNode$Companion$build$lambda(splitAxis);
        var tmp$ret$0 = new (sam$kotlin_Comparator$0())(tmp);
        var splitPosition = sortedWith(this_0, tmp$ret$0).e1(1);
        // Inline function 'kotlin.collections.partition' call
        var first_0 = ArrayList().g1();
        var second = ArrayList().g1();
        var _iterator__ex2g4s = elements.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (element.bh_1.equals(splitPosition)) {
            first_0.i(element);
          } else {
            second.i(element);
          }
        }
        var _destruct__k2r9zo = new (Pair())(first_0, second);
        var here = _destruct__k2r9zo.ch();
        var notHere = _destruct__k2r9zo.dh();
        // Inline function 'kotlin.collections.partition' call
        var first_1 = ArrayList().g1();
        var second_0 = ArrayList().g1();
        var _iterator__ex2g4s_0 = notHere.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          if (get(element_0.bh_1, splitAxis) < get(splitPosition, splitAxis)) {
            first_1.i(element_0);
          } else {
            second_0.i(element_0);
          }
        }
        var _destruct__k2r9zo_0 = new (Pair())(first_1, second_0);
        var lowChildren = _destruct__k2r9zo_0.ch();
        var highChildren = _destruct__k2r9zo_0.dh();
        var nextSplitAxis = splitAxis.z();
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(here, 10));
        var _iterator__ex2g4s_1 = here.x();
        while (_iterator__ex2g4s_1.y()) {
          var item = _iterator__ex2g4s_1.z();
          var tmp$ret$6 = item.ah_1;
          destination.i(tmp$ret$6);
        }
        return new (KdTreeNode())(destination, splitPosition, splitAxis, this.b8p(lowChildren, nextSplitAxis), this.b8p(highChildren, nextSplitAxis));
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
var KdTreeNodeClass;
function KdTreeNode() {
  if (KdTreeNodeClass === VOID) {
    class $ {
      constructor(ids, position, splitAxis, lowChild, highChild) {
        this.d8p_1 = ids;
        this.e8p_1 = position;
        this.f8p_1 = splitAxis;
        this.g8p_1 = lowChild;
        this.h8p_1 = highChild;
      }
      toString() {
        return 'KdTreeNode(ids=' + toString(this.d8p_1) + ', position=' + this.e8p_1.toString() + ', splitAxis=' + this.f8p_1.toString() + ', lowChild=' + toString_0(this.g8p_1) + ', highChild=' + toString_0(this.h8p_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.d8p_1);
        result = imul(result, 31) + this.e8p_1.hashCode() | 0;
        result = imul(result, 31) + this.f8p_1.hashCode() | 0;
        result = imul(result, 31) + (this.g8p_1 == null ? 0 : this.g8p_1.hashCode()) | 0;
        result = imul(result, 31) + (this.h8p_1 == null ? 0 : this.h8p_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof KdTreeNode()))
          return false;
        var tmp0_other_with_cast = other instanceof KdTreeNode() ? other : THROW_CCE();
        if (!equals(this.d8p_1, tmp0_other_with_cast.d8p_1))
          return false;
        if (!this.e8p_1.equals(tmp0_other_with_cast.e8p_1))
          return false;
        if (!this.f8p_1.equals(tmp0_other_with_cast.f8p_1))
          return false;
        if (!equals(this.g8p_1, tmp0_other_with_cast.g8p_1))
          return false;
        if (!equals(this.h8p_1, tmp0_other_with_cast.h8p_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'KdTreeNode');
    KdTreeNodeClass = $;
  }
  return KdTreeNodeClass;
}
//region block: init
com_mbta_tid_mbta_app_kdTree_KdTreeNode$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance17hwcj4n231ux,
};
//endregion

//# sourceMappingURL=KdTreeNode.mjs.map
