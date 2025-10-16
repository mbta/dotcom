import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Buffergs925ekssbch as Buffer } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  awaitContent$default62rpipafmnr4 as awaitContent$default,
  ByteReadChannel2wzou76jce72d as ByteReadChannel,
} from './ByteReadChannel.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function transferFromDelegate($this) {
  updateConsumed($this);
  var appended = $this.f3f_1.k31($this.e3f_1.v35());
  $this.g3f_1 = $this.g3f_1.f4(appended);
}
function updateConsumed($this) {
  $this.h3f_1 = $this.h3f_1.f4($this.g3f_1.g4($this.f3f_1.c1()));
  $this.g3f_1 = $this.f3f_1.c1();
}
var $awaitContentCOROUTINE$Class;
function $awaitContentCOROUTINE$() {
  if ($awaitContentCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, min, resultContinuation) {
        super(resultContinuation);
        this.q3f_1 = _this__u8e3s4;
        this.r3f_1 = min;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                if (this.q3f_1.v35().c1().d2(toLong(this.r3f_1)) >= 0) {
                  return true;
                }

                this.fd_1 = 1;
                suspendResult = this.q3f_1.e3f_1.d36(this.r3f_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                if (suspendResult) {
                  transferFromDelegate(this.q3f_1);
                  return true;
                } else {
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                return false;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $awaitContentCOROUTINE$Class = $;
  }
  return $awaitContentCOROUTINE$Class;
}
var CountedByteReadChannelClass;
function CountedByteReadChannel() {
  if (CountedByteReadChannelClass === VOID) {
    class $ {
      constructor(delegate) {
        this.e3f_1 = delegate;
        this.f3f_1 = new (Buffer())();
        this.g3f_1 = new (Long())(0, 0);
        this.h3f_1 = new (Long())(0, 0);
      }
      s3f() {
        updateConsumed(this);
        return this.h3f_1;
      }
      a36() {
        return this.e3f_1.a36();
      }
      c36() {
        return this.f3f_1.t2z() && this.e3f_1.c36();
      }
      v35() {
        transferFromDelegate(this);
        return this.f3f_1;
      }
      d36(min, $completion) {
        var tmp = new ($awaitContentCOROUTINE$())(this, min, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      g36(cause) {
        this.e3f_1.g36(cause);
        this.f3f_1.v6();
      }
    }
    protoOf($).e36 = awaitContent$default;
    initMetadataForClass($, 'CountedByteReadChannel', VOID, VOID, [ByteReadChannel()], [1]);
    CountedByteReadChannelClass = $;
  }
  return CountedByteReadChannelClass;
}
function counted(_this__u8e3s4) {
  return new (CountedByteReadChannel())(_this__u8e3s4);
}
//region block: exports
export {
  counted as counted3iniv3aql3f9n,
};
//endregion

//# sourceMappingURL=CountedByteReadChannel.mjs.map
