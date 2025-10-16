import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  STRING_getInstance2ou4lro9xn2qn as STRING_getInstance,
  CHAR_getInstance2sj4kixvo1pgt as CHAR_getInstance,
  DOUBLE_getInstance2zlgz0a16y0yw as DOUBLE_getInstance,
  FLOAT_getInstance356af47ujn76v as FLOAT_getInstance,
  LONG_getInstance3408a5feo2kfb as LONG_getInstance,
  INT_getInstancev41irj55hx3n as INT_getInstance,
  SHORT_getInstancemixmsyjhae7k as SHORT_getInstance,
  BYTE_getInstance1ja41txt3fdgs as BYTE_getInstance,
  BOOLEAN_getInstance1igfnuwj02kve as BOOLEAN_getInstance,
} from '../descriptors/SerialKinds.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Char19o2r8palgjof as Char } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { ObjectSerializer2kjkucmygguwd as ObjectSerializer } from './ObjectSerializer.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  get_annotationshjxdbdcl8kmv as get_annotations,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
} from '../descriptors/SerialDescriptor.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { trimIndent1qytc1wvt8suh as trimIndent } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Indent.mjs';
import { initBuiltins3cd82qqvse108 as initBuiltins } from './Platform.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_BUILTIN_SERIALIZERS() {
  _init_properties_Primitives_kt__k0eto4();
  return BUILTIN_SERIALIZERS;
}
var BUILTIN_SERIALIZERS;
function builtinSerializerOrNull(_this__u8e3s4) {
  _init_properties_Primitives_kt__k0eto4();
  var tmp = get_BUILTIN_SERIALIZERS().j3(_this__u8e3s4);
  return (tmp == null ? true : isInterface(tmp, KSerializer())) ? tmp : THROW_CCE();
}
var StringSerializerClass;
function StringSerializer() {
  if (StringSerializerClass === VOID) {
    class $ {
      constructor() {
        StringSerializer_instance = this;
        this.g1h_1 = new (PrimitiveSerialDescriptor())('kotlin.String', STRING_getInstance());
      }
      fz() {
        return this.g1h_1;
      }
      h1h(encoder, value) {
        return encoder.a15(value);
      }
      gz(encoder, value) {
        return this.h1h(encoder, (!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.q13();
      }
    }
    initMetadataForObject($, 'StringSerializer', VOID, VOID, [KSerializer()]);
    StringSerializerClass = $;
  }
  return StringSerializerClass;
}
var StringSerializer_instance;
function StringSerializer_getInstance() {
  if (StringSerializer_instance === VOID)
    new (StringSerializer())();
  return StringSerializer_instance;
}
var CharSerializerClass;
function CharSerializer() {
  if (CharSerializerClass === VOID) {
    class $ {
      constructor() {
        CharSerializer_instance = this;
        this.i1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Char', CHAR_getInstance());
      }
      fz() {
        return this.i1h_1;
      }
      j1h(encoder, value) {
        return encoder.z14(value);
      }
      gz(encoder, value) {
        return this.j1h(encoder, value instanceof Char() ? value.r2_1 : THROW_CCE());
      }
      k1h(decoder) {
        return decoder.p13();
      }
      hz(decoder) {
        return new (Char())(this.k1h(decoder));
      }
    }
    initMetadataForObject($, 'CharSerializer', VOID, VOID, [KSerializer()]);
    CharSerializerClass = $;
  }
  return CharSerializerClass;
}
var CharSerializer_instance;
function CharSerializer_getInstance() {
  if (CharSerializer_instance === VOID)
    new (CharSerializer())();
  return CharSerializer_instance;
}
var DoubleSerializerClass;
function DoubleSerializer() {
  if (DoubleSerializerClass === VOID) {
    class $ {
      constructor() {
        DoubleSerializer_instance = this;
        this.l1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Double', DOUBLE_getInstance());
      }
      fz() {
        return this.l1h_1;
      }
      m1h(encoder, value) {
        return encoder.y14(value);
      }
      gz(encoder, value) {
        return this.m1h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.o13();
      }
    }
    initMetadataForObject($, 'DoubleSerializer', VOID, VOID, [KSerializer()]);
    DoubleSerializerClass = $;
  }
  return DoubleSerializerClass;
}
var DoubleSerializer_instance;
function DoubleSerializer_getInstance() {
  if (DoubleSerializer_instance === VOID)
    new (DoubleSerializer())();
  return DoubleSerializer_instance;
}
var FloatSerializerClass;
function FloatSerializer() {
  if (FloatSerializerClass === VOID) {
    class $ {
      constructor() {
        FloatSerializer_instance = this;
        this.n1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Float', FLOAT_getInstance());
      }
      fz() {
        return this.n1h_1;
      }
      o1h(encoder, value) {
        return encoder.x14(value);
      }
      gz(encoder, value) {
        return this.o1h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.n13();
      }
    }
    initMetadataForObject($, 'FloatSerializer', VOID, VOID, [KSerializer()]);
    FloatSerializerClass = $;
  }
  return FloatSerializerClass;
}
var FloatSerializer_instance;
function FloatSerializer_getInstance() {
  if (FloatSerializer_instance === VOID)
    new (FloatSerializer())();
  return FloatSerializer_instance;
}
var LongSerializerClass;
function LongSerializer() {
  if (LongSerializerClass === VOID) {
    class $ {
      constructor() {
        LongSerializer_instance = this;
        this.p1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Long', LONG_getInstance());
      }
      fz() {
        return this.p1h_1;
      }
      q1h(encoder, value) {
        return encoder.w14(value);
      }
      gz(encoder, value) {
        return this.q1h(encoder, value instanceof Long() ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.m13();
      }
    }
    initMetadataForObject($, 'LongSerializer', VOID, VOID, [KSerializer()]);
    LongSerializerClass = $;
  }
  return LongSerializerClass;
}
var LongSerializer_instance;
function LongSerializer_getInstance() {
  if (LongSerializer_instance === VOID)
    new (LongSerializer())();
  return LongSerializer_instance;
}
var IntSerializerClass;
function IntSerializer() {
  if (IntSerializerClass === VOID) {
    class $ {
      constructor() {
        IntSerializer_instance = this;
        this.r1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Int', INT_getInstance());
      }
      fz() {
        return this.r1h_1;
      }
      s1h(encoder, value) {
        return encoder.v14(value);
      }
      gz(encoder, value) {
        return this.s1h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.l13();
      }
    }
    initMetadataForObject($, 'IntSerializer', VOID, VOID, [KSerializer()]);
    IntSerializerClass = $;
  }
  return IntSerializerClass;
}
var IntSerializer_instance;
function IntSerializer_getInstance() {
  if (IntSerializer_instance === VOID)
    new (IntSerializer())();
  return IntSerializer_instance;
}
var ShortSerializerClass;
function ShortSerializer() {
  if (ShortSerializerClass === VOID) {
    class $ {
      constructor() {
        ShortSerializer_instance = this;
        this.t1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Short', SHORT_getInstance());
      }
      fz() {
        return this.t1h_1;
      }
      u1h(encoder, value) {
        return encoder.u14(value);
      }
      gz(encoder, value) {
        return this.u1h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.k13();
      }
    }
    initMetadataForObject($, 'ShortSerializer', VOID, VOID, [KSerializer()]);
    ShortSerializerClass = $;
  }
  return ShortSerializerClass;
}
var ShortSerializer_instance;
function ShortSerializer_getInstance() {
  if (ShortSerializer_instance === VOID)
    new (ShortSerializer())();
  return ShortSerializer_instance;
}
var ByteSerializerClass;
function ByteSerializer() {
  if (ByteSerializerClass === VOID) {
    class $ {
      constructor() {
        ByteSerializer_instance = this;
        this.v1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Byte', BYTE_getInstance());
      }
      fz() {
        return this.v1h_1;
      }
      w1h(encoder, value) {
        return encoder.t14(value);
      }
      gz(encoder, value) {
        return this.w1h(encoder, (!(value == null) ? typeof value === 'number' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.j13();
      }
    }
    initMetadataForObject($, 'ByteSerializer', VOID, VOID, [KSerializer()]);
    ByteSerializerClass = $;
  }
  return ByteSerializerClass;
}
var ByteSerializer_instance;
function ByteSerializer_getInstance() {
  if (ByteSerializer_instance === VOID)
    new (ByteSerializer())();
  return ByteSerializer_instance;
}
var BooleanSerializerClass;
function BooleanSerializer() {
  if (BooleanSerializerClass === VOID) {
    class $ {
      constructor() {
        BooleanSerializer_instance = this;
        this.x1h_1 = new (PrimitiveSerialDescriptor())('kotlin.Boolean', BOOLEAN_getInstance());
      }
      fz() {
        return this.x1h_1;
      }
      y1h(encoder, value) {
        return encoder.s14(value);
      }
      gz(encoder, value) {
        return this.y1h(encoder, (!(value == null) ? typeof value === 'boolean' : false) ? value : THROW_CCE());
      }
      hz(decoder) {
        return decoder.i13();
      }
    }
    initMetadataForObject($, 'BooleanSerializer', VOID, VOID, [KSerializer()]);
    BooleanSerializerClass = $;
  }
  return BooleanSerializerClass;
}
var BooleanSerializer_instance;
function BooleanSerializer_getInstance() {
  if (BooleanSerializer_instance === VOID)
    new (BooleanSerializer())();
  return BooleanSerializer_instance;
}
var UnitSerializerClass;
function UnitSerializer() {
  if (UnitSerializerClass === VOID) {
    class $ {
      constructor() {
        UnitSerializer_instance = this;
        this.z1h_1 = ObjectSerializer().r1c('kotlin.Unit', Unit_instance);
      }
      fz() {
        return this.z1h_1.fz();
      }
      a1i(encoder, value) {
        this.z1h_1.yz(encoder, Unit_instance);
      }
      gz(encoder, value) {
        return this.a1i(encoder, value instanceof Unit() ? value : THROW_CCE());
      }
      b1i(decoder) {
        this.z1h_1.hz(decoder);
      }
      hz(decoder) {
        this.b1i(decoder);
        return Unit_instance;
      }
    }
    initMetadataForObject($, 'UnitSerializer', VOID, VOID, [KSerializer()]);
    UnitSerializerClass = $;
  }
  return UnitSerializerClass;
}
var UnitSerializer_instance;
function UnitSerializer_getInstance() {
  if (UnitSerializer_instance === VOID)
    new (UnitSerializer())();
  return UnitSerializer_instance;
}
function error($this) {
  throw IllegalStateException().o5('Primitive descriptor ' + $this.c1i_1 + ' does not have elements');
}
var PrimitiveSerialDescriptorClass;
function PrimitiveSerialDescriptor() {
  if (PrimitiveSerialDescriptorClass === VOID) {
    class $ {
      constructor(serialName, kind) {
        this.c1i_1 = serialName;
        this.d1i_1 = kind;
      }
      j10() {
        return this.c1i_1;
      }
      x11() {
        return this.d1i_1;
      }
      z11() {
        return 0;
      }
      b12(index) {
        error(this);
      }
      c12(name) {
        error(this);
      }
      f12(index) {
        error(this);
      }
      e12(index) {
        error(this);
      }
      d12(index) {
        error(this);
      }
      toString() {
        return 'PrimitiveDescriptor(' + this.c1i_1 + ')';
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PrimitiveSerialDescriptor()))
          return false;
        if (this.c1i_1 === other.c1i_1 && equals(this.d1i_1, other.d1i_1))
          return true;
        return false;
      }
      hashCode() {
        return getStringHashCode(this.c1i_1) + imul(31, this.d1i_1.hashCode()) | 0;
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    protoOf($).a12 = get_annotations;
    initMetadataForClass($, 'PrimitiveSerialDescriptor', VOID, VOID, [SerialDescriptor()]);
    PrimitiveSerialDescriptorClass = $;
  }
  return PrimitiveSerialDescriptorClass;
}
function PrimitiveDescriptorSafe(serialName, kind) {
  _init_properties_Primitives_kt__k0eto4();
  checkNameIsNotAPrimitive(serialName);
  return new (PrimitiveSerialDescriptor())(serialName, kind);
}
function checkNameIsNotAPrimitive(serialName) {
  _init_properties_Primitives_kt__k0eto4();
  var values = get_BUILTIN_SERIALIZERS().l3();
  var _iterator__ex2g4s = values.x();
  while (_iterator__ex2g4s.y()) {
    var primitive = _iterator__ex2g4s.z();
    var primitiveName = primitive.fz().j10();
    if (serialName === primitiveName) {
      throw IllegalArgumentException().q(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).gh() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
    }
  }
}
var properties_initialized_Primitives_kt_6dpii6;
function _init_properties_Primitives_kt__k0eto4() {
  if (!properties_initialized_Primitives_kt_6dpii6) {
    properties_initialized_Primitives_kt_6dpii6 = true;
    BUILTIN_SERIALIZERS = initBuiltins();
  }
}
//region block: exports
export {
  BooleanSerializer_getInstance as BooleanSerializer_getInstance1t8habeqgiyq1,
  ByteSerializer_getInstance as ByteSerializer_getInstance2o4jevxladj6p,
  CharSerializer_getInstance as CharSerializer_getInstance368f23bfe318s,
  DoubleSerializer_getInstance as DoubleSerializer_getInstance3da4hv5ndgjlx,
  FloatSerializer_getInstance as FloatSerializer_getInstance2fspe61zbqree,
  IntSerializer_getInstance as IntSerializer_getInstance2q7s8kvk1il5u,
  LongSerializer_getInstance as LongSerializer_getInstance194e4t3ow5wjs,
  ShortSerializer_getInstance as ShortSerializer_getInstance330bccrmjn2n6,
  StringSerializer_getInstance as StringSerializer_getInstance2wffkbpdux3h9,
  UnitSerializer_getInstance as UnitSerializer_getInstance2bvrjsz1qqqzj,
  PrimitiveDescriptorSafe as PrimitiveDescriptorSafe1r3pht5v1oaqu,
  PrimitiveSerialDescriptor as PrimitiveSerialDescriptorkwnwsc78b2on,
  builtinSerializerOrNull as builtinSerializerOrNull180kp99qvlpex,
  checkNameIsNotAPrimitive as checkNameIsNotAPrimitive28vmhppr4nskt,
};
//endregion

//# sourceMappingURL=Primitives.mjs.map
