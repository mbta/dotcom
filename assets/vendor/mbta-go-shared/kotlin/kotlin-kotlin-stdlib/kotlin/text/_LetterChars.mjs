import { Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd } from '../Char.mjs';
import { binarySearchRange3kxkkwuchjxxl as binarySearchRange } from './_DigitChars.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../js/charSequenceJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { decodeVarLenBase64j8bxa3rbltzu as decodeVarLenBase64 } from './_CharCategories.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function getLetterType(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Letter_getInstance().s6_1, ch);
  var rangeStart = Letter_getInstance().s6_1[index];
  var rangeEnd = (rangeStart + Letter_getInstance().t6_1[index] | 0) - 1 | 0;
  var code = Letter_getInstance().u6_1[index];
  if (ch > rangeEnd) {
    return 0;
  }
  var lastTwoBits = code & 3;
  if (lastTwoBits === 0) {
    var shift = 2;
    var threshold = rangeStart;
    var inductionVariable = 0;
    if (inductionVariable <= 1)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        threshold = threshold + (code >> shift & 127) | 0;
        if (threshold > ch) {
          return 3;
        }
        shift = shift + 7 | 0;
        threshold = threshold + (code >> shift & 127) | 0;
        if (threshold > ch) {
          return 0;
        }
        shift = shift + 7 | 0;
      }
       while (inductionVariable <= 1);
    return 3;
  }
  if (code <= 7) {
    return lastTwoBits;
  }
  var distance = ch - rangeStart | 0;
  var shift_0 = code <= 31 ? distance % 2 | 0 : distance;
  return code >> imul(2, shift_0) & 3;
}
var LetterClass;
function Letter() {
  if (LetterClass === VOID) {
    class $ {
      constructor() {
        Letter_instance = this;
        var toBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var fromBase64 = new Int32Array(128);
        var inductionVariable = 0;
        var last = charSequenceLength(toBase64) - 1 | 0;
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlin.code' call
            var this_0 = charCodeAt(toBase64, i);
            fromBase64[Char__toInt_impl_vasixd(this_0)] = i;
          }
           while (inductionVariable <= last);
        var rangeStartDiff = 'hCgBpCQGYHZH5BRpBPPPPPPRMP5BPPlCPP6BkEPPPPcPXPzBvBrB3BOiDoBHwD+E3DauCnFmBmB2D6E1BlBTiBmBlBP5BhBiBrBvBjBqBnBPRtBiCmCtBlB0BmB5BiB7BmBgEmChBZgCoEoGVpBSfRhBPqKQ2BwBYoFgB4CJuTiEvBuCuDrF5DgEgFlJ1DgFmBQtBsBRGsB+BPiBlD1EIjDPRPPPQPPPPPGQSQS/DxENVNU+B9zCwBwBPPCkDPNnBPqDYY1R8B7FkFgTgwGgwUwmBgKwBuBScmEP/BPPPPPPrBP8B7F1B/ErBqC6B7BiBmBfQsBUwCw/KwqIwLwETPcPjQgJxFgBlBsD';
        var diff = decodeVarLenBase64(rangeStartDiff, fromBase64, 222);
        var start = new Int32Array(diff.length);
        var inductionVariable_0 = 0;
        var last_0 = diff.length - 1 | 0;
        if (inductionVariable_0 <= last_0)
          do {
            var i_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            if (i_0 === 0) {
              start[i_0] = diff[i_0];
            } else {
              start[i_0] = start[i_0 - 1 | 0] + diff[i_0] | 0;
            }
          }
           while (inductionVariable_0 <= last_0);
        this.s6_1 = start;
        var rangeLength = 'aaMBXHYH5BRpBPPPPPPRMP5BPPlCPPzBDOOPPcPXPzBvBjB3BOhDmBBpB7DoDYxB+EiBP1DoExBkBQhBekBPmBgBhBctBiBMWOOXhCsBpBkBUV3Ba4BkB0DlCgBXgBtD4FSdBfPhBPpKP0BvBXjEQ2CGsT8DhBtCqDpFvD1D3E0IrD2EkBJrBDOBsB+BPiBlB1EIjDPPPPPPPPPPPGPPMNLsBNPNPKCvBvBPPCkDPBmBPhDXXgD4B6FzEgDguG9vUtkB9JcuBSckEP/BPPPPPPBPf4FrBjEhBpC3B5BKaWPrBOwCk/KsCuLqDHPbPxPsFtEaaqDL';
        this.t6_1 = decodeVarLenBase64(rangeLength, fromBase64, 222);
        var rangeCategory = 'GFjgggUHGGFFZZZmzpz5qB6s6020B60ptltB6smt2sB60mz22B1+vv+8BZZ5s2850BW5q1ymtB506smzBF3q1q1qB1q1q1+Bgii4wDTm74g3KiggxqM60q1q1Bq1o1q1BF1qlrqrBZ2q5wprBGFZWWZGHFsjiooLowgmOowjkwCkgoiIk7ligGogiioBkwkiYkzj2oNoi+sbkwj04DghhkQ8wgiYkgoioDsgnkwC4gikQ//v+85BkwvoIsgoyI4yguI0whiwEowri4CoghsJowgqYowgm4DkwgsY/nwnzPowhmYkg6wI8yggZswikwHgxgmIoxgqYkwgk4DkxgmIkgoioBsgssoBgzgyI8g9gL8g9kI0wgwJoxgkoC0wgioFkw/wI0w53iF4gioYowjmgBHGq1qkgwBF1q1q8qBHwghuIwghyKk0goQkwgoQk3goQHGFHkyg0pBgxj6IoinkxDswno7Ikwhz9Bo0gioB8z48Rwli0xN0mpjoX8w78pDwltoqKHFGGwwgsIHFH3q1q16BFHWFZ1q10q1B2qlwq1B1q10q1B2q1yq1B6q1gq1Biq1qhxBir1qp1Bqt1q1qB1g1q1+B//3q16B///q1qBH/qlqq9Bholqq9B1i00a1q10qD1op1HkwmigEigiy6Cptogq1Bixo1kDq7/j00B2qgoBWGFm1lz50B6s5q1+BGWhggzhwBFFhgk4//Bo2jigE8wguI8wguI8wgugUog1qoB4qjmIwwi2KgkYHHH4lBgiFWkgIWoghssMmz5smrBZ3q1y50B5sm7gzBtz1smzB5smz50BqzqtmzB5sgzqzBF2/9//5BowgoIwmnkzPkwgk4C8ys65BkgoqI0wgy6FghquZo2giY0ghiIsgh24B4ghsQ8QF/v1q1OFs0O8iCHHF1qggz/B8wg6Iznv+//B08QgohsjK0QGFk7hsQ4gB';
        this.u6_1 = decodeVarLenBase64(rangeCategory, fromBase64, 222);
      }
    }
    initMetadataForObject($, 'Letter');
    LetterClass = $;
  }
  return LetterClass;
}
var Letter_instance;
function Letter_getInstance() {
  if (Letter_instance === VOID)
    new (Letter())();
  return Letter_instance;
}
function isLetterImpl(_this__u8e3s4) {
  return !(getLetterType(_this__u8e3s4) === 0);
}
//region block: exports
export {
  isLetterImpl as isLetterImpl3fxxojmw2aa31,
};
//endregion

//# sourceMappingURL=_LetterChars.mjs.map
