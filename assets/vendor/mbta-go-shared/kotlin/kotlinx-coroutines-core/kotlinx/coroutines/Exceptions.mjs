import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import {
  captureStack1fzi4aczwc4hg as captureStack,
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var JobCancellationExceptionClass;
function JobCancellationException() {
  if (JobCancellationExceptionClass === VOID) {
    class $ extends CancellationException() {
      static t2a(message, cause, job) {
        var $this = this.ie(message, cause);
        captureStack($this, $this.s2a_1);
        $this.r2a_1 = job;
        return $this;
      }
      toString() {
        return super.toString() + '; job=' + toString(this.r2a_1);
      }
      equals(other) {
        var tmp;
        if (other === this) {
          tmp = true;
        } else {
          var tmp_0;
          var tmp_1;
          var tmp_2;
          if (other instanceof JobCancellationException()) {
            tmp_2 = other.message == this.message;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp_1 = equals(other.r2a_1, this.r2a_1);
          } else {
            tmp_1 = false;
          }
          if (tmp_1) {
            tmp_0 = equals(other.cause, this.cause);
          } else {
            tmp_0 = false;
          }
          tmp = tmp_0;
        }
        return tmp;
      }
      hashCode() {
        var tmp = imul(imul(getStringHashCode(ensureNotNull(this.message)), 31) + hashCode(this.r2a_1) | 0, 31);
        var tmp0_safe_receiver = this.cause;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        return tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
      }
    }
    initMetadataForClass($, 'JobCancellationException');
    JobCancellationExceptionClass = $;
  }
  return JobCancellationExceptionClass;
}
function CancellationException_0(message, cause) {
  return CancellationException().ie(message, cause);
}
//region block: exports
export {
  CancellationException_0 as CancellationExceptionjngvjj221x3v,
  JobCancellationException as JobCancellationException2g3wpni5v5fkt,
};
//endregion

//# sourceMappingURL=Exceptions.mjs.map
