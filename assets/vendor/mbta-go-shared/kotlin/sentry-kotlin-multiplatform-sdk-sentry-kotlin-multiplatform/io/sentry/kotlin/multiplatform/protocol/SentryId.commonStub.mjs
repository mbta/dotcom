import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.h20_1 = new (SentryId())('');
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var SentryIdClass;
function SentryId() {
  if (SentryIdClass === VOID) {
    class $ {
      constructor(sentryIdString) {
        Companion_getInstance();
        this.i20_1 = sentryIdString;
      }
      toString() {
        return this.i20_1;
      }
      hashCode() {
        return getStringHashCode(this.i20_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SentryId()))
          return false;
        var tmp0_other_with_cast = other instanceof SentryId() ? other : THROW_CCE();
        if (!(this.i20_1 === tmp0_other_with_cast.i20_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'SentryId');
    SentryIdClass = $;
  }
  return SentryIdClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance98pi9g875a7q,
};
//endregion

//# sourceMappingURL=SentryId.commonStub.mjs.map
