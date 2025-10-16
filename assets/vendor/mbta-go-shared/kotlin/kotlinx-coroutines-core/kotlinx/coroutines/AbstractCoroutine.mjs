import {
  JobSupport3fdjh0rbee4be as JobSupport,
  get_COMPLETING_WAITING_CHILDREN3nnjgv5wv89p1 as get_COMPLETING_WAITING_CHILDREN,
} from './JobSupport.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  Job29shfjfygy86k as Job,
} from './Job.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName } from './Debug.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally,
  toState1lqvgl5d0bogr as toState,
} from './CompletionState.mjs';
import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from './CoroutineExceptionHandler.mjs';
import { get_coroutineName3a0vy840b4l1i as get_coroutineName } from './CoroutineContext.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from './CoroutineScope.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractCoroutineClass;
function AbstractCoroutine() {
  if (AbstractCoroutineClass === VOID) {
    class $ extends JobSupport() {
      constructor(parentContext, initParentJob, active) {
        super(active);
        if (initParentJob) {
          this.s20(parentContext.sd(Key_instance));
        }
        this.v20_1 = parentContext.ir(this);
      }
      ld() {
        return this.v20_1;
      }
      w20() {
        return this.v20_1;
      }
      x20() {
        return super.x20();
      }
      y20(value) {
      }
      z20(cause, handled) {
      }
      a21() {
        return get_classSimpleName(this) + ' was cancelled';
      }
      b21(state) {
        if (state instanceof CompletedExceptionally()) {
          this.z20(state.c21_1, state.e21());
        } else {
          this.y20((state == null ? true : !(state == null)) ? state : THROW_CCE());
        }
      }
      qd(result) {
        var state = this.f21(toState(result));
        if (state === get_COMPLETING_WAITING_CHILDREN())
          return Unit_instance;
        this.g21(state);
      }
      g21(state) {
        return this.h21(state);
      }
      i21(exception) {
        handleCoroutineException(this.v20_1, exception);
      }
      j21() {
        var tmp0_elvis_lhs = get_coroutineName(this.v20_1);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return super.j21();
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var coroutineName = tmp;
        return '"' + coroutineName + '":' + super.j21();
      }
      k21(start, receiver, block) {
        start.n21(block, receiver, this);
      }
    }
    initMetadataForClass($, 'AbstractCoroutine', VOID, VOID, [JobSupport(), Job(), Continuation(), CoroutineScope()], [0]);
    AbstractCoroutineClass = $;
  }
  return AbstractCoroutineClass;
}
//region block: exports
export {
  AbstractCoroutine as AbstractCoroutine2jzyhqo91sb0o,
};
//endregion

//# sourceMappingURL=AbstractCoroutine.mjs.map
