import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../Enum.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_COROUTINE_SUSPENDED() {
  return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
}
var CoroutineSingletons_COROUTINE_SUSPENDED_instance;
var CoroutineSingletons_UNDECIDED_instance;
var CoroutineSingletons_RESUMED_instance;
var CoroutineSingletons_entriesInitialized;
function CoroutineSingletons_initEntries() {
  if (CoroutineSingletons_entriesInitialized)
    return Unit_instance;
  CoroutineSingletons_entriesInitialized = true;
  CoroutineSingletons_COROUTINE_SUSPENDED_instance = new (CoroutineSingletons())('COROUTINE_SUSPENDED', 0);
  CoroutineSingletons_UNDECIDED_instance = new (CoroutineSingletons())('UNDECIDED', 1);
  CoroutineSingletons_RESUMED_instance = new (CoroutineSingletons())('RESUMED', 2);
}
var CoroutineSingletonsClass;
function CoroutineSingletons() {
  if (CoroutineSingletonsClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'CoroutineSingletons');
    CoroutineSingletonsClass = $;
  }
  return CoroutineSingletonsClass;
}
function CoroutineSingletons_COROUTINE_SUSPENDED_getInstance() {
  CoroutineSingletons_initEntries();
  return CoroutineSingletons_COROUTINE_SUSPENDED_instance;
}
function CoroutineSingletons_UNDECIDED_getInstance() {
  CoroutineSingletons_initEntries();
  return CoroutineSingletons_UNDECIDED_instance;
}
function CoroutineSingletons_RESUMED_getInstance() {
  CoroutineSingletons_initEntries();
  return CoroutineSingletons_RESUMED_instance;
}
//region block: exports
export {
  CoroutineSingletons_RESUMED_getInstance as CoroutineSingletons_RESUMED_getInstance124zs1clghi22,
  CoroutineSingletons_UNDECIDED_getInstance as CoroutineSingletons_UNDECIDED_getInstancetignxv5433yb,
  get_COROUTINE_SUSPENDED as get_COROUTINE_SUSPENDED3ujt3p13qm4iy,
};
//endregion

//# sourceMappingURL=Intrinsics.mjs.map
