import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SnapshotNotifier_External_instance;
var SnapshotNotifier_WhileActive_instance;
var SnapshotNotifier_entriesInitialized;
function SnapshotNotifier_initEntries() {
  if (SnapshotNotifier_entriesInitialized)
    return Unit_instance;
  SnapshotNotifier_entriesInitialized = true;
  SnapshotNotifier_External_instance = new (SnapshotNotifier())('External', 0);
  SnapshotNotifier_WhileActive_instance = new (SnapshotNotifier())('WhileActive', 1);
}
var SnapshotNotifierClass;
function SnapshotNotifier() {
  if (SnapshotNotifierClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'SnapshotNotifier');
    SnapshotNotifierClass = $;
  }
  return SnapshotNotifierClass;
}
function SnapshotNotifier_WhileActive_getInstance() {
  SnapshotNotifier_initEntries();
  return SnapshotNotifier_WhileActive_instance;
}
//region block: exports
export {
  SnapshotNotifier_WhileActive_getInstance as SnapshotNotifier_WhileActive_getInstance3vrrpxxps06ka,
};
//endregion

//# sourceMappingURL=SnapshotNotifier.mjs.map
