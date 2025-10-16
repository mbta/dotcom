import { DispatchException248dwsudeuh1h as DispatchException } from './DispatchedTask.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { handleUncaughtCoroutineException1odqiok7z7b0h as handleUncaughtCoroutineException } from './internal/CoroutineExceptionHandlerImpl.common.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { RuntimeException1r3t0zl97011n as RuntimeException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function handleCoroutineException(context, exception) {
  var tmp;
  if (exception instanceof DispatchException()) {
    tmp = exception.p28_1;
  } else {
    tmp = exception;
  }
  var reportException = tmp;
  try {
    var tmp0_safe_receiver = context.sd(Key_instance);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      tmp0_safe_receiver.r28(context, reportException);
      return Unit_instance;
    }
  } catch ($p) {
    if ($p instanceof Error) {
      var t = $p;
      handleUncaughtCoroutineException(context, handlerException(reportException, t));
      return Unit_instance;
    } else {
      throw $p;
    }
  }
  handleUncaughtCoroutineException(context, reportException);
}
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
}
function handlerException(originalException, thrownException) {
  if (originalException === thrownException)
    return originalException;
  // Inline function 'kotlin.apply' call
  var this_0 = RuntimeException().yf('Exception while trying to handle coroutine exception', thrownException);
  addSuppressed(this_0, originalException);
  return this_0;
}
//region block: init
Key_instance = new (Key())();
//endregion
//region block: exports
export {
  Key_instance as Key_instance2ye2t23iqghop,
  handleCoroutineException as handleCoroutineExceptionv1m1bdk4j2te,
  handlerException as handlerExceptionbt3jhgjzc80k,
};
//endregion

//# sourceMappingURL=CoroutineExceptionHandler.mjs.map
