import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { isBlank1dvkhjjvox3p0 as isBlank } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  CLASS_getInstance14ex35co4jkrb as CLASS_getInstance,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
} from './SerialKinds.mjs';
import {
  toList383f556t1dixk as toList,
  withIndex3s8q7w1g0hyfn as withIndex,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Arrays.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  hashCodeImplfv8qiy3re24s as hashCodeImpl,
  toStringImpl1y3u8fza7vdq as toStringImpl,
} from '../internal/PluginGeneratedSerialDescriptor.mjs';
import {
  toHashSet1qrcsl3g8ugc8 as toHashSet,
  toBooleanArray2u3qw7fjwsmuh as toBooleanArray,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { copyToArray2j022khrow2yi as copyToArray } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { compactArray1b2nl9rkq8nuz as compactArray } from '../internal/Platform.common.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { to2cs3ny02qtbcb as to } from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { toMap1vec9topfei08 as toMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  getChecked1o70dkx10jwym as getChecked,
  getChecked3avs2psuwt1xd as getChecked_0,
} from '../internal/Platform.mjs';
import { contentEqualsaf55p28mnw74 as contentEquals } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
} from './SerialDescriptor.mjs';
import { CachedNames2minxlyafeo07 as CachedNames } from '../internal/CachedNames.mjs';
import {
  PrimitiveDescriptorSafe1r3pht5v1oaqu as PrimitiveDescriptorSafe,
  checkNameIsNotAPrimitive28vmhppr4nskt as checkNameIsNotAPrimitive,
} from '../internal/Primitives.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
  var tmp;
  if (builder === VOID) {
    tmp = buildSerialDescriptor$lambda;
  } else {
    tmp = builder;
  }
  builder = tmp;
  // Inline function 'kotlin.text.isNotBlank' call
  // Inline function 'kotlin.require' call
  if (!!isBlank(serialName)) {
    var message = 'Blank serial names are prohibited';
    throw IllegalArgumentException().q(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!!equals(kind, CLASS_getInstance())) {
    var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
    throw IllegalArgumentException().q(toString(message_0));
  }
  var sdBuilder = new (ClassSerialDescriptorBuilder())(serialName);
  builder(sdBuilder);
  return new (SerialDescriptorImpl())(serialName, kind, sdBuilder.lz_1.c1(), toList(typeParameters), sdBuilder);
}
var ClassSerialDescriptorBuilderClass;
function ClassSerialDescriptorBuilder() {
  if (ClassSerialDescriptorBuilderClass === VOID) {
    class $ {
      constructor(serialName) {
        this.iz_1 = serialName;
        this.jz_1 = false;
        this.kz_1 = emptyList();
        this.lz_1 = ArrayList().g1();
        this.mz_1 = HashSet().ua();
        this.nz_1 = ArrayList().g1();
        this.oz_1 = ArrayList().g1();
        this.pz_1 = ArrayList().g1();
      }
      p12(elementName, descriptor, annotations, isOptional) {
        // Inline function 'kotlin.require' call
        if (!this.mz_1.i(elementName)) {
          var message = "Element with name '" + elementName + "' is already registered in " + this.iz_1;
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.collections.plusAssign' call
        this.lz_1.i(elementName);
        // Inline function 'kotlin.collections.plusAssign' call
        this.nz_1.i(descriptor);
        // Inline function 'kotlin.collections.plusAssign' call
        this.oz_1.i(annotations);
        // Inline function 'kotlin.collections.plusAssign' call
        this.pz_1.i(isOptional);
      }
      qz(elementName, descriptor, annotations, isOptional, $super) {
        annotations = annotations === VOID ? emptyList() : annotations;
        isOptional = isOptional === VOID ? false : isOptional;
        var tmp;
        if ($super === VOID) {
          this.p12(elementName, descriptor, annotations, isOptional);
          tmp = Unit_instance;
        } else {
          tmp = $super.p12.call(this, elementName, descriptor, annotations, isOptional);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'ClassSerialDescriptorBuilder');
    ClassSerialDescriptorBuilderClass = $;
  }
  return ClassSerialDescriptorBuilderClass;
}
function _get__hashCode__tgwhef($this) {
  var tmp0 = $this.b13_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('_hashCode', 1, tmp, SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp(), null);
  return tmp0.v1();
}
function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
  return function () {
    return hashCodeImpl(this$0, this$0.a13_1);
  };
}
function SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp() {
  return function (p0) {
    return _get__hashCode__tgwhef(p0);
  };
}
var SerialDescriptorImplClass;
function SerialDescriptorImpl() {
  if (SerialDescriptorImplClass === VOID) {
    class $ {
      constructor(serialName, kind, elementsCount, typeParameters, builder) {
        this.q12_1 = serialName;
        this.r12_1 = kind;
        this.s12_1 = elementsCount;
        this.t12_1 = builder.kz_1;
        this.u12_1 = toHashSet(builder.lz_1);
        var tmp = this;
        // Inline function 'kotlin.collections.toTypedArray' call
        var this_0 = builder.lz_1;
        tmp.v12_1 = copyToArray(this_0);
        this.w12_1 = compactArray(builder.nz_1);
        var tmp_0 = this;
        // Inline function 'kotlin.collections.toTypedArray' call
        var this_1 = builder.oz_1;
        tmp_0.x12_1 = copyToArray(this_1);
        this.y12_1 = toBooleanArray(builder.pz_1);
        var tmp_1 = this;
        // Inline function 'kotlin.collections.map' call
        var this_2 = withIndex(this.v12_1);
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_2, 10));
        var _iterator__ex2g4s = this_2.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$2 = to(item.co_1, item.bo_1);
          destination.i(tmp$ret$2);
        }
        tmp_1.z12_1 = toMap(destination);
        this.a13_1 = compactArray(typeParameters);
        var tmp_2 = this;
        tmp_2.b13_1 = lazy(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
      }
      j10() {
        return this.q12_1;
      }
      x11() {
        return this.r12_1;
      }
      z11() {
        return this.s12_1;
      }
      a12() {
        return this.t12_1;
      }
      c13() {
        return this.u12_1;
      }
      b12(index) {
        return getChecked(this.v12_1, index);
      }
      c12(name) {
        var tmp0_elvis_lhs = this.z12_1.j3(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
      }
      d12(index) {
        return getChecked(this.x12_1, index);
      }
      e12(index) {
        return getChecked(this.w12_1, index);
      }
      f12(index) {
        return getChecked_0(this.y12_1, index);
      }
      equals(other) {
        var tmp$ret$0;
        $l$block_5: {
          // Inline function 'kotlinx.serialization.internal.equalsImpl' call
          if (this === other) {
            tmp$ret$0 = true;
            break $l$block_5;
          }
          if (!(other instanceof SerialDescriptorImpl())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(this.j10() === other.j10())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!contentEquals(this.a13_1, other.a13_1)) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(this.z11() === other.z11())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          var inductionVariable = 0;
          var last = this.z11();
          if (inductionVariable < last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              if (!(this.e12(index).j10() === other.e12(index).j10())) {
                tmp$ret$0 = false;
                break $l$block_5;
              }
              if (!equals(this.e12(index).x11(), other.e12(index).x11())) {
                tmp$ret$0 = false;
                break $l$block_5;
              }
            }
             while (inductionVariable < last);
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
      hashCode() {
        return _get__hashCode__tgwhef(this);
      }
      toString() {
        return toStringImpl(this);
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    initMetadataForClass($, 'SerialDescriptorImpl', VOID, VOID, [SerialDescriptor(), CachedNames()]);
    SerialDescriptorImplClass = $;
  }
  return SerialDescriptorImplClass;
}
function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
  var tmp;
  if (builderAction === VOID) {
    tmp = buildClassSerialDescriptor$lambda;
  } else {
    tmp = builderAction;
  }
  builderAction = tmp;
  // Inline function 'kotlin.text.isNotBlank' call
  // Inline function 'kotlin.require' call
  if (!!isBlank(serialName)) {
    var message = 'Blank serial names are prohibited';
    throw IllegalArgumentException().q(toString(message));
  }
  var sdBuilder = new (ClassSerialDescriptorBuilder())(serialName);
  builderAction(sdBuilder);
  return new (SerialDescriptorImpl())(serialName, CLASS_getInstance(), sdBuilder.lz_1.c1(), toList(typeParameters), sdBuilder);
}
function PrimitiveSerialDescriptor(serialName, kind) {
  // Inline function 'kotlin.text.isNotBlank' call
  // Inline function 'kotlin.require' call
  if (!!isBlank(serialName)) {
    var message = 'Blank serial names are prohibited';
    throw IllegalArgumentException().q(toString(message));
  }
  return PrimitiveDescriptorSafe(serialName, kind);
}
function SerialDescriptor_0(serialName, original) {
  // Inline function 'kotlin.text.isNotBlank' call
  // Inline function 'kotlin.require' call
  if (!!isBlank(serialName)) {
    var message = 'Blank serial names are prohibited';
    throw IllegalArgumentException().q(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!!(serialName === original.j10())) {
    var message_0 = 'The name of the wrapped descriptor (' + serialName + ') cannot be the same as the name of the original descriptor (' + original.j10() + ')';
    throw IllegalArgumentException().q(toString(message_0));
  }
  var tmp = original.x11();
  if (tmp instanceof PrimitiveKind()) {
    checkNameIsNotAPrimitive(serialName);
  }
  return new (WrappedSerialDescriptor())(serialName, original);
}
var WrappedSerialDescriptorClass;
function WrappedSerialDescriptor() {
  if (WrappedSerialDescriptorClass === VOID) {
    class $ {
      constructor(serialName, original) {
        this.d13_1 = serialName;
        this.e13_1 = original;
      }
      j10() {
        return this.d13_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof WrappedSerialDescriptor()))
          return false;
        return this.d13_1 === other.d13_1 && equals(this.e13_1, other.e13_1);
      }
      hashCode() {
        var result = getStringHashCode(this.d13_1);
        result = imul(31, result) + hashCode(this.e13_1) | 0;
        return result;
      }
      toString() {
        return toStringImpl(this);
      }
      x11() {
        return this.e13_1.x11();
      }
      t11() {
        return this.e13_1.t11();
      }
      y11() {
        return this.e13_1.y11();
      }
      z11() {
        return this.e13_1.z11();
      }
      a12() {
        return this.e13_1.a12();
      }
      b12(index) {
        return this.e13_1.b12(index);
      }
      c12(name) {
        return this.e13_1.c12(name);
      }
      d12(index) {
        return this.e13_1.d12(index);
      }
      e12(index) {
        return this.e13_1.e12(index);
      }
      f12(index) {
        return this.e13_1.f12(index);
      }
    }
    initMetadataForClass($, 'WrappedSerialDescriptor', VOID, VOID, [SerialDescriptor()]);
    WrappedSerialDescriptorClass = $;
  }
  return WrappedSerialDescriptorClass;
}
function buildSerialDescriptor$lambda(_this__u8e3s4) {
  return Unit_instance;
}
function buildClassSerialDescriptor$lambda(_this__u8e3s4) {
  return Unit_instance;
}
//region block: exports
export {
  PrimitiveSerialDescriptor as PrimitiveSerialDescriptor3egfp53lutxj2,
  SerialDescriptor_0 as SerialDescriptorbzxbhtn690r4,
  buildClassSerialDescriptor as buildClassSerialDescriptors2a6xdp6mrtw,
  buildSerialDescriptor as buildSerialDescriptor2873qmkp8r2ib,
};
//endregion

//# sourceMappingURL=SerialDescriptors.mjs.map
