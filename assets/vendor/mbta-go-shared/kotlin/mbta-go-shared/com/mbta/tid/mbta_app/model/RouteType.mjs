import { createAnnotatedEnumSerializer20ay4pme9p2h9 as createAnnotatedEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { SerializerFactory1qv9hivitncuv as SerializerFactory } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _get_$cachedSerializer__te6jhj($this) {
  return $this.p8x_1.v1();
}
function RouteType$Companion$_anonymous__3blel0() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['light_rail', 'heavy_rail', 'commuter_rail', 'bus', 'ferry'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.RouteType', tmp, tmp_0, tmp$ret$5, null);
}
var RouteType_LIGHT_RAIL_instance;
var RouteType_HEAVY_RAIL_instance;
var RouteType_COMMUTER_RAIL_instance;
var RouteType_BUS_instance;
var RouteType_FERRY_instance;
function values() {
  return [RouteType_LIGHT_RAIL_getInstance(), RouteType_HEAVY_RAIL_getInstance(), RouteType_COMMUTER_RAIL_getInstance(), RouteType_BUS_getInstance(), RouteType_FERRY_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.p8x_1 = lazy(tmp_0, RouteType$Companion$_anonymous__3blel0);
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
  RouteType_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var RouteType_entriesInitialized;
function RouteType_initEntries() {
  if (RouteType_entriesInitialized)
    return Unit_instance;
  RouteType_entriesInitialized = true;
  RouteType_LIGHT_RAIL_instance = new (RouteType())('LIGHT_RAIL', 0);
  RouteType_HEAVY_RAIL_instance = new (RouteType())('HEAVY_RAIL', 1);
  RouteType_COMMUTER_RAIL_instance = new (RouteType())('COMMUTER_RAIL', 2);
  RouteType_BUS_instance = new (RouteType())('BUS', 3);
  RouteType_FERRY_instance = new (RouteType())('FERRY', 4);
  Companion_getInstance();
}
var RouteTypeClass;
function RouteType() {
  if (RouteTypeClass === VOID) {
    class $ extends Enum() {
      w94() {
        return this === RouteType_HEAVY_RAIL_getInstance() || this === RouteType_LIGHT_RAIL_getInstance();
      }
      w9e() {
        return Companion_getInstance().r1n().fz().b12(this.x3_1);
      }
    }
    initMetadataForClass($, 'RouteType', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    RouteTypeClass = $;
  }
  return RouteTypeClass;
}
function RouteType_LIGHT_RAIL_getInstance() {
  RouteType_initEntries();
  return RouteType_LIGHT_RAIL_instance;
}
function RouteType_HEAVY_RAIL_getInstance() {
  RouteType_initEntries();
  return RouteType_HEAVY_RAIL_instance;
}
function RouteType_COMMUTER_RAIL_getInstance() {
  RouteType_initEntries();
  return RouteType_COMMUTER_RAIL_instance;
}
function RouteType_BUS_getInstance() {
  RouteType_initEntries();
  return RouteType_BUS_instance;
}
function RouteType_FERRY_getInstance() {
  RouteType_initEntries();
  return RouteType_FERRY_instance;
}
//region block: exports
export {
  RouteType_BUS_getInstance as RouteType_BUS_getInstance1q03qahihhdox,
  RouteType_COMMUTER_RAIL_getInstance as RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv,
  RouteType_FERRY_getInstance as RouteType_FERRY_getInstance2ap57x114albq,
  RouteType_HEAVY_RAIL_getInstance as RouteType_HEAVY_RAIL_getInstance1zhtyakatbhop,
  RouteType_LIGHT_RAIL_getInstance as RouteType_LIGHT_RAIL_getInstance1acz6wfw7kzbn,
  Companion_getInstance as Companion_getInstance335ayeei16c3d,
};
//endregion

//# sourceMappingURL=RouteType.mjs.map
