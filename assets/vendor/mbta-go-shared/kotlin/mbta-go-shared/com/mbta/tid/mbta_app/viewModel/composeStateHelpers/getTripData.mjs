import {
  CoroutineScopelux7s7zphw7e as CoroutineScope,
  CoroutineScopefcb5f5dwqcas as CoroutineScope_0,
} from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../../repositories/ErrorBannerStateRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { ITripPredictionsRepository2u5evlejn4wwm as ITripPredictionsRepository } from '../../repositories/TripPredictionsRepository.mjs';
import { ITripRepositoryrl4c5in4vd4b as ITripRepository } from '../../repositories/TripRepository.mjs';
import { IVehicleRepository1sea31hkzb8vh as IVehicleRepository } from '../../repositories/VehicleRepository.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { _Duration___init__impl__kdtzql7iqlnkubkgor as _Duration___init__impl__kdtzql } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { subscribeToTripPredictionsnebox8kjnx4y as subscribeToTripPredictions } from './subscribeToTripPredictions.mjs';
import { subscribeToVehicle1wv4cob69tz6m as subscribeToVehicle } from './subscribeToVehicle.mjs';
import {
  LaunchedEffect1xc4bdzax6uqz as LaunchedEffect,
  LaunchedEffect3nylcp830dck0 as LaunchedEffect_0,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { TripResponsecwc650hu1vcv as TripResponse } from '../../model/response/TripResponse.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { fetchApiwttxxko4paj1 as fetchApi } from './fetchApi.mjs';
import { TripSchedulesResponse2psx5op7t9p57 as TripSchedulesResponse } from '../../model/response/TripSchedulesResponse.mjs';
import { TripData1ibdueofpgzgt as TripData } from '../../model/stopDetailsPage/TripData.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function fetchTrip(tripId, params, updateTrip) {
  var tmp = CoroutineScope(params.ubj_1);
  launch(tmp, VOID, VOID, fetchTrip$slambda_0(params, tripId, updateTrip, null));
}
function fetchTripSchedules(tripId, params, updateTripSchedules) {
  var tmp = CoroutineScope(params.ubj_1);
  launch(tmp, VOID, VOID, fetchTripSchedules$slambda_0(params, updateTripSchedules, tripId, null));
}
var FetchParamsClass;
function FetchParams() {
  if (FetchParamsClass === VOID) {
    class $ {
      constructor(errorKey, coroutineDispatcher, errorBannerRepository, tripRepository) {
        this.tbj_1 = errorKey;
        this.ubj_1 = coroutineDispatcher;
        this.vbj_1 = errorBannerRepository;
        this.wbj_1 = tripRepository;
      }
      toString() {
        return 'FetchParams(errorKey=' + this.tbj_1 + ', coroutineDispatcher=' + this.ubj_1.toString() + ', errorBannerRepository=' + toString(this.vbj_1) + ', tripRepository=' + toString(this.wbj_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.tbj_1);
        result = imul(result, 31) + hashCode(this.ubj_1) | 0;
        result = imul(result, 31) + hashCode(this.vbj_1) | 0;
        result = imul(result, 31) + hashCode(this.wbj_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof FetchParams()))
          return false;
        var tmp0_other_with_cast = other instanceof FetchParams() ? other : THROW_CCE();
        if (!(this.tbj_1 === tmp0_other_with_cast.tbj_1))
          return false;
        if (!equals(this.ubj_1, tmp0_other_with_cast.ubj_1))
          return false;
        if (!equals(this.vbj_1, tmp0_other_with_cast.vbj_1))
          return false;
        if (!equals(this.wbj_1, tmp0_other_with_cast.wbj_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'FetchParams');
    FetchParamsClass = $;
  }
  return FetchParamsClass;
}
function getTripData(tripFilter, active, context, onPredictionMessageReceived, errorKey, coroutineDispatcher, errorBannerRepository, tripPredictionsRepository, tripRepository, vehicleRepository, $composer, $changed, $default) {
  var errorBannerRepository_0 = errorBannerRepository;
  var tripPredictionsRepository_0 = tripPredictionsRepository;
  var tripRepository_0 = tripRepository;
  var vehicleRepository_0 = vehicleRepository;
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -400339403, 'C(getTripData)P(6!2,5,4)67@2720L12,68@2794L12,69@2846L12,70@2904L12,74@3000L33,75@3083L33,76@3176L33,77@3239L33,79@3303L33,82@3363L184,94@3710L247,105@3981L172,113@4194L14,113@4159L49,114@4248L259,114@4213L294,124@4566L342,124@4513L395:getTripData.kt#8u5po0');
  if (!(($default & 64) === 0)) {
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
    var it = $composer_1.g6y();
    var tmp;
    if (invalid || it === Companion_getInstance().x6p_1) {
      var value = scope.o7z(getKClass(IErrorBannerStateRepository()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    errorBannerRepository_0 = tmp1_group;
  }
  if (!(($default & 128) === 0)) {
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
    var it_0 = $composer_2.g6y();
    var tmp_1;
    if (invalid_0 || it_0 === Companion_getInstance().x6p_1) {
      var value_0 = scope_0.o7z(getKClass(ITripPredictionsRepository()), qualifier_0);
      $composer_2.h6y(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    tripPredictionsRepository_0 = tmp1_group_0;
  }
  if (!(($default & 256) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier_1 = null;
    var scope_1 = null;
    var $composer_3 = $composer_0;
    $composer_3.d6w(-1168520582);
    if (!((3 & 1) === 0))
      qualifier_1 = null;
    if (!((3 & 2) === 0))
      scope_1 = currentKoinScope($composer_3, 0);
    $composer_3.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid_1 = !!($composer_3.s6m(qualifier_1) | $composer_3.s6m(scope_1));
    // Inline function 'kotlin.let' call
    var it_1 = $composer_3.g6y();
    var tmp_3;
    if (invalid_1 || it_1 === Companion_getInstance().x6p_1) {
      var value_1 = scope_1.o7z(getKClass(ITripRepository()), qualifier_1);
      $composer_3.h6y(value_1);
      tmp_3 = value_1;
    } else {
      tmp_3 = it_1;
    }
    var tmp_4 = tmp_3;
    var tmp1_group_1 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
    $composer_3.f6w();
    $composer_3.f6w();
    tripRepository_0 = tmp1_group_1;
  }
  if (!(($default & 512) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier_2 = null;
    var scope_2 = null;
    var $composer_4 = $composer_0;
    $composer_4.d6w(-1168520582);
    if (!((3 & 1) === 0))
      qualifier_2 = null;
    if (!((3 & 2) === 0))
      scope_2 = currentKoinScope($composer_4, 0);
    $composer_4.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid_2 = !!($composer_4.s6m(qualifier_2) | $composer_4.s6m(scope_2));
    // Inline function 'kotlin.let' call
    var it_2 = $composer_4.g6y();
    var tmp_5;
    if (invalid_2 || it_2 === Companion_getInstance().x6p_1) {
      var value_2 = scope_2.o7z(getKClass(IVehicleRepository()), qualifier_2);
      $composer_4.h6y(value_2);
      tmp_5 = value_2;
    } else {
      tmp_5 = it_2;
    }
    var tmp_6 = tmp_5;
    var tmp1_group_2 = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
    $composer_4.f6w();
    $composer_4.f6w();
    vehicleRepository_0 = tmp1_group_2;
  }
  if (isTraceInProgress()) {
    traceEventStart(-400339403, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.getTripData (getTripData.kt:71)');
  }
  var errorKey_0 = errorKey + '.getTripData';
  sourceInformationMarkerStart($composer_0, 1820909366, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_3 = $composer_0.g6y();
  var tmp_7;
  if (false || it_3 === Companion_getInstance().x6p_1) {
    var value_3 = mutableStateOf(null);
    $composer_0.h6y(value_3);
    tmp_7 = value_3;
  } else {
    tmp_7 = it_3;
  }
  var tmp_8 = tmp_7;
  var tmp1_group_3 = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var trip$delegate = tmp1_group_3;
  sourceInformationMarkerStart($composer_0, 1820912022, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_4 = $composer_0.g6y();
  var tmp_9;
  if (false || it_4 === Companion_getInstance().x6p_1) {
    var value_4 = mutableStateOf(null);
    $composer_0.h6y(value_4);
    tmp_9 = value_4;
  } else {
    tmp_9 = it_4;
  }
  var tmp_10 = tmp_9;
  var tmp2_group = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var tripSchedules$delegate = tmp2_group;
  sourceInformationMarkerStart($composer_0, 1820914998, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_5 = $composer_0.g6y();
  var tmp_11;
  if (false || it_5 === Companion_getInstance().x6p_1) {
    var value_5 = mutableStateOf(null);
    $composer_0.h6y(value_5);
    tmp_11 = value_5;
  } else {
    tmp_11 = it_5;
  }
  var tmp_12 = tmp_11;
  var tmp3_group = (tmp_12 == null ? true : !(tmp_12 == null)) ? tmp_12 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var tripPredictions$delegate = tmp3_group;
  sourceInformationMarkerStart($composer_0, 1820917014, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_6 = $composer_0.g6y();
  var tmp_13;
  if (false || it_6 === Companion_getInstance().x6p_1) {
    var value_6 = mutableStateOf(null);
    $composer_0.h6y(value_6);
    tmp_13 = value_6;
  } else {
    tmp_13 = it_6;
  }
  var tmp_14 = tmp_13;
  var tmp4_group = (tmp_14 == null ? true : !(tmp_14 == null)) ? tmp_14 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var vehicle$delegate = tmp4_group;
  sourceInformationMarkerStart($composer_0, 1820919062, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_7 = $composer_0.g6y();
  var tmp_15;
  if (false || it_7 === Companion_getInstance().x6p_1) {
    var value_7 = mutableStateOf(null);
    $composer_0.h6y(value_7);
    tmp_15 = value_7;
  } else {
    tmp_15 = it_7;
  }
  var tmp_16 = tmp_15;
  var tmp5_group = (tmp_16 == null ? true : !(tmp_16 == null)) ? tmp_16 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var result$delegate = tmp5_group;
  sourceInformationMarkerStart($composer_0, 1820921133, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_3 = !!(!!(!!($composer_0.s6m(errorKey_0) | $composer_0.s6m(coroutineDispatcher)) | $composer_0.s6m(errorBannerRepository_0)) | (($changed & 234881024 ^ 100663296) > 67108864 && $composer_0.s6m(tripRepository_0) || ($changed & 100663296) === 67108864));
  // Inline function 'kotlin.let' call
  var it_8 = $composer_0.g6y();
  var tmp_17;
  if (invalid_3 || it_8 === Companion_getInstance().x6p_1) {
    var value_8 = new (FetchParams())(errorKey_0, coroutineDispatcher, errorBannerRepository_0, tripRepository_0);
    $composer_0.h6y(value_8);
    tmp_17 = value_8;
  } else {
    tmp_17 = it_8;
  }
  var tmp_18 = tmp_17;
  var tmp6_group = (tmp_18 == null ? true : !(tmp_18 == null)) ? tmp_18 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var params = tmp6_group;
  var tmp_19 = tripFilter == null ? null : tripFilter.y9g_1;
  var tmp_20 = errorBannerRepository_0;
  var tmp_21 = tripPredictionsRepository_0;
  getTripData$lambda_4(tripPredictions$delegate, subscribeToTripPredictions(tmp_19, errorKey_0, active, context, onPredictionMessageReceived, tmp_20, tmp_21, _Duration___init__impl__kdtzql(new (Long())(0, 0)), $composer_0, 896 & $changed << 3 | 7168 & $changed << 3 | 57344 & $changed << 3 | 458752 & $changed >> 3 | 3670016 & $changed >> 3, 128));
  getTripData$lambda_6(vehicle$delegate, subscribeToVehicle(tripFilter == null ? null : tripFilter.z9g_1, active, errorKey_0, errorBannerRepository_0, vehicleRepository_0, $composer_0, 112 & $changed | 7168 & $changed >> 9 | 57344 & $changed >> 15, 0));
  var tmp_22 = tripFilter == null ? null : tripFilter.c9h_1;
  sourceInformationMarkerStart($composer_0, 1820947555, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_9 = $composer_0.g6y();
  var tmp_23;
  if (false || it_9 === Companion_getInstance().x6p_1) {
    var value_9 = getTripData$slambda_0(trip$delegate, tripSchedules$delegate, tripPredictions$delegate, vehicle$delegate, null);
    $composer_0.h6y(value_9);
    tmp_23 = value_9;
  } else {
    tmp_23 = it_9;
  }
  var tmp_24 = tmp_23;
  var tmp7_group = (tmp_24 == null ? true : !(tmp_24 == null)) ? tmp_24 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_22, tmp7_group, $composer_0, 0);
  var tmp_25 = tripFilter == null ? null : tripFilter.y9g_1;
  sourceInformationMarkerStart($composer_0, 1820949528, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_4 = !!((($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripFilter) || ($changed & 6) === 4) | $composer_0.q6w(params));
  // Inline function 'kotlin.let' call
  var it_10 = $composer_0.g6y();
  var tmp_26;
  if (invalid_4 || it_10 === Companion_getInstance().x6p_1) {
    var value_10 = getTripData$slambda_2(tripFilter, params, trip$delegate, tripSchedules$delegate, tripPredictions$delegate, vehicle$delegate, null);
    $composer_0.h6y(value_10);
    tmp_26 = value_10;
  } else {
    tmp_26 = it_10;
  }
  var tmp_27 = tmp_26;
  var tmp8_group = (tmp_27 == null ? true : !(tmp_27 == null)) ? tmp_27 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(tmp_25, tmp8_group, $composer_0, 0);
  var tmp_28 = getTripData$lambda(trip$delegate);
  var tmp_29 = getTripData$lambda_1(tripSchedules$delegate);
  var tmp_30 = getTripData$lambda_3(tripPredictions$delegate);
  sourceInformationMarkerStart($composer_0, 1820959787, 'CC(remember):getTripData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_5 = ($changed & 14 ^ 6) > 4 && $composer_0.s6m(tripFilter) || ($changed & 6) === 4;
  // Inline function 'kotlin.let' call
  var it_11 = $composer_0.g6y();
  var tmp_31;
  if (invalid_5 || it_11 === Companion_getInstance().x6p_1) {
    var value_11 = getTripData$slambda_4(tripFilter, trip$delegate, tripSchedules$delegate, tripPredictions$delegate, vehicle$delegate, result$delegate, null);
    $composer_0.h6y(value_11);
    tmp_31 = value_11;
  } else {
    tmp_31 = it_11;
  }
  var tmp_32 = tmp_31;
  var tmp9_group = (tmp_32 == null ? true : !(tmp_32 == null)) ? tmp_32 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect_0(tmp_28, tmp_29, tmp_30, tmp9_group, $composer_0, 0);
  var tmp0 = getTripData$lambda_7(result$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function getTripData$lambda($trip$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('trip', KMutableProperty0(), true);
  return $trip$delegate.v1();
}
function getTripData$lambda_0($trip$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('trip', KMutableProperty0(), true);
  $trip$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getTripData$lambda_1($tripSchedules$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('tripSchedules', KMutableProperty0(), true);
  return $tripSchedules$delegate.v1();
}
function getTripData$lambda_2($tripSchedules$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('tripSchedules', KMutableProperty0(), true);
  $tripSchedules$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getTripData$lambda_3($tripPredictions$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('tripPredictions', KMutableProperty0(), true);
  return $tripPredictions$delegate.v1();
}
function getTripData$lambda_4($tripPredictions$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('tripPredictions', KMutableProperty0(), true);
  $tripPredictions$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getTripData$lambda_5($vehicle$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('vehicle', KMutableProperty0(), true);
  return $vehicle$delegate.v1();
}
function getTripData$lambda_6($vehicle$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('vehicle', KMutableProperty0(), true);
  $vehicle$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getTripData$lambda_7($result$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('result', KMutableProperty0(), true);
  return $result$delegate.v1();
}
function getTripData$lambda_8($result$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('result', KMutableProperty0(), true);
  $result$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getTripData$clearAll(trip$delegate, tripSchedules$delegate, tripPredictions$delegate, vehicle$delegate) {
  getTripData$lambda_0(trip$delegate, null);
  getTripData$lambda_2(tripSchedules$delegate, null);
  getTripData$lambda_4(tripPredictions$delegate, null);
  getTripData$lambda_6(vehicle$delegate, null);
}
var fetchTrip$slambda$slambdaClass;
function fetchTrip$slambda$slambda() {
  if (fetchTrip$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($params, $tripId, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.fbk_1 = $params;
        $box.gbk_1 = $tripId;
        super(resultContinuation, $box);
      }
      hbk($completion) {
        var tmp = this.mbe($completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.hbk($completion);
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
                suspendResult = this.fbk_1.wbj_1.va3(this.gbk_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return suspendResult;
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
      mbe(completion) {
        return new (fetchTrip$slambda$slambda())(this.fbk_1, this.gbk_1, completion);
      }
    }
    initMetadataForLambda($, VOID, VOID, [0]);
    fetchTrip$slambda$slambdaClass = $;
  }
  return fetchTrip$slambda$slambdaClass;
}
function fetchTrip$slambda$slambda_0($params, $tripId, resultContinuation) {
  var i = new (fetchTrip$slambda$slambda())($params, $tripId, resultContinuation);
  var l = function ($completion) {
    return i.hbk($completion);
  };
  l.$arity = 0;
  return l;
}
var fetchTrip$slambda$slambdaClass_0;
function fetchTrip$slambda$slambda_1() {
  if (fetchTrip$slambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($updateTrip, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.qbk_1 = $updateTrip;
        super(resultContinuation, $box);
      }
      sbk(it, $completion) {
        var tmp = this.tbk(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.sbk(p1 instanceof TripResponse() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.qbk_1(this.rbk_1.k9p_1);
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
      tbk(it, completion) {
        var i = new (fetchTrip$slambda$slambda_1())(this.qbk_1, completion);
        i.rbk_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchTrip$slambda$slambdaClass_0 = $;
  }
  return fetchTrip$slambda$slambdaClass_0;
}
function fetchTrip$slambda$slambda_2($updateTrip, resultContinuation) {
  var i = new (fetchTrip$slambda$slambda_1())($updateTrip, resultContinuation);
  var l = function (it, $completion) {
    return i.sbk(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function fetchTrip$slambda$lambda($tripId, $params, $updateTrip) {
  return function () {
    fetchTrip($tripId, $params, $updateTrip);
    return Unit_instance;
  };
}
var fetchTrip$slambdaClass;
function fetchTrip$slambda() {
  if (fetchTrip$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($params, $tripId, $updateTrip, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.cbl_1 = $params;
        $box.dbl_1 = $tripId;
        $box.ebl_1 = $updateTrip;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope_0()) : false) ? p1 : THROW_CCE(), $completion);
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
                var tmp_0 = this.cbl_1.tbj_1 + '.fetchTrip';
                var tmp_1 = fetchTrip$slambda$slambda_0(this.cbl_1, this.dbl_1, null);
                var tmp_2 = fetchTrip$slambda$slambda_2(this.ebl_1, null);
                suspendResult = fetchApi(this.cbl_1.vbj_1, tmp_0, tmp_1, tmp_2, fetchTrip$slambda$lambda(this.dbl_1, this.cbl_1, this.ebl_1), this);
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
      y3e($this$launch, completion) {
        var i = new (fetchTrip$slambda())(this.cbl_1, this.dbl_1, this.ebl_1, completion);
        i.fbl_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchTrip$slambdaClass = $;
  }
  return fetchTrip$slambdaClass;
}
function fetchTrip$slambda_0($params, $tripId, $updateTrip, resultContinuation) {
  var i = new (fetchTrip$slambda())($params, $tripId, $updateTrip, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var fetchTripSchedules$slambda$slambdaClass;
function fetchTripSchedules$slambda$slambda() {
  if (fetchTripSchedules$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($params, $tripId, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.obl_1 = $params;
        $box.pbl_1 = $tripId;
        super(resultContinuation, $box);
      }
      qbl($completion) {
        var tmp = this.mbe($completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.qbl($completion);
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
                suspendResult = this.obl_1.wbj_1.ua3(this.pbl_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return suspendResult;
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
      mbe(completion) {
        return new (fetchTripSchedules$slambda$slambda())(this.obl_1, this.pbl_1, completion);
      }
    }
    initMetadataForLambda($, VOID, VOID, [0]);
    fetchTripSchedules$slambda$slambdaClass = $;
  }
  return fetchTripSchedules$slambda$slambdaClass;
}
function fetchTripSchedules$slambda$slambda_0($params, $tripId, resultContinuation) {
  var i = new (fetchTripSchedules$slambda$slambda())($params, $tripId, resultContinuation);
  var l = function ($completion) {
    return i.qbl($completion);
  };
  l.$arity = 0;
  return l;
}
var fetchTripSchedules$slambda$suspendConversion0$refClass;
function fetchTripSchedules$slambda$suspendConversion0$ref() {
  if (fetchTripSchedules$slambda$suspendConversion0$refClass === VOID) {
    class $ {
      constructor(p0) {
        this.rbl_1 = p0;
      }
      sbl($callee, $completion) {
        this.rbl_1($callee);
        return Unit_instance;
      }
      ne(p1, $completion) {
        return this.sbl(p1 instanceof TripSchedulesResponse() ? p1 : THROW_CCE(), $completion);
      }
    }
    initMetadataForFunctionReference($, VOID, VOID, [1]);
    fetchTripSchedules$slambda$suspendConversion0$refClass = $;
  }
  return fetchTripSchedules$slambda$suspendConversion0$refClass;
}
function fetchTripSchedules$slambda$suspendConversion0$ref_0(p0) {
  var i = new (fetchTripSchedules$slambda$suspendConversion0$ref())(p0);
  var l = function ($callee, $completion) {
    return i.sbl($callee, $completion);
  };
  l.$arity = 1;
  return l;
}
function fetchTripSchedules$slambda$lambda($tripId, $params, $updateTripSchedules) {
  return function () {
    fetchTripSchedules($tripId, $params, $updateTripSchedules);
    return Unit_instance;
  };
}
var fetchTripSchedules$slambdaClass;
function fetchTripSchedules$slambda() {
  if (fetchTripSchedules$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($params, $updateTripSchedules, $tripId, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.bbm_1 = $params;
        $box.cbm_1 = $updateTripSchedules;
        $box.dbm_1 = $tripId;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope_0()) : false) ? p1 : THROW_CCE(), $completion);
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
                var tmp_0 = this.bbm_1.tbj_1 + '.fetchTripSchedules';
                var tmp_1 = fetchTripSchedules$slambda$slambda_0(this.bbm_1, this.dbm_1, null);
                var tmp_2 = fetchTripSchedules$slambda$suspendConversion0$ref_0(this.cbm_1);
                suspendResult = fetchApi(this.bbm_1.vbj_1, tmp_0, tmp_1, tmp_2, fetchTripSchedules$slambda$lambda(this.dbm_1, this.bbm_1, this.cbm_1), this);
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
      y3e($this$launch, completion) {
        var i = new (fetchTripSchedules$slambda())(this.bbm_1, this.cbm_1, this.dbm_1, completion);
        i.ebm_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchTripSchedules$slambdaClass = $;
  }
  return fetchTripSchedules$slambdaClass;
}
function fetchTripSchedules$slambda_0($params, $updateTripSchedules, $tripId, resultContinuation) {
  var i = new (fetchTripSchedules$slambda())($params, $updateTripSchedules, $tripId, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var getTripData$slambdaClass;
function getTripData$slambda() {
  if (getTripData$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.nbm_1 = $trip$delegate;
        $box.obm_1 = $tripSchedules$delegate;
        $box.pbm_1 = $tripPredictions$delegate;
        $box.qbm_1 = $vehicle$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope_0()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              getTripData$clearAll(this.nbm_1, this.obm_1, this.pbm_1, this.qbm_1);
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
        var i = new (getTripData$slambda())(this.nbm_1, this.obm_1, this.pbm_1, this.qbm_1, completion);
        i.rbm_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getTripData$slambdaClass = $;
  }
  return getTripData$slambdaClass;
}
function getTripData$slambda_0($trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation) {
  var i = new (getTripData$slambda())($trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
function getTripData$slambda$lambda($trip$delegate) {
  return function (it) {
    getTripData$lambda_0($trip$delegate, it);
    return Unit_instance;
  };
}
function getTripData$slambda$lambda_0($tripSchedules$delegate) {
  return function (it) {
    getTripData$lambda_2($tripSchedules$delegate, it);
    return Unit_instance;
  };
}
var getTripData$slambdaClass_0;
function getTripData$slambda_1() {
  if (getTripData$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($tripFilter, $params, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.abn_1 = $tripFilter;
        $box.bbn_1 = $params;
        $box.cbn_1 = $trip$delegate;
        $box.dbn_1 = $tripSchedules$delegate;
        $box.ebn_1 = $tripPredictions$delegate;
        $box.fbn_1 = $vehicle$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope_0()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              getTripData$clearAll(this.cbn_1, this.dbn_1, this.ebn_1, this.fbn_1);
              var tmp0_safe_receiver = this.abn_1;
              var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y9g_1;
              if (tmp1_safe_receiver == null)
                null;
              else {
                var params = this.bbn_1;
                fetchTrip(tmp1_safe_receiver, params, getTripData$slambda$lambda(this.cbn_1));
                fetchTripSchedules(tmp1_safe_receiver, params, getTripData$slambda$lambda_0(this.dbn_1));
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
        var i = new (getTripData$slambda_1())(this.abn_1, this.bbn_1, this.cbn_1, this.dbn_1, this.ebn_1, this.fbn_1, completion);
        i.gbn_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getTripData$slambdaClass_0 = $;
  }
  return getTripData$slambdaClass_0;
}
function getTripData$slambda_2($tripFilter, $params, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation) {
  var i = new (getTripData$slambda_1())($tripFilter, $params, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var getTripData$slambdaClass_1;
function getTripData$slambda_3() {
  if (getTripData$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($tripFilter, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, $result$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.pbn_1 = $tripFilter;
        $box.qbn_1 = $trip$delegate;
        $box.rbn_1 = $tripSchedules$delegate;
        $box.sbn_1 = $tripPredictions$delegate;
        $box.tbn_1 = $vehicle$delegate;
        $box.ubn_1 = $result$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope_0()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var resolvedTrip = getTripData$lambda(this.qbn_1);
              var tmp_0;
              if (!(this.pbn_1 == null) && !(resolvedTrip == null) && resolvedTrip.o8t_1 === this.pbn_1.y9g_1) {
                tmp_0 = new (TripData())(this.pbn_1, resolvedTrip, getTripData$lambda_1(this.rbn_1), getTripData$lambda_3(this.sbn_1), true, getTripData$lambda_5(this.tbn_1));
              } else {
                tmp_0 = null;
              }
              getTripData$lambda_8(this.ubn_1, tmp_0);
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
        var i = new (getTripData$slambda_3())(this.pbn_1, this.qbn_1, this.rbn_1, this.sbn_1, this.tbn_1, this.ubn_1, completion);
        i.vbn_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getTripData$slambdaClass_1 = $;
  }
  return getTripData$slambdaClass_1;
}
function getTripData$slambda_4($tripFilter, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, $result$delegate, resultContinuation) {
  var i = new (getTripData$slambda_3())($tripFilter, $trip$delegate, $tripSchedules$delegate, $tripPredictions$delegate, $vehicle$delegate, $result$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  getTripData as getTripData6lr6pskcl1w5,
};
//endregion

//# sourceMappingURL=getTripData.mjs.map
