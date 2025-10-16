import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { HttpClientCall2j6myj8ctykar as HttpClientCall } from './HttpClientCall.mjs';
import { contentLength2suzxu1lzutku as contentLength } from '../../../../../ktor-ktor-http/io/ktor/http/HttpMessageProperties.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { checkContentLength1q7i15kkn2eie as checkContentLength } from './utils.mjs';
import { ByteReadChannel1cb89sbyipkce as ByteReadChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteChannelCtor.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { HttpRequest3fsc4149kgwfg as HttpRequest } from '../request/HttpRequest.mjs';
import { HttpResponse1532ob1hsse1y as HttpResponse } from '../statement/HttpResponse.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { readRemaining1x8kk1vq7p6gm as readRemaining } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { readByteArray1ri21h2rciakw as readByteArray } from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function save(_this__u8e3s4, $completion) {
  var tmp = new ($saveCOROUTINE$())(_this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var SavedHttpCallClass;
function SavedHttpCall() {
  if (SavedHttpCallClass === VOID) {
    class $ extends HttpClientCall() {
      static r4u(client, request, response, responseBody) {
        var $this = this.v4r(client);
        $this.p4u_1 = responseBody;
        $this.d4p_1 = new (SavedHttpRequest())($this, request);
        $this.e4p_1 = new (SavedHttpResponse())($this, $this.p4u_1, response);
        checkContentLength(contentLength(response), toLong($this.p4u_1.length), request.e4s());
        $this.q4u_1 = true;
        return $this;
      }
      z4r($completion) {
        return ByteReadChannel(this.p4u_1);
      }
      y4r() {
        return this.q4u_1;
      }
    }
    initMetadataForClass($, 'SavedHttpCall', VOID, VOID, VOID, [0, 1]);
    SavedHttpCallClass = $;
  }
  return SavedHttpCallClass;
}
var SavedHttpRequestClass;
function SavedHttpRequest() {
  if (SavedHttpRequestClass === VOID) {
    class $ {
      constructor(call, origin) {
        this.s4u_1 = origin;
        this.t4u_1 = call;
      }
      d4s() {
        return this.t4u_1;
      }
      w20() {
        return this.s4u_1.w20();
      }
      e4s() {
        return this.s4u_1.e4s();
      }
      f4s() {
        return this.s4u_1.f4s();
      }
      x4r() {
        return this.s4u_1.x4r();
      }
      n1n() {
        return this.s4u_1.n1n();
      }
      l3v() {
        return this.s4u_1.l3v();
      }
    }
    initMetadataForClass($, 'SavedHttpRequest', VOID, VOID, [HttpRequest()]);
    SavedHttpRequestClass = $;
  }
  return SavedHttpRequestClass;
}
var SavedHttpResponseClass;
function SavedHttpResponse() {
  if (SavedHttpResponseClass === VOID) {
    class $ extends HttpResponse() {
      constructor(call, body, origin) {
        super();
        this.u4u_1 = call;
        this.v4u_1 = body;
        this.w4u_1 = origin.m4s();
        this.x4u_1 = origin.n4s();
        this.y4u_1 = origin.o4s();
        this.z4u_1 = origin.p4s();
        this.a4v_1 = origin.l3v();
        this.b4v_1 = origin.w20();
      }
      d4s() {
        return this.u4u_1;
      }
      m4s() {
        return this.w4u_1;
      }
      n4s() {
        return this.x4u_1;
      }
      o4s() {
        return this.y4u_1;
      }
      p4s() {
        return this.z4u_1;
      }
      l3v() {
        return this.a4v_1;
      }
      w20() {
        return this.b4v_1;
      }
      l4s() {
        return ByteReadChannel(this.v4u_1);
      }
    }
    initMetadataForClass($, 'SavedHttpResponse');
    SavedHttpResponseClass = $;
  }
  return SavedHttpResponseClass;
}
var $saveCOROUTINE$Class;
function $saveCOROUTINE$() {
  if ($saveCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, resultContinuation) {
        super(resultContinuation);
        this.j4u_1 = _this__u8e3s4;
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
                suspendResult = readRemaining(this.j4u_1.g4p().l4s(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var ARGUMENT = suspendResult;
                var responseBody = readByteArray(ARGUMENT);
                return SavedHttpCall().r4u(this.j4u_1.b4p_1, this.j4u_1.w4r(), this.j4u_1.g4p(), responseBody);
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
    $saveCOROUTINE$Class = $;
  }
  return $saveCOROUTINE$Class;
}
//region block: exports
export {
  save as save1zsice73vjdpw,
};
//endregion

//# sourceMappingURL=SavedCall.mjs.map
