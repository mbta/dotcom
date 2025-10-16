import { AbstractMap3sqd8xvg0030s as AbstractMap } from './AbstractMap.mjs';
import {
  HashMapKeysDefaultd8xopyn6vbgh as HashMapKeysDefault,
  HashMapValuesDefault3j1xghpfb6bpq as HashMapValuesDefault,
} from './HashMapEntryDefault.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { equals2au1ep9vhcato as equals } from '../js/coreRuntime.mjs';
import { KtMutableMap1kqeifoi36kpz as KtMutableMap } from './Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractMutableMapClass;
function AbstractMutableMap() {
  if (AbstractMutableMapClass === VOID) {
    class $ extends AbstractMap() {
      static b8() {
        var $this = this.e8();
        $this.z7_1 = null;
        $this.a8_1 = null;
        return $this;
      }
      f8() {
        return HashMapKeysDefault().h8(this);
      }
      i8() {
        return HashMapValuesDefault().k8(this);
      }
      k3() {
        var tmp0_elvis_lhs = this.z7_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = this.f8();
          this.z7_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      l3() {
        var tmp0_elvis_lhs = this.a8_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          // Inline function 'kotlin.also' call
          var this_0 = this.i8();
          this.a8_1 = this_0;
          tmp = this_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        return tmp;
      }
      p3() {
        this.t1().p3();
      }
      v3(from) {
        this.y6();
        // Inline function 'kotlin.collections.iterator' call
        var _iterator__ex2g4s = from.t1().x();
        while (_iterator__ex2g4s.y()) {
          var _destruct__k2r9zo = _iterator__ex2g4s.z();
          // Inline function 'kotlin.collections.component1' call
          var key = _destruct__k2r9zo.u1();
          // Inline function 'kotlin.collections.component2' call
          var value = _destruct__k2r9zo.v1();
          this.t3(key, value);
        }
      }
      u3(key) {
        this.y6();
        var iter = this.t1().x();
        while (iter.y()) {
          var entry = iter.z();
          var k = entry.u1();
          if (equals(key, k)) {
            var value = entry.v1();
            iter.z6();
            return value;
          }
        }
        return null;
      }
      y6() {
      }
    }
    initMetadataForClass($, 'AbstractMutableMap', VOID, VOID, [AbstractMap(), KtMutableMap()]);
    AbstractMutableMapClass = $;
  }
  return AbstractMutableMapClass;
}
//region block: exports
export {
  AbstractMutableMap as AbstractMutableMapyktux9ubhc1g,
};
//endregion

//# sourceMappingURL=AbstractMutableMap.mjs.map
