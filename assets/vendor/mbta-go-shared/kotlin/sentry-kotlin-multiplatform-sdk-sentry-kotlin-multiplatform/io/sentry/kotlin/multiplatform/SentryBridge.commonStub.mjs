import { SentryPlatformInstance1589sb9qbvvfk as SentryPlatformInstance } from './SentryPlatformInstance.commonStub.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Companion_getInstance98pi9g875a7q as Companion_getInstance } from './protocol/SentryId.commonStub.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SentryBridgeClass;
function SentryBridge() {
  if (SentryBridgeClass === VOID) {
    class $ {
      constructor(sentryInstance) {
        sentryInstance = sentryInstance === VOID ? new (SentryPlatformInstance())() : sentryInstance;
        this.x1z_1 = sentryInstance;
      }
      w1z(message, scopeCallback) {
        return Companion_getInstance().h20_1;
      }
      y1z(throwable) {
        return Companion_getInstance().h20_1;
      }
    }
    initMetadataForClass($, 'SentryBridge', SentryBridge);
    SentryBridgeClass = $;
  }
  return SentryBridgeClass;
}
//region block: exports
export {
  SentryBridge as SentryBridge1bfk2u2dejxty,
};
//endregion

//# sourceMappingURL=SentryBridge.commonStub.mjs.map
