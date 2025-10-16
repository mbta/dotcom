import {
  CancelledContinuation2f46cx697kdhx as CancelledContinuation,
  CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally,
  toState1u6l586qexaz7 as toState,
} from './CompletionState.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { DispatchedContinuation8kf77e5g2ha2 as DispatchedContinuation } from './internal/DispatchedContinuation.mjs';
import {
  get_isReusableMode36u17a15bfmkj as get_isReusableMode,
  dispatch2sf9j0r16c3zo as dispatch,
  get_isCancellableMode2kisg4oawmpb2 as get_isCancellableMode,
  DispatchedTask39ez3ayqqzt3m as DispatchedTask,
} from './DispatchedTask.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CompletionHandlerException1h8udyjlr1wky as CompletionHandlerException } from './Exceptions.common.mjs';
import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from './CoroutineExceptionHandler.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  invokeOnCompletion3npqdfp2wzhn6 as invokeOnCompletion,
  NonDisposableHandle_instance3k5b81ogrgecy as NonDisposableHandle_instance,
} from './Job.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Segmentqmq1glevgieu as Segment } from './internal/ConcurrentLinkedList.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  atomic$int$11d5swdyn6j0pu as atomic$int$1,
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
} from '../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import {
  cancel$default1r6ecuk0q8omy as cancel$default,
  invokeOnCancellationb68niwbjdmgy as invokeOnCancellation,
  CancellableContinuationpb2x00mxmcbt as CancellableContinuation,
} from './CancellableContinuation.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { recoverStackTrace2i3si2i8nvw1k as recoverStackTrace } from './internal/StackTraceRecovery.mjs';
import { toDebugString2sjrkc0z7k0mx as toDebugString } from './CoroutineContext.mjs';
import {
  get_hexAddress1mxa7txdmiojm as get_hexAddress,
  get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName,
} from './Debug.mjs';
import { Waiter3lxa2a79zyo0g as Waiter } from './Waiter.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { JobNode2tu3g3s3xsko1 as JobNode } from './JobSupport.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from './internal/Symbol.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_RESUME_TOKEN() {
  _init_properties_CancellableContinuationImpl_kt__6rrtdd();
  return RESUME_TOKEN;
}
var RESUME_TOKEN;
function _get_parentHandle__f8dcex($this) {
  return $this.v24_1.kotlinx$atomicfu$value;
}
function _get_stateDebugRepresentation__bf18u4($this) {
  var tmp0_subject = $this.r21();
  var tmp;
  if (!(tmp0_subject == null) ? isInterface(tmp0_subject, NotCompleted()) : false) {
    tmp = 'Active';
  } else {
    if (tmp0_subject instanceof CancelledContinuation()) {
      tmp = 'Cancelled';
    } else {
      tmp = 'Completed';
    }
  }
  return tmp;
}
function isReusable($this) {
  var tmp;
  if (get_isReusableMode($this.j25_1)) {
    var tmp_0 = $this.r24_1;
    tmp = (tmp_0 instanceof DispatchedContinuation() ? tmp_0 : THROW_CCE()).i25();
  } else {
    tmp = false;
  }
  return tmp;
}
function cancelLater($this, cause) {
  if (!isReusable($this))
    return false;
  var tmp = $this.r24_1;
  var dispatched = tmp instanceof DispatchedContinuation() ? tmp : THROW_CCE();
  return dispatched.k25(cause);
}
function callSegmentOnCancellation($this, segment, cause) {
  // Inline function 'kotlinx.coroutines.index' call
  var index = $this.t24_1.kotlinx$atomicfu$value & 536870911;
  // Inline function 'kotlin.check' call
  if (!!(index === 536870911)) {
    var message = 'The index for Segment.onCancellation(..) is broken';
    throw IllegalStateException().o5(toString(message));
  }
  // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callCancelHandlerSafely' call
  try {
    segment.p25(index, cause, $this.ld());
  } catch ($p) {
    if ($p instanceof Error) {
      var ex = $p;
      handleCoroutineException($this.ld(), CompletionHandlerException().t25('Exception in invokeOnCancellation handler for ' + $this.toString(), ex));
    } else {
      throw $p;
    }
  }
}
function trySuspend($this) {
  // Inline function 'kotlinx.atomicfu.loop' call
  var this_0 = $this.t24_1;
  while (true) {
    var cur = this_0.kotlinx$atomicfu$value;
    // Inline function 'kotlinx.coroutines.decision' call
    switch (cur >> 29) {
      case 0:
        // Inline function 'kotlinx.coroutines.index' call

        // Inline function 'kotlinx.coroutines.decisionAndIndex' call

        var tmp$ret$2 = (1 << 29) + (cur & 536870911) | 0;
        if ($this.t24_1.atomicfu$compareAndSet(cur, tmp$ret$2))
          return true;
        break;
      case 2:
        return false;
      default:
        // Inline function 'kotlin.error' call

        var message = 'Already suspended';
        throw IllegalStateException().o5(toString(message));
    }
  }
}
function tryResume($this) {
  // Inline function 'kotlinx.atomicfu.loop' call
  var this_0 = $this.t24_1;
  while (true) {
    var cur = this_0.kotlinx$atomicfu$value;
    // Inline function 'kotlinx.coroutines.decision' call
    switch (cur >> 29) {
      case 0:
        // Inline function 'kotlinx.coroutines.index' call

        // Inline function 'kotlinx.coroutines.decisionAndIndex' call

        var tmp$ret$2 = (2 << 29) + (cur & 536870911) | 0;
        if ($this.t24_1.atomicfu$compareAndSet(cur, tmp$ret$2))
          return true;
        break;
      case 1:
        return false;
      default:
        // Inline function 'kotlin.error' call

        var message = 'Already resumed';
        throw IllegalStateException().o5(toString(message));
    }
  }
}
function installParentHandle($this) {
  var tmp0_elvis_lhs = $this.ld().sd(Key_instance);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var parent = tmp;
  var handle = invokeOnCompletion(parent, VOID, new (ChildContinuation())($this));
  $this.v24_1.atomicfu$compareAndSet(null, handle);
  return handle;
}
function invokeOnCancellationImpl($this, handler) {
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.atomicfu.loop' call
  var this_0 = $this.u24_1;
  while (true) {
    var state = this_0.kotlinx$atomicfu$value;
    if (state instanceof Active()) {
      if ($this.u24_1.atomicfu$compareAndSet(state, handler))
        return Unit_instance;
    } else {
      var tmp;
      if (!(state == null) ? isInterface(state, CancelHandler()) : false) {
        tmp = true;
      } else {
        tmp = state instanceof Segment();
      }
      if (tmp) {
        multipleHandlersError($this, handler, state);
      } else {
        if (state instanceof CompletedExceptionally()) {
          if (!state.c26()) {
            multipleHandlersError($this, handler, state);
          }
          if (state instanceof CancelledContinuation()) {
            var tmp1_safe_receiver = state instanceof CompletedExceptionally() ? state : null;
            var cause = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.c21_1;
            if (isInterface(handler, CancelHandler())) {
              $this.z25(handler, cause);
            } else {
              var segment = handler instanceof Segment() ? handler : THROW_CCE();
              callSegmentOnCancellation($this, segment, cause);
            }
          }
          return Unit_instance;
        } else {
          if (state instanceof CompletedContinuation()) {
            if (!(state.v25_1 == null)) {
              multipleHandlersError($this, handler, state);
            }
            if (handler instanceof Segment())
              return Unit_instance;
            if (!isInterface(handler, CancelHandler()))
              THROW_CCE();
            if (state.a26()) {
              $this.z25(handler, state.y25_1);
              return Unit_instance;
            }
            var update = state.b26(VOID, handler);
            if ($this.u24_1.atomicfu$compareAndSet(state, update))
              return Unit_instance;
          } else {
            if (handler instanceof Segment())
              return Unit_instance;
            if (!isInterface(handler, CancelHandler()))
              THROW_CCE();
            var update_0 = new (CompletedContinuation())(state, handler);
            if ($this.u24_1.atomicfu$compareAndSet(state, update_0))
              return Unit_instance;
          }
        }
      }
    }
  }
}
function multipleHandlersError($this, handler, state) {
  // Inline function 'kotlin.error' call
  var message = "It's prohibited to register multiple handlers, tried to register " + toString(handler) + ', already has ' + toString_0(state);
  throw IllegalStateException().o5(toString(message));
}
function dispatchResume($this, mode) {
  if (tryResume($this))
    return Unit_instance;
  dispatch($this, mode);
}
function resumedState($this, state, proposedUpdate, resumeMode, onCancellation, idempotent) {
  var tmp;
  if (proposedUpdate instanceof CompletedExceptionally()) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    tmp = proposedUpdate;
  } else {
    if (!get_isCancellableMode(resumeMode) && idempotent == null) {
      tmp = proposedUpdate;
    } else {
      var tmp_0;
      var tmp_1;
      if (!(onCancellation == null)) {
        tmp_1 = true;
      } else {
        tmp_1 = isInterface(state, CancelHandler());
      }
      if (tmp_1) {
        tmp_0 = true;
      } else {
        tmp_0 = !(idempotent == null);
      }
      if (tmp_0) {
        tmp = new (CompletedContinuation())(proposedUpdate, isInterface(state, CancelHandler()) ? state : null, onCancellation, idempotent);
      } else {
        tmp = proposedUpdate;
      }
    }
  }
  return tmp;
}
function tryResumeImpl($this, proposedUpdate, idempotent, onCancellation) {
  // Inline function 'kotlinx.atomicfu.loop' call
  var this_0 = $this.u24_1;
  while (true) {
    var tmp0 = this_0.kotlinx$atomicfu$value;
    $l$block: {
      if (!(tmp0 == null) ? isInterface(tmp0, NotCompleted()) : false) {
        var update = resumedState($this, tmp0, proposedUpdate, $this.j25_1, onCancellation, idempotent);
        if (!$this.u24_1.atomicfu$compareAndSet(tmp0, update)) {
          break $l$block;
        }
        detachChildIfNonReusable($this);
        return get_RESUME_TOKEN();
      } else {
        if (tmp0 instanceof CompletedContinuation()) {
          var tmp;
          if (!(idempotent == null) && tmp0.x25_1 === idempotent) {
            // Inline function 'kotlinx.coroutines.assert' call
            tmp = get_RESUME_TOKEN();
          } else {
            tmp = null;
          }
          return tmp;
        } else {
          return null;
        }
      }
    }
  }
}
function alreadyResumedError($this, proposedUpdate) {
  // Inline function 'kotlin.error' call
  var message = 'Already resumed, but proposed with update ' + toString_0(proposedUpdate);
  throw IllegalStateException().o5(toString(message));
}
function detachChildIfNonReusable($this) {
  if (!isReusable($this)) {
    $this.d26();
  }
}
function CancellableContinuationImpl$resume$lambda($onCancellation) {
  return function (cause, _unused_var__etf5q3, _unused_var__etf5q3_0) {
    $onCancellation(cause);
    return Unit_instance;
  };
}
var CancellableContinuationImplClass;
function CancellableContinuationImpl() {
  if (CancellableContinuationImplClass === VOID) {
    class $ extends DispatchedTask() {
      constructor(delegate, resumeMode) {
        super(resumeMode);
        this.r24_1 = delegate;
        // Inline function 'kotlinx.coroutines.assert' call
        this.s24_1 = this.r24_1.ld();
        var tmp = this;
        // Inline function 'kotlinx.coroutines.decisionAndIndex' call
        var tmp$ret$1 = (0 << 29) + 536870911 | 0;
        tmp.t24_1 = atomic$int$1(tmp$ret$1);
        this.u24_1 = atomic$ref$1(Active_instance);
        this.v24_1 = atomic$ref$1(null);
      }
      e26() {
        return this.r24_1;
      }
      ld() {
        return this.s24_1;
      }
      r21() {
        return this.u24_1.kotlinx$atomicfu$value;
      }
      s21() {
        var tmp = this.r21();
        return !(!(tmp == null) ? isInterface(tmp, NotCompleted()) : false);
      }
      t21() {
        var tmp = this.r21();
        return tmp instanceof CancelledContinuation();
      }
      f26() {
        var tmp0_elvis_lhs = installParentHandle(this);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return Unit_instance;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var handle = tmp;
        if (this.s21()) {
          handle.z24();
          this.v24_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
        }
      }
      h25() {
        // Inline function 'kotlinx.coroutines.assert' call
        // Inline function 'kotlinx.coroutines.assert' call
        var state = this.u24_1.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.assert' call
        var tmp;
        if (state instanceof CompletedContinuation()) {
          tmp = !(state.x25_1 == null);
        } else {
          tmp = false;
        }
        if (tmp) {
          this.d26();
          return false;
        }
        var tmp_0 = this.t24_1;
        // Inline function 'kotlinx.coroutines.decisionAndIndex' call
        tmp_0.kotlinx$atomicfu$value = (0 << 29) + 536870911 | 0;
        this.u24_1.kotlinx$atomicfu$value = Active_instance;
        return true;
      }
      g26() {
        return this.r21();
      }
      h26(takenState, cause) {
        var this_0 = this.u24_1;
        while (true) {
          var state = this_0.kotlinx$atomicfu$value;
          if (!(state == null) ? isInterface(state, NotCompleted()) : false) {
            // Inline function 'kotlin.error' call
            var message = 'Not completed';
            throw IllegalStateException().o5(toString(message));
          } else {
            if (state instanceof CompletedExceptionally())
              return Unit_instance;
            else {
              if (state instanceof CompletedContinuation()) {
                // Inline function 'kotlin.check' call
                if (!!state.a26()) {
                  var message_0 = 'Must be called at most once';
                  throw IllegalStateException().o5(toString(message_0));
                }
                var update = state.b26(VOID, VOID, VOID, VOID, cause);
                if (this.u24_1.atomicfu$compareAndSet(state, update)) {
                  state.i26(this, cause);
                  return Unit_instance;
                }
              } else {
                if (this.u24_1.atomicfu$compareAndSet(state, new (CompletedContinuation())(state, VOID, VOID, VOID, cause))) {
                  return Unit_instance;
                }
              }
            }
          }
        }
        return Unit_instance;
      }
      l24(cause) {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.u24_1;
        while (true) {
          var tmp0 = this_0.kotlinx$atomicfu$value;
          $l$block: {
            if (!(!(tmp0 == null) ? isInterface(tmp0, NotCompleted()) : false))
              return false;
            var tmp;
            if (isInterface(tmp0, CancelHandler())) {
              tmp = true;
            } else {
              tmp = tmp0 instanceof Segment();
            }
            var update = new (CancelledContinuation())(this, cause, tmp);
            if (!this.u24_1.atomicfu$compareAndSet(tmp0, update)) {
              break $l$block;
            }
            if (isInterface(tmp0, CancelHandler())) {
              this.z25(tmp0, cause);
            } else {
              if (tmp0 instanceof Segment()) {
                callSegmentOnCancellation(this, tmp0, cause);
              }
            }
            detachChildIfNonReusable(this);
            dispatchResume(this, this.j25_1);
            return true;
          }
        }
      }
      j26(cause) {
        if (cancelLater(this, cause))
          return Unit_instance;
        this.l24(cause);
        detachChildIfNonReusable(this);
      }
      z25(handler, cause) {
        // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callCancelHandlerSafely' call
        try {
          handler.y24(cause);
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            handleCoroutineException(this.ld(), CompletionHandlerException().t25('Exception in invokeOnCancellation handler for ' + this.toString(), ex));
          } else {
            throw $p;
          }
        }
        return Unit_instance;
      }
      k26(onCancellation, cause, value) {
        try {
          onCancellation(cause, value, this.ld());
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            handleCoroutineException(this.ld(), CompletionHandlerException().t25('Exception in resume onCancellation handler for ' + this.toString(), ex));
          } else {
            throw $p;
          }
        }
      }
      l26(parent) {
        return parent.w21();
      }
      e23() {
        var isReusable_0 = isReusable(this);
        if (trySuspend(this)) {
          if (_get_parentHandle__f8dcex(this) == null) {
            installParentHandle(this);
          }
          if (isReusable_0) {
            this.m26();
          }
          return get_COROUTINE_SUSPENDED();
        }
        if (isReusable_0) {
          this.m26();
        }
        var state = this.r21();
        if (state instanceof CompletedExceptionally())
          throw recoverStackTrace(state.c21_1, this);
        if (get_isCancellableMode(this.j25_1)) {
          var job = this.ld().sd(Key_instance);
          if (!(job == null) && !job.x20()) {
            var cause = job.w21();
            this.h26(state, cause);
            throw recoverStackTrace(cause, this);
          }
        }
        return this.n26(state);
      }
      m26() {
        var tmp = this.r24_1;
        var tmp0_safe_receiver = tmp instanceof DispatchedContinuation() ? tmp : null;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o26(this);
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          return Unit_instance;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var cancellationCause = tmp_0;
        this.d26();
        this.l24(cancellationCause);
      }
      qd(result) {
        return this.p26(toState(result, this), this.j25_1);
      }
      q26(value, onCancellation) {
        var tmp = this.j25_1;
        var tmp_0;
        if (onCancellation == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_0 = CancellableContinuationImpl$resume$lambda(onCancellation);
        }
        return this.r26(value, tmp, tmp_0);
      }
      p24(value, onCancellation) {
        return this.r26(value, this.j25_1, onCancellation);
      }
      s26(segment, index) {
        var tmp0 = this.t24_1;
        $l$block: {
          // Inline function 'kotlinx.atomicfu.update' call
          while (true) {
            var cur = tmp0.kotlinx$atomicfu$value;
            // Inline function 'kotlinx.coroutines.index' call
            // Inline function 'kotlin.check' call
            if (!((cur & 536870911) === 536870911)) {
              var message = 'invokeOnCancellation should be called at most once';
              throw IllegalStateException().o5(toString(message));
            }
            // Inline function 'kotlinx.coroutines.decision' call
            // Inline function 'kotlinx.coroutines.decisionAndIndex' call
            var upd = (cur >> 29 << 29) + index | 0;
            if (tmp0.atomicfu$compareAndSet(cur, upd)) {
              break $l$block;
            }
          }
        }
        invokeOnCancellationImpl(this, segment);
      }
      n24(handler) {
        return invokeOnCancellation(this, new (UserSupplied())(handler));
      }
      w24(handler) {
        return invokeOnCancellationImpl(this, handler);
      }
      r26(proposedUpdate, resumeMode, onCancellation) {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.u24_1;
        while (true) {
          var tmp0 = this_0.kotlinx$atomicfu$value;
          $l$block: {
            if (!(tmp0 == null) ? isInterface(tmp0, NotCompleted()) : false) {
              var update = resumedState(this, tmp0, proposedUpdate, resumeMode, onCancellation, null);
              if (!this.u24_1.atomicfu$compareAndSet(tmp0, update)) {
                break $l$block;
              }
              detachChildIfNonReusable(this);
              dispatchResume(this, resumeMode);
              return Unit_instance;
            } else {
              if (tmp0 instanceof CancelledContinuation()) {
                if (tmp0.w26()) {
                  if (onCancellation == null)
                    null;
                  else {
                    // Inline function 'kotlin.let' call
                    this.k26(onCancellation, tmp0.c21_1, proposedUpdate);
                  }
                  return Unit_instance;
                }
              }
            }
            alreadyResumedError(this, proposedUpdate);
          }
        }
      }
      p26(proposedUpdate, resumeMode, onCancellation, $super) {
        onCancellation = onCancellation === VOID ? null : onCancellation;
        var tmp;
        if ($super === VOID) {
          this.r26(proposedUpdate, resumeMode, onCancellation);
          tmp = Unit_instance;
        } else {
          tmp = $super.r26.call(this, proposedUpdate, resumeMode, onCancellation);
        }
        return tmp;
      }
      d26() {
        var tmp0_elvis_lhs = _get_parentHandle__f8dcex(this);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return Unit_instance;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var handle = tmp;
        handle.z24();
        this.v24_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
      }
      j24(value, idempotent, onCancellation) {
        return tryResumeImpl(this, value, idempotent, onCancellation);
      }
      k24(token) {
        // Inline function 'kotlinx.coroutines.assert' call
        dispatchResume(this, this.j25_1);
      }
      o24(_this__u8e3s4, value) {
        var tmp = this.r24_1;
        var dc = tmp instanceof DispatchedContinuation() ? tmp : null;
        var tmp_0;
        if ((dc == null ? null : dc.b25_1) === _this__u8e3s4) {
          tmp_0 = 4;
        } else {
          tmp_0 = this.j25_1;
        }
        this.p26(value, tmp_0);
      }
      n26(state) {
        var tmp;
        if (state instanceof CompletedContinuation()) {
          var tmp_0 = state.u25_1;
          tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        } else {
          tmp = (state == null ? true : !(state == null)) ? state : THROW_CCE();
        }
        return tmp;
      }
      x26(state) {
        var tmp0_safe_receiver = super.x26(state);
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = recoverStackTrace(tmp0_safe_receiver, this.r24_1);
        }
        return tmp;
      }
      toString() {
        return this.y26() + '(' + toDebugString(this.r24_1) + '){' + _get_stateDebugRepresentation__bf18u4(this) + '}@' + get_hexAddress(this);
      }
      y26() {
        return 'CancellableContinuation';
      }
    }
    protoOf($).m24 = cancel$default;
    initMetadataForClass($, 'CancellableContinuationImpl', VOID, VOID, [DispatchedTask(), CancellableContinuation(), Waiter()]);
    CancellableContinuationImplClass = $;
  }
  return CancellableContinuationImplClass;
}
var NotCompletedClass;
function NotCompleted() {
  if (NotCompletedClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'NotCompleted');
    NotCompletedClass = $;
  }
  return NotCompletedClass;
}
var UserSuppliedClass;
function UserSupplied() {
  if (UserSuppliedClass === VOID) {
    class $ {
      constructor(handler) {
        this.b27_1 = handler;
      }
      y24(cause) {
        this.b27_1(cause);
      }
      toString() {
        return 'CancelHandler.UserSupplied[' + get_classSimpleName(this.b27_1) + '@' + get_hexAddress(this) + ']';
      }
    }
    initMetadataForClass($, 'UserSupplied', VOID, VOID, [CancelHandler()]);
    UserSuppliedClass = $;
  }
  return UserSuppliedClass;
}
var CancelHandlerClass;
function CancelHandler() {
  if (CancelHandlerClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CancelHandler', VOID, VOID, [NotCompleted()]);
    CancelHandlerClass = $;
  }
  return CancelHandlerClass;
}
var ActiveClass;
function Active() {
  if (ActiveClass === VOID) {
    class $ {
      toString() {
        return 'Active';
      }
    }
    initMetadataForObject($, 'Active', VOID, VOID, [NotCompleted()]);
    ActiveClass = $;
  }
  return ActiveClass;
}
var Active_instance;
function Active_getInstance() {
  return Active_instance;
}
var CompletedContinuationClass;
function CompletedContinuation() {
  if (CompletedContinuationClass === VOID) {
    class $ {
      constructor(result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
        cancelHandler = cancelHandler === VOID ? null : cancelHandler;
        onCancellation = onCancellation === VOID ? null : onCancellation;
        idempotentResume = idempotentResume === VOID ? null : idempotentResume;
        cancelCause = cancelCause === VOID ? null : cancelCause;
        this.u25_1 = result;
        this.v25_1 = cancelHandler;
        this.w25_1 = onCancellation;
        this.x25_1 = idempotentResume;
        this.y25_1 = cancelCause;
      }
      a26() {
        return !(this.y25_1 == null);
      }
      i26(cont, cause) {
        var tmp0_safe_receiver = this.v25_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          cont.z25(tmp0_safe_receiver, cause);
        }
        var tmp1_safe_receiver = this.w25_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          cont.k26(tmp1_safe_receiver, cause, this.u25_1);
        }
      }
      c27(result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
        return new (CompletedContinuation())(result, cancelHandler, onCancellation, idempotentResume, cancelCause);
      }
      b26(result, cancelHandler, onCancellation, idempotentResume, cancelCause, $super) {
        result = result === VOID ? this.u25_1 : result;
        cancelHandler = cancelHandler === VOID ? this.v25_1 : cancelHandler;
        onCancellation = onCancellation === VOID ? this.w25_1 : onCancellation;
        idempotentResume = idempotentResume === VOID ? this.x25_1 : idempotentResume;
        cancelCause = cancelCause === VOID ? this.y25_1 : cancelCause;
        return $super === VOID ? this.c27(result, cancelHandler, onCancellation, idempotentResume, cancelCause) : $super.c27.call(this, result, cancelHandler, onCancellation, idempotentResume, cancelCause);
      }
      toString() {
        return 'CompletedContinuation(result=' + toString_0(this.u25_1) + ', cancelHandler=' + toString_0(this.v25_1) + ', onCancellation=' + toString_0(this.w25_1) + ', idempotentResume=' + toString_0(this.x25_1) + ', cancelCause=' + toString_0(this.y25_1) + ')';
      }
      hashCode() {
        var result = this.u25_1 == null ? 0 : hashCode(this.u25_1);
        result = imul(result, 31) + (this.v25_1 == null ? 0 : hashCode(this.v25_1)) | 0;
        result = imul(result, 31) + (this.w25_1 == null ? 0 : hashCode(this.w25_1)) | 0;
        result = imul(result, 31) + (this.x25_1 == null ? 0 : hashCode(this.x25_1)) | 0;
        result = imul(result, 31) + (this.y25_1 == null ? 0 : hashCode(this.y25_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CompletedContinuation()))
          return false;
        var tmp0_other_with_cast = other instanceof CompletedContinuation() ? other : THROW_CCE();
        if (!equals(this.u25_1, tmp0_other_with_cast.u25_1))
          return false;
        if (!equals(this.v25_1, tmp0_other_with_cast.v25_1))
          return false;
        if (!equals(this.w25_1, tmp0_other_with_cast.w25_1))
          return false;
        if (!equals(this.x25_1, tmp0_other_with_cast.x25_1))
          return false;
        if (!equals(this.y25_1, tmp0_other_with_cast.y25_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'CompletedContinuation');
    CompletedContinuationClass = $;
  }
  return CompletedContinuationClass;
}
var ChildContinuationClass;
function ChildContinuation() {
  if (ChildContinuationClass === VOID) {
    class $ extends JobNode() {
      constructor(child) {
        super();
        this.h27_1 = child;
      }
      i27() {
        return true;
      }
      y24(cause) {
        this.h27_1.j26(this.h27_1.l26(this.n27()));
      }
    }
    initMetadataForClass($, 'ChildContinuation');
    ChildContinuationClass = $;
  }
  return ChildContinuationClass;
}
var properties_initialized_CancellableContinuationImpl_kt_xtzb03;
function _init_properties_CancellableContinuationImpl_kt__6rrtdd() {
  if (!properties_initialized_CancellableContinuationImpl_kt_xtzb03) {
    properties_initialized_CancellableContinuationImpl_kt_xtzb03 = true;
    RESUME_TOKEN = new (Symbol())('RESUME_TOKEN');
  }
}
//region block: init
Active_instance = new (Active())();
//endregion
//region block: exports
export {
  CancelHandler as CancelHandler3ic7xysezxbm5,
  CancellableContinuationImpl as CancellableContinuationImpl1cx201opicavg,
  NotCompleted as NotCompleted1jonr7fgu2l3n,
};
//endregion

//# sourceMappingURL=CancellableContinuationImpl.mjs.map
