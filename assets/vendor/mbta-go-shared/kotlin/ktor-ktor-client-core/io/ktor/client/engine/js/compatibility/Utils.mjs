import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CancellableContinuationImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../../../../../../../ktor-ktor-utils/io/ktor/util/PlatformUtils.mjs';
import { readBodyBrowser2vmfk0na3k29n as readBodyBrowser } from '../browser/BrowserFetch.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { Error3ofk6owajcepa as Error_0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function commonFetch(input, init, requestConfig, config, callJob, $completion) {
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  var controller = AbortController_0();
  init.signal = controller.signal;
  config.f5u_1(init);
  requestConfig(init);
  callJob.b22(true, VOID, commonFetch$lambda(controller));
  var tmp;
  if (PlatformUtils_getInstance().p3i_1) {
    tmp = fetch(input, init);
  } else {
    var options = Object.assign(Object.create(null), init, config.g5u_1);
    tmp = fetch(input, options);
  }
  var promise = tmp;
  var tmp_0 = commonFetch$lambda_0(cancellable);
  promise.then(tmp_0, commonFetch$lambda_1(cancellable));
  return cancellable.e23();
}
function readBody(_this__u8e3s4, response) {
  return readBodyBrowser(_this__u8e3s4, response);
}
function AbortController_0() {
  return new AbortController();
}
function commonFetch$lambda($controller) {
  return function (it) {
    $controller.abort();
    return Unit_instance;
  };
}
function commonFetch$lambda_0($continuation) {
  return function (it) {
    // Inline function 'kotlin.coroutines.resume' call
    var this_0 = $continuation;
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(it);
    this_0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
function commonFetch$lambda_1($continuation) {
  return function (it) {
    var tmp0 = $continuation;
    // Inline function 'kotlin.coroutines.resumeWithException' call
    // Inline function 'kotlin.Companion.failure' call
    var exception = Error_0().eg('Fail to fetch', it);
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    tmp0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
//region block: exports
export {
  commonFetch as commonFetch2g1apdy1t4019,
  readBody as readBody4gczno2wau05,
};
//endregion

//# sourceMappingURL=Utils.mjs.map
