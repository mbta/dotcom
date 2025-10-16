import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  close1s6qtnweux4fu as close,
  ObjectPool3iks1t8z0qq3m as ObjectPool,
} from './Pool.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DefaultPoolClass;
function DefaultPool() {
  if (DefaultPoolClass === VOID) {
    class $ {
      constructor(capacity) {
        this.j3g_1 = capacity;
        var tmp = this;
        // Inline function 'kotlin.arrayOfNulls' call
        var size = this.j3g_1;
        tmp.k3g_1 = Array(size);
        this.l3g_1 = 0;
      }
      m3g(instance) {
      }
      n3g(instance) {
        return instance;
      }
      o3g(instance) {
      }
      p3g() {
        if (this.l3g_1 === 0)
          return this.i3g();
        this.l3g_1 = this.l3g_1 - 1 | 0;
        var idx = this.l3g_1;
        var tmp = this.k3g_1[idx];
        var instance = !(tmp == null) ? tmp : THROW_CCE();
        this.k3g_1[idx] = null;
        return this.n3g(instance);
      }
      q3g(instance) {
        this.o3g(instance);
        if (this.l3g_1 === this.j3g_1) {
          this.m3g(instance);
        } else {
          var _unary__edvuaz = this.l3g_1;
          this.l3g_1 = _unary__edvuaz + 1 | 0;
          this.k3g_1[_unary__edvuaz] = instance;
        }
      }
      z24() {
        var inductionVariable = 0;
        var last = this.l3g_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = this.k3g_1[i];
            var instance = !(tmp == null) ? tmp : THROW_CCE();
            this.k3g_1[i] = null;
            this.m3g(instance);
          }
           while (inductionVariable < last);
        this.l3g_1 = 0;
      }
    }
    protoOf($).v6 = close;
    initMetadataForClass($, 'DefaultPool', VOID, VOID, [ObjectPool()]);
    DefaultPoolClass = $;
  }
  return DefaultPoolClass;
}
//region block: exports
export {
  DefaultPool as DefaultPool2gb1fm4epwgu9,
};
//endregion

//# sourceMappingURL=DefaultPool.mjs.map
