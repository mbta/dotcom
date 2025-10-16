import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Entry2xmjmyutzoq3p as Entry } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { MAP_getInstance3s1t6byguxmp9 as MAP_getInstance } from '../descriptors/SerialKinds.mjs';
import {
  buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor,
  buildClassSerialDescriptors2a6xdp6mrtw as buildClassSerialDescriptor,
} from '../descriptors/SerialDescriptors.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  Paire9pteg33gng7 as Pair,
  to2cs3ny02qtbcb as to,
  Triple1vhi3d0dgpnjb as Triple,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Tuples.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../SerializationExceptions.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_NULL() {
  _init_properties_Tuples_kt__dz0qyd();
  return NULL;
}
var NULL;
var MapEntryClass;
function MapEntry() {
  if (MapEntryClass === VOID) {
    class $ {
      constructor(key, value) {
        this.d1j_1 = key;
        this.e1j_1 = value;
      }
      u1() {
        return this.d1j_1;
      }
      v1() {
        return this.e1j_1;
      }
      toString() {
        return 'MapEntry(key=' + toString(this.d1j_1) + ', value=' + toString(this.e1j_1) + ')';
      }
      hashCode() {
        var result = this.d1j_1 == null ? 0 : hashCode(this.d1j_1);
        result = imul(result, 31) + (this.e1j_1 == null ? 0 : hashCode(this.e1j_1)) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof MapEntry()))
          return false;
        var tmp0_other_with_cast = other instanceof MapEntry() ? other : THROW_CCE();
        if (!equals(this.d1j_1, tmp0_other_with_cast.d1j_1))
          return false;
        if (!equals(this.e1j_1, tmp0_other_with_cast.e1j_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'MapEntry', VOID, VOID, [Entry()]);
    MapEntryClass = $;
  }
  return MapEntryClass;
}
function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
  return function ($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.qz('key', $keySerializer.fz());
    $this$buildSerialDescriptor.qz('value', $valueSerializer.fz());
    return Unit_instance;
  };
}
var MapEntrySerializerClass;
function MapEntrySerializer() {
  if (MapEntrySerializerClass === VOID) {
    class $ extends KeyValueSerializer() {
      constructor(keySerializer, valueSerializer) {
        super(keySerializer, valueSerializer);
        var tmp = this;
        var tmp_0 = MAP_getInstance();
        tmp.h1j_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
      }
      fz() {
        return this.h1j_1;
      }
      i1j(_this__u8e3s4) {
        return _this__u8e3s4.u1();
      }
      j1j(_this__u8e3s4) {
        return this.i1j((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      k1j(_this__u8e3s4) {
        return _this__u8e3s4.v1();
      }
      l1j(_this__u8e3s4) {
        return this.k1j((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Entry()) : false) ? _this__u8e3s4 : THROW_CCE());
      }
      m1j(key, value) {
        return new (MapEntry())(key, value);
      }
    }
    initMetadataForClass($, 'MapEntrySerializer');
    MapEntrySerializerClass = $;
  }
  return MapEntrySerializerClass;
}
function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
  return function ($this$buildClassSerialDescriptor) {
    $this$buildClassSerialDescriptor.qz('first', $keySerializer.fz());
    $this$buildClassSerialDescriptor.qz('second', $valueSerializer.fz());
    return Unit_instance;
  };
}
var PairSerializerClass;
function PairSerializer() {
  if (PairSerializerClass === VOID) {
    class $ extends KeyValueSerializer() {
      constructor(keySerializer, valueSerializer) {
        super(keySerializer, valueSerializer);
        var tmp = this;
        tmp.s1j_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
      }
      fz() {
        return this.s1j_1;
      }
      t1j(_this__u8e3s4) {
        return _this__u8e3s4.ah_1;
      }
      j1j(_this__u8e3s4) {
        return this.t1j(_this__u8e3s4 instanceof Pair() ? _this__u8e3s4 : THROW_CCE());
      }
      u1j(_this__u8e3s4) {
        return _this__u8e3s4.bh_1;
      }
      l1j(_this__u8e3s4) {
        return this.u1j(_this__u8e3s4 instanceof Pair() ? _this__u8e3s4 : THROW_CCE());
      }
      m1j(key, value) {
        return to(key, value);
      }
    }
    initMetadataForClass($, 'PairSerializer');
    PairSerializerClass = $;
  }
  return PairSerializerClass;
}
function decodeSequentially($this, composite) {
  var a = composite.i14($this.y1j_1, 0, $this.v1j_1);
  var b = composite.i14($this.y1j_1, 1, $this.w1j_1);
  var c = composite.i14($this.y1j_1, 2, $this.x1j_1);
  composite.w13($this.y1j_1);
  return new (Triple())(a, b, c);
}
function decodeStructure($this, composite) {
  var a = get_NULL();
  var b = get_NULL();
  var c = get_NULL();
  mainLoop: while (true) {
    var index = composite.m14($this.y1j_1);
    switch (index) {
      case -1:
        break mainLoop;
      case 0:
        a = composite.i14($this.y1j_1, 0, $this.v1j_1);
        break;
      case 1:
        b = composite.i14($this.y1j_1, 1, $this.w1j_1);
        break;
      case 2:
        c = composite.i14($this.y1j_1, 2, $this.x1j_1);
        break;
      default:
        throw SerializationException().w10('Unexpected index ' + index);
    }
  }
  composite.w13($this.y1j_1);
  if (a === get_NULL())
    throw SerializationException().w10("Element 'first' is missing");
  if (b === get_NULL())
    throw SerializationException().w10("Element 'second' is missing");
  if (c === get_NULL())
    throw SerializationException().w10("Element 'third' is missing");
  var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
  var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
  return new (Triple())(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
}
function TripleSerializer$descriptor$lambda(this$0) {
  return function ($this$buildClassSerialDescriptor) {
    $this$buildClassSerialDescriptor.qz('first', this$0.v1j_1.fz());
    $this$buildClassSerialDescriptor.qz('second', this$0.w1j_1.fz());
    $this$buildClassSerialDescriptor.qz('third', this$0.x1j_1.fz());
    return Unit_instance;
  };
}
var TripleSerializerClass;
function TripleSerializer() {
  if (TripleSerializerClass === VOID) {
    class $ {
      constructor(aSerializer, bSerializer, cSerializer) {
        this.v1j_1 = aSerializer;
        this.w1j_1 = bSerializer;
        this.x1j_1 = cSerializer;
        var tmp = this;
        tmp.y1j_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
      }
      fz() {
        return this.y1j_1;
      }
      z1j(encoder, value) {
        var structuredEncoder = encoder.v13(this.y1j_1);
        structuredEncoder.n15(this.y1j_1, 0, this.v1j_1, value.zw_1);
        structuredEncoder.n15(this.y1j_1, 1, this.w1j_1, value.ax_1);
        structuredEncoder.n15(this.y1j_1, 2, this.x1j_1, value.bx_1);
        structuredEncoder.w13(this.y1j_1);
      }
      gz(encoder, value) {
        return this.z1j(encoder, value instanceof Triple() ? value : THROW_CCE());
      }
      hz(decoder) {
        var composite = decoder.v13(this.y1j_1);
        if (composite.l14()) {
          return decodeSequentially(this, composite);
        }
        return decodeStructure(this, composite);
      }
    }
    initMetadataForClass($, 'TripleSerializer', VOID, VOID, [KSerializer()]);
    TripleSerializerClass = $;
  }
  return TripleSerializerClass;
}
var KeyValueSerializerClass;
function KeyValueSerializer() {
  if (KeyValueSerializerClass === VOID) {
    class $ {
      constructor(keySerializer, valueSerializer) {
        this.n1j_1 = keySerializer;
        this.o1j_1 = valueSerializer;
      }
      p1j(encoder, value) {
        var structuredEncoder = encoder.v13(this.fz());
        structuredEncoder.n15(this.fz(), 0, this.n1j_1, this.j1j(value));
        structuredEncoder.n15(this.fz(), 1, this.o1j_1, this.l1j(value));
        structuredEncoder.w13(this.fz());
      }
      gz(encoder, value) {
        return this.p1j(encoder, (value == null ? true : !(value == null)) ? value : THROW_CCE());
      }
      hz(decoder) {
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        var tmp$ret$0;
        $l$block: {
          if (composite.l14()) {
            var key = composite.i14(this.fz(), 0, this.n1j_1);
            var value = composite.i14(this.fz(), 1, this.o1j_1);
            tmp$ret$0 = this.m1j(key, value);
            break $l$block;
          }
          var key_0 = get_NULL();
          var value_0 = get_NULL();
          mainLoop: while (true) {
            var idx = composite.m14(this.fz());
            switch (idx) {
              case -1:
                break mainLoop;
              case 0:
                key_0 = composite.i14(this.fz(), 0, this.n1j_1);
                break;
              case 1:
                value_0 = composite.i14(this.fz(), 1, this.o1j_1);
                break;
              default:
                throw SerializationException().w10('Invalid index: ' + idx);
            }
          }
          if (key_0 === get_NULL())
            throw SerializationException().w10("Element 'key' is missing");
          if (value_0 === get_NULL())
            throw SerializationException().w10("Element 'value' is missing");
          var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
          tmp$ret$0 = this.m1j(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
        }
        var result = tmp$ret$0;
        composite.w13(descriptor);
        return result;
      }
    }
    initMetadataForClass($, 'KeyValueSerializer', VOID, VOID, [KSerializer()]);
    KeyValueSerializerClass = $;
  }
  return KeyValueSerializerClass;
}
var properties_initialized_Tuples_kt_3vs7ar;
function _init_properties_Tuples_kt__dz0qyd() {
  if (!properties_initialized_Tuples_kt_3vs7ar) {
    properties_initialized_Tuples_kt_3vs7ar = true;
    NULL = new Object();
  }
}
//region block: exports
export {
  MapEntrySerializer as MapEntrySerializer2ukwamih4zw76,
  PairSerializer as PairSerializerpzh6nuee9oov,
  TripleSerializer as TripleSerializer25andm5j3t9nu,
};
//endregion

//# sourceMappingURL=Tuples.mjs.map
