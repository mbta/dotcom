import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { MissingFieldException24tqif29emcmi as MissingFieldException } from '../SerializationExceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function throwMissingFieldException(seen, goldenMask, descriptor) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var missingFields = ArrayList().g1();
  var missingFieldsBits = goldenMask & ~seen;
  var inductionVariable = 0;
  if (inductionVariable < 32)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!((missingFieldsBits & 1) === 0)) {
        // Inline function 'kotlin.collections.plusAssign' call
        var element = descriptor.b12(i);
        missingFields.i(element);
      }
      missingFieldsBits = missingFieldsBits >>> 1 | 0;
    }
     while (inductionVariable < 32);
  throw MissingFieldException().f11(missingFields, descriptor.j10());
}
//region block: exports
export {
  throwMissingFieldException as throwMissingFieldException2cmke0v3ynf14,
};
//endregion

//# sourceMappingURL=PluginExceptions.mjs.map
