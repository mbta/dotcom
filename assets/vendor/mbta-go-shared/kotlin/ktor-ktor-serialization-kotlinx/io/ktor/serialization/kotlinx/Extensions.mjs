import { get_providers3pa8rlw39y46i as get_providers } from './ExtensionsJs.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function extensions(format) {
  // Inline function 'kotlin.collections.mapNotNull' call
  var tmp0 = get_providers();
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination = ArrayList().g1();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = tmp0.x();
  while (_iterator__ex2g4s.y()) {
    var element = _iterator__ex2g4s.z();
    var tmp0_safe_receiver = element.x65(format);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.i(tmp0_safe_receiver);
    }
  }
  return destination;
}
//region block: exports
export {
  extensions as extensionsocv2ha4uem50,
};
//endregion

//# sourceMappingURL=Extensions.mjs.map
