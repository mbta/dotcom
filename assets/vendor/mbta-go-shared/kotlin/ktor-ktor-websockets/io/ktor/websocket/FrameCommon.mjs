import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { writeFully359t6q8kam2g5 as writeFully } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/BytePacketBuilder.mjs';
import { readText27783kyxjxi1g as readText } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { CloseReason10cphaqpp3ct7 as CloseReason } from './CloseReason.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NonDisposableHandleClass;
function NonDisposableHandle() {
  if (NonDisposableHandleClass === VOID) {
    class $ {
      z24() {
        return Unit_instance;
      }
      toString() {
        return 'NonDisposableHandle';
      }
      hashCode() {
        return 207988788;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NonDisposableHandle()))
          return false;
        other instanceof NonDisposableHandle() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'NonDisposableHandle');
    NonDisposableHandleClass = $;
  }
  return NonDisposableHandleClass;
}
var NonDisposableHandle_instance;
function NonDisposableHandle_getInstance() {
  return NonDisposableHandle_instance;
}
function readReason(_this__u8e3s4) {
  if (_this__u8e3s4.a4f_1.length < 2) {
    return null;
  }
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new (Buffer())();
  writeFully(builder, _this__u8e3s4.a4f_1);
  var packet = builder;
  var code = packet.g30();
  var message = readText(packet);
  return CloseReason().t49(code, message);
}
//region block: init
NonDisposableHandle_instance = new (NonDisposableHandle())();
//endregion
//region block: exports
export {
  NonDisposableHandle_instance as NonDisposableHandle_instancebt9v9qa8gc6h,
  readReason as readReason2qq1b0s02pdpy,
};
//endregion

//# sourceMappingURL=FrameCommon.mjs.map
