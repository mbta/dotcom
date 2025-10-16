import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  throwKotlinNothingValueException2lxmvl03dor6f as throwKotlinNothingValueException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { GlobalResponse31u5crlky5fkx as GlobalResponse } from '../model/response/GlobalResponse.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { FunctionAdapter3lcrrz3moet5b as FunctionAdapter } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/FunctionAdapter.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { FlowCollector26clgpmzihvke as FlowCollector } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/flow/FlowCollector.mjs';
import { Ok3b20rn08cfbo3 as Ok } from '../model/response/ApiResult.mjs';
import {
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  CoroutineScopelux7s7zphw7e as CoroutineScope_0,
} from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_usecases_AlertsUsecase$stable;
var AlertsUsecase$connect$slambda$slambdaClass;
function AlertsUsecase$connect$slambda$slambda() {
  if (AlertsUsecase$connect$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $onReceive, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.baa_1 = this$0;
        $box.caa_1 = $onReceive;
        super(resultContinuation, $box);
      }
      eaa(global, $completion) {
        var tmp = this.faa(global, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.eaa((p1 == null ? true : p1 instanceof GlobalResponse()) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              var tmp0_safe_receiver = this.baa_1.iaa_1;
              if (tmp0_safe_receiver == null)
                null;
              else {
                this.caa_1(tmp0_safe_receiver.g9n(tmp0_safe_receiver.f9n_1.d9n(this.daa_1)));
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
      faa(global, completion) {
        var i = new (AlertsUsecase$connect$slambda$slambda())(this.baa_1, this.caa_1, completion);
        i.daa_1 = global;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    AlertsUsecase$connect$slambda$slambdaClass = $;
  }
  return AlertsUsecase$connect$slambda$slambdaClass;
}
function AlertsUsecase$connect$slambda$slambda_0(this$0, $onReceive, resultContinuation) {
  var i = new (AlertsUsecase$connect$slambda$slambda())(this$0, $onReceive, resultContinuation);
  var l = function (global, $completion) {
    return i.eaa(global, $completion);
  };
  l.$arity = 1;
  return l;
}
var sam$kotlinx_coroutines_flow_FlowCollector$0Class;
function sam$kotlinx_coroutines_flow_FlowCollector$0() {
  if (sam$kotlinx_coroutines_flow_FlowCollector$0Class === VOID) {
    class $ {
      constructor(function_0) {
        this.laa_1 = function_0;
      }
      z2n(value, $completion) {
        return this.laa_1(value, $completion);
      }
      z4() {
        return this.laa_1;
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
function connect$injectAndReceive(this$0, $onReceive, result) {
  var tmp;
  if (result instanceof Ok()) {
    this$0.iaa_1 = result;
    tmp = result.g9n(result.f9n_1.d9n(this$0.jaa_1.v1()));
  } else {
    tmp = result;
  }
  var injectedResult = tmp;
  $onReceive(injectedResult);
}
function AlertsUsecase$connect$injectAndReceive$ref(this$0, $onReceive) {
  var l = function (p0) {
    connect$injectAndReceive(this$0, $onReceive, p0);
    return Unit_instance;
  };
  l.callableName = 'injectAndReceive';
  return l;
}
var AlertsUsecase$connect$slambdaClass;
function AlertsUsecase$connect$slambda() {
  if (AlertsUsecase$connect$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $onReceive, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.uaa_1 = this$0;
        $box.vaa_1 = $onReceive;
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
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.fd_1 = 1;
                var tmp_0 = this.uaa_1.jaa_1;
                var tmp_1 = AlertsUsecase$connect$slambda$slambda_0(this.uaa_1, this.vaa_1, null);
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
      y3e($this$launch, completion) {
        var i = new (AlertsUsecase$connect$slambda())(this.uaa_1, this.vaa_1, completion);
        i.waa_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    AlertsUsecase$connect$slambdaClass = $;
  }
  return AlertsUsecase$connect$slambdaClass;
}
function AlertsUsecase$connect$slambda_0(this$0, $onReceive, resultContinuation) {
  var i = new (AlertsUsecase$connect$slambda())(this$0, $onReceive, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
var AlertsUsecaseClass;
function AlertsUsecase() {
  if (AlertsUsecaseClass === VOID) {
    class $ {
      constructor(alertsRepository, globalRepository, globalUpdateDispatcher) {
        var tmp;
        if (globalUpdateDispatcher === VOID) {
          var tmp0 = KoinPlatform_instance.r7v();
          // Inline function 'org.koin.core.Koin.get' call
          var qualifier = named('coroutineDispatcherIO');
          // Inline function 'org.koin.core.scope.Scope.get' call
          tmp = tmp0.r7u_1.e7v_1.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
        } else {
          tmp = globalUpdateDispatcher;
        }
        globalUpdateDispatcher = tmp;
        this.gaa_1 = alertsRepository;
        this.haa_1 = globalUpdateDispatcher;
        this.iaa_1 = null;
        this.jaa_1 = globalRepository.p9w();
        this.kaa_1 = null;
      }
      y9s(onReceive) {
        this.gaa_1.y9s(AlertsUsecase$connect$injectAndReceive$ref(this, onReceive));
        var tmp0_safe_receiver = this.kaa_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.h22();
        }
        var tmp = this;
        var tmp_0 = CoroutineScope_0(this.haa_1);
        tmp.kaa_1 = launch(tmp_0, VOID, VOID, AlertsUsecase$connect$slambda_0(this, onReceive, null));
      }
      z9s() {
        this.gaa_1.z9s();
        var tmp0_safe_receiver = this.kaa_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.h22();
        }
        this.kaa_1 = null;
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'AlertsUsecase', VOID, VOID, [KoinComponent()]);
    AlertsUsecaseClass = $;
  }
  return AlertsUsecaseClass;
}
//region block: init
com_mbta_tid_mbta_app_usecases_AlertsUsecase$stable = 8;
//endregion
//region block: exports
export {
  AlertsUsecase as AlertsUsecase1smuzc4kgc05w,
};
//endregion

//# sourceMappingURL=AlertsUsecase.mjs.map
