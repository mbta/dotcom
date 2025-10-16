import {
  dropLast1vpiyky649o34 as dropLast,
  plus20p0vtfmu0596 as plus,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { split2bvyvnrlcifjv as split } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_fs_Path$stable;
var PathClass;
function Path() {
  if (PathClass === VOID) {
    class $ {
      constructor(segments) {
        this.q8k_1 = segments;
      }
      q21() {
        return new (Path())(dropLast(this.q8k_1, 1));
      }
      r8k(child) {
        return new (Path())(plus(this.q8k_1, child));
      }
    }
    initMetadataForClass($, 'Path');
    PathClass = $;
  }
  return PathClass;
}
function Path_0(path) {
  return new (Path())(split(path, ['/']));
}
//region block: init
com_mbta_tid_mbta_app_fs_Path$stable = 8;
//endregion
//region block: exports
export {
  Path_0 as Path2y0s8ychtjiig,
};
//endregion

//# sourceMappingURL=Path.js.mjs.map
