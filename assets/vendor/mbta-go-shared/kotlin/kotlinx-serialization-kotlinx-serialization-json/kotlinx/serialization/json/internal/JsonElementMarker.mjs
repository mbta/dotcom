import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ElementMarker33ojvsajwmzts as ElementMarker } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/ElementMarker.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readIfAbsent($this, descriptor, index) {
  $this.f1q_1 = (!descriptor.f12(index) && descriptor.e12(index).t11());
  return $this.f1q_1;
}
function JsonElementMarker$readIfAbsent$ref(p0) {
  var l = function (_this__u8e3s4, p0_0) {
    var tmp0 = p0;
    return readIfAbsent(tmp0, _this__u8e3s4, p0_0);
  };
  l.callableName = 'readIfAbsent';
  return l;
}
var JsonElementMarkerClass;
function JsonElementMarker() {
  if (JsonElementMarkerClass === VOID) {
    class $ {
      constructor(descriptor) {
        var tmp = this;
        tmp.e1q_1 = new (ElementMarker())(descriptor, JsonElementMarker$readIfAbsent$ref(this));
        this.f1q_1 = false;
      }
      g1q(index) {
        this.e1q_1.e1a(index);
      }
      h1q() {
        return this.e1q_1.f1a();
      }
    }
    initMetadataForClass($, 'JsonElementMarker');
    JsonElementMarkerClass = $;
  }
  return JsonElementMarkerClass;
}
//region block: exports
export {
  JsonElementMarker as JsonElementMarker395jk2pil4789,
};
//endregion

//# sourceMappingURL=JsonElementMarker.mjs.map
