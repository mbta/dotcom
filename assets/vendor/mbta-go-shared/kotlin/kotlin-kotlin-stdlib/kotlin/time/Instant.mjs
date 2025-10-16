import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../js/numberConversion.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import {
  _Duration___get_inWholeSeconds__impl__hpy7b32fu0rnoit26fw as _Duration___get_inWholeSeconds__impl__hpy7b3,
  _Duration___get_nanosecondsComponent__impl__nh19kq1udaeb2ce31e1 as _Duration___get_nanosecondsComponent__impl__nh19kq,
  Duration__isPositive_impl_tvkkt22mscvvkiz7i1u as Duration__isPositive_impl_tvkkt2,
  Duration__unaryMinus_impl_x2k1y03dvxfmeyyyudl as Duration__unaryMinus_impl_x2k1y0,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  toDurationba1nlt78o6vu as toDuration,
  toDuration7gy6v749ektt as toDuration_0,
  Duration__plus_impl_yu9v8f2gb5hwgakp0dd as Duration__plus_impl_yu9v8f,
} from './Duration.mjs';
import {
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
  DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak as DurationUnit_NANOSECONDS_getInstance,
} from './DurationUnitJs.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../js/compareTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../Comparable.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../text/StringBuilderJs.mjs';
import { abs1kdzbjes1idip as abs } from '../math/math.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
  toString3o7ifthqydp6e as toString_0,
  Char19o2r8palgjof as Char,
} from '../Char.mjs';
import { substring3saq8ornu0luv as substring } from '../text/stringJs.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../js/charSequenceJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_POWERS_OF_TEN() {
  _init_properties_Instant_kt__2myitt();
  return POWERS_OF_TEN;
}
var POWERS_OF_TEN;
function get_asciiDigitPositionsInIsoStringAfterYear() {
  _init_properties_Instant_kt__2myitt();
  return asciiDigitPositionsInIsoStringAfterYear;
}
var asciiDigitPositionsInIsoStringAfterYear;
function get_colonsInIsoOffsetString() {
  _init_properties_Instant_kt__2myitt();
  return colonsInIsoOffsetString;
}
var colonsInIsoOffsetString;
function get_asciiDigitsInIsoOffsetString() {
  _init_properties_Instant_kt__2myitt();
  return asciiDigitsInIsoOffsetString;
}
var asciiDigitsInIsoOffsetString;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.ml_1 = new (Instant())(new (Long())(342103040, -7347440), 0);
        this.nl_1 = new (Instant())(new (Long())(-90867457, 7347410), 999999999);
      }
      ol(epochMilliseconds) {
        // Inline function 'kotlin.floorDiv' call
        var other = new (Long())(1000, 0);
        var q = epochMilliseconds.i4(other);
        if (epochMilliseconds.u4(other).d2(new (Long())(0, 0)) < 0 && !q.h4(other).equals(epochMilliseconds)) {
          q = q.l4();
        }
        var epochSeconds = q;
        // Inline function 'kotlin.mod' call
        var other_0 = new (Long())(1000, 0);
        var r = epochMilliseconds.j4(other_0);
        // Inline function 'kotlin.Long.times' call
        var nanosecondsOfSecond = r.f4(other_0.s4(r.u4(other_0).s4(r.t4(r.m4())).q4(63))).h4(toLong(1000000)).f2();
        return epochSeconds.d2(new (Long())(342103040, -7347440)) < 0 ? this.ml_1 : epochSeconds.d2(new (Long())(-90867457, 7347410)) > 0 ? this.nl_1 : this.iv(epochSeconds, nanosecondsOfSecond);
      }
      jv(epochSeconds, nanosecondAdjustment) {
        // Inline function 'kotlin.floorDiv' call
        var other = new (Long())(1000000000, 0);
        var q = nanosecondAdjustment.i4(other);
        if (nanosecondAdjustment.u4(other).d2(new (Long())(0, 0)) < 0 && !q.h4(other).equals(nanosecondAdjustment)) {
          q = q.l4();
        }
        // Inline function 'kotlin.time.safeAddOrElse' call
        var b = q;
        var sum = epochSeconds.f4(b);
        if (epochSeconds.u4(sum).d2(new (Long())(0, 0)) < 0 && epochSeconds.u4(b).d2(new (Long())(0, 0)) >= 0) {
          return epochSeconds.d2(new (Long())(0, 0)) > 0 ? Companion_getInstance_0().nl_1 : Companion_getInstance_0().ml_1;
        }
        var seconds = sum;
        var tmp;
        if (seconds.d2(new (Long())(342103040, -7347440)) < 0) {
          tmp = this.ml_1;
        } else if (seconds.d2(new (Long())(-90867457, 7347410)) > 0) {
          tmp = this.nl_1;
        } else {
          // Inline function 'kotlin.mod' call
          var other_0 = new (Long())(1000000000, 0);
          var r = nanosecondAdjustment.j4(other_0);
          var nanoseconds = r.f4(other_0.s4(r.u4(other_0).s4(r.t4(r.m4())).q4(63))).f2();
          tmp = new (Instant())(seconds, nanoseconds);
        }
        return tmp;
      }
      kv(epochSeconds, nanosecondAdjustment, $super) {
        nanosecondAdjustment = nanosecondAdjustment === VOID ? new (Long())(0, 0) : nanosecondAdjustment;
        return $super === VOID ? this.jv(epochSeconds, nanosecondAdjustment) : $super.jv.call(this, epochSeconds, nanosecondAdjustment);
      }
      iv(epochSeconds, nanosecondAdjustment) {
        return this.jv(epochSeconds, toLong(nanosecondAdjustment));
      }
      lv(input) {
        return parseIso(input).mv();
      }
      nv() {
        return this.iv(new (Long())(1151527680, 720), 0);
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
var InstantClass;
function Instant() {
  if (InstantClass === VOID) {
    class $ {
      constructor(epochSeconds, nanosecondsOfSecond) {
        Companion_getInstance_0();
        this.jl_1 = epochSeconds;
        this.kl_1 = nanosecondsOfSecond;
        var containsArg = this.jl_1;
        // Inline function 'kotlin.require' call
        if (!((new (Long())(342103040, -7347440)).d2(containsArg) <= 0 ? containsArg.d2(new (Long())(-90867457, 7347410)) <= 0 : false)) {
          var message = 'Instant exceeds minimum or maximum instant';
          throw IllegalArgumentException().q(toString(message));
        }
      }
      ll() {
        if (this.jl_1.d2(new (Long())(0, 0)) >= 0) {
          var tmp0 = this.jl_1;
          var tmp2 = new (Long())(1000, 0);
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlin.time.safeMultiplyOrElse' call
            if (tmp2.equals(new (Long())(1, 0))) {
              tmp$ret$0 = tmp0;
              break $l$block_1;
            }
            if (tmp0.equals(new (Long())(1, 0))) {
              tmp$ret$0 = tmp2;
              break $l$block_1;
            }
            if (tmp0.equals(new (Long())(0, 0)) || tmp2.equals(new (Long())(0, 0))) {
              tmp$ret$0 = new (Long())(0, 0);
              break $l$block_1;
            }
            var total = tmp0.h4(tmp2);
            if (!total.i4(tmp2).equals(tmp0) || (tmp0.equals(new (Long())(0, -2147483648)) && tmp2.equals(new (Long())(-1, -1))) || (tmp2.equals(new (Long())(0, -2147483648)) && tmp0.equals(new (Long())(-1, -1)))) {
              return new (Long())(-1, 2147483647);
            }
            tmp$ret$0 = total;
          }
          var millis = tmp$ret$0;
          // Inline function 'kotlin.time.safeAddOrElse' call
          var b = toLong(this.kl_1 / 1000000 | 0);
          var sum = millis.f4(b);
          if (millis.u4(sum).d2(new (Long())(0, 0)) < 0 && millis.u4(b).d2(new (Long())(0, 0)) >= 0) {
            return new (Long())(-1, 2147483647);
          }
          return sum;
        } else {
          // Inline function 'kotlin.Long.plus' call
          var tmp0_0 = this.jl_1.f4(toLong(1));
          var tmp2_0 = new (Long())(1000, 0);
          var tmp$ret$3;
          $l$block_4: {
            // Inline function 'kotlin.time.safeMultiplyOrElse' call
            if (tmp2_0.equals(new (Long())(1, 0))) {
              tmp$ret$3 = tmp0_0;
              break $l$block_4;
            }
            if (tmp0_0.equals(new (Long())(1, 0))) {
              tmp$ret$3 = tmp2_0;
              break $l$block_4;
            }
            if (tmp0_0.equals(new (Long())(0, 0)) || tmp2_0.equals(new (Long())(0, 0))) {
              tmp$ret$3 = new (Long())(0, 0);
              break $l$block_4;
            }
            var total_0 = tmp0_0.h4(tmp2_0);
            if (!total_0.i4(tmp2_0).equals(tmp0_0) || (tmp0_0.equals(new (Long())(0, -2147483648)) && tmp2_0.equals(new (Long())(-1, -1))) || (tmp2_0.equals(new (Long())(0, -2147483648)) && tmp0_0.equals(new (Long())(-1, -1)))) {
              return new (Long())(0, -2147483648);
            }
            tmp$ret$3 = total_0;
          }
          var millis_0 = tmp$ret$3;
          // Inline function 'kotlin.time.safeAddOrElse' call
          var b_0 = toLong((this.kl_1 / 1000000 | 0) - 1000 | 0);
          var sum_0 = millis_0.f4(b_0);
          if (millis_0.u4(sum_0).d2(new (Long())(0, 0)) < 0 && millis_0.u4(b_0).d2(new (Long())(0, 0)) >= 0) {
            return new (Long())(0, -2147483648);
          }
          return sum_0;
        }
      }
      ov(duration) {
        // Inline function 'kotlin.time.Duration.toComponents' call
        var tmp0 = _Duration___get_inWholeSeconds__impl__hpy7b3(duration);
        var nanosecondsToAdd = _Duration___get_nanosecondsComponent__impl__nh19kq(duration);
        if (tmp0.equals(new (Long())(0, 0)) && nanosecondsToAdd === 0) {
          return this;
        }
        // Inline function 'kotlin.time.safeAddOrElse' call
        var a = this.jl_1;
        var sum = a.f4(tmp0);
        if (a.u4(sum).d2(new (Long())(0, 0)) < 0 && a.u4(tmp0).d2(new (Long())(0, 0)) >= 0) {
          return Duration__isPositive_impl_tvkkt2(duration) ? Companion_getInstance_0().nl_1 : Companion_getInstance_0().ml_1;
        }
        var newEpochSeconds = sum;
        var nanoAdjustment = this.kl_1 + nanosecondsToAdd | 0;
        return Companion_getInstance_0().iv(newEpochSeconds, nanoAdjustment);
      }
      pv(duration) {
        return this.ov(Duration__unaryMinus_impl_x2k1y0(duration));
      }
      qv(other) {
        Companion_getInstance();
        // Inline function 'kotlin.time.Companion.seconds' call
        var this_0 = this.jl_1.g4(other.jl_1);
        var tmp = toDuration(this_0, DurationUnit_SECONDS_getInstance());
        Companion_getInstance();
        // Inline function 'kotlin.time.Companion.nanoseconds' call
        var this_1 = this.kl_1 - other.kl_1 | 0;
        var tmp$ret$1 = toDuration_0(this_1, DurationUnit_NANOSECONDS_getInstance());
        return Duration__plus_impl_yu9v8f(tmp, tmp$ret$1);
      }
      rv(other) {
        var s = this.jl_1.d2(other.jl_1);
        if (!(s === 0)) {
          return s;
        }
        return compareTo(this.kl_1, other.kl_1);
      }
      d(other) {
        return this.rv(other instanceof Instant() ? other : THROW_CCE());
      }
      equals(other) {
        var tmp;
        if (this === other) {
          tmp = true;
        } else {
          var tmp_0;
          var tmp_1;
          if (other instanceof Instant()) {
            tmp_1 = this.jl_1.equals(other.jl_1);
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp_0 = this.kl_1 === other.kl_1;
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        return this.jl_1.hashCode() + imul(51, this.kl_1) | 0;
      }
      toString() {
        return formatIso(this);
      }
    }
    initMetadataForClass($, 'Instant', VOID, VOID, [Comparable()]);
    InstantClass = $;
  }
  return InstantClass;
}
function formatIso(instant) {
  _init_properties_Instant_kt__2myitt();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  var ldt = Companion_instance_0.sv(instant);
  // Inline function 'kotlin.run' call
  var number = ldt.tv_1;
  var tmp;
  // Inline function 'kotlin.math.absoluteValue' call
  if (abs(number) < 1000) {
    var innerBuilder = StringBuilder().f();
    if (number >= 0) {
      // Inline function 'kotlin.text.deleteAt' call
      innerBuilder.ej(number + 10000 | 0).lj(0);
    } else {
      // Inline function 'kotlin.text.deleteAt' call
      innerBuilder.ej(number - 10000 | 0).lj(1);
    }
    tmp = this_0.v(innerBuilder);
  } else {
    if (number >= 10000) {
      this_0.ic(_Char___init__impl__6a9atx(43));
    }
    tmp = this_0.ej(number);
  }
  this_0.ic(_Char___init__impl__6a9atx(45));
  formatIso$_anonymous_$appendTwoDigits_ydzygl(this_0, this_0, ldt.uv_1);
  this_0.ic(_Char___init__impl__6a9atx(45));
  formatIso$_anonymous_$appendTwoDigits_ydzygl(this_0, this_0, ldt.vv_1);
  this_0.ic(_Char___init__impl__6a9atx(84));
  formatIso$_anonymous_$appendTwoDigits_ydzygl(this_0, this_0, ldt.wv_1);
  this_0.ic(_Char___init__impl__6a9atx(58));
  formatIso$_anonymous_$appendTwoDigits_ydzygl(this_0, this_0, ldt.xv_1);
  this_0.ic(_Char___init__impl__6a9atx(58));
  formatIso$_anonymous_$appendTwoDigits_ydzygl(this_0, this_0, ldt.yv_1);
  if (!(ldt.zv_1 === 0)) {
    this_0.ic(_Char___init__impl__6a9atx(46));
    var zerosToStrip = 0;
    while ((ldt.zv_1 % get_POWERS_OF_TEN()[zerosToStrip + 1 | 0] | 0) === 0) {
      zerosToStrip = zerosToStrip + 1 | 0;
    }
    zerosToStrip = zerosToStrip - (zerosToStrip % 3 | 0) | 0;
    var numberToOutput = ldt.zv_1 / get_POWERS_OF_TEN()[zerosToStrip] | 0;
    this_0.hc(substring((numberToOutput + get_POWERS_OF_TEN()[9 - zerosToStrip | 0] | 0).toString(), 1));
  }
  this_0.ic(_Char___init__impl__6a9atx(90));
  return this_0.toString();
}
var SuccessClass;
function Success() {
  if (SuccessClass === VOID) {
    class $ {
      constructor(epochSeconds, nanosecondsOfSecond) {
        this.aw_1 = epochSeconds;
        this.bw_1 = nanosecondsOfSecond;
      }
      mv() {
        if (this.aw_1.d2(Companion_getInstance_0().ml_1.jl_1) < 0 || this.aw_1.d2(Companion_getInstance_0().nl_1.jl_1) > 0)
          throw InstantFormatException().gw('The parsed date is outside the range representable by Instant (Unix epoch second ' + this.aw_1.toString() + ')');
        return Companion_getInstance_0().iv(this.aw_1, this.bw_1);
      }
    }
    initMetadataForClass($, 'Success');
    SuccessClass = $;
  }
  return SuccessClass;
}
var FailureClass;
function Failure() {
  if (FailureClass === VOID) {
    class $ {
      constructor(error, input) {
        this.hw_1 = error;
        this.iw_1 = input;
      }
      mv() {
        throw InstantFormatException().gw(this.hw_1 + ' when parsing an Instant from "' + truncateForErrorMessage(this.iw_1, 64) + '"');
      }
    }
    initMetadataForClass($, 'Failure');
    FailureClass = $;
  }
  return FailureClass;
}
function parseIso(isoString) {
  _init_properties_Instant_kt__2myitt();
  var s = isoString;
  var i = 0;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(s) === 0) {
    return new (Failure())('An empty string is not a valid Instant', isoString);
  }
  var c = charSequenceGet(s, i);
  var tmp;
  if (c === _Char___init__impl__6a9atx(43) || c === _Char___init__impl__6a9atx(45)) {
    i = i + 1 | 0;
    tmp = c;
  } else {
    tmp = _Char___init__impl__6a9atx(32);
  }
  var yearSign = tmp;
  var yearStart = i;
  var absYear = 0;
  $l$loop: while (true) {
    var tmp_0;
    if (i < charSequenceLength(s)) {
      var containsArg = charSequenceGet(s, i);
      tmp_0 = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
    } else {
      tmp_0 = false;
    }
    if (!tmp_0) {
      break $l$loop;
    }
    absYear = imul(absYear, 10) + Char__minus_impl_a2frrh(charSequenceGet(s, i), _Char___init__impl__6a9atx(48)) | 0;
    i = i + 1 | 0;
  }
  var yearStrLength = i - yearStart | 0;
  var tmp_1;
  if (yearStrLength > 10) {
    return parseIso$parseFailure(isoString, 'Expected at most 10 digits for the year number, got ' + yearStrLength + ' digits');
  } else if (yearStrLength === 10 && Char__compareTo_impl_ypi4mb(charSequenceGet(s, yearStart), _Char___init__impl__6a9atx(50)) >= 0) {
    return parseIso$parseFailure(isoString, 'Expected at most 9 digits for the year number or year 1000000000, got ' + yearStrLength + ' digits');
  } else if (yearStrLength < 4) {
    return parseIso$parseFailure(isoString, 'The year number must be padded to 4 digits, got ' + yearStrLength + ' digits');
  } else {
    if (yearSign === _Char___init__impl__6a9atx(43) && yearStrLength === 4) {
      return parseIso$parseFailure(isoString, "The '+' sign at the start is only valid for year numbers longer than 4 digits");
    }
    if (yearSign === _Char___init__impl__6a9atx(32) && !(yearStrLength === 4)) {
      return parseIso$parseFailure(isoString, "A '+' or '-' sign is required for year numbers longer than 4 digits");
    }
    tmp_1 = yearSign === _Char___init__impl__6a9atx(45) ? -absYear | 0 : absYear;
  }
  var year = tmp_1;
  if (charSequenceLength(s) < (i + 16 | 0)) {
    return parseIso$parseFailure(isoString, 'The input string is too short');
  }
  var tmp_2 = i;
  var tmp0_safe_receiver = parseIso$expect(isoString, "'-'", tmp_2, parseIso$lambda);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var tmp_3 = i + 3 | 0;
  var tmp1_safe_receiver = parseIso$expect(isoString, "'-'", tmp_3, parseIso$lambda_0);
  if (tmp1_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp1_safe_receiver;
  }
  var tmp_4 = i + 6 | 0;
  var tmp2_safe_receiver = parseIso$expect(isoString, "'T' or 't'", tmp_4, parseIso$lambda_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp2_safe_receiver;
  }
  var tmp_5 = i + 9 | 0;
  var tmp3_safe_receiver = parseIso$expect(isoString, "':'", tmp_5, parseIso$lambda_2);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp3_safe_receiver;
  }
  var tmp_6 = i + 12 | 0;
  var tmp4_safe_receiver = parseIso$expect(isoString, "':'", tmp_6, parseIso$lambda_3);
  if (tmp4_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp4_safe_receiver;
  }
  var indexedObject = get_asciiDigitPositionsInIsoStringAfterYear();
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var j = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var tmp_7 = i + j | 0;
    var tmp5_safe_receiver = parseIso$expect(isoString, 'an ASCII digit', tmp_7, parseIso$lambda_4);
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return tmp5_safe_receiver;
    }
  }
  var month = parseIso$twoDigitNumber(s, i + 1 | 0);
  var day = parseIso$twoDigitNumber(s, i + 4 | 0);
  var hour = parseIso$twoDigitNumber(s, i + 7 | 0);
  var minute = parseIso$twoDigitNumber(s, i + 10 | 0);
  var second = parseIso$twoDigitNumber(s, i + 13 | 0);
  var tmp_8;
  if (charSequenceGet(s, i + 15 | 0) === _Char___init__impl__6a9atx(46)) {
    var fractionStart = i + 16 | 0;
    i = fractionStart;
    var fraction = 0;
    $l$loop_0: while (true) {
      var tmp_9;
      if (i < charSequenceLength(s)) {
        var containsArg_0 = charSequenceGet(s, i);
        tmp_9 = _Char___init__impl__6a9atx(48) <= containsArg_0 ? containsArg_0 <= _Char___init__impl__6a9atx(57) : false;
      } else {
        tmp_9 = false;
      }
      if (!tmp_9) {
        break $l$loop_0;
      }
      fraction = imul(fraction, 10) + Char__minus_impl_a2frrh(charSequenceGet(s, i), _Char___init__impl__6a9atx(48)) | 0;
      i = i + 1 | 0;
    }
    var fractionStrLength = i - fractionStart | 0;
    var tmp_10;
    if (1 <= fractionStrLength ? fractionStrLength <= 9 : false) {
      tmp_10 = imul(fraction, get_POWERS_OF_TEN()[9 - fractionStrLength | 0]);
    } else {
      return parseIso$parseFailure(isoString, '1..9 digits are supported for the fraction of the second, got ' + fractionStrLength + ' digits');
    }
    tmp_8 = tmp_10;
  } else {
    i = i + 15 | 0;
    tmp_8 = 0;
  }
  var nanosecond = tmp_8;
  if (i >= charSequenceLength(s)) {
    return parseIso$parseFailure(isoString, 'The UTC offset at the end of the string is missing');
  }
  var sign = charSequenceGet(s, i);
  var tmp_11;
  if (sign === _Char___init__impl__6a9atx(122) || sign === _Char___init__impl__6a9atx(90)) {
    var tmp_12;
    if (charSequenceLength(s) === (i + 1 | 0)) {
      tmp_12 = 0;
    } else {
      return parseIso$parseFailure(isoString, 'Extra text after the instant at position ' + (i + 1 | 0));
    }
    tmp_11 = tmp_12;
  } else if (sign === _Char___init__impl__6a9atx(45) || sign === _Char___init__impl__6a9atx(43)) {
    var offsetStrLength = charSequenceLength(s) - i | 0;
    if (offsetStrLength > 9) {
      // Inline function 'kotlin.text.substring' call
      var startIndex = i;
      var endIndex = charSequenceLength(s);
      var tmp$ret$7 = toString(charSequenceSubSequence(s, startIndex, endIndex));
      return parseIso$parseFailure(isoString, 'The UTC offset string "' + truncateForErrorMessage(tmp$ret$7, 16) + '" is too long');
    }
    if (!((offsetStrLength % 3 | 0) === 0)) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_0 = i;
      var endIndex_0 = charSequenceLength(s);
      var tmp$ret$8 = toString(charSequenceSubSequence(s, startIndex_0, endIndex_0));
      return parseIso$parseFailure(isoString, 'Invalid UTC offset string "' + tmp$ret$8 + '"');
    }
    var indexedObject_0 = get_colonsInIsoOffsetString();
    var inductionVariable_0 = 0;
    var last_0 = indexedObject_0.length;
    $l$loop_1: while (inductionVariable_0 < last_0) {
      var j_0 = indexedObject_0[inductionVariable_0];
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if ((i + j_0 | 0) >= charSequenceLength(s))
        break $l$loop_1;
      if (!(charSequenceGet(s, i + j_0 | 0) === _Char___init__impl__6a9atx(58)))
        return parseIso$parseFailure(isoString, "Expected ':' at index " + (i + j_0 | 0) + ", got '" + toString_0(charSequenceGet(s, i + j_0 | 0)) + "'");
    }
    var indexedObject_1 = get_asciiDigitsInIsoOffsetString();
    var inductionVariable_1 = 0;
    var last_1 = indexedObject_1.length;
    $l$loop_2: while (inductionVariable_1 < last_1) {
      var j_1 = indexedObject_1[inductionVariable_1];
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      if ((i + j_1 | 0) >= charSequenceLength(s))
        break $l$loop_2;
      var containsArg_1 = charSequenceGet(s, i + j_1 | 0);
      if (!(_Char___init__impl__6a9atx(48) <= containsArg_1 ? containsArg_1 <= _Char___init__impl__6a9atx(57) : false))
        return parseIso$parseFailure(isoString, 'Expected an ASCII digit at index ' + (i + j_1 | 0) + ", got '" + toString_0(charSequenceGet(s, i + j_1 | 0)) + "'");
    }
    var offsetHour = parseIso$twoDigitNumber(s, i + 1 | 0);
    var tmp_13;
    if (offsetStrLength > 3) {
      tmp_13 = parseIso$twoDigitNumber(s, i + 4 | 0);
    } else {
      tmp_13 = 0;
    }
    var offsetMinute = tmp_13;
    var tmp_14;
    if (offsetStrLength > 6) {
      tmp_14 = parseIso$twoDigitNumber(s, i + 7 | 0);
    } else {
      tmp_14 = 0;
    }
    var offsetSecond = tmp_14;
    if (offsetMinute > 59) {
      return parseIso$parseFailure(isoString, 'Expected offset-minute-of-hour in 0..59, got ' + offsetMinute);
    }
    if (offsetSecond > 59) {
      return parseIso$parseFailure(isoString, 'Expected offset-second-of-minute in 0..59, got ' + offsetSecond);
    }
    if (offsetHour > 17 && !(offsetHour === 18 && offsetMinute === 0 && offsetSecond === 0)) {
      // Inline function 'kotlin.text.substring' call
      var startIndex_1 = i;
      var endIndex_1 = charSequenceLength(s);
      var tmp$ret$9 = toString(charSequenceSubSequence(s, startIndex_1, endIndex_1));
      return parseIso$parseFailure(isoString, 'Expected an offset in -18:00..+18:00, got ' + tmp$ret$9);
    }
    tmp_11 = imul((imul(offsetHour, 3600) + imul(offsetMinute, 60) | 0) + offsetSecond | 0, sign === _Char___init__impl__6a9atx(45) ? -1 : 1);
  } else {
    return parseIso$parseFailure(isoString, 'Expected the UTC offset at position ' + i + ", got '" + toString_0(sign) + "'");
  }
  var offsetSeconds = tmp_11;
  if (!(1 <= month ? month <= 12 : false)) {
    return parseIso$parseFailure(isoString, 'Expected a month number in 1..12, got ' + month);
  }
  if (!(1 <= day ? day <= monthLength(month, isLeapYear(year)) : false)) {
    return parseIso$parseFailure(isoString, 'Expected a valid day-of-month for month ' + month + ' of year ' + year + ', got ' + day);
  }
  if (hour > 23) {
    return parseIso$parseFailure(isoString, 'Expected hour in 0..23, got ' + hour);
  }
  if (minute > 59) {
    return parseIso$parseFailure(isoString, 'Expected minute-of-hour in 0..59, got ' + minute);
  }
  if (second > 59) {
    return parseIso$parseFailure(isoString, 'Expected second-of-minute in 0..59, got ' + second);
  }
  // Inline function 'kotlin.time.UnboundLocalDateTime.toInstant' call
  var this_0 = new (UnboundLocalDateTime())(year, month, day, hour, minute, second, nanosecond);
  // Inline function 'kotlin.run' call
  // Inline function 'kotlin.run' call
  var y = toLong(this_0.tv_1);
  var total = numberToLong(365).h4(y);
  if (y.d2(new (Long())(0, 0)) >= 0) {
    var tmp_15 = total;
    // Inline function 'kotlin.Long.plus' call
    // Inline function 'kotlin.Long.div' call
    var tmp_16 = y.f4(toLong(3)).i4(toLong(4));
    // Inline function 'kotlin.Long.plus' call
    // Inline function 'kotlin.Long.div' call
    var tmp$ret$13 = y.f4(toLong(99)).i4(toLong(100));
    var tmp_17 = tmp_16.g4(tmp$ret$13);
    // Inline function 'kotlin.Long.plus' call
    // Inline function 'kotlin.Long.div' call
    var tmp$ret$15 = y.f4(toLong(399)).i4(toLong(400));
    total = tmp_15.f4(tmp_17.f4(tmp$ret$15));
  } else {
    var tmp_18 = total;
    // Inline function 'kotlin.Long.div' call
    var tmp_19 = y.i4(toLong(-4));
    // Inline function 'kotlin.Long.div' call
    var tmp$ret$17 = y.i4(toLong(-100));
    var tmp_20 = tmp_19.g4(tmp$ret$17);
    // Inline function 'kotlin.Long.div' call
    var tmp$ret$18 = y.i4(toLong(-400));
    total = tmp_18.g4(tmp_20.f4(tmp$ret$18));
  }
  var tmp0 = total;
  // Inline function 'kotlin.Long.plus' call
  var other = (imul(367, this_0.uv_1) - 362 | 0) / 12 | 0;
  total = tmp0.f4(toLong(other));
  var tmp0_0 = total;
  // Inline function 'kotlin.Long.plus' call
  var other_0 = this_0.vv_1 - 1 | 0;
  total = tmp0_0.f4(toLong(other_0));
  if (this_0.uv_1 > 2) {
    total = total.l4();
    if (!isLeapYear(this_0.tv_1)) {
      total = total.l4();
    }
  }
  // Inline function 'kotlin.Long.minus' call
  var epochDays = total.g4(toLong(719528));
  var daySeconds = (imul(this_0.wv_1, 3600) + imul(this_0.xv_1, 60) | 0) + this_0.yv_1 | 0;
  // Inline function 'kotlin.Long.times' call
  // Inline function 'kotlin.Long.plus' call
  // Inline function 'kotlin.Long.minus' call
  var epochSeconds = epochDays.h4(toLong(86400)).f4(toLong(daySeconds)).g4(toLong(offsetSeconds));
  var p1 = this_0.zv_1;
  return new (Success())(epochSeconds, p1);
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      sv(instant) {
        var localSecond = instant.jl_1;
        // Inline function 'kotlin.floorDiv' call
        var other = new (Long())(86400, 0);
        var q = localSecond.i4(other);
        if (localSecond.u4(other).d2(new (Long())(0, 0)) < 0 && !q.h4(other).equals(localSecond)) {
          q = q.l4();
        }
        var epochDays = q;
        // Inline function 'kotlin.mod' call
        var other_0 = new (Long())(86400, 0);
        var r = localSecond.j4(other_0);
        var secsOfDay = r.f4(other_0.s4(r.u4(other_0).s4(r.t4(r.m4())).q4(63))).f2();
        var year;
        var month;
        var day;
        // Inline function 'kotlin.run' call
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
        month = ((marchMonth0 + 2 | 0) % 12 | 0) + 1 | 0;
        day = (marchDoy0 - ((imul(marchMonth0, 306) + 5 | 0) / 10 | 0) | 0) + 1 | 0;
        var tmp0 = yearEst;
        // Inline function 'kotlin.Long.plus' call
        var other_1 = marchMonth0 / 10 | 0;
        year = tmp0.f4(toLong(other_1)).f2();
        var hours = secsOfDay / 3600 | 0;
        var secondWithoutHours = secsOfDay - imul(hours, 3600) | 0;
        var minutes = secondWithoutHours / 60 | 0;
        var second = secondWithoutHours - imul(minutes, 60) | 0;
        return new (UnboundLocalDateTime())(year, month, day, hours, minutes, second, instant.kl_1);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_1() {
  return Companion_instance_0;
}
var UnboundLocalDateTimeClass;
function UnboundLocalDateTime() {
  if (UnboundLocalDateTimeClass === VOID) {
    class $ {
      constructor(year, month, day, hour, minute, second, nanosecond) {
        this.tv_1 = year;
        this.uv_1 = month;
        this.vv_1 = day;
        this.wv_1 = hour;
        this.xv_1 = minute;
        this.yv_1 = second;
        this.zv_1 = nanosecond;
      }
      toString() {
        return 'UnboundLocalDateTime(' + this.tv_1 + '-' + this.uv_1 + '-' + this.vv_1 + ' ' + this.wv_1 + ':' + this.xv_1 + ':' + this.yv_1 + '.' + this.zv_1 + ')';
      }
    }
    initMetadataForClass($, 'UnboundLocalDateTime');
    UnboundLocalDateTimeClass = $;
  }
  return UnboundLocalDateTimeClass;
}
var InstantFormatExceptionClass;
function InstantFormatException() {
  if (InstantFormatExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static gw(message) {
        var $this = this.q(message);
        captureStack($this, $this.fw_1);
        return $this;
      }
    }
    initMetadataForClass($, 'InstantFormatException');
    InstantFormatExceptionClass = $;
  }
  return InstantFormatExceptionClass;
}
function truncateForErrorMessage(_this__u8e3s4, maxLength) {
  _init_properties_Instant_kt__2myitt();
  var tmp;
  if (charSequenceLength(_this__u8e3s4) <= maxLength) {
    tmp = toString(_this__u8e3s4);
  } else {
    // Inline function 'kotlin.text.substring' call
    tmp = toString(charSequenceSubSequence(_this__u8e3s4, 0, maxLength)) + '...';
  }
  return tmp;
}
function monthLength(_this__u8e3s4, isLeapYear) {
  _init_properties_Instant_kt__2myitt();
  switch (_this__u8e3s4) {
    case 2:
      return isLeapYear ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}
function isLeapYear(year) {
  _init_properties_Instant_kt__2myitt();
  return (year & 3) === 0 && (!((year % 100 | 0) === 0) || (year % 400 | 0) === 0);
}
function formatIso$_anonymous_$appendTwoDigits_ydzygl(_this__u8e3s4, $this_buildString, number) {
  if (number < 10) {
    _this__u8e3s4.ic(_Char___init__impl__6a9atx(48));
  }
  $this_buildString.ej(number);
}
function parseIso$parseFailure($isoString, error) {
  return new (Failure())(error + ' when parsing an Instant from "' + truncateForErrorMessage($isoString, 64) + '"', $isoString);
}
function parseIso$expect($isoString, what, where, predicate) {
  var c = charSequenceGet($isoString, where);
  var tmp;
  if (predicate(new (Char())(c))) {
    tmp = null;
  } else {
    tmp = parseIso$parseFailure($isoString, 'Expected ' + what + ", but got '" + toString_0(c) + "' at position " + where);
  }
  return tmp;
}
function parseIso$twoDigitNumber(s, index) {
  return imul(Char__minus_impl_a2frrh(charSequenceGet(s, index), _Char___init__impl__6a9atx(48)), 10) + Char__minus_impl_a2frrh(charSequenceGet(s, index + 1 | 0), _Char___init__impl__6a9atx(48)) | 0;
}
function parseIso$lambda(it) {
  _init_properties_Instant_kt__2myitt();
  return equals(it, new (Char())(_Char___init__impl__6a9atx(45)));
}
function parseIso$lambda_0(it) {
  _init_properties_Instant_kt__2myitt();
  return equals(it, new (Char())(_Char___init__impl__6a9atx(45)));
}
function parseIso$lambda_1(it) {
  _init_properties_Instant_kt__2myitt();
  return equals(it, new (Char())(_Char___init__impl__6a9atx(84))) || equals(it, new (Char())(_Char___init__impl__6a9atx(116)));
}
function parseIso$lambda_2(it) {
  _init_properties_Instant_kt__2myitt();
  return equals(it, new (Char())(_Char___init__impl__6a9atx(58)));
}
function parseIso$lambda_3(it) {
  _init_properties_Instant_kt__2myitt();
  return equals(it, new (Char())(_Char___init__impl__6a9atx(58)));
}
function parseIso$lambda_4(it) {
  _init_properties_Instant_kt__2myitt();
  var containsArg = it.r2_1;
  return _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
}
var properties_initialized_Instant_kt_xip69;
function _init_properties_Instant_kt__2myitt() {
  if (!properties_initialized_Instant_kt_xip69) {
    properties_initialized_Instant_kt_xip69 = true;
    // Inline function 'kotlin.intArrayOf' call
    POWERS_OF_TEN = new Int32Array([1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]);
    // Inline function 'kotlin.intArrayOf' call
    asciiDigitPositionsInIsoStringAfterYear = new Int32Array([1, 2, 4, 5, 7, 8, 10, 11, 13, 14]);
    // Inline function 'kotlin.intArrayOf' call
    colonsInIsoOffsetString = new Int32Array([3, 6]);
    // Inline function 'kotlin.intArrayOf' call
    asciiDigitsInIsoOffsetString = new Int32Array([1, 2, 4, 5, 7, 8]);
  }
}
//region block: init
Companion_instance_0 = new (Companion_0())();
//endregion
//region block: exports
export {
  Companion_getInstance_0 as Companion_getInstance1jfygh5e58evr,
  Instant as Instant2s2zyzgfc4947,
};
//endregion

//# sourceMappingURL=Instant.mjs.map
