import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { toTypedArray3sl1vhn8ifta0 as toTypedArray } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  WriterScope3b0bo1enaee6b as WriterScope,
  writer1eia5its2a1fh as writer,
} from '../../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { get_supportsRequestBodyjdtitrt33hir as get_supportsRequestBody } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpMethod.mjs';
import {
  isEmpty1yq29t926r0va as isEmpty,
  ProtocolUpgradexnnpt2xliy8g as ProtocolUpgrade,
  NoContent1bdx48poqrifq as NoContent,
  ContentWrapper3n9gdymgnbto9 as ContentWrapper,
  WriteChannelContent1d7f40hsfcaxg as WriteChannelContent,
  ReadChannelContentz1amb4hnpqp4 as ReadChannelContent,
  ByteArrayContent2n0wb43y6ugs1 as ByteArrayContent,
} from '../../../../../../ktor-ktor-http/io/ktor/http/content/OutgoingContent.mjs';
import { mergeHeadersub4y73mj759y as mergeHeaders } from '../Utils.mjs';
import { UnsupportedContentTypeException1omj39t4jp3a7 as UnsupportedContentTypeException } from '../../call/utils.mjs';
import { GlobalScope_instance1sfulufhd2ijt as GlobalScope_instance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineScope.mjs';
import { readRemaining1x8kk1vq7p6gm as readRemaining } from '../../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toRaw(_this__u8e3s4, clientConfig, callContext, $completion) {
  var tmp = new ($toRawCOROUTINE$())(_this__u8e3s4, clientConfig, callContext, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function getBodyBytes(content, callContext, $completion) {
  var tmp = new ($getBodyBytesCOROUTINE$())(content, callContext, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function buildObject(block) {
  var tmp = {};
  // Inline function 'kotlin.apply' call
  var this_0 = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  block(this_0);
  return this_0;
}
function toRaw$lambda($skipContentLengthHeader, $jsHeaders) {
  return function (key, value) {
    var tmp;
    if ($skipContentLengthHeader && key === HttpHeaders_getInstance().h3r_1) {
      return Unit_instance;
    }
    $jsHeaders[key] = value;
    return Unit_instance;
  };
}
function toRaw$lambda_0($this_toRaw, $jsHeaders, $clientConfig, $bodyBytes) {
  return function ($this$buildObject) {
    $this$buildObject.method = $this_toRaw.j4w_1.u3v_1;
    $this$buildObject.headers = $jsHeaders;
    var tmp;
    if ($clientConfig.y4q_1) {
      // Inline function 'org.w3c.fetch.FOLLOW' call
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      tmp = 'follow';
    } else {
      // Inline function 'org.w3c.fetch.MANUAL' call
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      tmp = 'manual';
    }
    $this$buildObject.redirect = tmp;
    var tmp0_safe_receiver = $bodyBytes;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      $this$buildObject.body = new Uint8Array(toTypedArray(tmp0_safe_receiver));
    }
    return Unit_instance;
  };
}
var getBodyBytes$slambdaClass;
function getBodyBytes$slambda() {
  if (getBodyBytes$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($content, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.q5x_1 = $content;
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
                suspendResult = this.q5x_1.n42(this.r5x_1.q3d_1, this);
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
        var i = new (getBodyBytes$slambda())(this.q5x_1, completion);
        i.r5x_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    getBodyBytes$slambdaClass = $;
  }
  return getBodyBytes$slambdaClass;
}
function getBodyBytes$slambda_0($content, resultContinuation) {
  var i = new (getBodyBytes$slambda())($content, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
var $toRawCOROUTINE$Class;
function $toRawCOROUTINE$() {
  if ($toRawCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, clientConfig, callContext, resultContinuation) {
        super(resultContinuation);
        this.s5w_1 = _this__u8e3s4;
        this.t5w_1 = clientConfig;
        this.u5w_1 = callContext;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.v5w_1 = {};
                var this_0 = this.s5w_1;
                var skipContentLengthHeader = !get_supportsRequestBody(this_0.j4w_1) && isEmpty(this_0.l4w_1);
                mergeHeaders(this_0.k4w_1, this_0.l4w_1, toRaw$lambda(skipContentLengthHeader, this.v5w_1));
                this.fd_1 = 1;
                suspendResult = getBodyBytes(this.s5w_1.l4w_1, this.u5w_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var bodyBytes = suspendResult;
                return buildObject(toRaw$lambda_0(this.s5w_1, this.v5w_1, this.t5w_1, bodyBytes));
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
    }
    initMetadataForCoroutine($);
    $toRawCOROUTINE$Class = $;
  }
  return $toRawCOROUTINE$Class;
}
var $getBodyBytesCOROUTINE$Class;
function $getBodyBytesCOROUTINE$() {
  if ($getBodyBytesCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(content, callContext, resultContinuation) {
        super(resultContinuation);
        this.e5x_1 = content;
        this.f5x_1 = callContext;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 4;
                this.g5x_1 = this.e5x_1;
                var tmp_0 = this.g5x_1;
                if (tmp_0 instanceof ByteArrayContent()) {
                  this.h5x_1 = this.e5x_1.f41();
                  this.fd_1 = 5;
                  continue $sm;
                } else {
                  var tmp_1 = this.g5x_1;
                  if (tmp_1 instanceof ReadChannelContent()) {
                    this.fd_1 = 3;
                    suspendResult = readRemaining(this.e5x_1.q41(), this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    var tmp_2 = this.g5x_1;
                    if (tmp_2 instanceof WriteChannelContent()) {
                      this.fd_1 = 2;
                      var tmp_3 = GlobalScope_instance;
                      suspendResult = readRemaining(writer(tmp_3, this.f5x_1, VOID, getBodyBytes$slambda_0(this.e5x_1, null)).o3d_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      var tmp_4 = this.g5x_1;
                      if (tmp_4 instanceof ContentWrapper()) {
                        this.fd_1 = 1;
                        suspendResult = getBodyBytes(this.e5x_1.j41(), this.f5x_1, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                          return suspendResult;
                        }
                        continue $sm;
                      } else {
                        var tmp_5 = this.g5x_1;
                        if (tmp_5 instanceof NoContent()) {
                          this.h5x_1 = null;
                          this.fd_1 = 5;
                          continue $sm;
                        } else {
                          var tmp_6 = this.g5x_1;
                          if (tmp_6 instanceof ProtocolUpgrade()) {
                            var tmp_7 = this;
                            throw UnsupportedContentTypeException().g4v(this.e5x_1);
                          } else {
                            var tmp_8 = this;
                            noWhenBranchMatchedException();
                          }
                        }
                      }
                    }
                  }
                }

                break;
              case 1:
                this.h5x_1 = suspendResult;
                this.fd_1 = 5;
                continue $sm;
              case 2:
                var ARGUMENT = suspendResult;
                this.h5x_1 = readByteArray(ARGUMENT);
                this.fd_1 = 5;
                continue $sm;
              case 3:
                var ARGUMENT_0 = suspendResult;
                this.h5x_1 = readByteArray(ARGUMENT_0);
                this.fd_1 = 5;
                continue $sm;
              case 4:
                throw this.id_1;
              case 5:
                return this.h5x_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 4) {
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
    $getBodyBytesCOROUTINE$Class = $;
  }
  return $getBodyBytesCOROUTINE$Class;
}
//region block: exports
export {
  toRaw as toRaw1h0h8pil2htkg,
};
//endregion

//# sourceMappingURL=JsUtils.mjs.map
