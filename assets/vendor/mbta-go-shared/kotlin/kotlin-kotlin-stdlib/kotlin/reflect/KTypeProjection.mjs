import { KVariance_INVARIANT_getInstancesuq4f4bi5uun as KVariance_INVARIANT_getInstance } from './KVariance.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString_0,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.ph_1 = new (KTypeProjection())(null, null);
      }
      qh() {
        return this.ph_1;
      }
      rh(type) {
        return new (KTypeProjection())(KVariance_INVARIANT_getInstance(), type);
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
var KTypeProjectionClass;
function KTypeProjection() {
  if (KTypeProjectionClass === VOID) {
    class $ {
      constructor(variance, type) {
        Companion_getInstance();
        this.mt_1 = variance;
        this.nt_1 = type;
        // Inline function 'kotlin.require' call
        if (!(this.mt_1 == null === (this.nt_1 == null))) {
          var message = this.mt_1 == null ? 'Star projection must have no type specified.' : 'The projection variance ' + toString(this.mt_1) + ' requires type to be specified.';
          throw IllegalArgumentException().q(toString_0(message));
        }
      }
      toString() {
        var tmp0_subject = this.mt_1;
        var tmp;
        switch (tmp0_subject == null ? -1 : tmp0_subject.x3_1) {
          case -1:
            tmp = '*';
            break;
          case 0:
            tmp = toString(this.nt_1);
            break;
          case 1:
            tmp = 'in ' + toString(this.nt_1);
            break;
          case 2:
            tmp = 'out ' + toString(this.nt_1);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
      }
      hashCode() {
        var result = this.mt_1 == null ? 0 : this.mt_1.hashCode();
        result = imul(result, 31) + (this.nt_1 == null ? 0 : hashCode(this.nt_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof KTypeProjection()))
          return false;
        var tmp0_other_with_cast = other instanceof KTypeProjection() ? other : THROW_CCE();
        if (!equals(this.mt_1, tmp0_other_with_cast.mt_1))
          return false;
        if (!equals(this.nt_1, tmp0_other_with_cast.nt_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'KTypeProjection');
    KTypeProjectionClass = $;
  }
  return KTypeProjectionClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3g08w0on7qs6d,
};
//endregion

//# sourceMappingURL=KTypeProjection.mjs.map
