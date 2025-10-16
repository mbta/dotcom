import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  DatePeriod2y4m7pf19ebgd as DatePeriod,
  DateTimePeriod384alsehm5scz as DateTimePeriod,
  Companion_instance25i2l13l26m9w as Companion_instance,
} from '../DateTimePeriod.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DatePeriodSerializerClass;
function DatePeriodSerializer() {
  if (DatePeriodSerializerClass === VOID) {
    class $ {
      constructor() {
        DatePeriodSerializer_instance = this;
        this.k8f_1 = DatePeriodIso8601Serializer_getInstance();
        this.l8f_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DatePeriod', STRING_getInstance());
      }
      fz() {
        return this.l8f_1;
      }
      m8f(encoder, value) {
        this.k8f_1.m8f(encoder, value);
      }
      gz(encoder, value) {
        return this.m8f(encoder, value instanceof DatePeriod() ? value : THROW_CCE());
      }
      hz(decoder) {
        return this.k8f_1.hz(decoder);
      }
    }
    initMetadataForObject($, 'DatePeriodSerializer', VOID, VOID, [KSerializer()]);
    DatePeriodSerializerClass = $;
  }
  return DatePeriodSerializerClass;
}
var DatePeriodSerializer_instance;
function DatePeriodSerializer_getInstance() {
  if (DatePeriodSerializer_instance === VOID)
    new (DatePeriodSerializer())();
  return DatePeriodSerializer_instance;
}
var DateTimePeriodSerializerClass;
function DateTimePeriodSerializer() {
  if (DateTimePeriodSerializerClass === VOID) {
    class $ {
      constructor() {
        DateTimePeriodSerializer_instance = this;
        this.o8f_1 = DateTimePeriodIso8601Serializer_getInstance();
        this.p8f_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DateTimePeriod', STRING_getInstance());
      }
      fz() {
        return this.p8f_1;
      }
      q8f(encoder, value) {
        this.o8f_1.q8f(encoder, value);
      }
      gz(encoder, value) {
        return this.q8f(encoder, value instanceof DateTimePeriod() ? value : THROW_CCE());
      }
      hz(decoder) {
        return this.o8f_1.hz(decoder);
      }
    }
    initMetadataForObject($, 'DateTimePeriodSerializer', VOID, VOID, [KSerializer()]);
    DateTimePeriodSerializerClass = $;
  }
  return DateTimePeriodSerializerClass;
}
var DateTimePeriodSerializer_instance;
function DateTimePeriodSerializer_getInstance() {
  if (DateTimePeriodSerializer_instance === VOID)
    new (DateTimePeriodSerializer())();
  return DateTimePeriodSerializer_instance;
}
var DatePeriodIso8601SerializerClass;
function DatePeriodIso8601Serializer() {
  if (DatePeriodIso8601SerializerClass === VOID) {
    class $ {
      constructor() {
        DatePeriodIso8601Serializer_instance = this;
        this.n8f_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DatePeriod/ISO', STRING_getInstance());
      }
      fz() {
        return this.n8f_1;
      }
      hz(decoder) {
        var period = Companion_instance.dx(decoder.q13());
        var tmp;
        if (period instanceof DatePeriod()) {
          tmp = period;
        } else {
          throw SerializationException().w10(period.toString() + ' is not a date-based period');
        }
        return tmp;
      }
      m8f(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.m8f(encoder, value instanceof DatePeriod() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'DatePeriodIso8601Serializer', VOID, VOID, [KSerializer()]);
    DatePeriodIso8601SerializerClass = $;
  }
  return DatePeriodIso8601SerializerClass;
}
var DatePeriodIso8601Serializer_instance;
function DatePeriodIso8601Serializer_getInstance() {
  if (DatePeriodIso8601Serializer_instance === VOID)
    new (DatePeriodIso8601Serializer())();
  return DatePeriodIso8601Serializer_instance;
}
var DateTimePeriodIso8601SerializerClass;
function DateTimePeriodIso8601Serializer() {
  if (DateTimePeriodIso8601SerializerClass === VOID) {
    class $ {
      constructor() {
        DateTimePeriodIso8601Serializer_instance = this;
        this.r8f_1 = PrimitiveSerialDescriptor('kotlinx.datetime.DateTimePeriod/ISO', STRING_getInstance());
      }
      fz() {
        return this.r8f_1;
      }
      hz(decoder) {
        return Companion_instance.dx(decoder.q13());
      }
      q8f(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.q8f(encoder, value instanceof DateTimePeriod() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'DateTimePeriodIso8601Serializer', VOID, VOID, [KSerializer()]);
    DateTimePeriodIso8601SerializerClass = $;
  }
  return DateTimePeriodIso8601SerializerClass;
}
var DateTimePeriodIso8601Serializer_instance;
function DateTimePeriodIso8601Serializer_getInstance() {
  if (DateTimePeriodIso8601Serializer_instance === VOID)
    new (DateTimePeriodIso8601Serializer())();
  return DateTimePeriodIso8601Serializer_instance;
}
//region block: exports
export {
  DatePeriodSerializer_getInstance as DatePeriodSerializer_getInstance1btgjyjuj7dyl,
  DateTimePeriodSerializer_getInstance as DateTimePeriodSerializer_getInstancew9uog9fa2zsv,
};
//endregion

//# sourceMappingURL=DateTimePeriodSerializers.mjs.map
