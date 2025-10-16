import {
  OperationsDebugStringFormattableqicuv1q9gtoc as OperationsDebugStringFormattable,
  Operations2xdufa66ptvyu as Operations,
} from './Operations.mjs';
import { composeImmediateRuntimeError2yqil22w149j8 as composeImmediateRuntimeError } from '../Composer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_changelist_FixupList$stable;
var FixupListClass;
function FixupList() {
  if (FixupListClass === VOID) {
    class $ extends OperationsDebugStringFormattable() {
      constructor() {
        super();
        this.c6o_1 = new (Operations())();
        this.d6o_1 = new (Operations())();
      }
      h1() {
        return this.c6o_1.h1();
      }
      p3() {
        this.d6o_1.p3();
        this.c6o_1.p3();
      }
      c7g(applier, slots, rememberManager) {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!this.d6o_1.h1()) {
          var tmp$ret$0 = 'FixupList has pending fixup operations that were not realized. Were there mismatched insertNode() and endNodeInsert() calls?';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.c6o_1.q7e(applier, slots, rememberManager);
      }
      q6r() {
        // Inline function 'androidx.compose.runtime.runtimeCheck' call
        if (!this.d6o_1.u6d()) {
          var tmp$ret$0 = 'Cannot end node insertion, there are no pending operations that can be realized.';
          composeImmediateRuntimeError(tmp$ret$0);
        }
        this.d6o_1.d7g(this.c6o_1);
      }
    }
    initMetadataForClass($, 'FixupList', FixupList);
    FixupListClass = $;
  }
  return FixupListClass;
}
//region block: init
androidx_compose_runtime_changelist_FixupList$stable = 8;
//endregion
//region block: exports
export {
  FixupList as FixupList2v711dy4fkt4r,
};
//endregion

//# sourceMappingURL=FixupList.mjs.map
