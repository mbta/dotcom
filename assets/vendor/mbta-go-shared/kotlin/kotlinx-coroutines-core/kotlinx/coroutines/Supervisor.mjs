import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { JobImpl2fbttqo93wxua as JobImpl } from './JobSupport.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function SupervisorJob(parent) {
  parent = parent === VOID ? null : parent;
  return new (SupervisorJobImpl())(parent);
}
var SupervisorJobImplClass;
function SupervisorJobImpl() {
  if (SupervisorJobImplClass === VOID) {
    class $ extends JobImpl() {
      k22(cause) {
        return false;
      }
    }
    initMetadataForClass($, 'SupervisorJobImpl', VOID, VOID, VOID, [0]);
    SupervisorJobImplClass = $;
  }
  return SupervisorJobImplClass;
}
//region block: exports
export {
  SupervisorJob as SupervisorJobythnfxkr3jxc,
};
//endregion

//# sourceMappingURL=Supervisor.mjs.map
