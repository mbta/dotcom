import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbortFlowExceptionClass;
function AbortFlowException() {
  if (AbortFlowExceptionClass === VOID) {
    class $ extends CancellationException() {
      static f2u(owner) {
        var $this = this.he('Flow was aborted, no more elements needed');
        captureStack($this, $this.a2s_1);
        $this.z2r_1 = owner;
        return $this;
      }
    }
    initMetadataForClass($, 'AbortFlowException');
    AbortFlowExceptionClass = $;
  }
  return AbortFlowExceptionClass;
}
//region block: exports
export {
  AbortFlowException as AbortFlowException2zdgh4w7z3hep,
};
//endregion

//# sourceMappingURL=FlowExceptions.mjs.map
