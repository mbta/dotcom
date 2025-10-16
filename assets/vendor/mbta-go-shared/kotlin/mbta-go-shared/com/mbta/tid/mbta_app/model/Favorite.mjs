import { LinkedHashSetSerializer3ncla559t2lx7 as LinkedHashSetSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  IntSerializer_getInstance2q7s8kvk1il5u as IntSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_Favorites_$serializer$stable;
var com_mbta_tid_mbta_app_model_Favorites$stable;
var com_mbta_tid_mbta_app_model_RouteStopDirection_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteStopDirection$stable;
function Favorites$Companion$$childSerializers$_anonymous__fy7dw3() {
  return new (LinkedHashSetSerializer())($serializer_getInstance_0());
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
        tmp.o91_1 = [lazy(tmp_0, Favorites$Companion$$childSerializers$_anonymous__fy7dw3)];
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.Favorites', this, 1);
        tmp0_serialDesc.p1b('routeStopDirection', true);
        this.p91_1 = tmp0_serialDesc;
      }
      q91(encoder, value) {
        var tmp0_desc = this.p91_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance().o91_1;
        if (tmp1_output.t15(tmp0_desc, 0) ? true : !(value.r91_1 == null)) {
          tmp1_output.p15(tmp0_desc, 0, tmp2_cached[0].v1(), value.r91_1);
        }
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.q91(encoder, value instanceof Favorites() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.p91_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        var tmp6_cached = Companion_getInstance().o91_1;
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.j14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.j14(tmp0_desc, 0, tmp6_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return Favorites().s91(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.p91_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance().o91_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [get_nullable(tmp0_cached[0].v1())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
var FavoritesClass;
function Favorites() {
  if (FavoritesClass === VOID) {
    class $ {
      constructor(routeStopDirection) {
        Companion_getInstance();
        routeStopDirection = routeStopDirection === VOID ? null : routeStopDirection;
        this.r91_1 = routeStopDirection;
      }
      t91(routeStopDirection) {
        return new (Favorites())(routeStopDirection);
      }
      toString() {
        return 'Favorites(routeStopDirection=' + toString(this.r91_1) + ')';
      }
      hashCode() {
        return this.r91_1 == null ? 0 : hashCode(this.r91_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Favorites()))
          return false;
        var tmp0_other_with_cast = other instanceof Favorites() ? other : THROW_CCE();
        if (!equals(this.r91_1, tmp0_other_with_cast.r91_1))
          return false;
        return true;
      }
      static s91(seen0, routeStopDirection, serializationConstructorMarker) {
        Companion_getInstance();
        if (!(0 === (0 & seen0))) {
          throwMissingFieldException(seen0, 0, $serializer_getInstance().p91_1);
        }
        var $this = createThis(this);
        if (0 === (seen0 & 1))
          $this.r91_1 = null;
        else
          $this.r91_1 = routeStopDirection;
        return $this;
      }
    }
    initMetadataForClass($, 'Favorites', Favorites, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    FavoritesClass = $;
  }
  return FavoritesClass;
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
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteStopDirection', this, 3);
        tmp0_serialDesc.p1b('route', false);
        tmp0_serialDesc.p1b('stop', false);
        tmp0_serialDesc.p1b('direction', false);
        this.u91_1 = tmp0_serialDesc;
      }
      v91(encoder, value) {
        var tmp0_desc = this.u91_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.f8j_1);
        tmp1_output.l15(tmp0_desc, 1, value.g8j_1);
        tmp1_output.g15(tmp0_desc, 2, value.h8j_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.v91(encoder, value instanceof RouteStopDirection() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.u91_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = 0;
        var tmp7_input = decoder.v13(tmp0_desc);
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.a14(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.f14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.a14(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return RouteStopDirection().w91(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.u91_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), StringSerializer_getInstance(), IntSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_0() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
var RouteStopDirectionClass;
function RouteStopDirection() {
  if (RouteStopDirectionClass === VOID) {
    class $ {
      constructor(route, stop, direction) {
        this.f8j_1 = route;
        this.g8j_1 = stop;
        this.h8j_1 = direction;
      }
      toString() {
        return 'RouteStopDirection(route=' + this.f8j_1 + ', stop=' + this.g8j_1 + ', direction=' + this.h8j_1 + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.f8j_1);
        result = imul(result, 31) + getStringHashCode(this.g8j_1) | 0;
        result = imul(result, 31) + this.h8j_1 | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteStopDirection()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteStopDirection() ? other : THROW_CCE();
        if (!(this.f8j_1 === tmp0_other_with_cast.f8j_1))
          return false;
        if (!(this.g8j_1 === tmp0_other_with_cast.g8j_1))
          return false;
        if (!(this.h8j_1 === tmp0_other_with_cast.h8j_1))
          return false;
        return true;
      }
      static w91(seen0, route, stop, direction, serializationConstructorMarker) {
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_0().u91_1);
        }
        var $this = createThis(this);
        $this.f8j_1 = route;
        $this.g8j_1 = stop;
        $this.h8j_1 = direction;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteStopDirection', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    RouteStopDirectionClass = $;
  }
  return RouteStopDirectionClass;
}
//region block: init
com_mbta_tid_mbta_app_model_Favorites_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_Favorites$stable = 8;
com_mbta_tid_mbta_app_model_RouteStopDirection_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteStopDirection$stable = 0;
Companion_instance_0 = new (Companion_0())();
//endregion
//region block: exports
export {
  Favorites as Favorites2lbq3pa2e14l4,
  RouteStopDirection as RouteStopDirection3fy5ulsis346f,
};
//endregion

//# sourceMappingURL=Favorite.mjs.map
