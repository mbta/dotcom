import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  Attributes2dg90yv0ot9wx as Attributes,
  AttributeKey3aq8ytwgx54f7 as AttributeKey,
} from '../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { createKType1lgox3mzhchp5 as createKType } from '../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_PLUGIN_INSTALLED_LIST() {
  _init_properties_HttpClientPlugin_kt__cypu1m();
  return PLUGIN_INSTALLED_LIST;
}
var PLUGIN_INSTALLED_LIST;
function plugin(_this__u8e3s4, plugin) {
  _init_properties_HttpClientPlugin_kt__cypu1m();
  var tmp0_elvis_lhs = pluginOrNull(_this__u8e3s4, plugin);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException().o5('Plugin ' + toString(plugin) + ' is not installed. Consider using `install(' + plugin.u1().toString() + ')` in client config first.');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function pluginOrNull(_this__u8e3s4, plugin) {
  _init_properties_HttpClientPlugin_kt__cypu1m();
  var tmp0_safe_receiver = _this__u8e3s4.j4o_1.g3h(get_PLUGIN_INSTALLED_LIST());
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g3h(plugin.u1());
}
var properties_initialized_HttpClientPlugin_kt_p98320;
function _init_properties_HttpClientPlugin_kt__cypu1m() {
  if (!properties_initialized_HttpClientPlugin_kt_p98320) {
    properties_initialized_HttpClientPlugin_kt_p98320 = true;
    // Inline function 'io.ktor.util.AttributeKey' call
    var name = 'ApplicationPluginRegistry';
    // Inline function 'io.ktor.util.reflect.typeInfo' call
    var tmp = getKClass(Attributes());
    // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
    var tmp_0;
    try {
      tmp_0 = createKType(getKClass(Attributes()), arrayOf([]), false);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var _unused_var__etf5q3 = $p;
        tmp_1 = null;
      } else {
        throw $p;
      }
      tmp_0 = tmp_1;
    }
    var tmp$ret$0 = tmp_0;
    var tmp$ret$1 = new (TypeInfo())(tmp, tmp$ret$0);
    PLUGIN_INSTALLED_LIST = new (AttributeKey())(name, tmp$ret$1);
  }
}
//region block: exports
export {
  get_PLUGIN_INSTALLED_LIST as get_PLUGIN_INSTALLED_LIST1ftwjhwye1pz5,
  plugin as plugin3vxt624hnu3pv,
};
//endregion

//# sourceMappingURL=HttpClientPlugin.mjs.map
