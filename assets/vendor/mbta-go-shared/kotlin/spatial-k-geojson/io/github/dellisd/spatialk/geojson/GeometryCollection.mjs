import { getValue48kllevslyh6 as getValue } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_jsonArray18sglwhl4pclz as get_jsonArray,
  get_jsonObject2u4z2ch1uuca9 as get_jsonObject,
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
  Companion_instance2g2g24473apoz as Companion_instance,
  Geometry1mskyaxwfg3x4 as Geometry,
} from './Geometry.mjs';
import {
  toBboxw4lqf28jmpao as toBbox,
  jsonProp2nw2o9sd77omw as jsonProp,
  jsonJoin1m0octu4cr9s7 as jsonJoin,
} from './serialization/Utils.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { Collection1k04j3hzsbod0 as Collection } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
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
        if (!(get_jsonPrimitive(getValue(json, 'type')).n1n() === 'GeometryCollection')) {
          var message = 'Object "type" is not "GeometryCollection".';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.collections.map' call
        var this_0 = get_jsonArray(getValue(json, 'geometries'));
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$2 = Companion_instance.y1x(get_jsonObject(item));
          destination.i(tmp$ret$2);
        }
        var geometries = destination;
        var tmp0_safe_receiver = json.lk('bbox');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonArray(tmp0_safe_receiver);
        var bbox = tmp1_safe_receiver == null ? null : toBbox(tmp1_safe_receiver);
        return GeometryCollection().d1y(geometries, bbox);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance_0;
function Companion_getInstance() {
  return Companion_instance_0;
}
function GeometryCollection$json$lambda(it) {
  return it.x1x();
}
var GeometryCollectionClass;
function GeometryCollection() {
  if (GeometryCollectionClass === VOID) {
    class $ extends Geometry() {
      static d1y(geometries, bbox) {
        bbox = bbox === VOID ? null : bbox;
        var $this = this.z1x();
        $this.b1y_1 = geometries;
        $this.c1y_1 = bbox;
        return $this;
      }
      a1y() {
        return this.c1y_1;
      }
      c1() {
        return this.b1y_1.c1();
      }
      e1y(element) {
        return this.b1y_1.j1(element);
      }
      j1(element) {
        if (!(element instanceof Geometry()))
          return false;
        return this.e1y(element instanceof Geometry() ? element : THROW_CCE());
      }
      f1y(elements) {
        return this.b1y_1.d3(elements);
      }
      d3(elements) {
        return this.f1y(elements);
      }
      h1() {
        return this.b1y_1.h1();
      }
      x() {
        return this.b1y_1.x();
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof GeometryCollection()))
          THROW_CCE();
        if (!equals(this.b1y_1, other.b1y_1))
          return false;
        if (!equals(this.c1y_1, other.c1y_1))
          return false;
        return true;
      }
      hashCode() {
        var result = hashCode(this.b1y_1);
        var tmp = imul(31, result);
        var tmp0_safe_receiver = this.c1y_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
        result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        return result;
      }
      x1x() {
        var tmp = jsonProp(this.c1y_1);
        return '{"type":"GeometryCollection",' + tmp + '"geometries":' + jsonJoin(this.b1y_1, GeometryCollection$json$lambda) + '}';
      }
    }
    initMetadataForClass($, 'GeometryCollection', VOID, VOID, [Geometry(), Collection()], VOID, VOID, {0: GeometrySerializer_getInstance});
    GeometryCollectionClass = $;
  }
  return GeometryCollectionClass;
}
//region block: init
Companion_instance_0 = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance_0 as Companion_instancetxcectt6iuue,
  GeometryCollection as GeometryCollection9es8rd9xg8f4,
};
//endregion

//# sourceMappingURL=GeometryCollection.mjs.map
