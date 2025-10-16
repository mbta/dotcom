import {
  KProperty02ce7r476m8633 as KProperty0,
  KMutableProperty11e8g1gb0ecb9j as KMutableProperty1,
} from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { YearMonth22nahmknr467s as YearMonth } from '../YearMonth.mjs';
import { get_number11nqnpf0wxtuc as get_number } from '../Month.mjs';
import {
  hashCodeq5arwsb9dgti as hashCode,
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { DateTimeFormatException2onfeknbywaob as DateTimeFormatException } from '../Exceptions.mjs';
import { BasicFormatStructure1rp1tyv3u2fjw as BasicFormatStructure } from '../internal/format/FormatStructure.mjs';
import {
  WithYearMonth35cttdg68tw6f as WithYearMonth,
  appendAlternativeParsingImpl1mug8j87kp2j3 as appendAlternativeParsingImpl,
  appendOptionalImplcg29ds00y54b as appendOptionalImpl,
  chars1g48a4lypizqb as chars,
  build284bs2tzkjm2x as build,
  year$default2k8rt9cd4skwx as year$default,
  monthNumber$default1bvsur1nt3g2g as monthNumber$default,
  AbstractDateTimeFormatBuilder2kkelk07l4wb as AbstractDateTimeFormatBuilder,
  char1r4ssccmdfesy as char,
} from './DateTimeFormatBuilder.mjs';
import { AppendableFormatStructure38mt32f1b8qva as AppendableFormatStructure } from '../internal/format/Builder.mjs';
import {
  AbstractDateTimeFormat1er9ki1vjeb1b as AbstractDateTimeFormat,
  Padding_ZERO_getInstance2hdjif6phlc74 as Padding_ZERO_getInstance,
  Padding_SPACE_getInstance7fwkzb4da6c as Padding_SPACE_getInstance,
} from './DateTimeFormat.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  SignedIntFieldFormatDirective2ce7tjucbhgd2 as SignedIntFieldFormatDirective,
  UnsignedIntFieldFormatDirective20kfpdbszyixg as UnsignedIntFieldFormatDirective,
} from '../internal/format/FieldFormatDirective.mjs';
import {
  PropertyAccessor1m9zk65ebkfc4 as PropertyAccessor,
  GenericFieldSpecnllvuuqbuxsd as GenericFieldSpec,
  UnsignedFieldSpec1pqzij1hidkca as UnsignedFieldSpec,
} from '../internal/format/FieldSpec.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_emptyIncompleteYearMonth() {
  _init_properties_YearMonthFormat_kt__i0mmu0();
  return emptyIncompleteYearMonth;
}
var emptyIncompleteYearMonth;
function get_ISO_YEAR_MONTH() {
  _init_properties_YearMonthFormat_kt__i0mmu0();
  var tmp0 = ISO_YEAR_MONTH$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_YEAR_MONTH', 0, tmp, _get_ISO_YEAR_MONTH_$ref_y3tv9a(), null);
  return tmp0.v1();
}
var ISO_YEAR_MONTH$delegate;
var IncompleteYearMonthClass;
function IncompleteYearMonth() {
  if (IncompleteYearMonthClass === VOID) {
    class $ {
      constructor(year, monthNumber) {
        year = year === VOID ? null : year;
        monthNumber = monthNumber === VOID ? null : monthNumber;
        this.u84_1 = year;
        this.v84_1 = monthNumber;
      }
      r84(_set____db54di) {
        this.u84_1 = _set____db54di;
      }
      k84() {
        return this.u84_1;
      }
      s84(_set____db54di) {
        this.v84_1 = _set____db54di;
      }
      p84() {
        return this.v84_1;
      }
      j8a() {
        var year = requireParsedField(this.u84_1, 'year');
        var month = requireParsedField(this.v84_1, 'monthNumber');
        return new (YearMonth())(year, month);
      }
      k8a(yearMonth) {
        this.u84_1 = yearMonth.l8a_1;
        this.v84_1 = get_number(yearMonth.o84());
      }
      t84() {
        return new (IncompleteYearMonth())(this.u84_1, this.v84_1);
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof IncompleteYearMonth()) {
          tmp_0 = this.u84_1 == other.u84_1;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.v84_1 == other.v84_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver = this.u84_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
        var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp = imul(tmp$ret$0, 31);
        // Inline function 'kotlin.hashCode' call
        var tmp0_safe_receiver_0 = this.v84_1;
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
        return tmp + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
      }
      toString() {
        var tmp0_elvis_lhs = this.u84_1;
        var tmp = toString(tmp0_elvis_lhs == null ? '??' : tmp0_elvis_lhs);
        var tmp1_elvis_lhs = this.v84_1;
        return tmp + '-' + toString(tmp1_elvis_lhs == null ? '??' : tmp1_elvis_lhs);
      }
    }
    initMetadataForClass($, 'IncompleteYearMonth', IncompleteYearMonth);
    IncompleteYearMonthClass = $;
  }
  return IncompleteYearMonthClass;
}
function requireParsedField(field, name) {
  _init_properties_YearMonthFormat_kt__i0mmu0();
  if (field == null) {
    throw DateTimeFormatException().p80('Can not create a ' + name + ' from the given input: the field ' + name + ' is missing');
  }
  return field;
}
function year(padding) {
  return this.z84(new (BasicFormatStructure())(new (YearDirective())(padding)));
}
function monthNumber(padding) {
  return this.z84(new (BasicFormatStructure())(new (MonthDirective())(padding)));
}
var AbstractWithYearMonthBuilderClass;
function AbstractWithYearMonthBuilder() {
  if (AbstractWithYearMonthBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractWithYearMonthBuilder', VOID, VOID, [WithYearMonth()]);
    AbstractWithYearMonthBuilderClass = $;
  }
  return AbstractWithYearMonthBuilderClass;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      n8a(block) {
        var builder = new (Builder())(new (AppendableFormatStructure())());
        block(builder);
        return new (YearMonthFormat())(builder.r3q());
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
        this.o8a_1 = actualBuilder;
      }
      t83() {
        return this.o8a_1;
      }
      z84(structure) {
        return this.o8a_1.w83(structure);
      }
      u83() {
        return new (Builder())(new (AppendableFormatStructure())());
      }
    }
    protoOf($).s83 = appendAlternativeParsingImpl;
    protoOf($).r83 = appendOptionalImpl;
    protoOf($).z82 = chars;
    protoOf($).r3q = build;
    protoOf($).v82 = year;
    protoOf($).w82 = year$default;
    protoOf($).x82 = monthNumber;
    protoOf($).y82 = monthNumber$default;
    initMetadataForClass($, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder(), AbstractWithYearMonthBuilder()]);
    BuilderClass = $;
  }
  return BuilderClass;
}
var YearMonthFormatClass;
function YearMonthFormat() {
  if (YearMonthFormatClass === VOID) {
    class $ extends AbstractDateTimeFormat() {
      constructor(actualFormat) {
        super();
        this.p8a_1 = actualFormat;
      }
      l82() {
        return this.p8a_1;
      }
      q8a(value) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (IncompleteYearMonth())();
        this_0.k8a(value);
        return this_0;
      }
      m82(value) {
        return this.q8a(value instanceof YearMonth() ? value : THROW_CCE());
      }
      r8a(intermediate) {
        return intermediate.j8a();
      }
      n82(intermediate) {
        return this.r8a(intermediate instanceof IncompleteYearMonth() ? intermediate : THROW_CCE());
      }
      o82() {
        return get_emptyIncompleteYearMonth();
      }
    }
    initMetadataForClass($, 'YearMonthFormat');
    YearMonthFormatClass = $;
  }
  return YearMonthFormatClass;
}
var YearDirectiveClass;
function YearDirective() {
  if (YearDirectiveClass === VOID) {
    class $ extends SignedIntFieldFormatDirective() {
      constructor(padding, isYearOfEra) {
        isYearOfEra = isYearOfEra === VOID ? false : isYearOfEra;
        var tmp = YearMonthFields_getInstance().s8a_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 4 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, null, padding.equals(Padding_SPACE_getInstance()) ? 4 : null, 4);
        this.z8a_1 = padding;
        this.a8b_1 = isYearOfEra;
      }
      equals(other) {
        var tmp;
        var tmp_0;
        if (other instanceof YearDirective()) {
          tmp_0 = this.z8a_1.equals(other.z8a_1);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp = this.a8b_1 === other.a8b_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return imul(this.z8a_1.hashCode(), 31) + getBooleanHashCode(this.a8b_1) | 0;
      }
    }
    initMetadataForClass($, 'YearDirective');
    YearDirectiveClass = $;
  }
  return YearDirectiveClass;
}
var MonthDirectiveClass;
function MonthDirective() {
  if (MonthDirectiveClass === VOID) {
    class $ extends UnsignedIntFieldFormatDirective() {
      constructor(padding) {
        var tmp = YearMonthFields_getInstance().t8a_1;
        // Inline function 'kotlinx.datetime.format.minDigits' call
        var tmp_0 = padding.equals(Padding_ZERO_getInstance()) ? 2 : 1;
        // Inline function 'kotlinx.datetime.format.spaces' call
        super(tmp, tmp_0, padding.equals(Padding_SPACE_getInstance()) ? 2 : null);
        this.k8b_1 = padding;
      }
      equals(other) {
        var tmp;
        if (other instanceof MonthDirective()) {
          tmp = this.k8b_1.equals(other.k8b_1);
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.k8b_1.hashCode();
      }
    }
    initMetadataForClass($, 'MonthDirective');
    MonthDirectiveClass = $;
  }
  return MonthDirectiveClass;
}
function YearMonthFieldContainer$_get_year_$ref_7j3zdj() {
  return function (p0) {
    return p0.k84();
  };
}
function YearMonthFieldContainer$_set_year_$ref_kc0aub() {
  return function (p0, p1) {
    p0.r84(p1);
    return Unit_instance;
  };
}
function YearMonthFieldContainer$_get_monthNumber_$ref_pn0wu5() {
  return function (p0) {
    return p0.p84();
  };
}
function YearMonthFieldContainer$_set_monthNumber_$ref_fjapbl() {
  return function (p0, p1) {
    p0.s84(p1);
    return Unit_instance;
  };
}
var YearMonthFieldsClass;
function YearMonthFields() {
  if (YearMonthFieldsClass === VOID) {
    class $ {
      constructor() {
        YearMonthFields_instance = this;
        var tmp = this;
        var tmp_0 = KMutableProperty1();
        var tmp_1 = YearMonthFieldContainer$_get_year_$ref_7j3zdj();
        tmp.s8a_1 = new (GenericFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('year', 1, tmp_0, tmp_1, YearMonthFieldContainer$_set_year_$ref_kc0aub())));
        var tmp_2 = this;
        var tmp_3 = KMutableProperty1();
        var tmp_4 = YearMonthFieldContainer$_get_monthNumber_$ref_pn0wu5();
        tmp_2.t8a_1 = new (UnsignedFieldSpec())(new (PropertyAccessor())(getPropertyCallableRef('monthNumber', 1, tmp_3, tmp_4, YearMonthFieldContainer$_set_monthNumber_$ref_fjapbl())), 1, 12);
      }
    }
    initMetadataForObject($, 'YearMonthFields');
    YearMonthFieldsClass = $;
  }
  return YearMonthFieldsClass;
}
var YearMonthFields_instance;
function YearMonthFields_getInstance() {
  if (YearMonthFields_instance === VOID)
    new (YearMonthFields())();
  return YearMonthFields_instance;
}
function ISO_YEAR_MONTH$delegate$lambda() {
  _init_properties_YearMonthFormat_kt__i0mmu0();
  var tmp = Companion_instance;
  return tmp.n8a(ISO_YEAR_MONTH$delegate$lambda$lambda);
}
function ISO_YEAR_MONTH$delegate$lambda$lambda($this$build) {
  _init_properties_YearMonthFormat_kt__i0mmu0();
  $this$build.w82();
  char($this$build, _Char___init__impl__6a9atx(45));
  $this$build.y82();
  return Unit_instance;
}
function _get_ISO_YEAR_MONTH_$ref_y3tv9a() {
  return function () {
    return get_ISO_YEAR_MONTH();
  };
}
var properties_initialized_YearMonthFormat_kt_fp0mk6;
function _init_properties_YearMonthFormat_kt__i0mmu0() {
  if (!properties_initialized_YearMonthFormat_kt_fp0mk6) {
    properties_initialized_YearMonthFormat_kt_fp0mk6 = true;
    emptyIncompleteYearMonth = new (IncompleteYearMonth())();
    ISO_YEAR_MONTH$delegate = lazy(ISO_YEAR_MONTH$delegate$lambda);
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  monthNumber as monthNumber1m6x1k5hwwmv0,
  year as year1lgww3hq6k77h,
  AbstractWithYearMonthBuilder as AbstractWithYearMonthBuilder24i9826zzgc8l,
  get_ISO_YEAR_MONTH as get_ISO_YEAR_MONTHnhzdbkah361r,
  IncompleteYearMonth as IncompleteYearMonth32an7l8nqz3oa,
  requireParsedField as requireParsedField387b2jr94jy2p,
};
//endregion

//# sourceMappingURL=YearMonthFormat.mjs.map
