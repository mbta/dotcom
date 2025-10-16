import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  safeMultiply1xb0xo3cufzd3 as safeMultiply,
  safeMultiplyomi65rg5l1en as safeMultiply_0,
} from './internal/mathNative.mjs';
import {
  TimeBasedDateTimeUnitSerializer_getInstancewuqoobna26f2 as TimeBasedDateTimeUnitSerializer_getInstance,
  DateBasedDateTimeUnitSerializer_getInstance2rikesu6oglqz as DateBasedDateTimeUnitSerializer_getInstance,
  DayBasedDateTimeUnitSerializer_getInstance23o8q93ovx0p5 as DayBasedDateTimeUnitSerializer_getInstance,
  MonthBasedDateTimeUnitSerializer_getInstancecpechj7jc0xd as MonthBasedDateTimeUnitSerializer_getInstance,
  DateTimeUnitSerializer_getInstance3b5n2mvis6ri5 as DateTimeUnitSerializer_getInstance,
} from './serializers/DateTimeUnitSerializers.mjs';
//region block: imports
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
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
var CompanionClass_2;
function Companion_2() {
  if (CompanionClass_2 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_2 = $;
  }
  return CompanionClass_2;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  return Companion_instance_2;
}
var TimeBasedClass;
function TimeBased() {
  if (TimeBasedClass === VOID) {
    class $ extends DateTimeUnit() {
      constructor(nanoseconds) {
        super();
        this.u80_1 = nanoseconds;
        // Inline function 'kotlin.require' call
        if (!(this.u80_1.d2(new (Long())(0, 0)) > 0)) {
          var message = 'Unit duration must be positive, but was ' + this.u80_1.toString() + ' ns.';
          throw IllegalArgumentException().q(toString(message));
        }
        if (this.u80_1.j4(new (Long())(817405952, 838)).equals(new (Long())(0, 0))) {
          this.v80_1 = 'HOUR';
          this.w80_1 = this.u80_1.i4(new (Long())(817405952, 838));
        } else {
          if (this.u80_1.j4(new (Long())(-129542144, 13)).equals(new (Long())(0, 0))) {
            this.v80_1 = 'MINUTE';
            this.w80_1 = this.u80_1.i4(new (Long())(-129542144, 13));
          } else {
            var tmp0 = this.u80_1;
            // Inline function 'kotlin.Long.rem' call
            var other = 1000000000;
            if (tmp0.j4(toLong(other)).equals(new (Long())(0, 0))) {
              this.v80_1 = 'SECOND';
              var tmp = this;
              var tmp0_0 = this.u80_1;
              // Inline function 'kotlin.Long.div' call
              var other_0 = 1000000000;
              tmp.w80_1 = tmp0_0.i4(toLong(other_0));
            } else {
              // Inline function 'kotlin.Long.rem' call
              if (this.u80_1.j4(toLong(1000000)).equals(new (Long())(0, 0))) {
                this.v80_1 = 'MILLISECOND';
                var tmp_0 = this;
                // Inline function 'kotlin.Long.div' call
                tmp_0.w80_1 = this.u80_1.i4(toLong(1000000));
              } else {
                // Inline function 'kotlin.Long.rem' call
                if (this.u80_1.j4(toLong(1000)).equals(new (Long())(0, 0))) {
                  this.v80_1 = 'MICROSECOND';
                  var tmp_1 = this;
                  // Inline function 'kotlin.Long.div' call
                  tmp_1.w80_1 = this.u80_1.i4(toLong(1000));
                } else {
                  this.v80_1 = 'NANOSECOND';
                  this.w80_1 = this.u80_1;
                }
              }
            }
          }
        }
      }
      x80(scalar) {
        return new (TimeBased())(safeMultiply(this.u80_1, toLong(scalar)));
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof TimeBased()) {
            tmp_0 = this.u80_1.equals(other.u80_1);
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return this.u80_1.f2() ^ this.u80_1.q4(32).f2();
      }
      toString() {
        return this.y80(this.w80_1, this.v80_1);
      }
    }
    initMetadataForClass($, 'TimeBased', VOID, VOID, VOID, VOID, VOID, {0: TimeBasedDateTimeUnitSerializer_getInstance});
    TimeBasedClass = $;
  }
  return TimeBasedClass;
}
var DateBasedClass;
function DateBased() {
  if (DateBasedClass === VOID) {
    class $ extends DateTimeUnit() {}
    initMetadataForClass($, 'DateBased', VOID, VOID, VOID, VOID, VOID, {0: DateBasedDateTimeUnitSerializer_getInstance});
    DateBasedClass = $;
  }
  return DateBasedClass;
}
var DayBasedClass;
function DayBased() {
  if (DayBasedClass === VOID) {
    class $ extends DateBased() {
      constructor(days) {
        super();
        this.a81_1 = days;
        // Inline function 'kotlin.require' call
        if (!(this.a81_1 > 0)) {
          var message = 'Unit duration must be positive, but was ' + this.a81_1 + ' days.';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      x80(scalar) {
        return new (DayBased())(safeMultiply_0(this.a81_1, scalar));
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof DayBased()) {
            tmp_0 = this.a81_1 === other.a81_1;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return this.a81_1 ^ 65536;
      }
      toString() {
        return (this.a81_1 % 7 | 0) === 0 ? this.z80(this.a81_1 / 7 | 0, 'WEEK') : this.z80(this.a81_1, 'DAY');
      }
    }
    initMetadataForClass($, 'DayBased', VOID, VOID, VOID, VOID, VOID, {0: DayBasedDateTimeUnitSerializer_getInstance});
    DayBasedClass = $;
  }
  return DayBasedClass;
}
var MonthBasedClass;
function MonthBased() {
  if (MonthBasedClass === VOID) {
    class $ extends DateBased() {
      constructor(months) {
        super();
        this.b81_1 = months;
        // Inline function 'kotlin.require' call
        if (!(this.b81_1 > 0)) {
          var message = 'Unit duration must be positive, but was ' + this.b81_1 + ' months.';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      x80(scalar) {
        return new (MonthBased())(safeMultiply_0(this.b81_1, scalar));
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          if (other instanceof MonthBased()) {
            tmp_0 = this.b81_1 === other.b81_1;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return this.b81_1 ^ 131072;
      }
      toString() {
        return (this.b81_1 % 1200 | 0) === 0 ? this.z80(this.b81_1 / 1200 | 0, 'CENTURY') : (this.b81_1 % 12 | 0) === 0 ? this.z80(this.b81_1 / 12 | 0, 'YEAR') : (this.b81_1 % 3 | 0) === 0 ? this.z80(this.b81_1 / 3 | 0, 'QUARTER') : this.z80(this.b81_1, 'MONTH');
      }
    }
    initMetadataForClass($, 'MonthBased', VOID, VOID, VOID, VOID, VOID, {0: MonthBasedDateTimeUnitSerializer_getInstance});
    MonthBasedClass = $;
  }
  return MonthBasedClass;
}
var CompanionClass_3;
function Companion_3() {
  if (CompanionClass_3 === VOID) {
    class $ {
      constructor() {
        Companion_instance_3 = this;
        this.c81_1 = new (TimeBased())(new (Long())(1, 0));
        this.d81_1 = this.c81_1.x80(1000);
        this.e81_1 = this.d81_1.x80(1000);
        this.f81_1 = this.e81_1.x80(1000);
        this.g81_1 = this.f81_1.x80(60);
        this.h81_1 = this.g81_1.x80(60);
        this.i81_1 = new (DayBased())(1);
        this.j81_1 = this.i81_1.x80(7);
        this.k81_1 = new (MonthBased())(1);
        this.l81_1 = this.k81_1.x80(3);
        this.m81_1 = this.k81_1.x80(12);
        this.n81_1 = this.m81_1.x80(100);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_3 = $;
  }
  return CompanionClass_3;
}
var Companion_instance_3;
function Companion_getInstance_3() {
  if (Companion_instance_3 === VOID)
    new (Companion_3())();
  return Companion_instance_3;
}
var DateTimeUnitClass;
function DateTimeUnit() {
  if (DateTimeUnitClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance_3();
      }
      z80(value, unit) {
        return value === 1 ? unit : '' + value + '-' + unit;
      }
      y80(value, unit) {
        return value.equals(new (Long())(1, 0)) ? unit : value.toString() + '-' + unit;
      }
    }
    initMetadataForClass($, 'DateTimeUnit', VOID, VOID, VOID, VOID, VOID, {0: DateTimeUnitSerializer_getInstance});
    DateTimeUnitClass = $;
  }
  return DateTimeUnitClass;
}
//region block: init
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
Companion_instance_1 = new (Companion_1())();
Companion_instance_2 = new (Companion_2())();
//endregion
//region block: exports
export {
  Companion_getInstance_3 as Companion_getInstance1hjnoi8x2xjhl,
  DateBased as DateBasedu1hioe8kvjhw,
  DayBased as DayBased28hvf1xjg5r93,
  MonthBased as MonthBased16lxw4e6nhntg,
  TimeBased as TimeBasedn2y4mla0fo0k,
  DateTimeUnit as DateTimeUnit3ugctnw90699o,
};
//endregion

//# sourceMappingURL=DateTimeUnit.mjs.map
