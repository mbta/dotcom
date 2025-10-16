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
var com_mbta_tid_mbta_app_repositories_NearbyRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockNearbyRepository$stable;
var com_mbta_tid_mbta_app_repositories_IdleNearbyRepository$stable;
var INearbyRepositoryClass;
function INearbyRepository() {
  if (INearbyRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'INearbyRepository');
    INearbyRepositoryClass = $;
  }
  return INearbyRepositoryClass;
}
var NearbyRepositoryClass;
function NearbyRepository() {
  if (NearbyRepositoryClass === VOID) {
    class $ {}
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'NearbyRepository', NearbyRepository, VOID, [KoinComponent(), INearbyRepository()]);
    NearbyRepositoryClass = $;
  }
  return NearbyRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_NearbyRepository$stable = 0;
com_mbta_tid_mbta_app_repositories_MockNearbyRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_IdleNearbyRepository$stable = 0;
//endregion
//region block: exports
export {
  INearbyRepository as INearbyRepositoryxu1gi8x6334m,
  NearbyRepository as NearbyRepository1gd7cq4jto2un,
};
//endregion

//# sourceMappingURL=NearbyRepository.mjs.map
