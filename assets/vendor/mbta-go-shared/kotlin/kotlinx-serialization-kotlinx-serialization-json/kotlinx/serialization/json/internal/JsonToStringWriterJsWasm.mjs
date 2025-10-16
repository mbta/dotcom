import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { printQuotedmgc3s3pgfors as printQuoted } from './StringOps.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var JsonToStringWriterClass;
function JsonToStringWriter() {
  if (JsonToStringWriterClass === VOID) {
    class $ {
      constructor() {
        this.h1l_1 = StringBuilder().kc(128);
      }
      n1p(value) {
        this.h1l_1.fj(value);
      }
      h1p(char) {
        this.h1l_1.ic(char);
      }
      j1p(text) {
        this.h1l_1.hc(text);
      }
      t1p(text) {
        printQuoted(this.h1l_1, text);
      }
      i1l() {
        this.h1l_1.kj();
      }
      toString() {
        return this.h1l_1.toString();
      }
    }
    initMetadataForClass($, 'JsonToStringWriter', JsonToStringWriter);
    JsonToStringWriterClass = $;
  }
  return JsonToStringWriterClass;
}
//region block: exports
export {
  JsonToStringWriter as JsonToStringWriter25agxcyem0yhk,
};
//endregion

//# sourceMappingURL=JsonToStringWriterJsWasm.mjs.map
