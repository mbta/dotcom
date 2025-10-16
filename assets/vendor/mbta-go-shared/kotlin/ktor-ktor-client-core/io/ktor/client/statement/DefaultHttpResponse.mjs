import { HttpResponse1532ob1hsse1y as HttpResponse } from './HttpResponse.mjs';
import {
  ByteReadChannel2wzou76jce72d as ByteReadChannel,
  Companion_getInstance2ai11rhpust2a as Companion_getInstance,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannel.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DefaultHttpResponseClass;
function DefaultHttpResponse() {
  if (DefaultHttpResponseClass === VOID) {
    class $ extends HttpResponse() {
      constructor(call, responseData) {
        super();
        this.e5q_1 = call;
        this.f5q_1 = responseData.z4t_1;
        this.g5q_1 = responseData.u4t_1;
        this.h5q_1 = responseData.x4t_1;
        this.i5q_1 = responseData.v4t_1;
        this.j5q_1 = responseData.a4u_1;
        var tmp = this;
        var tmp_0 = responseData.y4t_1;
        var tmp0_elvis_lhs = isInterface(tmp_0, ByteReadChannel()) ? tmp_0 : null;
        tmp.k5q_1 = tmp0_elvis_lhs == null ? Companion_getInstance().c38_1 : tmp0_elvis_lhs;
        this.l5q_1 = responseData.w4t_1;
      }
      d4s() {
        return this.e5q_1;
      }
      w20() {
        return this.f5q_1;
      }
      m4s() {
        return this.g5q_1;
      }
      n4s() {
        return this.h5q_1;
      }
      o4s() {
        return this.i5q_1;
      }
      p4s() {
        return this.j5q_1;
      }
      l4s() {
        return this.k5q_1;
      }
      l3v() {
        return this.l5q_1;
      }
    }
    initMetadataForClass($, 'DefaultHttpResponse');
    DefaultHttpResponseClass = $;
  }
  return DefaultHttpResponseClass;
}
//region block: exports
export {
  DefaultHttpResponse as DefaultHttpResponse2wnrinzo0twhn,
};
//endregion

//# sourceMappingURL=DefaultHttpResponse.mjs.map
