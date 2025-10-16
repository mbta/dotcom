import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CommonThreadLocalClass;
function CommonThreadLocal() {
  if (CommonThreadLocalClass === VOID) {
    class $ {
      constructor() {
        this.q29_1 = null;
      }
      r29() {
        var tmp = this.q29_1;
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      s29(value) {
        this.q29_1 = value;
      }
    }
    initMetadataForClass($, 'CommonThreadLocal', CommonThreadLocal);
    CommonThreadLocalClass = $;
  }
  return CommonThreadLocalClass;
}
function commonThreadLocal(name) {
  return new (CommonThreadLocal())();
}
//region block: exports
export {
  commonThreadLocal as commonThreadLocal18t70xomalc6z,
};
//endregion

//# sourceMappingURL=ThreadLocal.mjs.map
