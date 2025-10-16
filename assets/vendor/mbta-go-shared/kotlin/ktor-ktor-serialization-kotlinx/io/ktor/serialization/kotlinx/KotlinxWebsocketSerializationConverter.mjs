import {
  StringFormat2r2ka8mzcb3mi as StringFormat,
  BinaryFormat3f3aelhmz0ro1 as BinaryFormat,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerialFormat.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var KotlinxWebsocketSerializationConverterClass;
function KotlinxWebsocketSerializationConverter() {
  if (KotlinxWebsocketSerializationConverterClass === VOID) {
    class $ {
      constructor(format) {
        this.v6a_1 = format;
        var tmp;
        var tmp_0 = this.v6a_1;
        if (isInterface(tmp_0, BinaryFormat())) {
          tmp = true;
        } else {
          var tmp_1 = this.v6a_1;
          tmp = isInterface(tmp_1, StringFormat());
        }
        // Inline function 'kotlin.require' call
        if (!tmp) {
          var message = 'Only binary and string formats are supported, ' + (toString(this.v6a_1) + ' is not supported.');
          throw IllegalArgumentException().q(toString(message));
        }
      }
    }
    initMetadataForClass($, 'KotlinxWebsocketSerializationConverter', VOID, VOID, VOID, [3]);
    KotlinxWebsocketSerializationConverterClass = $;
  }
  return KotlinxWebsocketSerializationConverterClass;
}
//region block: exports
export {
  KotlinxWebsocketSerializationConverter as KotlinxWebsocketSerializationConverter1qaps8wgq4zyw,
};
//endregion

//# sourceMappingURL=KotlinxWebsocketSerializationConverter.mjs.map
