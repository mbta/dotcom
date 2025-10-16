import { KProperty02ce7r476m8633 as KProperty0 } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  get_ISO_TIME31n00f6uljtbs as get_ISO_TIME,
  Companion_instance3cjm8zd5cu9tl as Companion_instance,
  Companion_getInstance157hitepwwtjt as Companion_getInstance,
} from './format/LocalTimeFormat.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { LocalTimeSerializer_getInstancevmab8f5nm0t1 as LocalTimeSerializer_getInstance } from './serializers/LocalTimeSerializers.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  char1r4ssccmdfesy as char,
  optional3j6ywsx1pxeh6 as optional,
  secondFractionInternalr53tad5c19e9 as secondFractionInternal,
} from './format/DateTimeFormatBuilder.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function getIsoTimeFormat() {
  return Formats_instance.e82();
}
function format(_this__u8e3s4, format) {
  return format.f82(_this__u8e3s4);
}
function get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS() {
  _init_properties_LocalTime_kt__nmhi56();
  var tmp0 = ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS', 0, tmp, _get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS_$ref_fmwpvv(), null);
  return tmp0.v1();
}
var ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.r8g_1 = new (LocalTime())(0, 0, 0, 0);
        this.s8g_1 = new (LocalTime())(23, 59, 59, 999999999);
      }
      f8i(input, format) {
        return format.lv(input);
      }
      t8g(input, format, $super) {
        format = format === VOID ? getIsoTimeFormat() : format;
        return $super === VOID ? this.f8i(input, format) : $super.f8i.call(this, input, format);
      }
      g8i(secondOfDay, nanoOfSecond) {
        // Inline function 'kotlin.require' call
        // Inline function 'kotlin.require' call
        if (!(0 <= secondOfDay ? secondOfDay < 86400 : false)) {
          var message = 'Failed requirement.';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        // Inline function 'kotlin.require' call
        if (!(0 <= nanoOfSecond ? nanoOfSecond < 1000000000 : false)) {
          var message_0 = 'Failed requirement.';
          throw IllegalArgumentException().q(toString(message_0));
        }
        var hours = secondOfDay / 3600 | 0;
        var secondWithoutHours = secondOfDay - imul(hours, 3600) | 0;
        var minutes = secondWithoutHours / 60 | 0;
        var second = secondWithoutHours - imul(minutes, 60) | 0;
        return new (LocalTime())(hours, minutes, second, nanoOfSecond);
      }
      e8i(nanoOfDay) {
        var tmp;
        if (nanoOfDay.d2(new (Long())(0, 0)) >= 0) {
          var tmp0 = new (Long())(86400, 0);
          // Inline function 'kotlin.Long.times' call
          var other = 1000000000;
          var tmp$ret$0 = tmp0.h4(toLong(other));
          tmp = nanoOfDay.d2(tmp$ret$0) < 0;
        } else {
          tmp = false;
        }
        // Inline function 'kotlin.require' call
        // Inline function 'kotlin.require' call
        if (!tmp) {
          var message = 'Failed requirement.';
          throw IllegalArgumentException().q(toString(message));
        }
        var newNanoOfDay = nanoOfDay;
        var hours = newNanoOfDay.i4(new (Long())(817405952, 838)).f2();
        newNanoOfDay = newNanoOfDay.g4(numberToLong(hours).h4(new (Long())(817405952, 838)));
        var minutes = newNanoOfDay.i4(new (Long())(-129542144, 13)).f2();
        newNanoOfDay = newNanoOfDay.g4(numberToLong(minutes).h4(new (Long())(-129542144, 13)));
        var tmp0_0 = newNanoOfDay;
        // Inline function 'kotlin.Long.div' call
        var other_0 = 1000000000;
        var seconds = tmp0_0.i4(toLong(other_0)).f2();
        var tmp0_1 = newNanoOfDay;
        // Inline function 'kotlin.Long.minus' call
        var other_1 = imul(seconds, 1000000000);
        newNanoOfDay = tmp0_1.g4(toLong(other_1));
        return new (LocalTime())(hours, minutes, seconds, newNanoOfDay.f2());
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var FormatsClass;
function Formats() {
  if (FormatsClass === VOID) {
    class $ {
      e82() {
        return get_ISO_TIME();
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
function _init_$check(value, lower, upper, str) {
  // Inline function 'kotlin.require' call
  if (!(lower <= value ? value <= upper : false)) {
    var message = 'Invalid time: ' + str + ' must be a number between ' + lower + ' and ' + upper + ', got ' + value;
    throw IllegalArgumentException().q(toString(message));
  }
  return Unit_instance;
}
var LocalTimeClass;
function LocalTime() {
  if (LocalTimeClass === VOID) {
    class $ {
      constructor(hour, minute, second, nanosecond) {
        Companion_getInstance_0();
        second = second === VOID ? 0 : second;
        nanosecond = nanosecond === VOID ? 0 : nanosecond;
        this.b87_1 = hour;
        this.c87_1 = minute;
        this.d87_1 = second;
        this.e87_1 = nanosecond;
        _init_$check(this.b87_1, 0, 23, 'hour');
        _init_$check(this.c87_1, 0, 59, 'minute');
        _init_$check(this.d87_1, 0, 59, 'second');
        _init_$check(this.e87_1, 0, 999999999, 'nanosecond');
      }
      a8i(other) {
        var h = compareTo(this.b87_1, other.b87_1);
        if (!(h === 0)) {
          return h;
        }
        var m = compareTo(this.c87_1, other.c87_1);
        if (!(m === 0)) {
          return m;
        }
        var s = compareTo(this.d87_1, other.d87_1);
        if (!(s === 0)) {
          return s;
        }
        return compareTo(this.e87_1, other.e87_1);
      }
      d(other) {
        return this.a8i(other instanceof LocalTime() ? other : THROW_CCE());
      }
      hashCode() {
        var nod = this.d8i();
        return nod.u4(nod.r4(32)).f2();
      }
      c8i() {
        var total = imul(this.b87_1, 3600);
        total = total + imul(this.c87_1, 60) | 0;
        total = total + this.d87_1 | 0;
        return total;
      }
      d8i() {
        var tmp0 = toLong(this.b87_1);
        // Inline function 'kotlin.Long.times' call
        var other = 1000000000;
        // Inline function 'kotlin.Long.times' call
        var total = tmp0.h4(toLong(other)).h4(toLong(3600));
        var tmp = total;
        var tmp0_0 = toLong(this.c87_1);
        // Inline function 'kotlin.Long.times' call
        var other_0 = 1000000000;
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$3 = tmp0_0.h4(toLong(other_0)).h4(toLong(60));
        total = tmp.f4(tmp$ret$3);
        var tmp_0 = total;
        var tmp0_1 = toLong(this.d87_1);
        // Inline function 'kotlin.Long.times' call
        var other_1 = 1000000000;
        var tmp$ret$4 = tmp0_1.h4(toLong(other_1));
        total = tmp_0.f4(tmp$ret$4);
        total = total.f4(toLong(this.e87_1));
        return total;
      }
      toString() {
        return format(this, get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS());
      }
      equals(other) {
        var tmp;
        if (other instanceof LocalTime()) {
          tmp = this.a8i(other) === 0;
        } else {
          tmp = false;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'LocalTime', VOID, VOID, [Comparable()], VOID, VOID, {0: LocalTimeSerializer_getInstance});
    LocalTimeClass = $;
  }
  return LocalTimeClass;
}
function ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda() {
  _init_properties_LocalTime_kt__nmhi56();
  var tmp = Companion_instance;
  return tmp.f87(ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda);
}
function ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda($this$build) {
  _init_properties_LocalTime_kt__nmhi56();
  $this$build.e83();
  char($this$build, _Char___init__impl__6a9atx(58));
  $this$build.g83();
  optional($this$build, VOID, ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda($this$optional) {
  _init_properties_LocalTime_kt__nmhi56();
  char($this$optional, _Char___init__impl__6a9atx(58));
  $this$optional.i83();
  optional($this$optional, VOID, ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_LocalTime_kt__nmhi56();
  char($this$optional, _Char___init__impl__6a9atx(46));
  secondFractionInternal($this$optional, 1, 9, Companion_getInstance().g88_1);
  return Unit_instance;
}
function _get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS_$ref_fmwpvv() {
  return function () {
    return get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS();
  };
}
var properties_initialized_LocalTime_kt_bt8uiw;
function _init_properties_LocalTime_kt__nmhi56() {
  if (!properties_initialized_LocalTime_kt_bt8uiw) {
    properties_initialized_LocalTime_kt_bt8uiw = true;
    ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate = lazy(ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda);
  }
}
//region block: init
Formats_instance = new (Formats())();
//endregion
//region block: exports
export {
  Companion_getInstance_0 as Companion_getInstance3vhybkmm49bju,
  get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS as get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS1pgdef0x3xl4f,
  LocalTime as LocalTime22kisvxz6f9p4,
};
//endregion

//# sourceMappingURL=LocalTime.mjs.map
