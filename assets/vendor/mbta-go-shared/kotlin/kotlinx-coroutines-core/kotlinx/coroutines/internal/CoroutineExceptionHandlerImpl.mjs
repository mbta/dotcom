import { RuntimeException1r3t0zl97011n as RuntimeException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function propagateExceptionFinalResort(exception) {
  console.error(exception.toString());
}
function get_platformExceptionHandlers_() {
  _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
  return platformExceptionHandlers_;
}
var platformExceptionHandlers_;
function get_platformExceptionHandlers() {
  _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
  return get_platformExceptionHandlers_();
}
var DiagnosticCoroutineContextExceptionClass;
function DiagnosticCoroutineContextException() {
  if (DiagnosticCoroutineContextExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static z2u(context) {
        var $this = this.fb(toString(context));
        captureStack($this, $this.y2u_1);
        return $this;
      }
    }
    initMetadataForClass($, 'DiagnosticCoroutineContextException');
    DiagnosticCoroutineContextExceptionClass = $;
  }
  return DiagnosticCoroutineContextExceptionClass;
}
var properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx;
function _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf() {
  if (!properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx) {
    properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx = true;
    // Inline function 'kotlin.collections.mutableSetOf' call
    platformExceptionHandlers_ = LinkedHashSet().f1();
  }
}
//region block: exports
export {
  DiagnosticCoroutineContextException as DiagnosticCoroutineContextException2e2ligokby0yu,
  get_platformExceptionHandlers as get_platformExceptionHandlers2k88c6wpwtspf,
  propagateExceptionFinalResort as propagateExceptionFinalResort3uf2dkl63idew,
};
//endregion

//# sourceMappingURL=CoroutineExceptionHandlerImpl.mjs.map
