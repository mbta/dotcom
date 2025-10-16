import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  joinToString1cxrrlmo0chqs as joinToString,
  lastOrNull1aq5oz189qoe1 as lastOrNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { EmptySerializersModule991ju6pz9b79 as EmptySerializersModule } from '../modules/SerializersModuleBuilders.mjs';
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
} from '../encoding/Decoding.mjs';
import { get_lastIndex1yw0x4k50k51w as get_lastIndex } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NamedValueDecoderClass;
function NamedValueDecoder() {
  if (NamedValueDecoderClass === VOID) {
    class $ extends TaggedDecoder() {
      g1i(_this__u8e3s4, index) {
        return this.i1i(this.h1i(_this__u8e3s4, index));
      }
      i1i(nestedName) {
        var tmp0_elvis_lhs = this.l1i();
        return this.m1i(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
      }
      h1i(descriptor, index) {
        return descriptor.b12(index);
      }
      m1i(parentName, childName) {
        var tmp;
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(parentName) === 0) {
          tmp = childName;
        } else {
          tmp = parentName + '.' + childName;
        }
        return tmp;
      }
      n1i() {
        return this.j1i_1.h1() ? '$' : joinToString(this.j1i_1, '.', '$.');
      }
    }
    initMetadataForClass($, 'NamedValueDecoder');
    NamedValueDecoderClass = $;
  }
  return NamedValueDecoderClass;
}
function tagBlock($this, tag, block) {
  $this.b1j(tag);
  var r = block();
  if (!$this.k1i_1) {
    $this.c1j();
  }
  $this.k1i_1 = false;
  return r;
}
function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
  return function () {
    return this$0.t13($deserializer, $previousValue);
  };
}
function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
  return function () {
    var tmp0 = this$0;
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = $deserializer.fz().t11();
    var tmp;
    if (isNullabilitySupported || tmp0.g13()) {
      tmp = this$0.t13($deserializer, $previousValue);
    } else {
      tmp = tmp0.h13();
    }
    return tmp;
  };
}
var TaggedDecoderClass;
function TaggedDecoder() {
  if (TaggedDecoderClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.arrayListOf' call
        tmp.j1i_1 = ArrayList().g1();
        this.k1i_1 = false;
      }
      k14() {
        return EmptySerializersModule();
      }
      o1i(tag) {
        throw SerializationException().w10(toString(getKClassFromExpression(this)) + " can't retrieve untyped values");
      }
      p1i(tag) {
        return true;
      }
      q1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
      }
      r1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      s1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      t1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      u1i(tag) {
        var tmp = this.o1i(tag);
        return tmp instanceof Long() ? tmp : THROW_CCE();
      }
      v1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      w1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      x1i(tag) {
        var tmp = this.o1i(tag);
        return tmp instanceof Char() ? tmp.r2_1 : THROW_CCE();
      }
      y1i(tag) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'string' ? tmp : THROW_CCE();
      }
      z1i(tag, enumDescriptor) {
        var tmp = this.o1i(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
      }
      a1j(tag, inlineDescriptor) {
        // Inline function 'kotlin.apply' call
        this.b1j(tag);
        return this;
      }
      t13(deserializer, previousValue) {
        return this.u13(deserializer);
      }
      s13(descriptor) {
        return this.a1j(this.c1j(), descriptor);
      }
      g13() {
        var tmp0_elvis_lhs = this.l1i();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var currentTag = tmp;
        return this.p1i(currentTag);
      }
      h13() {
        return null;
      }
      i13() {
        return this.q1i(this.c1j());
      }
      j13() {
        return this.r1i(this.c1j());
      }
      k13() {
        return this.s1i(this.c1j());
      }
      l13() {
        return this.t1i(this.c1j());
      }
      m13() {
        return this.u1i(this.c1j());
      }
      n13() {
        return this.v1i(this.c1j());
      }
      o13() {
        return this.w1i(this.c1j());
      }
      p13() {
        return this.x1i(this.c1j());
      }
      q13() {
        return this.y1i(this.c1j());
      }
      r13(enumDescriptor) {
        return this.z1i(this.c1j(), enumDescriptor);
      }
      v13(descriptor) {
        return this;
      }
      w13(descriptor) {
      }
      x13(descriptor, index) {
        return this.q1i(this.g1i(descriptor, index));
      }
      y13(descriptor, index) {
        return this.r1i(this.g1i(descriptor, index));
      }
      z13(descriptor, index) {
        return this.s1i(this.g1i(descriptor, index));
      }
      a14(descriptor, index) {
        return this.t1i(this.g1i(descriptor, index));
      }
      b14(descriptor, index) {
        return this.u1i(this.g1i(descriptor, index));
      }
      c14(descriptor, index) {
        return this.v1i(this.g1i(descriptor, index));
      }
      d14(descriptor, index) {
        return this.w1i(this.g1i(descriptor, index));
      }
      e14(descriptor, index) {
        return this.x1i(this.g1i(descriptor, index));
      }
      f14(descriptor, index) {
        return this.y1i(this.g1i(descriptor, index));
      }
      g14(descriptor, index) {
        return this.a1j(this.g1i(descriptor, index), descriptor.e12(index));
      }
      h14(descriptor, index, deserializer, previousValue) {
        var tmp = this.g1i(descriptor, index);
        return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
      }
      j14(descriptor, index, deserializer, previousValue) {
        var tmp = this.g1i(descriptor, index);
        return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
      }
      l1i() {
        return lastOrNull(this.j1i_1);
      }
      b1j(name) {
        this.j1i_1.i(name);
      }
      c1j() {
        var r = this.j1i_1.s3(get_lastIndex(this.j1i_1));
        this.k1i_1 = true;
        return r;
      }
    }
    protoOf($).i14 = decodeSerializableElement$default;
    protoOf($).u13 = decodeSerializableValue;
    protoOf($).l14 = decodeSequentially;
    protoOf($).n14 = decodeCollectionSize;
    initMetadataForClass($, 'TaggedDecoder', VOID, VOID, [Decoder(), CompositeDecoder()]);
    TaggedDecoderClass = $;
  }
  return TaggedDecoderClass;
}
//region block: exports
export {
  NamedValueDecoder as NamedValueDecoderzk26ztf92xbq,
};
//endregion

//# sourceMappingURL=Tagged.mjs.map
