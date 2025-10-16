import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SentryLevel_ERROR_getInstance2s9xyvvgzd46v as SentryLevel_ERROR_getInstance } from '../../../../../../sentry-kotlin-multiplatform-sdk-sentry-kotlin-multiplatform/io/sentry/kotlin/multiplatform/SentryLevel.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { mutableMapOfk2y3zt1azl40 as mutableMapOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { Breadcrumb3usz2l38hmvyw as Breadcrumb } from '../../../../../../sentry-kotlin-multiplatform-sdk-sentry-kotlin-multiplatform/io/sentry/kotlin/multiplatform/protocol/Breadcrumb.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  ErrorBannerState56cmzn8cc29a as ErrorBannerState,
  DataError2myofy06md2gg as DataError,
} from '../model/ErrorBannerState.mjs';
import {
  intersect7qttw6wlmz1n as intersect,
  sorted354mfsiv4s7x5 as sorted,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Companion_getInstance2mow8xipgd4ir as Companion_getInstance } from '../utils/EasternTimeInstant.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
  Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import {
  DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance,
  DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
  KMutableProperty025txtn5b59pq1 as KMutableProperty0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import {
  getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef,
  getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Companion_getInstance12wwo4vp1ltr7 as Companion_getInstance_1 } from '../routes/SheetRoutes.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance_2,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { LaunchedEffect1xc4bdzax6uqz as LaunchedEffect } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_State$stable;
var com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_Event_SetSheetRoute$stable;
var com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_Event_ClearState$stable;
var com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel$stable;
var com_mbta_tid_mbta_app_viewModel_MockErrorBannerViewModel$stable;
var IErrorBannerViewModelClass;
function IErrorBannerViewModel() {
  if (IErrorBannerViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IErrorBannerViewModel');
    IErrorBannerViewModelClass = $;
  }
  return IErrorBannerViewModelClass;
}
var SetSheetRouteClass;
function SetSheetRoute() {
  if (SetSheetRouteClass === VOID) {
    class $ {}
    initMetadataForClass($, 'SetSheetRoute', VOID, VOID, [Event()]);
    SetSheetRouteClass = $;
  }
  return SetSheetRouteClass;
}
var ClearStateClass;
function ClearState() {
  if (ClearStateClass === VOID) {
    class $ {}
    initMetadataForObject($, 'ClearState', VOID, VOID, [Event()]);
    ClearStateClass = $;
  }
  return ClearStateClass;
}
function ErrorBannerViewModel$runLogic$slambda$slambda$lambda($previousClearedError, $newErrorState) {
  return function ($this$captureMessage) {
    $this$captureMessage.eaf(new (Breadcrumb())(SentryLevel_ERROR_getInstance(), 'error', 'Recurring DataError', null, mutableMapOf([to('previousClearedError.keys', $previousClearedError.baf_1), to('previousClearedError.details', $previousClearedError.caf_1), to('previousClearedError.clearedAt', $previousClearedError.daf_1), to('newErrorState.messages', $newErrorState.b91_1), to('newErrorState.details', $newErrorState.c91_1)])));
    return Unit_instance;
  };
}
var ErrorBannerViewModel$runLogic$slambda$slambdaClass;
function ErrorBannerViewModel$runLogic$slambda$slambda() {
  if (ErrorBannerViewModel$runLogic$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.naf_1 = this$0;
        $box.oaf_1 = $errorState$delegate;
        $box.paf_1 = $clearedError$delegate;
        super(resultContinuation, $box);
      }
      raf(newErrorState, $completion) {
        var tmp = this.saf(newErrorState, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.raf((p1 == null ? true : p1 instanceof ErrorBannerState()) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var previousErrorState = runLogic$lambda_1(this.oaf_1);
              var previousClearedError = runLogic$lambda_3(this.paf_1);
              var tmp_0;
              if (previousErrorState instanceof DataError()) {
                tmp_0 = this.qaf_1 == null;
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                runLogic$lambda_4(this.paf_1, new (ClearedDataError())(previousErrorState.b91_1, previousErrorState.c91_1, Companion_getInstance().zac(this.naf_1.yaf_1)));
              } else {
                var tmp_1;
                var tmp_2;
                if (previousErrorState == null) {
                  var tmp_3 = this.qaf_1;
                  tmp_2 = tmp_3 instanceof DataError();
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  tmp_1 = !(previousClearedError == null);
                } else {
                  tmp_1 = false;
                }
                if (tmp_1) {
                  var oldKeys = previousClearedError.baf_1;
                  var newKeys = this.qaf_1.b91_1;
                  var commonKeys = intersect(oldKeys, newKeys);
                  var tmp_4;
                  var tmp_5 = Companion_getInstance().zac(this.naf_1.yaf_1).c9m(previousClearedError.daf_1);
                  Companion_getInstance_0();
                  if (Duration__compareTo_impl_pchp0f(tmp_5, toDuration(1, DurationUnit_MINUTES_getInstance())) < 0) {
                    tmp_4 = !commonKeys.h1();
                  } else {
                    tmp_4 = false;
                  }
                  if (tmp_4) {
                    var tmp_6 = 'Recurring DataError ' + toString(sorted(commonKeys));
                    this.naf_1.xaf_1.va1(tmp_6, ErrorBannerViewModel$runLogic$slambda$slambda$lambda(previousClearedError, this.qaf_1));
                  }
                  runLogic$lambda_4(this.paf_1, null);
                }
              }
              runLogic$lambda_2(this.oaf_1, this.qaf_1);
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
      saf(newErrorState, completion) {
        var i = new (ErrorBannerViewModel$runLogic$slambda$slambda())(this.naf_1, this.oaf_1, this.paf_1, completion);
        i.qaf_1 = newErrorState;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ErrorBannerViewModel$runLogic$slambda$slambdaClass = $;
  }
  return ErrorBannerViewModel$runLogic$slambda$slambdaClass;
}
function ErrorBannerViewModel$runLogic$slambda$slambda_0(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation) {
  var i = new (ErrorBannerViewModel$runLogic$slambda$slambda())(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation);
  var l = function (newErrorState, $completion) {
    return i.raf(newErrorState, $completion);
  };
  l.$arity = 1;
  return l;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(loadingWhenPredictionsStale, errorState) {
        loadingWhenPredictionsStale = loadingWhenPredictionsStale === VOID ? false : loadingWhenPredictionsStale;
        errorState = errorState === VOID ? null : errorState;
        this.aag_1 = loadingWhenPredictionsStale;
        this.bag_1 = errorState;
      }
      toString() {
        return 'State(loadingWhenPredictionsStale=' + this.aag_1 + ', errorState=' + toString_0(this.bag_1) + ')';
      }
      hashCode() {
        var result = getBooleanHashCode(this.aag_1);
        result = imul(result, 31) + (this.bag_1 == null ? 0 : hashCode(this.bag_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!(this.aag_1 === tmp0_other_with_cast.aag_1))
          return false;
        if (!equals(this.bag_1, tmp0_other_with_cast.bag_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State');
    StateClass = $;
  }
  return StateClass;
}
var EventClass;
function Event() {
  if (EventClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Event');
    EventClass = $;
  }
  return EventClass;
}
var ClearedDataErrorClass;
function ClearedDataError() {
  if (ClearedDataErrorClass === VOID) {
    class $ {
      constructor(keys, details, clearedAt) {
        this.baf_1 = keys;
        this.caf_1 = details;
        this.daf_1 = clearedAt;
      }
      toString() {
        return 'ClearedDataError(keys=' + toString(this.baf_1) + ', details=' + toString(this.caf_1) + ', clearedAt=' + this.daf_1.toString() + ')';
      }
      hashCode() {
        var result = hashCode(this.baf_1);
        result = imul(result, 31) + hashCode(this.caf_1) | 0;
        result = imul(result, 31) + this.daf_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ClearedDataError()))
          return false;
        var tmp0_other_with_cast = other instanceof ClearedDataError() ? other : THROW_CCE();
        if (!equals(this.baf_1, tmp0_other_with_cast.baf_1))
          return false;
        if (!equals(this.caf_1, tmp0_other_with_cast.caf_1))
          return false;
        if (!this.daf_1.equals(tmp0_other_with_cast.daf_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ClearedDataError');
    ClearedDataErrorClass = $;
  }
  return ClearedDataErrorClass;
}
function _set_awaitingPredictionsAfterBackground__a5vx7f($this, _set____db54di) {
  var tmp0 = $this.zaf_1;
  var tmp = KMutableProperty1();
  var tmp_0 = ErrorBannerViewModel$_get_awaitingPredictionsAfterBackground_$ref_y8pn24_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('awaitingPredictionsAfterBackground', 1, tmp, tmp_0, ErrorBannerViewModel$_set_awaitingPredictionsAfterBackground_$ref_g846iw_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_awaitingPredictionsAfterBackground__uvzpcp($this) {
  var tmp0 = $this.zaf_1;
  var tmp = KMutableProperty1();
  var tmp_0 = ErrorBannerViewModel$_get_awaitingPredictionsAfterBackground_$ref_y8pn24();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('awaitingPredictionsAfterBackground', 1, tmp, tmp_0, ErrorBannerViewModel$_set_awaitingPredictionsAfterBackground_$ref_g846iw());
  return tmp0.v1();
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.cag_1 = function_0;
      }
      z2n(value, $completion) {
        return this.cag_1(value, $completion);
      }
      z4() {
        return this.cag_1;
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
function runLogic$lambda($sheetRoute$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('sheetRoute', KMutableProperty0(), true);
  return $sheetRoute$delegate.v1();
}
function runLogic$lambda_0($sheetRoute$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('sheetRoute', KMutableProperty0(), true);
  $sheetRoute$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function runLogic$lambda_1($errorState$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('errorState', KMutableProperty0(), true);
  return $errorState$delegate.v1();
}
function runLogic$lambda_2($errorState$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('errorState', KMutableProperty0(), true);
  $errorState$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function runLogic$lambda_3($clearedError$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('clearedError', KMutableProperty0(), true);
  return $clearedError$delegate.v1();
}
function runLogic$lambda_4($clearedError$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('clearedError', KMutableProperty0(), true);
  $clearedError$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function ErrorBannerViewModel$_get_awaitingPredictionsAfterBackground_$ref_y8pn24() {
  return function (p0) {
    return _get_awaitingPredictionsAfterBackground__uvzpcp(p0);
  };
}
function ErrorBannerViewModel$_set_awaitingPredictionsAfterBackground_$ref_g846iw() {
  return function (p0, p1) {
    _set_awaitingPredictionsAfterBackground__a5vx7f(p0, p1);
    return Unit_instance;
  };
}
function ErrorBannerViewModel$_get_awaitingPredictionsAfterBackground_$ref_y8pn24_0() {
  return function (p0) {
    return _get_awaitingPredictionsAfterBackground__uvzpcp(p0);
  };
}
function ErrorBannerViewModel$_set_awaitingPredictionsAfterBackground_$ref_g846iw_0() {
  return function (p0, p1) {
    _set_awaitingPredictionsAfterBackground__a5vx7f(p0, p1);
    return Unit_instance;
  };
}
var ErrorBannerViewModel$runLogic$slambdaClass;
function ErrorBannerViewModel$runLogic$slambda() {
  if (ErrorBannerViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.lag_1 = this$0;
        $box.mag_1 = $errorState$delegate;
        $box.nag_1 = $clearedError$delegate;
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
                this.lag_1.waf_1.s9t();
                this.fd_1 = 1;
                var tmp_0 = ErrorBannerViewModel$runLogic$slambda$slambda_0(this.lag_1, this.mag_1, this.nag_1, null);
                suspendResult = this.lag_1.waf_1.n9t_1.t2p(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_0), this);
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
        var i = new (ErrorBannerViewModel$runLogic$slambda())(this.lag_1, this.mag_1, this.nag_1, completion);
        i.oag_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ErrorBannerViewModel$runLogic$slambdaClass = $;
  }
  return ErrorBannerViewModel$runLogic$slambdaClass;
}
function ErrorBannerViewModel$runLogic$slambda_0(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation) {
  var i = new (ErrorBannerViewModel$runLogic$slambda())(this$0, $errorState$delegate, $clearedError$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var ErrorBannerViewModel$runLogic$slambdaClass_0;
function ErrorBannerViewModel$runLogic$slambda_1() {
  if (ErrorBannerViewModel$runLogic$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $sheetRoute$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.xag_1 = this$0;
        $box.yag_1 = $sheetRoute$delegate;
        super(resultContinuation, $box);
      }
      aah(event, $completion) {
        var tmp = this.bah(event, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.aah((!(p1 == null) ? isInterface(p1, Event()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var tmp0_subject = this.zag_1;
              if (tmp0_subject instanceof ClearState()) {
                this.xag_1.waf_1.w9t();
              } else {
                if (tmp0_subject instanceof SetSheetRoute()) {
                  if (Companion_getInstance_1().aa8(runLogic$lambda(this.yag_1), this.zag_1.cah_1)) {
                    this.xag_1.waf_1.w9t();
                  }
                  runLogic$lambda_0(this.yag_1, this.zag_1.cah_1);
                } else {
                  noWhenBranchMatchedException();
                }
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
      bah(event, completion) {
        var i = new (ErrorBannerViewModel$runLogic$slambda_1())(this.xag_1, this.yag_1, completion);
        i.zag_1 = event;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ErrorBannerViewModel$runLogic$slambdaClass_0 = $;
  }
  return ErrorBannerViewModel$runLogic$slambdaClass_0;
}
function ErrorBannerViewModel$runLogic$slambda_2(this$0, $sheetRoute$delegate, resultContinuation) {
  var i = new (ErrorBannerViewModel$runLogic$slambda_1())(this$0, $sheetRoute$delegate, resultContinuation);
  var l = function (event, $completion) {
    return i.aah(event, $completion);
  };
  l.$arity = 1;
  return l;
}
var ErrorBannerViewModelClass;
function ErrorBannerViewModel() {
  if (ErrorBannerViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor(errorRepository, sentryRepository, clock) {
        super();
        this.waf_1 = errorRepository;
        this.xaf_1 = sentryRepository;
        this.yaf_1 = clock;
        this.zaf_1 = mutableStateOf(false);
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(-1253105640);
        sourceInformation($composer_0, 'C(runLogic)69@2388L33,71@2468L33,73@2550L33,75@2614L2681,75@2593L2702,128@5386L397,128@5305L478:ErrorBannerViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(-1253105640, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.ErrorBannerViewModel.runLogic (ErrorBannerViewModel.kt:68)');
        }
        sourceInformationMarkerStart($composer_0, -1643674279, 'CC(remember):ErrorBannerViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp;
        if (false || it === Companion_getInstance_2().x6p_1) {
          var value = mutableStateOf(null);
          $composer_0.h6y(value);
          tmp = value;
        } else {
          tmp = it;
        }
        var tmp_0 = tmp;
        var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var sheetRoute$delegate = tmp1_group;
        sourceInformationMarkerStart($composer_0, -1643671719, 'CC(remember):ErrorBannerViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_1;
        if (false || it_0 === Companion_getInstance_2().x6p_1) {
          var value_0 = mutableStateOf(null);
          $composer_0.h6y(value_0);
          tmp_1 = value_0;
        } else {
          tmp_1 = it_0;
        }
        var tmp_2 = tmp_1;
        var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var errorState$delegate = tmp2_group;
        sourceInformationMarkerStart($composer_0, -1643669095, 'CC(remember):ErrorBannerViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_1 = $composer_0.g6y();
        var tmp_3;
        if (false || it_1 === Companion_getInstance_2().x6p_1) {
          var value_1 = mutableStateOf(null);
          $composer_0.h6y(value_1);
          tmp_3 = value_1;
        } else {
          tmp_3 = it_1;
        }
        var tmp_4 = tmp_3;
        var tmp3_group = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var clearedError$delegate = tmp3_group;
        sourceInformationMarkerStart($composer_0, -1643664399, 'CC(remember):ErrorBannerViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_2 = $composer_0.g6y();
        var tmp_5;
        if (invalid || it_2 === Companion_getInstance_2().x6p_1) {
          var value_2 = ErrorBannerViewModel$runLogic$slambda_0(this, errorState$delegate, clearedError$delegate, null);
          $composer_0.h6y(value_2);
          tmp_5 = value_2;
        } else {
          tmp_5 = it_2;
        }
        var tmp_6 = tmp_5;
        var tmp4_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(Unit_instance, tmp4_group, $composer_0, 6);
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp_7 = toDuration(1, DurationUnit_SECONDS_getInstance());
        sourceInformationMarkerStart($composer_0, -1643577979, 'CC(remember):ErrorBannerViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_3 = $composer_0.g6y();
        var tmp_8;
        if (invalid_0 || it_3 === Companion_getInstance_2().x6p_1) {
          var value_3 = ErrorBannerViewModel$runLogic$slambda_2(this, sheetRoute$delegate, null);
          $composer_0.h6y(value_3);
          tmp_8 = value_3;
        } else {
          tmp_8 = it_3;
        }
        var tmp_9 = tmp_8;
        var tmp5_group = (tmp_9 == null ? true : !(tmp_9 == null)) ? tmp_9 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        this.hah(tmp_7, this.xaf_1, tmp5_group, $composer_0, 7168 & $changed << 9);
        var tmp0 = new (State())(_get_awaitingPredictionsAfterBackground__uvzpcp(this), runLogic$lambda_1(errorState$delegate));
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return tmp0;
      }
    }
    initMetadataForClass($, 'ErrorBannerViewModel', VOID, VOID, [MoleculeViewModel(), IErrorBannerViewModel()]);
    ErrorBannerViewModelClass = $;
  }
  return ErrorBannerViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_State$stable = 0;
com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_Event_SetSheetRoute$stable = 0;
com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel_Event_ClearState$stable = 0;
com_mbta_tid_mbta_app_viewModel_ErrorBannerViewModel$stable = 8;
com_mbta_tid_mbta_app_viewModel_MockErrorBannerViewModel$stable = 8;
//endregion
//region block: exports
export {
  ErrorBannerViewModel as ErrorBannerViewModel10rnlbxctbaud,
  IErrorBannerViewModel as IErrorBannerViewModel1no2losolnp0y,
};
//endregion

//# sourceMappingURL=ErrorBannerViewModel.mjs.map
