import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from './Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from './SnapshotState.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { LaunchedEffect3knc11esygzlw as LaunchedEffect } from './Effects.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function produceState(initialValue, key1, key2, producer, $composer, $changed) {
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1703169085, 'C(produceState)136@5524L41,137@5597L62,137@5570L89:ProduceState.kt#9igjgp');
  if (isTraceInProgress()) {
    traceEventStart(-1703169085, $changed, -1, 'androidx.compose.runtime.produceState (ProduceState.kt:135)');
  }
  sourceInformationMarkerStart($composer_0, -362945364, 'CC(remember):ProduceState.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it = $composer_0.g6y();
  var tmp;
  if (false || it === Companion_getInstance().x6p_1) {
    var value = mutableStateOf(initialValue);
    $composer_0.h6y(value);
    tmp = value;
  } else {
    tmp = it;
  }
  var tmp_0 = tmp;
  var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var result = tmp1_group;
  sourceInformationMarkerStart($composer_0, -362943007, 'CC(remember):ProduceState.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = $composer_0.q6w(producer);
  // Inline function 'kotlin.let' call
  var it_0 = $composer_0.g6y();
  var tmp_1;
  if (invalid || it_0 === Companion_getInstance().x6p_1) {
    var value_0 = produceState$slambda_0(producer, result, null);
    $composer_0.h6y(value_0);
    tmp_1 = value_0;
  } else {
    tmp_1 = it_0;
  }
  var tmp_2 = tmp_1;
  var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(key1, key2, tmp2_group, $composer_0, 14 & $changed >> 3 | 112 & $changed >> 3);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return result;
}
var ProduceStateScopeClass;
function ProduceStateScope() {
  if (ProduceStateScopeClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ProduceStateScope', VOID, VOID, [CoroutineScope()], [1]);
    ProduceStateScopeClass = $;
  }
  return ProduceStateScopeClass;
}
var ProduceStateScopeImplClass;
function ProduceStateScopeImpl() {
  if (ProduceStateScopeImplClass === VOID) {
    class $ {
      constructor(state, coroutineContext) {
        this.t73_1 = state;
        this.u73_1 = coroutineContext;
      }
      w20() {
        return this.u73_1;
      }
      b2r(_set____db54di) {
        this.t73_1.b2r(_set____db54di);
      }
      v1() {
        return this.t73_1.v1();
      }
    }
    initMetadataForClass($, 'ProduceStateScopeImpl', VOID, VOID, [ProduceStateScope()], [1]);
    ProduceStateScopeImplClass = $;
  }
  return ProduceStateScopeImplClass;
}
var produceState$slambdaClass;
function produceState$slambda() {
  if (produceState$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($producer, $result, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.d74_1 = $producer;
        $box.e74_1 = $result;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
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
                suspendResult = this.d74_1(new (ProduceStateScopeImpl())(this.e74_1, this.f74_1.w20()), this);
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (produceState$slambda())(this.d74_1, this.e74_1, completion);
        i.f74_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    produceState$slambdaClass = $;
  }
  return produceState$slambdaClass;
}
function produceState$slambda_0($producer, $result, resultContinuation) {
  var i = new (produceState$slambda())($producer, $result, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  ProduceStateScope as ProduceStateScope37sutjjv0knpr,
  produceState as produceState1q845kti07p8s,
};
//endregion

//# sourceMappingURL=ProduceState.mjs.map
