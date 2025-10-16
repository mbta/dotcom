import { ClosedByteChannelException3il8gfpye60w as ClosedByteChannelException } from './Exceptions.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CopyableThrowable1mvc99jcyvivf as CopyableThrowable } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Debug.common.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_CLOSED() {
  _init_properties_CloseToken_kt__9ucr41();
  return CLOSED;
}
var CLOSED;
function ClosedByteChannelException$_init_$ref_yjp351() {
  var l = function (p0) {
    return ClosedByteChannelException().c3f(p0);
  };
  l.callableName = '<init>';
  return l;
}
var CloseTokenClass;
function CloseToken() {
  if (CloseTokenClass === VOID) {
    class $ {
      constructor(origin) {
        this.w35_1 = origin;
      }
      d3f(wrap) {
        var tmp0_subject = this.w35_1;
        var tmp;
        if (tmp0_subject == null) {
          tmp = null;
        } else {
          if (!(tmp0_subject == null) ? isInterface(tmp0_subject, CopyableThrowable()) : false) {
            tmp = this.w35_1.z28();
          } else {
            if (tmp0_subject instanceof CancellationException()) {
              tmp = CancellationException().ie(this.w35_1.message, this.w35_1);
            } else {
              tmp = wrap(this.w35_1);
            }
          }
        }
        return tmp;
      }
      b36(wrap, $super) {
        var tmp;
        if (wrap === VOID) {
          tmp = ClosedByteChannelException$_init_$ref_yjp351();
        } else {
          tmp = wrap;
        }
        wrap = tmp;
        return $super === VOID ? this.d3f(wrap) : $super.d3f.call(this, wrap);
      }
      x35(wrap) {
        var tmp0_safe_receiver = this.d3f(wrap);
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          throw tmp0_safe_receiver;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'CloseToken');
    CloseTokenClass = $;
  }
  return CloseTokenClass;
}
var properties_initialized_CloseToken_kt_lgg8zn;
function _init_properties_CloseToken_kt__9ucr41() {
  if (!properties_initialized_CloseToken_kt_lgg8zn) {
    properties_initialized_CloseToken_kt_lgg8zn = true;
    CLOSED = new (CloseToken())(null);
  }
}
//region block: exports
export {
  get_CLOSED as get_CLOSED3uiwvc5y98ftj,
  CloseToken as CloseToken4utf44psnuyc,
};
//endregion

//# sourceMappingURL=CloseToken.mjs.map
