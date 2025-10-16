import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  StringValuesjqid5a6cuday as StringValues,
  forEachghjt92rkrpzo as forEach,
  StringValuesBuilderImpl3ey9etj3bwnqf as StringValuesBuilderImpl,
  StringValuesImpl2l95y9du7b61t as StringValuesImpl,
} from '../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.j3y_1 = EmptyParameters_instance;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var ParametersClass;
function Parameters() {
  if (ParametersClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Parameters', VOID, VOID, [StringValues()]);
    ParametersClass = $;
  }
  return ParametersClass;
}
var EmptyParametersClass;
function EmptyParameters() {
  if (EmptyParametersClass === VOID) {
    class $ {
      x3i() {
        return true;
      }
      y3i(name) {
        return null;
      }
      z3i() {
        return emptySet();
      }
      a3j() {
        return emptySet();
      }
      h1() {
        return true;
      }
      toString() {
        return 'Parameters ' + toString(this.a3j());
      }
      equals(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Parameters()) : false) {
          tmp = other.h1();
        } else {
          tmp = false;
        }
        return tmp;
      }
    }
    protoOf($).b3j = forEach;
    initMetadataForObject($, 'EmptyParameters', VOID, VOID, [Parameters()]);
    EmptyParametersClass = $;
  }
  return EmptyParametersClass;
}
var EmptyParameters_instance;
function EmptyParameters_getInstance() {
  return EmptyParameters_instance;
}
function ParametersBuilder(size) {
  size = size === VOID ? 8 : size;
  return new (ParametersBuilderImpl())(size);
}
var ParametersBuilderImplClass;
function ParametersBuilderImpl() {
  if (ParametersBuilderImplClass === VOID) {
    class $ extends StringValuesBuilderImpl() {
      constructor(size) {
        size = size === VOID ? 8 : size;
        super(true, size);
      }
      r3q() {
        return new (ParametersImpl())(this.d3j_1);
      }
    }
    initMetadataForClass($, 'ParametersBuilderImpl', ParametersBuilderImpl);
    ParametersBuilderImplClass = $;
  }
  return ParametersBuilderImplClass;
}
var ParametersImplClass;
function ParametersImpl() {
  if (ParametersImplClass === VOID) {
    class $ extends StringValuesImpl() {
      constructor(values) {
        values = values === VOID ? emptyMap() : values;
        super(true, values);
      }
      toString() {
        return 'Parameters ' + toString(this.a3j());
      }
    }
    initMetadataForClass($, 'ParametersImpl', ParametersImpl, VOID, [Parameters(), StringValuesImpl()]);
    ParametersImplClass = $;
  }
  return ParametersImplClass;
}
//region block: init
EmptyParameters_instance = new (EmptyParameters())();
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance30d3mgq58m8dc,
  ParametersBuilder as ParametersBuilder1ry9ntvvg567r,
};
//endregion

//# sourceMappingURL=Parameters.mjs.map
