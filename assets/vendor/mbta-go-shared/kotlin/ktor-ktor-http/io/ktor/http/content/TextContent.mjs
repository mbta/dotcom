import { ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent } from './OutgoingContent.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { charset1dribv3ku48b1 as charset } from '../ContentTypes.mjs';
import { Charsets_getInstanceqs70pvl4noow as Charsets_getInstance } from '../../../../../ktor-ktor-io/io/ktor/utils/io/charsets/Charset.js.mjs';
import { toByteArray1i3ns5jnoqlv6 as toByteArray } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { take9j4462mea726 as take } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TextContentClass;
function TextContent() {
  if (TextContentClass === VOID) {
    class $ extends ByteArrayContent() {
      constructor(text, contentType, status) {
        status = status === VOID ? null : status;
        super();
        this.r42_1 = text;
        this.s42_1 = contentType;
        this.t42_1 = status;
        var tmp = this;
        var tmp0_elvis_lhs = charset(this.s42_1);
        tmp.u42_1 = toByteArray(this.r42_1, tmp0_elvis_lhs == null ? Charsets_getInstance().a3g_1 : tmp0_elvis_lhs);
      }
      d41() {
        return this.s42_1;
      }
      e41() {
        return toLong(this.u42_1.length);
      }
      f41() {
        return this.u42_1;
      }
      toString() {
        return 'TextContent[' + this.s42_1.toString() + '] "' + take(this.r42_1, 30) + '"';
      }
    }
    initMetadataForClass($, 'TextContent');
    TextContentClass = $;
  }
  return TextContentClass;
}
//region block: exports
export {
  TextContent as TextContent1rb6ftlpvl1d2,
};
//endregion

//# sourceMappingURL=TextContent.mjs.map
