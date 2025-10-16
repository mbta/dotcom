import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { toSet2orjxp16sotqu as toSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMutableSetwuwn7k5m570a as KtMutableSet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DelegatingMutableSet$iterator$1Class;
function DelegatingMutableSet$iterator$1() {
  if (DelegatingMutableSet$iterator$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.a3i_1 = this$0;
        this.z3h_1 = this$0.b3i_1.x();
      }
      y() {
        return this.z3h_1.y();
      }
      z() {
        return this.a3i_1.c3i_1(this.z3h_1.z());
      }
      z6() {
        return this.z3h_1.z6();
      }
    }
    initMetadataForClass($);
    DelegatingMutableSet$iterator$1Class = $;
  }
  return DelegatingMutableSet$iterator$1Class;
}
var DelegatingMutableSetClass;
function DelegatingMutableSet() {
  if (DelegatingMutableSetClass === VOID) {
    class $ {
      constructor(delegate, convertTo, convert) {
        this.b3i_1 = delegate;
        this.c3i_1 = convertTo;
        this.d3i_1 = convert;
        this.e3i_1 = this.b3i_1.c1();
      }
      f3i(_this__u8e3s4) {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
        var _iterator__ex2g4s = _this__u8e3s4.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = this.d3i_1(item);
          destination.i(tmp$ret$0);
        }
        return destination;
      }
      g3i(_this__u8e3s4) {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(_this__u8e3s4, 10));
        var _iterator__ex2g4s = _this__u8e3s4.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = this.c3i_1(item);
          destination.i(tmp$ret$0);
        }
        return destination;
      }
      c1() {
        return this.e3i_1;
      }
      h3i(element) {
        return this.b3i_1.i(this.d3i_1(element));
      }
      i(element) {
        return this.h3i((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      i3i(elements) {
        return this.b3i_1.d1(this.f3i(elements));
      }
      d1(elements) {
        return this.i3i(elements);
      }
      p3() {
        this.b3i_1.p3();
      }
      j3i(element) {
        return this.b3i_1.m3(this.d3i_1(element));
      }
      m3(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.j3i((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      k3i(elements) {
        return this.b3i_1.o3(toSet(this.f3i(elements)));
      }
      o3(elements) {
        return this.k3i(elements);
      }
      l3i(element) {
        return this.b3i_1.j1(this.d3i_1(element));
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.l3i((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      m3i(elements) {
        return this.b3i_1.d3(this.f3i(elements));
      }
      d3(elements) {
        return this.m3i(elements);
      }
      h1() {
        return this.b3i_1.h1();
      }
      x() {
        return new (DelegatingMutableSet$iterator$1())(this);
      }
      hashCode() {
        return hashCode(this.b3i_1);
      }
      equals(other) {
        var tmp;
        if (other == null) {
          tmp = true;
        } else {
          tmp = !(!(other == null) ? isInterface(other, KtSet()) : false);
        }
        if (tmp)
          return false;
        var elements = this.g3i(this.b3i_1);
        var tmp_0;
        if (other.d3(elements)) {
          // Inline function 'kotlin.collections.containsAll' call
          tmp_0 = elements.d3(other);
        } else {
          tmp_0 = false;
        }
        return tmp_0;
      }
      toString() {
        return toString(this.g3i(this.b3i_1));
      }
    }
    initMetadataForClass($, 'DelegatingMutableSet', VOID, VOID, [KtMutableSet()]);
    DelegatingMutableSetClass = $;
  }
  return DelegatingMutableSetClass;
}
//region block: exports
export {
  DelegatingMutableSet as DelegatingMutableSet198sgh8jelkh1,
};
//endregion

//# sourceMappingURL=DelegatingMutableSet.mjs.map
