import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Element2gr7ezmxqaln7 as Element } from '../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import {
  JobSupport3fdjh0rbee4be as JobSupport,
  JobImpl2fbttqo93wxua as JobImpl,
  JobNode2tu3g3s3xsko1 as JobNode,
} from './JobSupport.mjs';
import { CancellationExceptionjngvjj221x3v as CancellationException } from './Exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
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
function invokeOnCompletion$default(onCancelling, invokeImmediately, handler, $super) {
  onCancelling = onCancelling === VOID ? false : onCancelling;
  invokeImmediately = invokeImmediately === VOID ? true : invokeImmediately;
  return $super === VOID ? this.a22(onCancelling, invokeImmediately, handler) : $super.a22.call(this, onCancelling, invokeImmediately, handler);
}
var JobClass;
function Job() {
  if (JobClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Job', VOID, VOID, [Element()], [0]);
    JobClass = $;
  }
  return JobClass;
}
var ParentJobClass;
function ParentJob() {
  if (ParentJobClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ParentJob', VOID, VOID, [Job()], [0]);
    ParentJobClass = $;
  }
  return ParentJobClass;
}
var NonDisposableHandleClass;
function NonDisposableHandle() {
  if (NonDisposableHandleClass === VOID) {
    class $ {
      q21() {
        return null;
      }
      z24() {
      }
      k22(cause) {
        return false;
      }
      toString() {
        return 'NonDisposableHandle';
      }
    }
    initMetadataForObject($, 'NonDisposableHandle');
    NonDisposableHandleClass = $;
  }
  return NonDisposableHandleClass;
}
var NonDisposableHandle_instance;
function NonDisposableHandle_getInstance() {
  return NonDisposableHandle_instance;
}
function ensureActive(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.sd(Key_instance);
  if (tmp0_safe_receiver == null)
    null;
  else {
    ensureActive_0(tmp0_safe_receiver);
  }
}
function invokeOnCompletion(_this__u8e3s4, invokeImmediately, handler) {
  invokeImmediately = invokeImmediately === VOID ? true : invokeImmediately;
  var tmp;
  if (_this__u8e3s4 instanceof JobSupport()) {
    tmp = _this__u8e3s4.c22(invokeImmediately, handler);
  } else {
    var tmp_0 = handler.i27();
    tmp = _this__u8e3s4.a22(tmp_0, invokeImmediately, JobNode$invoke$ref(handler));
  }
  return tmp;
}
function ensureActive_0(_this__u8e3s4) {
  if (!_this__u8e3s4.x20())
    throw _this__u8e3s4.w21();
}
function cancel(_this__u8e3s4, message, cause) {
  cause = cause === VOID ? null : cause;
  return _this__u8e3s4.g22(CancellationException(message, cause));
}
function get_job(_this__u8e3s4) {
  var tmp0_elvis_lhs = _this__u8e3s4.sd(Key_instance);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var message = "Current context doesn't contain Job in it: " + toString(_this__u8e3s4);
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function cancel_0(_this__u8e3s4, cause) {
  cause = cause === VOID ? null : cause;
  var tmp0_safe_receiver = _this__u8e3s4.sd(Key_instance);
  if (tmp0_safe_receiver == null)
    null;
  else {
    tmp0_safe_receiver.g22(cause);
  }
}
function Job_0(parent) {
  parent = parent === VOID ? null : parent;
  return new (JobImpl())(parent);
}
function disposeOnCompletion(_this__u8e3s4, handle) {
  return invokeOnCompletion(_this__u8e3s4, VOID, new (DisposeOnCompletion())(handle));
}
var DisposeOnCompletionClass;
function DisposeOnCompletion() {
  if (DisposeOnCompletionClass === VOID) {
    class $ extends JobNode() {
      constructor(handle) {
        super();
        this.a2a_1 = handle;
      }
      i27() {
        return false;
      }
      y24(cause) {
        return this.a2a_1.z24();
      }
    }
    initMetadataForClass($, 'DisposeOnCompletion');
    DisposeOnCompletionClass = $;
  }
  return DisposeOnCompletionClass;
}
function JobNode$invoke$ref(p0) {
  var l = function (_this__u8e3s4) {
    p0.y24(_this__u8e3s4);
    return Unit_instance;
  };
  l.callableName = 'invoke';
  return l;
}
//region block: init
Key_instance = new (Key())();
NonDisposableHandle_instance = new (NonDisposableHandle())();
//endregion
//region block: exports
export {
  cancel$default as cancel$default2gzemzkga6aea,
  invokeOnCompletion$default as invokeOnCompletion$default6tc1ee8hzqwd,
  Key_instance as Key_instance2tirv2rj82ml4,
  NonDisposableHandle_instance as NonDisposableHandle_instance3k5b81ogrgecy,
  Job_0 as Job13y4jkazwjho0,
  Job as Job29shfjfygy86k,
  ParentJob as ParentJob1a3idoswyjefg,
  cancel_0 as cancel2en0dn4yvpufo,
  cancel as cancel1xim2hrvjmwpn,
  disposeOnCompletion as disposeOnCompletion1zvxmj809ax5i,
  ensureActive as ensureActive2yo7199srjlgl,
  ensureActive_0 as ensureActive159jflbg22qd8,
  invokeOnCompletion as invokeOnCompletion3npqdfp2wzhn6,
  get_job as get_job2zvlvce9o9a29,
};
//endregion

//# sourceMappingURL=Job.mjs.map
