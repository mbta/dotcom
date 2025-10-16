import { get_NULL2w9d0rq01h4d4 as get_NULL } from './internal/NullSurrogate.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { SubscribedFlowCollector17ch8by19noql as SubscribedFlowCollector } from './Share.mjs';
import {
  Key_instance2tirv2rj82ml4 as Key_instance,
  ensureActive159jflbg22qd8 as ensureActive,
} from '../Job.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  AbstractSharedFlow1jjql04jld86z as AbstractSharedFlow,
  AbstractSharedFlowSlot2hcw2f06t03o0 as AbstractSharedFlowSlot,
  get_EMPTY_RESUMES1se3895plb5u1 as get_EMPTY_RESUMES,
} from './internal/AbstractSharedFlow.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from './FlowCollector.mjs';
import { WorkaroundAtomicReferenceffrdgqzvruxm as WorkaroundAtomicReference } from '../internal/Concurrent.mjs';
import {
  get_value25984ewdr2w0r as get_value,
  set_valueed6qkgof2us7 as set_value,
} from '../internal/Concurrent.common.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../CancellableContinuationImpl.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from '../internal/Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_NONE() {
  _init_properties_StateFlow_kt__eu9yi5();
  return NONE;
}
var NONE;
function get_PENDING() {
  _init_properties_StateFlow_kt__eu9yi5();
  return PENDING;
}
var PENDING;
function MutableStateFlow(value) {
  _init_properties_StateFlow_kt__eu9yi5();
  return new (StateFlowImpl())(value == null ? get_NULL() : value);
}
function updateState($this, expectedState, newState) {
  var curSequence;
  var curSlots;
  // Inline function 'kotlinx.coroutines.internal.synchronized' call
  // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
  var oldState = $this.g2q_1.kotlinx$atomicfu$value;
  if (!(expectedState == null) && !equals(oldState, expectedState))
    return false;
  if (equals(oldState, newState))
    return true;
  $this.g2q_1.kotlinx$atomicfu$value = newState;
  curSequence = $this.h2q_1;
  if ((curSequence & 1) === 0) {
    curSequence = curSequence + 1 | 0;
    $this.h2q_1 = curSequence;
  } else {
    $this.h2q_1 = curSequence + 2 | 0;
    return true;
  }
  curSlots = $this.o2o_1;
  while (true) {
    var tmp0_safe_receiver = curSlots;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var inductionVariable = 0;
      var last = tmp0_safe_receiver.length;
      while (inductionVariable < last) {
        var element = tmp0_safe_receiver[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (element == null)
          null;
        else {
          element.j2q();
        }
      }
    }
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    if ($this.h2q_1 === curSequence) {
      $this.h2q_1 = curSequence + 1 | 0;
      return true;
    }
    curSequence = $this.h2q_1;
    curSlots = $this.o2o_1;
  }
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.s2q_1 = _this__u8e3s4;
        this.t2q_1 = collector;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 12;
                this.u2q_1 = this.s2q_1.n2p();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 11;
                var tmp_0 = this.t2q_1;
                if (tmp_0 instanceof SubscribedFlowCollector()) {
                  this.fd_1 = 2;
                  suspendResult = this.t2q_1.q2p(this);
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
                tmp_1.w2q_1 = this.ld().sd(Key_instance);
                this.x2q_1 = null;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                if (!true) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.y2q_1 = this.s2q_1.g2q_1.kotlinx$atomicfu$value;
                var tmp0_safe_receiver = this.w2q_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  ensureActive(tmp0_safe_receiver);
                }

                if (this.x2q_1 == null || !equals(this.x2q_1, this.y2q_1)) {
                  this.fd_1 = 5;
                  var tmp0 = get_NULL();
                  var value = this.y2q_1;
                  var tmp_2;
                  if (value === tmp0) {
                    tmp_2 = (null == null ? true : !(null == null)) ? null : THROW_CCE();
                  } else {
                    tmp_2 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
                  }
                  suspendResult = this.t2q_1.z2n(tmp_2, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 6;
                  continue $sm;
                }

              case 5:
                this.x2q_1 = this.y2q_1;
                this.fd_1 = 6;
                continue $sm;
              case 6:
                if (!this.u2q_1.a2r()) {
                  this.fd_1 = 7;
                  suspendResult = this.u2q_1.z2q(this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 8;
                  continue $sm;
                }

              case 7:
                this.fd_1 = 8;
                continue $sm;
              case 8:
                this.fd_1 = 4;
                continue $sm;
              case 9:
                this.v2q_1 = Unit_instance;
                this.gd_1 = 12;
                this.fd_1 = 10;
                continue $sm;
              case 10:
                this.gd_1 = 12;
                this.s2q_1.r2p(this.u2q_1);
                return Unit_instance;
              case 11:
                this.gd_1 = 12;
                var t = this.id_1;
                this.s2q_1.r2p(this.u2q_1);
                throw t;
              case 12:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 12) {
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
var StateFlowImplClass;
function StateFlowImpl() {
  if (StateFlowImplClass === VOID) {
    class $ extends AbstractSharedFlow() {
      constructor(initialState) {
        super();
        this.g2q_1 = atomic$ref$1(initialState);
        this.h2q_1 = 0;
      }
      b2r(value) {
        updateState(this, null, value == null ? get_NULL() : value);
      }
      v1() {
        var tmp0 = get_NULL();
        // Inline function 'kotlinx.coroutines.internal.Symbol.unbox' call
        var value = this.g2q_1.kotlinx$atomicfu$value;
        var tmp;
        if (value === tmp0) {
          tmp = (null == null ? true : !(null == null)) ? null : THROW_CCE();
        } else {
          tmp = (value == null ? true : !(value == null)) ? value : THROW_CCE();
        }
        return tmp;
      }
      c2r(expect, update) {
        var tmp = expect == null ? get_NULL() : expect;
        return updateState(this, tmp, update == null ? get_NULL() : update);
      }
      u2p(value) {
        this.b2r(value);
        return true;
      }
      z2n(value, $completion) {
        this.b2r(value);
        return Unit_instance;
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
      w2p() {
        return new (StateFlowSlot())();
      }
      x2p(size) {
        // Inline function 'kotlin.arrayOfNulls' call
        return Array(size);
      }
    }
    initMetadataForClass($, 'StateFlowImpl', VOID, VOID, [AbstractSharedFlow(), FlowCollector()], [1]);
    StateFlowImplClass = $;
  }
  return StateFlowImplClass;
}
var StateFlowSlotClass;
function StateFlowSlot() {
  if (StateFlowSlotClass === VOID) {
    class $ extends AbstractSharedFlowSlot() {
      constructor() {
        super();
        this.i2q_1 = new (WorkaroundAtomicReference())(null);
      }
      d2r(flow) {
        if (!(get_value(this.i2q_1) == null))
          return false;
        set_value(this.i2q_1, get_NONE());
        return true;
      }
      z2p(flow) {
        return this.d2r(flow instanceof StateFlowImpl() ? flow : THROW_CCE());
      }
      e2r(flow) {
        set_value(this.i2q_1, null);
        return get_EMPTY_RESUMES();
      }
      b2q(flow) {
        return this.e2r(flow instanceof StateFlowImpl() ? flow : THROW_CCE());
      }
      j2q() {
        // Inline function 'kotlinx.coroutines.internal.loop' call
        var this_0 = this.i2q_1;
        while (true) {
          var state = get_value(this_0);
          if (state == null)
            return Unit_instance;
          else if (state === get_PENDING())
            return Unit_instance;
          else if (state === get_NONE()) {
            if (this.i2q_1.g2r(state, get_PENDING()))
              return Unit_instance;
          } else {
            if (this.i2q_1.g2r(state, get_NONE())) {
              // Inline function 'kotlin.coroutines.resume' call
              var this_1 = state instanceof CancellableContinuationImpl() ? state : THROW_CCE();
              // Inline function 'kotlin.Companion.success' call
              var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
              this_1.qd(tmp$ret$0);
              return Unit_instance;
            }
          }
        }
      }
      a2r() {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlinx.coroutines.assert' call
        return ensureNotNull(this.i2q_1.h2r(get_NONE())) === get_PENDING();
      }
      z2q($completion) {
        var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
        cancellable.f26();
        $l$block: {
          // Inline function 'kotlinx.coroutines.assert' call
          if (this.i2q_1.g2r(get_NONE(), cancellable)) {
            break $l$block;
          }
          // Inline function 'kotlinx.coroutines.assert' call
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
          cancellable.qd(tmp$ret$3);
        }
        return cancellable.e23();
      }
    }
    initMetadataForClass($, 'StateFlowSlot', StateFlowSlot, VOID, VOID, [0]);
    StateFlowSlotClass = $;
  }
  return StateFlowSlotClass;
}
var properties_initialized_StateFlow_kt_nsqikx;
function _init_properties_StateFlow_kt__eu9yi5() {
  if (!properties_initialized_StateFlow_kt_nsqikx) {
    properties_initialized_StateFlow_kt_nsqikx = true;
    NONE = new (Symbol())('NONE');
    PENDING = new (Symbol())('PENDING');
  }
}
//region block: exports
export {
  MutableStateFlow as MutableStateFlow34bfoyvwu8czu,
};
//endregion

//# sourceMappingURL=StateFlow.mjs.map
