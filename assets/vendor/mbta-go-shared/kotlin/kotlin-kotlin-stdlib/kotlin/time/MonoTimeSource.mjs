import {
  ValueTimeMark3e7hmed1q029a as ValueTimeMark,
  _ValueTimeMark___init__impl__uyfl2m22m36y3wcipfk as _ValueTimeMark___init__impl__uyfl2m,
  _ValueTimeMark___get_reading__impl__5qz8rdr1dvf7ope4cq as _ValueTimeMark___get_reading__impl__5qz8rd,
} from './TimeSource.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  contentEqualsaf55p28mnw74 as contentEquals,
  contentHashCode2i020q5tbeh2s as contentHashCode,
  contentToString3ujacv8hqfipd as contentToString,
} from '../collections/_ArraysJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import {
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
  DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak as DurationUnit_NANOSECONDS_getInstance,
  DurationUnit_MILLISECONDS_getInstance15owevua4zjxe as DurationUnit_MILLISECONDS_getInstance,
} from './DurationUnitJs.mjs';
import {
  toDuration28gf6ughsr3vf as toDuration,
  Duration__plus_impl_yu9v8f2gb5hwgakp0dd as Duration__plus_impl_yu9v8f,
  Duration5ynfiptaqcrg as Duration,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  _Duration___get_inWholeSeconds__impl__hpy7b32fu0rnoit26fw as _Duration___get_inWholeSeconds__impl__hpy7b3,
  _Duration___get_nanosecondsComponent__impl__nh19kq1udaeb2ce31e1 as _Duration___get_nanosecondsComponent__impl__nh19kq,
  Duration__toDouble_impl_a56y2bbonx5x15fky2 as Duration__toDouble_impl_a56y2b,
} from './Duration.mjs';
import {
  isFinite2t9l5a275mxm6 as isFinite,
  isNaNymqb93xtq8w8 as isNaN_0,
} from '../NumbersJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
//region block: imports
var trunc = Math.trunc;
//endregion
//region block: pre-declaration
//endregion
var MonotonicTimeSourceClass;
function MonotonicTimeSource() {
  if (MonotonicTimeSourceClass === VOID) {
    class $ {
      constructor() {
        MonotonicTimeSource_instance = this;
        var tmp = this;
        // Inline function 'kotlin.run' call
        var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
        var tmp_0;
        if (isNode) {
          // Inline function 'kotlin.js.unsafeCast' call
          var tmp$ret$0 = process;
          tmp_0 = new (HrTimeSource())(tmp$ret$0);
        } else {
          // Inline function 'kotlin.js.unsafeCast' call
          var tmp0_safe_receiver = typeof self !== 'undefined' ? self : globalThis;
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.performance;
          var tmp_1;
          if (tmp1_safe_receiver == null) {
            tmp_1 = null;
          } else {
            // Inline function 'kotlin.let' call
            tmp_1 = new (PerformanceTimeSource())(tmp1_safe_receiver);
          }
          var tmp2_elvis_lhs = tmp_1;
          tmp_0 = tmp2_elvis_lhs == null ? DateNowTimeSource_instance : tmp2_elvis_lhs;
        }
        tmp.pl_1 = tmp_0;
      }
      ql() {
        return this.pl_1.ql();
      }
      rl() {
        return new (ValueTimeMark())(this.ql());
      }
      sl(timeMark) {
        return this.pl_1.sl(timeMark);
      }
      tl(one, another) {
        return this.pl_1.tl(one, another);
      }
      ul(timeMark, duration) {
        return this.pl_1.ul(timeMark, duration);
      }
    }
    initMetadataForObject($, 'MonotonicTimeSource');
    MonotonicTimeSourceClass = $;
  }
  return MonotonicTimeSourceClass;
}
var MonotonicTimeSource_instance;
function MonotonicTimeSource_getInstance() {
  if (MonotonicTimeSource_instance === VOID)
    new (MonotonicTimeSource())();
  return MonotonicTimeSource_instance;
}
var ReadingClass;
function Reading() {
  if (ReadingClass === VOID) {
    class $ {
      constructor(components) {
        this.vl_1 = components;
      }
      equals(other) {
        var tmp;
        if (other instanceof Reading()) {
          tmp = contentEquals(this.vl_1, other.vl_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return contentHashCode(this.vl_1);
      }
      toString() {
        return contentToString(this.vl_1);
      }
    }
    initMetadataForClass($, 'Reading');
    ReadingClass = $;
  }
  return ReadingClass;
}
var HrTimeSourceClass;
function HrTimeSource() {
  if (HrTimeSourceClass === VOID) {
    class $ {
      constructor(process) {
        this.wl_1 = process;
      }
      ql() {
        return _ValueTimeMark___init__impl__uyfl2m(new (Reading())(this.wl_1.hrtime()));
      }
      rl() {
        return new (ValueTimeMark())(this.ql());
      }
      sl(timeMark) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        // Inline function 'kotlin.let' call
        var destruct = this.wl_1.hrtime((tmp instanceof Reading() ? tmp : THROW_CCE()).vl_1);
        // Inline function 'kotlin.collections.component1' call
        var seconds = destruct[0];
        // Inline function 'kotlin.collections.component2' call
        var nanos = destruct[1];
        return Duration__plus_impl_yu9v8f(toDuration(seconds, DurationUnit_SECONDS_getInstance()), toDuration(nanos, DurationUnit_NANOSECONDS_getInstance()));
      }
      tl(one, another) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(one);
        var _destruct__k2r9zo = tmp instanceof Reading() ? tmp : THROW_CCE();
        // Inline function 'kotlin.time.Reading.component1' call
        // Inline function 'kotlin.collections.component1' call
        var s1 = _destruct__k2r9zo.vl_1[0];
        // Inline function 'kotlin.time.Reading.component2' call
        // Inline function 'kotlin.collections.component2' call
        var n1 = _destruct__k2r9zo.vl_1[1];
        var tmp_0 = _ValueTimeMark___get_reading__impl__5qz8rd(another);
        var _destruct__k2r9zo_0 = tmp_0 instanceof Reading() ? tmp_0 : THROW_CCE();
        // Inline function 'kotlin.time.Reading.component1' call
        // Inline function 'kotlin.collections.component1' call
        var s2 = _destruct__k2r9zo_0.vl_1[0];
        // Inline function 'kotlin.time.Reading.component2' call
        // Inline function 'kotlin.collections.component2' call
        var n2 = _destruct__k2r9zo_0.vl_1[1];
        return Duration__plus_impl_yu9v8f(s1 === s2 && n1 === n2 ? Companion_getInstance().yl_1 : toDuration(s1 - s2, DurationUnit_SECONDS_getInstance()), toDuration(n1 - n2, DurationUnit_NANOSECONDS_getInstance()));
      }
      ul(timeMark, duration) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        // Inline function 'kotlin.let' call
        var destruct = tmp instanceof Reading() ? tmp : THROW_CCE();
        // Inline function 'kotlin.time.Reading.component1' call
        // Inline function 'kotlin.collections.component1' call
        var seconds = destruct.vl_1[0];
        // Inline function 'kotlin.time.Reading.component2' call
        // Inline function 'kotlin.collections.component2' call
        var nanos = destruct.vl_1[1];
        // Inline function 'kotlin.time.Duration.toComponents' call
        _Duration___get_inWholeSeconds__impl__hpy7b3(duration);
        var addNanos = _Duration___get_nanosecondsComponent__impl__nh19kq(duration);
        // Inline function 'kotlin.math.truncate' call
        var x = Duration__toDouble_impl_a56y2b(duration, DurationUnit_SECONDS_getInstance());
        var tmp$ret$4 = trunc(x);
        var resultSeconds = sumCheckNaN(seconds + tmp$ret$4);
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$7 = [resultSeconds, isFinite(resultSeconds) ? nanos + addNanos : 0.0];
        // Inline function 'kotlin.let' call
        var p0 = new (Reading())(tmp$ret$7);
        return _ValueTimeMark___init__impl__uyfl2m(p0);
      }
      toString() {
        return 'TimeSource(process.hrtime())';
      }
    }
    initMetadataForClass($, 'HrTimeSource');
    HrTimeSourceClass = $;
  }
  return HrTimeSourceClass;
}
function read($this) {
  return $this.cm_1.now();
}
var PerformanceTimeSourceClass;
function PerformanceTimeSource() {
  if (PerformanceTimeSourceClass === VOID) {
    class $ {
      constructor(performance) {
        this.cm_1 = performance;
      }
      ql() {
        return _ValueTimeMark___init__impl__uyfl2m(read(this));
      }
      rl() {
        return new (ValueTimeMark())(this.ql());
      }
      sl(timeMark) {
        Companion_getInstance();
        var tmp = read(this);
        var tmp_0 = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        // Inline function 'kotlin.time.Companion.milliseconds' call
        var this_0 = tmp - (typeof tmp_0 === 'number' ? tmp_0 : THROW_CCE());
        return toDuration(this_0, DurationUnit_MILLISECONDS_getInstance());
      }
      tl(one, another) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(one);
        var ms1 = typeof tmp === 'number' ? tmp : THROW_CCE();
        var tmp_0 = _ValueTimeMark___get_reading__impl__5qz8rd(another);
        var ms2 = typeof tmp_0 === 'number' ? tmp_0 : THROW_CCE();
        var tmp_1;
        if (ms1 === ms2) {
          tmp_1 = Companion_getInstance().yl_1;
        } else {
          Companion_getInstance();
          // Inline function 'kotlin.time.Companion.milliseconds' call
          var this_0 = ms1 - ms2;
          tmp_1 = toDuration(this_0, DurationUnit_MILLISECONDS_getInstance());
        }
        return tmp_1;
      }
      ul(timeMark, duration) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        return _ValueTimeMark___init__impl__uyfl2m(sumCheckNaN((typeof tmp === 'number' ? tmp : THROW_CCE()) + Duration__toDouble_impl_a56y2b(duration, DurationUnit_MILLISECONDS_getInstance())));
      }
      toString() {
        return 'TimeSource(self.performance.now())';
      }
    }
    initMetadataForClass($, 'PerformanceTimeSource');
    PerformanceTimeSourceClass = $;
  }
  return PerformanceTimeSourceClass;
}
function read_0($this) {
  return Date.now();
}
var DateNowTimeSourceClass;
function DateNowTimeSource() {
  if (DateNowTimeSourceClass === VOID) {
    class $ {
      ql() {
        return _ValueTimeMark___init__impl__uyfl2m(read_0(this));
      }
      rl() {
        return new (ValueTimeMark())(this.ql());
      }
      sl(timeMark) {
        Companion_getInstance();
        var tmp = read_0(this);
        var tmp_0 = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        // Inline function 'kotlin.time.Companion.milliseconds' call
        var this_0 = tmp - (typeof tmp_0 === 'number' ? tmp_0 : THROW_CCE());
        return toDuration(this_0, DurationUnit_MILLISECONDS_getInstance());
      }
      tl(one, another) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(one);
        var ms1 = typeof tmp === 'number' ? tmp : THROW_CCE();
        var tmp_0 = _ValueTimeMark___get_reading__impl__5qz8rd(another);
        var ms2 = typeof tmp_0 === 'number' ? tmp_0 : THROW_CCE();
        var tmp_1;
        if (ms1 === ms2) {
          tmp_1 = Companion_getInstance().yl_1;
        } else {
          Companion_getInstance();
          // Inline function 'kotlin.time.Companion.milliseconds' call
          var this_0 = ms1 - ms2;
          tmp_1 = toDuration(this_0, DurationUnit_MILLISECONDS_getInstance());
        }
        return tmp_1;
      }
      ul(timeMark, duration) {
        var tmp = _ValueTimeMark___get_reading__impl__5qz8rd(timeMark);
        return _ValueTimeMark___init__impl__uyfl2m(sumCheckNaN((typeof tmp === 'number' ? tmp : THROW_CCE()) + Duration__toDouble_impl_a56y2b(duration, DurationUnit_MILLISECONDS_getInstance())));
      }
      toString() {
        return 'TimeSource(Date.now())';
      }
    }
    initMetadataForObject($, 'DateNowTimeSource');
    DateNowTimeSourceClass = $;
  }
  return DateNowTimeSourceClass;
}
var DateNowTimeSource_instance;
function DateNowTimeSource_getInstance() {
  return DateNowTimeSource_instance;
}
function sumCheckNaN(value) {
  // Inline function 'kotlin.also' call
  if (isNaN_0(value))
    throw IllegalArgumentException().q('Summing infinities of different signs');
  return value;
}
//region block: init
DateNowTimeSource_instance = new (DateNowTimeSource())();
//endregion
//region block: exports
export {
  MonotonicTimeSource_getInstance as MonotonicTimeSource_getInstance3bamn00mqnnfr,
};
//endregion

//# sourceMappingURL=MonoTimeSource.mjs.map
