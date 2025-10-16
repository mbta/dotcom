//region block: pre-declaration
//endregion
function json(pairs) {
  var res = {};
  var inductionVariable = 0;
  var last = pairs.length;
  while (inductionVariable < last) {
    var _destruct__k2r9zo = pairs[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var name = _destruct__k2r9zo.ch();
    var value = _destruct__k2r9zo.dh();
    res[name] = value;
  }
  return res;
}
//region block: exports
export {
  json as json3n35pf5np6si4,
};
//endregion

//# sourceMappingURL=json.mjs.map
