import { recoverStackTrace2i3si2i8nvw1k as recoverStackTrace } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/internal/StackTraceRecovery.mjs';
import { withCausej2y4rjnimuh7 as withCause } from './StackTraceRecoverJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function recoverStackTraceBridge(exception, continuation) {
  var tmp;
  try {
    tmp = withCause(recoverStackTrace(exception, continuation), exception.cause);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var _unused_var__etf5q3 = $p;
      tmp_0 = exception;
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  return tmp;
}
//region block: exports
export {
  recoverStackTraceBridge as recoverStackTraceBridge1qu82j8ymuquf,
};
//endregion

//# sourceMappingURL=StackTraceRecover.mjs.map
