import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function loadKoinModules$default(modules, createEagerInstances, $super) {
  createEagerInstances = createEagerInstances === VOID ? false : createEagerInstances;
  var tmp;
  if ($super === VOID) {
    this.x7v(modules, createEagerInstances);
    tmp = Unit_instance;
  } else {
    tmp = $super.x7v.call(this, modules, createEagerInstances);
  }
  return tmp;
}
var KoinContextClass;
function KoinContext() {
  if (KoinContextClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'KoinContext');
    KoinContextClass = $;
  }
  return KoinContextClass;
}
//region block: exports
export {
  loadKoinModules$default as loadKoinModules$default2smh6iwqchb2f,
  KoinContext as KoinContextwmbx1izeuzb6,
};
//endregion

//# sourceMappingURL=KoinContext.mjs.map
