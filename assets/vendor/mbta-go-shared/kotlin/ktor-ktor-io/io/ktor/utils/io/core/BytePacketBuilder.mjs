import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function writeFully(_this__u8e3s4, buffer, offset, length) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? buffer.length - offset | 0 : length;
  _this__u8e3s4.c31(buffer, offset, offset + length | 0);
}
function BytePacketBuilder() {
  return new (Buffer())();
}
function get_size(_this__u8e3s4) {
  return _this__u8e3s4.s2z().c1().f2();
}
function build(_this__u8e3s4) {
  return _this__u8e3s4.s2z();
}
//region block: exports
export {
  BytePacketBuilder as BytePacketBuilder2biodf4wxvlba,
  build as buildjygoh729rhy8,
  get_size as get_size2imoy2jq11jxl,
  writeFully as writeFully359t6q8kam2g5,
};
//endregion

//# sourceMappingURL=BytePacketBuilder.mjs.map
