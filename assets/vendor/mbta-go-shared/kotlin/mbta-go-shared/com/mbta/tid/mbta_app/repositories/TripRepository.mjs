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
import { parametera70jh5jb44wd as parameter } from '../../../../../../ktor-ktor-client-core/io/ktor/client/request/utils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  Companion_instance37ylmo65iquf4 as Companion_instance,
  Ok3b20rn08cfbo3 as Ok,
  Errorw1uxmtp4dqlz as Error_0,
} from '../model/response/ApiResult.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { TripSchedulesResponse2psx5op7t9p57 as TripSchedulesResponse } from '../model/response/TripSchedulesResponse.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ResponseException2ofl6x4wye9sn as ResponseException } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultResponseValidation.mjs';
import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { TripResponsecwc650hu1vcv as TripResponse } from '../model/response/TripResponse.mjs';
import { serializer1i4e9ym37oxmo as serializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
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
var com_mbta_tid_mbta_app_repositories_TripRepository$stable;
var com_mbta_tid_mbta_app_repositories_IdleTripRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockTripRepository$stable;
var ITripRepositoryClass;
function ITripRepository() {
  if (ITripRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ITripRepository', VOID, VOID, VOID, [1]);
    ITripRepositoryClass = $;
  }
  return ITripRepositoryClass;
}
function _get_mobileBackendClient__q975cc($this) {
  var tmp0 = $this.wa3_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('mobileBackendClient', 1, tmp, TripRepository$_get_mobileBackendClient_$ref_usey0e(), null);
  return tmp0.v1();
}
function TripRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
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
function TripRepository$_get_mobileBackendClient_$ref_usey0e() {
  return function (p0) {
    return _get_mobileBackendClient__q975cc(p0);
  };
}
function TripRepository$getTripSchedules$lambda$lambda($this_get, $tripId) {
  return function ($this$url, it) {
    path($this$url, ['api/schedules']);
    parameter($this_get, 'trip_id', $tripId);
    return Unit_instance;
  };
}
function TripRepository$getTripSchedules$lambda($tripId) {
  return function ($this$get) {
    $this$get.l5p(TripRepository$getTripSchedules$lambda$lambda($this$get, $tripId));
    return Unit_instance;
  };
}
function TripRepository$getTrip$lambda$lambda($this_get, $tripId) {
  return function ($this$url, it) {
    path($this$url, ['api/trip']);
    parameter($this_get, 'trip_id', $tripId);
    return Unit_instance;
  };
}
function TripRepository$getTrip$lambda($tripId) {
  return function ($this$get) {
    $this$get.l5p(TripRepository$getTrip$lambda$lambda($this$get, $tripId));
    return Unit_instance;
  };
}
var $getTripSchedulesCOROUTINE$Class;
function $getTripSchedulesCOROUTINE$() {
  if ($getTripSchedulesCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, tripId, resultContinuation) {
        super(resultContinuation);
        this.fa4_1 = _this__u8e3s4;
        this.ga4_1 = tripId;
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
                tmp_0.ha4_1 = Companion_instance;
                this.ia4_1 = this.ha4_1;
                this.gd_1 = 3;
                this.fd_1 = 1;
                var tmp_1 = _get_mobileBackendClient__q975cc(this.fa4_1);
                suspendResult = tmp_1.h9s(TripRepository$getTripSchedules$lambda(this.ga4_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.ka4_1 = suspendResult;
                this.la4_1 = this.ka4_1;
                this.fd_1 = 2;
                var tmp_2 = this.la4_1.d4s();
                var tmp_3 = getKClass(TripSchedulesResponse());
                var tmp_4;
                try {
                  tmp_4 = createKType(getKClass(TripSchedulesResponse()), arrayOf([]), false);
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
                var ARGUMENT = suspendResult instanceof TripSchedulesResponse() ? suspendResult : THROW_CCE();
                this.ja4_1 = new (Ok())(ARGUMENT);
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
                  tmp_7.ja4_1 = new (Error_0())(tmp_8, tmp0_elvis_lhs == null ? e.toString() : tmp0_elvis_lhs);
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
                    tmp_10.ja4_1 = new (Error_0())(code, tmp1_elvis_lhs == null ? e_0.toString() : tmp1_elvis_lhs);
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
                return this.ja4_1;
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
    $getTripSchedulesCOROUTINE$Class = $;
  }
  return $getTripSchedulesCOROUTINE$Class;
}
var $getTripCOROUTINE$Class;
function $getTripCOROUTINE$() {
  if ($getTripCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, tripId, resultContinuation) {
        super(resultContinuation);
        this.ua4_1 = _this__u8e3s4;
        this.va4_1 = tripId;
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
                tmp_0.wa4_1 = Companion_instance;
                this.xa4_1 = this.wa4_1;
                this.gd_1 = 3;
                this.fd_1 = 1;
                var tmp_1 = _get_mobileBackendClient__q975cc(this.ua4_1);
                suspendResult = tmp_1.h9s(TripRepository$getTrip$lambda(this.va4_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.za4_1 = suspendResult;
                var tmp_2 = this;
                tmp_2.aa5_1 = get_json();
                var tmp_3 = this;
                tmp_3.ba5_1 = this.za4_1;
                this.ca5_1 = this.ba5_1;
                this.fd_1 = 2;
                var tmp_4 = this.ca5_1.d4s();
                var tmp_5 = PrimitiveClasses_getInstance().mi();
                var tmp_6;
                try {
                  tmp_6 = createKType(PrimitiveClasses_getInstance().mi(), arrayOf([]), false);
                } catch ($p) {
                  var tmp_7;
                  if ($p instanceof Error) {
                    var _unused_var__etf5q3 = $p;
                    tmp_7 = null;
                  } else {
                    throw $p;
                  }
                  tmp_6 = tmp_7;
                }

                suspendResult = tmp_4.a4s(new (TypeInfo())(tmp_5, tmp_6), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var tmp2 = (!(suspendResult == null) ? typeof suspendResult === 'string' : false) ? suspendResult : THROW_CCE();
                var this_0 = this.aa5_1;
                var this_1 = this_0.k14();
                var this_2 = serializer(this_1, createKType(getKClass(TripResponse()), arrayOf([]), false));
                var ARGUMENT = this_0.o10(isInterface(this_2, KSerializer()) ? this_2 : THROW_CCE(), tmp2);
                return new (Ok())(ARGUMENT);
              case 3:
                this.gd_1 = 4;
                var tmp_8 = this.id_1;
                if (tmp_8 instanceof ResponseException()) {
                  var e = this.id_1;
                  var tmp_9 = this;
                  var tmp_10 = e.z51_1.m4s().g3y_1;
                  var tmp0_elvis_lhs = e.message;
                  tmp_9.ya4_1 = new (Error_0())(tmp_10, tmp0_elvis_lhs == null ? e.toString() : tmp0_elvis_lhs);
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  var tmp_11 = this.id_1;
                  if (tmp_11 instanceof Error) {
                    var e_0 = this.id_1;
                    var tmp_12 = this;
                    var tmp_13;
                    if (e_0 instanceof ResponseException()) {
                      tmp_13 = e_0.z51_1.m4s().g3y_1;
                    } else {
                      tmp_13 = null;
                    }
                    var code = tmp_13;
                    var tmp1_elvis_lhs = e_0.message;
                    tmp_12.ya4_1 = new (Error_0())(code, tmp1_elvis_lhs == null ? e_0.toString() : tmp1_elvis_lhs);
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
                return this.ya4_1;
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
    $getTripCOROUTINE$Class = $;
  }
  return $getTripCOROUTINE$Class;
}
var TripRepositoryClass;
function TripRepository() {
  if (TripRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.wa3_1 = lazy(mode, TripRepository$mobileBackendClient$delegate$lambda(this, null, null));
      }
      ua3(tripId, $completion) {
        var tmp = new ($getTripSchedulesCOROUTINE$())(this, tripId, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      va3(tripId, $completion) {
        var tmp = new ($getTripCOROUTINE$())(this, tripId, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'TripRepository', TripRepository, VOID, [ITripRepository(), KoinComponent()], [1]);
    TripRepositoryClass = $;
  }
  return TripRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_TripRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_IdleTripRepository$stable = 0;
com_mbta_tid_mbta_app_repositories_MockTripRepository$stable = 8;
//endregion
//region block: exports
export {
  ITripRepository as ITripRepositoryrl4c5in4vd4b,
  TripRepository as TripRepository2baeui5rjejuw,
};
//endregion

//# sourceMappingURL=TripRepository.mjs.map
