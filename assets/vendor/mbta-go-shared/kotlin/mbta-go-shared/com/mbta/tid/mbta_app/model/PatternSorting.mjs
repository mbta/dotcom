import { first58ocm7j58k3q as first } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { Context_Favorites_getInstance1fjx6ke9a3gxg as Context_Favorites_getInstance } from './RouteCardData.mjs';
import { compareBy2697bq0ffft96 as compareBy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/comparisons/Comparisons.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_PatternSorting$stable;
function patternServiceBucket($this, leafData) {
  var tmp;
  var tmp_0;
  if (leafData.t94()) {
    tmp_0 = true;
  } else {
    // Inline function 'kotlin.collections.isNotEmpty' call
    tmp_0 = !leafData.e8t_1.h1();
  }
  if (tmp_0) {
    tmp = 1;
  } else {
    if (leafData.l8t_1) {
      tmp = 2;
    } else {
      tmp = 3;
    }
  }
  return tmp;
}
function subwayBucket($this, route) {
  return route.p8r_1.w94() ? 1 : 2;
}
function PatternSorting$compareRouteCards$lambda(it) {
  return patternServiceBucket(PatternSorting_instance, first(first(it.q8s_1).w8s_1));
}
function PatternSorting$compareRouteCards$lambda_0(it) {
  return subwayBucket(PatternSorting_instance, it.p8s_1.x94());
}
function PatternSorting$compareRouteCards$lambda_1(it) {
  return 0;
}
function PatternSorting$compareRouteCards$lambda_2($sortByDistanceFrom) {
  return function (it) {
    return it.y94($sortByDistanceFrom);
  };
}
function PatternSorting$compareRouteCards$lambda_3(it) {
  return 0;
}
function PatternSorting$compareRouteCards$lambda_4(it) {
  return it.p8s_1.x94();
}
function PatternSorting$compareStopsOnRoute$lambda(it) {
  return patternServiceBucket(PatternSorting_instance, first(it.w8s_1));
}
function PatternSorting$compareStopsOnRoute$lambda_0($sortByDistanceFrom) {
  return function (it) {
    return it.u8s_1.y94($sortByDistanceFrom);
  };
}
function PatternSorting$compareStopsOnRoute$lambda_1(it) {
  return 0;
}
function PatternSorting$compareLeavesAtStop$lambda(it) {
  return patternServiceBucket(PatternSorting_instance, it);
}
function PatternSorting$compareLeavesAtStop$lambda_0(it) {
  return it.b8t_1;
}
var PatternSortingClass;
function PatternSorting() {
  if (PatternSortingClass === VOID) {
    class $ {
      z94(sortByDistanceFrom, context) {
        var tmp = PatternSorting$compareRouteCards$lambda;
        var tmp_0;
        if (!context.equals(Context_Favorites_getInstance())) {
          tmp_0 = PatternSorting$compareRouteCards$lambda_0;
        } else {
          tmp_0 = PatternSorting$compareRouteCards$lambda_1;
        }
        var tmp_1 = tmp_0;
        var tmp_2;
        if (!(sortByDistanceFrom == null)) {
          tmp_2 = PatternSorting$compareRouteCards$lambda_2(sortByDistanceFrom);
        } else {
          tmp_2 = PatternSorting$compareRouteCards$lambda_3;
        }
        var tmp_3 = tmp_2;
        return compareBy([tmp, tmp_1, tmp_3, PatternSorting$compareRouteCards$lambda_4]);
      }
      a95(sortByDistanceFrom) {
        var tmp = PatternSorting$compareStopsOnRoute$lambda;
        var tmp_0;
        if (!(sortByDistanceFrom == null)) {
          tmp_0 = PatternSorting$compareStopsOnRoute$lambda_0(sortByDistanceFrom);
        } else {
          tmp_0 = PatternSorting$compareStopsOnRoute$lambda_1;
        }
        return compareBy([tmp, tmp_0]);
      }
      b95() {
        var tmp = PatternSorting$compareLeavesAtStop$lambda;
        return compareBy([tmp, PatternSorting$compareLeavesAtStop$lambda_0]);
      }
    }
    initMetadataForObject($, 'PatternSorting');
    PatternSortingClass = $;
  }
  return PatternSortingClass;
}
var PatternSorting_instance;
function PatternSorting_getInstance() {
  return PatternSorting_instance;
}
//region block: init
com_mbta_tid_mbta_app_model_PatternSorting$stable = 0;
PatternSorting_instance = new (PatternSorting())();
//endregion
//region block: exports
export {
  PatternSorting_instance as PatternSorting_instance3rd10z8olpxdf,
};
//endregion

//# sourceMappingURL=PatternSorting.mjs.map
