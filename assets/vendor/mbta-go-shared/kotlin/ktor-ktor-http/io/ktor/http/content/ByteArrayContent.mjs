import { ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent } from './OutgoingContent.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ByteArrayContentClass;
function ByteArrayContent_0() {
  if (ByteArrayContentClass === VOID) {
    class $ extends ByteArrayContent() {
      constructor(bytes, contentType, status) {
        contentType = contentType === VOID ? null : contentType;
        status = status === VOID ? null : status;
        super();
        this.a41_1 = bytes;
        this.b41_1 = contentType;
        this.c41_1 = status;
      }
      d41() {
        return this.b41_1;
      }
      e41() {
        return toLong(this.a41_1.length);
      }
      f41() {
        return this.a41_1;
      }
    }
    initMetadataForClass($, 'ByteArrayContent');
    ByteArrayContentClass = $;
  }
  return ByteArrayContentClass;
}
//region block: exports
export {
  ByteArrayContent_0 as ByteArrayContent9zol65b22hp0,
};
//endregion

//# sourceMappingURL=ByteArrayContent.mjs.map
