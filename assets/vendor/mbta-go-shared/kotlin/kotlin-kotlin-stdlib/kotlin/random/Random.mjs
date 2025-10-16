import { defaultPlatformRandom1jhqtnj1rulyk as defaultPlatformRandom } from './PlatformRandom.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { toByte4i43936u611k as toByte } from '../js/numberConversion.mjs';
import { XorWowRandom4dcuf9lla8j1 as XorWowRandom } from './XorWowRandom.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var DefaultClass;
function Default() {
  if (DefaultClass === VOID) {
    class $ extends Random() {
      static tr() {
        Default_instance = null;
        var $this = this.ur();
        Default_instance = $this;
        $this.sr_1 = defaultPlatformRandom();
        return $this;
      }
      vr(bitCount) {
        return this.sr_1.vr(bitCount);
      }
      ko() {
        return this.sr_1.ko();
      }
      wr(array) {
        return this.sr_1.wr(array);
      }
      xr(array, fromIndex, toIndex) {
        return this.sr_1.xr(array, fromIndex, toIndex);
      }
    }
    initMetadataForObject($, 'Default');
    DefaultClass = $;
  }
  return DefaultClass;
}
var Default_instance;
function Default_getInstance() {
  if (Default_instance === VOID)
    Default().tr();
  return Default_instance;
}
var RandomClass;
function Random() {
  if (RandomClass === VOID) {
    class $ {
      static ur() {
        Default_getInstance();
        return createThis(this);
      }
      ko() {
        return this.vr(32);
      }
      xr(array, fromIndex, toIndex) {
        // Inline function 'kotlin.require' call
        if (!((0 <= fromIndex ? fromIndex <= array.length : false) && (0 <= toIndex ? toIndex <= array.length : false))) {
          var message = 'fromIndex (' + fromIndex + ') or toIndex (' + toIndex + ') are out of range: 0..' + array.length + '.';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(fromIndex <= toIndex)) {
          var message_0 = 'fromIndex (' + fromIndex + ') must be not greater than toIndex (' + toIndex + ').';
          throw IllegalArgumentException().q(toString(message_0));
        }
        var steps = (toIndex - fromIndex | 0) / 4 | 0;
        var position = fromIndex;
        // Inline function 'kotlin.repeat' call
        var inductionVariable = 0;
        if (inductionVariable < steps)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var v = this.ko();
            array[position] = toByte(v);
            array[position + 1 | 0] = toByte(v >>> 8 | 0);
            array[position + 2 | 0] = toByte(v >>> 16 | 0);
            array[position + 3 | 0] = toByte(v >>> 24 | 0);
            position = position + 4 | 0;
          }
           while (inductionVariable < steps);
        var remainder = toIndex - position | 0;
        var vr = this.vr(imul(remainder, 8));
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < remainder)
          do {
            var i = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            array[position + i | 0] = toByte(vr >>> imul(i, 8) | 0);
          }
           while (inductionVariable_0 < remainder);
        return array;
      }
      wr(array) {
        return this.xr(array, 0, array.length);
      }
    }
    initMetadataForClass($, 'Random');
    RandomClass = $;
  }
  return RandomClass;
}
function Random_0(seed) {
  return XorWowRandom().es(seed, seed >> 31);
}
function takeUpperBits(_this__u8e3s4, bitCount) {
  return (_this__u8e3s4 >>> (32 - bitCount | 0) | 0) & (-bitCount | 0) >> 31;
}
function Random_1(seed) {
  return XorWowRandom().es(seed.f2(), seed.q4(32).f2());
}
//region block: exports
export {
  Random_1 as Randomei1bbeye8rr8,
  Random_0 as Random2w0u2xak2xaqi,
  Random as Random24dxadk52mliy,
  takeUpperBits as takeUpperBits23varjnd7v1uz,
};
//endregion

//# sourceMappingURL=Random.mjs.map
