import { emptyMapr06gerzljqtm as emptyMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CopyOnWriteHashMapClass;
function CopyOnWriteHashMap() {
  if (CopyOnWriteHashMapClass === VOID) {
    class $ {
      constructor() {
        this.u3j_1 = atomic$ref$1(emptyMap());
      }
      v3j(key) {
        return this.u3j_1.kotlinx$atomicfu$value.j3(key);
      }
    }
    initMetadataForClass($, 'CopyOnWriteHashMap', CopyOnWriteHashMap);
    CopyOnWriteHashMapClass = $;
  }
  return CopyOnWriteHashMapClass;
}
//region block: exports
export {
  CopyOnWriteHashMap as CopyOnWriteHashMap2wz01l72sexe7,
};
//endregion

//# sourceMappingURL=CopyOnWriteHashMap.mjs.map
