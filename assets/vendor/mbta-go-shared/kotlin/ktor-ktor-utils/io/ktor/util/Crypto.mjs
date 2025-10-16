import { Buffergs925ekssbch as Buffer } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Buffer.mjs';
import { get_size2imoy2jq11jxl as get_size } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/BytePacketBuilder.mjs';
import { generateNonce1f4a9fru3x0v2 as generateNonce } from './CryptoJs.mjs';
import { writeText19qfzm98fbm4l as writeText } from '../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { readByteArray1fhzfwi2j014k as readByteArray } from '../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/Sources.mjs';
import { charArray2ujmm1qusno00 as charArray } from '../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
import { concatToString2syawgu50khxi as concatToString } from '../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { toCharArray1qby3f4cdahde as toCharArray } from './Charset.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_digits() {
  _init_properties_Crypto_kt__txayzl();
  return digits;
}
var digits;
function generateNonce_0(size) {
  _init_properties_Crypto_kt__txayzl();
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new (Buffer())();
  while (get_size(builder) < size) {
    writeText(builder, generateNonce());
  }
  return readByteArray(builder, size);
}
function hex(bytes) {
  _init_properties_Crypto_kt__txayzl();
  var result = charArray(imul(bytes.length, 2));
  var resultIndex = 0;
  var digits = get_digits();
  var inductionVariable = 0;
  var last = bytes.length;
  while (inductionVariable < last) {
    var element = bytes[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var b = element & 255;
    var _unary__edvuaz = resultIndex;
    resultIndex = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = digits[b >> 4];
    var _unary__edvuaz_0 = resultIndex;
    resultIndex = _unary__edvuaz_0 + 1 | 0;
    result[_unary__edvuaz_0] = digits[b & 15];
  }
  return concatToString(result);
}
var properties_initialized_Crypto_kt_8g5vqb;
function _init_properties_Crypto_kt__txayzl() {
  if (!properties_initialized_Crypto_kt_8g5vqb) {
    properties_initialized_Crypto_kt_8g5vqb = true;
    digits = toCharArray('0123456789abcdef');
  }
}
//region block: exports
export {
  generateNonce_0 as generateNonce3td15vdvbmmke,
  hex as hex2ofqpe9ngcu1i,
};
//endregion

//# sourceMappingURL=Crypto.mjs.map
