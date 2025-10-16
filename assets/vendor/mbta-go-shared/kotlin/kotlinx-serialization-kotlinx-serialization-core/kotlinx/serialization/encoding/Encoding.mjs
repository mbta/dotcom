import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { SerializationStrategyh6ouydnm6hci as SerializationStrategy } from '../KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function encodeNotNullMark() {
}
function beginCollection(descriptor, collectionSize) {
  return this.v13(descriptor);
}
function encodeSerializableValue(serializer, value) {
  serializer.gz(this, value);
}
function encodeNullableSerializableValue(serializer, value) {
  var isNullabilitySupported = serializer.fz().t11();
  if (isNullabilitySupported) {
    return this.o15(isInterface(serializer, SerializationStrategy()) ? serializer : THROW_CCE(), value);
  }
  if (value == null) {
    this.r14();
  } else {
    this.r15();
    this.o15(serializer, value);
  }
}
var EncoderClass;
function Encoder() {
  if (EncoderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Encoder');
    EncoderClass = $;
  }
  return EncoderClass;
}
function shouldEncodeElementDefault(descriptor, index) {
  return true;
}
var CompositeEncoderClass;
function CompositeEncoder() {
  if (CompositeEncoderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CompositeEncoder');
    CompositeEncoderClass = $;
  }
  return CompositeEncoderClass;
}
//region block: exports
export {
  shouldEncodeElementDefault as shouldEncodeElementDefault1vy568gzcy4z0,
  CompositeEncoder as CompositeEncoderknecpkexzn3v,
  beginCollection as beginCollection27i47rk9upjw4,
  encodeNotNullMark as encodeNotNullMark352dnk5r97tvq,
  encodeNullableSerializableValue as encodeNullableSerializableValue22qo2euy9x1r4,
  encodeSerializableValue as encodeSerializableValue1mu7jsn2oheqi,
  Encoder as Encoderqvmrpqtq8hnu,
};
//endregion

//# sourceMappingURL=Encoding.mjs.map
