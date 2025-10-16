import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { SourceByteReadChannel1ruj5s0fyiukm as SourceByteReadChannel } from './SourceByteReadChannel.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ByteReadChannel(content, offset, length) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? content.length : length;
  // Inline function 'kotlin.also' call
  var this_0 = new (Buffer())();
  this_0.c31(content, offset, offset + length | 0);
  var source = this_0;
  return ByteReadChannel_0(source);
}
function ByteReadChannel_0(source) {
  return new (SourceByteReadChannel())(source);
}
//region block: exports
export {
  ByteReadChannel as ByteReadChannel1cb89sbyipkce,
};
//endregion

//# sourceMappingURL=ByteChannelCtor.mjs.map
