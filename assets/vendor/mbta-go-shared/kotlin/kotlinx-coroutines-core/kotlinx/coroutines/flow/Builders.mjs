import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function asFlow(_this__u8e3s4) {
  // Inline function 'kotlinx.coroutines.flow.internal.unsafeFlow' call
  return new (asFlow$$inlined$unsafeFlow$1())(_this__u8e3s4);
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.o2n_1 = _this__u8e3s4;
        this.p2n_1 = collector;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                var tmp_0 = this;
                tmp_0.q2n_1 = this.p2n_1;
                this.r2n_1 = this.q2n_1;
                var tmp_1 = this;
                tmp_1.s2n_1 = this.o2n_1.y2n_1;
                this.t2n_1 = this.s2n_1;
                this.u2n_1 = this.t2n_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.u2n_1.y()) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                this.v2n_1 = this.u2n_1.z();
                var tmp_2 = this;
                tmp_2.w2n_1 = this.v2n_1;
                this.x2n_1 = this.w2n_1;
                this.fd_1 = 2;
                suspendResult = this.r2n_1.z2n(this.x2n_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.fd_1 = 1;
                continue $sm;
              case 3:
                return Unit_instance;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
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
var asFlow$$inlined$unsafeFlow$1Class;
function asFlow$$inlined$unsafeFlow$1() {
  if (asFlow$$inlined$unsafeFlow$1Class === VOID) {
    class $ {
      constructor($this_asFlow) {
        this.y2n_1 = $this_asFlow;
      }
      a2o(collector, $completion) {
        var tmp = new ($collectCOROUTINE$())(this, collector, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      b2o(collector, $completion) {
        return this.a2o(collector, $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, VOID, [1]);
    asFlow$$inlined$unsafeFlow$1Class = $;
  }
  return asFlow$$inlined$unsafeFlow$1Class;
}
//region block: exports
export {
  asFlow as asFlow3ngsnn5xpz8pw,
};
//endregion

//# sourceMappingURL=Builders.mjs.map
