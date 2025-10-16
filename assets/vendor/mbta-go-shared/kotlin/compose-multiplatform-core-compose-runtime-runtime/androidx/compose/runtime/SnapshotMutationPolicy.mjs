import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function merge(previous, current, applied) {
  return null;
}
var SnapshotMutationPolicyClass;
function SnapshotMutationPolicy() {
  if (SnapshotMutationPolicyClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SnapshotMutationPolicy');
    SnapshotMutationPolicyClass = $;
  }
  return SnapshotMutationPolicyClass;
}
function structuralEqualityPolicy() {
  var tmp = StructuralEqualityPolicy_instance;
  return isInterface(tmp, SnapshotMutationPolicy()) ? tmp : THROW_CCE();
}
var StructuralEqualityPolicyClass;
function StructuralEqualityPolicy() {
  if (StructuralEqualityPolicyClass === VOID) {
    class $ {
      s7d(a, b) {
        return equals(a, b);
      }
      g74(a, b) {
        var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
        return this.s7d(tmp, (b == null ? true : !(b == null)) ? b : THROW_CCE());
      }
      toString() {
        return 'StructuralEqualityPolicy';
      }
    }
    protoOf($).r7d = merge;
    initMetadataForObject($, 'StructuralEqualityPolicy', VOID, VOID, [SnapshotMutationPolicy()]);
    StructuralEqualityPolicyClass = $;
  }
  return StructuralEqualityPolicyClass;
}
var StructuralEqualityPolicy_instance;
function StructuralEqualityPolicy_getInstance() {
  return StructuralEqualityPolicy_instance;
}
//region block: init
StructuralEqualityPolicy_instance = new (StructuralEqualityPolicy())();
//endregion
//region block: exports
export {
  structuralEqualityPolicy as structuralEqualityPolicy37napyzbio62n,
};
//endregion

//# sourceMappingURL=SnapshotMutationPolicy.mjs.map
