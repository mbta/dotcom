import { CachedNames2minxlyafeo07 as CachedNames } from './CachedNames.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { toString1pkumu07cwy4m as toString_0 } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { KTypeParameter1s8efufd4mbj5 as KTypeParameter } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KTypeParameter.mjs';
import { KClass1cc9rfeybg8hs as KClass } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KClassJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { copyToArray2j022khrow2yi as copyToArray } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_EMPTY_DESCRIPTOR_ARRAY() {
  _init_properties_Platform_common_kt__3qzecs();
  return EMPTY_DESCRIPTOR_ARRAY;
}
var EMPTY_DESCRIPTOR_ARRAY;
function cachedSerialNames(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  if (isInterface(_this__u8e3s4, CachedNames()))
    return _this__u8e3s4.c13();
  var result = HashSet().b1(_this__u8e3s4.z11());
  var inductionVariable = 0;
  var last = _this__u8e3s4.z11();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.plusAssign' call
      var element = _this__u8e3s4.b12(i);
      result.i(element);
    }
     while (inductionVariable < last);
  return result;
}
function kclass(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  var t = _this__u8e3s4.vh();
  var tmp;
  if (!(t == null) ? isInterface(t, KClass()) : false) {
    tmp = t;
  } else {
    if (!(t == null) ? isInterface(t, KTypeParameter()) : false) {
      throw IllegalArgumentException().q('Captured type parameter ' + toString_0(t) + ' from generic non-reified function. ' + ('Such functionality cannot be supported because ' + toString_0(t) + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + toString_0(t) + '.'));
    } else {
      throw IllegalArgumentException().q('Only KClass supported as classifier, got ' + toString(t));
    }
  }
  var tmp_0 = tmp;
  return isInterface(tmp_0, KClass()) ? tmp_0 : THROW_CCE();
}
function typeOrThrow(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  var tmp0 = _this__u8e3s4.nt_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.requireNotNull' call
    if (tmp0 == null) {
      var message = 'Star projections in type arguments are not allowed, but had ' + toString(_this__u8e3s4.nt_1);
      throw IllegalArgumentException().q(toString_0(message));
    } else {
      tmp$ret$1 = tmp0;
      break $l$block;
    }
  }
  return tmp$ret$1;
}
function notRegisteredMessage(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  var tmp0_elvis_lhs = _this__u8e3s4.gh();
  return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
}
function compactArray(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  // Inline function 'kotlin.takeUnless' call
  var tmp;
  // Inline function 'kotlin.collections.isNullOrEmpty' call
  if (!(_this__u8e3s4 == null || _this__u8e3s4.h1())) {
    tmp = _this__u8e3s4;
  } else {
    tmp = null;
  }
  var tmp0_safe_receiver = tmp;
  var tmp_0;
  if (tmp0_safe_receiver == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.collections.toTypedArray' call
    tmp_0 = copyToArray(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp_0;
  return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
}
function notRegisteredMessage_0(className) {
  _init_properties_Platform_common_kt__3qzecs();
  return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
}
function serializerNotRegistered(_this__u8e3s4) {
  _init_properties_Platform_common_kt__3qzecs();
  throw SerializationException().w10(notRegisteredMessage(_this__u8e3s4));
}
var properties_initialized_Platform_common_kt_i7q4ty;
function _init_properties_Platform_common_kt__3qzecs() {
  if (!properties_initialized_Platform_common_kt_i7q4ty) {
    properties_initialized_Platform_common_kt_i7q4ty = true;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    EMPTY_DESCRIPTOR_ARRAY = [];
  }
}
//region block: exports
export {
  cachedSerialNames as cachedSerialNames31jc5fovi62px,
  compactArray as compactArray1b2nl9rkq8nuz,
  kclass as kclass1exqpscvro86a,
  notRegisteredMessage as notRegisteredMessage3kjs77vaiklv,
  serializerNotRegistered as serializerNotRegistered1ovw7obgbxuzq,
  typeOrThrow as typeOrThrowwmzfq0bqyfgr,
};
//endregion

//# sourceMappingURL=Platform.common.mjs.map
