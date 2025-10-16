import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
  KMutableProperty025txtn5b59pq1 as KMutableProperty0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import {
  getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef,
  getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { MutableStateFlow34bfoyvwu8czu as MutableStateFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/StateFlow.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { getGlobalData3s0ud2znxtzqv as getGlobalData } from './composeStateHelpers/getGlobalData.mjs';
import { getTripData6lr6pskcl1w5 as getTripData } from './composeStateHelpers/getTripData.mjs';
import { getTripDetailsStopList2rzd6of9osv0p as getTripDetailsStopList } from './composeStateHelpers/getTripDetailsStopList.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { LaunchedEffect3knc11esygzlw as LaunchedEffect } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_Event_SetActive$stable;
var com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_Event$stable;
var com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_State$stable;
var com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel$stable;
var com_mbta_tid_mbta_app_viewModel_MockTripDetailsViewModel$stable;
var ITripDetailsViewModelClass;
function ITripDetailsViewModel() {
  if (ITripDetailsViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ITripDetailsViewModel');
    ITripDetailsViewModelClass = $;
  }
  return ITripDetailsViewModelClass;
}
var SetActiveClass;
function SetActive() {
  if (SetActiveClass === VOID) {
    class $ extends Event() {
      constructor(active, wasSentToBackground) {
        super();
        this.jbb_1 = active;
        this.kbb_1 = wasSentToBackground;
      }
      toString() {
        return 'SetActive(active=' + this.jbb_1 + ', wasSentToBackground=' + this.kbb_1 + ')';
      }
      hashCode() {
        var result = getBooleanHashCode(this.jbb_1);
        result = imul(result, 31) + getBooleanHashCode(this.kbb_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SetActive()))
          return false;
        var tmp0_other_with_cast = other instanceof SetActive() ? other : THROW_CCE();
        if (!(this.jbb_1 === tmp0_other_with_cast.jbb_1))
          return false;
        if (!(this.kbb_1 === tmp0_other_with_cast.kbb_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'SetActive');
    SetActiveClass = $;
  }
  return SetActiveClass;
}
var Context_StopDetails_instance;
var Context_TripDetails_instance;
var Context_entriesInitialized;
function Context_initEntries() {
  if (Context_entriesInitialized)
    return Unit_instance;
  Context_entriesInitialized = true;
  Context_StopDetails_instance = new (Context())('StopDetails', 0);
  Context_TripDetails_instance = new (Context())('TripDetails', 1);
}
var EventClass;
function Event() {
  if (EventClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Event');
    EventClass = $;
  }
  return EventClass;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(tripData, stopList, awaitingPredictionsAfterBackground) {
        tripData = tripData === VOID ? null : tripData;
        stopList = stopList === VOID ? null : stopList;
        awaitingPredictionsAfterBackground = awaitingPredictionsAfterBackground === VOID ? false : awaitingPredictionsAfterBackground;
        this.lbb_1 = tripData;
        this.mbb_1 = stopList;
        this.nbb_1 = awaitingPredictionsAfterBackground;
      }
      toString() {
        return 'State(tripData=' + toString(this.lbb_1) + ', stopList=' + toString(this.mbb_1) + ', awaitingPredictionsAfterBackground=' + this.nbb_1 + ')';
      }
      hashCode() {
        var result = this.lbb_1 == null ? 0 : this.lbb_1.hashCode();
        result = imul(result, 31) + (this.mbb_1 == null ? 0 : this.mbb_1.hashCode()) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.nbb_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!equals(this.lbb_1, tmp0_other_with_cast.lbb_1))
          return false;
        if (!equals(this.mbb_1, tmp0_other_with_cast.mbb_1))
          return false;
        if (!(this.nbb_1 === tmp0_other_with_cast.nbb_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State', State);
    StateClass = $;
  }
  return StateClass;
}
var ContextClass;
function Context() {
  if (ContextClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Context');
    ContextClass = $;
  }
  return ContextClass;
}
function _set_alerts__l5i7og($this, _set____db54di) {
  var tmp0 = $this.xbb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_alerts_$ref_u9enpc_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('alerts', 1, tmp, tmp_0, TripDetailsViewModel$_set_alerts_$ref_ppgt4k_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_alerts__mm8sb8($this) {
  var tmp0 = $this.xbb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_alerts_$ref_u9enpc();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('alerts', 1, tmp, tmp_0, TripDetailsViewModel$_set_alerts_$ref_ppgt4k());
  return tmp0.v1();
}
function _set_context__jmvfwq($this, _set____db54di) {
  var tmp0 = $this.ybb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_context_$ref_4yu104_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('context', 1, tmp, tmp_0, TripDetailsViewModel$_set_context_$ref_pbk5bs_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_context__ps0bpe($this) {
  var tmp0 = $this.ybb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_context_$ref_4yu104();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('context', 1, tmp, tmp_0, TripDetailsViewModel$_set_context_$ref_pbk5bs());
  return tmp0.v1();
}
function _set_filters__m6h3bq($this, _set____db54di) {
  var tmp0 = $this.zbb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_filters_$ref_yf3z94_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('filters', 1, tmp, tmp_0, TripDetailsViewModel$_set_filters_$ref_6blwe4_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_filters__n8eoae($this) {
  var tmp0 = $this.zbb_1;
  var tmp = KMutableProperty1();
  var tmp_0 = TripDetailsViewModel$_get_filters_$ref_yf3z94();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('filters', 1, tmp, tmp_0, TripDetailsViewModel$_set_filters_$ref_6blwe4());
  return tmp0.v1();
}
function runLogic$lambda($awaitingPredictionsAfterBackground$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('awaitingPredictionsAfterBackground', KMutableProperty0(), true);
  return $awaitingPredictionsAfterBackground$delegate.v1();
}
function runLogic$lambda_0($awaitingPredictionsAfterBackground$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('awaitingPredictionsAfterBackground', KMutableProperty0(), true);
  $awaitingPredictionsAfterBackground$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function runLogic$lambda_1($active$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('active', KMutableProperty0(), true);
  return $active$delegate.v1();
}
function runLogic$lambda_2($active$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('active', KMutableProperty0(), true);
  $active$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function TripDetailsViewModel$_get_alerts_$ref_u9enpc() {
  return function (p0) {
    return _get_alerts__mm8sb8(p0);
  };
}
function TripDetailsViewModel$_set_alerts_$ref_ppgt4k() {
  return function (p0, p1) {
    _set_alerts__l5i7og(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$_get_alerts_$ref_u9enpc_0() {
  return function (p0) {
    return _get_alerts__mm8sb8(p0);
  };
}
function TripDetailsViewModel$_set_alerts_$ref_ppgt4k_0() {
  return function (p0, p1) {
    _set_alerts__l5i7og(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$_get_context_$ref_4yu104() {
  return function (p0) {
    return _get_context__ps0bpe(p0);
  };
}
function TripDetailsViewModel$_set_context_$ref_pbk5bs() {
  return function (p0, p1) {
    _set_context__jmvfwq(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$_get_context_$ref_4yu104_0() {
  return function (p0) {
    return _get_context__ps0bpe(p0);
  };
}
function TripDetailsViewModel$_set_context_$ref_pbk5bs_0() {
  return function (p0, p1) {
    _set_context__jmvfwq(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$_get_filters_$ref_yf3z94() {
  return function (p0) {
    return _get_filters__n8eoae(p0);
  };
}
function TripDetailsViewModel$_set_filters_$ref_6blwe4() {
  return function (p0, p1) {
    _set_filters__m6h3bq(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$_get_filters_$ref_yf3z94_0() {
  return function (p0) {
    return _get_filters__n8eoae(p0);
  };
}
function TripDetailsViewModel$_set_filters_$ref_6blwe4_0() {
  return function (p0, p1) {
    _set_filters__m6h3bq(p0, p1);
    return Unit_instance;
  };
}
function TripDetailsViewModel$runLogic$lambda($awaitingPredictionsAfterBackground$delegate) {
  return function () {
    runLogic$lambda_0($awaitingPredictionsAfterBackground$delegate, false);
    return Unit_instance;
  };
}
var TripDetailsViewModel$runLogic$slambdaClass;
function TripDetailsViewModel$runLogic$slambda() {
  if (TripDetailsViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($active$delegate, $awaitingPredictionsAfterBackground$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.kbc_1 = $active$delegate;
        $box.lbc_1 = $awaitingPredictionsAfterBackground$delegate;
        super(resultContinuation, $box);
      }
      nbc(event, $completion) {
        var tmp = this.obc(event, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.nbc(p1 instanceof Event() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              if (this.mbc_1 instanceof SetActive()) {
                runLogic$lambda_2(this.kbc_1, this.mbc_1.jbb_1);
                if (this.mbc_1.kbb_1) {
                  runLogic$lambda_0(this.lbc_1, true);
                }
              } else {
                noWhenBranchMatchedException();
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
      obc(event, completion) {
        var i = new (TripDetailsViewModel$runLogic$slambda())(this.kbc_1, this.lbc_1, completion);
        i.mbc_1 = event;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    TripDetailsViewModel$runLogic$slambdaClass = $;
  }
  return TripDetailsViewModel$runLogic$slambdaClass;
}
function TripDetailsViewModel$runLogic$slambda_0($active$delegate, $awaitingPredictionsAfterBackground$delegate, resultContinuation) {
  var i = new (TripDetailsViewModel$runLogic$slambda())($active$delegate, $awaitingPredictionsAfterBackground$delegate, resultContinuation);
  var l = function (event, $completion) {
    return i.nbc(event, $completion);
  };
  l.$arity = 1;
  return l;
}
var TripDetailsViewModel$runLogic$slambdaClass_0;
function TripDetailsViewModel$runLogic$slambda_1() {
  if (TripDetailsViewModel$runLogic$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $tripData, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.xbc_1 = this$0;
        $box.ybc_1 = $tripData;
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
              var tmp0_safe_receiver = this.ybc_1;
              var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.x9q_1;
              var tmp_0;
              if (tmp1_safe_receiver == null) {
                tmp_0 = null;
              } else {
                var tmp_1;
                var tmp0_safe_receiver_0 = _get_filters__n8eoae(this.xbc_1);
                if (tmp1_safe_receiver.j9h_1 === (tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.z9g_1)) {
                  tmp_1 = tmp1_safe_receiver;
                } else {
                  tmp_1 = null;
                }
                tmp_0 = tmp_1;
              }
              this.xbc_1.abc_1.u2p(tmp_0);
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
        var i = new (TripDetailsViewModel$runLogic$slambda_1())(this.xbc_1, this.ybc_1, completion);
        i.zbc_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    TripDetailsViewModel$runLogic$slambdaClass_0 = $;
  }
  return TripDetailsViewModel$runLogic$slambdaClass_0;
}
function TripDetailsViewModel$runLogic$slambda_2(this$0, $tripData, resultContinuation) {
  var i = new (TripDetailsViewModel$runLogic$slambda_1())(this$0, $tripData, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function Context_StopDetails_getInstance() {
  Context_initEntries();
  return Context_StopDetails_instance;
}
function Context_TripDetails_getInstance() {
  Context_initEntries();
  return Context_TripDetails_instance;
}
var TripDetailsViewModelClass;
function TripDetailsViewModel() {
  if (TripDetailsViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor(errorBannerRepository, sentryRepository, tripPredictionsRepository, tripRepository, vehicleRepository, coroutineDispatcher) {
        var tmp;
        if (coroutineDispatcher === VOID) {
          var tmp0 = KoinPlatform_instance.r7v();
          // Inline function 'org.koin.core.Koin.get' call
          var qualifier = named('coroutineDispatcherIO');
          // Inline function 'org.koin.core.scope.Scope.get' call
          tmp = tmp0.r7u_1.e7v_1.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
        } else {
          tmp = coroutineDispatcher;
        }
        coroutineDispatcher = tmp;
        super();
        this.rbb_1 = errorBannerRepository;
        this.sbb_1 = sentryRepository;
        this.tbb_1 = tripPredictionsRepository;
        this.ubb_1 = tripRepository;
        this.vbb_1 = vehicleRepository;
        this.wbb_1 = coroutineDispatcher;
        this.xbb_1 = mutableStateOf(null);
        this.ybb_1 = mutableStateOf(null);
        this.zbb_1 = mutableStateOf(null);
        this.abc_1 = MutableStateFlow(null);
        this.bbc_1 = this.abc_1;
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(-1472949910);
        sourceInformation($composer_0, 'C(runLogic)78@3322L34,79@3388L33,82@3494L66,89@3700L46,85@3597L376,98@3998L61,100@4150L302,100@4069L383,111@4505L144,111@4462L187,118@4683L280:TripDetailsViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(-1472949910, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.TripDetailsViewModel.runLogic (TripDetailsViewModel.kt:77)');
        }
        sourceInformationMarkerStart($composer_0, 1834347660, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp;
        if (false || it === Companion_getInstance().x6p_1) {
          var value = mutableStateOf(false);
          $composer_0.h6y(value);
          tmp = value;
        } else {
          tmp = it;
        }
        var tmp_0 = tmp;
        var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var awaitingPredictionsAfterBackground$delegate = tmp1_group;
        sourceInformationMarkerStart($composer_0, 1834349771, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_1;
        if (false || it_0 === Companion_getInstance().x6p_1) {
          var value_0 = mutableStateOf(true);
          $composer_0.h6y(value_0);
          tmp_1 = value_0;
        } else {
          tmp_1 = it_0;
        }
        var tmp_2 = tmp_1;
        var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var active$delegate = tmp2_group;
        var errorKey = 'TripDetailsViewModel';
        var globalData = getGlobalData(errorKey, null, null, this.wbb_1, $composer_0, 6, 6);
        var tmp_3 = _get_filters__n8eoae(this);
        var tmp_4 = runLogic$lambda_1(active$delegate);
        var tmp_5 = _get_context__ps0bpe(this);
        sourceInformationMarkerStart($composer_0, 1834359768, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_1 = $composer_0.g6y();
        var tmp_6;
        if (false || it_1 === Companion_getInstance().x6p_1) {
          var value_1 = TripDetailsViewModel$runLogic$lambda(awaitingPredictionsAfterBackground$delegate);
          $composer_0.h6y(value_1);
          tmp_6 = value_1;
        } else {
          tmp_6 = it_1;
        }
        var tmp_7 = tmp_6;
        var tmp3_group = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var tripData = getTripData(tmp_3, tmp_4, tmp_5, tmp3_group, errorKey, this.wbb_1, this.rbb_1, this.tbb_1, this.ubb_1, this.vbb_1, $composer_0, 27648, 0);
        var stopList = getTripDetailsStopList(_get_filters__n8eoae(this), tripData, _get_alerts__mm8sb8(this), globalData, $composer_0, 0);
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp_8 = toDuration(1, DurationUnit_SECONDS_getInstance());
        sourceInformationMarkerStart($composer_0, 1834374424, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_2 = $composer_0.g6y();
        var tmp_9;
        if (false || it_2 === Companion_getInstance().x6p_1) {
          var value_2 = TripDetailsViewModel$runLogic$slambda_0(active$delegate, awaitingPredictionsAfterBackground$delegate, null);
          $composer_0.h6y(value_2);
          tmp_9 = value_2;
        } else {
          tmp_9 = it_2;
        }
        var tmp_10 = tmp_9;
        var tmp4_group = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        this.hah(tmp_8, this.sbb_1, tmp4_group, $composer_0, 7168 & $changed << 9);
        var tmp_11 = _get_filters__n8eoae(this);
        var tmp_12 = tripData == null ? null : tripData.x9q_1;
        sourceInformationMarkerStart($composer_0, 1834385626, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = !!($composer_0.q6w(this) | $composer_0.q6w(tripData));
        // Inline function 'kotlin.let' call
        var it_3 = $composer_0.g6y();
        var tmp_13;
        if (invalid || it_3 === Companion_getInstance().x6p_1) {
          var value_3 = TripDetailsViewModel$runLogic$slambda_2(this, tripData, null);
          $composer_0.h6y(value_3);
          tmp_13 = value_3;
        } else {
          tmp_13 = it_3;
        }
        var tmp_14 = tmp_13;
        var tmp5_group = (tmp_14 == null ? true : !(tmp_14 == null)) ? tmp_14 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(tmp_11, tmp_12, tmp5_group, $composer_0, 0);
        var tmp6_remember$arg$0 = _get_context__ps0bpe(this);
        var tmp7_remember$arg$3 = runLogic$lambda(awaitingPredictionsAfterBackground$delegate);
        sourceInformationMarkerStart($composer_0, 1834391458, 'CC(remember):TripDetailsViewModel.kt#9igjgp');
        var tmp_15 = $composer_0;
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = !!(!!(!!(tmp_15.s6w(tmp6_remember$arg$0 == null ? -1 : tmp6_remember$arg$0.x3_1) | $composer_0.s6m(tripData)) | $composer_0.s6m(stopList)) | $composer_0.r6w(tmp7_remember$arg$3));
        // Inline function 'kotlin.let' call
        var it_4 = $composer_0.g6y();
        var tmp_16;
        if (invalid_0 || it_4 === Companion_getInstance().x6p_1) {
          var value_4 = new (State())(tripData, stopList, equals(_get_context__ps0bpe(this), Context_TripDetails_getInstance()) && runLogic$lambda(awaitingPredictionsAfterBackground$delegate));
          $composer_0.h6y(value_4);
          tmp_16 = value_4;
        } else {
          tmp_16 = it_4;
        }
        var tmp_17 = tmp_16;
        var tmp8_group = (tmp_17 == null ? true : !(tmp_17 == null)) ? tmp_17 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var state = tmp8_group;
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return state;
      }
      oay() {
        return this.iah();
      }
      pb6(active, wasSentToBackground) {
        return this.hal(new (SetActive())(active, wasSentToBackground));
      }
      qb6(alerts) {
        _set_alerts__l5i7og(this, alerts);
      }
      hbb(context) {
        _set_context__jmvfwq(this, context);
      }
      ibb(filters) {
        _set_filters__m6h3bq(this, filters);
      }
    }
    initMetadataForClass($, 'TripDetailsViewModel', VOID, VOID, [MoleculeViewModel(), ITripDetailsViewModel()]);
    TripDetailsViewModelClass = $;
  }
  return TripDetailsViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_Event_SetActive$stable = 0;
com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_Event$stable = 0;
com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel_State$stable = 8;
com_mbta_tid_mbta_app_viewModel_TripDetailsViewModel$stable = 8;
com_mbta_tid_mbta_app_viewModel_MockTripDetailsViewModel$stable = 8;
//endregion
//region block: exports
export {
  ITripDetailsViewModel as ITripDetailsViewModel25zgdx53rhnis,
  TripDetailsViewModel as TripDetailsViewModel1hqsp7f1llsav,
  Context_StopDetails_getInstance as Context_StopDetails_getInstance12fk92tiprv9q,
  Context_TripDetails_getInstance as Context_TripDetails_getInstance19hv695l9zume,
};
//endregion

//# sourceMappingURL=TripDetailsViewModel.mjs.map
