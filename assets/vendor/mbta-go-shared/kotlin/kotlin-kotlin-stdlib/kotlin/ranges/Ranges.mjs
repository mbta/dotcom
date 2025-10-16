import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function checkStepIsPositive(isPositive, step) {
  if (!isPositive)
    throw IllegalArgumentException().q('Step must be positive, was: ' + toString(step) + '.');
}
//region block: exports
export {
  checkStepIsPositive as checkStepIsPositive70940ky00dt4,
};
//endregion

//# sourceMappingURL=Ranges.mjs.map
