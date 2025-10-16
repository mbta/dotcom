import { buildClassSerialDescriptors2a6xdp6mrtw as buildClassSerialDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { serializer1hwzc6m64v1op as serializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/Serializers.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  TimeBasedn2y4mla0fo0k as TimeBased,
  DateBasedu1hioe8kvjhw as DateBased,
  DayBased28hvf1xjg5r93 as DayBased,
  MonthBased16lxw4e6nhntg as MonthBased,
  DateTimeUnit3ugctnw90699o as DateTimeUnit,
} from '../DateTimeUnit.mjs';
import {
  MissingFieldException24tqif29emcmi as MissingFieldException,
  SerializationExceptioneqrdve3ts2n9 as SerializationException,
} from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/AbstractPolymorphicSerializer.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
  return buildClassSerialDescriptor('kotlinx.datetime.TimeBased', [], TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
}
function TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
  // Inline function 'kotlinx.serialization.descriptors.element' call
  var elementName = 'nanoseconds';
  var annotations = emptyList();
  // Inline function 'kotlinx.serialization.serializer' call
  // Inline function 'kotlinx.serialization.internal.cast' call
  var this_0 = serializer(createKType(getKClass(Long()), arrayOf([]), false));
  var descriptor = (isInterface(this_0, KSerializer()) ? this_0 : THROW_CCE()).fz();
  $this$buildClassSerialDescriptor.p12(elementName, descriptor, annotations, false);
  return Unit_instance;
}
function TimeBasedDateTimeUnitSerializer$_get_descriptor_$ref_ezonyw() {
  return function (p0) {
    return p0.fz();
  };
}
var TimeBasedDateTimeUnitSerializerClass;
function TimeBasedDateTimeUnitSerializer() {
  if (TimeBasedDateTimeUnitSerializerClass === VOID) {
    class $ {
      constructor() {
        TimeBasedDateTimeUnitSerializer_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.s8f_1 = lazy(tmp_0, TimeBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
      }
      fz() {
        var tmp0 = this.s8f_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, TimeBasedDateTimeUnitSerializer$_get_descriptor_$ref_ezonyw(), null);
        return tmp0.v1();
      }
      t8f(encoder, value) {
        // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
        var descriptor = this.fz();
        var composite = encoder.v13(descriptor);
        composite.h15(TimeBasedDateTimeUnitSerializer_getInstance().fz(), 0, value.u80_1);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.t8f(encoder, value instanceof TimeBased() ? value : THROW_CCE());
      }
      hz(decoder) {
        var seen = {_v: false};
        var nanoseconds = {_v: new (Long())(0, 0)};
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        if (composite.l14()) {
          nanoseconds._v = composite.b14(TimeBasedDateTimeUnitSerializer_getInstance().fz(), 0);
          seen._v = true;
        } else {
          loop: while (true) {
            var elementIndex = composite.m14(TimeBasedDateTimeUnitSerializer_getInstance().fz());
            switch (elementIndex) {
              case 0:
                nanoseconds._v = composite.b14(TimeBasedDateTimeUnitSerializer_getInstance().fz(), 0);
                seen._v = true;
                break;
              case -1:
                break loop;
              default:
                throwUnknownIndexException(elementIndex);
                break;
            }
          }
        }
        var result = Unit_instance;
        composite.w13(descriptor);
        if (!seen._v)
          throw MissingFieldException().g11('nanoseconds', this.fz().j10());
        return new (TimeBased())(nanoseconds._v);
      }
    }
    initMetadataForObject($, 'TimeBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer()]);
    TimeBasedDateTimeUnitSerializerClass = $;
  }
  return TimeBasedDateTimeUnitSerializerClass;
}
var TimeBasedDateTimeUnitSerializer_instance;
function TimeBasedDateTimeUnitSerializer_getInstance() {
  if (TimeBasedDateTimeUnitSerializer_instance === VOID)
    new (TimeBasedDateTimeUnitSerializer())();
  return TimeBasedDateTimeUnitSerializer_instance;
}
function _get_impl__d88w17($this) {
  var tmp0 = $this.u8f_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('impl', 1, tmp, DateBasedDateTimeUnitSerializer$_get_impl_$ref_m860rs(), null);
  return tmp0.v1();
}
function DateBasedDateTimeUnitSerializer$impl$delegate$lambda() {
  var tmp = getKClass(DateBased());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(DayBased()), getKClass(MonthBased())];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [DayBasedDateTimeUnitSerializer_getInstance(), MonthBasedDateTimeUnitSerializer_getInstance()];
  return SealedClassSerializer().l10('kotlinx.datetime.DateTimeUnit.DateBased', tmp, tmp_0, tmp$ret$5);
}
function DateBasedDateTimeUnitSerializer$_get_impl_$ref_m860rs() {
  return function (p0) {
    return _get_impl__d88w17(p0);
  };
}
var DateBasedDateTimeUnitSerializerClass;
function DateBasedDateTimeUnitSerializer() {
  if (DateBasedDateTimeUnitSerializerClass === VOID) {
    class $ extends AbstractPolymorphicSerializer() {
      static v8f() {
        DateBasedDateTimeUnitSerializer_instance = null;
        var $this = this.vz();
        DateBasedDateTimeUnitSerializer_instance = $this;
        var tmp = $this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.u8f_1 = lazy(tmp_0, DateBasedDateTimeUnitSerializer$impl$delegate$lambda);
        return $this;
      }
      zz(decoder, klassName) {
        return _get_impl__d88w17(this).zz(decoder, klassName);
      }
      w8f(encoder, value) {
        return _get_impl__d88w17(this).a10(encoder, value);
      }
      a10(encoder, value) {
        return this.w8f(encoder, value instanceof DateBased() ? value : THROW_CCE());
      }
      wz() {
        return getKClass(DateBased());
      }
      fz() {
        return _get_impl__d88w17(this).fz();
      }
    }
    initMetadataForObject($, 'DateBasedDateTimeUnitSerializer');
    DateBasedDateTimeUnitSerializerClass = $;
  }
  return DateBasedDateTimeUnitSerializerClass;
}
var DateBasedDateTimeUnitSerializer_instance;
function DateBasedDateTimeUnitSerializer_getInstance() {
  if (DateBasedDateTimeUnitSerializer_instance === VOID)
    DateBasedDateTimeUnitSerializer().v8f();
  return DateBasedDateTimeUnitSerializer_instance;
}
function DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
  return buildClassSerialDescriptor('kotlinx.datetime.DayBased', [], DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
}
function DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
  // Inline function 'kotlinx.serialization.descriptors.element' call
  var annotations = emptyList();
  // Inline function 'kotlinx.serialization.serializer' call
  // Inline function 'kotlinx.serialization.internal.cast' call
  var this_0 = serializer(createKType(PrimitiveClasses_getInstance().ii(), arrayOf([]), false));
  var descriptor = (isInterface(this_0, KSerializer()) ? this_0 : THROW_CCE()).fz();
  $this$buildClassSerialDescriptor.p12('days', descriptor, annotations, false);
  return Unit_instance;
}
function DayBasedDateTimeUnitSerializer$_get_descriptor_$ref_2ycvl3() {
  return function (p0) {
    return p0.fz();
  };
}
var DayBasedDateTimeUnitSerializerClass;
function DayBasedDateTimeUnitSerializer() {
  if (DayBasedDateTimeUnitSerializerClass === VOID) {
    class $ {
      constructor() {
        DayBasedDateTimeUnitSerializer_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.x8f_1 = lazy(tmp_0, DayBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
      }
      fz() {
        var tmp0 = this.x8f_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, DayBasedDateTimeUnitSerializer$_get_descriptor_$ref_2ycvl3(), null);
        return tmp0.v1();
      }
      y8f(encoder, value) {
        // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
        var descriptor = this.fz();
        var composite = encoder.v13(descriptor);
        composite.g15(DayBasedDateTimeUnitSerializer_getInstance().fz(), 0, value.a81_1);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.y8f(encoder, value instanceof DayBased() ? value : THROW_CCE());
      }
      hz(decoder) {
        var seen = {_v: false};
        var days = {_v: 0};
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        if (composite.l14()) {
          days._v = composite.a14(DayBasedDateTimeUnitSerializer_getInstance().fz(), 0);
          seen._v = true;
        } else {
          loop: while (true) {
            var elementIndex = composite.m14(DayBasedDateTimeUnitSerializer_getInstance().fz());
            switch (elementIndex) {
              case 0:
                days._v = composite.a14(DayBasedDateTimeUnitSerializer_getInstance().fz(), 0);
                seen._v = true;
                break;
              case -1:
                break loop;
              default:
                throwUnknownIndexException(elementIndex);
                break;
            }
          }
        }
        var result = Unit_instance;
        composite.w13(descriptor);
        if (!seen._v)
          throw MissingFieldException().g11('days', this.fz().j10());
        return new (DayBased())(days._v);
      }
    }
    initMetadataForObject($, 'DayBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer()]);
    DayBasedDateTimeUnitSerializerClass = $;
  }
  return DayBasedDateTimeUnitSerializerClass;
}
var DayBasedDateTimeUnitSerializer_instance;
function DayBasedDateTimeUnitSerializer_getInstance() {
  if (DayBasedDateTimeUnitSerializer_instance === VOID)
    new (DayBasedDateTimeUnitSerializer())();
  return DayBasedDateTimeUnitSerializer_instance;
}
function MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda() {
  return buildClassSerialDescriptor('kotlinx.datetime.MonthBased', [], MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda);
}
function MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda$lambda($this$buildClassSerialDescriptor) {
  // Inline function 'kotlinx.serialization.descriptors.element' call
  var annotations = emptyList();
  // Inline function 'kotlinx.serialization.serializer' call
  // Inline function 'kotlinx.serialization.internal.cast' call
  var this_0 = serializer(createKType(PrimitiveClasses_getInstance().ii(), arrayOf([]), false));
  var descriptor = (isInterface(this_0, KSerializer()) ? this_0 : THROW_CCE()).fz();
  $this$buildClassSerialDescriptor.p12('months', descriptor, annotations, false);
  return Unit_instance;
}
function MonthBasedDateTimeUnitSerializer$_get_descriptor_$ref_vroatn() {
  return function (p0) {
    return p0.fz();
  };
}
var MonthBasedDateTimeUnitSerializerClass;
function MonthBasedDateTimeUnitSerializer() {
  if (MonthBasedDateTimeUnitSerializerClass === VOID) {
    class $ {
      constructor() {
        MonthBasedDateTimeUnitSerializer_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.z8f_1 = lazy(tmp_0, MonthBasedDateTimeUnitSerializer$descriptor$delegate$lambda);
      }
      fz() {
        var tmp0 = this.z8f_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, MonthBasedDateTimeUnitSerializer$_get_descriptor_$ref_vroatn(), null);
        return tmp0.v1();
      }
      a8g(encoder, value) {
        // Inline function 'kotlinx.serialization.encoding.encodeStructure' call
        var descriptor = this.fz();
        var composite = encoder.v13(descriptor);
        composite.g15(MonthBasedDateTimeUnitSerializer_getInstance().fz(), 0, value.b81_1);
        composite.w13(descriptor);
      }
      gz(encoder, value) {
        return this.a8g(encoder, value instanceof MonthBased() ? value : THROW_CCE());
      }
      hz(decoder) {
        var seen = {_v: false};
        var months = {_v: 0};
        // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
        var descriptor = this.fz();
        var composite = decoder.v13(descriptor);
        if (composite.l14()) {
          months._v = composite.a14(MonthBasedDateTimeUnitSerializer_getInstance().fz(), 0);
          seen._v = true;
        } else {
          loop: while (true) {
            var elementIndex = composite.m14(MonthBasedDateTimeUnitSerializer_getInstance().fz());
            switch (elementIndex) {
              case 0:
                months._v = composite.a14(MonthBasedDateTimeUnitSerializer_getInstance().fz(), 0);
                seen._v = true;
                break;
              case -1:
                break loop;
              default:
                throwUnknownIndexException(elementIndex);
                break;
            }
          }
        }
        var result = Unit_instance;
        composite.w13(descriptor);
        if (!seen._v)
          throw MissingFieldException().g11('months', this.fz().j10());
        return new (MonthBased())(months._v);
      }
    }
    initMetadataForObject($, 'MonthBasedDateTimeUnitSerializer', VOID, VOID, [KSerializer()]);
    MonthBasedDateTimeUnitSerializerClass = $;
  }
  return MonthBasedDateTimeUnitSerializerClass;
}
var MonthBasedDateTimeUnitSerializer_instance;
function MonthBasedDateTimeUnitSerializer_getInstance() {
  if (MonthBasedDateTimeUnitSerializer_instance === VOID)
    new (MonthBasedDateTimeUnitSerializer())();
  return MonthBasedDateTimeUnitSerializer_instance;
}
function _get_impl__d88w17_0($this) {
  var tmp0 = $this.b8g_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('impl', 1, tmp, DateTimeUnitSerializer$_get_impl_$ref_2y1hvx(), null);
  return tmp0.v1();
}
function DateTimeUnitSerializer$impl$delegate$lambda() {
  var tmp = getKClass(DateTimeUnit());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(DayBased()), getKClass(MonthBased()), getKClass(TimeBased())];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [DayBasedDateTimeUnitSerializer_getInstance(), MonthBasedDateTimeUnitSerializer_getInstance(), TimeBasedDateTimeUnitSerializer_getInstance()];
  return SealedClassSerializer().l10('kotlinx.datetime.DateTimeUnit', tmp, tmp_0, tmp$ret$5);
}
function DateTimeUnitSerializer$_get_impl_$ref_2y1hvx() {
  return function (p0) {
    return _get_impl__d88w17_0(p0);
  };
}
var DateTimeUnitSerializerClass;
function DateTimeUnitSerializer() {
  if (DateTimeUnitSerializerClass === VOID) {
    class $ extends AbstractPolymorphicSerializer() {
      static c8g() {
        DateTimeUnitSerializer_instance = null;
        var $this = this.vz();
        DateTimeUnitSerializer_instance = $this;
        var tmp = $this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.b8g_1 = lazy(tmp_0, DateTimeUnitSerializer$impl$delegate$lambda);
        return $this;
      }
      zz(decoder, klassName) {
        return _get_impl__d88w17_0(this).zz(decoder, klassName);
      }
      d8g(encoder, value) {
        return _get_impl__d88w17_0(this).a10(encoder, value);
      }
      a10(encoder, value) {
        return this.d8g(encoder, value instanceof DateTimeUnit() ? value : THROW_CCE());
      }
      wz() {
        return getKClass(DateTimeUnit());
      }
      fz() {
        return _get_impl__d88w17_0(this).fz();
      }
    }
    initMetadataForObject($, 'DateTimeUnitSerializer');
    DateTimeUnitSerializerClass = $;
  }
  return DateTimeUnitSerializerClass;
}
var DateTimeUnitSerializer_instance;
function DateTimeUnitSerializer_getInstance() {
  if (DateTimeUnitSerializer_instance === VOID)
    DateTimeUnitSerializer().c8g();
  return DateTimeUnitSerializer_instance;
}
function throwUnknownIndexException(index) {
  throw SerializationException().w10('An unknown field for index ' + index);
}
//region block: exports
export {
  DateBasedDateTimeUnitSerializer_getInstance as DateBasedDateTimeUnitSerializer_getInstance2rikesu6oglqz,
  DateTimeUnitSerializer_getInstance as DateTimeUnitSerializer_getInstance3b5n2mvis6ri5,
  DayBasedDateTimeUnitSerializer_getInstance as DayBasedDateTimeUnitSerializer_getInstance23o8q93ovx0p5,
  MonthBasedDateTimeUnitSerializer_getInstance as MonthBasedDateTimeUnitSerializer_getInstancecpechj7jc0xd,
  TimeBasedDateTimeUnitSerializer_getInstance as TimeBasedDateTimeUnitSerializer_getInstancewuqoobna26f2,
};
//endregion

//# sourceMappingURL=DateTimeUnitSerializers.mjs.map
