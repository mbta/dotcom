import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { compareTo3ankvs086tmwq as compareTo } from './js/compareTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _UByte___init__impl__g9hnc4(data) {
  return data;
}
function _UByte___get_data__impl__jof9qr($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.jx_1 = _UByte___init__impl__g9hnc4(0);
        this.kx_1 = _UByte___init__impl__g9hnc4(-1);
        this.lx_1 = 1;
        this.mx_1 = 8;
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
function UByte__compareTo_impl_5w5192($this, other) {
  // Inline function 'kotlin.UByte.toInt' call
  var tmp = _UByte___get_data__impl__jof9qr($this) & 255;
  // Inline function 'kotlin.UByte.toInt' call
  var tmp$ret$1 = _UByte___get_data__impl__jof9qr(other) & 255;
  return compareTo(tmp, tmp$ret$1);
}
function UByte__compareTo_impl_5w5192_0($this, other) {
  return UByte__compareTo_impl_5w5192($this.nx_1, other instanceof UByte() ? other.nx_1 : THROW_CCE());
}
function UByte__toString_impl_v72jg($this) {
  // Inline function 'kotlin.UByte.toInt' call
  return (_UByte___get_data__impl__jof9qr($this) & 255).toString();
}
function UByte__hashCode_impl_mmczcb($this) {
  return $this;
}
function UByte__equals_impl_nvqtsf($this, other) {
  if (!(other instanceof UByte()))
    return false;
  if (!($this === (other instanceof UByte() ? other.nx_1 : THROW_CCE())))
    return false;
  return true;
}
var UByteClass;
function UByte() {
  if (UByteClass === VOID) {
    class $ {
      constructor(data) {
        Companion_getInstance();
        this.nx_1 = data;
      }
      ox(other) {
        return UByte__compareTo_impl_5w5192(this.nx_1, other);
      }
      d(other) {
        return UByte__compareTo_impl_5w5192_0(this, other);
      }
      toString() {
        return UByte__toString_impl_v72jg(this.nx_1);
      }
      hashCode() {
        return UByte__hashCode_impl_mmczcb(this.nx_1);
      }
      equals(other) {
        return UByte__equals_impl_nvqtsf(this.nx_1, other);
      }
    }
    initMetadataForClass($, 'UByte', VOID, VOID, [Comparable()]);
    UByteClass = $;
  }
  return UByteClass;
}
//region block: exports
export {
  _UByte___init__impl__g9hnc4 as _UByte___init__impl__g9hnc43ude1dscg1q30,
  _UByte___get_data__impl__jof9qr as _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8,
  UByte__toString_impl_v72jg as UByte__toString_impl_v72jg2vnfngefiworp,
  Companion_getInstance as Companion_getInstance1trnkq9cty7vr,
  UByte as UBytep4j7r1t64gz1,
};
//endregion

//# sourceMappingURL=UByte.mjs.map
