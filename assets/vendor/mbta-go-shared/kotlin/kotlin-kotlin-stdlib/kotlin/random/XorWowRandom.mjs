import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  Random24dxadk52mliy as Random,
  takeUpperBits23varjnd7v1uz as takeUpperBits,
} from './Random.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.fs_1 = new (Long())(0, 0);
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
var XorWowRandomClass;
function XorWowRandom() {
  if (XorWowRandomClass === VOID) {
    class $ extends Random() {
      static gs(x, y, z, w, v, addend) {
        Companion_getInstance();
        var $this = this.ur();
        $this.yr_1 = x;
        $this.zr_1 = y;
        $this.as_1 = z;
        $this.bs_1 = w;
        $this.cs_1 = v;
        $this.ds_1 = addend;
        // Inline function 'kotlin.require' call
        if (!!(($this.yr_1 | $this.zr_1 | $this.as_1 | $this.bs_1 | $this.cs_1) === 0)) {
          var message = 'Initial state must have at least one non-zero element.';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.repeat' call
        var inductionVariable = 0;
        if (inductionVariable < 64)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            $this.ko();
          }
           while (inductionVariable < 64);
        return $this;
      }
      static es(seed1, seed2) {
        Companion_getInstance();
        return this.gs(seed1, seed2, 0, 0, ~seed1, seed1 << 10 ^ (seed2 >>> 4 | 0));
      }
      ko() {
        var t = this.yr_1;
        t = t ^ (t >>> 2 | 0);
        this.yr_1 = this.zr_1;
        this.zr_1 = this.as_1;
        this.as_1 = this.bs_1;
        var v0 = this.cs_1;
        this.bs_1 = v0;
        t = t ^ t << 1 ^ v0 ^ v0 << 4;
        this.cs_1 = t;
        this.ds_1 = this.ds_1 + 362437 | 0;
        return t + this.ds_1 | 0;
      }
      vr(bitCount) {
        return takeUpperBits(this.ko(), bitCount);
      }
    }
    initMetadataForClass($, 'XorWowRandom');
    XorWowRandomClass = $;
  }
  return XorWowRandomClass;
}
//region block: exports
export {
  XorWowRandom as XorWowRandom4dcuf9lla8j1,
};
//endregion

//# sourceMappingURL=XorWowRandom.mjs.map
