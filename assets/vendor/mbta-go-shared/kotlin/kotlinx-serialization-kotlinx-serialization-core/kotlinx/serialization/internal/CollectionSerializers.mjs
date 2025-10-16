import {
  ArrayListClassDesc2euexqfjnihq7 as ArrayListClassDesc,
  HashSetClassDesc1sva99tssxbb4 as HashSetClassDesc,
  LinkedHashSetClassDesc202cqq5740j6e as LinkedHashSetClassDesc,
  HashMapClassDesc33bep136pd9y6 as HashMapClassDesc,
  LinkedHashMapClassDesc1yxtovbec4ruk as LinkedHashMapClassDesc,
  ArrayClassDesc2voesact8ugbc as ArrayClassDesc,
  PrimitiveArrayDescriptor3bvg9e2uulc3b as PrimitiveArrayDescriptor,
} from './CollectionDescriptors.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  KtSetjrjc7fhfd6b9 as KtSet,
  KtMap140uvy3s5zad8 as KtMap,
  Collection1k04j3hzsbod0 as Collection,
  KtMutableMap1kqeifoi36kpz as KtMutableMap,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isArray1hxjqtqy632bc as isArray,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { HashSet2dzve9y63nf0v as HashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashSet.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LinkedHashSet2tkztfx86kyx2 as LinkedHashSet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashSet.mjs';
import { HashMap1a0ld5kgwhmhv as HashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/HashMap.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { arrayIterator3lgwvgteckzhv as arrayIterator } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { toNativeArrayImpl3ha7yn5cjhfpi as toNativeArrayImpl } from './Platform.mjs';
import { asList2ho2pewtsfvv as asList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  until1jbpn0z3f8lbg as until,
  step18s9qzr5xwxat as step,
} from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { PrimitiveKindndgbuh6is7ze as PrimitiveKind } from '../descriptors/SerialKinds.mjs';
import { getValue48kllevslyh6 as getValue } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var ArrayListSerializerClass;
function ArrayListSerializer() {
  if (ArrayListSerializerClass === VOID) {
    class $ extends CollectionSerializer() {
      constructor(element) {
        super(element);
        this.x16_1 = new (ArrayListClassDesc())(element.fz());
      }
      fz() {
        return this.x16_1;
      }
      y16() {
        // Inline function 'kotlin.collections.arrayListOf' call
        return ArrayList().g1();
      }
      z16(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      a17(_this__u8e3s4) {
        return this.z16(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE());
      }
      b17(_this__u8e3s4) {
        return _this__u8e3s4;
      }
      c17(_this__u8e3s4) {
        return this.b17(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE());
      }
      d17(_this__u8e3s4) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : null;
        return tmp0_elvis_lhs == null ? ArrayList().u(_this__u8e3s4) : tmp0_elvis_lhs;
      }
      e17(_this__u8e3s4) {
        return this.d17((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      f17(_this__u8e3s4, size) {
        return _this__u8e3s4.r8(size);
      }
      g17(_this__u8e3s4, size) {
        return this.f17(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE(), size);
      }
      h17(_this__u8e3s4, index, element) {
        _this__u8e3s4.r3(index, element);
      }
      i17(_this__u8e3s4, index, element) {
        var tmp = _this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE();
        return this.h17(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'ArrayListSerializer');
    ArrayListSerializerClass = $;
  }
  return ArrayListSerializerClass;
}
var HashSetSerializerClass;
function HashSetSerializer() {
  if (HashSetSerializerClass === VOID) {
    class $ extends CollectionSerializer() {
      constructor(eSerializer) {
        super(eSerializer);
        this.t17_1 = new (HashSetClassDesc())(eSerializer.fz());
      }
      fz() {
        return this.t17_1;
      }
      y16() {
        return HashSet().ua();
      }
      u17(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      a17(_this__u8e3s4) {
        return this.u17(_this__u8e3s4 instanceof HashSet() ? _this__u8e3s4 : THROW_CCE());
      }
      v17(_this__u8e3s4) {
        return _this__u8e3s4;
      }
      c17(_this__u8e3s4) {
        return this.v17(_this__u8e3s4 instanceof HashSet() ? _this__u8e3s4 : THROW_CCE());
      }
      w17(_this__u8e3s4) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet() ? _this__u8e3s4 : null;
        return tmp0_elvis_lhs == null ? HashSet().va(_this__u8e3s4) : tmp0_elvis_lhs;
      }
      e17(_this__u8e3s4) {
        return this.w17((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      x17(_this__u8e3s4, size) {
      }
      g17(_this__u8e3s4, size) {
        return this.x17(_this__u8e3s4 instanceof HashSet() ? _this__u8e3s4 : THROW_CCE(), size);
      }
      y17(_this__u8e3s4, index, element) {
        _this__u8e3s4.i(element);
      }
      i17(_this__u8e3s4, index, element) {
        var tmp = _this__u8e3s4 instanceof HashSet() ? _this__u8e3s4 : THROW_CCE();
        return this.y17(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'HashSetSerializer');
    HashSetSerializerClass = $;
  }
  return HashSetSerializerClass;
}
var LinkedHashSetSerializerClass;
function LinkedHashSetSerializer() {
  if (LinkedHashSetSerializerClass === VOID) {
    class $ extends CollectionSerializer() {
      constructor(eSerializer) {
        super(eSerializer);
        this.a18_1 = new (LinkedHashSetClassDesc())(eSerializer.fz());
      }
      fz() {
        return this.a18_1;
      }
      y16() {
        // Inline function 'kotlin.collections.linkedSetOf' call
        return LinkedHashSet().f1();
      }
      b18(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      a17(_this__u8e3s4) {
        return this.b18(_this__u8e3s4 instanceof LinkedHashSet() ? _this__u8e3s4 : THROW_CCE());
      }
      c18(_this__u8e3s4) {
        return _this__u8e3s4;
      }
      c17(_this__u8e3s4) {
        return this.c18(_this__u8e3s4 instanceof LinkedHashSet() ? _this__u8e3s4 : THROW_CCE());
      }
      w17(_this__u8e3s4) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet() ? _this__u8e3s4 : null;
        return tmp0_elvis_lhs == null ? LinkedHashSet().i1(_this__u8e3s4) : tmp0_elvis_lhs;
      }
      e17(_this__u8e3s4) {
        return this.w17((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtSet()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      d18(_this__u8e3s4, size) {
      }
      g17(_this__u8e3s4, size) {
        return this.d18(_this__u8e3s4 instanceof LinkedHashSet() ? _this__u8e3s4 : THROW_CCE(), size);
      }
      e18(_this__u8e3s4, index, element) {
        _this__u8e3s4.i(element);
      }
      i17(_this__u8e3s4, index, element) {
        var tmp = _this__u8e3s4 instanceof LinkedHashSet() ? _this__u8e3s4 : THROW_CCE();
        return this.e18(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'LinkedHashSetSerializer');
    LinkedHashSetSerializerClass = $;
  }
  return LinkedHashSetSerializerClass;
}
var HashMapSerializerClass;
function HashMapSerializer() {
  if (HashMapSerializerClass === VOID) {
    class $ extends MapLikeSerializer() {
      constructor(kSerializer, vSerializer) {
        super(kSerializer, vSerializer);
        this.h18_1 = new (HashMapClassDesc())(kSerializer.fz(), vSerializer.fz());
      }
      fz() {
        return this.h18_1;
      }
      i18(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      j18(_this__u8e3s4) {
        return this.i18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      k18(_this__u8e3s4) {
        // Inline function 'kotlin.collections.iterator' call
        return _this__u8e3s4.t1().x();
      }
      l18(_this__u8e3s4) {
        return this.k18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      y16() {
        return HashMap().a9();
      }
      m18(_this__u8e3s4) {
        return imul(_this__u8e3s4.c1(), 2);
      }
      a17(_this__u8e3s4) {
        return this.m18(_this__u8e3s4 instanceof HashMap() ? _this__u8e3s4 : THROW_CCE());
      }
      n18(_this__u8e3s4) {
        return _this__u8e3s4;
      }
      c17(_this__u8e3s4) {
        return this.n18(_this__u8e3s4 instanceof HashMap() ? _this__u8e3s4 : THROW_CCE());
      }
      o18(_this__u8e3s4) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap() ? _this__u8e3s4 : null;
        return tmp0_elvis_lhs == null ? HashMap().p9(_this__u8e3s4) : tmp0_elvis_lhs;
      }
      e17(_this__u8e3s4) {
        return this.o18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      p18(_this__u8e3s4, size) {
      }
      g17(_this__u8e3s4, size) {
        return this.p18(_this__u8e3s4 instanceof HashMap() ? _this__u8e3s4 : THROW_CCE(), size);
      }
    }
    initMetadataForClass($, 'HashMapSerializer');
    HashMapSerializerClass = $;
  }
  return HashMapSerializerClass;
}
var LinkedHashMapSerializerClass;
function LinkedHashMapSerializer() {
  if (LinkedHashMapSerializerClass === VOID) {
    class $ extends MapLikeSerializer() {
      constructor(kSerializer, vSerializer) {
        super(kSerializer, vSerializer);
        this.w18_1 = new (LinkedHashMapClassDesc())(kSerializer.fz(), vSerializer.fz());
      }
      fz() {
        return this.w18_1;
      }
      i18(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      j18(_this__u8e3s4) {
        return this.i18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      k18(_this__u8e3s4) {
        // Inline function 'kotlin.collections.iterator' call
        return _this__u8e3s4.t1().x();
      }
      l18(_this__u8e3s4) {
        return this.k18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      y16() {
        return LinkedHashMap().sc();
      }
      x18(_this__u8e3s4) {
        return imul(_this__u8e3s4.c1(), 2);
      }
      a17(_this__u8e3s4) {
        return this.x18(_this__u8e3s4 instanceof LinkedHashMap() ? _this__u8e3s4 : THROW_CCE());
      }
      y18(_this__u8e3s4) {
        return _this__u8e3s4;
      }
      c17(_this__u8e3s4) {
        return this.y18(_this__u8e3s4 instanceof LinkedHashMap() ? _this__u8e3s4 : THROW_CCE());
      }
      o18(_this__u8e3s4) {
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap() ? _this__u8e3s4 : null;
        return tmp0_elvis_lhs == null ? LinkedHashMap().uc(_this__u8e3s4) : tmp0_elvis_lhs;
      }
      e17(_this__u8e3s4) {
        return this.o18((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      z18(_this__u8e3s4, size) {
      }
      g17(_this__u8e3s4, size) {
        return this.z18(_this__u8e3s4 instanceof LinkedHashMap() ? _this__u8e3s4 : THROW_CCE(), size);
      }
    }
    initMetadataForClass($, 'LinkedHashMapSerializer');
    LinkedHashMapSerializerClass = $;
  }
  return LinkedHashMapSerializerClass;
}
var ReferenceArraySerializerClass;
function ReferenceArraySerializer() {
  if (ReferenceArraySerializerClass === VOID) {
    class $ extends CollectionLikeSerializer() {
      constructor(kClass, eSerializer) {
        super(eSerializer);
        this.b19_1 = kClass;
        this.c19_1 = new (ArrayClassDesc())(eSerializer.fz());
      }
      fz() {
        return this.c19_1;
      }
      d19(_this__u8e3s4) {
        return _this__u8e3s4.length;
      }
      j18(_this__u8e3s4) {
        return this.d19((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      e19(_this__u8e3s4) {
        return arrayIterator(_this__u8e3s4);
      }
      l18(_this__u8e3s4) {
        return this.e19((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      y16() {
        // Inline function 'kotlin.collections.arrayListOf' call
        return ArrayList().g1();
      }
      f19(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      a17(_this__u8e3s4) {
        return this.f19(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE());
      }
      g19(_this__u8e3s4) {
        return toNativeArrayImpl(_this__u8e3s4, this.b19_1);
      }
      c17(_this__u8e3s4) {
        return this.g19(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE());
      }
      h19(_this__u8e3s4) {
        return ArrayList().u(asList(_this__u8e3s4));
      }
      e17(_this__u8e3s4) {
        return this.h19((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      i19(_this__u8e3s4, size) {
        return _this__u8e3s4.r8(size);
      }
      g17(_this__u8e3s4, size) {
        return this.i19(_this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE(), size);
      }
      j19(_this__u8e3s4, index, element) {
        _this__u8e3s4.r3(index, element);
      }
      i17(_this__u8e3s4, index, element) {
        var tmp = _this__u8e3s4 instanceof ArrayList() ? _this__u8e3s4 : THROW_CCE();
        return this.j19(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
    }
    initMetadataForClass($, 'ReferenceArraySerializer');
    ReferenceArraySerializerClass = $;
  }
  return ReferenceArraySerializerClass;
}
var CollectionSerializerClass;
function CollectionSerializer() {
  if (CollectionSerializerClass === VOID) {
    class $ extends CollectionLikeSerializer() {
      k17(_this__u8e3s4) {
        return _this__u8e3s4.c1();
      }
      j18(_this__u8e3s4) {
        return this.k17((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      l17(_this__u8e3s4) {
        return _this__u8e3s4.x();
      }
      l18(_this__u8e3s4) {
        return this.l17((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
    }
    initMetadataForClass($, 'CollectionSerializer');
    CollectionSerializerClass = $;
  }
  return CollectionSerializerClass;
}
var MapLikeSerializerClass;
function MapLikeSerializer() {
  if (MapLikeSerializerClass === VOID) {
    class $ extends AbstractCollectionSerializer() {
      constructor(keySerializer, valueSerializer) {
        super();
        this.q18_1 = keySerializer;
        this.r18_1 = valueSerializer;
      }
      s18(decoder, builder, startIndex, size) {
        // Inline function 'kotlin.require' call
        if (!(size >= 0)) {
          var message = 'Size must be known in advance when using READ_ALL';
          throw IllegalArgumentException().q(toString(message));
        }
        var progression = step(until(0, imul(size, 2)), 2);
        var inductionVariable = progression.x1_1;
        var last = progression.y1_1;
        var step_0 = progression.z1_1;
        if (step_0 > 0 && inductionVariable <= last || (step_0 < 0 && last <= inductionVariable))
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + step_0 | 0;
            this.t18(decoder, startIndex + index | 0, builder, false);
          }
           while (!(index === last));
      }
      o17(decoder, builder, startIndex, size) {
        return this.s18(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap()) : false) ? builder : THROW_CCE(), startIndex, size);
      }
      t18(decoder, index, builder, checkIndex) {
        var key = decoder.i14(this.fz(), index, this.q18_1);
        var tmp;
        if (checkIndex) {
          // Inline function 'kotlin.also' call
          var this_0 = decoder.m14(this.fz());
          // Inline function 'kotlin.require' call
          if (!(this_0 === (index + 1 | 0))) {
            var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
            throw IllegalArgumentException().q(toString(message));
          }
          tmp = this_0;
        } else {
          tmp = index + 1 | 0;
        }
        var vIndex = tmp;
        var tmp_0;
        var tmp_1;
        if (builder.h3(key)) {
          var tmp_2 = this.r18_1.fz().x11();
          tmp_1 = !(tmp_2 instanceof PrimitiveKind());
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = decoder.h14(this.fz(), vIndex, this.r18_1, getValue(builder, key));
        } else {
          tmp_0 = decoder.i14(this.fz(), vIndex, this.r18_1);
        }
        var value = tmp_0;
        // Inline function 'kotlin.collections.set' call
        builder.t3(key, value);
      }
      p17(decoder, index, builder, checkIndex) {
        return this.t18(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap()) : false) ? builder : THROW_CCE(), checkIndex);
      }
      n17(encoder, value) {
        var size = this.j18(value);
        // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
        var descriptor = this.fz();
        var composite = encoder.s15(descriptor, size);
        var iterator = this.l18(value);
        var index = 0;
        // Inline function 'kotlin.collections.forEach' call
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = iterator;
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var k = element.u1();
          // Inline function 'kotlin.collections.component2' call
          var v = element.v1();
          var tmp = this.fz();
          var _unary__edvuaz = index;
          index = _unary__edvuaz + 1 | 0;
          composite.n15(tmp, _unary__edvuaz, this.q18_1, k);
          var tmp_0 = this.fz();
          var _unary__edvuaz_0 = index;
          index = _unary__edvuaz_0 + 1 | 0;
          composite.n15(tmp_0, _unary__edvuaz_0, this.r18_1, v);
        }
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.n17(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
    }
    initMetadataForClass($, 'MapLikeSerializer');
    MapLikeSerializerClass = $;
  }
  return MapLikeSerializerClass;
}
var CollectionLikeSerializerClass;
function CollectionLikeSerializer() {
  if (CollectionLikeSerializerClass === VOID) {
    class $ extends AbstractCollectionSerializer() {
      constructor(elementSerializer) {
        super();
        this.m17_1 = elementSerializer;
      }
      n17(encoder, value) {
        var size = this.j18(value);
        // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
        var descriptor = this.fz();
        var composite = encoder.s15(descriptor, size);
        var iterator = this.l18(value);
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            composite.n15(this.fz(), index, this.m17_1, iterator.z());
          }
           while (inductionVariable < size);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.n17(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
      o17(decoder, builder, startIndex, size) {
        // Inline function 'kotlin.require' call
        if (!(size >= 0)) {
          var message = 'Size must be known in advance when using READ_ALL';
          throw IllegalArgumentException().q(toString(message));
        }
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.p17(decoder, startIndex + index | 0, builder, false);
          }
           while (inductionVariable < size);
      }
      p17(decoder, index, builder, checkIndex) {
        this.i17(builder, index, decoder.i14(this.fz(), index, this.m17_1));
      }
    }
    initMetadataForClass($, 'CollectionLikeSerializer');
    CollectionLikeSerializerClass = $;
  }
  return CollectionLikeSerializerClass;
}
function readSize($this, decoder, builder) {
  var size = decoder.n14($this.fz());
  $this.g17(builder, size);
  return size;
}
var AbstractCollectionSerializerClass;
function AbstractCollectionSerializer() {
  if (AbstractCollectionSerializerClass === VOID) {
    class $ {
      r17(decoder, previous) {
        var tmp1_elvis_lhs = previous == null ? null : this.e17(previous);
        var builder = tmp1_elvis_lhs == null ? this.y16() : tmp1_elvis_lhs;
        var startIndex = this.a17(builder);
        var compositeDecoder = decoder.v13(this.fz());
        if (compositeDecoder.l14()) {
          this.o17(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
        } else {
          $l$loop: while (true) {
            var index = compositeDecoder.m14(this.fz());
            if (index === -1)
              break $l$loop;
            this.q17(compositeDecoder, startIndex + index | 0, builder);
          }
        }
        compositeDecoder.w13(this.fz());
        return this.c17(builder);
      }
      hz(decoder) {
        return this.r17(decoder, null);
      }
      q17(decoder, index, builder, checkIndex, $super) {
        checkIndex = checkIndex === VOID ? true : checkIndex;
        var tmp;
        if ($super === VOID) {
          this.p17(decoder, index, builder, checkIndex);
          tmp = Unit_instance;
        } else {
          tmp = $super.p17.call(this, decoder, index, builder, checkIndex);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'AbstractCollectionSerializer', VOID, VOID, [KSerializer()]);
    AbstractCollectionSerializerClass = $;
  }
  return AbstractCollectionSerializerClass;
}
var PrimitiveArraySerializerClass;
function PrimitiveArraySerializer() {
  if (PrimitiveArraySerializerClass === VOID) {
    class $ extends CollectionLikeSerializer() {
      constructor(primitiveSerializer) {
        super(primitiveSerializer);
        this.l19_1 = new (PrimitiveArrayDescriptor())(primitiveSerializer.fz());
      }
      fz() {
        return this.l19_1;
      }
      m19(_this__u8e3s4) {
        return _this__u8e3s4.n19();
      }
      a17(_this__u8e3s4) {
        return this.m19(_this__u8e3s4 instanceof PrimitiveArrayBuilder() ? _this__u8e3s4 : THROW_CCE());
      }
      o19(_this__u8e3s4) {
        return _this__u8e3s4.p19();
      }
      c17(_this__u8e3s4) {
        return this.o19(_this__u8e3s4 instanceof PrimitiveArrayBuilder() ? _this__u8e3s4 : THROW_CCE());
      }
      q19(_this__u8e3s4, size) {
        return _this__u8e3s4.r19(size);
      }
      g17(_this__u8e3s4, size) {
        return this.q19(_this__u8e3s4 instanceof PrimitiveArrayBuilder() ? _this__u8e3s4 : THROW_CCE(), size);
      }
      s19(_this__u8e3s4) {
        var message = 'This method lead to boxing and must not be used, use writeContents instead';
        throw IllegalStateException().o5(toString(message));
      }
      l18(_this__u8e3s4) {
        return this.s19((_this__u8e3s4 == null ? true : !(_this__u8e3s4 == null)) ? _this__u8e3s4 : THROW_CCE());
      }
      t19(_this__u8e3s4, index, element) {
        var message = 'This method lead to boxing and must not be used, use Builder.append instead';
        throw IllegalStateException().o5(toString(message));
      }
      i17(_this__u8e3s4, index, element) {
        var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder() ? _this__u8e3s4 : THROW_CCE();
        return this.t19(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      y16() {
        return this.e17(this.u19());
      }
      x19(encoder, value) {
        var size = this.j18(value);
        // Inline function 'kotlinx.serialization.encoding.encodeCollection' call
        var descriptor = this.l19_1;
        var composite = encoder.s15(descriptor, size);
        this.w19(composite, value, size);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.x19(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
      n17(encoder, value) {
        return this.x19(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
      hz(decoder) {
        return this.r17(decoder, null);
      }
    }
    initMetadataForClass($, 'PrimitiveArraySerializer');
    PrimitiveArraySerializerClass = $;
  }
  return PrimitiveArraySerializerClass;
}
var PrimitiveArrayBuilderClass;
function PrimitiveArrayBuilder() {
  if (PrimitiveArrayBuilderClass === VOID) {
    class $ {
      y19(requiredCapacity, $super) {
        requiredCapacity = requiredCapacity === VOID ? this.n19() + 1 | 0 : requiredCapacity;
        var tmp;
        if ($super === VOID) {
          this.r19(requiredCapacity);
          tmp = Unit_instance;
        } else {
          tmp = $super.r19.call(this, requiredCapacity);
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'PrimitiveArrayBuilder');
    PrimitiveArrayBuilderClass = $;
  }
  return PrimitiveArrayBuilderClass;
}
//region block: exports
export {
  ArrayListSerializer as ArrayListSerializer7k5wnrulb3y6,
  HashMapSerializer as HashMapSerializer10v33y6rrzgrh,
  HashSetSerializer as HashSetSerializer1nieavib0jif1,
  LinkedHashMapSerializer as LinkedHashMapSerializermaoj2nyji7op,
  LinkedHashSetSerializer as LinkedHashSetSerializer3ncla559t2lx7,
  PrimitiveArrayBuilder as PrimitiveArrayBuilder1tzna3i4eqw54,
  PrimitiveArraySerializer as PrimitiveArraySerializer6xcmeltdozbx,
  ReferenceArraySerializer as ReferenceArraySerializer3juj1vqolxkrs,
};
//endregion

//# sourceMappingURL=CollectionSerializers.mjs.map
