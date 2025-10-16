import {
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
} from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  UtcOffset2q1jzx5thduw7 as UtcOffset,
  UtcOffset17lxgyhnn4rny as UtcOffset_0,
} from '../UtcOffset.mjs';
import { abs1kdzbjes1idip as abs } from '../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { UnsignedIntFieldFormatDirective20kfpdbszyixg as UnsignedIntFieldFormatDirective } from '../internal/format/FieldFormatDirective.mjs';
import {
  Padding_ZERO_getInstance2hdjif6phlc74 as Padding_ZERO_getInstance,
  Padding_SPACE_getInstance7fwkzb4da6c as Padding_SPACE_getInstance,
  AbstractDateTimeFormat1er9ki1vjeb1b as AbstractDateTimeFormat,
} from './DateTimeFormat.mjs';
import { AppendableFormatStructure38mt32f1b8qva as AppendableFormatStructure } from '../internal/format/Builder.mjs';
import {
  appendAlternativeParsingImpl1mug8j87kp2j3 as appendAlternativeParsingImpl,
  appendOptionalImplcg29ds00y54b as appendOptionalImpl,
  chars1g48a4lypizqb as chars,
  build284bs2tzkjm2x as build,
  offsetHours$default2ltn8vk6i6a0z as offsetHours$default,
  offsetMinutesOfHour$defaultx23z50nh5v5p as offsetMinutesOfHour$default,
  offsetSecondsOfMinute$defaultxai9ucsyqlc7 as offsetSecondsOfMinute$default,
  AbstractDateTimeFormatBuilder2kkelk07l4wb as AbstractDateTimeFormatBuilder,
  WithUtcOffset30ws1ntcash0j as WithUtcOffset,
  optional3j6ywsx1pxeh6 as optional,
  alternativeParsing1gmwubnsvpp9b as alternativeParsing,
  char1r4ssccmdfesy as char,
} from './DateTimeFormatBuilder.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  PropertyAccessor1m9zk65ebkfc4 as PropertyAccessor,
  UnsignedFieldSpec1pqzij1hidkca as UnsignedFieldSpec,
} from '../internal/format/FieldSpec.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  BasicFormatStructure1rp1tyv3u2fjw as BasicFormatStructure,
  SignedFormatStructure3e3cmtnnik1yf as SignedFormatStructure,
} from '../internal/format/FormatStructure.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_ISO_OFFSET() {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp0 = ISO_OFFSET$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_OFFSET', 0, tmp, _get_ISO_OFFSET_$ref_70d0nn(), null);
  return tmp0.v1();
}
var ISO_OFFSET$delegate;
var ISO_OFFSET_BASIC$delegate;
var FOUR_DIGIT_OFFSET$delegate;
function get_emptyIncompleteUtcOffset() {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  return emptyIncompleteUtcOffset;
}
var emptyIncompleteUtcOffset;
var UtcOffsetFieldContainerClass;
function UtcOffsetFieldContainer() {
  if (UtcOffsetFieldContainerClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'UtcOffsetFieldContainer');
    UtcOffsetFieldContainerClass = $;
  }
  return UtcOffsetFieldContainerClass;
}
var IncompleteUtcOffsetClass;
function IncompleteUtcOffset() {
  if (IncompleteUtcOffsetClass === VOID) {
    class $ {
      constructor(offsetIsNegative, offsetHours, offsetMinutesOfHour, offsetSecondsOfMinute) {
        offsetIsNegative = offsetIsNegative === VOID ? null : offsetIsNegative;
        offsetHours = offsetHours === VOID ? null : offsetHours;
        offsetMinutesOfHour = offsetMinutesOfHour === VOID ? null : offsetMinutesOfHour;
        offsetSecondsOfMinute = offsetSecondsOfMinute === VOID ? null : offsetSecondsOfMinute;
        this.z88_1 = offsetIsNegative;
        this.a89_1 = offsetHours;
        this.b89_1 = offsetMinutesOfHour;
        this.c89_1 = offsetSecondsOfMinute;
      }
      r88(_set____db54di) {
        this.z88_1 = _set____db54di;
      }
      s88() {
        return this.z88_1;
      }
      t88(_set____db54di) {
        this.a89_1 = _set____db54di;
      }
      u88() {
        return this.a89_1;
      }
      v88(_set____db54di) {
        this.b89_1 = _set____db54di;
      }
      w88() {
        return this.b89_1;
      }
      x88(_set____db54di) {
        this.c89_1 = _set____db54di;
      }
      y88() {
        return this.c89_1;
      }
      d89() {
        var sign = this.z88_1 === true ? -1 : 1;
        var tmp0_safe_receiver = this.a89_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = imul(tmp0_safe_receiver, sign);
        }
        var tmp_0 = tmp;
        var tmp1_safe_receiver = this.b89_1;
        var tmp_1;
        if (tmp1_safe_receiver == null) {
          tmp_1 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_1 = imul(tmp1_safe_receiver, sign);
        }
        var tmp_2 = tmp_1;
        var tmp2_safe_receiver = this.c89_1;
        var tmp_3;
        if (tmp2_safe_receiver == null) {
          tmp_3 = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp_3 = imul(tmp2_safe_receiver, sign);
        }
        return UtcOffset(tmp_0, tmp_2, tmp_3);
      }
      e89(offset) {
        this.z88_1 = offset.f89_1 < 0;
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = offset.f89_1;
        var totalSecondsAbs = abs(this_0);
        this.a89_1 = totalSecondsAbs / 3600 | 0;
        this.b89_1 = (totalSecondsAbs / 60 | 0) % 60 | 0;
        this.c89_1 = totalSecondsAbs % 60 | 0;
      }
      equals(other) {
        var tmp;
        var tmp_0;
        var tmp_1;
        var tmp_2;
        if (other instanceof IncompleteUtcOffset()) {
          tmp_2 = this.z88_1 == other.z88_1;
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_1 = this.a89_1 == other.a89_1;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = this.b89_1 == other.b89_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.c89_1 == other.c89_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.z88_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = this.a89_1;
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        var tmp_0 = tmp + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_1 = this.b89_1;
        var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
        var tmp_1 = tmp_0 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_2 = this.c89_1;
        var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
        return tmp_1 + (tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2) | 0;
      }
      t84() {
        return new (IncompleteUtcOffset())(this.z88_1, this.a89_1, this.b89_1, this.c89_1);
      }
      toString() {
        var tmp0_safe_receiver = this.z88_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = tmp0_safe_receiver ? '-' : '+';
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_0 = tmp1_elvis_lhs == null ? ' ' : tmp1_elvis_lhs;
        var tmp2_elvis_lhs = this.a89_1;
        var tmp_1 = toString(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
        var tmp3_elvis_lhs = this.b89_1;
        var tmp_2 = toString(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs);
        var tmp4_elvis_lhs = this.c89_1;
        return tmp_0 + tmp_1 + ':' + tmp_2 + ':' + toString(tmp4_elvis_lhs == null ? '??' : tmp4_elvis_lhs);
      }
    }
    initMetadataForClass($, 'IncompleteUtcOffset', IncompleteUtcOffset, VOID, [UtcOffsetFieldContainer()]);
    IncompleteUtcOffsetClass = $;
  }
  return IncompleteUtcOffsetClass;
}
var UtcOffsetWholeHoursDirectiveClass;
function UtcOffsetWholeHoursDirective() {
  if (UtcOffsetWholeHoursDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = OffsetFields_getInstance().h89_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.o89_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof UtcOffsetWholeHoursDirective()) {
          tmp = this.o89_1.equals(other.o89_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.o89_1.hashCode();
      }
    }
    initMetadataForClass($, 'UtcOffsetWholeHoursDirective');
    UtcOffsetWholeHoursDirectiveClass = $;
  }
  return UtcOffsetWholeHoursDirectiveClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      p89(block) {
        var builder = new (Builder())(new (AppendableFormatStructure())());
        block(builder);
        return new (UtcOffsetFormat())(builder.r3q());
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var BuilderClass;
function Builder() {
  if (BuilderClass === VOID) {
    class $ {
      constructor(actualBuilder) {
        this.q89_1 = actualBuilder;
      }
      t83() {
        return this.q89_1;
      }
      r89(structure) {
        this.q89_1.w83(structure);
      }
      u83() {
        return new (Builder())(new (AppendableFormatStructure())());
      }
    }
    protoOf($).s83 = appendAlternativeParsingImpl;
    protoOf($).r83 = appendOptionalImpl;
    protoOf($).z82 = chars;
    protoOf($).r3q = build;
    protoOf($).l83 = offsetHours;
    protoOf($).m83 = offsetHours$default;
    protoOf($).n83 = offsetMinutesOfHour;
    protoOf($).o83 = offsetMinutesOfHour$default;
    protoOf($).p83 = offsetSecondsOfMinute;
    protoOf($).q83 = offsetSecondsOfMinute$default;
    initMetadataForClass($, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder(), AbstractWithOffsetBuilder()]);
    BuilderClass = $;
  }
  return BuilderClass;
}
var UtcOffsetFormatClass;
function UtcOffsetFormat() {
  if (UtcOffsetFormatClass === VOID) {
    class $ extends AbstractDateTimeFormat() {
      constructor(actualFormat) {
        super();
        this.s89_1 = actualFormat;
      }
      l82() {
        return this.s89_1;
      }
      t89(value) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (IncompleteUtcOffset())();
        this_0.e89(value);
        return this_0;
      }
      m82(value) {
        return this.t89(value instanceof UtcOffset_0() ? value : THROW_CCE());
      }
      u89(intermediate) {
        return intermediate.d89();
      }
      n82(intermediate) {
        return this.u89(intermediate instanceof IncompleteUtcOffset() ? intermediate : THROW_CCE());
      }
      o82() {
        return get_emptyIncompleteUtcOffset();
      }
    }
    initMetadataForClass($, 'UtcOffsetFormat');
    UtcOffsetFormatClass = $;
  }
  return UtcOffsetFormatClass;
}
function UtcOffsetFieldContainer$_get_offsetIsNegative_$ref_v5gok2() {
  return function (p0) {
    return p0.s88();
  };
}
function UtcOffsetFieldContainer$_set_offsetIsNegative_$ref_h7e0jq() {
  return function (p0, p1) {
    p0.r88(p1);
    return Unit_instance;
  };
}
var OffsetFields$sign$1Class;
function OffsetFields$sign$1() {
  if (OffsetFields$sign$1Class === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        var tmp_0 = KMutableProperty1();
        var tmp_1 = UtcOffsetFieldContainer$_get_offsetIsNegative_$ref_v5gok2();
        tmp.v89_1 = new (PropertyAccessor())(getPropertyCallableRef('offsetIsNegative', 1, tmp_0, tmp_1, UtcOffsetFieldContainer$_set_offsetIsNegative_$ref_h7e0jq()));
      }
      w89() {
        return this.v89_1;
      }
      x89(obj) {
        var tmp;
        var tmp_0;
        var tmp0_elvis_lhs = obj.u88();
        if ((tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) === 0) {
          var tmp1_elvis_lhs = obj.w88();
          tmp_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) === 0;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          var tmp2_elvis_lhs = obj.y88();
          tmp = (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) === 0;
        } else {
          tmp = false;
        }
        return tmp;
      }
      y89(obj) {
        return this.x89((!(obj == null) ? isInterface(obj, UtcOffsetFieldContainer()) : false) ? obj : THROW_CCE());
      }
    }
    initMetadataForClass($);
    OffsetFields$sign$1Class = $;
  }
  return OffsetFields$sign$1Class;
}
function UtcOffsetFieldContainer$_get_offsetHours_$ref_elsov2() {
  return function (p0) {
    return p0.u88();
  };
}
function UtcOffsetFieldContainer$_set_offsetHours_$ref_4i2hci() {
  return function (p0, p1) {
    p0.t88(p1);
    return Unit_instance;
  };
}
function UtcOffsetFieldContainer$_get_offsetMinutesOfHour_$ref_712kt() {
  return function (p0) {
    return p0.w88();
  };
}
function UtcOffsetFieldContainer$_set_offsetMinutesOfHour_$ref_ka4bon() {
  return function (p0, p1) {
    p0.v88(p1);
    return Unit_instance;
  };
}
function UtcOffsetFieldContainer$_get_offsetSecondsOfMinute_$ref_xrmftp() {
  return function (p0) {
    return p0.y88();
  };
}
function UtcOffsetFieldContainer$_set_offsetSecondsOfMinute_$ref_virwvd() {
  return function (p0, p1) {
    p0.x88(p1);
    return Unit_instance;
  };
}
var OffsetFieldsClass;
function OffsetFields() {
  if (OffsetFieldsClass === VOID) {
    class $ {
      constructor() {
        OffsetFields_instance = this;
        var tmp = this;
        tmp.g89_1 = new (OffsetFields$sign$1())();
        var tmp_0 = this;
        var tmp_1 = KMutableProperty1();
        var tmp_2 = UtcOffsetFieldContainer$_get_offsetHours_$ref_elsov2();
        var tmp0_accessor = new (PropertyAccessor())(getPropertyCallableRef('offsetHours', 1, tmp_1, tmp_2, UtcOffsetFieldContainer$_set_offsetHours_$ref_4i2hci()));
        var tmp1_sign = this.g89_1;
        tmp_0.h89_1 = new (UnsignedFieldSpec())(tmp0_accessor, 0, 18, VOID, 0, tmp1_sign);
        var tmp_3 = this;
        var tmp_4 = KMutableProperty1();
        var tmp_5 = UtcOffsetFieldContainer$_get_offsetMinutesOfHour_$ref_712kt();
        var tmp0_accessor_0 = new (PropertyAccessor())(getPropertyCallableRef('offsetMinutesOfHour', 1, tmp_4, tmp_5, UtcOffsetFieldContainer$_set_offsetMinutesOfHour_$ref_ka4bon()));
        var tmp1_sign_0 = this.g89_1;
        tmp_3.i89_1 = new (UnsignedFieldSpec())(tmp0_accessor_0, 0, 59, VOID, 0, tmp1_sign_0);
        var tmp_6 = this;
        var tmp_7 = KMutableProperty1();
        var tmp_8 = UtcOffsetFieldContainer$_get_offsetSecondsOfMinute_$ref_xrmftp();
        var tmp0_accessor_1 = new (PropertyAccessor())(getPropertyCallableRef('offsetSecondsOfMinute', 1, tmp_7, tmp_8, UtcOffsetFieldContainer$_set_offsetSecondsOfMinute_$ref_virwvd()));
        var tmp1_sign_1 = this.g89_1;
        tmp_6.j89_1 = new (UnsignedFieldSpec())(tmp0_accessor_1, 0, 59, VOID, 0, tmp1_sign_1);
      }
    }
    initMetadataForObject($, 'OffsetFields');
    OffsetFieldsClass = $;
  }
  return OffsetFieldsClass;
}
var OffsetFields_instance;
function OffsetFields_getInstance() {
  if (OffsetFields_instance === VOID)
    new (OffsetFields())();
  return OffsetFields_instance;
}
function offsetHours(padding) {
  return this.r89(new (SignedFormatStructure())(new (BasicFormatStructure())(new (UtcOffsetWholeHoursDirective())(padding)), true));
}
function offsetMinutesOfHour(padding) {
  return this.r89(new (BasicFormatStructure())(new (UtcOffsetMinuteOfHourDirective())(padding)));
}
function offsetSecondsOfMinute(padding) {
  return this.r89(new (BasicFormatStructure())(new (UtcOffsetSecondOfMinuteDirective())(padding)));
}
var AbstractWithOffsetBuilderClass;
function AbstractWithOffsetBuilder() {
  if (AbstractWithOffsetBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractWithOffsetBuilder', VOID, VOID, [WithUtcOffset()]);
    AbstractWithOffsetBuilderClass = $;
  }
  return AbstractWithOffsetBuilderClass;
}
var UtcOffsetMinuteOfHourDirectiveClass;
function UtcOffsetMinuteOfHourDirective() {
  if (UtcOffsetMinuteOfHourDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = OffsetFields_getInstance().i89_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.d8a_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof UtcOffsetMinuteOfHourDirective()) {
          tmp = this.d8a_1.equals(other.d8a_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.d8a_1.hashCode();
      }
    }
    initMetadataForClass($, 'UtcOffsetMinuteOfHourDirective');
    UtcOffsetMinuteOfHourDirectiveClass = $;
  }
  return UtcOffsetMinuteOfHourDirectiveClass;
}
var UtcOffsetSecondOfMinuteDirectiveClass;
function UtcOffsetSecondOfMinuteDirective() {
  if (UtcOffsetSecondOfMinuteDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = OffsetFields_getInstance().j89_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.i8a_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof UtcOffsetSecondOfMinuteDirective()) {
          tmp = this.i8a_1.equals(other.i8a_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.i8a_1.hashCode();
      }
    }
    initMetadataForClass($, 'UtcOffsetSecondOfMinuteDirective');
    UtcOffsetSecondOfMinuteDirectiveClass = $;
  }
  return UtcOffsetSecondOfMinuteDirectiveClass;
}
function isoOffset(_this__u8e3s4, zOnZero, useSeparator, outputMinute, outputSecond) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  // Inline function 'kotlin.require' call
  if (!(outputMinute.a4(outputSecond) >= 0)) {
    var message = 'Seconds cannot be included without minutes';
    throw IllegalArgumentException().q(toString(message));
  }
  if (zOnZero) {
    optional(_this__u8e3s4, 'Z', isoOffset$lambda(outputMinute, useSeparator, outputSecond));
  } else {
    isoOffset$appendIsoOffsetWithoutZOnZero(_this__u8e3s4, outputMinute, useSeparator, outputSecond);
  }
}
var WhenToOutput_NEVER_instance;
var WhenToOutput_IF_NONZERO_instance;
var WhenToOutput_ALWAYS_instance;
var WhenToOutput_entriesInitialized;
function WhenToOutput_initEntries() {
  if (WhenToOutput_entriesInitialized)
    return Unit_instance;
  WhenToOutput_entriesInitialized = true;
  WhenToOutput_NEVER_instance = new (WhenToOutput())('NEVER', 0);
  WhenToOutput_IF_NONZERO_instance = new (WhenToOutput())('IF_NONZERO', 1);
  WhenToOutput_ALWAYS_instance = new (WhenToOutput())('ALWAYS', 2);
}
var WhenToOutputClass;
function WhenToOutput() {
  if (WhenToOutputClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'WhenToOutput');
    WhenToOutputClass = $;
  }
  return WhenToOutputClass;
}
function outputIfNeeded(_this__u8e3s4, whenToOutput, format) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  switch (whenToOutput.x3_1) {
    case 0:
      break;
    case 1:
      optional(_this__u8e3s4, VOID, outputIfNeeded$lambda(format));
      break;
    case 2:
      format(_this__u8e3s4);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
}
function isoOffset$appendIsoOffsetWithoutZOnZero(_this__u8e3s4, $outputMinute, $useSeparator, $outputSecond) {
  _this__u8e3s4.m83();
  outputIfNeeded(_this__u8e3s4, $outputMinute, isoOffset$appendIsoOffsetWithoutZOnZero$lambda($useSeparator, $outputSecond));
}
function ISO_OFFSET$delegate$lambda() {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp = Companion_instance;
  return tmp.p89(ISO_OFFSET$delegate$lambda$lambda);
}
function ISO_OFFSET$delegate$lambda$lambda($this$build) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp = [ISO_OFFSET$delegate$lambda$lambda$lambda];
  alternativeParsing($this$build, tmp, ISO_OFFSET$delegate$lambda$lambda$lambda_0);
  return Unit_instance;
}
function ISO_OFFSET$delegate$lambda$lambda$lambda($this$alternativeParsing) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$alternativeParsing.z82('z');
  return Unit_instance;
}
function ISO_OFFSET$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  optional($this$alternativeParsing, 'Z', ISO_OFFSET$delegate$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$optional.m83();
  char($this$optional, _Char___init__impl__6a9atx(58));
  $this$optional.o83();
  optional($this$optional, VOID, ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_OFFSET$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  char($this$optional, _Char___init__impl__6a9atx(58));
  $this$optional.q83();
  return Unit_instance;
}
function _get_ISO_OFFSET_$ref_70d0nn() {
  return function () {
    return get_ISO_OFFSET();
  };
}
function ISO_OFFSET_BASIC$delegate$lambda() {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp = Companion_instance;
  return tmp.p89(ISO_OFFSET_BASIC$delegate$lambda$lambda);
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda($this$build) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp = [ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda];
  alternativeParsing($this$build, tmp, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0);
  return Unit_instance;
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda($this$alternativeParsing) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$alternativeParsing.z82('z');
  return Unit_instance;
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  optional($this$alternativeParsing, 'Z', ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$optional.m83();
  optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$optional.o83();
  optional($this$optional, VOID, ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_OFFSET_BASIC$delegate$lambda$lambda$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$optional.q83();
  return Unit_instance;
}
function FOUR_DIGIT_OFFSET$delegate$lambda() {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  var tmp = Companion_instance;
  return tmp.p89(FOUR_DIGIT_OFFSET$delegate$lambda$lambda);
}
function FOUR_DIGIT_OFFSET$delegate$lambda$lambda($this$build) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  $this$build.m83();
  $this$build.o83();
  return Unit_instance;
}
function isoOffset$lambda$lambda($this$alternativeParsing) {
  _init_properties_UtcOffsetFormat_kt__9r9ddw();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(122));
  return Unit_instance;
}
function isoOffset$lambda$lambda_0($outputMinute, $useSeparator, $outputSecond) {
  return function ($this$alternativeParsing) {
    isoOffset$appendIsoOffsetWithoutZOnZero($this$alternativeParsing, $outputMinute, $useSeparator, $outputSecond);
    return Unit_instance;
  };
}
function isoOffset$lambda($outputMinute, $useSeparator, $outputSecond) {
  return function ($this$optional) {
    var tmp = [isoOffset$lambda$lambda];
    alternativeParsing($this$optional, tmp, isoOffset$lambda$lambda_0($outputMinute, $useSeparator, $outputSecond));
    return Unit_instance;
  };
}
function outputIfNeeded$lambda($format) {
  return function ($this$optional) {
    $format($this$optional);
    return Unit_instance;
  };
}
function isoOffset$appendIsoOffsetWithoutZOnZero$lambda$lambda($useSeparator) {
  return function ($this$outputIfNeeded) {
    var tmp;
    if ($useSeparator) {
      char($this$outputIfNeeded, _Char___init__impl__6a9atx(58));
      tmp = Unit_instance;
    }
    $this$outputIfNeeded.q83();
    return Unit_instance;
  };
}
function isoOffset$appendIsoOffsetWithoutZOnZero$lambda($useSeparator, $outputSecond) {
  return function ($this$outputIfNeeded) {
    var tmp;
    if ($useSeparator) {
      char($this$outputIfNeeded, _Char___init__impl__6a9atx(58));
      tmp = Unit_instance;
    }
    $this$outputIfNeeded.o83();
    outputIfNeeded($this$outputIfNeeded, $outputSecond, isoOffset$appendIsoOffsetWithoutZOnZero$lambda$lambda($useSeparator));
    return Unit_instance;
  };
}
function WhenToOutput_IF_NONZERO_getInstance() {
  WhenToOutput_initEntries();
  return WhenToOutput_IF_NONZERO_instance;
}
function WhenToOutput_ALWAYS_getInstance() {
  WhenToOutput_initEntries();
  return WhenToOutput_ALWAYS_instance;
}
var properties_initialized_UtcOffsetFormat_kt_6y9jku;
function _init_properties_UtcOffsetFormat_kt__9r9ddw() {
  if (!properties_initialized_UtcOffsetFormat_kt_6y9jku) {
    properties_initialized_UtcOffsetFormat_kt_6y9jku = true;
    ISO_OFFSET$delegate = lazy(ISO_OFFSET$delegate$lambda);
    ISO_OFFSET_BASIC$delegate = lazy(ISO_OFFSET_BASIC$delegate$lambda);
    FOUR_DIGIT_OFFSET$delegate = lazy(FOUR_DIGIT_OFFSET$delegate$lambda);
    emptyIncompleteUtcOffset = new (IncompleteUtcOffset())();
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  WhenToOutput_ALWAYS_getInstance as WhenToOutput_ALWAYS_getInstance3nt5go4h27ckc,
  WhenToOutput_IF_NONZERO_getInstance as WhenToOutput_IF_NONZERO_getInstance1rcluq8iagkxw,
  Companion_instance as Companion_instance2muu0ik1fxb8u,
  get_ISO_OFFSET as get_ISO_OFFSET1wt81dckmqhlf,
  isoOffset as isoOffset2t9o0yqcdt3uh,
};
//endregion

//# sourceMappingURL=UtcOffsetFormat.mjs.map
