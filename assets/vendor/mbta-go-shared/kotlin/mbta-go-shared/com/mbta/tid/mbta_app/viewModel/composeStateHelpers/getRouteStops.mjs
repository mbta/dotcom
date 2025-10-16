import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import {
  IRouteStopsRepository31e6hyms33kh2 as IRouteStopsRepository,
  RouteStopsResult16qz48voa9r8x as RouteStopsResult,
} from '../../repositories/RouteStopsRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../../repositories/ErrorBannerStateRepository.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { LaunchedEffect3knc11esygzlw as LaunchedEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  CoroutineScopelux7s7zphw7e as CoroutineScope,
  CoroutineScopefcb5f5dwqcas as CoroutineScope_0,
} from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { fetchApiwttxxko4paj1 as fetchApi } from './fetchApi.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getRouteStops(routeId, directionId, errorKey, routeStopsRepository, errorBannerRepository, ioDispatcher, $composer, $changed, $default) {
  var routeStopsRepository_0 = {_v: routeStopsRepository};
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var ioDispatcher_0 = {_v: ioDispatcher};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, 1722762930, 'C(getRouteStops)P(4!1,2,5)22@864L12,23@935L12,24@989L42,26@1097L33,41@1683L59,41@1646L96:getRouteStops.kt#8u5po0');
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
      var value = scope.o7z(getKClass(IRouteStopsRepository()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    routeStopsRepository_0._v = tmp1_group;
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
      var value_0 = scope_0.o7z(getKClass(IErrorBannerStateRepository()), qualifier_0);
      $composer_2.h6y(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group_0 = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_2.f6w();
    $composer_2.f6w();
    errorBannerRepository_0._v = tmp1_group_0;
  }
  if (!(($default & 32) === 0)) {
    // Inline function 'org.koin.compose.koinInject' call
    var qualifier_1 = named('coroutineDispatcherIO');
    var scope_1 = null;
    var $composer_3 = $composer_0;
    $composer_3.d6w(-1168520582);
    if (!((2 & 1) === 0))
      qualifier_1 = null;
    if (!((2 & 2) === 0))
      scope_1 = currentKoinScope($composer_3, 0);
    $composer_3.d6w(-1633490746);
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid_1 = !!($composer_3.s6m(qualifier_1) | $composer_3.s6m(scope_1));
    // Inline function 'kotlin.let' call
    var it_1 = $composer_3.g6y();
    var tmp_3;
    if (invalid_1 || it_1 === Companion_getInstance().x6p_1) {
      var value_1 = scope_1.o7z(getKClass(CoroutineDispatcher()), qualifier_1);
      $composer_3.h6y(value_1);
      tmp_3 = value_1;
    } else {
      tmp_3 = it_1;
    }
    var tmp_4 = tmp_3;
    var tmp1_group_1 = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
    $composer_3.f6w();
    $composer_3.f6w();
    ioDispatcher_0._v = tmp1_group_1;
  }
  if (isTraceInProgress()) {
    traceEventStart(1722762930, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.getRouteStops (getRouteStops.kt:25)');
  }
  sourceInformationMarkerStart($composer_0, 2012779283, 'CC(remember):getRouteStops.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  // Inline function 'kotlin.let' call
  var it_2 = $composer_0.g6y();
  var tmp_5;
  if (false || it_2 === Companion_getInstance().x6p_1) {
    var value_2 = mutableStateOf(null);
    $composer_0.h6y(value_2);
    tmp_5 = value_2;
  } else {
    tmp_5 = it_2;
  }
  var tmp_6 = tmp_5;
  var tmp1_group_2 = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  var routeStops$delegate = tmp1_group_2;
  sourceInformationMarkerStart($composer_0, 2012798061, 'CC(remember):getRouteStops.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_2 = !!(!!(!!(!!(!!((($changed & 14 ^ 6) > 4 && $composer_0.s6m(routeId) || ($changed & 6) === 4) | (($changed & 112 ^ 48) > 32 && $composer_0.s6m(directionId) || ($changed & 48) === 32)) | $composer_0.q6w(ioDispatcher_0._v)) | $composer_0.q6w(errorBannerRepository_0._v)) | (($changed & 896 ^ 384) > 256 && $composer_0.s6m(errorKey) || ($changed & 384) === 256)) | (($changed & 7168 ^ 3072) > 2048 && $composer_0.q6w(routeStopsRepository_0._v) || ($changed & 3072) === 2048));
  // Inline function 'kotlin.let' call
  var it_3 = $composer_0.g6y();
  var tmp_7;
  if (invalid_2 || it_3 === Companion_getInstance().x6p_1) {
    var value_3 = getRouteStops$slambda_0(routeStops$delegate, routeId, directionId, ioDispatcher_0, errorBannerRepository_0, errorKey, routeStopsRepository_0, null);
    $composer_0.h6y(value_3);
    tmp_7 = value_3;
  } else {
    tmp_7 = it_3;
  }
  var tmp_8 = tmp_7;
  var tmp2_group = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(routeId, directionId, tmp2_group, $composer_0, 14 & $changed | 112 & $changed);
  var tmp0 = getRouteStops$lambda(routeStops$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function getRouteStops$lambda($routeStops$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('routeStops', KMutableProperty0(), true);
  return $routeStops$delegate.v1();
}
function getRouteStops$lambda_0($routeStops$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('routeStops', KMutableProperty0(), true);
  $routeStops$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function getRouteStops$fetchRouteStops($routeId, $directionId, ioDispatcher, errorBannerRepository, $errorKey, routeStopsRepository, routeStops$delegate) {
  if (!($routeId == null) && !($directionId == null)) {
    var tmp = CoroutineScope(ioDispatcher._v);
    launch(tmp, VOID, VOID, getRouteStops$fetchRouteStops$slambda_0(errorBannerRepository, $errorKey, routeStopsRepository, $routeId, $directionId, routeStops$delegate, ioDispatcher, null));
  }
}
var getRouteStops$slambdaClass;
function getRouteStops$slambda() {
  if (getRouteStops$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeStops$delegate, $routeId, $directionId, $ioDispatcher, $errorBannerRepository, $errorKey, $routeStopsRepository, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.gbg_1 = $routeStops$delegate;
        $box.hbg_1 = $routeId;
        $box.ibg_1 = $directionId;
        $box.jbg_1 = $ioDispatcher;
        $box.kbg_1 = $errorBannerRepository;
        $box.lbg_1 = $errorKey;
        $box.mbg_1 = $routeStopsRepository;
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
              getRouteStops$lambda_0(this.gbg_1, null);
              getRouteStops$fetchRouteStops(this.hbg_1, this.ibg_1, this.jbg_1, this.kbg_1, this.lbg_1, this.mbg_1, this.gbg_1);
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
        var i = new (getRouteStops$slambda())(this.gbg_1, this.hbg_1, this.ibg_1, this.jbg_1, this.kbg_1, this.lbg_1, this.mbg_1, completion);
        i.nbg_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getRouteStops$slambdaClass = $;
  }
  return getRouteStops$slambdaClass;
}
function getRouteStops$slambda_0($routeStops$delegate, $routeId, $directionId, $ioDispatcher, $errorBannerRepository, $errorKey, $routeStopsRepository, resultContinuation) {
  var i = new (getRouteStops$slambda())($routeStops$delegate, $routeId, $directionId, $ioDispatcher, $errorBannerRepository, $errorKey, $routeStopsRepository, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var getRouteStops$fetchRouteStops$slambda$slambdaClass;
function getRouteStops$fetchRouteStops$slambda$slambda() {
  if (getRouteStops$fetchRouteStops$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeStopsRepository, $routeId, $directionId, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.wbg_1 = $routeStopsRepository;
        $box.xbg_1 = $routeId;
        $box.ybg_1 = $directionId;
        super(resultContinuation, $box);
      }
      zbg($completion) {
        var tmp = this.mbe($completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.zbg($completion);
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
                suspendResult = this.wbg_1._v.s9z(this.xbg_1, this.ybg_1, this);
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
        return new (getRouteStops$fetchRouteStops$slambda$slambda())(this.wbg_1, this.xbg_1, this.ybg_1, completion);
      }
    }
    initMetadataForLambda($, VOID, VOID, [0]);
    getRouteStops$fetchRouteStops$slambda$slambdaClass = $;
  }
  return getRouteStops$fetchRouteStops$slambda$slambdaClass;
}
function getRouteStops$fetchRouteStops$slambda$slambda_0($routeStopsRepository, $routeId, $directionId, resultContinuation) {
  var i = new (getRouteStops$fetchRouteStops$slambda$slambda())($routeStopsRepository, $routeId, $directionId, resultContinuation);
  var l = function ($completion) {
    return i.zbg($completion);
  };
  l.$arity = 0;
  return l;
}
var getRouteStops$fetchRouteStops$slambda$slambdaClass_0;
function getRouteStops$fetchRouteStops$slambda$slambda_1() {
  if (getRouteStops$fetchRouteStops$slambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeStops$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ibh_1 = $routeStops$delegate;
        super(resultContinuation, $box);
      }
      kbh(it, $completion) {
        var tmp = this.lbh(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.kbh(p1 instanceof RouteStopsResult() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              getRouteStops$lambda_0(this.ibh_1, this.jbh_1);
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
      lbh(it, completion) {
        var i = new (getRouteStops$fetchRouteStops$slambda$slambda_1())(this.ibh_1, completion);
        i.jbh_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getRouteStops$fetchRouteStops$slambda$slambdaClass_0 = $;
  }
  return getRouteStops$fetchRouteStops$slambda$slambdaClass_0;
}
function getRouteStops$fetchRouteStops$slambda$slambda_2($routeStops$delegate, resultContinuation) {
  var i = new (getRouteStops$fetchRouteStops$slambda$slambda_1())($routeStops$delegate, resultContinuation);
  var l = function (it, $completion) {
    return i.kbh(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function getRouteStops$fetchRouteStops$slambda$lambda($routeId, $directionId, $ioDispatcher, $errorBannerRepository, $errorKey, $routeStopsRepository, $routeStops$delegate) {
  return function () {
    getRouteStops$fetchRouteStops($routeId, $directionId, $ioDispatcher, $errorBannerRepository, $errorKey, $routeStopsRepository, $routeStops$delegate);
    return Unit_instance;
  };
}
var getRouteStops$fetchRouteStops$slambdaClass;
function getRouteStops$fetchRouteStops$slambda() {
  if (getRouteStops$fetchRouteStops$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($errorBannerRepository, $errorKey, $routeStopsRepository, $routeId, $directionId, $routeStops$delegate, $ioDispatcher, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ubh_1 = $errorBannerRepository;
        $box.vbh_1 = $errorKey;
        $box.wbh_1 = $routeStopsRepository;
        $box.xbh_1 = $routeId;
        $box.ybh_1 = $directionId;
        $box.zbh_1 = $routeStops$delegate;
        $box.abi_1 = $ioDispatcher;
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
                var tmp_0 = this.ubh_1._v;
                var tmp_1 = getRouteStops$fetchRouteStops$slambda$slambda_0(this.wbh_1, this.xbh_1, this.ybh_1, null);
                var tmp_2 = getRouteStops$fetchRouteStops$slambda$slambda_2(this.zbh_1, null);
                suspendResult = fetchApi(tmp_0, this.vbh_1, tmp_1, tmp_2, getRouteStops$fetchRouteStops$slambda$lambda(this.xbh_1, this.ybh_1, this.abi_1, this.ubh_1, this.vbh_1, this.wbh_1, this.zbh_1), this);
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
        var i = new (getRouteStops$fetchRouteStops$slambda())(this.ubh_1, this.vbh_1, this.wbh_1, this.xbh_1, this.ybh_1, this.zbh_1, this.abi_1, completion);
        i.bbi_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getRouteStops$fetchRouteStops$slambdaClass = $;
  }
  return getRouteStops$fetchRouteStops$slambdaClass;
}
function getRouteStops$fetchRouteStops$slambda_0($errorBannerRepository, $errorKey, $routeStopsRepository, $routeId, $directionId, $routeStops$delegate, $ioDispatcher, resultContinuation) {
  var i = new (getRouteStops$fetchRouteStops$slambda())($errorBannerRepository, $errorKey, $routeStopsRepository, $routeId, $directionId, $routeStops$delegate, $ioDispatcher, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  getRouteStops as getRouteStops23bxjy5715l6z,
};
//endregion

//# sourceMappingURL=getRouteStops.mjs.map
