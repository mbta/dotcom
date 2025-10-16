import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { ByteChannel3cxdguezl3lu7 as ByteChannel } from './ByteChannel.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { flushIfNeeded2ae8rmpc1excy as flushIfNeeded } from './ByteWriteChannel.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { launch1c91vkjzdi9sd as launch } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { startCoroutineCancellable18shtfwdieib as startCoroutineCancellable } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/intrinsics/Cancellable.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/Continuation.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  get_job2zvlvce9o9a29 as get_job,
  Job13y4jkazwjho0 as Job,
  cancel1xim2hrvjmwpn as cancel,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Job.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_NO_CALLBACK() {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return NO_CALLBACK;
}
var NO_CALLBACK;
var WriterJobClass;
function WriterJob() {
  if (WriterJobClass === VOID) {
    class $ {
      constructor(channel, job) {
        this.o3d_1 = channel;
        this.p3d_1 = job;
      }
      n27() {
        return this.p3d_1;
      }
    }
    initMetadataForClass($, 'WriterJob');
    WriterJobClass = $;
  }
  return WriterJobClass;
}
function writer(_this__u8e3s4, coroutineContext, autoFlush, block) {
  coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
  autoFlush = autoFlush === VOID ? false : autoFlush;
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return writer_0(_this__u8e3s4, coroutineContext, new (ByteChannel())(), block);
}
var WriterScopeClass;
function WriterScope() {
  if (WriterScopeClass === VOID) {
    class $ {
      constructor(channel, coroutineContext) {
        this.q3d_1 = channel;
        this.r3d_1 = coroutineContext;
      }
      w20() {
        return this.r3d_1;
      }
    }
    initMetadataForClass($, 'WriterScope', VOID, VOID, [CoroutineScope()]);
    WriterScopeClass = $;
  }
  return WriterScopeClass;
}
function writeFully(_this__u8e3s4, value, startIndex, endIndex, $completion) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? value.length : endIndex;
  _this__u8e3s4.y35().c31(value, startIndex, endIndex);
  return flushIfNeeded(_this__u8e3s4, $completion);
}
function close(_this__u8e3s4, cause) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  if (cause == null) {
    fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
  } else {
    _this__u8e3s4.g36(cause);
  }
}
function invokeOnCompletion(_this__u8e3s4, block) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return _this__u8e3s4.n27().z21(block);
}
function writer_0(_this__u8e3s4, coroutineContext, channel, block) {
  coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  // Inline function 'kotlin.apply' call
  var this_0 = launch(_this__u8e3s4, coroutineContext, VOID, writer$slambda_0(block, channel, null));
  this_0.z21(writer$lambda(channel));
  var job = this_0;
  return new (WriterJob())(channel, job);
}
function fireAndForget(_this__u8e3s4) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  startCoroutineCancellable(_this__u8e3s4, get_NO_CALLBACK());
}
function writeByte(_this__u8e3s4, value, $completion) {
  _this__u8e3s4.y35().l31(value);
  return flushIfNeeded(_this__u8e3s4, $completion);
}
var NO_CALLBACK$1Class;
function NO_CALLBACK$1() {
  if (NO_CALLBACK$1Class === VOID) {
    class $ {
      constructor() {
        this.s3d_1 = EmptyCoroutineContext_getInstance();
      }
      ld() {
        return this.s3d_1;
      }
      md(result) {
        return Unit_instance;
      }
      qd(result) {
        return this.md(result);
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [Continuation()]);
    NO_CALLBACK$1Class = $;
  }
  return NO_CALLBACK$1Class;
}
var ByteWriteChannel$flushAndClose$refClass;
function ByteWriteChannel$flushAndClose$ref() {
  if (ByteWriteChannel$flushAndClose$refClass === VOID) {
    class $ {
      constructor(p0) {
        this.t3d_1 = p0;
      }
      n3d($completion) {
        return this.t3d_1.f36($completion);
      }
      sf($completion) {
        return this.n3d($completion);
      }
    }
    initMetadataForFunctionReference($, VOID, VOID, [0]);
    ByteWriteChannel$flushAndClose$refClass = $;
  }
  return ByteWriteChannel$flushAndClose$refClass;
}
function ByteWriteChannel$flushAndClose$ref_0(p0) {
  var i = new (ByteWriteChannel$flushAndClose$ref())(p0);
  var l = function ($completion) {
    return i.n3d($completion);
  };
  l.callableName = 'flushAndClose';
  l.$arity = 0;
  return l;
}
var writer$slambdaClass;
function writer$slambda() {
  if (writer$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($block, $channel, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.c3e_1 = $block;
        $box.d3e_1 = $channel;
        super(resultContinuation, $box);
      }
      x3e($this$launch, $completion) {
        var tmp = this.y3e($this$launch, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.x3e((!(p1 == null) ? isInterface(p1, CoroutineScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 14;
                this.f3e_1 = Job(get_job(this.e3e_1.w20()));
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 4;
                this.gd_1 = 3;
                this.fd_1 = 2;
                suspendResult = this.c3e_1(new (WriterScope())(this.d3e_1, this.e3e_1.w20().ir(this.f3e_1)), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.f3e_1.i28();
                var tmp_0 = this;
                var tmp_1;
                if (get_job(this.e3e_1.w20()).t21()) {
                  this.d3e_1.g36(get_job(this.e3e_1.w20()).w21());
                  tmp_1 = Unit_instance;
                }

                tmp_0.g3e_1 = tmp_1;
                this.gd_1 = 14;
                this.fd_1 = 9;
                continue $sm;
              case 3:
                this.gd_1 = 4;
                var tmp_2 = this.id_1;
                if (tmp_2 instanceof Error) {
                  this.h3e_1 = this.id_1;
                  var tmp_3 = this;
                  cancel(this.f3e_1, 'Exception thrown while writing to channel', this.h3e_1);
                  this.d3e_1.g36(this.h3e_1);
                  tmp_3.g3e_1 = Unit_instance;
                  this.gd_1 = 14;
                  this.fd_1 = 9;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 4:
                this.gd_1 = 14;
                this.i3e_1 = this.id_1;
                this.fd_1 = 5;
                suspendResult = this.f3e_1.d22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                var tmp_4 = this;
                tmp_4.j3e_1 = this.e3e_1;
                this.k3e_1 = this.j3e_1;
                this.gd_1 = 7;
                var tmp_5 = this;
                tmp_5.m3e_1 = Companion_instance;
                var tmp_6 = this;
                tmp_6.n3e_1 = this.k3e_1;
                this.o3e_1 = this.n3e_1;
                this.fd_1 = 6;
                suspendResult = this.d3e_1.f36(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 6:
                this.p3e_1 = Unit_instance;
                var tmp_7 = this;
                this.m3e_1;
                var value = this.p3e_1;
                tmp_7.l3e_1 = _Result___init__impl__xyqfz8(value);
                this.gd_1 = 14;
                this.fd_1 = 8;
                continue $sm;
              case 7:
                this.gd_1 = 14;
                var tmp_8 = this.id_1;
                if (tmp_8 instanceof Error) {
                  this.q3e_1 = this.id_1;
                  var tmp_9 = this;
                  var exception = this.q3e_1;
                  tmp_9.l3e_1 = _Result___init__impl__xyqfz8(createFailure(exception));
                  this.fd_1 = 8;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 8:
                this.gd_1 = 14;
                throw this.i3e_1;
              case 9:
                this.gd_1 = 14;
                this.fd_1 = 10;
                suspendResult = this.f3e_1.d22(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 10:
                var tmp_10 = this;
                tmp_10.r3e_1 = this.e3e_1;
                this.s3e_1 = this.r3e_1;
                this.gd_1 = 12;
                var tmp_11 = this;
                tmp_11.u3e_1 = Companion_instance;
                var tmp_12 = this;
                tmp_12.v3e_1 = this.s3e_1;
                this.w3e_1 = this.v3e_1;
                this.fd_1 = 11;
                suspendResult = this.d3e_1.f36(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 11:
                var tmp_13 = this;
                this.u3e_1;
                tmp_13.t3e_1 = _Result___init__impl__xyqfz8(Unit_instance);
                this.gd_1 = 14;
                this.fd_1 = 13;
                continue $sm;
              case 12:
                this.gd_1 = 14;
                var tmp_14 = this.id_1;
                if (tmp_14 instanceof Error) {
                  var e = this.id_1;
                  var tmp_15 = this;
                  tmp_15.t3e_1 = _Result___init__impl__xyqfz8(createFailure(e));
                  this.fd_1 = 13;
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 13:
                this.gd_1 = 14;
                return Unit_instance;
              case 14:
                throw this.id_1;
            }
          } catch ($p) {
            var e_0 = $p;
            if (this.gd_1 === 14) {
              throw e_0;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e_0;
            }
          }
         while (true);
      }
      y3e($this$launch, completion) {
        var i = new (writer$slambda())(this.c3e_1, this.d3e_1, completion);
        i.e3e_1 = $this$launch;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    writer$slambdaClass = $;
  }
  return writer$slambdaClass;
}
function writer$slambda_0($block, $channel, resultContinuation) {
  var i = new (writer$slambda())($block, $channel, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.x3e($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function writer$lambda($channel) {
  return function (it) {
    var tmp;
    if (!(it == null) && !$channel.z35()) {
      $channel.g36(it);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var properties_initialized_ByteWriteChannelOperations_kt_acrf6u;
function _init_properties_ByteWriteChannelOperations_kt__i7slrs() {
  if (!properties_initialized_ByteWriteChannelOperations_kt_acrf6u) {
    properties_initialized_ByteWriteChannelOperations_kt_acrf6u = true;
    NO_CALLBACK = new (NO_CALLBACK$1())();
  }
}
//region block: exports
export {
  writeByte as writeByte32j1f6pu0p5dj,
  writeFully as writeFully3gv1ab611t04k,
  WriterScope as WriterScope3b0bo1enaee6b,
  close as close3semq7pafb42g,
  fireAndForget as fireAndForget1uv0d2zhlhrab,
  invokeOnCompletion as invokeOnCompletion1ziuxzoag0iwj,
  writer as writer1eia5its2a1fh,
};
//endregion

//# sourceMappingURL=ByteWriteChannelOperations.mjs.map
