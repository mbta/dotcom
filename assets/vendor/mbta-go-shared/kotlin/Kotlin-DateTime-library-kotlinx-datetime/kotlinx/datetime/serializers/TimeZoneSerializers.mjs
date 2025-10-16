import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  Companion_getInstance3p275ab8rhrps as Companion_getInstance,
  UtcOffset17lxgyhnn4rny as UtcOffset,
} from '../UtcOffset.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Companion_getInstance3qu5ydsg8audm as Companion_getInstance_0,
  TimeZone3oibfp0mqo4lg as TimeZone,
  FixedOffsetTimeZone3oldrgkltiv4z as FixedOffsetTimeZone,
} from '../TimeZone.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var UtcOffsetSerializerClass;
function UtcOffsetSerializer() {
  if (UtcOffsetSerializerClass === VOID) {
    class $ {
      constructor() {
        UtcOffsetSerializer_instance = this;
        this.v8g_1 = PrimitiveSerialDescriptor('kotlinx.datetime.UtcOffset', STRING_getInstance());
      }
      fz() {
        return this.v8g_1;
      }
      hz(decoder) {
        return Companion_getInstance().x8g(decoder.q13());
      }
      y8g(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.y8g(encoder, value instanceof UtcOffset() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'UtcOffsetSerializer', VOID, VOID, [KSerializer()]);
    UtcOffsetSerializerClass = $;
  }
  return UtcOffsetSerializerClass;
}
var UtcOffsetSerializer_instance;
function UtcOffsetSerializer_getInstance() {
  if (UtcOffsetSerializer_instance === VOID)
    new (UtcOffsetSerializer())();
  return UtcOffsetSerializer_instance;
}
var TimeZoneSerializerClass;
function TimeZoneSerializer() {
  if (TimeZoneSerializerClass === VOID) {
    class $ {
      constructor() {
        TimeZoneSerializer_instance = this;
        this.z8g_1 = PrimitiveSerialDescriptor('kotlinx.datetime.TimeZone', STRING_getInstance());
      }
      fz() {
        return this.z8g_1;
      }
      hz(decoder) {
        return Companion_getInstance_0().b8h(decoder.q13());
      }
      c8h(encoder, value) {
        encoder.a15(value.d8h());
      }
      gz(encoder, value) {
        return this.c8h(encoder, value instanceof TimeZone() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'TimeZoneSerializer', VOID, VOID, [KSerializer()]);
    TimeZoneSerializerClass = $;
  }
  return TimeZoneSerializerClass;
}
var TimeZoneSerializer_instance;
function TimeZoneSerializer_getInstance() {
  if (TimeZoneSerializer_instance === VOID)
    new (TimeZoneSerializer())();
  return TimeZoneSerializer_instance;
}
var FixedOffsetTimeZoneSerializerClass;
function FixedOffsetTimeZoneSerializer() {
  if (FixedOffsetTimeZoneSerializerClass === VOID) {
    class $ {
      constructor() {
        FixedOffsetTimeZoneSerializer_instance = this;
        this.e8h_1 = PrimitiveSerialDescriptor('kotlinx.datetime.FixedOffsetTimeZone', STRING_getInstance());
      }
      fz() {
        return this.e8h_1;
      }
      hz(decoder) {
        var zone = Companion_getInstance_0().b8h(decoder.q13());
        if (zone instanceof FixedOffsetTimeZone()) {
          return zone;
        } else {
          throw SerializationException().w10("Timezone identifier '" + zone.toString() + "' does not correspond to a fixed-offset timezone");
        }
      }
      f8h(encoder, value) {
        encoder.a15(value.j82_1);
      }
      gz(encoder, value) {
        return this.f8h(encoder, value instanceof FixedOffsetTimeZone() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'FixedOffsetTimeZoneSerializer', VOID, VOID, [KSerializer()]);
    FixedOffsetTimeZoneSerializerClass = $;
  }
  return FixedOffsetTimeZoneSerializerClass;
}
var FixedOffsetTimeZoneSerializer_instance;
function FixedOffsetTimeZoneSerializer_getInstance() {
  if (FixedOffsetTimeZoneSerializer_instance === VOID)
    new (FixedOffsetTimeZoneSerializer())();
  return FixedOffsetTimeZoneSerializer_instance;
}
//region block: exports
export {
  FixedOffsetTimeZoneSerializer_getInstance as FixedOffsetTimeZoneSerializer_getInstance1l46ueoee8ix3,
  TimeZoneSerializer_getInstance as TimeZoneSerializer_getInstanceqa9aveo7y5x8,
  UtcOffsetSerializer_getInstance as UtcOffsetSerializer_getInstancehfvjgq5w8o12,
};
//endregion

//# sourceMappingURL=TimeZoneSerializers.mjs.map
