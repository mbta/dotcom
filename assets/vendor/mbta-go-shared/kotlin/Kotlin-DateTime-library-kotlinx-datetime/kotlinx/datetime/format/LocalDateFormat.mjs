import {
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
} from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import {
  IncompleteYearMonth32an7l8nqz3oa as IncompleteYearMonth,
  requireParsedField387b2jr94jy2p as requireParsedField,
  year1lgww3hq6k77h as year,
  monthNumber1m6x1k5hwwmv0 as monthNumber,
  AbstractWithYearMonthBuilder24i9826zzgc8l as AbstractWithYearMonthBuilder,
} from './YearMonthFormat.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  LocalDate31mqn6zavbpi8 as LocalDate,
  plus1et5dysousgt9 as plus,
} from '../LocalDate.mjs';
import { Companion_getInstance1hjnoi8x2xjhl as Companion_getInstance } from '../DateTimeUnit.mjs';
import { DateTimeFormatException2onfeknbywaob as DateTimeFormatException } from '../Exceptions.mjs';
import { get_number11nqnpf0wxtuc as get_number } from '../Month.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  DayOfWeek2xlo40o03f5e as DayOfWeek,
  get_isoDayNumberrycq4er3aoh9 as get_isoDayNumber,
} from '../DayOfWeek.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { AppendableFormatStructure38mt32f1b8qva as AppendableFormatStructure } from '../internal/format/Builder.mjs';
import {
  appendAlternativeParsingImpl1mug8j87kp2j3 as appendAlternativeParsingImpl,
  appendOptionalImplcg29ds00y54b as appendOptionalImpl,
  chars1g48a4lypizqb as chars,
  build284bs2tzkjm2x as build,
  day$default3deq61pimysf5 as day$default,
  year$default2k8rt9cd4skwx as year$default,
  monthNumber$default1bvsur1nt3g2g as monthNumber$default,
  AbstractDateTimeFormatBuilder2kkelk07l4wb as AbstractDateTimeFormatBuilder,
  WithDate2bqihss8t5xfv as WithDate,
  char1r4ssccmdfesy as char,
} from './DateTimeFormatBuilder.mjs';
import {
  AbstractDateTimeFormat1er9ki1vjeb1b as AbstractDateTimeFormat,
  Padding_ZERO_getInstance2hdjif6phlc74 as Padding_ZERO_getInstance,
  Padding_SPACE_getInstance7fwkzb4da6c as Padding_SPACE_getInstance,
} from './DateTimeFormat.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { BasicFormatStructure1rp1tyv3u2fjw as BasicFormatStructure } from '../internal/format/FormatStructure.mjs';
import { UnsignedIntFieldFormatDirective20kfpdbszyixg as UnsignedIntFieldFormatDirective } from '../internal/format/FieldFormatDirective.mjs';
import {
  PropertyAccessor1m9zk65ebkfc4 as PropertyAccessor,
  UnsignedFieldSpec1pqzij1hidkca as UnsignedFieldSpec,
} from '../internal/format/FieldSpec.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_ISO_DATE() {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  var tmp0 = ISO_DATE$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_DATE', 0, tmp, _get_ISO_DATE_$ref_powsum(), null);
  return tmp0.v1();
}
var ISO_DATE$delegate;
function get_ISO_DATE_BASIC() {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  var tmp0 = ISO_DATE_BASIC$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_DATE_BASIC', 0, tmp, _get_ISO_DATE_BASIC_$ref_3fs8eb(), null);
  return tmp0.v1();
}
var ISO_DATE_BASIC$delegate;
function get_emptyIncompleteLocalDate() {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  return emptyIncompleteLocalDate;
}
var emptyIncompleteLocalDate;
var IncompleteLocalDateClass;
function IncompleteLocalDate() {
  if (IncompleteLocalDateClass === VOID) {
    class $ {
      constructor(yearMonth, day, dayOfWeek, dayOfYear) {
        yearMonth = yearMonth === VOID ? new (IncompleteYearMonth())() : yearMonth;
        day = day === VOID ? null : day;
        dayOfWeek = dayOfWeek === VOID ? null : dayOfWeek;
        dayOfYear = dayOfYear === VOID ? null : dayOfYear;
        this.z83_1 = yearMonth;
        this.a84_1 = day;
        this.b84_1 = dayOfWeek;
        this.c84_1 = dayOfYear;
      }
      d84(_set____db54di) {
        this.a84_1 = _set____db54di;
      }
      e84() {
        return this.a84_1;
      }
      f84(_set____db54di) {
        this.b84_1 = _set____db54di;
      }
      g84() {
        return this.b84_1;
      }
      h84(_set____db54di) {
        this.c84_1 = _set____db54di;
      }
      i84() {
        return this.c84_1;
      }
      j84() {
        var year = requireParsedField(this.k84(), 'year');
        var dayOfYear = this.c84_1;
        var tmp;
        if (dayOfYear == null) {
          tmp = new (LocalDate())(year, requireParsedField(this.p84(), 'monthNumber'), requireParsedField(this.a84_1, 'day'));
        } else {
          // Inline function 'kotlin.also' call
          var this_0 = plus(new (LocalDate())(year, 1, 1), dayOfYear - 1 | 0, Companion_getInstance().i81_1);
          if (!(this_0.l84_1 === year)) {
            throw DateTimeFormatException().p80('Can not create a LocalDate from the given input: ' + ('the day of year is ' + dayOfYear + ', which is not a valid day of year for the year ' + year));
          }
          if (!(this.p84() == null) && !(get_number(this_0.o84()) === this.p84())) {
            throw DateTimeFormatException().p80('Can not create a LocalDate from the given input: ' + ('the day of year is ' + dayOfYear + ', which is ' + this_0.o84().toString() + ', ') + ('but ' + this.p84() + ' was specified as the month number'));
          }
          if (!(this.a84_1 == null) && !(this_0.m84_1 === this.a84_1)) {
            throw DateTimeFormatException().p80('Can not create a LocalDate from the given input: ' + ('the day of year is ' + dayOfYear + ', which is the day ' + this_0.m84_1 + ' of ' + this_0.o84().toString() + ', ') + ('but ' + this.a84_1 + ' was specified as the day of month'));
          }
          tmp = this_0;
        }
        var date = tmp;
        var tmp0_safe_receiver = this.b84_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          if (!(tmp0_safe_receiver === get_isoDayNumber(date.g84()))) {
            throw DateTimeFormatException().p80('Can not create a LocalDate from the given input: ' + ('the day of week is ' + DayOfWeek(tmp0_safe_receiver).toString() + ' but the date is ' + date.toString() + ', which is a ' + date.g84().toString()));
          }
        }
        return date;
      }
      q84(date) {
        this.r84(date.l84_1);
        this.s84(get_number(date.o84()));
        this.a84_1 = date.m84_1;
        this.b84_1 = get_isoDayNumber(date.g84());
        this.c84_1 = date.i84();
      }
      t84() {
        return new (IncompleteLocalDate())(this.z83_1.t84(), this.a84_1, this.b84_1, this.c84_1);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        var tmp_1;
        var tmp_2;
        if (other instanceof IncompleteLocalDate()) {
          tmp_2 = this.z83_1.equals(other.z83_1);
        } else {
          tmp_2 = false;
        }
        if (tmp_2) {
          tmp_1 = this.a84_1 == other.a84_1;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = this.b84_1 == other.b84_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.c84_1 == other.c84_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        var tmp = imul(this.z83_1.hashCode(), 29791);
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.a84_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp_0 = tmp + imul(tmp$ret$0, 961) | 0;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = this.b84_1;
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        var tmp$ret$1 = tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0;
        var tmp_1 = tmp_0 + imul(tmp$ret$1, 31) | 0;
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_1 = this.c84_1;
        var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
        return tmp_1 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
      }
      toString() {
        var tmp;
        if (this.c84_1 == null) {
          var tmp_0 = this.z83_1.toString();
          var tmp0_elvis_lhs = this.a84_1;
          var tmp_1 = toString(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
          var tmp1_elvis_lhs = this.b84_1;
          tmp = tmp_0 + '-' + tmp_1 + ' (day of week is ' + toString(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs) + ')';
        } else if (this.a84_1 == null && this.p84() == null) {
          var tmp2_elvis_lhs = this.z83_1.u84_1;
          var tmp_2 = toString(tmp2_elvis_lhs == null ? '??' : tmp2_elvis_lhs);
          var tmp_3 = this.c84_1;
          var tmp3_elvis_lhs = this.b84_1;
          tmp = '(' + tmp_2 + ')-' + tmp_3 + ' (day of week is ' + toString(tmp3_elvis_lhs == null ? '??' : tmp3_elvis_lhs) + ')';
        } else {
          var tmp_4 = this.z83_1.toString();
          var tmp4_elvis_lhs = this.a84_1;
          var tmp_5 = toString(tmp4_elvis_lhs == null ? '??' : tmp4_elvis_lhs);
          var tmp5_elvis_lhs = this.b84_1;
          tmp = tmp_4 + '-' + tmp_5 + ' (day of week is ' + toString(tmp5_elvis_lhs == null ? '??' : tmp5_elvis_lhs) + ', day of year is ' + this.c84_1 + ')';
        }
        return tmp;
      }
      r84(_set____db54di) {
        this.z83_1.u84_1 = _set____db54di;
      }
      k84() {
        return this.z83_1.u84_1;
      }
      s84(_set____db54di) {
        this.z83_1.v84_1 = _set____db54di;
      }
      p84() {
        return this.z83_1.v84_1;
      }
    }
    initMetadataForClass($, 'IncompleteLocalDate', IncompleteLocalDate);
    IncompleteLocalDateClass = $;
  }
  return IncompleteLocalDateClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      w84(block) {
        var builder = new (Builder())(new (AppendableFormatStructure())());
        block(builder);
        return new (LocalDateFormat())(builder.r3q());
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance_0() {
  return Companion_instance;
}
var BuilderClass;
function Builder() {
  if (BuilderClass === VOID) {
    class $ {
      constructor(actualBuilder) {
        this.x84_1 = actualBuilder;
      }
      t83() {
        return this.x84_1;
      }
      y84(structure) {
        return this.x84_1.w83(structure);
      }
      u83() {
        return new (Builder())(new (AppendableFormatStructure())());
      }
    }
    protoOf($).s83 = appendAlternativeParsingImpl;
    protoOf($).r83 = appendOptionalImpl;
    protoOf($).z82 = chars;
    protoOf($).r3q = build;
    protoOf($).z84 = addFormatStructureForYearMonth;
    protoOf($).a83 = day;
    protoOf($).b83 = day$default;
    protoOf($).v82 = year;
    protoOf($).w82 = year$default;
    protoOf($).x82 = monthNumber;
    protoOf($).y82 = monthNumber$default;
    initMetadataForClass($, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder(), AbstractWithDateBuilder()]);
    BuilderClass = $;
  }
  return BuilderClass;
}
var LocalDateFormatClass;
function LocalDateFormat() {
  if (LocalDateFormatClass === VOID) {
    class $ extends AbstractDateTimeFormat() {
      constructor(actualFormat) {
        super();
        this.a85_1 = actualFormat;
      }
      l82() {
        return this.a85_1;
      }
      b85(value) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (IncompleteLocalDate())();
        this_0.q84(value);
        return this_0;
      }
      m82(value) {
        return this.b85(value instanceof LocalDate() ? value : THROW_CCE());
      }
      c85(intermediate) {
        return intermediate.j84();
      }
      n82(intermediate) {
        return this.c85(intermediate instanceof IncompleteLocalDate() ? intermediate : THROW_CCE());
      }
      o82() {
        return get_emptyIncompleteLocalDate();
      }
    }
    initMetadataForClass($, 'LocalDateFormat');
    LocalDateFormatClass = $;
  }
  return LocalDateFormatClass;
}
function addFormatStructureForYearMonth(structure) {
  this.y84(structure);
}
function day(padding) {
  return this.y84(new (BasicFormatStructure())(new (DayDirective())(padding)));
}
function date(format) {
  var tmp;
  if (format instanceof LocalDateFormat()) {
    this.y84(format.a85_1);
    tmp = Unit_instance;
  }
  return tmp;
}
var AbstractWithDateBuilderClass;
function AbstractWithDateBuilder() {
  if (AbstractWithDateBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractWithDateBuilder', VOID, VOID, [AbstractWithYearMonthBuilder(), WithDate()]);
    AbstractWithDateBuilderClass = $;
  }
  return AbstractWithDateBuilderClass;
}
var DayDirectiveClass;
function DayDirective() {
  if (DayDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = DateFields_getInstance().d85_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.k85_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof DayDirective()) {
          tmp = this.k85_1.equals(other.k85_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.k85_1.hashCode();
      }
    }
    initMetadataForClass($, 'DayDirective');
    DayDirectiveClass = $;
  }
  return DayDirectiveClass;
}
function DateFieldContainer$_get_day_$ref_2ebhxx() {
  return function (p0) {
    return p0.e84();
  };
}
function DateFieldContainer$_set_day_$ref_s0jsax() {
  return function (p0, p1) {
    p0.d84(p1);
    return Unit_instance;
  };
}
function DateFieldContainer$_get_dayOfWeek_$ref_thwqom() {
  return function (p0) {
    return p0.g84();
  };
}
function DateFieldContainer$_set_dayOfWeek_$ref_ea586a() {
  return function (p0, p1) {
    p0.f84(p1);
    return Unit_instance;
  };
}
function DateFieldContainer$_get_dayOfYear_$ref_2m6gfz() {
  return function (p0) {
    return p0.i84();
  };
}
function DateFieldContainer$_set_dayOfYear_$ref_cll22d() {
  return function (p0, p1) {
    p0.h84(p1);
    return Unit_instance;
  };
}
var DateFieldsClass;
function DateFields() {
  if (DateFieldsClass === VOID) {
    class $ {
      constructor() {
        DateFields_instance = this;
        var tmp = this;
        var tmp_0 = KMutableProperty1();
        var tmp_1 = DateFieldContainer$_get_day_$ref_2ebhxx();
        tmp.d85_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('day', 1, tmp_0, tmp_1, DateFieldContainer$_set_day_$ref_s0jsax())), 1, 31);
        var tmp_2 = this;
        var tmp_3 = KMutableProperty1();
        var tmp_4 = DateFieldContainer$_get_dayOfWeek_$ref_thwqom();
        tmp_2.e85_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('dayOfWeek', 1, tmp_3, tmp_4, DateFieldContainer$_set_dayOfWeek_$ref_ea586a())), 1, 7);
        var tmp_5 = this;
        var tmp_6 = KMutableProperty1();
        var tmp_7 = DateFieldContainer$_get_dayOfYear_$ref_2m6gfz();
        tmp_5.f85_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('dayOfYear', 1, tmp_6, tmp_7, DateFieldContainer$_set_dayOfYear_$ref_cll22d())), 1, 366);
      }
    }
    initMetadataForObject($, 'DateFields');
    DateFieldsClass = $;
  }
  return DateFieldsClass;
}
var DateFields_instance;
function DateFields_getInstance() {
  if (DateFields_instance === VOID)
    new (DateFields())();
  return DateFields_instance;
}
function ISO_DATE$delegate$lambda() {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  var tmp = Companion_instance;
  return tmp.w84(ISO_DATE$delegate$lambda$lambda);
}
function ISO_DATE$delegate$lambda$lambda($this$build) {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  $this$build.w82();
  char($this$build, _Char___init__impl__6a9atx(45));
  $this$build.y82();
  char($this$build, _Char___init__impl__6a9atx(45));
  $this$build.b83();
  return Unit_instance;
}
function _get_ISO_DATE_$ref_powsum() {
  return function () {
    return get_ISO_DATE();
  };
}
function ISO_DATE_BASIC$delegate$lambda() {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  var tmp = Companion_instance;
  return tmp.w84(ISO_DATE_BASIC$delegate$lambda$lambda);
}
function ISO_DATE_BASIC$delegate$lambda$lambda($this$build) {
  _init_properties_LocalDateFormat_kt__k1uk9u();
  $this$build.w82();
  $this$build.y82();
  $this$build.b83();
  return Unit_instance;
}
function _get_ISO_DATE_BASIC_$ref_3fs8eb() {
  return function () {
    return get_ISO_DATE_BASIC();
  };
}
var properties_initialized_LocalDateFormat_kt_fmnlhc;
function _init_properties_LocalDateFormat_kt__k1uk9u() {
  if (!properties_initialized_LocalDateFormat_kt_fmnlhc) {
    properties_initialized_LocalDateFormat_kt_fmnlhc = true;
    ISO_DATE$delegate = lazy(ISO_DATE$delegate$lambda);
    ISO_DATE_BASIC$delegate = lazy(ISO_DATE_BASIC$delegate$lambda);
    emptyIncompleteLocalDate = new (IncompleteLocalDate())();
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  addFormatStructureForYearMonth as addFormatStructureForYearMonth2jef3q6pdb658,
  date as date3ki45iw426xr8,
  day as day1ffm1rpsbzq2v,
  AbstractWithDateBuilder as AbstractWithDateBuilder1xwo9aqwqe32f,
  get_ISO_DATE as get_ISO_DATE1ah0stqy13618,
  get_ISO_DATE_BASIC as get_ISO_DATE_BASIC1k4wiybcckf8,
  IncompleteLocalDate as IncompleteLocalDate2wlnrm8wqbjky,
};
//endregion

//# sourceMappingURL=LocalDateFormat.mjs.map
