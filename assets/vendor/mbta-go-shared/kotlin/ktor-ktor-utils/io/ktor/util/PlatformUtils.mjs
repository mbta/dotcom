import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { get_platform3348u7kp42j9x as get_platform } from './PlatformUtils.js.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { get_isDevelopmentMode9gzo38yad2no as get_isDevelopmentMode } from './PlatformUtilsJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var JsPlatform_Browser_instance;
var JsPlatform_Node_instance;
var JsPlatform_entriesInitialized;
function JsPlatform_initEntries() {
  if (JsPlatform_entriesInitialized)
    return Unit_instance;
  JsPlatform_entriesInitialized = true;
  JsPlatform_Browser_instance = new (JsPlatform())('Browser', 0);
  JsPlatform_Node_instance = new (JsPlatform())('Node', 1);
}
var JvmClass;
function Jvm() {
  if (JvmClass === VOID) {
    class $ extends Platform() {
      constructor() {
        Jvm_instance = null;
        super();
        Jvm_instance = this;
      }
      toString() {
        return 'Jvm';
      }
      hashCode() {
        return 1051825272;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Jvm()))
          return false;
        other instanceof Jvm() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Jvm');
    JvmClass = $;
  }
  return JvmClass;
}
var Jvm_instance;
function Jvm_getInstance() {
  if (Jvm_instance === VOID)
    new (Jvm())();
  return Jvm_instance;
}
var NativeClass;
function Native() {
  if (NativeClass === VOID) {
    class $ extends Platform() {
      constructor() {
        Native_instance = null;
        super();
        Native_instance = this;
      }
      toString() {
        return 'Native';
      }
      hashCode() {
        return -1059277600;
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Native()))
          return false;
        other instanceof Native() || THROW_CCE();
        return true;
      }
    }
    initMetadataForObject($, 'Native');
    NativeClass = $;
  }
  return NativeClass;
}
var Native_instance;
function Native_getInstance() {
  if (Native_instance === VOID)
    new (Native())();
  return Native_instance;
}
var JsClass;
function Js() {
  if (JsClass === VOID) {
    class $ extends Platform() {
      constructor(jsPlatform) {
        super();
        this.n3i_1 = jsPlatform;
      }
      toString() {
        return 'Js(jsPlatform=' + this.n3i_1.toString() + ')';
      }
      hashCode() {
        return this.n3i_1.hashCode();
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof Js()))
          return false;
        var tmp0_other_with_cast = other instanceof Js() ? other : THROW_CCE();
        if (!this.n3i_1.equals(tmp0_other_with_cast.n3i_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'Js');
    JsClass = $;
  }
  return JsClass;
}
var WasmJsClass;
function WasmJs() {
  if (WasmJsClass === VOID) {
    class $ extends Platform() {}
    initMetadataForClass($, 'WasmJs');
    WasmJsClass = $;
  }
  return WasmJsClass;
}
var JsPlatformClass;
function JsPlatform() {
  if (JsPlatformClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'JsPlatform');
    JsPlatformClass = $;
  }
  return JsPlatformClass;
}
function JsPlatform_Browser_getInstance() {
  JsPlatform_initEntries();
  return JsPlatform_Browser_instance;
}
function JsPlatform_Node_getInstance() {
  JsPlatform_initEntries();
  return JsPlatform_Node_instance;
}
var PlatformClass;
function Platform() {
  if (PlatformClass === VOID) {
    class $ {}
    initMetadataForClass($, 'Platform');
    PlatformClass = $;
  }
  return PlatformClass;
}
var PlatformUtilsClass;
function PlatformUtils() {
  if (PlatformUtilsClass === VOID) {
    class $ {
      constructor() {
        PlatformUtils_instance = this;
        var tmp = this;
        var platform = get_platform(this);
        var tmp_0;
        if (platform instanceof Js()) {
          tmp_0 = platform.n3i_1.equals(JsPlatform_Browser_getInstance());
        } else {
          if (platform instanceof WasmJs()) {
            tmp_0 = platform.o3i_1.equals(JsPlatform_Browser_getInstance());
          } else {
            tmp_0 = false;
          }
        }
        tmp.p3i_1 = tmp_0;
        var tmp_1 = this;
        var platform_0 = get_platform(this);
        var tmp_2;
        if (platform_0 instanceof Js()) {
          tmp_2 = platform_0.n3i_1.equals(JsPlatform_Node_getInstance());
        } else {
          if (platform_0 instanceof WasmJs()) {
            tmp_2 = platform_0.o3i_1.equals(JsPlatform_Node_getInstance());
          } else {
            tmp_2 = false;
          }
        }
        tmp_1.q3i_1 = tmp_2;
        var tmp_3 = this;
        var tmp_4 = get_platform(this);
        tmp_3.r3i_1 = tmp_4 instanceof Js();
        var tmp_5 = this;
        var tmp_6 = get_platform(this);
        tmp_5.s3i_1 = tmp_6 instanceof WasmJs();
        this.t3i_1 = equals(get_platform(this), Jvm_getInstance());
        this.u3i_1 = equals(get_platform(this), Native_getInstance());
        this.v3i_1 = get_isDevelopmentMode(this);
        this.w3i_1 = true;
      }
    }
    initMetadataForObject($, 'PlatformUtils');
    PlatformUtilsClass = $;
  }
  return PlatformUtilsClass;
}
var PlatformUtils_instance;
function PlatformUtils_getInstance() {
  if (PlatformUtils_instance === VOID)
    new (PlatformUtils())();
  return PlatformUtils_instance;
}
//region block: exports
export {
  JsPlatform_Browser_getInstance as JsPlatform_Browser_getInstance2nd7ke7mehe06,
  JsPlatform_Node_getInstance as JsPlatform_Node_getInstancev5elztn0aej8,
  PlatformUtils_getInstance as PlatformUtils_getInstance350nj2wi6ds9r,
  Js as Js3mqqtifz3qrzp,
};
//endregion

//# sourceMappingURL=PlatformUtils.mjs.map
