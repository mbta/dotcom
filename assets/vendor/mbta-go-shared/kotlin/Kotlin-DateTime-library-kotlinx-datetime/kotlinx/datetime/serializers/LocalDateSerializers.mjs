import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  Companion_getInstancefc1kb6w5z78x as Companion_getInstance,
  LocalDate31mqn6zavbpi8 as LocalDate,
} from '../LocalDate.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var LocalDateSerializerClass;
function LocalDateSerializer() {
  if (LocalDateSerializerClass === VOID) {
    class $ {
      constructor() {
        LocalDateSerializer_instance = this;
        this.e8g_1 = PrimitiveSerialDescriptor('kotlinx.datetime.LocalDate', STRING_getInstance());
      }
      fz() {
        return this.e8g_1;
      }
      hz(decoder) {
        return Companion_getInstance().j8g(decoder.q13());
      }
      k8g(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.k8g(encoder, value instanceof LocalDate() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'LocalDateSerializer', VOID, VOID, [KSerializer()]);
    LocalDateSerializerClass = $;
  }
  return LocalDateSerializerClass;
}
var LocalDateSerializer_instance;
function LocalDateSerializer_getInstance() {
  if (LocalDateSerializer_instance === VOID)
    new (LocalDateSerializer())();
  return LocalDateSerializer_instance;
}
//region block: exports
export {
  LocalDateSerializer_getInstance as LocalDateSerializer_getInstance2ir4dj2eqtzf2,
};
//endregion

//# sourceMappingURL=LocalDateSerializers.mjs.map
