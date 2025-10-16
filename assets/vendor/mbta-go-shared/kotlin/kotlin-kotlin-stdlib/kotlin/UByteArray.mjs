import {
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
  UBytep4j7r1t64gz1 as UByte,
} from './UByte.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from './exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { contains1a3ax1gghv0nr as contains } from './collections/_Arrays.mjs';
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
function _UByteArray___init__impl__ip4y9n(storage) {
  return storage;
}
function _UByteArray___get_storage__impl__d4kctt($this) {
  return $this;
}
function _UByteArray___init__impl__ip4y9n_0(size) {
  return _UByteArray___init__impl__ip4y9n(new Int8Array(size));
}
function UByteArray__get_impl_t5f3hv($this, index) {
  // Inline function 'kotlin.toUByte' call
  var this_0 = _UByteArray___get_storage__impl__d4kctt($this)[index];
  return _UByte___init__impl__g9hnc4(this_0);
}
function UByteArray__set_impl_jvcicn($this, index, value) {
  var tmp = _UByteArray___get_storage__impl__d4kctt($this);
  // Inline function 'kotlin.UByte.toByte' call
  tmp[index] = _UByte___get_data__impl__jof9qr(value);
}
function _UByteArray___get_size__impl__h6pkdv($this) {
  return _UByteArray___get_storage__impl__d4kctt($this).length;
}
function UByteArray__iterator_impl_509y1p($this) {
  return new (Iterator())(_UByteArray___get_storage__impl__d4kctt($this));
}
var IteratorClass;
function Iterator() {
  if (IteratorClass === VOID) {
    class $ {
      constructor(array) {
        this.px_1 = array;
        this.qx_1 = 0;
      }
      y() {
        return this.qx_1 < this.px_1.length;
      }
      rx() {
        var tmp;
        if (this.qx_1 < this.px_1.length) {
          var _unary__edvuaz = this.qx_1;
          this.qx_1 = _unary__edvuaz + 1 | 0;
          // Inline function 'kotlin.toUByte' call
          var this_0 = this.px_1[_unary__edvuaz];
          tmp = _UByte___init__impl__g9hnc4(this_0);
        } else {
          throw NoSuchElementException().m(this.qx_1.toString());
        }
        return tmp;
      }
      z() {
        return new (UByte())(this.rx());
      }
    }
    initMetadataForClass($, 'Iterator');
    IteratorClass = $;
  }
  return IteratorClass;
}
function UByteArray__contains_impl_njh19q($this, element) {
  var tmp = _UByteArray___get_storage__impl__d4kctt($this);
  // Inline function 'kotlin.UByte.toByte' call
  var tmp$ret$0 = _UByte___get_data__impl__jof9qr(element);
  return contains(tmp, tmp$ret$0);
}
function UByteArray__contains_impl_njh19q_0($this, element) {
  if (!(element instanceof UByte()))
    return false;
  return UByteArray__contains_impl_njh19q($this.sx_1, element instanceof UByte() ? element.nx_1 : THROW_CCE());
}
function UByteArray__containsAll_impl_v9s6dj($this, elements) {
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
      if (element instanceof UByte()) {
        var tmp_1 = _UByteArray___get_storage__impl__d4kctt($this);
        // Inline function 'kotlin.UByte.toByte' call
        var this_0 = element.nx_1;
        var tmp$ret$1 = _UByte___get_data__impl__jof9qr(this_0);
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
function UByteArray__containsAll_impl_v9s6dj_0($this, elements) {
  return UByteArray__containsAll_impl_v9s6dj($this.sx_1, elements);
}
function UByteArray__isEmpty_impl_nbfqsa($this) {
  return _UByteArray___get_storage__impl__d4kctt($this).length === 0;
}
function UByteArray__toString_impl_ukpl97($this) {
  return 'UByteArray(storage=' + toString($this) + ')';
}
function UByteArray__hashCode_impl_ip8jx2($this) {
  return hashCode($this);
}
function UByteArray__equals_impl_roka4u($this, other) {
  if (!(other instanceof UByteArray()))
    return false;
  var tmp0_other_with_cast = other instanceof UByteArray() ? other.sx_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var UByteArrayClass;
function UByteArray() {
  if (UByteArrayClass === VOID) {
    class $ {
      constructor(storage) {
        this.sx_1 = storage;
      }
      c1() {
        return _UByteArray___get_size__impl__h6pkdv(this.sx_1);
      }
      x() {
        return UByteArray__iterator_impl_509y1p(this.sx_1);
      }
      tx(element) {
        return UByteArray__contains_impl_njh19q(this.sx_1, element);
      }
      j1(element) {
        return UByteArray__contains_impl_njh19q_0(this, element);
      }
      ux(elements) {
        return UByteArray__containsAll_impl_v9s6dj(this.sx_1, elements);
      }
      d3(elements) {
        return UByteArray__containsAll_impl_v9s6dj_0(this, elements);
      }
      h1() {
        return UByteArray__isEmpty_impl_nbfqsa(this.sx_1);
      }
      toString() {
        return UByteArray__toString_impl_ukpl97(this.sx_1);
      }
      hashCode() {
        return UByteArray__hashCode_impl_ip8jx2(this.sx_1);
      }
      equals(other) {
        return UByteArray__equals_impl_roka4u(this.sx_1, other);
      }
    }
    initMetadataForClass($, 'UByteArray', VOID, VOID, [Collection()]);
    UByteArrayClass = $;
  }
  return UByteArrayClass;
}
//region block: exports
export {
  _UByteArray___init__impl__ip4y9n as _UByteArray___init__impl__ip4y9ndqanl1uze050,
  _UByteArray___init__impl__ip4y9n_0 as _UByteArray___init__impl__ip4y9n23n7lz0x7gq72,
  UByteArray__get_impl_t5f3hv as UByteArray__get_impl_t5f3hvz1l7xhrol2kb,
  UByteArray__set_impl_jvcicn as UByteArray__set_impl_jvcicnym486up0f2lk,
  _UByteArray___get_size__impl__h6pkdv as _UByteArray___get_size__impl__h6pkdv1cve284ztupz4,
  _UByteArray___get_storage__impl__d4kctt as _UByteArray___get_storage__impl__d4kctt25iva2n6yox0m,
  UByteArray as UByteArray2qu4d6gwssdf9,
};
//endregion

//# sourceMappingURL=UByteArray.mjs.map
