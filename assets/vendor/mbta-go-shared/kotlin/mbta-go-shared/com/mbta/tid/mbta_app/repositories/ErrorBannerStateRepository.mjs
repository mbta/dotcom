import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { INetworkConnectivityMonitorpne5n8gpmz3o as INetworkConnectivityMonitor } from '../network/NetworkConnectivityMonitor.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { MutableStateFlow34bfoyvwu8czu as MutableStateFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/StateFlow.mjs';
import { asStateFlow34rribx643ke5 as asStateFlow } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Share.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { toSet2orjxp16sotqu as toSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  DataError2myofy06md2gg as DataError,
  NetworkError13cvqfq5ztvbw as NetworkError,
  StalePredictions28to497qx2yqc as StalePredictions,
} from '../model/ErrorBannerState.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_getInstance2mow8xipgd4ir as Companion_getInstance } from '../utils/EasternTimeInstant.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
  Duration__compareTo_impl_pchp0f3d3hhywzdbk51 as Duration__compareTo_impl_pchp0f,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_MINUTES_getInstancejlptjvjgjkm8 as DurationUnit_MINUTES_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { setOf1u3mizs95ngxo as setOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { RuntimeException1r3t0zl97011n as RuntimeException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_NetworkStatus_Connected$stable;
var com_mbta_tid_mbta_app_repositories_NetworkStatus_Disconnected$stable;
var com_mbta_tid_mbta_app_repositories_NetworkStatus$stable;
var com_mbta_tid_mbta_app_repositories_IErrorBannerStateRepository$stable;
var com_mbta_tid_mbta_app_repositories_ErrorBannerStateRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockErrorBannerStateRepository$stable;
var ConnectedClass;
function Connected() {
  if (ConnectedClass === VOID) {
    class $ extends NetworkStatus() {
      constructor() {
        Connected_instance = null;
        super();
        Connected_instance = this;
      }
      toString() {
        return 'Connected';
      }
      hashCode() {
        return 795154401;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Connected()))
          return false;
        other instanceof Connected() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Connected');
    ConnectedClass = $;
  }
  return ConnectedClass;
}
var Connected_instance;
function Connected_getInstance() {
  if (Connected_instance === VOID)
    new (Connected())();
  return Connected_instance;
}
var DisconnectedClass;
function Disconnected() {
  if (DisconnectedClass === VOID) {
    class $ extends NetworkStatus() {
      constructor() {
        Disconnected_instance = null;
        super();
        Disconnected_instance = this;
      }
      toString() {
        return 'Disconnected';
      }
      hashCode() {
        return -1600243101;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Disconnected()))
          return false;
        other instanceof Disconnected() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Disconnected');
    DisconnectedClass = $;
  }
  return DisconnectedClass;
}
var Disconnected_instance;
function Disconnected_getInstance() {
  if (Disconnected_instance === VOID)
    new (Disconnected())();
  return Disconnected_instance;
}
var NetworkStatusClass;
function NetworkStatus() {
  if (NetworkStatusClass === VOID) {
    class $ {}
    initMetadataForClass($, 'NetworkStatus');
    NetworkStatusClass = $;
  }
  return NetworkStatusClass;
}
function _get_networkConnectivityMonitor__vticmi($this) {
  var tmp0 = $this.l9t_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('networkConnectivityMonitor', 1, tmp, IErrorBannerStateRepository$_get_networkConnectivityMonitor_$ref_ywe7nr(), null);
  return tmp0.v1();
}
function setNetworkStatus($this, newStatus) {
  $this.o9t_1 = newStatus;
  $this.r9t();
}
function IErrorBannerStateRepository$networkConnectivityMonitor$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(INetworkConnectivityMonitor()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(INetworkConnectivityMonitor()), tmp2, parameters);
    }
    return tmp;
  };
}
function IErrorBannerStateRepository$_get_networkConnectivityMonitor_$ref_ywe7nr() {
  return function (p0) {
    return _get_networkConnectivityMonitor__vticmi(p0);
  };
}
function IErrorBannerStateRepository$subscribeToNetworkStatusChanges$lambda(this$0) {
  return function () {
    setNetworkStatus(this$0, Connected_getInstance());
    return Unit_instance;
  };
}
function IErrorBannerStateRepository$subscribeToNetworkStatusChanges$lambda_0(this$0) {
  return function () {
    setNetworkStatus(this$0, Disconnected_getInstance());
    return Unit_instance;
  };
}
function IErrorBannerStateRepository$updateState$lambda(this$0) {
  return function () {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = this$0.q9t_1.l3().x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      element.d91_1();
    }
    return Unit_instance;
  };
}
var IErrorBannerStateRepositoryClass;
function IErrorBannerStateRepository() {
  if (IErrorBannerStateRepositoryClass === VOID) {
    class $ {
      constructor(initialState) {
        initialState = initialState === VOID ? null : initialState;
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.l9t_1 = lazy(mode, IErrorBannerStateRepository$networkConnectivityMonitor$delegate$lambda(this, null, null));
        this.m9t_1 = MutableStateFlow(initialState);
        this.n9t_1 = asStateFlow(this.m9t_1);
        this.o9t_1 = null;
        this.p9t_1 = null;
        var tmp_0 = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_0.q9t_1 = LinkedHashMap().sc();
      }
      s9t() {
        var tmp = _get_networkConnectivityMonitor__vticmi(this);
        var tmp_0 = IErrorBannerStateRepository$subscribeToNetworkStatusChanges$lambda(this);
        tmp.n9s(tmp_0, IErrorBannerStateRepository$subscribeToNetworkStatusChanges$lambda_0(this));
      }
      r9t() {
        var tmp;
        if (equals(this.o9t_1, Disconnected_getInstance())) {
          tmp = new (NetworkError())(null);
        } else {
          // Inline function 'kotlin.collections.isNotEmpty' call
          if (!this.q9t_1.h1()) {
            var tmp_0 = this.q9t_1.k3();
            // Inline function 'kotlin.collections.flatMap' call
            var tmp0 = this.q9t_1.l3();
            // Inline function 'kotlin.collections.flatMapTo' call
            var destination = ArrayList().g1();
            var _iterator__ex2g4s = tmp0.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              var list = element.c91_1;
              addAll(destination, list);
            }
            var tmp_1 = toSet(destination);
            tmp = new (DataError())(tmp_0, tmp_1, IErrorBannerStateRepository$updateState$lambda(this));
          } else {
            if (!(this.p9t_1 == null)) {
              tmp = this.p9t_1;
            } else {
              tmp = null;
            }
          }
        }
        this.m9t_1.b2r(tmp);
      }
      t9t(predictionsLastUpdated, predictionQuantity, action) {
        var tmp = this;
        var tmp_0;
        var tmp_1;
        if (predictionQuantity > 0) {
          var tmp_2 = Companion_getInstance().j8o().c9m(predictionsLastUpdated);
          // Inline function 'kotlin.time.Companion.minutes' call
          Companion_getInstance_0();
          var tmp$ret$0 = toDuration(2, DurationUnit_MINUTES_getInstance());
          tmp_1 = Duration__compareTo_impl_pchp0f(tmp_2, tmp$ret$0) > 0;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = new (StalePredictions())(predictionsLastUpdated, action);
        } else {
          tmp_0 = null;
        }
        tmp.p9t_1 = tmp_0;
        this.r9t();
      }
      u9t(key, details, action) {
        var tmp0 = this.q9t_1;
        // Inline function 'kotlin.collections.set' call
        var value = new (DataError())(setOf(key), setOf(details), action);
        tmp0.t3(key, value);
        this.r9t();
      }
      v9t(key) {
        this.q9t_1.u3(key);
        this.r9t();
      }
      w9t() {
        this.p9t_1 = null;
        try {
          this.q9t_1.p3();
        } catch ($p) {
          if ($p instanceof RuntimeException()) {
            var e = $p;
          } else {
            throw $p;
          }
        }
        this.m9t_1.b2r(null);
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'IErrorBannerStateRepository', VOID, VOID, [KoinComponent()]);
    IErrorBannerStateRepositoryClass = $;
  }
  return IErrorBannerStateRepositoryClass;
}
var ErrorBannerStateRepositoryClass;
function ErrorBannerStateRepository() {
  if (ErrorBannerStateRepositoryClass === VOID) {
    class $ extends IErrorBannerStateRepository() {}
    initMetadataForClass($, 'ErrorBannerStateRepository', ErrorBannerStateRepository, VOID, [IErrorBannerStateRepository(), KoinComponent()]);
    ErrorBannerStateRepositoryClass = $;
  }
  return ErrorBannerStateRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_NetworkStatus_Connected$stable = 0;
com_mbta_tid_mbta_app_repositories_NetworkStatus_Disconnected$stable = 0;
com_mbta_tid_mbta_app_repositories_NetworkStatus$stable = 0;
com_mbta_tid_mbta_app_repositories_IErrorBannerStateRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_ErrorBannerStateRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockErrorBannerStateRepository$stable = 8;
//endregion
//region block: exports
export {
  ErrorBannerStateRepository as ErrorBannerStateRepositoryseobm7fz1q3p,
  IErrorBannerStateRepository as IErrorBannerStateRepository1yho0frci5t6,
};
//endregion

//# sourceMappingURL=ErrorBannerStateRepository.mjs.map
