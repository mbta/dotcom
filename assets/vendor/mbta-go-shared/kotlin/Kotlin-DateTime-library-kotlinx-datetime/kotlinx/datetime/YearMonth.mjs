import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_ISO_YEAR_MONTHnhzdbkah361r as get_ISO_YEAR_MONTH } from './format/YearMonthFormat.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_getInstancefc1kb6w5z78x as Companion_getInstance } from './LocalDate.mjs';
import { Monthisypd6pyawk7 as Month } from './Month.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { compareValuesBy2ycqeh37x2wfm as compareValuesBy } from '../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { YearMonthSerializer_getInstance23qggprpssx5n as YearMonthSerializer_getInstance } from './serializers/YearMonthSerializers.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      m8i(input, format) {
        return format.lv(input);
      }
      h8h(input, format, $super) {
        format = format === VOID ? Formats_instance.e82() : format;
        return $super === VOID ? this.m8i(input, format) : $super.m8i.call(this, input, format);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var FormatsClass;
function Formats() {
  if (FormatsClass === VOID) {
    class $ {
      e82() {
        return get_ISO_YEAR_MONTH();
      }
    }
    initMetadataForObject($, 'Formats');
    FormatsClass = $;
  }
  return FormatsClass;
}
var Formats_instance;
function Formats_getInstance() {
  return Formats_instance;
}
function YearMonth$_get_year_$ref_chp4n6() {
  return function (p0) {
    return p0.l8a_1;
  };
}
function YearMonth$_get_month_$ref_9rphhd() {
  return function (p0) {
    return p0.o84();
  };
}
var YearMonthClass;
function YearMonth() {
  if (YearMonthClass === VOID) {
    class $ {
      constructor(year, month) {
        this.l8a_1 = year;
        this.m8a_1 = month;
        // Inline function 'kotlin.require' call
        if (!(1 <= month ? month <= 12 : false)) {
          var message = 'Month must be in 1..12, but was ' + month;
          throw IllegalArgumentException().q(toString(message));
        }
        var containsLower = Companion_getInstance().f8g_1.l84_1;
        var containsUpper = Companion_getInstance().g8g_1.l84_1;
        var containsArg = this.l8a_1;
        // Inline function 'kotlin.require' call
        if (!(containsLower <= containsArg ? containsArg <= containsUpper : false)) {
          var message_0 = 'Year ' + this.l8a_1 + ' is out of range: ' + Companion_getInstance().f8g_1.l84_1 + '..' + Companion_getInstance().g8g_1.l84_1;
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      o84() {
        return Month(this.m8a_1);
      }
      n8i(other) {
        var tmp = KProperty1();
        var tmp_0 = getPropertyCallableRef('year', 1, tmp, YearMonth$_get_year_$ref_chp4n6(), null);
        var tmp_1 = KProperty1();
        return compareValuesBy(this, other, [tmp_0, getPropertyCallableRef('month', 1, tmp_1, YearMonth$_get_month_$ref_9rphhd(), null)]);
      }
      d(other) {
        return this.n8i(other instanceof YearMonth() ? other : THROW_CCE());
      }
      toString() {
        return Formats_instance.e82().f82(this);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof YearMonth()) {
          tmp_0 = this.l8a_1 === other.l8a_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.o84().equals(other.o84());
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(this.l8a_1, 31) + this.o84().hashCode() | 0;
      }
    }
    initMetadataForClass($, 'YearMonth', VOID, VOID, [Comparable()], VOID, VOID, {0: YearMonthSerializer_getInstance});
    YearMonthClass = $;
  }
  return YearMonthClass;
}
//region block: init
Companion_instance = new (Companion())();
Formats_instance = new (Formats())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instancenzqgvoghpmjb,
  YearMonth as YearMonth22nahmknr467s,
};
//endregion

//# sourceMappingURL=YearMonth.mjs.map
