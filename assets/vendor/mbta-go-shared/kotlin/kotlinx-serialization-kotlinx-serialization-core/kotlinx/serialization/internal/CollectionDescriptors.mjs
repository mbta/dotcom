import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  LIST_getInstancey7k5h8d5cvxt as LIST_getInstance,
  MAP_getInstance3s1t6byguxmp9 as MAP_getInstance,
} from '../descriptors/SerialKinds.mjs';
import { toIntOrNull3w2d066r9pvwm as toIntOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringNumberConversions.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  get_annotationshjxdbdcl8kmv as get_annotations,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
} from '../descriptors/SerialDescriptor.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var ArrayListClassDescClass;
function ArrayListClassDesc() {
  if (ArrayListClassDescClass === VOID) {
    class $ extends ListLikeDescriptor() {
      j10() {
        return 'kotlin.collections.ArrayList';
      }
    }
    initMetadataForClass($, 'ArrayListClassDesc');
    ArrayListClassDescClass = $;
  }
  return ArrayListClassDescClass;
}
var HashSetClassDescClass;
function HashSetClassDesc() {
  if (HashSetClassDescClass === VOID) {
    class $ extends ListLikeDescriptor() {
      j10() {
        return 'kotlin.collections.HashSet';
      }
    }
    initMetadataForClass($, 'HashSetClassDesc');
    HashSetClassDescClass = $;
  }
  return HashSetClassDescClass;
}
var LinkedHashSetClassDescClass;
function LinkedHashSetClassDesc() {
  if (LinkedHashSetClassDescClass === VOID) {
    class $ extends ListLikeDescriptor() {
      j10() {
        return 'kotlin.collections.LinkedHashSet';
      }
    }
    initMetadataForClass($, 'LinkedHashSetClassDesc');
    LinkedHashSetClassDescClass = $;
  }
  return LinkedHashSetClassDescClass;
}
var HashMapClassDescClass;
function HashMapClassDesc() {
  if (HashMapClassDescClass === VOID) {
    class $ extends MapLikeDescriptor() {
      constructor(keyDesc, valueDesc) {
        super('kotlin.collections.HashMap', keyDesc, valueDesc);
      }
    }
    initMetadataForClass($, 'HashMapClassDesc');
    HashMapClassDescClass = $;
  }
  return HashMapClassDescClass;
}
var LinkedHashMapClassDescClass;
function LinkedHashMapClassDesc() {
  if (LinkedHashMapClassDescClass === VOID) {
    class $ extends MapLikeDescriptor() {
      constructor(keyDesc, valueDesc) {
        super('kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
      }
    }
    initMetadataForClass($, 'LinkedHashMapClassDesc');
    LinkedHashMapClassDescClass = $;
  }
  return LinkedHashMapClassDescClass;
}
var ArrayClassDescClass;
function ArrayClassDesc() {
  if (ArrayClassDescClass === VOID) {
    class $ extends ListLikeDescriptor() {
      j10() {
        return 'kotlin.Array';
      }
    }
    initMetadataForClass($, 'ArrayClassDesc');
    ArrayClassDescClass = $;
  }
  return ArrayClassDescClass;
}
var ListLikeDescriptorClass;
function ListLikeDescriptor() {
  if (ListLikeDescriptorClass === VOID) {
    class $ {
      constructor(elementDescriptor) {
        this.h16_1 = elementDescriptor;
        this.i16_1 = 1;
      }
      x11() {
        return LIST_getInstance();
      }
      z11() {
        return this.i16_1;
      }
      b12(index) {
        return index.toString();
      }
      c12(name) {
        var tmp0_elvis_lhs = toIntOrNull(name);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw IllegalArgumentException().q(name + ' is not a valid list index');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      f12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        return false;
      }
      d12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        return emptyList();
      }
      e12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        return this.h16_1;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof ListLikeDescriptor()))
          return false;
        if (equals(this.h16_1, other.h16_1) && this.j10() === other.j10())
          return true;
        return false;
      }
      hashCode() {
        return imul(hashCode(this.h16_1), 31) + getStringHashCode(this.j10()) | 0;
      }
      toString() {
        return this.j10() + '(' + toString(this.h16_1) + ')';
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    protoOf($).a12 = get_annotations;
    initMetadataForClass($, 'ListLikeDescriptor', VOID, VOID, [SerialDescriptor()]);
    ListLikeDescriptorClass = $;
  }
  return ListLikeDescriptorClass;
}
var MapLikeDescriptorClass;
function MapLikeDescriptor() {
  if (MapLikeDescriptorClass === VOID) {
    class $ {
      constructor(serialName, keyDescriptor, valueDescriptor) {
        this.n16_1 = serialName;
        this.o16_1 = keyDescriptor;
        this.p16_1 = valueDescriptor;
        this.q16_1 = 2;
      }
      j10() {
        return this.n16_1;
      }
      x11() {
        return MAP_getInstance();
      }
      z11() {
        return this.q16_1;
      }
      b12(index) {
        return index.toString();
      }
      c12(name) {
        var tmp0_elvis_lhs = toIntOrNull(name);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw IllegalArgumentException().q(name + ' is not a valid map index');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      f12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        return false;
      }
      d12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        return emptyList();
      }
      e12(index) {
        // Inline function 'kotlin.require' call
        if (!(index >= 0)) {
          var message = 'Illegal index ' + index + ', ' + this.j10() + ' expects only non-negative indices';
          throw IllegalArgumentException().q(toString(message));
        }
        var tmp;
        switch (index % 2 | 0) {
          case 0:
            tmp = this.o16_1;
            break;
          case 1:
            tmp = this.p16_1;
            break;
          default:
            var message_0 = 'Unreached';
            throw IllegalStateException().o5(toString(message_0));
        }
        return tmp;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof MapLikeDescriptor()))
          return false;
        if (!(this.j10() === other.j10()))
          return false;
        if (!equals(this.o16_1, other.o16_1))
          return false;
        if (!equals(this.p16_1, other.p16_1))
          return false;
        return true;
      }
      hashCode() {
        var result = getStringHashCode(this.j10());
        result = imul(31, result) + hashCode(this.o16_1) | 0;
        result = imul(31, result) + hashCode(this.p16_1) | 0;
        return result;
      }
      toString() {
        return this.j10() + '(' + toString(this.o16_1) + ', ' + toString(this.p16_1) + ')';
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    protoOf($).a12 = get_annotations;
    initMetadataForClass($, 'MapLikeDescriptor', VOID, VOID, [SerialDescriptor()]);
    MapLikeDescriptorClass = $;
  }
  return MapLikeDescriptorClass;
}
var PrimitiveArrayDescriptorClass;
function PrimitiveArrayDescriptor() {
  if (PrimitiveArrayDescriptorClass === VOID) {
    class $ extends ListLikeDescriptor() {
      constructor(primitive) {
        super(primitive);
        this.v16_1 = primitive.j10() + 'Array';
      }
      j10() {
        return this.v16_1;
      }
    }
    initMetadataForClass($, 'PrimitiveArrayDescriptor');
    PrimitiveArrayDescriptorClass = $;
  }
  return PrimitiveArrayDescriptorClass;
}
//region block: exports
export {
  ArrayClassDesc as ArrayClassDesc2voesact8ugbc,
  ArrayListClassDesc as ArrayListClassDesc2euexqfjnihq7,
  HashMapClassDesc as HashMapClassDesc33bep136pd9y6,
  HashSetClassDesc as HashSetClassDesc1sva99tssxbb4,
  LinkedHashMapClassDesc as LinkedHashMapClassDesc1yxtovbec4ruk,
  LinkedHashSetClassDesc as LinkedHashSetClassDesc202cqq5740j6e,
  PrimitiveArrayDescriptor as PrimitiveArrayDescriptor3bvg9e2uulc3b,
};
//endregion

//# sourceMappingURL=CollectionDescriptors.mjs.map
