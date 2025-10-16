//region block: pre-declaration
//endregion
function resolveParentId(_this__u8e3s4, stopId) {
  var tmp0_elvis_lhs = _this__u8e3s4.j3(stopId);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return stopId;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var stop = tmp;
  var tmp1_elvis_lhs = stop.g8r_1;
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    return stopId;
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var parentStopId = tmp_0;
  return resolveParentId(_this__u8e3s4, parentStopId);
}
//region block: exports
export {
  resolveParentId as resolveParentId3ngqc2n7fgyov,
};
//endregion

//# sourceMappingURL=resolveParentId.mjs.map
