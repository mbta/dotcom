import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_datastore_Preferences$stable;
var com_mbta_tid_mbta_app_datastore_MutablePreferences$stable;
var PreferencesClass;
function Preferences() {
  if (PreferencesClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Preferences');
    PreferencesClass = $;
  }
  return PreferencesClass;
}
var MutablePreferencesClass;
function MutablePreferences() {
  if (MutablePreferencesClass === VOID) {
    class $ extends Preferences() {
      u9v(key, value) {
        var tmp0 = this.t9v_1;
        // Inline function 'kotlin.collections.set' call
        var key_0 = key.pbt_1;
        tmp0.t3(key_0, value);
      }
    }
    initMetadataForClass($, 'MutablePreferences');
    MutablePreferencesClass = $;
  }
  return MutablePreferencesClass;
}
//region block: init
com_mbta_tid_mbta_app_datastore_Preferences$stable = 0;
com_mbta_tid_mbta_app_datastore_MutablePreferences$stable = 8;
//endregion
//region block: exports
export {
  MutablePreferences as MutablePreferences2tul9gagkqjrf,
};
//endregion

//# sourceMappingURL=Preferences.js.mjs.map
