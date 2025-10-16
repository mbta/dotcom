import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toList3jhuyej2anx2q as toList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import {
  get1sxyiyz2qwf4j as get,
  Attributes2dg90yv0ot9wx as Attributes,
} from './Attributes.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function AttributesJsFn(concurrent) {
  concurrent = concurrent === VOID ? false : concurrent;
  return new (AttributesJs())();
}
var AttributesJsClass;
function AttributesJs() {
  if (AttributesJsClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp.n3n_1 = LinkedHashMap().sc();
      }
      g3h(key) {
        var tmp = this.n3n_1.j3(key);
        return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      }
      h3h(key) {
        return this.n3n_1.h3(key);
      }
      i3h(key, value) {
        // Inline function 'kotlin.collections.set' call
        this.n3n_1.t3(key, value);
      }
      j3h(key) {
        this.n3n_1.u3(key);
      }
      k3h(key, block) {
        var tmp0_safe_receiver = this.n3n_1.j3(key);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          return !(tmp0_safe_receiver == null) ? tmp0_safe_receiver : THROW_CCE();
        }
        // Inline function 'kotlin.also' call
        var this_0 = block();
        // Inline function 'kotlin.collections.set' call
        this.n3n_1.t3(key, this_0);
        return this_0;
      }
      l3h() {
        return toList(this.n3n_1.k3());
      }
    }
    protoOf($).f3h = get;
    initMetadataForClass($, 'AttributesJs', AttributesJs, VOID, [Attributes()]);
    AttributesJsClass = $;
  }
  return AttributesJsClass;
}
//region block: exports
export {
  AttributesJsFn as AttributesJsFn25rjfgcprgprf,
};
//endregion

//# sourceMappingURL=AttributesJs.mjs.map
