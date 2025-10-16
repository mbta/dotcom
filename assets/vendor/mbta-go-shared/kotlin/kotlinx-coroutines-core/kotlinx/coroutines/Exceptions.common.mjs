import {
  RuntimeException1r3t0zl97011n as RuntimeException,
  Error3ofk6owajcepa as Error_0,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompletionHandlerExceptionClass;
function CompletionHandlerException() {
  if (CompletionHandlerExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static t25(message, cause) {
        var $this = this.yf(message, cause);
        captureStack($this, $this.s25_1);
        return $this;
      }
    }
    initMetadataForClass($, 'CompletionHandlerException');
    CompletionHandlerExceptionClass = $;
  }
  return CompletionHandlerExceptionClass;
}
var CoroutinesInternalErrorClass;
function CoroutinesInternalError() {
  if (CoroutinesInternalErrorClass === VOID) {
    class $ extends Error_0() {
      static v29(message, cause) {
        var $this = this.eg(message, cause);
        captureStack($this, $this.u29_1);
        return $this;
      }
    }
    initMetadataForClass($, 'CoroutinesInternalError');
    CoroutinesInternalErrorClass = $;
  }
  return CoroutinesInternalErrorClass;
}
//region block: exports
export {
  CompletionHandlerException as CompletionHandlerException1h8udyjlr1wky,
  CoroutinesInternalError as CoroutinesInternalError3t354dypw0kr6,
};
//endregion

//# sourceMappingURL=Exceptions.common.mjs.map
