import {
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString_0 } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_model_ErrorBannerState_StalePredictions$stable;
var com_mbta_tid_mbta_app_model_ErrorBannerState_DataError$stable;
var com_mbta_tid_mbta_app_model_ErrorBannerState_NetworkError$stable;
var com_mbta_tid_mbta_app_model_ErrorBannerState$stable;
var StalePredictionsClass;
function StalePredictions() {
  if (StalePredictionsClass === VOID) {
    class $ extends ErrorBannerState() {
      constructor(lastUpdated, action) {
        super();
        this.z90_1 = lastUpdated;
        this.a91_1 = action;
      }
      toString() {
        return 'StalePredictions(lastUpdated=' + this.z90_1.toString() + ', action=' + toString(this.a91_1) + ')';
      }
      hashCode() {
        var result = this.z90_1.hashCode();
        result = imul(result, 31) + hashCode(this.a91_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof StalePredictions()))
          return false;
        var tmp0_other_with_cast = other instanceof StalePredictions() ? other : THROW_CCE();
        if (!this.z90_1.equals(tmp0_other_with_cast.z90_1))
          return false;
        if (!equals(this.a91_1, tmp0_other_with_cast.a91_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'StalePredictions');
    StalePredictionsClass = $;
  }
  return StalePredictionsClass;
}
var DataErrorClass;
function DataError() {
  if (DataErrorClass === VOID) {
    class $ extends ErrorBannerState() {
      constructor(messages, details, action) {
        super();
        this.b91_1 = messages;
        this.c91_1 = details;
        this.d91_1 = action;
      }
      toString() {
        return 'DataError(messages=' + toString(this.b91_1) + ', details=' + toString(this.c91_1) + ', action=' + toString(this.d91_1) + ')';
      }
      hashCode() {
        var result = hashCode(this.b91_1);
        result = imul(result, 31) + hashCode(this.c91_1) | 0;
        result = imul(result, 31) + hashCode(this.d91_1) | 0;
        return result;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof DataError()))
          return false;
        var tmp0_other_with_cast = other instanceof DataError() ? other : THROW_CCE();
        if (!equals(this.b91_1, tmp0_other_with_cast.b91_1))
          return false;
        if (!equals(this.c91_1, tmp0_other_with_cast.c91_1))
          return false;
        if (!equals(this.d91_1, tmp0_other_with_cast.d91_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'DataError');
    DataErrorClass = $;
  }
  return DataErrorClass;
}
var NetworkErrorClass;
function NetworkError() {
  if (NetworkErrorClass === VOID) {
    class $ extends ErrorBannerState() {
      constructor(action) {
        super();
        this.e91_1 = action;
      }
      toString() {
        return 'NetworkError(action=' + toString_0(this.e91_1) + ')';
      }
      hashCode() {
        return this.e91_1 == null ? 0 : hashCode(this.e91_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof NetworkError()))
          return false;
        var tmp0_other_with_cast = other instanceof NetworkError() ? other : THROW_CCE();
        if (!equals(this.e91_1, tmp0_other_with_cast.e91_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'NetworkError');
    NetworkErrorClass = $;
  }
  return NetworkErrorClass;
}
var ErrorBannerStateClass;
function ErrorBannerState() {
  if (ErrorBannerStateClass === VOID) {
    class $ {}
    initMetadataForClass($, 'ErrorBannerState');
    ErrorBannerStateClass = $;
  }
  return ErrorBannerStateClass;
}
//region block: init
com_mbta_tid_mbta_app_model_ErrorBannerState_StalePredictions$stable = 8;
com_mbta_tid_mbta_app_model_ErrorBannerState_DataError$stable = 8;
com_mbta_tid_mbta_app_model_ErrorBannerState_NetworkError$stable = 0;
com_mbta_tid_mbta_app_model_ErrorBannerState$stable = 0;
//endregion
//region block: exports
export {
  DataError as DataError2myofy06md2gg,
  NetworkError as NetworkError13cvqfq5ztvbw,
  StalePredictions as StalePredictions28to497qx2yqc,
  ErrorBannerState as ErrorBannerState56cmzn8cc29a,
};
//endregion

//# sourceMappingURL=ErrorBannerState.mjs.map
