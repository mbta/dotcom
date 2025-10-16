import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../exceptions.mjs';
import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import { KtMap140uvy3s5zad8 as KtMap } from './Collections.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getOrImplicitDefault(_this__u8e3s4, key) {
  if (isInterface(_this__u8e3s4, MapWithDefault()))
    return _this__u8e3s4.go(key);
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.getOrElseNullable' call
    var value = _this__u8e3s4.j3(key);
    if (value == null && !_this__u8e3s4.h3(key)) {
      throw NoSuchElementException().m('Key ' + toString(key) + ' is missing in the map.');
    } else {
      tmp$ret$0 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
      break $l$block;
    }
  }
  return tmp$ret$0;
}
var MapWithDefaultClass;
function MapWithDefault() {
  if (MapWithDefaultClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'MapWithDefault', VOID, VOID, [KtMap()]);
    MapWithDefaultClass = $;
  }
  return MapWithDefaultClass;
}
//region block: exports
export {
  getOrImplicitDefault as getOrImplicitDefault24g3b5txuslgw,
};
//endregion

//# sourceMappingURL=MapWithDefault.mjs.map
