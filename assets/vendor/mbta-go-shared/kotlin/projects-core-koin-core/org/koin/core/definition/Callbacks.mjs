import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CallbacksClass;
function Callbacks() {
  if (CallbacksClass === VOID) {
    class $ {
      constructor(onClose) {
        onClose = onClose === VOID ? null : onClose;
        this.i7w_1 = onClose;
      }
      toString() {
        return 'Callbacks(onClose=' + toString(this.i7w_1) + ')';
      }
      hashCode() {
        return this.i7w_1 == null ? 0 : hashCode(this.i7w_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Callbacks()))
          return false;
        var tmp0_other_with_cast = other instanceof Callbacks() ? other : THROW_CCE();
        if (!equals(this.i7w_1, tmp0_other_with_cast.i7w_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Callbacks', Callbacks);
    CallbacksClass = $;
  }
  return CallbacksClass;
}
//region block: exports
export {
  Callbacks as Callbacks228mhkft6bagp,
};
//endregion

//# sourceMappingURL=Callbacks.mjs.map
