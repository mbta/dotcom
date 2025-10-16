import {
  createCoroutineUnintercepted3gya308dmbbtg as createCoroutineUnintercepted,
  intercepted2ogpsikxxj4u0 as intercepted,
  createCoroutineUnintercepted21q5ochlctscl as createCoroutineUnintercepted_0,
} from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { resumeCancellableWith2mw849xp548hg as resumeCancellableWith } from '../internal/DispatchedContinuation.mjs';
import { DispatchException248dwsudeuh1h as DispatchException } from '../DispatchedTask.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function startCoroutineCancellable(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
  try {
    var tmp = intercepted(createCoroutineUnintercepted(_this__u8e3s4, receiver, completion));
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
    resumeCancellableWith(tmp, tmp$ret$0);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      dispatcherFailure(completion, e);
    } else {
      throw $p;
    }
  }
  return Unit_instance;
}
function startCoroutineCancellable_0(_this__u8e3s4, fatalCompletion) {
  // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
  try {
    var tmp = intercepted(_this__u8e3s4);
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
    resumeCancellableWith(tmp, tmp$ret$0);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      dispatcherFailure(fatalCompletion, e);
    } else {
      throw $p;
    }
  }
  return Unit_instance;
}
function dispatcherFailure(completion, e) {
  var tmp;
  if (e instanceof DispatchException()) {
    tmp = e.p28_1;
  } else {
    tmp = e;
  }
  var reportException = tmp;
  // Inline function 'kotlin.Companion.failure' call
  var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(reportException));
  completion.qd(tmp$ret$0);
  throw reportException;
}
function startCoroutineCancellable_1(_this__u8e3s4, completion) {
  // Inline function 'kotlinx.coroutines.intrinsics.runSafely' call
  try {
    var tmp = intercepted(createCoroutineUnintercepted_0(_this__u8e3s4, completion));
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
    resumeCancellableWith(tmp, tmp$ret$0);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      dispatcherFailure(completion, e);
    } else {
      throw $p;
    }
  }
  return Unit_instance;
}
//region block: exports
export {
  startCoroutineCancellable as startCoroutineCancellable3v5el961z6rj8,
  startCoroutineCancellable_1 as startCoroutineCancellable18shtfwdieib,
  startCoroutineCancellable_0 as startCoroutineCancellable1tb4wrxetke45,
};
//endregion

//# sourceMappingURL=Cancellable.mjs.map
