import { SentryBridge1bfk2u2dejxty as SentryBridge } from './SentryBridge.commonStub.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SentryClass;
function Sentry() {
  if (SentryClass === VOID) {
    class $ {
      constructor() {
        Sentry_instance = this;
        this.v1z_1 = new (SentryBridge())();
      }
      w1z(message, scopeCallback) {
        return this.v1z_1.w1z(message, scopeCallback);
      }
      y1z(throwable) {
        return this.v1z_1.y1z(throwable);
      }
    }
    initMetadataForObject($, 'Sentry');
    SentryClass = $;
  }
  return SentryClass;
}
var Sentry_instance;
function Sentry_getInstance() {
  if (Sentry_instance === VOID)
    new (Sentry())();
  return Sentry_instance;
}
//region block: exports
export {
  Sentry_getInstance as Sentry_getInstance2nu7bn85wkick,
};
//endregion

//# sourceMappingURL=SentryKMP.mjs.map
