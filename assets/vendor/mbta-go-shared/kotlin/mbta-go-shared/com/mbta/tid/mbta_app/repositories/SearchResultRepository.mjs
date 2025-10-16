import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { mapOf2zpbbmyqk8xpf as mapOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
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
import { SearchResponse3pd5220t044fi as SearchResponse } from '../model/response/SearchResponse.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ResponseException2ofl6x4wye9sn as ResponseException } from '../../../../../../ktor-ktor-client-core/io/ktor/client/plugins/DefaultResponseValidation.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/PlatformTools.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { mutableMapOfk2y3zt1azl40 as mutableMapOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  getKoin1a1yjjyj0b4v7 as getKoin,
  KoinComponent2sujxij3104ma as KoinComponent,
} from '../../../../../../projects-core-koin-core/org/koin/core/component/KoinComponent.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_repositories_SearchResultRepository$stable;
var com_mbta_tid_mbta_app_repositories_MockSearchResultRepository$stable;
var com_mbta_tid_mbta_app_repositories_IdleSearchResultRepository$stable;
var ISearchResultRepositoryClass;
function ISearchResultRepository() {
  if (ISearchResultRepositoryClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ISearchResultRepository', VOID, VOID, VOID, [3, 1]);
    ISearchResultRepositoryClass = $;
  }
  return ISearchResultRepositoryClass;
}
function _get_mobileBackendClient__q975cc($this) {
  var tmp0 = $this.ea1_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('mobileBackendClient', 1, tmp, SearchResultRepository$_get_mobileBackendClient_$ref_q7625q(), null);
  return tmp0.v1();
}
function searchRequest($this, endpoint, params, $completion) {
  var tmp = new ($searchRequestCOROUTINE$())($this, endpoint, params, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function searchRequest_0($this, endpoint, query, $completion) {
  if (query === '')
    return null;
  return searchRequest($this, endpoint, mapOf(to('query', query)), $completion);
}
function SearchResultRepository$mobileBackendClient$delegate$lambda($this, $qualifier, $parameters) {
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
function SearchResultRepository$_get_mobileBackendClient_$ref_q7625q() {
  return function (p0) {
    return _get_mobileBackendClient__q975cc(p0);
  };
}
function SearchResultRepository$searchRequest$lambda$lambda($endpoint, $params) {
  return function ($this$url, it) {
    path($this$url, [$endpoint]);
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = $params.t1().x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      // Inline function 'kotlin.collections.component1' call
      var name = element.u1();
      // Inline function 'kotlin.collections.component2' call
      var value = element.v1();
      $this$url.v3y_1.j3j(name, value);
    }
    return Unit_instance;
  };
}
function SearchResultRepository$searchRequest$lambda($endpoint, $params) {
  return function ($this$get) {
    $this$get.l5p(SearchResultRepository$searchRequest$lambda$lambda($endpoint, $params));
    return Unit_instance;
  };
}
function SearchResultRepository$getRouteFilterResults$lambda(type) {
  return type.w9e();
}
var $searchRequestCOROUTINE$Class;
function $searchRequestCOROUTINE$() {
  if ($searchRequestCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, endpoint, params, resultContinuation) {
        super(resultContinuation);
        this.na1_1 = _this__u8e3s4;
        this.oa1_1 = endpoint;
        this.pa1_1 = params;
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
                tmp_0.qa1_1 = Companion_instance;
                this.ra1_1 = this.qa1_1;
                this.gd_1 = 3;
                this.fd_1 = 1;
                var tmp_1 = _get_mobileBackendClient__q975cc(this.na1_1);
                suspendResult = tmp_1.h9s(SearchResultRepository$searchRequest$lambda(this.oa1_1, this.pa1_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.ta1_1 = suspendResult;
                this.ua1_1 = this.ta1_1;
                this.fd_1 = 2;
                var tmp_2 = this.ua1_1.d4s();
                var tmp_3 = getKClass(SearchResponse());
                var tmp_4;
                try {
                  tmp_4 = createKType(getKClass(SearchResponse()), arrayOf([]), false);
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
                var ARGUMENT = suspendResult instanceof SearchResponse() ? suspendResult : THROW_CCE();
                var ARGUMENT_0 = ARGUMENT.c9p_1;
                this.sa1_1 = new (Ok())(ARGUMENT_0);
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
                  tmp_7.sa1_1 = new (Error_0())(tmp_8, tmp0_elvis_lhs == null ? e.toString() : tmp0_elvis_lhs);
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
                    tmp_10.sa1_1 = new (Error_0())(code, tmp1_elvis_lhs == null ? e_0.toString() : tmp1_elvis_lhs);
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
                return this.sa1_1;
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
    $searchRequestCOROUTINE$Class = $;
  }
  return $searchRequestCOROUTINE$Class;
}
var SearchResultRepositoryClass;
function SearchResultRepository() {
  if (SearchResultRepositoryClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'org.koin.core.component.inject' call
        var mode = KoinPlatformTools_instance.s7z();
        tmp.ea1_1 = lazy(mode, SearchResultRepository$mobileBackendClient$delegate$lambda(this, null, null));
      }
      ca1(query, lineIds, routeTypes, $completion) {
        if (query === '')
          return null;
        var params = mutableMapOf([to('query', query)]);
        if (lineIds == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          params.t3('line_id', joinToString(lineIds, ','));
        }
        if (routeTypes == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          params.t3('type', joinToString(routeTypes, ',', VOID, VOID, VOID, VOID, SearchResultRepository$getRouteFilterResults$lambda));
        }
        return searchRequest(this, 'api/search/routes', params, $completion);
      }
      da1(query, $completion) {
        return searchRequest_0(this, 'api/search/query', query, $completion);
      }
    }
    protoOf($).r7v = getKoin;
    initMetadataForClass($, 'SearchResultRepository', SearchResultRepository, VOID, [KoinComponent(), ISearchResultRepository()], [2, 3, 1]);
    SearchResultRepositoryClass = $;
  }
  return SearchResultRepositoryClass;
}
//region block: init
com_mbta_tid_mbta_app_repositories_SearchResultRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_MockSearchResultRepository$stable = 8;
com_mbta_tid_mbta_app_repositories_IdleSearchResultRepository$stable = 0;
//endregion
//region block: exports
export {
  ISearchResultRepository as ISearchResultRepositoryukemhfr4a8v6,
  SearchResultRepository as SearchResultRepositorymblsp2t90rpg,
};
//endregion

//# sourceMappingURL=SearchResultRepository.mjs.map
