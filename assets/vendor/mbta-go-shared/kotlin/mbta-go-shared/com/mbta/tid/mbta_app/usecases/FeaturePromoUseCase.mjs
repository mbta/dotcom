import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
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
var com_mbta_tid_mbta_app_usecases_FeaturePromoUseCase$stable;
var IFeaturePromoUseCaseClass;
function IFeaturePromoUseCase() {
  if (IFeaturePromoUseCaseClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IFeaturePromoUseCase', VOID, VOID, VOID, [0]);
    IFeaturePromoUseCaseClass = $;
  }
  return IFeaturePromoUseCaseClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.bac_1 = 2;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var FeaturePromoUseCaseClass;
function FeaturePromoUseCase() {
  if (FeaturePromoUseCaseClass === VOID) {
    class $ {
      constructor(currentAppVersionRepository, lastLaunchedAppVersionRepository) {
        this.cac_1 = currentAppVersionRepository;
        this.dac_1 = lastLaunchedAppVersionRepository;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'FeaturePromoUseCase', VOID, VOID, [IFeaturePromoUseCase(), KoinComponent()], [0]);
    FeaturePromoUseCaseClass = $;
  }
  return FeaturePromoUseCaseClass;
}
//region block: init
com_mbta_tid_mbta_app_usecases_FeaturePromoUseCase$stable = 0;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  FeaturePromoUseCase as FeaturePromoUseCaser136xobpsuc2,
  IFeaturePromoUseCase as IFeaturePromoUseCase1m3whbdmf3u1,
};
//endregion

//# sourceMappingURL=FeaturePromoUseCase.mjs.map
