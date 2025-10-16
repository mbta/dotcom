import { AtomicInt39yq0tdckiqjq as AtomicInt } from './internal/Atomic.nonJvm.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { MutableObjectList370jqbf1tk821 as MutableObjectList } from '../../../../androidx-collection-collection/androidx/collection/ObjectList.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CancellableContinuationImpl.mjs';
import {
  get_key2ksjfn8509cif as get_key,
  MonotonicFrameClock294sxh87palfa as MonotonicFrameClock,
} from './MonotonicFrameClock.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  get6d5x931vk0s as get,
  fold36i9psb7d5v48 as fold,
  minusKeyyqanvso9aovh as minusKey,
  plusolev77jfy5r9 as plus,
} from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_BroadcastFrameClock$stable;
function _AtomicAwaitersCount___init__impl__r5knjv(value) {
  return value;
}
function _get_value__a43j40($this) {
  return $this;
}
function _AtomicAwaitersCount___init__impl__r5knjv_0() {
  return _AtomicAwaitersCount___init__impl__r5knjv(new (AtomicInt())(0));
}
function pack($this, version, count) {
  var versionComponent = (version & 15) << 27;
  var countComponent = count & 134217727;
  return versionComponent | countComponent;
}
var FrameAwaiterClass;
function FrameAwaiter() {
  if (FrameAwaiterClass === VOID) {
    class $ {
      constructor(onFrame, continuation) {
        this.a6j_1 = onFrame;
        this.b6j_1 = continuation;
      }
      c6j() {
        this.a6j_1 = null;
        this.b6j_1 = null;
      }
      d6j(timeNanos) {
        var tmp0_elvis_lhs = this.a6j_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return Unit_instance;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var onFrame = tmp;
        var tmp1_safe_receiver = this.b6j_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.runCatching' call
          var tmp_0;
          try {
            // Inline function 'kotlin.Companion.success' call
            var value = onFrame(timeNanos);
            tmp_0 = _Result___init__impl__xyqfz8(value);
          } catch ($p) {
            var tmp_1;
            if ($p instanceof Error) {
              var e = $p;
              // Inline function 'kotlin.Companion.failure' call
              tmp_1 = _Result___init__impl__xyqfz8(createFailure(e));
            } else {
              throw $p;
            }
            tmp_0 = tmp_1;
          }
          var tmp$ret$3 = tmp_0;
          tmp1_safe_receiver.qd(tmp$ret$3);
        }
      }
      e6j(exception) {
        var tmp0_safe_receiver = this.b6j_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.coroutines.resumeWithException' call
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
          tmp0_safe_receiver.qd(tmp$ret$0);
        }
      }
    }
    initMetadataForClass($, 'FrameAwaiter');
    FrameAwaiterClass = $;
  }
  return FrameAwaiterClass;
}
function fail($this, cause) {
  // Inline function 'androidx.compose.runtime.platform.synchronized' call
  $this.g6j_1;
  if (!($this.h6j_1 == null))
    return Unit_instance;
  $this.h6j_1 = cause;
  // Inline function 'androidx.collection.ObjectList.forEach' call
  var this_0 = $this.j6j_1;
  // Inline function 'kotlin.contracts.contract' call
  var content = this_0.q6d_1;
  var inductionVariable = 0;
  var last = this_0.r6d_1;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = content[i];
      ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).e6j(cause);
    }
     while (inductionVariable < last);
  $this.j6j_1.p3();
  // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.incrementVersionAndResetCount' call
  var this_1 = $this.i6j_1;
  // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.update' call
  var oldValue;
  var newValue;
  do {
    oldValue = _get_value__a43j40(this_1).r29();
    // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.version' call
    var tmp$ret$3 = (oldValue >>> 27 | 0) & 15;
    newValue = pack(this_1, tmp$ret$3 + 1 | 0, 0);
  }
   while (!_get_value__a43j40(this_1).m6j(oldValue, newValue));
}
function BroadcastFrameClock$withFrameNanos$lambda($awaiter, this$0, $awaitersVersion) {
  return function (it) {
    $awaiter.c6j();
    var tmp0 = this$0.i6j_1;
    // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.decrementCount' call
    var version = $awaitersVersion._v;
    // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.update' call
    var oldValue;
    var newValue;
    do {
      oldValue = _get_value__a43j40(tmp0).r29();
      var value = oldValue;
      var tmp;
      // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.version' call
      if (((value >>> 27 | 0) & 15) === version) {
        tmp = value - 1 | 0;
      } else {
        tmp = value;
      }
      newValue = tmp;
    }
     while (!_get_value__a43j40(tmp0).m6j(oldValue, newValue));
    return Unit_instance;
  };
}
var BroadcastFrameClockClass;
function BroadcastFrameClock() {
  if (BroadcastFrameClockClass === VOID) {
    class $ {
      constructor(onNewAwaiters) {
        onNewAwaiters = onNewAwaiters === VOID ? null : onNewAwaiters;
        this.f6j_1 = onNewAwaiters;
        var tmp = this;
        // Inline function 'androidx.compose.runtime.platform.makeSynchronizedObject' call
        tmp.g6j_1 = null == null ? new Object() : null;
        this.h6j_1 = null;
        this.i6j_1 = _AtomicAwaitersCount___init__impl__r5knjv_0();
        var tmp_0 = this;
        // Inline function 'androidx.collection.mutableObjectListOf' call
        tmp_0.j6j_1 = new (MutableObjectList())();
        var tmp_1 = this;
        // Inline function 'androidx.collection.mutableObjectListOf' call
        tmp_1.k6j_1 = new (MutableObjectList())();
      }
      n6j() {
        // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.hasAwaiters' call
        var this_0 = this.i6j_1;
        // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.count' call
        return (_get_value__a43j40(this_0).r29() & 134217727) > 0;
      }
      o6j(timeNanos) {
        // Inline function 'androidx.compose.runtime.platform.synchronized' call
        this.g6j_1;
        var toResume = this.j6j_1;
        this.j6j_1 = this.k6j_1;
        this.k6j_1 = toResume;
        // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.incrementVersionAndResetCount' call
        var this_0 = this.i6j_1;
        // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.update' call
        var oldValue;
        var newValue;
        do {
          oldValue = _get_value__a43j40(this_0).r29();
          // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.version' call
          var tmp$ret$0 = (oldValue >>> 27 | 0) & 15;
          newValue = pack(this_0, tmp$ret$0 + 1 | 0, 0);
        }
         while (!_get_value__a43j40(this_0).m6j(oldValue, newValue));
        var inductionVariable = 0;
        var last = toResume.c1();
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            toResume.e1(i).d6j(timeNanos);
          }
           while (inductionVariable < last);
        toResume.p3();
      }
      p6j(onFrame, $completion) {
        var cancellable = new (CancellableContinuationImpl())(intercepted($completion), 1);
        cancellable.f26();
        $l$block: {
          var awaiter = new (FrameAwaiter())(onFrame, cancellable);
          var hasNewAwaiters = false;
          var awaitersVersion = {_v: -1};
          // Inline function 'androidx.compose.runtime.platform.synchronized' call
          this.g6j_1;
          var cause = this.h6j_1;
          if (!(cause == null)) {
            // Inline function 'kotlin.coroutines.resumeWithException' call
            // Inline function 'kotlin.Companion.failure' call
            var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(cause));
            cancellable.qd(tmp$ret$0);
            break $l$block;
          }
          // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.incrementCountAndGetVersion' call
          var this_0 = this.i6j_1;
          // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.update' call
          var oldValue;
          var newValue;
          do {
            oldValue = _get_value__a43j40(this_0).r29();
            newValue = oldValue + 1 | 0;
          }
           while (!_get_value__a43j40(this_0).m6j(oldValue, newValue));
          var newValue_0 = newValue;
          // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.count' call
          if ((newValue_0 & 134217727) === 1) {
            hasNewAwaiters = true;
          }
          // Inline function 'androidx.compose.runtime.AtomicAwaitersCount.version' call
          awaitersVersion._v = (newValue_0 >>> 27 | 0) & 15;
          this.j6j_1.i(awaiter);
          cancellable.n24(BroadcastFrameClock$withFrameNanos$lambda(awaiter, this, awaitersVersion));
          if (hasNewAwaiters && !(this.f6j_1 == null)) {
            try {
              this.f6j_1();
            } catch ($p) {
              if ($p instanceof Error) {
                var t = $p;
                fail(this, t);
              } else {
                throw $p;
              }
            }
          }
        }
        return cancellable.e23();
      }
    }
    protoOf($).u1 = get_key;
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    protoOf($).ir = plus;
    initMetadataForClass($, 'BroadcastFrameClock', BroadcastFrameClock, VOID, [MonotonicFrameClock()], [1]);
    BroadcastFrameClockClass = $;
  }
  return BroadcastFrameClockClass;
}
//region block: init
androidx_compose_runtime_BroadcastFrameClock$stable = 8;
//endregion
//region block: exports
export {
  BroadcastFrameClock as BroadcastFrameClock24r8r84itr9qb,
};
//endregion

//# sourceMappingURL=BroadcastFrameClock.mjs.map
