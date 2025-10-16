import {
  encodeURLParameter1u3y18ab0iker as encodeURLParameter,
  decodeURLQueryComponent1psnpw5x5jp3h as decodeURLQueryComponent,
  encodeURLParameterValueqlj48e6qtqd4 as encodeURLParameterValue,
} from './Codecs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toSet2orjxp16sotqu as toSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { ParametersBuilder1ry9ntvvg567r as ParametersBuilder } from './Parameters.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var UrlDecodedParametersBuilderClass;
function UrlDecodedParametersBuilder() {
  if (UrlDecodedParametersBuilderClass === VOID) {
    class $ {
      constructor(encodedParametersBuilder) {
        this.x40_1 = encodedParametersBuilder;
        this.y40_1 = this.x40_1.x3i();
      }
      r3q() {
        return decodeParameters(this.x40_1);
      }
      x3i() {
        return this.y40_1;
      }
      y3i(name) {
        var tmp0_safe_receiver = this.x40_1.y3i(encodeURLParameter(name));
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.map' call
          // Inline function 'kotlin.collections.mapTo' call
          var destination = ArrayList().w(collectionSizeOrDefault(tmp0_safe_receiver, 10));
          var _iterator__ex2g4s = tmp0_safe_receiver.x();
          while (_iterator__ex2g4s.y()) {
            var item = _iterator__ex2g4s.z();
            var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
            destination.i(tmp$ret$0);
          }
          tmp = destination;
        }
        return tmp;
      }
      g3j(name) {
        return this.x40_1.g3j(encodeURLParameter(name));
      }
      z3i() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.x40_1.z3i();
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = decodeURLQueryComponent(item);
          destination.i(tmp$ret$0);
        }
        return toSet(destination);
      }
      h1() {
        return this.x40_1.h1();
      }
      a3j() {
        return decodeParameters(this.x40_1).a3j();
      }
      j3j(name, value) {
        return this.x40_1.j3j(encodeURLParameter(name), encodeURLParameterValue(value));
      }
      k3j(stringValues) {
        return appendAllEncoded(this.x40_1, stringValues);
      }
      f3j(name, values) {
        var tmp = encodeURLParameter(name);
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(values, 10));
        var _iterator__ex2g4s = values.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = encodeURLParameterValue(item);
          destination.i(tmp$ret$0);
        }
        return this.x40_1.f3j(tmp, destination);
      }
      p3() {
        return this.x40_1.p3();
      }
    }
    initMetadataForClass($, 'UrlDecodedParametersBuilder');
    UrlDecodedParametersBuilderClass = $;
  }
  return UrlDecodedParametersBuilderClass;
}
function encodeParameters(parameters) {
  // Inline function 'kotlin.apply' call
  var this_0 = ParametersBuilder();
  appendAllEncoded(this_0, parameters);
  return this_0;
}
function decodeParameters(parameters) {
  // Inline function 'kotlin.apply' call
  var this_0 = ParametersBuilder();
  appendAllDecoded(this_0, parameters);
  return this_0.r3q();
}
function appendAllEncoded(_this__u8e3s4, parameters) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = parameters.z3i().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp0_elvis_lhs = parameters.y3i(element);
    var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    var tmp = encodeURLParameter(element);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(values, 10));
    var _iterator__ex2g4s_0 = values.x();
    while (_iterator__ex2g4s_0.y()) {
      var item = _iterator__ex2g4s_0.z();
      var tmp$ret$0 = encodeURLParameterValue(item);
      destination.i(tmp$ret$0);
    }
    _this__u8e3s4.f3j(tmp, destination);
  }
}
function appendAllDecoded(_this__u8e3s4, parameters) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = parameters.z3i().x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp0_elvis_lhs = parameters.y3i(element);
    var values = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    var tmp = decodeURLQueryComponent(element);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(values, 10));
    var _iterator__ex2g4s_0 = values.x();
    while (_iterator__ex2g4s_0.y()) {
      var item = _iterator__ex2g4s_0.z();
      var tmp$ret$0 = decodeURLQueryComponent(item, VOID, VOID, true);
      destination.i(tmp$ret$0);
    }
    _this__u8e3s4.f3j(tmp, destination);
  }
}
//region block: exports
export {
  UrlDecodedParametersBuilder as UrlDecodedParametersBuilder18hwlye3pykgz,
  encodeParameters as encodeParameters1kx5voquz3xxo,
};
//endregion

//# sourceMappingURL=UrlDecodedParametersBuilder.mjs.map
