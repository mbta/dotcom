import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KVariance_INVARIANT_instance;
var KVariance_IN_instance;
var KVariance_OUT_instance;
var KVariance_entriesInitialized;
function KVariance_initEntries() {
  if (KVariance_entriesInitialized)
    return Unit_instance;
  KVariance_entriesInitialized = true;
  KVariance_INVARIANT_instance = new (KVariance())('INVARIANT', 0);
  KVariance_IN_instance = new (KVariance())('IN', 1);
  KVariance_OUT_instance = new (KVariance())('OUT', 2);
}
var KVarianceClass;
function KVariance() {
  if (KVarianceClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'KVariance');
    KVarianceClass = $;
  }
  return KVarianceClass;
}
function KVariance_INVARIANT_getInstance() {
  KVariance_initEntries();
  return KVariance_INVARIANT_instance;
}
function KVariance_IN_getInstance() {
  KVariance_initEntries();
  return KVariance_IN_instance;
}
function KVariance_OUT_getInstance() {
  KVariance_initEntries();
  return KVariance_OUT_instance;
}
//region block: exports
export {
  KVariance_INVARIANT_getInstance as KVariance_INVARIANT_getInstancesuq4f4bi5uun,
  KVariance_IN_getInstance as KVariance_IN_getInstance1uylrm5a2m9el,
  KVariance_OUT_getInstance as KVariance_OUT_getInstance10ihzp27e1gd4,
};
//endregion

//# sourceMappingURL=KVariance.mjs.map
