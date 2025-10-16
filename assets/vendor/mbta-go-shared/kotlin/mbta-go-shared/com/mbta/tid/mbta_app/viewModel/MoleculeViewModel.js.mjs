import {
  ValueTimeMark__elapsedNow_impl_eonqvs1dlqois04h852 as ValueTimeMark__elapsedNow_impl_eonqvs,
  Monotonic_instance6v32gqtywf7e as Monotonic_instance,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/TimeSource.mjs';
import { _Duration___get_inWholeNanoseconds__impl__r5x4mrk9yyarf6pdhq as _Duration___get_inWholeNanoseconds__impl__r5x4mr } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CancellableContinuationImpl.mjs';
import {
  get_key2ksjfn8509cif as get_key,
  MonotonicFrameClock294sxh87palfa as MonotonicFrameClock,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/MonotonicFrameClock.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  get6d5x931vk0s as get,
  fold36i9psb7d5v48 as fold,
  minusKeyyqanvso9aovh as minusKey,
  plusolev77jfy5r9 as plus,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  MainScope1gi1r4abhrtmm as MainScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_MoleculeScopeViewModel$stable;
function MoleculeScopeViewModel$AnimationFrameClock$withFrameNanos$lambda(this$0, $continuation, $onFrame) {
  return function () {
    var frameNanos = _Duration___get_inWholeNanoseconds__impl__r5x4mr(ValueTimeMark__elapsedNow_impl_eonqvs(this$0.hbw_1));
    var tmp0 = $continuation;
    // Inline function 'kotlin.coroutines.resume' call
    // Inline function 'kotlin.Companion.success' call
    var value = $onFrame(frameNanos);
    var tmp$ret$0 = _Result___init__impl__xyqfz8(value);
    tmp0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
function MoleculeScopeViewModel$AnimationFrameClock$withFrameNanos$lambda_0($frame) {
  return function (it) {
    cancelAnimationFrame($frame);
    return Unit_instance;
  };
}
var AnimationFrameClockClass;
function AnimationFrameClock() {
  if (AnimationFrameClockClass === VOID) {
    class $ {
      constructor() {
        this.hbw_1 = Monotonic_instance.ql();
      }
      p6j(onFrame, $completion) {
        var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
        cancellable.f26();
        var gotFrame = MoleculeScopeViewModel$AnimationFrameClock$withFrameNanos$lambda(this, cancellable, onFrame);
        var frame = requestAnimationFrame(gotFrame);
        cancellable.n24(MoleculeScopeViewModel$AnimationFrameClock$withFrameNanos$lambda_0(frame));
        return cancellable.e23();
      }
    }
    protoOf($).u1 = get_key;
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    protoOf($).ir = plus;
    initMetadataForClass($, 'AnimationFrameClock', AnimationFrameClock, VOID, [MonotonicFrameClock()], [1]);
    AnimationFrameClockClass = $;
  }
  return AnimationFrameClockClass;
}
var MoleculeScopeViewModelClass;
function MoleculeScopeViewModel() {
  if (MoleculeScopeViewModelClass === VOID) {
    class $ {
      constructor() {
        this.gb0_1 = CoroutineScope(MainScope().w20().ir(new (AnimationFrameClock())()));
      }
    }
    initMetadataForClass($, 'MoleculeScopeViewModel');
    MoleculeScopeViewModelClass = $;
  }
  return MoleculeScopeViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_MoleculeScopeViewModel$stable = 8;
//endregion
//region block: exports
export {
  MoleculeScopeViewModel as MoleculeScopeViewModel2jo02kb1cu4dz,
};
//endregion

//# sourceMappingURL=MoleculeViewModel.js.mjs.map
