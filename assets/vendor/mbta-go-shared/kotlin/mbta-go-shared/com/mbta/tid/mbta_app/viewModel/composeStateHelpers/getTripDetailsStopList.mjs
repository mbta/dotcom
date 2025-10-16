import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { LaunchedEffect1pydbte2iu76e as LaunchedEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Companion_getInstance1tlsnvk3i2534 as Companion_getInstance_0 } from '../../model/TripDetailsStopList.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getTripDetailsStopList(tripFilter, tripData, allAlerts, globalResponse, $composer, $changed) {
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 2071077454, 'C(getTripDetailsStopList)P(3,2)21@892L33,23@995L654,23@931L718:getTripDetailsStopList.kt#8u5po0');
  if (isTraceInProgress()) {
    traceEventStart(2071077454, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.getTripDetailsStopList (getTripDetailsStopList.kt:20)');
  }
  sourceInformationMarkerStart($composer_0, 1735583919, 'CC(remember):getTripDetailsStopList.kt#9igjgp');
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
  var tripDetailsStopList$delegate = tmp1_group;
  sourceInformationMarkerStart($composer_0, 1735587836, 'CC(remember):getTripDetailsStopList.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid = !!(!!(!!((($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripFilter) || ($changed & 6) === 4) | $composer_0.q6w(tripData)) | $composer_0.q6w(globalResponse)) | $composer_0.q6w(allAlerts));
  // Inline function 'kotlin.let' call
  var it_0 = $composer_0.g6y();
  var tmp_1;
  if (invalid || it_0 === Companion_getInstance().x6p_1) {
    var value_0 = getTripDetailsStopList$slambda_0(tripFilter, tripData, globalResponse, allAlerts, tripDetailsStopList$delegate, null);
    $composer_0.h6y(value_0);
    tmp_1 = value_0;
  } else {
    tmp_1 = it_0;
  }
  var tmp_2 = tmp_1;
  var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect([tripFilter, tripData, allAlerts, globalResponse], tmp2_group, $composer_0, 0);
  var tmp0 = getTripDetailsStopList$lambda(tripDetailsStopList$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function getTripDetailsStopList$lambda($tripDetailsStopList$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('tripDetailsStopList', KMutableProperty0(), true);
  return $tripDetailsStopList$delegate.v1();
}
function getTripDetailsStopList$lambda_0($tripDetailsStopList$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('tripDetailsStopList', KMutableProperty0(), true);
  $tripDetailsStopList$delegate.b2r(_set____db54di);
  return Unit_instance;
}
var getTripDetailsStopList$slambdaClass;
function getTripDetailsStopList$slambda() {
  if (getTripDetailsStopList$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($tripFilter, $tripData, $globalResponse, $allAlerts, $tripDetailsStopList$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ebo_1 = $tripFilter;
        $box.fbo_1 = $tripData;
        $box.gbo_1 = $globalResponse;
        $box.hbo_1 = $allAlerts;
        $box.ibo_1 = $tripDetailsStopList$delegate;
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
                if (!(this.ebo_1 == null) && !(this.fbo_1 == null) && this.fbo_1.s9q_1.equals(this.ebo_1) && this.fbo_1.w9q_1 && !(this.gbo_1 == null)) {
                  this.fd_1 = 1;
                  suspendResult = Companion_getInstance_0().b9l(this.fbo_1.t9q_1, this.fbo_1.u9q_1, this.fbo_1.v9q_1, this.fbo_1.x9q_1, this.hbo_1, this.gbo_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  tmp_0.kbo_1 = null;
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.kbo_1 = suspendResult;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                var ARGUMENT = this.kbo_1;
                getTripDetailsStopList$lambda_0(this.ibo_1, ARGUMENT);
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
        var i = new (getTripDetailsStopList$slambda())(this.ebo_1, this.fbo_1, this.gbo_1, this.hbo_1, this.ibo_1, completion);
        i.jbo_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getTripDetailsStopList$slambdaClass = $;
  }
  return getTripDetailsStopList$slambdaClass;
}
function getTripDetailsStopList$slambda_0($tripFilter, $tripData, $globalResponse, $allAlerts, $tripDetailsStopList$delegate, resultContinuation) {
  var i = new (getTripDetailsStopList$slambda())($tripFilter, $tripData, $globalResponse, $allAlerts, $tripDetailsStopList$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  getTripDetailsStopList as getTripDetailsStopList2rzd6of9osv0p,
};
//endregion

//# sourceMappingURL=getTripDetailsStopList.mjs.map
