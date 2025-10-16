import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Sentry_getInstance2nu7bn85wkick as Sentry_getInstance } from '../../../../../../sentry-kotlin-multiplatform-sdk-sentry-kotlin-multiplatform/io/sentry/kotlin/multiplatform/SentryKMP.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_SentryRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockSentryRepository$stable;
var ISentryRepositoryClass;
function ISentryRepository() {
  if (ISentryRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ISentryRepository');
    ISentryRepositoryClass = $;
  }
  return ISentryRepositoryClass;
}
function SentryRepository$captureMessage$lambda($additionalDetails) {
  return function (it) {
    $additionalDetails(it);
    return Unit_instance;
  };
}
var SentryRepositoryClass;
function SentryRepository() {
  if (SentryRepositoryClass === VOID) {
    class $ {
      va1(msg, additionalDetails) {
        var tmp = Sentry_getInstance();
        tmp.w1z(msg, SentryRepository$captureMessage$lambda(additionalDetails));
      }
      wa1(throwable) {
        Sentry_getInstance().y1z(throwable);
      }
    }
    initMetadataForClass($, 'SentryRepository', SentryRepository, VOID, [ISentryRepository()]);
    SentryRepositoryClass = $;
  }
  return SentryRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_SentryRepository$stable = 0;
com_mbta_tid_mbta_app_repositories_MockSentryRepository$stable = 0;
//endregion
//region block: exports
export {
  ISentryRepository as ISentryRepository315w00k1ryhdb,
  SentryRepository as SentryRepository3cyywv58qekp4,
};
//endregion

//# sourceMappingURL=SentryRepository.mjs.map
