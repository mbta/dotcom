import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { GlobalScope_instance1sfulufhd2ijt as GlobalScope_instance } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import {
  writer1eia5its2a1fh as writer,
  WriterScope3b0bo1enaee6b as WriterScope,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import {
  WriteChannelContent1d7f40hsfcaxg as WriteChannelContent,
  ReadChannelContentz1amb4hnpqp4 as ReadChannelContent,
  NoContent1bdx48poqrifq as NoContent,
  ProtocolUpgradexnnpt2xliy8g as ProtocolUpgrade,
  ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent,
  ContentWrapper3n9gdymgnbto9 as ContentWrapper,
} from '../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { Companion_getInstance2ai11rhpust2a as Companion_getInstance } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { UnsupportedContentTypeException1omj39t4jp3a7 as UnsupportedContentTypeException } from '../call/utils.mjs';
import { ByteReadChannel1cb89sbyipkce as ByteReadChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteChannelCtor.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { observable2pw4p3n7s3klf as observable } from '../utils/ByteChannelUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ProgressListenerClass;
function ProgressListener() {
  if (ProgressListenerClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'ProgressListener', VOID, VOID, VOID, [2]);
    ProgressListenerClass = $;
  }
  return ProgressListenerClass;
}
function getContent($this, delegate) {
  var tmp;
  if (delegate instanceof ContentWrapper()) {
    tmp = getContent($this, delegate.j41());
  } else {
    if (delegate instanceof ByteArrayContent()) {
      tmp = ByteReadChannel(delegate.f41());
    } else {
      if (delegate instanceof ProtocolUpgrade()) {
        throw UnsupportedContentTypeException().g4v(delegate);
      } else {
        if (delegate instanceof NoContent()) {
          tmp = Companion_getInstance().c38_1;
        } else {
          if (delegate instanceof ReadChannelContent()) {
            tmp = delegate.q41();
          } else {
            if (delegate instanceof WriteChannelContent()) {
              var tmp_0 = GlobalScope_instance;
              tmp = writer(tmp_0, $this.k4v_1, true, ObservableContent$getContent$slambda_0(delegate, null)).o3d_1;
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
var ObservableContent$getContent$slambdaClass;
function ObservableContent$getContent$slambda() {
  if (ObservableContent$getContent$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($delegate, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.u4v_1 = $delegate;
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
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = this.u4v_1.n42(this.v4v_1.q3d_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                return Unit_instance;
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      s47($this$writer, completion) {
        var i = new (ObservableContent$getContent$slambda())(this.u4v_1, completion);
        i.v4v_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    ObservableContent$getContent$slambdaClass = $;
  }
  return ObservableContent$getContent$slambdaClass;
}
function ObservableContent$getContent$slambda_0($delegate, resultContinuation) {
  var i = new (ObservableContent$getContent$slambda())($delegate, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
var ObservableContentClass;
function ObservableContent() {
  if (ObservableContentClass === VOID) {
    class $ extends ReadChannelContent() {
      constructor(delegate, callContext, listener) {
        super();
        this.j4v_1 = delegate;
        this.k4v_1 = callContext;
        this.l4v_1 = listener;
      }
      d41() {
        return this.j4v_1.d41();
      }
      e41() {
        return this.j4v_1.e41();
      }
      l3v() {
        return this.j4v_1.l3v();
      }
      q41() {
        return observable(getContent(this, this.j4v_1), this.k4v_1, this.e41(), this.l4v_1);
      }
    }
    initMetadataForClass($, 'ObservableContent');
    ObservableContentClass = $;
  }
  return ObservableContentClass;
}
//region block: exports
export {
  ObservableContent as ObservableContent3ft2pt0w2oysd,
  ProgressListener as ProgressListener886sg277haqw,
};
//endregion

//# sourceMappingURL=ObservableContent.mjs.map
