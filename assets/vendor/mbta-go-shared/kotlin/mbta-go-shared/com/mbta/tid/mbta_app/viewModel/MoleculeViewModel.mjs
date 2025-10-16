import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  withTimeout1xcycxinug3ct as withTimeout,
  TimeoutCancellationException198b5zwr3v3uw as TimeoutCancellationException,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Timeout.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  Exceptiondt2hlxn7j7vw as Exception,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  captureStack1fzi4aczwc4hg as captureStack,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString_0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { updateChangedFlags1i0wwq2uua6rt as updateChangedFlags } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/RecomposeScopeImpl.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { RecompositionMode_ContextClock_getInstances3loc9541by9 as RecompositionMode_ContextClock_getInstance } from '../../../../../../molecule-molecule-runtime/app/cash/molecule/RecompositionMode.mjs';
import { launchMolecule1z0g03wollr13 as launchMolecule } from '../../../../../../molecule-molecule-runtime/app/cash/molecule/molecule.mjs';
import { MoleculeScopeViewModel2jo02kb1cu4dz as MoleculeScopeViewModel } from './MoleculeViewModel.js.mjs';
import { BufferOverflow_SUSPEND_getInstance142kaabh2rhtl as BufferOverflow_SUSPEND_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/BufferOverflow.mjs';
import { MutableSharedFlow3g4w4npzofx4w as MutableSharedFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/SharedFlow.mjs';
import { LazyThreadSafetyMode_NONE_getInstance2ezxh11hvaa3w as LazyThreadSafetyMode_NONE_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Duration5ynfiptaqcrg as Duration } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { LaunchedEffect1xc4bdzax6uqz as LaunchedEffect } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_MoleculeViewModel_TimeoutException$stable;
var com_mbta_tid_mbta_app_viewModel_MoleculeViewModel$stable;
var MoleculeViewModel$EventSink$slambda$slambda$slambdaClass;
function MoleculeViewModel$EventSink$slambda$slambda$slambda() {
  if (MoleculeViewModel$EventSink$slambda$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($handleEvent, $event, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.xay_1 = $handleEvent;
        $box.yay_1 = $event;
        super(resultContinuation, $box);
      }
      x3e($this$withTimeout, $completion) {
        var tmp = this.y3e($this$withTimeout, $completion);
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
                suspendResult = this.xay_1(this.yay_1, this);
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
      y3e($this$withTimeout, completion) {
        var i = new (MoleculeViewModel$EventSink$slambda$slambda$slambda())(this.xay_1, this.yay_1, completion);
        i.zay_1 = $this$withTimeout;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    MoleculeViewModel$EventSink$slambda$slambda$slambdaClass = $;
  }
  return MoleculeViewModel$EventSink$slambda$slambda$slambdaClass;
}
function MoleculeViewModel$EventSink$slambda$slambda$slambda_0($handleEvent, $event, resultContinuation) {
  var i = new (MoleculeViewModel$EventSink$slambda$slambda$slambda())($handleEvent, $event, resultContinuation);
  var l = function ($this$withTimeout, $completion) {
    return i.x3e($this$withTimeout, $completion);
  };
  l.$arity = 1;
  return l;
}
var MoleculeViewModel$EventSink$slambda$slambdaClass;
function MoleculeViewModel$EventSink$slambda$slambda() {
  if (MoleculeViewModel$EventSink$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($eventHandlingTimeout, $sentryRepository, this$0, $handleEvent, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.iaz_1 = $eventHandlingTimeout;
        $box.jaz_1 = $sentryRepository;
        $box.kaz_1 = this$0;
        $box.laz_1 = $handleEvent;
        super(resultContinuation, $box);
      }
      naz(event, $completion) {
        var tmp = this.oaz(event, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.naz((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = withTimeout(this.iaz_1, MoleculeViewModel$EventSink$slambda$slambda$slambda_0(this.laz_1, this.maz_1, null), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.gd_1 = 3;
                this.fd_1 = 4;
                continue $sm;
              case 2:
                this.gd_1 = 3;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof TimeoutCancellationException()) {
                  var exc = this.id_1;
                  this.jaz_1.wa1(TimeoutException().raz(getKClassFromExpression(this.kaz_1).gh(), this.maz_1, exc));
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                throw this.id_1;
              case 4:
                this.gd_1 = 3;
                return Unit_instance;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      oaz(event, completion) {
        var i = new (MoleculeViewModel$EventSink$slambda$slambda())(this.iaz_1, this.jaz_1, this.kaz_1, this.laz_1, completion);
        i.maz_1 = event;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    MoleculeViewModel$EventSink$slambda$slambdaClass = $;
  }
  return MoleculeViewModel$EventSink$slambda$slambdaClass;
}
function MoleculeViewModel$EventSink$slambda$slambda_0($eventHandlingTimeout, $sentryRepository, this$0, $handleEvent, resultContinuation) {
  var i = new (MoleculeViewModel$EventSink$slambda$slambda())($eventHandlingTimeout, $sentryRepository, this$0, $handleEvent, resultContinuation);
  var l = function (event, $completion) {
    return i.naz(event, $completion);
  };
  l.$arity = 1;
  return l;
}
var TimeoutExceptionClass;
function TimeoutException() {
  if (TimeoutExceptionClass === VOID) {
    class $ extends Exception() {
      static raz(className, event, timeout) {
        var $this = this.uf('Timeout in ' + className + ' handling event ' + toString(event), timeout);
        captureStack($this, $this.qaz_1);
        return $this;
      }
    }
    initMetadataForClass($, 'TimeoutException');
    TimeoutExceptionClass = $;
  }
  return TimeoutExceptionClass;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.saz_1 = function_0;
      }
      z2n(value, $completion) {
        return this.saz_1(value, $completion);
      }
      z4() {
        return this.saz_1;
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
var MoleculeViewModel$EventSink$slambdaClass;
function MoleculeViewModel$EventSink$slambda() {
  if (MoleculeViewModel$EventSink$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $eventHandlingTimeout, $sentryRepository, $handleEvent, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.bb0_1 = this$0;
        $box.cb0_1 = $eventHandlingTimeout;
        $box.db0_1 = $sentryRepository;
        $box.eb0_1 = $handleEvent;
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
                var tmp_0 = MoleculeViewModel$EventSink$slambda$slambda_0(this.cb0_1, this.db0_1, this.bb0_1, this.eb0_1, null);
                suspendResult = this.bb0_1.fah_1.t2p(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_0), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                throwKotlinNothingValueException();
                break;
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
        var i = new (MoleculeViewModel$EventSink$slambda())(this.bb0_1, this.cb0_1, this.db0_1, this.eb0_1, completion);
        i.fb0_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    MoleculeViewModel$EventSink$slambdaClass = $;
  }
  return MoleculeViewModel$EventSink$slambdaClass;
}
function MoleculeViewModel$EventSink$slambda_0(this$0, $eventHandlingTimeout, $sentryRepository, $handleEvent, resultContinuation) {
  var i = new (MoleculeViewModel$EventSink$slambda())(this$0, $eventHandlingTimeout, $sentryRepository, $handleEvent, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function MoleculeViewModel$EventSink$lambda($tmp1_rcvr, $eventHandlingTimeout, $sentryRepository, $handleEvent, $$changed) {
  return function ($composer, $force) {
    $tmp1_rcvr.hah($eventHandlingTimeout, $sentryRepository, $handleEvent, $composer, updateChangedFlags($$changed | 1));
    return Unit_instance;
  };
}
function MoleculeViewModel$internalModels$delegate$lambda$lambda(this$0) {
  return function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.d6w(-1868302335);
    sourceInformation($composer_0, 'C69@2660L10:MoleculeViewModel.kt#medjd4');
    var tmp;
    if (isTraceInProgress()) {
      traceEventStart(-1868302335, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.MoleculeViewModel.internalModels$delegate.<anonymous>.<anonymous> (MoleculeViewModel.kt:69)');
      tmp = Unit_instance;
    }
    var tmp0 = this$0.dah($composer_0, 0);
    var tmp_0;
    if (isTraceInProgress()) {
      traceEventEnd();
      tmp_0 = Unit_instance;
    }
    $composer_0.f6w();
    return tmp0;
  };
}
function MoleculeViewModel$internalModels$delegate$lambda(this$0) {
  return function () {
    var tmp = RecompositionMode_ContextClock_getInstance();
    return launchMolecule(this$0.gb0_1, tmp, VOID, VOID, MoleculeViewModel$internalModels$delegate$lambda$lambda(this$0));
  };
}
function MoleculeViewModel$_get_internalModels_$ref_u2swjd() {
  return function (p0) {
    return p0.iah();
  };
}
var MoleculeViewModelClass;
function MoleculeViewModel() {
  if (MoleculeViewModelClass === VOID) {
    class $ extends MoleculeScopeViewModel() {
      constructor() {
        super();
        this.fah_1 = MutableSharedFlow(20, 10, BufferOverflow_SUSPEND_getInstance());
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_NONE_getInstance();
        tmp.gah_1 = lazy(tmp_0, MoleculeViewModel$internalModels$delegate$lambda(this));
      }
      hah(eventHandlingTimeout, sentryRepository, handleEvent, $composer, $changed) {
        var $composer_0 = $composer;
        $composer_0 = $composer_0.n6x(900246852);
        sourceInformation($composer_0, 'C(EventSink)P(0:kotlin.time.Duration,2)47@1712L414,47@1691L435:MoleculeViewModel.kt#medjd4');
        var $dirty = $changed;
        if (($changed & 6) === 0)
          $dirty = $dirty | ($composer_0.s6m(new (Duration())(eventHandlingTimeout)) ? 4 : 2);
        if (($changed & 48) === 0)
          $dirty = $dirty | ((($changed & 64) === 0 ? $composer_0.s6m(sentryRepository) : $composer_0.q6w(sentryRepository)) ? 32 : 16);
        if (($changed & 384) === 0)
          $dirty = $dirty | ($composer_0.q6w(handleEvent) ? 256 : 128);
        if (($changed & 3072) === 0)
          $dirty = $dirty | ($composer_0.q6w(this) ? 2048 : 1024);
        if ($composer_0.g6x(!(($dirty & 1171) === 1170), $dirty & 1)) {
          if (isTraceInProgress()) {
            traceEventStart(900246852, $dirty, -1, 'com.mbta.tid.mbta_app.viewModel.MoleculeViewModel.EventSink (MoleculeViewModel.kt:46)');
          }
          sourceInformationMarkerStart($composer_0, 1848805378, 'CC(remember):MoleculeViewModel.kt#9igjgp');
          var tmp0 = $composer_0;
          // Inline function 'androidx.compose.runtime.cache' call
          var invalid = !!(!!(!!($composer_0.q6w(this) | ($dirty & 14) === 4) | $composer_0.q6w(handleEvent)) | (($dirty & 112) === 32 || (!(($dirty & 64) === 0) && $composer_0.q6w(sentryRepository))));
          // Inline function 'kotlin.let' call
          var it = tmp0.g6y();
          var tmp;
          if (invalid || it === Companion_getInstance().x6p_1) {
            var value = MoleculeViewModel$EventSink$slambda_0(this, eventHandlingTimeout, sentryRepository, handleEvent, null);
            tmp0.h6y(value);
            tmp = value;
          } else {
            tmp = it;
          }
          var tmp_0 = tmp;
          var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
          sourceInformationMarkerEnd($composer_0);
          LaunchedEffect(null, tmp0_group, $composer_0, 6);
          if (isTraceInProgress()) {
            traceEventEnd();
          }
        } else {
          $composer_0.o6p();
        }
        var tmp2_safe_receiver = $composer_0.o6x();
        if (tmp2_safe_receiver == null)
          null;
        else {
          tmp2_safe_receiver.n74(MoleculeViewModel$EventSink$lambda(this, eventHandlingTimeout, sentryRepository, handleEvent, $changed));
        }
      }
      iah() {
        var tmp0 = this.gah_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('internalModels', 1, tmp, MoleculeViewModel$_get_internalModels_$ref_u2swjd(), null);
        return tmp0.v1();
      }
      hal(event) {
        if (!this.fah_1.u2p(event)) {
          // Inline function 'kotlin.error' call
          var message = 'Event buffer overflow in ' + toString_0(getKClassFromExpression(this));
          throw IllegalStateException().o5(toString_0(message));
        }
      }
    }
    initMetadataForClass($, 'MoleculeViewModel');
    MoleculeViewModelClass = $;
  }
  return MoleculeViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_MoleculeViewModel_TimeoutException$stable = 8;
com_mbta_tid_mbta_app_viewModel_MoleculeViewModel$stable = 8;
//endregion
//region block: exports
export {
  MoleculeViewModel as MoleculeViewModel1m9g3i38mafed,
};
//endregion

//# sourceMappingURL=MoleculeViewModel.mjs.map
