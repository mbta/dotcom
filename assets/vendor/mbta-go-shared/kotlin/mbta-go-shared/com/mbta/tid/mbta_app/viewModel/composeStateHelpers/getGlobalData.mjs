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
import { IGlobalRepository2966xpkjzgq2l as IGlobalRepository } from '../../repositories/GlobalRepository.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../../repositories/ErrorBannerStateRepository.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { collectAsState1hcbu3nagg85r as collectAsState } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotFlow.mjs';
import { LaunchedEffect1xc4bdzax6uqz as LaunchedEffect } from '../../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import { KProperty02ce7r476m8633 as KProperty0 } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { GlobalResponse31u5crlky5fkx as GlobalResponse } from '../../model/response/GlobalResponse.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { fetchApiwttxxko4paj1 as fetchApi } from './fetchApi.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function fetchGlobalData(errorKey, errorBannerRepository, globalRepository, coroutineDispatcher) {
  var tmp = CoroutineScope(coroutineDispatcher);
  launch(tmp, VOID, VOID, fetchGlobalData$slambda_0(errorBannerRepository, errorKey, globalRepository, coroutineDispatcher, null));
}
function getGlobalData(errorKey, globalRepository, errorBannerRepository, coroutineDispatcher, $composer, $changed, $default) {
  var globalRepository_0 = {_v: globalRepository};
  var errorBannerRepository_0 = {_v: errorBannerRepository};
  var coroutineDispatcher_0 = {_v: coroutineDispatcher};
  var $composer_0 = $composer;
  sourceInformationMarkerStart($composer_0, -1744532610, 'C(getGlobalData)P(2,3,1)43@1530L12,44@1601L12,45@1662L42,47@1793L16,48@1835L179,48@1814L200:getGlobalData.kt#8u5po0');
  if (!(($default & 2) === 0)) {
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
      var value = scope.o7z(getKClass(IGlobalRepository()), qualifier);
      $composer_1.h6y(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.f6w();
    $composer_1.f6w();
    globalRepository_0._v = tmp1_group;
  }
  if (!(($default & 4) === 0)) {
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
  if (!(($default & 8) === 0)) {
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
    traceEventStart(-1744532610, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.composeStateHelpers.getGlobalData (getGlobalData.kt:46)');
  }
  var tmp_5 = globalRepository_0._v.p9w();
  var globalResponse$delegate = collectAsState(tmp_5, null, $composer_0, 0, 1);
  sourceInformationMarkerStart($composer_0, -1458579503, 'CC(remember):getGlobalData.kt#9igjgp');
  // Inline function 'androidx.compose.runtime.cache' call
  var invalid_2 = !!(!!(!!((($changed & 14 ^ 6) > 4 && $composer_0.s6m(errorKey) || ($changed & 6) === 4) | $composer_0.q6w(errorBannerRepository_0._v)) | (($changed & 112 ^ 48) > 32 && $composer_0.q6w(globalRepository_0._v) || ($changed & 48) === 32)) | $composer_0.q6w(coroutineDispatcher_0._v));
  // Inline function 'kotlin.let' call
  var it_2 = $composer_0.g6y();
  var tmp_6;
  if (invalid_2 || it_2 === Companion_getInstance().x6p_1) {
    var value_2 = getGlobalData$slambda_0(errorKey, errorBannerRepository_0, globalRepository_0, coroutineDispatcher_0, null);
    $composer_0.h6y(value_2);
    tmp_6 = value_2;
  } else {
    tmp_6 = it_2;
  }
  var tmp_7 = tmp_6;
  var tmp1_group_2 = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
  sourceInformationMarkerEnd($composer_0);
  LaunchedEffect(Unit_instance, tmp1_group_2, $composer_0, 6);
  var tmp0 = getGlobalData$lambda(globalResponse$delegate);
  if (isTraceInProgress()) {
    traceEventEnd();
  }
  sourceInformationMarkerEnd($composer_0);
  return tmp0;
}
function getGlobalData$lambda($globalResponse$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('globalResponse', KProperty0(), false);
  return $globalResponse$delegate.v1();
}
var fetchGlobalData$slambda$slambdaClass;
function fetchGlobalData$slambda$slambda() {
  if (fetchGlobalData$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($globalRepository, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.kbe_1 = $globalRepository;
        super(resultContinuation, $box);
      }
      lbe($completion) {
        var tmp = this.mbe($completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      sf($completion) {
        return this.lbe($completion);
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
                suspendResult = this.kbe_1.q9w(this);
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
        return new (fetchGlobalData$slambda$slambda())(this.kbe_1, completion);
      }
    }
    initMetadataForLambda($, VOID, VOID, [0]);
    fetchGlobalData$slambda$slambdaClass = $;
  }
  return fetchGlobalData$slambda$slambdaClass;
}
function fetchGlobalData$slambda$slambda_0($globalRepository, resultContinuation) {
  var i = new (fetchGlobalData$slambda$slambda())($globalRepository, resultContinuation);
  var l = function ($completion) {
    return i.lbe($completion);
  };
  l.$arity = 0;
  return l;
}
var fetchGlobalData$slambda$slambdaClass_0;
function fetchGlobalData$slambda$slambda_1() {
  if (fetchGlobalData$slambda$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      wbe(it, $completion) {
        var tmp = this.xbe(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.wbe(p1 instanceof GlobalResponse() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
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
      xbe(it, completion) {
        var i = new (fetchGlobalData$slambda$slambda_1())(completion);
        i.vbe_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchGlobalData$slambda$slambdaClass_0 = $;
  }
  return fetchGlobalData$slambda$slambdaClass_0;
}
function fetchGlobalData$slambda$slambda_2(resultContinuation) {
  var i = new (fetchGlobalData$slambda$slambda_1())(resultContinuation);
  var l = function (it, $completion) {
    return i.wbe(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function fetchGlobalData$slambda$lambda($errorKey, $errorBannerRepository, $globalRepository, $coroutineDispatcher) {
  return function () {
    fetchGlobalData($errorKey, $errorBannerRepository, $globalRepository, $coroutineDispatcher);
    return Unit_instance;
  };
}
var fetchGlobalData$slambdaClass;
function fetchGlobalData$slambda() {
  if (fetchGlobalData$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($errorBannerRepository, $errorKey, $globalRepository, $coroutineDispatcher, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.gbf_1 = $errorBannerRepository;
        $box.hbf_1 = $errorKey;
        $box.ibf_1 = $globalRepository;
        $box.jbf_1 = $coroutineDispatcher;
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
                var tmp_0 = fetchGlobalData$slambda$slambda_0(this.ibf_1, null);
                var tmp_1 = fetchGlobalData$slambda$slambda_2(null);
                suspendResult = fetchApi(this.gbf_1, this.hbf_1, tmp_0, tmp_1, fetchGlobalData$slambda$lambda(this.hbf_1, this.gbf_1, this.ibf_1, this.jbf_1), this);
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
        var i = new (fetchGlobalData$slambda())(this.gbf_1, this.hbf_1, this.ibf_1, this.jbf_1, completion);
        i.kbf_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    fetchGlobalData$slambdaClass = $;
  }
  return fetchGlobalData$slambdaClass;
}
function fetchGlobalData$slambda_0($errorBannerRepository, $errorKey, $globalRepository, $coroutineDispatcher, resultContinuation) {
  var i = new (fetchGlobalData$slambda())($errorBannerRepository, $errorKey, $globalRepository, $coroutineDispatcher, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var getGlobalData$slambdaClass;
function getGlobalData$slambda() {
  if (getGlobalData$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($errorKey, $errorBannerRepository, $globalRepository, $coroutineDispatcher, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.tbf_1 = $errorKey;
        $box.ubf_1 = $errorBannerRepository;
        $box.vbf_1 = $globalRepository;
        $box.wbf_1 = $coroutineDispatcher;
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
              fetchGlobalData(this.tbf_1 + '.getGlobalData', this.ubf_1._v, this.vbf_1._v, this.wbf_1._v);
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
        var i = new (getGlobalData$slambda())(this.tbf_1, this.ubf_1, this.vbf_1, this.wbf_1, completion);
        i.xbf_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getGlobalData$slambdaClass = $;
  }
  return getGlobalData$slambdaClass;
}
function getGlobalData$slambda_0($errorKey, $errorBannerRepository, $globalRepository, $coroutineDispatcher, resultContinuation) {
  var i = new (getGlobalData$slambda())($errorKey, $errorBannerRepository, $globalRepository, $coroutineDispatcher, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  getGlobalData as getGlobalData3s0ud2znxtzqv,
};
//endregion

//# sourceMappingURL=getGlobalData.mjs.map
