import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from '../CoroutineExceptionHandler.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { RuntimeException1r3t0zl97011n as RuntimeException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function callUndeliveredElement(_this__u8e3s4, element, context) {
  var tmp0_safe_receiver = callUndeliveredElementCatchingException(_this__u8e3s4, element, null);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    handleCoroutineException(context, tmp0_safe_receiver);
  }
}
var UndeliveredElementExceptionClass;
function UndeliveredElementException() {
  if (UndeliveredElementExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static f2v(message, cause) {
        var $this = this.yf(message, cause);
        captureStack($this, $this.e2v_1);
        return $this;
      }
    }
    initMetadataForClass($, 'UndeliveredElementException');
    UndeliveredElementExceptionClass = $;
  }
  return UndeliveredElementExceptionClass;
}
function callUndeliveredElementCatchingException(_this__u8e3s4, element, undeliveredElementException) {
  undeliveredElementException = undeliveredElementException === VOID ? null : undeliveredElementException;
  try {
    _this__u8e3s4(element);
  } catch ($p) {
    if ($p instanceof Error) {
      var ex = $p;
      if (!(undeliveredElementException == null) && !(undeliveredElementException.cause === ex)) {
        addSuppressed(undeliveredElementException, ex);
      } else {
        return UndeliveredElementException().f2v('Exception in undelivered element handler for ' + toString(element), ex);
      }
    } else {
      throw $p;
    }
  }
  return undeliveredElementException;
}
//region block: exports
export {
  callUndeliveredElementCatchingException as callUndeliveredElementCatchingException6xwxmojd3rq1,
  callUndeliveredElement as callUndeliveredElement5xsmnofvtcme,
};
//endregion

//# sourceMappingURL=OnUndeliveredElement.mjs.map
