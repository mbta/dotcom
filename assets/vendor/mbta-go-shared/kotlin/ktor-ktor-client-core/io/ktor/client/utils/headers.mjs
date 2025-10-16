import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { HeadersBuilder3h7sn3kkvu98m as HeadersBuilder } from '../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function buildHeaders(block) {
  var tmp;
  if (block === VOID) {
    tmp = buildHeaders$lambda;
  } else {
    tmp = block;
  }
  block = tmp;
  // Inline function 'kotlin.apply' call
  var this_0 = new (HeadersBuilder())();
  block(this_0);
  return this_0.r3q();
}
function buildHeaders$lambda(_this__u8e3s4) {
  return Unit_instance;
}
//region block: exports
export {
  buildHeaders as buildHeaders3beu05fiq9iq2,
};
//endregion

//# sourceMappingURL=headers.mjs.map
