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
  return $this.d93_1.v1();
}
function LocationType$Companion$_anonymous__2o9s5c() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['stop', 'station', 'entrance_exit', 'generic_node', 'boarding_area'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null, null, null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.LocationType', tmp, tmp_0, tmp$ret$5, null);
}
var LocationType_STOP_instance;
var LocationType_STATION_instance;
var LocationType_ENTRANCE_EXIT_instance;
var LocationType_GENERIC_NODE_instance;
var LocationType_BOARDING_AREA_instance;
function values() {
  return [LocationType_STOP_getInstance(), LocationType_STATION_getInstance(), LocationType_ENTRANCE_EXIT_getInstance(), LocationType_GENERIC_NODE_getInstance(), LocationType_BOARDING_AREA_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.d93_1 = lazy(tmp_0, LocationType$Companion$_anonymous__2o9s5c);
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
  LocationType_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var LocationType_entriesInitialized;
function LocationType_initEntries() {
  if (LocationType_entriesInitialized)
    return Unit_instance;
  LocationType_entriesInitialized = true;
  LocationType_STOP_instance = new (LocationType())('STOP', 0);
  LocationType_STATION_instance = new (LocationType())('STATION', 1);
  LocationType_ENTRANCE_EXIT_instance = new (LocationType())('ENTRANCE_EXIT', 2);
  LocationType_GENERIC_NODE_instance = new (LocationType())('GENERIC_NODE', 3);
  LocationType_BOARDING_AREA_instance = new (LocationType())('BOARDING_AREA', 4);
  Companion_getInstance();
}
var LocationTypeClass;
function LocationType() {
  if (LocationTypeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'LocationType', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    LocationTypeClass = $;
  }
  return LocationTypeClass;
}
function LocationType_STOP_getInstance() {
  LocationType_initEntries();
  return LocationType_STOP_instance;
}
function LocationType_STATION_getInstance() {
  LocationType_initEntries();
  return LocationType_STATION_instance;
}
function LocationType_ENTRANCE_EXIT_getInstance() {
  LocationType_initEntries();
  return LocationType_ENTRANCE_EXIT_instance;
}
function LocationType_GENERIC_NODE_getInstance() {
  LocationType_initEntries();
  return LocationType_GENERIC_NODE_instance;
}
function LocationType_BOARDING_AREA_getInstance() {
  LocationType_initEntries();
  return LocationType_BOARDING_AREA_instance;
}
//region block: exports
export {
  LocationType_STATION_getInstance as LocationType_STATION_getInstancebecdlasuojyi,
  LocationType_STOP_getInstance as LocationType_STOP_getInstance3b47w50r35o9j,
  Companion_getInstance as Companion_getInstance1vpmeriayw6j4,
};
//endregion

//# sourceMappingURL=LocationType.mjs.map
