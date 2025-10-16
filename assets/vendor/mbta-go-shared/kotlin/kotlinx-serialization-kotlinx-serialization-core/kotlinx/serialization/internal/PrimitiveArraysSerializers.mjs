import {
  PrimitiveArraySerializer6xcmeltdozbx as PrimitiveArraySerializer,
  PrimitiveArrayBuilder1tzna3i4eqw54 as PrimitiveArrayBuilder,
} from './CollectionSerializers.mjs';
import { Companion_getInstance2e3h8n26rh23 as Companion_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  serializer345btyh1f2y1j as serializer,
  serializer1wpgysz06u9ol as serializer_0,
  serializer3x9uckd1deom as serializer_1,
  serializerodflzzf6s3fp as serializer_2,
  serializer2lw83vwvpnyms as serializer_3,
  serializer1hu9wv9at41ww as serializer_4,
  serializer3ikrxnm8b29d6 as serializer_5,
  serializer1tw0a8bv7lkga as serializer_6,
  serializer1q7c5q67ysppr as serializer_7,
  serializer1r0h5yakm679b as serializer_8,
  serializer36584sjyg5661 as serializer_9,
  serializer3u3hsxnenk49x as serializer_10,
} from '../builtins/BuiltinSerializers.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  isCharArray21auq5hbrg68m as isCharArray,
  isDoubleArray1wyh4nyf7pjxn as isDoubleArray,
  isFloatArrayjjscnqphw92j as isFloatArray,
  isLongArray2fdt3z7yu3ef as isLongArray,
  isIntArrayeijsubfngq38 as isIntArray,
  isShortArraywz30zxwtqi8h as isShortArray,
  isByteArray4nnzfn1x4o3w as isByteArray,
  isBooleanArray35llghle4c6w1 as isBooleanArray,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  charArray2ujmm1qusno00 as charArray,
  longArray288a0fctlmjmj as longArray,
  booleanArray2jdug9b51huk7 as booleanArray,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  DoubleCompanionObject_instance3q51gr7gsd0au as DoubleCompanionObject_instance,
  FloatCompanionObject_instance367t6x2s4xzmv as FloatCompanionObject_instance,
  IntCompanionObject_instance3tw56cgyd5vup as IntCompanionObject_instance,
  ShortCompanionObject_instance3vq120mx8545m as ShortCompanionObject_instance,
  ByteCompanionObject_instance9rvhjp0l184i as ByteCompanionObject_instance,
  BooleanCompanionObject_instance29o5h9ajgjmec as BooleanCompanionObject_instance,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { Companion_getInstance3gn12jgnf4xoo as Companion_getInstance_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  Companion_getInstance1puqqwzccfvrg as Companion_getInstance_1,
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import {
  _ULongArray___get_size__impl__ju6dtr2cm0h8pvj33oc as _ULongArray___get_size__impl__ju6dtr,
  ULongArray3nd0d80mdwjj8 as ULongArray,
  _ULongArray___init__impl__twm1l318nadwrsl904i as _ULongArray___init__impl__twm1l3,
  ULongArray__get_impl_pr71q9ba20e4znze0l as ULongArray__get_impl_pr71q9,
  _ULongArray___get_storage__impl__28e64jd93r4nwx0bzi as _ULongArray___get_storage__impl__28e64j,
  _ULongArray___init__impl__twm1l310ecgw67nsok9 as _ULongArray___init__impl__twm1l3_0,
  ULongArray__set_impl_z19mvh2wf37xvulocfs as ULongArray__set_impl_z19mvh,
} from '../../../../kotlin-kotlin-stdlib/kotlin/ULongArray.mjs';
import {
  Companion_getInstanceuedpedmz4g65 as Companion_getInstance_2,
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UInt.mjs';
import {
  _UIntArray___get_size__impl__r6l8ci2fqw6ae893py3 as _UIntArray___get_size__impl__r6l8ci,
  UIntArrayrp6cv44n5v4y as UIntArray,
  _UIntArray___init__impl__ghjpc618b75h631neq9 as _UIntArray___init__impl__ghjpc6,
  UIntArray__get_impl_gp5kza2hxcr782v503s as UIntArray__get_impl_gp5kza,
  _UIntArray___get_storage__impl__92a0v02db5qclx33scp as _UIntArray___get_storage__impl__92a0v0,
  _UIntArray___init__impl__ghjpc617c61a9kgqgj3 as _UIntArray___init__impl__ghjpc6_0,
  UIntArray__set_impl_7f2zu21rg83h8k5rr6q as UIntArray__set_impl_7f2zu2,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UIntArray.mjs';
import {
  Companion_getInstance2du03jiluw9jj as Companion_getInstance_3,
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
  _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UShort.mjs';
import {
  _UShortArray___get_size__impl__jqto1b1rcopfj002me5 as _UShortArray___get_size__impl__jqto1b,
  UShortArray11avpmknxdgvv as UShortArray,
  _UShortArray___init__impl__9b26ef2aumgbpdmuy5g as _UShortArray___init__impl__9b26ef,
  UShortArray__get_impl_fnbhmx31xgjirit34wn as UShortArray__get_impl_fnbhmx,
  _UShortArray___get_storage__impl__t2jpv516i6vr5ztry4u as _UShortArray___get_storage__impl__t2jpv5,
  _UShortArray___init__impl__9b26ef3ghkk09gj85t3 as _UShortArray___init__impl__9b26ef_0,
  UShortArray__set_impl_6d8whp1o84pp60fh8tm as UShortArray__set_impl_6d8whp,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UShortArray.mjs';
import {
  Companion_getInstance1trnkq9cty7vr as Companion_getInstance_4,
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UByte.mjs';
import {
  _UByteArray___get_size__impl__h6pkdv1cve284ztupz4 as _UByteArray___get_size__impl__h6pkdv,
  UByteArray2qu4d6gwssdf9 as UByteArray,
  _UByteArray___init__impl__ip4y9n23n7lz0x7gq72 as _UByteArray___init__impl__ip4y9n,
  UByteArray__get_impl_t5f3hvz1l7xhrol2kb as UByteArray__get_impl_t5f3hv,
  _UByteArray___get_storage__impl__d4kctt25iva2n6yox0m as _UByteArray___get_storage__impl__d4kctt,
  _UByteArray___init__impl__ip4y9ndqanl1uze050 as _UByteArray___init__impl__ip4y9n_0,
  UByteArray__set_impl_jvcicnym486up0f2lk as UByteArray__set_impl_jvcicn,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UByteArray.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import {
  copyOf2p23ljc5f5ea3 as copyOf,
  copyOfgossjg6lh6js as copyOf_0,
  copyOfq9pcgcgbldck as copyOf_1,
  copyOf9mbsebmgnw4t as copyOf_2,
  copyOf3rutauicler23 as copyOf_3,
  copyOf39s58md6y6rn6 as copyOf_4,
  copyOfwy6h3t5vzqpl as copyOf_5,
  copyOf37mht4mx7mjgh as copyOf_6,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CharArraySerializerClass;
function CharArraySerializer() {
  if (CharArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        CharArraySerializer_instance = null;
        super(serializer(Companion_getInstance()));
        CharArraySerializer_instance = this;
      }
      w1c(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.w1c((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      x1c(_this__u8e3s4) {
        return new (CharArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.x1c((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return charArray(0);
      }
      y1c(decoder, index, builder, checkIndex) {
        builder.b1d(decoder.e14(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.y1c(decoder, index, builder instanceof CharArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.y1c(decoder, index, builder instanceof CharArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      c1d(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.k15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.c1d(encoder, (!(content == null) ? isCharArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'CharArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    CharArraySerializerClass = $;
  }
  return CharArraySerializerClass;
}
var CharArraySerializer_instance;
function CharArraySerializer_getInstance() {
  if (CharArraySerializer_instance === VOID)
    new (CharArraySerializer())();
  return CharArraySerializer_instance;
}
var DoubleArraySerializerClass;
function DoubleArraySerializer() {
  if (DoubleArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        DoubleArraySerializer_instance = null;
        super(serializer_0(DoubleCompanionObject_instance));
        DoubleArraySerializer_instance = this;
      }
      f1d(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.f1d((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      g1d(_this__u8e3s4) {
        return new (DoubleArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.g1d((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return new Float64Array(0);
      }
      h1d(decoder, index, builder, checkIndex) {
        builder.k1d(decoder.d14(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.h1d(decoder, index, builder instanceof DoubleArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.h1d(decoder, index, builder instanceof DoubleArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      l1d(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.j15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.l1d(encoder, (!(content == null) ? isDoubleArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'DoubleArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    DoubleArraySerializerClass = $;
  }
  return DoubleArraySerializerClass;
}
var DoubleArraySerializer_instance;
function DoubleArraySerializer_getInstance() {
  if (DoubleArraySerializer_instance === VOID)
    new (DoubleArraySerializer())();
  return DoubleArraySerializer_instance;
}
var FloatArraySerializerClass;
function FloatArraySerializer() {
  if (FloatArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        FloatArraySerializer_instance = null;
        super(serializer_1(FloatCompanionObject_instance));
        FloatArraySerializer_instance = this;
      }
      o1d(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.o1d((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      p1d(_this__u8e3s4) {
        return new (FloatArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.p1d((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return new Float32Array(0);
      }
      q1d(decoder, index, builder, checkIndex) {
        builder.t1d(decoder.c14(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.q1d(decoder, index, builder instanceof FloatArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.q1d(decoder, index, builder instanceof FloatArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      u1d(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.i15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.u1d(encoder, (!(content == null) ? isFloatArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'FloatArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    FloatArraySerializerClass = $;
  }
  return FloatArraySerializerClass;
}
var FloatArraySerializer_instance;
function FloatArraySerializer_getInstance() {
  if (FloatArraySerializer_instance === VOID)
    new (FloatArraySerializer())();
  return FloatArraySerializer_instance;
}
var LongArraySerializerClass;
function LongArraySerializer() {
  if (LongArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        LongArraySerializer_instance = null;
        super(serializer_2(Companion_getInstance_0()));
        LongArraySerializer_instance = this;
      }
      x1d(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.x1d((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      y1d(_this__u8e3s4) {
        return new (LongArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.y1d((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return longArray(0);
      }
      z1d(decoder, index, builder, checkIndex) {
        builder.c1e(decoder.b14(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.z1d(decoder, index, builder instanceof LongArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.z1d(decoder, index, builder instanceof LongArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      d1e(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.h15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.d1e(encoder, (!(content == null) ? isLongArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'LongArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    LongArraySerializerClass = $;
  }
  return LongArraySerializerClass;
}
var LongArraySerializer_instance;
function LongArraySerializer_getInstance() {
  if (LongArraySerializer_instance === VOID)
    new (LongArraySerializer())();
  return LongArraySerializer_instance;
}
var ULongArraySerializerClass;
function ULongArraySerializer() {
  if (ULongArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        ULongArraySerializer_instance = null;
        super(serializer_3(Companion_getInstance_1()));
        ULongArraySerializer_instance = this;
      }
      g1e(_this__u8e3s4) {
        return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
      }
      j18(_this__u8e3s4) {
        return this.g1e(_this__u8e3s4 instanceof ULongArray() ? _this__u8e3s4.qy_1 : THROW_CCE());
      }
      h1e(_this__u8e3s4) {
        return new (ULongArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.h1e(_this__u8e3s4 instanceof ULongArray() ? _this__u8e3s4.qy_1 : THROW_CCE());
      }
      i1e() {
        return _ULongArray___init__impl__twm1l3(0);
      }
      u19() {
        return new (ULongArray())(this.i1e());
      }
      j1e(decoder, index, builder, checkIndex) {
        // Inline function 'kotlin.toULong' call
        var this_0 = decoder.g14(this.l19_1, index).m13();
        var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
        builder.m1e(tmp$ret$0);
      }
      p17(decoder, index, builder, checkIndex) {
        return this.j1e(decoder, index, builder instanceof ULongArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.j1e(decoder, index, builder instanceof ULongArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      n1e(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = encoder.m15(this.l19_1, i);
            // Inline function 'kotlin.ULong.toLong' call
            var this_0 = ULongArray__get_impl_pr71q9(content, i);
            var tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
            tmp.w14(tmp$ret$0);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.n1e(encoder, content instanceof ULongArray() ? content.qy_1 : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'ULongArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    ULongArraySerializerClass = $;
  }
  return ULongArraySerializerClass;
}
var ULongArraySerializer_instance;
function ULongArraySerializer_getInstance() {
  if (ULongArraySerializer_instance === VOID)
    new (ULongArraySerializer())();
  return ULongArraySerializer_instance;
}
var IntArraySerializerClass;
function IntArraySerializer() {
  if (IntArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        IntArraySerializer_instance = null;
        super(serializer_4(IntCompanionObject_instance));
        IntArraySerializer_instance = this;
      }
      q1e(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.q1e((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      r1e(_this__u8e3s4) {
        return new (IntArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.r1e((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return new Int32Array(0);
      }
      s1e(decoder, index, builder, checkIndex) {
        builder.v1e(decoder.a14(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.s1e(decoder, index, builder instanceof IntArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.s1e(decoder, index, builder instanceof IntArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      w1e(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.g15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.w1e(encoder, (!(content == null) ? isIntArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'IntArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    IntArraySerializerClass = $;
  }
  return IntArraySerializerClass;
}
var IntArraySerializer_instance;
function IntArraySerializer_getInstance() {
  if (IntArraySerializer_instance === VOID)
    new (IntArraySerializer())();
  return IntArraySerializer_instance;
}
var UIntArraySerializerClass;
function UIntArraySerializer() {
  if (UIntArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        UIntArraySerializer_instance = null;
        super(serializer_5(Companion_getInstance_2()));
        UIntArraySerializer_instance = this;
      }
      z1e(_this__u8e3s4) {
        return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
      }
      j18(_this__u8e3s4) {
        return this.z1e(_this__u8e3s4 instanceof UIntArray() ? _this__u8e3s4.ey_1 : THROW_CCE());
      }
      a1f(_this__u8e3s4) {
        return new (UIntArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.a1f(_this__u8e3s4 instanceof UIntArray() ? _this__u8e3s4.ey_1 : THROW_CCE());
      }
      b1f() {
        return _UIntArray___init__impl__ghjpc6(0);
      }
      u19() {
        return new (UIntArray())(this.b1f());
      }
      c1f(decoder, index, builder, checkIndex) {
        // Inline function 'kotlin.toUInt' call
        var this_0 = decoder.g14(this.l19_1, index).l13();
        var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
        builder.f1f(tmp$ret$0);
      }
      p17(decoder, index, builder, checkIndex) {
        return this.c1f(decoder, index, builder instanceof UIntArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.c1f(decoder, index, builder instanceof UIntArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      g1f(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = encoder.m15(this.l19_1, i);
            // Inline function 'kotlin.UInt.toInt' call
            var this_0 = UIntArray__get_impl_gp5kza(content, i);
            var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
            tmp.v14(tmp$ret$0);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.g1f(encoder, content instanceof UIntArray() ? content.ey_1 : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'UIntArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    UIntArraySerializerClass = $;
  }
  return UIntArraySerializerClass;
}
var UIntArraySerializer_instance;
function UIntArraySerializer_getInstance() {
  if (UIntArraySerializer_instance === VOID)
    new (UIntArraySerializer())();
  return UIntArraySerializer_instance;
}
var ShortArraySerializerClass;
function ShortArraySerializer() {
  if (ShortArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        ShortArraySerializer_instance = null;
        super(serializer_6(ShortCompanionObject_instance));
        ShortArraySerializer_instance = this;
      }
      j1f(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.j1f((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      k1f(_this__u8e3s4) {
        return new (ShortArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.k1f((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return new Int16Array(0);
      }
      l1f(decoder, index, builder, checkIndex) {
        builder.o1f(decoder.z13(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.l1f(decoder, index, builder instanceof ShortArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.l1f(decoder, index, builder instanceof ShortArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      p1f(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.f15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.p1f(encoder, (!(content == null) ? isShortArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'ShortArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    ShortArraySerializerClass = $;
  }
  return ShortArraySerializerClass;
}
var ShortArraySerializer_instance;
function ShortArraySerializer_getInstance() {
  if (ShortArraySerializer_instance === VOID)
    new (ShortArraySerializer())();
  return ShortArraySerializer_instance;
}
var UShortArraySerializerClass;
function UShortArraySerializer() {
  if (UShortArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        UShortArraySerializer_instance = null;
        super(serializer_7(Companion_getInstance_3()));
        UShortArraySerializer_instance = this;
      }
      s1f(_this__u8e3s4) {
        return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
      }
      j18(_this__u8e3s4) {
        return this.s1f(_this__u8e3s4 instanceof UShortArray() ? _this__u8e3s4.cz_1 : THROW_CCE());
      }
      t1f(_this__u8e3s4) {
        return new (UShortArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.t1f(_this__u8e3s4 instanceof UShortArray() ? _this__u8e3s4.cz_1 : THROW_CCE());
      }
      u1f() {
        return _UShortArray___init__impl__9b26ef(0);
      }
      u19() {
        return new (UShortArray())(this.u1f());
      }
      v1f(decoder, index, builder, checkIndex) {
        // Inline function 'kotlin.toUShort' call
        var this_0 = decoder.g14(this.l19_1, index).k13();
        var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
        builder.y1f(tmp$ret$0);
      }
      p17(decoder, index, builder, checkIndex) {
        return this.v1f(decoder, index, builder instanceof UShortArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.v1f(decoder, index, builder instanceof UShortArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      z1f(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = encoder.m15(this.l19_1, i);
            // Inline function 'kotlin.UShort.toShort' call
            var this_0 = UShortArray__get_impl_fnbhmx(content, i);
            var tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
            tmp.u14(tmp$ret$0);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.z1f(encoder, content instanceof UShortArray() ? content.cz_1 : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'UShortArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    UShortArraySerializerClass = $;
  }
  return UShortArraySerializerClass;
}
var UShortArraySerializer_instance;
function UShortArraySerializer_getInstance() {
  if (UShortArraySerializer_instance === VOID)
    new (UShortArraySerializer())();
  return UShortArraySerializer_instance;
}
var ByteArraySerializerClass;
function ByteArraySerializer() {
  if (ByteArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        ByteArraySerializer_instance = null;
        super(serializer_8(ByteCompanionObject_instance));
        ByteArraySerializer_instance = this;
      }
      c1g(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.c1g((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      d1g(_this__u8e3s4) {
        return new (ByteArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.d1g((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return new Int8Array(0);
      }
      e1g(decoder, index, builder, checkIndex) {
        builder.h1g(decoder.y13(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.e1g(decoder, index, builder instanceof ByteArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.e1g(decoder, index, builder instanceof ByteArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      i1g(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.e15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.i1g(encoder, (!(content == null) ? isByteArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'ByteArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    ByteArraySerializerClass = $;
  }
  return ByteArraySerializerClass;
}
var ByteArraySerializer_instance;
function ByteArraySerializer_getInstance() {
  if (ByteArraySerializer_instance === VOID)
    new (ByteArraySerializer())();
  return ByteArraySerializer_instance;
}
var UByteArraySerializerClass;
function UByteArraySerializer() {
  if (UByteArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        UByteArraySerializer_instance = null;
        super(serializer_9(Companion_getInstance_4()));
        UByteArraySerializer_instance = this;
      }
      l1g(_this__u8e3s4) {
        return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
      }
      j18(_this__u8e3s4) {
        return this.l1g(_this__u8e3s4 instanceof UByteArray() ? _this__u8e3s4.sx_1 : THROW_CCE());
      }
      m1g(_this__u8e3s4) {
        return new (UByteArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.m1g(_this__u8e3s4 instanceof UByteArray() ? _this__u8e3s4.sx_1 : THROW_CCE());
      }
      n1g() {
        return _UByteArray___init__impl__ip4y9n(0);
      }
      u19() {
        return new (UByteArray())(this.n1g());
      }
      o1g(decoder, index, builder, checkIndex) {
        // Inline function 'kotlin.toUByte' call
        var this_0 = decoder.g14(this.l19_1, index).j13();
        var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
        builder.r1g(tmp$ret$0);
      }
      p17(decoder, index, builder, checkIndex) {
        return this.o1g(decoder, index, builder instanceof UByteArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.o1g(decoder, index, builder instanceof UByteArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      s1g(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = encoder.m15(this.l19_1, i);
            // Inline function 'kotlin.UByte.toByte' call
            var this_0 = UByteArray__get_impl_t5f3hv(content, i);
            var tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
            tmp.t14(tmp$ret$0);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.s1g(encoder, content instanceof UByteArray() ? content.sx_1 : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'UByteArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    UByteArraySerializerClass = $;
  }
  return UByteArraySerializerClass;
}
var UByteArraySerializer_instance;
function UByteArraySerializer_getInstance() {
  if (UByteArraySerializer_instance === VOID)
    new (UByteArraySerializer())();
  return UByteArraySerializer_instance;
}
var BooleanArraySerializerClass;
function BooleanArraySerializer() {
  if (BooleanArraySerializerClass === VOID) {
    class $ extends PrimitiveArraySerializer() {
      constructor() {
        BooleanArraySerializer_instance = null;
        super(serializer_10(BooleanCompanionObject_instance));
        BooleanArraySerializer_instance = this;
      }
      v1g(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.v1g((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      w1g(_this__u8e3s4) {
        return new (BooleanArrayBuilder())(_this__u8e3s4);
      }
      e17(_this__u8e3s4) {
        return this.w1g((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      u19() {
        return booleanArray(0);
      }
      x1g(decoder, index, builder, checkIndex) {
        builder.a1h(decoder.x13(this.l19_1, index));
      }
      p17(decoder, index, builder, checkIndex) {
        return this.x1g(decoder, index, builder instanceof BooleanArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      v19(decoder, index, builder, checkIndex) {
        return this.x1g(decoder, index, builder instanceof BooleanArrayBuilder() ? builder : THROW_CCE(), checkIndex);
      }
      b1h(encoder, content, size) {
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            encoder.d15(this.l19_1, i, content[i]);
          }
           while (inductionVariable < size);
      }
      w19(encoder, content, size) {
        return this.b1h(encoder, (!(content == null) ? isBooleanArray(content) : false) ? content : THROW_CCE(), size);
      }
    }
    initMetadataForObject($, 'BooleanArraySerializer', VOID, VOID, [KSerializer(), PrimitiveArraySerializer()]);
    BooleanArraySerializerClass = $;
  }
  return BooleanArraySerializerClass;
}
var BooleanArraySerializer_instance;
function BooleanArraySerializer_getInstance() {
  if (BooleanArraySerializer_instance === VOID)
    new (BooleanArraySerializer())();
  return BooleanArraySerializer_instance;
}
var CharArrayBuilderClass;
function CharArrayBuilder() {
  if (CharArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.z1c_1 = bufferWithData;
        this.a1d_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.a1d_1;
      }
      r19(requiredCapacity) {
        if (this.z1c_1.length < requiredCapacity)
          this.z1c_1 = copyOf(this.z1c_1, coerceAtLeast(requiredCapacity, imul(this.z1c_1.length, 2)));
      }
      b1d(c) {
        this.y19();
        var tmp = this.z1c_1;
        var _unary__edvuaz = this.a1d_1;
        this.a1d_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf(this.z1c_1, this.a1d_1);
      }
    }
    initMetadataForClass($, 'CharArrayBuilder');
    CharArrayBuilderClass = $;
  }
  return CharArrayBuilderClass;
}
var DoubleArrayBuilderClass;
function DoubleArrayBuilder() {
  if (DoubleArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.i1d_1 = bufferWithData;
        this.j1d_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.j1d_1;
      }
      r19(requiredCapacity) {
        if (this.i1d_1.length < requiredCapacity)
          this.i1d_1 = copyOf_0(this.i1d_1, coerceAtLeast(requiredCapacity, imul(this.i1d_1.length, 2)));
      }
      k1d(c) {
        this.y19();
        var tmp = this.i1d_1;
        var _unary__edvuaz = this.j1d_1;
        this.j1d_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_0(this.i1d_1, this.j1d_1);
      }
    }
    initMetadataForClass($, 'DoubleArrayBuilder');
    DoubleArrayBuilderClass = $;
  }
  return DoubleArrayBuilderClass;
}
var FloatArrayBuilderClass;
function FloatArrayBuilder() {
  if (FloatArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.r1d_1 = bufferWithData;
        this.s1d_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.s1d_1;
      }
      r19(requiredCapacity) {
        if (this.r1d_1.length < requiredCapacity)
          this.r1d_1 = copyOf_1(this.r1d_1, coerceAtLeast(requiredCapacity, imul(this.r1d_1.length, 2)));
      }
      t1d(c) {
        this.y19();
        var tmp = this.r1d_1;
        var _unary__edvuaz = this.s1d_1;
        this.s1d_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_1(this.r1d_1, this.s1d_1);
      }
    }
    initMetadataForClass($, 'FloatArrayBuilder');
    FloatArrayBuilderClass = $;
  }
  return FloatArrayBuilderClass;
}
var LongArrayBuilderClass;
function LongArrayBuilder() {
  if (LongArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.a1e_1 = bufferWithData;
        this.b1e_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.b1e_1;
      }
      r19(requiredCapacity) {
        if (this.a1e_1.length < requiredCapacity)
          this.a1e_1 = copyOf_2(this.a1e_1, coerceAtLeast(requiredCapacity, imul(this.a1e_1.length, 2)));
      }
      c1e(c) {
        this.y19();
        var tmp = this.a1e_1;
        var _unary__edvuaz = this.b1e_1;
        this.b1e_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_2(this.a1e_1, this.b1e_1);
      }
    }
    initMetadataForClass($, 'LongArrayBuilder');
    LongArrayBuilderClass = $;
  }
  return LongArrayBuilderClass;
}
var ULongArrayBuilderClass;
function ULongArrayBuilder() {
  if (ULongArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.k1e_1 = bufferWithData;
        this.l1e_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
        this.r19(10);
      }
      n19() {
        return this.l1e_1;
      }
      r19(requiredCapacity) {
        if (_ULongArray___get_size__impl__ju6dtr(this.k1e_1) < requiredCapacity) {
          var tmp = this;
          var tmp0 = this.k1e_1;
          // Inline function 'kotlin.collections.copyOf' call
          var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.k1e_1), 2));
          tmp.k1e_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
        }
      }
      m1e(c) {
        this.y19();
        var tmp = this.k1e_1;
        var _unary__edvuaz = this.l1e_1;
        this.l1e_1 = _unary__edvuaz + 1 | 0;
        ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
      }
      c1h() {
        var tmp0 = this.k1e_1;
        // Inline function 'kotlin.collections.copyOf' call
        var newSize = this.l1e_1;
        return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
      }
      p19() {
        return new (ULongArray())(this.c1h());
      }
    }
    initMetadataForClass($, 'ULongArrayBuilder');
    ULongArrayBuilderClass = $;
  }
  return ULongArrayBuilderClass;
}
var IntArrayBuilderClass;
function IntArrayBuilder() {
  if (IntArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.t1e_1 = bufferWithData;
        this.u1e_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.u1e_1;
      }
      r19(requiredCapacity) {
        if (this.t1e_1.length < requiredCapacity)
          this.t1e_1 = copyOf_3(this.t1e_1, coerceAtLeast(requiredCapacity, imul(this.t1e_1.length, 2)));
      }
      v1e(c) {
        this.y19();
        var tmp = this.t1e_1;
        var _unary__edvuaz = this.u1e_1;
        this.u1e_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_3(this.t1e_1, this.u1e_1);
      }
    }
    initMetadataForClass($, 'IntArrayBuilder');
    IntArrayBuilderClass = $;
  }
  return IntArrayBuilderClass;
}
var UIntArrayBuilderClass;
function UIntArrayBuilder() {
  if (UIntArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.d1f_1 = bufferWithData;
        this.e1f_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
        this.r19(10);
      }
      n19() {
        return this.e1f_1;
      }
      r19(requiredCapacity) {
        if (_UIntArray___get_size__impl__r6l8ci(this.d1f_1) < requiredCapacity) {
          var tmp = this;
          var tmp0 = this.d1f_1;
          // Inline function 'kotlin.collections.copyOf' call
          var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.d1f_1), 2));
          tmp.d1f_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
        }
      }
      f1f(c) {
        this.y19();
        var tmp = this.d1f_1;
        var _unary__edvuaz = this.e1f_1;
        this.e1f_1 = _unary__edvuaz + 1 | 0;
        UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
      }
      d1h() {
        var tmp0 = this.d1f_1;
        // Inline function 'kotlin.collections.copyOf' call
        var newSize = this.e1f_1;
        return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
      }
      p19() {
        return new (UIntArray())(this.d1h());
      }
    }
    initMetadataForClass($, 'UIntArrayBuilder');
    UIntArrayBuilderClass = $;
  }
  return UIntArrayBuilderClass;
}
var ShortArrayBuilderClass;
function ShortArrayBuilder() {
  if (ShortArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.m1f_1 = bufferWithData;
        this.n1f_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.n1f_1;
      }
      r19(requiredCapacity) {
        if (this.m1f_1.length < requiredCapacity)
          this.m1f_1 = copyOf_4(this.m1f_1, coerceAtLeast(requiredCapacity, imul(this.m1f_1.length, 2)));
      }
      o1f(c) {
        this.y19();
        var tmp = this.m1f_1;
        var _unary__edvuaz = this.n1f_1;
        this.n1f_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_4(this.m1f_1, this.n1f_1);
      }
    }
    initMetadataForClass($, 'ShortArrayBuilder');
    ShortArrayBuilderClass = $;
  }
  return ShortArrayBuilderClass;
}
var UShortArrayBuilderClass;
function UShortArrayBuilder() {
  if (UShortArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.w1f_1 = bufferWithData;
        this.x1f_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
        this.r19(10);
      }
      n19() {
        return this.x1f_1;
      }
      r19(requiredCapacity) {
        if (_UShortArray___get_size__impl__jqto1b(this.w1f_1) < requiredCapacity) {
          var tmp = this;
          var tmp0 = this.w1f_1;
          // Inline function 'kotlin.collections.copyOf' call
          var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.w1f_1), 2));
          tmp.w1f_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
        }
      }
      y1f(c) {
        this.y19();
        var tmp = this.w1f_1;
        var _unary__edvuaz = this.x1f_1;
        this.x1f_1 = _unary__edvuaz + 1 | 0;
        UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
      }
      e1h() {
        var tmp0 = this.w1f_1;
        // Inline function 'kotlin.collections.copyOf' call
        var newSize = this.x1f_1;
        return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
      }
      p19() {
        return new (UShortArray())(this.e1h());
      }
    }
    initMetadataForClass($, 'UShortArrayBuilder');
    UShortArrayBuilderClass = $;
  }
  return UShortArrayBuilderClass;
}
var ByteArrayBuilderClass;
function ByteArrayBuilder() {
  if (ByteArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.f1g_1 = bufferWithData;
        this.g1g_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.g1g_1;
      }
      r19(requiredCapacity) {
        if (this.f1g_1.length < requiredCapacity)
          this.f1g_1 = copyOf_5(this.f1g_1, coerceAtLeast(requiredCapacity, imul(this.f1g_1.length, 2)));
      }
      h1g(c) {
        this.y19();
        var tmp = this.f1g_1;
        var _unary__edvuaz = this.g1g_1;
        this.g1g_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_5(this.f1g_1, this.g1g_1);
      }
    }
    initMetadataForClass($, 'ByteArrayBuilder');
    ByteArrayBuilderClass = $;
  }
  return ByteArrayBuilderClass;
}
var UByteArrayBuilderClass;
function UByteArrayBuilder() {
  if (UByteArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.p1g_1 = bufferWithData;
        this.q1g_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
        this.r19(10);
      }
      n19() {
        return this.q1g_1;
      }
      r19(requiredCapacity) {
        if (_UByteArray___get_size__impl__h6pkdv(this.p1g_1) < requiredCapacity) {
          var tmp = this;
          var tmp0 = this.p1g_1;
          // Inline function 'kotlin.collections.copyOf' call
          var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.p1g_1), 2));
          tmp.p1g_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
        }
      }
      r1g(c) {
        this.y19();
        var tmp = this.p1g_1;
        var _unary__edvuaz = this.q1g_1;
        this.q1g_1 = _unary__edvuaz + 1 | 0;
        UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
      }
      f1h() {
        var tmp0 = this.p1g_1;
        // Inline function 'kotlin.collections.copyOf' call
        var newSize = this.q1g_1;
        return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
      }
      p19() {
        return new (UByteArray())(this.f1h());
      }
    }
    initMetadataForClass($, 'UByteArrayBuilder');
    UByteArrayBuilderClass = $;
  }
  return UByteArrayBuilderClass;
}
var BooleanArrayBuilderClass;
function BooleanArrayBuilder() {
  if (BooleanArrayBuilderClass === VOID) {
    class $ extends PrimitiveArrayBuilder() {
      constructor(bufferWithData) {
        super();
        this.y1g_1 = bufferWithData;
        this.z1g_1 = bufferWithData.length;
        this.r19(10);
      }
      n19() {
        return this.z1g_1;
      }
      r19(requiredCapacity) {
        if (this.y1g_1.length < requiredCapacity)
          this.y1g_1 = copyOf_6(this.y1g_1, coerceAtLeast(requiredCapacity, imul(this.y1g_1.length, 2)));
      }
      a1h(c) {
        this.y19();
        var tmp = this.y1g_1;
        var _unary__edvuaz = this.z1g_1;
        this.z1g_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
      }
      p19() {
        return copyOf_6(this.y1g_1, this.z1g_1);
      }
    }
    initMetadataForClass($, 'BooleanArrayBuilder');
    BooleanArrayBuilderClass = $;
  }
  return BooleanArrayBuilderClass;
}
//region block: exports
export {
  BooleanArraySerializer_getInstance as BooleanArraySerializer_getInstancexdjxaje3qyq8,
  ByteArraySerializer_getInstance as ByteArraySerializer_getInstance1p0ix35e82iv6,
  CharArraySerializer_getInstance as CharArraySerializer_getInstance3oryjy1xvmknv,
  DoubleArraySerializer_getInstance as DoubleArraySerializer_getInstancef1llmrjqfc7l,
  FloatArraySerializer_getInstance as FloatArraySerializer_getInstance35ihhcpq3ab82,
  IntArraySerializer_getInstance as IntArraySerializer_getInstance34eu013sg7tz8,
  LongArraySerializer_getInstance as LongArraySerializer_getInstance1ig6h5hl21yk7,
  ShortArraySerializer_getInstance as ShortArraySerializer_getInstanceqwmxisunsyg2,
  UByteArraySerializer_getInstance as UByteArraySerializer_getInstance2xgvi8bxs38pn,
  UIntArraySerializer_getInstance as UIntArraySerializer_getInstance2udoc8iaxrzr5,
  ULongArraySerializer_getInstance as ULongArraySerializer_getInstance2hnbvnui8wiv3,
  UShortArraySerializer_getInstance as UShortArraySerializer_getInstance3n3pjd3tpanwl,
};
//endregion

//# sourceMappingURL=PrimitiveArraysSerializers.mjs.map
