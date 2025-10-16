import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../../../../ktor-ktor-utils/io/ktor/util/PlatformUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_origin(_this__u8e3s4) {
  return PlatformUtils_getInstance().p3i_1 ? locationOrigin() : 'http://localhost';
}
function locationOrigin() {
  return function () {
    var tmpLocation = null;
    if (typeof window !== 'undefined') {
      tmpLocation = window.location;
    } else if (typeof self !== 'undefined') {
      tmpLocation = self.location;
    }
    var origin = '';
    if (tmpLocation) {
      origin = tmpLocation.origin;
    }
    return origin && origin != 'null' ? origin : 'http://localhost';
  }();
}
//region block: exports
export {
  get_origin as get_origin1s47cvkxjaphr,
};
//endregion

//# sourceMappingURL=URLBuilderJs.mjs.map
