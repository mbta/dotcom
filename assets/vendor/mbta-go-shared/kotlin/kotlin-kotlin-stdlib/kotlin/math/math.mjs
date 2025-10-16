import {
  numberToLong1a4cndvg6c52s as numberToLong,
  numberToInt1ygmcfwhs2fkq as numberToInt,
} from '../js/numberConversion.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { isNaNymqb93xtq8w8 as isNaN_0 } from '../NumbersJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function abs(n) {
  return n < 0 ? -n | 0 | 0 : n;
}
function roundToLong(_this__u8e3s4) {
  var tmp;
  if (isNaN_0(_this__u8e3s4)) {
    throw IllegalArgumentException().q('Cannot round NaN value.');
  } else if (_this__u8e3s4 > (new (Long())(-1, 2147483647)).y4()) {
    tmp = new (Long())(-1, 2147483647);
  } else if (_this__u8e3s4 < (new (Long())(0, -2147483648)).y4()) {
    tmp = new (Long())(0, -2147483648);
  } else {
    tmp = numberToLong(Math.round(_this__u8e3s4));
  }
  return tmp;
}
function round(x) {
  if (!(x % 0.5 === 0.0)) {
    return Math.round(x);
  }
  // Inline function 'kotlin.math.floor' call
  var floor = Math.floor(x);
  var tmp;
  if (floor % 2 === 0.0) {
    tmp = floor;
  } else {
    // Inline function 'kotlin.math.ceil' call
    tmp = Math.ceil(x);
  }
  return tmp;
}
function roundToInt(_this__u8e3s4) {
  var tmp;
  if (isNaN_0(_this__u8e3s4)) {
    throw IllegalArgumentException().q('Cannot round NaN value.');
  } else if (_this__u8e3s4 > 2147483647) {
    tmp = 2147483647;
  } else if (_this__u8e3s4 < -2147483648) {
    tmp = -2147483648;
  } else {
    tmp = numberToInt(Math.round(_this__u8e3s4));
  }
  return tmp;
}
//region block: exports
export {
  abs as abs1kdzbjes1idip,
  roundToInt as roundToInt1ue8x8yshtznx,
  roundToLong as roundToLong2s902lrwaad4n,
  round as round2mrvepag8eey0,
};
//endregion

//# sourceMappingURL=math.mjs.map
