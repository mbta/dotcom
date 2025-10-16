import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
  KMutableProperty025txtn5b59pq1 as KMutableProperty0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import {
  getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef,
  getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Companion_instance2uzhn407fxjfi as Companion_instance } from '../model/RouteDetailsStopList.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { wrapped3nzz3ihzawmvu as wrapped } from '../wrapper/Wrappers.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { getRouteStops23bxjy5715l6z as getRouteStops } from './composeStateHelpers/getRouteStops.mjs';
import { getGlobalData3s0ud2znxtzqv as getGlobalData } from './composeStateHelpers/getGlobalData.mjs';
import { LaunchedEffect1pydbte2iu76e as LaunchedEffect } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_RouteDetailsViewModel$stable;
var IRouteDetailsViewModelClass;
function IRouteDetailsViewModel() {
  if (IRouteDetailsViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IRouteDetailsViewModel');
    IRouteDetailsViewModelClass = $;
  }
  return IRouteDetailsViewModelClass;
}
function _set_selectedRouteId__mu1664($this, _set____db54di) {
  var tmp0 = $this.mbw_1;
  var tmp = KMutableProperty1();
  var tmp_0 = RouteDetailsViewModel$_get_selectedRouteId_$ref_o9b9dq_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('selectedRouteId', 1, tmp, tmp_0, RouteDetailsViewModel$_set_selectedRouteId_$ref_ayl0he_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_selectedRouteId__wxrdoo($this) {
  var tmp0 = $this.mbw_1;
  var tmp = KMutableProperty1();
  var tmp_0 = RouteDetailsViewModel$_get_selectedRouteId_$ref_o9b9dq();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('selectedRouteId', 1, tmp, tmp_0, RouteDetailsViewModel$_set_selectedRouteId_$ref_ayl0he());
  return tmp0.v1();
}
function _set_selectedDirection__fvx1b3($this, _set____db54di) {
  var tmp0 = $this.nbw_1;
  var tmp = KMutableProperty1();
  var tmp_0 = RouteDetailsViewModel$_get_selectedDirection_$ref_5l1p5v_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('selectedDirection', 1, tmp, tmp_0, RouteDetailsViewModel$_set_selectedDirection_$ref_bqo1lj_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_selectedDirection__xfe4dp($this) {
  var tmp0 = $this.nbw_1;
  var tmp = KMutableProperty1();
  var tmp_0 = RouteDetailsViewModel$_get_selectedDirection_$ref_5l1p5v();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('selectedDirection', 1, tmp, tmp_0, RouteDetailsViewModel$_set_selectedDirection_$ref_bqo1lj());
  return tmp0.v1();
}
function runLogic$lambda($stopList$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('stopList', KMutableProperty0(), true);
  return $stopList$delegate.v1();
}
function runLogic$lambda_0($stopList$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('stopList', KMutableProperty0(), true);
  $stopList$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function RouteDetailsViewModel$_get_selectedRouteId_$ref_o9b9dq() {
  return function (p0) {
    return _get_selectedRouteId__wxrdoo(p0);
  };
}
function RouteDetailsViewModel$_set_selectedRouteId_$ref_ayl0he() {
  return function (p0, p1) {
    _set_selectedRouteId__mu1664(p0, p1);
    return Unit_instance;
  };
}
function RouteDetailsViewModel$_get_selectedRouteId_$ref_o9b9dq_0() {
  return function (p0) {
    return _get_selectedRouteId__wxrdoo(p0);
  };
}
function RouteDetailsViewModel$_set_selectedRouteId_$ref_ayl0he_0() {
  return function (p0, p1) {
    _set_selectedRouteId__mu1664(p0, p1);
    return Unit_instance;
  };
}
function RouteDetailsViewModel$_get_selectedDirection_$ref_5l1p5v() {
  return function (p0) {
    return _get_selectedDirection__xfe4dp(p0);
  };
}
function RouteDetailsViewModel$_set_selectedDirection_$ref_bqo1lj() {
  return function (p0, p1) {
    _set_selectedDirection__fvx1b3(p0, p1);
    return Unit_instance;
  };
}
function RouteDetailsViewModel$_get_selectedDirection_$ref_5l1p5v_0() {
  return function (p0) {
    return _get_selectedDirection__xfe4dp(p0);
  };
}
function RouteDetailsViewModel$_set_selectedDirection_$ref_bqo1lj_0() {
  return function (p0, p1) {
    _set_selectedDirection__fvx1b3(p0, p1);
    return Unit_instance;
  };
}
var RouteDetailsViewModel$runLogic$slambdaClass;
function RouteDetailsViewModel$runLogic$slambda() {
  if (RouteDetailsViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $globalData, $routeStops, $stopList$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.wbw_1 = this$0;
        $box.xbw_1 = $globalData;
        $box.ybw_1 = $routeStops;
        $box.zbw_1 = $stopList$delegate;
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
                this.gd_1 = 3;
                this.bbx_1 = _get_selectedRouteId__wxrdoo(this.wbw_1);
                this.cbx_1 = _get_selectedDirection__xfe4dp(this.wbw_1);
                if (!(this.bbx_1 == null) && !(this.cbx_1 == null) && !(this.xbw_1 == null)) {
                  this.fd_1 = 1;
                  suspendResult = Companion_instance.e9d(this.bbx_1, this.cbx_1, this.ybw_1, this.xbw_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.dbx_1 = null;
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                var tmp0_safe_receiver = suspendResult;
                this.dbx_1 = tmp0_safe_receiver == null ? null : wrapped(tmp0_safe_receiver, this.xbw_1.s97(this.bbx_1));
                this.fd_1 = 2;
                continue $sm;
              case 2:
                var ARGUMENT = this.dbx_1;
                runLogic$lambda_0(this.zbw_1, ARGUMENT);
                return Unit_instance;
              case 3:
                throw this.id_1;
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (RouteDetailsViewModel$runLogic$slambda())(this.wbw_1, this.xbw_1, this.ybw_1, this.zbw_1, completion);
        i.abx_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteDetailsViewModel$runLogic$slambdaClass = $;
  }
  return RouteDetailsViewModel$runLogic$slambdaClass;
}
function RouteDetailsViewModel$runLogic$slambda_0(this$0, $globalData, $routeStops, $stopList$delegate, resultContinuation) {
  var i = new (RouteDetailsViewModel$runLogic$slambda())(this$0, $globalData, $routeStops, $stopList$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var RouteDetailsViewModelClass;
function RouteDetailsViewModel() {
  if (RouteDetailsViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor() {
        super();
        this.mbw_1 = mutableStateOf(null);
        this.nbw_1 = mutableStateOf(null);
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(1448115308);
        sourceInformation($composer_0, 'C(runLogic)30@1194L33,33@1266L87,34@1379L38,36@1502L583,36@1427L658:RouteDetailsViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(1448115308, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.RouteDetailsViewModel.runLogic (RouteDetailsViewModel.kt:29)');
        }
        sourceInformationMarkerStart($composer_0, 69410573, 'CC(remember):RouteDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp;
        if (false || it === Companion_getInstance().x6p_1) {
          var value = mutableStateOf(null);
          $composer_0.h6y(value);
          tmp = value;
        } else {
          tmp = it;
        }
        var tmp_0 = tmp;
        var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var stopList$delegate = tmp1_group;
        var tmp_1 = _get_selectedRouteId__wxrdoo(this);
        var tmp_2 = _get_selectedDirection__xfe4dp(this);
        var routeStops = getRouteStops(tmp_1, tmp_2, 'RouteDetailsViewModel.routeStopIds', null, null, null, $composer_0, 384, 56);
        var globalData = getGlobalData('RouteDetailsViewModel', null, null, null, $composer_0, 6, 14);
        var tmp_3 = [_get_selectedRouteId__wxrdoo(this), _get_selectedDirection__xfe4dp(this), routeStops, globalData];
        sourceInformationMarkerStart($composer_0, 69420979, 'CC(remember):RouteDetailsViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = !!(!!($composer_0.q6w(this) | $composer_0.q6w(globalData)) | $composer_0.q6w(routeStops));
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_4;
        if (invalid || it_0 === Companion_getInstance().x6p_1) {
          var value_0 = RouteDetailsViewModel$runLogic$slambda_0(this, globalData, routeStops, stopList$delegate, null);
          $composer_0.h6y(value_0);
          tmp_4 = value_0;
        } else {
          tmp_4 = it_0;
        }
        var tmp_5 = tmp_4;
        var tmp2_group = (tmp_5 == null ? true : !(tmp_5 == null)) ? tmp_5 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(tmp_3, tmp2_group, $composer_0, 0);
        var tmp0 = runLogic$lambda(stopList$delegate);
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return tmp0;
      }
      oay() {
        return this.iah();
      }
      ibw(routeId, direction) {
        _set_selectedRouteId__mu1664(this, routeId);
        _set_selectedDirection__fvx1b3(this, direction);
      }
    }
    initMetadataForClass($, 'RouteDetailsViewModel', RouteDetailsViewModel, VOID, [MoleculeViewModel(), IRouteDetailsViewModel()]);
    RouteDetailsViewModelClass = $;
  }
  return RouteDetailsViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_RouteDetailsViewModel$stable = 8;
//endregion
//region block: exports
export {
  IRouteDetailsViewModel as IRouteDetailsViewModel333orcxbmvnvy,
  RouteDetailsViewModel as RouteDetailsViewModel1is9wcy27mzd0,
};
//endregion

//# sourceMappingURL=RouteDetailsViewModel.mjs.map
