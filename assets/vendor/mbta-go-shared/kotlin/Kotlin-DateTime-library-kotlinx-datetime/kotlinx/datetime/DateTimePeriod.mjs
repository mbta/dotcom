import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  DatePeriodSerializer_getInstance1btgjyjuj7dyl as DatePeriodSerializer_getInstance,
  DateTimePeriodSerializer_getInstancew9uog9fa2zsv as DateTimePeriodSerializer_getInstance,
} from './serializers/DateTimePeriodSerializers.mjs';
import { DateTimeFormatException2onfeknbywaob as DateTimeFormatException } from './Exceptions.mjs';
import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
} from '../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ClosedRangehokgr73im9z3 as ClosedRange } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/Range.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { contains2c50nlxg7en7o as contains } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  safeMultiply1xb0xo3cufzd3 as safeMultiply,
  safeAdd2ojtf0puot5k0 as safeAdd,
} from './internal/mathNative.mjs';
import {
  ArithmeticException18dajwq7kbp38 as ArithmeticException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { uppercaseChar6lahngw3wvwg as uppercaseChar } from '../../../kotlin-kotlin-stdlib/kotlin/text/charJs.mjs';
import { substringiqarkczpya5m as substring } from '../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { repeat2w4c6j8zoq09o as repeat } from '../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { toInt5qdj874w69jh as toInt } from '../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString_0,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { abs1kdzbjes1idip as abs } from '../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { padStart36w1507hs626a as padStart } from '../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { multiplyAndAdd2gfolze8k1tuw as multiplyAndAdd } from './internal/math.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var DatePeriodClass;
function DatePeriod() {
  if (DatePeriodClass === VOID) {
    class $ extends DateTimePeriod() {
      static z7z(totalMonths, days) {
        var $this = this.a80();
        $this.x7z_1 = totalMonths;
        $this.y7z_1 = days;
        return $this;
      }
      b80() {
        return this.x7z_1;
      }
      c80() {
        return this.y7z_1;
      }
      static d80(years, months, days) {
        years = years === VOID ? 0 : years;
        months = months === VOID ? 0 : months;
        days = days === VOID ? 0 : days;
        return this.z7z(totalMonths(years, months), days);
      }
      e80() {
        return 0;
      }
      f80() {
        return 0;
      }
      g80() {
        return 0;
      }
      h80() {
        return 0;
      }
      i80() {
        return new (Long())(0, 0);
      }
    }
    initMetadataForClass($, 'DatePeriod', $.d80, VOID, VOID, VOID, VOID, {0: DatePeriodSerializer_getInstance});
    DatePeriodClass = $;
  }
  return DatePeriodClass;
}
function parse$parseException(message, position) {
  throw DateTimeFormatException().p80('Parse error at char ' + position + ': ' + message);
}
function parse$toIntThrowing(_this__u8e3s4, iStart, component) {
  if (_this__u8e3s4.d2(new (Long())(-2147483648, -1)) < 0 || _this__u8e3s4.d2(new (Long())(2147483647, 0)) > 0) {
    parse$parseException('Value ' + _this__u8e3s4.toString() + " does not fit into an Int, which is required for component '" + toString(component) + "'", iStart);
  }
  return _this__u8e3s4.f2();
}
function allNonpositive($this) {
  return $this.b80().d2(new (Long())(0, 0)) <= 0 && $this.c80() <= 0 && $this.i80().d2(new (Long())(0, 0)) <= 0 && (!$this.b80().t4($this.i80()).equals(new (Long())(0, 0)) || !($this.c80() === 0));
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      dx(text) {
        var START = 0;
        var AFTER_P = 1;
        var AFTER_YEAR = 2;
        var AFTER_MONTH = 3;
        var AFTER_WEEK = 4;
        var AFTER_DAY = 5;
        var AFTER_T = 6;
        var AFTER_HOUR = 7;
        var AFTER_MINUTE = 8;
        var AFTER_SECOND_AND_NANO = 9;
        var state = START;
        var i = 0;
        var sign = 1;
        var years = 0;
        var months = 0;
        var weeks = 0;
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        var nanoseconds = 0;
        var someComponentParsed = false;
        $l$loop_0: while (true) {
          if (i >= text.length) {
            if (state === START) {
              parse$parseException("Unexpected end of input; 'P' designator is required", i);
            }
            if (state === AFTER_T) {
              parse$parseException("Unexpected end of input; at least one time component is required after 'T'", i);
            }
            var tmp0 = toLong(days);
            // Inline function 'kotlin.Long.plus' call
            var other = imul(weeks, 7);
            var n = tmp0.f4(toLong(other));
            var tmp;
            // Inline function 'kotlin.ranges.contains' call
            var this_0 = numberRangeToNumber(-2147483648, 2147483647);
            if (contains(isInterface(this_0, ClosedRange()) ? this_0 : THROW_CCE(), n)) {
              tmp = n.f2();
            } else {
              parse$parseException("The total number of days under 'D' and 'W' designators should fit into an Int", 0);
            }
            var daysTotal = tmp;
            if (!someComponentParsed) {
              parse$parseException('At least one component is required, but none were found', 0);
            }
            return DateTimePeriod_0(years, months, daysTotal, hours, minutes, seconds, toLong(nanoseconds));
          }
          if (state === START) {
            if ((i + 1 | 0) >= text.length && (charCodeAt(text, i) === _Char___init__impl__6a9atx(43) || charCodeAt(text, i) === _Char___init__impl__6a9atx(45))) {
              parse$parseException("Unexpected end of string; 'P' designator is required", i);
            }
            var tmp0_subject = charCodeAt(text, i);
            if (tmp0_subject === _Char___init__impl__6a9atx(43) || tmp0_subject === _Char___init__impl__6a9atx(45)) {
              if (charCodeAt(text, i) === _Char___init__impl__6a9atx(45))
                sign = -1;
              if (!(charCodeAt(text, i + 1 | 0) === _Char___init__impl__6a9atx(80))) {
                parse$parseException("Expected 'P', got '" + toString(charCodeAt(text, i + 1 | 0)) + "'", i + 1 | 0);
              }
              i = i + 2 | 0;
            } else if (tmp0_subject === _Char___init__impl__6a9atx(80)) {
              i = i + 1 | 0;
            } else {
              parse$parseException("Expected '+', '-', 'P', got '" + toString(charCodeAt(text, i)) + "'", i);
            }
            state = AFTER_P;
            continue $l$loop_0;
          }
          var localSign = sign;
          var iStart = i;
          var tmp1_subject = charCodeAt(text, i);
          if (tmp1_subject === _Char___init__impl__6a9atx(43) || tmp1_subject === _Char___init__impl__6a9atx(45)) {
            if (charCodeAt(text, i) === _Char___init__impl__6a9atx(45))
              localSign = imul(localSign, -1);
            i = i + 1 | 0;
            var tmp_0;
            if (i >= text.length) {
              tmp_0 = true;
            } else {
              var containsArg = charCodeAt(text, i);
              tmp_0 = !(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false);
            }
            if (tmp_0) {
              parse$parseException("A number expected after '" + toString(charCodeAt(text, i)) + "'", i);
            }
          } else if (!(_Char___init__impl__6a9atx(48) <= tmp1_subject ? tmp1_subject <= _Char___init__impl__6a9atx(57) : false))
            if (tmp1_subject === _Char___init__impl__6a9atx(84)) {
              if (state >= AFTER_T) {
                parse$parseException("Only one 'T' designator is allowed", i);
              }
              state = AFTER_T;
              i = i + 1 | 0;
              continue $l$loop_0;
            }
          var number = new (Long())(0, 0);
          $l$loop_1: while (true) {
            var tmp_1;
            if (i < text.length) {
              var containsArg_0 = charCodeAt(text, i);
              tmp_1 = _Char___init__impl__6a9atx(48) <= containsArg_0 ? containsArg_0 <= _Char___init__impl__6a9atx(57) : false;
            } else {
              tmp_1 = false;
            }
            if (!tmp_1) {
              break $l$loop_1;
            }
            try {
              number = safeAdd(safeMultiply(number, new (Long())(10, 0)), toLong(Char__minus_impl_a2frrh(charCodeAt(text, i), _Char___init__impl__6a9atx(48))));
            } catch ($p) {
              if ($p instanceof ArithmeticException()) {
                var _unused_var__etf5q3 = $p;
                parse$parseException('The number is too large', iStart);
              } else {
                throw $p;
              }
            }
            i = i + 1 | 0;
          }
          someComponentParsed = true;
          var tmp0_0 = number;
          // Inline function 'kotlin.Long.times' call
          var other_0 = localSign;
          number = tmp0_0.h4(toLong(other_0));
          if (i === text.length) {
            parse$parseException('Expected a designator after the numerical value', i);
          }
          var wrongOrder = "Wrong component order: should be 'Y', 'M', 'W', 'D', then designator 'T', then 'H', 'M', 'S'";
          var tmp2_subject = uppercaseChar(charCodeAt(text, i));
          if (tmp2_subject === _Char___init__impl__6a9atx(89)) {
            if (state >= AFTER_YEAR) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_YEAR;
            years = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(89));
          } else if (tmp2_subject === _Char___init__impl__6a9atx(77)) {
            if (state >= AFTER_T) {
              if (state >= AFTER_MINUTE) {
                parse$parseException(wrongOrder, i);
              }
              state = AFTER_MINUTE;
              minutes = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(77));
            } else {
              if (state >= AFTER_MONTH) {
                parse$parseException(wrongOrder, i);
              }
              state = AFTER_MONTH;
              months = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(77));
            }
          } else if (tmp2_subject === _Char___init__impl__6a9atx(87)) {
            if (state >= AFTER_WEEK) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_WEEK;
            weeks = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(87));
          } else if (tmp2_subject === _Char___init__impl__6a9atx(68)) {
            if (state >= AFTER_DAY) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_DAY;
            days = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(68));
          } else if (tmp2_subject === _Char___init__impl__6a9atx(72)) {
            if (state >= AFTER_HOUR || state < AFTER_T) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_HOUR;
            hours = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(72));
          } else if (tmp2_subject === _Char___init__impl__6a9atx(83)) {
            if (state >= AFTER_SECOND_AND_NANO || state < AFTER_T) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_SECOND_AND_NANO;
            seconds = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(83));
          } else if (tmp2_subject === _Char___init__impl__6a9atx(46) || tmp2_subject === _Char___init__impl__6a9atx(44)) {
            i = i + 1 | 0;
            if (i >= text.length) {
              parse$parseException("Expected designator 'S' after " + toString(charCodeAt(text, i - 1 | 0)), i);
            }
            var iStartFraction = i;
            $l$loop_2: while (true) {
              var tmp_2;
              if (i < text.length) {
                var containsArg_1 = charCodeAt(text, i);
                tmp_2 = _Char___init__impl__6a9atx(48) <= containsArg_1 ? containsArg_1 <= _Char___init__impl__6a9atx(57) : false;
              } else {
                tmp_2 = false;
              }
              if (!tmp_2) {
                break $l$loop_2;
              }
              i = i + 1 | 0;
            }
            var fractionLength = i - iStartFraction | 0;
            if (fractionLength > 9) {
              parse$parseException('Only the nanosecond fractions of a second are supported', iStartFraction);
            }
            var fractionalPart = substring(text, iStartFraction, i) + repeat('0', 9 - fractionLength | 0);
            nanoseconds = imul(toInt(fractionalPart, 10), localSign);
            if (!(charCodeAt(text, i) === _Char___init__impl__6a9atx(83))) {
              parse$parseException("Expected the 'S' designator after a fraction", i);
            }
            if (state >= AFTER_SECOND_AND_NANO || state < AFTER_T) {
              parse$parseException(wrongOrder, i);
            }
            state = AFTER_SECOND_AND_NANO;
            seconds = parse$toIntThrowing(number, iStart, _Char___init__impl__6a9atx(83));
          } else {
            parse$parseException('Expected a designator after the numerical value', i);
          }
          i = i + 1 | 0;
        }
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
var DateTimePeriodClass;
function DateTimePeriod() {
  if (DateTimePeriodClass === VOID) {
    class $ {
      static a80() {
        return createThis(this);
      }
      j80() {
        // Inline function 'kotlin.Long.div' call
        return this.b80().i4(toLong(12)).f2();
      }
      k80() {
        // Inline function 'kotlin.Long.rem' call
        return this.b80().j4(toLong(12)).f2();
      }
      e80() {
        return this.i80().i4(new (Long())(817405952, 838)).f2();
      }
      f80() {
        return this.i80().j4(new (Long())(817405952, 838)).i4(new (Long())(-129542144, 13)).f2();
      }
      g80() {
        var tmp0 = this.i80().j4(new (Long())(-129542144, 13));
        // Inline function 'kotlin.Long.div' call
        var other = 1000000000;
        return tmp0.i4(toLong(other)).f2();
      }
      h80() {
        var tmp0 = this.i80();
        // Inline function 'kotlin.Long.rem' call
        var other = 1000000000;
        return tmp0.j4(toLong(other)).f2();
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        var tmp;
        if (allNonpositive(this)) {
          this_0.ic(_Char___init__impl__6a9atx(45));
          tmp = -1;
        } else {
          tmp = 1;
        }
        var sign = tmp;
        this_0.ic(_Char___init__impl__6a9atx(80));
        if (!(this.j80() === 0)) {
          this_0.ej(imul(this.j80(), sign)).ic(_Char___init__impl__6a9atx(89));
        }
        if (!(this.k80() === 0)) {
          this_0.ej(imul(this.k80(), sign)).ic(_Char___init__impl__6a9atx(77));
        }
        if (!(this.c80() === 0)) {
          this_0.ej(imul(this.c80(), sign)).ic(_Char___init__impl__6a9atx(68));
        }
        var t = 'T';
        if (!(this.e80() === 0)) {
          // Inline function 'kotlin.also' call
          this_0.hc(t).ej(imul(this.e80(), sign)).ic(_Char___init__impl__6a9atx(72));
          t = '';
        }
        if (!(this.f80() === 0)) {
          // Inline function 'kotlin.also' call
          this_0.hc(t).ej(imul(this.f80(), sign)).ic(_Char___init__impl__6a9atx(77));
          t = '';
        }
        if (!((this.g80() | this.h80()) === 0)) {
          this_0.hc(t);
          this_0.gc(!(this.g80() === 0) ? imul(this.g80(), sign) : imul(this.h80(), sign) < 0 ? '-0' : '0');
          if (!(this.h80() === 0)) {
            var tmp_0 = this_0.ic(_Char___init__impl__6a9atx(46));
            // Inline function 'kotlin.math.absoluteValue' call
            var this_1 = this.h80();
            var tmp$ret$4 = abs(this_1);
            tmp_0.hc(padStart(tmp$ret$4.toString(), 9, _Char___init__impl__6a9atx(48)));
          }
          this_0.ic(_Char___init__impl__6a9atx(83));
        }
        if (this_0.a() === 1) {
          this_0.hc('0D');
        }
        return this_0.toString();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof DateTimePeriod()))
          return false;
        if (!this.b80().equals(other.b80()))
          return false;
        if (!(this.c80() === other.c80()))
          return false;
        if (!this.i80().equals(other.i80()))
          return false;
        return true;
      }
      hashCode() {
        var result = this.b80().hashCode();
        result = imul(31, result) + this.c80() | 0;
        result = imul(31, result) + this.i80().hashCode() | 0;
        return result;
      }
    }
    initMetadataForClass($, 'DateTimePeriod', VOID, VOID, VOID, VOID, VOID, {0: DateTimePeriodSerializer_getInstance});
    DateTimePeriodClass = $;
  }
  return DateTimePeriodClass;
}
function totalMonths(years, months) {
  // Inline function 'kotlin.Long.times' call
  // Inline function 'kotlin.also' call
  var this_0 = toLong(years).h4(toLong(12)).f4(toLong(months));
  var tmp0 = numberRangeToNumber(-2147483648, 2147483647);
  // Inline function 'kotlin.Long.div' call
  // Inline function 'kotlin.ranges.contains' call
  var value = this_0.i4(toLong(12));
  // Inline function 'kotlin.require' call
  if (!contains(isInterface(tmp0, ClosedRange()) ? tmp0 : THROW_CCE(), value)) {
    var message = 'The total number of years in ' + years + ' years and ' + months + ' months overflows an Int';
    throw IllegalArgumentException().q(toString_0(message));
  }
  return this_0;
}
function DateTimePeriod_0(years, months, days, hours, minutes, seconds, nanoseconds) {
  years = years === VOID ? 0 : years;
  months = months === VOID ? 0 : months;
  days = days === VOID ? 0 : days;
  hours = hours === VOID ? 0 : hours;
  minutes = minutes === VOID ? 0 : minutes;
  seconds = seconds === VOID ? 0 : seconds;
  nanoseconds = nanoseconds === VOID ? new (Long())(0, 0) : nanoseconds;
  return buildDateTimePeriod(totalMonths(years, months), days, totalNanoseconds(hours, minutes, seconds, nanoseconds));
}
function buildDateTimePeriod(totalMonths, days, totalNanoseconds) {
  totalMonths = totalMonths === VOID ? new (Long())(0, 0) : totalMonths;
  days = days === VOID ? 0 : days;
  return !totalNanoseconds.equals(new (Long())(0, 0)) ? DateTimePeriodImpl().t80(totalMonths, days, totalNanoseconds) : DatePeriod().z7z(totalMonths, days);
}
function totalNanoseconds(hours, minutes, seconds, nanoseconds) {
  // Inline function 'kotlin.Long.times' call
  // Inline function 'kotlin.Long.plus' call
  var totalMinutes = toLong(hours).h4(toLong(60)).f4(toLong(minutes));
  // Inline function 'kotlin.Long.times' call
  var totalMinutesAsSeconds = totalMinutes.h4(toLong(60));
  // Inline function 'kotlin.Long.div' call
  var other = 1000000000;
  var tmp$ret$3 = nanoseconds.i4(toLong(other));
  var minutesAndNanosecondsAsSeconds = totalMinutesAsSeconds.f4(tmp$ret$3);
  // Inline function 'kotlin.Long.plus' call
  var totalSeconds = minutesAndNanosecondsAsSeconds.f4(toLong(seconds));
  var tmp;
  try {
    var tmp_0 = new (Long())(1000000000, 0);
    // Inline function 'kotlin.Long.rem' call
    var other_0 = 1000000000;
    var tmp$ret$5 = nanoseconds.j4(toLong(other_0));
    tmp = multiplyAndAdd(totalSeconds, tmp_0, tmp$ret$5);
  } catch ($p) {
    var tmp_1;
    if ($p instanceof ArithmeticException()) {
      var _unused_var__etf5q3 = $p;
      throw IllegalArgumentException().q('The total number of nanoseconds in ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds, and ' + nanoseconds.toString() + ' nanoseconds overflows a Long');
    } else {
      throw $p;
    }
  }
  return tmp;
}
var DateTimePeriodImplClass;
function DateTimePeriodImpl() {
  if (DateTimePeriodImplClass === VOID) {
    class $ extends DateTimePeriod() {
      static t80(totalMonths, days, totalNanoseconds) {
        var $this = this.a80();
        $this.q80_1 = totalMonths;
        $this.r80_1 = days;
        $this.s80_1 = totalNanoseconds;
        return $this;
      }
      b80() {
        return this.q80_1;
      }
      c80() {
        return this.r80_1;
      }
      i80() {
        return this.s80_1;
      }
    }
    initMetadataForClass($, 'DateTimePeriodImpl');
    DateTimePeriodImplClass = $;
  }
  return DateTimePeriodImplClass;
}
//region block: init
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
//endregion
//region block: exports
export {
  Companion_instance_0 as Companion_instance25i2l13l26m9w,
  DatePeriod as DatePeriod2y4m7pf19ebgd,
  DateTimePeriod as DateTimePeriod384alsehm5scz,
};
//endregion

//# sourceMappingURL=DateTimePeriod.mjs.map
