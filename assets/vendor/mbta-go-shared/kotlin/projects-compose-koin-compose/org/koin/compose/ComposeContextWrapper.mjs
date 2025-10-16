import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var org_koin_compose_ComposeContextWrapper$stable;
var ComposeContextWrapperClass;
function ComposeContextWrapper() {
  if (ComposeContextWrapperClass === VOID) {
    class $ {
      constructor(initValue, setValue) {
        initValue = initValue === VOID ? null : initValue;
        setValue = setValue === VOID ? null : setValue;
        this.t7z_1 = setValue;
        this.u7z_1 = initValue;
      }
      v7z() {
        var tmp = this;
        var tmp0_safe_receiver = this.t7z_1;
        tmp.u7z_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver();
        return this.u7z_1;
      }
      w7z() {
        if (this.u7z_1 == null) {
          var tmp = this;
          var tmp0_safe_receiver = this.t7z_1;
          tmp.u7z_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver();
        }
        var tmp1_elvis_lhs = this.u7z_1;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          var message = "Can't retrieve value for ";
          throw IllegalStateException().o5(toString(message));
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        return tmp_0;
      }
    }
    initMetadataForClass($, 'ComposeContextWrapper', ComposeContextWrapper);
    ComposeContextWrapperClass = $;
  }
  return ComposeContextWrapperClass;
}
//region block: init
org_koin_compose_ComposeContextWrapper$stable = 8;
//endregion
//region block: exports
export {
  ComposeContextWrapper as ComposeContextWrapperu7w32q6dcnyi,
};
//endregion

//# sourceMappingURL=ComposeContextWrapper.mjs.map
