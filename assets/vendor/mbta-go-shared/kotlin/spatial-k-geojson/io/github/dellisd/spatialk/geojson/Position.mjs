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
import { getOrNull2un4612fzb00u as getOrNull } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  contentEquals5p44wfjhu6ta as contentEquals,
  contentHashCodem24x0wy7gjt7 as contentHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { jsonJoinxlx6ovh9z3d1 as jsonJoin } from './serialization/Utils.mjs';
import { PositionSerializer_getInstance13wixpw811m18 as PositionSerializer_getInstance } from './serialization/PositionSerializer.mjs';
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
var PositionClass;
function Position() {
  if (PositionClass === VOID) {
    class $ {
      static z1y(coordinates) {
        var $this = createThis(this);
        $this.t1x_1 = coordinates;
        // Inline function 'kotlin.require' call
        if (!($this.t1x_1.length >= 2)) {
          var message = 'At least two coordinates must be provided';
          throw IllegalArgumentException().q(toString(message));
        }
        return $this;
      }
      static v1x(longitude, latitude) {
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$0 = new Float64Array([longitude, latitude]);
        return this.z1y(tmp$ret$0);
      }
      static u1x(longitude, latitude, altitude) {
        // Inline function 'kotlin.doubleArrayOf' call
        var tmp$ret$0 = new Float64Array([longitude, latitude, altitude]);
        return this.z1y(tmp$ret$0);
      }
      static a1z(longitude, latitude, altitude) {
        var tmp;
        if (altitude == null) {
          // Inline function 'kotlin.doubleArrayOf' call
          tmp = new Float64Array([longitude, latitude]);
        } else {
          // Inline function 'kotlin.doubleArrayOf' call
          tmp = new Float64Array([longitude, latitude, altitude]);
        }
        return this.z1y(tmp);
      }
      b1z() {
        return this.t1x_1[0];
      }
      c1z() {
        return this.t1x_1[1];
      }
      d1z() {
        return getOrNull(this.t1x_1, 2);
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof Position()))
          THROW_CCE();
        if (!contentEquals(this.t1x_1, other.t1x_1))
          return false;
        return true;
      }
      hashCode() {
        return contentHashCode(this.t1x_1);
      }
      toString() {
        return 'LngLat(longitude=' + this.b1z() + ', latitude=' + this.c1z() + ', altitude=' + this.d1z() + ')';
      }
      x1x() {
        return jsonJoin(this.t1x_1);
      }
    }
    initMetadataForClass($, 'Position', VOID, VOID, VOID, VOID, VOID, {0: PositionSerializer_getInstance});
    PositionClass = $;
  }
  return PositionClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Position as Position2rurtvk7dypvc,
};
//endregion

//# sourceMappingURL=Position.mjs.map
