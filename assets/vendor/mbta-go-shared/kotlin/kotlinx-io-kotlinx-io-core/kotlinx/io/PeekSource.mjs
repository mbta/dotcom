import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PeekSourceClass;
function PeekSource() {
  if (PeekSourceClass === VOID) {
    class $ {
      constructor(upstream) {
        this.s31_1 = upstream;
        this.t31_1 = this.s31_1.s2z();
        this.u31_1 = this.t31_1.l2z_1;
        var tmp = this;
        var tmp0_safe_receiver = this.t31_1.l2z_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y2z_1;
        tmp.v31_1 = tmp1_elvis_lhs == null ? -1 : tmp1_elvis_lhs;
        this.w31_1 = false;
        this.x31_1 = new (Long())(0, 0);
      }
      t30(sink, byteCount) {
        // Inline function 'kotlin.check' call
        if (!!this.w31_1) {
          var message = 'Source is closed.';
          throw IllegalStateException().o5(toString(message));
        }
        // Inline function 'kotlinx.io.checkByteCount' call
        // Inline function 'kotlin.require' call
        if (!(byteCount.d2(new (Long())(0, 0)) >= 0)) {
          var message_0 = 'byteCount (' + byteCount.toString() + ') < 0';
          throw IllegalArgumentException().q(toString(message_0));
        }
        // Inline function 'kotlin.check' call
        if (!(this.u31_1 == null || (this.u31_1 === this.t31_1.l2z_1 && this.v31_1 === ensureNotNull(this.t31_1.l2z_1).y2z_1))) {
          var message_1 = 'Peek source is invalid because upstream source was used';
          throw IllegalStateException().o5(toString(message_1));
        }
        if (byteCount.equals(new (Long())(0, 0)))
          return new (Long())(0, 0);
        // Inline function 'kotlin.Long.plus' call
        var tmp$ret$7 = this.x31_1.f4(toLong(1));
        if (!this.s31_1.v2z(tmp$ret$7))
          return new (Long())(-1, -1);
        if (this.u31_1 == null && !(this.t31_1.l2z_1 == null)) {
          this.u31_1 = this.t31_1.l2z_1;
          this.v31_1 = ensureNotNull(this.t31_1.l2z_1).y2z_1;
        }
        // Inline function 'kotlin.comparisons.minOf' call
        var b = this.t31_1.c1().g4(this.x31_1);
        var toCopy = byteCount.d2(b) <= 0 ? byteCount : b;
        this.t31_1.j30(sink, this.x31_1, this.x31_1.f4(toCopy));
        this.x31_1 = this.x31_1.f4(toCopy);
        return toCopy;
      }
      v6() {
        this.w31_1 = true;
      }
    }
    initMetadataForClass($, 'PeekSource', VOID, VOID, [AutoCloseable()]);
    PeekSourceClass = $;
  }
  return PeekSourceClass;
}
//region block: exports
export {
  PeekSource as PeekSource3frbthc9yehpr,
};
//endregion

//# sourceMappingURL=PeekSource.mjs.map
