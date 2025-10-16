import { createAnnotatedEnumSerializer20ay4pme9p2h9 as createAnnotatedEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  SerializerFactory1qv9hivitncuv as SerializerFactory,
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Paire9pteg33gng7 as Pair } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  Route3cgwfigfgsfyp as Route,
  Line2j44elebm2qoz as Line,
  Context_Favorites_getInstance1fjx6ke9a3gxg as Context_Favorites_getInstance,
} from './RouteCardData.mjs';
import { toSet2orjxp16sotqu as toSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { RouteStopDirection3fy5ulsis346f as RouteStopDirection } from './Favorite.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { minus165a8u1e0x1lu as minus } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { compareTo3ankvs086tmwq as compareTo } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/compareTo.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RoutePattern_PatternsForStop$stable;
var com_mbta_tid_mbta_app_model_RoutePattern_$serializer$stable;
var com_mbta_tid_mbta_app_model_RoutePattern$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.h9d_1.v1();
}
function RoutePattern$Typicality$Companion$_anonymous__tdxm7g() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['typical', 'deviation', 'atypical', 'diversion', 'canonical_only'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.RoutePattern.Typicality', tmp, tmp_0, tmp$ret$5, null);
}
var Typicality_Typical_instance;
var Typicality_Deviation_instance;
var Typicality_Atypical_instance;
var Typicality_Diversion_instance;
var Typicality_CanonicalOnly_instance;
function values() {
  return [Typicality_Typical_getInstance(), Typicality_Deviation_getInstance(), Typicality_Atypical_getInstance(), Typicality_Diversion_getInstance(), Typicality_CanonicalOnly_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.h9d_1 = lazy(tmp_0, RoutePattern$Typicality$Companion$_anonymous__tdxm7g);
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
function Companion_getInstance() {
  Typicality_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var Typicality_entriesInitialized;
function Typicality_initEntries() {
  if (Typicality_entriesInitialized)
    return Unit_instance;
  Typicality_entriesInitialized = true;
  Typicality_Typical_instance = new (Typicality())('Typical', 0);
  Typicality_Deviation_instance = new (Typicality())('Deviation', 1);
  Typicality_Atypical_instance = new (Typicality())('Atypical', 2);
  Typicality_Diversion_instance = new (Typicality())('Diversion', 3);
  Typicality_CanonicalOnly_instance = new (Typicality())('CanonicalOnly', 4);
  Companion_getInstance();
}
function patternsByRouteOrLine($this, stopIds, globalData) {
  // Inline function 'kotlin.collections.flatMap' call
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = stopIds.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.getOrElse' call
    var tmp0_elvis_lhs = globalData.k8u_1.j3(element);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = emptyList();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var patternsIds = tmp;
    // Inline function 'kotlin.collections.mapNotNull' call
    // Inline function 'kotlin.collections.mapNotNullTo' call
    var destination_0 = ArrayList().g1();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = patternsIds.x();
    while (_iterator__ex2g4s_0.y()) {
      var element_0 = _iterator__ex2g4s_0.z();
      var pattern = globalData.m8u_1.j3(element_0);
      var tmp_0;
      if (pattern == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_0 = globalData.l8u_1.j3(pattern.x8z_1);
      }
      var route = tmp_0;
      var tmp_1;
      if (!(route == null) && !(pattern == null)) {
        tmp_1 = new (Pair())(route, pattern);
      } else {
        tmp_1 = null;
      }
      var tmp0_safe_receiver = tmp_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        destination_0.i(tmp0_safe_receiver);
      }
    }
    var list = destination_0;
    addAll(destination, list);
  }
  var allPatternsAtStopWithRoute = destination;
  // Inline function 'kotlin.collections.groupBy' call
  // Inline function 'kotlin.collections.groupByTo' call
  var destination_1 = LinkedHashMap().sc();
  var _iterator__ex2g4s_1 = allPatternsAtStopWithRoute.x();
  while (_iterator__ex2g4s_1.y()) {
    var element_1 = _iterator__ex2g4s_1.z();
    var route_0 = element_1.ch();
    var _pattern = element_1.dh();
    var tmp0_safe_receiver_0 = route_0.y8r_1;
    var tmp_2;
    if (tmp0_safe_receiver_0 == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_2 = globalData.j8u_1.j3(tmp0_safe_receiver_0);
    }
    var line = tmp_2;
    var tmp_3;
    if (!(line == null) && !route_0.b8s_1 && line.b93_1) {
      var tmp0 = globalData.q8u_1;
      // Inline function 'kotlin.collections.getOrElse' call
      var key = line.v92_1;
      var tmp0_elvis_lhs_0 = tmp0.j3(key);
      var tmp_4;
      if (tmp0_elvis_lhs_0 == null) {
        tmp_4 = emptyList();
      } else {
        tmp_4 = tmp0_elvis_lhs_0;
      }
      var tmp$ret$17 = tmp_4;
      tmp_3 = new (Line())(line, toSet(tmp$ret$17));
    } else {
      tmp_3 = new (Route())(route_0);
    }
    var key_0 = tmp_3;
    // Inline function 'kotlin.collections.getOrPut' call
    var value = destination_1.j3(key_0);
    var tmp_5;
    if (value == null) {
      var answer = ArrayList().g1();
      destination_1.t3(key_0, answer);
      tmp_5 = answer;
    } else {
      tmp_5 = value;
    }
    var list_0 = tmp_5;
    var tmp$ret$21 = element_1.bh_1;
    list_0.i(tmp$ret$21);
  }
  var patternsByRouteOrLine = destination_1;
  return patternsByRouteOrLine;
}
function patternsGroupedByLineOrRouteAndStop$skipNonFavorite(inFavorites, favoriteRouteStops, lineOrRoute, stop) {
  var tmp;
  if (inFavorites) {
    tmp = (favoriteRouteStops == null ? null : favoriteRouteStops.j1(new (Pair())(lineOrRoute.d8h(), stop.v8q_1))) === false;
  } else {
    tmp = false;
  }
  return tmp;
}
function patternsGroupedByLineOrRouteAndStop$rsd(lineOrRoute, stop, pattern) {
  return new (RouteStopDirection())(lineOrRoute.d8h(), stop.v8q_1, pattern.s8z_1);
}
function patternsGroupedByLineOrRouteAndStop$_anonymous_$_anonymous_$skipNonFavorite_oi41u9(inFavorites, $favorites, lineOrRoute, parentStop, pattern) {
  var tmp;
  if (inFavorites) {
    tmp = ($favorites == null ? null : $favorites.j1(patternsGroupedByLineOrRouteAndStop$rsd(lineOrRoute, parentStop, pattern))) === false;
  } else {
    tmp = false;
  }
  return tmp;
}
function RoutePattern$Companion$$childSerializers$_anonymous__f50na5() {
  return Companion_getInstance().r1n();
}
var TypicalityClass;
function Typicality() {
  if (TypicalityClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Typicality', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    TypicalityClass = $;
  }
  return TypicalityClass;
}
var PatternsForStopClass;
function PatternsForStop() {
  if (PatternsForStopClass === VOID) {
    class $ {
      constructor(allPatterns, patternsNotSeenAtEarlierStops) {
        this.n9b_1 = allPatterns;
        this.o9b_1 = patternsNotSeenAtEarlierStops;
      }
      toString() {
        return 'PatternsForStop(allPatterns=' + toString(this.n9b_1) + ', patternsNotSeenAtEarlierStops=' + toString(this.o9b_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.n9b_1);
        result = imul(result, 31) + hashCode(this.o9b_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PatternsForStop()))
          return false;
        var tmp0_other_with_cast = other instanceof PatternsForStop() ? other : THROW_CCE();
        if (!equals(this.n9b_1, tmp0_other_with_cast.n9b_1))
          return false;
        if (!equals(this.o9b_1, tmp0_other_with_cast.o9b_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'PatternsForStop');
    PatternsForStopClass = $;
  }
  return PatternsForStopClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.l9b_1 = [null, null, null, null, lazy(tmp_0, RoutePattern$Companion$$childSerializers$_anonymous__f50na5), null, null];
      }
      m9b(parentToAllStops, globalData, context, favorites) {
        // Inline function 'kotlin.collections.mutableSetOf' call
        var usedPatternIds = LinkedHashSet().f1();
        // Inline function 'kotlin.collections.mutableMapOf' call
        var patternsGrouped = LinkedHashMap().sc();
        var inFavorites = context.equals(Context_Favorites_getInstance());
        var tmp;
        if (favorites == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.map' call
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(favorites, 10));
          var _iterator__ex2g4s = favorites.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            var tmp$ret$2 = new (Pair())(item.f8j_1, item.g8j_1);
            destination.i(tmp$ret$2);
          }
          tmp = destination;
        }
        var tmp1_safe_receiver = tmp;
        var favoriteRouteStops = tmp1_safe_receiver == null ? null : toSet(tmp1_safe_receiver);
        // Inline function 'kotlin.run' call
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_0 = parentToAllStops.t1().x();
        while (_iterator__ex2g4s_0.y()) {
          var element = _iterator__ex2g4s_0.z();
          // Inline function 'kotlin.collections.component1' call
          var parentStop = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var allStopsForParent = element.v1();
          // Inline function 'kotlin.collections.filterNot' call
          var tmp0 = patternsByRouteOrLine(Companion_getInstance_0(), allStopsForParent, globalData);
          // Inline function 'kotlin.collections.filterNotTo' call
          var destination_0 = LinkedHashMap().sc();
          // Inline function 'kotlin.collections.iterator' call
          var _iterator__ex2g4s_1 = tmp0.t1().x();
          while (_iterator__ex2g4s_1.y()) {
            var element_0 = _iterator__ex2g4s_1.z();
            // Inline function 'kotlin.collections.component1' call
            var _key = element_0.u1();
            // Inline function 'kotlin.collections.component2' call
            var routePatterns = element_0.v1();
            // Inline function 'kotlin.collections.map' call
            // Inline function 'kotlin.collections.mapTo' call
            var destination_1 = ArrayList().w(collectionSizeOrDefault(routePatterns, 10));
            var _iterator__ex2g4s_2 = routePatterns.x();
            while (_iterator__ex2g4s_2.y()) {
              var item_0 = _iterator__ex2g4s_2.z();
              var tmp$ret$11 = item_0.r8z_1;
              destination_1.i(tmp$ret$11);
            }
            if (!usedPatternIds.d3(toSet(destination_1))) {
              destination_0.t3(element_0.u1(), element_0.v1());
            }
          }
          var patternsByRouteOrLine_0 = destination_0;
          // Inline function 'kotlin.collections.iterator' call
          var _iterator__ex2g4s_3 = patternsByRouteOrLine_0.t1().x();
          $l$loop: while (_iterator__ex2g4s_3.y()) {
            var _destruct__k2r9zo = _iterator__ex2g4s_3.z();
            // Inline function 'kotlin.collections.component1' call
            var lineOrRoute = _destruct__k2r9zo.u1();
            // Inline function 'kotlin.collections.component2' call
            var routePatterns_0 = _destruct__k2r9zo.v1();
            if (patternsGroupedByLineOrRouteAndStop$skipNonFavorite(inFavorites, favoriteRouteStops, lineOrRoute, parentStop))
              continue $l$loop;
            // Inline function 'kotlin.collections.getOrPut' call
            var value = patternsGrouped.j3(lineOrRoute);
            var tmp_0;
            if (value == null) {
              // Inline function 'kotlin.collections.mutableMapOf' call
              var answer = LinkedHashMap().sc();
              patternsGrouped.t3(lineOrRoute, answer);
              tmp_0 = answer;
            } else {
              tmp_0 = value;
            }
            var routeStops = tmp_0;
            // Inline function 'kotlin.collections.map' call
            // Inline function 'kotlin.collections.mapTo' call
            var destination_2 = ArrayList().w(collectionSizeOrDefault(routePatterns_0, 10));
            var _iterator__ex2g4s_4 = routePatterns_0.x();
            while (_iterator__ex2g4s_4.y()) {
              var item_1 = _iterator__ex2g4s_4.z();
              var tmp$ret$23 = item_1.r8z_1;
              destination_2.i(tmp$ret$23);
            }
            var patternsNotSeenAtEarlierStops = minus(toSet(destination_2), usedPatternIds);
            // Inline function 'kotlin.collections.getOrPut' call
            var value_0 = routeStops.j3(parentStop);
            var tmp_1;
            if (value_0 == null) {
              // Inline function 'kotlin.collections.mapNotNull' call
              // Inline function 'kotlin.collections.mapNotNullTo' call
              var destination_3 = ArrayList().g1();
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_5 = routePatterns_0.x();
              while (_iterator__ex2g4s_5.y()) {
                var element_1 = _iterator__ex2g4s_5.z();
                var tmp0_safe_receiver = patternsGroupedByLineOrRouteAndStop$_anonymous_$_anonymous_$skipNonFavorite_oi41u9(inFavorites, favorites, lineOrRoute, parentStop, element_1) ? null : element_1;
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  // Inline function 'kotlin.let' call
                  destination_3.i(tmp0_safe_receiver);
                }
              }
              var answer_0 = new (PatternsForStop())(destination_3, patternsNotSeenAtEarlierStops);
              routeStops.t3(parentStop, answer_0);
              tmp_1 = answer_0;
            } else {
              tmp_1 = value_0;
            }
            if (!inFavorites) {
              // Inline function 'kotlin.collections.map' call
              // Inline function 'kotlin.collections.mapTo' call
              var destination_4 = ArrayList().w(collectionSizeOrDefault(routePatterns_0, 10));
              var _iterator__ex2g4s_6 = routePatterns_0.x();
              while (_iterator__ex2g4s_6.y()) {
                var item_2 = _iterator__ex2g4s_6.z();
                var tmp$ret$35 = item_2.r8z_1;
                destination_4.i(tmp$ret$35);
              }
              usedPatternIds.d1(destination_4);
            }
          }
        }
        return patternsGrouped;
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RoutePattern', this, 7);
        tmp0_serialDesc.p1b('id', false);
        tmp0_serialDesc.p1b('direction_id', false);
        tmp0_serialDesc.p1b('name', false);
        tmp0_serialDesc.p1b('sort_order', false);
        tmp0_serialDesc.p1b('typicality', false);
        tmp0_serialDesc.p1b('representative_trip_id', false);
        tmp0_serialDesc.p1b('route_id', false);
        this.i9d_1 = tmp0_serialDesc;
      }
      j9d(encoder, value) {
        var tmp0_desc = this.i9d_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().l9b_1;
        tmp1_output.l15(tmp0_desc, 0, value.r8z_1);
        tmp1_output.g15(tmp0_desc, 1, value.s8z_1);
        tmp1_output.l15(tmp0_desc, 2, value.t8z_1);
        tmp1_output.g15(tmp0_desc, 3, value.u8z_1);
        tmp1_output.p15(tmp0_desc, 4, tmp2_cached[4].v1(), value.v8z_1);
        tmp1_output.l15(tmp0_desc, 5, value.w8z_1);
        tmp1_output.l15(tmp0_desc, 6, value.x8z_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.j9d(encoder, value instanceof RoutePattern() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.i9d_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = 0;
        var tmp6_local2 = null;
        var tmp7_local3 = 0;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_local6 = null;
        var tmp11_input = decoder.v13(tmp0_desc);
        var tmp12_cached = Companion_getInstance_0().l9b_1;
        if (tmp11_input.l14()) {
          tmp4_local0 = tmp11_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp11_input.a14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp11_input.f14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp11_input.a14(tmp0_desc, 3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp11_input.j14(tmp0_desc, 4, tmp12_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp11_input.f14(tmp0_desc, 5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
          tmp10_local6 = tmp11_input.f14(tmp0_desc, 6);
          tmp3_bitMask0 = tmp3_bitMask0 | 64;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp11_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp11_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp11_input.a14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp11_input.f14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp11_input.a14(tmp0_desc, 3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp11_input.j14(tmp0_desc, 4, tmp12_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp11_input.f14(tmp0_desc, 5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              case 6:
                tmp10_local6 = tmp11_input.f14(tmp0_desc, 6);
                tmp3_bitMask0 = tmp3_bitMask0 | 64;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp11_input.w13(tmp0_desc);
        return RoutePattern().k9d(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, tmp10_local6, null);
      }
      fz() {
        return this.i9d_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().l9b_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), IntSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance(), get_nullable(tmp0_cached[4].v1()), StringSerializer_getInstance(), StringSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
function Typicality_Typical_getInstance() {
  Typicality_initEntries();
  return Typicality_Typical_instance;
}
function Typicality_Deviation_getInstance() {
  Typicality_initEntries();
  return Typicality_Deviation_instance;
}
function Typicality_Atypical_getInstance() {
  Typicality_initEntries();
  return Typicality_Atypical_instance;
}
function Typicality_Diversion_getInstance() {
  Typicality_initEntries();
  return Typicality_Diversion_instance;
}
function Typicality_CanonicalOnly_getInstance() {
  Typicality_initEntries();
  return Typicality_CanonicalOnly_instance;
}
var RoutePatternClass;
function RoutePattern() {
  if (RoutePatternClass === VOID) {
    class $ {
      j97() {
        return this.v8z_1 == null || equals(this.v8z_1, Typicality_Typical_getInstance());
      }
      l9d(other) {
        return compareTo(this.u8z_1, other.u8z_1);
      }
      d(other) {
        return this.l9d(other instanceof RoutePattern() ? other : THROW_CCE());
      }
      toString() {
        return 'RoutePattern(id=' + this.r8z_1 + ', directionId=' + this.s8z_1 + ', name=' + this.t8z_1 + ', sortOrder=' + this.u8z_1 + ', typicality=' + toString_0(this.v8z_1) + ', representativeTripId=' + this.w8z_1 + ', routeId=' + this.x8z_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.r8z_1);
        result = imul(result, 31) + this.s8z_1 | 0;
        result = imul(result, 31) + getStringHashCode(this.t8z_1) | 0;
        result = imul(result, 31) + this.u8z_1 | 0;
        result = imul(result, 31) + (this.v8z_1 == null ? 0 : this.v8z_1.hashCode()) | 0;
        result = imul(result, 31) + getStringHashCode(this.w8z_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.x8z_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RoutePattern()))
          return false;
        var tmp0_other_with_cast = other instanceof RoutePattern() ? other : THROW_CCE();
        if (!(this.r8z_1 === tmp0_other_with_cast.r8z_1))
          return false;
        if (!(this.s8z_1 === tmp0_other_with_cast.s8z_1))
          return false;
        if (!(this.t8z_1 === tmp0_other_with_cast.t8z_1))
          return false;
        if (!(this.u8z_1 === tmp0_other_with_cast.u8z_1))
          return false;
        if (!equals(this.v8z_1, tmp0_other_with_cast.v8z_1))
          return false;
        if (!(this.w8z_1 === tmp0_other_with_cast.w8z_1))
          return false;
        if (!(this.x8z_1 === tmp0_other_with_cast.x8z_1))
          return false;
        return true;
      }
      static k9d(seen0, id, directionId, name, sortOrder, typicality, representativeTripId, routeId, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(127 === (127 & seen0))) {
          throwMissingFieldException(seen0, 127, $serializer_getInstance().i9d_1);
        }
        var $this = createThis(this);
        $this.r8z_1 = id;
        $this.s8z_1 = directionId;
        $this.t8z_1 = name;
        $this.u8z_1 = sortOrder;
        $this.v8z_1 = typicality;
        $this.w8z_1 = representativeTripId;
        $this.x8z_1 = routeId;
        return $this;
      }
    }
    initMetadataForClass($, 'RoutePattern', VOID, VOID, [Comparable()], VOID, VOID, {0: $serializer_getInstance});
    RoutePatternClass = $;
  }
  return RoutePatternClass;
}
//region block: init
com_mbta_tid_mbta_app_model_RoutePattern_PatternsForStop$stable = 8;
com_mbta_tid_mbta_app_model_RoutePattern_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RoutePattern$stable = 0;
//endregion
//region block: exports
export {
  Typicality_CanonicalOnly_getInstance as Typicality_CanonicalOnly_getInstance18yuid4mj5env,
  Typicality_Typical_getInstance as Typicality_Typical_getInstance1vjbpi9hmbchb,
  $serializer_getInstance as $serializer_getInstance2kfvl6yrgc8qq,
  Companion_getInstance_0 as Companion_getInstance3gttzdaxvs8n9,
};
//endregion

//# sourceMappingURL=RoutePattern.mjs.map
