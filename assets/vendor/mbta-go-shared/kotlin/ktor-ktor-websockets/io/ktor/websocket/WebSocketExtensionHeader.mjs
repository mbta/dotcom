import {
  joinToString1cxrrlmo0chqs as joinToString,
  first58ocm7j58k3q as first,
  drop3na99dw9feawf as drop,
} from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  split2bvyvnrlcifjv as split,
  trim11nh7r46at6sx as trim,
} from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { isCharSequence1ju9jr1w86plq as isCharSequence } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function parametersToString($this) {
  return $this.t4j_1.h1() ? '' : '; ' + joinToString($this.t4j_1, ';');
}
var WebSocketExtensionHeaderClass;
function WebSocketExtensionHeader() {
  if (WebSocketExtensionHeaderClass === VOID) {
    class $ {
      constructor(name, parameters) {
        this.s4j_1 = name;
        this.t4j_1 = parameters;
      }
      toString() {
        return this.s4j_1 + ' ' + parametersToString(this);
      }
    }
    initMetadataForClass($, 'WebSocketExtensionHeader');
    WebSocketExtensionHeaderClass = $;
  }
  return WebSocketExtensionHeaderClass;
}
function parseWebSocketExtensions(value) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = split(value, [',']);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.x();
  while (_iterator__ex2g4s.y()) {
    var item = _iterator__ex2g4s.z();
    var extension = split(item, [';']);
    // Inline function 'kotlin.text.trim' call
    var this_1 = first(extension);
    var name = toString(trim(isCharSequence(this_1) ? this_1 : THROW_CCE()));
    // Inline function 'kotlin.collections.map' call
    var this_2 = drop(extension, 1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList().w(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s_0 = this_2.x();
    while (_iterator__ex2g4s_0.y()) {
      var item_0 = _iterator__ex2g4s_0.z();
      // Inline function 'kotlin.text.trim' call
      var tmp$ret$2 = toString(trim(isCharSequence(item_0) ? item_0 : THROW_CCE()));
      destination_0.i(tmp$ret$2);
    }
    var parameters = destination_0;
    var tmp$ret$5 = new (WebSocketExtensionHeader())(name, parameters);
    destination.i(tmp$ret$5);
  }
  return destination;
}
//region block: exports
export {
  parseWebSocketExtensions as parseWebSocketExtensionszyo25w86ylog,
};
//endregion

//# sourceMappingURL=WebSocketExtensionHeader.mjs.map
