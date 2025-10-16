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
import { firstvh3bah3c9r20 as first } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/Reduce.mjs';
import { VisitHistory3b9hof6750f59 as VisitHistory } from '../history/VisitHistory.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { serializer1i4e9ym37oxmo as serializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { Mutex16li1l0asjv17 as Mutex } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/sync/Mutex.mjs';
import { stringPreferencesKey27jkgr6k1ibb6 as stringPreferencesKey } from '../datastore/PreferencesKey.js.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_VisitHistoryRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockVisitHistoryRepository$stable;
var IVisitHistoryRepositoryClass;
function IVisitHistoryRepository() {
  if (IVisitHistoryRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IVisitHistoryRepository', VOID, VOID, VOID, [0, 1]);
    IVisitHistoryRepositoryClass = $;
  }
  return IVisitHistoryRepositoryClass;
}
var VisitHistoryRepository$getVisitHistory$o$collect$slambdaClass;
function VisitHistoryRepository$getVisitHistory$o$collect$slambda() {
  if (VisitHistoryRepository$getVisitHistory$o$collect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($$this$unsafeFlow, this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ra5_1 = $$this$unsafeFlow;
        $box.sa5_1 = this$0;
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
                tmp_0.ua5_1 = this.ra5_1;
                var tmp_1 = this;
                tmp_1.va5_1 = this.ta5_1;
                this.wa5_1 = this.ua5_1;
                this.xa5_1 = this.va5_1;
                this.fd_1 = 1;
                var it = this.xa5_1;
                suspendResult = this.wa5_1.z2n(it.q9u(this.sa5_1.aa6_1), this);
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
        var i = new (VisitHistoryRepository$getVisitHistory$o$collect$slambda())(this.ra5_1, this.sa5_1, completion);
        i.ta5_1 = value;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    VisitHistoryRepository$getVisitHistory$o$collect$slambdaClass = $;
  }
  return VisitHistoryRepository$getVisitHistory$o$collect$slambdaClass;
}
function VisitHistoryRepository$getVisitHistory$o$collect$slambda_0($$this$unsafeFlow, this$0, resultContinuation) {
  var i = new (VisitHistoryRepository$getVisitHistory$o$collect$slambda())($$this$unsafeFlow, this$0, resultContinuation);
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
        this.ja6_1 = _this__u8e3s4;
        this.ka6_1 = collector;
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
                tmp_0.la6_1 = this.ka6_1;
                this.ma6_1 = this.la6_1;
                this.fd_1 = 1;
                var tmp_1 = VisitHistoryRepository$getVisitHistory$o$collect$slambda_0(this.ma6_1, this.ja6_1.oa6_1, null);
                suspendResult = this.ja6_1.na6_1.b2o(new (sam$kotlinx_coroutines_flow_FlowCollector$0())(tmp_1), this);
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
  var tmp0 = $this.ya5_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('dataStore', 1, tmp, VisitHistoryRepository$_get_dataStore_$ref_6w4c3s(), null);
  return tmp0.v1();
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.pa6_1 = function_0;
      }
      z2n(value, $completion) {
        return this.pa6_1(value, $completion);
      }
      z4() {
        return this.pa6_1;
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
function VisitHistoryRepository$dataStore$delegate$lambda($this, $qualifier, $parameters) {
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
function VisitHistoryRepository$_get_dataStore_$ref_6w4c3s() {
  return function (p0) {
    return _get_dataStore__idjja(p0);
  };
}
var VisitHistoryRepository$getVisitHistory$$inlined$map$1Class;
function VisitHistoryRepository$getVisitHistory$$inlined$map$1() {
  if (VisitHistoryRepository$getVisitHistory$$inlined$map$1Class === VOID) {
    class $ {
      constructor($this, this$0) {
        this.na6_1 = $this;
        this.oa6_1 = this$0;
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
    VisitHistoryRepository$getVisitHistory$$inlined$map$1Class = $;
  }
  return VisitHistoryRepository$getVisitHistory$$inlined$map$1Class;
}
var $getVisitHistoryCOROUTINE$Class;
function $getVisitHistoryCOROUTINE$() {
  if ($getVisitHistoryCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.ya6_1 = _this__u8e3s4;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.fd_1 = 1;
                var this_0 = _get_dataStore__idjja(this.ya6_1).e9w();
                suspendResult = first(new (VisitHistoryRepository$getVisitHistory$$inlined$map$1())(this_0, this.ya6_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var encoded = suspendResult;
                if (encoded == null || isBlank(encoded)) {
                  return new (VisitHistory())();
                }

                var TRY_RESULT;
                this.gd_1 = 2;
                var this_1 = get_json();
                var this_2 = this_1.k14();
                var this_3 = serializer(this_2, createKType(getKClass(VisitHistory()), arrayOf([]), false));
                TRY_RESULT = this_1.o10(isInterface(this_3, KSerializer()) ? this_3 : THROW_CCE(), encoded);
                this.gd_1 = 4;
                this.fd_1 = 3;
                continue $sm;
              case 2:
                this.gd_1 = 4;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Exception()) {
                  var e = this.id_1;
                  TRY_RESULT = new (VisitHistory())();
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 3:
                this.gd_1 = 4;
                return TRY_RESULT;
              case 4:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 4) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $getVisitHistoryCOROUTINE$Class = $;
  }
  return $getVisitHistoryCOROUTINE$Class;
}
var VisitHistoryRepositoryClass;
function VisitHistoryRepository() {
  if (VisitHistoryRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.ya5_1 = lazy(mode, VisitHistoryRepository$dataStore$delegate$lambda(this, null, null));
        this.za5_1 = Mutex();
        this.aa6_1 = stringPreferencesKey('visit_history');
      }
      ia5($completion) {
        var tmp = new ($getVisitHistoryCOROUTINE$())(this, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'VisitHistoryRepository', VisitHistoryRepository, VOID, [IVisitHistoryRepository(), KoinComponent()], [0, 1]);
    VisitHistoryRepositoryClass = $;
  }
  return VisitHistoryRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_VisitHistoryRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockVisitHistoryRepository$stable = 8;
//endregion
//region block: exports
export {
  IVisitHistoryRepository as IVisitHistoryRepository38cqucadolvba,
  VisitHistoryRepository as VisitHistoryRepository35gkp6h6pg1ze,
};
//endregion

//# sourceMappingURL=VisitHistoryRepository.mjs.map
