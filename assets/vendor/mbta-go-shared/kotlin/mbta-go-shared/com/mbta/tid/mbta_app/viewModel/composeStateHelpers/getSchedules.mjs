import {
  CoroutineScopelux7s7zphw7e as CoroutineScope,
  CoroutineScopefcb5f5dwqcas as CoroutineScope_0,
} from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { currentKoinScope1ww4lpd83xrhn as currentKoinScope } from '../../../../../../../projects-compose-koin-compose/org/koin/compose/KoinApplication.mjs';
import { ISchedulesRepository3iopyft7sy2ox as ISchedulesRepository } from '../../repositories/SchedulesRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../../repositories/ErrorBannerStateRepository.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import { LaunchedEffect1xc4bdzax6uqz as LaunchedEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Companion_getInstance2mow8xipgd4ir as Companion_getInstance_0 } from '../../utils/EasternTimeInstant.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { ScheduleResponse3fcyp336niye as ScheduleResponse } from '../../model/response/ScheduleResponse.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { fetchApiwttxxko4paj1 as fetchApi } from './fetchApi.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function fetchSchedules(stopIds, errorKey, errorBannerRepository, schedulesRepository, coroutineDispatcher, onSuccess) {
  var tmp = CoroutineScope(coroutineDispatcher);
  launch(tmp, VOID, VOID, fetchSchedules$slambda_0(errorBannerRepository, errorKey, onSuccess, schedulesRepository, stopIds, coroutineDispatcher, null));
}
function getSchedules(stopIds, errorKey, schedulesRepository, errorBannerRepository, coroutineDispatcher, $composer, $changed, $default) {
  var schedulesRepository_0 = {_v: schedulesRepository};
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var coroutineDispatcher_0 = {_v: coroutineDispatcher};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1412177757, 'C(getSchedules)P(4,2,3,1)50@1789L12,51@1860L12,52@1921L42,55@2069L33,57@2132L400,57@2108L424:getSchedules.kt#8u5po0');
  if (!(($default & 4) === 0)) {
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
      var value = scope.o7z(getKClass(ISchedulesRepository()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    schedulesRepository_0._v = tmp1_group;
  }
  if (!(($default & 8) === 0)) {
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
  if (!(($default & 16) === 0)) {
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
    coroutineDispatcher_0._v = tmp1_group_1;
  }
  if (isTraceInProgress()) {
    traceEventStart(-1412177757, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.getSchedules (getSchedules.kt:53)');
  }
  var errorKey_0 = errorKey + '.getSchedules';
  sourceInformationMarkerStart($composer_0, 106854436, 'CC(remember):getSchedules.kt#9igjgp');
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
  var result$delegate = tmp1_group_2;
  sourceInformationMarkerStart($composer_0, 106856819, 'CC(remember):getSchedules.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_2 = !!(!!(!!(!!($composer_0.q6w(stopIds) | $composer_0.s6m(errorKey_0)) | $composer_0.q6w(errorBannerRepository_0._v)) | (($changed & 896 ^ 384) > 256 && $composer_0.q6w(schedulesRepository_0._v) || ($changed & 384) === 256)) | $composer_0.q6w(coroutineDispatcher_0._v));
  // Inline function 'kotlin.let' call
  var it_3 = $composer_0.g6y();
  var tmp_7;
  if (invalid_2 || it_3 === Companion_getInstance().x6p_1) {
    var value_3 = getSchedules$slambda_0(stopIds, errorKey_0, errorBannerRepository_0, schedulesRepository_0, coroutineDispatcher_0, result$delegate, null);
    $composer_0.h6y(value_3);
    tmp_7 = value_3;
  } else {
    tmp_7 = it_3;
  }
  var tmp_8 = tmp_7;
  var tmp2_group = (tmp_8 == null ? true : !(tmp_8 == null)) ? tmp_8 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(stopIds, tmp2_group, $composer_0, 14 & $changed);
  var tmp0 = getSchedules$lambda(result$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function getSchedules$lambda($result$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('result', KMutableProperty0(), true);
  return $result$delegate.v1();
}
function getSchedules$lambda_0($result$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('result', KMutableProperty0(), true);
  $result$delegate.b2r(_set____db54di);
  return Unit_instance;
}
var fetchSchedules$slambda$slambdaClass;
function fetchSchedules$slambda$slambda() {
  if (fetchSchedules$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($schedulesRepository, $stopIds, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.kbi_1 = $schedulesRepository;
        $box.lbi_1 = $stopIds;
        super(resultContinuation, $box);
      }
      mbi($completion) {
        var tmp = this.mbe($completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.mbi($completion);
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
                suspendResult = this.kbi_1.ka0(this.lbi_1, Companion_getInstance_0().j8o(), this);
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
        return new (fetchSchedules$slambda$slambda())(this.kbi_1, this.lbi_1, completion);
      }
    }
    initMetadataForLambda($, VOID, VOID, [0]);
    fetchSchedules$slambda$slambdaClass = $;
  }
  return fetchSchedules$slambda$slambdaClass;
}
function fetchSchedules$slambda$slambda_0($schedulesRepository, $stopIds, resultContinuation) {
  var i = new (fetchSchedules$slambda$slambda())($schedulesRepository, $stopIds, resultContinuation);
  var l = function ($completion) {
    return i.mbi($completion);
  };
  l.$arity = 0;
  return l;
}
var fetchSchedules$slambda$suspendConversion0$refClass;
function fetchSchedules$slambda$suspendConversion0$ref() {
  if (fetchSchedules$slambda$suspendConversion0$refClass === VOID) {
    class $ {
      constructor(p0) {
        this.nbi_1 = p0;
      }
      obi($callee, $completion) {
        this.nbi_1($callee);
        return Unit_instance;
      }
      ne(p1, $completion) {
        return this.obi(p1 instanceof ScheduleResponse() ? p1 : THROW_CCE(), $completion);
      }
    }
    initMetadataForFunctionReference($, VOID, VOID, [1]);
    fetchSchedules$slambda$suspendConversion0$refClass = $;
  }
  return fetchSchedules$slambda$suspendConversion0$refClass;
}
function fetchSchedules$slambda$suspendConversion0$ref_0(p0) {
  var i = new (fetchSchedules$slambda$suspendConversion0$ref())(p0);
  var l = function ($callee, $completion) {
    return i.obi($callee, $completion);
  };
  l.$arity = 1;
  return l;
}
function fetchSchedules$slambda$lambda($stopIds, $errorKey, $errorBannerRepository, $schedulesRepository, $coroutineDispatcher, $onSuccess) {
  return function () {
    fetchSchedules($stopIds, $errorKey, $errorBannerRepository, $schedulesRepository, $coroutineDispatcher, $onSuccess);
    return Unit_instance;
  };
}
var fetchSchedules$slambdaClass;
function fetchSchedules$slambda() {
  if (fetchSchedules$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($errorBannerRepository, $errorKey, $onSuccess, $schedulesRepository, $stopIds, $coroutineDispatcher, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.xbi_1 = $errorBannerRepository;
        $box.ybi_1 = $errorKey;
        $box.zbi_1 = $onSuccess;
        $box.abj_1 = $schedulesRepository;
        $box.bbj_1 = $stopIds;
        $box.cbj_1 = $coroutineDispatcher;
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
                var tmp_0 = fetchSchedules$slambda$slambda_0(this.abj_1, this.bbj_1, null);
                var tmp_1 = fetchSchedules$slambda$suspendConversion0$ref_0(this.zbi_1);
                suspendResult = fetchApi(this.xbi_1, this.ybi_1, tmp_0, tmp_1, fetchSchedules$slambda$lambda(this.bbj_1, this.ybi_1, this.xbi_1, this.abj_1, this.cbj_1, this.zbi_1), this);
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
        var i = new (fetchSchedules$slambda())(this.xbi_1, this.ybi_1, this.zbi_1, this.abj_1, this.bbj_1, this.cbj_1, completion);
        i.dbj_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchSchedules$slambdaClass = $;
  }
  return fetchSchedules$slambdaClass;
}
function fetchSchedules$slambda_0($errorBannerRepository, $errorKey, $onSuccess, $schedulesRepository, $stopIds, $coroutineDispatcher, resultContinuation) {
  var i = new (fetchSchedules$slambda())($errorBannerRepository, $errorKey, $onSuccess, $schedulesRepository, $stopIds, $coroutineDispatcher, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function getSchedules$slambda$lambda($result$delegate) {
  return function (it) {
    getSchedules$lambda_0($result$delegate, it);
    return Unit_instance;
  };
}
var getSchedules$slambdaClass;
function getSchedules$slambda() {
  if (getSchedules$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($stopIds, $errorKey, $errorBannerRepository, $schedulesRepository, $coroutineDispatcher, $result$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.mbj_1 = $stopIds;
        $box.nbj_1 = $errorKey;
        $box.obj_1 = $errorBannerRepository;
        $box.pbj_1 = $schedulesRepository;
        $box.qbj_1 = $coroutineDispatcher;
        $box.rbj_1 = $result$delegate;
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
              getSchedules$lambda_0(this.rbj_1, null);
              if (!(this.mbj_1 == null)) {
                var tmp_0 = this.obj_1._v;
                var tmp_1 = this.pbj_1._v;
                var tmp_2 = this.qbj_1._v;
                fetchSchedules(this.mbj_1, this.nbj_1, tmp_0, tmp_1, tmp_2, getSchedules$slambda$lambda(this.rbj_1));
              } else {
                getSchedules$lambda_0(this.rbj_1, new (ScheduleResponse())(emptyList(), emptyMap()));
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
        var i = new (getSchedules$slambda())(this.mbj_1, this.nbj_1, this.obj_1, this.pbj_1, this.qbj_1, this.rbj_1, completion);
        i.sbj_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getSchedules$slambdaClass = $;
  }
  return getSchedules$slambdaClass;
}
function getSchedules$slambda_0($stopIds, $errorKey, $errorBannerRepository, $schedulesRepository, $coroutineDispatcher, $result$delegate, resultContinuation) {
  var i = new (getSchedules$slambda())($stopIds, $errorKey, $errorBannerRepository, $schedulesRepository, $coroutineDispatcher, $result$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  getSchedules as getSchedules3tqvmvnt1kyr9,
};
//endregion

//# sourceMappingURL=getSchedules.mjs.map
