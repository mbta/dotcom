import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_usecases_ConfigUseCase$stable;
var ConfigUseCaseClass;
function ConfigUseCase() {
  if (ConfigUseCaseClass === VOID) {
    class $ {
      constructor(configRepo, sentryRepo) {
        this.xaa_1 = configRepo;
        this.yaa_1 = sentryRepo;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'ConfigUseCase', VOID, VOID, [KoinComponent()], [0]);
    ConfigUseCaseClass = $;
  }
  return ConfigUseCaseClass;
}
//region block: init
com_mbta_tid_mbta_app_usecases_ConfigUseCase$stable = 0;
//endregion
//region block: exports
export {
  ConfigUseCase as ConfigUseCase25njxgdei3kzw,
};
//endregion

//# sourceMappingURL=ConfigUseCase.mjs.map
