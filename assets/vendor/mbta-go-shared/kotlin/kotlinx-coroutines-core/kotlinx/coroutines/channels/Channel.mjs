import { systemProp2qpti4y1f5b4b as systemProp } from '../internal/SystemProps.common.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  BufferOverflow_SUSPEND_getInstance142kaabh2rhtl as BufferOverflow_SUSPEND_getInstance,
  BufferOverflow_DROP_OLDEST_getInstance1vyzet7fbhkje as BufferOverflow_DROP_OLDEST_getInstance,
} from './BufferOverflow.mjs';
import { ConflatedBufferedChannel16nes42ao4b78 as ConflatedBufferedChannel } from './ConflatedBufferedChannel.mjs';
import { BufferedChannel3lgkhzot5gmk6 as BufferedChannel } from './BufferedChannel.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var FactoryClass;
function Factory() {
  if (FactoryClass === VOID) {
    class $ {
      constructor() {
        Factory_instance = this;
        this.b2m_1 = 2147483647;
        this.c2m_1 = 0;
        this.d2m_1 = -1;
        this.e2m_1 = -2;
        this.f2m_1 = -3;
        this.g2m_1 = 'kotlinx.coroutines.channels.defaultBuffer';
        this.h2m_1 = systemProp('kotlinx.coroutines.channels.defaultBuffer', 64, 1, 2147483646);
      }
    }
    initMetadataForObject($, 'Factory');
    FactoryClass = $;
  }
  return FactoryClass;
}
var Factory_instance;
function Factory_getInstance() {
  if (Factory_instance === VOID)
    new (Factory())();
  return Factory_instance;
}
function _ChannelResult___init__impl__siwsuf(holder) {
  return holder;
}
function _ChannelResult___get_holder__impl__pm9gzw($this) {
  return $this;
}
function _ChannelResult___get_isSuccess__impl__odq1z9($this) {
  var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
  return !(tmp instanceof Failed());
}
function _ChannelResult___get_isClosed__impl__mg7kuu($this) {
  var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
  return tmp instanceof Closed();
}
function ChannelResult__getOrNull_impl_f5e07h($this) {
  var tmp;
  var tmp_0 = _ChannelResult___get_holder__impl__pm9gzw($this);
  if (!(tmp_0 instanceof Failed())) {
    var tmp_1 = _ChannelResult___get_holder__impl__pm9gzw($this);
    tmp = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
  } else {
    tmp = null;
  }
  return tmp;
}
function ChannelResult__getOrThrow_impl_od1axs($this) {
  var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
  if (!(tmp instanceof Failed())) {
    var tmp_0 = _ChannelResult___get_holder__impl__pm9gzw($this);
    return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  }
  var tmp_1 = _ChannelResult___get_holder__impl__pm9gzw($this);
  if (tmp_1 instanceof Closed()) {
    // Inline function 'kotlin.check' call
    if (!!(_ChannelResult___get_holder__impl__pm9gzw($this).i2m_1 == null)) {
      var message = "Trying to call 'getOrThrow' on a channel closed without a cause";
      throw IllegalStateException().o5(toString(message));
    }
    throw _ChannelResult___get_holder__impl__pm9gzw($this).i2m_1;
  }
  // Inline function 'kotlin.error' call
  var message_0 = "Trying to call 'getOrThrow' on a failed result of a non-closed channel";
  throw IllegalStateException().o5(toString(message_0));
}
function ChannelResult__exceptionOrNull_impl_16ei30($this) {
  var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
  var tmp0_safe_receiver = tmp instanceof Closed() ? tmp : null;
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.i2m_1;
}
var FailedClass;
function Failed() {
  if (FailedClass === VOID) {
    class $ {
      toString() {
        return 'Failed';
      }
    }
    initMetadataForClass($, 'Failed', Failed);
    FailedClass = $;
  }
  return FailedClass;
}
var ClosedClass;
function Closed() {
  if (ClosedClass === VOID) {
    class $ extends Failed() {
      constructor(cause) {
        super();
        this.i2m_1 = cause;
      }
      equals(other) {
        var tmp;
        if (other instanceof Closed()) {
          tmp = equals(this.i2m_1, other.i2m_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.i2m_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      }
      toString() {
        return 'Closed(' + toString_0(this.i2m_1) + ')';
      }
    }
    initMetadataForClass($, 'Closed');
    ClosedClass = $;
  }
  return ClosedClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.d2i_1 = new (Failed())();
      }
      e2i(value) {
        return _ChannelResult___init__impl__siwsuf(value);
      }
      n2l() {
        return _ChannelResult___init__impl__siwsuf(this.d2i_1);
      }
      x2i(cause) {
        return _ChannelResult___init__impl__siwsuf(new (Closed())(cause));
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function ChannelResult__toString_impl_rrcqu7($this) {
  var tmp;
  if (_ChannelResult___get_holder__impl__pm9gzw($this) instanceof Closed()) {
    tmp = _ChannelResult___get_holder__impl__pm9gzw($this).toString();
  } else {
    tmp = 'Value(' + toString_0(_ChannelResult___get_holder__impl__pm9gzw($this)) + ')';
  }
  return tmp;
}
function ChannelResult__hashCode_impl_lilec2($this) {
  return $this == null ? 0 : hashCode($this);
}
function ChannelResult__equals_impl_f471ri($this, other) {
  if (!(other instanceof ChannelResult()))
    return false;
  var tmp0_other_with_cast = other instanceof ChannelResult() ? other.a2j_1 : THROW_CCE();
  if (!equals($this, tmp0_other_with_cast))
    return false;
  return true;
}
var ChannelResultClass;
function ChannelResult() {
  if (ChannelResultClass === VOID) {
    class $ {
      constructor(holder) {
        Companion_getInstance();
        this.a2j_1 = holder;
      }
      toString() {
        return ChannelResult__toString_impl_rrcqu7(this.a2j_1);
      }
      hashCode() {
        return ChannelResult__hashCode_impl_lilec2(this.a2j_1);
      }
      equals(other) {
        return ChannelResult__equals_impl_f471ri(this.a2j_1, other);
      }
    }
    initMetadataForClass($, 'ChannelResult');
    ChannelResultClass = $;
  }
  return ChannelResultClass;
}
var ClosedSendChannelExceptionClass;
function ClosedSendChannelException() {
  if (ClosedSendChannelExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static u2l(message) {
        var $this = this.o5(message);
        captureStack($this, $this.t2l_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ClosedSendChannelException');
    ClosedSendChannelExceptionClass = $;
  }
  return ClosedSendChannelExceptionClass;
}
var ClosedReceiveChannelExceptionClass;
function ClosedReceiveChannelException() {
  if (ClosedReceiveChannelExceptionClass === VOID) {
    class $ extends NoSuchElementException() {
      static t2i(message) {
        var $this = this.m(message);
        captureStack($this, $this.s2i_1);
        return $this;
      }
    }
    initMetadataForClass($, 'ClosedReceiveChannelException');
    ClosedReceiveChannelExceptionClass = $;
  }
  return ClosedReceiveChannelExceptionClass;
}
function close$default(cause, $super) {
  cause = cause === VOID ? null : cause;
  return $super === VOID ? this.w2l(cause) : $super.w2l.call(this, cause);
}
var SendChannelClass;
function SendChannel() {
  if (SendChannelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SendChannel', VOID, VOID, VOID, [1]);
    SendChannelClass = $;
  }
  return SendChannelClass;
}
function cancel$default(cause, $super) {
  cause = cause === VOID ? null : cause;
  var tmp;
  if ($super === VOID) {
    this.g22(cause);
    tmp = Unit_instance;
  } else {
    tmp = $super.g22.call(this, cause);
  }
  return tmp;
}
var ReceiveChannelClass;
function ReceiveChannel() {
  if (ReceiveChannelClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ReceiveChannel', VOID, VOID, VOID, [0]);
    ReceiveChannelClass = $;
  }
  return ReceiveChannelClass;
}
function Channel(capacity, onBufferOverflow, onUndeliveredElement) {
  capacity = capacity === VOID ? 0 : capacity;
  onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
  onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
  var tmp;
  switch (capacity) {
    case 0:
      tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new (BufferedChannel())(0, onUndeliveredElement) : new (ConflatedBufferedChannel())(1, onBufferOverflow, onUndeliveredElement);
      break;
    case -1:
      // Inline function 'kotlin.require' call

      if (!onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance())) {
        var message = 'CONFLATED capacity cannot be used with non-default onBufferOverflow';
        throw IllegalArgumentException().q(toString(message));
      }

      tmp = new (ConflatedBufferedChannel())(1, BufferOverflow_DROP_OLDEST_getInstance(), onUndeliveredElement);
      break;
    case 2147483647:
      tmp = new (BufferedChannel())(2147483647, onUndeliveredElement);
      break;
    case -2:
      tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new (BufferedChannel())(Factory_getInstance().h2m_1, onUndeliveredElement) : new (ConflatedBufferedChannel())(1, onBufferOverflow, onUndeliveredElement);
      break;
    default:
      tmp = onBufferOverflow === BufferOverflow_SUSPEND_getInstance() ? new (BufferedChannel())(capacity, onUndeliveredElement) : new (ConflatedBufferedChannel())(capacity, onBufferOverflow, onUndeliveredElement);
      break;
  }
  return tmp;
}
//region block: exports
export {
  cancel$default as cancel$default2g4arzbcb5isa,
  close$default as close$default3plsfhsdbsvbv,
  ChannelResult__exceptionOrNull_impl_16ei30 as ChannelResult__exceptionOrNull_impl_16ei3025ypipjsmjecb,
  ChannelResult__getOrNull_impl_f5e07h as ChannelResult__getOrNull_impl_f5e07h1mddh1y59r3zw,
  ChannelResult__getOrThrow_impl_od1axs as ChannelResult__getOrThrow_impl_od1axs1v5ovxi3a78ys,
  _ChannelResult___get_holder__impl__pm9gzw as _ChannelResult___get_holder__impl__pm9gzw1tlq2sv26k77h,
  _ChannelResult___get_isClosed__impl__mg7kuu as _ChannelResult___get_isClosed__impl__mg7kuu2zjlnnup5xs2b,
  _ChannelResult___get_isSuccess__impl__odq1z9 as _ChannelResult___get_isSuccess__impl__odq1z91n9ra3wwc3tz2,
  Companion_getInstance as Companion_getInstance8sxi3cktwbr5,
  Closed as Closed8t4xgopf7j5r,
  ChannelResult as ChannelResult2y4k69ac6y3du,
  Channel as Channel3r72atmcithql,
  ClosedReceiveChannelException as ClosedReceiveChannelException3ofg6gf5f5b38,
  ClosedSendChannelException as ClosedSendChannelException29m33prpq9jaw,
  ReceiveChannel as ReceiveChannel24wu5e2tj9lbp,
  SendChannel as SendChannel38sllbxw662ws,
};
//endregion

//# sourceMappingURL=Channel.mjs.map
