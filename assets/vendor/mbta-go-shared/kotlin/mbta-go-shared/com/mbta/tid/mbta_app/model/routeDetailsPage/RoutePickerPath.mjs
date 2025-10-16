import { ObjectSerializer2kjkucmygguwd as ObjectSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/ObjectSerializer.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SealedClassSerializeriwipiibk55zc as SealedClassSerializer } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SealedSerializer.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { SerializerFactory1qv9hivitncuv as SerializerFactory } from '../../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Root$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Bus$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Silver$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_CommuterRail$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Ferry$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.e9q_1.v1();
}
function RoutePickerPath$Root$_anonymous__dtpe4z() {
  var tmp = Root_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Root', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_0($this) {
  return $this.f9q_1.v1();
}
function RoutePickerPath$Bus$_anonymous__d9lzrz() {
  var tmp = Bus_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Bus', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_1($this) {
  return $this.g9q_1.v1();
}
function RoutePickerPath$Silver$_anonymous__trbx4y() {
  var tmp = Silver_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Silver', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_2($this) {
  return $this.h9q_1.v1();
}
function RoutePickerPath$CommuterRail$_anonymous__bu4m9x() {
  var tmp = CommuterRail_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.CommuterRail', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_3($this) {
  return $this.i9q_1.v1();
}
function RoutePickerPath$Ferry$_anonymous__6e8qth() {
  var tmp = Ferry_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Ferry', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_4($this) {
  return $this.j9q_1.v1();
}
function RoutePickerPath$Companion$_anonymous__5a64od() {
  var tmp = getKClass(RoutePickerPath());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(Bus()), getKClass(CommuterRail()), getKClass(Ferry()), getKClass(Root()), getKClass(Silver())];
  var tmp_1 = Bus_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [];
  var tmp_2 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Bus', tmp_1, tmp$ret$5);
  var tmp_3 = CommuterRail_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$8 = [];
  var tmp_4 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.CommuterRail', tmp_3, tmp$ret$8);
  var tmp_5 = Ferry_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$11 = [];
  var tmp_6 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Ferry', tmp_5, tmp$ret$11);
  var tmp_7 = Root_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$14 = [];
  var tmp_8 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Root', tmp_7, tmp$ret$14);
  var tmp_9 = Silver_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$17 = [];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_10 = [tmp_2, tmp_4, tmp_6, tmp_8, ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath.Silver', tmp_9, tmp$ret$17)];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$23 = [];
  return SealedClassSerializer().m10('com.mbta.tid.mbta_app.model.routeDetailsPage.RoutePickerPath', tmp, tmp_0, tmp_10, tmp$ret$23);
}
var RootClass;
function Root() {
  if (RootClass === VOID) {
    class $ extends RoutePickerPath() {
      constructor() {
        Root_instance = null;
        super();
        Root_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.e9q_1 = lazy(tmp_0, RoutePickerPath$Root$_anonymous__dtpe4z);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Root';
      }
      hashCode() {
        return 277596745;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Root()))
          return false;
        other instanceof Root() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Root', VOID, VOID, [RoutePickerPath(), SerializerFactory()], VOID, VOID, {0: Root_getInstance});
    RootClass = $;
  }
  return RootClass;
}
var Root_instance;
function Root_getInstance() {
  if (Root_instance === VOID)
    new (Root())();
  return Root_instance;
}
var BusClass;
function Bus() {
  if (BusClass === VOID) {
    class $ extends RoutePickerPath() {
      constructor() {
        Bus_instance = null;
        super();
        Bus_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.f9q_1 = lazy(tmp_0, RoutePickerPath$Bus$_anonymous__d9lzrz);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_0(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Bus';
      }
      hashCode() {
        return 1117318201;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Bus()))
          return false;
        other instanceof Bus() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Bus', VOID, VOID, [RoutePickerPath(), SerializerFactory()], VOID, VOID, {0: Bus_getInstance});
    BusClass = $;
  }
  return BusClass;
}
var Bus_instance;
function Bus_getInstance() {
  if (Bus_instance === VOID)
    new (Bus())();
  return Bus_instance;
}
var SilverClass;
function Silver() {
  if (SilverClass === VOID) {
    class $ extends RoutePickerPath() {
      constructor() {
        Silver_instance = null;
        super();
        Silver_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.g9q_1 = lazy(tmp_0, RoutePickerPath$Silver$_anonymous__trbx4y);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_1(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Silver';
      }
      hashCode() {
        return 505503412;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Silver()))
          return false;
        other instanceof Silver() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Silver', VOID, VOID, [RoutePickerPath(), SerializerFactory()], VOID, VOID, {0: Silver_getInstance});
    SilverClass = $;
  }
  return SilverClass;
}
var Silver_instance;
function Silver_getInstance() {
  if (Silver_instance === VOID)
    new (Silver())();
  return Silver_instance;
}
var CommuterRailClass;
function CommuterRail() {
  if (CommuterRailClass === VOID) {
    class $ extends RoutePickerPath() {
      constructor() {
        CommuterRail_instance = null;
        super();
        CommuterRail_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.h9q_1 = lazy(tmp_0, RoutePickerPath$CommuterRail$_anonymous__bu4m9x);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_2(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'CommuterRail';
      }
      hashCode() {
        return 1473109681;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof CommuterRail()))
          return false;
        other instanceof CommuterRail() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'CommuterRail', VOID, VOID, [RoutePickerPath(), SerializerFactory()], VOID, VOID, {0: CommuterRail_getInstance});
    CommuterRailClass = $;
  }
  return CommuterRailClass;
}
var CommuterRail_instance;
function CommuterRail_getInstance() {
  if (CommuterRail_instance === VOID)
    new (CommuterRail())();
  return CommuterRail_instance;
}
var FerryClass;
function Ferry() {
  if (FerryClass === VOID) {
    class $ extends RoutePickerPath() {
      constructor() {
        Ferry_instance = null;
        super();
        Ferry_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.i9q_1 = lazy(tmp_0, RoutePickerPath$Ferry$_anonymous__6e8qth);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_3(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Ferry';
      }
      hashCode() {
        return 4187283;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Ferry()))
          return false;
        other instanceof Ferry() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Ferry', VOID, VOID, [RoutePickerPath(), SerializerFactory()], VOID, VOID, {0: Ferry_getInstance});
    FerryClass = $;
  }
  return FerryClass;
}
var Ferry_instance;
function Ferry_getInstance() {
  if (Ferry_instance === VOID)
    new (Ferry())();
  return Ferry_instance;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.j9q_1 = lazy(tmp_0, RoutePickerPath$Companion$_anonymous__5a64od);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_4(this);
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
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var RoutePickerPathClass;
function RoutePickerPath() {
  if (RoutePickerPathClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance();
      }
    }
    initMetadataForClass($, 'RoutePickerPath', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    RoutePickerPathClass = $;
  }
  return RoutePickerPathClass;
}
//region block: init
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Root$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Bus$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Silver$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_CommuterRail$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath_Ferry$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RoutePickerPath$stable = 0;
//endregion
//region block: exports
export {
  Bus as Bus2ft1hgnt8np1u,
  Bus_getInstance as Bus_getInstance2gs9k64vlygvl,
  CommuterRail_getInstance as CommuterRail_getInstance1naev6hmhd4jd,
  Companion_getInstance as Companion_getInstance1w6yhos1auz8,
  Ferry_getInstance as Ferry_getInstancexjrf66j8v21d,
  Root_getInstance as Root_getInstance34ok59a0vqw61,
  Silver_getInstance as Silver_getInstance15x42y994xpv9,
};
//endregion

//# sourceMappingURL=RoutePickerPath.mjs.map
