import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { uintCompare18k97xs29243i as uintCompare } from './UnsignedJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { toLongw1zpgk99d84b as toLong } from './js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from './Primitives.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _UInt___init__impl__l7qpdl(data) {
  return data;
}
function _UInt___get_data__impl__f0vqqw($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.vx_1 = _UInt___init__impl__l7qpdl(0);
        this.wx_1 = _UInt___init__impl__l7qpdl(-1);
        this.xx_1 = 4;
        this.yx_1 = 32;
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
function UInt__compareTo_impl_yacclj($this, other) {
  return uintCompare(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other));
}
function UInt__compareTo_impl_yacclj_0($this, other) {
  return UInt__compareTo_impl_yacclj($this.zx_1, other instanceof UInt() ? other.zx_1 : THROW_CCE());
}
function UInt__toString_impl_dbgl21($this) {
  // Inline function 'kotlin.uintToString' call
  // Inline function 'kotlin.uintToLong' call
  var value = _UInt___get_data__impl__f0vqqw($this);
  return toLong(value).s4(new (Long())(-1, 0)).toString();
}
function UInt__hashCode_impl_z2mhuw($this) {
  return $this;
}
function UInt__equals_impl_ffdoxg($this, other) {
  if (!(other instanceof UInt()))
    return false;
  if (!($this === (other instanceof UInt() ? other.zx_1 : THROW_CCE())))
    return false;
  return true;
}
var UIntClass;
function UInt() {
  if (UIntClass === VOID) {
    class $ {
      constructor(data) {
        Companion_getInstance();
        this.zx_1 = data;
      }
      ay(other) {
        return UInt__compareTo_impl_yacclj(this.zx_1, other);
      }
      d(other) {
        return UInt__compareTo_impl_yacclj_0(this, other);
      }
      toString() {
        return UInt__toString_impl_dbgl21(this.zx_1);
      }
      hashCode() {
        return UInt__hashCode_impl_z2mhuw(this.zx_1);
      }
      equals(other) {
        return UInt__equals_impl_ffdoxg(this.zx_1, other);
      }
    }
    initMetadataForClass($, 'UInt', VOID, VOID, [Comparable()]);
    UIntClass = $;
  }
  return UIntClass;
}
//region block: exports
export {
  _UInt___init__impl__l7qpdl as _UInt___init__impl__l7qpdltd1eeof8nsuj,
  _UInt___get_data__impl__f0vqqw as _UInt___get_data__impl__f0vqqw13y1a2xkii3dn,
  UInt__toString_impl_dbgl21 as UInt__toString_impl_dbgl213fqto411a11p0,
  Companion_getInstance as Companion_getInstanceuedpedmz4g65,
  UInt as UInt1hthisrv6cndi,
};
//endregion

//# sourceMappingURL=UInt.mjs.map
