import { asList2ho2pewtsfvv as asList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
  toString3o7ifthqydp6e as toString,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { contains2el4s70rdq4ld as contains } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { captureStack1fzi4aczwc4hg as captureStack } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var HttpHeadersClass;
function HttpHeaders() {
  if (HttpHeadersClass === VOID) {
    class $ {
      constructor() {
        HttpHeaders_instance = this;
        this.s3q_1 = 'Accept';
        this.t3q_1 = 'Accept-Charset';
        this.u3q_1 = 'Accept-Encoding';
        this.v3q_1 = 'Accept-Language';
        this.w3q_1 = 'Accept-Ranges';
        this.x3q_1 = 'Age';
        this.y3q_1 = 'Allow';
        this.z3q_1 = 'ALPN';
        this.a3r_1 = 'Authentication-Info';
        this.b3r_1 = 'Authorization';
        this.c3r_1 = 'Cache-Control';
        this.d3r_1 = 'Connection';
        this.e3r_1 = 'Content-Disposition';
        this.f3r_1 = 'Content-Encoding';
        this.g3r_1 = 'Content-Language';
        this.h3r_1 = 'Content-Length';
        this.i3r_1 = 'Content-Location';
        this.j3r_1 = 'Content-Range';
        this.k3r_1 = 'Content-Type';
        this.l3r_1 = 'Cookie';
        this.m3r_1 = 'DASL';
        this.n3r_1 = 'Date';
        this.o3r_1 = 'DAV';
        this.p3r_1 = 'Depth';
        this.q3r_1 = 'Destination';
        this.r3r_1 = 'ETag';
        this.s3r_1 = 'Expect';
        this.t3r_1 = 'Expires';
        this.u3r_1 = 'From';
        this.v3r_1 = 'Forwarded';
        this.w3r_1 = 'Host';
        this.x3r_1 = 'HTTP2-Settings';
        this.y3r_1 = 'If';
        this.z3r_1 = 'If-Match';
        this.a3s_1 = 'If-Modified-Since';
        this.b3s_1 = 'If-None-Match';
        this.c3s_1 = 'If-Range';
        this.d3s_1 = 'If-Schedule-Tag-Match';
        this.e3s_1 = 'If-Unmodified-Since';
        this.f3s_1 = 'Last-Modified';
        this.g3s_1 = 'Location';
        this.h3s_1 = 'Lock-Token';
        this.i3s_1 = 'Link';
        this.j3s_1 = 'Max-Forwards';
        this.k3s_1 = 'MIME-Version';
        this.l3s_1 = 'Ordering-Type';
        this.m3s_1 = 'Origin';
        this.n3s_1 = 'Overwrite';
        this.o3s_1 = 'Position';
        this.p3s_1 = 'Pragma';
        this.q3s_1 = 'Prefer';
        this.r3s_1 = 'Preference-Applied';
        this.s3s_1 = 'Proxy-Authenticate';
        this.t3s_1 = 'Proxy-Authentication-Info';
        this.u3s_1 = 'Proxy-Authorization';
        this.v3s_1 = 'Public-Key-Pins';
        this.w3s_1 = 'Public-Key-Pins-Report-Only';
        this.x3s_1 = 'Range';
        this.y3s_1 = 'Referer';
        this.z3s_1 = 'Retry-After';
        this.a3t_1 = 'Schedule-Reply';
        this.b3t_1 = 'Schedule-Tag';
        this.c3t_1 = 'Sec-WebSocket-Accept';
        this.d3t_1 = 'Sec-WebSocket-Extensions';
        this.e3t_1 = 'Sec-WebSocket-Key';
        this.f3t_1 = 'Sec-WebSocket-Protocol';
        this.g3t_1 = 'Sec-WebSocket-Version';
        this.h3t_1 = 'Server';
        this.i3t_1 = 'Set-Cookie';
        this.j3t_1 = 'SLUG';
        this.k3t_1 = 'Strict-Transport-Security';
        this.l3t_1 = 'TE';
        this.m3t_1 = 'Timeout';
        this.n3t_1 = 'Trailer';
        this.o3t_1 = 'Transfer-Encoding';
        this.p3t_1 = 'Upgrade';
        this.q3t_1 = 'User-Agent';
        this.r3t_1 = 'Vary';
        this.s3t_1 = 'Via';
        this.t3t_1 = 'Warning';
        this.u3t_1 = 'WWW-Authenticate';
        this.v3t_1 = 'Access-Control-Allow-Origin';
        this.w3t_1 = 'Access-Control-Allow-Methods';
        this.x3t_1 = 'Access-Control-Allow-Credentials';
        this.y3t_1 = 'Access-Control-Allow-Headers';
        this.z3t_1 = 'Access-Control-Request-Method';
        this.a3u_1 = 'Access-Control-Request-Headers';
        this.b3u_1 = 'Access-Control-Expose-Headers';
        this.c3u_1 = 'Access-Control-Max-Age';
        this.d3u_1 = 'X-Http-Method-Override';
        this.e3u_1 = 'X-Forwarded-Host';
        this.f3u_1 = 'X-Forwarded-Server';
        this.g3u_1 = 'X-Forwarded-Proto';
        this.h3u_1 = 'X-Forwarded-For';
        this.i3u_1 = 'X-Forwarded-Port';
        this.j3u_1 = 'X-Request-ID';
        this.k3u_1 = 'X-Correlation-ID';
        this.l3u_1 = 'X-Total-Count';
        var tmp = this;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.m3u_1 = [this.o3t_1, this.p3t_1];
        this.n3u_1 = asList(this.m3u_1);
      }
      o3u(name) {
        // Inline function 'kotlin.text.forEachIndexed' call
        var index = 0;
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(name)) {
          var item = charSequenceGet(name, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) <= 0 || isDelimiter(item)) {
            throw IllegalHeaderNameException().y3u(name, _unary__edvuaz);
          }
        }
      }
      p3u(value) {
        // Inline function 'kotlin.text.forEachIndexed' call
        var index = 0;
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(value)) {
          var item = charSequenceGet(value, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          if (Char__compareTo_impl_ypi4mb(item, _Char___init__impl__6a9atx(32)) < 0 && !(item === _Char___init__impl__6a9atx(9))) {
            throw IllegalHeaderValueException().f3v(value, _unary__edvuaz);
          }
        }
      }
    }
    initMetadataForObject($, 'HttpHeaders');
    HttpHeadersClass = $;
  }
  return HttpHeadersClass;
}
var HttpHeaders_instance;
function HttpHeaders_getInstance() {
  if (HttpHeaders_instance === VOID)
    new (HttpHeaders())();
  return HttpHeaders_instance;
}
function isDelimiter(ch) {
  return contains('"(),/:;<=>?@[\\]{}', ch);
}
var IllegalHeaderNameExceptionClass;
function IllegalHeaderNameException() {
  if (IllegalHeaderNameExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static y3u(headerName, position) {
        var tmp = "Header name '" + headerName + "' contains illegal character '" + toString(charCodeAt(headerName, position)) + "'";
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(headerName, position);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        var $this = this.q(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'));
        captureStack($this, $this.x3u_1);
        $this.v3u_1 = headerName;
        $this.w3u_1 = position;
        return $this;
      }
    }
    initMetadataForClass($, 'IllegalHeaderNameException');
    IllegalHeaderNameExceptionClass = $;
  }
  return IllegalHeaderNameExceptionClass;
}
var IllegalHeaderValueExceptionClass;
function IllegalHeaderValueException() {
  if (IllegalHeaderValueExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static f3v(headerValue, position) {
        var tmp = "Header value '" + headerValue + "' contains illegal character '" + toString(charCodeAt(headerValue, position)) + "'";
        // Inline function 'kotlin.code' call
        var this_0 = charCodeAt(headerValue, position);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        var $this = this.q(tmp + (' (code ' + (tmp$ret$0 & 255) + ')'));
        captureStack($this, $this.e3v_1);
        $this.c3v_1 = headerValue;
        $this.d3v_1 = position;
        return $this;
      }
    }
    initMetadataForClass($, 'IllegalHeaderValueException');
    IllegalHeaderValueExceptionClass = $;
  }
  return IllegalHeaderValueExceptionClass;
}
var UnsafeHeaderExceptionClass;
function UnsafeHeaderException() {
  if (UnsafeHeaderExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static k3v(header) {
        var $this = this.q('Header(s) ' + header + ' are controlled by the engine and ' + 'cannot be set explicitly');
        captureStack($this, $this.j3v_1);
        return $this;
      }
    }
    initMetadataForClass($, 'UnsafeHeaderException');
    UnsafeHeaderExceptionClass = $;
  }
  return UnsafeHeaderExceptionClass;
}
//region block: exports
export {
  HttpHeaders_getInstance as HttpHeaders_getInstanceelogg8fjd54u,
  UnsafeHeaderException as UnsafeHeaderException3ncvrrp48xjzq,
};
//endregion

//# sourceMappingURL=HttpHeaders.mjs.map
