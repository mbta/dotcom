import { isWhitespace25occ8z1ed1s9 as isWhitespace } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/charJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function skipSpacesAndHorizontalTabs(text, start, end) {
  var index = start;
  $l$loop: while (index < end) {
    var ch = text.b(index);
    if (!isWhitespace(ch) && !(ch === _Char___init__impl__6a9atx(9)))
      break $l$loop;
    index = index + 1 | 0;
  }
  return index;
}
//region block: exports
export {
  skipSpacesAndHorizontalTabs as skipSpacesAndHorizontalTabs2u6kkzguaojc4,
};
//endregion

//# sourceMappingURL=Tokenizer.mjs.map
