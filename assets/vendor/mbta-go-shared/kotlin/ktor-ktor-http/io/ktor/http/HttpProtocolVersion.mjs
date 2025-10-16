import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.v3v_1 = new (HttpProtocolVersion())('HTTP', 2, 0);
        this.w3v_1 = new (HttpProtocolVersion())('HTTP', 1, 1);
        this.x3v_1 = new (HttpProtocolVersion())('HTTP', 1, 0);
        this.y3v_1 = new (HttpProtocolVersion())('SPDY', 3, 0);
        this.z3v_1 = new (HttpProtocolVersion())('QUIC', 1, 0);
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
var HttpProtocolVersionClass;
function HttpProtocolVersion() {
  if (HttpProtocolVersionClass === VOID) {
    class $ {
      constructor(name, major, minor) {
        Companion_getInstance();
        this.a3w_1 = name;
        this.b3w_1 = major;
        this.c3w_1 = minor;
      }
      toString() {
        return this.a3w_1 + '/' + this.b3w_1 + '.' + this.c3w_1;
      }
      hashCode() {
        var result = getStringHashCode(this.a3w_1);
        result = imul(result, 31) + this.b3w_1 | 0;
        result = imul(result, 31) + this.c3w_1 | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof HttpProtocolVersion()))
          return false;
        var tmp0_other_with_cast = other instanceof HttpProtocolVersion() ? other : THROW_CCE();
        if (!(this.a3w_1 === tmp0_other_with_cast.a3w_1))
          return false;
        if (!(this.b3w_1 === tmp0_other_with_cast.b3w_1))
          return false;
        if (!(this.c3w_1 === tmp0_other_with_cast.c3w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'HttpProtocolVersion');
    HttpProtocolVersionClass = $;
  }
  return HttpProtocolVersionClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance312jiahuid5ey,
};
//endregion

//# sourceMappingURL=HttpProtocolVersion.mjs.map
