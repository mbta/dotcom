import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  SEALED_getInstance3nsev85ow9059 as SEALED_getInstance,
  STRING_getInstance2ou4lro9xn2qn as STRING_getInstance,
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
} from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import {
  buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor,
  PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor,
} from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  JsonArray2urf8ey7u44sd as JsonArray,
  JsonObjectee06ihoeeiqj as JsonObject,
  JsonPrimitive3ttzjh2ft5dnx as JsonPrimitive,
  JsonElementf07o4p6p57al as JsonElement,
  JsonLiteral1u57id0qmqut7 as JsonLiteral,
  JsonNull_getInstance2gh8fwl8w0wl7 as JsonNull_getInstance,
  JsonNull2liwjj96vm0w2 as JsonNull,
} from './JsonElement.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  ListSerializer1hxuk9dx5n9du as ListSerializer,
  serializer1x79l67jvwntn as serializer,
  MapSerializer11kmegt3g5c1g as MapSerializer,
  serializer2lw83vwvpnyms as serializer_0,
} from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  get_annotationshjxdbdcl8kmv as get_annotations,
} from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptor.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  JsonDecodingException1p97qvfqhd5n3 as JsonDecodingException,
  JsonDecodingException278mackfi1uuk as JsonDecodingException_0,
} from './internal/JsonExceptions.mjs';
import { StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { toLongOrNullutqivezb0wx1 as toLongOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringNumberConversions.mjs';
import { toULongOrNullojoyxi0i9tgj as toULongOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/UStrings.mjs';
import {
  ULong3f9k7s38t3rfp as ULong,
  Companion_getInstance1puqqwzccfvrg as Companion_getInstance,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
} from '../../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import { toDoubleOrNullkxwozihadygj as toDoubleOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { toBooleanStrictOrNull2j0md398tkvbj as toBooleanStrictOrNull } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { JsonDecoder1rijst5ne6qla as JsonDecoder } from './JsonDecoder.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { JsonEncoder1qlse6simkfi1 as JsonEncoder } from './JsonEncoder.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
  $this$buildSerialDescriptor.qz('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.qz('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.qz('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.qz('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.qz('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().a1o_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().b1o_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().c1o_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().d1o_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().e1o_1;
}
var JsonElementSerializerClass;
function JsonElementSerializer() {
  if (JsonElementSerializerClass === VOID) {
    class $ {
      constructor() {
        JsonElementSerializer_instance = this;
        var tmp = this;
        var tmp_0 = SEALED_getInstance();
        tmp.f1o_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
      }
      fz() {
        return this.f1o_1;
      }
      g1o(encoder, value) {
        verify(encoder);
        if (value instanceof JsonPrimitive()) {
          encoder.o15(JsonPrimitiveSerializer_getInstance(), value);
        } else {
          if (value instanceof JsonObject()) {
            encoder.o15(JsonObjectSerializer_getInstance(), value);
          } else {
            if (value instanceof JsonArray()) {
              encoder.o15(JsonArraySerializer_getInstance(), value);
            } else {
              noWhenBranchMatchedException();
            }
          }
        }
      }
      gz(encoder, value) {
        return this.g1o(encoder, value instanceof JsonElement() ? value : THROW_CCE());
      }
      hz(decoder) {
        var input = asJsonDecoder(decoder);
        return input.h1n();
      }
    }
    initMetadataForObject($, 'JsonElementSerializer', VOID, VOID, [KSerializer()]);
    JsonElementSerializerClass = $;
  }
  return JsonElementSerializerClass;
}
var JsonElementSerializer_instance;
function JsonElementSerializer_getInstance() {
  if (JsonElementSerializer_instance === VOID)
    new (JsonElementSerializer())();
  return JsonElementSerializer_instance;
}
var JsonArrayDescriptorClass;
function JsonArrayDescriptor() {
  if (JsonArrayDescriptorClass === VOID) {
    class $ {
      constructor() {
        JsonArrayDescriptor_instance = this;
        this.h1o_1 = ListSerializer(JsonElementSerializer_getInstance()).fz();
        this.i1o_1 = 'kotlinx.serialization.json.JsonArray';
      }
      j10() {
        return this.i1o_1;
      }
      b12(index) {
        return this.h1o_1.b12(index);
      }
      c12(name) {
        return this.h1o_1.c12(name);
      }
      d12(index) {
        return this.h1o_1.d12(index);
      }
      e12(index) {
        return this.h1o_1.e12(index);
      }
      f12(index) {
        return this.h1o_1.f12(index);
      }
      x11() {
        return this.h1o_1.x11();
      }
      t11() {
        return this.h1o_1.t11();
      }
      y11() {
        return this.h1o_1.y11();
      }
      z11() {
        return this.h1o_1.z11();
      }
      a12() {
        return this.h1o_1.a12();
      }
    }
    initMetadataForObject($, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor()]);
    JsonArrayDescriptorClass = $;
  }
  return JsonArrayDescriptorClass;
}
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance === VOID)
    new (JsonArrayDescriptor())();
  return JsonArrayDescriptor_instance;
}
var JsonArraySerializerClass;
function JsonArraySerializer() {
  if (JsonArraySerializerClass === VOID) {
    class $ {
      constructor() {
        JsonArraySerializer_instance = this;
        this.e1o_1 = JsonArrayDescriptor_getInstance();
      }
      fz() {
        return this.e1o_1;
      }
      j1o(encoder, value) {
        verify(encoder);
        ListSerializer(JsonElementSerializer_getInstance()).gz(encoder, value);
      }
      gz(encoder, value) {
        return this.j1o(encoder, value instanceof JsonArray() ? value : THROW_CCE());
      }
      hz(decoder) {
        verify_0(decoder);
        return new (JsonArray())(ListSerializer(JsonElementSerializer_getInstance()).hz(decoder));
      }
    }
    initMetadataForObject($, 'JsonArraySerializer', VOID, VOID, [KSerializer()]);
    JsonArraySerializerClass = $;
  }
  return JsonArraySerializerClass;
}
var JsonArraySerializer_instance;
function JsonArraySerializer_getInstance() {
  if (JsonArraySerializer_instance === VOID)
    new (JsonArraySerializer())();
  return JsonArraySerializer_instance;
}
var JsonPrimitiveSerializerClass;
function JsonPrimitiveSerializer() {
  if (JsonPrimitiveSerializerClass === VOID) {
    class $ {
      constructor() {
        JsonPrimitiveSerializer_instance = this;
        this.a1o_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
      }
      fz() {
        return this.a1o_1;
      }
      k1o(encoder, value) {
        verify(encoder);
        var tmp;
        if (value instanceof JsonNull()) {
          encoder.o15(JsonNullSerializer_getInstance(), JsonNull_getInstance());
          tmp = Unit_instance;
        } else {
          var tmp_0 = JsonLiteralSerializer_getInstance();
          encoder.o15(tmp_0, value instanceof JsonLiteral() ? value : THROW_CCE());
          tmp = Unit_instance;
        }
        return tmp;
      }
      gz(encoder, value) {
        return this.k1o(encoder, value instanceof JsonPrimitive() ? value : THROW_CCE());
      }
      hz(decoder) {
        var result = asJsonDecoder(decoder).h1n();
        if (!(result instanceof JsonPrimitive()))
          throw JsonDecodingException(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result)), toString(result));
        return result;
      }
    }
    initMetadataForObject($, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer()]);
    JsonPrimitiveSerializerClass = $;
  }
  return JsonPrimitiveSerializerClass;
}
var JsonPrimitiveSerializer_instance;
function JsonPrimitiveSerializer_getInstance() {
  if (JsonPrimitiveSerializer_instance === VOID)
    new (JsonPrimitiveSerializer())();
  return JsonPrimitiveSerializer_instance;
}
var JsonObjectDescriptorClass;
function JsonObjectDescriptor() {
  if (JsonObjectDescriptorClass === VOID) {
    class $ {
      constructor() {
        JsonObjectDescriptor_instance = this;
        this.l1o_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).fz();
        this.m1o_1 = 'kotlinx.serialization.json.JsonObject';
      }
      j10() {
        return this.m1o_1;
      }
      b12(index) {
        return this.l1o_1.b12(index);
      }
      c12(name) {
        return this.l1o_1.c12(name);
      }
      d12(index) {
        return this.l1o_1.d12(index);
      }
      e12(index) {
        return this.l1o_1.e12(index);
      }
      f12(index) {
        return this.l1o_1.f12(index);
      }
      x11() {
        return this.l1o_1.x11();
      }
      t11() {
        return this.l1o_1.t11();
      }
      y11() {
        return this.l1o_1.y11();
      }
      z11() {
        return this.l1o_1.z11();
      }
      a12() {
        return this.l1o_1.a12();
      }
    }
    initMetadataForObject($, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor()]);
    JsonObjectDescriptorClass = $;
  }
  return JsonObjectDescriptorClass;
}
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance === VOID)
    new (JsonObjectDescriptor())();
  return JsonObjectDescriptor_instance;
}
var JsonObjectSerializerClass;
function JsonObjectSerializer() {
  if (JsonObjectSerializerClass === VOID) {
    class $ {
      constructor() {
        JsonObjectSerializer_instance = this;
        this.d1o_1 = JsonObjectDescriptor_getInstance();
      }
      fz() {
        return this.d1o_1;
      }
      n1o(encoder, value) {
        verify(encoder);
        MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).gz(encoder, value);
      }
      gz(encoder, value) {
        return this.n1o(encoder, value instanceof JsonObject() ? value : THROW_CCE());
      }
      hz(decoder) {
        verify_0(decoder);
        return new (JsonObject())(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).hz(decoder));
      }
    }
    initMetadataForObject($, 'JsonObjectSerializer', VOID, VOID, [KSerializer()]);
    JsonObjectSerializerClass = $;
  }
  return JsonObjectSerializerClass;
}
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance === VOID)
    new (JsonObjectSerializer())();
  return JsonObjectSerializer_instance;
}
var JsonNullSerializerClass;
function JsonNullSerializer() {
  if (JsonNullSerializerClass === VOID) {
    class $ {
      constructor() {
        JsonNullSerializer_instance = this;
        this.b1o_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
      }
      fz() {
        return this.b1o_1;
      }
      o1o(encoder, value) {
        verify(encoder);
        encoder.r14();
      }
      gz(encoder, value) {
        return this.o1o(encoder, value instanceof JsonNull() ? value : THROW_CCE());
      }
      hz(decoder) {
        verify_0(decoder);
        if (decoder.g13()) {
          throw JsonDecodingException_0().v1o("Expected 'null' literal");
        }
        decoder.h13();
        return JsonNull_getInstance();
      }
    }
    initMetadataForObject($, 'JsonNullSerializer', VOID, VOID, [KSerializer()]);
    JsonNullSerializerClass = $;
  }
  return JsonNullSerializerClass;
}
var JsonNullSerializer_instance;
function JsonNullSerializer_getInstance() {
  if (JsonNullSerializer_instance === VOID)
    new (JsonNullSerializer())();
  return JsonNullSerializer_instance;
}
function defer(deferred) {
  return new (defer$1())(deferred);
}
var JsonLiteralSerializerClass;
function JsonLiteralSerializer() {
  if (JsonLiteralSerializerClass === VOID) {
    class $ {
      constructor() {
        JsonLiteralSerializer_instance = this;
        this.c1o_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
      }
      fz() {
        return this.c1o_1;
      }
      w1o(encoder, value) {
        verify(encoder);
        if (value.s1n_1) {
          return encoder.a15(value.u1n_1);
        }
        if (!(value.t1n_1 == null)) {
          return encoder.c15(value.t1n_1).a15(value.u1n_1);
        }
        var tmp0_safe_receiver = toLongOrNull(value.u1n_1);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return encoder.w14(tmp0_safe_receiver);
        }
        var tmp1_safe_receiver = toULongOrNull(value.u1n_1);
        var tmp = tmp1_safe_receiver;
        if ((tmp == null ? null : new (ULong())(tmp)) == null)
          null;
        else {
          var tmp_0 = tmp1_safe_receiver;
          // Inline function 'kotlin.let' call
          var it = (tmp_0 == null ? null : new (ULong())(tmp_0)).ly_1;
          var tmp_1 = encoder.c15(serializer_0(Companion_getInstance()).fz());
          // Inline function 'kotlin.ULong.toLong' call
          var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
          tmp_1.w14(tmp$ret$1);
          return Unit_instance;
        }
        var tmp2_safe_receiver = toDoubleOrNull(value.u1n_1);
        if (tmp2_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return encoder.y14(tmp2_safe_receiver);
        }
        var tmp3_safe_receiver = toBooleanStrictOrNull(value.u1n_1);
        if (tmp3_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return encoder.s14(tmp3_safe_receiver);
        }
        encoder.a15(value.u1n_1);
      }
      gz(encoder, value) {
        return this.w1o(encoder, value instanceof JsonLiteral() ? value : THROW_CCE());
      }
      hz(decoder) {
        var result = asJsonDecoder(decoder).h1n();
        if (!(result instanceof JsonLiteral()))
          throw JsonDecodingException(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result)), toString(result));
        return result;
      }
    }
    initMetadataForObject($, 'JsonLiteralSerializer', VOID, VOID, [KSerializer()]);
    JsonLiteralSerializerClass = $;
  }
  return JsonLiteralSerializerClass;
}
var JsonLiteralSerializer_instance;
function JsonLiteralSerializer_getInstance() {
  if (JsonLiteralSerializer_instance === VOID)
    new (JsonLiteralSerializer())();
  return JsonLiteralSerializer_instance;
}
function verify(encoder) {
  asJsonEncoder(encoder);
}
function asJsonDecoder(_this__u8e3s4) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder()) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException().o5('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function verify_0(decoder) {
  asJsonDecoder(decoder);
}
function asJsonEncoder(_this__u8e3s4) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder()) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException().o5('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function _get_original__l7ku1m($this) {
  var tmp0 = $this.x1o_1;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
  return tmp0.v1();
}
function defer$o$_get_original_$ref_3cje7k() {
  return function (p0) {
    return _get_original__l7ku1m(p0);
  };
}
var defer$1Class;
function defer$1() {
  if (defer$1Class === VOID) {
    class $ {
      constructor($deferred) {
        this.x1o_1 = lazy($deferred);
      }
      j10() {
        return _get_original__l7ku1m(this).j10();
      }
      x11() {
        return _get_original__l7ku1m(this).x11();
      }
      z11() {
        return _get_original__l7ku1m(this).z11();
      }
      b12(index) {
        return _get_original__l7ku1m(this).b12(index);
      }
      c12(name) {
        return _get_original__l7ku1m(this).c12(name);
      }
      d12(index) {
        return _get_original__l7ku1m(this).d12(index);
      }
      e12(index) {
        return _get_original__l7ku1m(this).e12(index);
      }
      f12(index) {
        return _get_original__l7ku1m(this).f12(index);
      }
    }
    protoOf($).t11 = get_isNullable;
    protoOf($).y11 = get_isInline;
    protoOf($).a12 = get_annotations;
    initMetadataForClass($, VOID, VOID, VOID, [SerialDescriptor()]);
    defer$1Class = $;
  }
  return defer$1Class;
}
//region block: exports
export {
  JsonArraySerializer_getInstance as JsonArraySerializer_getInstancedtagrec9nol6,
  JsonElementSerializer_getInstance as JsonElementSerializer_getInstancewor8ypl63wny,
  JsonNullSerializer_getInstance as JsonNullSerializer_getInstancewahcuuywsvsi,
  JsonObjectSerializer_getInstance as JsonObjectSerializer_getInstance30jn94kapv0ij,
  JsonPrimitiveSerializer_getInstance as JsonPrimitiveSerializer_getInstance11fxe4hexau90,
};
//endregion

//# sourceMappingURL=JsonElementSerializers.mjs.map
