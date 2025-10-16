import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { SafeCollector3ss0wp8n80f6m as SafeCollector } from './internal/SafeCollector.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from './FlowCollector.mjs';
import { throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function asStateFlow(_this__u8e3s4) {
  return new (ReadonlyStateFlow())(_this__u8e3s4, null);
}
var $onSubscriptionCOROUTINE$Class;
function $onSubscriptionCOROUTINE$() {
  if ($onSubscriptionCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.n2s_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 7;
                var tmp_0 = this;
                tmp_0.o2s_1 = new (SafeCollector())(this.n2s_1.o2p_1, this.ld());
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 6;
                this.fd_1 = 2;
                suspendResult = this.n2s_1.p2p_1(this.o2s_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.p2s_1 = suspendResult;
                this.gd_1 = 7;
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 7;
                this.o2s_1.pd();
                var tmp_1 = this.n2s_1.o2p_1;
                if (tmp_1 instanceof SubscribedFlowCollector()) {
                  this.fd_1 = 4;
                  suspendResult = this.n2s_1.o2p_1.q2p(this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 5;
                  continue $sm;
                }

              case 4:
                this.fd_1 = 5;
                continue $sm;
              case 5:
                return Unit_instance;
              case 6:
                this.gd_1 = 7;
                var t = this.id_1;
                this.o2s_1.pd();
                throw t;
              case 7:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 7) {
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
    $onSubscriptionCOROUTINE$Class = $;
  }
  return $onSubscriptionCOROUTINE$Class;
}
var SubscribedFlowCollectorClass;
function SubscribedFlowCollector() {
  if (SubscribedFlowCollectorClass === VOID) {
    class $ {
      q2p($completion) {
        var tmp = new ($onSubscriptionCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    initMetadataForClass($, 'SubscribedFlowCollector', VOID, VOID, [FlowCollector()], [0, 1]);
    SubscribedFlowCollectorClass = $;
  }
  return SubscribedFlowCollectorClass;
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.y2s_1 = _this__u8e3s4;
        this.z2s_1 = collector;
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
                suspendResult = this.y2s_1.a2t_1.t2p(this.z2s_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                throwKotlinNothingValueException();
                break;
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
    $collectCOROUTINE$Class = $;
  }
  return $collectCOROUTINE$Class;
}
var ReadonlyStateFlowClass;
function ReadonlyStateFlow() {
  if (ReadonlyStateFlowClass === VOID) {
    class $ {
      constructor(flow, job) {
        this.a2t_1 = flow;
        this.b2t_1 = job;
      }
      v1() {
        return this.a2t_1.v1();
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
    }
    initMetadataForClass($, 'ReadonlyStateFlow', VOID, VOID, VOID, [1]);
    ReadonlyStateFlowClass = $;
  }
  return ReadonlyStateFlowClass;
}
//region block: exports
export {
  SubscribedFlowCollector as SubscribedFlowCollector17ch8by19noql,
  asStateFlow as asStateFlow34rribx643ke5,
};
//endregion

//# sourceMappingURL=Share.mjs.map
