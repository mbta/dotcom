import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../CoroutineScope.mjs';
import {
  SendChannel38sllbxw662ws as SendChannel,
  Channel3r72atmcithql as Channel,
} from './Channel.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { BufferOverflow_SUSPEND_getInstance142kaabh2rhtl as BufferOverflow_SUSPEND_getInstance } from './BufferOverflow.mjs';
import { CoroutineStart_DEFAULT_getInstance2bbgmtawlnkke as CoroutineStart_DEFAULT_getInstance } from '../CoroutineStart.mjs';
import { newCoroutineContext2tdpc8c02iv5t as newCoroutineContext } from '../CoroutineContext.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ChannelCoroutine12l2gxei4u780 as ChannelCoroutine } from './ChannelCoroutine.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { handleCoroutineExceptionv1m1bdk4j2te as handleCoroutineException } from '../CoroutineExceptionHandler.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ProducerScopeClass;
function ProducerScope() {
  if (ProducerScopeClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ProducerScope', VOID, VOID, [CoroutineScope(), SendChannel()], [1]);
    ProducerScopeClass = $;
  }
  return ProducerScopeClass;
}
function produce(_this__u8e3s4, context, capacity, onBufferOverflow, start, onCompletion, block) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  capacity = capacity === VOID ? 0 : capacity;
  onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
  start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
  onCompletion = onCompletion === VOID ? null : onCompletion;
  var channel = Channel(capacity, onBufferOverflow);
  var newContext = newCoroutineContext(_this__u8e3s4, context);
  var coroutine = new (ProducerCoroutine())(newContext, channel);
  if (!(onCompletion == null)) {
    coroutine.z21(onCompletion);
  }
  coroutine.k21(start, coroutine, block);
  return coroutine;
}
var ProducerCoroutineClass;
function ProducerCoroutine() {
  if (ProducerCoroutineClass === VOID) {
    class $ extends ChannelCoroutine() {
      constructor(parentContext, channel) {
        super(parentContext, channel, true, true);
      }
      x20() {
        return super.x20();
      }
      f2n(value) {
        this.m2m_1.y2l();
      }
      y20(value) {
        return this.f2n(value instanceof Unit() ? value : THROW_CCE());
      }
      z20(cause, handled) {
        var processed = this.m2m_1.w2l(cause);
        if (!processed && !handled) {
          handleCoroutineException(this.v20_1, cause);
        }
      }
      a2m(cause, $super) {
        return this.h22(cause, ($super == null ? true : $super instanceof ProducerCoroutine()) ? $super : THROW_CCE());
      }
    }
    initMetadataForClass($, 'ProducerCoroutine', VOID, VOID, [ChannelCoroutine(), ProducerScope()], [1, 0]);
    ProducerCoroutineClass = $;
  }
  return ProducerCoroutineClass;
}
function produce_0(_this__u8e3s4, context, capacity, block) {
  context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
  capacity = capacity === VOID ? 0 : capacity;
  return produce(_this__u8e3s4, context, capacity, BufferOverflow_SUSPEND_getInstance(), CoroutineStart_DEFAULT_getInstance(), null, block);
}
//region block: exports
export {
  ProducerScope as ProducerScopeb3mmhvfa6ll7,
  produce_0 as produce1iljho2c8bp6o,
};
//endregion

//# sourceMappingURL=Produce.mjs.map
