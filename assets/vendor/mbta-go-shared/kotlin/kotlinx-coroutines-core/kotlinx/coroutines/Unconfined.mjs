import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from './CoroutineDispatcher.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException } from '../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { initMetadataForObject1cxne3s9w65el as initMetadataForObject } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var UnconfinedClass;
function Unconfined() {
  if (UnconfinedClass === VOID) {
    class $ extends CoroutineDispatcher() {
      constructor() {
        Unconfined_instance = null;
        super();
        Unconfined_instance = this;
      }
      l28(context) {
        return false;
      }
      m28(context, block) {
        var yieldContext = context.sd(Key_instance);
        if (!(yieldContext == null)) {
          yieldContext.y2e_1 = true;
          return Unit_instance;
        }
        throw UnsupportedOperationException().f6('Dispatchers.Unconfined.dispatch function can only be used by the yield function. If you wrap Unconfined dispatcher in your code, make sure you properly delegate isDispatchNeeded and dispatch calls.');
      }
      toString() {
        return 'Dispatchers.Unconfined';
      }
    }
    initMetadataForObject($, 'Unconfined');
    UnconfinedClass = $;
  }
  return UnconfinedClass;
}
var Unconfined_instance;
function Unconfined_getInstance() {
  if (Unconfined_instance === VOID)
    new (Unconfined())();
  return Unconfined_instance;
}
var KeyClass;
function Key() {
  if (KeyClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Key');
    KeyClass = $;
  }
  return KeyClass;
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
}
//region block: init
Key_instance = new (Key())();
//endregion
//region block: exports
export {
  Unconfined_getInstance as Unconfined_getInstance6pooz906dfij,
};
//endregion

//# sourceMappingURL=Unconfined.mjs.map
