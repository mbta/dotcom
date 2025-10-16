import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { Long2qws0ah9gnpki as Long } from '../Primitives.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getProgressionLastElement(start, end, step) {
  var tmp;
  if (step > 0) {
    tmp = start >= end ? end : end - differenceModulo(end, start, step) | 0;
  } else if (step < 0) {
    tmp = start <= end ? end : end + differenceModulo(start, end, -step | 0) | 0;
  } else {
    throw IllegalArgumentException().q('Step is zero.');
  }
  return tmp;
}
function getProgressionLastElement_0(start, end, step) {
  var tmp;
  if (step.d2(new (Long())(0, 0)) > 0) {
    tmp = start.d2(end) >= 0 ? end : end.g4(differenceModulo_0(end, start, step));
  } else if (step.d2(new (Long())(0, 0)) < 0) {
    tmp = start.d2(end) <= 0 ? end : end.f4(differenceModulo_0(start, end, step.m4()));
  } else {
    throw IllegalArgumentException().q('Step is zero.');
  }
  return tmp;
}
function differenceModulo(a, b, c) {
  return mod(mod(a, c) - mod(b, c) | 0, c);
}
function differenceModulo_0(a, b, c) {
  return mod_0(mod_0(a, c).g4(mod_0(b, c)), c);
}
function mod(a, b) {
  var mod = a % b | 0;
  return mod >= 0 ? mod : mod + b | 0;
}
function mod_0(a, b) {
  var mod = a.j4(b);
  return mod.d2(new (Long())(0, 0)) >= 0 ? mod : mod.f4(b);
}
//region block: exports
export {
  getProgressionLastElement as getProgressionLastElement2w30kdy2w5nkt,
  getProgressionLastElement_0 as getProgressionLastElement4s9ggap3esy2,
};
//endregion

//# sourceMappingURL=progressionUtil.mjs.map
