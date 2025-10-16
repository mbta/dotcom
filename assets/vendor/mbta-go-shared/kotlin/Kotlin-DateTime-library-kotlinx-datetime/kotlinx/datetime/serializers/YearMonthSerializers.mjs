import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  Companion_instancenzqgvoghpmjb as Companion_instance,
  YearMonth22nahmknr467s as YearMonth,
} from '../YearMonth.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var YearMonthSerializerClass;
function YearMonthSerializer() {
  if (YearMonthSerializerClass === VOID) {
    class $ {
      constructor() {
        YearMonthSerializer_instance = this;
        this.g8h_1 = PrimitiveSerialDescriptor('kotlinx.datetime.YearMonth', STRING_getInstance());
      }
      fz() {
        return this.g8h_1;
      }
      hz(decoder) {
        return Companion_instance.h8h(decoder.q13());
      }
      i8h(encoder, value) {
        encoder.a15(value.toString());
      }
      gz(encoder, value) {
        return this.i8h(encoder, value instanceof YearMonth() ? value : THROW_CCE());
      }
    }
    initMetadataForObject($, 'YearMonthSerializer', VOID, VOID, [KSerializer()]);
    YearMonthSerializerClass = $;
  }
  return YearMonthSerializerClass;
}
var YearMonthSerializer_instance;
function YearMonthSerializer_getInstance() {
  if (YearMonthSerializer_instance === VOID)
    new (YearMonthSerializer())();
  return YearMonthSerializer_instance;
}
//region block: exports
export {
  YearMonthSerializer_getInstance as YearMonthSerializer_getInstance23qggprpssx5n,
};
//endregion

//# sourceMappingURL=YearMonthSerializers.mjs.map
