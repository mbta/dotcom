import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  StopDetailsPageFilters7s483ou4udd1 as StopDetailsPageFilters,
  TripDetailsPageFilterzcsn1gr2vd10 as TripDetailsPageFilter,
} from '../model/StopDetailsFilters.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { KProperty02ce7r476m8633 as KProperty0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { Context_StopDetails_getInstance12fk92tiprv9q as Context_StopDetails_getInstance } from './TripDetailsViewModel.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { collectAsState1hcbu3nagg85r as collectAsState } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotFlow.mjs';
import { subscribeToAlertsesw9dx7e1azo as subscribeToAlerts } from './composeStateHelpers/subscribeToAlerts.mjs';
import { getGlobalData3s0ud2znxtzqv as getGlobalData } from './composeStateHelpers/getGlobalData.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { timer1vca8rhu6yjny as timer } from '../utils/Timer.mjs';
import { LaunchedEffect1xc4bdzax6uqz as LaunchedEffect } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { Filtered34sxnny5hdwda as Filtered } from './StopDetailsViewModel.mjs';
import {
  wrappedj7jodd2wuuw7 as wrapped,
  wrapped3if6kf98agss2 as wrapped_0,
  wrapped1aa3vwsfply2p as wrapped_1,
  wrapped2cei7yt5utnlq as wrapped_2,
} from '../wrapper/Wrappers.mjs';
import { getOrNull1go7ef9ldk0df as getOrNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { State1k760yqksu7ww as State } from '../wrapper/State.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_FilteredStopDetailsViewModel$stable;
function setActive$default(active, wasSentToBackground, $super) {
  wasSentToBackground = wasSentToBackground === VOID ? false : wasSentToBackground;
  var tmp;
  if ($super === VOID) {
    this.pb6(active, wasSentToBackground);
    tmp = Unit_instance;
  } else {
    tmp = $super.pb6.call(this, active, wasSentToBackground);
  }
  return tmp;
}
var IFilteredStopDetailsViewModelClass;
function IFilteredStopDetailsViewModel() {
  if (IFilteredStopDetailsViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IFilteredStopDetailsViewModel');
    IFilteredStopDetailsViewModelClass = $;
  }
  return IFilteredStopDetailsViewModelClass;
}
var FilteredStopDetailsViewModel$runLogic$slambda$slambdaClass;
function FilteredStopDetailsViewModel$runLogic$slambda$slambda() {
  if (FilteredStopDetailsViewModel$runLogic$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.hbu_1 = this$0;
        super(resultContinuation, $box);
      }
      jbu(it, $completion) {
        var tmp = this.kbu(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.jbu((p1 == null ? true : p1 instanceof StopDetailsPageFilters()) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              if (!(this.ibu_1 == null)) {
                this.hbu_1.rb6(this.ibu_1);
              }
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
      kbu(it, completion) {
        var i = new (FilteredStopDetailsViewModel$runLogic$slambda$slambda())(this.hbu_1, completion);
        i.ibu_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetailsViewModel$runLogic$slambda$slambdaClass = $;
  }
  return FilteredStopDetailsViewModel$runLogic$slambda$slambdaClass;
}
function FilteredStopDetailsViewModel$runLogic$slambda$slambda_0(this$0, resultContinuation) {
  var i = new (FilteredStopDetailsViewModel$runLogic$slambda$slambda())(this$0, resultContinuation);
  var l = function (it, $completion) {
    return i.jbu(it, $completion);
  };
  l.$arity = 1;
  return l;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.qbu_1 = function_0;
      }
      z2n(value, $completion) {
        return this.qbu_1(value, $completion);
      }
      z4() {
        return this.qbu_1;
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
function runLogic$lambda($stopDetailsVMState$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('stopDetailsVMState', KProperty0(), false);
  return $stopDetailsVMState$delegate.v1();
}
function runLogic$lambda_0($tripDetailsVMState$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('tripDetailsVMState', KProperty0(), false);
  return $tripDetailsVMState$delegate.v1();
}
function runLogic$lambda_1($now$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('now', KProperty0(), false);
  return $now$delegate.v1();
}
var FilteredStopDetailsViewModel$runLogic$slambdaClass;
function FilteredStopDetailsViewModel$runLogic$slambda() {
  if (FilteredStopDetailsViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.zbu_1 = this$0;
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
            if (tmp === 0) {
              this.gd_1 = 1;
              this.zbu_1.pbu_1.hbb(Context_StopDetails_getInstance());
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (FilteredStopDetailsViewModel$runLogic$slambda())(this.zbu_1, completion);
        i.abv_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetailsViewModel$runLogic$slambdaClass = $;
  }
  return FilteredStopDetailsViewModel$runLogic$slambdaClass;
}
function FilteredStopDetailsViewModel$runLogic$slambda_0(this$0, resultContinuation) {
  var i = new (FilteredStopDetailsViewModel$runLogic$slambda())(this$0, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var FilteredStopDetailsViewModel$runLogic$slambdaClass_0;
function FilteredStopDetailsViewModel$runLogic$slambda_1() {
  if (FilteredStopDetailsViewModel$runLogic$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $alerts, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.jbv_1 = this$0;
        $box.kbv_1 = $alerts;
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
            if (tmp === 0) {
              this.gd_1 = 1;
              this.jbv_1.obu_1.qb6(this.kbv_1);
              this.jbv_1.pbu_1.qb6(this.kbv_1);
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (FilteredStopDetailsViewModel$runLogic$slambda_1())(this.jbv_1, this.kbv_1, completion);
        i.lbv_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetailsViewModel$runLogic$slambdaClass_0 = $;
  }
  return FilteredStopDetailsViewModel$runLogic$slambdaClass_0;
}
function FilteredStopDetailsViewModel$runLogic$slambda_2(this$0, $alerts, resultContinuation) {
  var i = new (FilteredStopDetailsViewModel$runLogic$slambda_1())(this$0, $alerts, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var FilteredStopDetailsViewModel$runLogic$slambdaClass_1;
function FilteredStopDetailsViewModel$runLogic$slambda_3() {
  if (FilteredStopDetailsViewModel$runLogic$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $now$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ubv_1 = this$0;
        $box.vbv_1 = $now$delegate;
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
            if (tmp === 0) {
              this.gd_1 = 1;
              this.ubv_1.obu_1.sb6(runLogic$lambda_1(this.vbv_1));
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (FilteredStopDetailsViewModel$runLogic$slambda_3())(this.ubv_1, this.vbv_1, completion);
        i.wbv_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetailsViewModel$runLogic$slambdaClass_1 = $;
  }
  return FilteredStopDetailsViewModel$runLogic$slambdaClass_1;
}
function FilteredStopDetailsViewModel$runLogic$slambda_4(this$0, $now$delegate, resultContinuation) {
  var i = new (FilteredStopDetailsViewModel$runLogic$slambda_3())(this$0, $now$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var FilteredStopDetailsViewModel$runLogic$slambdaClass_2;
function FilteredStopDetailsViewModel$runLogic$slambda_5() {
  if (FilteredStopDetailsViewModel$runLogic$slambdaClass_2 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.fbw_1 = this$0;
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
                var tmp_0 = this.fbw_1.obu_1.ob6();
                var tmp_1 = FilteredStopDetailsViewModel$runLogic$slambda$slambda_0(this.fbw_1, null);
                suspendResult = tmp_0.t2p(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
        var i = new (FilteredStopDetailsViewModel$runLogic$slambda_5())(this.fbw_1, completion);
        i.gbw_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetailsViewModel$runLogic$slambdaClass_2 = $;
  }
  return FilteredStopDetailsViewModel$runLogic$slambdaClass_2;
}
function FilteredStopDetailsViewModel$runLogic$slambda_6(this$0, resultContinuation) {
  var i = new (FilteredStopDetailsViewModel$runLogic$slambda_5())(this$0, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var FilteredStopDetailsViewModelClass;
function FilteredStopDetailsViewModel() {
  if (FilteredStopDetailsViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor(stopDetailsVM, tripDetailsVM) {
        super();
        this.obu_1 = stopDetailsVM;
        this.pbu_1 = tripDetailsVM;
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(-1464533694);
        sourceInformation($composer_0, 'C(runLogic)33@1363L16,34@1435L16,35@1473L19,36@1514L45,37@1579L16,39@1626L70,39@1605L91,41@1729L99,41@1706L122,46@1858L29,46@1838L49,48@1941L94,48@1897L138,59@2473L220,69@2879L140,74@3061L408,83@3510L219:FilteredStopDetailsViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(-1464533694, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.FilteredStopDetailsViewModel.runLogic (FilteredStopDetailsViewModel.kt:32)');
        }
        var tmp = this.obu_1.oay();
        var stopDetailsVMState$delegate = collectAsState(tmp, null, $composer_0, 0, 1);
        var tmp_0 = this.pbu_1.oay();
        var tripDetailsVMState$delegate = collectAsState(tmp_0, null, $composer_0, 0, 1);
        var alerts = subscribeToAlerts(null, null, $composer_0, 0, 3);
        var global = getGlobalData('FilteredStopDetailsViewModel', null, null, null, $composer_0, 6, 14);
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp_1 = toDuration(5, DurationUnit_SECONDS_getInstance());
        var now$delegate = timer(tmp_1, null, $composer_0, 0, 2);
        sourceInformationMarkerStart($composer_0, 1332404968, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp_2;
        if (invalid || it === Companion_getInstance().x6p_1) {
          var value = FilteredStopDetailsViewModel$runLogic$slambda_0(this, null);
          $composer_0.h6y(value);
          tmp_2 = value;
        } else {
          tmp_2 = it;
        }
        var tmp_3 = tmp_2;
        var tmp1_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(null, tmp1_group, $composer_0, 6);
        sourceInformationMarkerStart($composer_0, 1332408293, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = !!($composer_0.q6w(this) | $composer_0.q6w(alerts));
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_4;
        if (invalid_0 || it_0 === Companion_getInstance().x6p_1) {
          var value_0 = FilteredStopDetailsViewModel$runLogic$slambda_2(this, alerts, null);
          $composer_0.h6y(value_0);
          tmp_4 = value_0;
        } else {
          tmp_4 = it_0;
        }
        var tmp_5 = tmp_4;
        var tmp2_group = (tmp_5 == null ? true : !(tmp_5 == null)) ? tmp_5 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(alerts, tmp2_group, $composer_0, 0);
        var tmp_6 = runLogic$lambda_1(now$delegate);
        sourceInformationMarkerStart($composer_0, 1332412351, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_1 = !!($composer_0.q6w(this) | $composer_0.s6m(now$delegate));
        // Inline function 'kotlin.let' call
        var it_1 = $composer_0.g6y();
        var tmp_7;
        if (invalid_1 || it_1 === Companion_getInstance().x6p_1) {
          var value_1 = FilteredStopDetailsViewModel$runLogic$slambda_4(this, now$delegate, null);
          $composer_0.h6y(value_1);
          tmp_7 = value_1;
        } else {
          tmp_7 = it_1;
        }
        var tmp_8 = tmp_7;
        var tmp3_group = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(tmp_6, tmp3_group, $composer_0, 0);
        var tmp_9 = this.obu_1.ob6();
        sourceInformationMarkerStart($composer_0, 1332415072, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_2 = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_2 = $composer_0.g6y();
        var tmp_10;
        if (invalid_2 || it_2 === Companion_getInstance().x6p_1) {
          var value_2 = FilteredStopDetailsViewModel$runLogic$slambda_6(this, null);
          $composer_0.h6y(value_2);
          tmp_10 = value_2;
        } else {
          tmp_10 = it_2;
        }
        var tmp_11 = tmp_10;
        var tmp4_group = (tmp_11 == null ? true : !(tmp_11 == null)) ? tmp_11 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(tmp_9, tmp4_group, $composer_0, 0);
        var tmp_12 = runLogic$lambda(stopDetailsVMState$delegate).ab7_1;
        var routeDataFiltered = tmp_12 instanceof Filtered() ? tmp_12 : null;
        var tmp0_safe_receiver = runLogic$lambda(stopDetailsVMState$delegate).ab7_1;
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.xb6();
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.t9g_1;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.w8u_1;
        var selectedDirectionId = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
        var tmp5_safe_receiver = routeDataFiltered == null ? null : routeDataFiltered.wb6_1;
        var tmp6_safe_receiver = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.v8s_1;
        var directions = tmp6_safe_receiver == null ? null : wrapped(tmp6_safe_receiver);
        var tmp8_safe_receiver = routeDataFiltered == null ? null : routeDataFiltered.wb6_1;
        var tmp9_safe_receiver = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.w8s_1;
        var leaf = tmp9_safe_receiver == null ? null : getOrNull(tmp9_safe_receiver, selectedDirectionId);
        var tmp5_remember$arg$1 = runLogic$lambda_1(now$delegate);
        sourceInformationMarkerStart($composer_0, 1332432222, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_3 = !!(!!($composer_0.s6m(leaf) | $composer_0.s6m(tmp5_remember$arg$1)) | $composer_0.s6m(global));
        // Inline function 'kotlin.let' call
        var it_3 = $composer_0.g6y();
        var tmp_13;
        if (invalid_3 || it_3 === Companion_getInstance().x6p_1) {
          var tmp1_safe_receiver_0 = leaf == null ? null : leaf.c9b(runLogic$lambda_1(now$delegate), global);
          var tmp_14;
          if (tmp1_safe_receiver_0 == null) {
            tmp_14 = null;
          } else {
            var tmp3_safe_receiver = directions == null ? null : directions.e1(selectedDirectionId);
            tmp_14 = tmp1_safe_receiver_0.j92(tmp3_safe_receiver == null ? null : tmp3_safe_receiver.destination);
          }
          var tmp4_safe_receiver = tmp_14;
          var value_3 = tmp4_safe_receiver == null ? null : wrapped_0(tmp4_safe_receiver);
          $composer_0.h6y(value_3);
          tmp_13 = value_3;
        } else {
          tmp_13 = it_3;
        }
        var tmp_15 = tmp_13;
        var tmp6_group = (tmp_15 == null ? true : !(tmp_15 == null)) ? tmp_15 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var upcomingTripTiles = tmp6_group;
        var tmp10_safe_receiver = runLogic$lambda_0(tripDetailsVMState$delegate).lbb_1;
        var trip = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.t9q_1;
        var tmp_16;
        if (global == null) {
          tmp_16 = null;
        } else {
          tmp_16 = global.s97(trip == null ? null : trip.r8t_1);
        }
        var route = tmp_16;
        var tripHeadsign = trip == null ? null : trip.q8t_1;
        var tmp14_safe_receiver = runLogic$lambda_0(tripDetailsVMState$delegate).lbb_1;
        var tmp7_remember$arg$0 = tmp14_safe_receiver == null ? null : tmp14_safe_receiver.x9q_1;
        sourceInformationMarkerStart($composer_0, 1332445134, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_4 = !!($composer_0.s6m(tmp7_remember$arg$0) | $composer_0.s6m(global));
        // Inline function 'kotlin.let' call
        var it_4 = $composer_0.g6y();
        var tmp_17;
        if (invalid_4 || it_4 === Companion_getInstance().x6p_1) {
          var tmp0_safe_receiver_0 = runLogic$lambda_0(tripDetailsVMState$delegate).lbb_1;
          var tmp1_safe_receiver_1 = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.x9q_1;
          var value_4 = tmp1_safe_receiver_1 == null ? null : wrapped_1(tmp1_safe_receiver_1, global);
          $composer_0.h6y(value_4);
          tmp_17 = value_4;
        } else {
          tmp_17 = it_4;
        }
        var tmp_18 = tmp_17;
        var tmp8_group = (tmp_18 == null ? true : !(tmp_18 == null)) ? tmp_18 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var tripVehicle = tmp8_group;
        var tmp9_remember$arg$0 = runLogic$lambda_0(tripDetailsVMState$delegate).lbb_1;
        var tmp10_remember$arg$1 = runLogic$lambda_0(tripDetailsVMState$delegate).mbb_1;
        sourceInformationMarkerStart($composer_0, 1332451226, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_5 = !!(!!($composer_0.s6m(tmp9_remember$arg$0) | $composer_0.s6m(tmp10_remember$arg$1)) | $composer_0.s6m(global));
        // Inline function 'kotlin.let' call
        var it_5 = $composer_0.g6y();
        var tmp_19;
        if (invalid_5 || it_5 === Companion_getInstance().x6p_1) {
          var tmp0_safe_receiver_1 = runLogic$lambda_0(tripDetailsVMState$delegate).lbb_1;
          var tripFilter = tmp0_safe_receiver_1 == null ? null : tmp0_safe_receiver_1.s9q_1;
          var stopList = runLogic$lambda_0(tripDetailsVMState$delegate).mbb_1;
          var tmp_20;
          if (!(tripFilter == null) && !(stopList == null)) {
            tmp_20 = stopList.f9l(tripFilter.c9h_1, tripFilter.d9h_1, global);
          } else {
            tmp_20 = null;
          }
          var value_5 = tmp_20;
          $composer_0.h6y(value_5);
          tmp_19 = value_5;
        } else {
          tmp_19 = it_5;
        }
        var tmp_21 = tmp_19;
        var tmp11_group = (tmp_21 == null ? true : !(tmp_21 == null)) ? tmp_21 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var splitStopList = tmp11_group;
        var tmp12_remember$arg$2 = runLogic$lambda_1(now$delegate);
        sourceInformationMarkerStart($composer_0, 1332465405, 'CC(remember):FilteredStopDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_6 = !!(!!(!!($composer_0.s6m(splitStopList) | $composer_0.s6m(trip)) | $composer_0.s6m(tmp12_remember$arg$2)) | $composer_0.s6m(route));
        // Inline function 'kotlin.let' call
        var it_6 = $composer_0.g6y();
        var tmp_22;
        if (invalid_6 || it_6 === Companion_getInstance().x6p_1) {
          var value_6 = !(splitStopList == null) && !(trip == null) && !(route == null) ? wrapped_2(splitStopList, trip, runLogic$lambda_1(now$delegate), route) : null;
          $composer_0.h6y(value_6);
          tmp_22 = value_6;
        } else {
          tmp_22 = it_6;
        }
        var tmp_23 = tmp_22;
        var tmp13_group = (tmp_23 == null ? true : !(tmp_23 == null)) ? tmp_23 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var tripStopList = tmp13_group;
        var tmp0 = new (State())(directions, upcomingTripTiles, trip == null ? null : trip.o8t_1, tripHeadsign, tripVehicle, tripStopList);
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return tmp0;
      }
      oay() {
        return this.iah();
      }
      pb6(active, wasSentToBackground) {
        this.obu_1.pb6(active, wasSentToBackground);
        this.pbu_1.pb6(active, wasSentToBackground);
      }
      rb6(filters) {
        this.obu_1.rb6(filters);
        this.pbu_1.ibb(!(filters.t9g_1 == null) && !(filters.u9g_1 == null) ? TripDetailsPageFilter().g9h(filters.s9g_1, filters.t9g_1, filters.u9g_1) : null);
      }
    }
    protoOf($).ybt = setActive$default;
    initMetadataForClass($, 'FilteredStopDetailsViewModel', VOID, VOID, [MoleculeViewModel(), IFilteredStopDetailsViewModel()]);
    FilteredStopDetailsViewModelClass = $;
  }
  return FilteredStopDetailsViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_FilteredStopDetailsViewModel$stable = 8;
//endregion
//region block: exports
export {
  FilteredStopDetailsViewModel as FilteredStopDetailsViewModel1jb84tisimkmc,
  IFilteredStopDetailsViewModel as IFilteredStopDetailsViewModel10oi42n7av99g,
};
//endregion

//# sourceMappingURL=FilteredStopDetailsViewModel.mjs.map
