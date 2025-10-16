import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  ConcatenatedFormatStructure27s7lx6ixzw2f as ConcatenatedFormatStructure,
  NonConcatenatedFormatStructure1tep5eavrzcwp as NonConcatenatedFormatStructure,
} from './FormatStructure.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AppendableFormatStructureClass;
function AppendableFormatStructure() {
  if (AppendableFormatStructureClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.v83_1 = ArrayList().g1();
      }
      r3q() {
        return new (ConcatenatedFormatStructure())(this.v83_1);
      }
      w83(format) {
        if (isInterface(format, NonConcatenatedFormatStructure()))
          this.v83_1.i(format);
        else {
          if (format instanceof ConcatenatedFormatStructure()) {
            // Inline function 'kotlin.collections.forEach' call
            var _iterator__ex2g4s = format.x83_1.x();
            while (_iterator__ex2g4s.y()) {
              var element = _iterator__ex2g4s.z();
              this.v83_1.i(element);
            }
          } else {
            noWhenBranchMatchedException();
          }
        }
      }
    }
    initMetadataForClass($, 'AppendableFormatStructure', AppendableFormatStructure);
    AppendableFormatStructureClass = $;
  }
  return AppendableFormatStructureClass;
}
//region block: exports
export {
  AppendableFormatStructure as AppendableFormatStructure38mt32f1b8qva,
};
//endregion

//# sourceMappingURL=Builder.mjs.map
