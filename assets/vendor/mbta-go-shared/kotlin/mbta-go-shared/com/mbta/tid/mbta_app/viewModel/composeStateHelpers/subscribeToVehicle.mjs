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
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IVehicleRepository1sea31hkzb8vh as IVehicleRepository } from '../../repositories/VehicleRepository.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { DisposableEffect1u8qk60b90gi3 as DisposableEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../../model/response/ApiResult.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function subscribeToVehicle(vehicleId, active, errorKey, errorBannerRepository, vehicleRepository, $composer, $changed, $default) {
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var vehicleRepository_0 = {_v: vehicleRepository};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 1258975123, 'C(subscribeToVehicle)P(3!1,2)20@826L12,21@884L12,23@941L33,47@1866L123,47@1830L159:subscribeToVehicle.kt#8u5po0');
  if (!(($default & 8) === 0)) {
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
    errorBannerRepository_0._v = tmp1_group;
  }
  if (!(($default & 16) === 0)) {
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
      var value_0 = scope_0.o7z(getKClass(IVehicleRepository()), qualifier_0);
      $composer_2.h6y(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    vehicleRepository_0._v = tmp1_group_0;
  }
  if (isTraceInProgress()) {
    traceEventStart(1258975123, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.subscribeToVehicle (subscribeToVehicle.kt:22)');
  }
  sourceInformationMarkerStart($composer_0, -1305675148, 'CC(remember):subscribeToVehicle.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_1 = $composer_0.g6y();
  var tmp_3;
  if (false || it_1 === Companion_getInstance().x6p_1) {
    var value_1 = mutableStateOf(null);
    $composer_0.h6y(value_1);
    tmp_3 = value_1;
  } else {
    tmp_3 = it_1;
  }
  var tmp_4 = tmp_3;
  var tmp1_group_1 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var vehicle$delegate = tmp1_group_1;
  var errorKey_0 = errorKey + '.subscribeToVehicle';
  sourceInformationMarkerStart($composer_0, -1305645458, 'CC(remember):subscribeToVehicle.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_1 = !!(!!(!!(!!((($changed & 57344 ^ 24576) > 16384 && $composer_0.q6w(vehicleRepository_0._v) || ($changed & 24576) === 16384) | (($changed & 112 ^ 48) > 32 && $composer_0.r6w(active) || ($changed & 48) === 32)) | (($changed & 14 ^ 6) > 4 && $composer_0.s6m(vehicleId) || ($changed & 6) === 4)) | $composer_0.q6w(errorBannerRepository_0._v)) | $composer_0.s6m(errorKey_0));
  // Inline function 'kotlin.let' call
  var it_2 = $composer_0.g6y();
  var tmp_5;
  if (invalid_1 || it_2 === Companion_getInstance().x6p_1) {
    var value_2 = subscribeToVehicle$lambda_1(vehicleId, vehicle$delegate, errorBannerRepository_0, errorKey_0, vehicleRepository_0, active);
    $composer_0.h6y(value_2);
    tmp_5 = value_2;
  } else {
    tmp_5 = it_2;
  }
  var tmp_6 = tmp_5;
  var tmp2_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  DisposableEffect(vehicleId, active, tmp2_group, $composer_0, 14 & $changed | 112 & $changed);
  var tmp0 = subscribeToVehicle$lambda(vehicle$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function subscribeToVehicle$lambda($vehicle$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('vehicle', KMutableProperty0(), true);
  return $vehicle$delegate.v1();
}
function subscribeToVehicle$lambda_0($vehicle$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('vehicle', KMutableProperty0(), true);
  $vehicle$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function subscribeToVehicle$connect(vehicleRepository, $active, vehicleId, onReceive) {
  vehicleRepository._v.z9s();
  if ($active) {
    if (vehicleId == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      vehicleRepository._v.da5(vehicleId, onReceive);
    }
  }
}
function subscribeToVehicle$onReceive(errorBannerRepository, errorKey, vehicle$delegate, $vehicleId, vehicleRepository, $active, message) {
  if (message instanceof Ok()) {
    errorBannerRepository._v.v9t(errorKey);
    subscribeToVehicle$lambda_0(vehicle$delegate, message.f9n_1.z9p_1);
  } else {
    if (message instanceof Error_0()) {
      var tmp = errorBannerRepository._v;
      var tmp_0 = message.toString();
      tmp.u9t(errorKey, tmp_0, subscribeToVehicle$onReceive$lambda($vehicleId, errorBannerRepository, errorKey, vehicleRepository, $active, vehicle$delegate));
      println('Vehicle stream failed to join: ' + message.i9n_1);
      subscribeToVehicle$lambda_0(vehicle$delegate, null);
    } else {
      noWhenBranchMatchedException();
    }
  }
}
function subscribeToVehicle$onReceive$ref($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active) {
  var l = function (p0) {
    subscribeToVehicle$onReceive($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active, p0);
    return Unit_instance;
  };
  l.callableName = 'onReceive';
  return l;
}
var _no_name_provided__qut3ivClass;
function _no_name_provided__qut3iv() {
  if (_no_name_provided__qut3ivClass === VOID) {
    class $ {
      constructor($vehicleRepository) {
        this.abt_1 = $vehicleRepository;
      }
      z24() {
        this.abt_1._v.z9s();
      }
    }
    initMetadataForClass($);
    _no_name_provided__qut3ivClass = $;
  }
  return _no_name_provided__qut3ivClass;
}
function subscribeToVehicle$lambda_1($vehicleId, $vehicle$delegate, $errorBannerRepository, $errorKey, $vehicleRepository, $active) {
  return function ($this$DisposableEffect) {
    subscribeToVehicle$lambda_0($vehicle$delegate, null);
    subscribeToVehicle$connect($vehicleRepository, $active, $vehicleId, subscribeToVehicle$onReceive$ref($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active));
    // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
    return new (_no_name_provided__qut3iv())($vehicleRepository);
  };
}
function subscribeToVehicle$onReceive$ref_0($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active) {
  var l = function (p0) {
    subscribeToVehicle$onReceive($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active, p0);
    return Unit_instance;
  };
  l.callableName = 'onReceive';
  return l;
}
function subscribeToVehicle$onReceive$lambda($vehicleId, $errorBannerRepository, $errorKey, $vehicleRepository, $active, $vehicle$delegate) {
  return function () {
    subscribeToVehicle$connect($vehicleRepository, $active, $vehicleId, subscribeToVehicle$onReceive$ref_0($errorBannerRepository, $errorKey, $vehicle$delegate, $vehicleId, $vehicleRepository, $active));
    return Unit_instance;
  };
}
//region block: exports
export {
  subscribeToVehicle as subscribeToVehicle1wv4cob69tz6m,
};
//endregion

//# sourceMappingURL=subscribeToVehicle.mjs.map
