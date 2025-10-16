import { ParametersBuilder1ry9ntvvg567r as ParametersBuilder } from './Parameters.mjs';
import { appendAlltwnjnu28pmtx as appendAll } from '../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { startsWith26w8qjqapeeq6 as startsWith } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { addAll1k27qatfgp3k5 as addAll } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { joinTo3lkanfaxbzac2 as joinTo } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  URLBuilder2mz8zkz4u9ray as URLBuilder,
  set_encodedPath3q0i8nsv3a7qy as set_encodedPath,
} from './URLBuilder.mjs';
import { takeFrom3rd40szpqy350 as takeFrom } from './URLParser.mjs';
import { parseQueryString1nwcni3n22i7m as parseQueryString } from './Query.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function takeFrom_0(_this__u8e3s4, url) {
  _this__u8e3s4.p3y_1 = url.p3y_1;
  _this__u8e3s4.m3y_1 = url.m3y_1;
  _this__u8e3s4.u3z(url.o3y_1);
  _this__u8e3s4.t3y_1 = url.t3y_1;
  _this__u8e3s4.q3y_1 = url.q3y_1;
  _this__u8e3s4.r3y_1 = url.r3y_1;
  // Inline function 'kotlin.apply' call
  var this_0 = ParametersBuilder();
  appendAll(this_0, url.u3y_1);
  _this__u8e3s4.h40(this_0);
  _this__u8e3s4.s3y_1 = url.s3y_1;
  _this__u8e3s4.n3y_1 = url.n3y_1;
  return _this__u8e3s4;
}
function Url(urlString) {
  return URLBuilder_0(urlString).r3q();
}
function get_hostWithPortIfSpecified(_this__u8e3s4) {
  var tmp0_subject = _this__u8e3s4.a3z_1;
  return tmp0_subject === 0 || tmp0_subject === _this__u8e3s4.l3z_1.x3y_1 ? _this__u8e3s4.z3y_1 : get_hostWithPort(_this__u8e3s4);
}
function appendUserAndPassword(_this__u8e3s4, encodedUser, encodedPassword) {
  if (encodedUser == null) {
    return Unit_instance;
  }
  _this__u8e3s4.hc(encodedUser);
  if (!(encodedPassword == null)) {
    _this__u8e3s4.ic(_Char___init__impl__6a9atx(58));
    _this__u8e3s4.hc(encodedPassword);
  }
  _this__u8e3s4.hc('@');
}
function appendUrlFullPath(_this__u8e3s4, encodedPath, encodedQueryParameters, trailingQuery) {
  var tmp;
  // Inline function 'kotlin.text.isNotBlank' call
  if (!isBlank(encodedPath)) {
    tmp = !startsWith(encodedPath, '/');
  } else {
    tmp = false;
  }
  if (tmp) {
    _this__u8e3s4.ic(_Char___init__impl__6a9atx(47));
  }
  _this__u8e3s4.v(encodedPath);
  if (!encodedQueryParameters.h1() || trailingQuery) {
    _this__u8e3s4.v('?');
  }
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0 = encodedQueryParameters.a3j();
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList().g1();
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    // Inline function 'kotlin.collections.component1' call
    var key = element.u1();
    // Inline function 'kotlin.collections.component2' call
    var value = element.v1();
    var tmp_0;
    if (value.h1()) {
      tmp_0 = listOf(to(key, null));
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList().w(collectionSizeOrDefault(value, 10));
      var _iterator__ex2g4s_0 = value.x();
      while (_iterator__ex2g4s_0.y()) {
        var item = _iterator__ex2g4s_0.z();
        var tmp$ret$3 = to(key, item);
        destination_0.i(tmp$ret$3);
      }
      tmp_0 = destination_0;
    }
    var list = tmp_0;
    addAll(destination, list);
  }
  var tmp_1 = destination;
  joinTo(tmp_1, _this__u8e3s4, '&', VOID, VOID, VOID, VOID, appendUrlFullPath$lambda);
}
function URLBuilder_0(urlString) {
  return takeFrom(new (URLBuilder())(), urlString);
}
function get_hostWithPort(_this__u8e3s4) {
  return _this__u8e3s4.z3y_1 + ':' + _this__u8e3s4.p40();
}
function URLBuilder_1(url) {
  return takeFrom_1(new (URLBuilder())(), url);
}
function takeFrom_1(_this__u8e3s4, url) {
  _this__u8e3s4.p3y_1 = url.k3z_1;
  _this__u8e3s4.m3y_1 = url.z3y_1;
  _this__u8e3s4.u3z(url.p40());
  set_encodedPath(_this__u8e3s4, url.q40());
  _this__u8e3s4.q3y_1 = url.r40();
  _this__u8e3s4.r3y_1 = url.s40();
  // Inline function 'kotlin.apply' call
  var this_0 = ParametersBuilder();
  this_0.k3j(parseQueryString(url.t40(), VOID, VOID, false));
  _this__u8e3s4.h40(this_0);
  _this__u8e3s4.s3y_1 = url.u40();
  _this__u8e3s4.n3y_1 = url.f3z_1;
  return _this__u8e3s4;
}
function appendUrlFullPath$lambda(it) {
  var key = it.ah_1;
  var tmp;
  if (it.bh_1 == null) {
    tmp = key;
  } else {
    var value = toString(it.bh_1);
    tmp = key + '=' + value;
  }
  return tmp;
}
//region block: exports
export {
  URLBuilder_1 as URLBuilder1hwx1b9569i61,
  Url as Urlowwyg1lanrqp,
  appendUrlFullPath as appendUrlFullPath2slafmfwiwvmw,
  appendUserAndPassword as appendUserAndPassword2m6va0hoftk5,
  get_hostWithPortIfSpecified as get_hostWithPortIfSpecified1w0e2oq2yfcan,
  takeFrom_0 as takeFromkqlcz7c6dx2r,
};
//endregion

//# sourceMappingURL=URLUtils.mjs.map
