import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var Axis_Longitude_instance;
var Axis_Latitude_instance;
var Axis_entriesInitialized;
function Axis_initEntries() {
  if (Axis_entriesInitialized)
    return Unit_instance;
  Axis_entriesInitialized = true;
  Axis_Longitude_instance = new (Axis())('Longitude', 0);
  Axis_Latitude_instance = new (Axis())('Latitude', 1);
}
var AxisClass;
function Axis() {
  if (AxisClass === VOID) {
    class $ extends Enum() {
      z() {
        var tmp;
        switch (this.x3_1) {
          case 0:
            tmp = Axis_Latitude_getInstance();
            break;
          case 1:
            tmp = Axis_Longitude_getInstance();
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'Axis');
    AxisClass = $;
  }
  return AxisClass;
}
function get(_this__u8e3s4, axis) {
  var tmp;
  switch (axis.x3_1) {
    case 0:
      tmp = _this__u8e3s4.b1z();
      break;
    case 1:
      tmp = _this__u8e3s4.c1z();
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
function Axis_Longitude_getInstance() {
  Axis_initEntries();
  return Axis_Longitude_instance;
}
function Axis_Latitude_getInstance() {
  Axis_initEntries();
  return Axis_Latitude_instance;
}
//region block: exports
export {
  get as get90tqdh72cjio,
  Axis_Longitude_getInstance as Axis_Longitude_getInstance2otnv88zmsebw,
};
//endregion

//# sourceMappingURL=Axis.mjs.map
