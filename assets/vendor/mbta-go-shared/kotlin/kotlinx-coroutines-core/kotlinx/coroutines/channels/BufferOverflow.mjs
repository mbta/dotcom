import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var BufferOverflow_SUSPEND_instance;
var BufferOverflow_DROP_OLDEST_instance;
var BufferOverflow_DROP_LATEST_instance;
var BufferOverflow_entriesInitialized;
function BufferOverflow_initEntries() {
  if (BufferOverflow_entriesInitialized)
    return Unit_instance;
  BufferOverflow_entriesInitialized = true;
  BufferOverflow_SUSPEND_instance = new (BufferOverflow())('SUSPEND', 0);
  BufferOverflow_DROP_OLDEST_instance = new (BufferOverflow())('DROP_OLDEST', 1);
  BufferOverflow_DROP_LATEST_instance = new (BufferOverflow())('DROP_LATEST', 2);
}
var BufferOverflowClass;
function BufferOverflow() {
  if (BufferOverflowClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'BufferOverflow');
    BufferOverflowClass = $;
  }
  return BufferOverflowClass;
}
function BufferOverflow_SUSPEND_getInstance() {
  BufferOverflow_initEntries();
  return BufferOverflow_SUSPEND_instance;
}
function BufferOverflow_DROP_OLDEST_getInstance() {
  BufferOverflow_initEntries();
  return BufferOverflow_DROP_OLDEST_instance;
}
function BufferOverflow_DROP_LATEST_getInstance() {
  BufferOverflow_initEntries();
  return BufferOverflow_DROP_LATEST_instance;
}
//region block: exports
export {
  BufferOverflow_DROP_LATEST_getInstance as BufferOverflow_DROP_LATEST_getInstance143zua7beeutm,
  BufferOverflow_DROP_OLDEST_getInstance as BufferOverflow_DROP_OLDEST_getInstance1vyzet7fbhkje,
  BufferOverflow_SUSPEND_getInstance as BufferOverflow_SUSPEND_getInstance142kaabh2rhtl,
};
//endregion

//# sourceMappingURL=BufferOverflow.mjs.map
