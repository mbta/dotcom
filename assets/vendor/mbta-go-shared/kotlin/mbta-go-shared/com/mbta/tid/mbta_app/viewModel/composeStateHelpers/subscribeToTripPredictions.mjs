import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../../repositories/ErrorBannerStateRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { ITripPredictionsRepository2u5evlejn4wwm as ITripPredictionsRepository } from '../../repositories/TripPredictionsRepository.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { timer1vca8rhu6yjny as timer } from '../../utils/Timer.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  LaunchedEffect1xc4bdzax6uqz as LaunchedEffect,
  DisposableEffect1u8qk60b90gi3 as DisposableEffect,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import {
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty025txtn5b59pq1 as KMutableProperty0,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../../model/response/ApiResult.mjs';
import { Context_TripDetails_getInstance19hv695l9zume as Context_TripDetails_getInstance } from '../TripDetailsViewModel.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function subscribeToTripPredictions(tripId, errorKey, active, context, onAnyMessageReceived, errorBannerRepository, tripPredictionsRepository, checkPredictionsStaleInterval, $composer, $changed, $default) {
  var onAnyMessageReceived_0 = {_v: onAnyMessageReceived};
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var tripPredictionsRepository_0 = {_v: tripPredictionsRepository};
  var checkPredictionsStaleInterval_0 = checkPredictionsStaleInterval;
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1869578202, 'C(subscribeToTripPredictions)P(6,4!1,2,5,3,7,1:kotlin.time.Duration)25@1048L2,26@1109L12,27@1183L12,31@1370L36,33@1463L33,76@3100L22,76@3077L45,77@3160L113,77@3127L146,82@3307L16,82@3279L44,83@3355L16,83@3328L43,85@3400L278,85@3377L301:subscribeToTripPredictions.kt#8u5po0');
  if (!(($default & 16) === 0)) {
    sourceInformationMarkerStart($composer_0, -1368315992, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    var it = $composer_0.g6y();
    var tmp;
    if (false || it === Companion_getInstance().x6p_1) {
      var value = subscribeToTripPredictions$lambda_2;
      $composer_0.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    sourceInformationMarkerEnd($composer_0);
    onAnyMessageReceived_0._v = tmp0_group;
  }
  if (!(($default & 32) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier = null;
    var scope = null;
    var $composer_1 = $composer_0;
    $composer_1.d6w(-1168520582);
    if (!((3 & 1) === 0))
      qualifier = null;
    if (!((3 & 2) === 0))
      scope = currentKoinScope($composer_1, 0);
    $composer_1.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!($composer_1.s6m(qualifier) | $composer_1.s6m(scope));
    // Inline function 'kotlin.let' call
    var it_0 = $composer_1.g6y();
    var tmp_1;
    if (invalid || it_0 === Companion_getInstance().x6p_1) {
      var value_0 = scope.o7z(getKClass(IErrorBannerStateRepository()), qualifier);
      $composer_1.h6y(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    errorBannerRepository_0._v = tmp1_group;
  }
  if (!(($default & 64) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier_0 = null;
    var scope_0 = null;
    var $composer_2 = $composer_0;
    $composer_2.d6w(-1168520582);
    if (!((3 & 1) === 0))
      qualifier_0 = null;
    if (!((3 & 2) === 0))
      scope_0 = currentKoinScope($composer_2, 0);
    $composer_2.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid_0 = !!($composer_2.s6m(qualifier_0) | $composer_2.s6m(scope_0));
    // Inline function 'kotlin.let' call
    var it_1 = $composer_2.g6y();
    var tmp_3;
    if (invalid_0 || it_1 === Companion_getInstance().x6p_1) {
      var value_1 = scope_0.o7z(getKClass(ITripPredictionsRepository()), qualifier_0);
      $composer_2.h6y(value_1);
      tmp_3 = value_1;
    } else {
      tmp_3 = it_1;
    }
    var tmp_4 = tmp_3;
    var tmp1_group_0 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    tripPredictionsRepository_0._v = tmp1_group_0;
  }
  if (!(($default & 128) === 0)) {
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance_0();
    checkPredictionsStaleInterval_0 = toDuration(5, DurationUnit_SECONDS_getInstance());
  }
  if (isTraceInProgress()) {
    traceEventStart(-1869578202, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.subscribeToTripPredictions (subscribeToTripPredictions.kt:29)');
  }
  var errorKey_0 = errorKey + '.subscribeToTripPredictions';
  var tmp_5 = checkPredictionsStaleInterval_0;
  var staleTimer$delegate = timer(tmp_5, null, $composer_0, 14 & $changed >> 21, 2);
  sourceInformationMarkerStart($composer_0, -1368302681, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_2 = $composer_0.g6y();
  var tmp_6;
  if (false || it_2 === Companion_getInstance().x6p_1) {
    var value_2 = mutableStateOf(null);
    $composer_0.h6y(value_2);
    tmp_6 = value_2;
  } else {
    tmp_6 = it_2;
  }
  var tmp_7 = tmp_6;
  var tmp2_group = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var predictions$delegate = tmp2_group;
  sourceInformationMarkerStart($composer_0, -1368250308, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_3 = $composer_0.g6y();
  var tmp_8;
  if (false || it_3 === Companion_getInstance().x6p_1) {
    var value_3 = subscribeToTripPredictions$slambda_0(predictions$delegate, null);
    $composer_0.h6y(value_3);
    tmp_8 = value_3;
  } else {
    tmp_8 = it_3;
  }
  var tmp_9 = tmp_8;
  var tmp3_group = (tmp_9 == null ? true : !(tmp_9 == null)) ? tmp_9 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tripId, tmp3_group, $composer_0, 14 & $changed);
  sourceInformationMarkerStart($composer_0, -1368248297, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_1 = !!(!!(!!(!!(!!((($changed & 3670016 ^ 1572864) > 1048576 && $composer_0.q6w(tripPredictionsRepository_0._v) || ($changed & 1572864) === 1048576) | (($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripId) || ($changed & 6) === 4)) | (($changed & 896 ^ 384) > 256 && $composer_0.r6w(active) || ($changed & 384) === 256)) | (($changed & 57344 ^ 24576) > 16384 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 24576) === 16384)) | $composer_0.q6w(errorBannerRepository_0._v)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_4 = $composer_0.g6y();
  var tmp_10;
  if (invalid_1 || it_4 === Companion_getInstance().x6p_1) {
    var value_4 = subscribeToTripPredictions$lambda_3(tripId, active, onAnyMessageReceived_0, errorBannerRepository_0, errorKey_0, predictions$delegate, tripPredictionsRepository_0);
    $composer_0.h6y(value_4);
    tmp_10 = value_4;
  } else {
    tmp_10 = it_4;
  }
  var tmp_11 = tmp_10;
  var tmp4_group = (tmp_11 == null ? true : !(tmp_11 == null)) ? tmp_11 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  DisposableEffect(tripId, active, tmp4_group, $composer_0, 14 & $changed | 112 & $changed >> 3);
  var tmp_12 = subscribeToTripPredictions$lambda_0(predictions$delegate);
  sourceInformationMarkerStart($composer_0, -1368243690, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  var tmp_13;
  var tmp_14;
  if (($changed & 7168 ^ 3072) > 2048) {
    var tmp_15 = $composer_0;
    tmp_14 = tmp_15.s6w(context == null ? -1 : context.x3_1);
  } else {
    tmp_14 = false;
  }
  if (tmp_14) {
    tmp_13 = true;
  } else {
    tmp_13 = ($changed & 3072) === 2048;
  }
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_2 = !!(!!(!!(!!(!!(!!(tmp_13 | (($changed & 3670016 ^ 1572864) > 1048576 && $composer_0.q6w(tripPredictionsRepository_0._v) || ($changed & 1572864) === 1048576)) | $composer_0.q6w(errorBannerRepository_0._v)) | (($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripId) || ($changed & 6) === 4)) | (($changed & 896 ^ 384) > 256 && $composer_0.r6w(active) || ($changed & 384) === 256)) | (($changed & 57344 ^ 24576) > 16384 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 24576) === 16384)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_5 = $composer_0.g6y();
  var tmp_16;
  if (invalid_2 || it_5 === Companion_getInstance().x6p_1) {
    var value_5 = subscribeToTripPredictions$slambda_2(context, tripPredictionsRepository_0, errorBannerRepository_0, predictions$delegate, tripId, active, onAnyMessageReceived_0, errorKey_0, null);
    $composer_0.h6y(value_5);
    tmp_16 = value_5;
  } else {
    tmp_16 = it_5;
  }
  var tmp_17 = tmp_16;
  var tmp5_group = (tmp_17 == null ? true : !(tmp_17 == null)) ? tmp_17 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_12, tmp5_group, $composer_0, 0);
  var tmp_18 = subscribeToTripPredictions$lambda(staleTimer$delegate);
  sourceInformationMarkerStart($composer_0, -1368242154, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  var tmp_19;
  var tmp_20;
  if (($changed & 7168 ^ 3072) > 2048) {
    var tmp_21 = $composer_0;
    tmp_20 = tmp_21.s6w(context == null ? -1 : context.x3_1);
  } else {
    tmp_20 = false;
  }
  if (tmp_20) {
    tmp_19 = true;
  } else {
    tmp_19 = ($changed & 3072) === 2048;
  }
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_3 = !!(!!(!!(!!(!!(!!(tmp_19 | (($changed & 3670016 ^ 1572864) > 1048576 && $composer_0.q6w(tripPredictionsRepository_0._v) || ($changed & 1572864) === 1048576)) | $composer_0.q6w(errorBannerRepository_0._v)) | (($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripId) || ($changed & 6) === 4)) | (($changed & 896 ^ 384) > 256 && $composer_0.r6w(active) || ($changed & 384) === 256)) | (($changed & 57344 ^ 24576) > 16384 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 24576) === 16384)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_6 = $composer_0.g6y();
  var tmp_22;
  if (invalid_3 || it_6 === Companion_getInstance().x6p_1) {
    var value_6 = subscribeToTripPredictions$slambda_4(context, tripPredictionsRepository_0, errorBannerRepository_0, predictions$delegate, tripId, active, onAnyMessageReceived_0, errorKey_0, null);
    $composer_0.h6y(value_6);
    tmp_22 = value_6;
  } else {
    tmp_22 = it_6;
  }
  var tmp_23 = tmp_22;
  var tmp6_group = (tmp_23 == null ? true : !(tmp_23 == null)) ? tmp_23 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_18, tmp6_group, $composer_0, 0);
  sourceInformationMarkerStart($composer_0, -1368240452, 'CC(remember):subscribeToTripPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_4 = !!((($changed & 896 ^ 384) > 256 && $composer_0.r6w(active) || ($changed & 384) === 256) | (($changed & 3670016 ^ 1572864) > 1048576 && $composer_0.q6w(tripPredictionsRepository_0._v) || ($changed & 1572864) === 1048576));
  // Inline function 'kotlin.let' call
  var it_7 = $composer_0.g6y();
  var tmp_24;
  if (invalid_4 || it_7 === Companion_getInstance().x6p_1) {
    var value_7 = subscribeToTripPredictions$slambda_6(active, tripPredictionsRepository_0, predictions$delegate, null);
    $composer_0.h6y(value_7);
    tmp_24 = value_7;
  } else {
    tmp_24 = it_7;
  }
  var tmp_25 = tmp_24;
  var tmp7_group = (tmp_25 == null ? true : !(tmp_25 == null)) ? tmp_25 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(active, tmp7_group, $composer_0, 14 & $changed >> 6);
  var tmp1 = subscribeToTripPredictions$lambda_0(predictions$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp1;
}
function subscribeToTripPredictions$lambda($staleTimer$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('staleTimer', KProperty0(), false);
  return $staleTimer$delegate.v1();
}
function subscribeToTripPredictions$lambda_0($predictions$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('predictions', KMutableProperty0(), true);
  return $predictions$delegate.v1();
}
function subscribeToTripPredictions$lambda_1($predictions$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('predictions', KMutableProperty0(), true);
  $predictions$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function subscribeToTripPredictions$connect(tripPredictionsRepository, tripId, active, onReceive) {
  tripPredictionsRepository._v.z9s();
  if (!(tripId == null) && active) {
    tripPredictionsRepository._v.qa3(tripId, onReceive);
  }
}
function subscribeToTripPredictions$onReceive(onAnyMessageReceived, errorBannerRepository, errorKey, predictions$delegate, $tripId, $active, tripPredictionsRepository, message) {
  onAnyMessageReceived._v();
  if (message instanceof Ok()) {
    errorBannerRepository._v.v9t(errorKey);
    subscribeToTripPredictions$lambda_1(predictions$delegate, message.f9n_1);
  } else {
    if (message instanceof Error_0()) {
      var tmp = errorBannerRepository._v;
      var tmp_0 = message.toString();
      tmp.u9t(errorKey, tmp_0, subscribeToTripPredictions$onReceive$lambda($tripId, $active, onAnyMessageReceived, errorBannerRepository, errorKey, tripPredictionsRepository, predictions$delegate));
      println('Trip predictions stream failed to join: ' + message.i9n_1);
    } else {
      noWhenBranchMatchedException();
    }
  }
}
function subscribeToTripPredictions$checkStale($context, tripPredictionsRepository, errorBannerRepository, predictions$delegate, $tripId, $active, onAnyMessageReceived, errorKey) {
  if (!equals($context, Context_TripDetails_getInstance()))
    return Unit_instance;
  var lastUpdated = tripPredictionsRepository._v.t9y();
  if (!(lastUpdated == null)) {
    var tmp = errorBannerRepository._v;
    var tmp0_safe_receiver = subscribeToTripPredictions$lambda_0(predictions$delegate);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n9o();
    var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    tmp.t9t(lastUpdated, tmp_0, subscribeToTripPredictions$checkStale$lambda($tripId, $active, onAnyMessageReceived, errorBannerRepository, errorKey, predictions$delegate, tripPredictionsRepository));
  }
}
function subscribeToTripPredictions$lambda_2() {
  return Unit_instance;
}
var subscribeToTripPredictions$slambdaClass;
function subscribeToTripPredictions$slambda() {
  if (subscribeToTripPredictions$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($predictions$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.dbr_1 = $predictions$delegate;
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
              subscribeToTripPredictions$lambda_1(this.dbr_1, null);
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
        var i = new (subscribeToTripPredictions$slambda())(this.dbr_1, completion);
        i.ebr_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToTripPredictions$slambdaClass = $;
  }
  return subscribeToTripPredictions$slambdaClass;
}
function subscribeToTripPredictions$slambda_0($predictions$delegate, resultContinuation) {
  var i = new (subscribeToTripPredictions$slambda())($predictions$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function subscribeToTripPredictions$onReceive$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository) {
  var l = function (p0) {
    subscribeToTripPredictions$onReceive($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onReceive';
  return l;
}
var _no_name_provided__qut3ivClass;
function _no_name_provided__qut3iv() {
  if (_no_name_provided__qut3ivClass === VOID) {
    class $ {
      constructor($tripPredictionsRepository) {
        this.fbr_1 = $tripPredictionsRepository;
      }
      z24() {
        this.fbr_1._v.z9s();
      }
    }
    initMetadataForClass($);
    _no_name_provided__qut3ivClass = $;
  }
  return _no_name_provided__qut3ivClass;
}
function subscribeToTripPredictions$lambda_3($tripId, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripPredictionsRepository) {
  return function ($this$DisposableEffect) {
    subscribeToTripPredictions$connect($tripPredictionsRepository, $tripId, $active, subscribeToTripPredictions$onReceive$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository));
    // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
    return new (_no_name_provided__qut3iv())($tripPredictionsRepository);
  };
}
var subscribeToTripPredictions$slambdaClass_0;
function subscribeToTripPredictions$slambda_1() {
  if (subscribeToTripPredictions$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.obr_1 = $context;
        $box.pbr_1 = $tripPredictionsRepository;
        $box.qbr_1 = $errorBannerRepository;
        $box.rbr_1 = $predictions$delegate;
        $box.sbr_1 = $tripId;
        $box.tbr_1 = $active;
        $box.ubr_1 = $onAnyMessageReceived;
        $box.vbr_1 = $errorKey;
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
              subscribeToTripPredictions$checkStale(this.obr_1, this.pbr_1, this.qbr_1, this.rbr_1, this.sbr_1, this.tbr_1, this.ubr_1, this.vbr_1);
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
        var i = new (subscribeToTripPredictions$slambda_1())(this.obr_1, this.pbr_1, this.qbr_1, this.rbr_1, this.sbr_1, this.tbr_1, this.ubr_1, this.vbr_1, completion);
        i.wbr_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToTripPredictions$slambdaClass_0 = $;
  }
  return subscribeToTripPredictions$slambdaClass_0;
}
function subscribeToTripPredictions$slambda_2($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation) {
  var i = new (subscribeToTripPredictions$slambda_1())($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var subscribeToTripPredictions$slambdaClass_1;
function subscribeToTripPredictions$slambda_3() {
  if (subscribeToTripPredictions$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.fbs_1 = $context;
        $box.gbs_1 = $tripPredictionsRepository;
        $box.hbs_1 = $errorBannerRepository;
        $box.ibs_1 = $predictions$delegate;
        $box.jbs_1 = $tripId;
        $box.kbs_1 = $active;
        $box.lbs_1 = $onAnyMessageReceived;
        $box.mbs_1 = $errorKey;
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
              subscribeToTripPredictions$checkStale(this.fbs_1, this.gbs_1, this.hbs_1, this.ibs_1, this.jbs_1, this.kbs_1, this.lbs_1, this.mbs_1);
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
        var i = new (subscribeToTripPredictions$slambda_3())(this.fbs_1, this.gbs_1, this.hbs_1, this.ibs_1, this.jbs_1, this.kbs_1, this.lbs_1, this.mbs_1, completion);
        i.nbs_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToTripPredictions$slambdaClass_1 = $;
  }
  return subscribeToTripPredictions$slambdaClass_1;
}
function subscribeToTripPredictions$slambda_4($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation) {
  var i = new (subscribeToTripPredictions$slambda_3())($context, $tripPredictionsRepository, $errorBannerRepository, $predictions$delegate, $tripId, $active, $onAnyMessageReceived, $errorKey, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var subscribeToTripPredictions$slambdaClass_2;
function subscribeToTripPredictions$slambda_5() {
  if (subscribeToTripPredictions$slambdaClass_2 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($active, $tripPredictionsRepository, $predictions$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.wbs_1 = $active;
        $box.xbs_1 = $tripPredictionsRepository;
        $box.ybs_1 = $predictions$delegate;
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
              var tmp_0;
              if (this.wbs_1 && !(subscribeToTripPredictions$lambda_0(this.ybs_1) == null)) {
                var tmp_1 = this.xbs_1._v;
                var tmp0_safe_receiver = subscribeToTripPredictions$lambda_0(this.ybs_1);
                var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n9o();
                tmp_0 = tmp_1.u9y(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                subscribeToTripPredictions$lambda_1(this.ybs_1, null);
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (subscribeToTripPredictions$slambda_5())(this.wbs_1, this.xbs_1, this.ybs_1, completion);
        i.zbs_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToTripPredictions$slambdaClass_2 = $;
  }
  return subscribeToTripPredictions$slambdaClass_2;
}
function subscribeToTripPredictions$slambda_6($active, $tripPredictionsRepository, $predictions$delegate, resultContinuation) {
  var i = new (subscribeToTripPredictions$slambda_5())($active, $tripPredictionsRepository, $predictions$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function subscribeToTripPredictions$onReceive$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository) {
  var l = function (p0) {
    subscribeToTripPredictions$onReceive($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onReceive';
  return l;
}
function subscribeToTripPredictions$onReceive$lambda($tripId, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $tripPredictionsRepository, $predictions$delegate) {
  return function () {
    subscribeToTripPredictions$connect($tripPredictionsRepository, $tripId, $active, subscribeToTripPredictions$onReceive$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository));
    return Unit_instance;
  };
}
function subscribeToTripPredictions$onReceive$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository) {
  var l = function (p0) {
    subscribeToTripPredictions$onReceive($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onReceive';
  return l;
}
function subscribeToTripPredictions$checkStale$lambda($tripId, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripPredictionsRepository) {
  return function () {
    subscribeToTripPredictions$connect($tripPredictionsRepository, $tripId, $active, subscribeToTripPredictions$onReceive$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $tripId, $active, $tripPredictionsRepository));
    return Unit_instance;
  };
}
//region block: exports
export {
  subscribeToTripPredictions as subscribeToTripPredictionsnebox8kjnx4y,
};
//endregion

//# sourceMappingURL=subscribeToTripPredictions.mjs.map
