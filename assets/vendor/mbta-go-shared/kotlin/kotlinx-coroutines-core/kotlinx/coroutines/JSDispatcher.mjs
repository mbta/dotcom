import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from './CoroutineDispatcher.mjs';
import { invokeOnCancellationb68niwbjdmgy as invokeOnCancellation } from './CancellableContinuation.mjs';
import { Delay9umexudtwyie as Delay } from './Delay.mjs';
import { ArrayDeque2dzc9uld4xi7n as ArrayDeque } from '../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayDeque.mjs';
import { removeFirstOrNull15yg2tczrh8a7 as removeFirstOrNull } from '../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Runnablezd7bpy5et5p0 as Runnable } from './Runnable.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { coerceIn302bduskdb54x as coerceIn } from '../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { boxApply1qmzdb3dh90hg as boxApply } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { CancelHandler3ic7xysezxbm5 as CancelHandler } from './CancellableContinuationImpl.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NodeDispatcherClass;
function NodeDispatcher() {
  if (NodeDispatcherClass === VOID) {
    class $ extends SetTimeoutBasedDispatcher() {
      constructor() {
        NodeDispatcher_instance = null;
        super();
        NodeDispatcher_instance = this;
      }
      w2w() {
        process.nextTick(this.d2x_1.b2x_1);
      }
    }
    initMetadataForObject($, 'NodeDispatcher', VOID, VOID, VOID, [1]);
    NodeDispatcherClass = $;
  }
  return NodeDispatcherClass;
}
var NodeDispatcher_instance;
function NodeDispatcher_getInstance() {
  if (NodeDispatcher_instance === VOID)
    new (NodeDispatcher())();
  return NodeDispatcher_instance;
}
function ScheduledMessageQueue$processQueue$lambda(this$0) {
  return function () {
    this$0.h2x();
    return Unit_instance;
  };
}
var ScheduledMessageQueueClass;
function ScheduledMessageQueue() {
  if (ScheduledMessageQueueClass === VOID) {
    class $ extends MessageQueue() {
      constructor(dispatcher) {
        super();
        this.a2x_1 = dispatcher;
        var tmp = this;
        tmp.b2x_1 = ScheduledMessageQueue$processQueue$lambda(this);
      }
      i2x() {
        this.a2x_1.w2w();
      }
      j2x() {
        setTimeout(this.b2x_1, 0);
      }
      k2x(timeout) {
        setTimeout(this.b2x_1, timeout);
      }
    }
    initMetadataForClass($, 'ScheduledMessageQueue');
    ScheduledMessageQueueClass = $;
  }
  return ScheduledMessageQueueClass;
}
function w3cSetTimeout(handler, timeout) {
  return setTimeout(handler, timeout);
}
function WindowMessageQueue$lambda(this$0) {
  return function (event) {
    var tmp;
    if (event.source == this$0.a2y_1 && event.data == this$0.b2y_1) {
      event.stopPropagation();
      this$0.h2x();
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
function WindowMessageQueue$schedule$lambda(this$0) {
  return function (it) {
    this$0.h2x();
    return Unit_instance;
  };
}
var WindowMessageQueueClass;
function WindowMessageQueue() {
  if (WindowMessageQueueClass === VOID) {
    class $ extends MessageQueue() {
      constructor(window_0) {
        super();
        this.a2y_1 = window_0;
        this.b2y_1 = 'dispatchCoroutine';
        this.a2y_1.addEventListener('message', WindowMessageQueue$lambda(this), true);
      }
      i2x() {
        var tmp = Promise.resolve(Unit_instance);
        tmp.then(WindowMessageQueue$schedule$lambda(this));
      }
      j2x() {
        this.a2y_1.postMessage(this.b2y_1, '*');
      }
    }
    initMetadataForClass($, 'WindowMessageQueue');
    WindowMessageQueueClass = $;
  }
  return WindowMessageQueueClass;
}
function w3cSetTimeout_0(window_0, handler, timeout) {
  return setTimeout_0(window_0, handler, timeout);
}
function w3cClearTimeout(window_0, handle) {
  return window_0.clearTimeout(handle);
}
function w3cClearTimeout_0(handle) {
  return clearTimeout(handle);
}
function setTimeout_0(window_0, handler, timeout) {
  return window_0.setTimeout(handler, timeout);
}
var SetTimeoutDispatcherClass;
function SetTimeoutDispatcher() {
  if (SetTimeoutDispatcherClass === VOID) {
    class $ extends SetTimeoutBasedDispatcher() {
      constructor() {
        SetTimeoutDispatcher_instance = null;
        super();
        SetTimeoutDispatcher_instance = this;
      }
      w2w() {
        this.d2x_1.k2x(0);
      }
    }
    initMetadataForObject($, 'SetTimeoutDispatcher', VOID, VOID, VOID, [1]);
    SetTimeoutDispatcherClass = $;
  }
  return SetTimeoutDispatcherClass;
}
var SetTimeoutDispatcher_instance;
function SetTimeoutDispatcher_getInstance() {
  if (SetTimeoutDispatcher_instance === VOID)
    new (SetTimeoutDispatcher())();
  return SetTimeoutDispatcher_instance;
}
function SetTimeoutBasedDispatcher$invokeOnTimeout$lambda($block) {
  return function () {
    $block.z26();
    return Unit_instance;
  };
}
function SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
  return function () {
    // Inline function 'kotlin.with' call
    $continuation.o24(this$0, Unit_instance);
    return Unit_instance;
  };
}
var SetTimeoutBasedDispatcherClass;
function SetTimeoutBasedDispatcher() {
  if (SetTimeoutBasedDispatcherClass === VOID) {
    class $ extends CoroutineDispatcher() {
      constructor() {
        super();
        this.d2x_1 = new (ScheduledMessageQueue())(this);
      }
      m28(context, block) {
        this.d2x_1.l2x(block);
      }
      b29(timeMillis, block, context) {
        var handle = w3cSetTimeout(SetTimeoutBasedDispatcher$invokeOnTimeout$lambda(block), delayToInt(timeMillis));
        return new (ClearTimeout())(handle);
      }
      a29(timeMillis, continuation) {
        var handle = w3cSetTimeout(SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
        invokeOnCancellation(continuation, new (ClearTimeout())(handle));
      }
    }
    initMetadataForClass($, 'SetTimeoutBasedDispatcher', VOID, VOID, [CoroutineDispatcher(), Delay()], [1]);
    SetTimeoutBasedDispatcherClass = $;
  }
  return SetTimeoutBasedDispatcherClass;
}
var MessageQueueClass;
function MessageQueue() {
  if (MessageQueueClass === VOID) {
    class $ {
      constructor() {
        this.e2x_1 = ArrayDeque().jn();
        this.f2x_1 = 16;
        this.g2x_1 = false;
      }
      l2x(element) {
        this.m2x(element);
        if (!this.g2x_1) {
          this.g2x_1 = true;
          this.i2x();
        }
      }
      h2x() {
        try {
          // Inline function 'kotlin.repeat' call
          var times = this.f2x_1;
          var inductionVariable = 0;
          if (inductionVariable < times)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var tmp0_elvis_lhs = removeFirstOrNull(this);
              var tmp;
              if (tmp0_elvis_lhs == null) {
                return Unit_instance;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              var element = tmp;
              element.z26();
            }
             while (inductionVariable < times);
        }finally {
          if (this.h1()) {
            this.g2x_1 = false;
          } else {
            this.j2x();
          }
        }
      }
      m2x(element) {
        return this.e2x_1.i(element);
      }
      i(element) {
        return this.m2x((!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      n2x(index, element) {
        this.e2x_1.r3(index, element);
      }
      r3(index, element) {
        return this.n2x(index, (!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      o2x(element) {
        return this.e2x_1.m3(element);
      }
      m3(element) {
        if (!(!(element == null) ? isInterface(element, Runnable()) : false))
          return false;
        return this.o2x((!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      p2x(elements) {
        return this.e2x_1.d1(elements);
      }
      d1(elements) {
        return this.p2x(elements);
      }
      q2x(index, elements) {
        return this.e2x_1.n3(index, elements);
      }
      n3(index, elements) {
        return this.q2x(index, elements);
      }
      r2x(elements) {
        return this.e2x_1.o3(elements);
      }
      o3(elements) {
        return this.r2x(elements);
      }
      p3() {
        this.e2x_1.p3();
      }
      s2x(index, element) {
        return this.e2x_1.q3(index, element);
      }
      q3(index, element) {
        return this.s2x(index, (!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      s3(index) {
        return this.e2x_1.s3(index);
      }
      f3() {
        return this.e2x_1.f3();
      }
      k1(index) {
        return this.e2x_1.k1(index);
      }
      g3(fromIndex, toIndex) {
        return this.e2x_1.g3(fromIndex, toIndex);
      }
      h1() {
        return this.e2x_1.h1();
      }
      t2x(element) {
        return this.e2x_1.j1(element);
      }
      j1(element) {
        if (!(!(element == null) ? isInterface(element, Runnable()) : false))
          return false;
        return this.t2x((!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      x() {
        return this.e2x_1.x();
      }
      u2x(elements) {
        return this.e2x_1.d3(elements);
      }
      d3(elements) {
        return this.u2x(elements);
      }
      e1(index) {
        return this.e2x_1.e1(index);
      }
      v2x(element) {
        return this.e2x_1.l1(element);
      }
      l1(element) {
        if (!(!(element == null) ? isInterface(element, Runnable()) : false))
          return -1;
        return this.v2x((!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      w2x(element) {
        return this.e2x_1.e3(element);
      }
      e3(element) {
        if (!(!(element == null) ? isInterface(element, Runnable()) : false))
          return -1;
        return this.w2x((!(element == null) ? isInterface(element, Runnable()) : false) ? element : THROW_CCE());
      }
      asJsReadonlyArrayView() {
        return this.e2x_1.asJsReadonlyArrayView();
      }
      c1() {
        return this.e2x_1.gn_1;
      }
    }
    initMetadataForClass($, 'MessageQueue', VOID, VOID, [KtMutableList()]);
    MessageQueueClass = $;
  }
  return MessageQueueClass;
}
var WindowClearTimeoutClass;
function WindowClearTimeout() {
  if (WindowClearTimeoutClass === VOID) {
    class $ extends ClearTimeout() {
      constructor($outer, handle, $box) {
        if ($box === VOID)
          $box = {};
        $box.j2y_1 = $outer;
        super(handle, $box);
      }
      z24() {
        w3cClearTimeout(this.j2y_1.l2y_1, this.n2y_1);
      }
    }
    initMetadataForClass($, 'WindowClearTimeout');
    WindowClearTimeoutClass = $;
  }
  return WindowClearTimeoutClass;
}
function WindowDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
  return function () {
    // Inline function 'kotlin.with' call
    $continuation.o24(this$0, Unit_instance);
    return Unit_instance;
  };
}
function Runnable$run$ref(p0) {
  var l = function () {
    p0.z26();
    return Unit_instance;
  };
  l.callableName = 'run';
  return l;
}
var WindowDispatcherClass;
function WindowDispatcher() {
  if (WindowDispatcherClass === VOID) {
    class $ extends CoroutineDispatcher() {
      constructor(window_0) {
        super();
        this.l2y_1 = window_0;
        this.m2y_1 = new (WindowMessageQueue())(this.l2y_1);
      }
      m28(context, block) {
        return this.m2y_1.l2x(block);
      }
      a29(timeMillis, continuation) {
        var handle = w3cSetTimeout_0(this.l2y_1, WindowDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
        invokeOnCancellation(continuation, new (WindowClearTimeout())(this, handle));
      }
      b29(timeMillis, block, context) {
        var handle = w3cSetTimeout_0(this.l2y_1, Runnable$run$ref(block), delayToInt(timeMillis));
        return new (WindowClearTimeout())(this, handle);
      }
    }
    initMetadataForClass($, 'WindowDispatcher', VOID, VOID, [CoroutineDispatcher(), Delay()], [1]);
    WindowDispatcherClass = $;
  }
  return WindowDispatcherClass;
}
function delayToInt(timeMillis) {
  return coerceIn(timeMillis, new (Long())(0, 0), new (Long())(2147483647, 0)).f2();
}
var ClearTimeoutClass;
function ClearTimeout() {
  if (ClearTimeoutClass === VOID) {
    class $ {
      constructor(handle, $box) {
        boxApply(this, $box);
        this.n2y_1 = handle;
      }
      z24() {
        w3cClearTimeout_0(this.n2y_1);
      }
      y24(cause) {
        this.z24();
      }
      toString() {
        return 'ClearTimeout[' + this.n2y_1 + ']';
      }
    }
    initMetadataForClass($, 'ClearTimeout', VOID, VOID, [CancelHandler()]);
    ClearTimeoutClass = $;
  }
  return ClearTimeoutClass;
}
//region block: exports
export {
  NodeDispatcher_getInstance as NodeDispatcher_getInstance3tzr0otbafhkb,
  SetTimeoutDispatcher_getInstance as SetTimeoutDispatcher_getInstance3itz9uvzqmi9x,
  WindowDispatcher as WindowDispatcheram3q94j2gxvn,
};
//endregion

//# sourceMappingURL=JSDispatcher.mjs.map
