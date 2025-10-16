import { NoContent1bdx48poqrifq as NoContent } from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var EmptyContentClass;
function EmptyContent() {
  if (EmptyContentClass === VOID) {
    class $ extends NoContent() {
      constructor() {
        EmptyContent_instance = null;
        super();
        EmptyContent_instance = this;
        this.y5t_1 = new (Long())(0, 0);
      }
      e41() {
        return this.y5t_1;
      }
      toString() {
        return 'EmptyContent';
      }
      hashCode() {
        return 1450860306;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof EmptyContent()))
          return false;
        other instanceof EmptyContent() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'EmptyContent');
    EmptyContentClass = $;
  }
  return EmptyContentClass;
}
var EmptyContent_instance;
function EmptyContent_getInstance() {
  if (EmptyContent_instance === VOID)
    new (EmptyContent())();
  return EmptyContent_instance;
}
//region block: exports
export {
  EmptyContent_getInstance as EmptyContent_getInstance116ybdh9l8hek,
};
//endregion

//# sourceMappingURL=Content.mjs.map
