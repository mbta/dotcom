import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  textDecoderOptions227hpi8qrpg6b as textDecoderOptions,
  toKtor2p8jxvkfag2p1 as toKtor,
} from './TextDecoder.js.mjs';
import { TextDecoderFallback90zn71e530wg as TextDecoderFallback } from './TextDecoderFallback.js.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function Decoder(encoding, fatal) {
  fatal = fatal === VOID ? true : fatal;
  var tmp;
  try {
    tmp = toKtor(new TextDecoder(encoding, textDecoderOptions(fatal)));
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var cause = $p;
      tmp_0 = new (TextDecoderFallback())(encoding, fatal);
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  return tmp;
}
//region block: exports
export {
  Decoder as Decoder2ddeqv6fq19z5,
};
//endregion

//# sourceMappingURL=Decoder.js.mjs.map
