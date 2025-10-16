import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  getOrNull1d60i0672n7ns as getOrNull,
  indexOf3ic8eacwbbrog as indexOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  OBJECT_getInstance26229tfe4t547 as OBJECT_getInstance,
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
} from '../descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from '../descriptors/SerialDescriptors.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from './PluginGeneratedSerialDescriptor.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { getChecked1o70dkx10jwym as getChecked } from './Platform.mjs';
import {
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
  get_elementNamesl5b6t976dltd as get_elementNames,
} from '../descriptors/SerialDescriptor.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { cachedSerialNames31jc5fovi62px as cachedSerialNames } from './Platform.common.mjs';
import {
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { contentToString3ujacv8hqfipd as contentToString } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function createAnnotatedEnumSerializer(serialName, values, names, entryAnnotations, classAnnotations) {
  var descriptor = new (EnumDescriptor())(serialName, values.length);
  if (classAnnotations == null)
    null;
  else {
    // Inline function 'kotlin.collections.forEach' call
    var inductionVariable = 0;
    var last = classAnnotations.length;
    while (inductionVariable < last) {
      var element = classAnnotations[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      descriptor.s1a(element);
    }
  }
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var inductionVariable_0 = 0;
  var last_0 = values.length;
  while (inductionVariable_0 < last_0) {
    var item = values[inductionVariable_0];
    inductionVariable_0 = inductionVariable_0 + 1 | 0;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var tmp0_elvis_lhs = getOrNull(names, _unary__edvuaz);
    var elementName = tmp0_elvis_lhs == null ? item.w3_1 : tmp0_elvis_lhs;
    descriptor.t1a(elementName);
    var tmp1_safe_receiver = getOrNull(entryAnnotations, _unary__edvuaz);
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.collections.forEach' call
      var inductionVariable_1 = 0;
      var last_1 = tmp1_safe_receiver.length;
      while (inductionVariable_1 < last_1) {
        var element_0 = tmp1_safe_receiver[inductionVariable_1];
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        descriptor.u1a(element_0);
      }
    }
  }
  return EnumSerializer().y1a(serialName, values, descriptor);
}
function createSimpleEnumSerializer(serialName, values) {
  return EnumSerializer().z1a(serialName, values);
}
function _get_elementDescriptors__y23q9p($this) {
  var tmp0 = $this.n1b_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('elementDescriptors', 1, tmp, EnumDescriptor$_get_elementDescriptors_$ref_5lvk4a(), null);
  return tmp0.v1();
}
function EnumDescriptor$elementDescriptors$delegate$lambda($elementsCount, $name, this$0) {
  return function () {
    var tmp = 0;
    var tmp_0 = $elementsCount;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = buildSerialDescriptor($name + '.' + this$0.b12(tmp_2), OBJECT_getInstance(), []);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  };
}
function EnumDescriptor$_get_elementDescriptors_$ref_5lvk4a() {
  return function (p0) {
    return _get_elementDescriptors__y23q9p(p0);
  };
}
var EnumDescriptorClass;
function EnumDescriptor() {
  if (EnumDescriptorClass === VOID) {
    class $ extends PluginGeneratedSerialDescriptor() {
      constructor(name, elementsCount) {
        super(name, VOID, elementsCount);
        this.m1b_1 = ENUM_getInstance();
        var tmp = this;
        tmp.n1b_1 = lazy(EnumDescriptor$elementDescriptors$delegate$lambda(elementsCount, name, this));
      }
      x11() {
        return this.m1b_1;
      }
      e12(index) {
        return getChecked(_get_elementDescriptors__y23q9p(this), index);
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null)
          return false;
        if (!(!(other == null) ? isInterface(other, SerialDescriptor()) : false))
          return false;
        if (!(other.x11() === ENUM_getInstance()))
          return false;
        if (!(this.j10() === other.j10()))
          return false;
        if (!equals(cachedSerialNames(this), cachedSerialNames(other)))
          return false;
        return true;
      }
      toString() {
        return joinToString(get_elementNames(this), ', ', this.j10() + '(', ')');
      }
      hashCode() {
        var result = getStringHashCode(this.j10());
        // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
        // Inline function 'kotlin.collections.fold' call
        var accumulator = 1;
        var _iterator__ex2g4s = get_elementNames(this).x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var hash = accumulator;
          var tmp = imul(31, hash);
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = element == null ? null : hashCode(element);
          accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        var elementsHashCode = accumulator;
        result = imul(31, result) + elementsHashCode | 0;
        return result;
      }
    }
    initMetadataForClass($, 'EnumDescriptor');
    EnumDescriptorClass = $;
  }
  return EnumDescriptorClass;
}
function createUnmarkedDescriptor($this, serialName) {
  var d = new (EnumDescriptor())(serialName, $this.v1a_1.length);
  // Inline function 'kotlin.collections.forEach' call
  var indexedObject = $this.v1a_1;
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var element = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    d.t1a(element.w3_1);
  }
  return d;
}
function EnumSerializer$descriptor$delegate$lambda(this$0, $serialName) {
  return function () {
    var tmp0_elvis_lhs = this$0.w1a_1;
    return tmp0_elvis_lhs == null ? createUnmarkedDescriptor(this$0, $serialName) : tmp0_elvis_lhs;
  };
}
function EnumSerializer$_get_descriptor_$ref_j67dlw() {
  return function (p0) {
    return p0.fz();
  };
}
var EnumSerializerClass;
function EnumSerializer() {
  if (EnumSerializerClass === VOID) {
    class $ {
      static z1a(serialName, values) {
        var $this = createThis(this);
        $this.v1a_1 = values;
        $this.w1a_1 = null;
        var tmp = $this;
        tmp.x1a_1 = lazy(EnumSerializer$descriptor$delegate$lambda($this, serialName));
        return $this;
      }
      static y1a(serialName, values, descriptor) {
        var $this = this.z1a(serialName, values);
        $this.w1a_1 = descriptor;
        return $this;
      }
      fz() {
        var tmp0 = this.x1a_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, EnumSerializer$_get_descriptor_$ref_j67dlw(), null);
        return tmp0.v1();
      }
      q1b(encoder, value) {
        var index = indexOf(this.v1a_1, value);
        if (index === -1) {
          throw SerializationException().w10(toString(value) + ' is not a valid enum ' + this.fz().j10() + ', ' + ('must be one of ' + contentToString(this.v1a_1)));
        }
        encoder.b15(this.fz(), index);
      }
      gz(encoder, value) {
        return this.q1b(encoder, value instanceof Enum() ? value : THROW_CCE());
      }
      hz(decoder) {
        var index = decoder.r13(this.fz());
        if (!(0 <= index ? index <= (this.v1a_1.length - 1 | 0) : false)) {
          throw SerializationException().w10('' + index + ' is not among valid ' + this.fz().j10() + ' enum values, ' + ('values size is ' + this.v1a_1.length));
        }
        return this.v1a_1[index];
      }
      toString() {
        return 'kotlinx.serialization.internal.EnumSerializer<' + this.fz().j10() + '>';
      }
    }
    initMetadataForClass($, 'EnumSerializer', VOID, VOID, [KSerializer()]);
    EnumSerializerClass = $;
  }
  return EnumSerializerClass;
}
//region block: exports
export {
  createAnnotatedEnumSerializer as createAnnotatedEnumSerializer20ay4pme9p2h9,
  createSimpleEnumSerializer as createSimpleEnumSerializer2guioz11kk1m0,
};
//endregion

//# sourceMappingURL=Enums.mjs.map
