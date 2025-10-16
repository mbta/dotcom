import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import {
  mutableListOf6oorvk2mtdmp as mutableListOf,
  emptyList1g2z5xcrvp2zy as emptyList,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LineStringssyj4jv3rpxh as LineString } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/LineString.mjs';
import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Units_Kilometers_getInstanceopimp13n1mfv as Units_Kilometers_getInstance } from './Units.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { DoubleCompanionObject_instance3q51gr7gsd0au as DoubleCompanionObject_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { Position2rurtvk7dypvc as Position } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Position.mjs';
import {
  distance3gqyxdnyutkd7 as distance,
  bearing2mfegpwvxj6e2 as bearing,
  destination2s4e4l5b4b3ye as destination,
} from './Measurement.mjs';
import { getOrNull1go7ef9ldk0df as getOrNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { NotImplementedErrorfzlkpv14xxr8 as NotImplementedError } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Standard.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function lineSlice(start, stop, line) {
  var startVertex = nearestPointOnLine(line, start);
  var stopVertex = nearestPointOnLine(line, stop);
  var tmp0_container = startVertex.o1z_1 <= stopVertex.o1z_1 ? to(startVertex, stopVertex) : to(stopVertex, startVertex);
  var startPos = tmp0_container.ch();
  var endPos = tmp0_container.dh();
  var positions = mutableListOf([startPos.l1z_1]);
  var inductionVariable = startPos.o1z_1 + 1 | 0;
  var last = endPos.o1z_1 + 1 | 0;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      positions.i(line.g1y_1.e1(i));
    }
     while (inductionVariable < last);
  positions.i(endPos.l1z_1);
  return LineString().i1y(positions);
}
var NearestPointOnLineResultClass;
function NearestPointOnLineResult() {
  if (NearestPointOnLineResultClass === VOID) {
    class $ {
      constructor(point, distance, location, index) {
        this.l1z_1 = point;
        this.m1z_1 = distance;
        this.n1z_1 = location;
        this.o1z_1 = index;
      }
      p1z(point, distance, location, index) {
        return new (NearestPointOnLineResult())(point, distance, location, index);
      }
      toString() {
        return 'NearestPointOnLineResult(point=' + this.l1z_1.toString() + ', distance=' + this.m1z_1 + ', location=' + this.n1z_1 + ', index=' + this.o1z_1 + ')';
      }
      hashCode() {
        var result = this.l1z_1.hashCode();
        result = imul(result, 31) + getNumberHashCode(this.m1z_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.n1z_1) | 0;
        result = imul(result, 31) + this.o1z_1 | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NearestPointOnLineResult()))
          return false;
        var tmp0_other_with_cast = other instanceof NearestPointOnLineResult() ? other : THROW_CCE();
        if (!this.l1z_1.equals(tmp0_other_with_cast.l1z_1))
          return false;
        if (!equals(this.m1z_1, tmp0_other_with_cast.m1z_1))
          return false;
        if (!equals(this.n1z_1, tmp0_other_with_cast.n1z_1))
          return false;
        if (!(this.o1z_1 === tmp0_other_with_cast.o1z_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'NearestPointOnLineResult');
    NearestPointOnLineResultClass = $;
  }
  return NearestPointOnLineResultClass;
}
function nearestPointOnLine(line, point, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  return nearestPointOnLine_0(listOf(line.g1y_1), point, units);
}
function nearestPointOnLine_0(lines, point, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  var tmp = Position().v1x(Infinity, Infinity);
  var closest = new (NearestPointOnLineResult())(tmp, Infinity, Infinity, -1);
  var length = 0.0;
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = lines.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var inductionVariable = 0;
    var last = element.c1() - 1 | 0;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var start = element.e1(i);
        var startDistance = distance(point, element.e1(i), units);
        var stop = element.e1(i + 1 | 0);
        var stopDistance = distance(point, element.e1(i + 1 | 0), units);
        var sectionLength = distance(start, stop, units);
        // Inline function 'kotlin.math.max' call
        var heightDistance = Math.max(startDistance, stopDistance);
        var direction = bearing(start, stop);
        var perpPoint1 = destination(point, heightDistance, direction + 90, units);
        var perpPoint2 = destination(point, heightDistance, direction - 90, units);
        var intersect = getOrNull(lineIntersect(LineString().j1y([perpPoint1, perpPoint2]), LineString().j1y([start, stop])), 0);
        if (startDistance < closest.m1z_1) {
          closest = closest.p1z(start, startDistance, length, i);
        }
        if (stopDistance < closest.m1z_1) {
          var tmp1_$this = closest;
          var tmp2_location = length + sectionLength;
          var tmp3_index = i + 1 | 0;
          closest = tmp1_$this.p1z(stop, stopDistance, tmp2_location, tmp3_index);
        }
        if (!(intersect == null) && distance(point, intersect, units) < closest.m1z_1) {
          var intersectDistance = distance(point, intersect, units);
          closest = closest.p1z(intersect, intersectDistance, length + distance(start, intersect, units), i);
        }
        length = length + sectionLength;
      }
       while (inductionVariable < last);
  }
  return closest;
}
function lineIntersect(line1, line2) {
  if (line1.g1y_1.c1() === 2 && line2.g1y_1.c1() === 2) {
    var intersect = intersects(line1, line2);
    return !(intersect == null) ? listOf(intersect) : emptyList();
  } else {
    throw NotImplementedError().me('Complex GeoJSON intersections are currently unsupported');
  }
}
function intersects(line1, line2) {
  // Inline function 'kotlin.require' call
  if (!(line1.g1y_1.c1() === 2)) {
    var message = 'line1 must contain exactly 2 coordinates';
    throw IllegalArgumentException().q(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(line2.g1y_1.c1() === 2)) {
    var message_0 = 'line2 must contain exactly 2 coordinates';
    throw IllegalArgumentException().q(toString(message_0));
  }
  var x1 = line1.g1y_1.e1(0).b1z();
  var y1 = line1.g1y_1.e1(0).c1z();
  var x2 = line1.g1y_1.e1(1).b1z();
  var y2 = line1.g1y_1.e1(1).c1z();
  var x3 = line2.g1y_1.e1(0).b1z();
  var y3 = line2.g1y_1.e1(0).c1z();
  var x4 = line2.g1y_1.e1(1).b1z();
  var y4 = line2.g1y_1.e1(1).c1z();
  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  if (denom === 0.0 || (numeA === 0.0 && numeB === 0.0)) {
    return null;
  }
  var uA = numeA / denom;
  var uB = numeB / denom;
  if ((0.0 <= uA ? uA <= 1.0 : false) && (0.0 <= uB ? uB <= 1.0 : false)) {
    var x = x1 + uA * (x2 - x1);
    var y = y1 + uA * (y2 - y1);
    return Position().v1x(x, y);
  }
  return null;
}
//region block: exports
export {
  lineSlice as lineSlice2l7yxvqv4c4cj,
  nearestPointOnLine as nearestPointOnLine3rajp5no0390g,
};
//endregion

//# sourceMappingURL=Miscellaneous.mjs.map
