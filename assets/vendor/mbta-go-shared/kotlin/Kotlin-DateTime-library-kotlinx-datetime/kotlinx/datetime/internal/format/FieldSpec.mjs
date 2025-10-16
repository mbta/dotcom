import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var GenericFieldSpecClass;
function GenericFieldSpec() {
  if (GenericFieldSpecClass === VOID) {
    class $ extends AbstractFieldSpec() {
      constructor(accessor, name, defaultValue, sign) {
        name = name === VOID ? accessor.y3() : name;
        defaultValue = defaultValue === VOID ? null : defaultValue;
        sign = sign === VOID ? null : sign;
        super();
        this.u8b_1 = accessor;
        this.v8b_1 = name;
        this.w8b_1 = defaultValue;
        this.x8b_1 = sign;
      }
      t8b() {
        return this.u8b_1;
      }
      y3() {
        return this.v8b_1;
      }
      y8b() {
        return this.w8b_1;
      }
      z8b() {
        return this.x8b_1;
      }
    }
    initMetadataForClass($, 'GenericFieldSpec');
    GenericFieldSpecClass = $;
  }
  return GenericFieldSpecClass;
}
var PropertyAccessorClass;
function PropertyAccessor() {
  if (PropertyAccessorClass === VOID) {
    class $ {
      constructor(property, name) {
        name = name === VOID ? property.callableName : name;
        this.a8c_1 = property;
        this.b8c_1 = name;
      }
      y3() {
        return this.b8c_1;
      }
      c8c(container, newValue) {
        var oldValue = this.a8c_1.get(container);
        var tmp;
        if (oldValue === null) {
          this.a8c_1.set(container, newValue);
          tmp = null;
        } else if (equals(oldValue, newValue)) {
          tmp = null;
        } else {
          tmp = oldValue;
        }
        return tmp;
      }
      d8c(container, newValue) {
        var tmp = (container == null ? true : !(container == null)) ? container : THROW_CCE();
        return this.c8c(tmp, (newValue == null ? true : !(newValue == null)) ? newValue : THROW_CCE());
      }
      e8c(container) {
        return this.a8c_1.get(container);
      }
    }
    protoOf($).l8b = getterNotNull;
    initMetadataForClass($, 'PropertyAccessor', VOID, VOID, [Accessor()]);
    PropertyAccessorClass = $;
  }
  return PropertyAccessorClass;
}
var UnsignedFieldSpecClass;
function UnsignedFieldSpec() {
  if (UnsignedFieldSpecClass === VOID) {
    class $ extends AbstractFieldSpec() {
      constructor(accessor, minValue, maxValue, name, defaultValue, sign) {
        name = name === VOID ? accessor.y3() : name;
        defaultValue = defaultValue === VOID ? null : defaultValue;
        sign = sign === VOID ? null : sign;
        super();
        this.m8b_1 = accessor;
        this.n8b_1 = minValue;
        this.o8b_1 = maxValue;
        this.p8b_1 = name;
        this.q8b_1 = defaultValue;
        this.r8b_1 = sign;
        var tmp = this;
        var tmp_0;
        if (this.o8b_1 < 10) {
          tmp_0 = 1;
        } else if (this.o8b_1 < 100) {
          tmp_0 = 2;
        } else if (this.o8b_1 < 1000) {
          tmp_0 = 3;
        } else {
          throw IllegalArgumentException().q('Max value ' + this.o8b_1 + ' is too large');
        }
        tmp.s8b_1 = tmp_0;
      }
      t8b() {
        return this.m8b_1;
      }
      y3() {
        return this.p8b_1;
      }
      y8b() {
        return this.q8b_1;
      }
      z8b() {
        return this.r8b_1;
      }
    }
    initMetadataForClass($, 'UnsignedFieldSpec');
    UnsignedFieldSpecClass = $;
  }
  return UnsignedFieldSpecClass;
}
function getterNotNull(container) {
  var tmp0_elvis_lhs = this.e8c(container);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException().o5('Field ' + this.y3() + ' is not set');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
var AccessorClass;
function Accessor() {
  if (AccessorClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'Accessor');
    AccessorClass = $;
  }
  return AccessorClass;
}
var AbstractFieldSpecClass;
function AbstractFieldSpec() {
  if (AbstractFieldSpecClass === VOID) {
    class $ {
      toString() {
        return 'The field ' + this.y3() + ' (default value is ' + toString(this.y8b()) + ')';
      }
    }
    initMetadataForClass($, 'AbstractFieldSpec');
    AbstractFieldSpecClass = $;
  }
  return AbstractFieldSpecClass;
}
//region block: exports
export {
  GenericFieldSpec as GenericFieldSpecnllvuuqbuxsd,
  PropertyAccessor as PropertyAccessor1m9zk65ebkfc4,
  UnsignedFieldSpec as UnsignedFieldSpec1pqzij1hidkca,
};
//endregion

//# sourceMappingURL=FieldSpec.mjs.map
