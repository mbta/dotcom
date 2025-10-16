import {
  toJsArray19cldvndk6qr4 as toJsArray,
  toByteArray18j13y992cujz as toByteArray,
} from './TargetUtilsJs.mjs';
import { hex2ofqpe9ngcu1i as hex } from './Crypto.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get__crypto() {
  _init_properties_CryptoJs_kt__3vpuru();
  return _crypto;
}
var _crypto;
function generateNonce() {
  _init_properties_CryptoJs_kt__3vpuru();
  var buffer = toJsArray(new Int8Array(16));
  get__crypto().getRandomValues(buffer);
  return hex(toByteArray(buffer));
}
var properties_initialized_CryptoJs_kt_linsrw;
function _init_properties_CryptoJs_kt__3vpuru() {
  if (!properties_initialized_CryptoJs_kt_linsrw) {
    properties_initialized_CryptoJs_kt_linsrw = true;
    _crypto = globalThis ? globalThis.crypto : window.crypto || window.msCrypto;
  }
}
//region block: exports
export {
  generateNonce as generateNonce1f4a9fru3x0v2,
};
//endregion

//# sourceMappingURL=CryptoJs.mjs.map
