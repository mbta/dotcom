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
  return $this.z9f_1.v1();
}
function WheelchairBoardingStatus$Companion$_anonymous__pe8jhl() {
  var tmp = values();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = ['accessible', 'inaccessible'];
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = [null, null];
  return createAnnotatedEnumSerializer('com.mbta.tid.mbta_app.model.WheelchairBoardingStatus', tmp, tmp_0, tmp$ret$5, null);
}
var WheelchairBoardingStatus_ACCESSIBLE_instance;
var WheelchairBoardingStatus_INACCESSIBLE_instance;
function values() {
  return [WheelchairBoardingStatus_ACCESSIBLE_getInstance(), WheelchairBoardingStatus_INACCESSIBLE_getInstance()];
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.z9f_1 = lazy(tmp_0, WheelchairBoardingStatus$Companion$_anonymous__pe8jhl);
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
  WheelchairBoardingStatus_initEntries();
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var WheelchairBoardingStatus_entriesInitialized;
function WheelchairBoardingStatus_initEntries() {
  if (WheelchairBoardingStatus_entriesInitialized)
    return Unit_instance;
  WheelchairBoardingStatus_entriesInitialized = true;
  WheelchairBoardingStatus_ACCESSIBLE_instance = new (WheelchairBoardingStatus())('ACCESSIBLE', 0);
  WheelchairBoardingStatus_INACCESSIBLE_instance = new (WheelchairBoardingStatus())('INACCESSIBLE', 1);
  Companion_getInstance();
}
var WheelchairBoardingStatusClass;
function WheelchairBoardingStatus() {
  if (WheelchairBoardingStatusClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'WheelchairBoardingStatus', VOID, VOID, VOID, VOID, VOID, {0: Companion_getInstance});
    WheelchairBoardingStatusClass = $;
  }
  return WheelchairBoardingStatusClass;
}
function WheelchairBoardingStatus_ACCESSIBLE_getInstance() {
  WheelchairBoardingStatus_initEntries();
  return WheelchairBoardingStatus_ACCESSIBLE_instance;
}
function WheelchairBoardingStatus_INACCESSIBLE_getInstance() {
  WheelchairBoardingStatus_initEntries();
  return WheelchairBoardingStatus_INACCESSIBLE_instance;
}
//region block: exports
export {
  WheelchairBoardingStatus_ACCESSIBLE_getInstance as WheelchairBoardingStatus_ACCESSIBLE_getInstance1z7usa87cdfwh,
  Companion_getInstance as Companion_getInstance1w27xdg2svvu0,
};
//endregion

//# sourceMappingURL=WheelchairBoardingStatus.mjs.map
