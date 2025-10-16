import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function isWhitespaceImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  return (9 <= ch ? ch <= 13 : false) || (28 <= ch ? ch <= 32 : false) || ch === 160 || (ch > 4096 && (ch === 5760 || (8192 <= ch ? ch <= 8202 : false) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288));
}
//region block: exports
export {
  isWhitespaceImpl as isWhitespaceImpl2nyplwp172aso,
};
//endregion

//# sourceMappingURL=_WhitespaceChars.mjs.map
