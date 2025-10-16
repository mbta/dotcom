import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/UInt.mjs';
import { asReversed308kw52j6ls1u as asReversed } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ReversedViews.mjs';
import { uintCompare18k97xs29243i as uintCompare } from '../../../../../../kotlin-kotlin-stdlib/kotlin/UnsignedJs.mjs';
import { rotateRight23z2nq5bffwiv as rotateRight } from '../../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { round2mrvepag8eey0 as round } from '../../../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Position2rurtvk7dypvc as Position } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Position.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { toByte4i43936u611k as toByte } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_Polyline_State_AwaitingLatitude$stable;
var com_mbta_tid_mbta_app_map_Polyline_State_AwaitingLongitude$stable;
var com_mbta_tid_mbta_app_map_Polyline$stable;
var AwaitingLatitudeClass;
function AwaitingLatitude() {
  if (AwaitingLatitudeClass === VOID) {
    class $ {
      toString() {
        return 'AwaitingLatitude';
      }
      hashCode() {
        return 1549722821;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof AwaitingLatitude()))
          return false;
        other instanceof AwaitingLatitude() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'AwaitingLatitude');
    AwaitingLatitudeClass = $;
  }
  return AwaitingLatitudeClass;
}
var AwaitingLatitude_instance;
function AwaitingLatitude_getInstance() {
  return AwaitingLatitude_instance;
}
var AwaitingLongitudeClass;
function AwaitingLongitude() {
  if (AwaitingLongitudeClass === VOID) {
    class $ {
      constructor(latitude) {
        this.n8p_1 = latitude;
      }
      toString() {
        return 'AwaitingLongitude(latitude=' + this.n8p_1 + ')';
      }
      hashCode() {
        return getNumberHashCode(this.n8p_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof AwaitingLongitude()))
          return false;
        var tmp0_other_with_cast = other instanceof AwaitingLongitude() ? other : THROW_CCE();
        if (!equals(this.n8p_1, tmp0_other_with_cast.n8p_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'AwaitingLongitude');
    AwaitingLongitudeClass = $;
  }
  return AwaitingLongitudeClass;
}
function decodeValue($this, chunks) {
  var thisValue = _UInt___init__impl__l7qpdl(0);
  var _iterator__ex2g4s = asReversed(chunks).x();
  while (_iterator__ex2g4s.y()) {
    var chunk = _iterator__ex2g4s.z();
    // Inline function 'kotlin.UInt.shl' call
    var this_0 = thisValue;
    var tmp0 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) << 5);
    // Inline function 'kotlin.toUInt' call
    // Inline function 'kotlin.UInt.or' call
    var other = _UInt___init__impl__l7qpdl(chunk);
    thisValue = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0) | _UInt___get_data__impl__f0vqqw(other));
  }
  var tmp0_0 = thisValue;
  // Inline function 'kotlin.UInt.and' call
  var other_0 = _UInt___init__impl__l7qpdl(1);
  var tmp0_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_0) & _UInt___get_data__impl__f0vqqw(other_0));
  // Inline function 'kotlin.UInt.compareTo' call
  var other_1 = _UInt___init__impl__l7qpdl(0);
  var isNegative = uintCompare(_UInt___get_data__impl__f0vqqw(tmp0_1), _UInt___get_data__impl__f0vqqw(other_1)) > 0;
  if (isNegative) {
    // Inline function 'kotlin.UInt.inv' call
    var this_1 = thisValue;
    thisValue = _UInt___init__impl__l7qpdl(~_UInt___get_data__impl__f0vqqw(this_1));
  }
  // Inline function 'kotlin.UInt.shr' call
  var this_2 = thisValue;
  var tmp0_2 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_2) >>> 1 | 0);
  // Inline function 'kotlin.UInt.shl' call
  var this_3 = _UInt___init__impl__l7qpdl(1);
  var tmp0_3 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_3) << 31);
  // Inline function 'kotlin.UInt.minus' call
  var other_2 = _UInt___init__impl__l7qpdl(1);
  // Inline function 'kotlin.UInt.and' call
  var other_3 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_3) - _UInt___get_data__impl__f0vqqw(other_2) | 0);
  thisValue = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_2) & _UInt___get_data__impl__f0vqqw(other_3));
  if (isNegative) {
    var tmp0_4 = thisValue;
    // Inline function 'kotlin.rotateRight' call
    // Inline function 'kotlin.UInt.toInt' call
    var this_4 = _UInt___init__impl__l7qpdl(1);
    var tmp$ret$10 = _UInt___get_data__impl__f0vqqw(this_4);
    // Inline function 'kotlin.toUInt' call
    var this_5 = rotateRight(tmp$ret$10, 1);
    // Inline function 'kotlin.UInt.or' call
    var other_4 = _UInt___init__impl__l7qpdl(this_5);
    thisValue = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_4) | _UInt___get_data__impl__f0vqqw(other_4));
  }
  // Inline function 'kotlin.UInt.toInt' call
  var this_6 = thisValue;
  var tmp$ret$14 = _UInt___get_data__impl__f0vqqw(this_6);
  return round(tmp$ret$14) / 100000.0;
}
var PolylineClass;
function Polyline() {
  if (PolylineClass === VOID) {
    class $ {
      o8p(data) {
        // Inline function 'kotlin.collections.mutableListOf' call
        var result = ArrayList().g1();
        var lastPoint = Position().v1x(0.0, 0.0);
        // Inline function 'kotlin.collections.mutableListOf' call
        var thisValueChunks = ArrayList().g1();
        var state = AwaitingLatitude_instance;
        var inductionVariable = 0;
        var last = data.length;
        while (inductionVariable < last) {
          var thisChar = charCodeAt(data, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.code' call
          var tmp$ret$2 = Char__toInt_impl_vasixd(thisChar);
          var thisByte = toByte(tmp$ret$2 - 63 | 0);
          // Inline function 'kotlin.experimental.and' call
          var tmp$ret$3 = toByte(thisByte & 31);
          thisValueChunks.i(tmp$ret$3);
          // Inline function 'kotlin.experimental.and' call
          if (toByte(thisByte & 32) === 0) {
            var thisValue = decodeValue(this, thisValueChunks);
            thisValueChunks.p3();
            var tmp0_subject = state;
            if (equals(tmp0_subject, AwaitingLatitude_instance)) {
              state = new (AwaitingLongitude())(thisValue);
            } else {
              if (tmp0_subject instanceof AwaitingLongitude()) {
                var tmp1_latitude = lastPoint.c1z() + state.n8p_1;
                var tmp2_longitude = lastPoint.b1z() + thisValue;
                var thisPoint = Position().v1x(tmp2_longitude, tmp1_latitude);
                result.i(thisPoint);
                lastPoint = thisPoint;
                state = AwaitingLatitude_instance;
              } else {
                noWhenBranchMatchedException();
              }
            }
          }
        }
        return result;
      }
    }
    initMetadataForObject($, 'Polyline');
    PolylineClass = $;
  }
  return PolylineClass;
}
var Polyline_instance;
function Polyline_getInstance() {
  return Polyline_instance;
}
//region block: init
com_mbta_tid_mbta_app_map_Polyline_State_AwaitingLatitude$stable = 0;
com_mbta_tid_mbta_app_map_Polyline_State_AwaitingLongitude$stable = 0;
com_mbta_tid_mbta_app_map_Polyline$stable = 0;
AwaitingLatitude_instance = new (AwaitingLatitude())();
Polyline_instance = new (Polyline())();
//endregion
//region block: exports
export {
  Polyline_instance as Polyline_instance2zt93g8h2nyz6,
};
//endregion

//# sourceMappingURL=Polyline.mjs.map
