import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
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
var BreadcrumbClass;
function Breadcrumb() {
  if (BreadcrumbClass === VOID) {
    class $ {
      constructor(level, type, message, category, data) {
        level = level === VOID ? null : level;
        type = type === VOID ? null : type;
        message = message === VOID ? null : message;
        category = category === VOID ? null : category;
        data = data === VOID ? null : data;
        this.c20_1 = level;
        this.d20_1 = type;
        this.e20_1 = message;
        this.f20_1 = category;
        this.g20_1 = data;
      }
      toString() {
        return 'Breadcrumb(level=' + toString(this.c20_1) + ', type=' + this.d20_1 + ', message=' + this.e20_1 + ', category=' + this.f20_1 + ', data=' + toString(this.g20_1) + ')';
      }
      hashCode() {
        var result = this.c20_1 == null ? 0 : this.c20_1.hashCode();
        result = imul(result, 31) + (this.d20_1 == null ? 0 : getStringHashCode(this.d20_1)) | 0;
        result = imul(result, 31) + (this.e20_1 == null ? 0 : getStringHashCode(this.e20_1)) | 0;
        result = imul(result, 31) + (this.f20_1 == null ? 0 : getStringHashCode(this.f20_1)) | 0;
        result = imul(result, 31) + (this.g20_1 == null ? 0 : hashCode(this.g20_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Breadcrumb()))
          return false;
        var tmp0_other_with_cast = other instanceof Breadcrumb() ? other : THROW_CCE();
        if (!equals(this.c20_1, tmp0_other_with_cast.c20_1))
          return false;
        if (!(this.d20_1 == tmp0_other_with_cast.d20_1))
          return false;
        if (!(this.e20_1 == tmp0_other_with_cast.e20_1))
          return false;
        if (!(this.f20_1 == tmp0_other_with_cast.f20_1))
          return false;
        if (!equals(this.g20_1, tmp0_other_with_cast.g20_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Breadcrumb', Breadcrumb);
    BreadcrumbClass = $;
  }
  return BreadcrumbClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Breadcrumb as Breadcrumb3usz2l38hmvyw,
};
//endregion

//# sourceMappingURL=Breadcrumb.mjs.map
