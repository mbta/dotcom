import { captureStack1fzi4aczwc4hg as captureStack } from '../../js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_coroutines_cancellation_CancellationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.ee_1);
}
var CancellationExceptionClass;
function CancellationException() {
  if (CancellationExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static fe() {
        var $this = this.ge();
        init_kotlin_coroutines_cancellation_CancellationException($this);
        return $this;
      }
      static he(message) {
        var $this = this.o5(message);
        init_kotlin_coroutines_cancellation_CancellationException($this);
        return $this;
      }
      static ie(message, cause) {
        var $this = this.je(message, cause);
        init_kotlin_coroutines_cancellation_CancellationException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'CancellationException', $.fe);
    CancellationExceptionClass = $;
  }
  return CancellationExceptionClass;
}
//region block: exports
export {
  CancellationException as CancellationException3b36o9qz53rgr,
};
//endregion

//# sourceMappingURL=CancellationException.mjs.map
