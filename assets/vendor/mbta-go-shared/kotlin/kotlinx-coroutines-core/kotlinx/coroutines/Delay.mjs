import { get_DefaultDelay3q9fawcutqbnw as get_DefaultDelay } from './CoroutineContext.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Key_instance17k9ki7fvysxq as Key_instance } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/ContinuationInterceptor.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from './CancellableContinuationImpl.mjs';
import {
  Duration__isPositive_impl_tvkkt22mscvvkiz7i1u as Duration__isPositive_impl_tvkkt2,
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  toDurationba1nlt78o6vu as toDuration,
  Duration__plus_impl_yu9v8f2gb5hwgakp0dd as Duration__plus_impl_yu9v8f,
  _Duration___get_inWholeMilliseconds__impl__msfiry1byvgyrhm5g4a as _Duration___get_inWholeMilliseconds__impl__msfiry,
} from '../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_NANOSECONDS_getInstancexzp0zqz7eqak as DurationUnit_NANOSECONDS_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function invokeOnTimeout(timeMillis, block, context) {
  return get_DefaultDelay().b29(timeMillis, block, context);
}
var DelayClass;
function Delay() {
  if (DelayClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Delay', VOID, VOID, VOID, [1]);
    DelayClass = $;
  }
  return DelayClass;
}
function get_delay(_this__u8e3s4) {
  var tmp = _this__u8e3s4.sd(Key_instance);
  var tmp0_elvis_lhs = (!(tmp == null) ? isInterface(tmp, Delay()) : false) ? tmp : null;
  return tmp0_elvis_lhs == null ? get_DefaultDelay() : tmp0_elvis_lhs;
}
function delay(timeMillis, $completion) {
  if (timeMillis.d2(new (Long())(0, 0)) <= 0)
    return Unit_instance;
  var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
  cancellable.f26();
  if (timeMillis.d2(new (Long())(-1, 2147483647)) < 0) {
    get_delay(cancellable.ld()).a29(timeMillis, cancellable);
  }
  return cancellable.e23();
}
function toDelayMillis(_this__u8e3s4) {
  var tmp;
  switch (Duration__isPositive_impl_tvkkt2(_this__u8e3s4)) {
    case true:
      Companion_getInstance();
      // Inline function 'kotlin.time.Companion.nanoseconds' call

      var this_0 = new (Long())(999999, 0);
      var tmp$ret$0 = toDuration(this_0, DurationUnit_NANOSECONDS_getInstance());
      tmp = _Duration___get_inWholeMilliseconds__impl__msfiry(Duration__plus_impl_yu9v8f(_this__u8e3s4, tmp$ret$0));
      break;
    case false:
      tmp = new (Long())(0, 0);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
var DelayWithTimeoutDiagnosticsClass;
function DelayWithTimeoutDiagnostics() {
  if (DelayWithTimeoutDiagnosticsClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'DelayWithTimeoutDiagnostics', VOID, VOID, [Delay()], [1]);
    DelayWithTimeoutDiagnosticsClass = $;
  }
  return DelayWithTimeoutDiagnosticsClass;
}
//region block: exports
export {
  delay as delayolwo40i9ucjz,
  DelayWithTimeoutDiagnostics as DelayWithTimeoutDiagnostics19ibxwhhgbjz0,
  Delay as Delay9umexudtwyie,
  get_delay as get_delaynv5kl66dta33,
  toDelayMillis as toDelayMillis3fd263ql63uu2,
};
//endregion

//# sourceMappingURL=Delay.mjs.map
