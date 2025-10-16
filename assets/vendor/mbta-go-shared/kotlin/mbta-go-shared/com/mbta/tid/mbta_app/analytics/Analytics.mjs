import { mutableMapOfk2y3zt1azl40 as mutableMapOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  Paire9pteg33gng7 as Pair,
  to2cs3ny02qtbcb as to,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_analytics_Analytics$stable;
function logEvent($this, name, parameters) {
  var paramsMap = mutableMapOf(parameters.slice());
  $this.a8j(name, paramsMap);
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.b8j_1 = 'screen_view';
        this.c8j_1 = 'screen_name';
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var AnalyticsClass;
function Analytics() {
  if (AnalyticsClass === VOID) {
    class $ {
      constructor() {
        this.z8i_1 = null;
      }
      e8j(updatedFavorites, context, defaultDirection) {
        // Inline function 'kotlin.collections.groupBy' call
        var tmp0 = updatedFavorites.t1();
        // Inline function 'kotlin.collections.groupByTo' call
        var destination = LinkedHashMap().sc();
        var _iterator__ex2g4s = tmp0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var key = new (Pair())(element.u1().f8j_1, element.u1().g8j_1);
          // Inline function 'kotlin.collections.getOrPut' call
          var value = destination.j3(key);
          var tmp;
          if (value == null) {
            var answer = ArrayList().g1();
            destination.t3(key, answer);
            tmp = answer;
          } else {
            tmp = value;
          }
          var list = tmp;
          list.i(element);
        }
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_0 = destination.t1().x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          // Inline function 'kotlin.collections.component1' call
          var _routeStop = element_0.u1();
          // Inline function 'kotlin.collections.component2' call
          var routeStopFavorites = element_0.v1();
          // Inline function 'kotlin.collections.forEach' call
          var _iterator__ex2g4s_1 = routeStopFavorites.x();
          while (_iterator__ex2g4s_1.y()) {
            var element_1 = _iterator__ex2g4s_1.z();
            // Inline function 'kotlin.collections.component1' call
            var rsd = element_1.u1();
            // Inline function 'kotlin.collections.component2' call
            var isFavorited = element_1.v1();
            logEvent(this, 'updated_favorites', [to('action', isFavorited ? 'add' : 'remove'), to('route_id', rsd.f8j_1), to('stop_id', rsd.g8j_1), to('direction_id', '' + rsd.h8j_1), to('is_default_direction', '' + (rsd.h8j_1 === defaultDirection)), to('context', context.w3_1), to('updated_both_directions_at_once', '' + (routeStopFavorites.c1() === 2))]);
          }
        }
      }
      i8j(query) {
        logEvent(this, 'search', [to('query', query)]);
      }
      j8j(query) {
        logEvent(this, 'route_filter', [to('query', query)]);
      }
      k8j(favoritesCount) {
        this.d8j('favorites_count', '' + favoritesCount);
      }
    }
    initMetadataForClass($, 'Analytics');
    AnalyticsClass = $;
  }
  return AnalyticsClass;
}
//region block: init
com_mbta_tid_mbta_app_analytics_Analytics$stable = 8;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Analytics as Analytics1mdx7nc6a8dig,
};
//endregion

//# sourceMappingURL=Analytics.mjs.map
