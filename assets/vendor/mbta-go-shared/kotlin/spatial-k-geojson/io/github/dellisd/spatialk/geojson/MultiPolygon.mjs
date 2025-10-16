import { getValue48kllevslyh6 as getValue } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_jsonArray18sglwhl4pclz as get_jsonArray,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  toPosition5jfnwu8drugg as toPosition,
  toBboxw4lqf28jmpao as toBbox,
  jsonJoin1m0octu4cr9s7 as jsonJoin,
  jsonProp2nw2o9sd77omw as jsonProp,
} from './serialization/Utils.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Geometry1mskyaxwfg3x4 as Geometry } from './Geometry.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { GeometrySerializer_getInstance1ncsg6chm8thv as GeometrySerializer_getInstance } from './serialization/GeometrySerializer.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      y1x(json) {
        // Inline function 'kotlin.require' call
        if (!(get_jsonPrimitive(getValue(json, 'type')).n1n() === 'MultiPolygon')) {
          var message = 'Object "type" is not "MultiPolygon".';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.collections.map' call
        var this_0 = get_jsonArray(getValue(json, 'coordinates'));
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.map' call
          var this_1 = get_jsonArray(item);
          // Inline function 'kotlin.collections.mapTo' call
          var destination_0 = ArrayList().w(collectionSizeOrDefault(this_1, 10));
          var _iterator__ex2g4s_0 = this_1.x();
          while (_iterator__ex2g4s_0.y()) {
            var item_0 = _iterator__ex2g4s_0.z();
            // Inline function 'kotlin.collections.map' call
            var this_2 = get_jsonArray(item_0);
            // Inline function 'kotlin.collections.mapTo' call
            var destination_1 = ArrayList().w(collectionSizeOrDefault(this_2, 10));
            var _iterator__ex2g4s_1 = this_2.x();
            while (_iterator__ex2g4s_1.y()) {
              var item_1 = _iterator__ex2g4s_1.z();
              var tmp$ret$2 = toPosition(get_jsonArray(item_1));
              destination_1.i(tmp$ret$2);
            }
            destination_0.i(destination_1);
          }
          destination.i(destination_0);
        }
        var coords = destination;
        var tmp0_safe_receiver = json.lk('bbox');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonArray(tmp0_safe_receiver);
        var bbox = tmp1_safe_receiver == null ? null : toBbox(tmp1_safe_receiver);
        return MultiPolygon().s1y(coords, bbox);
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
function MultiPolygon$json$lambda(polygon) {
  return jsonJoin(polygon, MultiPolygon$json$lambda$lambda);
}
function MultiPolygon$json$lambda$lambda(it) {
  return jsonJoin(it, Position$json$ref());
}
function Position$json$ref() {
  var l = function (p0) {
    return p0.x1x();
  };
  l.callableName = 'json';
  return l;
}
var MultiPolygonClass;
function MultiPolygon() {
  if (MultiPolygonClass === VOID) {
    class $ extends Geometry() {
      static s1y(coordinates, bbox) {
        bbox = bbox === VOID ? null : bbox;
        var $this = this.z1x();
        $this.q1y_1 = coordinates;
        $this.r1y_1 = bbox;
        return $this;
      }
      a1y() {
        return this.r1y_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof MultiPolygon()))
          THROW_CCE();
        if (!equals(this.q1y_1, other.q1y_1))
          return false;
        if (!equals(this.r1y_1, other.r1y_1))
          return false;
        return true;
      }
      hashCode() {
        var result = hashCode(this.q1y_1);
        var tmp = imul(31, result);
        var tmp0_safe_receiver = this.r1y_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
        result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        return result;
      }
      x1x() {
        var tmp = jsonProp(this.r1y_1);
        return '{"type":"MultiPolygon",' + tmp + '"coordinates":' + jsonJoin(this.q1y_1, MultiPolygon$json$lambda) + '}';
      }
    }
    initMetadataForClass($, 'MultiPolygon', VOID, VOID, VOID, VOID, VOID, {0: GeometrySerializer_getInstance});
    MultiPolygonClass = $;
  }
  return MultiPolygonClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance2404uh0ay56pc,
  MultiPolygon as MultiPolygon1zdy4pbyiwmu9,
};
//endregion

//# sourceMappingURL=MultiPolygon.mjs.map
