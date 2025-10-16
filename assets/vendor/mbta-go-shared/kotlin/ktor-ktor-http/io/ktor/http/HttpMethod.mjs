import { listOf1jh22dvmctj1r as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_REQUESTS_WITHOUT_BODY() {
  _init_properties_HttpMethod_kt__cbus5z();
  return REQUESTS_WITHOUT_BODY;
}
var REQUESTS_WITHOUT_BODY;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.m3v_1 = new (HttpMethod())('GET');
        this.n3v_1 = new (HttpMethod())('POST');
        this.o3v_1 = new (HttpMethod())('PUT');
        this.p3v_1 = new (HttpMethod())('PATCH');
        this.q3v_1 = new (HttpMethod())('DELETE');
        this.r3v_1 = new (HttpMethod())('HEAD');
        this.s3v_1 = new (HttpMethod())('OPTIONS');
        this.t3v_1 = listOf([this.m3v_1, this.n3v_1, this.o3v_1, this.p3v_1, this.q3v_1, this.r3v_1, this.s3v_1]);
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var HttpMethodClass;
function HttpMethod() {
  if (HttpMethodClass === VOID) {
    class $ {
      constructor(value) {
        Companion_getInstance();
        this.u3v_1 = value;
      }
      toString() {
        return this.u3v_1;
      }
      hashCode() {
        return getStringHashCode(this.u3v_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof HttpMethod()))
          return false;
        var tmp0_other_with_cast = other instanceof HttpMethod() ? other : THROW_CCE();
        if (!(this.u3v_1 === tmp0_other_with_cast.u3v_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'HttpMethod');
    HttpMethodClass = $;
  }
  return HttpMethodClass;
}
function get_supportsRequestBody(_this__u8e3s4) {
  _init_properties_HttpMethod_kt__cbus5z();
  return !get_REQUESTS_WITHOUT_BODY().j1(_this__u8e3s4);
}
var properties_initialized_HttpMethod_kt_ogor3f;
function _init_properties_HttpMethod_kt__cbus5z() {
  if (!properties_initialized_HttpMethod_kt_ogor3f) {
    properties_initialized_HttpMethod_kt_ogor3f = true;
    REQUESTS_WITHOUT_BODY = setOf([Companion_getInstance().m3v_1, Companion_getInstance().r3v_1, Companion_getInstance().s3v_1, new (HttpMethod())('TRACE')]);
  }
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstance1p3cpld7r1jz3,
  get_supportsRequestBody as get_supportsRequestBodyjdtitrt33hir,
};
//endregion

//# sourceMappingURL=HttpMethod.mjs.map
