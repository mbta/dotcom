import {
  get_platformExceptionHandlers2k88c6wpwtspf as get_platformExceptionHandlers,
  propagateExceptionFinalResort3uf2dkl63idew as propagateExceptionFinalResort,
  DiagnosticCoroutineContextException2e2ligokby0yu as DiagnosticCoroutineContextException,
} from './CoroutineExceptionHandlerImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { handlerExceptionbt3jhgjzc80k as handlerException } from '../CoroutineExceptionHandler.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function handleUncaughtCoroutineException(context, exception) {
  var _iterator__ex2g4s = get_platformExceptionHandlers().x();
  while (_iterator__ex2g4s.y()) {
    var handler = _iterator__ex2g4s.z();
    try {
      handler.r28(context, exception);
    } catch ($p) {
      if ($p instanceof ExceptionSuccessfullyProcessed()) {
        var _unused_var__etf5q3 = $p;
        return Unit_instance;
      } else {
        if ($p instanceof Error) {
          var t = $p;
          propagateExceptionFinalResort(handlerException(exception, t));
        } else {
          throw $p;
        }
      }
    }
  }
  try {
    addSuppressed(exception, DiagnosticCoroutineContextException().z2u(context));
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
    } else {
      throw $p;
    }
  }
  propagateExceptionFinalResort(exception);
}
var ExceptionSuccessfullyProcessedClass;
function ExceptionSuccessfullyProcessed() {
  if (ExceptionSuccessfullyProcessedClass === VOID) {
    class $ extends Exception() {}
    initMetadataForObject($, 'ExceptionSuccessfullyProcessed');
    ExceptionSuccessfullyProcessedClass = $;
  }
  return ExceptionSuccessfullyProcessedClass;
}
//region block: exports
export {
  handleUncaughtCoroutineException as handleUncaughtCoroutineException1odqiok7z7b0h,
};
//endregion

//# sourceMappingURL=CoroutineExceptionHandlerImpl.common.mjs.map
