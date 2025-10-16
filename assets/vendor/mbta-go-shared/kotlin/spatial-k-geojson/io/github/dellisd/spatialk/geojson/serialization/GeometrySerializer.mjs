import {
  JsonArrayBuilderu8edol6ui3pj as JsonArrayBuilder,
  JsonObjectBuilder2nl6rv6vdayuk as JsonObjectBuilder,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElementBuilders.mjs';
import {
  JsonPrimitive2fp8648nd60dn as JsonPrimitive,
  get_jsonObject2u4z2ch1uuca9 as get_jsonObject,
  JsonPrimitiveolttw629wj53 as JsonPrimitive_0,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonElement.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { SEALED_getInstance3nsev85ow9059 as SEALED_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptors.mjs';
import { JsonDecoder1rijst5ne6qla as JsonDecoder } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonDecoder.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { SerializationExceptioneqrdve3ts2n9 as SerializationException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  Companion_instance2g2g24473apoz as Companion_instance,
  Geometry1mskyaxwfg3x4 as Geometry,
} from '../Geometry.mjs';
import { JsonEncoder1qlse6simkfi1 as JsonEncoder } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-json/kotlinx/serialization/json/JsonEncoder.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { GeometryCollection9es8rd9xg8f4 as GeometryCollection } from '../GeometryCollection.mjs';
import { MultiPolygon1zdy4pbyiwmu9 as MultiPolygon } from '../MultiPolygon.mjs';
import { Polygon1b9vogpxco34z as Polygon } from '../Polygon.mjs';
import { MultiLineString3nml0jg8am8is as MultiLineString } from '../MultiLineString.mjs';
import { LineStringssyj4jv3rpxh as LineString } from '../LineString.mjs';
import { MultiPoint2ax03dtqdaccf as MultiPoint } from '../MultiPoint.mjs';
import { Point298ix16jijg5m as Point } from '../Point.mjs';
import { BoundingBoxSerializer_instance1ogrnw1yjt4t8 as BoundingBoxSerializer_instance } from './BoundingBoxSerializer.mjs';
import { KSerializerzf77vz1967fq as KSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toJsonArray($this, _this__u8e3s4) {
  // Inline function 'kotlinx.serialization.json.buildJsonArray' call
  var builder = new (JsonArrayBuilder())();
  builder.x1n(JsonPrimitive(_this__u8e3s4.b1z()));
  builder.x1n(JsonPrimitive(_this__u8e3s4.c1z()));
  var tmp0_safe_receiver = _this__u8e3s4.d1z();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    builder.x1n(JsonPrimitive(tmp0_safe_receiver));
  }
  return builder.o1m();
}
var GeometrySerializerClass;
function GeometrySerializer() {
  if (GeometrySerializerClass === VOID) {
    class $ {
      fz() {
        return buildSerialDescriptor('Geometry', SEALED_getInstance(), []);
      }
      hz(decoder) {
        if ((isInterface(decoder, JsonDecoder()) ? decoder : null) == null)
          throw SerializationException().w10('This class can only be loaded from JSON');
        return Companion_instance.y1x(get_jsonObject(decoder.h1n()));
      }
      i1z(encoder, value) {
        if ((isInterface(encoder, JsonEncoder()) ? encoder : null) == null)
          throw SerializationException().w10('This class can only be saved as JSON');
        encoder.y1o(this.j1z(value));
      }
      gz(encoder, value) {
        return this.i1z(encoder, value instanceof Geometry() ? value : THROW_CCE());
      }
      j1z(_this__u8e3s4) {
        // Inline function 'kotlinx.serialization.json.buildJsonObject' call
        var builder = new (JsonObjectBuilder())();
        if (_this__u8e3s4 instanceof Point()) {
          builder.z1n('type', JsonPrimitive_0('Point'));
          builder.z1n('coordinates', toJsonArray(GeometrySerializer_instance, _this__u8e3s4.t1y_1));
        } else {
          if (_this__u8e3s4 instanceof MultiPoint()) {
            builder.z1n('type', JsonPrimitive_0('MultiPoint'));
            // Inline function 'kotlinx.serialization.json.buildJsonArray' call
            var builder_0 = new (JsonArrayBuilder())();
            // Inline function 'kotlin.collections.forEach' call
            var _iterator__ex2g4s = _this__u8e3s4.n1y_1.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              builder_0.x1n(toJsonArray(GeometrySerializer_instance, element));
            }
            var tmp$ret$3 = builder_0.o1m();
            builder.z1n('coordinates', tmp$ret$3);
          } else {
            if (_this__u8e3s4 instanceof LineString()) {
              builder.z1n('type', JsonPrimitive_0('LineString'));
              // Inline function 'kotlinx.serialization.json.buildJsonArray' call
              var builder_1 = new (JsonArrayBuilder())();
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_0 = _this__u8e3s4.g1y_1.x();
              while (_iterator__ex2g4s_0.y()) {
                var element_0 = _iterator__ex2g4s_0.z();
                builder_1.x1n(toJsonArray(GeometrySerializer_instance, element_0));
              }
              var tmp$ret$7 = builder_1.o1m();
              builder.z1n('coordinates', tmp$ret$7);
            } else {
              if (_this__u8e3s4 instanceof MultiLineString()) {
                builder.z1n('type', JsonPrimitive_0('MultiLineString'));
                // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                var builder_2 = new (JsonArrayBuilder())();
                // Inline function 'kotlin.collections.forEach' call
                var _iterator__ex2g4s_1 = _this__u8e3s4.k1y_1.x();
                while (_iterator__ex2g4s_1.y()) {
                  var element_1 = _iterator__ex2g4s_1.z();
                  // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                  var builder_3 = new (JsonArrayBuilder())();
                  // Inline function 'kotlin.collections.forEach' call
                  var _iterator__ex2g4s_2 = element_1.x();
                  while (_iterator__ex2g4s_2.y()) {
                    var element_2 = _iterator__ex2g4s_2.z();
                    builder_3.x1n(toJsonArray(GeometrySerializer_instance, element_2));
                  }
                  var tmp$ret$11 = builder_3.o1m();
                  builder_2.x1n(tmp$ret$11);
                }
                var tmp$ret$15 = builder_2.o1m();
                builder.z1n('coordinates', tmp$ret$15);
              } else {
                if (_this__u8e3s4 instanceof Polygon()) {
                  builder.z1n('type', JsonPrimitive_0('Polygon'));
                  // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                  var builder_4 = new (JsonArrayBuilder())();
                  // Inline function 'kotlin.collections.forEach' call
                  var _iterator__ex2g4s_3 = _this__u8e3s4.w1y_1.x();
                  while (_iterator__ex2g4s_3.y()) {
                    var element_3 = _iterator__ex2g4s_3.z();
                    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                    var builder_5 = new (JsonArrayBuilder())();
                    // Inline function 'kotlin.collections.forEach' call
                    var _iterator__ex2g4s_4 = element_3.x();
                    while (_iterator__ex2g4s_4.y()) {
                      var element_4 = _iterator__ex2g4s_4.z();
                      builder_5.x1n(toJsonArray(GeometrySerializer_instance, element_4));
                    }
                    var tmp$ret$19 = builder_5.o1m();
                    builder_4.x1n(tmp$ret$19);
                  }
                  var tmp$ret$23 = builder_4.o1m();
                  builder.z1n('coordinates', tmp$ret$23);
                } else {
                  if (_this__u8e3s4 instanceof MultiPolygon()) {
                    builder.z1n('type', JsonPrimitive_0('MultiPolygon'));
                    // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                    var builder_6 = new (JsonArrayBuilder())();
                    // Inline function 'kotlin.collections.forEach' call
                    var _iterator__ex2g4s_5 = _this__u8e3s4.q1y_1.x();
                    while (_iterator__ex2g4s_5.y()) {
                      var element_5 = _iterator__ex2g4s_5.z();
                      // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                      var builder_7 = new (JsonArrayBuilder())();
                      // Inline function 'kotlin.collections.forEach' call
                      var _iterator__ex2g4s_6 = element_5.x();
                      while (_iterator__ex2g4s_6.y()) {
                        var element_6 = _iterator__ex2g4s_6.z();
                        // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                        var builder_8 = new (JsonArrayBuilder())();
                        // Inline function 'kotlin.collections.forEach' call
                        var _iterator__ex2g4s_7 = element_6.x();
                        while (_iterator__ex2g4s_7.y()) {
                          var element_7 = _iterator__ex2g4s_7.z();
                          builder_8.x1n(toJsonArray(GeometrySerializer_instance, element_7));
                        }
                        var tmp$ret$27 = builder_8.o1m();
                        builder_7.x1n(tmp$ret$27);
                      }
                      var tmp$ret$31 = builder_7.o1m();
                      builder_6.x1n(tmp$ret$31);
                    }
                    var tmp$ret$35 = builder_6.o1m();
                    builder.z1n('coordinates', tmp$ret$35);
                  } else {
                    if (_this__u8e3s4 instanceof GeometryCollection()) {
                      builder.z1n('type', JsonPrimitive_0('GeometryCollection'));
                      // Inline function 'kotlinx.serialization.json.buildJsonArray' call
                      var builder_9 = new (JsonArrayBuilder())();
                      // Inline function 'kotlin.collections.forEach' call
                      var _iterator__ex2g4s_8 = _this__u8e3s4.b1y_1.x();
                      while (_iterator__ex2g4s_8.y()) {
                        var element_8 = _iterator__ex2g4s_8.z();
                        builder_9.x1n(GeometrySerializer_instance.j1z(element_8));
                      }
                      var tmp$ret$39 = builder_9.o1m();
                      builder.z1n('geometries', tmp$ret$39);
                    }
                  }
                }
              }
            }
          }
        }
        var tmp1_safe_receiver = _this__u8e3s4.a1y();
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          builder.z1n('bbox', BoundingBoxSerializer_instance.h1z(tmp1_safe_receiver));
        }
        return builder.o1m();
      }
    }
    initMetadataForObject($, 'GeometrySerializer', VOID, VOID, [KSerializer()]);
    GeometrySerializerClass = $;
  }
  return GeometrySerializerClass;
}
var GeometrySerializer_instance;
function GeometrySerializer_getInstance() {
  return GeometrySerializer_instance;
}
//region block: init
GeometrySerializer_instance = new (GeometrySerializer())();
//endregion
//region block: exports
export {
  GeometrySerializer_getInstance as GeometrySerializer_getInstance1ncsg6chm8thv,
};
//endregion

//# sourceMappingURL=GeometrySerializer.mjs.map
