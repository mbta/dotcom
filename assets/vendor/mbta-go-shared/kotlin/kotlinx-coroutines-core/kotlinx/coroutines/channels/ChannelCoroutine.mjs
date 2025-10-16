import { AbstractCoroutine2jzyhqo91sb0o as AbstractCoroutine } from '../AbstractCoroutine.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { JobCancellationException2g3wpni5v5fkt as JobCancellationException } from '../Exceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  close$default3plsfhsdbsvbv as close$default,
  ReceiveChannel24wu5e2tj9lbp as ReceiveChannel,
  SendChannel38sllbxw662ws as SendChannel,
} from './Channel.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ChannelCoroutineClass;
function ChannelCoroutine() {
  if (ChannelCoroutineClass === VOID) {
    class $ extends AbstractCoroutine() {
      constructor(parentContext, _channel, initParentJob, active) {
        super(parentContext, initParentJob, active);
        this.m2m_1 = _channel;
      }
      g22(cause) {
        if (this.t21())
          return Unit_instance;
        var tmp;
        if (cause == null) {
          // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
          tmp = JobCancellationException().t2a(null == null ? this.a21() : null, null, this);
        } else {
          tmp = cause;
        }
        this.i22(tmp);
      }
      a2m(cause, $super) {
        return this.h22(cause, ($super == null ? true : $super instanceof ChannelCoroutine()) ? $super : THROW_CCE());
      }
      i22(cause) {
        var exception = this.y21(cause);
        this.m2m_1.g22(exception);
        this.l22(exception);
      }
      u2i() {
        return this.m2m_1.u2i();
      }
      l2l(element, $completion) {
        return this.m2m_1.l2l(element, $completion);
      }
      m2l(element) {
        return this.m2m_1.m2l(element);
      }
      w2l(cause) {
        return this.m2m_1.w2l(cause);
      }
      p2l($completion) {
        return this.m2m_1.p2l($completion);
      }
      x() {
        return this.m2m_1.x();
      }
    }
    protoOf($).y2l = close$default;
    initMetadataForClass($, 'ChannelCoroutine', VOID, VOID, [AbstractCoroutine(), ReceiveChannel(), SendChannel()], [1, 0]);
    ChannelCoroutineClass = $;
  }
  return ChannelCoroutineClass;
}
//region block: exports
export {
  ChannelCoroutine as ChannelCoroutine12l2gxei4u780,
};
//endregion

//# sourceMappingURL=ChannelCoroutine.mjs.map
