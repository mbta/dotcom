import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Char19o2r8palgjof as Char } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  decodeSerializableElement$default2o0k93vobxyld as decodeSerializableElement$default,
  decodeSerializableValue3h7ajfesxzjda as decodeSerializableValue,
  decodeSequentially27kmi8jnnsnbc as decodeSequentially,
  decodeCollectionSize3l4gjp9ef5h8u as decodeCollectionSize,
  Decoder23nde051s631g as Decoder,
  CompositeDecoder2tzm7wpwkr0og as CompositeDecoder,
} from './Decoding.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractDecoderClass;
function AbstractDecoder() {
  if (AbstractDecoderClass === VOID) {
    class $ {
      f13() {
        throw SerializationException().w10(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
      }
      g13() {
        return true;
      }
      h13() {
        return null;
      }
      i13() {
        var tmp = this.f13();
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
      }
      j13() {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      k13() {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      l13() {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      m13() {
        var tmp = this.f13();
        return tmp instanceof Long() ? tmp : THROW_CCE();
      }
      n13() {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      o13() {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      p13() {
        var tmp = this.f13();
        return tmp instanceof Char() ? tmp.r2_1 : THROW_CCE();
      }
      q13() {
        var tmp = this.f13();
        return typeof tmp === 'string' ? tmp : THROW_CCE();
      }
      r13(enumDescriptor) {
        var tmp = this.f13();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      s13(descriptor) {
        return this;
      }
      t13(deserializer, previousValue) {
        return this.u13(deserializer);
      }
      v13(descriptor) {
        return this;
      }
      w13(descriptor) {
      }
      x13(descriptor, index) {
        return this.i13();
      }
      y13(descriptor, index) {
        return this.j13();
      }
      z13(descriptor, index) {
        return this.k13();
      }
      a14(descriptor, index) {
        return this.l13();
      }
      b14(descriptor, index) {
        return this.m13();
      }
      c14(descriptor, index) {
        return this.n13();
      }
      d14(descriptor, index) {
        return this.o13();
      }
      e14(descriptor, index) {
        return this.p13();
      }
      f14(descriptor, index) {
        return this.q13();
      }
      g14(descriptor, index) {
        return this.s13(descriptor.e12(index));
      }
      h14(descriptor, index, deserializer, previousValue) {
        return this.t13(deserializer, previousValue);
      }
      j14(descriptor, index, deserializer, previousValue) {
        // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
        var isNullabilitySupported = deserializer.fz().t11();
        var tmp;
        if (isNullabilitySupported || this.g13()) {
          tmp = this.t13(deserializer, previousValue);
        } else {
          tmp = this.h13();
        }
        return tmp;
      }
    }
    protoOf($).i14 = decodeSerializableElement$default;
    protoOf($).u13 = decodeSerializableValue;
    protoOf($).l14 = decodeSequentially;
    protoOf($).n14 = decodeCollectionSize;
    initMetadataForClass($, 'AbstractDecoder', VOID, VOID, [Decoder(), CompositeDecoder()]);
    AbstractDecoderClass = $;
  }
  return AbstractDecoderClass;
}
//region block: exports
export {
  AbstractDecoder as AbstractDecoder35guh02ubh2hm,
};
//endregion

//# sourceMappingURL=AbstractDecoder.mjs.map
