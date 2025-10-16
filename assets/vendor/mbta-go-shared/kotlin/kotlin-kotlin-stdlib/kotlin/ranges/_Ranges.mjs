import { Companion_getInstance1a3oieudzv4l4 as Companion_getInstance } from './PrimitiveRanges.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../js/rangeTo.mjs';
import { checkStepIsPositive70940ky00dt4 as checkStepIsPositive } from './Ranges.mjs';
import { Companion_instance2r6wsk1n1bbyk as Companion_instance } from './Progressions.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function until(_this__u8e3s4, to) {
  if (to <= -2147483648)
    return Companion_getInstance().w1_1;
  return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
}
function step(_this__u8e3s4, step) {
  checkStepIsPositive(step > 0, step);
  return Companion_instance.a2(_this__u8e3s4.x1_1, _this__u8e3s4.y1_1, _this__u8e3s4.z1_1 > 0 ? step : -step | 0);
}
function coerceAtLeast(_this__u8e3s4, minimumValue) {
  return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
}
function downTo(_this__u8e3s4, to) {
  return Companion_instance.a2(_this__u8e3s4, to, -1);
}
function coerceIn(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue.d2(maximumValue) > 0)
    throw IllegalArgumentException().q('Cannot coerce value to an empty range: maximum ' + maximumValue.toString() + ' is less than minimum ' + minimumValue.toString() + '.');
  if (_this__u8e3s4.d2(minimumValue) < 0)
    return minimumValue;
  if (_this__u8e3s4.d2(maximumValue) > 0)
    return maximumValue;
  return _this__u8e3s4;
}
function coerceAtMost(_this__u8e3s4, maximumValue) {
  return _this__u8e3s4 > maximumValue ? maximumValue : _this__u8e3s4;
}
function coerceIn_0(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue > maximumValue)
    throw IllegalArgumentException().q('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
  if (_this__u8e3s4 < minimumValue)
    return minimumValue;
  if (_this__u8e3s4 > maximumValue)
    return maximumValue;
  return _this__u8e3s4;
}
function contains(_this__u8e3s4, value) {
  // Inline function 'kotlin.let' call
  var it = toIntExactOrNull(value);
  return !(it == null) ? _this__u8e3s4.e2(it) : false;
}
function toIntExactOrNull(_this__u8e3s4) {
  return ((new (Long())(-2147483648, -1)).d2(_this__u8e3s4) <= 0 ? _this__u8e3s4.d2(new (Long())(2147483647, 0)) <= 0 : false) ? _this__u8e3s4.f2() : null;
}
//region block: exports
export {
  coerceAtLeast as coerceAtLeast2bkz8m9ik7hep,
  coerceAtMost as coerceAtMost322komnqp70ag,
  coerceIn_0 as coerceIn10f36k81le1mm,
  coerceIn as coerceIn302bduskdb54x,
  contains as contains2c50nlxg7en7o,
  downTo as downTo39qhfeycepm1j,
  step as step18s9qzr5xwxat,
  until as until1jbpn0z3f8lbg,
};
//endregion

//# sourceMappingURL=_Ranges.mjs.map
