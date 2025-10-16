import {
  firstOrNull1982767dljvdy as firstOrNull,
  toSet2orjxp16sotqu as toSet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { caseInsensitiveMap1xhpwzg797p51 as caseInsensitiveMap } from './Collections.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  KtMap140uvy3s5zad8 as KtMap,
  Entry2xmjmyutzoq3p as Entry,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { unmodifiable2pi9okt3ceep6 as unmodifiable } from './CollectionsJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { equals2v6cggk171b6e as equals_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { setOf1u3mizs95ngxo as setOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get(name) {
  var tmp0_safe_receiver = this.y3i(name);
  return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
}
function forEach(body) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = this.a3j().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.component1' call
    var k = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var v = element.v1();
    body(k, v);
  }
  return Unit_instance;
}
var StringValuesClass;
function StringValues() {
  if (StringValuesClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'StringValues');
    StringValuesClass = $;
  }
  return StringValuesClass;
}
function ensureListForKey($this, name) {
  var tmp0_elvis_lhs = $this.d3j_1.j3(name);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.collections.mutableListOf' call
    // Inline function 'kotlin.also' call
    var this_0 = ArrayList().g1();
    $this.e3j(name);
    // Inline function 'kotlin.collections.set' call
    $this.d3j_1.t3(name, this_0);
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function StringValuesBuilderImpl$appendAll$lambda(this$0) {
  return function (name, values) {
    this$0.f3j(name, values);
    return Unit_instance;
  };
}
var StringValuesBuilderImplClass;
function StringValuesBuilderImpl() {
  if (StringValuesBuilderImplClass === VOID) {
    class $ {
      constructor(caseInsensitiveName, size) {
        caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
        size = size === VOID ? 8 : size;
        this.c3j_1 = caseInsensitiveName;
        this.d3j_1 = this.c3j_1 ? caseInsensitiveMap() : LinkedHashMap().tc(size);
      }
      x3i() {
        return this.c3j_1;
      }
      y3i(name) {
        return this.d3j_1.j3(name);
      }
      g3j(name) {
        // Inline function 'kotlin.collections.contains' call
        // Inline function 'kotlin.collections.containsKey' call
        var this_0 = this.d3j_1;
        return (isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).h3(name);
      }
      z3i() {
        return this.d3j_1.k3();
      }
      h1() {
        return this.d3j_1.h1();
      }
      a3j() {
        return unmodifiable(this.d3j_1.t1());
      }
      h3j(name, value) {
        this.i3j(value);
        var list = ensureListForKey(this, name);
        list.p3();
        list.i(value);
      }
      lk(name) {
        var tmp0_safe_receiver = this.y3i(name);
        return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
      }
      j3j(name, value) {
        this.i3j(value);
        ensureListForKey(this, name).i(value);
      }
      k3j(stringValues) {
        stringValues.b3j(StringValuesBuilderImpl$appendAll$lambda(this));
      }
      f3j(name, values) {
        // Inline function 'kotlin.let' call
        var list = ensureListForKey(this, name);
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = values.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          this.i3j(element);
        }
        addAll(list, values);
      }
      l3j(name, values) {
        var tmp0_safe_receiver = this.d3j_1.j3(name);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : toSet(tmp0_safe_receiver);
        var existing = tmp1_elvis_lhs == null ? emptySet() : tmp1_elvis_lhs;
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var destination = ArrayList().g1();
        var _iterator__ex2g4s = values.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          if (!existing.j1(element)) {
            destination.i(element);
          }
        }
        this.f3j(name, destination);
      }
      m3j(name) {
        this.d3j_1.u3(name);
      }
      p3() {
        this.d3j_1.p3();
      }
      e3j(name) {
      }
      i3j(value) {
      }
    }
    initMetadataForClass($, 'StringValuesBuilderImpl', StringValuesBuilderImpl);
    StringValuesBuilderImplClass = $;
  }
  return StringValuesBuilderImplClass;
}
function listForKey($this, name) {
  return $this.o3j_1.j3(name);
}
var StringValuesImplClass;
function StringValuesImpl() {
  if (StringValuesImplClass === VOID) {
    class $ {
      constructor(caseInsensitiveName, values) {
        caseInsensitiveName = caseInsensitiveName === VOID ? false : caseInsensitiveName;
        values = values === VOID ? emptyMap() : values;
        this.n3j_1 = caseInsensitiveName;
        var tmp;
        if (this.n3j_1) {
          tmp = caseInsensitiveMap();
        } else {
          // Inline function 'kotlin.collections.mutableMapOf' call
          tmp = LinkedHashMap().sc();
        }
        var newMap = tmp;
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = values.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var key = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var value = element.v1();
          // Inline function 'kotlin.collections.List' call
          // Inline function 'kotlin.collections.MutableList' call
          var size = value.c1();
          var list = ArrayList().w(size);
          // Inline function 'kotlin.repeat' call
          var inductionVariable = 0;
          if (inductionVariable < size)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var tmp$ret$4 = value.e1(index);
              list.i(tmp$ret$4);
            }
             while (inductionVariable < size);
          // Inline function 'kotlin.collections.set' call
          newMap.t3(key, list);
        }
        this.o3j_1 = newMap;
      }
      x3i() {
        return this.n3j_1;
      }
      lk(name) {
        var tmp0_safe_receiver = listForKey(this, name);
        return tmp0_safe_receiver == null ? null : firstOrNull(tmp0_safe_receiver);
      }
      y3i(name) {
        return listForKey(this, name);
      }
      z3i() {
        return unmodifiable(this.o3j_1.k3());
      }
      h1() {
        return this.o3j_1.h1();
      }
      a3j() {
        return unmodifiable(this.o3j_1.t1());
      }
      b3j(body) {
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = this.o3j_1.t1().x();
        while (_iterator__ex2g4s.y()) {
          var _destruct__k2r9zo = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var key = _destruct__k2r9zo.u1();
          // Inline function 'kotlin.collections.component2' call
          var value = _destruct__k2r9zo.v1();
          body(key, value);
        }
      }
      toString() {
        return 'StringValues(case=' + !this.n3j_1 + ') ' + toString(this.a3j());
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(!(other == null) ? isInterface(other, StringValues()) : false))
          return false;
        if (!(this.n3j_1 === other.x3i()))
          return false;
        return entriesEquals(this.a3j(), other.a3j());
      }
      hashCode() {
        return entriesHashCode(this.a3j(), imul(31, getBooleanHashCode(this.n3j_1)));
      }
    }
    initMetadataForClass($, 'StringValuesImpl', StringValuesImpl, VOID, [StringValues()]);
    StringValuesImplClass = $;
  }
  return StringValuesImplClass;
}
function appendAll(_this__u8e3s4, builder) {
  // Inline function 'kotlin.apply' call
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = builder.a3j().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.component1' call
    var name = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var values = element.v1();
    _this__u8e3s4.f3j(name, values);
  }
  return _this__u8e3s4;
}
function entriesEquals(a, b) {
  return equals(a, b);
}
function entriesHashCode(entries, seed) {
  return imul(seed, 31) + hashCode(entries) | 0;
}
var StringValuesSingleImpl$entries$1Class;
function StringValuesSingleImpl$entries$1() {
  if (StringValuesSingleImpl$entries$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.p3j_1 = this$0.s3j_1;
        this.q3j_1 = this$0.t3j_1;
      }
      u1() {
        return this.p3j_1;
      }
      v1() {
        return this.q3j_1;
      }
      toString() {
        return this.p3j_1 + '=' + toString(this.q3j_1);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (!(other == null) ? isInterface(other, Entry()) : false) {
          tmp_0 = equals(other.u1(), this.p3j_1);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = equals(other.v1(), this.q3j_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return getStringHashCode(this.p3j_1) ^ hashCode(this.q3j_1);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [Entry()]);
    StringValuesSingleImpl$entries$1Class = $;
  }
  return StringValuesSingleImpl$entries$1Class;
}
var StringValuesSingleImplClass;
function StringValuesSingleImpl() {
  if (StringValuesSingleImplClass === VOID) {
    class $ {
      constructor(caseInsensitiveName, name, values) {
        this.r3j_1 = caseInsensitiveName;
        this.s3j_1 = name;
        this.t3j_1 = values;
      }
      x3i() {
        return this.r3j_1;
      }
      y3i(name) {
        return equals_0(this.s3j_1, name, this.x3i()) ? this.t3j_1 : null;
      }
      a3j() {
        return setOf(new (StringValuesSingleImpl$entries$1())(this));
      }
      z3i() {
        return setOf(this.s3j_1);
      }
      toString() {
        return 'StringValues(case=' + !this.x3i() + ') ' + toString(this.a3j());
      }
      hashCode() {
        return entriesHashCode(this.a3j(), imul(31, getBooleanHashCode(this.x3i())));
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(!(other == null) ? isInterface(other, StringValues()) : false))
          return false;
        if (!(this.x3i() === other.x3i()))
          return false;
        return entriesEquals(this.a3j(), other.a3j());
      }
      b3j(body) {
        return body(this.s3j_1, this.t3j_1);
      }
      lk(name) {
        return equals_0(name, this.s3j_1, this.x3i()) ? firstOrNull(this.t3j_1) : null;
      }
    }
    initMetadataForClass($, 'StringValuesSingleImpl', VOID, VOID, [StringValues()]);
    StringValuesSingleImplClass = $;
  }
  return StringValuesSingleImplClass;
}
function appendFiltered(_this__u8e3s4, source, keepEmpty, predicate) {
  keepEmpty = keepEmpty === VOID ? false : keepEmpty;
  source.b3j(appendFiltered$lambda(predicate, keepEmpty, _this__u8e3s4));
}
function appendFiltered$lambda($predicate, $keepEmpty, $this_appendFiltered) {
  return function (name, value) {
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList().w(value.c1());
    var _iterator__ex2g4s = value.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if ($predicate(name, element)) {
        destination.i(element);
      }
    }
    var list = destination;
    var tmp;
    var tmp_0;
    if ($keepEmpty) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_0 = !list.h1();
    }
    if (tmp_0) {
      $this_appendFiltered.f3j(name, list);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
//region block: exports
export {
  forEach as forEachghjt92rkrpzo,
  get as get3oezx9z3zutmm,
  StringValuesBuilderImpl as StringValuesBuilderImpl3ey9etj3bwnqf,
  StringValuesImpl as StringValuesImpl2l95y9du7b61t,
  StringValuesSingleImpl as StringValuesSingleImpl1uh7q2c2zm7va,
  StringValues as StringValuesjqid5a6cuday,
  appendAll as appendAlltwnjnu28pmtx,
  appendFiltered as appendFiltered3071cphiha2wn,
};
//endregion

//# sourceMappingURL=StringValues.mjs.map
