import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Path2y0s8ychtjiig as Path } from '../fs/Path.js.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_utils_MockSystemPaths$stable;
var SystemPathsClass;
function SystemPaths() {
  if (SystemPathsClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SystemPaths');
    SystemPathsClass = $;
  }
  return SystemPathsClass;
}
var MockSystemPathsClass;
function MockSystemPaths() {
  if (MockSystemPathsClass === VOID) {
    class $ {
      static fad(data, cache) {
        var $this = createThis(this);
        $this.dad_1 = data;
        $this.ead_1 = cache;
        return $this;
      }
      p8k() {
        return this.ead_1;
      }
      static gad(data, cache) {
        return this.fad(Path(data), Path(cache));
      }
    }
    initMetadataForClass($, 'MockSystemPaths', VOID, VOID, [SystemPaths()]);
    MockSystemPathsClass = $;
  }
  return MockSystemPathsClass;
}
//region block: init
com_mbta_tid_mbta_app_utils_MockSystemPaths$stable = 8;
//endregion
//region block: exports
export {
  MockSystemPaths as MockSystemPaths21yqvjk9ssl7u,
  SystemPaths as SystemPaths2f59gersnjq9q,
};
//endregion

//# sourceMappingURL=SystemPaths.mjs.map
