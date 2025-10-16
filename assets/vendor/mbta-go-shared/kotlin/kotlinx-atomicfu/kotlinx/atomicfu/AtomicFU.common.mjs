import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from './AtomicFU.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var atomicfu$AtomicRefArray$refClass;
function atomicfu$AtomicRefArray$ref() {
  if (atomicfu$AtomicRefArray$refClass === VOID) {
    class $ {
      constructor(size) {
        var tmp = this;
        var tmp_0 = 0;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_1 = Array(size);
        while (tmp_0 < size) {
          tmp_1[tmp_0] = atomic$ref$1(null);
          tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.j20_1 = tmp_1;
      }
      k20() {
        return this.j20_1.length;
      }
      atomicfu$get(index) {
        return this.j20_1[index];
      }
      get atomicfu$size() {
        return this.k20();
      }
    }
    initMetadataForClass($, 'AtomicArray');
    atomicfu$AtomicRefArray$refClass = $;
  }
  return atomicfu$AtomicRefArray$refClass;
}
function atomicfu$AtomicRefArray$ofNulls(size) {
  return new (atomicfu$AtomicRefArray$ref())(size);
}
//region block: exports
export {
  atomicfu$AtomicRefArray$ofNulls as atomicfu$AtomicRefArray$ofNulls2kz3j9ehigwa3,
};
//endregion

//# sourceMappingURL=AtomicFU.common.mjs.map
