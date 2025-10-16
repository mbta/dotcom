import { createSimpleEnumSerializer2guioz11kk1m0 as createSimpleEnumSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { GMTDate36bhedawynxlf as GMTDate } from './DateJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
  LongSerializer_getInstance194e4t3ow5wjs as LongSerializer_getInstance,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function GMTDate$Companion$$childSerializers$_anonymous__gyfycy() {
  return createSimpleEnumSerializer('io.ktor.util.date.WeekDay', values());
}
function GMTDate$Companion$$childSerializers$_anonymous__gyfycy_0() {
  return createSimpleEnumSerializer('io.ktor.util.date.Month', values_0());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, GMTDate$Companion$$childSerializers$_anonymous__gyfycy);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.w3j_1 = [null, null, null, tmp_1, null, null, lazy(tmp_2, GMTDate$Companion$$childSerializers$_anonymous__gyfycy_0), null, null];
        this.x3j_1 = GMTDate(new (Long())(0, 0));
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('io.ktor.util.date.GMTDate', this, 9);
        tmp0_serialDesc.p1b('seconds', false);
        tmp0_serialDesc.p1b('minutes', false);
        tmp0_serialDesc.p1b('hours', false);
        tmp0_serialDesc.p1b('dayOfWeek', false);
        tmp0_serialDesc.p1b('dayOfMonth', false);
        tmp0_serialDesc.p1b('dayOfYear', false);
        tmp0_serialDesc.p1b('month', false);
        tmp0_serialDesc.p1b('year', false);
        tmp0_serialDesc.p1b('timestamp', false);
        this.y3j_1 = tmp0_serialDesc;
      }
      z3j(encoder, value) {
        var tmp0_desc = this.y3j_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().w3j_1;
        tmp1_output.g15(tmp0_desc, 0, value.a3k_1);
        tmp1_output.g15(tmp0_desc, 1, value.b3k_1);
        tmp1_output.g15(tmp0_desc, 2, value.c3k_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.d3k_1);
        tmp1_output.g15(tmp0_desc, 4, value.e3k_1);
        tmp1_output.g15(tmp0_desc, 5, value.f3k_1);
        tmp1_output.n15(tmp0_desc, 6, tmp2_cached[6].v1(), value.g3k_1);
        tmp1_output.g15(tmp0_desc, 7, value.h3k_1);
        tmp1_output.h15(tmp0_desc, 8, value.i3k_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.z3j(encoder, value instanceof GMTDate_0() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.y3j_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = 0;
        var tmp5_local1 = 0;
        var tmp6_local2 = 0;
        var tmp7_local3 = null;
        var tmp8_local4 = 0;
        var tmp9_local5 = 0;
        var tmp10_local6 = null;
        var tmp11_local7 = 0;
        var tmp12_local8 = new (Long())(0, 0);
        var tmp13_input = decoder.v13(tmp0_desc);
        var tmp14_cached = Companion_getInstance().w3j_1;
        if (tmp13_input.l14()) {
          tmp4_local0 = tmp13_input.a14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp13_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp13_input.a14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp13_input.h14(tmp0_desc, 3, tmp14_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp13_input.a14(tmp0_desc, 4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp13_input.a14(tmp0_desc, 5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp13_input.h14(tmp0_desc, 6, tmp14_cached[6].v1(), tmp10_local6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
          tmp11_local7 = tmp13_input.a14(tmp0_desc, 7);
          tmp3_bitMask0 = tmp3_bitMask0 | 128;
          tmp12_local8 = tmp13_input.b14(tmp0_desc, 8);
          tmp3_bitMask0 = tmp3_bitMask0 | 256;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp13_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp13_input.a14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp13_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp13_input.a14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp13_input.h14(tmp0_desc, 3, tmp14_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp13_input.a14(tmp0_desc, 4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp13_input.a14(tmp0_desc, 5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp13_input.h14(tmp0_desc, 6, tmp14_cached[6].v1(), tmp10_local6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              case 7:
                tmp11_local7 = tmp13_input.a14(tmp0_desc, 7);
                tmp3_bitMask0 = tmp3_bitMask0 | 128;
                break;
              case 8:
                tmp12_local8 = tmp13_input.b14(tmp0_desc, 8);
                tmp3_bitMask0 = tmp3_bitMask0 | 256;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp13_input.w13(tmp0_desc);
        return GMTDate_0().j3k(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, tmp11_local7, tmp12_local8, null);
      }
      fz() {
        return this.y3j_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().w3j_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [IntSerializer_getInstance(), IntSerializer_getInstance(), IntSerializer_getInstance(), tmp0_cached[3].v1(), IntSerializer_getInstance(), IntSerializer_getInstance(), tmp0_cached[6].v1(), IntSerializer_getInstance(), LongSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var GMTDateClass;
function GMTDate_0() {
  if (GMTDateClass === VOID) {
    class $ {
      constructor(seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp) {
        Companion_getInstance();
        this.a3k_1 = seconds;
        this.b3k_1 = minutes;
        this.c3k_1 = hours;
        this.d3k_1 = dayOfWeek;
        this.e3k_1 = dayOfMonth;
        this.f3k_1 = dayOfYear;
        this.g3k_1 = month;
        this.h3k_1 = year;
        this.i3k_1 = timestamp;
      }
      k3k(other) {
        return this.i3k_1.d2(other.i3k_1);
      }
      d(other) {
        return this.k3k(other instanceof GMTDate_0() ? other : THROW_CCE());
      }
      toString() {
        return 'GMTDate(seconds=' + this.a3k_1 + ', minutes=' + this.b3k_1 + ', hours=' + this.c3k_1 + ', dayOfWeek=' + this.d3k_1.toString() + ', dayOfMonth=' + this.e3k_1 + ', dayOfYear=' + this.f3k_1 + ', month=' + this.g3k_1.toString() + ', year=' + this.h3k_1 + ', timestamp=' + this.i3k_1.toString() + ')';
      }
      hashCode() {
        var result = this.a3k_1;
        result = imul(result, 31) + this.b3k_1 | 0;
        result = imul(result, 31) + this.c3k_1 | 0;
        result = imul(result, 31) + this.d3k_1.hashCode() | 0;
        result = imul(result, 31) + this.e3k_1 | 0;
        result = imul(result, 31) + this.f3k_1 | 0;
        result = imul(result, 31) + this.g3k_1.hashCode() | 0;
        result = imul(result, 31) + this.h3k_1 | 0;
        result = imul(result, 31) + this.i3k_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof GMTDate_0()))
          return false;
        var tmp0_other_with_cast = other instanceof GMTDate_0() ? other : THROW_CCE();
        if (!(this.a3k_1 === tmp0_other_with_cast.a3k_1))
          return false;
        if (!(this.b3k_1 === tmp0_other_with_cast.b3k_1))
          return false;
        if (!(this.c3k_1 === tmp0_other_with_cast.c3k_1))
          return false;
        if (!this.d3k_1.equals(tmp0_other_with_cast.d3k_1))
          return false;
        if (!(this.e3k_1 === tmp0_other_with_cast.e3k_1))
          return false;
        if (!(this.f3k_1 === tmp0_other_with_cast.f3k_1))
          return false;
        if (!this.g3k_1.equals(tmp0_other_with_cast.g3k_1))
          return false;
        if (!(this.h3k_1 === tmp0_other_with_cast.h3k_1))
          return false;
        if (!this.i3k_1.equals(tmp0_other_with_cast.i3k_1))
          return false;
        return true;
      }
      static j3k(seen0, seconds, minutes, hours, dayOfWeek, dayOfMonth, dayOfYear, month, year, timestamp, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(511 === (511 & seen0))) {
          throwMissingFieldException(seen0, 511, $serializer_getInstance().y3j_1);
        }
        var $this = createThis(this);
        $this.a3k_1 = seconds;
        $this.b3k_1 = minutes;
        $this.c3k_1 = hours;
        $this.d3k_1 = dayOfWeek;
        $this.e3k_1 = dayOfMonth;
        $this.f3k_1 = dayOfYear;
        $this.g3k_1 = month;
        $this.h3k_1 = year;
        $this.i3k_1 = timestamp;
        return $this;
      }
    }
    initMetadataForClass($, 'GMTDate', VOID, VOID, [Comparable()], VOID, VOID, {0: $serializer_getInstance});
    GMTDateClass = $;
  }
  return GMTDateClass;
}
var WeekDay_MONDAY_instance;
var WeekDay_TUESDAY_instance;
var WeekDay_WEDNESDAY_instance;
var WeekDay_THURSDAY_instance;
var WeekDay_FRIDAY_instance;
var WeekDay_SATURDAY_instance;
var WeekDay_SUNDAY_instance;
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      l3k(ordinal) {
        return get_entries().e1(ordinal);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
function values() {
  return [WeekDay_MONDAY_getInstance(), WeekDay_TUESDAY_getInstance(), WeekDay_WEDNESDAY_getInstance(), WeekDay_THURSDAY_getInstance(), WeekDay_FRIDAY_getInstance(), WeekDay_SATURDAY_getInstance(), WeekDay_SUNDAY_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var WeekDay_entriesInitialized;
function WeekDay_initEntries() {
  if (WeekDay_entriesInitialized)
    return Unit_instance;
  WeekDay_entriesInitialized = true;
  WeekDay_MONDAY_instance = new (WeekDay())('MONDAY', 0, 'Mon');
  WeekDay_TUESDAY_instance = new (WeekDay())('TUESDAY', 1, 'Tue');
  WeekDay_WEDNESDAY_instance = new (WeekDay())('WEDNESDAY', 2, 'Wed');
  WeekDay_THURSDAY_instance = new (WeekDay())('THURSDAY', 3, 'Thu');
  WeekDay_FRIDAY_instance = new (WeekDay())('FRIDAY', 4, 'Fri');
  WeekDay_SATURDAY_instance = new (WeekDay())('SATURDAY', 5, 'Sat');
  WeekDay_SUNDAY_instance = new (WeekDay())('SUNDAY', 6, 'Sun');
}
var $ENTRIES;
var WeekDayClass;
function WeekDay() {
  if (WeekDayClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, value) {
        super(name, ordinal);
        this.o3k_1 = value;
      }
    }
    initMetadataForClass($, 'WeekDay');
    WeekDayClass = $;
  }
  return WeekDayClass;
}
var Month_JANUARY_instance;
var Month_FEBRUARY_instance;
var Month_MARCH_instance;
var Month_APRIL_instance;
var Month_MAY_instance;
var Month_JUNE_instance;
var Month_JULY_instance;
var Month_AUGUST_instance;
var Month_SEPTEMBER_instance;
var Month_OCTOBER_instance;
var Month_NOVEMBER_instance;
var Month_DECEMBER_instance;
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      l3k(ordinal) {
        return get_entries_0().e1(ordinal);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
function values_0() {
  return [Month_JANUARY_getInstance(), Month_FEBRUARY_getInstance(), Month_MARCH_getInstance(), Month_APRIL_getInstance(), Month_MAY_getInstance(), Month_JUNE_getInstance(), Month_JULY_getInstance(), Month_AUGUST_getInstance(), Month_SEPTEMBER_getInstance(), Month_OCTOBER_getInstance(), Month_NOVEMBER_getInstance(), Month_DECEMBER_getInstance()];
}
function get_entries_0() {
  if ($ENTRIES_0 == null)
    $ENTRIES_0 = enumEntries(values_0());
  return $ENTRIES_0;
}
var Month_entriesInitialized;
function Month_initEntries() {
  if (Month_entriesInitialized)
    return Unit_instance;
  Month_entriesInitialized = true;
  Month_JANUARY_instance = new (Month())('JANUARY', 0, 'Jan');
  Month_FEBRUARY_instance = new (Month())('FEBRUARY', 1, 'Feb');
  Month_MARCH_instance = new (Month())('MARCH', 2, 'Mar');
  Month_APRIL_instance = new (Month())('APRIL', 3, 'Apr');
  Month_MAY_instance = new (Month())('MAY', 4, 'May');
  Month_JUNE_instance = new (Month())('JUNE', 5, 'Jun');
  Month_JULY_instance = new (Month())('JULY', 6, 'Jul');
  Month_AUGUST_instance = new (Month())('AUGUST', 7, 'Aug');
  Month_SEPTEMBER_instance = new (Month())('SEPTEMBER', 8, 'Sep');
  Month_OCTOBER_instance = new (Month())('OCTOBER', 9, 'Oct');
  Month_NOVEMBER_instance = new (Month())('NOVEMBER', 10, 'Nov');
  Month_DECEMBER_instance = new (Month())('DECEMBER', 11, 'Dec');
}
var $ENTRIES_0;
var MonthClass;
function Month() {
  if (MonthClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, value) {
        super(name, ordinal);
        this.r3k_1 = value;
      }
    }
    initMetadataForClass($, 'Month');
    MonthClass = $;
  }
  return MonthClass;
}
function WeekDay_MONDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_MONDAY_instance;
}
function WeekDay_TUESDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_TUESDAY_instance;
}
function WeekDay_WEDNESDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_WEDNESDAY_instance;
}
function WeekDay_THURSDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_THURSDAY_instance;
}
function WeekDay_FRIDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_FRIDAY_instance;
}
function WeekDay_SATURDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_SATURDAY_instance;
}
function WeekDay_SUNDAY_getInstance() {
  WeekDay_initEntries();
  return WeekDay_SUNDAY_instance;
}
function Month_JANUARY_getInstance() {
  Month_initEntries();
  return Month_JANUARY_instance;
}
function Month_FEBRUARY_getInstance() {
  Month_initEntries();
  return Month_FEBRUARY_instance;
}
function Month_MARCH_getInstance() {
  Month_initEntries();
  return Month_MARCH_instance;
}
function Month_APRIL_getInstance() {
  Month_initEntries();
  return Month_APRIL_instance;
}
function Month_MAY_getInstance() {
  Month_initEntries();
  return Month_MAY_instance;
}
function Month_JUNE_getInstance() {
  Month_initEntries();
  return Month_JUNE_instance;
}
function Month_JULY_getInstance() {
  Month_initEntries();
  return Month_JULY_instance;
}
function Month_AUGUST_getInstance() {
  Month_initEntries();
  return Month_AUGUST_instance;
}
function Month_SEPTEMBER_getInstance() {
  Month_initEntries();
  return Month_SEPTEMBER_instance;
}
function Month_OCTOBER_getInstance() {
  Month_initEntries();
  return Month_OCTOBER_instance;
}
function Month_NOVEMBER_getInstance() {
  Month_initEntries();
  return Month_NOVEMBER_instance;
}
function Month_DECEMBER_getInstance() {
  Month_initEntries();
  return Month_DECEMBER_instance;
}
//region block: init
Companion_instance_0 = new (Companion_0())();
Companion_instance_1 = new (Companion_1())();
//endregion
//region block: exports
export {
  Companion_instance_1 as Companion_instance3tpkpcdhaapy6,
  Companion_instance_0 as Companion_instance1w106xnn8n2n,
  GMTDate_0 as GMTDate2jy5n6whlljcu,
};
//endregion

//# sourceMappingURL=Date.mjs.map
