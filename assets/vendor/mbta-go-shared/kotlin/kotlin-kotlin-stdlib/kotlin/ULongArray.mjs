import { longArray288a0fctlmjmj as longArray } from './js/arrays.mjs';
import {
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
  ULong3f9k7s38t3rfp as ULong,
} from './ULong.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from './exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { contains2ejsq2kq1axf2 as contains } from './collections/_Arrays.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { Collection1k04j3hzsbod0 as Collection } from './collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from './js/typeCheckUtils.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from './js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _ULongArray___init__impl__twm1l3(storage) {
  return storage;
}
function _ULongArray___get_storage__impl__28e64j($this) {
  return $this;
}
function _ULongArray___init__impl__twm1l3_0(size) {
  return _ULongArray___init__impl__twm1l3(longArray(size));
}
function ULongArray__get_impl_pr71q9($this, index) {
  // Inline function 'kotlin.toULong' call
  var this_0 = _ULongArray___get_storage__impl__28e64j($this)[index];
  return _ULong___init__impl__c78o9k(this_0);
}
function ULongArray__set_impl_z19mvh($this, index, value) {
  var tmp = _ULongArray___get_storage__impl__28e64j($this);
  // Inline function 'kotlin.ULong.toLong' call
  tmp[index] = _ULong___get_data__impl__fggpzb(value);
}
function _ULongArray___get_size__impl__ju6dtr($this) {
  return _ULongArray___get_storage__impl__28e64j($this).length;
}
function ULongArray__iterator_impl_cq4d2h($this) {
  return new (Iterator())(_ULongArray___get_storage__impl__28e64j($this));
}
var IteratorClass;
function Iterator() {
  if (IteratorClass === VOID) {
    class $ {
      constructor(array) {
        this.ny_1 = array;
        this.oy_1 = 0;
      }
      y() {
        return this.oy_1 < this.ny_1.length;
      }
      py() {
        var tmp;
        if (this.oy_1 < this.ny_1.length) {
          var _unary__edvuaz = this.oy_1;
          this.oy_1 = _unary__edvuaz + 1 | 0;
          // Inline function 'kotlin.toULong' call
          var this_0 = this.ny_1[_unary__edvuaz];
          tmp = _ULong___init__impl__c78o9k(this_0);
        } else {
          throw NoSuchElementException().m(this.oy_1.toString());
        }
        return tmp;
      }
      z() {
        return new (ULong())(this.py());
      }
    }
    initMetadataForClass($, 'Iterator');
    IteratorClass = $;
  }
  return IteratorClass;
}
function ULongArray__contains_impl_v9bgai($this, element) {
  var tmp = _ULongArray___get_storage__impl__28e64j($this);
  // Inline function 'kotlin.ULong.toLong' call
  var tmp$ret$0 = _ULong___get_data__impl__fggpzb(element);
  return contains(tmp, tmp$ret$0);
}
function ULongArray__contains_impl_v9bgai_0($this, element) {
  if (!(element instanceof ULong()))
    return false;
  return ULongArray__contains_impl_v9bgai($this.qy_1, element instanceof ULong() ? element.ly_1 : THROW_CCE());
}
function ULongArray__containsAll_impl_xx8ztf($this, elements) {
  var tmp0 = isInterface(elements, Collection()) ? elements : THROW_CCE();
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(tmp0, Collection())) {
      tmp = tmp0.h1();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      var tmp_0;
      if (element instanceof ULong()) {
        var tmp_1 = _ULongArray___get_storage__impl__28e64j($this);
        // Inline function 'kotlin.ULong.toLong' call
        var this_0 = element.ly_1;
        var tmp$ret$1 = _ULong___get_data__impl__fggpzb(this_0);
        tmp_0 = contains(tmp_1, tmp$ret$1);
      } else {
        tmp_0 = false;
      }
      if (!tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
}
function ULongArray__containsAll_impl_xx8ztf_0($this, elements) {
  return ULongArray__containsAll_impl_xx8ztf($this.qy_1, elements);
}
function ULongArray__isEmpty_impl_c3yngu($this) {
  return _ULongArray___get_storage__impl__28e64j($this).length === 0;
}
function ULongArray__toString_impl_wqk1p5($this) {
  return 'ULongArray(storage=' + toString($this) + ')';
}
function ULongArray__hashCode_impl_aze4wa($this) {
  return hashCode($this);
}
function ULongArray__equals_impl_vwitwa($this, other) {
  if (!(other instanceof ULongArray()))
    return false;
  var tmp0_other_with_cast = other instanceof ULongArray() ? other.qy_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var ULongArrayClass;
function ULongArray() {
  if (ULongArrayClass === VOID) {
    class $ {
      constructor(storage) {
        this.qy_1 = storage;
      }
      c1() {
        return _ULongArray___get_size__impl__ju6dtr(this.qy_1);
      }
      x() {
        return ULongArray__iterator_impl_cq4d2h(this.qy_1);
      }
      ry(element) {
        return ULongArray__contains_impl_v9bgai(this.qy_1, element);
      }
      j1(element) {
        return ULongArray__contains_impl_v9bgai_0(this, element);
      }
      sy(elements) {
        return ULongArray__containsAll_impl_xx8ztf(this.qy_1, elements);
      }
      d3(elements) {
        return ULongArray__containsAll_impl_xx8ztf_0(this, elements);
      }
      h1() {
        return ULongArray__isEmpty_impl_c3yngu(this.qy_1);
      }
      toString() {
        return ULongArray__toString_impl_wqk1p5(this.qy_1);
      }
      hashCode() {
        return ULongArray__hashCode_impl_aze4wa(this.qy_1);
      }
      equals(other) {
        return ULongArray__equals_impl_vwitwa(this.qy_1, other);
      }
    }
    initMetadataForClass($, 'ULongArray', VOID, VOID, [Collection()]);
    ULongArrayClass = $;
  }
  return ULongArrayClass;
}
//region block: exports
export {
  _ULongArray___init__impl__twm1l3_0 as _ULongArray___init__impl__twm1l318nadwrsl904i,
  _ULongArray___init__impl__twm1l3 as _ULongArray___init__impl__twm1l310ecgw67nsok9,
  ULongArray__get_impl_pr71q9 as ULongArray__get_impl_pr71q9ba20e4znze0l,
  ULongArray__set_impl_z19mvh as ULongArray__set_impl_z19mvh2wf37xvulocfs,
  _ULongArray___get_size__impl__ju6dtr as _ULongArray___get_size__impl__ju6dtr2cm0h8pvj33oc,
  _ULongArray___get_storage__impl__28e64j as _ULongArray___get_storage__impl__28e64jd93r4nwx0bzi,
  ULongArray as ULongArray3nd0d80mdwjj8,
};
//endregion

//# sourceMappingURL=ULongArray.mjs.map
