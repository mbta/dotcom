import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  SerializationStrategyh6ouydnm6hci as SerializationStrategy,
  KSerializerzf77vz1967fq as KSerializer,
} from '../KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KClass1cc9rfeybg8hs as KClass } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KClassJs.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_EmptySerializersModuleLegacyJs() {
  _init_properties_SerializersModule_kt__u78ha3();
  return EmptySerializersModule;
}
var EmptySerializersModule;
var SerializersModuleClass;
function SerializersModule() {
  if (SerializersModuleClass === VOID) {
    class $ {
      p11(kClass, typeArgumentsSerializers, $super) {
        typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
        return $super === VOID ? this.q11(kClass, typeArgumentsSerializers) : $super.q11.call(this, kClass, typeArgumentsSerializers);
      }
    }
    initMetadataForClass($, 'SerializersModule');
    SerializersModuleClass = $;
  }
  return SerializersModuleClass;
}
var SerialModuleImplClass;
function SerialModuleImpl() {
  if (SerialModuleImplClass === VOID) {
    class $ extends SerializersModule() {
      constructor(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
        super();
        this.n1k_1 = class2ContextualFactory;
        this.o1k_1 = polyBase2Serializers;
        this.p1k_1 = polyBase2DefaultSerializerProvider;
        this.q1k_1 = polyBase2NamedSerializers;
        this.r1k_1 = polyBase2DefaultDeserializerProvider;
        this.s1k_1 = hasInterfaceContextualSerializers;
      }
      o11() {
        return this.s1k_1;
      }
      v15(baseClass, value) {
        if (!baseClass.hh(value))
          return null;
        var tmp0_safe_receiver = this.o1k_1.j3(baseClass);
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j3(getKClassFromExpression(value));
        var registered = (!(tmp == null) ? isInterface(tmp, SerializationStrategy()) : false) ? tmp : null;
        if (!(registered == null))
          return registered;
        var tmp_0 = this.p1k_1.j3(baseClass);
        var tmp1_safe_receiver = (!(tmp_0 == null) ? typeof tmp_0 === 'function' : false) ? tmp_0 : null;
        return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(value);
      }
      u15(baseClass, serializedClassName) {
        var tmp0_safe_receiver = this.q1k_1.j3(baseClass);
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.collections.get' call
          tmp = (isInterface(tmp0_safe_receiver, KtMap()) ? tmp0_safe_receiver : THROW_CCE()).j3(serializedClassName);
        }
        var tmp_0 = tmp;
        var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer()) : false) ? tmp_0 : null;
        if (!(registered == null))
          return registered;
        var tmp_1 = this.r1k_1.j3(baseClass);
        var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
        return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
      }
      q11(kClass, typeArgumentsSerializers) {
        var tmp0_safe_receiver = this.n1k_1.j3(kClass);
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.t1k(typeArgumentsSerializers);
        return (tmp == null ? true : isInterface(tmp, KSerializer())) ? tmp : null;
      }
      m1k(collector) {
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = this.n1k_1.t1().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var kclass = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var serial = element.v1();
          if (serial instanceof Argless()) {
            var tmp = isInterface(kclass, KClass()) ? kclass : THROW_CCE();
            var tmp_0 = serial.w1k_1;
            collector.x1k(tmp, isInterface(tmp_0, KSerializer()) ? tmp_0 : THROW_CCE());
          } else {
            if (serial instanceof WithTypeArguments()) {
              collector.v1k(kclass, serial.u1k_1);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_0 = this.o1k_1.t1().x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          // Inline function 'kotlin.collections.component1' call
          var baseClass = element_0.u1();
          // Inline function 'kotlin.collections.component2' call
          var classMap = element_0.v1();
          // Inline function 'kotlin.collections.forEach' call
          // Inline function 'kotlin.collections.iterator' call
          var _iterator__ex2g4s_1 = classMap.t1().x();
          while (_iterator__ex2g4s_1.y()) {
            var element_1 = _iterator__ex2g4s_1.z();
            // Inline function 'kotlin.collections.component1' call
            var actualClass = element_1.u1();
            // Inline function 'kotlin.collections.component2' call
            var serializer = element_1.v1();
            var tmp_1 = isInterface(baseClass, KClass()) ? baseClass : THROW_CCE();
            var tmp_2 = isInterface(actualClass, KClass()) ? actualClass : THROW_CCE();
            // Inline function 'kotlinx.serialization.internal.cast' call
            var tmp$ret$11 = isInterface(serializer, KSerializer()) ? serializer : THROW_CCE();
            collector.y1k(tmp_1, tmp_2, tmp$ret$11);
          }
        }
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_2 = this.p1k_1.t1().x();
        while (_iterator__ex2g4s_2.y()) {
          var element_2 = _iterator__ex2g4s_2.z();
          // Inline function 'kotlin.collections.component1' call
          var baseClass_0 = element_2.u1();
          // Inline function 'kotlin.collections.component2' call
          var provider = element_2.v1();
          var tmp_3 = isInterface(baseClass_0, KClass()) ? baseClass_0 : THROW_CCE();
          collector.z1k(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
        }
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s_3 = this.r1k_1.t1().x();
        while (_iterator__ex2g4s_3.y()) {
          var element_3 = _iterator__ex2g4s_3.z();
          // Inline function 'kotlin.collections.component1' call
          var baseClass_1 = element_3.u1();
          // Inline function 'kotlin.collections.component2' call
          var provider_0 = element_3.v1();
          var tmp_4 = isInterface(baseClass_1, KClass()) ? baseClass_1 : THROW_CCE();
          collector.a1l(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
        }
      }
    }
    initMetadataForClass($, 'SerialModuleImpl');
    SerialModuleImplClass = $;
  }
  return SerialModuleImplClass;
}
var ArglessClass;
function Argless() {
  if (ArglessClass === VOID) {
    class $ extends ContextualProvider() {}
    initMetadataForClass($, 'Argless');
    ArglessClass = $;
  }
  return ArglessClass;
}
var WithTypeArgumentsClass;
function WithTypeArguments() {
  if (WithTypeArgumentsClass === VOID) {
    class $ extends ContextualProvider() {}
    initMetadataForClass($, 'WithTypeArguments');
    WithTypeArgumentsClass = $;
  }
  return WithTypeArgumentsClass;
}
var ContextualProviderClass;
function ContextualProvider() {
  if (ContextualProviderClass === VOID) {
    class $ {}
    initMetadataForClass($, 'ContextualProvider');
    ContextualProviderClass = $;
  }
  return ContextualProviderClass;
}
var properties_initialized_SerializersModule_kt_fjigjn;
function _init_properties_SerializersModule_kt__u78ha3() {
  if (!properties_initialized_SerializersModule_kt_fjigjn) {
    properties_initialized_SerializersModule_kt_fjigjn = true;
    EmptySerializersModule = new (SerialModuleImpl())(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
  }
}
//region block: exports
export {
  get_EmptySerializersModuleLegacyJs as get_EmptySerializersModuleLegacyJs2imgse4bg8t49,
};
//endregion

//# sourceMappingURL=SerializersModule.mjs.map
