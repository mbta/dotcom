import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { JobSupport3fdjh0rbee4be as JobSupport } from './JobSupport.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally } from './CompletionState.mjs';
import { Job29shfjfygy86k as Job } from './Job.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function CompletableDeferred(parent) {
  parent = parent === VOID ? null : parent;
  return new (CompletableDeferredImpl())(parent);
}
var $awaitCOROUTINE$Class;
function $awaitCOROUTINE$() {
  if ($awaitCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.d28_1 = _this__u8e3s4;
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
                suspendResult = this.d28_1.x22(this);
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
var CompletableDeferredImplClass;
function CompletableDeferredImpl() {
  if (CompletableDeferredImplClass === VOID) {
    class $ extends JobSupport() {
      constructor(parent) {
        super(true);
        this.s20(parent);
      }
      f22() {
        return true;
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
      g28(value) {
        return this.o22(value);
      }
      h28(exception) {
        return this.o22(new (CompletedExceptionally())(exception));
      }
    }
    initMetadataForClass($, 'CompletableDeferredImpl', VOID, VOID, [JobSupport(), Job()], [0]);
    CompletableDeferredImplClass = $;
  }
  return CompletableDeferredImplClass;
}
//region block: exports
export {
  CompletableDeferred as CompletableDeferred2lnqvsbvx74d3,
};
//endregion

//# sourceMappingURL=CompletableDeferred.mjs.map
