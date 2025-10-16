import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from './CoroutineDispatcher.mjs';
import {
  get_classSimpleName2jgk6lzg9ft1 as get_classSimpleName,
  get_hexAddress1mxa7txdmiojm as get_hexAddress,
} from './Debug.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from './Dispatchers.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var MainCoroutineDispatcherClass;
function MainCoroutineDispatcher() {
  if (MainCoroutineDispatcherClass === VOID) {
    class $ extends CoroutineDispatcher() {
      toString() {
        var tmp0_elvis_lhs = this.u2d();
        return tmp0_elvis_lhs == null ? get_classSimpleName(this) + '@' + get_hexAddress(this) : tmp0_elvis_lhs;
      }
      u2d() {
        var main = Dispatchers_getInstance().y28();
        if (this === main)
          return 'Dispatchers.Main';
        var tmp;
        try {
          tmp = main.t2d();
        } catch ($p) {
          var tmp_0;
          if ($p instanceof UnsupportedOperationException()) {
            var e = $p;
            tmp_0 = null;
          } else {
            throw $p;
          }
          tmp = tmp_0;
        }
        var immediate = tmp;
        if (this === immediate)
          return 'Dispatchers.Main.immediate';
        return null;
      }
    }
    initMetadataForClass($, 'MainCoroutineDispatcher');
    MainCoroutineDispatcherClass = $;
  }
  return MainCoroutineDispatcherClass;
}
//region block: exports
export {
  MainCoroutineDispatcher as MainCoroutineDispatcher158x49bd8e9gp,
};
//endregion

//# sourceMappingURL=MainCoroutineDispatcher.mjs.map
