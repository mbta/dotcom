import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IAccessibilityStatusRepositoryie5hsx1kk1ap as IAccessibilityStatusRepository } from './AccessibilityStatusRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { DataStore1uvzeoqavnttw as DataStore } from '../datastore/DataStore.js.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { stringSetPreferencesKey1xwq30xy0cjap as stringSetPreferencesKey } from '../datastore/PreferencesKey.js.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_OnboardingRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockOnboardingRepository$stable;
var IOnboardingRepositoryClass;
function IOnboardingRepository() {
  if (IOnboardingRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IOnboardingRepository', VOID, VOID, VOID, [0, 1]);
    IOnboardingRepositoryClass = $;
  }
  return IOnboardingRepositoryClass;
}
function OnboardingRepository$accessibilityStatus$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(IAccessibilityStatusRepository()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(IAccessibilityStatusRepository()), tmp2, parameters);
    }
    return tmp;
  };
}
function OnboardingRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
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
var OnboardingRepositoryClass;
function OnboardingRepository() {
  if (OnboardingRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.i9x_1 = lazy(mode, OnboardingRepository$accessibilityStatus$delegate$lambda(this, null, null));
        var tmp_0 = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode_0 = KoinPlatformTools_instance.s7z();
        tmp_0.j9x_1 = lazy(mode_0, OnboardingRepository$dataStore$delegate$lambda(this, null, null));
        this.k9x_1 = stringSetPreferencesKey('onboardingScreensCompleted');
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'OnboardingRepository', OnboardingRepository, VOID, [IOnboardingRepository(), KoinComponent()], [0, 1]);
    OnboardingRepositoryClass = $;
  }
  return OnboardingRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_OnboardingRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockOnboardingRepository$stable = 8;
//endregion
//region block: exports
export {
  IOnboardingRepository as IOnboardingRepository2p8jayv3sq6ok,
  OnboardingRepository as OnboardingRepository3ebztiagr92ii,
};
//endregion

//# sourceMappingURL=OnboardingRepository.mjs.map
