import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_JoinedKey$stable;
function hashCodeOf($this, value) {
  var tmp;
  if (value instanceof Enum()) {
    tmp = value.x3_1;
  } else {
    var tmp1_elvis_lhs = value == null ? null : hashCode(value);
    tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  }
  return tmp;
}
var JoinedKeyClass;
function JoinedKey() {
  if (JoinedKeyClass === VOID) {
    class $ {
      constructor(left, right) {
        this.q73_1 = left;
        this.r73_1 = right;
      }
      hashCode() {
        return imul(hashCodeOf(this, this.q73_1), 31) + hashCodeOf(this, this.r73_1) | 0;
      }
      toString() {
        return 'JoinedKey(left=' + toString(this.q73_1) + ', right=' + toString(this.r73_1) + ')';
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof JoinedKey()))
          return false;
        var tmp0_other_with_cast = other instanceof JoinedKey() ? other : THROW_CCE();
        if (!equals(this.q73_1, tmp0_other_with_cast.q73_1))
          return false;
        if (!equals(this.r73_1, tmp0_other_with_cast.r73_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'JoinedKey');
    JoinedKeyClass = $;
  }
  return JoinedKeyClass;
}
//region block: init
androidx_compose_runtime_JoinedKey$stable = 8;
//endregion
//region block: exports
export {
  JoinedKey as JoinedKey1p2hes3zt98g7,
};
//endregion

//# sourceMappingURL=JoinedKey.mjs.map
