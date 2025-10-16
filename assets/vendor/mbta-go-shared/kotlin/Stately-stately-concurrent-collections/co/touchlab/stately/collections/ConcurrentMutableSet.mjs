import { ConcurrentMutableCollection249ji20neebdi as ConcurrentMutableCollection } from './ConcurrentMutableCollection.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { KtMutableSetwuwn7k5m570a as KtMutableSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ConcurrentMutableSetClass;
function ConcurrentMutableSet() {
  if (ConcurrentMutableSetClass === VOID) {
    class $ extends ConcurrentMutableCollection() {
      static l7u(rootArg, del) {
        var $this = this.d7u(rootArg, del);
        $this.k7u_1 = del;
        return $this;
      }
      static o7u() {
        // Inline function 'kotlin.collections.mutableSetOf' call
        var tmp$ret$0 = LinkedHashSet().f1();
        return this.l7u(null, tmp$ret$0);
      }
    }
    initMetadataForClass($, 'ConcurrentMutableSet', $.o7u, VOID, [ConcurrentMutableCollection(), KtMutableSet()]);
    ConcurrentMutableSetClass = $;
  }
  return ConcurrentMutableSetClass;
}
//region block: exports
export {
  ConcurrentMutableSet as ConcurrentMutableSet1jjjkxl24hnbl,
};
//endregion

//# sourceMappingURL=ConcurrentMutableSet.mjs.map
