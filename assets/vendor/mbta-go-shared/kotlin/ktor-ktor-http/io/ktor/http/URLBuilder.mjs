import { charSequenceLength3278n89t01tmv as charSequenceLength } from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_origin1s47cvkxjaphr as get_origin } from './URLBuilderJs.mjs';
import {
  Urlowwyg1lanrqp as Url,
  appendUrlFullPath2slafmfwiwvmw as appendUrlFullPath,
  appendUserAndPassword2m6va0hoftk5 as appendUserAndPassword,
} from './URLUtils.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Companion_getInstance30d3mgq58m8dc as Companion_getInstance } from './Parameters.mjs';
import {
  encodeURLParameter1u3y18ab0iker as encodeURLParameter,
  encodeURLQueryComponent1fjq9wb8rn8hq as encodeURLQueryComponent,
  encodeURLPathPart6y0hlser8v0t as encodeURLPathPart,
  decodeURLPart53igalrwb9si as decodeURLPart,
  decodeURLQueryComponent1psnpw5x5jp3h as decodeURLQueryComponent,
  encodeURLPath2fwba5way5jjt as encodeURLPath,
} from './Codecs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import {
  encodeParameters1kx5voquz3xxo as encodeParameters,
  UrlDecodedParametersBuilder18hwlye3pykgz as UrlDecodedParametersBuilder,
} from './UrlDecodedParametersBuilder.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_getInstance2bb7s4bbcv546 as Companion_getInstance_0 } from './URLProtocol.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Url1652zsz51o0h6 as Url_0 } from './Url.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  startsWith1bgirhbedtv2y as startsWith,
  split3d3yeauc4rm2n as split,
  isBlank1dvkhjjvox3p0 as isBlank,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { charArrayOf27f4r3dozbrk1 as charArrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import {
  toMutableList20rdgwi7d3cwi as toMutableList,
  first58ocm7j58k3q as first,
  joinToString1cxrrlmo0chqs as joinToString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { get_ROOT_PATH1cfc0dxvljm6a as get_ROOT_PATH } from './URLParser.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function applyOrigin($this) {
  var tmp;
  // Inline function 'kotlin.text.isNotEmpty' call
  var this_0 = $this.m3y_1;
  if (charSequenceLength(this_0) > 0) {
    tmp = true;
  } else {
    tmp = $this.y3y().w3y_1 === 'file';
  }
  if (tmp)
    return Unit_instance;
  $this.m3y_1 = Companion_getInstance_1().s3z_1.z3y_1;
  if ($this.p3y_1 == null)
    $this.p3y_1 = Companion_getInstance_1().s3z_1.k3z_1;
  if ($this.o3y_1 === 0) {
    $this.u3z(Companion_getInstance_1().s3z_1.a3z_1);
  }
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.s3z_1 = Url(get_origin(this));
        this.t3z_1 = 256;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_1() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var URLBuilderClass;
function URLBuilder() {
  if (URLBuilderClass === VOID) {
    class $ {
      constructor(protocol, host, port, user, password, pathSegments, parameters, fragment, trailingQuery) {
        Companion_getInstance_1();
        protocol = protocol === VOID ? null : protocol;
        host = host === VOID ? '' : host;
        port = port === VOID ? 0 : port;
        user = user === VOID ? null : user;
        password = password === VOID ? null : password;
        pathSegments = pathSegments === VOID ? emptyList() : pathSegments;
        parameters = parameters === VOID ? Companion_getInstance().j3y_1 : parameters;
        fragment = fragment === VOID ? '' : fragment;
        trailingQuery = trailingQuery === VOID ? false : trailingQuery;
        this.m3y_1 = host;
        this.n3y_1 = trailingQuery;
        this.o3y_1 = port;
        this.p3y_1 = protocol;
        var tmp = this;
        tmp.q3y_1 = user == null ? null : encodeURLParameter(user);
        var tmp_0 = this;
        tmp_0.r3y_1 = password == null ? null : encodeURLParameter(password);
        this.s3y_1 = encodeURLQueryComponent(fragment);
        var tmp_1 = this;
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(pathSegments, 10));
        var _iterator__ex2g4s = pathSegments.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = encodeURLPathPart(item);
          destination.i(tmp$ret$0);
        }
        tmp_1.t3y_1 = destination;
        this.u3y_1 = encodeParameters(parameters);
        this.v3y_1 = new (UrlDecodedParametersBuilder())(this.u3y_1);
      }
      u3z(value) {
        // Inline function 'kotlin.require' call
        if (!(0 <= value ? value <= 65535 : false)) {
          var message = 'Port must be between 0 and 65535, or 0 if not set. Provided: ' + value;
          throw IllegalArgumentException().q(toString(message));
        }
        this.o3y_1 = value;
      }
      v3z(value) {
        this.p3y_1 = value;
      }
      y3y() {
        var tmp0_elvis_lhs = this.p3y_1;
        return tmp0_elvis_lhs == null ? Companion_getInstance_0().w3z_1 : tmp0_elvis_lhs;
      }
      c40(value) {
        var tmp = this;
        tmp.q3y_1 = value == null ? null : encodeURLParameter(value);
      }
      d40() {
        var tmp0_safe_receiver = this.q3y_1;
        return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
      }
      e40() {
        var tmp0_safe_receiver = this.r3y_1;
        return tmp0_safe_receiver == null ? null : decodeURLPart(tmp0_safe_receiver);
      }
      f40() {
        return decodeURLQueryComponent(this.s3y_1);
      }
      g40() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.t3y_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = decodeURLPart(item);
          destination.i(tmp$ret$0);
        }
        return destination;
      }
      h40(value) {
        this.u3y_1 = value;
        this.v3y_1 = new (UrlDecodedParametersBuilder())(value);
      }
      i40() {
        applyOrigin(this);
        return appendTo(this, StringBuilder().kc(256)).toString();
      }
      toString() {
        return appendTo(this, StringBuilder().kc(256)).toString();
      }
      r3q() {
        applyOrigin(this);
        return new (Url_0())(this.p3y_1, this.m3y_1, this.o3y_1, this.g40(), this.v3y_1.r3q(), this.f40(), this.d40(), this.e40(), this.n3y_1, this.i40());
      }
    }
    initMetadataForClass($, 'URLBuilder', URLBuilder);
    URLBuilderClass = $;
  }
  return URLBuilderClass;
}
function get_authority(_this__u8e3s4) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  this_0.hc(get_encodedUserAndPassword(_this__u8e3s4));
  this_0.hc(_this__u8e3s4.m3y_1);
  if (!(_this__u8e3s4.o3y_1 === 0) && !(_this__u8e3s4.o3y_1 === _this__u8e3s4.y3y().x3y_1)) {
    this_0.hc(':');
    this_0.hc(_this__u8e3s4.o3y_1.toString());
  }
  return this_0.toString();
}
function path(_this__u8e3s4, path) {
  var tmp = _this__u8e3s4;
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(path.length);
  var inductionVariable = 0;
  var last = path.length;
  while (inductionVariable < last) {
    var item = path[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var tmp$ret$0 = encodeURLPath(item);
    destination.i(tmp$ret$0);
  }
  tmp.t3y_1 = destination;
}
function appendTo(_this__u8e3s4, out) {
  out.v(_this__u8e3s4.y3y().w3y_1);
  switch (_this__u8e3s4.y3y().w3y_1) {
    case 'file':
      appendFile(out, _this__u8e3s4.m3y_1, get_encodedPath(_this__u8e3s4));
      return out;
    case 'mailto':
      appendMailto(out, get_encodedUserAndPassword(_this__u8e3s4), _this__u8e3s4.m3y_1);
      return out;
    case 'about':
      appendPayload(out, _this__u8e3s4.m3y_1);
      return out;
    case 'tel':
      appendPayload(out, _this__u8e3s4.m3y_1);
      return out;
    case 'data':
      appendPayload(out, _this__u8e3s4.m3y_1);
      return out;
  }
  out.v('://');
  out.v(get_authority(_this__u8e3s4));
  appendUrlFullPath(out, get_encodedPath(_this__u8e3s4), _this__u8e3s4.u3y_1, _this__u8e3s4.n3y_1);
  // Inline function 'kotlin.text.isNotEmpty' call
  var this_0 = _this__u8e3s4.s3y_1;
  if (charSequenceLength(this_0) > 0) {
    out.ic(_Char___init__impl__6a9atx(35));
    out.v(_this__u8e3s4.s3y_1);
  }
  return out;
}
function get_encodedUserAndPassword(_this__u8e3s4) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  appendUserAndPassword(this_0, _this__u8e3s4.q3y_1, _this__u8e3s4.r3y_1);
  return this_0.toString();
}
function appendFile(_this__u8e3s4, host, encodedPath) {
  _this__u8e3s4.v('://');
  _this__u8e3s4.v(host);
  if (!startsWith(encodedPath, _Char___init__impl__6a9atx(47))) {
    _this__u8e3s4.ic(_Char___init__impl__6a9atx(47));
  }
  _this__u8e3s4.v(encodedPath);
}
function set_encodedPath(_this__u8e3s4, value) {
  _this__u8e3s4.t3y_1 = isBlank(value) ? emptyList() : value === '/' ? get_ROOT_PATH() : toMutableList(split(value, charArrayOf([_Char___init__impl__6a9atx(47)])));
}
function get_encodedPath(_this__u8e3s4) {
  return joinPath(_this__u8e3s4.t3y_1);
}
function appendMailto(_this__u8e3s4, encodedUser, host) {
  _this__u8e3s4.v(':');
  _this__u8e3s4.v(encodedUser);
  _this__u8e3s4.v(host);
}
function appendPayload(_this__u8e3s4, host) {
  _this__u8e3s4.v(':');
  _this__u8e3s4.v(host);
}
function joinPath(_this__u8e3s4) {
  if (_this__u8e3s4.h1())
    return '';
  if (_this__u8e3s4.c1() === 1) {
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = first(_this__u8e3s4);
    if (charSequenceLength(this_0) === 0)
      return '/';
    return first(_this__u8e3s4);
  }
  return joinToString(_this__u8e3s4, '/');
}
//region block: exports
export {
  URLBuilder as URLBuilder2mz8zkz4u9ray,
  get_authority as get_authorityakhc3pgcrb9j,
  set_encodedPath as set_encodedPath3q0i8nsv3a7qy,
  path as path4k5mr8826y5,
};
//endregion

//# sourceMappingURL=URLBuilder.mjs.map
