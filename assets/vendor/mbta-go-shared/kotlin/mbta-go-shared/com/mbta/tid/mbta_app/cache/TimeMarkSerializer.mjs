import { STRING_getInstance2ou4lro9xn2qn as STRING_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { Companion_getInstance1jfygh5e58evr as Companion_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import { System_instance15pw2079e4stg as System_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Clock.mjs';
import {
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
  ValueTimeMark__minus_impl_f87skoyqdc44davnhd as ValueTimeMark__minus_impl_f87sko,
  ValueTimeMark3e7hmed1q029a as ValueTimeMark,
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_cache_TimeMarkSerializer$stable;
var TimeMarkSerializerClass;
function TimeMarkSerializer() {
  if (TimeMarkSerializerClass === VOID) {
    class $ {
      fz() {
        return PrimitiveSerialDescriptor('TimeSource.Monotonic.ValueTimeMark', STRING_getInstance());
      }
      c8m(decoder) {
        var instant = Companion_getInstance().lv(decoder.q13());
        var now = System_instance.fv();
        return ValueTimeMark__minus_impl_f87sko(Monotonic_instance.ql(), now.qv(instant));
      }
      hz(decoder) {
        return new (ValueTimeMark())(this.c8m(decoder));
      }
      d8m(encoder, value) {
        var elapsed = ValueTimeMark__elapsedNow_impl_eonqvs(value);
        var now = System_instance.fv();
        encoder.a15(now.pv(elapsed).toString());
      }
      gz(encoder, value) {
        return this.d8m(encoder, value instanceof ValueTimeMark() ? value.bm_1 : THROW_CCE());
      }
    }
    initMetadataForObject($, 'TimeMarkSerializer', VOID, VOID, [KSerializer()]);
    TimeMarkSerializerClass = $;
  }
  return TimeMarkSerializerClass;
}
var TimeMarkSerializer_instance;
function TimeMarkSerializer_getInstance() {
  return TimeMarkSerializer_instance;
}
//region block: init
com_mbta_tid_mbta_app_cache_TimeMarkSerializer$stable = 0;
TimeMarkSerializer_instance = new (TimeMarkSerializer())();
//endregion
//region block: exports
export {
  TimeMarkSerializer_instance as TimeMarkSerializer_instance20nbxy674b7dj,
};
//endregion

//# sourceMappingURL=TimeMarkSerializer.mjs.map
