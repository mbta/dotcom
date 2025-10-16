import { AbstractEncoder2gxtu3xmy3f8j as AbstractEncoder } from '../encoding/AbstractEncoder.mjs';
import { EmptySerializersModule991ju6pz9b79 as EmptySerializersModule } from '../modules/SerializersModuleBuilders.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NoOpEncoderClass;
function NoOpEncoder() {
  if (NoOpEncoderClass === VOID) {
    class $ extends AbstractEncoder() {
      static i1c() {
        NoOpEncoder_instance = null;
        var $this = this.o14();
        NoOpEncoder_instance = $this;
        $this.h1c_1 = EmptySerializersModule();
        return $this;
      }
      k14() {
        return this.h1c_1;
      }
      q14(value) {
        return Unit_instance;
      }
      r14() {
        return Unit_instance;
      }
      s14(value) {
        return Unit_instance;
      }
      t14(value) {
        return Unit_instance;
      }
      u14(value) {
        return Unit_instance;
      }
      v14(value) {
        return Unit_instance;
      }
      w14(value) {
        return Unit_instance;
      }
      x14(value) {
        return Unit_instance;
      }
      y14(value) {
        return Unit_instance;
      }
      z14(value) {
        return Unit_instance;
      }
      a15(value) {
        return Unit_instance;
      }
      b15(enumDescriptor, index) {
        return Unit_instance;
      }
    }
    initMetadataForObject($, 'NoOpEncoder');
    NoOpEncoderClass = $;
  }
  return NoOpEncoderClass;
}
var NoOpEncoder_instance;
function NoOpEncoder_getInstance() {
  if (NoOpEncoder_instance === VOID)
    NoOpEncoder().i1c();
  return NoOpEncoder_instance;
}
//region block: exports
export {
  NoOpEncoder_getInstance as NoOpEncoder_getInstance3if0k9o02xdwe,
};
//endregion

//# sourceMappingURL=NoOpEncoder.mjs.map
