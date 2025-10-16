import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { MobileBackendClientz9b3ukda94t9 as MobileBackendClient } from '../network/MobileBackendClient.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { path4k5mr8826y5 as path } from '../../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  Companion_instance37ylmo65iquf4 as Companion_instance,
  Ok3b20rn08cfbo3 as Ok,
  Errorw1uxmtp4dqlz as Error_0,
} from '../model/response/ApiResult.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { ScheduleResponse3fcyp336niye as ScheduleResponse } from '../model/response/ScheduleResponse.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ResponseException2ofl6x4wye9sn as ResponseException } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultResponseValidation.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_SchedulesRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockScheduleRepository$stable;
var com_mbta_tid_mbta_app_repositories_IdleScheduleRepository$stable;
var ISchedulesRepositoryClass;
function ISchedulesRepository() {
  if (ISchedulesRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ISchedulesRepository', VOID, VOID, VOID, [2, 1]);
    ISchedulesRepositoryClass = $;
  }
  return ISchedulesRepositoryClass;
}
function _get_mobileBackendClient__q975cc($this) {
  var tmp0 = $this.la0_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('mobileBackendClient', 1, tmp, SchedulesRepository$_get_mobileBackendClient_$ref_fh11xh(), null);
  return tmp0.v1();
}
function SchedulesRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
  return function () {
    var tmp0 = $this;
    var tmp2 = $qualifier;
    // Inline function 'org.koin.core.component.get' call
    var parameters = $parameters;
    var tmp;
    if (isInterface(tmp0, KoinScopeComponent())) {
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.t7v().n7z(getKClass(MobileBackendClient()), tmp2, parameters);
    } else {
      // Inline function 'org.koin.core.Koin.get' call
      // Inline function 'org.koin.core.scope.Scope.get' call
      tmp = tmp0.r7v().r7u_1.e7v_1.n7z(getKClass(MobileBackendClient()), tmp2, parameters);
    }
    return tmp;
  };
}
function SchedulesRepository$_get_mobileBackendClient_$ref_fh11xh() {
  return function (p0) {
    return _get_mobileBackendClient__q975cc(p0);
  };
}
function SchedulesRepository$getSchedule$lambda$lambda($stopIds, $now) {
  return function ($this$url, it) {
    path($this$url, ['api/schedules']);
    $this$url.v3y_1.j3j('stop_ids', joinToString($stopIds, ','));
    $this$url.v3y_1.j3j('date_time', $now.toString());
    return Unit_instance;
  };
}
function SchedulesRepository$getSchedule$lambda($stopIds, $now) {
  return function ($this$get) {
    $this$get.l5p(SchedulesRepository$getSchedule$lambda$lambda($stopIds, $now));
    return Unit_instance;
  };
}
var $getScheduleCOROUTINE$Class;
function $getScheduleCOROUTINE$() {
  if ($getScheduleCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, stopIds, now, resultContinuation) {
        super(resultContinuation);
        this.ua0_1 = _this__u8e3s4;
        this.va0_1 = stopIds;
        this.wa0_1 = now;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                var tmp_0 = this;
                tmp_0.xa0_1 = Companion_instance;
                this.ya0_1 = this.xa0_1;
                this.gd_1 = 3;
                this.fd_1 = 1;
                var tmp_1 = _get_mobileBackendClient__q975cc(this.ua0_1);
                suspendResult = tmp_1.h9s(SchedulesRepository$getSchedule$lambda(this.va0_1, this.wa0_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.aa1_1 = suspendResult;
                this.ba1_1 = this.aa1_1;
                this.fd_1 = 2;
                var tmp_2 = this.ba1_1.d4s();
                var tmp_3 = getKClass(ScheduleResponse());
                var tmp_4;
                try {
                  tmp_4 = createKType(getKClass(ScheduleResponse()), arrayOf([]), false);
                } catch ($p) {
                  var tmp_5;
                  if ($p instanceof Error) {
                    var _unused_var__etf5q3 = $p;
                    tmp_5 = null;
                  } else {
                    throw $p;
                  }
                  tmp_4 = tmp_5;
                }

                suspendResult = tmp_2.a4s(new (TypeInfo())(tmp_3, tmp_4), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var ARGUMENT = suspendResult instanceof ScheduleResponse() ? suspendResult : THROW_CCE();
                this.za0_1 = new (Ok())(ARGUMENT);
                this.gd_1 = 4;
                this.fd_1 = 5;
                continue $sm;
              case 3:
                this.gd_1 = 4;
                var tmp_6 = this.id_1;
                if (tmp_6 instanceof ResponseException()) {
                  var e = this.id_1;
                  var tmp_7 = this;
                  var tmp_8 = e.z51_1.m4s().g3y_1;
                  var tmp0_elvis_lhs = e.message;
                  tmp_7.za0_1 = new (Error_0())(tmp_8, tmp0_elvis_lhs == null ? e.toString() : tmp0_elvis_lhs);
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  var tmp_9 = this.id_1;
                  if (tmp_9 instanceof Error) {
                    var e_0 = this.id_1;
                    var tmp_10 = this;
                    var tmp_11;
                    if (e_0 instanceof ResponseException()) {
                      tmp_11 = e_0.z51_1.m4s().g3y_1;
                    } else {
                      tmp_11 = null;
                    }
                    var code = tmp_11;
                    var tmp1_elvis_lhs = e_0.message;
                    tmp_10.za0_1 = new (Error_0())(code, tmp1_elvis_lhs == null ? e_0.toString() : tmp1_elvis_lhs);
                    this.fd_1 = 5;
                    continue $sm;
                  } else {
                    throw this.id_1;
                  }
                }

              case 4:
                throw this.id_1;
              case 5:
                this.gd_1 = 4;
                return this.za0_1;
            }
          } catch ($p) {
            var e_1 = $p;
            if (this.gd_1 === 4) {
              throw e_1;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_1;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $getScheduleCOROUTINE$Class = $;
  }
  return $getScheduleCOROUTINE$Class;
}
var SchedulesRepositoryClass;
function SchedulesRepository() {
  if (SchedulesRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.la0_1 = lazy(mode, SchedulesRepository$mobileBackendClient$delegate$lambda(this, null, null));
      }
      ka0(stopIds, now, $completion) {
        var tmp = new ($getScheduleCOROUTINE$())(this, stopIds, now, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'SchedulesRepository', SchedulesRepository, VOID, [ISchedulesRepository(), KoinComponent()], [2, 1]);
    SchedulesRepositoryClass = $;
  }
  return SchedulesRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_SchedulesRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockScheduleRepository$stable = 0;
com_mbta_tid_mbta_app_repositories_IdleScheduleRepository$stable = 0;
//endregion
//region block: exports
export {
  ISchedulesRepository as ISchedulesRepository3iopyft7sy2ox,
  SchedulesRepository as SchedulesRepositoryj34sqgaiv4zk,
};
//endregion

//# sourceMappingURL=SchedulesRepository.mjs.map
