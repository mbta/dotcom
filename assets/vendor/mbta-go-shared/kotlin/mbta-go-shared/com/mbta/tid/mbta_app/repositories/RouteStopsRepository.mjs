import {
  $serializer_getInstance73qavcavwh9w as $serializer_getInstance,
  RouteBranchSegment2uy1yjp4z04j4 as RouteBranchSegment,
} from '../model/RouteBranchSegment.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { MobileBackendClientz9b3ukda94t9 as MobileBackendClient } from '../network/MobileBackendClient.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { path4k5mr8826y5 as path } from '../../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import {
  Companion_instance37ylmo65iquf4 as Companion_instance,
  Ok3b20rn08cfbo3 as Ok,
  Errorw1uxmtp4dqlz as Error_0,
} from '../model/response/ApiResult.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { KtList3hktaavzmj137 as KtList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { ResponseException2ofl6x4wye9sn as ResponseException } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultResponseValidation.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_RouteStopsResult_$serializer$stable;
var com_mbta_tid_mbta_app_repositories_RouteStopsResult$stable;
var com_mbta_tid_mbta_app_repositories_RouteStopsRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockRouteStopsRepository$stable;
function RouteStopsResult$Companion$$childSerializers$_anonymous__bq7e9x() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.o9z_1 = [null, null, lazy(tmp_0, RouteStopsResult$Companion$$childSerializers$_anonymous__bq7e9x)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 === VOID)
    new (Companion())();
  return Companion_instance_0;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.repositories.RouteStopsResult', this, 3);
        tmp0_serialDesc.p1b('routeId', false);
        tmp0_serialDesc.p1b('directionId', false);
        tmp0_serialDesc.p1b('segments', false);
        this.p9z_1 = tmp0_serialDesc;
      }
      q9z(encoder, value) {
        var tmp0_desc = this.p9z_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().o9z_1;
        tmp1_output.l15(tmp0_desc, 0, value.p9c_1);
        tmp1_output.g15(tmp0_desc, 1, value.q9c_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.r9c_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.q9z(encoder, value instanceof RouteStopsResult() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.p9z_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        var tmp8_cached = Companion_getInstance().o9z_1;
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return RouteStopsResult().r9z(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.p9z_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().o9z_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), tmp0_cached[2].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_0() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var RouteStopsResultClass;
function RouteStopsResult() {
  if (RouteStopsResultClass === VOID) {
    class $ {
      constructor(routeId, directionId, segments) {
        Companion_getInstance();
        this.p9c_1 = routeId;
        this.q9c_1 = directionId;
        this.r9c_1 = segments;
      }
      toString() {
        return 'RouteStopsResult(routeId=' + this.p9c_1 + ', directionId=' + this.q9c_1 + ', segments=' + toString(this.r9c_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.p9c_1);
        result = imul(result, 31) + this.q9c_1 | 0;
        result = imul(result, 31) + hashCode(this.r9c_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteStopsResult()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteStopsResult() ? other : THROW_CCE();
        if (!(this.p9c_1 === tmp0_other_with_cast.p9c_1))
          return false;
        if (!(this.q9c_1 === tmp0_other_with_cast.q9c_1))
          return false;
        if (!equals(this.r9c_1, tmp0_other_with_cast.r9c_1))
          return false;
        return true;
      }
      static r9z(seen0, routeId, directionId, segments, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_0().p9z_1);
        }
        var $this = createThis(this);
        $this.p9c_1 = routeId;
        $this.q9c_1 = directionId;
        $this.r9c_1 = segments;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteStopsResult', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    RouteStopsResultClass = $;
  }
  return RouteStopsResultClass;
}
var IRouteStopsRepositoryClass;
function IRouteStopsRepository() {
  if (IRouteStopsRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IRouteStopsRepository', VOID, VOID, VOID, [2]);
    IRouteStopsRepositoryClass = $;
  }
  return IRouteStopsRepositoryClass;
}
function _get_mobileBackendClient__q975cc($this) {
  var tmp0 = $this.t9z_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('mobileBackendClient', 1, tmp, RouteStopsRepository$_get_mobileBackendClient_$ref_8i4c4x(), null);
  return tmp0.v1();
}
function RouteStopsRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
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
function RouteStopsRepository$_get_mobileBackendClient_$ref_8i4c4x() {
  return function (p0) {
    return _get_mobileBackendClient__q975cc(p0);
  };
}
function RouteStopsRepository$getRouteSegments$lambda$lambda($routeId, $directionId) {
  return function ($this$url, it) {
    path($this$url, ['api/route/stop-graph']);
    $this$url.v3y_1.j3j('route_id', $routeId);
    $this$url.v3y_1.j3j('direction_id', $directionId.toString());
    return Unit_instance;
  };
}
function RouteStopsRepository$getRouteSegments$lambda($routeId, $directionId) {
  return function ($this$get) {
    $this$get.l5p(RouteStopsRepository$getRouteSegments$lambda$lambda($routeId, $directionId));
    return Unit_instance;
  };
}
var $getRouteSegmentsCOROUTINE$Class;
function $getRouteSegmentsCOROUTINE$() {
  if ($getRouteSegmentsCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, routeId, directionId, resultContinuation) {
        super(resultContinuation);
        this.ca0_1 = _this__u8e3s4;
        this.da0_1 = routeId;
        this.ea0_1 = directionId;
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
                tmp_0.fa0_1 = Companion_instance;
                this.ga0_1 = this.fa0_1;
                this.gd_1 = 3;
                this.fd_1 = 1;
                var tmp_1 = _get_mobileBackendClient__q975cc(this.ca0_1);
                suspendResult = tmp_1.h9s(RouteStopsRepository$getRouteSegments$lambda(this.da0_1, this.ea0_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.ia0_1 = suspendResult;
                this.ja0_1 = this.ia0_1;
                this.fd_1 = 2;
                var tmp_2 = this.ja0_1.d4s();
                var tmp_3 = getKClass(KtList());
                var tmp_4;
                try {
                  tmp_4 = createKType(getKClass(KtList()), arrayOf([createInvariantKTypeProjection(createKType(getKClass(RouteBranchSegment()), arrayOf([]), false))]), false);
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
                var response = (!(suspendResult == null) ? isInterface(suspendResult, KtList()) : false) ? suspendResult : THROW_CCE();
                var ARGUMENT = new (RouteStopsResult())(this.da0_1, this.ea0_1, response);
                this.ha0_1 = new (Ok())(ARGUMENT);
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
                  tmp_7.ha0_1 = new (Error_0())(tmp_8, tmp0_elvis_lhs == null ? e.toString() : tmp0_elvis_lhs);
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
                    tmp_10.ha0_1 = new (Error_0())(code, tmp1_elvis_lhs == null ? e_0.toString() : tmp1_elvis_lhs);
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
                return this.ha0_1;
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
    $getRouteSegmentsCOROUTINE$Class = $;
  }
  return $getRouteSegmentsCOROUTINE$Class;
}
var RouteStopsRepositoryClass;
function RouteStopsRepository() {
  if (RouteStopsRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.t9z_1 = lazy(mode, RouteStopsRepository$mobileBackendClient$delegate$lambda(this, null, null));
      }
      s9z(routeId, directionId, $completion) {
        var tmp = new ($getRouteSegmentsCOROUTINE$())(this, routeId, directionId, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'RouteStopsRepository', RouteStopsRepository, VOID, [IRouteStopsRepository(), KoinComponent()], [2]);
    RouteStopsRepositoryClass = $;
  }
  return RouteStopsRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_RouteStopsResult_$serializer$stable = 8;
com_mbta_tid_mbta_app_repositories_RouteStopsResult$stable = 8;
com_mbta_tid_mbta_app_repositories_RouteStopsRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockRouteStopsRepository$stable = 0;
//endregion
//region block: exports
export {
  IRouteStopsRepository as IRouteStopsRepository31e6hyms33kh2,
  RouteStopsRepository as RouteStopsRepository13h3yoea8tniz,
  RouteStopsResult as RouteStopsResult16qz48voa9r8x,
};
//endregion

//# sourceMappingURL=RouteStopsRepository.mjs.map
