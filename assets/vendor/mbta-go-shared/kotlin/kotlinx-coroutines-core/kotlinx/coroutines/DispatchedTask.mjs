import { SchedulerTaskrk35h6752rti as SchedulerTask } from './SchedulerTask.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally } from './CompletionState.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  DispatchedContinuation8kf77e5g2ha2 as DispatchedContinuation,
  safeDispatch2vco9v5u7w5xs as safeDispatch,
  safeIsDispatchNeeded2sl03dqd165wc as safeIsDispatchNeeded,
} from './internal/DispatchedContinuation.mjs';
import { Key_instance2tirv2rj82ml4 as Key_instance } from './Job.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { recoverStackTrace2i3si2i8nvw1k as recoverStackTrace } from './internal/StackTraceRecovery.mjs';
import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from './CoroutineExceptionHandler.mjs';
import { CoroutinesInternalError3t354dypw0kr6 as CoroutinesInternalError } from './Exceptions.common.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { ThreadLocalEventLoop_getInstance36jwo3qw2bxas as ThreadLocalEventLoop_getInstance } from './EventLoop.common.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DispatchedTaskClass;
function DispatchedTask() {
  if (DispatchedTaskClass === VOID) {
    class $ extends SchedulerTask() {
      constructor(resumeMode) {
        super();
        this.j25_1 = resumeMode;
      }
      h26(takenState, cause) {
      }
      n26(state) {
        return (state == null ? true : !(state == null)) ? state : THROW_CCE();
      }
      x26(state) {
        var tmp0_safe_receiver = state instanceof CompletedExceptionally() ? state : null;
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c21_1;
      }
      z26() {
        // Inline function 'kotlinx.coroutines.assert' call
        try {
          var tmp = this.e26();
          var delegate = tmp instanceof DispatchedContinuation() ? tmp : THROW_CCE();
          var continuation = delegate.c25_1;
          // Inline function 'kotlinx.coroutines.withContinuationContext' call
          delegate.e25_1;
          var context = continuation.ld();
          var state = this.g26();
          var exception = this.x26(state);
          var job = exception == null && get_isCancellableMode(this.j25_1) ? context.sd(Key_instance) : null;
          if (!(job == null) && !job.x20()) {
            var cause = job.w21();
            this.h26(state, cause);
            // Inline function 'kotlinx.coroutines.resumeWithStackTrace' call
            // Inline function 'kotlin.Companion.failure' call
            var exception_0 = recoverStackTrace(cause, continuation);
            var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(exception_0));
            continuation.qd(tmp$ret$1);
          } else {
            if (!(exception == null)) {
              // Inline function 'kotlin.coroutines.resumeWithException' call
              // Inline function 'kotlin.Companion.failure' call
              var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(exception));
              continuation.qd(tmp$ret$3);
            } else {
              // Inline function 'kotlin.coroutines.resume' call
              // Inline function 'kotlin.Companion.success' call
              var value = this.n26(state);
              var tmp$ret$5 = _Result___init__impl__xyqfz8(value);
              continuation.qd(tmp$ret$5);
            }
          }
        } catch ($p) {
          if ($p instanceof DispatchException()) {
            var e = $p;
            handleCoroutineException(this.e26().ld(), e.p28_1);
          } else {
            if ($p instanceof Error) {
              var e_0 = $p;
              this.a27(e_0);
            } else {
              throw $p;
            }
          }
        }
      }
      a27(exception) {
        var reason = CoroutinesInternalError().v29('Fatal exception in coroutines machinery for ' + toString(this) + '. ' + "Please read KDoc to 'handleFatalException' method and report this incident to maintainers", exception);
        handleCoroutineException(this.e26().ld(), reason);
      }
    }
    initMetadataForClass($, 'DispatchedTask');
    DispatchedTaskClass = $;
  }
  return DispatchedTaskClass;
}
function get_isReusableMode(_this__u8e3s4) {
  return _this__u8e3s4 === 2;
}
function get_isCancellableMode(_this__u8e3s4) {
  return _this__u8e3s4 === 1 || _this__u8e3s4 === 2;
}
function dispatch(_this__u8e3s4, mode) {
  // Inline function 'kotlinx.coroutines.assert' call
  var delegate = _this__u8e3s4.e26();
  var undispatched = mode === 4;
  var tmp;
  var tmp_0;
  if (!undispatched) {
    tmp_0 = delegate instanceof DispatchedContinuation();
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = get_isCancellableMode(mode) === get_isCancellableMode(_this__u8e3s4.j25_1);
  } else {
    tmp = false;
  }
  if (tmp) {
    var dispatcher = delegate.b25_1;
    var context = delegate.ld();
    if (safeIsDispatchNeeded(dispatcher, context)) {
      safeDispatch(dispatcher, context, _this__u8e3s4);
    } else {
      resumeUnconfined(_this__u8e3s4);
    }
  } else {
    resume(_this__u8e3s4, delegate, undispatched);
  }
}
var DispatchExceptionClass;
function DispatchException() {
  if (DispatchExceptionClass === VOID) {
    class $ extends Exception() {
      static b2v(cause, dispatcher, context) {
        var $this = this.uf('Coroutine dispatcher ' + dispatcher.toString() + ' threw an exception, context = ' + toString(context), cause);
        captureStack($this, $this.q28_1);
        $this.p28_1 = cause;
        delete $this.cause;
        return $this;
      }
      q2() {
        return this.p28_1;
      }
      get cause() {
        return this.q2();
      }
    }
    initMetadataForClass($, 'DispatchException');
    DispatchExceptionClass = $;
  }
  return DispatchExceptionClass;
}
function resumeUnconfined(_this__u8e3s4) {
  var eventLoop = ThreadLocalEventLoop_getInstance().p29();
  if (eventLoop.j29()) {
    eventLoop.i29(_this__u8e3s4);
  } else {
    // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
    eventLoop.l29(true);
    try {
      resume(_this__u8e3s4, _this__u8e3s4.e26(), true);
      $l$loop: while (eventLoop.h29()) {
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        _this__u8e3s4.a27(e);
      } else {
        throw $p;
      }
    }
    finally {
      eventLoop.m29(true);
    }
  }
}
function resume(_this__u8e3s4, delegate, undispatched) {
  var state = _this__u8e3s4.g26();
  var exception = _this__u8e3s4.x26(state);
  var tmp;
  if (!(exception == null)) {
    // Inline function 'kotlin.Companion.failure' call
    tmp = _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    // Inline function 'kotlin.Companion.success' call
    var value = _this__u8e3s4.n26(state);
    tmp = _Result___init__impl__xyqfz8(value);
  }
  var result = tmp;
  if (undispatched) {
    // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
    var this_0 = delegate instanceof DispatchedContinuation() ? delegate : THROW_CCE();
    this_0.c25_1;
    // Inline function 'kotlinx.coroutines.withContinuationContext' call
    this_0.e25_1;
    this_0.c25_1.qd(result);
  } else {
    delegate.qd(result);
  }
}
//region block: exports
export {
  DispatchException as DispatchException248dwsudeuh1h,
  DispatchedTask as DispatchedTask39ez3ayqqzt3m,
  dispatch as dispatch2sf9j0r16c3zo,
  get_isCancellableMode as get_isCancellableMode2kisg4oawmpb2,
  get_isReusableMode as get_isReusableMode36u17a15bfmkj,
};
//endregion

//# sourceMappingURL=DispatchedTask.mjs.map
