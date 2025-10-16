import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { MutableObjectList370jqbf1tk821 as MutableObjectList } from '../../../../../androidx-collection-collection/androidx/collection/ObjectList.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { sortWith4fnm6b3vw03s as sortWith } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../../../../../kotlin-kotlin-stdlib/kotlin/ComparatorJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { compareValues1n2ayl87ihzfk as compareValues } from '../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function removeLast(_this__u8e3s4) {
  if (_this__u8e3s4.h1())
    throw NoSuchElementException().m('List is empty.');
  var last = _this__u8e3s4.c1() - 1 | 0;
  // Inline function 'kotlin.also' call
  var this_0 = _this__u8e3s4.e1(last);
  _this__u8e3s4.s3(last);
  return this_0;
}
function sortedBy(_this__u8e3s4, selector) {
  var tmp;
  if (isSorted(_this__u8e3s4, selector)) {
    tmp = _this__u8e3s4;
  } else {
    // Inline function 'kotlin.also' call
    var this_0 = toMutableObjectList(_this__u8e3s4);
    sortBy(this_0, selector);
    tmp = this_0;
  }
  return tmp;
}
function isSorted(_this__u8e3s4, selector) {
  if (_this__u8e3s4.c1() <= 1)
    return true;
  var previousValue = _this__u8e3s4.e1(0);
  var tmp0_elvis_lhs = selector(previousValue);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var previousKey = tmp;
  var inductionVariable = 1;
  var last = _this__u8e3s4.c1();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var value = _this__u8e3s4.e1(i);
      var tmp1_elvis_lhs = selector(value);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        return false;
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var key = tmp_0;
      if (compareTo(previousKey, key) > 0)
        return false;
      previousKey = key;
    }
     while (inductionVariable < last);
  return true;
}
function toMutableObjectList(_this__u8e3s4) {
  var target = new (MutableObjectList())(_this__u8e3s4.c1());
  // Inline function 'androidx.collection.ObjectList.forEach' call
  // Inline function 'kotlin.contracts.contract' call
  var content = _this__u8e3s4.q6d_1;
  var inductionVariable = 0;
  var last = _this__u8e3s4.r6d_1;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = content[i];
      // Inline function 'androidx.collection.MutableObjectList.plusAssign' call
      var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      target.i(element);
    }
     while (inductionVariable < last);
  return target;
}
function sortBy(_this__u8e3s4, selector) {
  // Inline function 'kotlin.collections.sortBy' call
  var this_0 = _this__u8e3s4.u6e();
  if (this_0.c1() > 1) {
    // Inline function 'kotlin.comparisons.compareBy' call
    var tmp = sortBy$lambda(selector);
    var tmp$ret$0 = new (sam$kotlin_Comparator$0())(tmp);
    sortWith(this_0, tmp$ret$0);
  }
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.x7i_1 = function_0;
      }
      al(a, b) {
        return this.x7i_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.x7i_1;
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
function sortBy$lambda($selector) {
  return function (a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    return compareValues($selector(a), $selector(b));
  };
}
//region block: exports
export {
  removeLast as removeLastxq56l85ipjts,
  sortedBy as sortedBy1l5bxir7qaqkn,
};
//endregion

//# sourceMappingURL=Extensions.mjs.map
