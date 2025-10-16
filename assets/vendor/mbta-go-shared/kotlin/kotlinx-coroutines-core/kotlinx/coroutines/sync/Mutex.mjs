import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import {
  getOrCreateCancellableContinuation2t1o0dr9l9i36 as getOrCreateCancellableContinuation,
  cancel$default1r6ecuk0q8omy as cancel$default,
  CancellableContinuationpb2x00mxmcbt as CancellableContinuation,
} from '../CancellableContinuation.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Waiter3lxa2a79zyo0g as Waiter } from '../Waiter.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { SemaphoreAndMutexImplgyx1507kqsum as SemaphoreAndMutexImpl } from './Semaphore.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { get_hexAddress1mxa7txdmiojm as get_hexAddress } from '../Debug.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from '../internal/Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_NO_OWNER() {
  _init_properties_Mutex_kt__jod56b();
  return NO_OWNER;
}
var NO_OWNER;
var ON_LOCK_ALREADY_LOCKED_BY_OWNER;
function Mutex(locked) {
  locked = locked === VOID ? false : locked;
  _init_properties_Mutex_kt__jod56b();
  return new (MutexImpl())(locked);
}
function MutexImpl$CancellableContinuationWithOwner$tryResume$lambda(this$0, this$1) {
  return function (_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
    // Inline function 'kotlinx.coroutines.assert' call
    this$0.u2v_1.kotlinx$atomicfu$value = this$1.x2v_1;
    this$0.z2v(this$1.x2v_1);
    return Unit_instance;
  };
}
function MutexImpl$CancellableContinuationWithOwner$resume$lambda(this$0, this$1) {
  return function (it) {
    this$0.z2v(this$1.x2v_1);
    return Unit_instance;
  };
}
function holdsLockImpl($this, owner) {
  $l$loop: while (true) {
    if (!$this.a2w())
      return 0;
    var curOwner = $this.u2v_1.kotlinx$atomicfu$value;
    if (curOwner === get_NO_OWNER())
      continue $l$loop;
    return curOwner === owner ? 1 : 2;
  }
}
function lockSuspend($this, owner, $completion) {
  var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
  try {
    var contWithOwner = new (CancellableContinuationWithOwner())($this, cancellable, owner);
    $this.acquireCont(contWithOwner);
  } catch ($p) {
    if ($p instanceof Error) {
      var e = $p;
      cancellable.m26();
      throw e;
    } else {
      throw $p;
    }
  }
  return cancellable.e23();
}
function tryLockImpl($this, owner) {
  $l$loop: while (true) {
    if ($this.i2w()) {
      // Inline function 'kotlinx.coroutines.assert' call
      $this.u2v_1.kotlinx$atomicfu$value = owner;
      return 0;
    } else {
      if (owner == null)
        return 1;
      switch (holdsLockImpl($this, owner)) {
        case 1:
          return 2;
        case 2:
          return 1;
        case 0:
          continue $l$loop;
      }
    }
  }
}
var CancellableContinuationWithOwnerClass;
function CancellableContinuationWithOwner() {
  if (CancellableContinuationWithOwnerClass === VOID) {
    class $ {
      constructor($outer, cont, owner) {
        this.y2v_1 = $outer;
        this.w2v_1 = cont;
        this.x2v_1 = owner;
      }
      j2w(value, idempotent, onCancellation) {
        // Inline function 'kotlinx.coroutines.assert' call
        var token = this.w2v_1.j24(value, idempotent, MutexImpl$CancellableContinuationWithOwner$tryResume$lambda(this.y2v_1, this));
        if (!(token == null)) {
          // Inline function 'kotlinx.coroutines.assert' call
          this.y2v_1.u2v_1.kotlinx$atomicfu$value = this.x2v_1;
        }
        return token;
      }
      j24(value, idempotent, onCancellation) {
        return this.j2w(value instanceof Unit() ? value : THROW_CCE(), idempotent, onCancellation);
      }
      k2w(value, onCancellation) {
        // Inline function 'kotlinx.coroutines.assert' call
        this.y2v_1.u2v_1.kotlinx$atomicfu$value = this.x2v_1;
        this.w2v_1.q26(Unit_instance, MutexImpl$CancellableContinuationWithOwner$resume$lambda(this.y2v_1, this));
      }
      p24(value, onCancellation) {
        return this.k2w(value instanceof Unit() ? value : THROW_CCE(), onCancellation);
      }
      t21() {
        return this.w2v_1.t21();
      }
      k24(token) {
        this.w2v_1.k24(token);
      }
      l24(cause) {
        return this.w2v_1.l24(cause);
      }
      n24(handler) {
        this.w2v_1.n24(handler);
      }
      s26(segment, index) {
        this.w2v_1.s26(segment, index);
      }
      l2w(_this__u8e3s4, value) {
        this.w2v_1.o24(_this__u8e3s4, Unit_instance);
      }
      o24(_this__u8e3s4, value) {
        return this.l2w(_this__u8e3s4, value instanceof Unit() ? value : THROW_CCE());
      }
      xo(result) {
        this.w2v_1.qd(result);
      }
      qd(result) {
        return this.xo(result);
      }
      ld() {
        return this.w2v_1.ld();
      }
    }
    protoOf($).m24 = cancel$default;
    initMetadataForClass($, 'CancellableContinuationWithOwner', VOID, VOID, [CancellableContinuation(), Waiter()]);
    CancellableContinuationWithOwnerClass = $;
  }
  return CancellableContinuationWithOwnerClass;
}
function MutexImpl$onSelectCancellationUnlockConstructor$lambda$lambda(this$0, $owner) {
  return function (_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
    this$0.z2v($owner);
    return Unit_instance;
  };
}
function MutexImpl$onSelectCancellationUnlockConstructor$lambda(this$0) {
  return function (_unused_var__etf5q3, owner, _unused_var__etf5q3_0) {
    return MutexImpl$onSelectCancellationUnlockConstructor$lambda$lambda(this$0, owner);
  };
}
var MutexImplClass;
function MutexImpl() {
  if (MutexImplClass === VOID) {
    class $ extends SemaphoreAndMutexImpl() {
      constructor(locked) {
        super(1, locked ? 1 : 0);
        this.u2v_1 = atomic$ref$1(locked ? null : get_NO_OWNER());
        var tmp = this;
        tmp.v2v_1 = MutexImpl$onSelectCancellationUnlockConstructor$lambda(this);
      }
      a2w() {
        return this.m2w() === 0;
      }
      n2w(owner, $completion) {
        if (this.o2w(owner))
          return Unit_instance;
        return lockSuspend(this, owner, $completion);
      }
      o2w(owner) {
        var tmp;
        switch (tryLockImpl(this, owner)) {
          case 0:
            tmp = true;
            break;
          case 1:
            tmp = false;
            break;
          case 2:
            var message = 'This mutex is already locked by the specified owner: ' + toString_0(owner);
            throw IllegalStateException().o5(toString(message));
          default:
            var message_0 = 'unexpected';
            throw IllegalStateException().o5(toString(message_0));
        }
        return tmp;
      }
      z2v(owner) {
        $l$loop_0: while (true) {
          // Inline function 'kotlin.check' call
          if (!this.a2w()) {
            var message = 'This mutex is not locked';
            throw IllegalStateException().o5(toString(message));
          }
          var curOwner = this.u2v_1.kotlinx$atomicfu$value;
          if (curOwner === get_NO_OWNER())
            continue $l$loop_0;
          // Inline function 'kotlin.check' call
          if (!(curOwner === owner || owner == null)) {
            var message_0 = 'This mutex is locked by ' + toString_0(curOwner) + ', but ' + toString_0(owner) + ' is expected';
            throw IllegalStateException().o5(toString(message_0));
          }
          if (!this.u2v_1.atomicfu$compareAndSet(curOwner, get_NO_OWNER()))
            continue $l$loop_0;
          this.i1l();
          return Unit_instance;
        }
      }
      toString() {
        return 'Mutex@' + get_hexAddress(this) + '[isLocked=' + this.a2w() + ',owner=' + toString_0(this.u2v_1.kotlinx$atomicfu$value) + ']';
      }
    }
    initMetadataForClass($, 'MutexImpl', VOID, VOID, VOID, [1, 0]);
    MutexImplClass = $;
  }
  return MutexImplClass;
}
var properties_initialized_Mutex_kt_yv4p3j;
function _init_properties_Mutex_kt__jod56b() {
  if (!properties_initialized_Mutex_kt_yv4p3j) {
    properties_initialized_Mutex_kt_yv4p3j = true;
    NO_OWNER = new (Symbol())('NO_OWNER');
    ON_LOCK_ALREADY_LOCKED_BY_OWNER = new (Symbol())('ALREADY_LOCKED_BY_OWNER');
  }
}
//region block: exports
export {
  Mutex as Mutex16li1l0asjv17,
};
//endregion

//# sourceMappingURL=Mutex.mjs.map
