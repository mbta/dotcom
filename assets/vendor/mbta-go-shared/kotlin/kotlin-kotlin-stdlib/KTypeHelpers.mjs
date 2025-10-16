import { asList2ho2pewtsfvv as asList } from './kotlin/collections/_ArraysJs.mjs';
import { KTypeImpl31l2cx2hil3il as KTypeImpl } from './kotlin/reflect/js/internal/KTypeImpl.mjs';
import {
  KVariance_IN_getInstance1uylrm5a2m9el as KVariance_IN_getInstance,
  KVariance_OUT_getInstance10ihzp27e1gd4 as KVariance_OUT_getInstance,
  KVariance_INVARIANT_getInstancesuq4f4bi5uun as KVariance_INVARIANT_getInstance,
} from './kotlin/reflect/KVariance.mjs';
import { KTypeParameterImpl2de0szhlrzcmf as KTypeParameterImpl } from './kotlin/reflect/js/internal/KTypeParameterImpl.mjs';
import { Companion_getInstance3g08w0on7qs6d as Companion_getInstance } from './kotlin/reflect/KTypeProjection.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createKType(classifier, arguments_0, isMarkedNullable) {
  return new (KTypeImpl())(classifier, asList(arguments_0), isMarkedNullable);
}
function createKTypeParameter(name, upperBounds, variance, isReified) {
  var kVariance;
  switch (variance) {
    case 'in':
      kVariance = KVariance_IN_getInstance();
      break;
    case 'out':
      kVariance = KVariance_OUT_getInstance();
      break;
    default:
      kVariance = KVariance_INVARIANT_getInstance();
      break;
  }
  return new (KTypeParameterImpl())(name, asList(upperBounds), kVariance, isReified);
}
function getStarKTypeProjection() {
  return Companion_getInstance().qh();
}
function createInvariantKTypeProjection(type) {
  return Companion_getInstance().rh(type);
}
//region block: exports
export {
  createInvariantKTypeProjection as createInvariantKTypeProjection3sfd0u0y62ozd,
  createKTypeParameter as createKTypeParameter1mb995m5oui0r,
  createKType as createKType1lgox3mzhchp5,
  getStarKTypeProjection as getStarKTypeProjection2j4m947xjbiiv,
};
//endregion

//# sourceMappingURL=KTypeHelpers.mjs.map
