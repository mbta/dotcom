import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { path4k5mr8826y5 as path } from '../../../../../../ktor-ktor-http/io/ktor/http/URLBuilder.mjs';
import { timeout39ggydbhmf7b9 as timeout } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/HttpTimeout.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { header3kx6g3yb4df1r as header } from '../../../../../../ktor-ktor-client-core/io/ktor/client/request/utils.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { MobileBackendClientz9b3ukda94t9 as MobileBackendClient } from '../network/MobileBackendClient.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { KoinScopeComponent1dts4xrlxjh8s as KoinScopeComponent } from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinScopeComponent.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  Companion_instance10rwew4rqemia as Companion_instance,
  ResponseCachedykj577k9npz as ResponseCache,
} from '../cache/ResponseCache.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_HOURS_getInstancebu9fos347hpz as DurationUnit_HOURS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
import { get_json30ncetgsyi7ak as get_json } from '../Json.mjs';
import { MapFriendlyRouteResponsezyf83fz5pjlw as MapFriendlyRouteResponse } from '../model/response/MapFriendlyRouteResponse.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
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
var com_mbta_tid_mbta_app_repositories_RailRouteShapeRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockRailRouteShapeRepository$stable;
var com_mbta_tid_mbta_app_repositories_IdleRailRouteShapeRepository$stable;
var IRailRouteShapeRepositoryClass;
function IRailRouteShapeRepository() {
  if (IRailRouteShapeRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IRailRouteShapeRepository', VOID, VOID, VOID, [0]);
    IRailRouteShapeRepositoryClass = $;
  }
  return IRailRouteShapeRepositoryClass;
}
function RailRouteShapeRepository$getRailRouteShapes$slambda$lambda$lambda($this$timeout) {
  $this$timeout.w5h(new (Long())(10000, 0));
  return Unit_instance;
}
function RailRouteShapeRepository$getRailRouteShapes$slambda$lambda$lambda_0($this$url, it) {
  path($this$url, ['api/shapes/map-friendly/rail']);
  return Unit_instance;
}
function RailRouteShapeRepository$getRailRouteShapes$slambda$lambda($etag) {
  return function ($this$get) {
    timeout($this$get, RailRouteShapeRepository$getRailRouteShapes$slambda$lambda$lambda);
    $this$get.l5p(RailRouteShapeRepository$getRailRouteShapes$slambda$lambda$lambda_0);
    header($this$get, HttpHeaders_getInstance().b3s_1, $etag);
    return Unit_instance;
  };
}
function _get_mobileBackendClient__q975cc($this) {
  var tmp0 = $this.c9z_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('mobileBackendClient', 1, tmp, RailRouteShapeRepository$_get_mobileBackendClient_$ref_51r3vx(), null);
  return tmp0.v1();
}
function RailRouteShapeRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
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
function RailRouteShapeRepository$_get_mobileBackendClient_$ref_51r3vx() {
  return function (p0) {
    return _get_mobileBackendClient__q975cc(p0);
  };
}
var RailRouteShapeRepository$getRailRouteShapes$slambdaClass;
function RailRouteShapeRepository$getRailRouteShapes$slambda() {
  if (RailRouteShapeRepository$getRailRouteShapes$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.m9z_1 = this$0;
        super(resultContinuation, $box);
      }
      e9x(etag, $completion) {
        var tmp = this.f9x(etag, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.e9x((p1 == null ? true : typeof p1 === 'string') ? p1 : THROW_CCE(), $completion);
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
                var tmp_0 = _get_mobileBackendClient__q975cc(this.m9z_1);
                suspendResult = tmp_0.h9s(RailRouteShapeRepository$getRailRouteShapes$slambda$lambda(this.n9z_1), this);
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
      f9x(etag, completion) {
        var i = new (RailRouteShapeRepository$getRailRouteShapes$slambda())(this.m9z_1, completion);
        i.n9z_1 = etag;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RailRouteShapeRepository$getRailRouteShapes$slambdaClass = $;
  }
  return RailRouteShapeRepository$getRailRouteShapes$slambdaClass;
}
function RailRouteShapeRepository$getRailRouteShapes$slambda_0(this$0, resultContinuation) {
  var i = new (RailRouteShapeRepository$getRailRouteShapes$slambda())(this$0, resultContinuation);
  var l = function (etag, $completion) {
    return i.e9x(etag, $completion);
  };
  l.$arity = 1;
  return l;
}
var RailRouteShapeRepositoryClass;
function RailRouteShapeRepository() {
  if (RailRouteShapeRepositoryClass === VOID) {
    class $ {
      constructor(cache) {
        var tmp;
        if (cache === VOID) {
          var tmp2 = 'rail-route-shapes';
          // Inline function 'com.mbta.tid.mbta_app.cache.Companion.create' call
          var invalidationKey = '2025-03-19';
          // Inline function 'kotlin.time.Companion.hours' call
          Companion_getInstance();
          var maxAge = toDuration(1, DurationUnit_HOURS_getInstance());
          // Inline function 'kotlinx.serialization.serializer' call
          var this_0 = get_json().k14();
          // Inline function 'kotlinx.serialization.internal.cast' call
          var this_1 = serializer(this_0, createKType(getKClass(MapFriendlyRouteResponse()), arrayOf([]), false));
          var tmp$ret$2 = isInterface(this_1, KSerializer()) ? this_1 : THROW_CCE();
          tmp = new (ResponseCache())(tmp2, maxAge, tmp$ret$2, invalidationKey);
        } else {
          tmp = cache;
        }
        cache = tmp;
        this.b9z_1 = cache;
        var tmp_0 = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp_0.c9z_1 = lazy(mode, RailRouteShapeRepository$mobileBackendClient$delegate$lambda(this, null, null));
        this.d9z_1 = this.b9z_1.l8k_1;
      }
      a9z($completion) {
        return this.b9z_1.b8m(RailRouteShapeRepository$getRailRouteShapes$slambda_0(this, null), $completion);
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'RailRouteShapeRepository', RailRouteShapeRepository, VOID, [IRailRouteShapeRepository(), KoinComponent()], [0]);
    RailRouteShapeRepositoryClass = $;
  }
  return RailRouteShapeRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_RailRouteShapeRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockRailRouteShapeRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_IdleRailRouteShapeRepository$stable = 8;
//endregion
//region block: exports
export {
  IRailRouteShapeRepository as IRailRouteShapeRepository1o4yk596yij09,
  RailRouteShapeRepository as RailRouteShapeRepository32anjijiaqpf4,
};
//endregion

//# sourceMappingURL=RailRouteShapeRepository.mjs.map
