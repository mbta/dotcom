import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Element2gr7ezmxqaln7 as Element } from '../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineContext.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
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
function get_key() {
  return Key_instance;
}
var MonotonicFrameClockClass;
function MonotonicFrameClock() {
  if (MonotonicFrameClockClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MonotonicFrameClock', VOID, VOID, [Element()], [1]);
    MonotonicFrameClockClass = $;
  }
  return MonotonicFrameClockClass;
}
function get_monotonicFrameClock(_this__u8e3s4) {
  var tmp0_elvis_lhs = _this__u8e3s4.sd(Key_instance);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var message = 'A MonotonicFrameClock is not available in this CoroutineContext. Callers should supply an appropriate MonotonicFrameClock using withContext.';
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
//region block: init
Key_instance = new (Key())();
//endregion
//region block: exports
export {
  get_key as get_key2ksjfn8509cif,
  MonotonicFrameClock as MonotonicFrameClock294sxh87palfa,
  get_monotonicFrameClock as get_monotonicFrameClock34o28lifn229,
};
//endregion

//# sourceMappingURL=MonotonicFrameClock.mjs.map
