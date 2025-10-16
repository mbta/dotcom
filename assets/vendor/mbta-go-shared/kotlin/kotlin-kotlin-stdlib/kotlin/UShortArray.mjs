import {
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
  _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245,
  UShort26xnqty60t7le as UShort,
} from './UShort.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from './exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { containscs3vsq7ynpxl as contains } from './collections/_Arrays.mjs';
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
function _UShortArray___init__impl__9b26ef(storage) {
  return storage;
}
function _UShortArray___get_storage__impl__t2jpv5($this) {
  return $this;
}
function _UShortArray___init__impl__9b26ef_0(size) {
  return _UShortArray___init__impl__9b26ef(new Int16Array(size));
}
function UShortArray__get_impl_fnbhmx($this, index) {
  // Inline function 'kotlin.toUShort' call
  var this_0 = _UShortArray___get_storage__impl__t2jpv5($this)[index];
  return _UShort___init__impl__jigrne(this_0);
}
function UShortArray__set_impl_6d8whp($this, index, value) {
  var tmp = _UShortArray___get_storage__impl__t2jpv5($this);
  // Inline function 'kotlin.UShort.toShort' call
  tmp[index] = _UShort___get_data__impl__g0245(value);
}
function _UShortArray___get_size__impl__jqto1b($this) {
  return _UShortArray___get_storage__impl__t2jpv5($this).length;
}
function UShortArray__iterator_impl_ktpenn($this) {
  return new (Iterator())(_UShortArray___get_storage__impl__t2jpv5($this));
}
var IteratorClass;
function Iterator() {
  if (IteratorClass === VOID) {
    class $ {
      constructor(array) {
        this.zy_1 = array;
        this.az_1 = 0;
      }
      y() {
        return this.az_1 < this.zy_1.length;
      }
      bz() {
        var tmp;
        if (this.az_1 < this.zy_1.length) {
          var _unary__edvuaz = this.az_1;
          this.az_1 = _unary__edvuaz + 1 | 0;
          // Inline function 'kotlin.toUShort' call
          var this_0 = this.zy_1[_unary__edvuaz];
          tmp = _UShort___init__impl__jigrne(this_0);
        } else {
          throw NoSuchElementException().m(this.az_1.toString());
        }
        return tmp;
      }
      z() {
        return new (UShort())(this.bz());
      }
    }
    initMetadataForClass($, 'Iterator');
    IteratorClass = $;
  }
  return IteratorClass;
}
function UShortArray__contains_impl_vo7k3g($this, element) {
  var tmp = _UShortArray___get_storage__impl__t2jpv5($this);
  // Inline function 'kotlin.UShort.toShort' call
  var tmp$ret$0 = _UShort___get_data__impl__g0245(element);
  return contains(tmp, tmp$ret$0);
}
function UShortArray__contains_impl_vo7k3g_0($this, element) {
  if (!(element instanceof UShort()))
    return false;
  return UShortArray__contains_impl_vo7k3g($this.cz_1, element instanceof UShort() ? element.xy_1 : THROW_CCE());
}
function UShortArray__containsAll_impl_vlaaxp($this, elements) {
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
      if (element instanceof UShort()) {
        var tmp_1 = _UShortArray___get_storage__impl__t2jpv5($this);
        // Inline function 'kotlin.UShort.toShort' call
        var this_0 = element.xy_1;
        var tmp$ret$1 = _UShort___get_data__impl__g0245(this_0);
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
function UShortArray__containsAll_impl_vlaaxp_0($this, elements) {
  return UShortArray__containsAll_impl_vlaaxp($this.cz_1, elements);
}
function UShortArray__isEmpty_impl_cdd9l0($this) {
  return _UShortArray___get_storage__impl__t2jpv5($this).length === 0;
}
function UShortArray__toString_impl_omz03z($this) {
  return 'UShortArray(storage=' + toString($this) + ')';
}
function UShortArray__hashCode_impl_2vt3b4($this) {
  return hashCode($this);
}
function UShortArray__equals_impl_tyc3mk($this, other) {
  if (!(other instanceof UShortArray()))
    return false;
  var tmp0_other_with_cast = other instanceof UShortArray() ? other.cz_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var UShortArrayClass;
function UShortArray() {
  if (UShortArrayClass === VOID) {
    class $ {
      constructor(storage) {
        this.cz_1 = storage;
      }
      c1() {
        return _UShortArray___get_size__impl__jqto1b(this.cz_1);
      }
      x() {
        return UShortArray__iterator_impl_ktpenn(this.cz_1);
      }
      dz(element) {
        return UShortArray__contains_impl_vo7k3g(this.cz_1, element);
      }
      j1(element) {
        return UShortArray__contains_impl_vo7k3g_0(this, element);
      }
      ez(elements) {
        return UShortArray__containsAll_impl_vlaaxp(this.cz_1, elements);
      }
      d3(elements) {
        return UShortArray__containsAll_impl_vlaaxp_0(this, elements);
      }
      h1() {
        return UShortArray__isEmpty_impl_cdd9l0(this.cz_1);
      }
      toString() {
        return UShortArray__toString_impl_omz03z(this.cz_1);
      }
      hashCode() {
        return UShortArray__hashCode_impl_2vt3b4(this.cz_1);
      }
      equals(other) {
        return UShortArray__equals_impl_tyc3mk(this.cz_1, other);
      }
    }
    initMetadataForClass($, 'UShortArray', VOID, VOID, [Collection()]);
    UShortArrayClass = $;
  }
  return UShortArrayClass;
}
//region block: exports
export {
  _UShortArray___init__impl__9b26ef_0 as _UShortArray___init__impl__9b26ef2aumgbpdmuy5g,
  _UShortArray___init__impl__9b26ef as _UShortArray___init__impl__9b26ef3ghkk09gj85t3,
  UShortArray__get_impl_fnbhmx as UShortArray__get_impl_fnbhmx31xgjirit34wn,
  UShortArray__set_impl_6d8whp as UShortArray__set_impl_6d8whp1o84pp60fh8tm,
  _UShortArray___get_size__impl__jqto1b as _UShortArray___get_size__impl__jqto1b1rcopfj002me5,
  _UShortArray___get_storage__impl__t2jpv5 as _UShortArray___get_storage__impl__t2jpv516i6vr5ztry4u,
  UShortArray as UShortArray11avpmknxdgvv,
};
//endregion

//# sourceMappingURL=UShortArray.mjs.map
