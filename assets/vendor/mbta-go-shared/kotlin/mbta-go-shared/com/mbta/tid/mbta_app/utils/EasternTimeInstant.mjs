import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Companion_getInstance3qu5ydsg8audm as Companion_getInstance,
  toLocalDateTime2fafgh396r2y5 as toLocalDateTime,
  offsetAt16yxz78htuv90 as offsetAt,
} from '../../../../../../Kotlin-DateTime-library-kotlinx-datetime/kotlinx/datetime/TimeZone.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Companion_getInstance1jfygh5e58evr as Companion_getInstance_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import { serializer1j5a5justjsv5 as serializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { SerialDescriptorbzxbhtn690r4 as SerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { System_instance15pw2079e4stg as System_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Clock.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { DatePeriod2y4m7pf19ebgd as DatePeriod } from '../../../../../../Kotlin-DateTime-library-kotlinx-datetime/kotlinx/datetime/DateTimePeriod.mjs';
import { minushnjyym3nfk5o as minus } from '../../../../../../Kotlin-DateTime-library-kotlinx-datetime/kotlinx/datetime/LocalDate.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_utils_EasternTimeInstant_Serializer$stable;
var com_mbta_tid_mbta_app_utils_EasternTimeInstant$stable;
var ServiceDateRounding_FORWARDS_instance;
var ServiceDateRounding_BACKWARDS_instance;
var ServiceDateRounding_entriesInitialized;
function ServiceDateRounding_initEntries() {
  if (ServiceDateRounding_entriesInitialized)
    return Unit_instance;
  ServiceDateRounding_entriesInitialized = true;
  ServiceDateRounding_FORWARDS_instance = new (ServiceDateRounding())('FORWARDS', 0);
  ServiceDateRounding_BACKWARDS_instance = new (ServiceDateRounding())('BACKWARDS', 1);
}
function EasternTimeInstant$Companion$timeZone$delegate$lambda() {
  return Companion_getInstance().b8h('America/New_York');
}
function EasternTimeInstant$Companion$_get_timeZone_$ref_8gdb0t() {
  return function (p0) {
    return p0.vac();
  };
}
var ServiceDateRoundingClass;
function ServiceDateRounding() {
  if (ServiceDateRoundingClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'ServiceDateRounding');
    ServiceDateRoundingClass = $;
  }
  return ServiceDateRoundingClass;
}
var SerializerClass;
function Serializer() {
  if (SerializerClass === VOID) {
    class $ {
      constructor() {
        Serializer_instance = this;
        this.wac_1 = serializer(Companion_getInstance_0());
        this.xac_1 = SerialDescriptor('com.mbta.tid.mbta_app.utils.EasternTimeInstant', this.wac_1.fz());
      }
      fz() {
        return this.xac_1;
      }
      yac(encoder, value) {
        var data = value.h8x_1;
        encoder.o15(this.wac_1, data);
      }
      gz(encoder, value) {
        return this.yac(encoder, value instanceof EasternTimeInstant() ? value : THROW_CCE());
      }
      hz(decoder) {
        var data = decoder.u13(this.wac_1);
        return EasternTimeInstant().z9y(data);
      }
    }
    initMetadataForObject($, 'Serializer', VOID, VOID, [KSerializer()]);
    SerializerClass = $;
  }
  return SerializerClass;
}
var Serializer_instance;
function Serializer_getInstance() {
  if (Serializer_instance === VOID)
    new (Serializer())();
  return Serializer_instance;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        tmp.i8o_1 = lazy(EasternTimeInstant$Companion$timeZone$delegate$lambda);
      }
      vac() {
        var tmp0 = this.i8o_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('timeZone', 1, tmp, EasternTimeInstant$Companion$_get_timeZone_$ref_8gdb0t(), null);
        return tmp0.v1();
      }
      zac(clock) {
        return EasternTimeInstant().z9y(clock.fv());
      }
      j8o(clock, $super) {
        clock = clock === VOID ? System_instance : clock;
        return $super === VOID ? this.zac(clock) : $super.zac.call(this, clock);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_1() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function ServiceDateRounding_BACKWARDS_getInstance() {
  ServiceDateRounding_initEntries();
  return ServiceDateRounding_BACKWARDS_instance;
}
var EasternTimeInstantClass;
function EasternTimeInstant() {
  if (EasternTimeInstantClass === VOID) {
    class $ {
      static aad(instant, local) {
        Companion_getInstance_1();
        var $this = createThis(this);
        $this.h8x_1 = instant;
        $this.i8x_1 = local;
        return $this;
      }
      static z9y(instant) {
        Companion_getInstance_1();
        return this.aad(instant, toLocalDateTime(instant, Companion_getInstance_1().vac()));
      }
      bad() {
        return this.h8x_1;
      }
      j8x() {
        return this.i8x_1.r86() >= 3 ? this.i8x_1.h86_1 : minus(this.i8x_1.h86_1, DatePeriod().d80(VOID, VOID, 1));
      }
      k8x(rounding) {
        return rounding.equals(ServiceDateRounding_BACKWARDS_getInstance()) && this.i8x_1.r86() === 3 && this.i8x_1.l86() === 0 ? minus(this.j8x(), DatePeriod().d80(VOID, VOID, 1)) : this.j8x();
      }
      cad(divisor) {
        return this.h8x_1.jl_1.j4(divisor).equals(new (Long())(0, 0));
      }
      ll() {
        return this.h8x_1.ll();
      }
      ov(duration) {
        return EasternTimeInstant().z9y(this.h8x_1.ov(duration));
      }
      c9m(other) {
        return this.h8x_1.qv(other.h8x_1);
      }
      q8y(other) {
        return this.h8x_1.rv(other.h8x_1);
      }
      d(other) {
        return this.q8y(other instanceof EasternTimeInstant() ? other : THROW_CCE());
      }
      equals(other) {
        var tmp;
        if (other instanceof EasternTimeInstant()) {
          tmp = this.h8x_1.equals(other.h8x_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.h8x_1.hashCode();
      }
      toString() {
        return this.i8x_1.toString() + offsetAt(Companion_getInstance_1().vac(), this.h8x_1).toString();
      }
    }
    initMetadataForClass($, 'EasternTimeInstant', VOID, VOID, [Comparable()], VOID, VOID, {0: Serializer_getInstance});
    EasternTimeInstantClass = $;
  }
  return EasternTimeInstantClass;
}
//region block: init
com_mbta_tid_mbta_app_utils_EasternTimeInstant_Serializer$stable = 8;
com_mbta_tid_mbta_app_utils_EasternTimeInstant$stable = 8;
//endregion
//region block: exports
export {
  EasternTimeInstant as EasternTimeInstant2gkkx101nv2no,
  ServiceDateRounding_BACKWARDS_getInstance as ServiceDateRounding_BACKWARDS_getInstancezf0hqmb3grtb,
  Companion_getInstance_1 as Companion_getInstance2mow8xipgd4ir,
  Serializer_getInstance as Serializer_getInstance1l5ru82blsodh,
};
//endregion

//# sourceMappingURL=EasternTimeInstant.mjs.map
