import { _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245 } from './UShort.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { numberToChar93r9buh19yek as numberToChar } from './js/numberConversion.mjs';
import { CharRange1dt3801jgpja5 as CharRange } from './ranges/PrimitiveRanges.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _Char___init__impl__6a9atx(value) {
  return value;
}
function _get_value__a43j40($this) {
  return $this;
}
function _Char___init__impl__6a9atx_0(code) {
  // Inline function 'kotlin.UShort.toInt' call
  var tmp$ret$0 = _UShort___get_data__impl__g0245(code) & 65535;
  return _Char___init__impl__6a9atx(tmp$ret$0);
}
function Char__compareTo_impl_ypi4mb($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__compareTo_impl_ypi4mb_0($this, other) {
  return Char__compareTo_impl_ypi4mb($this.r2_1, other instanceof Char() ? other.r2_1 : THROW_CCE());
}
function Char__plus_impl_qi7pgj($this, other) {
  return numberToChar(_get_value__a43j40($this) + other | 0);
}
function Char__minus_impl_a2frrh($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__minus_impl_a2frrh_0($this, other) {
  return numberToChar(_get_value__a43j40($this) - other | 0);
}
function Char__rangeTo_impl_tkncvp($this, other) {
  return new (CharRange())($this, other);
}
function Char__toInt_impl_vasixd($this) {
  return _get_value__a43j40($this);
}
function toString($this) {
  // Inline function 'kotlin.js.unsafeCast' call
  return String.fromCharCode(_get_value__a43j40($this));
}
function Char__equals_impl_x6719k($this, other) {
  if (!(other instanceof Char()))
    return false;
  return _get_value__a43j40($this) === _get_value__a43j40(other.r2_1);
}
function Char__hashCode_impl_otmys($this) {
  return _get_value__a43j40($this);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.s2_1 = _Char___init__impl__6a9atx(0);
        this.t2_1 = _Char___init__impl__6a9atx(65535);
        this.u2_1 = _Char___init__impl__6a9atx(55296);
        this.v2_1 = _Char___init__impl__6a9atx(56319);
        this.w2_1 = _Char___init__impl__6a9atx(56320);
        this.x2_1 = _Char___init__impl__6a9atx(57343);
        this.y2_1 = _Char___init__impl__6a9atx(55296);
        this.z2_1 = _Char___init__impl__6a9atx(57343);
        this.a3_1 = 2;
        this.b3_1 = 16;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var CharClass;
function Char() {
  if (CharClass === VOID) {
    class $ {
      constructor(value) {
        Companion_getInstance();
        this.r2_1 = value;
      }
      c3(other) {
        return Char__compareTo_impl_ypi4mb(this.r2_1, other);
      }
      d(other) {
        return Char__compareTo_impl_ypi4mb_0(this, other);
      }
      toString() {
        return toString(this.r2_1);
      }
      equals(other) {
        return Char__equals_impl_x6719k(this.r2_1, other);
      }
      hashCode() {
        return Char__hashCode_impl_otmys(this.r2_1);
      }
    }
    initMetadataForClass($, 'Char', VOID, VOID, [Comparable()]);
    CharClass = $;
  }
  return CharClass;
}
//region block: exports
export {
  _Char___init__impl__6a9atx as _Char___init__impl__6a9atx2js6krycynjoo,
  _Char___init__impl__6a9atx_0 as _Char___init__impl__6a9atx2jcqagb21vxrt,
  Char__compareTo_impl_ypi4mb as Char__compareTo_impl_ypi4mbdrkik40uwhqc,
  Char__minus_impl_a2frrh as Char__minus_impl_a2frrh3548ixwefqxih,
  Char__minus_impl_a2frrh_0 as Char__minus_impl_a2frrh3t0v4pviuv4om,
  Char__plus_impl_qi7pgj as Char__plus_impl_qi7pgj3akekecdud2w6,
  Char__rangeTo_impl_tkncvp as Char__rangeTo_impl_tkncvp2wb70up86k2i2,
  Char__toInt_impl_vasixd as Char__toInt_impl_vasixd1agw9q2fuvclj,
  toString as toString3o7ifthqydp6e,
  Companion_getInstance as Companion_getInstance2e3h8n26rh23,
  Char as Char19o2r8palgjof,
};
//endregion

//# sourceMappingURL=Char.mjs.map
