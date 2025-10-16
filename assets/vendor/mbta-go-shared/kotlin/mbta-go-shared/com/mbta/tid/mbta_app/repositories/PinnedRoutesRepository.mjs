import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
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
import { DataStore1uvzeoqavnttw as DataStore } from '../datastore/DataStore.js.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { stringSetPreferencesKey1xwq30xy0cjap as stringSetPreferencesKey } from '../datastore/PreferencesKey.js.mjs';
import { firstvh3bah3c9r20 as first } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Reduce.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_PinnedRoutesRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockPinnedRoutesRepository$stable;
var IPinnedRoutesRepositoryClass;
function IPinnedRoutesRepository() {
  if (IPinnedRoutesRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IPinnedRoutesRepository', VOID, VOID, VOID, [0]);
    IPinnedRoutesRepositoryClass = $;
  }
  return IPinnedRoutesRepositoryClass;
}
var PinnedRoutesRepository$getPinnedRoutes$o$collect$slambdaClass;
function PinnedRoutesRepository$getPinnedRoutes$o$collect$slambda() {
  if (PinnedRoutesRepository$getPinnedRoutes$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.u9x_1 = $$this$unsafeFlow;
        $box.v9x_1 = this$0;
        super(resultContinuation, $box);
      }
      r4m(value, $completion) {
        var tmp = this.s4m(value, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r4m((p1 == null ? true : !(p1 == null)) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp_0 = this;
                tmp_0.x9x_1 = this.u9x_1;
                var tmp_1 = this;
                tmp_1.y9x_1 = this.w9x_1;
                this.z9x_1 = this.x9x_1;
                this.a9y_1 = this.y9x_1;
                this.fd_1 = 1;
                var tmp0_elvis_lhs = this.a9y_1.q9u(this.v9x_1.c9y_1);
                suspendResult = this.z9x_1.z2n(tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs, this);
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
      s4m(value, completion) {
        var i = new (PinnedRoutesRepository$getPinnedRoutes$o$collect$slambda())(this.u9x_1, this.v9x_1, completion);
        i.w9x_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    PinnedRoutesRepository$getPinnedRoutes$o$collect$slambdaClass = $;
  }
  return PinnedRoutesRepository$getPinnedRoutes$o$collect$slambdaClass;
}
function PinnedRoutesRepository$getPinnedRoutes$o$collect$slambda_0($$this$unsafeFlow, this$0, resultContinuation) {
  var i = new (PinnedRoutesRepository$getPinnedRoutes$o$collect$slambda())($$this$unsafeFlow, this$0, resultContinuation);
  var l = function (value, $completion) {
    return i.r4m(value, $completion);
  };
  l.$arity = 1;
  return l;
}
var $collectCOROUTINE$Class;
function $collectCOROUTINE$() {
  if ($collectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, collector, resultContinuation) {
        super(resultContinuation);
        this.l9y_1 = _this__u8e3s4;
        this.m9y_1 = collector;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                var tmp_0 = this;
                tmp_0.n9y_1 = this.m9y_1;
                this.o9y_1 = this.n9y_1;
                this.fd_1 = 1;
                var tmp_1 = PinnedRoutesRepository$getPinnedRoutes$o$collect$slambda_0(this.o9y_1, this.l9y_1.q9y_1, null);
                suspendResult = this.l9y_1.p9y_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
    }
    initMetadataForCoroutine($);
    $collectCOROUTINE$Class = $;
  }
  return $collectCOROUTINE$Class;
}
function _get_dataStore__idjja($this) {
  var tmp0 = $this.b9y_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('dataStore', 1, tmp, PinnedRoutesRepository$_get_dataStore_$ref_phxtan(), null);
  return tmp0.v1();
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.r9y_1 = function_0;
      }
      z2n(value, $completion) {
        return this.r9y_1(value, $completion);
      }
      z4() {
        return this.r9y_1;
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
function PinnedRoutesRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(DataStore()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(DataStore()), tmp2, parameters);
    }
    return tmp;
  };
}
function PinnedRoutesRepository$_get_dataStore_$ref_phxtan() {
  return function (p0) {
    return _get_dataStore__idjja(p0);
  };
}
var PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1Class;
function PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1() {
  if (PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, this$0) {
        this.p9y_1 = $this;
        this.q9y_1 = this$0;
      }
      a2o(collector, $completion) {
        var tmp = new ($collectCOROUTINE$())(this, collector, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      b2o(collector, $completion) {
        return this.a2o(collector, $completion);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, VOID, [1]);
    PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1Class = $;
  }
  return PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1Class;
}
var PinnedRoutesRepositoryClass;
function PinnedRoutesRepository() {
  if (PinnedRoutesRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.b9y_1 = lazy(mode, PinnedRoutesRepository$dataStore$delegate$lambda(this, null, null));
        this.c9y_1 = stringSetPreferencesKey('pinned_routes');
      }
      l9x($completion) {
        // Inline function 'kotlinx.coroutines.flow.map' call
        // Inline function 'kotlinx.coroutines.flow.unsafeTransform' call
        var this_0 = _get_dataStore__idjja(this).e9w();
        // Inline function 'kotlinx.coroutines.flow.internal.unsafeFlow' call
        var tmp$ret$2 = new (PinnedRoutesRepository$getPinnedRoutes$$inlined$map$1())(this_0, this);
        return first(tmp$ret$2, $completion);
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'PinnedRoutesRepository', PinnedRoutesRepository, VOID, [IPinnedRoutesRepository(), KoinComponent()], [0]);
    PinnedRoutesRepositoryClass = $;
  }
  return PinnedRoutesRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_PinnedRoutesRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockPinnedRoutesRepository$stable = 8;
//endregion
//region block: exports
export {
  IPinnedRoutesRepository as IPinnedRoutesRepository31ookeapudd1h,
  PinnedRoutesRepository as PinnedRoutesRepository1lyeptt18t565,
};
//endregion

//# sourceMappingURL=PinnedRoutesRepository.mjs.map
