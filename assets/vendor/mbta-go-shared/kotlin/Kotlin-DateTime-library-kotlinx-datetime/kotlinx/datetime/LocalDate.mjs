import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { LocalDateTime3vqv9moe7clf4 as LocalDateTime } from './LocalDateTime.mjs';
import {
  Companion_getInstance1hjnoi8x2xjhl as Companion_getInstance,
  MonthBased16lxw4e6nhntg as MonthBased,
  DayBased28hvf1xjg5r93 as DayBased,
} from './DateTimeUnit.mjs';
import { DatePeriod2y4m7pf19ebgd as DatePeriod } from './DateTimePeriod.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  ArithmeticException18dajwq7kbp38 as ArithmeticException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  get_ISO_DATE_BASIC1k4wiybcckf8 as get_ISO_DATE_BASIC,
  get_ISO_DATE1ah0stqy13618 as get_ISO_DATE,
} from './format/LocalDateFormat.mjs';
import {
  isLeapYear2i238jn7muq0f as isLeapYear,
  monthLength2df23yfyn71oo as monthLength,
} from './internal/dateCalculations.mjs';
import {
  Monthisypd6pyawk7 as Month,
  firstDayOfYear4msjvujw2l9c as firstDayOfYear,
} from './Month.mjs';
import { DayOfWeek2xlo40o03f5e as DayOfWeek } from './DayOfWeek.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  safeAdd2ojtf0puot5k0 as safeAdd,
  safeMultiply1xb0xo3cufzd3 as safeMultiply,
} from './internal/mathNative.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { ClosedRangehokgr73im9z3 as ClosedRange } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/Range.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { contains2c50nlxg7en7o as contains } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { LocalDateSerializer_getInstance2ir4dj2eqtzf2 as LocalDateSerializer_getInstance } from './serializers/LocalDateSerializers.mjs';
import { DateTimeArithmeticException3b9ehoczpp1e2 as DateTimeArithmeticException } from './Exceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function plus(_this__u8e3s4, value, unit) {
  return plus_0(_this__u8e3s4, toLong(value), unit);
}
function getIsoDateFormat() {
  return Formats_getInstance().e82();
}
function format(_this__u8e3s4, format) {
  return format.f82(_this__u8e3s4);
}
function atTime(_this__u8e3s4, time) {
  return new (LocalDateTime())(_this__u8e3s4, time);
}
function minus(_this__u8e3s4, value, unit) {
  return plus_0(_this__u8e3s4, toLong(value).m4(), unit);
}
function minus_0(_this__u8e3s4, period) {
  var tmp;
  if (!(period.y7z_1 === -2147483648) && !(period.k80() === -2147483648)) {
    // Inline function 'kotlin.with' call
    var tmp$ret$1 = DatePeriod().d80(-period.j80() | 0, -period.k80() | 0, -period.y7z_1 | 0);
    tmp = plus_1(_this__u8e3s4, tmp$ret$1);
  } else {
    tmp = minus(minus(minus(_this__u8e3s4, period.j80(), Companion_getInstance().m81_1), period.k80(), Companion_getInstance().k81_1), period.y7z_1, Companion_getInstance().i81_1);
  }
  return tmp;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.f8g_1 = new (LocalDate())(-999999999, 1, 1);
        this.g8g_1 = new (LocalDate())(999999999, 12, 31);
        this.h8g_1 = new (Long())(-170999002, -86);
        this.i8g_1 = new (Long())(169560311, 85);
      }
      s8h(input, format) {
        return format.lv(input);
      }
      j8g(input, format, $super) {
        format = format === VOID ? getIsoDateFormat() : format;
        return $super === VOID ? this.s8h(input, format) : $super.s8h.call(this, input, format);
      }
      t8h(epochDays) {
        // Inline function 'kotlin.require' call
        if (!((new (Long())(-170999002, -86)).d2(epochDays) <= 0 ? epochDays.d2(new (Long())(169560311, 85)) <= 0 : false)) {
          var message = 'Invalid date: epoch day ' + epochDays.toString() + ' is outside the boundaries of LocalDate';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.Long.plus' call
        var zeroDay = epochDays.f4(toLong(719528));
        // Inline function 'kotlin.Long.minus' call
        zeroDay = zeroDay.g4(toLong(60));
        var adjust = new (Long())(0, 0);
        if (zeroDay.d2(new (Long())(0, 0)) < 0) {
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.div' call
          // Inline function 'kotlin.Long.minus' call
          var adjustCycles = zeroDay.f4(toLong(1)).i4(toLong(146097)).g4(toLong(1));
          // Inline function 'kotlin.Long.times' call
          adjust = adjustCycles.h4(toLong(400));
          var tmp = zeroDay;
          // Inline function 'kotlin.Long.times' call
          var tmp$ret$8 = adjustCycles.m4().h4(toLong(146097));
          zeroDay = tmp.f4(tmp$ret$8);
        }
        // Inline function 'kotlin.Long.plus' call
        // Inline function 'kotlin.Long.div' call
        var yearEst = numberToLong(400).h4(zeroDay).f4(toLong(591)).i4(toLong(146097));
        var tmp_0 = zeroDay;
        var tmp_1 = numberToLong(365).h4(yearEst);
        // Inline function 'kotlin.Long.div' call
        var tmp$ret$11 = yearEst.i4(toLong(4));
        var tmp_2 = tmp_1.f4(tmp$ret$11);
        // Inline function 'kotlin.Long.div' call
        var tmp$ret$12 = yearEst.i4(toLong(100));
        var tmp_3 = tmp_2.g4(tmp$ret$12);
        // Inline function 'kotlin.Long.div' call
        var tmp$ret$13 = yearEst.i4(toLong(400));
        var doyEst = tmp_0.g4(tmp_3.f4(tmp$ret$13));
        if (doyEst.d2(new (Long())(0, 0)) < 0) {
          yearEst = yearEst.l4();
          var tmp_4 = zeroDay;
          var tmp_5 = numberToLong(365).h4(yearEst);
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$14 = yearEst.i4(toLong(4));
          var tmp_6 = tmp_5.f4(tmp$ret$14);
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$15 = yearEst.i4(toLong(100));
          var tmp_7 = tmp_6.g4(tmp$ret$15);
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$16 = yearEst.i4(toLong(400));
          doyEst = tmp_4.g4(tmp_7.f4(tmp$ret$16));
        }
        yearEst = yearEst.f4(adjust);
        var marchDoy0 = doyEst.f2();
        var marchMonth0 = (imul(marchDoy0, 5) + 2 | 0) / 153 | 0;
        var month = ((marchMonth0 + 2 | 0) % 12 | 0) + 1 | 0;
        var dom = (marchDoy0 - ((imul(marchMonth0, 306) + 5 | 0) / 10 | 0) | 0) + 1 | 0;
        var tmp0 = yearEst;
        // Inline function 'kotlin.Long.plus' call
        var other = marchMonth0 / 10 | 0;
        yearEst = tmp0.f4(toLong(other));
        return new (LocalDate())(yearEst.f2(), month, dom);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var FormatsClass;
function Formats() {
  if (FormatsClass === VOID) {
    class $ {
      constructor() {
        Formats_instance = this;
        this.d82_1 = get_ISO_DATE_BASIC();
      }
      e82() {
        return get_ISO_DATE();
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
function resolvePreviousValid($this, year, month, day) {
  // Inline function 'kotlin.math.min' call
  var b = monthLength(month, isLeapYear(year));
  var newDay = Math.min(day, b);
  return new (LocalDate())(year, month, newDay);
}
var LocalDateClass;
function LocalDate() {
  if (LocalDateClass === VOID) {
    class $ {
      constructor(year, month, day) {
        Companion_getInstance_0();
        this.l84_1 = year;
        this.m84_1 = day;
        this.n84_1 = month;
        // Inline function 'kotlin.require' call
        if (!isValidYear(this.l84_1)) {
          var message = 'Invalid date: the year is out of range';
          throw IllegalArgumentException().q(toString(message));
        }
        var containsArg = this.n84_1;
        // Inline function 'kotlin.require' call
        if (!(1 <= containsArg ? containsArg <= 12 : false)) {
          var message_0 = 'Invalid date: month must be a number between 1 and 12, got ' + this.n84_1;
          throw IllegalArgumentException().q(toString(message_0));
        }
        var containsArg_0 = this.m84_1;
        // Inline function 'kotlin.require' call
        if (!(1 <= containsArg_0 ? containsArg_0 <= 31 : false)) {
          var message_1 = 'Invalid date: day of month must be a number between 1 and 31, got ' + this.m84_1;
          throw IllegalArgumentException().q(toString(message_1));
        }
        if (this.m84_1 > 28 && this.m84_1 > monthLength(this.n84_1, isLeapYear(this.l84_1))) {
          if (this.m84_1 === 29) {
            throw IllegalArgumentException().q("Invalid date 'February 29' as '" + this.l84_1 + "' is not a leap year");
          } else {
            throw IllegalArgumentException().q("Invalid date '" + Month(month).toString() + ' ' + this.m84_1 + "'");
          }
        }
      }
      u8h() {
        var y = toLong(this.l84_1);
        var m = toLong(this.n84_1);
        var total = new (Long())(0, 0);
        total = total.f4(numberToLong(365).h4(y));
        if (y.d2(new (Long())(0, 0)) >= 0) {
          var tmp = total;
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.div' call
          var tmp_0 = y.f4(toLong(3)).i4(toLong(4));
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$3 = y.f4(toLong(99)).i4(toLong(100));
          var tmp_1 = tmp_0.g4(tmp$ret$3);
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$5 = y.f4(toLong(399)).i4(toLong(400));
          total = tmp.f4(tmp_1.f4(tmp$ret$5));
        } else {
          var tmp_2 = total;
          // Inline function 'kotlin.Long.div' call
          var tmp_3 = y.i4(toLong(-4));
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$7 = y.i4(toLong(-100));
          var tmp_4 = tmp_3.g4(tmp$ret$7);
          // Inline function 'kotlin.Long.div' call
          var tmp$ret$8 = y.i4(toLong(-400));
          total = tmp_2.g4(tmp_4.f4(tmp$ret$8));
        }
        var tmp_5 = total;
        // Inline function 'kotlin.Long.minus' call
        // Inline function 'kotlin.Long.div' call
        var tmp$ret$10 = numberToLong(367).h4(m).g4(toLong(362)).i4(toLong(12));
        total = tmp_5.f4(tmp$ret$10);
        var tmp0 = total;
        // Inline function 'kotlin.Long.plus' call
        var other = this.m84_1 - 1 | 0;
        total = tmp0.f4(toLong(other));
        if (m.d2(new (Long())(2, 0)) > 0) {
          total = total.l4();
          if (!isLeapYear(this.l84_1)) {
            total = total.l4();
          }
        }
        // Inline function 'kotlin.Long.minus' call
        return total.g4(toLong(719528));
      }
      o84() {
        return Month(this.n84_1);
      }
      g84() {
        // Inline function 'kotlin.Long.plus' call
        // Inline function 'kotlin.mod' call
        var tmp0 = this.u8h().f4(toLong(3));
        // Inline function 'kotlin.mod' call
        var other = toLong(7);
        var r = tmp0.j4(other);
        var dow0 = r.f4(other.s4(r.u4(other).s4(r.t4(r.m4())).q4(63))).f2();
        return DayOfWeek(dow0 + 1 | 0);
      }
      i84() {
        return (firstDayOfYear(this.o84(), isLeapYear(this.l84_1)) + this.m84_1 | 0) - 1 | 0;
      }
      v8h(other) {
        var y = compareTo(this.l84_1, other.l84_1);
        if (!(y === 0)) {
          return y;
        }
        var m = compareTo(this.n84_1, other.n84_1);
        if (!(m === 0)) {
          return m;
        }
        return compareTo(this.m84_1, other.m84_1);
      }
      d(other) {
        return this.v8h(other instanceof LocalDate() ? other : THROW_CCE());
      }
      w8h(monthsToAdd) {
        if (monthsToAdd.equals(new (Long())(0, 0))) {
          return this;
        }
        var tmp0 = numberToLong(this.l84_1).h4(new (Long())(12, 0));
        // Inline function 'kotlin.Long.plus' call
        var other = this.n84_1 - 1 | 0;
        var monthCount = tmp0.f4(toLong(other));
        var calcMonths = safeAdd(monthCount, monthsToAdd);
        // Inline function 'kotlin.floorDiv' call
        // Inline function 'kotlin.floorDiv' call
        var other_0 = toLong(12);
        var q = calcMonths.i4(other_0);
        if (calcMonths.u4(other_0).d2(new (Long())(0, 0)) < 0 && !q.h4(other_0).equals(calcMonths)) {
          q = q.l4();
        }
        var newYear = q;
        // Inline function 'kotlin.ranges.contains' call
        var this_0 = numberRangeToNumber(-999999999, 999999999);
        if (!contains(isInterface(this_0, ClosedRange()) ? this_0 : THROW_CCE(), newYear)) {
          throw IllegalArgumentException().q('The result of adding ' + monthsToAdd.toString() + ' months to ' + this.toString() + ' is out of LocalDate range.');
        }
        // Inline function 'kotlin.mod' call
        // Inline function 'kotlin.mod' call
        var other_1 = toLong(12);
        var r = calcMonths.j4(other_1);
        var newMonth = r.f4(other_1.s4(r.u4(other_1).s4(r.t4(r.m4())).q4(63))).f2() + 1 | 0;
        return resolvePreviousValid(this, newYear.f2(), newMonth, this.m84_1);
      }
      x8h(daysToAdd) {
        return daysToAdd.equals(new (Long())(0, 0)) ? this : Companion_getInstance_0().t8h(safeAdd(this.u8h(), daysToAdd));
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof LocalDate()) {
            tmp_0 = this.v8h(other) === 0;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        var yearValue = this.l84_1;
        var monthValue = this.n84_1;
        var dayValue = this.m84_1;
        return yearValue & -2048 ^ (((yearValue << 11) + (monthValue << 6) | 0) + dayValue | 0);
      }
      toString() {
        return format(this, Formats_getInstance().e82());
      }
    }
    initMetadataForClass($, 'LocalDate', VOID, VOID, [Comparable()], VOID, VOID, {0: LocalDateSerializer_getInstance});
    LocalDateClass = $;
  }
  return LocalDateClass;
}
function isValidYear(year) {
  return year >= -999999999 && year <= 999999999;
}
function plus_0(_this__u8e3s4, value, unit) {
  var tmp;
  try {
    var tmp_0;
    if (unit instanceof DayBased()) {
      tmp_0 = _this__u8e3s4.x8h(safeMultiply(value, toLong(unit.a81_1)));
    } else {
      if (unit instanceof MonthBased()) {
        tmp_0 = _this__u8e3s4.w8h(safeMultiply(value, toLong(unit.b81_1)));
      } else {
        noWhenBranchMatchedException();
      }
    }
    tmp = tmp_0;
  } catch ($p) {
    var tmp_1;
    if ($p instanceof ArithmeticException()) {
      var e = $p;
      throw DateTimeArithmeticException().c82('Arithmetic overflow when adding a value to a date', e);
    } else {
      if ($p instanceof IllegalArgumentException()) {
        var e_0 = $p;
        throw DateTimeArithmeticException().c82('Boundaries of LocalDate exceeded when adding a value', e_0);
      } else {
        throw $p;
      }
    }
  }
  return tmp;
}
function plus_1(_this__u8e3s4, period) {
  // Inline function 'kotlin.with' call
  var tmp;
  try {
    // Inline function 'kotlin.run' call
    // Inline function 'kotlin.run' call
    var $this$run = !period.x7z_1.equals(new (Long())(0, 0)) ? _this__u8e3s4.w8h(period.x7z_1) : _this__u8e3s4;
    tmp = !(period.y7z_1 === 0) ? $this$run.x8h(toLong(period.y7z_1)) : $this$run;
  } catch ($p) {
    var tmp_0;
    if ($p instanceof ArithmeticException()) {
      var e = $p;
      throw DateTimeArithmeticException().c82('Arithmetic overflow when adding a period to a date', e);
    } else {
      if ($p instanceof IllegalArgumentException()) {
        var e_0 = $p;
        throw DateTimeArithmeticException().c82('Boundaries of LocalDate exceeded when adding a period', e_0);
      } else {
        throw $p;
      }
    }
  }
  return tmp;
}
//region block: exports
export {
  Companion_getInstance_0 as Companion_getInstancefc1kb6w5z78x,
  LocalDate as LocalDate31mqn6zavbpi8,
  minus_0 as minushnjyym3nfk5o,
  plus as plus1et5dysousgt9,
};
//endregion

//# sourceMappingURL=LocalDate.mjs.map
