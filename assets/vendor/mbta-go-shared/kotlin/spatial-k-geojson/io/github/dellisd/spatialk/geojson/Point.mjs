import { getValue48kllevslyh6 as getValue } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import {
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_jsonArray18sglwhl4pclz as get_jsonArray,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  toPosition5jfnwu8drugg as toPosition,
  toBboxw4lqf28jmpao as toBbox,
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
        if (!(get_jsonPrimitive(getValue(json, 'type')).n1n() === 'Point')) {
          var message = 'Object "type" is not "Point".';
          throw IllegalArgumentException().q(toString(message));
        }
        var coords = toPosition(get_jsonArray(getValue(json, 'coordinates')));
        var tmp0_safe_receiver = json.lk('bbox');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonArray(tmp0_safe_receiver);
        var bbox = tmp1_safe_receiver == null ? null : toBbox(tmp1_safe_receiver);
        return Point().v1y(coords, bbox);
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
var PointClass;
function Point() {
  if (PointClass === VOID) {
    class $ extends Geometry() {
      static v1y(coordinates, bbox) {
        bbox = bbox === VOID ? null : bbox;
        var $this = this.z1x();
        $this.t1y_1 = coordinates;
        $this.u1y_1 = bbox;
        return $this;
      }
      a1y() {
        return this.u1y_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof Point()))
          THROW_CCE();
        if (!this.t1y_1.equals(other.t1y_1))
          return false;
        if (!equals(this.u1y_1, other.u1y_1))
          return false;
        return true;
      }
      hashCode() {
        var result = this.t1y_1.hashCode();
        var tmp = imul(31, result);
        var tmp0_safe_receiver = this.u1y_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
        result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        return result;
      }
      x1x() {
        return '{"type":"Point",' + jsonProp(this.u1y_1) + '"coordinates":' + this.t1y_1.x1x() + '}';
      }
    }
    initMetadataForClass($, 'Point', VOID, VOID, VOID, VOID, VOID, {0: GeometrySerializer_getInstance});
    PointClass = $;
  }
  return PointClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance1pecasv1qx7vb,
  Point as Point298ix16jijg5m,
};
//endregion

//# sourceMappingURL=Point.mjs.map
