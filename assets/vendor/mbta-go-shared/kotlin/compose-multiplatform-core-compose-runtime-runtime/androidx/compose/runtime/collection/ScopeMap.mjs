import { mutableScatterMapOf3abcfp1zp1j0e as mutableScatterMapOf } from '../../../../../androidx-collection-collection/androidx/collection/ScatterMap.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { MutableScatterSetcffu86129j6b as MutableScatterSet } from '../../../../../androidx-collection-collection/androidx/collection/ScatterSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import { mutableSetOf3lxrr4fe5z3v8 as mutableSetOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _ScopeMap___init__impl__52wntz(map) {
  map = map === VOID ? mutableScatterMapOf() : map;
  return map;
}
function _ScopeMap___get_map__impl__vxhazm($this) {
  return $this;
}
function _ScopeMap___get_size__impl__f25bvl($this) {
  return _ScopeMap___get_map__impl__vxhazm($this).c1();
}
function ScopeMap__add_impl_n8b3uc($this, key, scope) {
  // Inline function 'androidx.collection.MutableScatterMap.compute' call
  var this_0 = _ScopeMap___get_map__impl__vxhazm($this);
  var index = this_0.h6f(key);
  var inserting = index < 0;
  var tmp;
  if (inserting) {
    tmp = null;
  } else {
    var tmp_0 = this_0.x6e_1[index];
    tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  }
  var value = tmp;
  var tmp_1;
  if (value == null) {
    tmp_1 = scope;
  } else {
    if (value instanceof MutableScatterSet()) {
      (value instanceof MutableScatterSet() ? value : THROW_CCE()).i(scope);
      tmp_1 = value;
    } else {
      var tmp_2;
      if (!(value === scope)) {
        var set = new (MutableScatterSet())();
        set.i(!(value == null) ? value : THROW_CCE());
        set.i(scope);
        tmp_2 = set;
      } else {
        tmp_2 = value;
      }
      tmp_1 = tmp_2;
    }
  }
  var computedValue = tmp_1;
  if (inserting) {
    var insertionIndex = ~index;
    this_0.w6e_1[insertionIndex] = key;
    this_0.x6e_1[insertionIndex] = computedValue;
  } else {
    this_0.x6e_1[index] = computedValue;
  }
}
function ScopeMap__set_impl_3y8kbx($this, key, value) {
  _ScopeMap___get_map__impl__vxhazm($this).g6f(key, value);
}
function ScopeMap__contains_impl_6qp7s6($this, element) {
  return _ScopeMap___get_map__impl__vxhazm($this).h3(element);
}
function ScopeMap__remove_impl_ocu4rj($this, key, scope) {
  var tmp0_elvis_lhs = _ScopeMap___get_map__impl__vxhazm($this).j3(key);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var value = tmp;
  var tmp_0;
  if (value instanceof MutableScatterSet()) {
    var set = value instanceof MutableScatterSet() ? value : THROW_CCE();
    var removed = set.m3(scope);
    if (removed && set.h1()) {
      _ScopeMap___get_map__impl__vxhazm($this).u3(key);
    }
    return removed;
  } else {
    if (equals(value, scope)) {
      _ScopeMap___get_map__impl__vxhazm($this).u3(key);
      tmp_0 = true;
    } else {
      tmp_0 = false;
    }
  }
  return tmp_0;
}
function ScopeMap__removeScope_impl_8k6ux1($this, scope) {
  // Inline function 'androidx.collection.MutableScatterMap.removeIf' call
  var this_0 = _ScopeMap___get_map__impl__vxhazm($this);
  $l$block: {
    // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
    var m = this_0.v6e_1;
    var lastIndex = m.length - 2 | 0;
    var inductionVariable = 0;
    if (inductionVariable <= lastIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slot = m[i];
        // Inline function 'androidx.collection.maskEmptyOrDeleted' call
        var this_1 = slot;
        if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
          var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < bitCount)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              // Inline function 'androidx.collection.isFull' call
              if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                var index = (i << 3) + j | 0;
                var tmp = this_0.w6e_1[index];
                (tmp == null ? true : !(tmp == null)) || THROW_CCE();
                var tmp_0 = this_0.x6e_1[index];
                var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                var tmp_1;
                if (value instanceof MutableScatterSet()) {
                  var set = value instanceof MutableScatterSet() ? value : THROW_CCE();
                  set.m3(scope);
                  tmp_1 = set.h1();
                } else {
                  tmp_1 = value === scope;
                }
                if (tmp_1) {
                  this_0.r6c(index);
                }
              }
              slot = slot.q4(8);
            }
             while (inductionVariable_0 < bitCount);
          if (!(bitCount === 8)) {
            break $l$block;
          }
        }
      }
       while (!(i === lastIndex));
  }
}
function ScopeMap__asMap_impl_uiab3f($this) {
  // Inline function 'kotlin.collections.hashMapOf' call
  var result = HashMap().a9();
  // Inline function 'androidx.collection.ScatterMap.forEach' call
  var this_0 = _ScopeMap___get_map__impl__vxhazm($this);
  var k = this_0.w6e_1;
  var v = this_0.x6e_1;
  $l$block: {
    // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
    var m = this_0.v6e_1;
    var lastIndex = m.length - 2 | 0;
    var inductionVariable = 0;
    if (inductionVariable <= lastIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var slot = m[i];
        // Inline function 'androidx.collection.maskEmptyOrDeleted' call
        var this_1 = slot;
        if (!this_1.s4(this_1.n4().p4(7)).s4(new (Long())(-2139062144, -2139062144)).equals(new (Long())(-2139062144, -2139062144))) {
          var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < bitCount)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              // Inline function 'androidx.collection.isFull' call
              if (slot.s4(new (Long())(255, 0)).d2(new (Long())(128, 0)) < 0) {
                var index = (i << 3) + j | 0;
                var tmp = k[index];
                var tmp0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                var tmp_0 = v[index];
                var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                var tmp2 = !(tmp0 == null) ? tmp0 : THROW_CCE();
                var tmp_1;
                if (value instanceof MutableScatterSet()) {
                  var set = value instanceof MutableScatterSet() ? value : THROW_CCE();
                  tmp_1 = set.n6f();
                } else {
                  tmp_1 = mutableSetOf([!(value == null) ? value : THROW_CCE()]);
                }
                // Inline function 'kotlin.collections.set' call
                var value_0 = tmp_1;
                result.t3(tmp2, value_0);
              }
              slot = slot.q4(8);
            }
             while (inductionVariable_0 < bitCount);
          if (!(bitCount === 8)) {
            break $l$block;
          }
        }
      }
       while (!(i === lastIndex));
  }
  return result;
}
//region block: exports
export {
  _ScopeMap___init__impl__52wntz as _ScopeMap___init__impl__52wntz3n1c1nixrzfck,
  ScopeMap__add_impl_n8b3uc as ScopeMap__add_impl_n8b3uc2lh1eqciwsu5,
  ScopeMap__asMap_impl_uiab3f as ScopeMap__asMap_impl_uiab3f17doju2bqqcei,
  ScopeMap__contains_impl_6qp7s6 as ScopeMap__contains_impl_6qp7s63dwsaeljcgfnm,
  _ScopeMap___get_map__impl__vxhazm as _ScopeMap___get_map__impl__vxhazm3lygd1zl1a7kq,
  ScopeMap__removeScope_impl_8k6ux1 as ScopeMap__removeScope_impl_8k6ux12uysecl8ndrrn,
  ScopeMap__remove_impl_ocu4rj as ScopeMap__remove_impl_ocu4rj38uhxetbr89wj,
  ScopeMap__set_impl_3y8kbx as ScopeMap__set_impl_3y8kbx2fkzbmv6z0tu3,
  _ScopeMap___get_size__impl__f25bvl as _ScopeMap___get_size__impl__f25bvl28m3a99gbwezu,
};
//endregion

//# sourceMappingURL=ScopeMap.mjs.map
