import {
  compiledSerializerImpl2ykwhos63n897 as compiledSerializerImpl,
  platformSpecificSerializerNotRegistered35vpw6xk2l454 as platformSpecificSerializerNotRegistered,
  isReferenceArray1zykjthfz743b as isReferenceArray,
  constructSerializerForGivenTypeArgsj1zk005on26m as constructSerializerForGivenTypeArgs,
  isInterface150ul88kmyj8d as isInterface,
} from './internal/Platform.mjs';
import { builtinSerializerOrNull180kp99qvlpex as builtinSerializerOrNull } from './internal/Primitives.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  kclass1exqpscvro86a as kclass,
  typeOrThrowwmzfq0bqyfgr as typeOrThrow,
  serializerNotRegistered1ovw7obgbxuzq as serializerNotRegistered,
} from './internal/Platform.common.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KClass1cc9rfeybg8hs as KClass } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KClassJs.mjs';
import { isInterface3d6p8outrmvmk as isInterface_0 } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  ArraySerializermpxy3fgi5xnb as ArraySerializer,
  TripleSerializer39fneesmgp1wy as TripleSerializer,
  PairSerializer1d18kmsqyj4f as PairSerializer,
  MapEntrySerializer3oe1sx5ozvw2u as MapEntrySerializer,
  get_nullable197rfua9r7fsz as get_nullable,
} from './builtins/BuiltinSerializers.mjs';
import {
  Triple1vhi3d0dgpnjb as Triple,
  Paire9pteg33gng7 as Pair,
} from '../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  Entry2xmjmyutzoq3p as Entry,
  KtMap140uvy3s5zad8 as KtMap,
  KtMutableMap1kqeifoi36kpz as KtMutableMap,
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMutableSetwuwn7k5m570a as KtMutableSet,
  Collection1k04j3hzsbod0 as Collection,
  KtList3hktaavzmj137 as KtList,
  KtMutableList1beimitadwkna as KtMutableList,
} from '../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  LinkedHashMapSerializermaoj2nyji7op as LinkedHashMapSerializer,
  HashMapSerializer10v33y6rrzgrh as HashMapSerializer,
  LinkedHashSetSerializer3ncla559t2lx7 as LinkedHashSetSerializer,
  HashSetSerializer1nieavib0jif1 as HashSetSerializer,
  ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer,
} from './internal/CollectionSerializers.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { copyToArray2j022khrow2yi as copyToArray } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import {
  findParametrizedCachedSerializer1zrxdjq0nix5d as findParametrizedCachedSerializer,
  findCachedSerializer3o8gql85ngyfi as findCachedSerializer,
} from './SerializersCache.mjs';
import {
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  _Result___get_isFailure__impl__jpirivrr0d11rbi6gb as _Result___get_isFailure__impl__jpiriv,
} from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import { PolymorphicSerializer3p3fzpdobi8hh as PolymorphicSerializer } from './PolymorphicSerializer.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from './KSerializer.mjs';
import { EmptySerializersModule991ju6pz9b79 as EmptySerializersModule } from './modules/SerializersModuleBuilders.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function serializerOrNull(_this__u8e3s4) {
  var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
  return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
}
function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
  var tmp;
  if (failOnMissingTypeArgSerializer) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList().w(collectionSizeOrDefault(typeArguments, 10));
    var _iterator__ex2g4s = typeArguments.x();
    while (_iterator__ex2g4s.y()) {
      var item = _iterator__ex2g4s.z();
      var tmp$ret$0 = serializer(_this__u8e3s4, item);
      destination.i(tmp$ret$0);
    }
    tmp = destination;
  } else {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList().w(collectionSizeOrDefault(typeArguments, 10));
    var _iterator__ex2g4s_0 = typeArguments.x();
    while (_iterator__ex2g4s_0.y()) {
      var item_0 = _iterator__ex2g4s_0.z();
      var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        return null;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var tmp$ret$3 = tmp_0;
      destination_0.i(tmp$ret$3);
    }
    tmp = destination_0;
  }
  var serializers = tmp;
  return serializers;
}
function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
  var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
  return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
}
function serializer(_this__u8e3s4, type) {
  var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    platformSpecificSerializerNotRegistered(kclass(type));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function serializerOrNull_0(_this__u8e3s4, type) {
  return serializerByKTypeImpl(_this__u8e3s4, type, false);
}
function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
  var tmp;
  if (_this__u8e3s4.equals(getKClass(Collection())) || _this__u8e3s4.equals(getKClass(KtList())) || (_this__u8e3s4.equals(getKClass(KtMutableList())) || _this__u8e3s4.equals(getKClass(ArrayList())))) {
    tmp = new (ArrayListSerializer())(serializers.e1(0));
  } else if (_this__u8e3s4.equals(getKClass(HashSet()))) {
    tmp = new (HashSetSerializer())(serializers.e1(0));
  } else if (_this__u8e3s4.equals(getKClass(KtSet())) || (_this__u8e3s4.equals(getKClass(KtMutableSet())) || _this__u8e3s4.equals(getKClass(LinkedHashSet())))) {
    tmp = new (LinkedHashSetSerializer())(serializers.e1(0));
  } else if (_this__u8e3s4.equals(getKClass(HashMap()))) {
    tmp = new (HashMapSerializer())(serializers.e1(0), serializers.e1(1));
  } else if (_this__u8e3s4.equals(getKClass(KtMap())) || (_this__u8e3s4.equals(getKClass(KtMutableMap())) || _this__u8e3s4.equals(getKClass(LinkedHashMap())))) {
    tmp = new (LinkedHashMapSerializer())(serializers.e1(0), serializers.e1(1));
  } else if (_this__u8e3s4.equals(getKClass(Entry()))) {
    tmp = MapEntrySerializer(serializers.e1(0), serializers.e1(1));
  } else if (_this__u8e3s4.equals(getKClass(Pair()))) {
    tmp = PairSerializer(serializers.e1(0), serializers.e1(1));
  } else if (_this__u8e3s4.equals(getKClass(Triple()))) {
    tmp = TripleSerializer(serializers.e1(0), serializers.e1(1), serializers.e1(2));
  } else {
    var tmp_0;
    if (isReferenceArray(_this__u8e3s4)) {
      var tmp_1 = elementClassifierIfArray();
      tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface_0(tmp_1, KClass()) : false) ? tmp_1 : THROW_CCE(), serializers.e1(0));
    } else {
      tmp_0 = null;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var tmp$ret$0 = copyToArray(serializers);
  return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
}
function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
  var rootClass = kclass(type);
  var isNullable = type.xh();
  // Inline function 'kotlin.collections.map' call
  var this_0 = type.wh();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = typeOrThrow(item);
    destination.i(tmp$ret$0);
  }
  var typeArguments = destination;
  var tmp;
  if (typeArguments.h1()) {
    var tmp_0;
    if (isInterface(rootClass) && !(_this__u8e3s4.p11(rootClass) == null)) {
      tmp_0 = null;
    } else {
      tmp_0 = findCachedSerializer(rootClass, isNullable);
    }
    tmp = tmp_0;
  } else {
    var tmp_1;
    if (_this__u8e3s4.o11()) {
      tmp_1 = null;
    } else {
      // Inline function 'kotlin.Result.getOrNull' call
      var this_1 = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
      var tmp_2;
      if (_Result___get_isFailure__impl__jpiriv(this_1)) {
        tmp_2 = null;
      } else {
        var tmp_3 = _Result___get_value__impl__bjfvqg(this_1);
        tmp_2 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      }
      tmp_1 = tmp_2;
    }
    tmp = tmp_1;
  }
  var cachedSerializer = tmp;
  if (!(cachedSerializer == null))
    return cachedSerializer;
  var tmp_4;
  if (typeArguments.h1()) {
    var tmp0_elvis_lhs = serializerOrNull(rootClass);
    var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? _this__u8e3s4.p11(rootClass) : tmp0_elvis_lhs;
    var tmp_5;
    if (tmp1_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp_5 = isInterface(rootClass) ? PolymorphicSerializer().uz(rootClass) : null;
    } else {
      tmp_5 = tmp1_elvis_lhs;
    }
    tmp_4 = tmp_5;
  } else {
    var tmp2_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
    var tmp_6;
    if (tmp2_elvis_lhs == null) {
      return null;
    } else {
      tmp_6 = tmp2_elvis_lhs;
    }
    var serializers = tmp_6;
    var tmp3_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
    var tmp4_elvis_lhs = tmp3_elvis_lhs == null ? _this__u8e3s4.q11(rootClass, serializers) : tmp3_elvis_lhs;
    var tmp_7;
    if (tmp4_elvis_lhs == null) {
      // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
      tmp_7 = isInterface(rootClass) ? PolymorphicSerializer().uz(rootClass) : null;
    } else {
      tmp_7 = tmp4_elvis_lhs;
    }
    tmp_4 = tmp_7;
  }
  var contextualSerializer = tmp_4;
  var tmp_8;
  if (contextualSerializer == null) {
    tmp_8 = null;
  } else {
    // Inline function 'kotlinx.serialization.internal.cast' call
    tmp_8 = isInterface_0(contextualSerializer, KSerializer()) ? contextualSerializer : THROW_CCE();
  }
  var tmp6_safe_receiver = tmp_8;
  return tmp6_safe_receiver == null ? null : nullable(tmp6_safe_receiver, isNullable);
}
function nullable(_this__u8e3s4, shouldBeNullable) {
  if (shouldBeNullable)
    return get_nullable(_this__u8e3s4);
  return isInterface_0(_this__u8e3s4, KSerializer()) ? _this__u8e3s4 : THROW_CCE();
}
function serializer_0(type) {
  return serializer(EmptySerializersModule(), type);
}
function serializer_1(_this__u8e3s4) {
  var tmp0_elvis_lhs = serializerOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    serializerNotRegistered(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function serializerByKTypeImpl$lambda($typeArguments) {
  return function () {
    return $typeArguments.e1(0).vh();
  };
}
//region block: exports
export {
  parametrizedSerializerOrNull as parametrizedSerializerOrNull6qjye9i03zwg,
  serializerOrNull_0 as serializerOrNull31x2b6nu6gruj,
  serializerOrNull as serializerOrNull294cbc318ws50,
  serializersForParameters as serializersForParameters9udy8uiwybz9,
  serializer_0 as serializer1hwzc6m64v1op,
  serializer_1 as serializer1rka18p0rjk4x,
  serializer as serializer1i4e9ym37oxmo,
};
//endregion

//# sourceMappingURL=Serializers.mjs.map
