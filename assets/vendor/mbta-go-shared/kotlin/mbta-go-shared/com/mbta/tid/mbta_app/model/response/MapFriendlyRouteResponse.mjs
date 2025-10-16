import { $serializer_getInstance3n2hmwvfzftwm as $serializer_getInstance } from '../SegmentedRouteShape.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_RouteWithSegmentedShapes_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_RouteWithSegmentedShapes$stable;
var com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_$serializer$stable;
var com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse$stable;
function MapFriendlyRouteResponse$RouteWithSegmentedShapes$Companion$$childSerializers$_anonymous__z2smfo() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.q9n_1 = [null, lazy(tmp_0, MapFriendlyRouteResponse$RouteWithSegmentedShapes$Companion$$childSerializers$_anonymous__z2smfo)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.MapFriendlyRouteResponse.RouteWithSegmentedShapes', this, 2);
        tmp0_serialDesc.p1b('route_id', false);
        tmp0_serialDesc.p1b('route_shapes', false);
        this.r9n_1 = tmp0_serialDesc;
      }
      s9n(encoder, value) {
        var tmp0_desc = this.r9n_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().q9n_1;
        tmp1_output.l15(tmp0_desc, 0, value.m8r_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.n8r_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.s9n(encoder, value instanceof RouteWithSegmentedShapes() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.r9n_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance().q9n_1;
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, tmp7_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp6_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp6_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp6_input.h14(tmp0_desc, 1, tmp7_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp6_input.w13(tmp0_desc);
        return RouteWithSegmentedShapes().t9n(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.r9n_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().q9n_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), tmp0_cached[1].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_0() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
function MapFriendlyRouteResponse$Companion$$childSerializers$_anonymous__kj4djt() {
  return new (ArrayListSerializer())($serializer_getInstance_0());
}
var RouteWithSegmentedShapesClass;
function RouteWithSegmentedShapes() {
  if (RouteWithSegmentedShapesClass === VOID) {
    class $ {
      constructor(routeId, segmentedShapes) {
        Companion_getInstance();
        this.m8r_1 = routeId;
        this.n8r_1 = segmentedShapes;
      }
      toString() {
        return 'RouteWithSegmentedShapes(routeId=' + this.m8r_1 + ', segmentedShapes=' + toString(this.n8r_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.m8r_1);
        result = imul(result, 31) + hashCode(this.n8r_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteWithSegmentedShapes()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteWithSegmentedShapes() ? other : THROW_CCE();
        if (!(this.m8r_1 === tmp0_other_with_cast.m8r_1))
          return false;
        if (!equals(this.n8r_1, tmp0_other_with_cast.n8r_1))
          return false;
        return true;
      }
      static t9n(seen0, routeId, segmentedShapes, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_0().r9n_1);
        }
        var $this = createThis(this);
        $this.m8r_1 = routeId;
        $this.n8r_1 = segmentedShapes;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteWithSegmentedShapes', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    RouteWithSegmentedShapesClass = $;
  }
  return RouteWithSegmentedShapesClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.u9n_1 = [lazy(tmp_0, MapFriendlyRouteResponse$Companion$$childSerializers$_anonymous__kj4djt)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.response.MapFriendlyRouteResponse', this, 1);
        tmp0_serialDesc.p1b('map_friendly_route_shapes', false);
        this.v9n_1 = tmp0_serialDesc;
      }
      w9n(encoder, value) {
        var tmp0_desc = this.v9n_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().u9n_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.x9n_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.w9n(encoder, value instanceof MapFriendlyRouteResponse() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.v9n_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance_0().u9n_1;
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return MapFriendlyRouteResponse().y9n(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.v9n_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance_0().u9n_1[0].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_1() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
var MapFriendlyRouteResponseClass;
function MapFriendlyRouteResponse() {
  if (MapFriendlyRouteResponseClass === VOID) {
    class $ {
      toString() {
        return '[MapFriendlyRouteResponse]';
      }
      hashCode() {
        return hashCode(this.x9n_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof MapFriendlyRouteResponse()))
          return false;
        var tmp0_other_with_cast = other instanceof MapFriendlyRouteResponse() ? other : THROW_CCE();
        if (!equals(this.x9n_1, tmp0_other_with_cast.x9n_1))
          return false;
        return true;
      }
      static y9n(seen0, routesWithSegmentedShapes, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_1().v9n_1);
        }
        var $this = createThis(this);
        $this.x9n_1 = routesWithSegmentedShapes;
        return $this;
      }
    }
    initMetadataForClass($, 'MapFriendlyRouteResponse', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    MapFriendlyRouteResponseClass = $;
  }
  return MapFriendlyRouteResponseClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_RouteWithSegmentedShapes_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_RouteWithSegmentedShapes$stable = 8;
com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_response_MapFriendlyRouteResponse$stable = 8;
//endregion
//region block: exports
export {
  RouteWithSegmentedShapes as RouteWithSegmentedShapes3k6p6watr7yao,
  MapFriendlyRouteResponse as MapFriendlyRouteResponsezyf83fz5pjlw,
  $serializer_getInstance_0 as $serializer_getInstance310rpur9aq1rx,
};
//endregion

//# sourceMappingURL=MapFriendlyRouteResponse.mjs.map
