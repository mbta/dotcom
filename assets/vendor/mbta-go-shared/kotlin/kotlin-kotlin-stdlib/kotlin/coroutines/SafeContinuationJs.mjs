import { createThis2j2avj17cvnv2 as createThis } from '../js/coreRuntime.mjs';
import {
  CoroutineSingletons_UNDECIDED_getInstancetignxv5433yb as CoroutineSingletons_UNDECIDED_getInstance,
  CoroutineSingletons_RESUMED_getInstance124zs1clghi22 as CoroutineSingletons_RESUMED_getInstance,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
} from './intrinsics/Intrinsics.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  Failure21qmuqji4xbjp as Failure,
} from '../Result.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from './Continuation.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var SafeContinuationClass;
function SafeContinuation() {
  if (SafeContinuationClass === VOID) {
    class $ {
      static xd(delegate, initialResult) {
        var $this = createThis(this);
        $this.vd_1 = delegate;
        $this.wd_1 = initialResult;
        return $this;
      }
      static yd(delegate) {
        return this.xd(delegate, CoroutineSingletons_UNDECIDED_getInstance());
      }
      ld() {
        return this.vd_1.ld();
      }
      qd(result) {
        var cur = this.wd_1;
        if (cur === CoroutineSingletons_UNDECIDED_getInstance()) {
          this.wd_1 = _Result___get_value__impl__bjfvqg(result);
        } else if (cur === get_COROUTINE_SUSPENDED()) {
          this.wd_1 = CoroutineSingletons_RESUMED_getInstance();
          this.vd_1.qd(result);
        } else
          throw IllegalStateException().o5('Already resumed');
      }
      zd() {
        if (this.wd_1 === CoroutineSingletons_UNDECIDED_getInstance()) {
          this.wd_1 = get_COROUTINE_SUSPENDED();
          return get_COROUTINE_SUSPENDED();
        }
        var result = this.wd_1;
        var tmp;
        if (result === CoroutineSingletons_RESUMED_getInstance()) {
          tmp = get_COROUTINE_SUSPENDED();
        } else {
          if (result instanceof Failure()) {
            throw result.ae_1;
          } else {
            tmp = result;
          }
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'SafeContinuation', VOID, VOID, [Continuation()]);
    SafeContinuationClass = $;
  }
  return SafeContinuationClass;
}
//region block: exports
export {
  SafeContinuation as SafeContinuation1x0fxyaxo6cwq,
};
//endregion

//# sourceMappingURL=SafeContinuationJs.mjs.map
