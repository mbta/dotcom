import {
  DateTimeArithmeticException3b9ehoczpp1e2 as DateTimeArithmeticException,
  IllegalTimeZoneException2q01rvpc2etsw as IllegalTimeZoneException,
  DateTimeFormatException2onfeknbywaob as DateTimeFormatException,
} from './Exceptions.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  Exceptiondt2hlxn7j7vw as Exception,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Companion_getInstancefc1kb6w5z78x as Companion_getInstance } from './LocalDate.mjs';
import { Companion_getInstance3vhybkmm49bju as Companion_getInstance_0 } from './LocalTime.mjs';
import { LocalDateTime3vqv9moe7clf4 as LocalDateTime } from './LocalDateTime.mjs';
import { Companion_getInstance3kvfs538dk04g as Companion_getInstance_1 } from './OverloadMarker.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Companion_getInstance1jfygh5e58evr as Companion_getInstance_2 } from '../../../kotlin-kotlin-stdlib/kotlin/time/Instant.mjs';
import {
  Companion_getInstance3p275ab8rhrps as Companion_getInstance_3,
  asTimeZone3kdzfpoilmjbj as asTimeZone,
} from './UtcOffset.mjs';
import {
  currentSystemDefaultZone332b6s6k58wi as currentSystemDefaultZone,
  timeZoneByIdov6p8ve6cmmr as timeZoneById,
} from './internal/Platform.mjs';
import { startsWith26w8qjqapeeq6 as startsWith } from '../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { take9j4462mea726 as take } from '../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import { substring3saq8ornu0luv as substring } from '../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  TimeZoneSerializer_getInstanceqa9aveo7y5x8 as TimeZoneSerializer_getInstance,
  FixedOffsetTimeZoneSerializer_getInstance1l46ueoee8ix3 as FixedOffsetTimeZoneSerializer_getInstance,
} from './serializers/TimeZoneSerializers.mjs';
import { alternativeParsing1gmwubnsvpp9b as alternativeParsing } from './format/DateTimeFormatBuilder.mjs';
import { Padding_NONE_getInstance3nt67hl4ceygz as Padding_NONE_getInstance } from './format/DateTimeFormat.mjs';
import {
  WhenToOutput_IF_NONZERO_getInstance1rcluq8iagkxw as WhenToOutput_IF_NONZERO_getInstance,
  isoOffset2t9o0yqcdt3uh as isoOffset,
  WhenToOutput_ALWAYS_getInstance3nt5go4h27ckc as WhenToOutput_ALWAYS_getInstance,
  Companion_instance2muu0ik1fxb8u as Companion_instance,
} from './format/UtcOffsetFormat.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_lenientOffsetFormat() {
  _init_properties_TimeZone_kt__dwyks9();
  return lenientOffsetFormat;
}
var lenientOffsetFormat;
function toLocalDateTime(_this__u8e3s4, offset) {
  _init_properties_TimeZone_kt__dwyks9();
  var tmp;
  try {
    tmp = toLocalDateTimeImpl(_this__u8e3s4, offset);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof IllegalArgumentException()) {
      var e = $p;
      throw DateTimeArithmeticException().c82('Instant ' + _this__u8e3s4.toString() + ' is not representable as LocalDateTime', e);
    } else {
      throw $p;
    }
  }
  return tmp;
}
function toLocalDateTimeImpl(_this__u8e3s4, offset) {
  _init_properties_TimeZone_kt__dwyks9();
  var tmp0 = _this__u8e3s4.jl_1;
  // Inline function 'kotlin.Long.plus' call
  var other = offset.f89_1;
  var localSecond = tmp0.f4(toLong(other));
  // Inline function 'kotlin.floorDiv' call
  var other_0 = new (Long())(86400, 0);
  var q = localSecond.i4(other_0);
  if (localSecond.u4(other_0).d2(new (Long())(0, 0)) < 0 && !q.h4(other_0).equals(localSecond)) {
    q = q.l4();
  }
  var localEpochDay = q;
  // Inline function 'kotlin.mod' call
  var other_1 = new (Long())(86400, 0);
  var r = localSecond.j4(other_1);
  var secsOfDay = r.f4(other_1.s4(r.u4(other_1).s4(r.t4(r.m4())).q4(63))).f2();
  var date = Companion_getInstance().t8h(localEpochDay);
  var time = Companion_getInstance_0().g8i(secsOfDay, _this__u8e3s4.kl_1);
  return new (LocalDateTime())(date, time);
}
function toInstant(_this__u8e3s4, offset, youShallNotPass) {
  youShallNotPass = youShallNotPass === VOID ? Companion_getInstance_1().h82_1 : youShallNotPass;
  _init_properties_TimeZone_kt__dwyks9();
  return Companion_getInstance_2().iv(_this__u8e3s4.b8i(offset), _this__u8e3s4.p86());
}
function toLocalDateTime_0(_this__u8e3s4, timeZone) {
  _init_properties_TimeZone_kt__dwyks9();
  return timeZone.p8h(_this__u8e3s4);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.a8h_1 = FixedOffsetTimeZone().h8i(Companion_getInstance_3().w8g_1, 'UTC');
      }
      i8i() {
        var _destruct__k2r9zo = currentSystemDefaultZone();
        var name = _destruct__k2r9zo.ch();
        var zone = _destruct__k2r9zo.dh();
        return zone == null ? this.b8h(name) : zone;
      }
      b8h(zoneId) {
        if (zoneId === 'UTC') {
          return this.a8h_1;
        }
        if (zoneId === 'Z' || zoneId === 'z') {
          return asTimeZone(Companion_getInstance_3().w8g_1);
        }
        if (zoneId === 'SYSTEM') {
          return this.i8i();
        }
        if (zoneId.length === 1) {
          throw IllegalTimeZoneException().v81('Invalid zone ID: ' + zoneId);
        }
        try {
          if (startsWith(zoneId, '+') || startsWith(zoneId, '-')) {
            return asTimeZone(get_lenientOffsetFormat().lv(zoneId));
          }
          switch (zoneId) {
            case 'UTC':
            case 'GMT':
            case 'UT':
              return FixedOffsetTimeZone().h8i(Companion_getInstance_3().w8g_1, zoneId);
          }
          if (startsWith(zoneId, 'UTC+') || startsWith(zoneId, 'GMT+') || startsWith(zoneId, 'UTC-') || startsWith(zoneId, 'GMT-')) {
            var prefix = take(zoneId, 3);
            var offset = get_lenientOffsetFormat().lv(substring(zoneId, 3));
            return offset.f89_1 === 0 ? FixedOffsetTimeZone().h8i(offset, prefix) : FixedOffsetTimeZone().h8i(offset, prefix + offset.toString());
          }
          if (startsWith(zoneId, 'UT+') || startsWith(zoneId, 'UT-')) {
            var offset_0 = get_lenientOffsetFormat().lv(substring(zoneId, 2));
            return offset_0.f89_1 === 0 ? FixedOffsetTimeZone().h8i(offset_0, 'UT') : FixedOffsetTimeZone().h8i(offset_0, 'UT' + offset_0.toString());
          }
        } catch ($p) {
          if ($p instanceof DateTimeFormatException()) {
            var e = $p;
            throw IllegalTimeZoneException().w81(e);
          } else {
            throw $p;
          }
        }
        var tmp;
        try {
          tmp = timeZoneById(zoneId);
        } catch ($p) {
          var tmp_0;
          if ($p instanceof Exception()) {
            var e_0 = $p;
            throw IllegalTimeZoneException().x81('Invalid zone ID: ' + zoneId, e_0);
          } else {
            throw $p;
          }
        }
        return tmp;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance_4() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var TimeZoneClass;
function TimeZone() {
  if (TimeZoneClass === VOID) {
    class $ {
      static n8h() {
        Companion_getInstance_4();
        return createThis(this);
      }
      d8h() {
        var message = 'Should be overridden';
        throw IllegalStateException().o5(toString(message));
      }
      o8h(instant) {
        var message = 'Should be overridden';
        throw IllegalStateException().o5(toString(message));
      }
      p8h(instant) {
        var tmp;
        try {
          tmp = toLocalDateTimeImpl(instant, this.o8h(instant));
        } catch ($p) {
          var tmp_0;
          if ($p instanceof IllegalArgumentException()) {
            var e = $p;
            throw DateTimeArithmeticException().c82('Instant ' + instant.toString() + ' is not representable as LocalDateTime.', e);
          } else {
            throw $p;
          }
        }
        return tmp;
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof TimeZone()) {
            tmp_0 = this.d8h() === other.d8h();
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return getStringHashCode(this.d8h());
      }
      toString() {
        return this.d8h();
      }
    }
    initMetadataForClass($, 'TimeZone', VOID, VOID, VOID, VOID, VOID, {0: TimeZoneSerializer_getInstance});
    TimeZoneClass = $;
  }
  return TimeZoneClass;
}
function offsetAt(_this__u8e3s4, instant) {
  _init_properties_TimeZone_kt__dwyks9();
  return _this__u8e3s4.o8h(instant);
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_1;
function Companion_getInstance_5() {
  return Companion_instance_1;
}
var FixedOffsetTimeZoneClass;
function FixedOffsetTimeZone() {
  if (FixedOffsetTimeZoneClass === VOID) {
    class $ extends TimeZone() {
      static h8i(offset, id) {
        var $this = this.n8h();
        $this.i82_1 = offset;
        $this.j82_1 = id;
        return $this;
      }
      d8h() {
        return this.j82_1;
      }
      static k82(offset) {
        return this.h8i(offset, offset.toString());
      }
      o8h(instant) {
        return this.i82_1;
      }
      p8h(instant) {
        return toLocalDateTime(instant, this.i82_1);
      }
    }
    initMetadataForClass($, 'FixedOffsetTimeZone', VOID, VOID, VOID, VOID, VOID, {0: FixedOffsetTimeZoneSerializer_getInstance});
    FixedOffsetTimeZoneClass = $;
  }
  return FixedOffsetTimeZoneClass;
}
function lenientOffsetFormat$lambda($this$build) {
  _init_properties_TimeZone_kt__dwyks9();
  var tmp = lenientOffsetFormat$lambda$lambda;
  var tmp_0 = [tmp, lenientOffsetFormat$lambda$lambda_0];
  alternativeParsing($this$build, tmp_0, lenientOffsetFormat$lambda$lambda_1);
  return Unit_instance;
}
function lenientOffsetFormat$lambda$lambda($this$alternativeParsing) {
  _init_properties_TimeZone_kt__dwyks9();
  $this$alternativeParsing.l83(Padding_NONE_getInstance());
  return Unit_instance;
}
function lenientOffsetFormat$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_TimeZone_kt__dwyks9();
  isoOffset($this$alternativeParsing, false, false, WhenToOutput_IF_NONZERO_getInstance(), WhenToOutput_IF_NONZERO_getInstance());
  return Unit_instance;
}
function lenientOffsetFormat$lambda$lambda_1($this$alternativeParsing) {
  _init_properties_TimeZone_kt__dwyks9();
  isoOffset($this$alternativeParsing, true, true, WhenToOutput_ALWAYS_getInstance(), WhenToOutput_IF_NONZERO_getInstance());
  return Unit_instance;
}
var properties_initialized_TimeZone_kt_fgsidh;
function _init_properties_TimeZone_kt__dwyks9() {
  if (!properties_initialized_TimeZone_kt_fgsidh) {
    properties_initialized_TimeZone_kt_fgsidh = true;
    var tmp = Companion_instance;
    lenientOffsetFormat = tmp.p89(lenientOffsetFormat$lambda);
  }
}
//region block: init
Companion_instance_1 = new (Companion_0())();
//endregion
//region block: exports
export {
  Companion_getInstance_4 as Companion_getInstance3qu5ydsg8audm,
  FixedOffsetTimeZone as FixedOffsetTimeZone3oldrgkltiv4z,
  TimeZone as TimeZone3oibfp0mqo4lg,
  offsetAt as offsetAt16yxz78htuv90,
  toLocalDateTime_0 as toLocalDateTime2fafgh396r2y5,
  toLocalDateTime as toLocalDateTime1cof646mhw5l9,
};
//endregion

//# sourceMappingURL=TimeZone.mjs.map
