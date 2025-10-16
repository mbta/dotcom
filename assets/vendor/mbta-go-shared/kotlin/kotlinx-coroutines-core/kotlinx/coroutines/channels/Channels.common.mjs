import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CancellationExceptionjngvjj221x3v as CancellationException_0 } from '../Exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function cancelConsumed(_this__u8e3s4, cause) {
  var tmp;
  if (cause == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp0_elvis_lhs = cause instanceof CancellationException() ? cause : null;
    tmp = tmp0_elvis_lhs == null ? CancellationException_0('Channel was consumed, consumer had failed', cause) : tmp0_elvis_lhs;
  }
  _this__u8e3s4.g22(tmp);
}
//region block: exports
export {
  cancelConsumed as cancelConsumed2i0oizqhmljf6,
};
//endregion

//# sourceMappingURL=Channels.common.mjs.map
