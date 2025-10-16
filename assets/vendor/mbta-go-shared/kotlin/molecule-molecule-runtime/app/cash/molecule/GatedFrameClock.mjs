import {
  numberToLong1a4cndvg6c52s as numberToLong,
  toLongw1zpgk99d84b as toLong,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  ChannelResult__getOrThrow_impl_od1axs1v5ovxi3a78ys as ChannelResult__getOrThrow_impl_od1axs,
  Channel3r72atmcithql as Channel,
} from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Channel.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { BroadcastFrameClock24r8r84itr9qb as BroadcastFrameClock } from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/BroadcastFrameClock.mjs';
import {
  get_key2ksjfn8509cif as get_key,
  MonotonicFrameClock294sxh87palfa as MonotonicFrameClock,
} from '../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/MonotonicFrameClock.mjs';
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
var app_cash_molecule_GatedFrameClock$stable;
function sendFrame($this) {
  // Inline function 'app.cash.molecule.nanoTime' call
  // Inline function 'kotlin.Long.times' call
  var timeNanos = numberToLong(window.performance.now()).h4(toLong(1000000));
  var tmp;
  if (timeNanos.equals($this.k7s_1)) {
    tmp = $this.l7s_1 + 1 | 0;
  } else {
    $this.k7s_1 = timeNanos;
    tmp = 0;
  }
  var offset = tmp;
  $this.l7s_1 = offset;
  // Inline function 'kotlin.Long.plus' call
  var tmp$ret$2 = timeNanos.f4(toLong(offset));
  $this.m7s_1.o6j(tmp$ret$2);
}
var GatedFrameClock$slambdaClass;
function GatedFrameClock$slambda() {
  if (GatedFrameClock$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.v7s_1 = this$0;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.x7s_1 = this.v7s_1.i7s_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.x7s_1.n2i(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                if (!suspendResult) {
                  this.fd_1 = 3;
                  continue $sm;
                }

                var send = this.x7s_1.z();
                sendFrame(this.v7s_1);
                this.fd_1 = 1;
                continue $sm;
              case 3:
                return Unit_instance;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (GatedFrameClock$slambda())(this.v7s_1, completion);
        i.w7s_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    GatedFrameClock$slambdaClass = $;
  }
  return GatedFrameClock$slambdaClass;
}
function GatedFrameClock$slambda_0(this$0, resultContinuation) {
  var i = new (GatedFrameClock$slambda())(this$0, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function GatedFrameClock$clock$lambda(this$0) {
  return function () {
    if (this$0.j7s_1)
      ChannelResult__getOrThrow_impl_od1axs(this$0.i7s_1.m2l(Unit_instance));
    return Unit_instance;
  };
}
var GatedFrameClockClass;
function GatedFrameClock() {
  if (GatedFrameClockClass === VOID) {
    class $ {
      constructor(scope, context) {
        this.i7s_1 = Channel(-1);
        launch(scope, context, VOID, GatedFrameClock$slambda_0(this, null));
        this.j7s_1 = true;
        this.k7s_1 = new (Long())(0, 0);
        this.l7s_1 = 0;
        var tmp = this;
        tmp.m7s_1 = new (BroadcastFrameClock())(GatedFrameClock$clock$lambda(this));
      }
      p6j(onFrame, $completion) {
        return this.m7s_1.p6j(onFrame, $completion);
      }
    }
    protoOf($).u1 = get_key;
    protoOf($).sd = get;
    protoOf($).hr = fold;
    protoOf($).gr = minusKey;
    protoOf($).ir = plus;
    initMetadataForClass($, 'GatedFrameClock', VOID, VOID, [MonotonicFrameClock()], [1]);
    GatedFrameClockClass = $;
  }
  return GatedFrameClockClass;
}
//region block: init
app_cash_molecule_GatedFrameClock$stable = 8;
//endregion
//region block: exports
export {
  GatedFrameClock as GatedFrameClockitlbjxiuqx0l,
};
//endregion

//# sourceMappingURL=GatedFrameClock.mjs.map
