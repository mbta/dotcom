import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { getStringHashCode26igk1bx568vk as getStringHashCode } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ENUMClass;
function ENUM() {
  if (ENUMClass === VOID) {
    class $ extends SerialKind() {
      constructor() {
        ENUM_instance = null;
        super();
        ENUM_instance = this;
      }
    }
    initMetadataForObject($, 'ENUM');
    ENUMClass = $;
  }
  return ENUMClass;
}
var ENUM_instance;
function ENUM_getInstance() {
  if (ENUM_instance === VOID)
    new (ENUM())();
  return ENUM_instance;
}
var CONTEXTUALClass;
function CONTEXTUAL() {
  if (CONTEXTUALClass === VOID) {
    class $ extends SerialKind() {
      constructor() {
        CONTEXTUAL_instance = null;
        super();
        CONTEXTUAL_instance = this;
      }
    }
    initMetadataForObject($, 'CONTEXTUAL');
    CONTEXTUALClass = $;
  }
  return CONTEXTUALClass;
}
var CONTEXTUAL_instance;
function CONTEXTUAL_getInstance() {
  if (CONTEXTUAL_instance === VOID)
    new (CONTEXTUAL())();
  return CONTEXTUAL_instance;
}
var SerialKindClass;
function SerialKind() {
  if (SerialKindClass === VOID) {
    class $ {
      toString() {
        return ensureNotNull(getKClassFromExpression(this).gh());
      }
      hashCode() {
        return getStringHashCode(this.toString());
      }
    }
    initMetadataForClass($, 'SerialKind');
    SerialKindClass = $;
  }
  return SerialKindClass;
}
var SEALEDClass;
function SEALED() {
  if (SEALEDClass === VOID) {
    class $ extends PolymorphicKind() {
      constructor() {
        SEALED_instance = null;
        super();
        SEALED_instance = this;
      }
    }
    initMetadataForObject($, 'SEALED');
    SEALEDClass = $;
  }
  return SEALEDClass;
}
var SEALED_instance;
function SEALED_getInstance() {
  if (SEALED_instance === VOID)
    new (SEALED())();
  return SEALED_instance;
}
var OPENClass;
function OPEN() {
  if (OPENClass === VOID) {
    class $ extends PolymorphicKind() {
      constructor() {
        OPEN_instance = null;
        super();
        OPEN_instance = this;
      }
    }
    initMetadataForObject($, 'OPEN');
    OPENClass = $;
  }
  return OPENClass;
}
var OPEN_instance;
function OPEN_getInstance() {
  if (OPEN_instance === VOID)
    new (OPEN())();
  return OPEN_instance;
}
var PolymorphicKindClass;
function PolymorphicKind() {
  if (PolymorphicKindClass === VOID) {
    class $ extends SerialKind() {}
    initMetadataForClass($, 'PolymorphicKind');
    PolymorphicKindClass = $;
  }
  return PolymorphicKindClass;
}
var BOOLEANClass;
function BOOLEAN() {
  if (BOOLEANClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        BOOLEAN_instance = null;
        super();
        BOOLEAN_instance = this;
      }
    }
    initMetadataForObject($, 'BOOLEAN');
    BOOLEANClass = $;
  }
  return BOOLEANClass;
}
var BOOLEAN_instance;
function BOOLEAN_getInstance() {
  if (BOOLEAN_instance === VOID)
    new (BOOLEAN())();
  return BOOLEAN_instance;
}
var BYTEClass;
function BYTE() {
  if (BYTEClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        BYTE_instance = null;
        super();
        BYTE_instance = this;
      }
    }
    initMetadataForObject($, 'BYTE');
    BYTEClass = $;
  }
  return BYTEClass;
}
var BYTE_instance;
function BYTE_getInstance() {
  if (BYTE_instance === VOID)
    new (BYTE())();
  return BYTE_instance;
}
var CHARClass;
function CHAR() {
  if (CHARClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        CHAR_instance = null;
        super();
        CHAR_instance = this;
      }
    }
    initMetadataForObject($, 'CHAR');
    CHARClass = $;
  }
  return CHARClass;
}
var CHAR_instance;
function CHAR_getInstance() {
  if (CHAR_instance === VOID)
    new (CHAR())();
  return CHAR_instance;
}
var SHORTClass;
function SHORT() {
  if (SHORTClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        SHORT_instance = null;
        super();
        SHORT_instance = this;
      }
    }
    initMetadataForObject($, 'SHORT');
    SHORTClass = $;
  }
  return SHORTClass;
}
var SHORT_instance;
function SHORT_getInstance() {
  if (SHORT_instance === VOID)
    new (SHORT())();
  return SHORT_instance;
}
var INTClass;
function INT() {
  if (INTClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        INT_instance = null;
        super();
        INT_instance = this;
      }
    }
    initMetadataForObject($, 'INT');
    INTClass = $;
  }
  return INTClass;
}
var INT_instance;
function INT_getInstance() {
  if (INT_instance === VOID)
    new (INT())();
  return INT_instance;
}
var LONGClass;
function LONG() {
  if (LONGClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        LONG_instance = null;
        super();
        LONG_instance = this;
      }
    }
    initMetadataForObject($, 'LONG');
    LONGClass = $;
  }
  return LONGClass;
}
var LONG_instance;
function LONG_getInstance() {
  if (LONG_instance === VOID)
    new (LONG())();
  return LONG_instance;
}
var FLOATClass;
function FLOAT() {
  if (FLOATClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        FLOAT_instance = null;
        super();
        FLOAT_instance = this;
      }
    }
    initMetadataForObject($, 'FLOAT');
    FLOATClass = $;
  }
  return FLOATClass;
}
var FLOAT_instance;
function FLOAT_getInstance() {
  if (FLOAT_instance === VOID)
    new (FLOAT())();
  return FLOAT_instance;
}
var DOUBLEClass;
function DOUBLE() {
  if (DOUBLEClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        DOUBLE_instance = null;
        super();
        DOUBLE_instance = this;
      }
    }
    initMetadataForObject($, 'DOUBLE');
    DOUBLEClass = $;
  }
  return DOUBLEClass;
}
var DOUBLE_instance;
function DOUBLE_getInstance() {
  if (DOUBLE_instance === VOID)
    new (DOUBLE())();
  return DOUBLE_instance;
}
var STRINGClass;
function STRING() {
  if (STRINGClass === VOID) {
    class $ extends PrimitiveKind() {
      constructor() {
        STRING_instance = null;
        super();
        STRING_instance = this;
      }
    }
    initMetadataForObject($, 'STRING');
    STRINGClass = $;
  }
  return STRINGClass;
}
var STRING_instance;
function STRING_getInstance() {
  if (STRING_instance === VOID)
    new (STRING())();
  return STRING_instance;
}
var PrimitiveKindClass;
function PrimitiveKind() {
  if (PrimitiveKindClass === VOID) {
    class $ extends SerialKind() {}
    initMetadataForClass($, 'PrimitiveKind');
    PrimitiveKindClass = $;
  }
  return PrimitiveKindClass;
}
var CLASSClass;
function CLASS() {
  if (CLASSClass === VOID) {
    class $ extends StructureKind() {
      constructor() {
        CLASS_instance = null;
        super();
        CLASS_instance = this;
      }
    }
    initMetadataForObject($, 'CLASS');
    CLASSClass = $;
  }
  return CLASSClass;
}
var CLASS_instance;
function CLASS_getInstance() {
  if (CLASS_instance === VOID)
    new (CLASS())();
  return CLASS_instance;
}
var LISTClass;
function LIST() {
  if (LISTClass === VOID) {
    class $ extends StructureKind() {
      constructor() {
        LIST_instance = null;
        super();
        LIST_instance = this;
      }
    }
    initMetadataForObject($, 'LIST');
    LISTClass = $;
  }
  return LISTClass;
}
var LIST_instance;
function LIST_getInstance() {
  if (LIST_instance === VOID)
    new (LIST())();
  return LIST_instance;
}
var MAPClass;
function MAP() {
  if (MAPClass === VOID) {
    class $ extends StructureKind() {
      constructor() {
        MAP_instance = null;
        super();
        MAP_instance = this;
      }
    }
    initMetadataForObject($, 'MAP');
    MAPClass = $;
  }
  return MAPClass;
}
var MAP_instance;
function MAP_getInstance() {
  if (MAP_instance === VOID)
    new (MAP())();
  return MAP_instance;
}
var OBJECTClass;
function OBJECT() {
  if (OBJECTClass === VOID) {
    class $ extends StructureKind() {
      constructor() {
        OBJECT_instance = null;
        super();
        OBJECT_instance = this;
      }
    }
    initMetadataForObject($, 'OBJECT');
    OBJECTClass = $;
  }
  return OBJECTClass;
}
var OBJECT_instance;
function OBJECT_getInstance() {
  if (OBJECT_instance === VOID)
    new (OBJECT())();
  return OBJECT_instance;
}
var StructureKindClass;
function StructureKind() {
  if (StructureKindClass === VOID) {
    class $ extends SerialKind() {}
    initMetadataForClass($, 'StructureKind');
    StructureKindClass = $;
  }
  return StructureKindClass;
}
//region block: exports
export {
  OPEN_getInstance as OPEN_getInstance3ec6az8uwus55,
  SEALED_getInstance as SEALED_getInstance3nsev85ow9059,
  BOOLEAN_getInstance as BOOLEAN_getInstance1igfnuwj02kve,
  BYTE_getInstance as BYTE_getInstance1ja41txt3fdgs,
  CHAR_getInstance as CHAR_getInstance2sj4kixvo1pgt,
  DOUBLE_getInstance as DOUBLE_getInstance2zlgz0a16y0yw,
  FLOAT_getInstance as FLOAT_getInstance356af47ujn76v,
  INT_getInstance as INT_getInstancev41irj55hx3n,
  LONG_getInstance as LONG_getInstance3408a5feo2kfb,
  SHORT_getInstance as SHORT_getInstancemixmsyjhae7k,
  STRING_getInstance as STRING_getInstance2ou4lro9xn2qn,
  CONTEXTUAL_getInstance as CONTEXTUAL_getInstance1845118lbzky0,
  ENUM_getInstance as ENUM_getInstance22lfbrqor0c0a,
  CLASS_getInstance as CLASS_getInstance14ex35co4jkrb,
  LIST_getInstance as LIST_getInstancey7k5h8d5cvxt,
  MAP_getInstance as MAP_getInstance3s1t6byguxmp9,
  OBJECT_getInstance as OBJECT_getInstance26229tfe4t547,
  PolymorphicKind as PolymorphicKindla9gurooefwb,
  PrimitiveKind as PrimitiveKindndgbuh6is7ze,
  ENUM as ENUMlmq49cvwy4ow,
};
//endregion

//# sourceMappingURL=SerialKinds.mjs.map
