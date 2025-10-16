import { getNumberHashCode2l4nbdcihl25f as getNumberHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/bitUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_shape_Path_Point$stable;
var com_mbta_tid_mbta_app_shape_Path_Rect$stable;
var com_mbta_tid_mbta_app_shape_Path$stable;
var PointClass;
function Point() {
  if (PointClass === VOID) {
    class $ {
      constructor(x, y) {
        this.ba8_1 = x;
        this.ca8_1 = y;
      }
      toString() {
        return 'Point(x=' + this.ba8_1 + ', y=' + this.ca8_1 + ')';
      }
      hashCode() {
        var result = getNumberHashCode(this.ba8_1);
        result = imul(result, 31) + getNumberHashCode(this.ca8_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Point()))
          return false;
        var tmp0_other_with_cast = other instanceof Point() ? other : THROW_CCE();
        if (!equals(this.ba8_1, tmp0_other_with_cast.ba8_1))
          return false;
        if (!equals(this.ca8_1, tmp0_other_with_cast.ca8_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Point');
    PointClass = $;
  }
  return PointClass;
}
var RectClass;
function Rect() {
  if (RectClass === VOID) {
    class $ {
      constructor(minX, maxX, minY, maxY) {
        this.da8_1 = minX;
        this.ea8_1 = maxX;
        this.fa8_1 = minY;
        this.ga8_1 = maxY;
        this.ha8_1 = this.ea8_1 - this.da8_1;
        this.ia8_1 = this.ga8_1 - this.fa8_1;
      }
      toString() {
        return 'Rect(minX=' + this.da8_1 + ', maxX=' + this.ea8_1 + ', minY=' + this.fa8_1 + ', maxY=' + this.ga8_1 + ')';
      }
      hashCode() {
        var result = getNumberHashCode(this.da8_1);
        result = imul(result, 31) + getNumberHashCode(this.ea8_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.fa8_1) | 0;
        result = imul(result, 31) + getNumberHashCode(this.ga8_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Rect()))
          return false;
        var tmp0_other_with_cast = other instanceof Rect() ? other : THROW_CCE();
        if (!equals(this.da8_1, tmp0_other_with_cast.da8_1))
          return false;
        if (!equals(this.ea8_1, tmp0_other_with_cast.ea8_1))
          return false;
        if (!equals(this.fa8_1, tmp0_other_with_cast.fa8_1))
          return false;
        if (!equals(this.ga8_1, tmp0_other_with_cast.ga8_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Rect');
    RectClass = $;
  }
  return RectClass;
}
function lerp(x1, x2, t) {
  return x1 * (1 - t) + x2 * t;
}
//region block: init
com_mbta_tid_mbta_app_shape_Path_Point$stable = 0;
com_mbta_tid_mbta_app_shape_Path_Rect$stable = 0;
com_mbta_tid_mbta_app_shape_Path$stable = 0;
//endregion
//region block: exports
export {
  Point as Point3pc5o155wu3su,
  Rect as Rect9h7fn4brxvs9,
  lerp as lerpueh93lx3mh8q,
};
//endregion

//# sourceMappingURL=CrossPlatformPathTypes.mjs.map
