import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { DataStore1uvzeoqavnttw as DataStore } from '../datastore/DataStore.js.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_SettingsRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockSettingsRepository$stable;
var ISettingsRepositoryClass;
function ISettingsRepository() {
  if (ISettingsRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ISettingsRepository', VOID, VOID, VOID, [0, 1]);
    ISettingsRepositoryClass = $;
  }
  return ISettingsRepositoryClass;
}
function SettingsRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(DataStore()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(DataStore()), tmp2, parameters);
    }
    return tmp;
  };
}
var SettingsRepositoryClass;
function SettingsRepository() {
  if (SettingsRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.xa1_1 = lazy(mode, SettingsRepository$dataStore$delegate$lambda(this, null, null));
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'SettingsRepository', SettingsRepository, VOID, [ISettingsRepository(), KoinComponent()], [0, 1]);
    SettingsRepositoryClass = $;
  }
  return SettingsRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_SettingsRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockSettingsRepository$stable = 8;
//endregion
//region block: exports
export {
  ISettingsRepository as ISettingsRepositorylifn2oq7uzyc,
  SettingsRepository as SettingsRepository3qwnlejb4dsxo,
};
//endregion

//# sourceMappingURL=SettingsRepository.mjs.map
