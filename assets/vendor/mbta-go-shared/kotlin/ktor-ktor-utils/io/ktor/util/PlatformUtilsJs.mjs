//region block: pre-declaration
//endregion
function hasNodeApi() {
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null || (typeof window !== 'undefined' && typeof window.process !== 'undefined' && window.process.versions != null && window.process.versions.node != null);
}
function get_isDevelopmentMode(_this__u8e3s4) {
  return false;
}
//region block: exports
export {
  hasNodeApi as hasNodeApi2i7ndxaw6qx5r,
  get_isDevelopmentMode as get_isDevelopmentMode9gzo38yad2no,
};
//endregion

//# sourceMappingURL=PlatformUtilsJs.mjs.map
