import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { compareTo3ankvs086tmwq as compareTo } from './js/compareTo.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import { identityHashCode27r2jreowdkzk as identityHashCode } from './js/coreRuntime.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from './Comparable.mjs';
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
var EnumClass;
function Enum() {
  if (EnumClass === VOID) {
    class $ {
      constructor(name, ordinal) {
        this.w3_1 = name;
        this.x3_1 = ordinal;
      }
      y3() {
        return this.w3_1;
      }
      z3() {
        return this.x3_1;
      }
      a4(other) {
        return compareTo(this.x3_1, other.x3_1);
      }
      d(other) {
        return this.a4(other instanceof Enum() ? other : THROW_CCE());
      }
      equals(other) {
        return this === other;
      }
      hashCode() {
        return identityHashCode(this);
      }
      toString() {
        return this.w3_1;
      }
    }
    initMetadataForClass($, 'Enum', VOID, VOID, [Comparable()]);
    EnumClass = $;
  }
  return EnumClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Enum as Enum3alwj03lh1n41,
};
//endregion

//# sourceMappingURL=Enum.mjs.map
