import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../mp/PlatformTools.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_classNames() {
  _init_properties_KClassExt_kt__5ro5b2();
  return classNames;
}
var classNames;
function getFullName(_this__u8e3s4) {
  _init_properties_KClassExt_kt__5ro5b2();
  var tmp0_elvis_lhs = get_classNames().j3(_this__u8e3s4);
  return tmp0_elvis_lhs == null ? saveCache(_this__u8e3s4) : tmp0_elvis_lhs;
}
function saveCache(_this__u8e3s4) {
  _init_properties_KClassExt_kt__5ro5b2();
  var name = KoinPlatformTools_instance.p7z(_this__u8e3s4);
  // Inline function 'kotlin.collections.set' call
  get_classNames().t3(_this__u8e3s4, name);
  return name;
}
var properties_initialized_KClassExt_kt_dizwhw;
function _init_properties_KClassExt_kt__5ro5b2() {
  if (!properties_initialized_KClassExt_kt_dizwhw) {
    properties_initialized_KClassExt_kt_dizwhw = true;
    classNames = KoinPlatformTools_instance.z7y();
  }
}
//region block: exports
export {
  getFullName as getFullName1t9gk3djdkvl5,
};
//endregion

//# sourceMappingURL=KClassExt.mjs.map
