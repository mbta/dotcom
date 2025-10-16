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
var com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext_Favorites$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext_Details$stable;
var com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext$stable;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.b9q_1.v1();
}
function RouteDetailsContext$Favorites$_anonymous__q8ess2() {
  var tmp = Favorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RouteDetailsContext.Favorites', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_0($this) {
  return $this.c9q_1.v1();
}
function RouteDetailsContext$Details$_anonymous__2jwu03() {
  var tmp = Details_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$2 = [];
  return ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RouteDetailsContext.Details', tmp, tmp$ret$2);
}
function _get_$cachedSerializer__te6jhj_1($this) {
  return $this.d9q_1.v1();
}
function RouteDetailsContext$Companion$_anonymous__fp1xnd() {
  var tmp = getKClass(RouteDetailsContext());
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = [getKClass(Details()), getKClass(Favorites())];
  var tmp_1 = Details_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [];
  var tmp_2 = ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RouteDetailsContext.Details', tmp_1, tmp$ret$5);
  var tmp_3 = Favorites_getInstance();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$8 = [];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_4 = [tmp_2, ObjectSerializer().s1c('com.mbta.tid.mbta_app.model.routeDetailsPage.RouteDetailsContext.Favorites', tmp_3, tmp$ret$8)];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$14 = [];
  return SealedClassSerializer().m10('com.mbta.tid.mbta_app.model.routeDetailsPage.RouteDetailsContext', tmp, tmp_0, tmp_4, tmp$ret$14);
}
var FavoritesClass;
function Favorites() {
  if (FavoritesClass === VOID) {
    class $ extends RouteDetailsContext() {
      constructor() {
        Favorites_instance = null;
        super();
        Favorites_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.b9q_1 = lazy(tmp_0, RouteDetailsContext$Favorites$_anonymous__q8ess2);
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
        return 1090458122;
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
    initMetadataForObject($, 'Favorites', VOID, VOID, [RouteDetailsContext(), SerializerFactory()], VOID, VOID, {0: Favorites_getInstance});
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
var DetailsClass;
function Details() {
  if (DetailsClass === VOID) {
    class $ extends RouteDetailsContext() {
      constructor() {
        Details_instance = null;
        super();
        Details_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.c9q_1 = lazy(tmp_0, RouteDetailsContext$Details$_anonymous__2jwu03);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_0(this);
      }
      t1c(typeParamsSerializers) {
        return this.r1n();
      }
      toString() {
        return 'Details';
      }
      hashCode() {
        return 425519797;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Details()))
          return false;
        other instanceof Details() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Details', VOID, VOID, [RouteDetailsContext(), SerializerFactory()], VOID, VOID, {0: Details_getInstance});
    DetailsClass = $;
  }
  return DetailsClass;
}
var Details_instance;
function Details_getInstance() {
  if (Details_instance === VOID)
    new (Details())();
  return Details_instance;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.d9q_1 = lazy(tmp_0, RouteDetailsContext$Companion$_anonymous__fp1xnd);
      }
      r1n() {
        return _get_$cachedSerializer__te6jhj_1(this);
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
var RouteDetailsContextClass;
function RouteDetailsContext() {
  if (RouteDetailsContextClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance();
      }
    }
    initMetadataForClass($, 'RouteDetailsContext', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    RouteDetailsContextClass = $;
  }
  return RouteDetailsContextClass;
}
//region block: init
com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext_Favorites$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext_Details$stable = 0;
com_mbta_tid_mbta_app_model_routeDetailsPage_RouteDetailsContext$stable = 0;
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance2uhn9jkmyi5sr,
};
//endregion

//# sourceMappingURL=RouteDetailsContext.mjs.map
