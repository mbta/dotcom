import {
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
} from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { DecimalFraction15n0off36xuu9 as DecimalFraction } from '../internal/math.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { DateTimeFormatException2onfeknbywaob as DateTimeFormatException } from '../Exceptions.mjs';
import { requireParsedField387b2jr94jy2p as requireParsedField } from './YearMonthFormat.mjs';
import { LocalTime22kisvxz6f9p4 as LocalTime } from '../LocalTime.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { padStart36w1507hs626a as padStart } from '../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { AppendableFormatStructure38mt32f1b8qva as AppendableFormatStructure } from '../internal/format/Builder.mjs';
import {
  appendAlternativeParsingImpl1mug8j87kp2j3 as appendAlternativeParsingImpl,
  appendOptionalImplcg29ds00y54b as appendOptionalImpl,
  chars1g48a4lypizqb as chars,
  build284bs2tzkjm2x as build,
  hour$default28zjolx0s9fg0 as hour$default,
  minute$defaultoouhhkuji8pa as minute$default,
  second$default25cj8g9tgx4nm as second$default,
  AbstractDateTimeFormatBuilder2kkelk07l4wb as AbstractDateTimeFormatBuilder,
  WithTime2lgb7k6hqa1zi as WithTime,
  char1r4ssccmdfesy as char,
  alternativeParsing1gmwubnsvpp9b as alternativeParsing,
  optional3j6ywsx1pxeh6 as optional,
} from './DateTimeFormatBuilder.mjs';
import {
  AbstractDateTimeFormat1er9ki1vjeb1b as AbstractDateTimeFormat,
  Padding_ZERO_getInstance2hdjif6phlc74 as Padding_ZERO_getInstance,
  Padding_SPACE_getInstance7fwkzb4da6c as Padding_SPACE_getInstance,
} from './DateTimeFormat.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { BasicFormatStructure1rp1tyv3u2fjw as BasicFormatStructure } from '../internal/format/FormatStructure.mjs';
import {
  UnsignedIntFieldFormatDirective20kfpdbszyixg as UnsignedIntFieldFormatDirective,
  DecimalFractionFieldFormatDirective1h9sbm886izzq as DecimalFractionFieldFormatDirective,
} from '../internal/format/FieldFormatDirective.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  PropertyAccessor1m9zk65ebkfc4 as PropertyAccessor,
  UnsignedFieldSpec1pqzij1hidkca as UnsignedFieldSpec,
  GenericFieldSpecnllvuuqbuxsd as GenericFieldSpec,
} from '../internal/format/FieldSpec.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_ISO_TIME() {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  var tmp0 = ISO_TIME$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_TIME', 0, tmp, _get_ISO_TIME_$ref_kyx2od(), null);
  return tmp0.v1();
}
var ISO_TIME$delegate;
function get_emptyIncompleteLocalTime() {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  return emptyIncompleteLocalTime;
}
var emptyIncompleteLocalTime;
function set_fractionOfSecond(value) {
  this.o86(value == null ? null : value.a87(9));
}
function get_fractionOfSecond() {
  var tmp0_safe_receiver = this.p86();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = new (DecimalFraction())(tmp0_safe_receiver, 9);
  }
  return tmp;
}
var TimeFieldContainerClass;
function TimeFieldContainer() {
  if (TimeFieldContainerClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'TimeFieldContainer');
    TimeFieldContainerClass = $;
  }
  return TimeFieldContainerClass;
}
var IncompleteLocalTimeClass;
function IncompleteLocalTime() {
  if (IncompleteLocalTimeClass === VOID) {
    class $ {
      constructor(hour, hourOfAmPm, amPm, minute, second, nanosecond) {
        hour = hour === VOID ? null : hour;
        hourOfAmPm = hourOfAmPm === VOID ? null : hourOfAmPm;
        amPm = amPm === VOID ? null : amPm;
        minute = minute === VOID ? null : minute;
        second = second === VOID ? null : second;
        nanosecond = nanosecond === VOID ? null : nanosecond;
        this.a86_1 = hour;
        this.b86_1 = hourOfAmPm;
        this.c86_1 = amPm;
        this.d86_1 = minute;
        this.e86_1 = second;
        this.f86_1 = nanosecond;
      }
      q86(_set____db54di) {
        this.a86_1 = _set____db54di;
      }
      r86() {
        return this.a86_1;
      }
      s86(_set____db54di) {
        this.b86_1 = _set____db54di;
      }
      t86() {
        return this.b86_1;
      }
      u86(_set____db54di) {
        this.c86_1 = _set____db54di;
      }
      v86() {
        return this.c86_1;
      }
      k86(_set____db54di) {
        this.d86_1 = _set____db54di;
      }
      l86() {
        return this.d86_1;
      }
      m86(_set____db54di) {
        this.e86_1 = _set____db54di;
      }
      n86() {
        return this.e86_1;
      }
      o86(_set____db54di) {
        this.f86_1 = _set____db54di;
      }
      p86() {
        return this.f86_1;
      }
      g86() {
        var tmp0_safe_receiver = this.a86_1;
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          var tmp0_safe_receiver_0 = this.b86_1;
          if (tmp0_safe_receiver_0 == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.require' call
            if (!((((tmp0_safe_receiver + 11 | 0) % 12 | 0) + 1 | 0) === tmp0_safe_receiver_0)) {
              var message = 'Inconsistent hour and hour-of-am-pm: hour is ' + tmp0_safe_receiver + ', but hour-of-am-pm is ' + tmp0_safe_receiver_0;
              throw IllegalArgumentException().q(toString(message));
            }
          }
          var tmp1_safe_receiver = this.c86_1;
          if (tmp1_safe_receiver == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.require' call
            if (!(tmp1_safe_receiver.equals(AmPmMarker_PM_getInstance()) === tmp0_safe_receiver >= 12)) {
              var message_0 = 'Inconsistent hour and the AM/PM marker: hour is ' + tmp0_safe_receiver + ', but the AM/PM marker is ' + tmp1_safe_receiver.toString();
              throw IllegalArgumentException().q(toString(message_0));
            }
          }
          tmp = tmp0_safe_receiver;
        }
        var tmp1_elvis_lhs = tmp;
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          var tmp2_safe_receiver = this.b86_1;
          var tmp_1;
          if (tmp2_safe_receiver == null) {
            tmp_1 = null;
          } else {
            // Inline function 'kotlin.let' call
            var tmp0_safe_receiver_1 = this.c86_1;
            var tmp_2;
            if (tmp0_safe_receiver_1 == null) {
              tmp_2 = null;
            } else {
              // Inline function 'kotlin.let' call
              // Inline function 'kotlin.let' call
              tmp_2 = (tmp2_safe_receiver === 12 ? 0 : tmp2_safe_receiver) + (tmp0_safe_receiver_1.equals(AmPmMarker_PM_getInstance()) ? 12 : 0) | 0;
            }
            tmp_1 = tmp_2;
          }
          tmp_0 = tmp_1;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        var tmp3_elvis_lhs = tmp_0;
        var tmp_3;
        if (tmp3_elvis_lhs == null) {
          throw DateTimeFormatException().p80('Incomplete time: missing hour');
        } else {
          tmp_3 = tmp3_elvis_lhs;
        }
        var hour = tmp_3;
        var tmp_4 = requireParsedField(this.d86_1, 'minute');
        var tmp4_elvis_lhs = this.e86_1;
        var tmp_5 = tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs;
        var tmp5_elvis_lhs = this.f86_1;
        return new (LocalTime())(hour, tmp_4, tmp_5, tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs);
      }
      j86(localTime) {
        this.a86_1 = localTime.b87_1;
        this.b86_1 = ((localTime.b87_1 + 11 | 0) % 12 | 0) + 1 | 0;
        this.c86_1 = localTime.b87_1 >= 12 ? AmPmMarker_PM_getInstance() : AmPmMarker_AM_getInstance();
        this.d86_1 = localTime.c87_1;
        this.e86_1 = localTime.d87_1;
        this.f86_1 = localTime.e87_1;
      }
      t84() {
        return new (IncompleteLocalTime())(this.a86_1, this.b86_1, this.c86_1, this.d86_1, this.e86_1, this.f86_1);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        var tmp_1;
        var tmp_2;
        var tmp_3;
        var tmp_4;
        if (other instanceof IncompleteLocalTime()) {
          tmp_4 = this.a86_1 == other.a86_1;
        } else {
          tmp_4 = false;
        }
        if (tmp_4) {
          tmp_3 = this.b86_1 == other.b86_1;
        } else {
          tmp_3 = false;
        }
        if (tmp_3) {
          tmp_2 = equals(this.c86_1, other.c86_1);
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_1 = this.d86_1 == other.d86_1;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = this.e86_1 == other.e86_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.f86_1 == other.f86_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        var tmp0_elvis_lhs = this.a86_1;
        var tmp = imul(tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs, 31);
        var tmp1_elvis_lhs = this.b86_1;
        var tmp_0 = tmp + imul(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, 31) | 0;
        var tmp2_safe_receiver = this.c86_1;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.hashCode();
        var tmp_1 = tmp_0 + imul(tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs, 31) | 0;
        var tmp4_elvis_lhs = this.d86_1;
        var tmp_2 = tmp_1 + imul(tmp4_elvis_lhs == null ? 0 : tmp4_elvis_lhs, 31) | 0;
        var tmp5_elvis_lhs = this.e86_1;
        var tmp_3 = tmp_2 + imul(tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs, 31) | 0;
        var tmp6_elvis_lhs = this.f86_1;
        return tmp_3 + (tmp6_elvis_lhs == null ? 0 : tmp6_elvis_lhs) | 0;
      }
      toString() {
        var tmp0_elvis_lhs = this.a86_1;
        var tmp = toString(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
        var tmp1_elvis_lhs = this.d86_1;
        var tmp_0 = toString(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
        var tmp2_elvis_lhs = this.e86_1;
        var tmp_1 = toString(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
        var tmp3_safe_receiver = this.f86_1;
        var tmp_2;
        if (tmp3_safe_receiver == null) {
          tmp_2 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.let' call
          var it = tmp3_safe_receiver.toString();
          tmp_2 = padStart(it, 9 - it.length | 0, _Char___init__impl__6a9atx(48));
        }
        var tmp4_elvis_lhs = tmp_2;
        return tmp + ':' + tmp_0 + ':' + tmp_1 + '.' + (tmp4_elvis_lhs == null ? '???' : tmp4_elvis_lhs);
      }
    }
    protoOf($).w86 = set_fractionOfSecond;
    protoOf($).x86 = get_fractionOfSecond;
    initMetadataForClass($, 'IncompleteLocalTime', IncompleteLocalTime, VOID, [TimeFieldContainer()]);
    IncompleteLocalTimeClass = $;
  }
  return IncompleteLocalTimeClass;
}
var AmPmMarker_AM_instance;
var AmPmMarker_PM_instance;
var AmPmMarker_entriesInitialized;
function AmPmMarker_initEntries() {
  if (AmPmMarker_entriesInitialized)
    return Unit_instance;
  AmPmMarker_entriesInitialized = true;
  AmPmMarker_AM_instance = new (AmPmMarker())('AM', 0);
  AmPmMarker_PM_instance = new (AmPmMarker())('PM', 1);
}
var AmPmMarkerClass;
function AmPmMarker() {
  if (AmPmMarkerClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'AmPmMarker');
    AmPmMarkerClass = $;
  }
  return AmPmMarkerClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      f87(block) {
        var builder = new (Builder())(new (AppendableFormatStructure())());
        block(builder);
        return new (LocalTimeFormat())(builder.r3q());
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
        this.g87_1 = actualBuilder;
      }
      t83() {
        return this.g87_1;
      }
      y83(structure) {
        this.g87_1.w83(structure);
      }
      u83() {
        return new (Builder())(new (AppendableFormatStructure())());
      }
    }
    protoOf($).s83 = appendAlternativeParsingImpl;
    protoOf($).r83 = appendOptionalImpl;
    protoOf($).z82 = chars;
    protoOf($).r3q = build;
    protoOf($).d83 = hour;
    protoOf($).e83 = hour$default;
    protoOf($).f83 = minute;
    protoOf($).g83 = minute$default;
    protoOf($).h83 = second;
    protoOf($).i83 = second$default;
    protoOf($).j83 = secondFraction;
    initMetadataForClass($, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder(), AbstractWithTimeBuilder()]);
    BuilderClass = $;
  }
  return BuilderClass;
}
var LocalTimeFormatClass;
function LocalTimeFormat() {
  if (LocalTimeFormatClass === VOID) {
    class $ extends AbstractDateTimeFormat() {
      constructor(actualFormat) {
        super();
        this.h87_1 = actualFormat;
      }
      l82() {
        return this.h87_1;
      }
      i87(value) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (IncompleteLocalTime())();
        this_0.j86(value);
        return this_0;
      }
      m82(value) {
        return this.i87(value instanceof LocalTime() ? value : THROW_CCE());
      }
      j87(intermediate) {
        return intermediate.g86();
      }
      n82(intermediate) {
        return this.j87(intermediate instanceof IncompleteLocalTime() ? intermediate : THROW_CCE());
      }
      o82() {
        return get_emptyIncompleteLocalTime();
      }
    }
    initMetadataForClass($, 'LocalTimeFormat');
    LocalTimeFormatClass = $;
  }
  return LocalTimeFormatClass;
}
function hour(padding) {
  return this.y83(new (BasicFormatStructure())(new (HourDirective())(padding)));
}
function minute(padding) {
  return this.y83(new (BasicFormatStructure())(new (MinuteDirective())(padding)));
}
function second(padding) {
  return this.y83(new (BasicFormatStructure())(new (SecondDirective())(padding)));
}
function secondFraction(minLength, maxLength) {
  return this.y83(new (BasicFormatStructure())(new (FractionalSecondDirective())(minLength, maxLength)));
}
function time(format) {
  var tmp;
  if (format instanceof LocalTimeFormat()) {
    this.y83(format.h87_1);
    tmp = Unit_instance;
  }
  return tmp;
}
var AbstractWithTimeBuilderClass;
function AbstractWithTimeBuilder() {
  if (AbstractWithTimeBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractWithTimeBuilder', VOID, VOID, [WithTime()]);
    AbstractWithTimeBuilderClass = $;
  }
  return AbstractWithTimeBuilderClass;
}
var HourDirectiveClass;
function HourDirective() {
  if (HourDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = TimeFields_getInstance().k87_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.u87_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof HourDirective()) {
          tmp = this.u87_1.equals(other.u87_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.u87_1.hashCode();
      }
    }
    initMetadataForClass($, 'HourDirective');
    HourDirectiveClass = $;
  }
  return HourDirectiveClass;
}
var MinuteDirectiveClass;
function MinuteDirective() {
  if (MinuteDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = TimeFields_getInstance().l87_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.z87_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof MinuteDirective()) {
          tmp = this.z87_1.equals(other.z87_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.z87_1.hashCode();
      }
    }
    initMetadataForClass($, 'MinuteDirective');
    MinuteDirectiveClass = $;
  }
  return MinuteDirectiveClass;
}
var SecondDirectiveClass;
function SecondDirective() {
  if (SecondDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = TimeFields_getInstance().m87_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.e88_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof SecondDirective()) {
          tmp = this.e88_1.equals(other.e88_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.e88_1.hashCode();
      }
    }
    initMetadataForClass($, 'SecondDirective');
    SecondDirectiveClass = $;
  }
  return SecondDirectiveClass;
}
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.f88_1 = listOf([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.g88_1 = listOf([2, 1, 0, 2, 1, 0, 2, 1, 0]);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_0 = $;
  }
  return CompanionClass_0;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new (Companion_0())();
  return Companion_instance_0;
}
var FractionalSecondDirectiveClass;
function FractionalSecondDirective() {
  if (FractionalSecondDirectiveClass === VOID) {
    class $ extends DecimalFractionFieldFormatDirective() {
      constructor(minDigits, maxDigits, zerosToAdd) {
        Companion_getInstance_0();
        zerosToAdd = zerosToAdd === VOID ? Companion_getInstance_0().f88_1 : zerosToAdd;
        super(TimeFields_getInstance().n87_1, minDigits, maxDigits, zerosToAdd);
        this.l88_1 = minDigits;
        this.m88_1 = maxDigits;
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof FractionalSecondDirective()) {
          tmp_0 = this.l88_1 === other.l88_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.m88_1 === other.m88_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(31, this.l88_1) + this.m88_1 | 0;
      }
    }
    initMetadataForClass($, 'FractionalSecondDirective');
    FractionalSecondDirectiveClass = $;
  }
  return FractionalSecondDirectiveClass;
}
function TimeFieldContainer$_get_hour_$ref_8ezbwm() {
  return function (p0) {
    return p0.r86();
  };
}
function TimeFieldContainer$_set_hour_$ref_l7vnde() {
  return function (p0, p1) {
    p0.q86(p1);
    return Unit_instance;
  };
}
function TimeFieldContainer$_get_minute_$ref_evb2i2() {
  return function (p0) {
    return p0.l86();
  };
}
function TimeFieldContainer$_set_minute_$ref_6xin6() {
  return function (p0, p1) {
    p0.k86(p1);
    return Unit_instance;
  };
}
function TimeFieldContainer$_get_second_$ref_t7tjxy() {
  return function (p0) {
    return p0.n86();
  };
}
function TimeFieldContainer$_set_second_$ref_qr1wvy() {
  return function (p0, p1) {
    p0.m86(p1);
    return Unit_instance;
  };
}
function TimeFieldContainer$_get_fractionOfSecond_$ref_u85by5() {
  return function (p0) {
    return p0.x86();
  };
}
function TimeFieldContainer$_set_fractionOfSecond_$ref_quw20n() {
  return function (p0, p1) {
    p0.w86(p1);
    return Unit_instance;
  };
}
function TimeFieldContainer$_get_amPm_$ref_u9tt1b() {
  return function (p0) {
    return p0.v86();
  };
}
function TimeFieldContainer$_set_amPm_$ref_hgxhkj() {
  return function (p0, p1) {
    p0.u86(p1);
    return Unit_instance;
  };
}
function TimeFieldContainer$_get_hourOfAmPm_$ref_okyxye() {
  return function (p0) {
    return p0.t86();
  };
}
function TimeFieldContainer$_set_hourOfAmPm_$ref_y4i32() {
  return function (p0, p1) {
    p0.s86(p1);
    return Unit_instance;
  };
}
var TimeFieldsClass;
function TimeFields() {
  if (TimeFieldsClass === VOID) {
    class $ {
      constructor() {
        TimeFields_instance = this;
        var tmp = this;
        var tmp_0 = KMutableProperty1();
        var tmp_1 = TimeFieldContainer$_get_hour_$ref_8ezbwm();
        tmp.k87_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('hour', 1, tmp_0, tmp_1, TimeFieldContainer$_set_hour_$ref_l7vnde())), 0, 23);
        var tmp_2 = this;
        var tmp_3 = KMutableProperty1();
        var tmp_4 = TimeFieldContainer$_get_minute_$ref_evb2i2();
        tmp_2.l87_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('minute', 1, tmp_3, tmp_4, TimeFieldContainer$_set_minute_$ref_6xin6())), 0, 59);
        var tmp_5 = this;
        var tmp_6 = KMutableProperty1();
        var tmp_7 = TimeFieldContainer$_get_second_$ref_t7tjxy();
        tmp_5.m87_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('second', 1, tmp_6, tmp_7, TimeFieldContainer$_set_second_$ref_qr1wvy())), 0, 59, VOID, 0);
        var tmp_8 = this;
        var tmp_9 = KMutableProperty1();
        var tmp_10 = TimeFieldContainer$_get_fractionOfSecond_$ref_u85by5();
        tmp_8.n87_1 = new (GenericFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('fractionOfSecond', 1, tmp_9, tmp_10, TimeFieldContainer$_set_fractionOfSecond_$ref_quw20n()), 'nanosecond'), VOID, new (DecimalFraction())(0, 9));
        var tmp_11 = this;
        var tmp_12 = KMutableProperty1();
        var tmp_13 = TimeFieldContainer$_get_amPm_$ref_u9tt1b();
        tmp_11.o87_1 = new (GenericFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('amPm', 1, tmp_12, tmp_13, TimeFieldContainer$_set_amPm_$ref_hgxhkj())));
        var tmp_14 = this;
        var tmp_15 = KMutableProperty1();
        var tmp_16 = TimeFieldContainer$_get_hourOfAmPm_$ref_okyxye();
        tmp_14.p87_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('hourOfAmPm', 1, tmp_15, tmp_16, TimeFieldContainer$_set_hourOfAmPm_$ref_y4i32())), 1, 12);
      }
    }
    initMetadataForObject($, 'TimeFields');
    TimeFieldsClass = $;
  }
  return TimeFieldsClass;
}
var TimeFields_instance;
function TimeFields_getInstance() {
  if (TimeFields_instance === VOID)
    new (TimeFields())();
  return TimeFields_instance;
}
function ISO_TIME$delegate$lambda() {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  var tmp = Companion_instance;
  return tmp.f87(ISO_TIME$delegate$lambda$lambda);
}
function ISO_TIME$delegate$lambda$lambda($this$build) {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  $this$build.e83();
  char($this$build, _Char___init__impl__6a9atx(58));
  $this$build.g83();
  var tmp = [ISO_TIME$delegate$lambda$lambda$lambda];
  alternativeParsing($this$build, tmp, ISO_TIME$delegate$lambda$lambda$lambda_0);
  return Unit_instance;
}
function ISO_TIME$delegate$lambda$lambda$lambda($this$alternativeParsing) {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  return Unit_instance;
}
function ISO_TIME$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(58));
  $this$alternativeParsing.i83();
  optional($this$alternativeParsing, VOID, ISO_TIME$delegate$lambda$lambda$lambda$lambda);
  return Unit_instance;
}
function ISO_TIME$delegate$lambda$lambda$lambda$lambda($this$optional) {
  _init_properties_LocalTimeFormat_kt__5i3lfh();
  char($this$optional, _Char___init__impl__6a9atx(46));
  $this$optional.j83(1, 9);
  return Unit_instance;
}
function _get_ISO_TIME_$ref_kyx2od() {
  return function () {
    return get_ISO_TIME();
  };
}
function AmPmMarker_AM_getInstance() {
  AmPmMarker_initEntries();
  return AmPmMarker_AM_instance;
}
function AmPmMarker_PM_getInstance() {
  AmPmMarker_initEntries();
  return AmPmMarker_PM_instance;
}
var properties_initialized_LocalTimeFormat_kt_l1b0w1;
function _init_properties_LocalTimeFormat_kt__5i3lfh() {
  if (!properties_initialized_LocalTimeFormat_kt_l1b0w1) {
    properties_initialized_LocalTimeFormat_kt_l1b0w1 = true;
    ISO_TIME$delegate = lazy(ISO_TIME$delegate$lambda);
    emptyIncompleteLocalTime = new (IncompleteLocalTime())();
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_getInstance_0 as Companion_getInstance157hitepwwtjt,
  Companion_instance as Companion_instance3cjm8zd5cu9tl,
  hour as hour31jxjrzfyqe0i,
  minute as minute2dqmds23fogn6,
  secondFraction as secondFraction17r4cie9ncxw,
  second as secondq4lhw2ppe1iv,
  time as time3kvfctmdykstm,
  AbstractWithTimeBuilder as AbstractWithTimeBuilder2vqnew72ok0ro,
  FractionalSecondDirective as FractionalSecondDirective1min2m2ag51uu,
  get_ISO_TIME as get_ISO_TIME31n00f6uljtbs,
  IncompleteLocalTime as IncompleteLocalTime3h4nusjwtlckd,
  TimeFieldContainer as TimeFieldContainer3bsvpq7sk70go,
};
//endregion

//# sourceMappingURL=LocalTimeFormat.mjs.map
