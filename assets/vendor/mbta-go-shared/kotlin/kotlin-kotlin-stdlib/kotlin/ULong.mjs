import { Long2qws0ah9gnpki as Long } from './Primitives.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import {
  ulongCompare29yg6v52hxi4l as ulongCompare,
  ulongToString1zq54ldfaf473 as ulongToString,
} from './UnsignedJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _ULong___init__impl__c78o9k(data) {
  return data;
}
function _ULong___get_data__impl__fggpzb($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.hy_1 = _ULong___init__impl__c78o9k(new (Long())(0, 0));
        this.iy_1 = _ULong___init__impl__c78o9k(new (Long())(-1, -1));
        this.jy_1 = 8;
        this.ky_1 = 64;
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
function ULong__compareTo_impl_38i7tu($this, other) {
  return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other));
}
function ULong__compareTo_impl_38i7tu_0($this, other) {
  return ULong__compareTo_impl_38i7tu($this.ly_1, other instanceof ULong() ? other.ly_1 : THROW_CCE());
}
function ULong__toString_impl_f9au7k($this) {
  // Inline function 'kotlin.ulongToString' call
  var value = _ULong___get_data__impl__fggpzb($this);
  return ulongToString(value, 10);
}
function ULong__hashCode_impl_6hv2lb($this) {
  return $this.hashCode();
}
function ULong__equals_impl_o0gnyb($this, other) {
  if (!(other instanceof ULong()))
    return false;
  var tmp0_other_with_cast = other instanceof ULong() ? other.ly_1 : THROW_CCE();
  if (!$this.equals(tmp0_other_with_cast))
    return false;
  return true;
}
var ULongClass;
function ULong() {
  if (ULongClass === VOID) {
    class $ {
      constructor(data) {
        Companion_getInstance();
        this.ly_1 = data;
      }
      my(other) {
        return ULong__compareTo_impl_38i7tu(this.ly_1, other);
      }
      d(other) {
        return ULong__compareTo_impl_38i7tu_0(this, other);
      }
      toString() {
        return ULong__toString_impl_f9au7k(this.ly_1);
      }
      hashCode() {
        return ULong__hashCode_impl_6hv2lb(this.ly_1);
      }
      equals(other) {
        return ULong__equals_impl_o0gnyb(this.ly_1, other);
      }
    }
    initMetadataForClass($, 'ULong', VOID, VOID, [Comparable()]);
    ULongClass = $;
  }
  return ULongClass;
}
//region block: exports
export {
  _ULong___init__impl__c78o9k as _ULong___init__impl__c78o9k1p6qzv0dh0bvg,
  _ULong___get_data__impl__fggpzb as _ULong___get_data__impl__fggpzb2qlkrfp9zs48z,
  ULong__toString_impl_f9au7k as ULong__toString_impl_f9au7kivnvhcxkib53,
  Companion_getInstance as Companion_getInstance1puqqwzccfvrg,
  ULong as ULong3f9k7s38t3rfp,
};
//endregion

//# sourceMappingURL=ULong.mjs.map
