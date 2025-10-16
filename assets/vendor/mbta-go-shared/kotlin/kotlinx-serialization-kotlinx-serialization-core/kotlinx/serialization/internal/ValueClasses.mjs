import { Companion_getInstance3gn12jgnf4xoo as Companion_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  serializerodflzzf6s3fp as serializer,
  serializer1hu9wv9at41ww as serializer_0,
  serializer1tw0a8bv7lkga as serializer_1,
  serializer1r0h5yakm679b as serializer_2,
} from '../builtins/BuiltinSerializers.mjs';
import { InlinePrimitiveDescriptor3i6ccn1a4fw94 as InlinePrimitiveDescriptor } from './InlineClassDescriptor.mjs';
import {
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
  ULong3f9k7s38t3rfp as ULong,
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
} from '../../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  IntCompanionObject_instance3tw56cgyd5vup as IntCompanionObject_instance,
  ShortCompanionObject_instance3vq120mx8545m as ShortCompanionObject_instance,
  ByteCompanionObject_instance9rvhjp0l184i as ByteCompanionObject_instance,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import {
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
  UInt1hthisrv6cndi as UInt,
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UInt.mjs';
import {
  _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245,
  UShort26xnqty60t7le as UShort,
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UShort.mjs';
import {
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
  UBytep4j7r1t64gz1 as UByte,
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
} from '../../../../kotlin-kotlin-stdlib/kotlin/UByte.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ULongSerializerClass;
function ULongSerializer() {
  if (ULongSerializerClass === VOID) {
    class $ {
      constructor() {
        ULongSerializer_instance = this;
        this.a1k_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer(Companion_getInstance()));
      }
      fz() {
        return this.a1k_1;
      }
      b1k(encoder, value) {
        var tmp = encoder.c15(this.a1k_1);
        // Inline function 'kotlin.ULong.toLong' call
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(value);
        tmp.w14(tmp$ret$0);
      }
      gz(encoder, value) {
        return this.b1k(encoder, value instanceof ULong() ? value.ly_1 : THROW_CCE());
      }
      c1k(decoder) {
        // Inline function 'kotlin.toULong' call
        var this_0 = decoder.s13(this.a1k_1).m13();
        return _ULong___init__impl__c78o9k(this_0);
      }
      hz(decoder) {
        return new (ULong())(this.c1k(decoder));
      }
    }
    initMetadataForObject($, 'ULongSerializer', VOID, VOID, [KSerializer()]);
    ULongSerializerClass = $;
  }
  return ULongSerializerClass;
}
var ULongSerializer_instance;
function ULongSerializer_getInstance() {
  if (ULongSerializer_instance === VOID)
    new (ULongSerializer())();
  return ULongSerializer_instance;
}
var UIntSerializerClass;
function UIntSerializer() {
  if (UIntSerializerClass === VOID) {
    class $ {
      constructor() {
        UIntSerializer_instance = this;
        this.d1k_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_0(IntCompanionObject_instance));
      }
      fz() {
        return this.d1k_1;
      }
      e1k(encoder, value) {
        var tmp = encoder.c15(this.d1k_1);
        // Inline function 'kotlin.UInt.toInt' call
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(value);
        tmp.v14(tmp$ret$0);
      }
      gz(encoder, value) {
        return this.e1k(encoder, value instanceof UInt() ? value.zx_1 : THROW_CCE());
      }
      f1k(decoder) {
        // Inline function 'kotlin.toUInt' call
        var this_0 = decoder.s13(this.d1k_1).l13();
        return _UInt___init__impl__l7qpdl(this_0);
      }
      hz(decoder) {
        return new (UInt())(this.f1k(decoder));
      }
    }
    initMetadataForObject($, 'UIntSerializer', VOID, VOID, [KSerializer()]);
    UIntSerializerClass = $;
  }
  return UIntSerializerClass;
}
var UIntSerializer_instance;
function UIntSerializer_getInstance() {
  if (UIntSerializer_instance === VOID)
    new (UIntSerializer())();
  return UIntSerializer_instance;
}
var UShortSerializerClass;
function UShortSerializer() {
  if (UShortSerializerClass === VOID) {
    class $ {
      constructor() {
        UShortSerializer_instance = this;
        this.g1k_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_1(ShortCompanionObject_instance));
      }
      fz() {
        return this.g1k_1;
      }
      h1k(encoder, value) {
        var tmp = encoder.c15(this.g1k_1);
        // Inline function 'kotlin.UShort.toShort' call
        var tmp$ret$0 = _UShort___get_data__impl__g0245(value);
        tmp.u14(tmp$ret$0);
      }
      gz(encoder, value) {
        return this.h1k(encoder, value instanceof UShort() ? value.xy_1 : THROW_CCE());
      }
      i1k(decoder) {
        // Inline function 'kotlin.toUShort' call
        var this_0 = decoder.s13(this.g1k_1).k13();
        return _UShort___init__impl__jigrne(this_0);
      }
      hz(decoder) {
        return new (UShort())(this.i1k(decoder));
      }
    }
    initMetadataForObject($, 'UShortSerializer', VOID, VOID, [KSerializer()]);
    UShortSerializerClass = $;
  }
  return UShortSerializerClass;
}
var UShortSerializer_instance;
function UShortSerializer_getInstance() {
  if (UShortSerializer_instance === VOID)
    new (UShortSerializer())();
  return UShortSerializer_instance;
}
var UByteSerializerClass;
function UByteSerializer() {
  if (UByteSerializerClass === VOID) {
    class $ {
      constructor() {
        UByteSerializer_instance = this;
        this.j1k_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_2(ByteCompanionObject_instance));
      }
      fz() {
        return this.j1k_1;
      }
      k1k(encoder, value) {
        var tmp = encoder.c15(this.j1k_1);
        // Inline function 'kotlin.UByte.toByte' call
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(value);
        tmp.t14(tmp$ret$0);
      }
      gz(encoder, value) {
        return this.k1k(encoder, value instanceof UByte() ? value.nx_1 : THROW_CCE());
      }
      l1k(decoder) {
        // Inline function 'kotlin.toUByte' call
        var this_0 = decoder.s13(this.j1k_1).j13();
        return _UByte___init__impl__g9hnc4(this_0);
      }
      hz(decoder) {
        return new (UByte())(this.l1k(decoder));
      }
    }
    initMetadataForObject($, 'UByteSerializer', VOID, VOID, [KSerializer()]);
    UByteSerializerClass = $;
  }
  return UByteSerializerClass;
}
var UByteSerializer_instance;
function UByteSerializer_getInstance() {
  if (UByteSerializer_instance === VOID)
    new (UByteSerializer())();
  return UByteSerializer_instance;
}
//region block: exports
export {
  UByteSerializer_getInstance as UByteSerializer_getInstance3s4kn84g1efyy,
  UIntSerializer_getInstance as UIntSerializer_getInstancetd3sbgi6bazj,
  ULongSerializer_getInstance as ULongSerializer_getInstance1pt7p8sfwyqvu,
  UShortSerializer_getInstance as UShortSerializer_getInstance125rt1ltxdym5,
};
//endregion

//# sourceMappingURL=ValueClasses.mjs.map
