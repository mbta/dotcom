import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from './throwableExtensions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AutoCloseableClass;
function AutoCloseable() {
  if (AutoCloseableClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AutoCloseable');
    AutoCloseableClass = $;
  }
  return AutoCloseableClass;
}
function closeFinally(_this__u8e3s4, cause) {
  var tmp;
  if (_this__u8e3s4 == null) {
    tmp = Unit_instance;
  } else if (cause == null) {
    _this__u8e3s4.v6();
    tmp = Unit_instance;
  } else {
    var tmp_0;
    try {
      _this__u8e3s4.v6();
      tmp_0 = Unit_instance;
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var closeException = $p;
        addSuppressed(cause, closeException);
        tmp_1 = Unit_instance;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    tmp = tmp_0;
  }
  return tmp;
}
//region block: exports
export {
  AutoCloseable as AutoCloseable1l5p57f9lp7kv,
  closeFinally as closeFinally1sadm0w9gt3u4,
};
//endregion

//# sourceMappingURL=AutoCloseableJs.mjs.map
