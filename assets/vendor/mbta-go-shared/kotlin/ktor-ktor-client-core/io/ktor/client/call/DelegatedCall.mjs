import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { HttpClientCall2j6myj8ctykar as HttpClientCall } from './HttpClientCall.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { HttpRequest3fsc4149kgwfg as HttpRequest } from '../request/HttpRequest.mjs';
import { HttpResponse1532ob1hsse1y as HttpResponse } from '../statement/HttpResponse.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function replaceResponse(_this__u8e3s4, headers, content) {
  headers = headers === VOID ? _this__u8e3s4.g4p().l3v() : headers;
  return DelegatedCall().u4r(_this__u8e3s4.b4p_1, _this__u8e3s4, content, headers);
}
var DelegatedCallClass;
function DelegatedCall() {
  if (DelegatedCallClass === VOID) {
    class $ extends HttpClientCall() {
      static u4r(client, originCall, responseContent, responseHeaders) {
        responseHeaders = responseHeaders === VOID ? originCall.g4p().l3v() : responseHeaders;
        var $this = this.v4r(client);
        $this.d4p_1 = new (DelegatedRequest())($this, originCall.w4r());
        $this.e4p_1 = new (DelegatedResponse())($this, originCall.g4p(), responseContent, responseHeaders);
        return $this;
      }
    }
    initMetadataForClass($, 'DelegatedCall', VOID, VOID, VOID, [0, 1]);
    DelegatedCallClass = $;
  }
  return DelegatedCallClass;
}
var DelegatedRequestClass;
function DelegatedRequest() {
  if (DelegatedRequestClass === VOID) {
    class $ {
      constructor(call, origin) {
        this.b4s_1 = origin;
        this.c4s_1 = call;
      }
      d4s() {
        return this.c4s_1;
      }
      w20() {
        return this.b4s_1.w20();
      }
      e4s() {
        return this.b4s_1.e4s();
      }
      f4s() {
        return this.b4s_1.f4s();
      }
      x4r() {
        return this.b4s_1.x4r();
      }
      n1n() {
        return this.b4s_1.n1n();
      }
      l3v() {
        return this.b4s_1.l3v();
      }
    }
    initMetadataForClass($, 'DelegatedRequest', VOID, VOID, [HttpRequest()]);
    DelegatedRequestClass = $;
  }
  return DelegatedRequestClass;
}
var DelegatedResponseClass;
function DelegatedResponse() {
  if (DelegatedResponseClass === VOID) {
    class $ extends HttpResponse() {
      constructor(call, origin, content, headers) {
        headers = headers === VOID ? origin.l3v() : headers;
        super();
        this.g4s_1 = call;
        this.h4s_1 = origin;
        this.i4s_1 = content;
        this.j4s_1 = headers;
        this.k4s_1 = this.h4s_1.w20();
      }
      d4s() {
        return this.g4s_1;
      }
      l3v() {
        return this.j4s_1;
      }
      l4s() {
        return this.i4s_1(this.h4s_1);
      }
      w20() {
        return this.k4s_1;
      }
      m4s() {
        return this.h4s_1.m4s();
      }
      n4s() {
        return this.h4s_1.n4s();
      }
      o4s() {
        return this.h4s_1.o4s();
      }
      p4s() {
        return this.h4s_1.p4s();
      }
    }
    initMetadataForClass($, 'DelegatedResponse');
    DelegatedResponseClass = $;
  }
  return DelegatedResponseClass;
}
//region block: exports
export {
  replaceResponse as replaceResponse3ut5eo3odxj99,
};
//endregion

//# sourceMappingURL=DelegatedCall.mjs.map
