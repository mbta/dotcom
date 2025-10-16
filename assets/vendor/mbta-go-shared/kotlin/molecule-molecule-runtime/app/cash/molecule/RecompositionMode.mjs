import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var RecompositionMode_ContextClock_instance;
var RecompositionMode_Immediate_instance;
var RecompositionMode_entriesInitialized;
function RecompositionMode_initEntries() {
  if (RecompositionMode_entriesInitialized)
    return Unit_instance;
  RecompositionMode_entriesInitialized = true;
  RecompositionMode_ContextClock_instance = new (RecompositionMode())('ContextClock', 0);
  RecompositionMode_Immediate_instance = new (RecompositionMode())('Immediate', 1);
}
var RecompositionModeClass;
function RecompositionMode() {
  if (RecompositionModeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'RecompositionMode');
    RecompositionModeClass = $;
  }
  return RecompositionModeClass;
}
function RecompositionMode_ContextClock_getInstance() {
  RecompositionMode_initEntries();
  return RecompositionMode_ContextClock_instance;
}
//region block: exports
export {
  RecompositionMode_ContextClock_getInstance as RecompositionMode_ContextClock_getInstances3loc9541by9,
};
//endregion

//# sourceMappingURL=RecompositionMode.mjs.map
