import {
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  contentHashCode2i020q5tbeh2s as contentHashCode,
  contentEqualsaf55p28mnw74 as contentEquals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  get_elementDescriptors13xxljc24xo44 as get_elementDescriptors,
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
} from '../descriptors/SerialDescriptor.mjs';
import { until1jbpn0z3f8lbg as until } from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { get_EMPTY_SERIALIZER_ARRAY2gyuhuf2kalz as get_EMPTY_SERIALIZER_ARRAY } from './PluginHelperInterfaces.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { compactArray1b2nl9rkq8nuz as compactArray } from './Platform.common.mjs';
import { booleanArray2jdug9b51huk7 as booleanArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { CLASS_getInstance14ex35co4jkrb as CLASS_getInstance } from '../descriptors/SerialKinds.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  getChecked1o70dkx10jwym as getChecked,
  getChecked3avs2psuwt1xd as getChecked_0,
} from './Platform.mjs';
import { CachedNames2minxlyafeo07 as CachedNames } from './CachedNames.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function hashCodeImpl(_this__u8e3s4, typeParams) {
  var result = getStringHashCode(_this__u8e3s4.j10());
  result = imul(31, result) + contentHashCode(typeParams) | 0;
  var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
  // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
  // Inline function 'kotlin.collections.fold' call
  var accumulator = 1;
  var _iterator__ex2g4s = elementDescriptors.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var hash = accumulator;
    var tmp = imul(31, hash);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = element.j10();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
  }
  var namesHash = accumulator;
  // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
  // Inline function 'kotlin.collections.fold' call
  var accumulator_0 = 1;
  var _iterator__ex2g4s_0 = elementDescriptors.x();
  while (_iterator__ex2g4s_0.y()) {
    var element_0 = _iterator__ex2g4s_0.z();
    var hash_0 = accumulator_0;
    var tmp_0 = imul(31, hash_0);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = element_0.x11();
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
  }
  var kindHash = accumulator_0;
  result = imul(31, result) + namesHash | 0;
  result = imul(31, result) + kindHash | 0;
  return result;
}
function toStringImpl(_this__u8e3s4) {
  var tmp = until(0, _this__u8e3s4.z11());
  var tmp_0 = _this__u8e3s4.j10() + '(';
  return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, toStringImpl$lambda(_this__u8e3s4));
}
function _get_childSerializers__7vnyfa($this) {
  var tmp0 = $this.p1a_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('childSerializers', 1, tmp, PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca(), null);
  return tmp0.v1();
}
function _get__hashCode__tgwhef($this) {
  var tmp0 = $this.r1a_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('_hashCode', 1, tmp, PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz(), null);
  return tmp0.v1();
}
function buildIndices($this) {
  var indices = HashMap().a9();
  var inductionVariable = 0;
  var last = $this.k1a_1.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.set' call
      var key = $this.k1a_1[i];
      indices.t3(key, i);
    }
     while (inductionVariable <= last);
  return indices;
}
function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
  return function () {
    var tmp0_safe_receiver = this$0.h1a_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f1c();
    return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
  };
}
function PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca() {
  return function (p0) {
    return _get_childSerializers__7vnyfa(p0);
  };
}
function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
  return function () {
    var tmp0_safe_receiver = this$0.h1a_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g1c();
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList().w(tmp1_safe_receiver.length);
      var inductionVariable = 0;
      var last = tmp1_safe_receiver.length;
      while (inductionVariable < last) {
        var item = tmp1_safe_receiver[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        var tmp$ret$0 = item.fz();
        destination.i(tmp$ret$0);
      }
      tmp = destination;
    }
    return compactArray(tmp);
  };
}
function PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka() {
  return function (p0) {
    return p0.o1b();
  };
}
function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
  return function () {
    return hashCodeImpl(this$0, this$0.o1b());
  };
}
function PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz() {
  return function (p0) {
    return _get__hashCode__tgwhef(p0);
  };
}
var PluginGeneratedSerialDescriptorClass;
function PluginGeneratedSerialDescriptor() {
  if (PluginGeneratedSerialDescriptorClass === VOID) {
    class $ {
      constructor(serialName, generatedSerializer, elementsCount) {
        generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
        this.g1a_1 = serialName;
        this.h1a_1 = generatedSerializer;
        this.i1a_1 = elementsCount;
        this.j1a_1 = -1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = this.i1a_1;
        // Inline function 'kotlin.arrayOfNulls' call
        var tmp_2 = Array(tmp_1);
        while (tmp_0 < tmp_1) {
          tmp_2[tmp_0] = '[UNINITIALIZED]';
          tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.k1a_1 = tmp_2;
        var tmp_3 = this;
        // Inline function 'kotlin.arrayOfNulls' call
        var size = this.i1a_1;
        tmp_3.l1a_1 = Array(size);
        this.m1a_1 = null;
        this.n1a_1 = booleanArray(this.i1a_1);
        this.o1a_1 = emptyMap();
        var tmp_4 = this;
        var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_4.p1a_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
        var tmp_6 = this;
        var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_6.q1a_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
        var tmp_8 = this;
        var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_8.r1a_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
      }
      j10() {
        return this.g1a_1;
      }
      z11() {
        return this.i1a_1;
      }
      x11() {
        return CLASS_getInstance();
      }
      a12() {
        var tmp0_elvis_lhs = this.m1a_1;
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      }
      c13() {
        return this.o1a_1.k3();
      }
      o1b() {
        var tmp0 = this.q1a_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('typeParameterDescriptors', 1, tmp, PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka(), null);
        return tmp0.v1();
      }
      p1b(name, isOptional) {
        this.j1a_1 = this.j1a_1 + 1 | 0;
        this.k1a_1[this.j1a_1] = name;
        this.n1a_1[this.j1a_1] = isOptional;
        this.l1a_1[this.j1a_1] = null;
        if (this.j1a_1 === (this.i1a_1 - 1 | 0)) {
          this.o1a_1 = buildIndices(this);
        }
      }
      t1a(name, isOptional, $super) {
        isOptional = isOptional === VOID ? false : isOptional;
        var tmp;
        if ($super === VOID) {
          this.p1b(name, isOptional);
          tmp = Unit_instance;
        } else {
          tmp = $super.p1b.call(this, name, isOptional);
        }
        return tmp;
      }
      u1a(annotation) {
        // Inline function 'kotlin.let' call
        var it = this.l1a_1[this.j1a_1];
        var tmp;
        if (it == null) {
          var result = ArrayList().w(1);
          this.l1a_1[this.j1a_1] = result;
          tmp = result;
        } else {
          tmp = it;
        }
        var list = tmp;
        list.i(annotation);
      }
      s1a(a) {
        if (this.m1a_1 == null) {
          this.m1a_1 = ArrayList().w(1);
        }
        ensureNotNull(this.m1a_1).i(a);
      }
      e12(index) {
        return getChecked(_get_childSerializers__7vnyfa(this), index).fz();
      }
      f12(index) {
        return getChecked_0(this.n1a_1, index);
      }
      d12(index) {
        var tmp0_elvis_lhs = getChecked(this.l1a_1, index);
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      }
      b12(index) {
        return getChecked(this.k1a_1, index);
      }
      c12(name) {
        var tmp0_elvis_lhs = this.o1a_1.j3(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
      }
      equals(other) {
        var tmp$ret$0;
        $l$block_5: {
          // Inline function 'kotlinx.serialization.internal.equalsImpl' call
          if (this === other) {
            tmp$ret$0 = true;
            break $l$block_5;
          }
          if (!(other instanceof PluginGeneratedSerialDescriptor())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!(this.j10() === other.j10())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!contentEquals(this.o1b(), other.o1b())) {
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
    initMetadataForClass($, 'PluginGeneratedSerialDescriptor', VOID, VOID, [SerialDescriptor(), CachedNames()]);
    PluginGeneratedSerialDescriptorClass = $;
  }
  return PluginGeneratedSerialDescriptorClass;
}
function toStringImpl$lambda($this_toStringImpl) {
  return function (i) {
    return $this_toStringImpl.b12(i) + ': ' + $this_toStringImpl.e12(i).j10();
  };
}
//region block: exports
export {
  PluginGeneratedSerialDescriptor as PluginGeneratedSerialDescriptorqdzeg5asqhfg,
  hashCodeImpl as hashCodeImplfv8qiy3re24s,
  toStringImpl as toStringImpl1y3u8fza7vdq,
};
//endregion

//# sourceMappingURL=PluginGeneratedSerialDescriptor.mjs.map
