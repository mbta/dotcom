import { ioDispatcher24ww9djm3p3hr as ioDispatcher } from './HttpClientEngineBase.js.mjs';
import { SilentSupervisorlzoikirj0zeo as SilentSupervisor } from '../../../../../ktor-ktor-utils/io/ktor/util/CoroutinesUtils.mjs';
import { CoroutineName2g5zosw74tf0f as CoroutineName } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineName.mjs';
import { atomic$boolean$1iggki4z65a2h as atomic$boolean$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Key_instance2tirv2rj82ml4 as Key_instance } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { CompletableJob1w6swnu15iclo as CompletableJob } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CompletableJob.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  get_supportedCapabilities36x6e2ixit204 as get_supportedCapabilities,
  install34ed8l0uhurm0 as install,
  HttpClientEngine3f41d0b7i209y as HttpClientEngine,
} from './HttpClientEngine.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  captureStack1fzi4aczwc4hg as captureStack,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function HttpClientEngineBase$dispatcher$delegate$lambda(this$0) {
  return function () {
    var tmp0_elvis_lhs = this$0.n4q().d4y_1;
    return tmp0_elvis_lhs == null ? ioDispatcher() : tmp0_elvis_lhs;
  };
}
function HttpClientEngineBase$_get_dispatcher_$ref_kz5x8v() {
  return function (p0) {
    return p0.k4y();
  };
}
function HttpClientEngineBase$coroutineContext$delegate$lambda(this$0) {
  return function () {
    return SilentSupervisor().ir(this$0.k4y()).ir(new (CoroutineName())(this$0.g4y_1 + '-context'));
  };
}
function HttpClientEngineBase$_get_coroutineContext_$ref_p82ehr() {
  return function (p0) {
    return p0.w20();
  };
}
var HttpClientEngineBaseClass;
function HttpClientEngineBase() {
  if (HttpClientEngineBaseClass === VOID) {
    class $ {
      constructor(engineName) {
        this.g4y_1 = engineName;
        this.h4y_1 = atomic$boolean$1(false);
        var tmp = this;
        tmp.i4y_1 = lazy(HttpClientEngineBase$dispatcher$delegate$lambda(this));
        var tmp_0 = this;
        tmp_0.j4y_1 = lazy(HttpClientEngineBase$coroutineContext$delegate$lambda(this));
      }
      k4y() {
        var tmp0 = this.i4y_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('dispatcher', 1, tmp, HttpClientEngineBase$_get_dispatcher_$ref_kz5x8v(), null);
        return tmp0.v1();
      }
      w20() {
        var tmp0 = this.j4y_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('coroutineContext', 1, tmp, HttpClientEngineBase$_get_coroutineContext_$ref_p82ehr(), null);
        return tmp0.v1();
      }
      v6() {
        if (!this.h4y_1.atomicfu$compareAndSet(false, true))
          return Unit_instance;
        var tmp = this.w20().sd(Key_instance);
        var tmp0_elvis_lhs = (!(tmp == null) ? isInterface(tmp, CompletableJob()) : false) ? tmp : null;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return Unit_instance;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var requestJob = tmp_0;
        requestJob.i28();
      }
    }
    protoOf($).p4w = get_supportedCapabilities;
    protoOf($).o4q = install;
    initMetadataForClass($, 'HttpClientEngineBase', VOID, VOID, [HttpClientEngine()], [1]);
    HttpClientEngineBaseClass = $;
  }
  return HttpClientEngineBaseClass;
}
var ClientEngineClosedExceptionClass;
function ClientEngineClosedException() {
  if (ClientEngineClosedExceptionClass === VOID) {
    class $ extends IllegalStateException() {
      static a4y(cause) {
        cause = cause === VOID ? null : cause;
        var $this = this.o5('Client already closed');
        captureStack($this, $this.z4x_1);
        $this.y4x_1 = cause;
        delete $this.cause;
        return $this;
      }
      q2() {
        return this.y4x_1;
      }
      get cause() {
        return this.q2();
      }
    }
    initMetadataForClass($, 'ClientEngineClosedException', $.a4y);
    ClientEngineClosedExceptionClass = $;
  }
  return ClientEngineClosedExceptionClass;
}
//region block: exports
export {
  ClientEngineClosedException as ClientEngineClosedException1qtw9cl0kd5fk,
  HttpClientEngineBase as HttpClientEngineBase2tgisnw4e4drr,
};
//endregion

//# sourceMappingURL=HttpClientEngineBase.mjs.map
