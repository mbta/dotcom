import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var IndexedValueClass;
function IndexedValue() {
  if (IndexedValueClass === VOID) {
    class $ {
      constructor(index, value) {
        this.bo_1 = index;
        this.co_1 = value;
      }
      toString() {
        return 'IndexedValue(index=' + this.bo_1 + ', value=' + toString(this.co_1) + ')';
      }
      hashCode() {
        var result = this.bo_1;
        result = imul(result, 31) + (this.co_1 == null ? 0 : hashCode(this.co_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof IndexedValue()))
          return false;
        var tmp0_other_with_cast = other instanceof IndexedValue() ? other : THROW_CCE();
        if (!(this.bo_1 === tmp0_other_with_cast.bo_1))
          return false;
        if (!equals(this.co_1, tmp0_other_with_cast.co_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'IndexedValue');
    IndexedValueClass = $;
  }
  return IndexedValueClass;
}
//region block: exports
export {
  IndexedValue as IndexedValue22atz80p92rrf,
};
//endregion

//# sourceMappingURL=IndexedValue.mjs.map
