import { MutableScatterMap1d9bz6zagr1rv as MutableScatterMap } from '../../../../../androidx-collection-collection/androidx/collection/ScatterMap.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from '../Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  mutableObjectListOf14bpfh2zala4f as mutableObjectListOf,
  MutableObjectList370jqbf1tk821 as MutableObjectList,
  objectListOf1tay3ze9p1jo2 as objectListOf,
  ObjectListm9esooo6mbz2 as ObjectList,
  emptyObjectList10ti35z25kmbc as emptyObjectList,
} from '../../../../../androidx-collection-collection/androidx/collection/ObjectList.mjs';
import { removeLastxq56l85ipjts as removeLast } from './Extensions.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { fill3hcjvebk42tyx as fill } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _MultiValueMap___init__impl__qt1z0r(map) {
  map = map === VOID ? new (MutableScatterMap())() : map;
  return map;
}
function _get_map__e6co1h($this) {
  return $this;
}
function MultiValueMap__add_impl_ww0640($this, key, value) {
  // Inline function 'androidx.collection.MutableScatterMap.compute' call
  var this_0 = _get_map__e6co1h($this);
  var index = this_0.h6f(key);
  var inserting = index < 0;
  var tmp;
  if (inserting) {
    tmp = null;
  } else {
    var tmp_0 = this_0.x6e_1[index];
    tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  }
  var previous = tmp;
  // Inline function 'androidx.compose.runtime.debugRuntimeCheck' call
  var value_0 = !(!(previous == null) ? isInterface(previous, KtMutableList()) : false);
  if (false && !value_0) {
    var tmp$ret$0 = 'Unexpected value';
    composeImmediateRuntimeError(tmp$ret$0);
  }
  var tmp_1;
  if (previous == null) {
    tmp_1 = value;
  } else {
    if (previous instanceof MutableObjectList()) {
      var list = previous instanceof MutableObjectList() ? previous : THROW_CCE();
      list.i(value);
      tmp_1 = list;
    } else {
      tmp_1 = mutableObjectListOf(previous, value);
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
function MultiValueMap__clear_impl_g4umn0($this) {
  return _get_map__e6co1h($this).p3();
}
function MultiValueMap__contains_impl_2yjtfa($this, key) {
  return _get_map__e6co1h($this).r9(key);
}
function MultiValueMap__get_impl_k8msu3($this, key) {
  var entry = _get_map__e6co1h($this).j3(key);
  var tmp;
  if (entry == null) {
    tmp = emptyObjectList();
  } else {
    if (entry instanceof MutableObjectList()) {
      tmp = entry instanceof ObjectList() ? entry : THROW_CCE();
    } else {
      tmp = objectListOf(!(entry == null) ? entry : THROW_CCE());
    }
  }
  return tmp;
}
function MultiValueMap__isEmpty_impl_n67ooe($this) {
  return _get_map__e6co1h($this).h1();
}
function MultiValueMap__isNotEmpty_impl_ktqbr9($this) {
  return _get_map__e6co1h($this).u6d();
}
function MultiValueMap__removeLast_impl_h7l98v($this, key) {
  var entry = _get_map__e6co1h($this).j3(key);
  var tmp;
  if (entry == null) {
    tmp = null;
  } else {
    if (entry instanceof MutableObjectList()) {
      var list = entry instanceof MutableObjectList() ? entry : THROW_CCE();
      var tmp_0 = removeLast(list);
      var result = !(tmp_0 == null) ? tmp_0 : THROW_CCE();
      if (list.h1()) {
        _get_map__e6co1h($this).u3(key);
      }
      if (list.c1() === 1) {
        _get_map__e6co1h($this).g6f(key, list.x6b());
      }
      tmp = result;
    } else {
      _get_map__e6co1h($this).u3(key);
      tmp = !(entry == null) ? entry : THROW_CCE();
    }
  }
  return tmp;
}
function MultiValueMap__removeFirst_impl_iz2i9x($this, key) {
  var entry = _get_map__e6co1h($this).j3(key);
  var tmp;
  if (entry == null) {
    tmp = null;
  } else {
    if (entry instanceof MutableObjectList()) {
      var list = entry instanceof MutableObjectList() ? entry : THROW_CCE();
      var result = list.s3(0);
      if (list.h1()) {
        _get_map__e6co1h($this).u3(key);
      }
      if (list.c1() === 1) {
        _get_map__e6co1h($this).g6f(key, list.x6b());
      }
      tmp = result;
    } else {
      _get_map__e6co1h($this).u3(key);
      tmp = !(entry == null) ? entry : THROW_CCE();
    }
  }
  return tmp;
}
function MultiValueMap__values_impl_vxaj3b($this) {
  if (_get_map__e6co1h($this).h1())
    return emptyObjectList();
  // Inline function 'androidx.collection.mutableObjectListOf' call
  var result = new (MutableObjectList())();
  // Inline function 'androidx.collection.ScatterMap.forEachValue' call
  var this_0 = _get_map__e6co1h($this);
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
                var tmp = v[index];
                var entry = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                if (entry instanceof MutableObjectList()) {
                  result.r6e(entry instanceof MutableObjectList() ? entry : THROW_CCE());
                } else {
                  result.i(!(entry == null) ? entry : THROW_CCE());
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
  return result;
}
function MultiValueMap__removeValueIf_impl_q0rlrt($this, key, condition) {
  var tmp0_safe_receiver = _get_map__e6co1h($this).j3(key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    if (tmp0_safe_receiver instanceof MutableObjectList()) {
      // Inline function 'androidx.collection.MutableObjectList.removeIf' call
      var this_0 = tmp0_safe_receiver instanceof MutableObjectList() ? tmp0_safe_receiver : THROW_CCE();
      var gap = 0;
      var size = this_0.r6d_1;
      var content = this_0.q6d_1;
      // Inline function 'androidx.collection.ObjectList.indices' call
      var progression = until(0, this_0.r6d_1);
      var inductionVariable = progression.x1_1;
      var last = progression.y1_1;
      if (inductionVariable <= last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          content[i - gap | 0] = content[i];
          var tmp = content[i];
          if (condition((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE())) {
            gap = gap + 1 | 0;
          }
        }
         while (!(i === last));
      fill(content, null, size - gap | 0, size);
      this_0.r6d_1 = this_0.r6d_1 - gap | 0;
      if (tmp0_safe_receiver.h1()) {
        _get_map__e6co1h($this).u3(key);
      }
      if (tmp0_safe_receiver.c1() === 0) {
        _get_map__e6co1h($this).g6f(key, tmp0_safe_receiver.x6b());
      }
    } else {
      if (condition(!(tmp0_safe_receiver == null) ? tmp0_safe_receiver : THROW_CCE())) {
        _get_map__e6co1h($this).u3(key);
      }
    }
  }
}
function MultiValueMap__toString_impl_9zsder($this) {
  return 'MultiValueMap(map=' + $this.toString() + ')';
}
function MultiValueMap__hashCode_impl_vqya7m($this) {
  return $this.hashCode();
}
function MultiValueMap__equals_impl_qimysq($this, other) {
  if (!(other instanceof MultiValueMap()))
    return false;
  var tmp0_other_with_cast = other instanceof MultiValueMap() ? other.g6z_1 : THROW_CCE();
  if (!$this.equals(tmp0_other_with_cast))
    return false;
  return true;
}
function access$_get_map__v7axsb($this) {
  return _get_map__e6co1h($this);
}
var MultiValueMapClass;
function MultiValueMap() {
  if (MultiValueMapClass === VOID) {
    class $ {
      constructor(map) {
        this.g6z_1 = map;
      }
      toString() {
        return MultiValueMap__toString_impl_9zsder(this.g6z_1);
      }
      hashCode() {
        return MultiValueMap__hashCode_impl_vqya7m(this.g6z_1);
      }
      equals(other) {
        return MultiValueMap__equals_impl_qimysq(this.g6z_1, other);
      }
    }
    initMetadataForClass($, 'MultiValueMap');
    MultiValueMapClass = $;
  }
  return MultiValueMapClass;
}
//region block: exports
export {
  MultiValueMap as MultiValueMap1z8ve7qyy7otn,
  access$_get_map__v7axsb as access$_get_map__v7axsbt0wv1pgn2u1h,
  _MultiValueMap___init__impl__qt1z0r as _MultiValueMap___init__impl__qt1z0r20p8oexu1q6g,
  MultiValueMap__add_impl_ww0640 as MultiValueMap__add_impl_ww06406fld00sg07zd,
  MultiValueMap__clear_impl_g4umn0 as MultiValueMap__clear_impl_g4umn03dx9enb592bg1,
  MultiValueMap__contains_impl_2yjtfa as MultiValueMap__contains_impl_2yjtfa15u0fqwciah35,
  MultiValueMap__get_impl_k8msu3 as MultiValueMap__get_impl_k8msu357h10lnnkpf7,
  MultiValueMap__isEmpty_impl_n67ooe as MultiValueMap__isEmpty_impl_n67ooem6a76y8008nj,
  MultiValueMap__isNotEmpty_impl_ktqbr9 as MultiValueMap__isNotEmpty_impl_ktqbr922fq8yc23vaow,
  MultiValueMap__removeFirst_impl_iz2i9x as MultiValueMap__removeFirst_impl_iz2i9x209lab20iuo2d,
  MultiValueMap__removeLast_impl_h7l98v as MultiValueMap__removeLast_impl_h7l98v1webvzjfhtjgn,
  MultiValueMap__removeValueIf_impl_q0rlrt as MultiValueMap__removeValueIf_impl_q0rlrti86i4mxvzfuv,
  MultiValueMap__values_impl_vxaj3b as MultiValueMap__values_impl_vxaj3b2n4ds0fkozx7x,
};
//endregion

//# sourceMappingURL=MultiValueMap.mjs.map
