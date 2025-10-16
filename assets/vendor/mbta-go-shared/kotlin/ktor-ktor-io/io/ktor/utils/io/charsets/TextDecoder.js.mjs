import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function toKtor(_this__u8e3s4) {
  return new (toKtor$1())(_this__u8e3s4);
}
function textDecoderOptions(fatal) {
  fatal = fatal === VOID ? false : fatal;
  // Inline function 'kotlin.apply' call
  var this_0 = new Object();
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.with' call
  this_0.fatal = fatal;
  return this_0;
}
var toKtor$1Class;
function toKtor$1() {
  if (toKtor$1Class === VOID) {
    class $ {
      constructor($this_toKtor) {
        this.b3h_1 = $this_toKtor;
      }
      a3h(buffer) {
        return this.b3h_1.decode(buffer);
      }
    }
    initMetadataForClass($);
    toKtor$1Class = $;
  }
  return toKtor$1Class;
}
//region block: exports
export {
  textDecoderOptions as textDecoderOptions227hpi8qrpg6b,
  toKtor as toKtor2p8jxvkfag2p1,
};
//endregion

//# sourceMappingURL=TextDecoder.js.mjs.map
