import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_VehiclesRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockVehiclesRepository$stable;
var IVehiclesRepositoryClass;
function IVehiclesRepository() {
  if (IVehiclesRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IVehiclesRepository');
    IVehiclesRepositoryClass = $;
  }
  return IVehiclesRepositoryClass;
}
var VehiclesRepositoryClass;
function VehiclesRepository() {
  if (VehiclesRepositoryClass === VOID) {
    class $ {
      constructor(socket) {
        this.ga5_1 = socket;
        this.ha5_1 = null;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'VehiclesRepository', VOID, VOID, [IVehiclesRepository(), KoinComponent()]);
    VehiclesRepositoryClass = $;
  }
  return VehiclesRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_VehiclesRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockVehiclesRepository$stable = 8;
//endregion
//region block: exports
export {
  IVehiclesRepository as IVehiclesRepository9ibwaycj4c7r,
  VehiclesRepository as VehiclesRepository3m770e4oxd4zi,
};
//endregion

//# sourceMappingURL=VehiclesRepository.mjs.map
