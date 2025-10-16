import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AlertSignificance_None_instance;
var AlertSignificance_Minor_instance;
var AlertSignificance_Accessibility_instance;
var AlertSignificance_Secondary_instance;
var AlertSignificance_Major_instance;
function values() {
  return [AlertSignificance_None_getInstance(), AlertSignificance_Minor_getInstance(), AlertSignificance_Accessibility_getInstance(), AlertSignificance_Secondary_getInstance(), AlertSignificance_Major_getInstance()];
}
var AlertSignificance_entriesInitialized;
function AlertSignificance_initEntries() {
  if (AlertSignificance_entriesInitialized)
    return Unit_instance;
  AlertSignificance_entriesInitialized = true;
  AlertSignificance_None_instance = new (AlertSignificance())('None', 0);
  AlertSignificance_Minor_instance = new (AlertSignificance())('Minor', 1);
  AlertSignificance_Accessibility_instance = new (AlertSignificance())('Accessibility', 2);
  AlertSignificance_Secondary_instance = new (AlertSignificance())('Secondary', 3);
  AlertSignificance_Major_instance = new (AlertSignificance())('Major', 4);
}
var AlertSignificanceClass;
function AlertSignificance() {
  if (AlertSignificanceClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'AlertSignificance', VOID, VOID, [Comparable(), Enum()]);
    AlertSignificanceClass = $;
  }
  return AlertSignificanceClass;
}
function AlertSignificance_None_getInstance() {
  AlertSignificance_initEntries();
  return AlertSignificance_None_instance;
}
function AlertSignificance_Minor_getInstance() {
  AlertSignificance_initEntries();
  return AlertSignificance_Minor_instance;
}
function AlertSignificance_Accessibility_getInstance() {
  AlertSignificance_initEntries();
  return AlertSignificance_Accessibility_instance;
}
function AlertSignificance_Secondary_getInstance() {
  AlertSignificance_initEntries();
  return AlertSignificance_Secondary_instance;
}
function AlertSignificance_Major_getInstance() {
  AlertSignificance_initEntries();
  return AlertSignificance_Major_instance;
}
//region block: exports
export {
  values as values3a9ox09appykn,
  AlertSignificance_Accessibility_getInstance as AlertSignificance_Accessibility_getInstancec2xro2s82n06,
  AlertSignificance_Major_getInstance as AlertSignificance_Major_getInstance8pdy9s33p31v,
  AlertSignificance_Minor_getInstance as AlertSignificance_Minor_getInstance1p7hf5pf8k8bq,
  AlertSignificance_None_getInstance as AlertSignificance_None_getInstance5wj86mbn8qnl,
  AlertSignificance_Secondary_getInstance as AlertSignificance_Secondary_getInstance3jci293j5swh0,
};
//endregion

//# sourceMappingURL=AlertSignificance.mjs.map
