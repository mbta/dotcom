import {
  AssertionError3yq7q0knw9m5 as AssertionError,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../exceptions.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import {
  DurationUnit_MILLISECONDS_getInstance15owevua4zjxe as DurationUnit_MILLISECONDS_getInstance,
  DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak as DurationUnit_NANOSECONDS_getInstance,
  convertDurationUnit2jq3wf7d49p64 as convertDurationUnit,
  convertDurationUnit1gi5cqpfj6qf3 as convertDurationUnit_0,
  DurationUnit_DAYS_getInstance3abv9r3rbwkq3 as DurationUnit_DAYS_getInstance,
  DurationUnit_HOURS_getInstancebu9fos347hpz as DurationUnit_HOURS_getInstance,
  DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance,
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
  DurationUnit_MICROSECONDS_getInstance2dy62s6vvg5md as DurationUnit_MICROSECONDS_getInstance,
  convertDurationUnitOverflow13zjt78f02ii6 as convertDurationUnitOverflow,
} from './DurationUnitJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { coerceIn302bduskdb54x as coerceIn } from '../ranges/_Ranges.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { toLongw1zpgk99d84b as toLong } from '../js/numberConversion.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../text/StringBuilderJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  padStart36w1507hs626a as padStart,
  startsWith1bgirhbedtv2y as startsWith,
  indexOf1xbs558u7wr52 as indexOf,
  contains2el4s70rdq4ld as contains,
} from '../text/Strings.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../js/charSequenceJs.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../Comparable.mjs';
import { isNaNymqb93xtq8w8 as isNaN_0 } from '../NumbersJs.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { roundToLong2s902lrwaad4n as roundToLong } from '../math/math.mjs';
import {
  last2n4gf5az1lkn4 as last,
  drop336950s126lmj as drop,
} from '../text/_Strings.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from '../text/stringJs.mjs';
import {
  durationUnitByShortNameca994ehgzbk as durationUnitByShortName,
  durationUnitByIsoChar3j6su2a5lms6u as durationUnitByIsoChar,
} from './DurationUnit.mjs';
import {
  toLongkk4waq8msp1k as toLong_0,
  toDouble1kn912gjoizjp as toDouble,
} from '../text/numberConversions.mjs';
import {
  regionMatches30ph926sbb53j as regionMatches,
  startsWith26w8qjqapeeq6 as startsWith_0,
} from '../text/stringsCode.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function _Duration___init__impl__kdtzql(rawValue) {
  // Inline function 'kotlin.time.durationAssertionsEnabled' call
  if (true) {
    if (isInNanos(rawValue)) {
      var containsArg = _get_value__a43j40(rawValue);
      if (!((new (Long())(387905, -1073741824)).d2(containsArg) <= 0 ? containsArg.d2(new (Long())(-387905, 1073741823)) <= 0 : false))
        throw AssertionError().sg(_get_value__a43j40(rawValue).toString() + ' ns is out of nanoseconds range');
    } else {
      var containsArg_0 = _get_value__a43j40(rawValue);
      if (!((new (Long())(1, -1073741824)).d2(containsArg_0) <= 0 ? containsArg_0.d2(new (Long())(-1, 1073741823)) <= 0 : false))
        throw AssertionError().sg(_get_value__a43j40(rawValue).toString() + ' ms is out of milliseconds range');
      var containsArg_1 = _get_value__a43j40(rawValue);
      if ((new (Long())(1108857478, -1074)).d2(containsArg_1) <= 0 ? containsArg_1.d2(new (Long())(-1108857478, 1073)) <= 0 : false)
        throw AssertionError().sg(_get_value__a43j40(rawValue).toString() + ' ms is denormalized');
    }
  }
  return rawValue;
}
function _get_rawValue__5zfu4e($this) {
  return $this;
}
function _get_value__a43j40($this) {
  return _get_rawValue__5zfu4e($this).q4(1);
}
function isInNanos($this) {
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  return (_get_rawValue__5zfu4e($this).f2() & 1) === 0;
}
function isInMillis($this) {
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  return (_get_rawValue__5zfu4e($this).f2() & 1) === 1;
}
function _get_storageUnit__szjgha($this) {
  return isInNanos($this) ? DurationUnit_NANOSECONDS_getInstance() : DurationUnit_MILLISECONDS_getInstance();
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.yl_1 = _Duration___init__impl__kdtzql(new (Long())(0, 0));
        this.zl_1 = durationOfMillis(new (Long())(-1, 1073741823));
        this.am_1 = durationOfMillis(new (Long())(1, -1073741824));
      }
      gv(value) {
        var tmp;
        try {
          tmp = parseDuration(value, true);
        } catch ($p) {
          var tmp_0;
          if ($p instanceof IllegalArgumentException()) {
            var e = $p;
            throw IllegalArgumentException().xf("Invalid ISO duration string format: '" + value + "'.", e);
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
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function Duration__unaryMinus_impl_x2k1y0($this) {
  var tmp = _get_value__a43j40($this).m4();
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  var tmp$ret$0 = _get_rawValue__5zfu4e($this).f2() & 1;
  return durationOf(tmp, tmp$ret$0);
}
function Duration__plus_impl_yu9v8f($this, other) {
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    if (Duration__isFinite_impl_rzjsps(other) || _get_rawValue__5zfu4e($this).u4(_get_rawValue__5zfu4e(other)).d2(new (Long())(0, 0)) >= 0)
      return $this;
    else
      throw IllegalArgumentException().q('Summing infinite durations of different signs yields an undefined result.');
  } else if (Duration__isInfinite_impl_tsn9y3(other))
    return other;
  var tmp;
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  var tmp_0 = _get_rawValue__5zfu4e($this).f2() & 1;
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  if (tmp_0 === (_get_rawValue__5zfu4e(other).f2() & 1)) {
    var result = _get_value__a43j40($this).f4(_get_value__a43j40(other));
    tmp = isInNanos($this) ? durationOfNanosNormalized(result) : durationOfMillisNormalized(result);
  } else {
    if (isInMillis($this)) {
      tmp = addValuesMixedRanges($this, _get_value__a43j40($this), _get_value__a43j40(other));
    } else {
      tmp = addValuesMixedRanges($this, _get_value__a43j40(other), _get_value__a43j40($this));
    }
  }
  return tmp;
}
function addValuesMixedRanges($this, thisMillis, otherNanos) {
  var otherMillis = nanosToMillis(otherNanos);
  var resultMillis = thisMillis.f4(otherMillis);
  var tmp;
  if ((new (Long())(1108857478, -1074)).d2(resultMillis) <= 0 ? resultMillis.d2(new (Long())(-1108857478, 1073)) <= 0 : false) {
    var otherNanoRemainder = otherNanos.g4(millisToNanos(otherMillis));
    tmp = durationOfNanos(millisToNanos(resultMillis).f4(otherNanoRemainder));
  } else {
    tmp = durationOfMillis(coerceIn(resultMillis, new (Long())(1, -1073741824), new (Long())(-1, 1073741823)));
  }
  return tmp;
}
function Duration__isNegative_impl_pbysfa($this) {
  return _get_rawValue__5zfu4e($this).d2(new (Long())(0, 0)) < 0;
}
function Duration__isPositive_impl_tvkkt2($this) {
  return _get_rawValue__5zfu4e($this).d2(new (Long())(0, 0)) > 0;
}
function Duration__isInfinite_impl_tsn9y3($this) {
  return _get_rawValue__5zfu4e($this).equals(_get_rawValue__5zfu4e(Companion_getInstance().zl_1)) || _get_rawValue__5zfu4e($this).equals(_get_rawValue__5zfu4e(Companion_getInstance().am_1));
}
function Duration__isFinite_impl_rzjsps($this) {
  return !Duration__isInfinite_impl_tsn9y3($this);
}
function _Duration___get_absoluteValue__impl__vr7i6w($this) {
  return Duration__isNegative_impl_pbysfa($this) ? Duration__unaryMinus_impl_x2k1y0($this) : $this;
}
function Duration__compareTo_impl_pchp0f($this, other) {
  var compareBits = _get_rawValue__5zfu4e($this).u4(_get_rawValue__5zfu4e(other));
  if (compareBits.d2(new (Long())(0, 0)) < 0 || (compareBits.f2() & 1) === 0)
    return _get_rawValue__5zfu4e($this).d2(_get_rawValue__5zfu4e(other));
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  var tmp = _get_rawValue__5zfu4e($this).f2() & 1;
  // Inline function 'kotlin.time.Duration.unitDiscriminator' call
  var r = tmp - (_get_rawValue__5zfu4e(other).f2() & 1) | 0;
  return Duration__isNegative_impl_pbysfa($this) ? -r | 0 : r;
}
function Duration__compareTo_impl_pchp0f_0($this, other) {
  return Duration__compareTo_impl_pchp0f($this.xl_1, other instanceof Duration() ? other.xl_1 : THROW_CCE());
}
function _Duration___get_hoursComponent__impl__7hllxa($this) {
  var tmp;
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.Long.rem' call
    tmp = _Duration___get_inWholeHours__impl__kb9f3j($this).j4(toLong(24)).f2();
  }
  return tmp;
}
function _Duration___get_minutesComponent__impl__ctvd8u($this) {
  var tmp;
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.Long.rem' call
    tmp = _Duration___get_inWholeMinutes__impl__dognoh($this).j4(toLong(60)).f2();
  }
  return tmp;
}
function _Duration___get_secondsComponent__impl__if34a6($this) {
  var tmp;
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.Long.rem' call
    tmp = _Duration___get_inWholeSeconds__impl__hpy7b3($this).j4(toLong(60)).f2();
  }
  return tmp;
}
function _Duration___get_nanosecondsComponent__impl__nh19kq($this) {
  var tmp;
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    tmp = 0;
  } else if (isInMillis($this)) {
    // Inline function 'kotlin.Long.rem' call
    var tmp$ret$0 = _get_value__a43j40($this).j4(toLong(1000));
    tmp = millisToNanos(tmp$ret$0).f2();
  } else {
    var tmp0 = _get_value__a43j40($this);
    // Inline function 'kotlin.Long.rem' call
    var other = 1000000000;
    tmp = tmp0.j4(toLong(other)).f2();
  }
  return tmp;
}
function Duration__toDouble_impl_a56y2b($this, unit) {
  var tmp0_subject = _get_rawValue__5zfu4e($this);
  var tmp;
  if (tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().zl_1))) {
    tmp = Infinity;
  } else if (tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().am_1))) {
    tmp = -Infinity;
  } else {
    tmp = convertDurationUnit(_get_value__a43j40($this).y4(), _get_storageUnit__szjgha($this), unit);
  }
  return tmp;
}
function Duration__toLong_impl_shr43i($this, unit) {
  var tmp0_subject = _get_rawValue__5zfu4e($this);
  return tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().zl_1)) ? new (Long())(-1, 2147483647) : tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().am_1)) ? new (Long())(0, -2147483648) : convertDurationUnit_0(_get_value__a43j40($this), _get_storageUnit__szjgha($this), unit);
}
function _Duration___get_inWholeDays__impl__7bvpxz($this) {
  return Duration__toLong_impl_shr43i($this, DurationUnit_DAYS_getInstance());
}
function _Duration___get_inWholeHours__impl__kb9f3j($this) {
  return Duration__toLong_impl_shr43i($this, DurationUnit_HOURS_getInstance());
}
function _Duration___get_inWholeMinutes__impl__dognoh($this) {
  return Duration__toLong_impl_shr43i($this, DurationUnit_MINUTES_getInstance());
}
function _Duration___get_inWholeSeconds__impl__hpy7b3($this) {
  return Duration__toLong_impl_shr43i($this, DurationUnit_SECONDS_getInstance());
}
function _Duration___get_inWholeMilliseconds__impl__msfiry($this) {
  return isInMillis($this) && Duration__isFinite_impl_rzjsps($this) ? _get_value__a43j40($this) : Duration__toLong_impl_shr43i($this, DurationUnit_MILLISECONDS_getInstance());
}
function _Duration___get_inWholeMicroseconds__impl__8oe8vv($this) {
  return Duration__toLong_impl_shr43i($this, DurationUnit_MICROSECONDS_getInstance());
}
function _Duration___get_inWholeNanoseconds__impl__r5x4mr($this) {
  var value = _get_value__a43j40($this);
  var tmp;
  if (isInNanos($this)) {
    tmp = value;
  } else {
    // Inline function 'kotlin.Long.div' call
    var tmp$ret$0 = (new (Long())(-1, 2147483647)).i4(toLong(1000000));
    if (value.d2(tmp$ret$0) > 0) {
      tmp = new (Long())(-1, 2147483647);
    } else {
      // Inline function 'kotlin.Long.div' call
      var tmp$ret$1 = (new (Long())(0, -2147483648)).i4(toLong(1000000));
      if (value.d2(tmp$ret$1) < 0) {
        tmp = new (Long())(0, -2147483648);
      } else {
        tmp = millisToNanos(value);
      }
    }
  }
  return tmp;
}
function Duration__toString_impl_8d916b($this) {
  var tmp0_subject = _get_rawValue__5zfu4e($this);
  var tmp;
  if (tmp0_subject.equals(new (Long())(0, 0))) {
    tmp = '0s';
  } else if (tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().zl_1))) {
    tmp = 'Infinity';
  } else if (tmp0_subject.equals(_get_rawValue__5zfu4e(Companion_getInstance().am_1))) {
    tmp = '-Infinity';
  } else {
    var isNegative = Duration__isNegative_impl_pbysfa($this);
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder().f();
    if (isNegative) {
      this_0.ic(_Char___init__impl__6a9atx(45));
    }
    // Inline function 'kotlin.time.Duration.toComponents' call
    var this_1 = _Duration___get_absoluteValue__impl__vr7i6w($this);
    var tmp0 = _Duration___get_inWholeDays__impl__7bvpxz(this_1);
    var tmp2 = _Duration___get_hoursComponent__impl__7hllxa(this_1);
    var tmp4 = _Duration___get_minutesComponent__impl__ctvd8u(this_1);
    var tmp6 = _Duration___get_secondsComponent__impl__if34a6(this_1);
    var nanoseconds = _Duration___get_nanosecondsComponent__impl__nh19kq(this_1);
    var hasDays = !tmp0.equals(new (Long())(0, 0));
    var hasHours = !(tmp2 === 0);
    var hasMinutes = !(tmp4 === 0);
    var hasSeconds = !(tmp6 === 0) || !(nanoseconds === 0);
    var components = 0;
    if (hasDays) {
      this_0.fj(tmp0).ic(_Char___init__impl__6a9atx(100));
      components = components + 1 | 0;
    }
    if (hasHours || (hasDays && (hasMinutes || hasSeconds))) {
      var _unary__edvuaz = components;
      components = _unary__edvuaz + 1 | 0;
      if (_unary__edvuaz > 0) {
        this_0.ic(_Char___init__impl__6a9atx(32));
      }
      this_0.ej(tmp2).ic(_Char___init__impl__6a9atx(104));
    }
    if (hasMinutes || (hasSeconds && (hasHours || hasDays))) {
      var _unary__edvuaz_0 = components;
      components = _unary__edvuaz_0 + 1 | 0;
      if (_unary__edvuaz_0 > 0) {
        this_0.ic(_Char___init__impl__6a9atx(32));
      }
      this_0.ej(tmp4).ic(_Char___init__impl__6a9atx(109));
    }
    if (hasSeconds) {
      var _unary__edvuaz_1 = components;
      components = _unary__edvuaz_1 + 1 | 0;
      if (_unary__edvuaz_1 > 0) {
        this_0.ic(_Char___init__impl__6a9atx(32));
      }
      if (!(tmp6 === 0) || hasDays || hasHours || hasMinutes) {
        appendFractional($this, this_0, tmp6, nanoseconds, 9, 's', false);
      } else if (nanoseconds >= 1000000) {
        appendFractional($this, this_0, nanoseconds / 1000000 | 0, nanoseconds % 1000000 | 0, 6, 'ms', false);
      } else if (nanoseconds >= 1000) {
        appendFractional($this, this_0, nanoseconds / 1000 | 0, nanoseconds % 1000 | 0, 3, 'us', false);
      } else
        this_0.ej(nanoseconds).hc('ns');
    }
    if (isNegative && components > 1) {
      this_0.ij(1, _Char___init__impl__6a9atx(40)).ic(_Char___init__impl__6a9atx(41));
    }
    tmp = this_0.toString();
  }
  return tmp;
}
function appendFractional($this, _this__u8e3s4, whole, fractional, fractionalSize, unit, isoZeroes) {
  _this__u8e3s4.ej(whole);
  if (!(fractional === 0)) {
    _this__u8e3s4.ic(_Char___init__impl__6a9atx(46));
    var fracString = padStart(fractional.toString(), fractionalSize, _Char___init__impl__6a9atx(48));
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.indexOfLast' call
      var inductionVariable = charSequenceLength(fracString) - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          if (!(charSequenceGet(fracString, index) === _Char___init__impl__6a9atx(48))) {
            tmp$ret$1 = index;
            break $l$block;
          }
        }
         while (0 <= inductionVariable);
      tmp$ret$1 = -1;
    }
    var nonZeroDigits = tmp$ret$1 + 1 | 0;
    if (!isoZeroes && nonZeroDigits < 3) {
      // Inline function 'kotlin.text.appendRange' call
      _this__u8e3s4.cj(fracString, 0, nonZeroDigits);
    } else {
      // Inline function 'kotlin.text.appendRange' call
      var endIndex = imul((nonZeroDigits + 2 | 0) / 3 | 0, 3);
      _this__u8e3s4.cj(fracString, 0, endIndex);
    }
  }
  _this__u8e3s4.hc(unit);
}
function Duration__toIsoString_impl_9h6wsm($this) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  if (Duration__isNegative_impl_pbysfa($this)) {
    this_0.ic(_Char___init__impl__6a9atx(45));
  }
  this_0.hc('PT');
  // Inline function 'kotlin.time.Duration.toComponents' call
  var this_1 = _Duration___get_absoluteValue__impl__vr7i6w($this);
  var tmp0 = _Duration___get_inWholeHours__impl__kb9f3j(this_1);
  var tmp2 = _Duration___get_minutesComponent__impl__ctvd8u(this_1);
  var tmp4 = _Duration___get_secondsComponent__impl__if34a6(this_1);
  var nanoseconds = _Duration___get_nanosecondsComponent__impl__nh19kq(this_1);
  var hours = tmp0;
  if (Duration__isInfinite_impl_tsn9y3($this)) {
    hours = new (Long())(1316134911, 2328);
  }
  var hasHours = !hours.equals(new (Long())(0, 0));
  var hasSeconds = !(tmp4 === 0) || !(nanoseconds === 0);
  var hasMinutes = !(tmp2 === 0) || (hasSeconds && hasHours);
  if (hasHours) {
    this_0.fj(hours).ic(_Char___init__impl__6a9atx(72));
  }
  if (hasMinutes) {
    this_0.ej(tmp2).ic(_Char___init__impl__6a9atx(77));
  }
  if (hasSeconds || (!hasHours && !hasMinutes)) {
    appendFractional($this, this_0, tmp4, nanoseconds, 9, 'S', true);
  }
  return this_0.toString();
}
function Duration__hashCode_impl_u4exz6($this) {
  return $this.hashCode();
}
function Duration__equals_impl_ygj6w6($this, other) {
  if (!(other instanceof Duration()))
    return false;
  var tmp0_other_with_cast = other instanceof Duration() ? other.xl_1 : THROW_CCE();
  if (!$this.equals(tmp0_other_with_cast))
    return false;
  return true;
}
var DurationClass;
function Duration() {
  if (DurationClass === VOID) {
    class $ {
      constructor(rawValue) {
        Companion_getInstance();
        this.xl_1 = rawValue;
      }
      hv(other) {
        return Duration__compareTo_impl_pchp0f(this.xl_1, other);
      }
      d(other) {
        return Duration__compareTo_impl_pchp0f_0(this, other);
      }
      toString() {
        return Duration__toString_impl_8d916b(this.xl_1);
      }
      hashCode() {
        return Duration__hashCode_impl_u4exz6(this.xl_1);
      }
      equals(other) {
        return Duration__equals_impl_ygj6w6(this.xl_1, other);
      }
    }
    initMetadataForClass($, 'Duration', VOID, VOID, [Comparable()]);
    DurationClass = $;
  }
  return DurationClass;
}
function toDuration(_this__u8e3s4, unit) {
  var valueInNs = convertDurationUnit(_this__u8e3s4, unit, DurationUnit_NANOSECONDS_getInstance());
  // Inline function 'kotlin.require' call
  if (!!isNaN_0(valueInNs)) {
    var message = 'Duration value cannot be NaN.';
    throw IllegalArgumentException().q(toString(message));
  }
  var nanos = roundToLong(valueInNs);
  var tmp;
  if ((new (Long())(387905, -1073741824)).d2(nanos) <= 0 ? nanos.d2(new (Long())(-387905, 1073741823)) <= 0 : false) {
    tmp = durationOfNanos(nanos);
  } else {
    var millis = roundToLong(convertDurationUnit(_this__u8e3s4, unit, DurationUnit_MILLISECONDS_getInstance()));
    tmp = durationOfMillisNormalized(millis);
  }
  return tmp;
}
function durationOfMillis(normalMillis) {
  // Inline function 'kotlin.Long.plus' call
  var tmp$ret$0 = normalMillis.p4(1).f4(toLong(1));
  return _Duration___init__impl__kdtzql(tmp$ret$0);
}
function toDuration_0(_this__u8e3s4, unit) {
  var tmp;
  if (unit.a4(DurationUnit_SECONDS_getInstance()) <= 0) {
    tmp = durationOfNanos(convertDurationUnitOverflow(toLong(_this__u8e3s4), unit, DurationUnit_NANOSECONDS_getInstance()));
  } else {
    tmp = toDuration_1(toLong(_this__u8e3s4), unit);
  }
  return tmp;
}
function toDuration_1(_this__u8e3s4, unit) {
  var maxNsInUnit = convertDurationUnitOverflow(new (Long())(-387905, 1073741823), DurationUnit_NANOSECONDS_getInstance(), unit);
  if (maxNsInUnit.m4().d2(_this__u8e3s4) <= 0 ? _this__u8e3s4.d2(maxNsInUnit) <= 0 : false) {
    return durationOfNanos(convertDurationUnitOverflow(_this__u8e3s4, unit, DurationUnit_NANOSECONDS_getInstance()));
  } else {
    var millis = convertDurationUnit_0(_this__u8e3s4, unit, DurationUnit_MILLISECONDS_getInstance());
    return durationOfMillis(coerceIn(millis, new (Long())(1, -1073741824), new (Long())(-1, 1073741823)));
  }
}
function parseDuration(value, strictIso) {
  var length = value.length;
  if (length === 0)
    throw IllegalArgumentException().q('The string is empty');
  var index = 0;
  var result = Companion_getInstance().yl_1;
  var infinityString = 'Infinity';
  var tmp0_subject = charCodeAt(value, index);
  if (tmp0_subject === _Char___init__impl__6a9atx(43) || tmp0_subject === _Char___init__impl__6a9atx(45)) {
    index = index + 1 | 0;
  }
  var hasSign = index > 0;
  var isNegative = hasSign && startsWith(value, _Char___init__impl__6a9atx(45));
  if (length <= index)
    throw IllegalArgumentException().q('No components');
  else {
    if (charCodeAt(value, index) === _Char___init__impl__6a9atx(80)) {
      index = index + 1 | 0;
      if (index === length)
        throw IllegalArgumentException().wf();
      var nonDigitSymbols = '+-.';
      var isTimeComponent = false;
      var prevUnit = null;
      $l$loop: while (index < length) {
        if (charCodeAt(value, index) === _Char___init__impl__6a9atx(84)) {
          var tmp;
          if (isTimeComponent) {
            tmp = true;
          } else {
            index = index + 1 | 0;
            tmp = index === length;
          }
          if (tmp)
            throw IllegalArgumentException().wf();
          isTimeComponent = true;
          continue $l$loop;
        }
        // Inline function 'kotlin.time.substringWhile' call
        var startIndex = index;
        // Inline function 'kotlin.time.skipWhile' call
        var i = startIndex;
        $l$loop_0: while (true) {
          var tmp_0;
          if (i < value.length) {
            var it = charCodeAt(value, i);
            tmp_0 = (_Char___init__impl__6a9atx(48) <= it ? it <= _Char___init__impl__6a9atx(57) : false) || contains(nonDigitSymbols, it);
          } else {
            tmp_0 = false;
          }
          if (!tmp_0) {
            break $l$loop_0;
          }
          i = i + 1 | 0;
        }
        var tmp$ret$1 = i;
        var component = substring(value, startIndex, tmp$ret$1);
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(component) === 0)
          throw IllegalArgumentException().wf();
        index = index + component.length | 0;
        // Inline function 'kotlin.text.getOrElse' call
        var index_0 = index;
        var tmp_1;
        if (0 <= index_0 ? index_0 <= (charSequenceLength(value) - 1 | 0) : false) {
          tmp_1 = charSequenceGet(value, index_0);
        } else {
          throw IllegalArgumentException().q('Missing unit for value ' + component);
        }
        var unitChar = tmp_1;
        index = index + 1 | 0;
        var unit = durationUnitByIsoChar(unitChar, isTimeComponent);
        if (!(prevUnit == null) && prevUnit.a4(unit) <= 0)
          throw IllegalArgumentException().q('Unexpected order of duration components');
        prevUnit = unit;
        var dotIndex = indexOf(component, _Char___init__impl__6a9atx(46));
        if (unit.equals(DurationUnit_SECONDS_getInstance()) && dotIndex > 0) {
          var whole = substring(component, 0, dotIndex);
          result = Duration__plus_impl_yu9v8f(result, toDuration_1(parseOverLongIsoComponent(whole), unit));
          result = Duration__plus_impl_yu9v8f(result, toDuration(toDouble(substring_0(component, dotIndex)), unit));
        } else {
          result = Duration__plus_impl_yu9v8f(result, toDuration_1(parseOverLongIsoComponent(component), unit));
        }
      }
    } else {
      if (strictIso)
        throw IllegalArgumentException().wf();
      else {
        var tmp_2 = index;
        var tmp0 = length - index | 0;
        // Inline function 'kotlin.comparisons.maxOf' call
        var b = infinityString.length;
        var tmp$ret$5 = Math.max(tmp0, b);
        if (regionMatches(value, tmp_2, infinityString, 0, tmp$ret$5, true)) {
          result = Companion_getInstance().zl_1;
        } else {
          var prevUnit_0 = null;
          var afterFirst = false;
          var allowSpaces = !hasSign;
          if (hasSign && charCodeAt(value, index) === _Char___init__impl__6a9atx(40) && last(value) === _Char___init__impl__6a9atx(41)) {
            allowSpaces = true;
            index = index + 1 | 0;
            var tmp_3 = index;
            length = length - 1 | 0;
            if (tmp_3 === length)
              throw IllegalArgumentException().q('No components');
          }
          while (index < length) {
            if (afterFirst && allowSpaces) {
              // Inline function 'kotlin.time.skipWhile' call
              var i_0 = index;
              $l$loop_1: while (true) {
                var tmp_4;
                if (i_0 < value.length) {
                  tmp_4 = charCodeAt(value, i_0) === _Char___init__impl__6a9atx(32);
                } else {
                  tmp_4 = false;
                }
                if (!tmp_4) {
                  break $l$loop_1;
                }
                i_0 = i_0 + 1 | 0;
              }
              index = i_0;
            }
            afterFirst = true;
            // Inline function 'kotlin.time.substringWhile' call
            var startIndex_0 = index;
            // Inline function 'kotlin.time.skipWhile' call
            var i_1 = startIndex_0;
            $l$loop_2: while (true) {
              var tmp_5;
              if (i_1 < value.length) {
                var it_0 = charCodeAt(value, i_1);
                tmp_5 = (_Char___init__impl__6a9atx(48) <= it_0 ? it_0 <= _Char___init__impl__6a9atx(57) : false) || it_0 === _Char___init__impl__6a9atx(46);
              } else {
                tmp_5 = false;
              }
              if (!tmp_5) {
                break $l$loop_2;
              }
              i_1 = i_1 + 1 | 0;
            }
            var tmp$ret$9 = i_1;
            var component_0 = substring(value, startIndex_0, tmp$ret$9);
            // Inline function 'kotlin.text.isEmpty' call
            if (charSequenceLength(component_0) === 0)
              throw IllegalArgumentException().wf();
            index = index + component_0.length | 0;
            // Inline function 'kotlin.time.substringWhile' call
            var startIndex_1 = index;
            // Inline function 'kotlin.time.skipWhile' call
            var i_2 = startIndex_1;
            $l$loop_3: while (true) {
              var tmp_6;
              if (i_2 < value.length) {
                var it_1 = charCodeAt(value, i_2);
                tmp_6 = _Char___init__impl__6a9atx(97) <= it_1 ? it_1 <= _Char___init__impl__6a9atx(122) : false;
              } else {
                tmp_6 = false;
              }
              if (!tmp_6) {
                break $l$loop_3;
              }
              i_2 = i_2 + 1 | 0;
            }
            var tmp$ret$13 = i_2;
            var unitName = substring(value, startIndex_1, tmp$ret$13);
            index = index + unitName.length | 0;
            var unit_0 = durationUnitByShortName(unitName);
            if (!(prevUnit_0 == null) && prevUnit_0.a4(unit_0) <= 0)
              throw IllegalArgumentException().q('Unexpected order of duration components');
            prevUnit_0 = unit_0;
            var dotIndex_0 = indexOf(component_0, _Char___init__impl__6a9atx(46));
            if (dotIndex_0 > 0) {
              var whole_0 = substring(component_0, 0, dotIndex_0);
              result = Duration__plus_impl_yu9v8f(result, toDuration_1(toLong_0(whole_0), unit_0));
              result = Duration__plus_impl_yu9v8f(result, toDuration(toDouble(substring_0(component_0, dotIndex_0)), unit_0));
              if (index < length)
                throw IllegalArgumentException().q('Fractional component must be last');
            } else {
              result = Duration__plus_impl_yu9v8f(result, toDuration_1(toLong_0(component_0), unit_0));
            }
          }
        }
      }
    }
  }
  return isNegative ? Duration__unaryMinus_impl_x2k1y0(result) : result;
}
function durationOf(normalValue, unitDiscriminator) {
  // Inline function 'kotlin.Long.plus' call
  var tmp$ret$0 = normalValue.p4(1).f4(toLong(unitDiscriminator));
  return _Duration___init__impl__kdtzql(tmp$ret$0);
}
function durationOfNanosNormalized(nanos) {
  var tmp;
  if ((new (Long())(387905, -1073741824)).d2(nanos) <= 0 ? nanos.d2(new (Long())(-387905, 1073741823)) <= 0 : false) {
    tmp = durationOfNanos(nanos);
  } else {
    tmp = durationOfMillis(nanosToMillis(nanos));
  }
  return tmp;
}
function durationOfMillisNormalized(millis) {
  var tmp;
  if ((new (Long())(1108857478, -1074)).d2(millis) <= 0 ? millis.d2(new (Long())(-1108857478, 1073)) <= 0 : false) {
    tmp = durationOfNanos(millisToNanos(millis));
  } else {
    tmp = durationOfMillis(coerceIn(millis, new (Long())(1, -1073741824), new (Long())(-1, 1073741823)));
  }
  return tmp;
}
function nanosToMillis(nanos) {
  // Inline function 'kotlin.Long.div' call
  return nanos.i4(toLong(1000000));
}
function millisToNanos(millis) {
  // Inline function 'kotlin.Long.times' call
  return millis.h4(toLong(1000000));
}
function durationOfNanos(normalNanos) {
  return _Duration___init__impl__kdtzql(normalNanos.p4(1));
}
function parseOverLongIsoComponent(value) {
  var length = value.length;
  var startIndex = 0;
  if (length > 0 && contains('+-', charCodeAt(value, 0))) {
    startIndex = startIndex + 1 | 0;
  }
  if ((length - startIndex | 0) > 16) {
    // Inline function 'kotlin.run' call
    $l$block: {
      var firstNonZero = startIndex;
      var inductionVariable = startIndex;
      if (inductionVariable < length)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp0_subject = charCodeAt(value, index);
          if (tmp0_subject === _Char___init__impl__6a9atx(48)) {
            if (firstNonZero === index) {
              firstNonZero = firstNonZero + 1 | 0;
            }
          } else if (!(_Char___init__impl__6a9atx(49) <= tmp0_subject ? tmp0_subject <= _Char___init__impl__6a9atx(57) : false)) {
            break $l$block;
          }
        }
         while (inductionVariable < length);
      if ((length - firstNonZero | 0) > 16) {
        return charCodeAt(value, 0) === _Char___init__impl__6a9atx(45) ? new (Long())(0, -2147483648) : new (Long())(-1, 2147483647);
      }
    }
  }
  var tmp;
  var tmp_0;
  if (startsWith_0(value, '+') && length > 1) {
    var containsArg = charCodeAt(value, 1);
    tmp_0 = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = toLong_0(drop(value, 1));
  } else {
    tmp = toLong_0(value);
  }
  return tmp;
}
//region block: exports
export {
  _Duration___init__impl__kdtzql as _Duration___init__impl__kdtzql7iqlnkubkgor,
  Duration__compareTo_impl_pchp0f as Duration__compareTo_impl_pchp0f3d3hhywzdbk51,
  Duration__hashCode_impl_u4exz6 as Duration__hashCode_impl_u4exz629donm5f9ouki,
  _Duration___get_inWholeMicroseconds__impl__8oe8vv as _Duration___get_inWholeMicroseconds__impl__8oe8vv19aiucvzsj6hp,
  _Duration___get_inWholeMilliseconds__impl__msfiry as _Duration___get_inWholeMilliseconds__impl__msfiry1byvgyrhm5g4a,
  _Duration___get_inWholeNanoseconds__impl__r5x4mr as _Duration___get_inWholeNanoseconds__impl__r5x4mrk9yyarf6pdhq,
  _Duration___get_inWholeSeconds__impl__hpy7b3 as _Duration___get_inWholeSeconds__impl__hpy7b32fu0rnoit26fw,
  Duration__isNegative_impl_pbysfa as Duration__isNegative_impl_pbysfa3pj1ldkh46xsj,
  Duration__isPositive_impl_tvkkt2 as Duration__isPositive_impl_tvkkt22mscvvkiz7i1u,
  _Duration___get_nanosecondsComponent__impl__nh19kq as _Duration___get_nanosecondsComponent__impl__nh19kq1udaeb2ce31e1,
  Duration__plus_impl_yu9v8f as Duration__plus_impl_yu9v8f2gb5hwgakp0dd,
  Duration__toDouble_impl_a56y2b as Duration__toDouble_impl_a56y2bbonx5x15fky2,
  Duration__toIsoString_impl_9h6wsm as Duration__toIsoString_impl_9h6wsm3b9pty5ms72ij,
  Duration__toString_impl_8d916b as Duration__toString_impl_8d916b11f1kpclwmkpg,
  Duration__unaryMinus_impl_x2k1y0 as Duration__unaryMinus_impl_x2k1y03dvxfmeyyyudl,
  Companion_getInstance as Companion_getInstance3vz87v4c01z2t,
  Duration as Duration5ynfiptaqcrg,
  toDuration as toDuration28gf6ughsr3vf,
  toDuration_1 as toDurationba1nlt78o6vu,
  toDuration_0 as toDuration7gy6v749ektt,
};
//endregion

//# sourceMappingURL=Duration.mjs.map
