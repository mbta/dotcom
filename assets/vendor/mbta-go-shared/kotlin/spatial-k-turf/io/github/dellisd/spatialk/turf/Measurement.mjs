import { Units_Kilometers_getInstanceopimp13n1mfv as Units_Kilometers_getInstance } from './Units.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  radians2a90mhybeff5j as radians,
  degrees24d8ls62av5da as degrees,
} from './MathUtils.mjs';
import {
  radiansToLength3t1sw7ankofds as radiansToLength,
  lengthToRadians1gaf3mu0h4dis as lengthToRadians,
} from './Utils.mjs';
import { Position2rurtvk7dypvc as Position } from '../../../../../../spatial-k-geojson/io/github/dellisd/spatialk/geojson/Position.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function distance(from, to, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  var dLat = radians(to.c1z() - from.c1z());
  var dLon = radians(to.b1z() - from.b1z());
  var lat1 = radians(from.c1z());
  var lat2 = radians(to.c1z());
  // Inline function 'kotlin.math.sin' call
  var x = dLat / 2;
  // Inline function 'kotlin.math.pow' call
  var this_0 = Math.sin(x);
  var tmp = Math.pow(this_0, 2);
  // Inline function 'kotlin.math.sin' call
  var x_0 = dLon / 2;
  // Inline function 'kotlin.math.pow' call
  var this_1 = Math.sin(x_0);
  var tmp_0 = Math.pow(this_1, 2);
  // Inline function 'kotlin.math.cos' call
  var tmp_1 = tmp_0 * Math.cos(lat1);
  // Inline function 'kotlin.math.cos' call
  var a = tmp + tmp_1 * Math.cos(lat2);
  // Inline function 'kotlin.math.sqrt' call
  var tmp0 = Math.sqrt(a);
  // Inline function 'kotlin.math.sqrt' call
  var x_1 = 1 - a;
  // Inline function 'kotlin.math.atan2' call
  var x_2 = Math.sqrt(x_1);
  var tmp$ret$8 = Math.atan2(tmp0, x_2);
  return radiansToLength(2 * tmp$ret$8, units);
}
function bearing(start, end, final) {
  final = final === VOID ? false : final;
  if (final)
    return finalBearing(start, end);
  var lon1 = radians(start.b1z());
  var lon2 = radians(end.b1z());
  var lat1 = radians(start.c1z());
  var lat2 = radians(end.c1z());
  // Inline function 'kotlin.math.sin' call
  var x = lon2 - lon1;
  var tmp = Math.sin(x);
  // Inline function 'kotlin.math.cos' call
  var a = tmp * Math.cos(lat2);
  // Inline function 'kotlin.math.cos' call
  var tmp_0 = Math.cos(lat1);
  // Inline function 'kotlin.math.sin' call
  var tmp_1 = tmp_0 * Math.sin(lat2);
  // Inline function 'kotlin.math.sin' call
  var tmp_2 = Math.sin(lat1);
  // Inline function 'kotlin.math.cos' call
  var tmp_3 = tmp_2 * Math.cos(lat2);
  // Inline function 'kotlin.math.cos' call
  var x_0 = lon2 - lon1;
  var b = tmp_1 - tmp_3 * Math.cos(x_0);
  // Inline function 'kotlin.math.atan2' call
  var tmp$ret$7 = Math.atan2(a, b);
  return degrees(tmp$ret$7);
}
function destination(origin, distance, bearing, units) {
  units = units === VOID ? Units_Kilometers_getInstance() : units;
  var longitude1 = radians(origin.b1z());
  var latitude1 = radians(origin.c1z());
  var bearingRad = radians(bearing);
  var radians_0 = lengthToRadians(distance, units);
  // Inline function 'kotlin.math.sin' call
  var tmp = Math.sin(latitude1);
  // Inline function 'kotlin.math.cos' call
  var tmp_0 = tmp * Math.cos(radians_0);
  // Inline function 'kotlin.math.cos' call
  var tmp_1 = Math.cos(latitude1);
  // Inline function 'kotlin.math.sin' call
  var tmp_2 = tmp_1 * Math.sin(radians_0);
  // Inline function 'kotlin.math.cos' call
  // Inline function 'kotlin.math.asin' call
  var x = tmp_0 + tmp_2 * Math.cos(bearingRad);
  var latitude2 = Math.asin(x);
  // Inline function 'kotlin.math.sin' call
  var tmp_3 = Math.sin(bearingRad);
  // Inline function 'kotlin.math.sin' call
  var tmp_4 = tmp_3 * Math.sin(radians_0);
  // Inline function 'kotlin.math.cos' call
  var tmp0 = tmp_4 * Math.cos(latitude1);
  // Inline function 'kotlin.math.cos' call
  var tmp_5 = Math.cos(radians_0);
  // Inline function 'kotlin.math.sin' call
  var tmp_6 = Math.sin(latitude1);
  // Inline function 'kotlin.math.sin' call
  // Inline function 'kotlin.math.atan2' call
  var x_0 = tmp_5 - tmp_6 * Math.sin(latitude2);
  var longitude2 = longitude1 + Math.atan2(tmp0, x_0);
  return Position().v1x(degrees(longitude2), degrees(latitude2));
}
function finalBearing(start, end) {
  return (bearing(end, start) + 180) % 360;
}
//region block: exports
export {
  bearing as bearing2mfegpwvxj6e2,
  destination as destination2s4e4l5b4b3ye,
  distance as distance3gqyxdnyutkd7,
};
//endregion

//# sourceMappingURL=Measurement.mjs.map
