import {
  NullPointerException3mu0rhxjjitqq as NullPointerException,
  NoWhenBranchMatchedException3krrgsc7u48pz as NoWhenBranchMatchedException,
  ClassCastException1atiay3nqgbd as ClassCastException,
  UninitializedPropertyAccessException8qin22n38p0w as UninitializedPropertyAccessException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from './exceptions.mjs';
import { KotlinNothingValueException2zr0cdstak0a9 as KotlinNothingValueException } from './ExceptionsH.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ensureNotNull(v) {
  var tmp;
  if (v == null) {
    THROW_NPE();
  } else {
    tmp = v;
  }
  return tmp;
}
function THROW_NPE() {
  throw NullPointerException().s5();
}
function noWhenBranchMatchedException() {
  throw NoWhenBranchMatchedException().w5();
}
function THROW_CCE() {
  throw ClassCastException().a6();
}
function throwUninitializedPropertyAccessException(name) {
  throw UninitializedPropertyAccessException().e6('lateinit property ' + name + ' has not been initialized');
}
function throwUnsupportedOperationException(message) {
  throw UnsupportedOperationException().f6(message);
}
function throwKotlinNothingValueException() {
  throw KotlinNothingValueException().l2();
}
function THROW_IAE(msg) {
  throw IllegalArgumentException().q(msg);
}
//region block: exports
export {
  THROW_CCE as THROW_CCE2g6jy02ryeudk,
  THROW_IAE as THROW_IAE23kobfj9wdoxr,
  ensureNotNull as ensureNotNull1e947j3ixpazm,
  noWhenBranchMatchedException as noWhenBranchMatchedException2a6r7ubxgky5j,
  throwKotlinNothingValueException as throwKotlinNothingValueException2lxmvl03dor6f,
  throwUninitializedPropertyAccessException as throwUninitializedPropertyAccessExceptionyynx7gkm73wd,
  throwUnsupportedOperationException as throwUnsupportedOperationException1esr5y6wgmpks,
};
//endregion

//# sourceMappingURL=hacks.mjs.map
