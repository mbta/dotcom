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
import { IPredictionsRepository2ydt6pa8vjrl3 as IPredictionsRepository } from '../../repositories/PredictionsRepository.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { timer1vca8rhu6yjny as timer } from '../../utils/Timer.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  DisposableEffect1u8qk60b90gi3 as DisposableEffect,
  LaunchedEffect1xc4bdzax6uqz as LaunchedEffect,
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
import { orEmpty2aq3yu4qeqrer as orEmpty } from '../../model/response/PredictionsByStopJoinResponse.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function subscribeToPredictions(stopIds, active, errorKey, onAnyMessageReceived, errorBannerRepository, predictionsRepository, checkPredictionsStaleInterval, $composer, $changed, $default) {
  var onAnyMessageReceived_0 = {_v: onAnyMessageReceived};
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var predictionsRepository_0 = {_v: predictionsRepository};
  var checkPredictionsStaleInterval_0 = checkPredictionsStaleInterval;
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -2103813175, 'C(subscribeToPredictions)P(6!1,3,4,2,5,1:kotlin.time.Duration)26@1146L2,27@1207L12,28@1273L12,32@1456L36,34@1549L33,35@1623L33,89@3600L270,89@3566L304,100@3904L16,100@3876L44,101@3952L16,101@3925L43,103@3997L274,103@3974L297:subscribeToPredictions.kt#8u5po0');
  if (!(($default & 8) === 0)) {
    sourceInformationMarkerStart($composer_0, 1165140331, 'CC(remember):subscribeToPredictions.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    var it = $composer_0.g6y();
    var tmp;
    if (false || it === Companion_getInstance().x6p_1) {
      var value = subscribeToPredictions$lambda_4;
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
  if (!(($default & 16) === 0)) {
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
  if (!(($default & 32) === 0)) {
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
      var value_1 = scope_0.o7z(getKClass(IPredictionsRepository()), qualifier_0);
      $composer_2.h6y(value_1);
      tmp_3 = value_1;
    } else {
      tmp_3 = it_1;
    }
    var tmp_4 = tmp_3;
    var tmp1_group_0 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    predictionsRepository_0._v = tmp1_group_0;
  }
  if (!(($default & 64) === 0)) {
    // Inline function 'kotlin.time.Companion.seconds' call
    Companion_getInstance_0();
    checkPredictionsStaleInterval_0 = toDuration(5, DurationUnit_SECONDS_getInstance());
  }
  if (isTraceInProgress()) {
    traceEventStart(-2103813175, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.subscribeToPredictions (subscribeToPredictions.kt:30)');
  }
  var errorKey_0 = errorKey + '.subscribeToPredictions';
  var tmp_5 = checkPredictionsStaleInterval_0;
  var staleTimer$delegate = timer(tmp_5, null, $composer_0, 14 & $changed >> 18, 2);
  sourceInformationMarkerStart($composer_0, 1165153258, 'CC(remember):subscribeToPredictions.kt#9igjgp');
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
  sourceInformationMarkerStart($composer_0, 1165155626, 'CC(remember):subscribeToPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_3 = $composer_0.g6y();
  var tmp_8;
  if (false || it_3 === Companion_getInstance().x6p_1) {
    var value_3 = mutableStateOf(null);
    $composer_0.h6y(value_3);
    tmp_8 = value_3;
  } else {
    tmp_8 = it_3;
  }
  var tmp_9 = tmp_8;
  var tmp3_group = (tmp_9 == null ? true : !(tmp_9 == null)) ? tmp_9 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var loadedStopIds$delegate = tmp3_group;
  sourceInformationMarkerStart($composer_0, 1165219127, 'CC(remember):subscribeToPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_1 = !!(!!(!!(!!(!!((($changed & 458752 ^ 196608) > 131072 && $composer_0.q6w(predictionsRepository_0._v) || ($changed & 196608) === 131072) | $composer_0.q6w(stopIds)) | (($changed & 112 ^ 48) > 32 && $composer_0.r6w(active) || ($changed & 48) === 32)) | (($changed & 7168 ^ 3072) > 2048 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 3072) === 2048)) | $composer_0.q6w(errorBannerRepository_0._v)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_4 = $composer_0.g6y();
  var tmp_10;
  if (invalid_1 || it_4 === Companion_getInstance().x6p_1) {
    var value_4 = subscribeToPredictions$lambda_5(stopIds, active, onAnyMessageReceived_0, errorBannerRepository_0, errorKey_0, loadedStopIds$delegate, predictions$delegate, predictionsRepository_0);
    $composer_0.h6y(value_4);
    tmp_10 = value_4;
  } else {
    tmp_10 = it_4;
  }
  var tmp_11 = tmp_10;
  var tmp4_group = (tmp_11 == null ? true : !(tmp_11 == null)) ? tmp_11 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  DisposableEffect(stopIds, active, tmp4_group, $composer_0, 14 & $changed | 112 & $changed);
  var tmp_12 = subscribeToPredictions$lambda_0(predictions$delegate);
  sourceInformationMarkerStart($composer_0, 1165228601, 'CC(remember):subscribeToPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_2 = !!(!!(!!(!!(!!((($changed & 458752 ^ 196608) > 131072 && $composer_0.q6w(predictionsRepository_0._v) || ($changed & 196608) === 131072) | $composer_0.q6w(errorBannerRepository_0._v)) | $composer_0.q6w(stopIds)) | (($changed & 112 ^ 48) > 32 && $composer_0.r6w(active) || ($changed & 48) === 32)) | (($changed & 7168 ^ 3072) > 2048 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 3072) === 2048)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_5 = $composer_0.g6y();
  var tmp_13;
  if (invalid_2 || it_5 === Companion_getInstance().x6p_1) {
    var value_5 = subscribeToPredictions$slambda_0(predictionsRepository_0, errorBannerRepository_0, predictions$delegate, stopIds, active, onAnyMessageReceived_0, errorKey_0, loadedStopIds$delegate, null);
    $composer_0.h6y(value_5);
    tmp_13 = value_5;
  } else {
    tmp_13 = it_5;
  }
  var tmp_14 = tmp_13;
  var tmp5_group = (tmp_14 == null ? true : !(tmp_14 == null)) ? tmp_14 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_12, tmp5_group, $composer_0, 0);
  var tmp_15 = subscribeToPredictions$lambda(staleTimer$delegate);
  sourceInformationMarkerStart($composer_0, 1165230137, 'CC(remember):subscribeToPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_3 = !!(!!(!!(!!(!!((($changed & 458752 ^ 196608) > 131072 && $composer_0.q6w(predictionsRepository_0._v) || ($changed & 196608) === 131072) | $composer_0.q6w(errorBannerRepository_0._v)) | $composer_0.q6w(stopIds)) | (($changed & 112 ^ 48) > 32 && $composer_0.r6w(active) || ($changed & 48) === 32)) | (($changed & 7168 ^ 3072) > 2048 && $composer_0.s6m(onAnyMessageReceived_0._v) || ($changed & 3072) === 2048)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_6 = $composer_0.g6y();
  var tmp_16;
  if (invalid_3 || it_6 === Companion_getInstance().x6p_1) {
    var value_6 = subscribeToPredictions$slambda_2(predictionsRepository_0, errorBannerRepository_0, predictions$delegate, stopIds, active, onAnyMessageReceived_0, errorKey_0, loadedStopIds$delegate, null);
    $composer_0.h6y(value_6);
    tmp_16 = value_6;
  } else {
    tmp_16 = it_6;
  }
  var tmp_17 = tmp_16;
  var tmp6_group = (tmp_17 == null ? true : !(tmp_17 == null)) ? tmp_17 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_15, tmp6_group, $composer_0, 0);
  sourceInformationMarkerStart($composer_0, 1165231835, 'CC(remember):subscribeToPredictions.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_4 = !!((($changed & 112 ^ 48) > 32 && $composer_0.r6w(active) || ($changed & 48) === 32) | (($changed & 458752 ^ 196608) > 131072 && $composer_0.q6w(predictionsRepository_0._v) || ($changed & 196608) === 131072));
  // Inline function 'kotlin.let' call
  var it_7 = $composer_0.g6y();
  var tmp_18;
  if (invalid_4 || it_7 === Companion_getInstance().x6p_1) {
    var value_7 = subscribeToPredictions$slambda_4(active, predictionsRepository_0, predictions$delegate, null);
    $composer_0.h6y(value_7);
    tmp_18 = value_7;
  } else {
    tmp_18 = it_7;
  }
  var tmp_19 = tmp_18;
  var tmp7_group = (tmp_19 == null ? true : !(tmp_19 == null)) ? tmp_19 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(active, tmp7_group, $composer_0, 14 & $changed >> 3);
  var tmp0_safe_receiver = subscribeToPredictions$lambda_0(predictions$delegate);
  var tmp1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m9o();
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp1;
}
function subscribeToPredictions$lambda($staleTimer$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('staleTimer', KProperty0(), false);
  return $staleTimer$delegate.v1();
}
function subscribeToPredictions$lambda_0($predictions$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('predictions', KMutableProperty0(), true);
  return $predictions$delegate.v1();
}
function subscribeToPredictions$lambda_1($predictions$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('predictions', KMutableProperty0(), true);
  $predictions$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function subscribeToPredictions$lambda_2($loadedStopIds$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('loadedStopIds', KMutableProperty0(), true);
  return $loadedStopIds$delegate.v1();
}
function subscribeToPredictions$lambda_3($loadedStopIds$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('loadedStopIds', KMutableProperty0(), true);
  $loadedStopIds$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function subscribeToPredictions$connect(predictionsRepository, stopIds, active, onJoin, onMessage) {
  predictionsRepository._v.z9s();
  if (!(stopIds == null) && active) {
    predictionsRepository._v.s9y(stopIds, onJoin, onMessage);
  }
}
function subscribeToPredictions$onMessage(onAnyMessageReceived, errorBannerRepository, errorKey, predictions$delegate, message) {
  onAnyMessageReceived._v();
  if (message instanceof Ok()) {
    errorBannerRepository._v.v9t(errorKey);
    subscribeToPredictions$lambda_1(predictions$delegate, orEmpty(subscribeToPredictions$lambda_0(predictions$delegate)).h9o(message.f9n_1));
  } else {
    if (message instanceof Error_0()) {
      println('Predictions stream failed on message: ' + message.i9n_1);
    } else {
      noWhenBranchMatchedException();
    }
  }
}
function subscribeToPredictions$onJoin(onAnyMessageReceived, errorBannerRepository, errorKey, $stopIds, loadedStopIds$delegate, predictions$delegate, $active, predictionsRepository, message) {
  onAnyMessageReceived._v();
  if (message instanceof Ok()) {
    errorBannerRepository._v.v9t(errorKey);
    subscribeToPredictions$lambda_3(loadedStopIds$delegate, $stopIds);
    subscribeToPredictions$lambda_1(predictions$delegate, message.f9n_1);
  } else {
    if (message instanceof Error_0()) {
      var tmp = errorBannerRepository._v;
      var tmp_0 = message.toString();
      tmp.u9t(errorKey, tmp_0, subscribeToPredictions$onJoin$lambda($stopIds, $active, onAnyMessageReceived, errorBannerRepository, errorKey, predictions$delegate, predictionsRepository, loadedStopIds$delegate));
      println('Predictions stream failed to join: ' + message.i9n_1);
    } else {
      noWhenBranchMatchedException();
    }
  }
}
function subscribeToPredictions$checkStale(predictionsRepository, errorBannerRepository, predictions$delegate, $stopIds, $active, onAnyMessageReceived, errorKey, loadedStopIds$delegate) {
  var lastUpdated = predictionsRepository._v.t9y();
  if (!(lastUpdated == null)) {
    var tmp = errorBannerRepository._v;
    var tmp0_safe_receiver = subscribeToPredictions$lambda_0(predictions$delegate);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n9o();
    var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    tmp.t9t(lastUpdated, tmp_0, subscribeToPredictions$checkStale$lambda($stopIds, $active, onAnyMessageReceived, errorBannerRepository, errorKey, loadedStopIds$delegate, predictions$delegate, predictionsRepository));
  }
}
function subscribeToPredictions$lambda_4() {
  return Unit_instance;
}
function subscribeToPredictions$onJoin$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository) {
  var l = function (p0) {
    subscribeToPredictions$onJoin($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onJoin';
  return l;
}
function subscribeToPredictions$onMessage$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate) {
  var l = function (p0) {
    subscribeToPredictions$onMessage($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, p0);
    return Unit_instance;
  };
  l.callableName = 'onMessage';
  return l;
}
var _no_name_provided__qut3ivClass;
function _no_name_provided__qut3iv() {
  if (_no_name_provided__qut3ivClass === VOID) {
    class $ {
      constructor($predictionsRepository, $stopIds, $loadedStopIds$delegate, $predictions$delegate) {
        this.xbo_1 = $predictionsRepository;
        this.ybo_1 = $stopIds;
        this.zbo_1 = $loadedStopIds$delegate;
        this.abp_1 = $predictions$delegate;
      }
      z24() {
        this.xbo_1._v.z9s();
        if (!equals(subscribeToPredictions$lambda_2(this.zbo_1), this.ybo_1)) {
          subscribeToPredictions$lambda_1(this.abp_1, null);
          subscribeToPredictions$lambda_3(this.zbo_1, null);
        }
      }
    }
    initMetadataForClass($);
    _no_name_provided__qut3ivClass = $;
  }
  return _no_name_provided__qut3ivClass;
}
function subscribeToPredictions$lambda_5($stopIds, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $loadedStopIds$delegate, $predictions$delegate, $predictionsRepository) {
  return function ($this$DisposableEffect) {
    var tmp = subscribeToPredictions$onJoin$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository);
    subscribeToPredictions$connect($predictionsRepository, $stopIds, $active, tmp, subscribeToPredictions$onMessage$ref($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate));
    // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
    return new (_no_name_provided__qut3iv())($predictionsRepository, $stopIds, $loadedStopIds$delegate, $predictions$delegate);
  };
}
var subscribeToPredictions$slambdaClass;
function subscribeToPredictions$slambda() {
  if (subscribeToPredictions$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.jbp_1 = $predictionsRepository;
        $box.kbp_1 = $errorBannerRepository;
        $box.lbp_1 = $predictions$delegate;
        $box.mbp_1 = $stopIds;
        $box.nbp_1 = $active;
        $box.obp_1 = $onAnyMessageReceived;
        $box.pbp_1 = $errorKey;
        $box.qbp_1 = $loadedStopIds$delegate;
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
              subscribeToPredictions$checkStale(this.jbp_1, this.kbp_1, this.lbp_1, this.mbp_1, this.nbp_1, this.obp_1, this.pbp_1, this.qbp_1);
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
        var i = new (subscribeToPredictions$slambda())(this.jbp_1, this.kbp_1, this.lbp_1, this.mbp_1, this.nbp_1, this.obp_1, this.pbp_1, this.qbp_1, completion);
        i.rbp_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToPredictions$slambdaClass = $;
  }
  return subscribeToPredictions$slambdaClass;
}
function subscribeToPredictions$slambda_0($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation) {
  var i = new (subscribeToPredictions$slambda())($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var subscribeToPredictions$slambdaClass_0;
function subscribeToPredictions$slambda_1() {
  if (subscribeToPredictions$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.abq_1 = $predictionsRepository;
        $box.bbq_1 = $errorBannerRepository;
        $box.cbq_1 = $predictions$delegate;
        $box.dbq_1 = $stopIds;
        $box.ebq_1 = $active;
        $box.fbq_1 = $onAnyMessageReceived;
        $box.gbq_1 = $errorKey;
        $box.hbq_1 = $loadedStopIds$delegate;
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
              subscribeToPredictions$checkStale(this.abq_1, this.bbq_1, this.cbq_1, this.dbq_1, this.ebq_1, this.fbq_1, this.gbq_1, this.hbq_1);
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
        var i = new (subscribeToPredictions$slambda_1())(this.abq_1, this.bbq_1, this.cbq_1, this.dbq_1, this.ebq_1, this.fbq_1, this.gbq_1, this.hbq_1, completion);
        i.ibq_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToPredictions$slambdaClass_0 = $;
  }
  return subscribeToPredictions$slambdaClass_0;
}
function subscribeToPredictions$slambda_2($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation) {
  var i = new (subscribeToPredictions$slambda_1())($predictionsRepository, $errorBannerRepository, $predictions$delegate, $stopIds, $active, $onAnyMessageReceived, $errorKey, $loadedStopIds$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var subscribeToPredictions$slambdaClass_1;
function subscribeToPredictions$slambda_3() {
  if (subscribeToPredictions$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($active, $predictionsRepository, $predictions$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.rbq_1 = $active;
        $box.sbq_1 = $predictionsRepository;
        $box.tbq_1 = $predictions$delegate;
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
              if (this.rbq_1 && !(subscribeToPredictions$lambda_0(this.tbq_1) == null)) {
                var tmp_1 = this.sbq_1._v;
                var tmp0_safe_receiver = subscribeToPredictions$lambda_0(this.tbq_1);
                var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.n9o();
                tmp_0 = tmp_1.u9y(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                subscribeToPredictions$lambda_1(this.tbq_1, null);
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
        var i = new (subscribeToPredictions$slambda_3())(this.rbq_1, this.sbq_1, this.tbq_1, completion);
        i.ubq_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToPredictions$slambdaClass_1 = $;
  }
  return subscribeToPredictions$slambdaClass_1;
}
function subscribeToPredictions$slambda_4($active, $predictionsRepository, $predictions$delegate, resultContinuation) {
  var i = new (subscribeToPredictions$slambda_3())($active, $predictionsRepository, $predictions$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function subscribeToPredictions$onJoin$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository) {
  var l = function (p0) {
    subscribeToPredictions$onJoin($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onJoin';
  return l;
}
function subscribeToPredictions$onMessage$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate) {
  var l = function (p0) {
    subscribeToPredictions$onMessage($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, p0);
    return Unit_instance;
  };
  l.callableName = 'onMessage';
  return l;
}
function subscribeToPredictions$onJoin$lambda($stopIds, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, $predictionsRepository, $loadedStopIds$delegate) {
  return function () {
    var tmp = subscribeToPredictions$onJoin$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository);
    subscribeToPredictions$connect($predictionsRepository, $stopIds, $active, tmp, subscribeToPredictions$onMessage$ref_0($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate));
    return Unit_instance;
  };
}
function subscribeToPredictions$onJoin$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository) {
  var l = function (p0) {
    subscribeToPredictions$onJoin($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository, p0);
    return Unit_instance;
  };
  l.callableName = 'onJoin';
  return l;
}
function subscribeToPredictions$onMessage$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate) {
  var l = function (p0) {
    subscribeToPredictions$onMessage($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate, p0);
    return Unit_instance;
  };
  l.callableName = 'onMessage';
  return l;
}
function subscribeToPredictions$checkStale$lambda($stopIds, $active, $onAnyMessageReceived, $errorBannerRepository, $errorKey, $loadedStopIds$delegate, $predictions$delegate, $predictionsRepository) {
  return function () {
    var tmp = subscribeToPredictions$onJoin$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $stopIds, $loadedStopIds$delegate, $predictions$delegate, $active, $predictionsRepository);
    subscribeToPredictions$connect($predictionsRepository, $stopIds, $active, tmp, subscribeToPredictions$onMessage$ref_1($onAnyMessageReceived, $errorBannerRepository, $errorKey, $predictions$delegate));
    return Unit_instance;
  };
}
//region block: exports
export {
  subscribeToPredictions as subscribeToPredictions3atf8sgo0r5kw,
};
//endregion

//# sourceMappingURL=subscribeToPredictions.mjs.map
