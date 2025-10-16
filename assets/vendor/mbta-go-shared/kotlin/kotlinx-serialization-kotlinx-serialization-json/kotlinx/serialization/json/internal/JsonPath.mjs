import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { copyOf2ng0t8oizk6it as copyOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { arrayCopytctsywo3h7gj as arrayCopy } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { LIST_getInstancey7k5h8d5cvxt as LIST_getInstance } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { SerialDescriptor2pelqekb5ic3a as SerialDescriptor } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialDescriptor.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var TombstoneClass;
function Tombstone() {
  if (TombstoneClass === VOID) {
    class $ {}
    initMetadataForObject($, 'Tombstone');
    TombstoneClass = $;
  }
  return TombstoneClass;
}
var Tombstone_instance;
function Tombstone_getInstance() {
  return Tombstone_instance;
}
function resize($this) {
  var newSize = imul($this.d1r_1, 2);
  $this.b1r_1 = copyOf($this.b1r_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.c1r_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.c1r_1 = newIndices;
}
var JsonPathClass;
function JsonPath() {
  if (JsonPathClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.arrayOfNulls' call
        tmp.b1r_1 = Array(8);
        var tmp_0 = this;
        var tmp_1 = 0;
        var tmp_2 = new Int32Array(8);
        while (tmp_1 < 8) {
          tmp_2[tmp_1] = -1;
          tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0.c1r_1 = tmp_2;
        this.d1r_1 = -1;
      }
      e1r(sd) {
        this.d1r_1 = this.d1r_1 + 1 | 0;
        var depth = this.d1r_1;
        if (depth === this.b1r_1.length) {
          resize(this);
        }
        this.b1r_1[depth] = sd;
      }
      f1r(index) {
        this.c1r_1[this.d1r_1] = index;
      }
      g1r(key) {
        var tmp;
        if (!(this.c1r_1[this.d1r_1] === -2)) {
          this.d1r_1 = this.d1r_1 + 1 | 0;
          tmp = this.d1r_1 === this.b1r_1.length;
        } else {
          tmp = false;
        }
        if (tmp) {
          resize(this);
        }
        this.b1r_1[this.d1r_1] = key;
        this.c1r_1[this.d1r_1] = -2;
      }
      h1r() {
        if (this.c1r_1[this.d1r_1] === -2) {
          this.b1r_1[this.d1r_1] = Tombstone_instance;
        }
      }
      i1r() {
        var depth = this.d1r_1;
        if (this.c1r_1[depth] === -2) {
          this.c1r_1[depth] = -1;
          this.d1r_1 = this.d1r_1 - 1 | 0;
        }
        if (!(this.d1r_1 === -1)) {
          this.d1r_1 = this.d1r_1 - 1 | 0;
        }
      }
      j1r() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        this_0.hc('$');
        // Inline function 'kotlin.repeat' call
        var times = this.d1r_1 + 1 | 0;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = this.b1r_1[index];
            if (!(element == null) ? isInterface(element, SerialDescriptor()) : false) {
              if (equals(element.x11(), LIST_getInstance())) {
                if (!(this.c1r_1[index] === -1)) {
                  this_0.hc('[');
                  this_0.ej(this.c1r_1[index]);
                  this_0.hc(']');
                }
              } else {
                var idx = this.c1r_1[index];
                if (idx >= 0) {
                  this_0.hc('.');
                  this_0.hc(element.b12(idx));
                }
              }
            } else {
              if (!(element === Tombstone_instance)) {
                this_0.hc('[');
                this_0.hc("'");
                this_0.gc(element);
                this_0.hc("'");
                this_0.hc(']');
              }
            }
          }
           while (inductionVariable < times);
        return this_0.toString();
      }
      toString() {
        return this.j1r();
      }
    }
    initMetadataForClass($, 'JsonPath', JsonPath);
    JsonPathClass = $;
  }
  return JsonPathClass;
}
//region block: init
Tombstone_instance = new (Tombstone())();
//endregion
//region block: exports
export {
  JsonPath as JsonPath2hoqh4ysli693,
};
//endregion

//# sourceMappingURL=JsonPath.mjs.map
