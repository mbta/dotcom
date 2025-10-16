import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from './CancellableContinuationImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineStart_DEFAULT_getInstance2bbgmtawlnkke as CoroutineStart_DEFAULT_getInstance } from './CoroutineStart.mjs';
import { asyncz02dsa2nb2zt as async } from './Builders.common.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function await_0(_this__u8e3s4, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  var tmp = await$lambda(cancellable);
  _this__u8e3s4.then(tmp, await$lambda_0(cancellable));
  return cancellable.e23();
}
function promise(_this__u8e3s4, context, start, block) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
  return asPromise(async(_this__u8e3s4, context, start, block));
}
function asPromise(_this__u8e3s4) {
  var promise = new Promise(asPromise$lambda(_this__u8e3s4));
  // Inline function 'kotlin.js.asDynamic' call
  promise.deferred = _this__u8e3s4;
  return promise;
}
function await$lambda($cont) {
  return function (it) {
    // Inline function 'kotlin.coroutines.resume' call
    var this_0 = $cont;
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(it);
    this_0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
function await$lambda_0($cont) {
  return function (it) {
    var tmp0 = $cont;
    var tmp0_elvis_lhs = it instanceof Error ? it : null;
    // Inline function 'kotlin.coroutines.resumeWithException' call
    // Inline function 'kotlin.Companion.failure' call
    var exception = tmp0_elvis_lhs == null ? Exception().h6('Non-Kotlin exception ' + it.toString()) : tmp0_elvis_lhs;
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    tmp0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
function asPromise$lambda$lambda($this_asPromise, $reject, $resolve) {
  return function (it) {
    var e = $this_asPromise.v22();
    var tmp;
    if (!(e == null)) {
      tmp = $reject(e);
    } else {
      tmp = $resolve($this_asPromise.d24());
    }
    return Unit_instance;
  };
}
function asPromise$lambda($this_asPromise) {
  return function (resolve, reject) {
    $this_asPromise.z21(asPromise$lambda$lambda($this_asPromise, reject, resolve));
    return Unit_instance;
  };
}
//region block: exports
export {
  await_0 as await20nhgj9iqzkt,
  promise as promise1ky6tawqaxbt4,
};
//endregion

//# sourceMappingURL=Promise.mjs.map
