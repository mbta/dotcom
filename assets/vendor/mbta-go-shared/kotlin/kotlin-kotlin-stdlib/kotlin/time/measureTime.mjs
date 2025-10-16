import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import {
  Duration__toString_impl_8d916b11f1kpclwmkpg as Duration__toString_impl_8d916b,
  Duration__hashCode_impl_u4exz629donm5f9ouki as Duration__hashCode_impl_u4exz6,
} from './Duration.mjs';
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
var TimedValueClass;
function TimedValue() {
  if (TimedValueClass === VOID) {
    class $ {
      constructor(value, duration) {
        this.lw_1 = value;
        this.mw_1 = duration;
      }
      toString() {
        return 'TimedValue(value=' + toString(this.lw_1) + ', duration=' + Duration__toString_impl_8d916b(this.mw_1) + ')';
      }
      hashCode() {
        var result = this.lw_1 == null ? 0 : hashCode(this.lw_1);
        result = imul(result, 31) + Duration__hashCode_impl_u4exz6(this.mw_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TimedValue()))
          return false;
        var tmp0_other_with_cast = other instanceof TimedValue() ? other : THROW_CCE();
        if (!equals(this.lw_1, tmp0_other_with_cast.lw_1))
          return false;
        if (!equals(this.mw_1, tmp0_other_with_cast.mw_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'TimedValue');
    TimedValueClass = $;
  }
  return TimedValueClass;
}
//region block: exports
export {
  TimedValue as TimedValuew9j01dao9jci,
};
//endregion

//# sourceMappingURL=measureTime.mjs.map
