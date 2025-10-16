import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { AutoCloseable1l5p57f9lp7kv as AutoCloseable } from '../../../kotlin-kotlin-stdlib/kotlin/AutoCloseableJs.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function write$default(source, startIndex, endIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? source.length : endIndex;
  var tmp;
  if ($super === VOID) {
    this.c31(source, startIndex, endIndex);
    tmp = Unit_instance;
  } else {
    tmp = $super.c31.call(this, source, startIndex, endIndex);
  }
  return tmp;
}
var SinkClass;
function Sink() {
  if (SinkClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Sink', VOID, VOID, [AutoCloseable()]);
    SinkClass = $;
  }
  return SinkClass;
}
//region block: exports
export {
  write$default as write$default3ial01y23he0s,
  Sink as Sink189iybvk4puo6,
};
//endregion

//# sourceMappingURL=Sink.mjs.map
