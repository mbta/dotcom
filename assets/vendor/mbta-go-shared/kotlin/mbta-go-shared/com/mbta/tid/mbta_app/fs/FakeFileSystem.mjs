import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { FileSystem23s9wmosmz1qj as FileSystem } from './FileSystem.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_fs_FakeFileSystem$stable;
var FakeFileSystemClass;
function FakeFileSystem() {
  if (FakeFileSystemClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp.e8o_1 = LinkedHashMap().sc();
      }
      d8l(path) {
      }
      c8l(file) {
        // Inline function 'kotlin.checkNotNull' call
        var tmp0 = this.e8o_1.j3(file);
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.checkNotNull' call
          if (tmp0 == null) {
            var message = 'Required value was null.';
            throw IllegalStateException().o5(toString(message));
          } else {
            tmp$ret$1 = tmp0;
            break $l$block;
          }
        }
        return tmp$ret$1;
      }
      e8l(file, text) {
        // Inline function 'kotlin.collections.set' call
        this.e8o_1.t3(file, text);
      }
    }
    initMetadataForClass($, 'FakeFileSystem', FakeFileSystem, VOID, [FileSystem()]);
    FakeFileSystemClass = $;
  }
  return FakeFileSystemClass;
}
//region block: init
com_mbta_tid_mbta_app_fs_FakeFileSystem$stable = 8;
//endregion
//region block: exports
export {
  FakeFileSystem as FakeFileSystem16sri3ivuv6lk,
};
//endregion

//# sourceMappingURL=FakeFileSystem.mjs.map
