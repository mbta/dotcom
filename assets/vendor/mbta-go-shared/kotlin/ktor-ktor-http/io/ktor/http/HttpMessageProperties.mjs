import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from './HttpHeaders.mjs';
import { toLongkk4waq8msp1k as toLong } from '../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import {
  charset1dribv3ku48b1 as charset,
  Companion_getInstancecf9b3ybko8sp as Companion_getInstance,
} from './ContentTypes.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function contentLength(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.l3v().lk(HttpHeaders_getInstance().h3r_1);
  return tmp0_safe_receiver == null ? null : toLong(tmp0_safe_receiver);
}
function charset_0(_this__u8e3s4) {
  var tmp0_safe_receiver = contentType_0(_this__u8e3s4);
  return tmp0_safe_receiver == null ? null : charset(tmp0_safe_receiver);
}
function contentType(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.l3v().lk(HttpHeaders_getInstance().k3r_1);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = Companion_getInstance().dx(tmp0_safe_receiver);
  }
  return tmp;
}
function contentType_0(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.l3v().lk(HttpHeaders_getInstance().k3r_1);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = Companion_getInstance().dx(tmp0_safe_receiver);
  }
  return tmp;
}
function etag(_this__u8e3s4) {
  return _this__u8e3s4.l3v().lk(HttpHeaders_getInstance().r3r_1);
}
//region block: exports
export {
  charset_0 as charset3qqtyytkmxogi,
  contentLength as contentLength2suzxu1lzutku,
  contentType as contentType2zzm38yxo3syt,
  contentType_0 as contentType317fn4f991q9a,
  etag as etag8et71yhy18a4,
};
//endregion

//# sourceMappingURL=HttpMessageProperties.mjs.map
