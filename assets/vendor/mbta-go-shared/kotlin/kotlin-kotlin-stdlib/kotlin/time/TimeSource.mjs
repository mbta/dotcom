import { MonotonicTimeSource_getInstance3bamn00mqnnfr as MonotonicTimeSource_getInstance } from './MonoTimeSource.mjs';
import {
  Duration__unaryMinus_impl_x2k1y03dvxfmeyyyudl as Duration__unaryMinus_impl_x2k1y0,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f,
} from './Duration.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../Comparable.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _ValueTimeMark___init__impl__uyfl2m(reading) {
  return reading;
}
function _ValueTimeMark___get_reading__impl__5qz8rd($this) {
  return $this;
}
function ValueTimeMark__elapsedNow_impl_eonqvs($this) {
  return MonotonicTimeSource_getInstance().sl($this);
}
function ValueTimeMark__minus_impl_f87sko($this, duration) {
  return MonotonicTimeSource_getInstance().ul($this, Duration__unaryMinus_impl_x2k1y0(duration));
}
function ValueTimeMark__minus_impl_f87sko_0($this, other) {
  if (!(other instanceof ValueTimeMark()))
    throw IllegalArgumentException().q('Subtracting or comparing time marks from different time sources is not possible: ' + ValueTimeMark__toString_impl_ow3ax6($this) + ' and ' + toString(other));
  return ValueTimeMark__minus_impl_f87sko_1($this, other.bm_1);
}
function ValueTimeMark__minus_impl_f87sko_1($this, other) {
  return MonotonicTimeSource_getInstance().tl($this, other);
}
function ValueTimeMark__toString_impl_ow3ax6($this) {
  return 'ValueTimeMark(reading=' + toString($this) + ')';
}
function ValueTimeMark__hashCode_impl_oduu93($this) {
  return hashCode($this);
}
function ValueTimeMark__equals_impl_uc54jh($this, other) {
  if (!(other instanceof ValueTimeMark()))
    return false;
  var tmp0_other_with_cast = other instanceof ValueTimeMark() ? other.bm_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
function ValueTimeMark__compareTo_impl_uoccns($this, other) {
  return $this.jw((!(other == null) ? isInterface(other, ComparableTimeMark()) : false) ? other : THROW_CCE());
}
var ValueTimeMarkClass;
function ValueTimeMark() {
  if (ValueTimeMarkClass === VOID) {
    class $ {
      constructor(reading) {
        this.bm_1 = reading;
      }
      kw(other) {
        return ValueTimeMark__minus_impl_f87sko_0(this.bm_1, other);
      }
      toString() {
        return ValueTimeMark__toString_impl_ow3ax6(this.bm_1);
      }
      hashCode() {
        return ValueTimeMark__hashCode_impl_oduu93(this.bm_1);
      }
      equals(other) {
        return ValueTimeMark__equals_impl_uc54jh(this.bm_1, other);
      }
      d(other) {
        return ValueTimeMark__compareTo_impl_uoccns(this, other);
      }
    }
    protoOf($).jw = compareTo;
    initMetadataForClass($, 'ValueTimeMark', VOID, VOID, [ComparableTimeMark()]);
    ValueTimeMarkClass = $;
  }
  return ValueTimeMarkClass;
}
var MonotonicClass;
function Monotonic() {
  if (MonotonicClass === VOID) {
    class $ {
      ql() {
        return MonotonicTimeSource_getInstance().ql();
      }
      toString() {
        return toString(MonotonicTimeSource_getInstance());
      }
    }
    initMetadataForObject($, 'Monotonic');
    MonotonicClass = $;
  }
  return MonotonicClass;
}
var Monotonic_instance;
function Monotonic_getInstance() {
  return Monotonic_instance;
}
function compareTo(other) {
  return Duration__compareTo_impl_pchp0f(this.kw(other), Companion_getInstance().yl_1);
}
var ComparableTimeMarkClass;
function ComparableTimeMark() {
  if (ComparableTimeMarkClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ComparableTimeMark', VOID, VOID, [Comparable()]);
    ComparableTimeMarkClass = $;
  }
  return ComparableTimeMarkClass;
}
//region block: init
Monotonic_instance = new (Monotonic())();
//endregion
//region block: exports
export {
  _ValueTimeMark___init__impl__uyfl2m as _ValueTimeMark___init__impl__uyfl2m22m36y3wcipfk,
  ValueTimeMark__elapsedNow_impl_eonqvs as ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852,
  ValueTimeMark__hashCode_impl_oduu93 as ValueTimeMark__hashCode_impl_oduu931xt570oez5llr,
  ValueTimeMark__minus_impl_f87sko as ValueTimeMark__minus_impl_f87skoyqdc44davnhd,
  _ValueTimeMark___get_reading__impl__5qz8rd as _ValueTimeMark___get_reading__impl__5qz8rdr1dvf7ope4cq,
  ValueTimeMark__toString_impl_ow3ax6 as ValueTimeMark__toString_impl_ow3ax61i24rbzgoxmoi,
  Monotonic_instance as Monotonic_instance6v32gqtywf7e,
  ValueTimeMark as ValueTimeMark3e7hmed1q029a,
};
//endregion

//# sourceMappingURL=TimeSource.mjs.map
