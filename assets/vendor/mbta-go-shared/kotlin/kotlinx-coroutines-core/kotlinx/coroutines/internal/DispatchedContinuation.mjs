import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../CancellableContinuationImpl.mjs';
import {
  DispatchedTask39ez3ayqqzt3m as DispatchedTask,
  DispatchException248dwsudeuh1h as DispatchException,
} from '../DispatchedTask.mjs';
import { threadContextElements12yd4mfmaodla as threadContextElements } from './ThreadContext.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString_0,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { toState1lqvgl5d0bogr as toState } from '../CompletionState.mjs';
import { ThreadLocalEventLoop_getInstance36jwo3qw2bxas as ThreadLocalEventLoop_getInstance } from '../EventLoop.common.mjs';
import { toDebugString2sjrkc0z7k0mx as toDebugString } from '../CoroutineContext.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Key_instance2tirv2rj82ml4 as Key_instance } from '../Job.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from './Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_UNDEFINED() {
  _init_properties_DispatchedContinuation_kt__tnmqc0();
  return UNDEFINED;
}
var UNDEFINED;
function get_REUSABLE_CLAIMED() {
  _init_properties_DispatchedContinuation_kt__tnmqc0();
  return REUSABLE_CLAIMED;
}
var REUSABLE_CLAIMED;
function _get_reusableCancellableContinuation__9qex09($this) {
  var tmp = $this.f25_1.kotlinx$atomicfu$value;
  return tmp instanceof CancellableContinuationImpl() ? tmp : null;
}
var DispatchedContinuationClass;
function DispatchedContinuation() {
  if (DispatchedContinuationClass === VOID) {
    class $ extends DispatchedTask() {
      constructor(dispatcher, continuation) {
        super(-1);
        this.b25_1 = dispatcher;
        this.c25_1 = continuation;
        this.d25_1 = get_UNDEFINED();
        this.e25_1 = threadContextElements(this.ld());
        this.f25_1 = atomic$ref$1(null);
      }
      i25() {
        return !(this.f25_1.kotlinx$atomicfu$value == null);
      }
      a2v() {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.f25_1;
        while (true) {
          if (!(this_0.kotlinx$atomicfu$value === get_REUSABLE_CLAIMED()))
            return Unit_instance;
        }
      }
      n28() {
        this.a2v();
        var tmp0_safe_receiver = _get_reusableCancellableContinuation__9qex09(this);
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.d26();
        }
      }
      g25() {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.f25_1;
        while (true) {
          var state = this_0.kotlinx$atomicfu$value;
          if (state === null) {
            this.f25_1.kotlinx$atomicfu$value = get_REUSABLE_CLAIMED();
            return null;
          } else {
            if (state instanceof CancellableContinuationImpl()) {
              if (this.f25_1.atomicfu$compareAndSet(state, get_REUSABLE_CLAIMED())) {
                return state instanceof CancellableContinuationImpl() ? state : THROW_CCE();
              }
            } else {
              if (state !== get_REUSABLE_CLAIMED()) {
                if (!(state instanceof Error)) {
                  // Inline function 'kotlin.error' call
                  var message = 'Inconsistent state ' + toString(state);
                  throw IllegalStateException().o5(toString_0(message));
                }
              }
            }
          }
        }
      }
      o26(continuation) {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.f25_1;
        while (true) {
          var state = this_0.kotlinx$atomicfu$value;
          if (state === get_REUSABLE_CLAIMED()) {
            if (this.f25_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), continuation))
              return null;
          } else {
            if (state instanceof Error) {
              // Inline function 'kotlin.require' call
              // Inline function 'kotlin.require' call
              if (!this.f25_1.atomicfu$compareAndSet(state, null)) {
                var message = 'Failed requirement.';
                throw IllegalArgumentException().q(toString_0(message));
              }
              return state;
            } else {
              // Inline function 'kotlin.error' call
              var message_0 = 'Inconsistent state ' + toString(state);
              throw IllegalStateException().o5(toString_0(message_0));
            }
          }
        }
      }
      k25(cause) {
        // Inline function 'kotlinx.atomicfu.loop' call
        var this_0 = this.f25_1;
        while (true) {
          var state = this_0.kotlinx$atomicfu$value;
          if (equals(state, get_REUSABLE_CLAIMED())) {
            if (this.f25_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), cause))
              return true;
          } else {
            if (state instanceof Error)
              return true;
            else {
              if (this.f25_1.atomicfu$compareAndSet(state, null))
                return false;
            }
          }
        }
      }
      g26() {
        var state = this.d25_1;
        // Inline function 'kotlinx.coroutines.assert' call
        this.d25_1 = get_UNDEFINED();
        return state;
      }
      e26() {
        return this;
      }
      qd(result) {
        var state = toState(result);
        if (safeIsDispatchNeeded(this.b25_1, this.ld())) {
          this.d25_1 = state;
          this.j25_1 = 0;
          safeDispatch(this.b25_1, this.ld(), this);
        } else {
          $l$block: {
            // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
            // Inline function 'kotlinx.coroutines.assert' call
            var eventLoop = ThreadLocalEventLoop_getInstance().p29();
            if (false && eventLoop.k29()) {
              break $l$block;
            }
            var tmp;
            if (eventLoop.j29()) {
              this.d25_1 = state;
              this.j25_1 = 0;
              eventLoop.i29(this);
              tmp = true;
            } else {
              // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
              eventLoop.l29(true);
              try {
                this.ld();
                // Inline function 'kotlinx.coroutines.withCoroutineContext' call
                this.e25_1;
                this.c25_1.qd(result);
                $l$loop: while (eventLoop.h29()) {
                }
              } catch ($p) {
                if ($p instanceof Error) {
                  var e = $p;
                  this.a27(e);
                } else {
                  throw $p;
                }
              }
              finally {
                eventLoop.m29(true);
              }
              tmp = false;
            }
          }
        }
      }
      toString() {
        return 'DispatchedContinuation[' + this.b25_1.toString() + ', ' + toDebugString(this.c25_1) + ']';
      }
      ld() {
        return this.c25_1.ld();
      }
    }
    initMetadataForClass($, 'DispatchedContinuation', VOID, VOID, [DispatchedTask(), Continuation()]);
    DispatchedContinuationClass = $;
  }
  return DispatchedContinuationClass;
}
function safeDispatch(_this__u8e3s4, context, runnable) {
  _init_properties_DispatchedContinuation_kt__tnmqc0();
  try {
    _this__u8e3s4.m28(context, runnable);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      throw DispatchException().b2v(e, _this__u8e3s4, context);
    } else {
      throw $p;
    }
  }
}
function safeIsDispatchNeeded(_this__u8e3s4, context) {
  _init_properties_DispatchedContinuation_kt__tnmqc0();
  try {
    return _this__u8e3s4.l28(context);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      throw DispatchException().b2v(e, _this__u8e3s4, context);
    } else {
      throw $p;
    }
  }
}
function resumeCancellableWith(_this__u8e3s4, result) {
  _init_properties_DispatchedContinuation_kt__tnmqc0();
  var tmp;
  if (_this__u8e3s4 instanceof DispatchedContinuation()) {
    // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancellableWith' call
    var state = toState(result);
    if (safeIsDispatchNeeded(_this__u8e3s4.b25_1, _this__u8e3s4.ld())) {
      _this__u8e3s4.d25_1 = state;
      _this__u8e3s4.j25_1 = 1;
      safeDispatch(_this__u8e3s4.b25_1, _this__u8e3s4.ld(), _this__u8e3s4);
    } else {
      $l$block: {
        // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
        // Inline function 'kotlinx.coroutines.assert' call
        var eventLoop = ThreadLocalEventLoop_getInstance().p29();
        if (false && eventLoop.k29()) {
          break $l$block;
        }
        var tmp_0;
        if (eventLoop.j29()) {
          _this__u8e3s4.d25_1 = state;
          _this__u8e3s4.j25_1 = 1;
          eventLoop.i29(_this__u8e3s4);
          tmp_0 = true;
        } else {
          // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
          eventLoop.l29(true);
          try {
            var tmp$ret$4;
            $l$block_0: {
              // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancelled' call
              var job = _this__u8e3s4.ld().sd(Key_instance);
              if (!(job == null) && !job.x20()) {
                var cause = job.w21();
                _this__u8e3s4.h26(state, cause);
                // Inline function 'kotlin.coroutines.resumeWithException' call
                // Inline function 'kotlin.Companion.failure' call
                var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(cause));
                _this__u8e3s4.qd(tmp$ret$2);
                tmp$ret$4 = true;
                break $l$block_0;
              }
              tmp$ret$4 = false;
            }
            if (!tmp$ret$4) {
              // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
              _this__u8e3s4.c25_1;
              // Inline function 'kotlinx.coroutines.withContinuationContext' call
              _this__u8e3s4.e25_1;
              _this__u8e3s4.c25_1.qd(result);
            }
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
          tmp_0 = false;
        }
      }
    }
    tmp = Unit_instance;
  } else {
    _this__u8e3s4.qd(result);
    tmp = Unit_instance;
  }
  return tmp;
}
var properties_initialized_DispatchedContinuation_kt_2siadq;
function _init_properties_DispatchedContinuation_kt__tnmqc0() {
  if (!properties_initialized_DispatchedContinuation_kt_2siadq) {
    properties_initialized_DispatchedContinuation_kt_2siadq = true;
    UNDEFINED = new (Symbol())('UNDEFINED');
    REUSABLE_CLAIMED = new (Symbol())('REUSABLE_CLAIMED');
  }
}
//region block: exports
export {
  DispatchedContinuation as DispatchedContinuation8kf77e5g2ha2,
  resumeCancellableWith as resumeCancellableWith2mw849xp548hg,
  safeDispatch as safeDispatch2vco9v5u7w5xs,
  safeIsDispatchNeeded as safeIsDispatchNeeded2sl03dqd165wc,
};
//endregion

//# sourceMappingURL=DispatchedContinuation.mjs.map
