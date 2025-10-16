//region block: imports
var clz32 = Math.clz32;
//endregion
//region block: pre-declaration
//endregion
function isNaN_0(_this__u8e3s4) {
  return !(_this__u8e3s4 === _this__u8e3s4);
}
function countTrailingZeroBits(_this__u8e3s4) {
  var low = _this__u8e3s4.b2_1;
  return low === 0 ? 32 + countTrailingZeroBits_0(_this__u8e3s4.c2_1) | 0 : countTrailingZeroBits_0(low);
}
function countOneBits(_this__u8e3s4) {
  var v = _this__u8e3s4;
  v = (v & 1431655765) + ((v >>> 1 | 0) & 1431655765) | 0;
  v = (v & 858993459) + ((v >>> 2 | 0) & 858993459) | 0;
  v = (v & 252645135) + ((v >>> 4 | 0) & 252645135) | 0;
  v = (v & 16711935) + ((v >>> 8 | 0) & 16711935) | 0;
  v = (v & 65535) + (v >>> 16 | 0) | 0;
  return v;
}
function countTrailingZeroBits_0(_this__u8e3s4) {
  // Inline function 'kotlin.countLeadingZeroBits' call
  var this_0 = ~(_this__u8e3s4 | (-_this__u8e3s4 | 0));
  return 32 - clz32(this_0) | 0;
}
function rotateLeft(_this__u8e3s4, bitCount) {
  return _this__u8e3s4 << bitCount | (_this__u8e3s4 >>> (32 - bitCount | 0) | 0);
}
function rotateRight(_this__u8e3s4, bitCount) {
  return _this__u8e3s4 << (32 - bitCount | 0) | (_this__u8e3s4 >>> bitCount | 0);
}
function isNaN_1(_this__u8e3s4) {
  return !(_this__u8e3s4 === _this__u8e3s4);
}
function isInfinite(_this__u8e3s4) {
  return _this__u8e3s4 === Infinity || _this__u8e3s4 === -Infinity;
}
function isFinite(_this__u8e3s4) {
  return !isInfinite(_this__u8e3s4) && !isNaN_0(_this__u8e3s4);
}
function takeHighestOneBit(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 === 0) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.countLeadingZeroBits' call
    tmp = 1 << (31 - clz32(_this__u8e3s4) | 0);
  }
  return tmp;
}
function isFinite_0(_this__u8e3s4) {
  return !isInfinite_0(_this__u8e3s4) && !isNaN_1(_this__u8e3s4);
}
function isInfinite_0(_this__u8e3s4) {
  return _this__u8e3s4 === Infinity || _this__u8e3s4 === -Infinity;
}
//region block: exports
export {
  countOneBits as countOneBitstd673pwfna0t,
  countTrailingZeroBits as countTrailingZeroBits1k55x07cygoff,
  isFinite as isFinite2t9l5a275mxm6,
  isFinite_0 as isFinite1tx0gn65nl9tj,
  isNaN_0 as isNaNymqb93xtq8w8,
  rotateLeft as rotateLeft386qqkr4zb8q2,
  rotateRight as rotateRight23z2nq5bffwiv,
  takeHighestOneBit as takeHighestOneBit9p7rdtda63bc,
};
//endregion

//# sourceMappingURL=NumbersJs.mjs.map
