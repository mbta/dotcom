import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { State1k760yqksu7ww as State } from './State.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { IAccessibilityStatusRepositoryie5hsx1kk1ap as IAccessibilityStatusRepository } from '../repositories/AccessibilityStatusRepository.mjs';
import { IFilteredStopDetailsViewModel10oi42n7av99g as IFilteredStopDetailsViewModel } from '../viewModel/FilteredStopDetailsViewModel.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import {
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope_0,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { Regexxgw0gjiagf4z as Regex } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/regex.mjs';
import { JsPhoenixSocket1kp5kerls8o1s as JsPhoenixSocket } from '../phoenix/JsPhoenixClient.mjs';
import { appModule2jys7gqlxfq8j as appModule } from '../dependencyInjection/AppModule.mjs';
import { viewModelModule22xhj245stsph as viewModelModule } from '../viewModel/viewModelModule.js.mjs';
import { platformModule305lnhq4howzi as platformModule } from '../PlatformModule.mjs';
import { MockAnalytics3jcswnj0aeadw as MockAnalytics } from '../analytics/MockAnalytics.mjs';
import { MockCurrentAppVersionRepository3ut3rkbnwd6ca as MockCurrentAppVersionRepository } from '../repositories/CurrentAppVersionRepository.mjs';
import { makeNativeModule4dkmnb0mloi as makeNativeModule } from '../dependencyInjection/makeNativeModule.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  loadKoinModules2dpj907mdbjkn as loadKoinModules,
  startKoin30la02u0gybvw as startKoin,
} from '../../../../../../projects-core-koin-core/org/koin/core/context/DefaultContextExt.mjs';
import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  TripDetailsFilter20app8tx6q526 as TripDetailsFilter,
  StopDetailsFilterp30x6nsimkbe as StopDetailsFilter,
  StopDetailsPageFilters7s483ou4udd1 as StopDetailsPageFilters,
} from '../model/StopDetailsFilters.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { promise1ky6tawqaxbt4 as promise } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Promise.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stable;
var FilteredStopDetails$onNewState$slambda$slambdaClass;
function FilteredStopDetails$onNewState$slambda$slambda() {
  if (FilteredStopDetails$onNewState$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($callback, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.mbx_1 = $callback;
        super(resultContinuation, $box);
      }
      obx(it, $completion) {
        var tmp = this.pbx(it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.obx(p1 instanceof State() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              this.mbx_1(this.nbx_1);
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
      pbx(it, completion) {
        var i = new (FilteredStopDetails$onNewState$slambda$slambda())(this.mbx_1, completion);
        i.nbx_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetails$onNewState$slambda$slambdaClass = $;
  }
  return FilteredStopDetails$onNewState$slambda$slambdaClass;
}
function FilteredStopDetails$onNewState$slambda$slambda_0($callback, resultContinuation) {
  var i = new (FilteredStopDetails$onNewState$slambda$slambda())($callback, resultContinuation);
  var l = function (it, $completion) {
    return i.obx(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function _get_vm__ndccz8($this) {
  var tmp0 = $this.rbx_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('vm', 1, tmp, FilteredStopDetails$_get_vm_$ref_jche0u(), null);
  return tmp0.v1();
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.sbx_1 = function_0;
      }
      z2n(value, $completion) {
        return this.sbx_1(value, $completion);
      }
      z4() {
        return this.sbx_1;
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, FlowCollector()) : false) {
          var tmp_0;
          if (!(other == null) ? isInterface(other, FunctionAdapter()) : false) {
            tmp_0 = equals(this.z4(), other.z4());
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return hashCode(this.z4());
      }
    }
    initMetadataForClass($, 'sam$kotlinx_coroutines_flow_FlowCollector$0', VOID, VOID, [FlowCollector(), FunctionAdapter()], [1]);
    sam$kotlinx_coroutines_flow_FlowCollector$0Class = $;
  }
  return sam$kotlinx_coroutines_flow_FlowCollector$0Class;
}
var FilteredStopDetails$modules$1Class;
function FilteredStopDetails$modules$1() {
  if (FilteredStopDetails$modules$1Class === VOID) {
    class $ {}
    initMetadataForClass($, VOID, VOID, VOID, [IAccessibilityStatusRepository()]);
    FilteredStopDetails$modules$1Class = $;
  }
  return FilteredStopDetails$modules$1Class;
}
function FilteredStopDetails$lambda($modules) {
  return function ($this$startKoin) {
    $this$startKoin.o7v($modules);
    return Unit_instance;
  };
}
function FilteredStopDetails$vm$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(IFilteredStopDetailsViewModel()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(IFilteredStopDetailsViewModel()), tmp2, parameters);
    }
    return tmp;
  };
}
function FilteredStopDetails$_get_vm_$ref_jche0u() {
  return function (p0) {
    return _get_vm__ndccz8(p0);
  };
}
var FilteredStopDetails$onNewState$slambdaClass;
function FilteredStopDetails$onNewState$slambda() {
  if (FilteredStopDetails$onNewState$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $callback, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.bby_1 = this$0;
        $box.cby_1 = $callback;
        super(resultContinuation, $box);
      }
      x3e($this$promise, $completion) {
        var tmp = this.y3e($this$promise, $completion);
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
                this.gd_1 = 2;
                this.fd_1 = 1;
                var tmp_0 = _get_vm__ndccz8(this.bby_1).oay();
                var tmp_1 = FilteredStopDetails$onNewState$slambda$slambda_0(this.cby_1, null);
                suspendResult = tmp_0.t2p(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                throwKotlinNothingValueException();
                break;
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
      y3e($this$promise, completion) {
        var i = new (FilteredStopDetails$onNewState$slambda())(this.bby_1, this.cby_1, completion);
        i.dby_1 = $this$promise;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    FilteredStopDetails$onNewState$slambdaClass = $;
  }
  return FilteredStopDetails$onNewState$slambdaClass;
}
function FilteredStopDetails$onNewState$slambda_0(this$0, $callback, resultContinuation) {
  var i = new (FilteredStopDetails$onNewState$slambda())(this$0, $callback, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.x3e($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
var FilteredStopDetailsClass;
function FilteredStopDetails() {
  if (FilteredStopDetailsClass === VOID) {
    class $ {
      constructor(backendRoot) {
        var tmp = this;
        // Inline function 'kotlin.text.replace' call
        var tmp$ret$0 = Regex().yj('^http').bk(backendRoot, 'ws');
        tmp.qbx_1 = new (JsPhoenixSocket())(tmp$ret$0 + '/socket');
        this.qbx_1.rbt();
        var tmp_0 = appModule(backendRoot);
        var tmp_1 = viewModelModule();
        var tmp_2 = platformModule();
        var modules = listOf([tmp_0, tmp_1, tmp_2, makeNativeModule(new (FilteredStopDetails$modules$1())(), new (MockAnalytics())(), new (MockCurrentAppVersionRepository())(null), this.qbx_1)]);
        if (KoinPlatform_instance.q7z() == null) {
          startKoin(FilteredStopDetails$lambda(modules));
        } else {
          loadKoinModules(modules);
        }
        var tmp_3 = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp_3.rbx_1 = lazy(mode, FilteredStopDetails$vm$delegate$lambda(this, null, null));
      }
      setActive(active) {
        _get_vm__ndccz8(this).ybt(active);
      }
      setFilters(stopId, routeId, directionId, tripId, vehicleId, stopSequence) {
        var tripFilter = !(tripId == null) ? new (TripDetailsFilter())(tripId, vehicleId, stopSequence) : null;
        _get_vm__ndccz8(this).rb6(new (StopDetailsPageFilters())(stopId, new (StopDetailsFilter())(routeId, directionId), tripFilter));
      }
      onNewState(callback) {
        var tmp = CoroutineScope_0(Dispatchers_getInstance().u28_1);
        return promise(tmp, VOID, VOID, FilteredStopDetails$onNewState$slambda_0(this, callback, null));
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'FilteredStopDetails', VOID, VOID, [KoinComponent()]);
    FilteredStopDetailsClass = $;
  }
  return FilteredStopDetailsClass;
}
function com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stableprop_getter() {
  return com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stable;
}
//region block: init
com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stable = 8;
//endregion
//region block: exports
export {
  FilteredStopDetails as FilteredStopDetails298ttzbhl8pam,
  com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stableprop_getter as com_mbta_tid_mbta_app_wrapper_FilteredStopDetails$stableprop_getter3u85iqrxky50,
};
//endregion

//# sourceMappingURL=FilteredStopDetails.mjs.map
