import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContextImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  ContentWrapper3n9gdymgnbto9 as ContentWrapper,
  ProtocolUpgradexnnpt2xliy8g as ProtocolUpgrade,
  NoContent1bdx48poqrifq as NoContent,
  ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent,
  WriteChannelContent1d7f40hsfcaxg as WriteChannelContent,
  ReadChannelContentz1amb4hnpqp4 as ReadChannelContent,
} from './OutgoingContent.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../HttpHeaders.mjs';
import { equals2v6cggk171b6e as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import {
  Companion_getInstance2krh5pmq7pw0k as Companion_getInstance,
  HeadersBuilder3h7sn3kkvu98m as HeadersBuilder,
} from '../Headers.mjs';
import { appendFiltered3071cphiha2wn as appendFiltered } from '../../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LazyThreadSafetyMode_NONE_getInstance2ezxh11hvaa3w as LazyThreadSafetyMode_NONE_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { CoroutineScopefcb5f5dwqcas as CoroutineScope } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { close3semq7pafb42g as close } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { closeqm43o3junf8o as close_0 } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannel.mjs';
import { withContexte657h72vdbqn as withContext } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Builders.common.mjs';
import { ByteReadChannel1cb89sbyipkce as ByteReadChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteChannelCtor.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function compressed(_this__u8e3s4, contentEncoder, coroutineContext) {
  coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
  var tmp;
  if (_this__u8e3s4 instanceof ReadChannelContent()) {
    tmp = new (CompressedReadChannelResponse())(_this__u8e3s4, compressed$lambda(_this__u8e3s4), contentEncoder, coroutineContext);
  } else {
    if (_this__u8e3s4 instanceof WriteChannelContent()) {
      tmp = new (CompressedWriteChannelResponse())(_this__u8e3s4, contentEncoder, coroutineContext);
    } else {
      if (_this__u8e3s4 instanceof ByteArrayContent()) {
        tmp = new (CompressedReadChannelResponse())(_this__u8e3s4, compressed$lambda_0(_this__u8e3s4), contentEncoder, coroutineContext);
      } else {
        if (_this__u8e3s4 instanceof NoContent()) {
          tmp = null;
        } else {
          if (_this__u8e3s4 instanceof ProtocolUpgrade()) {
            tmp = null;
          } else {
            if (_this__u8e3s4 instanceof ContentWrapper()) {
              tmp = compressed(_this__u8e3s4.j41(), contentEncoder, coroutineContext);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
      }
    }
  }
  return tmp;
}
function CompressedReadChannelResponse$headers$delegate$lambda$lambda(name, _unused_var__etf5q3) {
  return !equals(name, HttpHeaders_getInstance().h3r_1, true);
}
function CompressedReadChannelResponse$headers$delegate$lambda(this$0) {
  return function () {
    // Inline function 'io.ktor.http.Companion.build' call
    Companion_getInstance();
    // Inline function 'kotlin.apply' call
    var this_0 = new (HeadersBuilder())();
    var tmp = this$0.l41_1.l3v();
    appendFiltered(this_0, tmp, VOID, CompressedReadChannelResponse$headers$delegate$lambda$lambda);
    this_0.j3j(HttpHeaders_getInstance().f3r_1, this$0.n41_1.y3());
    var tmp_0 = HttpHeaders_getInstance().r3t_1;
    var tmp0_safe_receiver = this$0.l41_1.l3v().lk(HttpHeaders_getInstance().r3t_1);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver + (', ' + HttpHeaders_getInstance().u3q_1);
    this_0.j3j(tmp_0, tmp1_elvis_lhs == null ? HttpHeaders_getInstance().u3q_1 : tmp1_elvis_lhs);
    return this_0.r3q();
  };
}
function CompressedReadChannelResponse$_get_headers_$ref_qqeaub() {
  return function (p0) {
    return p0.l3v();
  };
}
var CompressedReadChannelResponseClass;
function CompressedReadChannelResponse() {
  if (CompressedReadChannelResponseClass === VOID) {
    class $ extends ReadChannelContent() {
      constructor(original, delegateChannel, encoder, coroutineContext) {
        super();
        this.l41_1 = original;
        this.m41_1 = delegateChannel;
        this.n41_1 = encoder;
        this.o41_1 = coroutineContext;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_NONE_getInstance();
        tmp.p41_1 = lazy(tmp_0, CompressedReadChannelResponse$headers$delegate$lambda(this));
      }
      q41() {
        return this.n41_1.v3h(this.m41_1(), this.o41_1);
      }
      l3v() {
        var tmp0 = this.p41_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('headers', 1, tmp, CompressedReadChannelResponse$_get_headers_$ref_qqeaub(), null);
        return tmp0.v1();
      }
      d41() {
        return this.l41_1.d41();
      }
      e41() {
        var tmp0_safe_receiver = this.l41_1.e41();
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = this.n41_1.u3h(tmp0_safe_receiver);
        }
        var tmp1_safe_receiver = tmp;
        var tmp_0;
        if (tmp1_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.takeIf' call
          var tmp_1;
          if (tmp1_safe_receiver.d2(new (Long())(0, 0)) >= 0) {
            tmp_1 = tmp1_safe_receiver;
          } else {
            tmp_1 = null;
          }
          tmp_0 = tmp_1;
        }
        return tmp_0;
      }
    }
    initMetadataForClass($, 'CompressedReadChannelResponse');
    CompressedReadChannelResponseClass = $;
  }
  return CompressedReadChannelResponseClass;
}
function CompressedWriteChannelResponse$headers$delegate$lambda$lambda(name, _unused_var__etf5q3) {
  return !equals(name, HttpHeaders_getInstance().h3r_1, true);
}
function CompressedWriteChannelResponse$headers$delegate$lambda(this$0) {
  return function () {
    // Inline function 'io.ktor.http.Companion.build' call
    Companion_getInstance();
    // Inline function 'kotlin.apply' call
    var this_0 = new (HeadersBuilder())();
    var tmp = this$0.s41_1.l3v();
    appendFiltered(this_0, tmp, VOID, CompressedWriteChannelResponse$headers$delegate$lambda$lambda);
    this_0.j3j(HttpHeaders_getInstance().f3r_1, this$0.t41_1.y3());
    var tmp_0 = HttpHeaders_getInstance().r3t_1;
    var tmp0_safe_receiver = this$0.s41_1.l3v().lk(HttpHeaders_getInstance().r3t_1);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver + (', ' + HttpHeaders_getInstance().u3q_1);
    this_0.j3j(tmp_0, tmp1_elvis_lhs == null ? HttpHeaders_getInstance().u3q_1 : tmp1_elvis_lhs);
    return this_0.r3q();
  };
}
function CompressedWriteChannelResponse$_get_headers_$ref_cqftw() {
  return function (p0) {
    return p0.l3v();
  };
}
var CompressedWriteChannelResponse$writeTo$slambdaClass;
function CompressedWriteChannelResponse$writeTo$slambda() {
  if (CompressedWriteChannelResponse$writeTo$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, $channel, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.e42_1 = this$0;
        $box.f42_1 = $channel;
        super(resultContinuation, $box);
      }
      x3e($this$withContext, $completion) {
        var tmp = this.y3e($this$withContext, $completion);
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
                this.gd_1 = 5;
                var tmp_0 = this;
                tmp_0.h42_1 = this.e42_1.t41_1.w3h(this.f42_1, this.g42_1.w20());
                this.i42_1 = this.h42_1;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.gd_1 = 4;
                this.gd_1 = 3;
                var tmp_1 = this;
                tmp_1.k42_1 = this.i42_1;
                this.l42_1 = this.k42_1;
                this.fd_1 = 2;
                suspendResult = this.e42_1.s41_1.n42(this.l42_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.j42_1 = Unit_instance;
                this.gd_1 = 5;
                this.fd_1 = 6;
                continue $sm;
              case 3:
                this.gd_1 = 4;
                var tmp_2 = this.id_1;
                if (tmp_2 instanceof Error) {
                  var cause = this.id_1;
                  var tmp_3 = this;
                  close(this.i42_1, cause);
                  throw cause;
                } else {
                  throw this.id_1;
                }

              case 4:
                this.gd_1 = 5;
                var t = this.id_1;
                close_0(this.i42_1);
                throw t;
              case 5:
                throw this.id_1;
              case 6:
                this.gd_1 = 5;
                close_0(this.i42_1);
                return Unit_instance;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 5) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      y3e($this$withContext, completion) {
        var i = new (CompressedWriteChannelResponse$writeTo$slambda())(this.e42_1, this.f42_1, completion);
        i.g42_1 = $this$withContext;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    CompressedWriteChannelResponse$writeTo$slambdaClass = $;
  }
  return CompressedWriteChannelResponse$writeTo$slambdaClass;
}
function CompressedWriteChannelResponse$writeTo$slambda_0(this$0, $channel, resultContinuation) {
  var i = new (CompressedWriteChannelResponse$writeTo$slambda())(this$0, $channel, resultContinuation);
  var l = function ($this$withContext, $completion) {
    return i.x3e($this$withContext, $completion);
  };
  l.$arity = 1;
  return l;
}
var CompressedWriteChannelResponseClass;
function CompressedWriteChannelResponse() {
  if (CompressedWriteChannelResponseClass === VOID) {
    class $ extends WriteChannelContent() {
      constructor(original, encoder, coroutineContext) {
        super();
        this.s41_1 = original;
        this.t41_1 = encoder;
        this.u41_1 = coroutineContext;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_NONE_getInstance();
        tmp.v41_1 = lazy(tmp_0, CompressedWriteChannelResponse$headers$delegate$lambda(this));
      }
      l3v() {
        var tmp0 = this.v41_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('headers', 1, tmp, CompressedWriteChannelResponse$_get_headers_$ref_cqftw(), null);
        return tmp0.v1();
      }
      d41() {
        return this.s41_1.d41();
      }
      e41() {
        var tmp0_safe_receiver = this.s41_1.e41();
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = this.t41_1.u3h(tmp0_safe_receiver);
        }
        var tmp1_safe_receiver = tmp;
        var tmp_0;
        if (tmp1_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.takeIf' call
          var tmp_1;
          if (tmp1_safe_receiver.d2(new (Long())(0, 0)) >= 0) {
            tmp_1 = tmp1_safe_receiver;
          } else {
            tmp_1 = null;
          }
          tmp_0 = tmp_1;
        }
        return tmp_0;
      }
      n42(channel, $completion) {
        return withContext(this.u41_1, CompressedWriteChannelResponse$writeTo$slambda_0(this, channel, null), $completion);
      }
    }
    initMetadataForClass($, 'CompressedWriteChannelResponse', VOID, VOID, VOID, [1]);
    CompressedWriteChannelResponseClass = $;
  }
  return CompressedWriteChannelResponseClass;
}
function compressed$lambda($this_compressed) {
  return function () {
    return $this_compressed.q41();
  };
}
function compressed$lambda_0($this_compressed) {
  return function () {
    return ByteReadChannel($this_compressed.f41());
  };
}
//region block: exports
export {
  compressed as compressed3r8j7meefwnqs,
};
//endregion

//# sourceMappingURL=CompressedContent.mjs.map
