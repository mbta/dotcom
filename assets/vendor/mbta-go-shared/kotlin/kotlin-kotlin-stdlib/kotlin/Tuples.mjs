import { toString30pk9tzaqopn as toString } from './Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from './js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var PairClass;
function Pair() {
  if (PairClass === VOID) {
    class $ {
      constructor(first, second) {
        this.ah_1 = first;
        this.bh_1 = second;
      }
      toString() {
        return '(' + toString(this.ah_1) + ', ' + toString(this.bh_1) + ')';
      }
      ch() {
        return this.ah_1;
      }
      dh() {
        return this.bh_1;
      }
      hashCode() {
        var result = this.ah_1 == null ? 0 : hashCode(this.ah_1);
        result = imul(result, 31) + (this.bh_1 == null ? 0 : hashCode(this.bh_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Pair()))
          return false;
        var tmp0_other_with_cast = other instanceof Pair() ? other : THROW_CCE();
        if (!equals(this.ah_1, tmp0_other_with_cast.ah_1))
          return false;
        if (!equals(this.bh_1, tmp0_other_with_cast.bh_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Pair');
    PairClass = $;
  }
  return PairClass;
}
function to(_this__u8e3s4, that) {
  return new (Pair())(_this__u8e3s4, that);
}
var TripleClass;
function Triple() {
  if (TripleClass === VOID) {
    class $ {
      constructor(first, second, third) {
        this.zw_1 = first;
        this.ax_1 = second;
        this.bx_1 = third;
      }
      toString() {
        return '(' + toString(this.zw_1) + ', ' + toString(this.ax_1) + ', ' + toString(this.bx_1) + ')';
      }
      hashCode() {
        var result = this.zw_1 == null ? 0 : hashCode(this.zw_1);
        result = imul(result, 31) + (this.ax_1 == null ? 0 : hashCode(this.ax_1)) | 0;
        result = imul(result, 31) + (this.bx_1 == null ? 0 : hashCode(this.bx_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Triple()))
          return false;
        var tmp0_other_with_cast = other instanceof Triple() ? other : THROW_CCE();
        if (!equals(this.zw_1, tmp0_other_with_cast.zw_1))
          return false;
        if (!equals(this.ax_1, tmp0_other_with_cast.ax_1))
          return false;
        if (!equals(this.bx_1, tmp0_other_with_cast.bx_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Triple');
    TripleClass = $;
  }
  return TripleClass;
}
//region block: exports
export {
  Pair as Paire9pteg33gng7,
  Triple as Triple1vhi3d0dgpnjb,
  to as to2cs3ny02qtbcb,
};
//endregion

//# sourceMappingURL=Tuples.mjs.map
