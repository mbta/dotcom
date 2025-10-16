import { ZoneId as ZoneId } from '@js-joda/core';
import { to2cs3ny02qtbcb as to } from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { RegionTimeZoneqfwrnej6ijxi as RegionTimeZone } from './RegionTimeZone.mjs';
import { IllegalTimeZoneException2q01rvpc2etsw as IllegalTimeZoneException } from '../Exceptions.mjs';
import { TimeZone3oibfp0mqo4lg as TimeZone } from '../TimeZone.mjs';
import {
  numberToInt1ygmcfwhs2fkq as numberToInt,
  numberToLong1a4cndvg6c52s as numberToLong,
  toLongw1zpgk99d84b as toLong,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { UtcOffset2q1jzx5thduw7 as UtcOffset } from '../UtcOffset.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  split3d3yeauc4rm2n as split,
  startsWith1bgirhbedtv2y as startsWith,
  get_lastIndexld83bqhfgcdd as get_lastIndex,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  getOrNull1go7ef9ldk0df as getOrNull,
  take3onnpy6q7ctcz as take,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { readTzdb1lgmqixljcgmm as readTzdb } from './PlatformSpecifics.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { TimeZoneRulesCommon3vpcb22l6ddoq as TimeZoneRulesCommon } from './TimeZoneRules.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_tzdb() {
  _init_properties_Platform_kt__37ezn1();
  return tzdb;
}
var tzdb;
function currentSystemDefaultZone() {
  _init_properties_Platform_kt__37ezn1();
  var id = ZoneId.systemDefault().id();
  return id === 'SYSTEM' ? to(id, SystemTimeZone_getInstance()) : to(id, null);
}
function timeZoneById(zoneId) {
  _init_properties_Platform_kt__37ezn1();
  var tmp;
  if (zoneId === 'SYSTEM') {
    var _destruct__k2r9zo = currentSystemDefaultZone();
    var name = _destruct__k2r9zo.ch();
    var zone = _destruct__k2r9zo.dh();
    if (zone == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      return zone;
    }
    tmp = name;
  } else {
    tmp = zoneId;
  }
  var id = tmp;
  var tmp1_safe_receiver = rulesForId(id);
  if (tmp1_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return RegionTimeZone().l8h(tmp1_safe_receiver, id);
  }
  throw IllegalTimeZoneException().v81('js-joda timezone database is not available');
}
var SystemTimeZoneClass;
function SystemTimeZone() {
  if (SystemTimeZoneClass === VOID) {
    class $ extends TimeZone() {
      static m8h() {
        SystemTimeZone_instance = null;
        var $this = this.n8h();
        SystemTimeZone_instance = $this;
        return $this;
      }
      d8h() {
        return 'SYSTEM';
      }
      o8h(instant) {
        return UtcOffset(VOID, -numberToInt((new Date(instant.ll().y4())).getTimezoneOffset()) | 0);
      }
      equals(other) {
        return other === this;
      }
      hashCode() {
        return getStringHashCode(this.d8h());
      }
    }
    initMetadataForObject($, 'SystemTimeZone');
    SystemTimeZoneClass = $;
  }
  return SystemTimeZoneClass;
}
var SystemTimeZone_instance;
function SystemTimeZone_getInstance() {
  if (SystemTimeZone_instance === VOID)
    SystemTimeZone().m8h();
  return SystemTimeZone_instance;
}
function rulesForId(zoneId) {
  _init_properties_Platform_kt__37ezn1();
  // Inline function 'kotlin.getOrThrow' call
  var this_0 = get_tzdb();
  throwOnFailure(this_0);
  var tmp = _Result___get_value__impl__bjfvqg(this_0);
  var tmp0_safe_receiver = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q8h(zoneId);
}
function tzdb$_anonymous_$charCodeToInt_8mx2pm(char) {
  var tmp;
  if (_Char___init__impl__6a9atx(48) <= char ? char <= _Char___init__impl__6a9atx(57) : false) {
    tmp = Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(48));
  } else if (_Char___init__impl__6a9atx(97) <= char ? char <= _Char___init__impl__6a9atx(122) : false) {
    tmp = Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(97)) + 10 | 0;
  } else if (_Char___init__impl__6a9atx(65) <= char ? char <= _Char___init__impl__6a9atx(88) : false) {
    tmp = Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65)) + 36 | 0;
  } else {
    throw IllegalArgumentException().q('Invalid character: ' + toString(char));
  }
  return tmp;
}
function tzdb$_anonymous_$base60MinutesInSeconds_9n6ifx(string) {
  var parts = split(string, charArrayOf([_Char___init__impl__6a9atx(46)]));
  var sign;
  var minuteNumberStart;
  if (startsWith(string, _Char___init__impl__6a9atx(45))) {
    minuteNumberStart = 1;
    sign = -1;
  } else {
    minuteNumberStart = 0;
    sign = 1;
  }
  var whole = parts.e1(0);
  // Inline function 'kotlin.collections.map' call
  var this_0 = numberRangeToNumber(minuteNumberStart, get_lastIndex(whole));
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var inductionVariable = this_0.x1_1;
  var last = this_0.y1_1;
  if (inductionVariable <= last)
    do {
      var item = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var it = item;
      var tmp$ret$0 = tzdb$_anonymous_$charCodeToInt_8mx2pm(charCodeAt(whole, it));
      destination.i(tmp$ret$0);
    }
     while (!(item === last));
  // Inline function 'kotlin.collections.fold' call
  var accumulator = new (Long())(0, 0);
  var _iterator__ex2g4s = destination.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var acc = accumulator;
    // Inline function 'kotlin.Long.plus' call
    accumulator = numberToLong(60).h4(acc).f4(toLong(element));
  }
  var wholeMinutes = accumulator;
  var tmp0_safe_receiver = getOrNull(parts, 1);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp_0;
    switch (tmp0_safe_receiver.length) {
      case 1:
        tmp_0 = tzdb$_anonymous_$charCodeToInt_8mx2pm(charCodeAt(tmp0_safe_receiver, 0));
        break;
      case 0:
        tmp_0 = 0;
        break;
      default:
        var tmp_1 = tzdb$_anonymous_$charCodeToInt_8mx2pm(charCodeAt(tmp0_safe_receiver, 0));
        // Inline function 'kotlin.let' call

        tmp_0 = tmp_1 + (tzdb$_anonymous_$charCodeToInt_8mx2pm(charCodeAt(tmp0_safe_receiver, 1)) >= 30 ? 1 : 0) | 0;
        break;
    }
    tmp = tmp_0;
  }
  var tmp1_elvis_lhs = tmp;
  var seconds = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  // Inline function 'kotlin.Long.times' call
  // Inline function 'kotlin.Long.plus' call
  var tmp0 = wholeMinutes.h4(toLong(60)).f4(toLong(seconds));
  // Inline function 'kotlin.Long.times' call
  var other = sign;
  return tmp0.h4(toLong(other));
}
var tzdb$1Class;
function tzdb$1() {
  if (tzdb$1Class === VOID) {
    class $ {
      constructor($zones) {
        this.r8h_1 = $zones;
      }
      q8h(id) {
        var tmp0_elvis_lhs = this.r8h_1.j3(id);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw IllegalTimeZoneException().v81('Unknown time zone: ' + id);
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
    }
    initMetadataForClass($);
    tzdb$1Class = $;
  }
  return tzdb$1Class;
}
var properties_initialized_Platform_kt_qdcgvf;
function _init_properties_Platform_kt__37ezn1() {
  if (!properties_initialized_Platform_kt_qdcgvf) {
    properties_initialized_Platform_kt_qdcgvf = true;
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlin.collections.mutableMapOf' call
        var zones = LinkedHashMap().sc();
        var tmp0_elvis_lhs = readTzdb();
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$1 = null;
          break $l$block;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var _destruct__k2r9zo = tmp_0;
        var zonesPacked = _destruct__k2r9zo.ch();
        var linksPacked = _destruct__k2r9zo.dh();
        var _iterator__ex2g4s = zonesPacked.x();
        while (_iterator__ex2g4s.y()) {
          var zone = _iterator__ex2g4s.z();
          var components = split(zone, charArrayOf([_Char___init__impl__6a9atx(124)]));
          // Inline function 'kotlin.collections.map' call
          var this_0 = split(components.e1(2), charArrayOf([_Char___init__impl__6a9atx(32)]));
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
          var _iterator__ex2g4s_0 = this_0.x();
          while (_iterator__ex2g4s_0.y()) {
            var item = _iterator__ex2g4s_0.z();
            var tmp$ret$2 = UtcOffset(null, null, -tzdb$_anonymous_$base60MinutesInSeconds_9n6ifx(item).f2() | 0);
            destination.i(tmp$ret$2);
          }
          var offsets = destination;
          // Inline function 'kotlin.text.map' call
          var this_1 = components.e1(3);
          // Inline function 'kotlin.text.mapTo' call
          var destination_0 = ArrayList().w(charSequenceLength(this_1));
          var inductionVariable = 0;
          while (inductionVariable < charSequenceLength(this_1)) {
            var item_0 = charSequenceGet(this_1, inductionVariable);
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$5 = tzdb$_anonymous_$charCodeToInt_8mx2pm(item_0);
            destination_0.i(tmp$ret$5);
          }
          var indices = destination_0;
          // Inline function 'kotlin.collections.map' call
          var this_2 = split(components.e1(4), charArrayOf([_Char___init__impl__6a9atx(32)]));
          // Inline function 'kotlin.collections.mapTo' call
          var destination_1 = ArrayList().w(collectionSizeOrDefault(this_2, 10));
          var _iterator__ex2g4s_1 = this_2.x();
          while (_iterator__ex2g4s_1.y()) {
            var item_1 = _iterator__ex2g4s_1.z();
            var tmp$ret$8 = tzdb$_anonymous_$base60MinutesInSeconds_9n6ifx(item_1);
            destination_1.i(tmp$ret$8);
          }
          var lengthsOfPeriodsWithOffsets = destination_1;
          var tmp2 = components.e1(0);
          var tmp$ret$11;
          $l$block_0: {
            // Inline function 'kotlin.collections.runningReduce' call
            var iterator = lengthsOfPeriodsWithOffsets.x();
            if (!iterator.y()) {
              tmp$ret$11 = emptyList();
              break $l$block_0;
            }
            var accumulator = iterator.z();
            // Inline function 'kotlin.apply' call
            var this_3 = ArrayList().w(collectionSizeOrDefault(lengthsOfPeriodsWithOffsets, 10));
            this_3.i(accumulator);
            var result = this_3;
            while (iterator.y()) {
              var tmp0 = accumulator;
              var p1 = iterator.z();
              accumulator = tmp0.f4(p1);
              result.i(accumulator);
            }
            tmp$ret$11 = result;
          }
          // Inline function 'kotlin.let' call
          var it = tmp$ret$11;
          var tmp_1 = it.c1() === (indices.c1() - 1 | 0) ? it : take(it, indices.c1() - 1 | 0);
          // Inline function 'kotlin.collections.map' call
          // Inline function 'kotlin.collections.mapTo' call
          var destination_2 = ArrayList().w(collectionSizeOrDefault(indices, 10));
          var _iterator__ex2g4s_2 = indices.x();
          while (_iterator__ex2g4s_2.y()) {
            var item_2 = _iterator__ex2g4s_2.z();
            var tmp$ret$17 = offsets.e1(item_2);
            destination_2.i(tmp$ret$17);
          }
          // Inline function 'kotlin.collections.set' call
          var value = new (TimeZoneRulesCommon())(tmp_1, destination_2, null);
          zones.t3(tmp2, value);
        }
        var _iterator__ex2g4s_3 = linksPacked.x();
        while (_iterator__ex2g4s_3.y()) {
          var link = _iterator__ex2g4s_3.z();
          var components_0 = split(link, charArrayOf([_Char___init__impl__6a9atx(124)]));
          var tmp1_safe_receiver = zones.j3(components_0.e1(0));
          if (tmp1_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.collections.set' call
            var key = components_0.e1(1);
            zones.t3(key, tmp1_safe_receiver);
          }
        }
        tmp$ret$1 = new (tzdb$1())(zones);
      }
      // Inline function 'kotlin.Companion.success' call
      var value_0 = tmp$ret$1;
      tmp = _Result___init__impl__xyqfz8(value_0);
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_2 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_2;
    }
    tzdb = tmp;
  }
}
//region block: exports
export {
  currentSystemDefaultZone as currentSystemDefaultZone332b6s6k58wi,
  timeZoneById as timeZoneByIdov6p8ve6cmmr,
};
//endregion

//# sourceMappingURL=Platform.mjs.map
