import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  toList3jhuyej2anx2q as toList,
  plus310ted5e4i90h as plus,
  plus20p0vtfmu0596 as plus_0,
  distinct10qe1scfdvu5k as distinct,
  singleo93pzdgfc557 as single,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  listOf1jh22dvmctj1r as listOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  LocationType_STOP_getInstance3b47w50r35o9j as LocationType_STOP_getInstance,
  LocationType_STATION_getInstancebecdlasuojyi as LocationType_STATION_getInstance,
} from './LocationType.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { toMap1vec9topfei08 as toMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createSimpleEnumSerializer2guioz11kk1m0 as createSimpleEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { SerializerFactory1qv9hivitncuv as SerializerFactory } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { AlertSignificance_Major_getInstance8pdy9s33p31v as AlertSignificance_Major_getInstance } from './AlertSignificance.mjs';
import {
  Companion_getInstance20mcswkvz9maw as Companion_getInstance,
  get_entries2xkklea9ps4e2 as get_entries,
} from './MapStopRoute.mjs';
import {
  Effect_Shuttle_getInstance2rh99ranmvvoj as Effect_Shuttle_getInstance,
  Effect_Detour_getInstance1mhf43tk96yy6 as Effect_Detour_getInstance,
  Effect_StopMoved_getInstance3vawccioyc7x3 as Effect_StopMoved_getInstance,
  Effect_StopMove_getInstance1no8ggpp1m7j5 as Effect_StopMove_getInstance,
} from './Alert.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_AlertAssociatedStop$stable;
function AlertAssociatedStop$_init_$lambda_5l2bjb($pattern) {
  return function (it) {
    return entityMatcher(it, null, $pattern);
  };
}
var AlertAssociatedStopClass;
function AlertAssociatedStop() {
  if (AlertAssociatedStopClass === VOID) {
    class $ {
      static k90(stop) {
        var $this = createThis(this);
        $this.f90_1 = stop;
        var tmp = $this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.g90_1 = ArrayList().g1();
        var tmp_0 = $this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp_0.h90_1 = ArrayList().g1();
        var tmp_1 = $this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_1.i90_1 = LinkedHashMap().sc();
        var tmp_2 = $this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_2.j90_1 = LinkedHashMap().sc();
        return $this;
      }
      static l90(stop, alertsByStop, nullStopAlerts, global) {
        var $this = this.k90(stop);
        // Inline function 'kotlin.run' call
        var tmp = $this;
        var tmp0_safe_receiver = alertsByStop.j3(stop.v8q_1);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : toList(tmp0_safe_receiver);
        tmp.g90_1 = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
        // Inline function 'kotlin.collections.mapNotNull' call
        var tmp0 = stop.e8r_1;
        // Inline function 'kotlin.collections.mapNotNullTo' call
        var destination = ArrayList().g1();
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp0_safe_receiver_0 = global.n8u_1.j3(element);
          if (tmp0_safe_receiver_0 == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            destination.i(tmp0_safe_receiver_0);
          }
        }
        // Inline function 'kotlin.collections.filter' call
        // Inline function 'kotlin.collections.filterTo' call
        var destination_0 = ArrayList().g1();
        var _iterator__ex2g4s_0 = destination.x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          if (listOf([LocationType_STOP_getInstance(), LocationType_STATION_getInstance()]).j1(element_0.z8q_1)) {
            destination_0.i(element_0);
          }
        }
        var childStops = destination_0;
        var tmp_0 = $this;
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_1 = ArrayList().w(collectionSizeOrDefault(childStops, 10));
        var _iterator__ex2g4s_1 = childStops.x();
        while (_iterator__ex2g4s_1.y()) {
          var item = _iterator__ex2g4s_1.z();
          var childAlert = AlertAssociatedStop().l90(item, alertsByStop, nullStopAlerts, global);
          var tmp$ret$10 = to(item.v8q_1, childAlert);
          destination_1.i(tmp$ret$10);
        }
        tmp_0.i90_1 = toMap(destination_1);
        var tmp0_0 = global.k8u_1;
        // Inline function 'kotlin.collections.getOrElse' call
        var key = stop.v8q_1;
        var tmp0_elvis_lhs = tmp0_0.j3(key);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.collections.listOf' call
          tmp_1 = emptyList();
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var _iterator__ex2g4s_2 = tmp_1.x();
        $l$loop: while (_iterator__ex2g4s_2.y()) {
          var patternId = _iterator__ex2g4s_2.z();
          var tmp2_elvis_lhs = global.m8u_1.j3(patternId);
          var tmp_2;
          if (tmp2_elvis_lhs == null) {
            continue $l$loop;
          } else {
            tmp_2 = tmp2_elvis_lhs;
          }
          var pattern = tmp_2;
          var tmp_3 = $this;
          // Inline function 'kotlin.collections.filter' call
          // Inline function 'kotlin.collections.filterTo' call
          var destination_2 = ArrayList().g1();
          var _iterator__ex2g4s_3 = nullStopAlerts.x();
          while (_iterator__ex2g4s_3.y()) {
            var element_1 = _iterator__ex2g4s_3.z();
            if (element_1.o8z(AlertAssociatedStop$_init_$lambda_5l2bjb(pattern))) {
              destination_2.i(element_1);
            }
          }
          tmp_3.g90_1 = plus(destination_2, $this.g90_1);
        }
        $this.h90_1 = getServiceAlerts($this.g90_1);
        $this.j90_1 = getAlertStateByRoute(stop, $this.h90_1, $this.i90_1, global);
        return $this;
      }
    }
    initMetadataForClass($, 'AlertAssociatedStop');
    AlertAssociatedStopClass = $;
  }
  return AlertAssociatedStopClass;
}
function _get_$cachedSerializer__te6jhj($this) {
  return $this.n8y_1.v1();
}
function StopAlertState$Companion$_anonymous__bndfa0() {
  return createSimpleEnumSerializer('com.mbta.tid.mbta_app.model.StopAlertState', values());
}
var StopAlertState_Elevator_instance;
var StopAlertState_Issue_instance;
var StopAlertState_Normal_instance;
var StopAlertState_Shuttle_instance;
var StopAlertState_Suspension_instance;
function values() {
  return [StopAlertState_Elevator_getInstance(), StopAlertState_Issue_getInstance(), StopAlertState_Normal_getInstance(), StopAlertState_Shuttle_getInstance(), StopAlertState_Suspension_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.n8y_1 = lazy(tmp_0, StopAlertState$Companion$_anonymous__bndfa0);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  StopAlertState_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var StopAlertState_entriesInitialized;
function StopAlertState_initEntries() {
  if (StopAlertState_entriesInitialized)
    return Unit_instance;
  StopAlertState_entriesInitialized = true;
  StopAlertState_Elevator_instance = new (StopAlertState())('Elevator', 0);
  StopAlertState_Issue_instance = new (StopAlertState())('Issue', 1);
  StopAlertState_Normal_instance = new (StopAlertState())('Normal', 2);
  StopAlertState_Shuttle_instance = new (StopAlertState())('Shuttle', 3);
  StopAlertState_Suspension_instance = new (StopAlertState())('Suspension', 4);
  Companion_getInstance_0();
}
var StopAlertStateClass;
function StopAlertState() {
  if (StopAlertStateClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'StopAlertState', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_0});
    StopAlertStateClass = $;
  }
  return StopAlertStateClass;
}
function entityMatcher(entity, stop, pattern) {
  var tmp1_stopId = stop == null ? null : stop.v8q_1;
  var tmp2_routeId = pattern.x8z_1;
  var tmp3_directionId = pattern.s8z_1;
  return entity.o8y(tmp3_directionId, VOID, tmp2_routeId, VOID, tmp1_stopId);
}
function getServiceAlerts(alerts) {
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = alerts.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    if (element.k8z_1.a4(AlertSignificance_Major_getInstance()) >= 0) {
      destination.i(element);
    }
  }
  return destination;
}
function getAlertStateByRoute(stop, serviceAlerts, childAlerts, global) {
  // Inline function 'kotlin.collections.mutableMapOf' call
  var patternsByMapRoute = LinkedHashMap().sc();
  var tmp0 = global.k8u_1;
  // Inline function 'kotlin.collections.getOrElse' call
  var key = stop.v8q_1;
  var tmp0_elvis_lhs = tmp0.j3(key);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.collections.listOf' call
    tmp = emptyList();
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var _iterator__ex2g4s = tmp.x();
  $l$loop_1: while (_iterator__ex2g4s.y()) {
    var patternId = _iterator__ex2g4s.z();
    var tmp0_elvis_lhs_0 = global.m8u_1.j3(patternId);
    var tmp_0;
    if (tmp0_elvis_lhs_0 == null) {
      continue $l$loop_1;
    } else {
      tmp_0 = tmp0_elvis_lhs_0;
    }
    var pattern = tmp_0;
    var tmp1_elvis_lhs = global.l8u_1.j3(pattern.x8z_1);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      continue $l$loop_1;
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var route = tmp_1;
    var tmp2_elvis_lhs = Companion_getInstance().n90(route);
    var tmp_2;
    if (tmp2_elvis_lhs == null) {
      continue $l$loop_1;
    } else {
      tmp_2 = tmp2_elvis_lhs;
    }
    var mapRoute = tmp_2;
    // Inline function 'kotlin.collections.getOrElse' call
    var tmp0_elvis_lhs_1 = patternsByMapRoute.j3(mapRoute);
    var tmp_3;
    if (tmp0_elvis_lhs_1 == null) {
      // Inline function 'kotlin.collections.listOf' call
      tmp_3 = emptyList();
    } else {
      tmp_3 = tmp0_elvis_lhs_1;
    }
    var tmp$ret$6 = tmp_3;
    // Inline function 'kotlin.collections.set' call
    var value = plus_0(tmp$ret$6, pattern);
    patternsByMapRoute.t3(mapRoute, value);
  }
  // Inline function 'kotlin.collections.mapNotNull' call
  var tmp0_0 = get_entries();
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = tmp0_0.x();
  while (_iterator__ex2g4s_0.y()) {
    var element = _iterator__ex2g4s_0.z();
    var tmp$ret$8;
    $l$block_0: {
      var patterns = patternsByMapRoute.j3(element);
      if (!(stop.g8r_1 == null) && patterns == null) {
        tmp$ret$8 = null;
        break $l$block_0;
      }
      // Inline function 'kotlin.collections.mapNotNull' call
      var tmp0_1 = childAlerts.l3();
      // Inline function 'kotlin.collections.mapNotNullTo' call
      var destination_0 = ArrayList().g1();
      // Inline function 'kotlin.collections.forEach' call
      var _iterator__ex2g4s_1 = tmp0_1.x();
      while (_iterator__ex2g4s_1.y()) {
        var element_0 = _iterator__ex2g4s_1.z();
        var tmp0_safe_receiver = stopState(element_0.f90_1, element, childAlerts);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          destination_0.i(tmp0_safe_receiver);
        }
      }
      var childStates = destination_0;
      // Inline function 'kotlin.collections.map' call
      var this_0 = patterns == null ? emptyList() : patterns;
      // Inline function 'kotlin.collections.mapTo' call
      var destination_1 = ArrayList().w(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s_2 = this_0.x();
      while (_iterator__ex2g4s_2.y()) {
        var item = _iterator__ex2g4s_2.z();
        var tmp$ret$16 = statesForPattern(item, stop, serviceAlerts);
        destination_1.i(tmp$ret$16);
      }
      var patternStates = destination_1;
      if (patternStates.h1() && childStates.h1()) {
        tmp$ret$8 = null;
        break $l$block_0;
      }
      var distinctStates = distinct(plus(patternStates, childStates));
      var tmp_4;
      if (distinctStates.c1() === 1) {
        tmp_4 = single(distinctStates);
      } else if (distinctStates.c1() === 2 && distinctStates.j1(StopAlertState_Normal_getInstance())) {
        // Inline function 'kotlin.collections.filterNot' call
        // Inline function 'kotlin.collections.filterNotTo' call
        var destination_2 = ArrayList().g1();
        var _iterator__ex2g4s_3 = distinctStates.x();
        while (_iterator__ex2g4s_3.y()) {
          var element_1 = _iterator__ex2g4s_3.z();
          if (!element_1.equals(StopAlertState_Normal_getInstance())) {
            destination_2.i(element_1);
          }
        }
        tmp_4 = single(destination_2);
      } else {
        tmp_4 = StopAlertState_Issue_getInstance();
      }
      var finalState = tmp_4;
      tmp$ret$8 = to(element, finalState);
    }
    var tmp0_safe_receiver_0 = tmp$ret$8;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.i(tmp0_safe_receiver_0);
    }
  }
  return toMap(destination);
}
function stopState(stop, on, alerts) {
  var tmp0_safe_receiver = alerts.j3(stop.v8q_1);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j90_1;
  return tmp1_safe_receiver == null ? null : tmp1_safe_receiver.j3(on);
}
function statesForPattern(pattern, stop, serviceAlerts) {
  // Inline function 'kotlin.collections.find' call
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = serviceAlerts.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (element.o8z(statesForPattern$lambda(stop, pattern))) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var tmp0_elvis_lhs = tmp$ret$1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return StopAlertState_Normal_getInstance();
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var matchingAlert = tmp;
  if (matchingAlert.a8z_1.equals(Effect_Shuttle_getInstance())) {
    return StopAlertState_Shuttle_getInstance();
  }
  if (listOf([Effect_Detour_getInstance(), Effect_StopMoved_getInstance(), Effect_StopMove_getInstance()]).j1(matchingAlert.a8z_1)) {
    return StopAlertState_Issue_getInstance();
  }
  return StopAlertState_Suspension_getInstance();
}
function statesForPattern$lambda($stop, $pattern) {
  return function (it) {
    return entityMatcher(it, $stop, $pattern);
  };
}
function StopAlertState_Elevator_getInstance() {
  StopAlertState_initEntries();
  return StopAlertState_Elevator_instance;
}
function StopAlertState_Issue_getInstance() {
  StopAlertState_initEntries();
  return StopAlertState_Issue_instance;
}
function StopAlertState_Normal_getInstance() {
  StopAlertState_initEntries();
  return StopAlertState_Normal_instance;
}
function StopAlertState_Shuttle_getInstance() {
  StopAlertState_initEntries();
  return StopAlertState_Shuttle_instance;
}
function StopAlertState_Suspension_getInstance() {
  StopAlertState_initEntries();
  return StopAlertState_Suspension_instance;
}
//region block: init
com_mbta_tid_mbta_app_model_AlertAssociatedStop$stable = 8;
//endregion
//region block: exports
export {
  AlertAssociatedStop as AlertAssociatedStop2hutr5hxjcd7b,
  StopAlertState_Elevator_getInstance as StopAlertState_Elevator_getInstance3ktxkig8v3o39,
  StopAlertState_Issue_getInstance as StopAlertState_Issue_getInstance5397xi6h7elu,
  StopAlertState_Shuttle_getInstance as StopAlertState_Shuttle_getInstance34nmw799j7o3u,
  StopAlertState_Suspension_getInstance as StopAlertState_Suspension_getInstancex3xt9l1300da,
  Companion_getInstance_0 as Companion_getInstance10kegb9y9umx7,
};
//endregion

//# sourceMappingURL=AlertAssociatedStop.mjs.map
