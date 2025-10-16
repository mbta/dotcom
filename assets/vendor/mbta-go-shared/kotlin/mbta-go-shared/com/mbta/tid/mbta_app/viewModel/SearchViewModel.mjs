import {
  StopSearchResultRoute1oelvk7kh1inn as StopSearchResultRoute,
  Context_Default_getInstance2bg4pqekotpi0 as Context_Default_getInstance,
  Context_SearchStation_getInstancea2s8r69gkebo as Context_SearchStation_getInstance,
  RoutePillSpec2c27q4ewrv5n8 as RoutePillSpec,
  Type_FlexCompact_getInstancee0t58wau7o1x as Type_FlexCompact_getInstance,
  Height_Small_getInstance19z76gof0olgm as Height_Small_getInstance,
  Type_Fixed_getInstance911fyfz5iim5 as Type_Fixed_getInstance,
} from '../model/RoutePillSpec.mjs';
import {
  RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance,
  RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv as RouteType_COMMUTER_RAIL_getInstance,
} from '../model/RouteType.mjs';
import { get_silverRoutessxztys6i4f4z as get_silverRoutes } from '../model/MapStopRoute.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { LocationType_STATION_getInstancebecdlasuojyi as LocationType_STATION_getInstance } from '../model/LocationType.mjs';
import {
  sorted354mfsiv4s7x5 as sorted,
  distinct10qe1scfdvu5k as distinct,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { delayolwo40i9ucjz as delay } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Delay.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  Errorw1uxmtp4dqlz as Error_0,
  Ok3b20rn08cfbo3 as Ok,
} from '../model/response/ApiResult.mjs';
import {
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty025txtn5b59pq1 as KMutableProperty0,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import {
  getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef,
  getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { StopVisittp1rzgviw50g as StopVisit } from '../history/Visit.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import { KoinPlatform_instance1hins6zdjrg2h as KoinPlatform_instance } from '../../../../../../projects-core-koin-core/org/koin/mp/KoinPlatform.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { collectAsState1hcbu3nagg85r as collectAsState } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotFlow.mjs';
import {
  LaunchedEffect1xc4bdzax6uqz as LaunchedEffect,
  LaunchedEffect3nylcp830dck0 as LaunchedEffect_0,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Effects.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_Event_RefreshHistory$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Loading$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_RecentStops$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Results$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Error$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_State$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_StopResult$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel_RouteResult$stable;
var com_mbta_tid_mbta_app_viewModel_SearchViewModel$stable;
var com_mbta_tid_mbta_app_viewModel_MockSearchViewModel$stable;
function stopRouteContentDescription(isStation, route) {
  if (get_silverRoutes().j1(route.o8r_1) && isStation) {
    var routeName = 'Silver Line';
    return new (StopSearchResultRoute())(routeName, route.p8r_1, false);
  } else if (route.p8r_1.equals(RouteType_COMMUTER_RAIL_getInstance()) && isStation) {
    var routeName_0 = 'Commuter Rail';
    return new (StopSearchResultRoute())(routeName_0, route.p8r_1, false);
  } else if (route.p8r_1.equals(RouteType_BUS_getInstance()) && isStation) {
    return new (StopSearchResultRoute())(null, route.p8r_1, false);
  } else {
    return new (StopSearchResultRoute())(route.a8s_1, route.p8r_1, true);
  }
}
var ISearchViewModelClass;
function ISearchViewModel() {
  if (ISearchViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ISearchViewModel');
    ISearchViewModelClass = $;
  }
  return ISearchViewModelClass;
}
var RefreshHistoryClass;
function RefreshHistory() {
  if (RefreshHistoryClass === VOID) {
    class $ {
      toString() {
        return 'RefreshHistory';
      }
      hashCode() {
        return -327393067;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RefreshHistory()))
          return false;
        other instanceof RefreshHistory() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'RefreshHistory', VOID, VOID, [Event()]);
    RefreshHistoryClass = $;
  }
  return RefreshHistoryClass;
}
var RefreshHistory_instance;
function RefreshHistory_getInstance() {
  return RefreshHistory_instance;
}
var LoadingClass;
function Loading() {
  if (LoadingClass === VOID) {
    class $ extends State() {
      constructor() {
        Loading_instance = null;
        super();
        Loading_instance = this;
      }
      toString() {
        return 'Loading';
      }
      hashCode() {
        return -1360490473;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Loading()))
          return false;
        other instanceof Loading() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Loading');
    LoadingClass = $;
  }
  return LoadingClass;
}
var Loading_instance;
function Loading_getInstance() {
  if (Loading_instance === VOID)
    new (Loading())();
  return Loading_instance;
}
var RecentStopsClass;
function RecentStops() {
  if (RecentStopsClass === VOID) {
    class $ extends State() {
      constructor(stops) {
        super();
        this.kb3_1 = stops;
      }
      toString() {
        return 'RecentStops(stops=' + toString(this.kb3_1) + ')';
      }
      hashCode() {
        return hashCode(this.kb3_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RecentStops()))
          return false;
        var tmp0_other_with_cast = other instanceof RecentStops() ? other : THROW_CCE();
        if (!equals(this.kb3_1, tmp0_other_with_cast.kb3_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RecentStops');
    RecentStopsClass = $;
  }
  return RecentStopsClass;
}
var ResultsClass;
function Results() {
  if (ResultsClass === VOID) {
    class $ extends State() {
      constructor(stops, routes) {
        super();
        this.lb3_1 = stops;
        this.mb3_1 = routes;
      }
      toString() {
        return 'Results(stops=' + toString(this.lb3_1) + ', routes=' + toString(this.mb3_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.lb3_1);
        result = imul(result, 31) + hashCode(this.mb3_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Results()))
          return false;
        var tmp0_other_with_cast = other instanceof Results() ? other : THROW_CCE();
        if (!equals(this.lb3_1, tmp0_other_with_cast.lb3_1))
          return false;
        if (!equals(this.mb3_1, tmp0_other_with_cast.mb3_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Results');
    ResultsClass = $;
  }
  return ResultsClass;
}
var ErrorClass;
function Error_1() {
  if (ErrorClass === VOID) {
    class $ extends State() {
      constructor() {
        Error_instance = null;
        super();
        Error_instance = this;
      }
      toString() {
        return 'Error';
      }
      hashCode() {
        return -119506013;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Error_1()))
          return false;
        other instanceof Error_1() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Error');
    ErrorClass = $;
  }
  return ErrorClass;
}
var Error_instance;
function Error_getInstance() {
  if (Error_instance === VOID)
    new (Error_1())();
  return Error_instance;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      nb3(stopId, globalData) {
        var tmp1_elvis_lhs = globalData == null ? null : globalData.a9b(stopId);
        var tmp;
        if (tmp1_elvis_lhs == null) {
          return null;
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var stop = tmp;
        var isStation = stop.z8q_1.equals(LocationType_STATION_getInstance());
        var routes = globalData.p9n(stopId);
        // Inline function 'kotlin.collections.map' call
        var this_0 = sorted(routes);
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var line = globalData.n9n(item.y8r_1);
          var context = isStation ? Context_SearchStation_getInstance() : Context_Default_getInstance();
          var tmp$ret$0 = RoutePillSpec().z9d(item, line, Type_FlexCompact_getInstance(), Height_Small_getInstance(), context, stopRouteContentDescription(isStation, item));
          destination.i(tmp$ret$0);
        }
        var routePills = destination;
        return new (StopResult())(stop.v8q_1, isStation, stop.y8q_1, distinct(routePills));
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_1() {
  return Companion_instance;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      ob3(objectId, globalData) {
        var route = globalData == null ? null : globalData.s97(objectId);
        var line = globalData == null ? null : globalData.n9n(objectId);
        var routePillSpec = RoutePillSpec().z9d(route, line, Type_Fixed_getInstance(), VOID, Context_Default_getInstance());
        var tmp3_elvis_lhs = line == null ? null : line.x92_1;
        var tmp;
        if (tmp3_elvis_lhs == null) {
          tmp = route == null ? null : route.u8r_1;
        } else {
          tmp = tmp3_elvis_lhs;
        }
        var tmp5_elvis_lhs = tmp;
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp5_elvis_lhs;
        }
        return new (RouteResult())(objectId, tmp_0, routePillSpec);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_2() {
  return Companion_instance_0;
}
var SearchViewModel$runLogic$slambda$slambdaClass;
function SearchViewModel$runLogic$slambda$slambda() {
  if (SearchViewModel$runLogic$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $globalData$delegate, $state$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.xb3_1 = this$0;
        $box.yb3_1 = $globalData$delegate;
        $box.zb3_1 = $state$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
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
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = delay(new (Long())(500, 0), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.xb3_1.gb4_1.da1(_get_query__c6g9vb(this.xb3_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var data = suspendResult;
                if (data instanceof Ok()) {
                  var tmp0 = data.f9n_1.q9f_1;
                  var destination = ArrayList().g1();
                  var _iterator__ex2g4s = tmp0.x();
                  while (_iterator__ex2g4s.y()) {
                    var element = _iterator__ex2g4s.z();
                    var tmp0_safe_receiver = Companion_instance.nb3(element.y9h_1, runLogic$lambda(this.yb3_1));
                    if (tmp0_safe_receiver == null)
                      null;
                    else {
                      destination.i(tmp0_safe_receiver);
                    }
                  }
                  var tmp0_0 = data.f9n_1.p9f_1;
                  var destination_0 = ArrayList().g1();
                  var _iterator__ex2g4s_0 = tmp0_0.x();
                  while (_iterator__ex2g4s_0.y()) {
                    var element_0 = _iterator__ex2g4s_0.z();
                    var tmp0_safe_receiver_0 = Companion_instance_0.ob3(element_0.d9e_1 === 'Green' ? 'line-Green' : element_0.d9e_1, runLogic$lambda(this.yb3_1));
                    if (tmp0_safe_receiver_0 == null)
                      null;
                    else {
                      destination_0.i(tmp0_safe_receiver_0);
                    }
                  }
                  runLogic$lambda_3(this.zb3_1, new (Results())(destination, destination_0));
                } else {
                  if (data instanceof Error_0()) {
                    runLogic$lambda_3(this.zb3_1, Error_getInstance());
                  } else {
                    if (data != null) {
                      noWhenBranchMatchedException();
                    }
                  }
                }

                return Unit_instance;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$withContext, completion) {
        var i = new (SearchViewModel$runLogic$slambda$slambda())(this.xb3_1, this.yb3_1, this.zb3_1, completion);
        i.ab4_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SearchViewModel$runLogic$slambda$slambdaClass = $;
  }
  return SearchViewModel$runLogic$slambda$slambdaClass;
}
function SearchViewModel$runLogic$slambda$slambda_0(this$0, $globalData$delegate, $state$delegate, resultContinuation) {
  var i = new (SearchViewModel$runLogic$slambda$slambda())(this$0, $globalData$delegate, $state$delegate, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.x3e($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
var EventClass;
function Event() {
  if (EventClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Event');
    EventClass = $;
  }
  return EventClass;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {}
    initMetadataForClass($, 'State');
    StateClass = $;
  }
  return StateClass;
}
var StopResultClass;
function StopResult() {
  if (StopResultClass === VOID) {
    class $ {
      constructor(id, isStation, name, routePills) {
        this.lb4_1 = id;
        this.mb4_1 = isStation;
        this.nb4_1 = name;
        this.ob4_1 = routePills;
      }
      toString() {
        return 'StopResult(id=' + this.lb4_1 + ', isStation=' + this.mb4_1 + ', name=' + this.nb4_1 + ', routePills=' + toString(this.ob4_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.lb4_1);
        result = imul(result, 31) + getBooleanHashCode(this.mb4_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.nb4_1) | 0;
        result = imul(result, 31) + hashCode(this.ob4_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopResult()))
          return false;
        var tmp0_other_with_cast = other instanceof StopResult() ? other : THROW_CCE();
        if (!(this.lb4_1 === tmp0_other_with_cast.lb4_1))
          return false;
        if (!(this.mb4_1 === tmp0_other_with_cast.mb4_1))
          return false;
        if (!(this.nb4_1 === tmp0_other_with_cast.nb4_1))
          return false;
        if (!equals(this.ob4_1, tmp0_other_with_cast.ob4_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StopResult');
    StopResultClass = $;
  }
  return StopResultClass;
}
var RouteResultClass;
function RouteResult() {
  if (RouteResultClass === VOID) {
    class $ {
      constructor(id, name, routePill) {
        this.pb4_1 = id;
        this.qb4_1 = name;
        this.rb4_1 = routePill;
      }
      toString() {
        return 'RouteResult(id=' + this.pb4_1 + ', name=' + this.qb4_1 + ', routePill=' + this.rb4_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.pb4_1);
        result = imul(result, 31) + getStringHashCode(this.qb4_1) | 0;
        result = imul(result, 31) + this.rb4_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteResult()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteResult() ? other : THROW_CCE();
        if (!(this.pb4_1 === tmp0_other_with_cast.pb4_1))
          return false;
        if (!(this.qb4_1 === tmp0_other_with_cast.qb4_1))
          return false;
        if (!this.rb4_1.equals(tmp0_other_with_cast.rb4_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'RouteResult');
    RouteResultClass = $;
  }
  return RouteResultClass;
}
function _set_query__juo6m5($this, _set____db54di) {
  var tmp0 = $this.kb4_1;
  var tmp = KMutableProperty1();
  var tmp_0 = SearchViewModel$_get_query_$ref_48mkcw_0();
  // Inline function 'androidx.compose.runtime.setValue' call
  getPropertyCallableRef('query', 1, tmp, tmp_0, SearchViewModel$_set_query_$ref_xjh0rg_0());
  tmp0.b2r(_set____db54di);
  return Unit_instance;
}
function _get_query__c6g9vb($this) {
  var tmp0 = $this.kb4_1;
  var tmp = KMutableProperty1();
  var tmp_0 = SearchViewModel$_get_query_$ref_48mkcw();
  // Inline function 'androidx.compose.runtime.getValue' call
  getPropertyCallableRef('query', 1, tmp, tmp_0, SearchViewModel$_set_query_$ref_xjh0rg());
  return tmp0.v1();
}
function runLogic$lambda($globalData$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('globalData', KProperty0(), false);
  return $globalData$delegate.v1();
}
function runLogic$lambda_0($latestVisits$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('latestVisits', KMutableProperty0(), true);
  return $latestVisits$delegate.v1();
}
function runLogic$lambda_1($latestVisits$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('latestVisits', KMutableProperty0(), true);
  $latestVisits$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function runLogic$lambda_2($state$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('state', KMutableProperty0(), true);
  return $state$delegate.v1();
}
function runLogic$lambda_3($state$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('state', KMutableProperty0(), true);
  $state$delegate.b2r(_set____db54di);
  return Unit_instance;
}
function SearchViewModel$_get_query_$ref_48mkcw() {
  return function (p0) {
    return _get_query__c6g9vb(p0);
  };
}
function SearchViewModel$_set_query_$ref_xjh0rg() {
  return function (p0, p1) {
    _set_query__juo6m5(p0, p1);
    return Unit_instance;
  };
}
function SearchViewModel$_get_query_$ref_48mkcw_0() {
  return function (p0) {
    return _get_query__c6g9vb(p0);
  };
}
function SearchViewModel$_set_query_$ref_xjh0rg_0() {
  return function (p0, p1) {
    _set_query__juo6m5(p0, p1);
    return Unit_instance;
  };
}
var SearchViewModel$runLogic$slambdaClass;
function SearchViewModel$runLogic$slambda() {
  if (SearchViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.ab5_1 = this$0;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
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
                suspendResult = this.ab5_1.fb4_1.q9w(this);
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (SearchViewModel$runLogic$slambda())(this.ab5_1, completion);
        i.bb5_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SearchViewModel$runLogic$slambdaClass = $;
  }
  return SearchViewModel$runLogic$slambdaClass;
}
function SearchViewModel$runLogic$slambda_0(this$0, resultContinuation) {
  var i = new (SearchViewModel$runLogic$slambda())(this$0, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var SearchViewModel$runLogic$slambdaClass_0;
function SearchViewModel$runLogic$slambda_1() {
  if (SearchViewModel$runLogic$slambdaClass_0 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $latestVisits$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.kb5_1 = this$0;
        $box.lb5_1 = $latestVisits$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
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
                suspendResult = this.kb5_1.ib4_1.uac(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var ARGUMENT = suspendResult;
                runLogic$lambda_1(this.lb5_1, ARGUMENT);
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
      y3e($this$LaunchedEffect, completion) {
        var i = new (SearchViewModel$runLogic$slambda_1())(this.kb5_1, this.lb5_1, completion);
        i.mb5_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SearchViewModel$runLogic$slambdaClass_0 = $;
  }
  return SearchViewModel$runLogic$slambdaClass_0;
}
function SearchViewModel$runLogic$slambda_2(this$0, $latestVisits$delegate, resultContinuation) {
  var i = new (SearchViewModel$runLogic$slambda_1())(this$0, $latestVisits$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var SearchViewModel$runLogic$slambdaClass_1;
function SearchViewModel$runLogic$slambda_3() {
  if (SearchViewModel$runLogic$slambdaClass_1 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $latestVisits$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.vb5_1 = this$0;
        $box.wb5_1 = $latestVisits$delegate;
        super(resultContinuation, $box);
      }
      zb5(event, $completion) {
        var tmp = this.ab6(event, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.zb5((!(p1 == null) ? isInterface(p1, Event()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.yb5_1 = this.xb5_1;
                if (equals(this.yb5_1, RefreshHistory_instance)) {
                  this.fd_1 = 1;
                  suspendResult = this.vb5_1.ib4_1.uac(this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  noWhenBranchMatchedException();
                }

                break;
              case 1:
                var ARGUMENT = suspendResult;
                runLogic$lambda_1(this.wb5_1, ARGUMENT);
                this.fd_1 = 2;
                continue $sm;
              case 2:
                return Unit_instance;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      ab6(event, completion) {
        var i = new (SearchViewModel$runLogic$slambda_3())(this.vb5_1, this.wb5_1, completion);
        i.xb5_1 = event;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SearchViewModel$runLogic$slambdaClass_1 = $;
  }
  return SearchViewModel$runLogic$slambdaClass_1;
}
function SearchViewModel$runLogic$slambda_4(this$0, $latestVisits$delegate, resultContinuation) {
  var i = new (SearchViewModel$runLogic$slambda_3())(this$0, $latestVisits$delegate, resultContinuation);
  var l = function (event, $completion) {
    return i.zb5(event, $completion);
  };
  l.$arity = 1;
  return l;
}
var SearchViewModel$runLogic$slambdaClass_2;
function SearchViewModel$runLogic$slambda_5() {
  if (SearchViewModel$runLogic$slambdaClass_2 === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $state$delegate, $globalData$delegate, $latestVisits$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.jb6_1 = this$0;
        $box.kb6_1 = $state$delegate;
        $box.lb6_1 = $globalData$delegate;
        $box.mb6_1 = $latestVisits$delegate;
        super(resultContinuation, $box);
      }
      x3e($this$LaunchedEffect, $completion) {
        var tmp = this.y3e($this$LaunchedEffect, $completion);
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
                this.gd_1 = 3;
                this.jb6_1.eb4_1.i8j(_get_query__c6g9vb(this.jb6_1));
                var this_0 = _get_query__c6g9vb(this.jb6_1);
                if (charSequenceLength(this_0) > 0) {
                  var tmp_0 = runLogic$lambda_2(this.kb6_1);
                  if (tmp_0 instanceof RecentStops()) {
                    runLogic$lambda_3(this.kb6_1, Loading_getInstance());
                  }
                  this.fd_1 = 1;
                  suspendResult = withContext(this.jb6_1.jb4_1, SearchViewModel$runLogic$slambda$slambda_0(this.jb6_1, this.lb6_1, this.kb6_1, null), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp0_safe_receiver = runLogic$lambda_0(this.mb6_1);
                  var tmp_1;
                  if (tmp0_safe_receiver == null) {
                    tmp_1 = null;
                  } else {
                    var destination = ArrayList().g1();
                    var _iterator__ex2g4s = tmp0_safe_receiver.x();
                    while (_iterator__ex2g4s.y()) {
                      var element = _iterator__ex2g4s.z();
                      if (element instanceof StopVisit()) {
                        destination.i(element);
                      }
                    }
                    tmp_1 = destination;
                  }
                  var tmp1_safe_receiver = tmp_1;
                  var tmp_2;
                  if (tmp1_safe_receiver == null) {
                    tmp_2 = null;
                  } else {
                    var destination_0 = ArrayList().g1();
                    var _iterator__ex2g4s_0 = tmp1_safe_receiver.x();
                    while (_iterator__ex2g4s_0.y()) {
                      var element_0 = _iterator__ex2g4s_0.z();
                      var tmp0_safe_receiver_0 = Companion_instance.nb3(element_0.l8o_1, runLogic$lambda(this.lb6_1));
                      if (tmp0_safe_receiver_0 == null)
                        null;
                      else {
                        destination_0.i(tmp0_safe_receiver_0);
                      }
                    }
                    tmp_2 = destination_0;
                  }
                  var tmp2_safe_receiver = tmp_2;
                  var tmp_3;
                  if (tmp2_safe_receiver == null) {
                    tmp_3 = null;
                  } else {
                    var tmp_4;
                    if (!tmp2_safe_receiver.h1()) {
                      tmp_4 = tmp2_safe_receiver;
                    } else {
                      tmp_4 = null;
                    }
                    tmp_3 = tmp_4;
                  }
                  var latestVisitResults = tmp_3;
                  runLogic$lambda_3(this.kb6_1, !(latestVisitResults == null) ? new (RecentStops())(latestVisitResults) : Loading_getInstance());
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 1:
                this.fd_1 = 2;
                continue $sm;
              case 2:
                return Unit_instance;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$LaunchedEffect, completion) {
        var i = new (SearchViewModel$runLogic$slambda_5())(this.jb6_1, this.kb6_1, this.lb6_1, this.mb6_1, completion);
        i.nb6_1 = $this$LaunchedEffect;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    SearchViewModel$runLogic$slambdaClass_2 = $;
  }
  return SearchViewModel$runLogic$slambdaClass_2;
}
function SearchViewModel$runLogic$slambda_6(this$0, $state$delegate, $globalData$delegate, $latestVisits$delegate, resultContinuation) {
  var i = new (SearchViewModel$runLogic$slambda_5())(this$0, $state$delegate, $globalData$delegate, $latestVisits$delegate, resultContinuation);
  var l = function ($this$LaunchedEffect, $completion) {
    return i.x3e($this$LaunchedEffect, $completion);
  };
  l.$arity = 1;
  return l;
}
var SearchViewModelClass;
function SearchViewModel() {
  if (SearchViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor(analytics, globalRepository, searchResultRepository, sentryRepository, visitHistoryUsecase, ioDispatcher) {
        var tmp;
        if (ioDispatcher === VOID) {
          var tmp0 = KoinPlatform_instance.r7v();
          // Inline function 'org.koin.core.Koin.get' call
          var qualifier = named('coroutineDispatcherIO');
          // Inline function 'org.koin.core.scope.Scope.get' call
          tmp = tmp0.r7u_1.e7v_1.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
        } else {
          tmp = ioDispatcher;
        }
        ioDispatcher = tmp;
        super();
        this.eb4_1 = analytics;
        this.fb4_1 = globalRepository;
        this.gb4_1 = searchResultRepository;
        this.hb4_1 = sentryRepository;
        this.ib4_1 = visitHistoryUsecase;
        this.jb4_1 = ioDispatcher;
        this.kb4_1 = mutableStateOf('');
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(-1777195124);
        sourceInformation($composer_0, 'C(runLogic)171@6468L16,172@6513L47,173@6582L49,175@6662L36,175@6641L57,177@6729L56,177@6708L77,179@6876L154,179@6795L235,185@7088L1862,185@7040L1910:SearchViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(-1777195124, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.SearchViewModel.runLogic (SearchViewModel.kt:170)');
        }
        var tmp = this.fb4_1.p9w();
        var globalData$delegate = collectAsState(tmp, null, $composer_0, 0, 1);
        sourceInformationMarkerStart($composer_0, 1512474267, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp_0;
        if (false || it === Companion_getInstance().x6p_1) {
          var value = mutableStateOf(null);
          $composer_0.h6y(value);
          tmp_0 = value;
        } else {
          tmp_0 = it;
        }
        var tmp_1 = tmp_0;
        var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var latestVisits$delegate = tmp1_group;
        sourceInformationMarkerStart($composer_0, 1512476477, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_2;
        if (false || it_0 === Companion_getInstance().x6p_1) {
          var value_0 = mutableStateOf(Loading_getInstance());
          $composer_0.h6y(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp_3 = tmp_2;
        var tmp2_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var state$delegate = tmp2_group;
        sourceInformationMarkerStart($composer_0, 1512479024, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_1 = $composer_0.g6y();
        var tmp_4;
        if (invalid || it_1 === Companion_getInstance().x6p_1) {
          var value_1 = SearchViewModel$runLogic$slambda_0(this, null);
          $composer_0.h6y(value_1);
          tmp_4 = value_1;
        } else {
          tmp_4 = it_1;
        }
        var tmp_5 = tmp_4;
        var tmp3_group = (tmp_5 == null ? true : !(tmp_5 == null)) ? tmp_5 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(null, tmp3_group, $composer_0, 6);
        sourceInformationMarkerStart($composer_0, 1512481188, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_0 = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_2 = $composer_0.g6y();
        var tmp_6;
        if (invalid_0 || it_2 === Companion_getInstance().x6p_1) {
          var value_2 = SearchViewModel$runLogic$slambda_2(this, latestVisits$delegate, null);
          $composer_0.h6y(value_2);
          tmp_6 = value_2;
        } else {
          tmp_6 = it_2;
        }
        var tmp_7 = tmp_6;
        var tmp4_group = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect(null, tmp4_group, $composer_0, 6);
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp_8 = toDuration(2, DurationUnit_SECONDS_getInstance());
        sourceInformationMarkerStart($composer_0, 1512485990, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_1 = $composer_0.q6w(this);
        // Inline function 'kotlin.let' call
        var it_3 = $composer_0.g6y();
        var tmp_9;
        if (invalid_1 || it_3 === Companion_getInstance().x6p_1) {
          var value_3 = SearchViewModel$runLogic$slambda_4(this, latestVisits$delegate, null);
          $composer_0.h6y(value_3);
          tmp_9 = value_3;
        } else {
          tmp_9 = it_3;
        }
        var tmp_10 = tmp_9;
        var tmp5_group = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        this.hah(tmp_8, this.hb4_1, tmp5_group, $composer_0, 7168 & $changed << 9);
        var tmp_11 = _get_query__c6g9vb(this);
        var tmp_12 = runLogic$lambda_0(latestVisits$delegate);
        var tmp_13 = runLogic$lambda(globalData$delegate);
        sourceInformationMarkerStart($composer_0, 1512494482, 'CC(remember):SearchViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var invalid_2 = !!($composer_0.q6w(this) | $composer_0.s6m(globalData$delegate));
        // Inline function 'kotlin.let' call
        var it_4 = $composer_0.g6y();
        var tmp_14;
        if (invalid_2 || it_4 === Companion_getInstance().x6p_1) {
          var value_4 = SearchViewModel$runLogic$slambda_6(this, state$delegate, globalData$delegate, latestVisits$delegate, null);
          $composer_0.h6y(value_4);
          tmp_14 = value_4;
        } else {
          tmp_14 = it_4;
        }
        var tmp_15 = tmp_14;
        var tmp6_group = (tmp_15 == null ? true : !(tmp_15 == null)) ? tmp_15 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        LaunchedEffect_0(tmp_11, tmp_12, tmp_13, tmp6_group, $composer_0, 0);
        var tmp0 = runLogic$lambda_2(state$delegate);
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return tmp0;
      }
    }
    initMetadataForClass($, 'SearchViewModel', VOID, VOID, [MoleculeViewModel(), ISearchViewModel()]);
    SearchViewModelClass = $;
  }
  return SearchViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_SearchViewModel_Event_RefreshHistory$stable = 0;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Loading$stable = 0;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_RecentStops$stable = 8;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Results$stable = 8;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_State_Error$stable = 0;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_State$stable = 0;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_StopResult$stable = 8;
com_mbta_tid_mbta_app_viewModel_SearchViewModel_RouteResult$stable = 8;
com_mbta_tid_mbta_app_viewModel_SearchViewModel$stable = 8;
com_mbta_tid_mbta_app_viewModel_MockSearchViewModel$stable = 8;
RefreshHistory_instance = new (RefreshHistory())();
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
//endregion
//region block: exports
export {
  ISearchViewModel as ISearchViewModel113rx8snnwnyf,
  SearchViewModel as SearchViewModel1xiszu6x5z20x,
};
//endregion

//# sourceMappingURL=SearchViewModel.mjs.map
