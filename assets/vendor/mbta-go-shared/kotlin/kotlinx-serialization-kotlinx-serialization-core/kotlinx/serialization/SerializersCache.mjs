import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from './KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Result3t1vadv16kmzk as Result } from '../../../kotlin-kotlin-stdlib/kotlin/Result.mjs';
import {
  serializerOrNull294cbc318ws50 as serializerOrNull,
  serializersForParameters9udy8uiwybz9 as serializersForParameters,
  parametrizedSerializerOrNull6qjye9i03zwg as parametrizedSerializerOrNull,
} from './Serializers.mjs';
import { PolymorphicSerializer3p3fzpdobi8hh as PolymorphicSerializer } from './PolymorphicSerializer.mjs';
import {
  isInterface150ul88kmyj8d as isInterface_0,
  createCacheduynpeymxvy7 as createCache,
  createParametrizedCache2j3ou5aipnogv as createParametrizedCache,
} from './internal/Platform.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from './builtins/BuiltinSerializers.mjs';
import { EmptySerializersModule991ju6pz9b79 as EmptySerializersModule } from './modules/SerializersModuleBuilders.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_SERIALIZERS_CACHE() {
  _init_properties_SerializersCache_kt__hgwi2p();
  return SERIALIZERS_CACHE;
}
var SERIALIZERS_CACHE;
function get_SERIALIZERS_CACHE_NULLABLE() {
  _init_properties_SerializersCache_kt__hgwi2p();
  return SERIALIZERS_CACHE_NULLABLE;
}
var SERIALIZERS_CACHE_NULLABLE;
function get_PARAMETRIZED_SERIALIZERS_CACHE() {
  _init_properties_SerializersCache_kt__hgwi2p();
  return PARAMETRIZED_SERIALIZERS_CACHE;
}
var PARAMETRIZED_SERIALIZERS_CACHE;
function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
  _init_properties_SerializersCache_kt__hgwi2p();
  return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
}
var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
function findCachedSerializer(clazz, isNullable) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var tmp;
  if (!isNullable) {
    var tmp0_safe_receiver = get_SERIALIZERS_CACHE().r11(clazz);
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_0 = isInterface(tmp0_safe_receiver, KSerializer()) ? tmp0_safe_receiver : THROW_CCE();
    }
    tmp = tmp_0;
  } else {
    tmp = get_SERIALIZERS_CACHE_NULLABLE().r11(clazz);
  }
  return tmp;
}
function findParametrizedCachedSerializer(clazz, types, isNullable) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var tmp;
  if (!isNullable) {
    var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().s11(clazz, types);
    tmp = new (Result())(tmp_0) instanceof Result() ? tmp_0 : THROW_CCE();
  } else {
    tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().s11(clazz, types);
  }
  return tmp;
}
function SERIALIZERS_CACHE$lambda(it) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var tmp0_elvis_lhs = serializerOrNull(it);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
    tmp = isInterface_0(it) ? PolymorphicSerializer().uz(it) : null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var tmp0_elvis_lhs = serializerOrNull(it);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlinx.serialization.polymorphicIfInterface' call
    tmp = isInterface_0(it) ? PolymorphicSerializer().uz(it) : null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var tmp1_safe_receiver = tmp;
  var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_nullable(tmp1_safe_receiver);
  var tmp_0;
  if (tmp2_safe_receiver == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlinx.serialization.internal.cast' call
    tmp_0 = isInterface(tmp2_safe_receiver, KSerializer()) ? tmp2_safe_receiver : THROW_CCE();
  }
  return tmp_0;
}
function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule(), types, true));
  return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
}
function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
  return function () {
    return $types.e1(0).vh();
  };
}
function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
  _init_properties_SerializersCache_kt__hgwi2p();
  var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule(), types, true));
  var tmp0_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
  var tmp;
  if (tmp1_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlinx.serialization.internal.cast' call
    tmp = isInterface(tmp1_safe_receiver, KSerializer()) ? tmp1_safe_receiver : THROW_CCE();
  }
  return tmp;
}
function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
  return function () {
    return $types.e1(0).vh();
  };
}
var properties_initialized_SerializersCache_kt_q8kf25;
function _init_properties_SerializersCache_kt__hgwi2p() {
  if (!properties_initialized_SerializersCache_kt_q8kf25) {
    properties_initialized_SerializersCache_kt_q8kf25 = true;
    SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
    SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
    PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
    PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
  }
}
//region block: exports
export {
  findCachedSerializer as findCachedSerializer3o8gql85ngyfi,
  findParametrizedCachedSerializer as findParametrizedCachedSerializer1zrxdjq0nix5d,
};
//endregion

//# sourceMappingURL=SerializersCache.mjs.map
