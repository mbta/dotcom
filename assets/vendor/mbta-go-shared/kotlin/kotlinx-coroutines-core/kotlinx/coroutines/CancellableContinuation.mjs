import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl,
  CancelHandler3ic7xysezxbm5 as CancelHandler,
} from './CancellableContinuationImpl.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { DispatchedContinuation8kf77e5g2ha2 as DispatchedContinuation } from './internal/DispatchedContinuation.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function cancel$default(cause, $super) {
  cause = cause === VOID ? null : cause;
  return $super === VOID ? this.l24(cause) : $super.l24.call(this, cause);
}
var CancellableContinuationClass;
function CancellableContinuation() {
  if (CancellableContinuationClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'CancellableContinuation', VOID, VOID, [Continuation()]);
    CancellableContinuationClass = $;
  }
  return CancellableContinuationClass;
}
function disposeOnCancellation(_this__u8e3s4, handle) {
  return invokeOnCancellation(_this__u8e3s4, new (DisposeOnCancel())(handle));
}
function invokeOnCancellation(_this__u8e3s4, handler) {
  var tmp;
  if (_this__u8e3s4 instanceof CancellableContinuationImpl()) {
    _this__u8e3s4.w24(handler);
    tmp = Unit_instance;
  } else {
    throw UnsupportedOperationException().f6('third-party implementation of CancellableContinuation is not supported');
  }
  return tmp;
}
var DisposeOnCancelClass;
function DisposeOnCancel() {
  if (DisposeOnCancelClass === VOID) {
    class $ {
      constructor(handle) {
        this.x24_1 = handle;
      }
      y24(cause) {
        return this.x24_1.z24();
      }
      toString() {
        return 'DisposeOnCancel[' + toString(this.x24_1) + ']';
      }
    }
    initMetadataForClass($, 'DisposeOnCancel', VOID, VOID, [CancelHandler()]);
    DisposeOnCancelClass = $;
  }
  return DisposeOnCancelClass;
}
function getOrCreateCancellableContinuation(delegate) {
  if (!(delegate instanceof DispatchedContinuation())) {
    return new (CancellableContinuationImpl())(delegate, 1);
  }
  var tmp0_safe_receiver = delegate.g25();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.takeIf' call
    var tmp_0;
    if (tmp0_safe_receiver.h25()) {
      tmp_0 = tmp0_safe_receiver;
    } else {
      tmp_0 = null;
    }
    tmp = tmp_0;
  }
  var tmp1_elvis_lhs = tmp;
  var tmp_1;
  if (tmp1_elvis_lhs == null) {
    return new (CancellableContinuationImpl())(delegate, 2);
  } else {
    tmp_1 = tmp1_elvis_lhs;
  }
  return tmp_1;
}
//region block: exports
export {
  cancel$default as cancel$default1r6ecuk0q8omy,
  CancellableContinuation as CancellableContinuationpb2x00mxmcbt,
  disposeOnCancellation as disposeOnCancellation302lv5bib5mna,
  getOrCreateCancellableContinuation as getOrCreateCancellableContinuation2t1o0dr9l9i36,
  invokeOnCancellation as invokeOnCancellationb68niwbjdmgy,
};
//endregion

//# sourceMappingURL=CancellableContinuation.mjs.map
