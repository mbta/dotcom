import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance } from '../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { serializer1x79l67jvwntn as serializer } from './builtins/BuiltinSerializers.mjs';
import {
  CONTEXTUAL_getInstance1845118lbzky0 as CONTEXTUAL_getInstance,
  SEALED_getInstance3nsev85ow9059 as SEALED_getInstance,
} from './descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from './descriptors/SerialDescriptors.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer } from './internal/AbstractPolymorphicSerializer.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { zip2suipyqmdw72q as zip } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { toMap1vec9topfei08 as toMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { asList2ho2pewtsfvv as asList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SerializationStrategyh6ouydnm6hci as SerializationStrategy } from './KSerializer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0) {
  return function ($this$buildSerialDescriptor) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var _iterator__ex2g4s = this$0.f10_1.t1().x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      // Inline function 'kotlin.collections.component1' call
      var name = element.u1();
      // Inline function 'kotlin.collections.component2' call
      var serializer = element.v1();
      $this$buildSerialDescriptor.qz(name, serializer.fz());
    }
    return Unit_instance;
  };
}
function SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0) {
  return function ($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.qz('type', serializer(StringCompanionObject_instance).fz());
    var tmp = 'kotlinx.serialization.Sealed<' + this$0.b10_1.gh() + '>';
    var tmp_0 = CONTEXTUAL_getInstance();
    var elementDescriptor = buildSerialDescriptor(tmp, tmp_0, [], SealedClassSerializer$descriptor$delegate$lambda$lambda$lambda(this$0));
    $this$buildSerialDescriptor.qz('value', elementDescriptor);
    $this$buildSerialDescriptor.kz_1 = this$0.c10_1;
    return Unit_instance;
  };
}
function SealedClassSerializer$descriptor$delegate$lambda($serialName, this$0) {
  return function () {
    var tmp = SEALED_getInstance();
    return buildSerialDescriptor($serialName, tmp, [], SealedClassSerializer$descriptor$delegate$lambda$lambda(this$0));
  };
}
function SealedClassSerializer$_get_descriptor_$ref_m511rz() {
  return function (p0) {
    return p0.fz();
  };
}
var SealedClassSerializer$$inlined$groupingBy$1Class;
function SealedClassSerializer$$inlined$groupingBy$1() {
  if (SealedClassSerializer$$inlined$groupingBy$1Class === VOID) {
    class $ {
      constructor($this) {
        this.g10_1 = $this;
      }
      h10() {
        return this.g10_1.x();
      }
      i10(element) {
        return element.v1().fz().j10();
      }
      k10(element) {
        return this.i10((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($);
    SealedClassSerializer$$inlined$groupingBy$1Class = $;
  }
  return SealedClassSerializer$$inlined$groupingBy$1Class;
}
var SealedClassSerializerClass;
function SealedClassSerializer() {
  if (SealedClassSerializerClass === VOID) {
    class $ extends AbstractPolymorphicSerializer() {
      static l10(serialName, baseClass, subclasses, subclassSerializers) {
        var $this = this.vz();
        $this.b10_1 = baseClass;
        $this.c10_1 = emptyList();
        var tmp = $this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.d10_1 = lazy(tmp_0, SealedClassSerializer$descriptor$delegate$lambda(serialName, $this));
        if (!(subclasses.length === subclassSerializers.length)) {
          throw IllegalArgumentException().q('All subclasses of sealed class ' + $this.b10_1.gh() + ' should be marked @Serializable');
        }
        $this.e10_1 = toMap(zip(subclasses, subclassSerializers));
        var tmp_1 = $this;
        // Inline function 'kotlin.collections.groupingBy' call
        var this_0 = $this.e10_1.t1();
        // Inline function 'kotlin.collections.aggregate' call
        var tmp0 = new (SealedClassSerializer$$inlined$groupingBy$1())(this_0);
        // Inline function 'kotlin.collections.mutableMapOf' call
        // Inline function 'kotlin.collections.aggregateTo' call
        var destination = LinkedHashMap().sc();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = tmp0.h10();
        while (_iterator__ex2g4s.y()) {
          var e = _iterator__ex2g4s.z();
          var key = tmp0.k10(e);
          var accumulator = destination.j3(key);
          accumulator == null && !destination.h3(key);
          if (!(accumulator == null)) {
            // Inline function 'kotlin.error' call
            var message = "Multiple sealed subclasses of '" + toString($this.b10_1) + "' have the same serial name '" + key + "':" + (" '" + toString(accumulator.u1()) + "', '" + toString(e.u1()) + "'");
            throw IllegalStateException().o5(toString(message));
          }
          // Inline function 'kotlin.collections.set' call
          destination.t3(key, e);
        }
        // Inline function 'kotlin.collections.mapValues' call
        // Inline function 'kotlin.collections.mapValuesTo' call
        var destination_0 = LinkedHashMap().tc(mapCapacity(destination.c1()));
        // Inline function 'kotlin.collections.associateByTo' call
        var _iterator__ex2g4s_0 = destination.t1().x();
        while (_iterator__ex2g4s_0.y()) {
          var element = _iterator__ex2g4s_0.z();
          var tmp_2 = element.u1();
          var tmp$ret$8 = element.v1().v1();
          destination_0.t3(tmp_2, tmp$ret$8);
        }
        tmp_1.f10_1 = destination_0;
        return $this;
      }
      wz() {
        return this.b10_1;
      }
      static m10(serialName, baseClass, subclasses, subclassSerializers, classAnnotations) {
        var $this = this.l10(serialName, baseClass, subclasses, subclassSerializers);
        $this.c10_1 = asList(classAnnotations);
        return $this;
      }
      fz() {
        var tmp0 = this.d10_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, SealedClassSerializer$_get_descriptor_$ref_m511rz(), null);
        return tmp0.v1();
      }
      zz(decoder, klassName) {
        // Inline function 'kotlin.collections.get' call
        var this_0 = this.f10_1;
        var tmp0_elvis_lhs = (isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).j3(klassName);
        return tmp0_elvis_lhs == null ? super.zz(decoder, klassName) : tmp0_elvis_lhs;
      }
      a10(encoder, value) {
        var tmp0_elvis_lhs = this.e10_1.j3(getKClassFromExpression(value));
        var tmp1_safe_receiver = tmp0_elvis_lhs == null ? super.a10(encoder, value) : tmp0_elvis_lhs;
        var tmp;
        if (tmp1_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlinx.serialization.internal.cast' call
          tmp = isInterface(tmp1_safe_receiver, SerializationStrategy()) ? tmp1_safe_receiver : THROW_CCE();
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'SealedClassSerializer');
    SealedClassSerializerClass = $;
  }
  return SealedClassSerializerClass;
}
//region block: exports
export {
  SealedClassSerializer as SealedClassSerializeriwipiibk55zc,
};
//endregion

//# sourceMappingURL=SealedSerializer.mjs.map
