import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { atomic$boolean$1iggki4z65a2h as atomic$boolean$1 } from '../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName } from './Debug.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  Result__exceptionOrNull_impl_p6xea9ty3elzpd9eo3 as Result__exceptionOrNull_impl_p6xea9,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { recoverStackTrace2i3si2i8nvw1k as recoverStackTrace } from './internal/StackTraceRecovery.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompletedExceptionallyClass;
function CompletedExceptionally() {
  if (CompletedExceptionallyClass === VOID) {
    class $ {
      constructor(cause, handled) {
        handled = handled === VOID ? false : handled;
        this.c21_1 = cause;
        this.d21_1 = atomic$boolean$1(handled);
      }
      e21() {
        return this.d21_1.kotlinx$atomicfu$value;
      }
      c26() {
        return this.d21_1.atomicfu$compareAndSet(false, true);
      }
      toString() {
        return get_classSimpleName(this) + '[' + this.c21_1.toString() + ']';
      }
    }
    initMetadataForClass($, 'CompletedExceptionally');
    CompletedExceptionallyClass = $;
  }
  return CompletedExceptionallyClass;
}
var CancelledContinuationClass;
function CancelledContinuation() {
  if (CancelledContinuationClass === VOID) {
    class $ extends CompletedExceptionally() {
      constructor(continuation, cause, handled) {
        super(cause == null ? CancellationException().he('Continuation ' + toString(continuation) + ' was cancelled normally') : cause, handled);
        this.v26_1 = atomic$boolean$1(false);
      }
      w26() {
        return this.v26_1.atomicfu$compareAndSet(false, true);
      }
    }
    initMetadataForClass($, 'CancelledContinuation');
    CancelledContinuationClass = $;
  }
  return CancelledContinuationClass;
}
function toState(_this__u8e3s4, caller) {
  // Inline function 'kotlin.getOrElse' call
  var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
  var tmp;
  if (exception == null) {
    var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
    tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  } else {
    tmp = new (CompletedExceptionally())(recoverStackTrace(exception, caller));
  }
  return tmp;
}
function toState_0(_this__u8e3s4) {
  // Inline function 'kotlin.getOrElse' call
  var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
  var tmp;
  if (exception == null) {
    var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
    tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  } else {
    tmp = new (CompletedExceptionally())(exception);
  }
  return tmp;
}
function recoverResult(state, uCont) {
  var tmp;
  if (state instanceof CompletedExceptionally()) {
    // Inline function 'kotlin.Companion.failure' call
    var exception = recoverStackTrace(state.c21_1, uCont);
    tmp = _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    // Inline function 'kotlin.Companion.success' call
    var value = (state == null ? true : !(state == null)) ? state : THROW_CCE();
    tmp = _Result___init__impl__xyqfz8(value);
  }
  return tmp;
}
//region block: exports
export {
  CancelledContinuation as CancelledContinuation2f46cx697kdhx,
  CompletedExceptionally as CompletedExceptionally3itrk74dxkv9s,
  recoverResult as recoverResult92pymwoef8np,
  toState as toState1u6l586qexaz7,
  toState_0 as toState1lqvgl5d0bogr,
};
//endregion

//# sourceMappingURL=CompletionState.mjs.map
