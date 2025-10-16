import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { toList3jhuyej2anx2q as toList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function getFirstValue($this, clazz) {
  var tmp0 = $this.s7y_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (clazz.hh(element)) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var tmp = tmp$ret$1;
  return (tmp == null ? true : !(tmp == null)) ? tmp : null;
}
function getIndexedValue($this, clazz) {
  // Inline function 'kotlin.takeIf' call
  var this_0 = $this.s7y_1.e1($this.u7y_1);
  var tmp;
  if (clazz.hh(this_0)) {
    tmp = this_0;
  } else {
    tmp = null;
  }
  var tmp_0 = tmp;
  var currentValue = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : null;
  if (!(currentValue == null)) {
    $this.v7y();
  }
  return currentValue;
}
var ParametersHolderClass;
function ParametersHolder() {
  if (ParametersHolderClass === VOID) {
    class $ {
      constructor(_values, useIndexedValues) {
        var tmp;
        if (_values === VOID) {
          // Inline function 'kotlin.collections.mutableListOf' call
          tmp = ArrayList().g1();
        } else {
          tmp = _values;
        }
        _values = tmp;
        useIndexedValues = useIndexedValues === VOID ? null : useIndexedValues;
        this.s7y_1 = _values;
        this.t7y_1 = useIndexedValues;
        this.u7y_1 = 0;
      }
      l3() {
        return this.s7y_1;
      }
      h1() {
        return this.s7y_1.h1();
      }
      w7y(clazz) {
        var tmp;
        if (this.s7y_1.h1()) {
          tmp = null;
        } else {
          var tmp_0;
          switch (this.t7y_1) {
            case null:
              var tmp1_elvis_lhs = getIndexedValue(this, clazz);
              tmp_0 = tmp1_elvis_lhs == null ? getFirstValue(this, clazz) : tmp1_elvis_lhs;
              break;
            case true:
              tmp_0 = getIndexedValue(this, clazz);
              break;
            default:
              tmp_0 = getFirstValue(this, clazz);
              break;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      v7y() {
        if (this.u7y_1 < get_lastIndex(this.s7y_1)) {
          this.u7y_1 = this.u7y_1 + 1 | 0;
        }
      }
      toString() {
        return 'DefinitionParameters' + toString(toList(this.s7y_1));
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ParametersHolder()))
          return false;
        return equals(this.l3(), other.l3()) && this.t7y_1 == other.t7y_1;
      }
      hashCode() {
        var tmp = imul(31, hashCode(this.l3()));
        var tmp0_safe_receiver = this.t7y_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getBooleanHashCode(tmp0_safe_receiver);
        return tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
      }
    }
    initMetadataForClass($, 'ParametersHolder', ParametersHolder);
    ParametersHolderClass = $;
  }
  return ParametersHolderClass;
}
function emptyParametersHolder() {
  return new (ParametersHolder())();
}
//region block: exports
export {
  emptyParametersHolder as emptyParametersHolder267w5gujzzg9r,
};
//endregion

//# sourceMappingURL=ParametersHolder.mjs.map
