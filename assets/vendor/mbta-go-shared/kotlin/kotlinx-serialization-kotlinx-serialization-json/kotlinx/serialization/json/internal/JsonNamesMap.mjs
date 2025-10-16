import {
  Collection1k04j3hzsbod0 as Collection,
  KtMap140uvy3s5zad8 as KtMap,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  JsonIgnoreUnknownKeys124eml6s7t6h6 as JsonIgnoreUnknownKeys,
  JsonNames3i9ju5gyx18ko as JsonNames,
} from '../JsonAnnotations.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  CLASS_getInstance14ex35co4jkrb as CLASS_getInstance,
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { get_schemaCache3drvxe6e7799s as get_schemaCache } from '../JsonSchemaCache.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { singleOrNullrknfaxokm1sl as singleOrNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  emptyMapr06gerzljqtm as emptyMap,
  getValue48kllevslyh6 as getValue,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { JsonException2av85ax2o0gno as JsonException } from './JsonExceptions.mjs';
import { Key2w5p0aa9mfn6d as Key } from './SchemaCache.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_JsonDeserializationNamesKey() {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return JsonDeserializationNamesKey;
}
var JsonDeserializationNamesKey;
function get_JsonSerializationNamesKey() {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return JsonSerializationNamesKey;
}
var JsonSerializationNamesKey;
function ignoreUnknownKeys(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp;
  if (json.e1l_1.q1m_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.a12();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp_0;
      if (isInterface(tmp0, Collection())) {
        tmp_0 = tmp0.h1();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.x();
      while (_iterator__ex2g4s.y()) {
        var element = _iterator__ex2g4s.z();
        if (element instanceof JsonIgnoreUnknownKeys()) {
          tmp$ret$0 = true;
          break $l$block_0;
        }
      }
      tmp$ret$0 = false;
    }
    tmp = tmp$ret$0;
  }
  return tmp;
}
function getJsonNameIndex(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  if (decodeCaseInsensitive(json, _this__u8e3s4)) {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = name.toLowerCase();
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
  }
  var strategy = namingStrategy(_this__u8e3s4, json);
  if (!(strategy == null))
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  var index = _this__u8e3s4.c12(name);
  if (!(index === -3))
    return index;
  if (!json.e1l_1.a1n_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
  suffix = suffix === VOID ? '' : suffix;
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var index = getJsonNameIndex(_this__u8e3s4, json, name);
  if (index === -3)
    throw SerializationException().w10(_this__u8e3s4.j10() + " does not contain element with name '" + name + "'" + suffix);
  return index;
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.b12(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.x11(), CLASS_getInstance()) ? json.e1l_1.b1n_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.y1q(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.e1l_1.c1n_1 && equals(descriptor.x11(), ENUM_getInstance());
}
function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).j3(name);
  return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
}
function serializationNamesIndices(_this__u8e3s4, json, strategy) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(json);
  var tmp_0 = get_JsonSerializationNamesKey();
  return tmp.y1q(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap().sc();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.z11();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.d12(i);
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination = ArrayList().g1();
      var _iterator__ex2g4s = tmp0.x();
      while (_iterator__ex2g4s.y()) {
        var element = _iterator__ex2g4s.z();
        if (element instanceof JsonNames()) {
          destination.i(element);
        }
      }
      var tmp0_safe_receiver = singleOrNull(destination);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z1q_1;
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable_0 = 0;
        var last_0 = tmp1_safe_receiver.length;
        while (inductionVariable_0 < last_0) {
          var element_0 = tmp1_safe_receiver[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var tmp;
          if (useLowercaseEnums) {
            // Inline function 'kotlin.text.lowercase' call
            // Inline function 'kotlin.js.asDynamic' call
            tmp = element_0.toLowerCase();
          } else {
            tmp = element_0;
          }
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
        }
      }
      var tmp_0;
      if (useLowercaseEnums) {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = _this__u8e3s4.b12(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.a1r(_this__u8e3s4, i, _this__u8e3s4.b12(i));
      } else {
        tmp_0 = null;
      }
      var nameToPut = tmp_0;
      if (nameToPut == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
      }
    }
     while (inductionVariable < last);
  // Inline function 'kotlin.collections.ifEmpty' call
  var tmp_1;
  if (builder.h1()) {
    tmp_1 = emptyMap();
  } else {
    tmp_1 = builder;
  }
  return tmp_1;
}
function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
  var entity = equals($this_buildDeserializationNamesMap.x11(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap()) ? _this__u8e3s4 : THROW_CCE()).h3(name)) {
    throw JsonException().w1q("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.b12(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.b12(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
  }
  // Inline function 'kotlin.collections.set' call
  _this__u8e3s4.t3(name, index);
}
function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
  return function () {
    return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
  };
}
function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
  return function () {
    var tmp = 0;
    var tmp_0 = $this_serializationNamesIndices.z11();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.b12(tmp_2);
      tmp_1[tmp_2] = $strategy.a1r($this_serializationNamesIndices, tmp_2, baseName);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  };
}
var properties_initialized_JsonNamesMap_kt_ljpf42;
function _init_properties_JsonNamesMap_kt__cbbp0k() {
  if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
    properties_initialized_JsonNamesMap_kt_ljpf42 = true;
    JsonDeserializationNamesKey = new (Key())();
    JsonSerializationNamesKey = new (Key())();
  }
}
//region block: exports
export {
  get_JsonDeserializationNamesKey as get_JsonDeserializationNamesKey2d6gbfp1rff81,
  deserializationNamesMap as deserializationNamesMap29c3n2byxqy5b,
  getJsonElementName as getJsonElementName36ciq3w3g8x0l,
  getJsonNameIndexOrThrow as getJsonNameIndexOrThrow1a6a29i1xie0m,
  getJsonNameIndex as getJsonNameIndex1fee1p51fy8fj,
  ignoreUnknownKeys as ignoreUnknownKeys1ot1okvsp9ttf,
  namingStrategy as namingStrategy2xiv9qzked2jy,
};
//endregion

//# sourceMappingURL=JsonNamesMap.mjs.map
