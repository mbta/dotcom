import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  Companion_getInstance3vhybkmm49bju as Companion_getInstance,
  LocalTime22kisvxz6f9p4 as LocalTime,
} from '../LocalTime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LocalTimeSerializerClass;
function LocalTimeSerializer() {
  if (LocalTimeSerializerClass === VOID) {
    class $ {
      constructor() {
        LocalTimeSerializer_instance = this;
        this.q8g_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalTime', STRING_getInstance());
      }
      fz() {
        return this.q8g_1;
      }
      hz(decoder) {
        return Companion_getInstance().t8g(decoder.q13());
      }
      u8g(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.u8g(encoder, value instanceof LocalTime() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'LocalTimeSerializer', VOID, VOID, [KSerializer()]);
    LocalTimeSerializerClass = $;
  }
  return LocalTimeSerializerClass;
}
var LocalTimeSerializer_instance;
function LocalTimeSerializer_getInstance() {
  if (LocalTimeSerializer_instance === VOID)
    new (LocalTimeSerializer())();
  return LocalTimeSerializer_instance;
}
//region block: exports
export {
  LocalTimeSerializer_getInstance as LocalTimeSerializer_getInstancevmab8f5nm0t1,
};
//endregion

//# sourceMappingURL=LocalTimeSerializers.mjs.map
