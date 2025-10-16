import { KtMap140uvy3s5zad8 as KtMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CompositionLocal36jzctlu8tgcr as CompositionLocal } from './CompositionLocal.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var PersistentCompositionLocalMapClass;
function PersistentCompositionLocalMap() {
  if (PersistentCompositionLocalMapClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'PersistentCompositionLocalMap', VOID, VOID, [KtMap()]);
    PersistentCompositionLocalMapClass = $;
  }
  return PersistentCompositionLocalMapClass;
}
function read(_this__u8e3s4, key) {
  // Inline function 'kotlin.collections.getOrElse' call
  var key_0 = key instanceof CompositionLocal() ? key : THROW_CCE();
  var tmp0_elvis_lhs = _this__u8e3s4.j3(key_0);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    tmp = key.m72();
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var tmp_0 = tmp.p72(_this__u8e3s4);
  return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
}
//region block: exports
export {
  PersistentCompositionLocalMap as PersistentCompositionLocalMap2iv80bl6i9tec,
  read as readroxzwifd0z85,
};
//endregion

//# sourceMappingURL=CompositionLocalMap.mjs.map
