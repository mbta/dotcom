import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  JsPlatform_Browser_getInstance2nd7ke7mehe06 as JsPlatform_Browser_getInstance,
  JsPlatform_Node_getInstancev5elztn0aej8 as JsPlatform_Node_getInstance,
  Js3mqqtifz3qrzp as Js,
} from './PlatformUtils.mjs';
import { hasNodeApi2i7ndxaw6qx5r as hasNodeApi } from './PlatformUtilsJs.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_platform(_this__u8e3s4) {
  _init_properties_PlatformUtils_js_kt__7rxm8p();
  var tmp0 = platform$delegate;
  var tmp = KProperty1();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('platform', 1, tmp, _get_platform_$ref_41w7mv(), null);
  return tmp0.v1();
}
var platform$delegate;
function platform$delegate$lambda() {
  _init_properties_PlatformUtils_js_kt__7rxm8p();
  return new (Js())(hasNodeApi() ? JsPlatform_Node_getInstance() : JsPlatform_Browser_getInstance());
}
function _get_platform_$ref_41w7mv() {
  return function (p0) {
    return get_platform(p0);
  };
}
var properties_initialized_PlatformUtils_js_kt_8g036j;
function _init_properties_PlatformUtils_js_kt__7rxm8p() {
  if (!properties_initialized_PlatformUtils_js_kt_8g036j) {
    properties_initialized_PlatformUtils_js_kt_8g036j = true;
    platform$delegate = lazy(platform$delegate$lambda);
  }
}
//region block: exports
export {
  get_platform as get_platform3348u7kp42j9x,
};
//endregion

//# sourceMappingURL=PlatformUtils.js.mjs.map
