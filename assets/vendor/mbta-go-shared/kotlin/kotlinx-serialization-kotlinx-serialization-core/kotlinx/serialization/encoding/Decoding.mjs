import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function decodeSerializableValue(deserializer) {
  return deserializer.hz(this);
}
var DecoderClass;
function Decoder() {
  if (DecoderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Decoder');
    DecoderClass = $;
  }
  return DecoderClass;
}
function decodeSequentially() {
  return false;
}
function decodeCollectionSize(descriptor) {
  return -1;
}
function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
  previousValue = previousValue === VOID ? null : previousValue;
  return $super === VOID ? this.h14(descriptor, index, deserializer, previousValue) : $super.h14.call(this, descriptor, index, deserializer, previousValue);
}
var CompositeDecoderClass;
function CompositeDecoder() {
  if (CompositeDecoderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CompositeDecoder');
    CompositeDecoderClass = $;
  }
  return CompositeDecoderClass;
}
//region block: exports
export {
  decodeSerializableElement$default as decodeSerializableElement$default2o0k93vobxyld,
  decodeCollectionSize as decodeCollectionSize3l4gjp9ef5h8u,
  decodeSequentially as decodeSequentially27kmi8jnnsnbc,
  CompositeDecoder as CompositeDecoder2tzm7wpwkr0og,
  decodeSerializableValue as decodeSerializableValue3h7ajfesxzjda,
  Decoder as Decoder23nde051s631g,
};
//endregion

//# sourceMappingURL=Decoding.mjs.map
