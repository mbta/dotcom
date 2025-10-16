import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.h82_1 = new (OverloadMarker())();
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
var OverloadMarkerClass;
function OverloadMarker() {
  if (OverloadMarkerClass === VOID) {
    class $ {
      constructor() {
        Companion_getInstance();
      }
    }
    initMetadataForClass($, 'OverloadMarker');
    OverloadMarkerClass = $;
  }
  return OverloadMarkerClass;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance3kvfs538dk04g,
};
//endregion

//# sourceMappingURL=OverloadMarker.mjs.map
