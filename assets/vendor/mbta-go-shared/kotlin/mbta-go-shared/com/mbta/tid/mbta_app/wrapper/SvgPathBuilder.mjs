import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_wrapper_SvgPathBuilder$stable;
function append($this, char) {
  $this.fby_1.ic(char);
}
function append_0($this, point) {
  $this.fby_1.gj(point.ba8_1);
  $this.fby_1.ic(_Char___init__impl__6a9atx(44));
  $this.fby_1.gj(point.ca8_1);
}
var SvgPathBuilderClass;
function SvgPathBuilder() {
  if (SvgPathBuilderClass === VOID) {
    class $ {
      constructor() {
        this.fby_1 = StringBuilder().f();
      }
      gby(point) {
        append(this, _Char___init__impl__6a9atx(77));
        append_0(this, point);
      }
      hby(point) {
        append(this, _Char___init__impl__6a9atx(76));
        append_0(this, point);
      }
      iby(control, to) {
        append(this, _Char___init__impl__6a9atx(81));
        append_0(this, control);
        append(this, _Char___init__impl__6a9atx(32));
        append_0(this, to);
      }
      jby(control1, control2, to) {
        append(this, _Char___init__impl__6a9atx(67));
        append_0(this, control1);
        append(this, _Char___init__impl__6a9atx(32));
        append_0(this, control2);
        append(this, _Char___init__impl__6a9atx(32));
        append_0(this, to);
      }
      toString() {
        return this.fby_1.toString();
      }
    }
    initMetadataForClass($, 'SvgPathBuilder', SvgPathBuilder);
    SvgPathBuilderClass = $;
  }
  return SvgPathBuilderClass;
}
function buildSvg(block) {
  // Inline function 'kotlin.apply' call
  var this_0 = new (SvgPathBuilder())();
  block(this_0);
  return this_0.toString();
}
//region block: init
com_mbta_tid_mbta_app_wrapper_SvgPathBuilder$stable = 8;
//endregion
//region block: exports
export {
  buildSvg as buildSvg31elonv04vbdd,
};
//endregion

//# sourceMappingURL=SvgPathBuilder.mjs.map
