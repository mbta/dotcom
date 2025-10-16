import { NothingSerialDescriptor_getInstance39ckonyn56mmu as NothingSerialDescriptor_getInstance } from './NothingSerialDescriptor.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptorkwnwsc78b2on as PrimitiveSerialDescriptor } from './Primitives.mjs';
import {
  Duration__toIsoString_impl_9h6wsm3b9pty5ms72ij as Duration__toIsoString_impl_9h6wsm,
  Duration5ynfiptaqcrg as Duration,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
} from '../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import {
  Instant2s2zyzgfc4947 as Instant,
  Companion_getInstance1jfygh5e58evr as Companion_getInstance_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import {
  Uuid1zxgztb7abqxx as Uuid,
  Companion_getInstance1cdckxf15vkye as Companion_getInstance_1,
} from '../../../../kotlin-kotlin-stdlib/kotlin/uuid/Uuid.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NothingSerializerClass;
function NothingSerializer() {
  if (NothingSerializerClass === VOID) {
    class $ {
      constructor() {
        NothingSerializer_instance = this;
        this.w15_1 = NothingSerialDescriptor_getInstance();
      }
      fz() {
        return this.w15_1;
      }
      x15(encoder, value) {
        throw SerializationException().w10("'kotlin.Nothing' cannot be serialized");
      }
      gz(encoder, value) {
        var tmp;
        if (false) {
          tmp = value;
        } else {
          tmp = THROW_CCE();
        }
        return this.x15(encoder, tmp);
      }
      hz(decoder) {
        throw SerializationException().w10("'kotlin.Nothing' does not have instances");
      }
    }
    initMetadataForObject($, 'NothingSerializer', VOID, VOID, [KSerializer()]);
    NothingSerializerClass = $;
  }
  return NothingSerializerClass;
}
var NothingSerializer_instance;
function NothingSerializer_getInstance() {
  if (NothingSerializer_instance === VOID)
    new (NothingSerializer())();
  return NothingSerializer_instance;
}
var DurationSerializerClass;
function DurationSerializer() {
  if (DurationSerializerClass === VOID) {
    class $ {
      constructor() {
        DurationSerializer_instance = this;
        this.y15_1 = new (PrimitiveSerialDescriptor())('kotlin.time.Duration', STRING_getInstance());
      }
      fz() {
        return this.y15_1;
      }
      z15(encoder, value) {
        encoder.a15(Duration__toIsoString_impl_9h6wsm(value));
      }
      gz(encoder, value) {
        return this.z15(encoder, value instanceof Duration() ? value.xl_1 : THROW_CCE());
      }
      a16(decoder) {
        return Companion_getInstance().gv(decoder.q13());
      }
      hz(decoder) {
        return new (Duration())(this.a16(decoder));
      }
    }
    initMetadataForObject($, 'DurationSerializer', VOID, VOID, [KSerializer()]);
    DurationSerializerClass = $;
  }
  return DurationSerializerClass;
}
var DurationSerializer_instance;
function DurationSerializer_getInstance() {
  if (DurationSerializer_instance === VOID)
    new (DurationSerializer())();
  return DurationSerializer_instance;
}
var InstantSerializerClass;
function InstantSerializer() {
  if (InstantSerializerClass === VOID) {
    class $ {
      constructor() {
        InstantSerializer_instance = this;
        this.b16_1 = new (PrimitiveSerialDescriptor())('kotlin.time.Instant', STRING_getInstance());
      }
      fz() {
        return this.b16_1;
      }
      c16(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.c16(encoder, value instanceof Instant() ? value : THROW_CCE());
      }
      hz(decoder) {
        return Companion_getInstance_0().lv(decoder.q13());
      }
    }
    initMetadataForObject($, 'InstantSerializer', VOID, VOID, [KSerializer()]);
    InstantSerializerClass = $;
  }
  return InstantSerializerClass;
}
var InstantSerializer_instance;
function InstantSerializer_getInstance() {
  if (InstantSerializer_instance === VOID)
    new (InstantSerializer())();
  return InstantSerializer_instance;
}
var UuidSerializerClass;
function UuidSerializer() {
  if (UuidSerializerClass === VOID) {
    class $ {
      constructor() {
        UuidSerializer_instance = this;
        this.d16_1 = new (PrimitiveSerialDescriptor())('kotlin.uuid.Uuid', STRING_getInstance());
      }
      fz() {
        return this.d16_1;
      }
      e16(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.e16(encoder, value instanceof Uuid() ? value : THROW_CCE());
      }
      hz(decoder) {
        return Companion_getInstance_1().dx(decoder.q13());
      }
    }
    initMetadataForObject($, 'UuidSerializer', VOID, VOID, [KSerializer()]);
    UuidSerializerClass = $;
  }
  return UuidSerializerClass;
}
var UuidSerializer_instance;
function UuidSerializer_getInstance() {
  if (UuidSerializer_instance === VOID)
    new (UuidSerializer())();
  return UuidSerializer_instance;
}
//region block: exports
export {
  DurationSerializer_getInstance as DurationSerializer_getInstanceo50ej00g6vz5,
  InstantSerializer_getInstance as InstantSerializer_getInstance2lbsjgw870jbk,
  NothingSerializer_getInstance as NothingSerializer_getInstancejqk7fqid1kug,
  UuidSerializer_getInstance as UuidSerializer_getInstance1ils3vei9gjnd,
};
//endregion

//# sourceMappingURL=BuiltInSerializers.mjs.map
