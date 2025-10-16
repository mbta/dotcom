import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ByteReadPacketEmpty;
function get_remaining(_this__u8e3s4) {
  _init_properties_ByteReadPacket_kt__28475y();
  return _this__u8e3s4.s2z().c1();
}
function discard(_this__u8e3s4, count) {
  count = count === VOID ? new (Long())(-1, 2147483647) : count;
  _init_properties_ByteReadPacket_kt__28475y();
  _this__u8e3s4.v2z(count);
  // Inline function 'kotlin.comparisons.minOf' call
  var b = get_remaining(_this__u8e3s4);
  var countToDiscard = count.d2(b) <= 0 ? count : b;
  _this__u8e3s4.s2z().q30(countToDiscard);
  return countToDiscard;
}
function takeWhile(_this__u8e3s4, block) {
  _init_properties_ByteReadPacket_kt__28475y();
  while (!_this__u8e3s4.t2z() && block(_this__u8e3s4.s2z())) {
  }
}
var properties_initialized_ByteReadPacket_kt_hw4st4;
function _init_properties_ByteReadPacket_kt__28475y() {
  if (!properties_initialized_ByteReadPacket_kt_hw4st4) {
    properties_initialized_ByteReadPacket_kt_hw4st4 = true;
    ByteReadPacketEmpty = new (Buffer())();
  }
}
//region block: exports
export {
  discard as discard3ugntd47xyll6,
  get_remaining as get_remaining1lapv95kcmm0y,
  takeWhile as takeWhile34751tcfg6owx,
};
//endregion

//# sourceMappingURL=ByteReadPacket.mjs.map
