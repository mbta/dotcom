import { ByteChannel3cxdguezl3lu7 as ByteChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteChannel.mjs';
import { NoContent1bdx48poqrifq as NoContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ClientUpgradeContent$content$delegate$lambda() {
  return new (ByteChannel())();
}
var ClientUpgradeContentClass;
function ClientUpgradeContent() {
  if (ClientUpgradeContentClass === VOID) {
    class $ extends NoContent() {
      constructor() {
        super();
        var tmp = this;
        tmp.e5p_1 = lazy(ClientUpgradeContent$content$delegate$lambda);
      }
    }
    initMetadataForClass($, 'ClientUpgradeContent', VOID, VOID, VOID, [1]);
    ClientUpgradeContentClass = $;
  }
  return ClientUpgradeContentClass;
}
//region block: exports
export {
  ClientUpgradeContent as ClientUpgradeContent299vg0lx1tyfp,
};
//endregion

//# sourceMappingURL=ClientUpgradeContent.mjs.map
