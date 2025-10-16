import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KMutableProperty025txtn5b59pq1 as KMutableProperty0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getLocalDelegateReference2ls94nvl5ojb2 as getLocalDelegateReference } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { MoleculeViewModel1m9g3i38mafed as MoleculeViewModel } from './MoleculeViewModel.mjs';
import {
  sourceInformation1t72i3r4izs0r as sourceInformation,
  traceEventStartfmdsyhzp354o as traceEventStart,
  isTraceInProgress1ftm30trozocv as isTraceInProgress,
  sourceInformationMarkerStart1lc7mi8evepam as sourceInformationMarkerStart,
  Companion_getInstance2jzydsbnk1vo5 as Companion_getInstance,
  sourceInformationMarkerEnd1lxrocn0rhkcg as sourceInformationMarkerEnd,
  traceEventEnduz7wonxv2xy0 as traceEventEnd,
} from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/Composer.mjs';
import { mutableStateOf2iogqreal45x5 as mutableStateOf } from '../../../../../../compose-multiplatform-core-compose-runtime-runtime/androidx/compose/runtime/SnapshotState.mjs';
import {
  Companion_getInstance3vz87v4c01z2t as Companion_getInstance_0,
  toDuration7gy6v749ektt as toDuration,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Duration.mjs';
import { DurationUnit_SECONDS_getInstance3jias9ne5z4er as DurationUnit_SECONDS_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/DurationUnitJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_Event_SetRouteCardData$stable;
var com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_Event$stable;
var com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_State$stable;
var com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel$stable;
var com_mbta_tid_mbta_app_viewModel_MockRouteCardDataViewModel$stable;
var IRouteCardDataViewModelClass;
function IRouteCardDataViewModel() {
  if (IRouteCardDataViewModelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'IRouteCardDataViewModel');
    IRouteCardDataViewModelClass = $;
  }
  return IRouteCardDataViewModelClass;
}
var SetRouteCardDataClass;
function SetRouteCardData() {
  if (SetRouteCardDataClass === VOID) {
    class $ extends Event() {
      constructor(data) {
        super();
        this.ib0_1 = data;
      }
      toString() {
        return 'SetRouteCardData(data=' + toString(this.ib0_1) + ')';
      }
      hashCode() {
        return this.ib0_1 == null ? 0 : hashCode(this.ib0_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof SetRouteCardData()))
          return false;
        var tmp0_other_with_cast = other instanceof SetRouteCardData() ? other : THROW_CCE();
        if (!equals(this.ib0_1, tmp0_other_with_cast.ib0_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'SetRouteCardData');
    SetRouteCardDataClass = $;
  }
  return SetRouteCardDataClass;
}
var EventClass;
function Event() {
  if (EventClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Event');
    EventClass = $;
  }
  return EventClass;
}
var StateClass;
function State() {
  if (StateClass === VOID) {
    class $ {
      constructor(data) {
        this.kar_1 = data;
      }
      toString() {
        return 'State(data=' + toString(this.kar_1) + ')';
      }
      hashCode() {
        return this.kar_1 == null ? 0 : hashCode(this.kar_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof State()))
          return false;
        var tmp0_other_with_cast = other instanceof State() ? other : THROW_CCE();
        if (!equals(this.kar_1, tmp0_other_with_cast.kar_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'State');
    StateClass = $;
  }
  return StateClass;
}
function runLogic$lambda($routeCardData$delegate) {
  // Inline function 'androidx.compose.runtime.getValue' call
  getLocalDelegateReference('routeCardData', KMutableProperty0(), true);
  return $routeCardData$delegate.v1();
}
function runLogic$lambda_0($routeCardData$delegate, _set____db54di) {
  // Inline function 'androidx.compose.runtime.setValue' call
  getLocalDelegateReference('routeCardData', KMutableProperty0(), true);
  $routeCardData$delegate.b2r(_set____db54di);
  return Unit_instance;
}
var RouteCardDataViewModel$runLogic$slambdaClass;
function RouteCardDataViewModel$runLogic$slambda() {
  if (RouteCardDataViewModel$runLogic$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($routeCardData$delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.rb0_1 = $routeCardData$delegate;
        super(resultContinuation, $box);
      }
      tb0(event, $completion) {
        var tmp = this.ub0(event, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.tb0(p1 instanceof Event() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            if (tmp === 0) {
              this.gd_1 = 1;
              if (this.sb0_1 instanceof SetRouteCardData()) {
                runLogic$lambda_0(this.rb0_1, this.sb0_1.ib0_1);
              } else {
                noWhenBranchMatchedException();
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
      ub0(event, completion) {
        var i = new (RouteCardDataViewModel$runLogic$slambda())(this.rb0_1, completion);
        i.sb0_1 = event;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    RouteCardDataViewModel$runLogic$slambdaClass = $;
  }
  return RouteCardDataViewModel$runLogic$slambdaClass;
}
function RouteCardDataViewModel$runLogic$slambda_0($routeCardData$delegate, resultContinuation) {
  var i = new (RouteCardDataViewModel$runLogic$slambda())($routeCardData$delegate, resultContinuation);
  var l = function (event, $completion) {
    return i.tb0(event, $completion);
  };
  l.$arity = 1;
  return l;
}
var RouteCardDataViewModelClass;
function RouteCardDataViewModel() {
  if (RouteCardDataViewModelClass === VOID) {
    class $ extends MoleculeViewModel() {
      constructor(sentryRepository) {
        super();
        this.yb0_1 = sentryRepository;
      }
      oay() {
        return this.iah();
      }
      dah($composer, $changed) {
        var $composer_0 = $composer;
        $composer_0.d6w(-2011775498);
        sourceInformation($composer_0, 'C(runLogic)34@1307L33,36@1431L133,36@1350L214:RouteCardDataViewModel.kt#medjd4');
        if (isTraceInProgress()) {
          traceEventStart(-2011775498, $changed, -1, 'com.mbta.tid.mbta_app.viewModel.RouteCardDataViewModel.runLogic (RouteCardDataViewModel.kt:33)');
        }
        sourceInformationMarkerStart($composer_0, -580967145, 'CC(remember):RouteCardDataViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it = $composer_0.g6y();
        var tmp;
        if (false || it === Companion_getInstance().x6p_1) {
          var value = mutableStateOf(null);
          $composer_0.h6y(value);
          tmp = value;
        } else {
          tmp = it;
        }
        var tmp_0 = tmp;
        var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        var routeCardData$delegate = tmp1_group;
        // Inline function 'kotlin.time.Companion.seconds' call
        Companion_getInstance_0();
        var tmp_1 = toDuration(1, DurationUnit_SECONDS_getInstance());
        sourceInformationMarkerStart($composer_0, -580963077, 'CC(remember):RouteCardDataViewModel.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        var it_0 = $composer_0.g6y();
        var tmp_2;
        if (false || it_0 === Companion_getInstance().x6p_1) {
          var value_0 = RouteCardDataViewModel$runLogic$slambda_0(routeCardData$delegate, null);
          $composer_0.h6y(value_0);
          tmp_2 = value_0;
        } else {
          tmp_2 = it_0;
        }
        var tmp_3 = tmp_2;
        var tmp2_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        sourceInformationMarkerEnd($composer_0);
        this.hah(tmp_1, this.yb0_1, tmp2_group, $composer_0, 7168 & $changed << 9);
        var tmp0 = new (State())(runLogic$lambda(routeCardData$delegate));
        if (isTraceInProgress()) {
          traceEventEnd();
        }
        $composer_0.f6w();
        return tmp0;
      }
      hb0(data) {
        return this.hal(new (SetRouteCardData())(data));
      }
    }
    initMetadataForClass($, 'RouteCardDataViewModel', VOID, VOID, [MoleculeViewModel(), IRouteCardDataViewModel()]);
    RouteCardDataViewModelClass = $;
  }
  return RouteCardDataViewModelClass;
}
//region block: init
com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_Event_SetRouteCardData$stable = 8;
com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_Event$stable = 0;
com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel_State$stable = 8;
com_mbta_tid_mbta_app_viewModel_RouteCardDataViewModel$stable = 8;
com_mbta_tid_mbta_app_viewModel_MockRouteCardDataViewModel$stable = 8;
//endregion
//region block: exports
export {
  IRouteCardDataViewModel as IRouteCardDataViewModelhkdbe1glj9hk,
  RouteCardDataViewModel as RouteCardDataViewModel2iwon3anps7tc,
};
//endregion

//# sourceMappingURL=RouteCardDataViewModel.mjs.map
