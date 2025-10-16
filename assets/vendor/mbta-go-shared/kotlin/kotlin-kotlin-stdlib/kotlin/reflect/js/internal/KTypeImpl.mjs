import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  toString1pkumu07cwy4m as toString,
} from '../../../js/coreRuntime.mjs';
import { KClass1cc9rfeybg8hs as KClass } from '../../KClassJs.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../js/typeCheckUtils.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../collections/_Collections.mjs';
import { plus17rl43at52ays as plus } from '../../../Library.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var KTypeImplClass;
function KTypeImpl() {
  if (KTypeImplClass === VOID) {
    class $ {
      constructor(classifier, arguments_0, isMarkedNullable) {
        this.sh_1 = classifier;
        this.th_1 = arguments_0;
        this.uh_1 = isMarkedNullable;
      }
      vh() {
        return this.sh_1;
      }
      wh() {
        return this.th_1;
      }
      xh() {
        return this.uh_1;
      }
      equals(other) {
        var tmp;
        var tmp_0;
        var tmp_1;
        if (other instanceof KTypeImpl()) {
          tmp_1 = equals(this.sh_1, other.sh_1);
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = equals(this.th_1, other.th_1);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.uh_1 === other.uh_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(imul(hashCode(this.sh_1), 31) + hashCode(this.th_1) | 0, 31) + getBooleanHashCode(this.uh_1) | 0;
      }
      toString() {
        var tmp = this.sh_1;
        var kClass = isInterface(tmp, KClass()) ? tmp : null;
        var classifierName = kClass == null ? toString(this.sh_1) : !(kClass.gh() == null) ? kClass.gh() : '(non-denotable type)';
        var args = this.th_1.h1() ? '' : joinToString(this.th_1, ', ', '<', '>');
        var nullable = this.uh_1 ? '?' : '';
        return plus(classifierName, args) + nullable;
      }
    }
    initMetadataForClass($, 'KTypeImpl');
    KTypeImplClass = $;
  }
  return KTypeImplClass;
}
//region block: exports
export {
  KTypeImpl as KTypeImpl31l2cx2hil3il,
};
//endregion

//# sourceMappingURL=KTypeImpl.mjs.map
