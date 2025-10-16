import { ObjectSerializer2kjkucmygguwd as ObjectSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/ObjectSerializer.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import {
  $serializer_getInstance2d5oenje96dnl as $serializer_getInstance,
  $serializer_getInstance3dtfp35y3etv6 as $serializer_getInstance_0,
  $serializer_getInstance26yboyslys3kt as $serializer_getInstance_1,
} from '../model/StopDetailsFilters.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import { StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import {
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
  SerializerFactory1qv9hivitncuv as SerializerFactory,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  createThis2j2avj17cvnv2 as createThis,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Companion_getInstance1w6yhos1auz8 as Companion_getInstance } from '../model/routeDetailsPage/RoutePickerPath.mjs';
import { Companion_getInstance2uhn9jkmyi5sr as Companion_getInstance_0 } from '../model/routeDetailsPage/RouteDetailsContext.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_routes_SheetRoutes_Favorites$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_NearbyTransit$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_StopDetails_$serializer$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_StopDetails$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_RoutePicker_$serializer$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_RoutePicker$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_RouteDetails_$serializer$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_RouteDetails$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_EditFavorites$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_TripDetails_$serializer$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes_TripDetails$stable;
var com_mbta_tid_mbta_app_routes_SheetRoutes$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.za6_1.v1();
}
function SheetRoutes$Favorites$_anonymous__j4zzk5() {
  var tmp = Favorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.Favorites', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_0($this) {
  return $this.aa7_1.v1();
}
function SheetRoutes$NearbyTransit$_anonymous__yu4dha() {
  var tmp = NearbyTransit_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.NearbyTransit', tmp, tmp$ret$2);
}
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
function Companion_getInstance_1() {
  return Companion_instance;
}
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.routes.SheetRoutes.StopDetails', this, 3);
        tmp0_serialDesc.p1b('stopId', false);
        tmp0_serialDesc.p1b('stopFilter', false);
        tmp0_serialDesc.p1b('tripFilter', false);
        this.ba7_1 = tmp0_serialDesc;
      }
      ca7(encoder, value) {
        var tmp0_desc = this.ba7_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.l15(tmp0_desc, 0, value.da7_1);
        tmp1_output.p15(tmp0_desc, 1, $serializer_getInstance(), value.ea7_1);
        tmp1_output.p15(tmp0_desc, 2, $serializer_getInstance_0(), value.fa7_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.ca7(encoder, value instanceof StopDetails() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.ba7_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, $serializer_getInstance_0(), tmp6_local2);
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
                tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, $serializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.j14(tmp0_desc, 2, $serializer_getInstance_0(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return StopDetails().ga7(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.ba7_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), get_nullable($serializer_getInstance()), get_nullable($serializer_getInstance_0())];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass = $;
  }
  return $serializerClass;
}
var $serializer_instance;
function $serializer_getInstance_2() {
  if ($serializer_instance === VOID)
    new ($serializer())();
  return $serializer_instance;
}
function SheetRoutes$RoutePicker$Companion$$childSerializers$_anonymous__984y6q() {
  return Companion_getInstance().r1n();
}
function SheetRoutes$RoutePicker$Companion$$childSerializers$_anonymous__984y6q_0() {
  return Companion_getInstance_0().r1n();
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, SheetRoutes$RoutePicker$Companion$$childSerializers$_anonymous__984y6q);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.ha7_1 = [tmp_1, lazy(tmp_2, SheetRoutes$RoutePicker$Companion$$childSerializers$_anonymous__984y6q_0)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_2() {
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
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.routes.SheetRoutes.RoutePicker', this, 2);
        tmp0_serialDesc.p1b('path', false);
        tmp0_serialDesc.p1b('context', false);
        this.ia7_1 = tmp0_serialDesc;
      }
      ja7(encoder, value) {
        var tmp0_desc = this.ia7_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_2().ha7_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.ka7_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.la7_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.ja7(encoder, value instanceof RoutePicker() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.ia7_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance_2().ha7_1;
        if (tmp6_input.l14()) {
          tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, tmp7_cached[0].v1(), tmp4_local0);
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
                tmp4_local0 = tmp6_input.h14(tmp0_desc, 0, tmp7_cached[0].v1(), tmp4_local0);
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
        return RoutePicker().ma7(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.ia7_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_2().ha7_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [tmp0_cached[0].v1(), tmp0_cached[1].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_0 = $;
  }
  return $serializerClass_0;
}
var $serializer_instance_0;
function $serializer_getInstance_3() {
  if ($serializer_instance_0 === VOID)
    new ($serializer_0())();
  return $serializer_instance_0;
}
function SheetRoutes$RouteDetails$Companion$$childSerializers$_anonymous__4m70fe() {
  return Companion_getInstance_0().r1n();
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        Companion_instance_1 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.na7_1 = [null, lazy(tmp_0, SheetRoutes$RouteDetails$Companion$$childSerializers$_anonymous__4m70fe)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_3() {
  if (Companion_instance_1 === VOID)
    new (Companion_1())();
  return Companion_instance_1;
}
var $serializerClass_1;
function $serializer_1() {
  if ($serializerClass_1 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_1 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.routes.SheetRoutes.RouteDetails', this, 2);
        tmp0_serialDesc.p1b('routeId', false);
        tmp0_serialDesc.p1b('context', false);
        this.oa7_1 = tmp0_serialDesc;
      }
      pa7(encoder, value) {
        var tmp0_desc = this.oa7_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_3().na7_1;
        tmp1_output.l15(tmp0_desc, 0, value.qa7_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.ra7_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.pa7(encoder, value instanceof RouteDetails() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.oa7_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_input = decoder.v13(tmp0_desc);
        var tmp7_cached = Companion_getInstance_3().na7_1;
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
        return RouteDetails().sa7(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
      }
      fz() {
        return this.oa7_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_3().na7_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), tmp0_cached[1].v1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_1 = $;
  }
  return $serializerClass_1;
}
var $serializer_instance_1;
function $serializer_getInstance_4() {
  if ($serializer_instance_1 === VOID)
    new ($serializer_1())();
  return $serializer_instance_1;
}
function _get_$cachedSerializer__te6jhj_1($this) {
  return $this.ta7_1.v1();
}
function SheetRoutes$EditFavorites$_anonymous__gmqmz() {
  var tmp = EditFavorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.EditFavorites', tmp, tmp$ret$2);
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
function Companion_getInstance_4() {
  return Companion_instance_2;
}
var $serializerClass_2;
function $serializer_2() {
  if ($serializerClass_2 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_2 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.routes.SheetRoutes.TripDetails', this, 1);
        tmp0_serialDesc.p1b('filter', false);
        this.ua7_1 = tmp0_serialDesc;
      }
      va7(encoder, value) {
        var tmp0_desc = this.ua7_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        tmp1_output.n15(tmp0_desc, 0, $serializer_getInstance_1(), value.wa7_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.va7(encoder, value instanceof TripDetails() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.ua7_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_input = decoder.v13(tmp0_desc);
        if (tmp5_input.l14()) {
          tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, $serializer_getInstance_1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp5_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp5_input.h14(tmp0_desc, 0, $serializer_getInstance_1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp5_input.w13(tmp0_desc);
        return TripDetails().xa7(tmp3_bitMask0, tmp4_local0, null);
      }
      fz() {
        return this.ua7_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [$serializer_getInstance_1()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_2 = $;
  }
  return $serializerClass_2;
}
var $serializer_instance_2;
function $serializer_getInstance_5() {
  if ($serializer_instance_2 === VOID)
    new ($serializer_2())();
  return $serializer_instance_2;
}
function _get_$cachedSerializer__te6jhj_2($this) {
  return $this.ya7_1.v1();
}
function SheetRoutes$Companion$_anonymous__msgqva() {
  var tmp = getKClass(SheetRoutes());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(EditFavorites()), getKClass(Favorites()), getKClass(NearbyTransit()), getKClass(RouteDetails()), getKClass(RoutePicker()), getKClass(StopDetails()), getKClass(TripDetails())];
  var tmp_1 = EditFavorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [];
  var tmp_2 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.EditFavorites', tmp_1, tmp$ret$5);
  var tmp_3 = Favorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$8 = [];
  var tmp_4 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.Favorites', tmp_3, tmp$ret$8);
  var tmp_5 = NearbyTransit_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$11 = [];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_6 = [tmp_2, tmp_4, ObjectSerializer().s1c('com.mbta.tid.mbta_app.routes.SheetRoutes.NearbyTransit', tmp_5, tmp$ret$11), $serializer_getInstance_4(), $serializer_getInstance_3(), $serializer_getInstance_2(), $serializer_getInstance_5()];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$17 = [];
  return SealedClassSerializer().m10('com.mbta.tid.mbta_app.routes.SheetRoutes', tmp, tmp_0, tmp_6, tmp$ret$17);
}
var FavoritesClass;
function Favorites() {
  if (FavoritesClass === VOID) {
    class $ extends SheetRoutes() {
      constructor() {
        Favorites_instance = null;
        super();
        Favorites_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.za6_1 = lazy(tmp_0, SheetRoutes$Favorites$_anonymous__j4zzk5);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Favorites';
      }
      hashCode() {
        return 2083996826;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Favorites()))
          return false;
        other instanceof Favorites() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Favorites', VOID, VOID, [SheetRoutes(), SerializerFactory()], VOID, VOID, {0: Favorites_getInstance});
    FavoritesClass = $;
  }
  return FavoritesClass;
}
var Favorites_instance;
function Favorites_getInstance() {
  if (Favorites_instance === VOID)
    new (Favorites())();
  return Favorites_instance;
}
var NearbyTransitClass;
function NearbyTransit() {
  if (NearbyTransitClass === VOID) {
    class $ extends SheetRoutes() {
      constructor() {
        NearbyTransit_instance = null;
        super();
        NearbyTransit_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.aa7_1 = lazy(tmp_0, SheetRoutes$NearbyTransit$_anonymous__yu4dha);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_0(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'NearbyTransit';
      }
      hashCode() {
        return 986801943;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NearbyTransit()))
          return false;
        other instanceof NearbyTransit() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'NearbyTransit', VOID, VOID, [SheetRoutes(), SerializerFactory()], VOID, VOID, {0: NearbyTransit_getInstance});
    NearbyTransitClass = $;
  }
  return NearbyTransitClass;
}
var NearbyTransit_instance;
function NearbyTransit_getInstance() {
  if (NearbyTransit_instance === VOID)
    new (NearbyTransit())();
  return NearbyTransit_instance;
}
var StopDetailsClass;
function StopDetails() {
  if (StopDetailsClass === VOID) {
    class $ extends SheetRoutes() {
      toString() {
        return 'StopDetails(stopId=' + this.da7_1 + ', stopFilter=' + toString_0(this.ea7_1) + ', tripFilter=' + toString_0(this.fa7_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.da7_1);
        result = imul(result, 31) + (this.ea7_1 == null ? 0 : this.ea7_1.hashCode()) | 0;
        result = imul(result, 31) + (this.fa7_1 == null ? 0 : this.fa7_1.hashCode()) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StopDetails()))
          return false;
        var tmp0_other_with_cast = other instanceof StopDetails() ? other : THROW_CCE();
        if (!(this.da7_1 === tmp0_other_with_cast.da7_1))
          return false;
        if (!equals(this.ea7_1, tmp0_other_with_cast.ea7_1))
          return false;
        if (!equals(this.fa7_1, tmp0_other_with_cast.fa7_1))
          return false;
        return true;
      }
      static ga7(seen0, stopId, stopFilter, tripFilter, serializationConstructorMarker) {
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_2().ba7_1);
        }
        var $this = this.za7(seen0, serializationConstructorMarker);
        $this.da7_1 = stopId;
        $this.ea7_1 = stopFilter;
        $this.fa7_1 = tripFilter;
        return $this;
      }
    }
    initMetadataForClass($, 'StopDetails', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_2});
    StopDetailsClass = $;
  }
  return StopDetailsClass;
}
var RoutePickerClass;
function RoutePicker() {
  if (RoutePickerClass === VOID) {
    class $ extends SheetRoutes() {
      toString() {
        return 'RoutePicker(path=' + toString(this.ka7_1) + ', context=' + toString(this.la7_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.ka7_1);
        result = imul(result, 31) + hashCode(this.la7_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RoutePicker()))
          return false;
        var tmp0_other_with_cast = other instanceof RoutePicker() ? other : THROW_CCE();
        if (!equals(this.ka7_1, tmp0_other_with_cast.ka7_1))
          return false;
        if (!equals(this.la7_1, tmp0_other_with_cast.la7_1))
          return false;
        return true;
      }
      static ma7(seen0, path, context, serializationConstructorMarker) {
        Companion_getInstance_2();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_3().ia7_1);
        }
        var $this = this.za7(seen0, serializationConstructorMarker);
        $this.ka7_1 = path;
        $this.la7_1 = context;
        return $this;
      }
    }
    initMetadataForClass($, 'RoutePicker', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_3});
    RoutePickerClass = $;
  }
  return RoutePickerClass;
}
var RouteDetailsClass;
function RouteDetails() {
  if (RouteDetailsClass === VOID) {
    class $ extends SheetRoutes() {
      toString() {
        return 'RouteDetails(routeId=' + this.qa7_1 + ', context=' + toString(this.ra7_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.qa7_1);
        result = imul(result, 31) + hashCode(this.ra7_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteDetails()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteDetails() ? other : THROW_CCE();
        if (!(this.qa7_1 === tmp0_other_with_cast.qa7_1))
          return false;
        if (!equals(this.ra7_1, tmp0_other_with_cast.ra7_1))
          return false;
        return true;
      }
      static sa7(seen0, routeId, context, serializationConstructorMarker) {
        Companion_getInstance_3();
        if (!(3 === (3 & seen0))) {
          throwMissingFieldException(seen0, 3, $serializer_getInstance_4().oa7_1);
        }
        var $this = this.za7(seen0, serializationConstructorMarker);
        $this.qa7_1 = routeId;
        $this.ra7_1 = context;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteDetails', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_4});
    RouteDetailsClass = $;
  }
  return RouteDetailsClass;
}
var EditFavoritesClass;
function EditFavorites() {
  if (EditFavoritesClass === VOID) {
    class $ extends SheetRoutes() {
      constructor() {
        EditFavorites_instance = null;
        super();
        EditFavorites_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.ta7_1 = lazy(tmp_0, SheetRoutes$EditFavorites$_anonymous__gmqmz);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_1(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'EditFavorites';
      }
      hashCode() {
        return 1845970992;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof EditFavorites()))
          return false;
        other instanceof EditFavorites() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'EditFavorites', VOID, VOID, [SheetRoutes(), SerializerFactory()], VOID, VOID, {0: EditFavorites_getInstance});
    EditFavoritesClass = $;
  }
  return EditFavoritesClass;
}
var EditFavorites_instance;
function EditFavorites_getInstance() {
  if (EditFavorites_instance === VOID)
    new (EditFavorites())();
  return EditFavorites_instance;
}
var TripDetailsClass;
function TripDetails() {
  if (TripDetailsClass === VOID) {
    class $ extends SheetRoutes() {
      toString() {
        return 'TripDetails(filter=' + this.wa7_1.toString() + ')';
      }
      hashCode() {
        return this.wa7_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof TripDetails()))
          return false;
        var tmp0_other_with_cast = other instanceof TripDetails() ? other : THROW_CCE();
        if (!this.wa7_1.equals(tmp0_other_with_cast.wa7_1))
          return false;
        return true;
      }
      static xa7(seen0, filter, serializationConstructorMarker) {
        if (!(1 === (1 & seen0))) {
          throwMissingFieldException(seen0, 1, $serializer_getInstance_5().ua7_1);
        }
        var $this = this.za7(seen0, serializationConstructorMarker);
        $this.wa7_1 = filter;
        return $this;
      }
    }
    initMetadataForClass($, 'TripDetails', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_5});
    TripDetailsClass = $;
  }
  return TripDetailsClass;
}
var CompanionClass_3;
function Companion_3() {
  if (CompanionClass_3 === VOID) {
    class $ {
      constructor() {
        Companion_instance_3 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.ya7_1 = lazy(tmp_0, SheetRoutes$Companion$_anonymous__msgqva);
      }
      aa8(first, second) {
        var tmp;
        var tmp_0;
        if (first instanceof StopDetails()) {
          tmp_0 = second instanceof StopDetails();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = !(first.da7_1 === second.da7_1);
        } else {
          tmp = !equals(first, second);
        }
        return tmp;
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_2(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass_3 = $;
  }
  return CompanionClass_3;
}
var Companion_instance_3;
function Companion_getInstance_5() {
  if (Companion_instance_3 === VOID)
    new (Companion_3())();
  return Companion_instance_3;
}
var SheetRoutesClass;
function SheetRoutes() {
  if (SheetRoutesClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance_5();
      }
      static za7(seen0, serializationConstructorMarker) {
        Companion_getInstance_5();
        return createThis(this);
      }
    }
    initMetadataForClass($, 'SheetRoutes', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance_5});
    SheetRoutesClass = $;
  }
  return SheetRoutesClass;
}
//region block: init
com_mbta_tid_mbta_app_routes_SheetRoutes_Favorites$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_NearbyTransit$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_StopDetails_$serializer$stable = 8;
com_mbta_tid_mbta_app_routes_SheetRoutes_StopDetails$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_RoutePicker_$serializer$stable = 8;
com_mbta_tid_mbta_app_routes_SheetRoutes_RoutePicker$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_RouteDetails_$serializer$stable = 8;
com_mbta_tid_mbta_app_routes_SheetRoutes_RouteDetails$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_EditFavorites$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes_TripDetails_$serializer$stable = 8;
com_mbta_tid_mbta_app_routes_SheetRoutes_TripDetails$stable = 0;
com_mbta_tid_mbta_app_routes_SheetRoutes$stable = 0;
Companion_instance = new (Companion())();
Companion_instance_2 = new (Companion_2())();
//endregion
//region block: exports
export {
  Favorites as Favorites2fqnzu45p6t0x,
  NearbyTransit as NearbyTransit2qhr1v7erhouy,
  RouteDetails as RouteDetails14kr3bwahz8pz,
  RoutePicker as RoutePicker1mu57bwhbf213,
  StopDetails as StopDetails2qwm6lav9cmjx,
  Companion_getInstance_5 as Companion_getInstance12wwo4vp1ltr7,
  Favorites_getInstance as Favorites_getInstance3togomol211bi,
  NearbyTransit_getInstance as NearbyTransit_getInstancejl45kk1axml2,
};
//endregion

//# sourceMappingURL=SheetRoutes.mjs.map
