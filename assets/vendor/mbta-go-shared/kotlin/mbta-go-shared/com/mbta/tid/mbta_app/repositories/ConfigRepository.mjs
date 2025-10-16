import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { MobileBackendClientz9b3ukda94t9 as MobileBackendClient } from '../network/MobileBackendClient.mjs';
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
var com_mbta_tid_mbta_app_repositories_ConfigRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockConfigRepository$stable;
var IConfigRepositoryClass;
function IConfigRepository() {
  if (IConfigRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IConfigRepository', VOID, VOID, VOID, [0]);
    IConfigRepositoryClass = $;
  }
  return IConfigRepositoryClass;
}
function ConfigRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(MobileBackendClient()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(MobileBackendClient()), tmp2, parameters);
    }
    return tmp;
  };
}
var ConfigRepositoryClass;
function ConfigRepository() {
  if (ConfigRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.j9t_1 = lazy(mode, ConfigRepository$mobileBackendClient$delegate$lambda(this, null, null));
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'ConfigRepository', ConfigRepository, VOID, [IConfigRepository(), KoinComponent()], [0]);
    ConfigRepositoryClass = $;
  }
  return ConfigRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_ConfigRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockConfigRepository$stable = 8;
//endregion
//region block: exports
export {
  ConfigRepository as ConfigRepository3e4pitxg8by2e,
  IConfigRepository as IConfigRepository35mprll55mz3v,
};
//endregion

//# sourceMappingURL=ConfigRepository.mjs.map
