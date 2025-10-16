import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_response_ApiResult_Ok$stable;
var com_mbta_tid_mbta_app_model_response_ApiResult_Error$stable;
var com_mbta_tid_mbta_app_model_response_ApiResult$stable;
var OkClass;
function Ok() {
  if (OkClass === VOID) {
    class $ extends ApiResult() {
      constructor(data) {
        super();
        this.f9n_1 = data;
      }
      g9n(data) {
        return new (Ok())(data);
      }
      toString() {
        return 'Ok(data=' + toString(this.f9n_1) + ')';
      }
      hashCode() {
        return hashCode(this.f9n_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Ok()))
          return false;
        var tmp0_other_with_cast = other instanceof Ok() ? other : THROW_CCE();
        if (!equals(this.f9n_1, tmp0_other_with_cast.f9n_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Ok');
    OkClass = $;
  }
  return OkClass;
}
var ErrorClass;
function Error_0() {
  if (ErrorClass === VOID) {
    class $ extends ApiResult() {
      constructor(code, message) {
        code = code === VOID ? null : code;
        super();
        this.h9n_1 = code;
        this.i9n_1 = message;
      }
      toString() {
        return !(this.h9n_1 == null) ? 'Error ' + this.h9n_1 + ': ' + this.i9n_1 : this.i9n_1;
      }
      hashCode() {
        var result = this.h9n_1 == null ? 0 : this.h9n_1;
        result = imul(result, 31) + getStringHashCode(this.i9n_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Error_0()))
          return false;
        var tmp0_other_with_cast = other instanceof Error_0() ? other : THROW_CCE();
        if (!(this.h9n_1 == tmp0_other_with_cast.h9n_1))
          return false;
        if (!(this.i9n_1 === tmp0_other_with_cast.i9n_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Error');
    ErrorClass = $;
  }
  return ErrorClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var ApiResultClass;
function ApiResult() {
  if (ApiResultClass === VOID) {
    class $ {}
    initMetadataForClass($, 'ApiResult');
    ApiResultClass = $;
  }
  return ApiResultClass;
}
//region block: init
com_mbta_tid_mbta_app_model_response_ApiResult_Ok$stable = 0;
com_mbta_tid_mbta_app_model_response_ApiResult_Error$stable = 0;
com_mbta_tid_mbta_app_model_response_ApiResult$stable = 0;
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Error_0 as Errorw1uxmtp4dqlz,
  Ok as Ok3b20rn08cfbo3,
  Companion_instance as Companion_instance37ylmo65iquf4,
};
//endregion

//# sourceMappingURL=ApiResult.mjs.map
