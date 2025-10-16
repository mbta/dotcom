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
function _UShort___init__impl__jigrne(data) {
  return data;
}
function _UShort___get_data__impl__g0245($this) {
  return $this;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.ty_1 = _UShort___init__impl__jigrne(0);
        this.uy_1 = _UShort___init__impl__jigrne(-1);
        this.vy_1 = 2;
        this.wy_1 = 16;
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
function UShort__compareTo_impl_1pfgyc($this, other) {
  // Inline function 'kotlin.UShort.toInt' call
  var tmp = _UShort___get_data__impl__g0245($this) & 65535;
  // Inline function 'kotlin.UShort.toInt' call
  var tmp$ret$1 = _UShort___get_data__impl__g0245(other) & 65535;
  return compareTo(tmp, tmp$ret$1);
}
function UShort__compareTo_impl_1pfgyc_0($this, other) {
  return UShort__compareTo_impl_1pfgyc($this.xy_1, other instanceof UShort() ? other.xy_1 : THROW_CCE());
}
function UShort__toString_impl_edaoee($this) {
  // Inline function 'kotlin.UShort.toInt' call
  return (_UShort___get_data__impl__g0245($this) & 65535).toString();
}
function UShort__hashCode_impl_ywngrv($this) {
  return $this;
}
function UShort__equals_impl_7t9pdz($this, other) {
  if (!(other instanceof UShort()))
    return false;
  if (!($this === (other instanceof UShort() ? other.xy_1 : THROW_CCE())))
    return false;
  return true;
}
var UShortClass;
function UShort() {
  if (UShortClass === VOID) {
    class $ {
      constructor(data) {
        Companion_getInstance();
        this.xy_1 = data;
      }
      yy(other) {
        return UShort__compareTo_impl_1pfgyc(this.xy_1, other);
      }
      d(other) {
        return UShort__compareTo_impl_1pfgyc_0(this, other);
      }
      toString() {
        return UShort__toString_impl_edaoee(this.xy_1);
      }
      hashCode() {
        return UShort__hashCode_impl_ywngrv(this.xy_1);
      }
      equals(other) {
        return UShort__equals_impl_7t9pdz(this.xy_1, other);
      }
    }
    initMetadataForClass($, 'UShort', VOID, VOID, [Comparable()]);
    UShortClass = $;
  }
  return UShortClass;
}
//region block: exports
export {
  _UShort___init__impl__jigrne as _UShort___init__impl__jigrne2jag2u7194ozm,
  _UShort___get_data__impl__g0245 as _UShort___get_data__impl__g0245hlms5v6vgvnl,
  UShort__toString_impl_edaoee as UShort__toString_impl_edaoee3e5ovvzk9wm4f,
  Companion_getInstance as Companion_getInstance2du03jiluw9jj,
  UShort as UShort26xnqty60t7le,
};
//endregion

//# sourceMappingURL=UShort.mjs.map
