import {
  toString3o7ifthqydp6e as toString,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
} from '../Char.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../js/charSequenceJs.mjs';
import { isWhitespaceImpl2nyplwp172aso as isWhitespaceImpl } from './_WhitespaceChars.mjs';
import { isLetterImpl3fxxojmw2aa31 as isLetterImpl } from './_LetterChars.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function uppercaseChar(_this__u8e3s4) {
  // Inline function 'kotlin.text.uppercase' call
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var uppercase = toString(_this__u8e3s4).toUpperCase();
  return uppercase.length > 1 ? _this__u8e3s4 : charCodeAt(uppercase, 0);
}
function isWhitespace(_this__u8e3s4) {
  return isWhitespaceImpl(_this__u8e3s4);
}
function isLetter(_this__u8e3s4) {
  if ((_Char___init__impl__6a9atx(97) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(122) : false) || (_Char___init__impl__6a9atx(65) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(90) : false)) {
    return true;
  }
  if (Char__compareTo_impl_ypi4mb(_this__u8e3s4, _Char___init__impl__6a9atx(128)) < 0) {
    return false;
  }
  return isLetterImpl(_this__u8e3s4);
}
//region block: exports
export {
  isLetter as isLettere1qnx5bysxbd,
  isWhitespace as isWhitespace25occ8z1ed1s9,
  uppercaseChar as uppercaseChar6lahngw3wvwg,
};
//endregion

//# sourceMappingURL=charJs.mjs.map
