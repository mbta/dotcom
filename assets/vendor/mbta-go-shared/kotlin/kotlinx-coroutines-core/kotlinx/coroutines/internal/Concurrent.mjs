import { HashSet2dzve9y63nf0v as HashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function identitySet(expectedSize) {
  return HashSet().b1(expectedSize);
}
var WorkaroundAtomicReferenceClass;
function WorkaroundAtomicReference() {
  if (WorkaroundAtomicReferenceClass === VOID) {
    class $ {
      constructor(value) {
        this.f2r_1 = value;
      }
      r29() {
        return this.f2r_1;
      }
      v2u(value) {
        this.f2r_1 = value;
      }
      h2r(value) {
        var prev = this.f2r_1;
        this.f2r_1 = value;
        return prev;
      }
      g2r(expected, value) {
        if (this.f2r_1 === expected) {
          this.f2r_1 = value;
          return true;
        }
        return false;
      }
    }
    initMetadataForClass($, 'WorkaroundAtomicReference');
    WorkaroundAtomicReferenceClass = $;
  }
  return WorkaroundAtomicReferenceClass;
}
//region block: exports
export {
  WorkaroundAtomicReference as WorkaroundAtomicReferenceffrdgqzvruxm,
  identitySet as identitySet1lu9dl60optk8,
};
//endregion

//# sourceMappingURL=Concurrent.mjs.map
