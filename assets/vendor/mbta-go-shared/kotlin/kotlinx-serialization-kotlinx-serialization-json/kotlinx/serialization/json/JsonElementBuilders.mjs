import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  JsonArray2urf8ey7u44sd as JsonArray,
  JsonPrimitive2fp8648nd60dn as JsonPrimitive,
  JsonObjectee06ihoeeiqj as JsonObject,
} from './JsonElement.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var JsonArrayBuilderClass;
function JsonArrayBuilder() {
  if (JsonArrayBuilderClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.w1n_1 = ArrayList().g1();
      }
      x1n(element) {
        // Inline function 'kotlin.collections.plusAssign' call
        this.w1n_1.i(element);
        return true;
      }
      o1m() {
        return new (JsonArray())(this.w1n_1);
      }
    }
    initMetadataForClass($, 'JsonArrayBuilder');
    JsonArrayBuilderClass = $;
  }
  return JsonArrayBuilderClass;
}
function add(_this__u8e3s4, value) {
  return _this__u8e3s4.x1n(JsonPrimitive(value));
}
var JsonObjectBuilderClass;
function JsonObjectBuilder() {
  if (JsonObjectBuilderClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.linkedMapOf' call
        tmp.y1n_1 = LinkedHashMap().sc();
      }
      z1n(key, element) {
        return this.y1n_1.t3(key, element);
      }
      o1m() {
        return new (JsonObject())(this.y1n_1);
      }
    }
    initMetadataForClass($, 'JsonObjectBuilder');
    JsonObjectBuilderClass = $;
  }
  return JsonObjectBuilderClass;
}
//region block: exports
export {
  JsonArrayBuilder as JsonArrayBuilderu8edol6ui3pj,
  JsonObjectBuilder as JsonObjectBuilder2nl6rv6vdayuk,
  add as addyiu3vei5emo4,
};
//endregion

//# sourceMappingURL=JsonElementBuilders.mjs.map
