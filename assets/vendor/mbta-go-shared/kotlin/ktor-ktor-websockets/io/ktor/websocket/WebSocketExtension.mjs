import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var WebSocketExtensionClass;
function WebSocketExtension() {
  if (WebSocketExtensionClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WebSocketExtension');
    WebSocketExtensionClass = $;
  }
  return WebSocketExtensionClass;
}
var WebSocketExtensionsConfigClass;
function WebSocketExtensionsConfig() {
  if (WebSocketExtensionsConfigClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.q4j_1 = ArrayList().g1();
        var tmp_0 = this;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0.r4j_1 = [false, false, false];
      }
      r3q() {
        // Inline function 'kotlin.collections.map' call
        var this_0 = this.q4j_1;
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var item = _iterator__ex2g4s.z();
          var tmp$ret$0 = item();
          destination.i(tmp$ret$0);
        }
        return destination;
      }
    }
    initMetadataForClass($, 'WebSocketExtensionsConfig', WebSocketExtensionsConfig);
    WebSocketExtensionsConfigClass = $;
  }
  return WebSocketExtensionsConfigClass;
}
//region block: exports
export {
  WebSocketExtensionsConfig as WebSocketExtensionsConfig3sf1f7u7xi63m,
  WebSocketExtension as WebSocketExtensionixqq2y77p4e0,
};
//endregion

//# sourceMappingURL=WebSocketExtension.mjs.map
