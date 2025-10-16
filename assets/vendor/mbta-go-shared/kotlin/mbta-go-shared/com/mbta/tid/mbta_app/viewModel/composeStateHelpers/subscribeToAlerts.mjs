import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import { AlertsUsecase1smuzc4kgc05w as AlertsUsecase } from '../../usecases/AlertsUsecase.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { DisposableEffect23vkjo4ftehz4 as DisposableEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope_0,
} from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { println2shhhgwwt4c61 as println } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/io/console.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../../model/response/ApiResult.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function subscribeToAlerts(alertsUsecase, ioDispatcher, $composer, $changed, $default) {
  var alertsUsecase_0 = {_v: alertsUsecase};
  var ioDispatcher_0 = {_v: ioDispatcher};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -609256561, 'C(subscribeToAlerts)19@770L12,20@824L42,22@917L60,37@1334L115,37@1304L145:subscribeToAlerts.kt#8u5po0');
  if (!(($default & 1) === 0)) {
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
      var value = scope.o7z(getKClass(AlertsUsecase()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    alertsUsecase_0._v = tmp1_group;
  }
  if (!(($default & 2) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier_0 = named('coroutineDispatcherIO');
    var scope_0 = null;
    var $composer_2 = $composer_0;
    $composer_2.d6w(-1168520582);
    if (!((2 & 1) === 0))
      qualifier_0 = null;
    if (!((2 & 2) === 0))
      scope_0 = currentKoinScope($composer_2, 0);
    $composer_2.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid_0 = !!($composer_2.s6m(qualifier_0) | $composer_2.s6m(scope_0));
    // Inline function 'kotlin.let' call
    var it_0 = $composer_2.g6y();
    var tmp_1;
    if (invalid_0 || it_0 === Companion_getInstance().x6p_1) {
      var value_0 = scope_0.o7z(getKClass(CoroutineDispatcher()), qualifier_0);
      $composer_2.h6y(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    ioDispatcher_0._v = tmp1_group_0;
  }
  if (isTraceInProgress()) {
    traceEventStart(-609256561, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.subscribeToAlerts (subscribeToAlerts.kt:21)');
  }
  sourceInformationMarkerStart($composer_0, -1379995573, 'CC(remember):subscribeToAlerts.kt#9igjgp');
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
  var alerts$delegate = tmp1_group_1;
  sourceInformationMarkerStart($composer_0, -1379982174, 'CC(remember):subscribeToAlerts.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_1 = !!($composer_0.q6w(ioDispatcher_0._v) | $composer_0.q6w(alertsUsecase_0._v));
  // Inline function 'kotlin.let' call
  var it_2 = $composer_0.g6y();
  var tmp_5;
  if (invalid_1 || it_2 === Companion_getInstance().x6p_1) {
    var value_2 = subscribeToAlerts$lambda_1(ioDispatcher_0, alertsUsecase_0, alerts$delegate);
    $composer_0.h6y(value_2);
    tmp_5 = value_2;
  } else {
    tmp_5 = it_2;
  }
  var tmp_6 = tmp_5;
  var tmp2_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  DisposableEffect(null, tmp2_group, $composer_0, 6);
  var tmp0 = subscribeToAlerts$lambda(alerts$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function subscribeToAlerts$lambda($alerts$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('alerts', KMutableProperty0(), true);
  return $alerts$delegate.v1();
}
function subscribeToAlerts$lambda_0($alerts$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('alerts', KMutableProperty0(), true);
  $alerts$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function subscribeToAlerts$connect(alertsUsecase, alerts$delegate) {
  var tmp = alertsUsecase._v;
  tmp.y9s(subscribeToAlerts$connect$lambda(alerts$delegate));
}
var subscribeToAlerts$lambda$slambdaClass;
function subscribeToAlerts$lambda$slambda() {
  if (subscribeToAlerts$lambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($alertsUsecase, $alerts$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.tbo_1 = $alertsUsecase;
        $box.ubo_1 = $alerts$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
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
              subscribeToAlerts$connect(this.tbo_1, this.ubo_1);
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
      y3e($this$launch, completion) {
        var i = new (subscribeToAlerts$lambda$slambda())(this.tbo_1, this.ubo_1, completion);
        i.vbo_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    subscribeToAlerts$lambda$slambdaClass = $;
  }
  return subscribeToAlerts$lambda$slambdaClass;
}
function subscribeToAlerts$lambda$slambda_0($alertsUsecase, $alerts$delegate, resultContinuation) {
  var i = new (subscribeToAlerts$lambda$slambda())($alertsUsecase, $alerts$delegate, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var _no_name_provided__qut3ivClass;
function _no_name_provided__qut3iv() {
  if (_no_name_provided__qut3ivClass === VOID) {
    class $ {
      constructor($alertsUsecase) {
        this.wbo_1 = $alertsUsecase;
      }
      z24() {
        this.wbo_1._v.z9s();
      }
    }
    initMetadataForClass($);
    _no_name_provided__qut3ivClass = $;
  }
  return _no_name_provided__qut3ivClass;
}
function subscribeToAlerts$lambda_1($ioDispatcher, $alertsUsecase, $alerts$delegate) {
  return function ($this$DisposableEffect) {
    var tmp = CoroutineScope_0($ioDispatcher._v);
    launch(tmp, VOID, VOID, subscribeToAlerts$lambda$slambda_0($alertsUsecase, $alerts$delegate, null));
    // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
    return new (_no_name_provided__qut3iv())($alertsUsecase);
  };
}
function subscribeToAlerts$connect$lambda($alerts$delegate) {
  return function (it) {
    var tmp;
    if (it instanceof Ok()) {
      subscribeToAlerts$lambda_0($alerts$delegate, it.f9n_1);
      tmp = Unit_instance;
    } else {
      if (it instanceof Error_0()) {
        println('subscribeToAlerts got error: ' + it.toString());
        tmp = Unit_instance;
      } else {
        noWhenBranchMatchedException();
      }
    }
    return Unit_instance;
  };
}
//region block: exports
export {
  subscribeToAlerts as subscribeToAlertsesw9dx7e1azo,
};
//endregion

//# sourceMappingURL=subscribeToAlerts.mjs.map
