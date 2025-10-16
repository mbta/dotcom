import {
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
  UInt1hthisrv6cndi as UInt,
} from './UInt.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from './exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { contains3u8qpdzrl9an as contains } from './collections/_Arrays.mjs';
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
function _UIntArray___init__impl__ghjpc6(storage) {
  return storage;
}
function _UIntArray___get_storage__impl__92a0v0($this) {
  return $this;
}
function _UIntArray___init__impl__ghjpc6_0(size) {
  return _UIntArray___init__impl__ghjpc6(new Int32Array(size));
}
function UIntArray__get_impl_gp5kza($this, index) {
  // Inline function 'kotlin.toUInt' call
  var this_0 = _UIntArray___get_storage__impl__92a0v0($this)[index];
  return _UInt___init__impl__l7qpdl(this_0);
}
function UIntArray__set_impl_7f2zu2($this, index, value) {
  var tmp = _UIntArray___get_storage__impl__92a0v0($this);
  // Inline function 'kotlin.UInt.toInt' call
  tmp[index] = _UInt___get_data__impl__f0vqqw(value);
}
function _UIntArray___get_size__impl__r6l8ci($this) {
  return _UIntArray___get_storage__impl__92a0v0($this).length;
}
function UIntArray__iterator_impl_tkdv7k($this) {
  return new (Iterator())(_UIntArray___get_storage__impl__92a0v0($this));
}
var IteratorClass;
function Iterator() {
  if (IteratorClass === VOID) {
    class $ {
      constructor(array) {
        this.by_1 = array;
        this.cy_1 = 0;
      }
      y() {
        return this.cy_1 < this.by_1.length;
      }
      dy() {
        var tmp;
        if (this.cy_1 < this.by_1.length) {
          var _unary__edvuaz = this.cy_1;
          this.cy_1 = _unary__edvuaz + 1 | 0;
          // Inline function 'kotlin.toUInt' call
          var this_0 = this.by_1[_unary__edvuaz];
          tmp = _UInt___init__impl__l7qpdl(this_0);
        } else {
          throw NoSuchElementException().m(this.cy_1.toString());
        }
        return tmp;
      }
      z() {
        return new (UInt())(this.dy());
      }
    }
    initMetadataForClass($, 'Iterator');
    IteratorClass = $;
  }
  return IteratorClass;
}
function UIntArray__contains_impl_b16rzj($this, element) {
  var tmp = _UIntArray___get_storage__impl__92a0v0($this);
  // Inline function 'kotlin.UInt.toInt' call
  var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(element);
  return contains(tmp, tmp$ret$0);
}
function UIntArray__contains_impl_b16rzj_0($this, element) {
  if (!(element instanceof UInt()))
    return false;
  return UIntArray__contains_impl_b16rzj($this.ey_1, element instanceof UInt() ? element.zx_1 : THROW_CCE());
}
function UIntArray__containsAll_impl_414g22($this, elements) {
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
      if (element instanceof UInt()) {
        var tmp_1 = _UIntArray___get_storage__impl__92a0v0($this);
        // Inline function 'kotlin.UInt.toInt' call
        var this_0 = element.zx_1;
        var tmp$ret$1 = _UInt___get_data__impl__f0vqqw(this_0);
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
function UIntArray__containsAll_impl_414g22_0($this, elements) {
  return UIntArray__containsAll_impl_414g22($this.ey_1, elements);
}
function UIntArray__isEmpty_impl_vd8j4n($this) {
  return _UIntArray___get_storage__impl__92a0v0($this).length === 0;
}
function UIntArray__toString_impl_3zy802($this) {
  return 'UIntArray(storage=' + toString($this) + ')';
}
function UIntArray__hashCode_impl_hr7ost($this) {
  return hashCode($this);
}
function UIntArray__equals_impl_flcmof($this, other) {
  if (!(other instanceof UIntArray()))
    return false;
  var tmp0_other_with_cast = other instanceof UIntArray() ? other.ey_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var UIntArrayClass;
function UIntArray() {
  if (UIntArrayClass === VOID) {
    class $ {
      constructor(storage) {
        this.ey_1 = storage;
      }
      c1() {
        return _UIntArray___get_size__impl__r6l8ci(this.ey_1);
      }
      x() {
        return UIntArray__iterator_impl_tkdv7k(this.ey_1);
      }
      fy(element) {
        return UIntArray__contains_impl_b16rzj(this.ey_1, element);
      }
      j1(element) {
        return UIntArray__contains_impl_b16rzj_0(this, element);
      }
      gy(elements) {
        return UIntArray__containsAll_impl_414g22(this.ey_1, elements);
      }
      d3(elements) {
        return UIntArray__containsAll_impl_414g22_0(this, elements);
      }
      h1() {
        return UIntArray__isEmpty_impl_vd8j4n(this.ey_1);
      }
      toString() {
        return UIntArray__toString_impl_3zy802(this.ey_1);
      }
      hashCode() {
        return UIntArray__hashCode_impl_hr7ost(this.ey_1);
      }
      equals(other) {
        return UIntArray__equals_impl_flcmof(this.ey_1, other);
      }
    }
    initMetadataForClass($, 'UIntArray', VOID, VOID, [Collection()]);
    UIntArrayClass = $;
  }
  return UIntArrayClass;
}
//region block: exports
export {
  _UIntArray___init__impl__ghjpc6_0 as _UIntArray___init__impl__ghjpc618b75h631neq9,
  _UIntArray___init__impl__ghjpc6 as _UIntArray___init__impl__ghjpc617c61a9kgqgj3,
  UIntArray__get_impl_gp5kza as UIntArray__get_impl_gp5kza2hxcr782v503s,
  UIntArray__set_impl_7f2zu2 as UIntArray__set_impl_7f2zu21rg83h8k5rr6q,
  _UIntArray___get_size__impl__r6l8ci as _UIntArray___get_size__impl__r6l8ci2fqw6ae893py3,
  _UIntArray___get_storage__impl__92a0v0 as _UIntArray___get_storage__impl__92a0v02db5qclx33scp,
  UIntArray as UIntArrayrp6cv44n5v4y,
};
//endregion

//# sourceMappingURL=UIntArray.mjs.map
