import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineStart_DEFAULT_getInstance2bbgmtawlnkke as CoroutineStart_DEFAULT_getInstance } from './CoroutineStart.mjs';
import {
  newCoroutineContext2tdpc8c02iv5t as newCoroutineContext,
  newCoroutineContext1x74axajiiptk as newCoroutineContext_0,
  UndispatchedCoroutine1g5upie8aljdz as UndispatchedCoroutine,
} from './CoroutineContext.mjs';
import {
  ensureActive2yo7199srjlgl as ensureActive,
  Job29shfjfygy86k as Job,
} from './Job.mjs';
import { ScopeCoroutine2c07fgm3ekmnx as ScopeCoroutine } from './internal/Scopes.mjs';
import { startUndispatchedOrReturn1od7ryhr362dr as startUndispatchedOrReturn } from './intrinsics/Undispatched.mjs';
import { Key_instance17k9ki7fvysxq as Key_instance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/ContinuationInterceptor.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  startCoroutineCancellable3v5el961z6rj8 as startCoroutineCancellable,
  startCoroutineCancellable1tb4wrxetke45 as startCoroutineCancellable_0,
} from './intrinsics/Cancellable.mjs';
import { AbstractCoroutine2jzyhqo91sb0o as AbstractCoroutine } from './AbstractCoroutine.mjs';
import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from './CoroutineExceptionHandler.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  createCoroutineUnintercepted3gya308dmbbtg as createCoroutineUnintercepted,
  intercepted2ogpsikxxj4u0 as intercepted,
} from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { atomic$int$11d5swdyn6j0pu as atomic$int$1 } from '../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import {
  recoverResult92pymwoef8np as recoverResult,
  CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally,
} from './CompletionState.mjs';
import { resumeCancellableWith2mw849xp548hg as resumeCancellableWith } from './internal/DispatchedContinuation.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { unboxStateze7t12boxn2m as unboxState } from './JobSupport.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function launch(_this__u8e3s4, context, start, block) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
  var newContext = newCoroutineContext(_this__u8e3s4, context);
  var coroutine = start.y22() ? new (LazyStandaloneCoroutine())(newContext, block) : new (StandaloneCoroutine())(newContext, true);
  coroutine.k21(start, coroutine, block);
  return coroutine;
}
function withContext(context, block, $completion) {
  var tmp$ret$0;
  $l$block_0: {
    var oldContext = $completion.ld();
    var newContext = newCoroutineContext_0(oldContext, context);
    ensureActive(newContext);
    if (newContext === oldContext) {
      var coroutine = new (ScopeCoroutine())(newContext, $completion);
      tmp$ret$0 = startUndispatchedOrReturn(coroutine, coroutine, block);
      break $l$block_0;
    }
    if (equals(newContext.sd(Key_instance), oldContext.sd(Key_instance))) {
      var coroutine_0 = new (UndispatchedCoroutine())(newContext, $completion);
      // Inline function 'kotlinx.coroutines.withCoroutineContext' call
      coroutine_0.v20_1;
      tmp$ret$0 = startUndispatchedOrReturn(coroutine_0, coroutine_0, block);
      break $l$block_0;
    }
    var coroutine_1 = new (DispatchedCoroutine())(newContext, $completion);
    startCoroutineCancellable(block, coroutine_1, coroutine_1);
    tmp$ret$0 = coroutine_1.e23();
  }
  return tmp$ret$0;
}
function async(_this__u8e3s4, context, start, block) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
  var newContext = newCoroutineContext(_this__u8e3s4, context);
  var coroutine = start.y22() ? new (LazyDeferredCoroutine())(newContext, block) : new (DeferredCoroutine())(newContext, true);
  coroutine.k21(start, coroutine, block);
  return coroutine;
}
var StandaloneCoroutineClass;
function StandaloneCoroutine() {
  if (StandaloneCoroutineClass === VOID) {
    class $ extends AbstractCoroutine() {
      constructor(parentContext, active) {
        super(parentContext, true, active);
      }
      t22(exception) {
        handleCoroutineException(this.v20_1, exception);
        return true;
      }
    }
    initMetadataForClass($, 'StandaloneCoroutine', VOID, VOID, VOID, [0]);
    StandaloneCoroutineClass = $;
  }
  return StandaloneCoroutineClass;
}
var LazyStandaloneCoroutineClass;
function LazyStandaloneCoroutine() {
  if (LazyStandaloneCoroutineClass === VOID) {
    class $ extends StandaloneCoroutine() {
      constructor(parentContext, block) {
        super(parentContext, false);
        this.l23_1 = createCoroutineUnintercepted(block, this, this);
      }
      v21() {
        startCoroutineCancellable_0(this.l23_1, this);
      }
    }
    initMetadataForClass($, 'LazyStandaloneCoroutine', VOID, VOID, VOID, [0]);
    LazyStandaloneCoroutineClass = $;
  }
  return LazyStandaloneCoroutineClass;
}
function trySuspend($this) {
  // Inline function 'kotlinx.atomicfu.loop' call
  var this_0 = $this.d23_1;
  while (true) {
    switch (this_0.kotlinx$atomicfu$value) {
      case 0:
        if ($this.d23_1.atomicfu$compareAndSet(0, 1))
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
  var this_0 = $this.d23_1;
  while (true) {
    switch (this_0.kotlinx$atomicfu$value) {
      case 0:
        if ($this.d23_1.atomicfu$compareAndSet(0, 2))
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
var DispatchedCoroutineClass;
function DispatchedCoroutine() {
  if (DispatchedCoroutineClass === VOID) {
    class $ extends ScopeCoroutine() {
      constructor(context, uCont) {
        super(context, uCont);
        this.d23_1 = atomic$int$1(0);
      }
      h21(state) {
        this.g21(state);
      }
      g21(state) {
        if (tryResume(this))
          return Unit_instance;
        resumeCancellableWith(intercepted(this.p23_1), recoverResult(state, this.p23_1));
      }
      e23() {
        if (trySuspend(this))
          return get_COROUTINE_SUSPENDED();
        var state = unboxState(this.r21());
        if (state instanceof CompletedExceptionally())
          throw state.c21_1;
        return (state == null ? true : !(state == null)) ? state : THROW_CCE();
      }
    }
    initMetadataForClass($, 'DispatchedCoroutine', VOID, VOID, VOID, [0]);
    DispatchedCoroutineClass = $;
  }
  return DispatchedCoroutineClass;
}
var $awaitCOROUTINE$Class;
function $awaitCOROUTINE$() {
  if ($awaitCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.z23_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.z23_1.x22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return (suspendResult == null ? true : !(suspendResult == null)) ? suspendResult : THROW_CCE();
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $awaitCOROUTINE$Class = $;
  }
  return $awaitCOROUTINE$Class;
}
var DeferredCoroutineClass;
function DeferredCoroutine() {
  if (DeferredCoroutineClass === VOID) {
    class $ extends AbstractCoroutine() {
      constructor(parentContext, active) {
        super(parentContext, true, active);
      }
      d24() {
        var tmp = this.w22();
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      e24($completion) {
        var tmp = new ($awaitCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'DeferredCoroutine', VOID, VOID, [AbstractCoroutine(), Job()], [0]);
    DeferredCoroutineClass = $;
  }
  return DeferredCoroutineClass;
}
var LazyDeferredCoroutineClass;
function LazyDeferredCoroutine() {
  if (LazyDeferredCoroutineClass === VOID) {
    class $ extends DeferredCoroutine() {
      constructor(parentContext, block) {
        super(parentContext, false);
        this.i24_1 = createCoroutineUnintercepted(block, this, this);
      }
      v21() {
        startCoroutineCancellable_0(this.i24_1, this);
      }
    }
    initMetadataForClass($, 'LazyDeferredCoroutine', VOID, VOID, VOID, [0]);
    LazyDeferredCoroutineClass = $;
  }
  return LazyDeferredCoroutineClass;
}
//region block: exports
export {
  withContext as withContexte657h72vdbqn,
  async as asyncz02dsa2nb2zt,
  launch as launch1c91vkjzdi9sd,
};
//endregion

//# sourceMappingURL=Builders.common.mjs.map
