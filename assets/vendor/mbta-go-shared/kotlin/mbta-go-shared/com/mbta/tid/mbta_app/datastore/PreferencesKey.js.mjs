import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_datastore_PreferencesKey$stable;
var PreferencesKeyClass;
function PreferencesKey() {
  if (PreferencesKeyClass === VOID) {
    class $ {
      constructor(name) {
        this.pbt_1 = name;
      }
      toString() {
        return 'PreferencesKey(name=' + this.pbt_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.pbt_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof PreferencesKey()))
          return false;
        var tmp0_other_with_cast = other instanceof PreferencesKey() ? other : THROW_CCE();
        if (!(this.pbt_1 === tmp0_other_with_cast.pbt_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'PreferencesKey');
    PreferencesKeyClass = $;
  }
  return PreferencesKeyClass;
}
function stringPreferencesKey(name) {
  return new (PreferencesKey())(name);
}
function stringSetPreferencesKey(name) {
  return new (PreferencesKey())(name);
}
//region block: init
com_mbta_tid_mbta_app_datastore_PreferencesKey$stable = 0;
//endregion
//region block: exports
export {
  stringPreferencesKey as stringPreferencesKey27jkgr6k1ibb6,
  stringSetPreferencesKey as stringSetPreferencesKey1xwq30xy0cjap,
};
//endregion

//# sourceMappingURL=PreferencesKey.js.mjs.map
