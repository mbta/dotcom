import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from './Composer.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  produceState1q845kti07p8s as produceState,
  ProduceStateScope37sutjjv0knpr as ProduceStateScope,
} from './ProduceState.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function collectAsState(_this__u8e3s4, initial, context, $composer, $changed, $default) {
  var context_0 = {_v: context};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -606625098, 'C(collectAsState)P(1)64@2575L153,64@2538L190:SnapshotFlow.kt#9igjgp');
  if (!(($default & 2) === 0)) {
    context_0._v = EmptyCoroutineContext_getInstance();
  }
  if (isTraceInProgress()) {
    traceEventStart(-606625098, $changed, -1, 'androidx.compose.runtime.collectAsState (SnapshotFlow.kt:64)');
  }
  var tmp = context_0._v;
  sourceInformationMarkerStart($composer_0, 1148838863, 'CC(remember):SnapshotFlow.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = !!($composer_0.q6w(context_0._v) | $composer_0.q6w(_this__u8e3s4));
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp_0;
  if (invalid || it === Companion_getInstance().x6p_1) {
    var value = collectAsState$slambda_0(context_0, _this__u8e3s4, null);
    $composer_0.h6y(value);
    tmp_0 = value;
  } else {
    tmp_0 = it;
  }
  var tmp_1 = tmp_0;
  var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var tmp0 = produceState(initial, _this__u8e3s4, tmp, tmp1_group, $composer_0, 8 & $changed >> 3 | 14 & $changed >> 3 | 112 & $changed << 3 | 896 & $changed);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function collectAsState_0(_this__u8e3s4, context, $composer, $changed, $default) {
  var context_0 = context;
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1439883919, 'C(collectAsState)48@1905L30:SnapshotFlow.kt#9igjgp');
  if (!(($default & 1) === 0))
    context_0 = EmptyCoroutineContext_getInstance();
  if (isTraceInProgress()) {
    traceEventStart(-1439883919, $changed, -1, 'androidx.compose.runtime.collectAsState (SnapshotFlow.kt:48)');
  }
  var tmp0 = collectAsState(_this__u8e3s4, _this__u8e3s4.v1(), context_0, $composer_0, 14 & $changed | 896 & $changed << 3, 0);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
var collectAsState$slambda$slambda$slambdaClass;
function collectAsState$slambda$slambda$slambda() {
  if (collectAsState$slambda$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_produceState, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.e7c_1 = $this_produceState;
        super(resultContinuation, $box);
      }
      g7c(it, $completion) {
        var tmp = this.h7c(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.g7c((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.e7c_1.b2r(this.f7c_1);
              return Unit_instance;
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      h7c(it, completion) {
        var i = new (collectAsState$slambda$slambda$slambda())(this.e7c_1, completion);
        i.f7c_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    collectAsState$slambda$slambda$slambdaClass = $;
  }
  return collectAsState$slambda$slambda$slambdaClass;
}
function collectAsState$slambda$slambda$slambda_0($this_produceState, resultContinuation) {
  var i = new (collectAsState$slambda$slambda$slambda())($this_produceState, resultContinuation);
  var l = function (it, $completion) {
    return i.g7c(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.i7c_1 = function_0;
      }
      z2n(value, $completion) {
        return this.i7c_1(value, $completion);
      }
      z4() {
        return this.i7c_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, FlowCollector()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector(), FunctionAdapter()], [1]);
    sam$kotlinx_coroutines_flow_FlowCollector$0Class = $;
  }
  return sam$kotlinx_coroutines_flow_FlowCollector$0Class;
}
var collectAsState$slambda$slambdaClass;
function collectAsState$slambda$slambda() {
  if (collectAsState$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_produceState, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.r7c_1 = $this_produceState;
        super(resultContinuation, $box);
      }
      g7c(it, $completion) {
        var tmp = this.h7c(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.g7c((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.r7c_1.b2r(this.s7c_1);
              return Unit_instance;
            } else if (tmp === 1) {
              throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            throw e;
          }
         while (true);
      }
      h7c(it, completion) {
        var i = new (collectAsState$slambda$slambda())(this.r7c_1, completion);
        i.s7c_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    collectAsState$slambda$slambdaClass = $;
  }
  return collectAsState$slambda$slambdaClass;
}
function collectAsState$slambda$slambda_0($this_produceState, resultContinuation) {
  var i = new (collectAsState$slambda$slambda())($this_produceState, resultContinuation);
  var l = function (it, $completion) {
    return i.g7c(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var collectAsState$slambda$slambdaClass_0;
function collectAsState$slambda$slambda_1() {
  if (collectAsState$slambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_collectAsState, $this_produceState, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.b7d_1 = $this_collectAsState;
        $box.c7d_1 = $this_produceState;
        super(resultContinuation, $box);
      }
      x3e($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
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
                this.gd_1 = 2;
                this.fd_1 = 1;
                var tmp_0 = collectAsState$slambda$slambda$slambda_0(this.c7d_1, null);
                suspendResult = this.b7d_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_0), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return Unit_instance;
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$withContext, completion) {
        var i = new (collectAsState$slambda$slambda_1())(this.b7d_1, this.c7d_1, completion);
        i.d7d_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    collectAsState$slambda$slambdaClass_0 = $;
  }
  return collectAsState$slambda$slambdaClass_0;
}
function collectAsState$slambda$slambda_2($this_collectAsState, $this_produceState, resultContinuation) {
  var i = new (collectAsState$slambda$slambda_1())($this_collectAsState, $this_produceState, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.x3e($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
var collectAsState$slambdaClass;
function collectAsState$slambda() {
  if (collectAsState$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($context, $this_collectAsState, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.m7d_1 = $context;
        $box.n7d_1 = $this_collectAsState;
        super(resultContinuation, $box);
      }
      p7d($this$produceState, $completion) {
        var tmp = this.q7d($this$produceState, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.p7d((!(p1 == null) ? isInterface(p1, ProduceStateScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                if (equals(this.m7d_1._v, EmptyCoroutineContext_getInstance())) {
                  this.fd_1 = 2;
                  var tmp_0 = collectAsState$slambda$slambda_0(this.o7d_1, null);
                  suspendResult = this.n7d_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_0), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 1;
                  var tmp_1 = this.m7d_1._v;
                  suspendResult = withContext(tmp_1, collectAsState$slambda$slambda_2(this.n7d_1, this.o7d_1, null), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 1:
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.fd_1 = 3;
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
      q7d($this$produceState, completion) {
        var i = new (collectAsState$slambda())(this.m7d_1, this.n7d_1, completion);
        i.o7d_1 = $this$produceState;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    collectAsState$slambdaClass = $;
  }
  return collectAsState$slambdaClass;
}
function collectAsState$slambda_0($context, $this_collectAsState, resultContinuation) {
  var i = new (collectAsState$slambda())($context, $this_collectAsState, resultContinuation);
  var l = function ($this$produceState, $completion) {
    return i.p7d($this$produceState, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  collectAsState as collectAsState2sgm3emhm5kcs,
  collectAsState_0 as collectAsState1hcbu3nagg85r,
};
//endregion

//# sourceMappingURL=SnapshotFlow.mjs.map
