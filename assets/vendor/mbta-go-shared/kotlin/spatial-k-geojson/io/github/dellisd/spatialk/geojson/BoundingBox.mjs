import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Position2rurtvk7dypvc as Position } from './Position.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  contentEquals5p44wfjhu6ta as contentEquals,
  contentHashCodem24x0wy7gjt7 as contentHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { jsonJoinxlx6ovh9z3d1 as jsonJoin } from './serialization/Utils.mjs';
import { BoundingBoxSerializer_getInstanceenvs9yobi01n as BoundingBoxSerializer_getInstance } from './serialization/BoundingBoxSerializer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var BoundingBoxClass;
function BoundingBox() {
  if (BoundingBoxClass === VOID) {
    class $ {
      static p1x(coordinates) {
        var $this = createThis(this);
        $this.o1x_1 = coordinates;
        // Inline function 'kotlin.require' call
        if (!($this.o1x_1.length === 4 || $this.o1x_1.length === 6)) {
          var message = 'Bounding Box coordinates must either have 4 or 6 values';
          throw IllegalArgumentException().q(toString(message));
        }
        return $this;
      }
      static q1x(west, south, east, north) {
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$0 = new Float64Array([west, south, east, north]);
        return this.p1x(tmp$ret$0);
      }
      static r1x(west, south, minAltitude, east, north, maxAltitude) {
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$0 = new Float64Array([west, south, minAltitude, east, north, maxAltitude]);
        return this.p1x(tmp$ret$0);
      }
      s1x() {
        var tmp;
        switch (get_hasAltitude(this)) {
          case true:
            tmp = Position().u1x(this.o1x_1[0], this.o1x_1[1], this.o1x_1[2]);
            break;
          case false:
            tmp = Position().v1x(this.o1x_1[0], this.o1x_1[1]);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
      }
      w1x() {
        var tmp;
        switch (get_hasAltitude(this)) {
          case true:
            tmp = Position().u1x(this.o1x_1[3], this.o1x_1[4], this.o1x_1[5]);
            break;
          case false:
            tmp = Position().v1x(this.o1x_1[2], this.o1x_1[3]);
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof BoundingBox()))
          THROW_CCE();
        if (!contentEquals(this.o1x_1, other.o1x_1))
          return false;
        return true;
      }
      hashCode() {
        return contentHashCode(this.o1x_1);
      }
      toString() {
        return 'BoundingBox(southwest=' + this.s1x().toString() + ', northeast=' + this.w1x().toString() + ')';
      }
      x1x() {
        return jsonJoin(this.o1x_1);
      }
    }
    initMetadataForClass($, 'BoundingBox', VOID, VOID, VOID, VOID, VOID, {0: BoundingBoxSerializer_getInstance});
    BoundingBoxClass = $;
  }
  return BoundingBoxClass;
}
function get_hasAltitude(_this__u8e3s4) {
  return _this__u8e3s4.o1x_1.length === 6;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  BoundingBox as BoundingBox1jv7w73fxljkp,
};
//endregion

//# sourceMappingURL=BoundingBox.mjs.map
