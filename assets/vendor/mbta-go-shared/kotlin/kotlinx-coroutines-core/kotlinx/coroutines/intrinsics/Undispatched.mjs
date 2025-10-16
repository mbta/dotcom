import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { startCoroutineUninterceptedOrReturnNonGeneratorVersionyfrrvzbtl8bf as startCoroutineUninterceptedOrReturnNonGeneratorVersion } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { DispatchException248dwsudeuh1h as DispatchException } from '../DispatchedTask.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { CompletedExceptionally3itrk74dxkv9s as CompletedExceptionally } from '../CompletionState.mjs';
import {
  get_COMPLETING_WAITING_CHILDREN3nnjgv5wv89p1 as get_COMPLETING_WAITING_CHILDREN,
  unboxStateze7t12boxn2m as unboxState,
} from '../JobSupport.mjs';
import { recoverStackTrace2i3si2i8nvw1k as recoverStackTrace } from '../internal/StackTraceRecovery.mjs';
import { TimeoutCancellationException198b5zwr3v3uw as TimeoutCancellationException } from '../Timeout.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function startUndispatchedOrReturn(_this__u8e3s4, receiver, block) {
  return startUndspatched(_this__u8e3s4, true, receiver, block);
}
function startUndispatchedOrReturnIgnoreTimeout(_this__u8e3s4, receiver, block) {
  return startUndspatched(_this__u8e3s4, false, receiver, block);
}
function startCoroutineUndispatched(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlinx.coroutines.internal.probeCoroutineCreated' call
  var actualCompletion = completion;
  var tmp;
  try {
    // Inline function 'kotlinx.coroutines.withCoroutineContext' call
    actualCompletion.ld();
    // Inline function 'kotlinx.coroutines.internal.probeCoroutineResumed' call
    // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
    tmp = startCoroutineUninterceptedOrReturnNonGeneratorVersion(_this__u8e3s4, receiver, actualCompletion);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var e = $p;
      var tmp_1;
      if (e instanceof DispatchException()) {
        tmp_1 = e.p28_1;
      } else {
        tmp_1 = e;
      }
      var reportException = tmp_1;
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(reportException));
      actualCompletion.qd(tmp$ret$5);
      return Unit_instance;
    } else {
      throw $p;
    }
  }
  var value = tmp;
  if (!(value === get_COROUTINE_SUSPENDED())) {
    // Inline function 'kotlin.coroutines.resume' call
    // Inline function 'kotlin.Companion.success' call
    var value_0 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
    var tmp$ret$7 = _Result___init__impl__xyqfz8(value_0);
    actualCompletion.qd(tmp$ret$7);
  }
}
function startUndspatched(_this__u8e3s4, alwaysRethrow, receiver, block) {
  var tmp;
  try {
    // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
    tmp = startCoroutineUninterceptedOrReturnNonGeneratorVersion(block, receiver, _this__u8e3s4);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof DispatchException()) {
      var e = $p;
      dispatchExceptionAndMakeCompleting(_this__u8e3s4, e);
    } else {
      if ($p instanceof Error) {
        var e_0 = $p;
        tmp_0 = new (CompletedExceptionally())(e_0);
      } else {
        throw $p;
      }
    }
    tmp = tmp_0;
  }
  var result = tmp;
  if (result === get_COROUTINE_SUSPENDED())
    return get_COROUTINE_SUSPENDED();
  var state = _this__u8e3s4.f21(result);
  if (state === get_COMPLETING_WAITING_CHILDREN())
    return get_COROUTINE_SUSPENDED();
  _this__u8e3s4.q23();
  var tmp_1;
  if (state instanceof CompletedExceptionally()) {
    var tmp_2;
    if (alwaysRethrow || notOwnTimeout(_this__u8e3s4, state.c21_1)) {
      throw recoverStackTrace(state.c21_1, _this__u8e3s4.p23_1);
    } else {
      if (result instanceof CompletedExceptionally()) {
        throw recoverStackTrace(result.c21_1, _this__u8e3s4.p23_1);
      } else {
        tmp_2 = result;
      }
    }
    tmp_1 = tmp_2;
  } else {
    tmp_1 = unboxState(state);
  }
  return tmp_1;
}
function dispatchExceptionAndMakeCompleting(_this__u8e3s4, e) {
  _this__u8e3s4.o22(new (CompletedExceptionally())(e.p28_1));
  throw recoverStackTrace(e.p28_1, _this__u8e3s4.p23_1);
}
function notOwnTimeout(_this__u8e3s4, cause) {
  var tmp;
  if (!(cause instanceof TimeoutCancellationException())) {
    tmp = true;
  } else {
    tmp = !(cause.c2e_1 === _this__u8e3s4);
  }
  return tmp;
}
//region block: exports
export {
  startCoroutineUndispatched as startCoroutineUndispatched23kmsh8s0p6h5,
  startUndispatchedOrReturnIgnoreTimeout as startUndispatchedOrReturnIgnoreTimeout3dcuyudwff859,
  startUndispatchedOrReturn as startUndispatchedOrReturn1od7ryhr362dr,
};
//endregion

//# sourceMappingURL=Undispatched.mjs.map
