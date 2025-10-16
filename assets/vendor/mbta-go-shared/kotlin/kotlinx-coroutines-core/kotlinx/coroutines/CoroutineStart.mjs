import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { startCoroutineCancellable3v5el961z6rj8 as startCoroutineCancellable } from './intrinsics/Cancellable.mjs';
import { startCoroutine327fwvtqvedik as startCoroutine } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import { startCoroutineUndispatched23kmsh8s0p6h5 as startCoroutineUndispatched } from './intrinsics/Undispatched.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CoroutineStart_DEFAULT_instance;
var CoroutineStart_LAZY_instance;
var CoroutineStart_ATOMIC_instance;
var CoroutineStart_UNDISPATCHED_instance;
var CoroutineStart_entriesInitialized;
function CoroutineStart_initEntries() {
  if (CoroutineStart_entriesInitialized)
    return Unit_instance;
  CoroutineStart_entriesInitialized = true;
  CoroutineStart_DEFAULT_instance = new (CoroutineStart())('DEFAULT', 0);
  CoroutineStart_LAZY_instance = new (CoroutineStart())('LAZY', 1);
  CoroutineStart_ATOMIC_instance = new (CoroutineStart())('ATOMIC', 2);
  CoroutineStart_UNDISPATCHED_instance = new (CoroutineStart())('UNDISPATCHED', 3);
}
var CoroutineStartClass;
function CoroutineStart() {
  if (CoroutineStartClass === VOID) {
    class $ extends Enum() {
      n21(block, receiver, completion) {
        var tmp;
        switch (this.x3_1) {
          case 0:
            startCoroutineCancellable(block, receiver, completion);
            tmp = Unit_instance;
            break;
          case 2:
            startCoroutine(block, receiver, completion);
            tmp = Unit_instance;
            break;
          case 3:
            startCoroutineUndispatched(block, receiver, completion);
            tmp = Unit_instance;
            break;
          case 1:
            tmp = Unit_instance;
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
      }
      y22() {
        return this === CoroutineStart_LAZY_getInstance();
      }
    }
    initMetadataForClass($, 'CoroutineStart');
    CoroutineStartClass = $;
  }
  return CoroutineStartClass;
}
function CoroutineStart_DEFAULT_getInstance() {
  CoroutineStart_initEntries();
  return CoroutineStart_DEFAULT_instance;
}
function CoroutineStart_LAZY_getInstance() {
  CoroutineStart_initEntries();
  return CoroutineStart_LAZY_instance;
}
function CoroutineStart_UNDISPATCHED_getInstance() {
  CoroutineStart_initEntries();
  return CoroutineStart_UNDISPATCHED_instance;
}
//region block: exports
export {
  CoroutineStart_DEFAULT_getInstance as CoroutineStart_DEFAULT_getInstance2bbgmtawlnkke,
  CoroutineStart_UNDISPATCHED_getInstance as CoroutineStart_UNDISPATCHED_getInstance1s89xhsoy2cne,
};
//endregion

//# sourceMappingURL=CoroutineStart.mjs.map
