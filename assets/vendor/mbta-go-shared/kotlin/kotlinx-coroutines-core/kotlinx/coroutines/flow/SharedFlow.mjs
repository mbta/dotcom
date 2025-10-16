import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { BufferOverflow_SUSPEND_getInstance142kaabh2rhtl as BufferOverflow_SUSPEND_getInstance } from '../channels/BufferOverflow.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../CancellableContinuationImpl.mjs';
import {
  get_EMPTY_RESUMES1se3895plb5u1 as get_EMPTY_RESUMES,
  AbstractSharedFlow1jjql04jld86z as AbstractSharedFlow,
  AbstractSharedFlowSlot2hcw2f06t03o0 as AbstractSharedFlowSlot,
} from './internal/AbstractSharedFlow.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { disposeOnCancellation302lv5bib5mna as disposeOnCancellation } from '../CancellableContinuation.mjs';
import { copyOf2ng0t8oizk6it as copyOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { SubscribedFlowCollector17ch8by19noql as SubscribedFlowCollector } from './Share.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  ensureActive159jflbg22qd8 as ensureActive,
} from '../Job.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from './FlowCollector.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from '../internal/Symbol.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_NO_VALUE() {
  _init_properties_SharedFlow_kt__umasnn();
  return NO_VALUE;
}
var NO_VALUE;
function MutableSharedFlow(replay, extraBufferCapacity, onBufferOverflow) {
  replay = replay === VOID ? 0 : replay;
  extraBufferCapacity = extraBufferCapacity === VOID ? 0 : extraBufferCapacity;
  onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
  _init_properties_SharedFlow_kt__umasnn();
  // Inline function 'kotlin.require' call
  if (!(replay >= 0)) {
    var message = 'replay cannot be negative, but was ' + replay;
    throw IllegalArgumentException().q(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(extraBufferCapacity >= 0)) {
    var message_0 = 'extraBufferCapacity cannot be negative, but was ' + extraBufferCapacity;
    throw IllegalArgumentException().q(toString(message_0));
  }
  // Inline function 'kotlin.require' call
  if (!(replay > 0 || extraBufferCapacity > 0 || onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()))) {
    var message_1 = 'replay or extraBufferCapacity must be positive with non-default onBufferOverflow strategy ' + onBufferOverflow.toString();
    throw IllegalArgumentException().q(toString(message_1));
  }
  var bufferCapacity0 = replay + extraBufferCapacity | 0;
  var bufferCapacity = bufferCapacity0 < 0 ? 2147483647 : bufferCapacity0;
  return new (SharedFlowImpl())(replay, bufferCapacity, onBufferOverflow);
}
function _get_head__d7jo8b($this) {
  var tmp0 = $this.l2o_1;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = $this.k2o_1;
  return tmp0.d2(b) <= 0 ? tmp0 : b;
}
function _get_replaySize__dxgnb1($this) {
  var tmp0 = _get_head__d7jo8b($this);
  // Inline function 'kotlin.Long.plus' call
  var other = $this.m2o_1;
  return tmp0.f4(toLong(other)).g4($this.k2o_1).f2();
}
function _get_totalSize__xhdb3o($this) {
  return $this.m2o_1 + $this.n2o_1 | 0;
}
function _get_bufferEndIndex__d2rk18($this) {
  var tmp0 = _get_head__d7jo8b($this);
  // Inline function 'kotlin.Long.plus' call
  var other = $this.m2o_1;
  return tmp0.f4(toLong(other));
}
function _get_queueEndIndex__4m025l($this) {
  var tmp0 = _get_head__d7jo8b($this);
  // Inline function 'kotlin.Long.plus' call
  var other = $this.m2o_1;
  var tmp0_0 = tmp0.f4(toLong(other));
  // Inline function 'kotlin.Long.plus' call
  var other_0 = $this.n2o_1;
  return tmp0_0.f4(toLong(other_0));
}
function tryEmitLocked($this, value) {
  if ($this.p2o_1 === 0)
    return tryEmitNoCollectorsLocked($this, value);
  if ($this.m2o_1 >= $this.h2o_1 && $this.l2o_1.d2($this.k2o_1) <= 0) {
    switch ($this.i2o_1.x3_1) {
      case 0:
        return false;
      case 2:
        return true;
      case 1:
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
  }
  enqueueLocked($this, value);
  $this.m2o_1 = $this.m2o_1 + 1 | 0;
  if ($this.m2o_1 > $this.h2o_1) {
    dropOldestLocked($this);
  }
  if (_get_replaySize__dxgnb1($this) > $this.g2o_1) {
    // Inline function 'kotlin.Long.plus' call
    var tmp$ret$0 = $this.k2o_1.f4(toLong(1));
    updateBufferLocked($this, tmp$ret$0, $this.l2o_1, _get_bufferEndIndex__d2rk18($this), _get_queueEndIndex__4m025l($this));
  }
  return true;
}
function tryEmitNoCollectorsLocked($this, value) {
  // Inline function 'kotlinx.coroutines.assert' call
  if ($this.g2o_1 === 0)
    return true;
  enqueueLocked($this, value);
  $this.m2o_1 = $this.m2o_1 + 1 | 0;
  if ($this.m2o_1 > $this.g2o_1) {
    dropOldestLocked($this);
  }
  var tmp = $this;
  var tmp0 = _get_head__d7jo8b($this);
  // Inline function 'kotlin.Long.plus' call
  var other = $this.m2o_1;
  tmp.l2o_1 = tmp0.f4(toLong(other));
  return true;
}
function dropOldestLocked($this) {
  setBufferAt(ensureNotNull($this.j2o_1), _get_head__d7jo8b($this), null);
  $this.m2o_1 = $this.m2o_1 - 1 | 0;
  // Inline function 'kotlin.Long.plus' call
  var newHead = _get_head__d7jo8b($this).f4(toLong(1));
  if ($this.k2o_1.d2(newHead) < 0)
    $this.k2o_1 = newHead;
  if ($this.l2o_1.d2(newHead) < 0) {
    correctCollectorIndexesOnDropOldest($this, newHead);
  }
  // Inline function 'kotlinx.coroutines.assert' call
}
function correctCollectorIndexesOnDropOldest($this, newHead) {
  $l$block: {
    // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
    if ($this.p2o_1 === 0) {
      break $l$block;
    }
    var tmp0_safe_receiver = $this.o2o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var inductionVariable = 0;
      var last = tmp0_safe_receiver.length;
      while (inductionVariable < last) {
        var element = tmp0_safe_receiver[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (!(element == null)) {
          if (element.s2o_1.d2(new (Long())(0, 0)) >= 0 && element.s2o_1.d2(newHead) < 0) {
            element.s2o_1 = newHead;
          }
        }
      }
    }
  }
  $this.l2o_1 = newHead;
}
function enqueueLocked($this, item) {
  var curSize = _get_totalSize__xhdb3o($this);
  var curBuffer = $this.j2o_1;
  var buffer = curBuffer == null ? growBuffer($this, null, 0, 2) : curSize >= curBuffer.length ? growBuffer($this, curBuffer, curSize, imul(curBuffer.length, 2)) : curBuffer;
  // Inline function 'kotlin.Long.plus' call
  var tmp$ret$0 = _get_head__d7jo8b($this).f4(toLong(curSize));
  setBufferAt(buffer, tmp$ret$0, item);
}
function growBuffer($this, curBuffer, curSize, newSize) {
  // Inline function 'kotlin.check' call
  if (!(newSize > 0)) {
    var message = 'Buffer size overflow';
    throw IllegalStateException().o5(toString(message));
  }
  // Inline function 'kotlin.arrayOfNulls' call
  // Inline function 'kotlin.also' call
  var this_0 = Array(newSize);
  $this.j2o_1 = this_0;
  var newBuffer = this_0;
  if (curBuffer == null)
    return newBuffer;
  var head = _get_head__d7jo8b($this);
  var inductionVariable = 0;
  if (inductionVariable < curSize)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.Long.plus' call
      var tmp = head.f4(toLong(i));
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$6 = head.f4(toLong(i));
      setBufferAt(newBuffer, tmp, getBufferAt(curBuffer, tmp$ret$6));
    }
     while (inductionVariable < curSize);
  return newBuffer;
}
function emitSuspend($this, value, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  var resumes = get_EMPTY_RESUMES();
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  var tmp$ret$2;
  $l$block: {
    if (tryEmitLocked($this, value)) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      cancellable.qd(tmp$ret$0);
      resumes = findSlotsToResumeLocked($this, resumes);
      tmp$ret$2 = null;
      break $l$block;
    }
    var tmp0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other = _get_totalSize__xhdb3o($this);
    var tmp$ret$3 = tmp0.f4(toLong(other));
    // Inline function 'kotlin.also' call
    var this_0 = new (Emitter())($this, tmp$ret$3, value, cancellable);
    enqueueLocked($this, this_0);
    $this.n2o_1 = $this.n2o_1 + 1 | 0;
    if ($this.h2o_1 === 0)
      resumes = findSlotsToResumeLocked($this, resumes);
    tmp$ret$2 = this_0;
  }
  var emitter = tmp$ret$2;
  if (emitter == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    disposeOnCancellation(cancellable, emitter);
  }
  var indexedObject = resumes;
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var r = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    if (r == null)
      null;
    else {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$10 = _Result___init__impl__xyqfz8(Unit_instance);
      r.qd(tmp$ret$10);
    }
  }
  return cancellable.e23();
}
function cancelEmitter($this, emitter) {
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  if (emitter.v2o_1.d2(_get_head__d7jo8b($this)) < 0)
    return Unit_instance;
  var buffer = ensureNotNull($this.j2o_1);
  if (!(getBufferAt(buffer, emitter.v2o_1) === emitter))
    return Unit_instance;
  setBufferAt(buffer, emitter.v2o_1, get_NO_VALUE());
  cleanupTailLocked($this);
  return Unit_instance;
}
function updateBufferLocked($this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex) {
  // Inline function 'kotlin.comparisons.minOf' call
  var newHead = newMinCollectorIndex.d2(newReplayIndex) <= 0 ? newMinCollectorIndex : newReplayIndex;
  // Inline function 'kotlinx.coroutines.assert' call
  var inductionVariable = _get_head__d7jo8b($this);
  if (inductionVariable.d2(newHead) < 0)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable.f4(new (Long())(1, 0));
      setBufferAt(ensureNotNull($this.j2o_1), index, null);
    }
     while (inductionVariable.d2(newHead) < 0);
  $this.k2o_1 = newReplayIndex;
  $this.l2o_1 = newMinCollectorIndex;
  $this.m2o_1 = newBufferEndIndex.g4(newHead).f2();
  $this.n2o_1 = newQueueEndIndex.g4(newBufferEndIndex).f2();
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
  // Inline function 'kotlinx.coroutines.assert' call
}
function cleanupTailLocked($this) {
  if ($this.h2o_1 === 0 && $this.n2o_1 <= 1)
    return Unit_instance;
  var buffer = ensureNotNull($this.j2o_1);
  $l$loop: while (true) {
    var tmp;
    if ($this.n2o_1 > 0) {
      var tmp0 = _get_head__d7jo8b($this);
      // Inline function 'kotlin.Long.plus' call
      var other = _get_totalSize__xhdb3o($this);
      // Inline function 'kotlin.Long.minus' call
      var tmp$ret$1 = tmp0.f4(toLong(other)).g4(toLong(1));
      tmp = getBufferAt(buffer, tmp$ret$1) === get_NO_VALUE();
    } else {
      tmp = false;
    }
    if (!tmp) {
      break $l$loop;
    }
    $this.n2o_1 = $this.n2o_1 - 1 | 0;
    var tmp0_0 = _get_head__d7jo8b($this);
    // Inline function 'kotlin.Long.plus' call
    var other_0 = _get_totalSize__xhdb3o($this);
    var tmp$ret$2 = tmp0_0.f4(toLong(other_0));
    setBufferAt(buffer, tmp$ret$2, null);
  }
}
function tryTakeValue($this, slot) {
  var resumes = get_EMPTY_RESUMES();
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  var index = tryPeekLocked($this, slot);
  var tmp;
  if (index.d2(new (Long())(0, 0)) < 0) {
    tmp = get_NO_VALUE();
  } else {
    var oldIndex = slot.s2o_1;
    var newValue = getPeekedValueLockedAt($this, index);
    var tmp_0 = slot;
    // Inline function 'kotlin.Long.plus' call
    tmp_0.s2o_1 = index.f4(toLong(1));
    resumes = $this.y2o(oldIndex);
    tmp = newValue;
  }
  var value = tmp;
  var indexedObject = resumes;
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var resume = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    if (resume == null)
      null;
    else {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$4 = _Result___init__impl__xyqfz8(Unit_instance);
      resume.qd(tmp$ret$4);
    }
  }
  return value;
}
function tryPeekLocked($this, slot) {
  var index = slot.s2o_1;
  if (index.d2(_get_bufferEndIndex__d2rk18($this)) < 0)
    return index;
  if ($this.h2o_1 > 0)
    return new (Long())(-1, -1);
  if (index.d2(_get_head__d7jo8b($this)) > 0)
    return new (Long())(-1, -1);
  if ($this.n2o_1 === 0)
    return new (Long())(-1, -1);
  return index;
}
function getPeekedValueLockedAt($this, index) {
  var item = getBufferAt(ensureNotNull($this.j2o_1), index);
  var tmp;
  if (item instanceof Emitter()) {
    tmp = item.w2o_1;
  } else {
    tmp = item;
  }
  return tmp;
}
function awaitValue($this, slot, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  $l$block: {
    var index = tryPeekLocked($this, slot);
    if (index.d2(new (Long())(0, 0)) < 0) {
      slot.t2o_1 = cancellable;
    } else {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      cancellable.qd(tmp$ret$0);
      break $l$block;
    }
    slot.t2o_1 = cancellable;
  }
  return cancellable.e23();
}
function findSlotsToResumeLocked($this, resumesIn) {
  var resumes = resumesIn;
  var resumeCount = resumesIn.length;
  $l$block: {
    // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
    if ($this.p2o_1 === 0) {
      break $l$block;
    }
    var tmp0_safe_receiver = $this.o2o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var inductionVariable = 0;
      var last = tmp0_safe_receiver.length;
      while (inductionVariable < last) {
        var element = tmp0_safe_receiver[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (!(element == null)) {
          $l$block_1: {
            var tmp0_elvis_lhs = element.t2o_1;
            var tmp;
            if (tmp0_elvis_lhs == null) {
              break $l$block_1;
            } else {
              tmp = tmp0_elvis_lhs;
            }
            var cont = tmp;
            if (tryPeekLocked($this, element).d2(new (Long())(0, 0)) < 0) {
              break $l$block_1;
            }
            if (resumeCount >= resumes.length) {
              var tmp_0 = resumes;
              // Inline function 'kotlin.comparisons.maxOf' call
              var b = imul(2, resumes.length);
              var tmp$ret$2 = Math.max(2, b);
              resumes = copyOf(tmp_0, tmp$ret$2);
            }
            var tmp_1 = resumes;
            var _unary__edvuaz = resumeCount;
            resumeCount = _unary__edvuaz + 1 | 0;
            tmp_1[_unary__edvuaz] = cont;
            element.t2o_1 = null;
          }
        }
      }
    }
  }
  return resumes;
}
var EmitterClass;
function Emitter() {
  if (EmitterClass === VOID) {
    class $ {
      constructor(flow, index, value, cont) {
        this.u2o_1 = flow;
        this.v2o_1 = index;
        this.w2o_1 = value;
        this.x2o_1 = cont;
      }
      z24() {
        return cancelEmitter(this.u2o_1, this);
      }
    }
    initMetadataForClass($, 'Emitter');
    EmitterClass = $;
  }
  return EmitterClass;
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.h2p_1 = _this__u8e3s4;
        this.i2p_1 = collector;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 13;
                this.j2p_1 = this.h2p_1.n2p();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 12;
                var tmp_0 = this.i2p_1;
                if (tmp_0 instanceof SubscribedFlowCollector()) {
                  this.fd_1 = 2;
                  suspendResult = this.i2p_1.q2p(this);
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
                var tmp_1 = this;
                tmp_1.l2p_1 = this.ld().sd(Key_instance);
                this.fd_1 = 4;
                continue $sm;
              case 4:
                if (!true) {
                  this.fd_1 = 10;
                  continue $sm;
                }

                this.fd_1 = 5;
                continue $sm;
              case 5:
                if (!true) {
                  this.fd_1 = 8;
                  continue $sm;
                }

                this.m2p_1 = tryTakeValue(this.h2p_1, this.j2p_1);
                if (!(this.m2p_1 === get_NO_VALUE())) {
                  this.fd_1 = 8;
                  continue $sm;
                } else {
                  this.fd_1 = 6;
                  continue $sm;
                }

              case 6:
                this.fd_1 = 7;
                suspendResult = awaitValue(this.h2p_1, this.j2p_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                this.fd_1 = 5;
                continue $sm;
              case 8:
                var tmp0_safe_receiver = this.l2p_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  ensureActive(tmp0_safe_receiver);
                }

                this.fd_1 = 9;
                var tmp_2 = this.m2p_1;
                suspendResult = this.i2p_1.z2n((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 9:
                this.fd_1 = 4;
                continue $sm;
              case 10:
                this.k2p_1 = Unit_instance;
                this.gd_1 = 13;
                this.fd_1 = 11;
                continue $sm;
              case 11:
                this.gd_1 = 13;
                this.h2p_1.r2p(this.j2p_1);
                return Unit_instance;
              case 12:
                this.gd_1 = 13;
                var t = this.id_1;
                this.h2p_1.r2p(this.j2p_1);
                throw t;
              case 13:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 13) {
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
    $collectCOROUTINE$Class = $;
  }
  return $collectCOROUTINE$Class;
}
var SharedFlowImplClass;
function SharedFlowImpl() {
  if (SharedFlowImplClass === VOID) {
    class $ extends AbstractSharedFlow() {
      constructor(replay, bufferCapacity, onBufferOverflow) {
        super();
        this.g2o_1 = replay;
        this.h2o_1 = bufferCapacity;
        this.i2o_1 = onBufferOverflow;
        this.j2o_1 = null;
        this.k2o_1 = new (Long())(0, 0);
        this.l2o_1 = new (Long())(0, 0);
        this.m2o_1 = 0;
        this.n2o_1 = 0;
      }
      s2p() {
        var tmp = ensureNotNull(this.j2o_1);
        var tmp0 = this.k2o_1;
        // Inline function 'kotlin.Long.plus' call
        var other = _get_replaySize__dxgnb1(this);
        // Inline function 'kotlin.Long.minus' call
        var tmp$ret$1 = tmp0.f4(toLong(other)).g4(toLong(1));
        var tmp_0 = getBufferAt(tmp, tmp$ret$1);
        return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      }
      t2p(collector, $completion) {
        var tmp = new ($collectCOROUTINE$())(this, collector, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      b2o(collector, $completion) {
        return this.t2p(collector, $completion);
      }
      u2p(value) {
        var resumes = get_EMPTY_RESUMES();
        // Inline function 'kotlinx.coroutines.internal.synchronized' call
        // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
        var tmp;
        if (tryEmitLocked(this, value)) {
          resumes = findSlotsToResumeLocked(this, resumes);
          tmp = true;
        } else {
          tmp = false;
        }
        var emitted = tmp;
        var indexedObject = resumes;
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var cont = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          if (cont == null)
            null;
          else {
            // Inline function 'kotlin.coroutines.resume' call
            // Inline function 'kotlin.Companion.success' call
            var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
            cont.qd(tmp$ret$3);
          }
        }
        return emitted;
      }
      z2n(value, $completion) {
        if (this.u2p(value))
          return Unit_instance;
        return emitSuspend(this, value, $completion);
      }
      v2p() {
        var index = this.k2o_1;
        if (index.d2(this.l2o_1) < 0)
          this.l2o_1 = index;
        return index;
      }
      y2o(oldIndex) {
        // Inline function 'kotlinx.coroutines.assert' call
        if (oldIndex.d2(this.l2o_1) > 0)
          return get_EMPTY_RESUMES();
        var head = _get_head__d7jo8b(this);
        // Inline function 'kotlin.Long.plus' call
        var other = this.m2o_1;
        var newMinCollectorIndex = head.f4(toLong(other));
        if (this.h2o_1 === 0 && this.n2o_1 > 0) {
          newMinCollectorIndex = newMinCollectorIndex.k4();
        }
        $l$block: {
          // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
          if (this.p2o_1 === 0) {
            break $l$block;
          }
          var tmp0_safe_receiver = this.o2o_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.collections.forEach' call
            var inductionVariable = 0;
            var last = tmp0_safe_receiver.length;
            while (inductionVariable < last) {
              var element = tmp0_safe_receiver[inductionVariable];
              inductionVariable = inductionVariable + 1 | 0;
              if (!(element == null)) {
                if (element.s2o_1.d2(new (Long())(0, 0)) >= 0 && element.s2o_1.d2(newMinCollectorIndex) < 0)
                  newMinCollectorIndex = element.s2o_1;
              }
            }
          }
        }
        // Inline function 'kotlinx.coroutines.assert' call
        if (newMinCollectorIndex.d2(this.l2o_1) <= 0)
          return get_EMPTY_RESUMES();
        var newBufferEndIndex = _get_bufferEndIndex__d2rk18(this);
        var tmp;
        if (this.p2o_1 > 0) {
          var newBufferSize0 = newBufferEndIndex.g4(newMinCollectorIndex).f2();
          var tmp0 = this.n2o_1;
          // Inline function 'kotlin.comparisons.minOf' call
          var b = this.h2o_1 - newBufferSize0 | 0;
          tmp = Math.min(tmp0, b);
        } else {
          tmp = this.n2o_1;
        }
        var maxResumeCount = tmp;
        var resumes = get_EMPTY_RESUMES();
        var tmp0_0 = newBufferEndIndex;
        // Inline function 'kotlin.Long.plus' call
        var other_0 = this.n2o_1;
        var newQueueEndIndex = tmp0_0.f4(toLong(other_0));
        if (maxResumeCount > 0) {
          // Inline function 'kotlin.arrayOfNulls' call
          resumes = Array(maxResumeCount);
          var resumeCount = 0;
          var buffer = ensureNotNull(this.j2o_1);
          var inductionVariable_0 = newBufferEndIndex;
          if (inductionVariable_0.d2(newQueueEndIndex) < 0)
            $l$loop: do {
              var curEmitterIndex = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0.f4(new (Long())(1, 0));
              var emitter = getBufferAt(buffer, curEmitterIndex);
              if (!(emitter === get_NO_VALUE())) {
                if (!(emitter instanceof Emitter()))
                  THROW_CCE();
                var tmp_0 = resumes;
                var _unary__edvuaz = resumeCount;
                resumeCount = _unary__edvuaz + 1 | 0;
                tmp_0[_unary__edvuaz] = emitter.x2o_1;
                setBufferAt(buffer, curEmitterIndex, get_NO_VALUE());
                setBufferAt(buffer, newBufferEndIndex, emitter.w2o_1);
                newBufferEndIndex = newBufferEndIndex.k4();
                if (resumeCount >= maxResumeCount)
                  break $l$loop;
              }
            }
             while (inductionVariable_0.d2(newQueueEndIndex) < 0);
        }
        var newBufferSize1 = newBufferEndIndex.g4(head).f2();
        if (this.p2o_1 === 0)
          newMinCollectorIndex = newBufferEndIndex;
        var tmp0_1 = this.k2o_1;
        var tmp0_2 = newBufferEndIndex;
        // Inline function 'kotlin.comparisons.minOf' call
        var a = this.g2o_1;
        // Inline function 'kotlin.Long.minus' call
        var other_1 = Math.min(a, newBufferSize1);
        // Inline function 'kotlin.comparisons.maxOf' call
        var b_0 = tmp0_2.g4(toLong(other_1));
        var newReplayIndex = tmp0_1.d2(b_0) >= 0 ? tmp0_1 : b_0;
        if (this.h2o_1 === 0 && newReplayIndex.d2(newQueueEndIndex) < 0 && equals(getBufferAt(ensureNotNull(this.j2o_1), newReplayIndex), get_NO_VALUE())) {
          newBufferEndIndex = newBufferEndIndex.k4();
          newReplayIndex = newReplayIndex.k4();
        }
        updateBufferLocked(this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex);
        cleanupTailLocked(this);
        // Inline function 'kotlin.collections.isNotEmpty' call
        // Inline function 'kotlin.collections.isEmpty' call
        if (!(resumes.length === 0))
          resumes = findSlotsToResumeLocked(this, resumes);
        return resumes;
      }
      w2p() {
        return new (SharedFlowSlot())();
      }
      x2p(size) {
        // Inline function 'kotlin.arrayOfNulls' call
        return Array(size);
      }
    }
    initMetadataForClass($, 'SharedFlowImpl', VOID, VOID, [AbstractSharedFlow(), FlowCollector()], [1]);
    SharedFlowImplClass = $;
  }
  return SharedFlowImplClass;
}
var SharedFlowSlotClass;
function SharedFlowSlot() {
  if (SharedFlowSlotClass === VOID) {
    class $ extends AbstractSharedFlowSlot() {
      constructor() {
        super();
        this.s2o_1 = new (Long())(-1, -1);
        this.t2o_1 = null;
      }
      y2p(flow) {
        if (this.s2o_1.d2(new (Long())(0, 0)) >= 0)
          return false;
        this.s2o_1 = flow.v2p();
        return true;
      }
      z2p(flow) {
        return this.y2p(flow instanceof SharedFlowImpl() ? flow : THROW_CCE());
      }
      a2q(flow) {
        // Inline function 'kotlinx.coroutines.assert' call
        var oldIndex = this.s2o_1;
        this.s2o_1 = new (Long())(-1, -1);
        this.t2o_1 = null;
        return flow.y2o(oldIndex);
      }
      b2q(flow) {
        return this.a2q(flow instanceof SharedFlowImpl() ? flow : THROW_CCE());
      }
    }
    initMetadataForClass($, 'SharedFlowSlot', SharedFlowSlot);
    SharedFlowSlotClass = $;
  }
  return SharedFlowSlotClass;
}
function getBufferAt(_this__u8e3s4, index) {
  _init_properties_SharedFlow_kt__umasnn();
  return _this__u8e3s4[index.f2() & (_this__u8e3s4.length - 1 | 0)];
}
function setBufferAt(_this__u8e3s4, index, item) {
  _init_properties_SharedFlow_kt__umasnn();
  return _this__u8e3s4[index.f2() & (_this__u8e3s4.length - 1 | 0)] = item;
}
var properties_initialized_SharedFlow_kt_tmefor;
function _init_properties_SharedFlow_kt__umasnn() {
  if (!properties_initialized_SharedFlow_kt_tmefor) {
    properties_initialized_SharedFlow_kt_tmefor = true;
    NO_VALUE = new (Symbol())('NO_VALUE');
  }
}
//region block: exports
export {
  MutableSharedFlow as MutableSharedFlow3g4w4npzofx4w,
};
//endregion

//# sourceMappingURL=SharedFlow.mjs.map
