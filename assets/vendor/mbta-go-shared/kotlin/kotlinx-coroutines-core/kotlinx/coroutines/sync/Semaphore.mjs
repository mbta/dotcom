import { toLongw1zpgk99d84b as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import {
  findSegmentInternal35lxp6iondi3q as findSegmentInternal,
  _SegmentOrClosed___get_segment__impl__jvcr9l1chmpjvbuseuk as _SegmentOrClosed___get_segment__impl__jvcr9l,
  _SegmentOrClosed___get_isClosed__impl__qmxmlo3e3mrt157zasn as _SegmentOrClosed___get_isClosed__impl__qmxmlo,
  Segmentqmq1glevgieu as Segment,
} from '../internal/ConcurrentLinkedList.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { SelectInstance2isepgzfsd8ur as SelectInstance } from '../selects/Select.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CancellableContinuationpb2x00mxmcbt as CancellableContinuation } from '../CancellableContinuation.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  atomic$long$129k9zwo6n9ogd as atomic$long$1,
  atomic$ref$130aurmcwdfdf1 as atomic$ref$1,
  atomic$int$11d5swdyn6j0pu as atomic$int$1,
} from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { Waiter3lxa2a79zyo0g as Waiter } from '../Waiter.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { atomicfu$AtomicRefArray$ofNulls2kz3j9ehigwa3 as atomicfu$AtomicRefArray$ofNulls } from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.common.mjs';
import { systemProp2qpti4y1f5b4b as systemProp } from '../internal/SystemProps.common.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from '../internal/Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_MAX_SPIN_CYCLES() {
  _init_properties_Semaphore_kt__t514r6();
  return MAX_SPIN_CYCLES;
}
var MAX_SPIN_CYCLES;
function get_PERMIT() {
  _init_properties_Semaphore_kt__t514r6();
  return PERMIT;
}
var PERMIT;
function get_TAKEN() {
  _init_properties_Semaphore_kt__t514r6();
  return TAKEN;
}
var TAKEN;
function get_BROKEN() {
  _init_properties_Semaphore_kt__t514r6();
  return BROKEN;
}
var BROKEN;
function get_CANCELLED() {
  _init_properties_Semaphore_kt__t514r6();
  return CANCELLED;
}
var CANCELLED;
function get_SEGMENT_SIZE() {
  _init_properties_Semaphore_kt__t514r6();
  return SEGMENT_SIZE;
}
var SEGMENT_SIZE;
function decPermits($this) {
  $l$loop: while (true) {
    var p = $this.g2w_1.atomicfu$getAndDecrement();
    if (p > $this.b2w_1)
      continue $l$loop;
    return p;
  }
}
function coerceAvailablePermitsAtMaximum($this) {
  $l$loop_0: while (true) {
    var cur = $this.g2w_1.kotlinx$atomicfu$value;
    if (cur <= $this.b2w_1)
      break $l$loop_0;
    if ($this.g2w_1.atomicfu$compareAndSet(cur, $this.b2w_1))
      break $l$loop_0;
  }
}
function addAcquireToQueue($this, waiter) {
  var curTail = $this.e2w_1.kotlinx$atomicfu$value;
  var enqIdx = $this.f2w_1.atomicfu$getAndIncrement$long();
  var createNewSegment = createSegment$ref();
  var tmp0 = $this.e2w_1;
  // Inline function 'kotlin.Long.div' call
  var other = get_SEGMENT_SIZE();
  var tmp2 = enqIdx.i4(toLong(other));
  var tmp$ret$3;
  $l$block_2: {
    // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
    while (true) {
      var s = findSegmentInternal(curTail, tmp2, createNewSegment);
      var tmp;
      if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
        tmp = true;
      } else {
        var tmp2_0 = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
        var tmp$ret$1;
        $l$block_1: {
          // Inline function 'kotlinx.coroutines.internal.moveForward' call
          while (true) {
            var cur = tmp0.kotlinx$atomicfu$value;
            if (cur.n25_1.d2(tmp2_0.n25_1) >= 0) {
              tmp$ret$1 = true;
              break $l$block_1;
            }
            if (!tmp2_0.f2g()) {
              tmp$ret$1 = false;
              break $l$block_1;
            }
            if (tmp0.atomicfu$compareAndSet(cur, tmp2_0)) {
              if (cur.g2g()) {
                cur.z6();
              }
              tmp$ret$1 = true;
              break $l$block_1;
            }
            if (tmp2_0.g2g()) {
              tmp2_0.z6();
            }
          }
          tmp$ret$1 = Unit_instance;
        }
        tmp = tmp$ret$1;
      }
      if (tmp) {
        tmp$ret$3 = s;
        break $l$block_2;
      }
    }
  }
  var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(tmp$ret$3);
  // Inline function 'kotlin.Long.rem' call
  var other_0 = get_SEGMENT_SIZE();
  var i = enqIdx.j4(toLong(other_0)).f2();
  // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
  if (segment.t2w_1.atomicfu$get(i).atomicfu$compareAndSet(null, waiter)) {
    waiter.s26(segment, i);
    return true;
  }
  var tmp4 = get_PERMIT();
  // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
  var value = get_TAKEN();
  if (segment.t2w_1.atomicfu$get(i).atomicfu$compareAndSet(tmp4, value)) {
    if (isInterface(waiter, CancellableContinuation())) {
      if (!isInterface(waiter, CancellableContinuation()))
        THROW_CCE();
      waiter.p24(Unit_instance, $this.h2w_1);
    } else {
      if (isInterface(waiter, SelectInstance())) {
        waiter.i2v(Unit_instance);
      } else {
        // Inline function 'kotlin.error' call
        var message = 'unexpected: ' + toString(waiter);
        throw IllegalStateException().o5(toString(message));
      }
    }
    return true;
  }
  // Inline function 'kotlinx.coroutines.assert' call
  return false;
}
function tryResumeNextFromQueue($this) {
  var curHead = $this.c2w_1.kotlinx$atomicfu$value;
  var deqIdx = $this.d2w_1.atomicfu$getAndIncrement$long();
  // Inline function 'kotlin.Long.div' call
  var other = get_SEGMENT_SIZE();
  var id = deqIdx.i4(toLong(other));
  var createNewSegment = createSegment$ref_0();
  var tmp0 = $this.c2w_1;
  var tmp$ret$3;
  $l$block_2: {
    // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
    while (true) {
      var s = findSegmentInternal(curHead, id, createNewSegment);
      var tmp;
      if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
        tmp = true;
      } else {
        var tmp2 = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
        var tmp$ret$1;
        $l$block_1: {
          // Inline function 'kotlinx.coroutines.internal.moveForward' call
          while (true) {
            var cur = tmp0.kotlinx$atomicfu$value;
            if (cur.n25_1.d2(tmp2.n25_1) >= 0) {
              tmp$ret$1 = true;
              break $l$block_1;
            }
            if (!tmp2.f2g()) {
              tmp$ret$1 = false;
              break $l$block_1;
            }
            if (tmp0.atomicfu$compareAndSet(cur, tmp2)) {
              if (cur.g2g()) {
                cur.z6();
              }
              tmp$ret$1 = true;
              break $l$block_1;
            }
            if (tmp2.g2g()) {
              tmp2.z6();
            }
          }
          tmp$ret$1 = Unit_instance;
        }
        tmp = tmp$ret$1;
      }
      if (tmp) {
        tmp$ret$3 = s;
        break $l$block_2;
      }
    }
  }
  var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(tmp$ret$3);
  segment.n2g();
  if (segment.n25_1.d2(id) > 0)
    return false;
  // Inline function 'kotlin.Long.rem' call
  var other_0 = get_SEGMENT_SIZE();
  var i = deqIdx.j4(toLong(other_0)).f2();
  // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.getAndSet' call
  var value = get_PERMIT();
  var cellState = segment.t2w_1.atomicfu$get(i).atomicfu$getAndSet(value);
  if (cellState === null) {
    // Inline function 'kotlin.repeat' call
    var times = get_MAX_SPIN_CYCLES();
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.get' call
        if (segment.t2w_1.atomicfu$get(i).kotlinx$atomicfu$value === get_TAKEN())
          return true;
      }
       while (inductionVariable < times);
    var tmp4 = get_PERMIT();
    // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
    var value_0 = get_BROKEN();
    return !segment.t2w_1.atomicfu$get(i).atomicfu$compareAndSet(tmp4, value_0);
  } else if (cellState === get_CANCELLED())
    return false;
  else
    return tryResumeAcquire($this, cellState);
}
function tryResumeAcquire($this, _this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, CancellableContinuation())) {
    if (!isInterface(_this__u8e3s4, CancellableContinuation()))
      THROW_CCE();
    var token = _this__u8e3s4.j24(Unit_instance, null, $this.h2w_1);
    var tmp_0;
    if (!(token == null)) {
      _this__u8e3s4.k24(token);
      tmp_0 = true;
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    if (isInterface(_this__u8e3s4, SelectInstance())) {
      tmp = _this__u8e3s4.g2i($this, Unit_instance);
    } else {
      var message = 'unexpected: ' + toString(_this__u8e3s4);
      throw IllegalStateException().o5(toString(message));
    }
  }
  return tmp;
}
function SemaphoreAndMutexImpl$onCancellationRelease$lambda(this$0) {
  return function (_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
    this$0.i1l();
    return Unit_instance;
  };
}
function createSegment$ref() {
  var l = function (p0, p1) {
    return createSegment(p0, p1);
  };
  l.callableName = 'createSegment';
  return l;
}
function createSegment$ref_0() {
  var l = function (p0, p1) {
    return createSegment(p0, p1);
  };
  l.callableName = 'createSegment';
  return l;
}
var SemaphoreAndMutexImplClass;
function SemaphoreAndMutexImpl() {
  if (SemaphoreAndMutexImplClass === VOID) {
    class $ {
      constructor(permits, acquiredPermits) {
        this.b2w_1 = permits;
        this.d2w_1 = atomic$long$1(new (Long())(0, 0));
        this.f2w_1 = atomic$long$1(new (Long())(0, 0));
        // Inline function 'kotlin.require' call
        if (!(this.b2w_1 > 0)) {
          var message = 'Semaphore should have at least 1 permit, but had ' + this.b2w_1;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(0 <= acquiredPermits ? acquiredPermits <= this.b2w_1 : false)) {
          var message_0 = 'The number of acquired permits should be in 0..' + this.b2w_1;
          throw IllegalArgumentException().q(toString(message_0));
        }
        var s = new (SemaphoreSegment())(new (Long())(0, 0), null, 2);
        this.c2w_1 = atomic$ref$1(s);
        this.e2w_1 = atomic$ref$1(s);
        this.g2w_1 = atomic$int$1(this.b2w_1 - acquiredPermits | 0);
        var tmp = this;
        tmp.h2w_1 = SemaphoreAndMutexImpl$onCancellationRelease$lambda(this);
      }
      m2w() {
        // Inline function 'kotlin.math.max' call
        var a = this.g2w_1.kotlinx$atomicfu$value;
        return Math.max(a, 0);
      }
      i2w() {
        $l$loop: while (true) {
          var p = this.g2w_1.kotlinx$atomicfu$value;
          if (p > this.b2w_1) {
            coerceAvailablePermitsAtMaximum(this);
            continue $l$loop;
          }
          if (p <= 0)
            return false;
          if (this.g2w_1.atomicfu$compareAndSet(p, p - 1 | 0))
            return true;
        }
      }
      acquireCont(waiter) {
        var tmp$ret$1;
        $l$block_0: {
          // Inline function 'kotlinx.coroutines.sync.SemaphoreAndMutexImpl.acquire' call
          while (true) {
            var p = decPermits(this);
            if (p > 0) {
              waiter.p24(Unit_instance, this.h2w_1);
              tmp$ret$1 = Unit_instance;
              break $l$block_0;
            }
            if (addAcquireToQueue(this, isInterface(waiter, Waiter()) ? waiter : THROW_CCE())) {
              tmp$ret$1 = Unit_instance;
              break $l$block_0;
            }
          }
          tmp$ret$1 = Unit_instance;
        }
        return tmp$ret$1;
      }
      i1l() {
        while (true) {
          var p = this.g2w_1.atomicfu$getAndIncrement();
          if (p >= this.b2w_1) {
            coerceAvailablePermitsAtMaximum(this);
            // Inline function 'kotlin.error' call
            var message = 'The number of released permits cannot be greater than ' + this.b2w_1;
            throw IllegalStateException().o5(toString(message));
          }
          if (p >= 0)
            return Unit_instance;
          if (tryResumeNextFromQueue(this))
            return Unit_instance;
        }
      }
    }
    initMetadataForClass($, 'SemaphoreAndMutexImpl', VOID, VOID, VOID, [0]);
    SemaphoreAndMutexImplClass = $;
  }
  return SemaphoreAndMutexImplClass;
}
var SemaphoreSegmentClass;
function SemaphoreSegment() {
  if (SemaphoreSegmentClass === VOID) {
    class $ extends Segment() {
      constructor(id, prev, pointers) {
        super(id, prev, pointers);
        this.t2w_1 = atomicfu$AtomicRefArray$ofNulls(get_SEGMENT_SIZE());
      }
      g2f() {
        return get_SEGMENT_SIZE();
      }
      p25(index, cause, context) {
        // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.set' call
        var value = get_CANCELLED();
        this.t2w_1.atomicfu$get(index).kotlinx$atomicfu$value = value;
        this.d2g();
      }
      toString() {
        return 'SemaphoreSegment[id=' + this.n25_1.toString() + ', hashCode=' + hashCode(this) + ']';
      }
    }
    initMetadataForClass($, 'SemaphoreSegment');
    SemaphoreSegmentClass = $;
  }
  return SemaphoreSegmentClass;
}
function createSegment(id, prev) {
  _init_properties_Semaphore_kt__t514r6();
  return new (SemaphoreSegment())(id, prev, 0);
}
var properties_initialized_Semaphore_kt_uqcwok;
function _init_properties_Semaphore_kt__t514r6() {
  if (!properties_initialized_Semaphore_kt_uqcwok) {
    properties_initialized_Semaphore_kt_uqcwok = true;
    MAX_SPIN_CYCLES = systemProp('kotlinx.coroutines.semaphore.maxSpinCycles', 100);
    PERMIT = new (Symbol())('PERMIT');
    TAKEN = new (Symbol())('TAKEN');
    BROKEN = new (Symbol())('BROKEN');
    CANCELLED = new (Symbol())('CANCELLED');
    SEGMENT_SIZE = systemProp('kotlinx.coroutines.semaphore.segmentSize', 16);
  }
}
//region block: exports
export {
  SemaphoreAndMutexImpl as SemaphoreAndMutexImplgyx1507kqsum,
};
//endregion

//# sourceMappingURL=Semaphore.mjs.map
