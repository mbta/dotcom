import { charSequenceGet1vxk1y5n17t1z as charSequenceGet } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { toByte4i43936u611k as toByte } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { MalformedInputExceptionbvc6h5ij0ias as MalformedInputException } from './Charset.js.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function encodeISO88591(input, fromIndex, toIndex, dst) {
  if (fromIndex >= toIndex)
    return 0;
  var inductionVariable = fromIndex;
  if (inductionVariable < toIndex)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(input, index);
      var character = Char__toInt_impl_vasixd(this_0);
      if (character > 255) {
        failedToMapError(character);
      }
      dst.l31(toByte(character));
    }
     while (inductionVariable < toIndex);
  return toIndex - fromIndex | 0;
}
function failedToMapError(ch) {
  throw MalformedInputException().z3f('The character with unicode point ' + ch + " couldn't be mapped to ISO-8859-1 character");
}
//region block: exports
export {
  encodeISO88591 as encodeISO88591v742do8ms7fc,
};
//endregion

//# sourceMappingURL=ISO88591.mjs.map
