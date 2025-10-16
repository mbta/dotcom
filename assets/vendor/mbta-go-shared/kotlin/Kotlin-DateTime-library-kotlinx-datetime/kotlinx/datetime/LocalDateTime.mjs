import { KProperty02ce7r476m8633 as KProperty0 } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Companion_getInstancefc1kb6w5z78x as Companion_getInstance } from './LocalDate.mjs';
import {
  Companion_getInstance3vhybkmm49bju as Companion_getInstance_0,
  get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS1pgdef0x3xl4f as get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS,
} from './LocalTime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  get_ISO_DATETIME2pryl9hy3c2kg as get_ISO_DATETIME,
  Companion_instance6qbrtyiwm67y as Companion_instance,
} from './format/LocalDateTimeFormat.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { LocalDateTimeSerializer_getInstance2whaazvcjqvqm as LocalDateTimeSerializer_getInstance } from './serializers/LocalDateTimeSerializers.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_ISO_DATE1ah0stqy13618 as get_ISO_DATE } from './format/LocalDateFormat.mjs';
import {
  alternativeParsing1gmwubnsvpp9b as alternativeParsing,
  char1r4ssccmdfesy as char,
} from './format/DateTimeFormatBuilder.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getIsoDateTimeFormat() {
  return Formats_getInstance().g82_1;
}
function format(_this__u8e3s4, format) {
  return format.f82(_this__u8e3s4);
}
function get_ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS() {
  _init_properties_LocalDateTime_kt__bewbbg();
  var tmp0 = ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS', 0, tmp, _get_ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS_$ref_4ujexv(), null);
  return tmp0.v1();
}
var ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.m8g_1 = new (LocalDateTime())(Companion_getInstance().f8g_1, Companion_getInstance_0().r8g_1);
        this.n8g_1 = new (LocalDateTime())(Companion_getInstance().g8g_1, Companion_getInstance_0().s8g_1);
      }
      y8h(input, format) {
        return format.lv(input);
      }
      o8g(input, format, $super) {
        format = format === VOID ? getIsoDateTimeFormat() : format;
        return $super === VOID ? this.y8h(input, format) : $super.y8h.call(this, input, format);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance_1() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var FormatsClass;
function Formats() {
  if (FormatsClass === VOID) {
    class $ {
      constructor() {
        Formats_instance = this;
        this.g82_1 = get_ISO_DATETIME();
      }
    }
    initMetadataForObject($, 'Formats');
    FormatsClass = $;
  }
  return FormatsClass;
}
var Formats_instance;
function Formats_getInstance() {
  if (Formats_instance === VOID)
    new (Formats())();
  return Formats_instance;
}
var LocalDateTimeClass;
function LocalDateTime() {
  if (LocalDateTimeClass === VOID) {
    class $ {
      constructor(date, time) {
        Companion_getInstance_1();
        this.h86_1 = date;
        this.i86_1 = time;
      }
      k84() {
        return this.h86_1.l84_1;
      }
      r86() {
        return this.i86_1.b87_1;
      }
      l86() {
        return this.i86_1.c87_1;
      }
      p86() {
        return this.i86_1.e87_1;
      }
      z8h(other) {
        var d = this.h86_1.v8h(other.h86_1);
        if (!(d === 0)) {
          return d;
        }
        return this.i86_1.a8i(other.i86_1);
      }
      d(other) {
        return this.z8h(other instanceof LocalDateTime() ? other : THROW_CCE());
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof LocalDateTime()) {
            tmp_0 = this.z8h(other) === 0;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return this.h86_1.hashCode() ^ this.i86_1.hashCode();
      }
      toString() {
        return format(this, get_ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS());
      }
      b8i(offset) {
        var epochDay = this.h86_1.u8h().x4();
        // Inline function 'kotlin.Long.times' call
        var tmp0 = epochDay.h4(toLong(86400));
        // Inline function 'kotlin.Long.plus' call
        var other = this.i86_1.c8i();
        var secs = tmp0.f4(toLong(other));
        var tmp0_0 = secs;
        // Inline function 'kotlin.Long.minus' call
        var other_0 = offset.f89_1;
        secs = tmp0_0.g4(toLong(other_0));
        return secs;
      }
    }
    initMetadataForClass($, 'LocalDateTime', VOID, VOID, [Comparable()], VOID, VOID, {0: LocalDateTimeSerializer_getInstance});
    LocalDateTimeClass = $;
  }
  return LocalDateTimeClass;
}
function plusSeconds(_this__u8e3s4, seconds) {
  _init_properties_LocalDateTime_kt__bewbbg();
  if (seconds === 0) {
    return _this__u8e3s4;
  }
  var currentNanoOfDay = _this__u8e3s4.i86_1.d8i();
  var totalNanos = numberToLong(seconds % 86400 | 0).h4(new (Long())(1000000000, 0)).f4(currentNanoOfDay);
  var tmp = seconds / 86400 | 0;
  // Inline function 'kotlin.floorDiv' call
  var other = new (Long())(-1857093632, 20116);
  var q = totalNanos.i4(other);
  if (totalNanos.u4(other).d2(new (Long())(0, 0)) < 0 && !q.h4(other).equals(totalNanos)) {
    q = q.l4();
  }
  var tmp$ret$0 = q;
  var totalDays = numberToLong(tmp).f4(tmp$ret$0);
  // Inline function 'kotlin.mod' call
  var other_0 = new (Long())(-1857093632, 20116);
  var r = totalNanos.j4(other_0);
  var newNanoOfDay = r.f4(other_0.s4(r.u4(other_0).s4(r.t4(r.m4())).q4(63)));
  var newTime = newNanoOfDay.equals(currentNanoOfDay) ? _this__u8e3s4.i86_1 : Companion_getInstance_0().e8i(newNanoOfDay);
  return new (LocalDateTime())(_this__u8e3s4.h86_1.x8h(totalDays), newTime);
}
function ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda() {
  _init_properties_LocalDateTime_kt__bewbbg();
  var tmp = Companion_instance;
  return tmp.q85(ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda);
}
function ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda($this$build) {
  _init_properties_LocalDateTime_kt__bewbbg();
  $this$build.c83(get_ISO_DATE());
  var tmp = [ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda];
  alternativeParsing($this$build, tmp, ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda_0);
  $this$build.k83(get_ISO_TIME_OPTIONAL_SECONDS_TRAILING_ZEROS());
  return Unit_instance;
}
function ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda($this$alternativeParsing) {
  _init_properties_LocalDateTime_kt__bewbbg();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(116));
  return Unit_instance;
}
function ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_LocalDateTime_kt__bewbbg();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(84));
  return Unit_instance;
}
function _get_ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS_$ref_4ujexv() {
  return function () {
    return get_ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS();
  };
}
var properties_initialized_LocalDateTime_kt_aulw4q;
function _init_properties_LocalDateTime_kt__bewbbg() {
  if (!properties_initialized_LocalDateTime_kt_aulw4q) {
    properties_initialized_LocalDateTime_kt_aulw4q = true;
    ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate = lazy(ISO_DATETIME_OPTIONAL_SECONDS_TRAILING_ZEROS$delegate$lambda);
  }
}
//region block: exports
export {
  Companion_getInstance_1 as Companion_getInstance2vzevs5m6d283,
  LocalDateTime as LocalDateTime3vqv9moe7clf4,
};
//endregion

//# sourceMappingURL=LocalDateTime.mjs.map
