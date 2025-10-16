import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  JsonElementSerializer_getInstancewor8ypl63wny as JsonElementSerializer_getInstance,
  JsonArraySerializer_getInstancedtagrec9nol6 as JsonArraySerializer_getInstance,
  JsonPrimitiveSerializer_getInstance11fxe4hexau90 as JsonPrimitiveSerializer_getInstance,
  JsonObjectSerializer_getInstance30jn94kapv0ij as JsonObjectSerializer_getInstance,
  JsonNullSerializer_getInstancewahcuuywsvsi as JsonNullSerializer_getInstance,
} from './JsonElementSerializers.mjs';
import {
  equals2au1ep9vhcato as equals,
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  KtList3hktaavzmj137 as KtList,
  KtMap140uvy3s5zad8 as KtMap,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import {
  printQuotedmgc3s3pgfors as printQuoted,
  toBooleanStrictOrNull2hf9surgqf5vr as toBooleanStrictOrNull,
} from './internal/StringOps.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { SerializerFactory1qv9hivitncuv as SerializerFactory } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { StringJsonLexervr9dj3kex5li as StringJsonLexer } from './internal/StringJsonLexer.mjs';
import { toDouble1kn912gjoizjp as toDouble } from '../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { serializer1x79l67jvwntn as serializer } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { InlinePrimitiveDescriptor3i6ccn1a4fw94 as InlinePrimitiveDescriptor } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/InlineClassDescriptor.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_jsonUnquotedLiteralDescriptor() {
  _init_properties_JsonElement_kt__7cbdc2();
  return jsonUnquotedLiteralDescriptor;
}
var jsonUnquotedLiteralDescriptor;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var JsonElementClass;
function JsonElement() {
  if (JsonElementClass === VOID) {
    class $ {}
    initMetadataForClass($, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
    JsonElementClass = $;
  }
  return JsonElementClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
var JsonArrayClass;
function JsonArray() {
  if (JsonArrayClass === VOID) {
    class $ extends JsonElement() {
      constructor(content) {
        super();
        this.i1n_1 = content;
      }
      equals(other) {
        return equals(this.i1n_1, other);
      }
      hashCode() {
        return hashCode(this.i1n_1);
      }
      toString() {
        return joinToString(this.i1n_1, ',', '[', ']');
      }
      h1() {
        return this.i1n_1.h1();
      }
      j1n(element) {
        return this.i1n_1.j1(element);
      }
      j1(element) {
        if (!(element instanceof JsonElement()))
          return false;
        return this.j1n(element instanceof JsonElement() ? element : THROW_CCE());
      }
      x() {
        return this.i1n_1.x();
      }
      k1n(elements) {
        return this.i1n_1.d3(elements);
      }
      d3(elements) {
        return this.k1n(elements);
      }
      e1(index) {
        return this.i1n_1.e1(index);
      }
      l1n(element) {
        return this.i1n_1.l1(element);
      }
      l1(element) {
        if (!(element instanceof JsonElement()))
          return -1;
        return this.l1n(element instanceof JsonElement() ? element : THROW_CCE());
      }
      m1n(element) {
        return this.i1n_1.e3(element);
      }
      e3(element) {
        if (!(element instanceof JsonElement()))
          return -1;
        return this.m1n(element instanceof JsonElement() ? element : THROW_CCE());
      }
      f3() {
        return this.i1n_1.f3();
      }
      k1(index) {
        return this.i1n_1.k1(index);
      }
      g3(fromIndex, toIndex) {
        return this.i1n_1.g3(fromIndex, toIndex);
      }
      asJsReadonlyArrayView() {
        return this.i1n_1.asJsReadonlyArrayView();
      }
      c1() {
        return this.i1n_1.c1();
      }
    }
    initMetadataForClass($, 'JsonArray', VOID, VOID, [JsonElement(), KtList()], VOID, VOID, {0: JsonArraySerializer_getInstance});
    JsonArrayClass = $;
  }
  return JsonArrayClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
var JsonPrimitiveClass;
function JsonPrimitive() {
  if (JsonPrimitiveClass === VOID) {
    class $ extends JsonElement() {
      toString() {
        return this.n1n();
      }
    }
    initMetadataForClass($, 'JsonPrimitive', VOID, VOID, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
    JsonPrimitiveClass = $;
  }
  return JsonPrimitiveClass;
}
function JsonPrimitive_0(value) {
  _init_properties_JsonElement_kt__7cbdc2();
  if (value == null)
    return JsonNull_getInstance();
  return new (JsonLiteral())(value, true);
}
function JsonPrimitive_1(value) {
  _init_properties_JsonElement_kt__7cbdc2();
  if (value == null)
    return JsonNull_getInstance();
  return new (JsonLiteral())(value, false);
}
var CompanionClass_2;
function Companion_2() {
  if (CompanionClass_2 === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass_2 = $;
  }
  return CompanionClass_2;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  return Companion_instance_2;
}
function JsonObject$toString$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var k = _destruct__k2r9zo.u1();
  // Inline function 'kotlin.collections.component2' call
  var v = _destruct__k2r9zo.v1();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder().f();
  printQuoted(this_0, k);
  this_0.ic(_Char___init__impl__6a9atx(58));
  this_0.gc(v);
  return this_0.toString();
}
var JsonObjectClass;
function JsonObject() {
  if (JsonObjectClass === VOID) {
    class $ extends JsonElement() {
      constructor(content) {
        super();
        this.o1n_1 = content;
      }
      equals(other) {
        return equals(this.o1n_1, other);
      }
      hashCode() {
        return hashCode(this.o1n_1);
      }
      toString() {
        var tmp = this.o1n_1.t1();
        return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
      }
      h1() {
        return this.o1n_1.h1();
      }
      p1n(key) {
        return this.o1n_1.h3(key);
      }
      h3(key) {
        if (!(!(key == null) ? typeof key === 'string' : false))
          return false;
        return this.p1n((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
      }
      lk(key) {
        return this.o1n_1.j3(key);
      }
      j3(key) {
        if (!(!(key == null) ? typeof key === 'string' : false))
          return null;
        return this.lk((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
      }
      c1() {
        return this.o1n_1.c1();
      }
      k3() {
        return this.o1n_1.k3();
      }
      l3() {
        return this.o1n_1.l3();
      }
      t1() {
        return this.o1n_1.t1();
      }
    }
    initMetadataForClass($, 'JsonObject', VOID, VOID, [JsonElement(), KtMap()], VOID, VOID, {0: JsonObjectSerializer_getInstance});
    JsonObjectClass = $;
  }
  return JsonObjectClass;
}
var JsonNullClass;
function JsonNull() {
  if (JsonNullClass === VOID) {
    class $ extends JsonPrimitive() {
      constructor() {
        JsonNull_instance = null;
        super();
        JsonNull_instance = this;
        this.q1n_1 = 'null';
      }
      n1n() {
        return this.q1n_1;
      }
      r1n() {
        return JsonNullSerializer_getInstance();
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForObject($, 'JsonNull', VOID, VOID, [JsonPrimitive(), SerializerFactory()], VOID, VOID, {0: JsonNullSerializer_getInstance});
    JsonNullClass = $;
  }
  return JsonNullClass;
}
var JsonNull_instance;
function JsonNull_getInstance() {
  if (JsonNull_instance === VOID)
    new (JsonNull())();
  return JsonNull_instance;
}
var JsonLiteralClass;
function JsonLiteral() {
  if (JsonLiteralClass === VOID) {
    class $ extends JsonPrimitive() {
      constructor(body, isString, coerceToInlineType) {
        coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
        super();
        this.s1n_1 = isString;
        this.t1n_1 = coerceToInlineType;
        this.u1n_1 = toString(body);
        if (!(this.t1n_1 == null)) {
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.require' call
          if (!this.t1n_1.y11()) {
            var message = 'Failed requirement.';
            throw IllegalArgumentException().q(toString(message));
          }
        }
      }
      n1n() {
        return this.u1n_1;
      }
      toString() {
        var tmp;
        if (this.s1n_1) {
          // Inline function 'kotlin.text.buildString' call
          // Inline function 'kotlin.apply' call
          var this_0 = StringBuilder().f();
          printQuoted(this_0, this.u1n_1);
          tmp = this_0.toString();
        } else {
          tmp = this.u1n_1;
        }
        return tmp;
      }
      equals(other) {
        if (this === other)
          return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
          return false;
        if (!(other instanceof JsonLiteral()))
          THROW_CCE();
        if (!(this.s1n_1 === other.s1n_1))
          return false;
        if (!(this.u1n_1 === other.u1n_1))
          return false;
        return true;
      }
      hashCode() {
        var result = getBooleanHashCode(this.s1n_1);
        result = imul(31, result) + getStringHashCode(this.u1n_1) | 0;
        return result;
      }
    }
    initMetadataForClass($, 'JsonLiteral');
    JsonLiteralClass = $;
  }
  return JsonLiteralClass;
}
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull(_this__u8e3s4.n1n());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new (StringJsonLexer())(_this__u8e3s4.n1n())).v1n();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.n1n();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.n1n());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull()) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.n1n();
  }
  return tmp;
}
function get_jsonPrimitive(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive() ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    error(_this__u8e3s4, 'JsonPrimitive');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function error(_this__u8e3s4, element) {
  _init_properties_JsonElement_kt__7cbdc2();
  throw IllegalArgumentException().q('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
}
function get_jsonArray(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonArray() ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    error(_this__u8e3s4, 'JsonArray');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function get_jsonObject(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonObject() ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    error(_this__u8e3s4, 'JsonObject');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
var properties_initialized_JsonElement_kt_abxy8s;
function _init_properties_JsonElement_kt__7cbdc2() {
  if (!properties_initialized_JsonElement_kt_abxy8s) {
    properties_initialized_JsonElement_kt_abxy8s = true;
    jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
  }
}
//region block: init
Companion_instance = new (Companion())();
Companion_instance_0 = new (Companion_0())();
Companion_instance_1 = new (Companion_1())();
Companion_instance_2 = new (Companion_2())();
//endregion
//region block: exports
export {
  JsonNull_getInstance as JsonNull_getInstance2gh8fwl8w0wl7,
  JsonArray as JsonArray2urf8ey7u44sd,
  JsonElement as JsonElementf07o4p6p57al,
  JsonLiteral as JsonLiteral1u57id0qmqut7,
  JsonNull as JsonNull2liwjj96vm0w2,
  JsonObject as JsonObjectee06ihoeeiqj,
  JsonPrimitive_0 as JsonPrimitiveolttw629wj53,
  JsonPrimitive_1 as JsonPrimitive2fp8648nd60dn,
  JsonPrimitive as JsonPrimitive3ttzjh2ft5dnx,
  get_booleanOrNull as get_booleanOrNull376axlcpdhkmo,
  get_contentOrNull as get_contentOrNull35s97cgi8z9eo,
  get_double as get_double1785hcxaminy4,
  get_float as get_float1xtaobzj8js8m,
  get_jsonArray as get_jsonArray18sglwhl4pclz,
  get_jsonObject as get_jsonObject2u4z2ch1uuca9,
  get_jsonPrimitive as get_jsonPrimitivez17tyd5rw1ql,
  get_jsonUnquotedLiteralDescriptor as get_jsonUnquotedLiteralDescriptors6ipxyp7dsvf,
  parseLongImpl as parseLongImpl2gkj8byk018b9,
};
//endregion

//# sourceMappingURL=JsonElement.mjs.map
