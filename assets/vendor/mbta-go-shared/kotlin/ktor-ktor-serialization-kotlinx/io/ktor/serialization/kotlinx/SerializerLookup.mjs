import {
  serializerOrNull31x2b6nu6gruj as serializerOrNull,
  serializer1rka18p0rjk4x as serializer,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  MapSerializer11kmegt3g5c1g as MapSerializer,
  SetSerializert3lb0yy9iftr as SetSerializer,
  serializer1x79l67jvwntn as serializer_0,
  ListSerializer1hxuk9dx5n9du as ListSerializer,
  get_nullable197rfua9r7fsz as get_nullable,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  KtMap140uvy3s5zad8 as KtMap,
  KtSetjrjc7fhfd6b9 as KtSet,
  KtList3hktaavzmj137 as KtList,
  Collection1k04j3hzsbod0 as Collection,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isArray1hxjqtqy632bc as isArray,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { firstOrNull1gk7vzkf4h3nq as firstOrNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import {
  filterNotNull3qfgcwmxhwfxe as filterNotNull,
  singleOrNullrknfaxokm1sl as singleOrNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function serializerForTypeInfo(_this__u8e3s4, typeInfo) {
  var module_0 = _this__u8e3s4;
  var tmp0_safe_receiver = typeInfo.h3n_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp_0;
    if (tmp0_safe_receiver.wh().h1()) {
      tmp_0 = null;
    } else {
      tmp_0 = serializerOrNull(module_0, tmp0_safe_receiver);
    }
    tmp = tmp_0;
  }
  var tmp1_elvis_lhs = tmp;
  var tmp_1;
  if (tmp1_elvis_lhs == null) {
    var tmp2_safe_receiver = module_0.p11(typeInfo.g3n_1);
    tmp_1 = tmp2_safe_receiver == null ? null : maybeNullable(tmp2_safe_receiver, typeInfo);
  } else {
    tmp_1 = tmp1_elvis_lhs;
  }
  var tmp3_elvis_lhs = tmp_1;
  return tmp3_elvis_lhs == null ? maybeNullable(serializer(typeInfo.g3n_1), typeInfo) : tmp3_elvis_lhs;
}
function guessSerializer(value, module_0) {
  var tmp;
  if (value == null) {
    tmp = get_nullable(serializer_0(StringCompanionObject_instance));
  } else {
    if (!(value == null) ? isInterface(value, KtList()) : false) {
      tmp = ListSerializer(elementSerializer(value, module_0));
    } else {
      if (!(value == null) ? isArray(value) : false) {
        var tmp1_safe_receiver = firstOrNull(value);
        var tmp_0;
        if (tmp1_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_0 = guessSerializer(tmp1_safe_receiver, module_0);
        }
        var tmp2_elvis_lhs = tmp_0;
        tmp = tmp2_elvis_lhs == null ? ListSerializer(serializer_0(StringCompanionObject_instance)) : tmp2_elvis_lhs;
      } else {
        if (!(value == null) ? isInterface(value, KtSet()) : false) {
          tmp = SetSerializer(elementSerializer(value, module_0));
        } else {
          if (!(value == null) ? isInterface(value, KtMap()) : false) {
            var keySerializer = elementSerializer(value.k3(), module_0);
            var valueSerializer = elementSerializer(value.l3(), module_0);
            tmp = MapSerializer(keySerializer, valueSerializer);
          } else {
            var tmp3_elvis_lhs = module_0.p11(getKClassFromExpression(value));
            tmp = tmp3_elvis_lhs == null ? serializer(getKClassFromExpression(value)) : tmp3_elvis_lhs;
          }
        }
      }
    }
  }
  var tmp_1 = tmp;
  return isInterface(tmp_1, KSerializer()) ? tmp_1 : THROW_CCE();
}
function maybeNullable(_this__u8e3s4, typeInfo) {
  var tmp;
  var tmp0_safe_receiver = typeInfo.h3n_1;
  if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.xh()) === true) {
    tmp = get_nullable(_this__u8e3s4);
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
function elementSerializer(_this__u8e3s4, module_0) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = filterNotNull(_this__u8e3s4);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var tmp$ret$0 = guessSerializer(item, module_0);
    destination.i(tmp$ret$0);
  }
  // Inline function 'kotlin.collections.distinctBy' call
  var set = HashSet().ua();
  var list = ArrayList().g1();
  var _iterator__ex2g4s_0 = destination.x();
  while (_iterator__ex2g4s_0.y()) {
    var e = _iterator__ex2g4s_0.z();
    var key = e.fz().j10();
    if (set.i(key)) {
      list.i(e);
    }
  }
  var serializers = list;
  if (serializers.c1() > 1) {
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList().w(collectionSizeOrDefault(serializers, 10));
    var _iterator__ex2g4s_1 = serializers.x();
    while (_iterator__ex2g4s_1.y()) {
      var item_0 = _iterator__ex2g4s_1.z();
      var tmp$ret$5 = item_0.fz().j10();
      destination_0.i(tmp$ret$5);
    }
    // Inline function 'kotlin.error' call
    var message = 'Serializing collections of different element types is not yet supported. ' + ('Selected serializers: ' + toString(destination_0));
    throw IllegalStateException().o5(toString(message));
  }
  var tmp0_elvis_lhs = singleOrNull(serializers);
  var selected = tmp0_elvis_lhs == null ? serializer_0(StringCompanionObject_instance) : tmp0_elvis_lhs;
  if (selected.fz().t11()) {
    return selected;
  }
  if (!isInterface(selected, KSerializer()))
    THROW_CCE();
  var tmp$ret$8;
  $l$block_0: {
    // Inline function 'kotlin.collections.any' call
    var tmp;
    if (isInterface(_this__u8e3s4, Collection())) {
      tmp = _this__u8e3s4.h1();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$8 = false;
      break $l$block_0;
    }
    var _iterator__ex2g4s_2 = _this__u8e3s4.x();
    while (_iterator__ex2g4s_2.y()) {
      var element = _iterator__ex2g4s_2.z();
      if (element == null) {
        tmp$ret$8 = true;
        break $l$block_0;
      }
    }
    tmp$ret$8 = false;
  }
  if (tmp$ret$8) {
    return get_nullable(selected);
  }
  return selected;
}
//region block: exports
export {
  guessSerializer as guessSerializerlivkaydavxr9,
  serializerForTypeInfo as serializerForTypeInfofg753n9o7cfi,
};
//endregion

//# sourceMappingURL=SerializerLookup.mjs.map
