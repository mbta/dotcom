import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  LockFreeLinkedListHeaduwhs9comnpmn as LockFreeLinkedListHead,
  LockFreeLinkedListNode18403qmazubk5 as LockFreeLinkedListNode,
} from './internal/LinkedList.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
  anyToString3ho3k49fc56mj as anyToString,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  get_DEBUG1a8uv2i5oid01 as get_DEBUG,
  get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName,
  get_hexAddress1mxa7txdmiojm as get_hexAddress,
} from './Debug.mjs';
import {
  throwUninitializedPropertyAccessExceptionyynx7gkm73wd as throwUninitializedPropertyAccessException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally } from './CompletionState.mjs';
import { JobCancellationException2g3wpni5v5fkt as JobCancellationException } from './Exceptions.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { TimeoutCancellationException198b5zwr3v3uw as TimeoutCancellationException } from './Timeout.mjs';
import { identitySet1lu9dl60optk8 as identitySet } from './internal/Concurrent.mjs';
import { unwrap34f7x4f5snsxt as unwrap } from './internal/StackTraceRecovery.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import {
  NonDisposableHandle_instance3k5b81ogrgecy as NonDisposableHandle_instance,
  invokeOnCompletion3npqdfp2wzhn6 as invokeOnCompletion,
  ParentJob1a3idoswyjefg as ParentJob,
  Key_instance2tirv2rj82ml4 as Key_instance,
  invokeOnCompletion$default6tc1ee8hzqwd as invokeOnCompletion$default,
  ensureActive2yo7199srjlgl as ensureActive,
  cancel$default2gzemzkga6aea as cancel$default,
  Job29shfjfygy86k as Job,
} from './Job.mjs';
import { CompletionHandlerException1h8udyjlr1wky as CompletionHandlerException } from './Exceptions.common.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from './CancellableContinuationImpl.mjs';
import { disposeOnCancellation302lv5bib5mna as disposeOnCancellation } from './CancellableContinuation.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { SynchronizedObject32xqzf15iiskd as SynchronizedObject } from './internal/Synchronized.mjs';
import {
  atomic$boolean$1iggki4z65a2h as atomic$boolean$1,
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
} from '../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  SequenceScope1coiso86pqzq2 as SequenceScope,
  sequence2vgswtrxvqoa7 as sequence,
} from '../../../kotlin-kotlin-stdlib/kotlin/sequences/SequenceBuilder.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  plusolev77jfy5r9 as plus,
  get6d5x931vk0s as get,
  fold36i9psb7d5v48 as fold,
  minusKeyyqanvso9aovh as minusKey,
} from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { CompletableJob1w6swnu15iclo as CompletableJob } from './CompletableJob.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from './internal/Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_COMPLETING_ALREADY() {
  _init_properties_JobSupport_kt__68f172();
  return COMPLETING_ALREADY;
}
var COMPLETING_ALREADY;
function get_COMPLETING_WAITING_CHILDREN() {
  _init_properties_JobSupport_kt__68f172();
  return COMPLETING_WAITING_CHILDREN;
}
var COMPLETING_WAITING_CHILDREN;
function get_COMPLETING_RETRY() {
  _init_properties_JobSupport_kt__68f172();
  return COMPLETING_RETRY;
}
var COMPLETING_RETRY;
function get_TOO_LATE_TO_CANCEL() {
  _init_properties_JobSupport_kt__68f172();
  return TOO_LATE_TO_CANCEL;
}
var TOO_LATE_TO_CANCEL;
function get_SEALED() {
  _init_properties_JobSupport_kt__68f172();
  return SEALED;
}
var SEALED;
function get_EMPTY_NEW() {
  _init_properties_JobSupport_kt__68f172();
  return EMPTY_NEW;
}
var EMPTY_NEW;
function get_EMPTY_ACTIVE() {
  _init_properties_JobSupport_kt__68f172();
  return EMPTY_ACTIVE;
}
var EMPTY_ACTIVE;
var EmptyClass;
function Empty() {
  if (EmptyClass === VOID) {
    class $ {
      constructor(isActive) {
        this.b2a_1 = isActive;
      }
      x20() {
        return this.b2a_1;
      }
      o27() {
        return null;
      }
      toString() {
        return 'Empty{' + (this.b2a_1 ? 'Active' : 'New') + '}';
      }
    }
    initMetadataForClass($, 'Empty', VOID, VOID, [Incomplete()]);
    EmptyClass = $;
  }
  return EmptyClass;
}
var IncompleteClass;
function Incomplete() {
  if (IncompleteClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Incomplete');
    IncompleteClass = $;
  }
  return IncompleteClass;
}
var NodeListClass;
function NodeList() {
  if (NodeListClass === VOID) {
    class $ extends LockFreeLinkedListHead() {
      x20() {
        return true;
      }
      o27() {
        return this;
      }
      f2a(state) {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        this_0.hc('List{');
        this_0.hc(state);
        this_0.hc('}[');
        var first = true;
        // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
        var cur = this.p27_1;
        while (!equals(cur, this)) {
          var node = cur;
          if (node instanceof JobNode()) {
            if (first) {
              first = false;
            } else
              this_0.hc(', ');
            this_0.gc(node);
          }
          cur = cur.p27_1;
        }
        this_0.hc(']');
        return this_0.toString();
      }
      toString() {
        return get_DEBUG() ? this.f2a('Active') : super.toString();
      }
    }
    initMetadataForClass($, 'NodeList', NodeList, VOID, [LockFreeLinkedListHead(), Incomplete()]);
    NodeListClass = $;
  }
  return NodeListClass;
}
var JobNodeClass;
function JobNode() {
  if (JobNodeClass === VOID) {
    class $ extends LockFreeLinkedListNode() {
      n27() {
        var tmp = this.m27_1;
        if (!(tmp == null))
          return tmp;
        else {
          throwUninitializedPropertyAccessException('job');
        }
      }
      x20() {
        return true;
      }
      o27() {
        return null;
      }
      z24() {
        return this.n27().e22(this);
      }
      toString() {
        return get_classSimpleName(this) + '@' + get_hexAddress(this) + '[job@' + get_hexAddress(this.n27()) + ']';
      }
    }
    initMetadataForClass($, 'JobNode', VOID, VOID, [LockFreeLinkedListNode(), Incomplete()]);
    JobNodeClass = $;
  }
  return JobNodeClass;
}
function _set_exceptionsHolder__tqm22h($this, value) {
  $this.k2a_1.kotlinx$atomicfu$value = value;
}
function _get_exceptionsHolder__nhszp($this) {
  return $this.k2a_1.kotlinx$atomicfu$value;
}
function allocateList($this) {
  return ArrayList().w(4);
}
function finalizeFinishingState($this, state, proposedUpdate) {
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
  var tmp0_safe_receiver = proposedUpdate instanceof CompletedExceptionally() ? proposedUpdate : null;
  var proposedException = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c21_1;
  var wasCancelling;
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  wasCancelling = state.l2a();
  var exceptions = state.m2a(proposedException);
  var finalCause = getFinalRootCause($this, state, exceptions);
  if (!(finalCause == null)) {
    addSuppressedExceptions($this, finalCause, exceptions);
  }
  var finalException = finalCause;
  var finalState = finalException == null ? proposedUpdate : finalException === proposedException ? proposedUpdate : new (CompletedExceptionally())(finalException);
  if (!(finalException == null)) {
    var handled = cancelParent($this, finalException) || $this.t22(finalException);
    if (handled) {
      (finalState instanceof CompletedExceptionally() ? finalState : THROW_CCE()).c26();
    }
  }
  if (!wasCancelling) {
    $this.q22(finalException);
  }
  $this.b21(finalState);
  var casSuccess = $this.q20_1.atomicfu$compareAndSet(state, boxIncomplete(finalState));
  // Inline function 'kotlinx.coroutines.assert' call
  completeStateFinalization($this, state, finalState);
  return finalState;
}
function getFinalRootCause($this, state, exceptions) {
  if (exceptions.h1()) {
    if (state.l2a()) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      return JobCancellationException().t2a(null == null ? $this.a21() : null, null, $this);
    }
    return null;
  }
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = exceptions.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (!(element instanceof CancellationException())) {
        tmp$ret$2 = element;
        break $l$block;
      }
    }
    tmp$ret$2 = null;
  }
  var firstNonCancellation = tmp$ret$2;
  if (!(firstNonCancellation == null))
    return firstNonCancellation;
  var first = exceptions.e1(0);
  if (first instanceof TimeoutCancellationException()) {
    var tmp$ret$4;
    $l$block_0: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s_0 = exceptions.x();
      while (_iterator__ex2g4s_0.y()) {
        var element_0 = _iterator__ex2g4s_0.z();
        var tmp;
        if (!(element_0 === first)) {
          tmp = element_0 instanceof TimeoutCancellationException();
        } else {
          tmp = false;
        }
        if (tmp) {
          tmp$ret$4 = element_0;
          break $l$block_0;
        }
      }
      tmp$ret$4 = null;
    }
    var detailedTimeoutException = tmp$ret$4;
    if (!(detailedTimeoutException == null))
      return detailedTimeoutException;
  }
  return first;
}
function addSuppressedExceptions($this, rootCause, exceptions) {
  if (exceptions.c1() <= 1)
    return Unit_instance;
  var seenExceptions = identitySet(exceptions.c1());
  var unwrappedCause = unwrap(rootCause);
  var _iterator__ex2g4s = exceptions.x();
  while (_iterator__ex2g4s.y()) {
    var exception = _iterator__ex2g4s.z();
    var unwrapped = unwrap(exception);
    var tmp;
    var tmp_0;
    if (!(unwrapped === rootCause) && !(unwrapped === unwrappedCause)) {
      tmp_0 = !(unwrapped instanceof CancellationException());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = seenExceptions.i(unwrapped);
    } else {
      tmp = false;
    }
    if (tmp) {
      addSuppressed(rootCause, unwrapped);
    }
  }
}
function tryFinalizeSimpleState($this, state, update) {
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
  if (!$this.q20_1.atomicfu$compareAndSet(state, boxIncomplete(update)))
    return false;
  $this.q22(null);
  $this.b21(update);
  completeStateFinalization($this, state, update);
  return true;
}
function completeStateFinalization($this, state, update) {
  var tmp0_safe_receiver = $this.p21();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    tmp0_safe_receiver.z24();
    $this.o21(NonDisposableHandle_instance);
  }
  var tmp1_safe_receiver = update instanceof CompletedExceptionally() ? update : null;
  var cause = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.c21_1;
  if (state instanceof JobNode()) {
    try {
      state.y24(cause);
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        $this.i21(CompletionHandlerException().t25('Exception in completion handler ' + state.toString() + ' for ' + $this.toString(), ex));
      } else {
        throw $p;
      }
    }
  } else {
    var tmp2_safe_receiver = state.o27();
    if (tmp2_safe_receiver == null)
      null;
    else {
      notifyCompletion($this, tmp2_safe_receiver, cause);
    }
  }
}
function notifyCancelling($this, list, cause) {
  $this.q22(cause);
  list.g2a(4);
  // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers' call
  var exception = null;
  // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
  var cur = list.p27_1;
  while (!equals(cur, list)) {
    var node = cur;
    var tmp;
    if (node instanceof JobNode()) {
      tmp = node.i27();
    } else {
      tmp = false;
    }
    if (tmp) {
      try {
        node.y24(cause);
      } catch ($p) {
        if ($p instanceof Error) {
          var ex = $p;
          var tmp0_safe_receiver = exception;
          var tmp_0;
          if (tmp0_safe_receiver == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.apply' call
            addSuppressed(tmp0_safe_receiver, ex);
            tmp_0 = tmp0_safe_receiver;
          }
          if (tmp_0 == null) {
            // Inline function 'kotlin.run' call
            exception = CompletionHandlerException().t25('Exception in completion handler ' + node.toString() + ' for ' + $this.toString(), ex);
          }
        } else {
          throw $p;
        }
      }
    }
    cur = cur.p27_1;
  }
  var tmp0_safe_receiver_0 = exception;
  if (tmp0_safe_receiver_0 == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    $this.i21(tmp0_safe_receiver_0);
  }
  cancelParent($this, cause);
}
function cancelParent($this, cause) {
  if ($this.r22())
    return true;
  var isCancellation = cause instanceof CancellationException();
  var parent = $this.p21();
  if (parent === null || parent === NonDisposableHandle_instance) {
    return isCancellation;
  }
  return parent.k22(cause) || isCancellation;
}
function notifyCompletion($this, _this__u8e3s4, cause) {
  _this__u8e3s4.g2a(1);
  // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers' call
  var exception = null;
  // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListHead.forEach' call
  var cur = _this__u8e3s4.p27_1;
  while (!equals(cur, _this__u8e3s4)) {
    var node = cur;
    var tmp;
    if (node instanceof JobNode()) {
      tmp = true;
    } else {
      tmp = false;
    }
    if (tmp) {
      try {
        node.y24(cause);
      } catch ($p) {
        if ($p instanceof Error) {
          var ex = $p;
          var tmp0_safe_receiver = exception;
          var tmp_0;
          if (tmp0_safe_receiver == null) {
            tmp_0 = null;
          } else {
            // Inline function 'kotlin.apply' call
            addSuppressed(tmp0_safe_receiver, ex);
            tmp_0 = tmp0_safe_receiver;
          }
          if (tmp_0 == null) {
            // Inline function 'kotlin.run' call
            exception = CompletionHandlerException().t25('Exception in completion handler ' + node.toString() + ' for ' + $this.toString(), ex);
          }
        } else {
          throw $p;
        }
      }
    }
    cur = cur.p27_1;
  }
  var tmp0_safe_receiver_0 = exception;
  if (tmp0_safe_receiver_0 == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    $this.i21(tmp0_safe_receiver_0);
  }
}
function startInternal($this, state) {
  if (state instanceof Empty()) {
    if (state.b2a_1)
      return 0;
    if (!$this.q20_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
      return -1;
    $this.v21();
    return 1;
  } else {
    if (state instanceof InactiveNodeList()) {
      if (!$this.q20_1.atomicfu$compareAndSet(state, state.u2a_1))
        return -1;
      $this.v21();
      return 1;
    } else {
      return 0;
    }
  }
}
function promoteEmptyToNodeList($this, state) {
  var list = new (NodeList())();
  var update = state.b2a_1 ? list : new (InactiveNodeList())(list);
  $this.q20_1.atomicfu$compareAndSet(state, update);
}
function promoteSingleToNodeList($this, state) {
  state.u27(new (NodeList())());
  // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.nextNode' call
  var list = state.p27_1;
  $this.q20_1.atomicfu$compareAndSet(state, list);
}
function joinInternal($this) {
  // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
  while (true) {
    var state = $this.r21();
    if (!(!(state == null) ? isInterface(state, Incomplete()) : false))
      return false;
    if (startInternal($this, state) >= 0)
      return true;
  }
}
function joinSuspend($this, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  disposeOnCancellation(cancellable, invokeOnCompletion($this, VOID, new (ResumeOnCompletion())(cancellable)));
  return cancellable.e23();
}
function cancelMakeCompleting($this, cause) {
  // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
  while (true) {
    var state = $this.r21();
    var tmp;
    if (!(!(state == null) ? isInterface(state, Incomplete()) : false)) {
      tmp = true;
    } else {
      var tmp_0;
      if (state instanceof Finishing()) {
        tmp_0 = state.v2a();
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    if (tmp) {
      return get_COMPLETING_ALREADY();
    }
    var proposedUpdate = new (CompletedExceptionally())(createCauseException($this, cause));
    var finalState = tryMakeCompleting($this, state, proposedUpdate);
    if (!(finalState === get_COMPLETING_RETRY()))
      return finalState;
  }
}
function createCauseException($this, cause) {
  var tmp;
  if (cause == null ? true : cause instanceof Error) {
    var tmp_0;
    if (cause == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp_0 = JobCancellationException().t2a(null == null ? $this.a21() : null, null, $this);
    } else {
      tmp_0 = cause;
    }
    tmp = tmp_0;
  } else {
    tmp = ((!(cause == null) ? isInterface(cause, ParentJob()) : false) ? cause : THROW_CCE()).n22();
  }
  return tmp;
}
function makeCancelling($this, cause) {
  var causeExceptionCache = null;
  // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
  while (true) {
    var tmp0 = $this.r21();
    $l$block: {
      if (tmp0 instanceof Finishing()) {
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        if (tmp0.w2a())
          return get_TOO_LATE_TO_CANCEL();
        var wasCancelling = tmp0.l2a();
        if (!(cause == null) || !wasCancelling) {
          var tmp0_elvis_lhs = causeExceptionCache;
          var tmp;
          if (tmp0_elvis_lhs == null) {
            // Inline function 'kotlin.also' call
            var this_0 = createCauseException($this, cause);
            causeExceptionCache = this_0;
            tmp = this_0;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var causeException = tmp;
          tmp0.x2a(causeException);
        }
        // Inline function 'kotlin.takeIf' call
        var this_1 = tmp0.y2a();
        var tmp_0;
        if (!wasCancelling) {
          tmp_0 = this_1;
        } else {
          tmp_0 = null;
        }
        var notifyRootCause = tmp_0;
        if (notifyRootCause == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          notifyCancelling($this, tmp0.h2a_1, notifyRootCause);
        }
        return get_COMPLETING_ALREADY();
      } else {
        if (!(tmp0 == null) ? isInterface(tmp0, Incomplete()) : false) {
          var tmp2_elvis_lhs = causeExceptionCache;
          var tmp_1;
          if (tmp2_elvis_lhs == null) {
            // Inline function 'kotlin.also' call
            var this_2 = createCauseException($this, cause);
            causeExceptionCache = this_2;
            tmp_1 = this_2;
          } else {
            tmp_1 = tmp2_elvis_lhs;
          }
          var causeException_0 = tmp_1;
          if (tmp0.x20()) {
            if (tryMakeCancelling($this, tmp0, causeException_0))
              return get_COMPLETING_ALREADY();
          } else {
            var finalState = tryMakeCompleting($this, tmp0, new (CompletedExceptionally())(causeException_0));
            if (finalState === get_COMPLETING_ALREADY()) {
              // Inline function 'kotlin.error' call
              var message = 'Cannot happen in ' + toString(tmp0);
              throw IllegalStateException().o5(toString(message));
            } else if (finalState === get_COMPLETING_RETRY()) {
              break $l$block;
            } else
              return finalState;
          }
        } else {
          return get_TOO_LATE_TO_CANCEL();
        }
      }
    }
  }
}
function getOrPromoteCancellingList($this, state) {
  var tmp0_elvis_lhs = state.o27();
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var tmp_0;
    if (state instanceof Empty()) {
      tmp_0 = new (NodeList())();
    } else {
      if (state instanceof JobNode()) {
        promoteSingleToNodeList($this, state);
        tmp_0 = null;
      } else {
        var message = 'State should have list: ' + toString(state);
        throw IllegalStateException().o5(toString(message));
      }
    }
    tmp = tmp_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function tryMakeCancelling($this, state, rootCause) {
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
  var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var list = tmp;
  var cancelling = new (Finishing())(list, false, rootCause);
  if (!$this.q20_1.atomicfu$compareAndSet(state, cancelling))
    return false;
  notifyCancelling($this, list, rootCause);
  return true;
}
function tryMakeCompleting($this, state, proposedUpdate) {
  if (!(!(state == null) ? isInterface(state, Incomplete()) : false))
    return get_COMPLETING_ALREADY();
  var tmp;
  var tmp_0;
  var tmp_1;
  if (state instanceof Empty()) {
    tmp_1 = true;
  } else {
    tmp_1 = state instanceof JobNode();
  }
  if (tmp_1) {
    tmp_0 = !(state instanceof ChildHandleNode());
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = !(proposedUpdate instanceof CompletedExceptionally());
  } else {
    tmp = false;
  }
  if (tmp) {
    if (tryFinalizeSimpleState($this, state, proposedUpdate)) {
      return proposedUpdate;
    }
    return get_COMPLETING_RETRY();
  }
  return tryMakeCompletingSlowPath($this, state, proposedUpdate);
}
function tryMakeCompletingSlowPath($this, state, proposedUpdate) {
  var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return get_COMPLETING_RETRY();
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var list = tmp;
  var tmp1_elvis_lhs = state instanceof Finishing() ? state : null;
  var finishing = tmp1_elvis_lhs == null ? new (Finishing())(list, false, null) : tmp1_elvis_lhs;
  var notifyRootCause;
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  if (finishing.v2a())
    return get_COMPLETING_ALREADY();
  finishing.z2a(true);
  if (!(finishing === state)) {
    if (!$this.q20_1.atomicfu$compareAndSet(state, finishing))
      return get_COMPLETING_RETRY();
  }
  // Inline function 'kotlinx.coroutines.assert' call
  var wasCancelling = finishing.l2a();
  var tmp0_safe_receiver = proposedUpdate instanceof CompletedExceptionally() ? proposedUpdate : null;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    finishing.x2a(tmp0_safe_receiver.c21_1);
  }
  // Inline function 'kotlin.takeIf' call
  var this_0 = finishing.y2a();
  var tmp_0;
  if (!wasCancelling) {
    tmp_0 = this_0;
  } else {
    tmp_0 = null;
  }
  notifyRootCause = tmp_0;
  if (notifyRootCause == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    notifyCancelling($this, list, notifyRootCause);
  }
  var child = nextChild($this, list);
  if (!(child == null) && tryWaitForChild($this, finishing, child, proposedUpdate))
    return get_COMPLETING_WAITING_CHILDREN();
  list.g2a(2);
  var anotherChild = nextChild($this, list);
  if (!(anotherChild == null) && tryWaitForChild($this, finishing, anotherChild, proposedUpdate))
    return get_COMPLETING_WAITING_CHILDREN();
  return finalizeFinishingState($this, finishing, proposedUpdate);
}
function _get_exceptionOrNull__b3j7js($this, _this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4 instanceof CompletedExceptionally() ? _this__u8e3s4 : null;
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c21_1;
}
function tryWaitForChild($this, state, child, proposedUpdate) {
  var $this_0 = $this;
  var state_0 = state;
  var child_0 = child;
  var proposedUpdate_0 = proposedUpdate;
  $l$1: do {
    $l$0: do {
      var handle = invokeOnCompletion(child_0.e2b_1, false, new (ChildCompletion())($this_0, state_0, child_0, proposedUpdate_0));
      if (!(handle === NonDisposableHandle_instance))
        return true;
      var tmp0_elvis_lhs = nextChild($this_0, child_0);
      var tmp;
      if (tmp0_elvis_lhs == null) {
        return false;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var nextChild_0 = tmp;
      var tmp0 = $this_0;
      var tmp1 = state_0;
      var tmp3 = proposedUpdate_0;
      $this_0 = tmp0;
      state_0 = tmp1;
      child_0 = nextChild_0;
      proposedUpdate_0 = tmp3;
      continue $l$0;
    }
     while (false);
  }
   while (true);
}
function continueCompleting($this, state, lastChild, proposedUpdate) {
  // Inline function 'kotlinx.coroutines.assert' call
  var waitChild = nextChild($this, lastChild);
  if (!(waitChild == null) && tryWaitForChild($this, state, waitChild, proposedUpdate))
    return Unit_instance;
  state.h2a_1.g2a(2);
  var waitChildAgain = nextChild($this, lastChild);
  if (!(waitChildAgain == null) && tryWaitForChild($this, state, waitChildAgain, proposedUpdate)) {
    return Unit_instance;
  }
  var finalState = finalizeFinishingState($this, state, proposedUpdate);
  $this.h21(finalState);
}
function nextChild($this, _this__u8e3s4) {
  var cur = _this__u8e3s4;
  $l$loop: while (true) {
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.isRemoved' call
    if (!cur.r27_1) {
      break $l$loop;
    }
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.prevNode' call
    cur = cur.q27_1;
  }
  $l$loop_0: while (true) {
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.nextNode' call
    cur = cur.p27_1;
    // Inline function 'kotlinx.coroutines.internal.LockFreeLinkedListNode.isRemoved' call
    if (cur.r27_1)
      continue $l$loop_0;
    if (cur instanceof ChildHandleNode())
      return cur;
    if (cur instanceof NodeList())
      return null;
  }
}
function stateString($this, state) {
  var tmp;
  if (state instanceof Finishing()) {
    tmp = state.l2a() ? 'Cancelling' : state.v2a() ? 'Completing' : 'Active';
  } else {
    if (!(state == null) ? isInterface(state, Incomplete()) : false) {
      tmp = state.x20() ? 'Active' : 'New';
    } else {
      if (state instanceof CompletedExceptionally()) {
        tmp = 'Cancelled';
      } else {
        tmp = 'Completed';
      }
    }
  }
  return tmp;
}
var FinishingClass;
function Finishing() {
  if (FinishingClass === VOID) {
    class $ extends SynchronizedObject() {
      constructor(list, isCompleting, rootCause) {
        super();
        this.h2a_1 = list;
        this.i2a_1 = atomic$boolean$1(isCompleting);
        this.j2a_1 = atomic$ref$1(rootCause);
        this.k2a_1 = atomic$ref$1(null);
      }
      o27() {
        return this.h2a_1;
      }
      z2a(value) {
        this.i2a_1.kotlinx$atomicfu$value = value;
      }
      v2a() {
        return this.i2a_1.kotlinx$atomicfu$value;
      }
      f2b(value) {
        this.j2a_1.kotlinx$atomicfu$value = value;
      }
      y2a() {
        return this.j2a_1.kotlinx$atomicfu$value;
      }
      w2a() {
        return _get_exceptionsHolder__nhszp(this) === get_SEALED();
      }
      l2a() {
        return !(this.y2a() == null);
      }
      x20() {
        return this.y2a() == null;
      }
      m2a(proposedException) {
        var eh = _get_exceptionsHolder__nhszp(this);
        var tmp;
        if (eh == null) {
          tmp = allocateList(this);
        } else {
          if (eh instanceof Error) {
            // Inline function 'kotlin.also' call
            var this_0 = allocateList(this);
            this_0.i(eh);
            tmp = this_0;
          } else {
            if (eh instanceof ArrayList()) {
              tmp = eh instanceof ArrayList() ? eh : THROW_CCE();
            } else {
              var message = 'State is ' + toString_0(eh);
              throw IllegalStateException().o5(toString(message));
            }
          }
        }
        var list = tmp;
        var rootCause = this.y2a();
        if (rootCause == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          list.r3(0, rootCause);
        }
        if (!(proposedException == null) && !equals(proposedException, rootCause)) {
          list.i(proposedException);
        }
        _set_exceptionsHolder__tqm22h(this, get_SEALED());
        return list;
      }
      x2a(exception) {
        var rootCause = this.y2a();
        if (rootCause == null) {
          this.f2b(exception);
          return Unit_instance;
        }
        if (exception === rootCause)
          return Unit_instance;
        var eh = _get_exceptionsHolder__nhszp(this);
        if (eh == null) {
          _set_exceptionsHolder__tqm22h(this, exception);
        } else {
          if (eh instanceof Error) {
            if (exception === eh)
              return Unit_instance;
            // Inline function 'kotlin.apply' call
            var this_0 = allocateList(this);
            this_0.i(eh);
            this_0.i(exception);
            _set_exceptionsHolder__tqm22h(this, this_0);
          } else {
            if (eh instanceof ArrayList()) {
              (eh instanceof ArrayList() ? eh : THROW_CCE()).i(exception);
            } else {
              // Inline function 'kotlin.error' call
              var message = 'State is ' + toString_0(eh);
              throw IllegalStateException().o5(toString(message));
            }
          }
        }
      }
      toString() {
        return 'Finishing[cancelling=' + this.l2a() + ', completing=' + this.v2a() + ', rootCause=' + toString_0(this.y2a()) + ', exceptions=' + toString_0(_get_exceptionsHolder__nhszp(this)) + ', list=' + this.h2a_1.toString() + ']';
      }
    }
    initMetadataForClass($, 'Finishing', VOID, VOID, [SynchronizedObject(), Incomplete()]);
    FinishingClass = $;
  }
  return FinishingClass;
}
var ChildCompletionClass;
function ChildCompletion() {
  if (ChildCompletionClass === VOID) {
    class $ extends JobNode() {
      constructor(parent, state, child, proposedUpdate) {
        super();
        this.k2b_1 = parent;
        this.l2b_1 = state;
        this.m2b_1 = child;
        this.n2b_1 = proposedUpdate;
      }
      i27() {
        return false;
      }
      y24(cause) {
        continueCompleting(this.k2b_1, this.l2b_1, this.m2b_1, this.n2b_1);
      }
    }
    initMetadataForClass($, 'ChildCompletion');
    ChildCompletionClass = $;
  }
  return ChildCompletionClass;
}
var AwaitContinuationClass;
function AwaitContinuation() {
  if (AwaitContinuationClass === VOID) {
    class $ extends CancellableContinuationImpl() {
      constructor(delegate, job) {
        super(delegate, 1);
        this.u2b_1 = job;
      }
      l26(parent) {
        var state = this.u2b_1.r21();
        if (state instanceof Finishing()) {
          var tmp0_safe_receiver = state.y2a();
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            return tmp0_safe_receiver;
          }
        }
        if (state instanceof CompletedExceptionally())
          return state.c21_1;
        return parent.w21();
      }
      y26() {
        return 'AwaitContinuation';
      }
    }
    initMetadataForClass($, 'AwaitContinuation');
    AwaitContinuationClass = $;
  }
  return AwaitContinuationClass;
}
function awaitSuspend($this, $completion) {
  var cont = new (AwaitContinuation())(intercepted($completion), $this);
  cont.f26();
  disposeOnCancellation(cont, invokeOnCompletion($this, VOID, new (ResumeAwaitOnCompletion())(cont)));
  return cont.e23();
}
var JobSupport$_get_children_$slambda_k839f8Class;
function JobSupport$_get_children_$slambda_k839f8() {
  if (JobSupport$_get_children_$slambda_k839f8Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.d2c_1 = this$0;
        super(resultContinuation, $box);
      }
      r2c($this$sequence, $completion) {
        var tmp = this.s2c($this$sequence, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r2c(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 8;
                this.f2c_1 = this.d2c_1.r21();
                var tmp_0 = this.f2c_1;
                if (tmp_0 instanceof ChildHandleNode()) {
                  this.fd_1 = 6;
                  suspendResult = this.e2c_1.so(this.f2c_1.e2b_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_1 = this.f2c_1;
                  if (!(tmp_1 == null) ? isInterface(tmp_1, Incomplete()) : false) {
                    this.g2c_1 = this.f2c_1.o27();
                    if (this.g2c_1 == null) {
                      this.h2c_1 = null;
                      this.fd_1 = 5;
                      continue $sm;
                    } else {
                      var tmp_2 = this;
                      tmp_2.i2c_1 = this.g2c_1;
                      this.j2c_1 = this.i2c_1;
                      var tmp_3 = this;
                      tmp_3.k2c_1 = this.j2c_1;
                      this.l2c_1 = this.k2c_1;
                      var tmp_4 = this;
                      tmp_4.m2c_1 = this.l2c_1;
                      this.n2c_1 = this.m2c_1;
                      this.o2c_1 = this.n2c_1.p27_1;
                      this.fd_1 = 1;
                      continue $sm;
                    }
                  } else {
                    this.fd_1 = 7;
                    continue $sm;
                  }
                }

              case 1:
                if (!!equals(this.o2c_1, this.n2c_1)) {
                  this.fd_1 = 4;
                  continue $sm;
                }

                var tmp_5 = this;
                tmp_5.p2c_1 = this.o2c_1;
                this.q2c_1 = this.p2c_1;
                var tmp_6 = this.q2c_1;
                if (tmp_6 instanceof ChildHandleNode()) {
                  this.fd_1 = 2;
                  suspendResult = this.e2c_1.so(this.q2c_1.e2b_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.o2c_1 = this.o2c_1.p27_1;
                this.fd_1 = 1;
                continue $sm;
              case 4:
                var tmp_7 = this;
                tmp_7.h2c_1 = Unit_instance;
                this.fd_1 = 5;
                continue $sm;
              case 5:
                this.fd_1 = 7;
                continue $sm;
              case 6:
                this.fd_1 = 7;
                continue $sm;
              case 7:
                return Unit_instance;
              case 8:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 8) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      s2c($this$sequence, completion) {
        var i = new (JobSupport$_get_children_$slambda_k839f8())(this.d2c_1, completion);
        i.e2c_1 = $this$sequence;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    JobSupport$_get_children_$slambda_k839f8Class = $;
  }
  return JobSupport$_get_children_$slambda_k839f8Class;
}
function JobSupport$_get_children_$slambda_k839f8_0(this$0, resultContinuation) {
  var i = new (JobSupport$_get_children_$slambda_k839f8())(this$0, resultContinuation);
  var l = function ($this$sequence, $completion) {
    return i.r2c($this$sequence, $completion);
  };
  l.$arity = 1;
  return l;
}
var JobSupportClass;
function JobSupport() {
  if (JobSupportClass === VOID) {
    class $ {
      constructor(active) {
        this.q20_1 = atomic$ref$1(active ? get_EMPTY_ACTIVE() : get_EMPTY_NEW());
        this.r20_1 = atomic$ref$1(null);
      }
      u1() {
        return Key_instance;
      }
      o21(value) {
        this.r20_1.kotlinx$atomicfu$value = value;
      }
      p21() {
        return this.r20_1.kotlinx$atomicfu$value;
      }
      q21() {
        var tmp0_safe_receiver = this.p21();
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q21();
      }
      s20(parent) {
        // Inline function 'kotlinx.coroutines.assert' call
        if (parent == null) {
          this.o21(NonDisposableHandle_instance);
          return Unit_instance;
        }
        parent.u21();
        var handle = parent.p22(this);
        this.o21(handle);
        if (this.s21()) {
          handle.z24();
          this.o21(NonDisposableHandle_instance);
        }
      }
      r21() {
        return this.q20_1.kotlinx$atomicfu$value;
      }
      x20() {
        var state = this.r21();
        var tmp;
        if (!(state == null) ? isInterface(state, Incomplete()) : false) {
          tmp = state.x20();
        } else {
          tmp = false;
        }
        return tmp;
      }
      s21() {
        var tmp = this.r21();
        return !(!(tmp == null) ? isInterface(tmp, Incomplete()) : false);
      }
      t21() {
        var state = this.r21();
        var tmp;
        if (state instanceof CompletedExceptionally()) {
          tmp = true;
        } else {
          var tmp_0;
          if (state instanceof Finishing()) {
            tmp_0 = state.l2a();
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      u21() {
        // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
        while (true) {
          var state = this.r21();
          var tmp0_subject = startInternal(this, state);
          if (tmp0_subject === 0)
            return false;
          else if (tmp0_subject === 1)
            return true;
        }
      }
      v21() {
      }
      w21() {
        var state = this.r21();
        var tmp;
        if (state instanceof Finishing()) {
          var tmp0_safe_receiver = state.y2a();
          var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : this.x21(tmp0_safe_receiver, get_classSimpleName(this) + ' is cancelling');
          var tmp_0;
          if (tmp1_elvis_lhs == null) {
            var message = 'Job is still new or active: ' + this.toString();
            throw IllegalStateException().o5(toString(message));
          } else {
            tmp_0 = tmp1_elvis_lhs;
          }
          tmp = tmp_0;
        } else {
          if (!(state == null) ? isInterface(state, Incomplete()) : false) {
            var message_0 = 'Job is still new or active: ' + this.toString();
            throw IllegalStateException().o5(toString(message_0));
          } else {
            if (state instanceof CompletedExceptionally()) {
              tmp = this.y21(state.c21_1);
            } else {
              tmp = JobCancellationException().t2a(get_classSimpleName(this) + ' has completed normally', null, this);
            }
          }
        }
        return tmp;
      }
      x21(_this__u8e3s4, message) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof CancellationException() ? _this__u8e3s4 : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
          tmp = JobCancellationException().t2a(message == null ? this.a21() : message, _this__u8e3s4, this);
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      y21(_this__u8e3s4, message, $super) {
        message = message === VOID ? null : message;
        return $super === VOID ? this.x21(_this__u8e3s4, message) : $super.x21.call(this, _this__u8e3s4, message);
      }
      z21(handler) {
        return this.c22(true, new (InvokeOnCompletion())(handler));
      }
      a22(onCancelling, invokeImmediately, handler) {
        var tmp;
        if (onCancelling) {
          tmp = new (InvokeOnCancelling())(handler);
        } else {
          tmp = new (InvokeOnCompletion())(handler);
        }
        return this.c22(invokeImmediately, tmp);
      }
      c22(invokeImmediately, node) {
        node.m27_1 = this;
        var tmp$ret$0;
        $l$block_1: {
          // Inline function 'kotlinx.coroutines.JobSupport.tryPutNodeIntoList' call
          // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
          while (true) {
            var state = this.r21();
            if (state instanceof Empty()) {
              if (state.b2a_1) {
                if (this.q20_1.atomicfu$compareAndSet(state, node)) {
                  tmp$ret$0 = true;
                  break $l$block_1;
                }
              } else {
                promoteEmptyToNodeList(this, state);
              }
            } else {
              if (!(state == null) ? isInterface(state, Incomplete()) : false) {
                var list = state.o27();
                if (list == null) {
                  promoteSingleToNodeList(this, state instanceof JobNode() ? state : THROW_CCE());
                } else {
                  var tmp;
                  if (node.i27()) {
                    var tmp0_safe_receiver = state instanceof Finishing() ? state : null;
                    var rootCause = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y2a();
                    var tmp_0;
                    if (rootCause == null) {
                      tmp_0 = list.s27(node, 5);
                    } else {
                      if (invokeImmediately) {
                        node.y24(rootCause);
                      }
                      return NonDisposableHandle_instance;
                    }
                    tmp = tmp_0;
                  } else {
                    tmp = list.s27(node, 1);
                  }
                  if (tmp) {
                    tmp$ret$0 = true;
                    break $l$block_1;
                  }
                }
              } else {
                tmp$ret$0 = false;
                break $l$block_1;
              }
            }
          }
        }
        var added = tmp$ret$0;
        if (added)
          return node;
        else if (invokeImmediately) {
          var tmp_1 = this.r21();
          var tmp0_safe_receiver_0 = tmp_1 instanceof CompletedExceptionally() ? tmp_1 : null;
          node.y24(tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.c21_1);
        }
        return NonDisposableHandle_instance;
      }
      d22($completion) {
        if (!joinInternal(this)) {
          // Inline function 'kotlin.js.getCoroutineContext' call
          var tmp$ret$0 = $completion.ld();
          ensureActive(tmp$ret$0);
          return Unit_instance;
        }
        return joinSuspend(this, $completion);
      }
      e22(node) {
        // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
        while (true) {
          var state = this.r21();
          if (state instanceof JobNode()) {
            if (!(state === node))
              return Unit_instance;
            if (this.q20_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
              return Unit_instance;
          } else {
            if (!(state == null) ? isInterface(state, Incomplete()) : false) {
              if (!(state.o27() == null)) {
                node.t27();
              }
              return Unit_instance;
            } else {
              return Unit_instance;
            }
          }
        }
      }
      f22() {
        return false;
      }
      g22(cause) {
        var tmp;
        if (cause == null) {
          // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
          tmp = JobCancellationException().t2a(null == null ? this.a21() : null, null, this);
        } else {
          tmp = cause;
        }
        this.i22(tmp);
      }
      a21() {
        return 'Job was cancelled';
      }
      i22(cause) {
        this.m22(cause);
      }
      j22(parentJob) {
        this.m22(parentJob);
      }
      k22(cause) {
        if (cause instanceof CancellationException())
          return true;
        return this.m22(cause) && this.s22();
      }
      l22(cause) {
        return this.m22(cause);
      }
      m22(cause) {
        var finalState = get_COMPLETING_ALREADY();
        if (this.f22()) {
          finalState = cancelMakeCompleting(this, cause);
          if (finalState === get_COMPLETING_WAITING_CHILDREN())
            return true;
        }
        if (finalState === get_COMPLETING_ALREADY()) {
          finalState = makeCancelling(this, cause);
        }
        var tmp;
        if (finalState === get_COMPLETING_ALREADY()) {
          tmp = true;
        } else if (finalState === get_COMPLETING_WAITING_CHILDREN()) {
          tmp = true;
        } else if (finalState === get_TOO_LATE_TO_CANCEL()) {
          tmp = false;
        } else {
          this.h21(finalState);
          tmp = true;
        }
        return tmp;
      }
      n22() {
        var state = this.r21();
        var tmp;
        if (state instanceof Finishing()) {
          tmp = state.y2a();
        } else {
          if (state instanceof CompletedExceptionally()) {
            tmp = state.c21_1;
          } else {
            if (!(state == null) ? isInterface(state, Incomplete()) : false) {
              var message = 'Cannot be cancelling child in this state: ' + toString(state);
              throw IllegalStateException().o5(toString(message));
            } else {
              tmp = null;
            }
          }
        }
        var rootCause = tmp;
        var tmp1_elvis_lhs = rootCause instanceof CancellationException() ? rootCause : null;
        return tmp1_elvis_lhs == null ? JobCancellationException().t2a('Parent job is ' + stateString(this, state), rootCause, this) : tmp1_elvis_lhs;
      }
      o22(proposedUpdate) {
        // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
        while (true) {
          var tmp0 = this.r21();
          $l$block: {
            var finalState = tryMakeCompleting(this, tmp0, proposedUpdate);
            if (finalState === get_COMPLETING_ALREADY())
              return false;
            else if (finalState === get_COMPLETING_WAITING_CHILDREN())
              return true;
            else if (finalState === get_COMPLETING_RETRY()) {
              break $l$block;
            } else {
              this.h21(finalState);
              return true;
            }
          }
        }
      }
      f21(proposedUpdate) {
        // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
        while (true) {
          var tmp0 = this.r21();
          $l$block: {
            var finalState = tryMakeCompleting(this, tmp0, proposedUpdate);
            if (finalState === get_COMPLETING_ALREADY())
              throw IllegalStateException().je('Job ' + this.toString() + ' is already complete or completing, ' + ('but is being completed with ' + toString_0(proposedUpdate)), _get_exceptionOrNull__b3j7js(this, proposedUpdate));
            else if (finalState === get_COMPLETING_RETRY()) {
              break $l$block;
            } else
              return finalState;
          }
        }
      }
      j28() {
        return sequence(JobSupport$_get_children_$slambda_k839f8_0(this, null));
      }
      p22(child) {
        // Inline function 'kotlin.also' call
        var this_0 = new (ChildHandleNode())(child);
        this_0.m27_1 = this;
        var node = this_0;
        var tmp$ret$2;
        $l$block_1: {
          // Inline function 'kotlinx.coroutines.JobSupport.tryPutNodeIntoList' call
          // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
          while (true) {
            var state = this.r21();
            if (state instanceof Empty()) {
              if (state.b2a_1) {
                if (this.q20_1.atomicfu$compareAndSet(state, node)) {
                  tmp$ret$2 = true;
                  break $l$block_1;
                }
              } else {
                promoteEmptyToNodeList(this, state);
              }
            } else {
              if (!(state == null) ? isInterface(state, Incomplete()) : false) {
                var list = state.o27();
                if (list == null) {
                  promoteSingleToNodeList(this, state instanceof JobNode() ? state : THROW_CCE());
                } else {
                  var addedBeforeCancellation = list.s27(node, 7);
                  var tmp;
                  if (addedBeforeCancellation) {
                    tmp = true;
                  } else {
                    var addedBeforeCompletion = list.s27(node, 3);
                    var latestState = this.r21();
                    var tmp_0;
                    if (latestState instanceof Finishing()) {
                      tmp_0 = latestState.y2a();
                    } else {
                      // Inline function 'kotlinx.coroutines.assert' call
                      var tmp0_safe_receiver = latestState instanceof CompletedExceptionally() ? latestState : null;
                      tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c21_1;
                    }
                    var rootCause = tmp_0;
                    node.y24(rootCause);
                    var tmp_1;
                    if (addedBeforeCompletion) {
                      // Inline function 'kotlinx.coroutines.assert' call
                      tmp_1 = true;
                    } else {
                      return NonDisposableHandle_instance;
                    }
                    tmp = tmp_1;
                  }
                  if (tmp) {
                    tmp$ret$2 = true;
                    break $l$block_1;
                  }
                }
              } else {
                tmp$ret$2 = false;
                break $l$block_1;
              }
            }
          }
        }
        var added = tmp$ret$2;
        if (added)
          return node;
        var tmp_2 = this.r21();
        var tmp0_safe_receiver_0 = tmp_2 instanceof CompletedExceptionally() ? tmp_2 : null;
        node.y24(tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.c21_1);
        return NonDisposableHandle_instance;
      }
      i21(exception) {
        throw exception;
      }
      q22(cause) {
      }
      r22() {
        return false;
      }
      s22() {
        return true;
      }
      t22(exception) {
        return false;
      }
      b21(state) {
      }
      h21(state) {
      }
      toString() {
        return this.u22() + '@' + get_hexAddress(this);
      }
      u22() {
        return this.j21() + '{' + stateString(this, this.r21()) + '}';
      }
      j21() {
        return get_classSimpleName(this);
      }
      v22() {
        var state = this.r21();
        // Inline function 'kotlin.check' call
        if (!!(!(state == null) ? isInterface(state, Incomplete()) : false)) {
          var message = 'This job has not completed yet';
          throw IllegalStateException().o5(toString(message));
        }
        return _get_exceptionOrNull__b3j7js(this, state);
      }
      w22() {
        var state = this.r21();
        // Inline function 'kotlin.check' call
        if (!!(!(state == null) ? isInterface(state, Incomplete()) : false)) {
          var message = 'This job has not completed yet';
          throw IllegalStateException().o5(toString(message));
        }
        if (state instanceof CompletedExceptionally())
          throw state.c21_1;
        return unboxState(state);
      }
      x22($completion) {
        $l$loop: while (true) {
          var state = this.r21();
          if (!(!(state == null) ? isInterface(state, Incomplete()) : false)) {
            if (state instanceof CompletedExceptionally()) {
              // Inline function 'kotlinx.coroutines.internal.recoverAndThrow' call
              throw state.c21_1;
            }
            return unboxState(state);
          }
          if (startInternal(this, state) >= 0)
            break $l$loop;
        }
        return awaitSuspend(this, $completion);
      }
    }
    protoOf($).b22 = invokeOnCompletion$default;
    protoOf($).h22 = cancel$default;
    protoOf($).ir = plus;
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    initMetadataForClass($, 'JobSupport', VOID, VOID, [Job(), ParentJob()], [0]);
    JobSupportClass = $;
  }
  return JobSupportClass;
}
function boxIncomplete(_this__u8e3s4) {
  _init_properties_JobSupport_kt__68f172();
  var tmp;
  if (!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Incomplete()) : false) {
    tmp = new (IncompleteStateBox())(_this__u8e3s4);
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
var InactiveNodeListClass;
function InactiveNodeList() {
  if (InactiveNodeListClass === VOID) {
    class $ {
      constructor(list) {
        this.u2a_1 = list;
      }
      o27() {
        return this.u2a_1;
      }
      x20() {
        return false;
      }
      toString() {
        return get_DEBUG() ? this.u2a_1.f2a('New') : anyToString(this);
      }
    }
    initMetadataForClass($, 'InactiveNodeList', VOID, VOID, [Incomplete()]);
    InactiveNodeListClass = $;
  }
  return InactiveNodeListClass;
}
var InvokeOnCompletionClass;
function InvokeOnCompletion() {
  if (InvokeOnCompletionClass === VOID) {
    class $ extends JobNode() {
      constructor(handler) {
        super();
        this.x2c_1 = handler;
      }
      i27() {
        return false;
      }
      y24(cause) {
        return this.x2c_1(cause);
      }
    }
    initMetadataForClass($, 'InvokeOnCompletion');
    InvokeOnCompletionClass = $;
  }
  return InvokeOnCompletionClass;
}
var InvokeOnCancellingClass;
function InvokeOnCancelling() {
  if (InvokeOnCancellingClass === VOID) {
    class $ extends JobNode() {
      constructor(handler) {
        super();
        this.c2d_1 = handler;
        this.d2d_1 = atomic$boolean$1(false);
      }
      i27() {
        return true;
      }
      y24(cause) {
        if (this.d2d_1.atomicfu$compareAndSet(false, true))
          this.c2d_1(cause);
      }
    }
    initMetadataForClass($, 'InvokeOnCancelling');
    InvokeOnCancellingClass = $;
  }
  return InvokeOnCancellingClass;
}
var ResumeOnCompletionClass;
function ResumeOnCompletion() {
  if (ResumeOnCompletionClass === VOID) {
    class $ extends JobNode() {
      constructor(continuation) {
        super();
        this.i2d_1 = continuation;
      }
      i27() {
        return false;
      }
      y24(cause) {
        // Inline function 'kotlin.coroutines.resume' call
        var this_0 = this.i2d_1;
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        this_0.qd(tmp$ret$0);
        return Unit_instance;
      }
    }
    initMetadataForClass($, 'ResumeOnCompletion');
    ResumeOnCompletionClass = $;
  }
  return ResumeOnCompletionClass;
}
var ChildHandleNodeClass;
function ChildHandleNode() {
  if (ChildHandleNodeClass === VOID) {
    class $ extends JobNode() {
      constructor(childJob) {
        super();
        this.e2b_1 = childJob;
      }
      q21() {
        return this.n27();
      }
      i27() {
        return true;
      }
      y24(cause) {
        return this.e2b_1.j22(this.n27());
      }
      k22(cause) {
        return this.n27().k22(cause);
      }
    }
    initMetadataForClass($, 'ChildHandleNode');
    ChildHandleNodeClass = $;
  }
  return ChildHandleNodeClass;
}
function unboxState(_this__u8e3s4) {
  _init_properties_JobSupport_kt__68f172();
  var tmp0_safe_receiver = _this__u8e3s4 instanceof IncompleteStateBox() ? _this__u8e3s4 : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j2d_1;
  return tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
}
var ResumeAwaitOnCompletionClass;
function ResumeAwaitOnCompletion() {
  if (ResumeAwaitOnCompletionClass === VOID) {
    class $ extends JobNode() {
      constructor(continuation) {
        super();
        this.o2d_1 = continuation;
      }
      i27() {
        return false;
      }
      y24(cause) {
        var state = this.n27().r21();
        // Inline function 'kotlinx.coroutines.assert' call
        if (state instanceof CompletedExceptionally()) {
          var tmp0 = this.o2d_1;
          // Inline function 'kotlin.coroutines.resumeWithException' call
          // Inline function 'kotlin.Companion.failure' call
          var exception = state.c21_1;
          var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(exception));
          tmp0.qd(tmp$ret$1);
        } else {
          var tmp0_0 = this.o2d_1;
          var tmp = unboxState(state);
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
          var tmp$ret$3 = _Result___init__impl__xyqfz8(value);
          tmp0_0.qd(tmp$ret$3);
        }
      }
    }
    initMetadataForClass($, 'ResumeAwaitOnCompletion');
    ResumeAwaitOnCompletionClass = $;
  }
  return ResumeAwaitOnCompletionClass;
}
var IncompleteStateBoxClass;
function IncompleteStateBox() {
  if (IncompleteStateBoxClass === VOID) {
    class $ {
      constructor(state) {
        this.j2d_1 = state;
      }
    }
    initMetadataForClass($, 'IncompleteStateBox');
    IncompleteStateBoxClass = $;
  }
  return IncompleteStateBoxClass;
}
function handlesExceptionF($this) {
  var tmp = $this.p21();
  var tmp0_safe_receiver = tmp instanceof ChildHandleNode() ? tmp : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n27();
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    return false;
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var parentJob = tmp_0;
  while (true) {
    if (parentJob.s22())
      return true;
    var tmp_1 = parentJob.p21();
    var tmp2_safe_receiver = tmp_1 instanceof ChildHandleNode() ? tmp_1 : null;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.n27();
    var tmp_2;
    if (tmp3_elvis_lhs == null) {
      return false;
    } else {
      tmp_2 = tmp3_elvis_lhs;
    }
    parentJob = tmp_2;
  }
}
var JobImplClass;
function JobImpl() {
  if (JobImplClass === VOID) {
    class $ extends JobSupport() {
      constructor(parent) {
        super(true);
        this.s20(parent);
        this.r2d_1 = handlesExceptionF(this);
      }
      f22() {
        return true;
      }
      s22() {
        return this.r2d_1;
      }
      i28() {
        return this.o22(Unit_instance);
      }
      h28(exception) {
        return this.o22(new (CompletedExceptionally())(exception));
      }
    }
    initMetadataForClass($, 'JobImpl', VOID, VOID, [JobSupport(), CompletableJob()], [0]);
    JobImplClass = $;
  }
  return JobImplClass;
}
var properties_initialized_JobSupport_kt_5iq8a4;
function _init_properties_JobSupport_kt__68f172() {
  if (!properties_initialized_JobSupport_kt_5iq8a4) {
    properties_initialized_JobSupport_kt_5iq8a4 = true;
    COMPLETING_ALREADY = new (Symbol())('COMPLETING_ALREADY');
    COMPLETING_WAITING_CHILDREN = new (Symbol())('COMPLETING_WAITING_CHILDREN');
    COMPLETING_RETRY = new (Symbol())('COMPLETING_RETRY');
    TOO_LATE_TO_CANCEL = new (Symbol())('TOO_LATE_TO_CANCEL');
    SEALED = new (Symbol())('SEALED');
    EMPTY_NEW = new (Empty())(false);
    EMPTY_ACTIVE = new (Empty())(true);
  }
}
//region block: exports
export {
  get_COMPLETING_WAITING_CHILDREN as get_COMPLETING_WAITING_CHILDREN3nnjgv5wv89p1,
  JobImpl as JobImpl2fbttqo93wxua,
  JobNode as JobNode2tu3g3s3xsko1,
  JobSupport as JobSupport3fdjh0rbee4be,
  unboxState as unboxStateze7t12boxn2m,
};
//endregion

//# sourceMappingURL=JobSupport.mjs.map
