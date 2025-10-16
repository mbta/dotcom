import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  awaitContent$default62rpipafmnr4 as awaitContent$default,
  ByteReadChannel2wzou76jce72d as ByteReadChannel,
} from './ByteReadChannel.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IOException1wyutdmfe71nu as IOException } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import { CloseToken4utf44psnuyc as CloseToken } from './CloseToken.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SourceByteReadChannelClass;
function SourceByteReadChannel() {
  if (SourceByteReadChannelClass === VOID) {
    class $ {
      constructor(source) {
        this.u3f_1 = source;
        this.v3f_1 = null;
      }
      a36() {
        var tmp0_safe_receiver = this.v3f_1;
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b36();
      }
      c36() {
        return this.u3f_1.t2z();
      }
      v35() {
        var tmp0_safe_receiver = this.a36();
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          throw tmp0_safe_receiver;
        }
        return this.u3f_1.s2z();
      }
      d36(min, $completion) {
        var tmp0_safe_receiver = this.a36();
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          throw tmp0_safe_receiver;
        }
        return this.u3f_1.v2z(toLong(min));
      }
      g36(cause) {
        if (!(this.v3f_1 == null))
          return Unit_instance;
        this.u3f_1.v6();
        var tmp = this;
        var tmp1_elvis_lhs = cause == null ? null : cause.message;
        tmp.v3f_1 = new (CloseToken())(IOException().w32(tmp1_elvis_lhs == null ? 'Channel was cancelled' : tmp1_elvis_lhs, cause));
      }
    }
    protoOf($).e36 = awaitContent$default;
    initMetadataForClass($, 'SourceByteReadChannel', VOID, VOID, [ByteReadChannel()], [1]);
    SourceByteReadChannelClass = $;
  }
  return SourceByteReadChannelClass;
}
//region block: exports
export {
  SourceByteReadChannel as SourceByteReadChannel1ruj5s0fyiukm,
};
//endregion

//# sourceMappingURL=SourceByteReadChannel.mjs.map
