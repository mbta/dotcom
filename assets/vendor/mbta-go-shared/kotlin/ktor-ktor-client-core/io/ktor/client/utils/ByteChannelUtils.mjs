import { GlobalScope_instance1sfulufhd2ijt as GlobalScope_instance } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  writer1eia5its2a1fh as writer,
  WriterScope3b0bo1enaee6b as WriterScope,
  writeFully3gv1ab611t04k as writeFully,
  close3semq7pafb42g as close,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_ByteArrayPool3f7yrgvqxz9ct as get_ByteArrayPool } from '../../../../../ktor-ktor-io/io/ktor/utils/io/pool/ByteArrayPool.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { readAvailable22vc1bmbuj93x as readAvailable } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { initMetadataForLambda3af3he42mmnh as initMetadataForLambda } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function observable(_this__u8e3s4, context, contentLength, listener) {
  var tmp = GlobalScope_instance;
  return writer(tmp, context, true, observable$slambda_0(_this__u8e3s4, listener, contentLength, null)).o3d_1;
}
var observable$slambdaClass;
function observable$slambda() {
  if (observable$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($this_observable, $listener, $contentLength, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.h5t_1 = $this_observable;
        $box.i5t_1 = $listener;
        $box.j5t_1 = $contentLength;
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
                this.gd_1 = 16;
                var tmp_0 = this;
                tmp_0.l5t_1 = get_ByteArrayPool();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                this.n5t_1 = this.l5t_1;
                this.o5t_1 = this.n5t_1.p3g();
                this.fd_1 = 2;
                continue $sm;
              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.gd_1 = 15;
                var tmp_1 = this;
                tmp_1.q5t_1 = this.o5t_1;
                this.r5t_1 = this.q5t_1;
                this.s5t_1 = new (Long())(0, 0);
                this.fd_1 = 4;
                continue $sm;
              case 4:
                if (!!this.h5t_1.c36()) {
                  this.fd_1 = 9;
                  continue $sm;
                }

                this.fd_1 = 5;
                suspendResult = readAvailable(this.h5t_1, this.r5t_1, VOID, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                this.t5t_1 = suspendResult;
                if (this.t5t_1 <= 0) {
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  this.fd_1 = 6;
                  continue $sm;
                }

              case 6:
                this.fd_1 = 7;
                suspendResult = writeFully(this.k5t_1.q3d_1, this.r5t_1, 0, this.t5t_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                var tmp_2 = this;
                var tmp0 = this.s5t_1;
                var other = this.t5t_1;
                tmp_2.s5t_1 = tmp0.f4(toLong(other));
                this.fd_1 = 8;
                suspendResult = this.i5t_1.h4v(this.s5t_1, this.j5t_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 8:
                this.fd_1 = 4;
                continue $sm;
              case 9:
                this.u5t_1 = this.h5t_1.a36();
                close(this.k5t_1.q3d_1, this.u5t_1);
                if (this.u5t_1 == null && this.s5t_1.equals(new (Long())(0, 0))) {
                  this.fd_1 = 10;
                  suspendResult = this.i5t_1.h4v(this.s5t_1, this.j5t_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 11;
                  continue $sm;
                }

              case 10:
                this.fd_1 = 11;
                continue $sm;
              case 11:
                var tmp_3 = this;
                tmp_3.p5t_1 = Unit_instance;
                this.gd_1 = 16;
                this.fd_1 = 12;
                var tmp_4 = this;
                continue $sm;
              case 12:
                this.gd_1 = 16;
                var tmp_5 = this;
                this.n5t_1.q3g(this.o5t_1);
                tmp_5.m5t_1 = Unit_instance;
                this.fd_1 = 14;
                continue $sm;
              case 13:
                this.gd_1 = 16;
                this.n5t_1.q3g(this.o5t_1);
                if (false) {
                  this.fd_1 = 1;
                  continue $sm;
                }

                this.fd_1 = 14;
                continue $sm;
              case 14:
                return Unit_instance;
              case 15:
                this.gd_1 = 16;
                var t = this.id_1;
                this.n5t_1.q3g(this.o5t_1);
                throw t;
              case 16:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 16) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      s47($this$writer, completion) {
        var i = new (observable$slambda())(this.h5t_1, this.i5t_1, this.j5t_1, completion);
        i.k5t_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    observable$slambdaClass = $;
  }
  return observable$slambdaClass;
}
function observable$slambda_0($this_observable, $listener, $contentLength, resultContinuation) {
  var i = new (observable$slambda())($this_observable, $listener, $contentLength, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
//region block: exports
export {
  observable as observable2pw4p3n7s3klf,
};
//endregion

//# sourceMappingURL=ByteChannelUtils.mjs.map
