import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { AttributesJsFn25rjfgcprgprf as AttributesJsFn } from '../../../../ktor-ktor-utils/io/ktor/util/AttributesJs.mjs';
import { get_PLUGIN_INSTALLED_LIST1ftwjhwye1pz5 as get_PLUGIN_INSTALLED_LIST } from './plugins/HttpClientPlugin.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { PlatformUtils_getInstance350nj2wi6ds9r as PlatformUtils_getInstance } from '../../../../ktor-ktor-utils/io/ktor/util/PlatformUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function HttpClientConfig$engineConfig$lambda(_this__u8e3s4) {
  return Unit_instance;
}
function HttpClientConfig$install$lambda(_this__u8e3s4) {
  return Unit_instance;
}
function HttpClientConfig$install$lambda_0($previousConfigBlock, $configure) {
  return function (_this__u8e3s4) {
    var tmp0_safe_receiver = $previousConfigBlock;
    if (tmp0_safe_receiver == null)
      null;
    else
      tmp0_safe_receiver(_this__u8e3s4);
    $configure(!(_this__u8e3s4 == null) ? _this__u8e3s4 : THROW_CCE());
    return Unit_instance;
  };
}
function HttpClientConfig$install$lambda$lambda() {
  return AttributesJsFn(true);
}
function HttpClientConfig$install$lambda_1($plugin) {
  return function (scope) {
    var tmp = get_PLUGIN_INSTALLED_LIST();
    var attributes = scope.j4o_1.k3h(tmp, HttpClientConfig$install$lambda$lambda);
    var config = ensureNotNull(scope.m4o_1.v4q_1.j3($plugin.u1()));
    var pluginData = $plugin.m4r(config);
    $plugin.n4r(pluginData, scope);
    attributes.i3h($plugin.u1(), pluginData);
    return Unit_instance;
  };
}
var HttpClientConfigClass;
function HttpClientConfig() {
  if (HttpClientConfigClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp.u4q_1 = LinkedHashMap().sc();
        var tmp_0 = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_0.v4q_1 = LinkedHashMap().sc();
        var tmp_1 = this;
        // Inline function 'kotlin.collections.mutableMapOf' call
        tmp_1.w4q_1 = LinkedHashMap().sc();
        var tmp_2 = this;
        tmp_2.x4q_1 = HttpClientConfig$engineConfig$lambda;
        this.y4q_1 = true;
        this.z4q_1 = true;
        this.a4r_1 = false;
        this.b4r_1 = PlatformUtils_getInstance().v3i_1;
      }
      o4r(plugin, configure) {
        var previousConfigBlock = this.v4q_1.j3(plugin.u1());
        var tmp0 = this.v4q_1;
        var tmp2 = plugin.u1();
        // Inline function 'kotlin.collections.set' call
        var value = HttpClientConfig$install$lambda_0(previousConfigBlock, configure);
        tmp0.t3(tmp2, value);
        if (this.u4q_1.h3(plugin.u1()))
          return Unit_instance;
        var tmp0_0 = this.u4q_1;
        var tmp2_0 = plugin.u1();
        // Inline function 'kotlin.collections.set' call
        var value_0 = HttpClientConfig$install$lambda_1(plugin);
        tmp0_0.t3(tmp2_0, value_0);
      }
      c4r(plugin, configure, $super) {
        var tmp;
        if (configure === VOID) {
          tmp = HttpClientConfig$install$lambda;
        } else {
          tmp = configure;
        }
        configure = tmp;
        var tmp_0;
        if ($super === VOID) {
          this.o4r(plugin, configure);
          tmp_0 = Unit_instance;
        } else {
          tmp_0 = $super.o4r.call(this, plugin, configure);
        }
        return tmp_0;
      }
      d4r(key, block) {
        // Inline function 'kotlin.collections.set' call
        this.w4q_1.t3(key, block);
      }
      o4q(client) {
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s = this.u4q_1.l3().x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          // Inline function 'kotlin.apply' call
          element(client);
        }
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_0 = this.w4q_1.l3().x();
        while (_iterator__ex2g4s_0.y()) {
          var element_0 = _iterator__ex2g4s_0.z();
          // Inline function 'kotlin.apply' call
          element_0(client);
        }
      }
      e4r(other) {
        this.y4q_1 = other.y4q_1;
        this.z4q_1 = other.z4q_1;
        this.a4r_1 = other.a4r_1;
        var tmp0 = this.u4q_1;
        // Inline function 'kotlin.collections.plusAssign' call
        var map = other.u4q_1;
        tmp0.v3(map);
        var tmp0_0 = this.v4q_1;
        // Inline function 'kotlin.collections.plusAssign' call
        var map_0 = other.v4q_1;
        tmp0_0.v3(map_0);
        var tmp0_1 = this.w4q_1;
        // Inline function 'kotlin.collections.plusAssign' call
        var map_1 = other.w4q_1;
        tmp0_1.v3(map_1);
      }
    }
    initMetadataForClass($, 'HttpClientConfig', HttpClientConfig);
    HttpClientConfigClass = $;
  }
  return HttpClientConfigClass;
}
//region block: exports
export {
  HttpClientConfig as HttpClientConfigo6p492ed655g,
};
//endregion

//# sourceMappingURL=HttpClientConfig.mjs.map
