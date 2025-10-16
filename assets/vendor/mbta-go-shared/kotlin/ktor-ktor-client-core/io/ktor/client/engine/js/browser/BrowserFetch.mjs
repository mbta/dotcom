import { Companion_getInstance2ai11rhpust2a as Companion_getInstance } from '../../../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  writer1eia5its2a1fh as writer,
  WriterScope3b0bo1enaee6b as WriterScope,
  writeFully3gv1ab611t04k as writeFully,
} from '../../../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { SafeContinuation1x0fxyaxo6cwq as SafeContinuation } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/SafeContinuationJs.mjs';
import { intercepted2ogpsikxxj4u0 as intercepted } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/IntrinsicsJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { asByteArray281a45t1cr5zc as asByteArray } from '../ReadableStream.mjs';
import { await20nhgj9iqzkt as await_0 } from '../../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Promise.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  createFailure8paxfkfa5dc7 as createFailure,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readBodyBrowser(_this__u8e3s4, response) {
  var tmp0_elvis_lhs = response.body;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Companion_getInstance().c38_1;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var stream = tmp;
  return channelFromStream(_this__u8e3s4, stream);
}
function channelFromStream(_this__u8e3s4, stream) {
  return writer(_this__u8e3s4, VOID, VOID, channelFromStream$slambda_0(stream, null)).o3d_1;
}
function readChunk(_this__u8e3s4, $completion) {
  var safe = SafeContinuation().yd(intercepted($completion));
  var tmp = _this__u8e3s4.read();
  var tmp_0 = tmp.then(readChunk$lambda(safe));
  tmp_0.catch(readChunk$lambda_0(safe));
  return safe.zd();
}
function channelFromStream$slambda$lambda(it) {
  return Unit_instance;
}
var channelFromStream$slambdaClass;
function channelFromStream$slambda() {
  if (channelFromStream$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($stream, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.a5y_1 = $stream;
        super(resultContinuation, $box);
      }
      r47($this$writer, $completion) {
        var tmp = this.s47($this$writer, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r47(p1 instanceof WriterScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 9;
                this.c5y_1 = this.a5y_1.getReader();
                this.gd_1 = 7;
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!true) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.fd_1 = 2;
                suspendResult = readChunk(this.c5y_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.d5y_1 = suspendResult;
                if (this.d5y_1 == null) {
                  this.fd_1 = 6;
                  var tmp_0 = this;
                  continue $sm;
                } else {
                  this.e5y_1 = this.d5y_1;
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 3:
                this.f5y_1 = this.e5y_1;
                this.fd_1 = 4;
                suspendResult = writeFully(this.b5y_1.q3d_1, asByteArray(this.f5y_1), VOID, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 4:
                this.fd_1 = 5;
                suspendResult = this.b5y_1.q3d_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.fd_1 = 1;
                continue $sm;
              case 6:
                this.gd_1 = 9;
                this.fd_1 = 10;
                continue $sm;
              case 7:
                this.gd_1 = 9;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof Error) {
                  this.g5y_1 = this.id_1;
                  this.fd_1 = 8;
                  var tmp_2 = this.c5y_1.cancel(this.g5y_1);
                  suspendResult = await_0(tmp_2.catch(channelFromStream$slambda$lambda), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  throw this.id_1;
                }

              case 8:
                throw this.g5y_1;
              case 9:
                throw this.id_1;
              case 10:
                this.gd_1 = 9;
                return Unit_instance;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 9) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      s47($this$writer, completion) {
        var i = new (channelFromStream$slambda())(this.a5y_1, completion);
        i.b5y_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    channelFromStream$slambdaClass = $;
  }
  return channelFromStream$slambdaClass;
}
function channelFromStream$slambda_0($stream, resultContinuation) {
  var i = new (channelFromStream$slambda())($stream, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
function readChunk$lambda($continuation) {
  return function (it) {
    var chunk = it.value;
    var result = it.done ? null : chunk;
    // Inline function 'kotlin.coroutines.resume' call
    var this_0 = $continuation;
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(result);
    this_0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
function readChunk$lambda_0($continuation) {
  return function (cause) {
    // Inline function 'kotlin.coroutines.resumeWithException' call
    var this_0 = $continuation;
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(cause));
    this_0.qd(tmp$ret$0);
    return Unit_instance;
  };
}
//region block: exports
export {
  readBodyBrowser as readBodyBrowser2vmfk0na3k29n,
};
//endregion

//# sourceMappingURL=BrowserFetch.mjs.map
