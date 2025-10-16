import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  Companion_getInstance2vzevs5m6d283 as Companion_getInstance,
  LocalDateTime3vqv9moe7clf4 as LocalDateTime,
} from '../LocalDateTime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LocalDateTimeSerializerClass;
function LocalDateTimeSerializer() {
  if (LocalDateTimeSerializerClass === VOID) {
    class $ {
      constructor() {
        LocalDateTimeSerializer_instance = this;
        this.l8g_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDateTime', STRING_getInstance());
      }
      fz() {
        return this.l8g_1;
      }
      hz(decoder) {
        return Companion_getInstance().o8g(decoder.q13());
      }
      p8g(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.p8g(encoder, value instanceof LocalDateTime() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'LocalDateTimeSerializer', VOID, VOID, [KSerializer()]);
    LocalDateTimeSerializerClass = $;
  }
  return LocalDateTimeSerializerClass;
}
var LocalDateTimeSerializer_instance;
function LocalDateTimeSerializer_getInstance() {
  if (LocalDateTimeSerializer_instance === VOID)
    new (LocalDateTimeSerializer())();
  return LocalDateTimeSerializer_instance;
}
//region block: exports
export {
  LocalDateTimeSerializer_getInstance as LocalDateTimeSerializer_getInstance2whaazvcjqvqm,
};
//endregion

//# sourceMappingURL=LocalDateTimeSerializers.mjs.map
