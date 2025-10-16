import {
  BufferOverflow_DROP_LATEST_getInstance143zua7beeutm as BufferOverflow_DROP_LATEST_getInstance,
  BufferOverflow_SUSPEND_getInstance142kaabh2rhtl as BufferOverflow_SUSPEND_getInstance,
  BufferOverflow_DROP_OLDEST_getInstance1vyzet7fbhkje as BufferOverflow_DROP_OLDEST_getInstance,
} from './BufferOverflow.mjs';
import { BufferedChannel3lgkhzot5gmk6 as BufferedChannel } from './BufferedChannel.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  _ChannelResult___get_isSuccess__impl__odq1z91n9ra3wwc3tz2 as _ChannelResult___get_isSuccess__impl__odq1z9,
  _ChannelResult___get_isClosed__impl__mg7kuu2zjlnnup5xs2b as _ChannelResult___get_isClosed__impl__mg7kuu,
  Companion_getInstance8sxi3cktwbr5 as Companion_getInstance,
  _ChannelResult___get_holder__impl__pm9gzw1tlq2sv26k77h as _ChannelResult___get_holder__impl__pm9gzw,
  ChannelResult__exceptionOrNull_impl_16ei3025ypipjsmjecb as ChannelResult__exceptionOrNull_impl_16ei30,
  Closed8t4xgopf7j5r as Closed,
} from './Channel.mjs';
import { callUndeliveredElementCatchingException6xwxmojd3rq1 as callUndeliveredElementCatchingException } from '../internal/OnUndeliveredElement.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function trySendImpl($this, element, isSendOp) {
  return $this.a2n_1 === BufferOverflow_DROP_LATEST_getInstance() ? trySendDropLatest($this, element, isSendOp) : $this.o2l(element);
}
function trySendDropLatest($this, element, isSendOp) {
  var result = protoOf(BufferedChannel()).m2l.call($this, element);
  if (_ChannelResult___get_isSuccess__impl__odq1z9(result) || _ChannelResult___get_isClosed__impl__mg7kuu(result))
    return result;
  if (isSendOp) {
    var tmp0_safe_receiver = $this.q2f_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp0_safe_receiver, element);
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      throw tmp1_safe_receiver;
    }
  }
  return Companion_getInstance().e2i(Unit_instance);
}
var ConflatedBufferedChannelClass;
function ConflatedBufferedChannel() {
  if (ConflatedBufferedChannelClass === VOID) {
    class $ extends BufferedChannel() {
      constructor(capacity, onBufferOverflow, onUndeliveredElement) {
        onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
        super(capacity, onUndeliveredElement);
        this.z2m_1 = capacity;
        this.a2n_1 = onBufferOverflow;
        // Inline function 'kotlin.require' call
        if (!!(this.a2n_1 === BufferOverflow_SUSPEND_getInstance())) {
          var message = 'This implementation does not support suspension for senders, use ' + getKClass(BufferedChannel()).gh() + ' instead';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(this.z2m_1 >= 1)) {
          var message_0 = 'Buffered channel capacity must be at least 1, but ' + this.z2m_1 + ' was specified';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      w2i() {
        return this.a2n_1.equals(BufferOverflow_DROP_OLDEST_getInstance());
      }
      l2l(element, $completion) {
        // Inline function 'kotlinx.coroutines.channels.onClosed' call
        var this_0 = trySendImpl(this, element, true);
        var tmp = _ChannelResult___get_holder__impl__pm9gzw(this_0);
        if (tmp instanceof Closed()) {
          ChannelResult__exceptionOrNull_impl_16ei30(this_0);
          var tmp0_safe_receiver = this.q2f_1;
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp0_safe_receiver, element);
          if (tmp1_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            addSuppressed(tmp1_safe_receiver, this.y2h());
            throw tmp1_safe_receiver;
          }
          throw this.y2h();
        }
        return Unit_instance;
      }
      m2l(element) {
        return trySendImpl(this, element, false);
      }
    }
    initMetadataForClass($, 'ConflatedBufferedChannel', VOID, VOID, VOID, [1, 0]);
    ConflatedBufferedChannelClass = $;
  }
  return ConflatedBufferedChannelClass;
}
//region block: exports
export {
  ConflatedBufferedChannel as ConflatedBufferedChannel16nes42ao4b78,
};
//endregion

//# sourceMappingURL=ConflatedBufferedChannel.mjs.map
