import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_map_ColorPalette$stable;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.i8p_1 = new (ColorPalette())('#8A9199', '#FFFFFF', '#192026');
        this.j8p_1 = new (ColorPalette())('#8A9199', '#000000', '#E5E5E3');
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var ColorPaletteClass;
function ColorPalette() {
  if (ColorPaletteClass === VOID) {
    class $ {
      constructor(deemphasized, fill3, text) {
        Companion_getInstance();
        this.k8p_1 = deemphasized;
        this.l8p_1 = fill3;
        this.m8p_1 = text;
      }
      toString() {
        return 'ColorPalette(deemphasized=' + this.k8p_1 + ', fill3=' + this.l8p_1 + ', text=' + this.m8p_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.k8p_1);
        result = imul(result, 31) + getStringHashCode(this.l8p_1) | 0;
        result = imul(result, 31) + getStringHashCode(this.m8p_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ColorPalette()))
          return false;
        var tmp0_other_with_cast = other instanceof ColorPalette() ? other : THROW_CCE();
        if (!(this.k8p_1 === tmp0_other_with_cast.k8p_1))
          return false;
        if (!(this.l8p_1 === tmp0_other_with_cast.l8p_1))
          return false;
        if (!(this.m8p_1 === tmp0_other_with_cast.m8p_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'ColorPalette');
    ColorPaletteClass = $;
  }
  return ColorPaletteClass;
}
//region block: init
com_mbta_tid_mbta_app_map_ColorPalette$stable = 0;
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3gwb0mpng5ciu,
};
//endregion

//# sourceMappingURL=ColorPalette.mjs.map
