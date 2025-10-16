import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  isComparableviyv6ctzm76u as isComparable,
  isInterface3d6p8outrmvmk as isInterface,
} from '../js/typeCheckUtils.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../js/compareTo.mjs';
import { Comparator2b3maoeh98xtg as Comparator } from '../ComparatorJs.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../js/FunctionAdapter.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function compareValuesBy(a, b, selectors) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(selectors.length > 0)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException().q(toString(message));
  }
  return compareValuesByImpl(a, b, selectors);
}
function compareBy(selectors) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(selectors.length > 0)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException().q(toString(message));
  }
  var tmp = compareBy$lambda(selectors);
  return new (sam$kotlin_Comparator$0())(tmp);
}
function compareValues(a, b) {
  if (a === b)
    return 0;
  if (a == null)
    return -1;
  if (b == null)
    return 1;
  return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
}
function naturalOrder() {
  var tmp = NaturalOrderComparator_instance;
  return isInterface(tmp, Comparator()) ? tmp : THROW_CCE();
}
function compareValuesByImpl(a, b, selectors) {
  var inductionVariable = 0;
  var last = selectors.length;
  while (inductionVariable < last) {
    var fn = selectors[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var v1 = fn(a);
    var v2 = fn(b);
    var diff = compareValues(v1, v2);
    if (!(diff === 0))
      return diff;
  }
  return 0;
}
function nullsLast(comparator) {
  var tmp = nullsLast$lambda(comparator);
  return new (sam$kotlin_Comparator$0_0())(tmp);
}
var NaturalOrderComparatorClass;
function NaturalOrderComparator() {
  if (NaturalOrderComparatorClass === VOID) {
    class $ {
      zq(a, b) {
        return compareTo(a, b);
      }
      compare(a, b) {
        var tmp = (!(a == null) ? isComparable(a) : false) ? a : THROW_CCE();
        return this.zq(tmp, (!(b == null) ? isComparable(b) : false) ? b : THROW_CCE());
      }
    }
    initMetadataForObject($, 'NaturalOrderComparator', VOID, VOID, [Comparator()]);
    NaturalOrderComparatorClass = $;
  }
  return NaturalOrderComparatorClass;
}
var NaturalOrderComparator_instance;
function NaturalOrderComparator_getInstance() {
  return NaturalOrderComparator_instance;
}
var sam$kotlin_Comparator$0Class;
function sam$kotlin_Comparator$0() {
  if (sam$kotlin_Comparator$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.ar_1 = function_0;
      }
      al(a, b) {
        return this.ar_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.ar_1;
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
var sam$kotlin_Comparator$0Class_0;
function sam$kotlin_Comparator$0_0() {
  if (sam$kotlin_Comparator$0Class_0 === VOID) {
    class $ {
      constructor(function_0) {
        this.br_1 = function_0;
      }
      al(a, b) {
        return this.br_1(a, b);
      }
      compare(a, b) {
        return this.al(a, b);
      }
      z4() {
        return this.br_1;
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
    sam$kotlin_Comparator$0Class_0 = $;
  }
  return sam$kotlin_Comparator$0Class_0;
}
function compareBy$lambda($selectors) {
  return function (a, b) {
    return compareValuesByImpl(a, b, $selectors);
  };
}
function nullsLast$lambda($comparator) {
  return function (a, b) {
    return a === b ? 0 : a == null ? 1 : b == null ? -1 : $comparator.compare(a, b);
  };
}
//region block: init
NaturalOrderComparator_instance = new (NaturalOrderComparator())();
//endregion
//region block: exports
export {
  compareBy as compareBy2697bq0ffft96,
  compareValuesBy as compareValuesBy2ycqeh37x2wfm,
  compareValues as compareValues1n2ayl87ihzfk,
  naturalOrder as naturalOrder3459ca049ngp6,
  nullsLast as nullsLast1ekilojjh9nz2,
};
//endregion

//# sourceMappingURL=Comparisons.mjs.map
