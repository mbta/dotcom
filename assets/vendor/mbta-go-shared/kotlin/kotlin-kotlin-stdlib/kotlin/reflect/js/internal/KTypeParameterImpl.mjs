import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  equals2au1ep9vhcato as equals,
} from '../../../js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../hacks.mjs';
import { KTypeParameter1s8efufd4mbj5 as KTypeParameter } from '../../KTypeParameter.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var KTypeParameterImplClass;
function KTypeParameterImpl() {
  if (KTypeParameterImplClass === VOID) {
    class $ {
      constructor(name, upperBounds, variance, isReified) {
        this.yh_1 = name;
        this.zh_1 = upperBounds;
        this.ai_1 = variance;
        this.bi_1 = isReified;
      }
      toString() {
        return this.yh_1;
      }
      hashCode() {
        var result = getStringHashCode(this.yh_1);
        result = imul(result, 31) + hashCode(this.zh_1) | 0;
        result = imul(result, 31) + this.ai_1.hashCode() | 0;
        result = imul(result, 31) + getBooleanHashCode(this.bi_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof KTypeParameterImpl()))
          return false;
        var tmp0_other_with_cast = other instanceof KTypeParameterImpl() ? other : THROW_CCE();
        if (!(this.yh_1 === tmp0_other_with_cast.yh_1))
          return false;
        if (!equals(this.zh_1, tmp0_other_with_cast.zh_1))
          return false;
        if (!this.ai_1.equals(tmp0_other_with_cast.ai_1))
          return false;
        if (!(this.bi_1 === tmp0_other_with_cast.bi_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'KTypeParameterImpl', VOID, VOID, [KTypeParameter()]);
    KTypeParameterImplClass = $;
  }
  return KTypeParameterImplClass;
}
//region block: exports
export {
  KTypeParameterImpl as KTypeParameterImpl2de0szhlrzcmf,
};
//endregion

//# sourceMappingURL=KTypeParameterImpl.mjs.map
