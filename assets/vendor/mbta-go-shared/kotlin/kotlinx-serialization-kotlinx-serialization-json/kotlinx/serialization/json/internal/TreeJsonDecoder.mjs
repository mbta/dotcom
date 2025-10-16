import { startsWith26w8qjqapeeq6 as startsWith } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  JsonDecodingException1p97qvfqhd5n3 as JsonDecodingException,
  InvalidKeyKindException3b5w96w0jjxof as InvalidKeyKindException,
  InvalidFloatingPointDecoded2q5szzjempb3 as InvalidFloatingPointDecoded,
  minify1kh64osmcox7j as minify,
  JsonDecodingExceptiong65jdof8puc as JsonDecodingException_0,
} from './JsonExceptions.mjs';
import { NamedValueDecoderzk26ztf92xbq as NamedValueDecoder } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Tagged.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/AbstractPolymorphicSerializer.mjs';
import { classDiscriminator9fd3hvqsgfqq as classDiscriminator } from './Polymorphic.mjs';
import {
  JsonObjectee06ihoeeiqj as JsonObject,
  get_jsonPrimitivez17tyd5rw1ql as get_jsonPrimitive,
  get_contentOrNull35s97cgi8z9eo as get_contentOrNull,
  JsonArray2urf8ey7u44sd as JsonArray,
  JsonNull2liwjj96vm0w2 as JsonNull,
  JsonPrimitive3ttzjh2ft5dnx as JsonPrimitive,
  JsonNull_getInstance2gh8fwl8w0wl7 as JsonNull_getInstance,
  get_booleanOrNull376axlcpdhkmo as get_booleanOrNull,
  parseLongImpl2gkj8byk018b9 as parseLongImpl,
  get_float1xtaobzj8js8m as get_float,
  get_double1785hcxaminy4 as get_double,
  JsonLiteral1u57id0qmqut7 as JsonLiteral,
  JsonPrimitiveolttw629wj53 as JsonPrimitive_0,
} from '../JsonElement.mjs';
import {
  getKClass1s3j9wy1cofik as getKClass,
  getKClassFromExpression3vpejubogshaw as getKClassFromExpression,
} from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { findPolymorphicSerializer1nm87hvemahcj as findPolymorphicSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/PolymorphicSerializer.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { DeserializationStrategy1z3z5pj9f7zc8 as DeserializationStrategy } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  PolymorphicKindla9gurooefwb as PolymorphicKind,
  LIST_getInstancey7k5h8d5cvxt as LIST_getInstance,
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  MAP_getInstance3s1t6byguxmp9 as MAP_getInstance,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { carrierDescriptor9eih94weel9f as carrierDescriptor } from './WriteMode.mjs';
import {
  getJsonNameIndexOrThrow1a6a29i1xie0m as getJsonNameIndexOrThrow,
  getJsonNameIndex1fee1p51fy8fj as getJsonNameIndex,
  namingStrategy2xiv9qzked2jy as namingStrategy,
  deserializationNamesMap29c3n2byxqy5b as deserializationNamesMap,
  ignoreUnknownKeys1ot1okvsp9ttf as ignoreUnknownKeys,
  get_JsonDeserializationNamesKey2d6gbfp1rff81 as get_JsonDeserializationNamesKey,
} from './JsonNamesMap.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/rangeTo.mjs';
import { ClosedRangehokgr73im9z3 as ClosedRange } from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/Range.mjs';
import { contains2c50nlxg7en7o as contains } from '../../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import {
  isFinite1tx0gn65nl9tj as isFinite,
  isFinite2t9l5a275mxm6 as isFinite_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { single29ec4rh52687r as single } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/_Strings.mjs';
import { Char19o2r8palgjof as Char } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { StringJsonLexer3eu6xom7mrcfu as StringJsonLexer } from './StringJsonLexer.mjs';
import { JsonDecoderForUnsignedTypesaowwj2t4rf8t as JsonDecoderForUnsignedTypes } from './StreamingJsonDecoder.mjs';
import { get_isUnsignedNumber3dxwaa3af8ncr as get_isUnsignedNumber } from './StreamingJsonEncoder.mjs';
import { JsonDecoder1rijst5ne6qla as JsonDecoder } from '../JsonDecoder.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { getValue48kllevslyh6 as getValue } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { jsonCachedSerialNameslxufy2gu43jt as jsonCachedSerialNames } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/JsonInternalDependencies.mjs';
import { get_schemaCache3drvxe6e7799s as get_schemaCache } from '../JsonSchemaCache.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import { plus1ogy4liedzq5j as plus } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Sets.mjs';
import { toInt2q8uldh7sc951 as toInt } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import { toList3jhuyej2anx2q as toList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function unparsedPrimitive($this, literal, primitive, tag) {
  var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
  throw JsonDecodingException(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.p1u(tag), toString($this.q1u()));
}
var AbstractJsonTreeDecoderClass;
function AbstractJsonTreeDecoder() {
  if (AbstractJsonTreeDecoderClass === VOID) {
    class $ extends NamedValueDecoder() {
      constructor(json, value, polymorphicDiscriminator) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        super();
        this.l1u_1 = json;
        this.m1u_1 = value;
        this.n1u_1 = polymorphicDiscriminator;
        this.o1u_1 = this.g1n().e1l_1;
      }
      g1n() {
        return this.l1u_1;
      }
      v1() {
        return this.m1u_1;
      }
      k14() {
        return this.g1n().k14();
      }
      q1u() {
        var tmp0_safe_receiver = this.l1i();
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = this.r1u(tmp0_safe_receiver);
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? this.v1() : tmp1_elvis_lhs;
      }
      p1u(currentTag) {
        return this.n1i() + ('.' + currentTag);
      }
      h1n() {
        return this.q1u();
      }
      u13(deserializer) {
        var tmp$ret$0;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
          var tmp;
          if (!(deserializer instanceof AbstractPolymorphicSerializer())) {
            tmp = true;
          } else {
            tmp = this.g1n().e1l_1.x1m_1;
          }
          if (tmp) {
            tmp$ret$0 = deserializer.hz(this);
            break $l$block;
          }
          var discriminator = classDiscriminator(deserializer.fz(), this.g1n());
          var tmp0 = this.h1n();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = deserializer.fz().j10();
          if (!(tmp0 instanceof JsonObject())) {
            var tmp_0 = getKClass(JsonObject()).gh();
            var tmp_1 = getKClassFromExpression(tmp0).gh();
            var tmp$ret$1 = this.n1i();
            throw JsonDecodingException(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
          }
          var jsonTree = tmp0;
          var tmp0_safe_receiver = jsonTree.lk(discriminator);
          var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
          var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
          var tmp_2;
          try {
            tmp_2 = findPolymorphicSerializer(deserializer, this, type);
          } catch ($p) {
            var tmp_3;
            if ($p instanceof SerializationException()) {
              var it = $p;
              throw JsonDecodingException(-1, ensureNotNull(it.message), jsonTree.toString());
            } else {
              throw $p;
            }
          }
          var tmp_4 = tmp_2;
          var actualSerializer = isInterface(tmp_4, DeserializationStrategy()) ? tmp_4 : THROW_CCE();
          tmp$ret$0 = readPolymorphicJson(this.g1n(), discriminator, jsonTree, actualSerializer);
        }
        return tmp$ret$0;
      }
      m1i(parentName, childName) {
        return childName;
      }
      v13(descriptor) {
        var currentObject = this.q1u();
        var tmp0_subject = descriptor.x11();
        var tmp;
        var tmp_0;
        if (equals(tmp0_subject, LIST_getInstance())) {
          tmp_0 = true;
        } else {
          tmp_0 = tmp0_subject instanceof PolymorphicKind();
        }
        if (tmp_0) {
          var tmp_1 = this.g1n();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = descriptor.j10();
          if (!(currentObject instanceof JsonArray())) {
            var tmp_2 = getKClass(JsonArray()).gh();
            var tmp_3 = getKClassFromExpression(currentObject).gh();
            var tmp$ret$0 = this.n1i();
            throw JsonDecodingException(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
          }
          tmp = new (JsonTreeListDecoder())(tmp_1, currentObject);
        } else {
          if (equals(tmp0_subject, MAP_getInstance())) {
            // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
            var this_0 = this.g1n();
            var keyDescriptor = carrierDescriptor(descriptor.e12(0), this_0.k14());
            var keyKind = keyDescriptor.x11();
            var tmp_4;
            var tmp_5;
            if (keyKind instanceof PrimitiveKind()) {
              tmp_5 = true;
            } else {
              tmp_5 = equals(keyKind, ENUM_getInstance());
            }
            if (tmp_5) {
              var tmp_6 = this.g1n();
              // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
              // Inline function 'kotlinx.serialization.json.internal.cast' call
              var serialName_0 = descriptor.j10();
              if (!(currentObject instanceof JsonObject())) {
                var tmp_7 = getKClass(JsonObject()).gh();
                var tmp_8 = getKClassFromExpression(currentObject).gh();
                var tmp$ret$3 = this.n1i();
                throw JsonDecodingException(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
              }
              tmp_4 = new (JsonTreeMapDecoder())(tmp_6, currentObject);
            } else {
              if (this_0.e1l_1.s1m_1) {
                var tmp_9 = this.g1n();
                // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
                // Inline function 'kotlinx.serialization.json.internal.cast' call
                var serialName_1 = descriptor.j10();
                if (!(currentObject instanceof JsonArray())) {
                  var tmp_10 = getKClass(JsonArray()).gh();
                  var tmp_11 = getKClassFromExpression(currentObject).gh();
                  var tmp$ret$7 = this.n1i();
                  throw JsonDecodingException(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
                }
                tmp_4 = new (JsonTreeListDecoder())(tmp_9, currentObject);
              } else {
                throw InvalidKeyKindException(keyDescriptor);
              }
            }
            tmp = tmp_4;
          } else {
            var tmp_12 = this.g1n();
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            var serialName_2 = descriptor.j10();
            if (!(currentObject instanceof JsonObject())) {
              var tmp_13 = getKClass(JsonObject()).gh();
              var tmp_14 = getKClassFromExpression(currentObject).gh();
              var tmp$ret$12 = this.n1i();
              throw JsonDecodingException(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
            }
            tmp = new (JsonTreeDecoder())(tmp_12, currentObject, this.n1u_1);
          }
        }
        return tmp;
      }
      w13(descriptor) {
      }
      g13() {
        var tmp = this.q1u();
        return !(tmp instanceof JsonNull());
      }
      s1u(tag, enumDescriptor) {
        var tmp = this.g1n();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
        var tmp2 = this.r1u(tag);
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = enumDescriptor.j10();
        if (!(tmp2 instanceof JsonPrimitive())) {
          var tmp_0 = getKClass(JsonPrimitive()).gh();
          var tmp_1 = getKClassFromExpression(tmp2).gh();
          var tmp$ret$0 = this.p1u(tag);
          throw JsonDecodingException(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
        }
        return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp2.n1n());
      }
      z1i(tag, enumDescriptor) {
        return this.s1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
      }
      t1u(tag) {
        return !(this.r1u(tag) === JsonNull_getInstance());
      }
      p1i(tag) {
        return this.t1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      u1u(tag) {
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var tmp0_elvis_lhs = get_booleanOrNull(literal);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'boolean', tag);
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }
            tmp$ret$4 = tmp_1;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'boolean', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$4;
      }
      q1i(tag) {
        return this.u1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      v1u(tag) {
        var tmp$ret$5;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var result = parseLongImpl(literal);
            var tmp_1;
            // Inline function 'kotlin.ranges.contains' call
            var this_0 = numberRangeToNumber(-128, 127);
            if (contains(isInterface(this_0, ClosedRange()) ? this_0 : THROW_CCE(), result)) {
              tmp_1 = result.v4();
            } else {
              tmp_1 = null;
            }
            var tmp0_elvis_lhs = tmp_1;
            var tmp_2;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'byte', tag);
            } else {
              tmp_2 = tmp0_elvis_lhs;
            }
            tmp$ret$5 = tmp_2;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'byte', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$5;
      }
      r1i(tag) {
        return this.v1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      w1u(tag) {
        var tmp$ret$5;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var result = parseLongImpl(literal);
            var tmp_1;
            // Inline function 'kotlin.ranges.contains' call
            var this_0 = numberRangeToNumber(-32768, 32767);
            if (contains(isInterface(this_0, ClosedRange()) ? this_0 : THROW_CCE(), result)) {
              tmp_1 = result.w4();
            } else {
              tmp_1 = null;
            }
            var tmp0_elvis_lhs = tmp_1;
            var tmp_2;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'short', tag);
            } else {
              tmp_2 = tmp0_elvis_lhs;
            }
            tmp$ret$5 = tmp_2;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'short', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$5;
      }
      s1i(tag) {
        return this.w1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      x1u(tag) {
        var tmp$ret$5;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var result = parseLongImpl(literal);
            var tmp_1;
            // Inline function 'kotlin.ranges.contains' call
            var this_0 = numberRangeToNumber(-2147483648, 2147483647);
            if (contains(isInterface(this_0, ClosedRange()) ? this_0 : THROW_CCE(), result)) {
              tmp_1 = result.f2();
            } else {
              tmp_1 = null;
            }
            var tmp0_elvis_lhs = tmp_1;
            var tmp_2;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'int', tag);
            } else {
              tmp_2 = tmp0_elvis_lhs;
            }
            tmp$ret$5 = tmp_2;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'int', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$5;
      }
      t1i(tag) {
        return this.x1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      y1u(tag) {
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var tmp0_elvis_lhs = parseLongImpl(literal);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'long', tag);
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }
            tmp$ret$4 = tmp_1;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'long', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$4;
      }
      u1i(tag) {
        return this.y1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      z1u(tag) {
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var tmp0_elvis_lhs = get_float(literal);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'float', tag);
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }
            tmp$ret$4 = tmp_1;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'float', tag);
            } else {
              throw $p;
            }
          }
        }
        var result = tmp$ret$4;
        var specialFp = this.g1n().e1l_1.z1m_1;
        if (specialFp || isFinite(result))
          return result;
        throw InvalidFloatingPointDecoded(result, tag, toString(this.q1u()));
      }
      v1i(tag) {
        return this.z1u((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      a1v(tag) {
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var tmp0_elvis_lhs = get_double(literal);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'double', tag);
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }
            tmp$ret$4 = tmp_1;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'double', tag);
            } else {
              throw $p;
            }
          }
        }
        var result = tmp$ret$4;
        var specialFp = this.g1n().e1l_1.z1m_1;
        if (specialFp || isFinite_0(result))
          return result;
        throw InvalidFloatingPointDecoded(result, tag, toString(this.q1u()));
      }
      w1i(tag) {
        return this.a1v((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      b1v(tag) {
        var tmp$ret$4;
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var value = this.r1u(tag);
          if (!(value instanceof JsonPrimitive())) {
            var tmp = getKClass(JsonPrimitive()).gh();
            var tmp_0 = getKClassFromExpression(value).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
          }
          var literal = value;
          try {
            var tmp0_elvis_lhs = new (Char())(single(literal.n1n()));
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              unparsedPrimitive(this, literal, 'char', tag);
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }
            tmp$ret$4 = tmp_1.r2_1;
            break $l$block;
          } catch ($p) {
            if ($p instanceof IllegalArgumentException()) {
              var e = $p;
              unparsedPrimitive(this, literal, 'char', tag);
            } else {
              throw $p;
            }
          }
        }
        return tmp$ret$4;
      }
      x1i(tag) {
        return this.b1v((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      c1v(tag) {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var value = this.r1u(tag);
        if (!(value instanceof JsonPrimitive())) {
          var tmp = getKClass(JsonPrimitive()).gh();
          var tmp_0 = getKClassFromExpression(value).gh();
          var tmp$ret$0 = this.p1u(tag);
          throw JsonDecodingException(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
        }
        var value_0 = value;
        if (!(value_0 instanceof JsonLiteral()))
          throw JsonDecodingException(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.p1u(tag), toString(this.q1u()));
        if (!value_0.s1n_1 && !this.g1n().e1l_1.r1m_1) {
          throw JsonDecodingException(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.p1u(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.q1u()));
        }
        return value_0.u1n_1;
      }
      y1i(tag) {
        return this.c1v((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
      }
      d1v(tag, inlineDescriptor) {
        var tmp;
        if (get_isUnsignedNumber(inlineDescriptor)) {
          var tmp_0 = this.g1n();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
          var tmp2 = this.r1u(tag);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = inlineDescriptor.j10();
          if (!(tmp2 instanceof JsonPrimitive())) {
            var tmp_1 = getKClass(JsonPrimitive()).gh();
            var tmp_2 = getKClassFromExpression(tmp2).gh();
            var tmp$ret$0 = this.p1u(tag);
            throw JsonDecodingException(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
          }
          var lexer = StringJsonLexer(tmp_0, tmp2.n1n());
          tmp = new (JsonDecoderForUnsignedTypes())(lexer, this.g1n());
        } else {
          tmp = super.a1j(tag, inlineDescriptor);
        }
        return tmp;
      }
      a1j(tag, inlineDescriptor) {
        return this.d1v((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
      }
      s13(descriptor) {
        return !(this.l1i() == null) ? super.s13(descriptor) : (new (JsonPrimitiveDecoder())(this.g1n(), this.v1(), this.n1u_1)).s13(descriptor);
      }
    }
    initMetadataForClass($, 'AbstractJsonTreeDecoder', VOID, VOID, [NamedValueDecoder(), JsonDecoder()]);
    AbstractJsonTreeDecoderClass = $;
  }
  return AbstractJsonTreeDecoderClass;
}
function setForceNull($this, descriptor, index) {
  $this.n1v_1 = (!$this.g1n().e1l_1.u1m_1 && !descriptor.f12(index) && descriptor.e12(index).t11());
  return $this.n1v_1;
}
var JsonTreeDecoderClass;
function JsonTreeDecoder() {
  if (JsonTreeDecoderClass === VOID) {
    class $ extends AbstractJsonTreeDecoder() {
      constructor(json, value, polymorphicDiscriminator, polyDescriptor) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
        super(json, value, polymorphicDiscriminator);
        this.k1v_1 = value;
        this.l1v_1 = polyDescriptor;
        this.m1v_1 = 0;
        this.n1v_1 = false;
      }
      v1() {
        return this.k1v_1;
      }
      m14(descriptor) {
        $l$loop: while (this.m1v_1 < descriptor.z11()) {
          var _unary__edvuaz = this.m1v_1;
          this.m1v_1 = _unary__edvuaz + 1 | 0;
          var name = this.g1i(descriptor, _unary__edvuaz);
          var index = this.m1v_1 - 1 | 0;
          this.n1v_1 = false;
          var tmp;
          // Inline function 'kotlin.collections.contains' call
          // Inline function 'kotlin.collections.containsKey' call
          var this_0 = this.v1();
          if ((isInterface(this_0, KtMap()) ? this_0 : THROW_CCE()).h3(name)) {
            tmp = true;
          } else {
            tmp = setForceNull(this, descriptor, index);
          }
          if (tmp) {
            if (!this.o1u_1.w1m_1)
              return index;
            var tmp0 = this.g1n();
            var tmp$ret$3;
            $l$block_2: {
              // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
              var isOptional = descriptor.f12(index);
              var elementDescriptor = descriptor.e12(index);
              var tmp_0;
              if (isOptional && !elementDescriptor.t11()) {
                var tmp_1 = this.o1v(name);
                tmp_0 = tmp_1 instanceof JsonNull();
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                tmp$ret$3 = true;
                break $l$block_2;
              }
              if (equals(elementDescriptor.x11(), ENUM_getInstance())) {
                var tmp_2;
                if (elementDescriptor.t11()) {
                  var tmp_3 = this.o1v(name);
                  tmp_2 = tmp_3 instanceof JsonNull();
                } else {
                  tmp_2 = false;
                }
                if (tmp_2) {
                  tmp$ret$3 = false;
                  break $l$block_2;
                }
                var tmp_4 = this.o1v(name);
                var tmp0_safe_receiver = tmp_4 instanceof JsonPrimitive() ? tmp_4 : null;
                var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
                var tmp_5;
                if (tmp0_elvis_lhs == null) {
                  tmp$ret$3 = false;
                  break $l$block_2;
                } else {
                  tmp_5 = tmp0_elvis_lhs;
                }
                var enumValue = tmp_5;
                var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
                var coerceToNull = !tmp0.e1l_1.u1m_1 && elementDescriptor.t11();
                if (enumIndex === -3 && (isOptional || coerceToNull)) {
                  if (setForceNull(this, descriptor, index))
                    return index;
                  tmp$ret$3 = true;
                  break $l$block_2;
                }
              }
              tmp$ret$3 = false;
            }
            if (tmp$ret$3)
              continue $l$loop;
            return index;
          }
        }
        return -1;
      }
      g13() {
        return !this.n1v_1 && super.g13();
      }
      h1i(descriptor, index) {
        var strategy = namingStrategy(descriptor, this.g1n());
        var baseName = descriptor.b12(index);
        if (strategy == null) {
          if (!this.o1u_1.a1n_1)
            return baseName;
          if (this.v1().k3().j1(baseName))
            return baseName;
        }
        var deserializationNamesMap_0 = deserializationNamesMap(this.g1n(), descriptor);
        // Inline function 'kotlin.collections.find' call
        var tmp0 = this.v1().k3();
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (deserializationNamesMap_0.j3(element) === index) {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        var tmp0_safe_receiver = tmp$ret$1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return tmp0_safe_receiver;
        }
        var fallbackName = strategy == null ? null : strategy.a1r(descriptor, index, baseName);
        return fallbackName == null ? baseName : fallbackName;
      }
      r1u(tag) {
        return getValue(this.v1(), tag);
      }
      o1v(tag) {
        return this.v1().lk(tag);
      }
      v13(descriptor) {
        if (descriptor === this.l1v_1) {
          var tmp = this.g1n();
          var tmp2 = this.q1u();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName = this.l1v_1.j10();
          if (!(tmp2 instanceof JsonObject())) {
            var tmp_0 = getKClass(JsonObject()).gh();
            var tmp_1 = getKClassFromExpression(tmp2).gh();
            var tmp$ret$0 = this.n1i();
            throw JsonDecodingException(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
          }
          return new (JsonTreeDecoder())(tmp, tmp2, this.n1u_1, this.l1v_1);
        }
        return super.v13(descriptor);
      }
      w13(descriptor) {
        var tmp;
        if (ignoreUnknownKeys(descriptor, this.g1n())) {
          tmp = true;
        } else {
          var tmp_0 = descriptor.x11();
          tmp = tmp_0 instanceof PolymorphicKind();
        }
        if (tmp)
          return Unit_instance;
        var strategy = namingStrategy(descriptor, this.g1n());
        var tmp_1;
        if (strategy == null && !this.o1u_1.a1n_1) {
          tmp_1 = jsonCachedSerialNames(descriptor);
        } else if (!(strategy == null)) {
          tmp_1 = deserializationNamesMap(this.g1n(), descriptor).k3();
        } else {
          var tmp_2 = jsonCachedSerialNames(descriptor);
          var tmp0_safe_receiver = get_schemaCache(this.g1n()).o1t(descriptor, get_JsonDeserializationNamesKey());
          // Inline function 'kotlin.collections.orEmpty' call
          var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k3();
          var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
          tmp_1 = plus(tmp_2, tmp$ret$0);
        }
        var names = tmp_1;
        var _iterator__ex2g4s = this.v1().k3().x();
        while (_iterator__ex2g4s.y()) {
          var key = _iterator__ex2g4s.z();
          if (!names.j1(key) && !(key === this.n1u_1)) {
            throw JsonDecodingException_0(-1, "Encountered an unknown key '" + key + "' at element: " + this.n1i() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.v1().toString()))));
          }
        }
      }
    }
    initMetadataForClass($, 'JsonTreeDecoder');
    JsonTreeDecoderClass = $;
  }
  return JsonTreeDecoderClass;
}
var JsonTreeListDecoderClass;
function JsonTreeListDecoder() {
  if (JsonTreeListDecoderClass === VOID) {
    class $ extends AbstractJsonTreeDecoder() {
      constructor(json, value) {
        super(json, value);
        this.v1v_1 = value;
        this.w1v_1 = this.v1v_1.c1();
        this.x1v_1 = -1;
      }
      v1() {
        return this.v1v_1;
      }
      h1i(descriptor, index) {
        return index.toString();
      }
      r1u(tag) {
        return this.v1v_1.e1(toInt(tag));
      }
      m14(descriptor) {
        while (this.x1v_1 < (this.w1v_1 - 1 | 0)) {
          this.x1v_1 = this.x1v_1 + 1 | 0;
          return this.x1v_1;
        }
        return -1;
      }
    }
    initMetadataForClass($, 'JsonTreeListDecoder');
    JsonTreeListDecoderClass = $;
  }
  return JsonTreeListDecoderClass;
}
var JsonPrimitiveDecoderClass;
function JsonPrimitiveDecoder() {
  if (JsonPrimitiveDecoderClass === VOID) {
    class $ extends AbstractJsonTreeDecoder() {
      constructor(json, value, polymorphicDiscriminator) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        super(json, value, polymorphicDiscriminator);
        this.e1w_1 = value;
        this.b1j('primitive');
      }
      v1() {
        return this.e1w_1;
      }
      m14(descriptor) {
        return 0;
      }
      r1u(tag) {
        // Inline function 'kotlin.require' call
        if (!(tag === 'primitive')) {
          var message = "This input can only handle primitives with 'primitive' tag";
          throw IllegalArgumentException().q(toString(message));
        }
        return this.e1w_1;
      }
    }
    initMetadataForClass($, 'JsonPrimitiveDecoder');
    JsonPrimitiveDecoderClass = $;
  }
  return JsonPrimitiveDecoderClass;
}
var JsonTreeMapDecoderClass;
function JsonTreeMapDecoder() {
  if (JsonTreeMapDecoderClass === VOID) {
    class $ extends JsonTreeDecoder() {
      constructor(json, value) {
        super(json, value);
        this.p1w_1 = value;
        this.q1w_1 = toList(this.p1w_1.k3());
        this.r1w_1 = imul(this.q1w_1.c1(), 2);
        this.s1w_1 = -1;
      }
      v1() {
        return this.p1w_1;
      }
      h1i(descriptor, index) {
        var i = index / 2 | 0;
        return this.q1w_1.e1(i);
      }
      m14(descriptor) {
        while (this.s1w_1 < (this.r1w_1 - 1 | 0)) {
          this.s1w_1 = this.s1w_1 + 1 | 0;
          return this.s1w_1;
        }
        return -1;
      }
      r1u(tag) {
        return (this.s1w_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.p1w_1, tag);
      }
      w13(descriptor) {
      }
    }
    initMetadataForClass($, 'JsonTreeMapDecoder');
    JsonTreeMapDecoderClass = $;
  }
  return JsonTreeMapDecoderClass;
}
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new (JsonTreeDecoder())(_this__u8e3s4, element, discriminator, deserializer.fz())).u13(deserializer);
}
//region block: exports
export {
  readPolymorphicJson as readPolymorphicJson7wfdzotvo8aj,
};
//endregion

//# sourceMappingURL=TreeJsonDecoder.mjs.map
