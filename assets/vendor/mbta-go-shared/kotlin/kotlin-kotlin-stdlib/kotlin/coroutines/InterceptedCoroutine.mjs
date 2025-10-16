import { boxApply1qmzdb3dh90hg as boxApply } from '../js/coreRuntime.mjs';
import { Key_instance17k9ki7fvysxq as Key_instance } from './ContinuationInterceptor.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../hacks.mjs';
import { CompletedContinuation_instance3dg1zdo5y8x70 as CompletedContinuation_instance } from './CoroutineImpl.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from './Continuation.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var InterceptedCoroutineClass;
function InterceptedCoroutine() {
  if (InterceptedCoroutineClass === VOID) {
    class $ {
      constructor($box) {
        boxApply(this, $box);
        this.od_1 = null;
      }
      rd() {
        var tmp0_elvis_lhs = this.od_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var tmp1_safe_receiver = this.ld().sd(Key_instance);
          var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.td(this);
          // Inline function 'kotlin.also' call
          var this_0 = tmp2_elvis_lhs == null ? this : tmp2_elvis_lhs;
          this.od_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      pd() {
        var intercepted = this.od_1;
        if (!(intercepted == null) && !(intercepted === this)) {
          ensureNotNull(this.ld().sd(Key_instance)).ud(intercepted);
        }
        this.od_1 = CompletedContinuation_instance;
      }
    }
    initMetadataForClass($, 'InterceptedCoroutine', VOID, VOID, [Continuation()]);
    InterceptedCoroutineClass = $;
  }
  return InterceptedCoroutineClass;
}
//region block: exports
export {
  InterceptedCoroutine as InterceptedCoroutine142wh200e9wbr,
};
//endregion

//# sourceMappingURL=InterceptedCoroutine.mjs.map
