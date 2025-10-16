import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from './CoroutineDispatcher.mjs';
import { ArrayDeque2dzc9uld4xi7n as ArrayDeque } from '../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayDeque.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from './internal/Symbol.mjs';
import { commonThreadLocal18t70xomalc6z as commonThreadLocal } from './internal/ThreadLocal.mjs';
import { createEventLoop3pvigh4qbw0m0 as createEventLoop } from './EventLoop.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function delta($this, unconfined) {
  return unconfined ? new (Long())(0, 1) : new (Long())(1, 0);
}
var EventLoopClass;
function EventLoop() {
  if (EventLoopClass === VOID) {
    class $ extends CoroutineDispatcher() {
      constructor() {
        super();
        this.e29_1 = new (Long())(0, 0);
        this.f29_1 = false;
        this.g29_1 = null;
      }
      h29() {
        var tmp0_elvis_lhs = this.g29_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var queue = tmp;
        var tmp1_elvis_lhs = queue.pn();
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          return false;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var task = tmp_0;
        task.z26();
        return true;
      }
      i29(task) {
        var tmp0_elvis_lhs = this.g29_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = ArrayDeque().jn();
          this.g29_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var queue = tmp;
        queue.nn(task);
      }
      j29() {
        return this.e29_1.d2(delta(this, true)) >= 0;
      }
      k29() {
        var tmp0_safe_receiver = this.g29_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h1();
        return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
      }
      l29(unconfined) {
        this.e29_1 = this.e29_1.f4(delta(this, unconfined));
        if (!unconfined)
          this.f29_1 = true;
      }
      m29(unconfined) {
        this.e29_1 = this.e29_1.g4(delta(this, unconfined));
        if (this.e29_1.d2(new (Long())(0, 0)) > 0)
          return Unit_instance;
        // Inline function 'kotlinx.coroutines.assert' call
        if (this.f29_1) {
          this.n29();
        }
      }
      n29() {
      }
    }
    initMetadataForClass($, 'EventLoop');
    EventLoopClass = $;
  }
  return EventLoopClass;
}
var ThreadLocalEventLoopClass;
function ThreadLocalEventLoop() {
  if (ThreadLocalEventLoopClass === VOID) {
    class $ {
      constructor() {
        ThreadLocalEventLoop_instance = this;
        this.o29_1 = commonThreadLocal(new (Symbol())('ThreadLocalEventLoop'));
      }
      p29() {
        var tmp0_elvis_lhs = this.o29_1.r29();
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = createEventLoop();
          ThreadLocalEventLoop_getInstance().o29_1.s29(this_0);
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
    }
    initMetadataForObject($, 'ThreadLocalEventLoop');
    ThreadLocalEventLoopClass = $;
  }
  return ThreadLocalEventLoopClass;
}
var ThreadLocalEventLoop_instance;
function ThreadLocalEventLoop_getInstance() {
  if (ThreadLocalEventLoop_instance === VOID)
    new (ThreadLocalEventLoop())();
  return ThreadLocalEventLoop_instance;
}
//region block: exports
export {
  ThreadLocalEventLoop_getInstance as ThreadLocalEventLoop_getInstance36jwo3qw2bxas,
  EventLoop as EventLoopljivmgnf56lj,
};
//endregion

//# sourceMappingURL=EventLoop.common.mjs.map
