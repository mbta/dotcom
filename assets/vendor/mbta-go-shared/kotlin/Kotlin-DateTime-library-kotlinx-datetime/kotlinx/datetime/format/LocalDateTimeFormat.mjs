import { KProperty02ce7r476m8633 as KProperty0 } from '../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { AppendableFormatStructure38mt32f1b8qva as AppendableFormatStructure } from '../internal/format/Builder.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  appendAlternativeParsingImpl1mug8j87kp2j3 as appendAlternativeParsingImpl,
  appendOptionalImplcg29ds00y54b as appendOptionalImpl,
  chars1g48a4lypizqb as chars,
  build284bs2tzkjm2x as build,
  day$default3deq61pimysf5 as day$default,
  year$default2k8rt9cd4skwx as year$default,
  monthNumber$default1bvsur1nt3g2g as monthNumber$default,
  hour$default28zjolx0s9fg0 as hour$default,
  minute$defaultoouhhkuji8pa as minute$default,
  second$default25cj8g9tgx4nm as second$default,
  AbstractDateTimeFormatBuilder2kkelk07l4wb as AbstractDateTimeFormatBuilder,
  WithDate2bqihss8t5xfv as WithDate,
  WithTime2lgb7k6hqa1zi as WithTime,
  alternativeParsing1gmwubnsvpp9b as alternativeParsing,
  char1r4ssccmdfesy as char,
} from './DateTimeFormatBuilder.mjs';
import { protoOf180f3jzyo7rfj as protoOf } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  addFormatStructureForYearMonth2jef3q6pdb658 as addFormatStructureForYearMonth,
  day1ffm1rpsbzq2v as day,
  date3ki45iw426xr8 as date,
  IncompleteLocalDate2wlnrm8wqbjky as IncompleteLocalDate,
  AbstractWithDateBuilder1xwo9aqwqe32f as AbstractWithDateBuilder,
  get_ISO_DATE1ah0stqy13618 as get_ISO_DATE,
} from './LocalDateFormat.mjs';
import {
  year1lgww3hq6k77h as year,
  monthNumber1m6x1k5hwwmv0 as monthNumber,
} from './YearMonthFormat.mjs';
import {
  hour31jxjrzfyqe0i as hour,
  minute2dqmds23fogn6 as minute,
  secondq4lhw2ppe1iv as second,
  secondFraction17r4cie9ncxw as secondFraction,
  time3kvfctmdykstm as time,
  IncompleteLocalTime3h4nusjwtlckd as IncompleteLocalTime,
  TimeFieldContainer3bsvpq7sk70go as TimeFieldContainer,
  AbstractWithTimeBuilder2vqnew72ok0ro as AbstractWithTimeBuilder,
  get_ISO_TIME31n00f6uljtbs as get_ISO_TIME,
} from './LocalTimeFormat.mjs';
import { AbstractDateTimeFormat1er9ki1vjeb1b as AbstractDateTimeFormat } from './DateTimeFormat.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { LocalDateTime3vqv9moe7clf4 as LocalDateTime } from '../LocalDateTime.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { lazy2hsh8ze7j6ikd as lazy } from '../../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_ISO_DATETIME() {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  var tmp0 = ISO_DATETIME$delegate;
  var tmp = KProperty0();
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('ISO_DATETIME', 0, tmp, _get_ISO_DATETIME_$ref_5bxm11(), null);
  return tmp0.v1();
}
var ISO_DATETIME$delegate;
function get_emptyIncompleteLocalDateTime() {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  return emptyIncompleteLocalDateTime;
}
var emptyIncompleteLocalDateTime;
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      q85(block) {
        var builder = new (Builder())(new (AppendableFormatStructure())());
        block(builder);
        return new (LocalDateTimeFormat())(builder.r3q());
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
        this.r85_1 = actualBuilder;
      }
      t83() {
        return this.r85_1;
      }
      s85(structure) {
        this.r85_1.w83(structure);
      }
      u83() {
        return new (Builder())(new (AppendableFormatStructure())());
      }
    }
    protoOf($).s83 = appendAlternativeParsingImpl;
    protoOf($).r83 = appendOptionalImpl;
    protoOf($).z82 = chars;
    protoOf($).r3q = build;
    protoOf($).y84 = addFormatStructureForDate;
    protoOf($).y83 = addFormatStructureForTime;
    protoOf($).z84 = addFormatStructureForYearMonth;
    protoOf($).a83 = day;
    protoOf($).b83 = day$default;
    protoOf($).c83 = date;
    protoOf($).v82 = year;
    protoOf($).w82 = year$default;
    protoOf($).x82 = monthNumber;
    protoOf($).y82 = monthNumber$default;
    protoOf($).d83 = hour;
    protoOf($).e83 = hour$default;
    protoOf($).f83 = minute;
    protoOf($).g83 = minute$default;
    protoOf($).h83 = second;
    protoOf($).i83 = second$default;
    protoOf($).j83 = secondFraction;
    protoOf($).k83 = time;
    initMetadataForClass($, 'Builder', VOID, VOID, [AbstractDateTimeFormatBuilder(), AbstractWithDateTimeBuilder()]);
    BuilderClass = $;
  }
  return BuilderClass;
}
var LocalDateTimeFormatClass;
function LocalDateTimeFormat() {
  if (LocalDateTimeFormatClass === VOID) {
    class $ extends AbstractDateTimeFormat() {
      constructor(actualFormat) {
        super();
        this.t85_1 = actualFormat;
      }
      l82() {
        return this.t85_1;
      }
      u85(value) {
        // Inline function 'kotlin.apply' call
        var this_0 = new (IncompleteLocalDateTime())();
        this_0.x85(value);
        return this_0;
      }
      m82(value) {
        return this.u85(value instanceof LocalDateTime() ? value : THROW_CCE());
      }
      y85(intermediate) {
        return intermediate.z85();
      }
      n82(intermediate) {
        return this.y85(intermediate instanceof IncompleteLocalDateTime() ? intermediate : THROW_CCE());
      }
      o82() {
        return get_emptyIncompleteLocalDateTime();
      }
    }
    initMetadataForClass($, 'LocalDateTimeFormat');
    LocalDateTimeFormatClass = $;
  }
  return LocalDateTimeFormatClass;
}
var IncompleteLocalDateTimeClass;
function IncompleteLocalDateTime() {
  if (IncompleteLocalDateTimeClass === VOID) {
    class $ {
      constructor(date, time) {
        date = date === VOID ? new (IncompleteLocalDate())() : date;
        time = time === VOID ? new (IncompleteLocalTime())() : time;
        this.v85_1 = date;
        this.w85_1 = time;
      }
      z85() {
        return new (LocalDateTime())(this.v85_1.j84(), this.w85_1.g86());
      }
      x85(dateTime) {
        this.v85_1.q84(dateTime.h86_1);
        this.w85_1.j86(dateTime.i86_1);
      }
      t84() {
        return new (IncompleteLocalDateTime())(this.v85_1.t84(), this.w85_1.t84());
      }
      d84(_set____db54di) {
        this.v85_1.a84_1 = _set____db54di;
      }
      e84() {
        return this.v85_1.a84_1;
      }
      f84(_set____db54di) {
        this.v85_1.b84_1 = _set____db54di;
      }
      g84() {
        return this.v85_1.b84_1;
      }
      h84(_set____db54di) {
        this.v85_1.c84_1 = _set____db54di;
      }
      i84() {
        return this.v85_1.c84_1;
      }
      r84(_set____db54di) {
        this.v85_1.r84(_set____db54di);
      }
      k84() {
        return this.v85_1.k84();
      }
      s84(_set____db54di) {
        this.v85_1.s84(_set____db54di);
      }
      p84() {
        return this.v85_1.p84();
      }
      k86(_set____db54di) {
        this.w85_1.d86_1 = _set____db54di;
      }
      l86() {
        return this.w85_1.d86_1;
      }
      m86(_set____db54di) {
        this.w85_1.e86_1 = _set____db54di;
      }
      n86() {
        return this.w85_1.e86_1;
      }
      o86(_set____db54di) {
        this.w85_1.f86_1 = _set____db54di;
      }
      p86() {
        return this.w85_1.f86_1;
      }
      q86(_set____db54di) {
        this.w85_1.a86_1 = _set____db54di;
      }
      r86() {
        return this.w85_1.a86_1;
      }
      s86(_set____db54di) {
        this.w85_1.b86_1 = _set____db54di;
      }
      t86() {
        return this.w85_1.b86_1;
      }
      u86(_set____db54di) {
        this.w85_1.c86_1 = _set____db54di;
      }
      v86() {
        return this.w85_1.c86_1;
      }
      w86(value) {
        this.w85_1.w86(value);
      }
      x86() {
        return this.w85_1.x86();
      }
    }
    initMetadataForClass($, 'IncompleteLocalDateTime', IncompleteLocalDateTime, VOID, [TimeFieldContainer()]);
    IncompleteLocalDateTimeClass = $;
  }
  return IncompleteLocalDateTimeClass;
}
function addFormatStructureForDate(structure) {
  this.s85(structure);
}
function addFormatStructureForTime(structure) {
  this.s85(structure);
}
var AbstractWithDateTimeBuilderClass;
function AbstractWithDateTimeBuilder() {
  if (AbstractWithDateTimeBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractWithDateTimeBuilder', VOID, VOID, [AbstractWithDateBuilder(), AbstractWithTimeBuilder(), WithDate(), WithTime()]);
    AbstractWithDateTimeBuilderClass = $;
  }
  return AbstractWithDateTimeBuilderClass;
}
function ISO_DATETIME$delegate$lambda() {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  var tmp = Companion_instance;
  return tmp.q85(ISO_DATETIME$delegate$lambda$lambda);
}
function ISO_DATETIME$delegate$lambda$lambda($this$build) {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  $this$build.c83(get_ISO_DATE());
  var tmp = [ISO_DATETIME$delegate$lambda$lambda$lambda];
  alternativeParsing($this$build, tmp, ISO_DATETIME$delegate$lambda$lambda$lambda_0);
  $this$build.k83(get_ISO_TIME());
  return Unit_instance;
}
function ISO_DATETIME$delegate$lambda$lambda$lambda($this$alternativeParsing) {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(116));
  return Unit_instance;
}
function ISO_DATETIME$delegate$lambda$lambda$lambda_0($this$alternativeParsing) {
  _init_properties_LocalDateTimeFormat_kt__aloigl();
  char($this$alternativeParsing, _Char___init__impl__6a9atx(84));
  return Unit_instance;
}
function _get_ISO_DATETIME_$ref_5bxm11() {
  return function () {
    return get_ISO_DATETIME();
  };
}
var properties_initialized_LocalDateTimeFormat_kt_67ys6r;
function _init_properties_LocalDateTimeFormat_kt__aloigl() {
  if (!properties_initialized_LocalDateTimeFormat_kt_67ys6r) {
    properties_initialized_LocalDateTimeFormat_kt_67ys6r = true;
    ISO_DATETIME$delegate = lazy(ISO_DATETIME$delegate$lambda);
    emptyIncompleteLocalDateTime = new (IncompleteLocalDateTime())();
  }
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  Companion_instance as Companion_instance6qbrtyiwm67y,
  get_ISO_DATETIME as get_ISO_DATETIME2pryl9hy3c2kg,
};
//endregion

//# sourceMappingURL=LocalDateTimeFormat.mjs.map
