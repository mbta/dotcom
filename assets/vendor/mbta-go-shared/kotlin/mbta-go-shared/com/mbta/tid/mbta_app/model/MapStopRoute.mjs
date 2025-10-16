import { createSimpleEnumSerializer2guioz11kk1m0 as createSimpleEnumSerializer } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/Enums.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { startsWith26w8qjqapeeq6 as startsWith } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/stringsCode.mjs';
import {
  RouteType_COMMUTER_RAIL_getInstancerf8k2n6webhv as RouteType_COMMUTER_RAIL_getInstance,
  RouteType_FERRY_getInstance2ap57x114albq as RouteType_FERRY_getInstance,
  RouteType_BUS_getInstance1q03qahihhdox as RouteType_BUS_getInstance,
} from './RouteType.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { SerializerFactory1qv9hivitncuv as SerializerFactory } from '../../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/PluginHelperInterfaces.mjs';
import { enumEntries20mr21zbe3az4 as enumEntries } from '../../../../../../kotlin-kotlin-stdlib/kotlin/enums/EnumEntries.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import {
  emptySetcxexqki71qfa as emptySet,
  setOf45ia9pnfhe90 as setOf,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_silverRoutes() {
  _init_properties_MapStopRoute_kt__f0mjxx();
  return silverRoutes;
}
var silverRoutes;
function get_greenRoutes() {
  _init_properties_MapStopRoute_kt__f0mjxx();
  return greenRoutes;
}
var greenRoutes;
function _get_$cachedSerializer__te6jhj($this) {
  return $this.m90_1.v1();
}
function MapStopRoute$Companion$_anonymous__8ynx44() {
  return createSimpleEnumSerializer('com.mbta.tid.mbta_app.model.MapStopRoute', values());
}
var MapStopRoute$REDClass;
function MapStopRoute$RED() {
  if (MapStopRoute$REDClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('RED', 0);
        MapStopRoute_RED_instance = this;
      }
      i93(route) {
        return route.o8r_1 === 'Red';
      }
    }
    initMetadataForClass($, 'RED');
    MapStopRoute$REDClass = $;
  }
  return MapStopRoute$REDClass;
}
var MapStopRoute_RED_instance;
var MapStopRoute$MATTAPANClass;
function MapStopRoute$MATTAPAN() {
  if (MapStopRoute$MATTAPANClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('MATTAPAN', 1);
        MapStopRoute_MATTAPAN_instance = this;
      }
      i93(route) {
        return route.o8r_1 === 'Mattapan';
      }
    }
    initMetadataForClass($, 'MATTAPAN');
    MapStopRoute$MATTAPANClass = $;
  }
  return MapStopRoute$MATTAPANClass;
}
var MapStopRoute_MATTAPAN_instance;
var MapStopRoute$ORANGEClass;
function MapStopRoute$ORANGE() {
  if (MapStopRoute$ORANGEClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('ORANGE', 2);
        MapStopRoute_ORANGE_instance = this;
      }
      i93(route) {
        return route.o8r_1 === 'Orange';
      }
    }
    initMetadataForClass($, 'ORANGE');
    MapStopRoute$ORANGEClass = $;
  }
  return MapStopRoute$ORANGEClass;
}
var MapStopRoute_ORANGE_instance;
var MapStopRoute$GREENClass;
function MapStopRoute$GREEN() {
  if (MapStopRoute$GREENClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('GREEN', 3, true, get_greenRoutes());
        MapStopRoute_GREEN_instance = this;
      }
      i93(route) {
        return startsWith(route.o8r_1, 'Green');
      }
    }
    initMetadataForClass($, 'GREEN');
    MapStopRoute$GREENClass = $;
  }
  return MapStopRoute$GREENClass;
}
var MapStopRoute_GREEN_instance;
var MapStopRoute$BLUEClass;
function MapStopRoute$BLUE() {
  if (MapStopRoute$BLUEClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('BLUE', 4);
        MapStopRoute_BLUE_instance = this;
      }
      i93(route) {
        return route.o8r_1 === 'Blue';
      }
    }
    initMetadataForClass($, 'BLUE');
    MapStopRoute$BLUEClass = $;
  }
  return MapStopRoute$BLUEClass;
}
var MapStopRoute_BLUE_instance;
var MapStopRoute$SILVERClass;
function MapStopRoute$SILVER() {
  if (MapStopRoute$SILVERClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('SILVER', 5, true, get_silverRoutes());
        MapStopRoute_SILVER_instance = this;
      }
      i93(route) {
        return this.g94_1.j1(route.o8r_1);
      }
    }
    initMetadataForClass($, 'SILVER');
    MapStopRoute$SILVERClass = $;
  }
  return MapStopRoute$SILVERClass;
}
var MapStopRoute_SILVER_instance;
var MapStopRoute$COMMUTERClass;
function MapStopRoute$COMMUTER() {
  if (MapStopRoute$COMMUTERClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('COMMUTER', 6);
        MapStopRoute_COMMUTER_instance = this;
      }
      i93(route) {
        return route.p8r_1.equals(RouteType_COMMUTER_RAIL_getInstance());
      }
    }
    initMetadataForClass($, 'COMMUTER');
    MapStopRoute$COMMUTERClass = $;
  }
  return MapStopRoute$COMMUTERClass;
}
var MapStopRoute_COMMUTER_instance;
var MapStopRoute$FERRYClass;
function MapStopRoute$FERRY() {
  if (MapStopRoute$FERRYClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('FERRY', 7);
        MapStopRoute_FERRY_instance = this;
      }
      i93(route) {
        return route.p8r_1.equals(RouteType_FERRY_getInstance());
      }
    }
    initMetadataForClass($, 'FERRY');
    MapStopRoute$FERRYClass = $;
  }
  return MapStopRoute$FERRYClass;
}
var MapStopRoute_FERRY_instance;
var MapStopRoute$BUSClass;
function MapStopRoute$BUS() {
  if (MapStopRoute$BUSClass === VOID) {
    class $ extends MapStopRoute() {
      constructor() {
        super('BUS', 8);
        MapStopRoute_BUS_instance = this;
      }
      i93(route) {
        return route.p8r_1.equals(RouteType_BUS_getInstance());
      }
    }
    initMetadataForClass($, 'BUS');
    MapStopRoute$BUSClass = $;
  }
  return MapStopRoute$BUSClass;
}
var MapStopRoute_BUS_instance;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.m90_1 = lazy(tmp_0, MapStopRoute$Companion$_anonymous__8ynx44);
      }
      n90(route) {
        var tmp0 = get_entries();
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (element.i93(route)) {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        return tmp$ret$1;
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
  MapStopRoute_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
function values() {
  return [MapStopRoute_RED_getInstance(), MapStopRoute_MATTAPAN_getInstance(), MapStopRoute_ORANGE_getInstance(), MapStopRoute_GREEN_getInstance(), MapStopRoute_BLUE_getInstance(), MapStopRoute_SILVER_getInstance(), MapStopRoute_COMMUTER_getInstance(), MapStopRoute_FERRY_getInstance(), MapStopRoute_BUS_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var MapStopRoute_entriesInitialized;
function MapStopRoute_initEntries() {
  if (MapStopRoute_entriesInitialized)
    return Unit_instance;
  MapStopRoute_entriesInitialized = true;
  MapStopRoute_RED_instance = new (MapStopRoute$RED())();
  MapStopRoute_MATTAPAN_instance = new (MapStopRoute$MATTAPAN())();
  MapStopRoute_ORANGE_instance = new (MapStopRoute$ORANGE())();
  MapStopRoute_GREEN_instance = new (MapStopRoute$GREEN())();
  MapStopRoute_BLUE_instance = new (MapStopRoute$BLUE())();
  MapStopRoute_SILVER_instance = new (MapStopRoute$SILVER())();
  MapStopRoute_COMMUTER_instance = new (MapStopRoute$COMMUTER())();
  MapStopRoute_FERRY_instance = new (MapStopRoute$FERRY())();
  MapStopRoute_BUS_instance = new (MapStopRoute$BUS())();
  Companion_getInstance();
}
var $ENTRIES;
var MapStopRouteClass;
function MapStopRoute() {
  if (MapStopRouteClass === VOID) {
    class $ extends Enum() {
      constructor(name, ordinal, hasBranchingTerminals, branchingRoutes) {
        hasBranchingTerminals = hasBranchingTerminals === VOID ? false : hasBranchingTerminals;
        var tmp;
        if (branchingRoutes === VOID) {
          // Inline function 'kotlin.collections.setOf' call
          tmp = emptySet();
        } else {
          tmp = branchingRoutes;
        }
        branchingRoutes = tmp;
        super(name, ordinal);
        this.f94_1 = hasBranchingTerminals;
        this.g94_1 = branchingRoutes;
      }
    }
    initMetadataForClass($, 'MapStopRoute', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    MapStopRouteClass = $;
  }
  return MapStopRouteClass;
}
function MapStopRoute_RED_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_RED_instance;
}
function MapStopRoute_MATTAPAN_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_MATTAPAN_instance;
}
function MapStopRoute_ORANGE_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_ORANGE_instance;
}
function MapStopRoute_GREEN_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_GREEN_instance;
}
function MapStopRoute_BLUE_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_BLUE_instance;
}
function MapStopRoute_SILVER_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_SILVER_instance;
}
function MapStopRoute_COMMUTER_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_COMMUTER_instance;
}
function MapStopRoute_FERRY_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_FERRY_instance;
}
function MapStopRoute_BUS_getInstance() {
  MapStopRoute_initEntries();
  return MapStopRoute_BUS_instance;
}
var properties_initialized_MapStopRoute_kt_xj4s25;
function _init_properties_MapStopRoute_kt__f0mjxx() {
  if (!properties_initialized_MapStopRoute_kt_xj4s25) {
    properties_initialized_MapStopRoute_kt_xj4s25 = true;
    silverRoutes = setOf(['741', '742', '743', '751', '749', '746']);
    greenRoutes = setOf(['Green-B', 'Green-C', 'Green-D', 'Green-E']);
  }
}
//region block: exports
export {
  get_entries as get_entries2xkklea9ps4e2,
  get_greenRoutes as get_greenRoutes14cffg8xal11q,
  get_silverRoutes as get_silverRoutessxztys6i4f4z,
  MapStopRoute_BUS_getInstance as MapStopRoute_BUS_getInstancex8m68nhekpzs,
  MapStopRoute_SILVER_getInstance as MapStopRoute_SILVER_getInstancexhszh5yjw7w,
  Companion_getInstance as Companion_getInstance20mcswkvz9maw,
};
//endregion

//# sourceMappingURL=MapStopRoute.mjs.map
