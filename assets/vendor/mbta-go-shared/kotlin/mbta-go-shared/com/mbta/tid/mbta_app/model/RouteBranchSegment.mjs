import { createAnnotatedEnumSerializer20ay4pme9p2h9 as createAnnotatedEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import {
  SerializerFactory1qv9hivitncuv as SerializerFactory,
  typeParametersSerializers2likxjr48tr7y as typeParametersSerializers,
  GeneratedSerializer1f7t7hssdd2ws as GeneratedSerializer,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayListSerializer7k5wnrulb3y6 as ArrayListSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/CollectionSerializers.mjs';
import { PluginGeneratedSerialDescriptorqdzeg5asqhfg as PluginGeneratedSerialDescriptor } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginGeneratedSerialDescriptor.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { UnknownFieldExceptiona60e3a6v1xqo as UnknownFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerializationExceptions.mjs';
import {
  StringSerializer_getInstance2wffkbpdux3h9 as StringSerializer_getInstance,
  BooleanSerializer_getInstance1t8habeqgiyq1 as BooleanSerializer_getInstance,
} from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Primitives.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { throwMissingFieldException2cmke0v3ynf14 as throwMissingFieldException } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginExceptions.mjs';
import { get_nullable197rfua9r7fsz as get_nullable } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_RouteBranchSegment_BranchStop_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteBranchSegment_BranchStop$stable;
var com_mbta_tid_mbta_app_model_RouteBranchSegment_StickConnection_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteBranchSegment_StickConnection$stable;
var com_mbta_tid_mbta_app_model_RouteBranchSegment_$serializer$stable;
var com_mbta_tid_mbta_app_model_RouteBranchSegment$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.e96_1.v1();
}
function RouteBranchSegment$Lane$Companion$_anonymous__4v34zd() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['left', 'center', 'right'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.RouteBranchSegment.Lane', tmp, tmp_0, tmp$ret$5, null);
}
var Lane_Left_instance;
var Lane_Center_instance;
var Lane_Right_instance;
function values() {
  return [Lane_Left_getInstance(), Lane_Center_getInstance(), Lane_Right_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.e96_1 = lazy(tmp_0, RouteBranchSegment$Lane$Companion$_anonymous__4v34zd);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
    }
    initMetadataForCompanion($, VOID, [SerializerFactory()]);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  Lane_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var Lane_entriesInitialized;
function Lane_initEntries() {
  if (Lane_entriesInitialized)
    return Unit_instance;
  Lane_entriesInitialized = true;
  Lane_Left_instance = new (Lane())('Left', 0);
  Lane_Center_instance = new (Lane())('Center', 1);
  Lane_Right_instance = new (Lane())('Right', 2);
  Companion_getInstance();
}
function RouteBranchSegment$BranchStop$Companion$$childSerializers$_anonymous__9v18hi() {
  return Companion_getInstance().r1n();
}
function RouteBranchSegment$BranchStop$Companion$$childSerializers$_anonymous__9v18hi_0() {
  return new (ArrayListSerializer())($serializer_getInstance_0());
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, RouteBranchSegment$BranchStop$Companion$$childSerializers$_anonymous__9v18hi);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.f96_1 = [null, tmp_1, lazy(tmp_2, RouteBranchSegment$BranchStop$Companion$$childSerializers$_anonymous__9v18hi_0)];
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
var $serializerClass;
function $serializer() {
  if ($serializerClass === VOID) {
    class $ {
      constructor() {
        $serializer_instance = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteBranchSegment.BranchStop', this, 3);
        tmp0_serialDesc.p1b('stop_id', false);
        tmp0_serialDesc.p1b('stop_lane', false);
        tmp0_serialDesc.p1b('connections', false);
        this.g96_1 = tmp0_serialDesc;
      }
      h96(encoder, value) {
        var tmp0_desc = this.g96_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_0().f96_1;
        tmp1_output.l15(tmp0_desc, 0, value.i96_1);
        tmp1_output.n15(tmp0_desc, 1, tmp2_cached[1].v1(), value.j96_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.k96_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.h96(encoder, value instanceof BranchStop() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.g96_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_input = decoder.v13(tmp0_desc);
        var tmp8_cached = Companion_getInstance_0().f96_1;
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
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
                tmp5_local1 = tmp7_input.h14(tmp0_desc, 1, tmp8_cached[1].v1(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.h14(tmp0_desc, 2, tmp8_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return BranchStop().l96(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.g96_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_0().f96_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), tmp0_cached[1].v1(), tmp0_cached[2].v1()];
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
function RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8() {
  return Companion_getInstance().r1n();
}
function RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_0() {
  return Companion_getInstance().r1n();
}
function RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_1() {
  var tmp = values_0();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['top', 'center', 'bottom'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.RouteBranchSegment.VPos', tmp, tmp_0, tmp$ret$5, null);
}
function RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_2() {
  var tmp = values_0();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['top', 'center', 'bottom'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.RouteBranchSegment.VPos', tmp, tmp_0, tmp$ret$5, null);
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        Companion_instance_1 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_1 = lazy(tmp_0, RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8);
        var tmp_2 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_3 = lazy(tmp_2, RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_0);
        var tmp_4 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        var tmp_5 = lazy(tmp_4, RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_1);
        var tmp_6 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.m96_1 = [null, null, tmp_1, tmp_3, tmp_5, lazy(tmp_6, RouteBranchSegment$StickConnection$Companion$$childSerializers$_anonymous__omb7k8_2)];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 === VOID)
    new (Companion_1())();
  return Companion_instance_1;
}
var $serializerClass_0;
function $serializer_0() {
  if ($serializerClass_0 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_0 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteBranchSegment.StickConnection', this, 6);
        tmp0_serialDesc.p1b('from_stop', false);
        tmp0_serialDesc.p1b('to_stop', false);
        tmp0_serialDesc.p1b('from_lane', false);
        tmp0_serialDesc.p1b('to_lane', false);
        tmp0_serialDesc.p1b('from_vpos', false);
        tmp0_serialDesc.p1b('to_vpos', false);
        this.n96_1 = tmp0_serialDesc;
      }
      o96(encoder, value) {
        var tmp0_desc = this.n96_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_1().m96_1;
        tmp1_output.l15(tmp0_desc, 0, value.p96_1);
        tmp1_output.l15(tmp0_desc, 1, value.q96_1);
        tmp1_output.n15(tmp0_desc, 2, tmp2_cached[2].v1(), value.r96_1);
        tmp1_output.n15(tmp0_desc, 3, tmp2_cached[3].v1(), value.s96_1);
        tmp1_output.n15(tmp0_desc, 4, tmp2_cached[4].v1(), value.t96_1);
        tmp1_output.n15(tmp0_desc, 5, tmp2_cached[5].v1(), value.u96_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.o96(encoder, value instanceof StickConnection() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.n96_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = null;
        var tmp7_local3 = null;
        var tmp8_local4 = null;
        var tmp9_local5 = null;
        var tmp10_input = decoder.v13(tmp0_desc);
        var tmp11_cached = Companion_getInstance_1().m96_1;
        if (tmp10_input.l14()) {
          tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp10_input.f14(tmp0_desc, 1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp10_input.h14(tmp0_desc, 2, tmp11_cached[2].v1(), tmp6_local2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
          tmp7_local3 = tmp10_input.h14(tmp0_desc, 3, tmp11_cached[3].v1(), tmp7_local3);
          tmp3_bitMask0 = tmp3_bitMask0 | 8;
          tmp8_local4 = tmp10_input.h14(tmp0_desc, 4, tmp11_cached[4].v1(), tmp8_local4);
          tmp3_bitMask0 = tmp3_bitMask0 | 16;
          tmp9_local5 = tmp10_input.h14(tmp0_desc, 5, tmp11_cached[5].v1(), tmp9_local5);
          tmp3_bitMask0 = tmp3_bitMask0 | 32;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp10_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp10_input.f14(tmp0_desc, 0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp10_input.f14(tmp0_desc, 1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp10_input.h14(tmp0_desc, 2, tmp11_cached[2].v1(), tmp6_local2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              case 3:
                tmp7_local3 = tmp10_input.h14(tmp0_desc, 3, tmp11_cached[3].v1(), tmp7_local3);
                tmp3_bitMask0 = tmp3_bitMask0 | 8;
                break;
              case 4:
                tmp8_local4 = tmp10_input.h14(tmp0_desc, 4, tmp11_cached[4].v1(), tmp8_local4);
                tmp3_bitMask0 = tmp3_bitMask0 | 16;
                break;
              case 5:
                tmp9_local5 = tmp10_input.h14(tmp0_desc, 5, tmp11_cached[5].v1(), tmp9_local5);
                tmp3_bitMask0 = tmp3_bitMask0 | 32;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp10_input.w13(tmp0_desc);
        return StickConnection().v96(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
      }
      fz() {
        return this.n96_1;
      }
      f1c() {
        var tmp0_cached = Companion_getInstance_1().m96_1;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [StringSerializer_getInstance(), StringSerializer_getInstance(), tmp0_cached[2].v1(), tmp0_cached[3].v1(), tmp0_cached[4].v1(), tmp0_cached[5].v1()];
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
var VPos_Top_instance;
var VPos_Center_instance;
var VPos_Bottom_instance;
function values_0() {
  return [VPos_Top_getInstance(), VPos_Center_getInstance(), VPos_Bottom_getInstance()];
}
var VPos_entriesInitialized;
function VPos_initEntries() {
  if (VPos_entriesInitialized)
    return Unit_instance;
  VPos_entriesInitialized = true;
  VPos_Top_instance = new (VPos())('Top', 0);
  VPos_Center_instance = new (VPos())('Center', 1);
  VPos_Bottom_instance = new (VPos())('Bottom', 2);
}
function RouteBranchSegment$Companion$$childSerializers$_anonymous__3i3cji() {
  return new (ArrayListSerializer())($serializer_getInstance());
}
var LaneClass;
function Lane() {
  if (LaneClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'Lane', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    LaneClass = $;
  }
  return LaneClass;
}
var BranchStopClass;
function BranchStop() {
  if (BranchStopClass === VOID) {
    class $ {
      toString() {
        return 'BranchStop(stopId=' + this.i96_1 + ', stopLane=' + this.j96_1.toString() + ', connections=' + toString(this.k96_1) + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.i96_1);
        result = imul(result, 31) + this.j96_1.hashCode() | 0;
        result = imul(result, 31) + hashCode(this.k96_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof BranchStop()))
          return false;
        var tmp0_other_with_cast = other instanceof BranchStop() ? other : THROW_CCE();
        if (!(this.i96_1 === tmp0_other_with_cast.i96_1))
          return false;
        if (!this.j96_1.equals(tmp0_other_with_cast.j96_1))
          return false;
        if (!equals(this.k96_1, tmp0_other_with_cast.k96_1))
          return false;
        return true;
      }
      static l96(seen0, stopId, stopLane, connections, serializationConstructorMarker) {
        Companion_getInstance_0();
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance().g96_1);
        }
        var $this = createThis(this);
        $this.i96_1 = stopId;
        $this.j96_1 = stopLane;
        $this.k96_1 = connections;
        return $this;
      }
    }
    initMetadataForClass($, 'BranchStop', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
    BranchStopClass = $;
  }
  return BranchStopClass;
}
var StickConnectionClass;
function StickConnection() {
  if (StickConnectionClass === VOID) {
    class $ {
      constructor(fromStop, toStop, fromLane, toLane, fromVPos, toVPos) {
        Companion_getInstance_1();
        this.p96_1 = fromStop;
        this.q96_1 = toStop;
        this.r96_1 = fromLane;
        this.s96_1 = toLane;
        this.t96_1 = fromVPos;
        this.u96_1 = toVPos;
      }
      toString() {
        return 'StickConnection(fromStop=' + this.p96_1 + ', toStop=' + this.q96_1 + ', fromLane=' + this.r96_1.toString() + ', toLane=' + this.s96_1.toString() + ', fromVPos=' + this.t96_1.toString() + ', toVPos=' + this.u96_1.toString() + ')';
      }
      hashCode() {
        var result = getStringHashCode(this.p96_1);
        result = imul(result, 31) + getStringHashCode(this.q96_1) | 0;
        result = imul(result, 31) + this.r96_1.hashCode() | 0;
        result = imul(result, 31) + this.s96_1.hashCode() | 0;
        result = imul(result, 31) + this.t96_1.hashCode() | 0;
        result = imul(result, 31) + this.u96_1.hashCode() | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StickConnection()))
          return false;
        var tmp0_other_with_cast = other instanceof StickConnection() ? other : THROW_CCE();
        if (!(this.p96_1 === tmp0_other_with_cast.p96_1))
          return false;
        if (!(this.q96_1 === tmp0_other_with_cast.q96_1))
          return false;
        if (!this.r96_1.equals(tmp0_other_with_cast.r96_1))
          return false;
        if (!this.s96_1.equals(tmp0_other_with_cast.s96_1))
          return false;
        if (!this.t96_1.equals(tmp0_other_with_cast.t96_1))
          return false;
        if (!this.u96_1.equals(tmp0_other_with_cast.u96_1))
          return false;
        return true;
      }
      static v96(seen0, fromStop, toStop, fromLane, toLane, fromVPos, toVPos, serializationConstructorMarker) {
        Companion_getInstance_1();
        if (!(63 === (63 & seen0))) {
          throwMissingFieldException(seen0, 63, $serializer_getInstance_0().n96_1);
        }
        var $this = createThis(this);
        $this.p96_1 = fromStop;
        $this.q96_1 = toStop;
        $this.r96_1 = fromLane;
        $this.s96_1 = toLane;
        $this.t96_1 = fromVPos;
        $this.u96_1 = toVPos;
        return $this;
      }
    }
    initMetadataForClass($, 'StickConnection', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
    StickConnectionClass = $;
  }
  return StickConnectionClass;
}
var VPosClass;
function VPos() {
  if (VPosClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'VPos');
    VPosClass = $;
  }
  return VPosClass;
}
var CompanionClass_2;
function Companion_2() {
  if (CompanionClass_2 === VOID) {
    class $ {
      constructor() {
        Companion_instance_2 = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.w96_1 = [lazy(tmp_0, RouteBranchSegment$Companion$$childSerializers$_anonymous__3i3cji), null, null];
      }
    }
    initMetadataForCompanion($);
    CompanionClass_2 = $;
  }
  return CompanionClass_2;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  if (Companion_instance_2 === VOID)
    new (Companion_2())();
  return Companion_instance_2;
}
var $serializerClass_1;
function $serializer_1() {
  if ($serializerClass_1 === VOID) {
    class $ {
      constructor() {
        $serializer_instance_1 = this;
        var tmp0_serialDesc = new (PluginGeneratedSerialDescriptor())('com.mbta.tid.mbta_app.model.RouteBranchSegment', this, 3);
        tmp0_serialDesc.p1b('stops', false);
        tmp0_serialDesc.p1b('name', false);
        tmp0_serialDesc.p1b('typical?', false);
        this.x96_1 = tmp0_serialDesc;
      }
      y96(encoder, value) {
        var tmp0_desc = this.x96_1;
        var tmp1_output = encoder.v13(tmp0_desc);
        var tmp2_cached = Companion_getInstance_2().w96_1;
        tmp1_output.n15(tmp0_desc, 0, tmp2_cached[0].v1(), value.z96_1);
        tmp1_output.p15(tmp0_desc, 1, StringSerializer_getInstance(), value.a97_1);
        tmp1_output.d15(tmp0_desc, 2, value.b97_1);
        tmp1_output.w13(tmp0_desc);
      }
      gz(encoder, value) {
        return this.y96(encoder, value instanceof RouteBranchSegment() ? value : THROW_CCE());
      }
      hz(decoder) {
        var tmp0_desc = this.x96_1;
        var tmp1_flag = true;
        var tmp2_index = 0;
        var tmp3_bitMask0 = 0;
        var tmp4_local0 = null;
        var tmp5_local1 = null;
        var tmp6_local2 = false;
        var tmp7_input = decoder.v13(tmp0_desc);
        var tmp8_cached = Companion_getInstance_2().w96_1;
        if (tmp7_input.l14()) {
          tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
          tmp3_bitMask0 = tmp3_bitMask0 | 1;
          tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
          tmp3_bitMask0 = tmp3_bitMask0 | 2;
          tmp6_local2 = tmp7_input.x13(tmp0_desc, 2);
          tmp3_bitMask0 = tmp3_bitMask0 | 4;
        } else
          while (tmp1_flag) {
            tmp2_index = tmp7_input.m14(tmp0_desc);
            switch (tmp2_index) {
              case -1:
                tmp1_flag = false;
                break;
              case 0:
                tmp4_local0 = tmp7_input.h14(tmp0_desc, 0, tmp8_cached[0].v1(), tmp4_local0);
                tmp3_bitMask0 = tmp3_bitMask0 | 1;
                break;
              case 1:
                tmp5_local1 = tmp7_input.j14(tmp0_desc, 1, StringSerializer_getInstance(), tmp5_local1);
                tmp3_bitMask0 = tmp3_bitMask0 | 2;
                break;
              case 2:
                tmp6_local2 = tmp7_input.x13(tmp0_desc, 2);
                tmp3_bitMask0 = tmp3_bitMask0 | 4;
                break;
              default:
                throw UnknownFieldException().n11(tmp2_index);
            }
          }
        tmp7_input.w13(tmp0_desc);
        return RouteBranchSegment().c97(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, null);
      }
      fz() {
        return this.x96_1;
      }
      f1c() {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        return [Companion_getInstance_2().w96_1[0].v1(), get_nullable(StringSerializer_getInstance()), BooleanSerializer_getInstance()];
      }
    }
    protoOf($).g1c = typeParametersSerializers;
    initMetadataForObject($, '$serializer', VOID, VOID, [GeneratedSerializer()]);
    $serializerClass_1 = $;
  }
  return $serializerClass_1;
}
var $serializer_instance_1;
function $serializer_getInstance_1() {
  if ($serializer_instance_1 === VOID)
    new ($serializer_1())();
  return $serializer_instance_1;
}
function Lane_Left_getInstance() {
  Lane_initEntries();
  return Lane_Left_instance;
}
function Lane_Center_getInstance() {
  Lane_initEntries();
  return Lane_Center_instance;
}
function Lane_Right_getInstance() {
  Lane_initEntries();
  return Lane_Right_instance;
}
function VPos_Top_getInstance() {
  VPos_initEntries();
  return VPos_Top_instance;
}
function VPos_Center_getInstance() {
  VPos_initEntries();
  return VPos_Center_instance;
}
function VPos_Bottom_getInstance() {
  VPos_initEntries();
  return VPos_Bottom_instance;
}
var RouteBranchSegmentClass;
function RouteBranchSegment() {
  if (RouteBranchSegmentClass === VOID) {
    class $ {
      toString() {
        return 'RouteBranchSegment(stops=' + toString(this.z96_1) + ', name=' + this.a97_1 + ', isTypical=' + this.b97_1 + ')';
      }
      hashCode() {
        var result = hashCode(this.z96_1);
        result = imul(result, 31) + (this.a97_1 == null ? 0 : getStringHashCode(this.a97_1)) | 0;
        result = imul(result, 31) + getBooleanHashCode(this.b97_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof RouteBranchSegment()))
          return false;
        var tmp0_other_with_cast = other instanceof RouteBranchSegment() ? other : THROW_CCE();
        if (!equals(this.z96_1, tmp0_other_with_cast.z96_1))
          return false;
        if (!(this.a97_1 == tmp0_other_with_cast.a97_1))
          return false;
        if (!(this.b97_1 === tmp0_other_with_cast.b97_1))
          return false;
        return true;
      }
      static c97(seen0, stops, name, isTypical, serializationConstructorMarker) {
        Companion_getInstance_2();
        if (!(7 === (7 & seen0))) {
          throwMissingFieldException(seen0, 7, $serializer_getInstance_1().x96_1);
        }
        var $this = createThis(this);
        $this.z96_1 = stops;
        $this.a97_1 = name;
        $this.b97_1 = isTypical;
        return $this;
      }
    }
    initMetadataForClass($, 'RouteBranchSegment', VOID, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_1});
    RouteBranchSegmentClass = $;
  }
  return RouteBranchSegmentClass;
}
//region block: init
com_mbta_tid_mbta_app_model_RouteBranchSegment_BranchStop_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteBranchSegment_BranchStop$stable = 8;
com_mbta_tid_mbta_app_model_RouteBranchSegment_StickConnection_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteBranchSegment_StickConnection$stable = 0;
com_mbta_tid_mbta_app_model_RouteBranchSegment_$serializer$stable = 8;
com_mbta_tid_mbta_app_model_RouteBranchSegment$stable = 8;
//endregion
//region block: exports
export {
  StickConnection as StickConnection2cmejkbgvu4gf,
  RouteBranchSegment as RouteBranchSegment2uy1yjp4z04j4,
  VPos_Bottom_getInstance as VPos_Bottom_getInstance36lsp88bpc25p,
  VPos_Center_getInstance as VPos_Center_getInstance1qdw1dt8mbj0j,
  VPos_Top_getInstance as VPos_Top_getInstancejnhiffg1g3of,
  $serializer_getInstance_1 as $serializer_getInstance73qavcavwh9w,
};
//endregion

//# sourceMappingURL=RouteBranchSegment.mjs.map
