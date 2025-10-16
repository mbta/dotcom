import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function unwrapCancellationException(_this__u8e3s4) {
  var exception = _this__u8e3s4;
  $l$loop: while (exception instanceof CancellationException()) {
    if (equals(exception, exception.cause)) {
      return _this__u8e3s4;
    }
    exception = exception.cause;
  }
  var tmp0_elvis_lhs = exception;
  return tmp0_elvis_lhs == null ? _this__u8e3s4 : tmp0_elvis_lhs;
}
//region block: exports
export {
  unwrapCancellationException as unwrapCancellationException1zvbmufui4i9c,
};
//endregion

//# sourceMappingURL=ExceptionUtils.nonJvm.mjs.map
