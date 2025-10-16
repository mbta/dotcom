import { Padding_ZERO_getInstance2hdjif6phlc74 as Padding_ZERO_getInstance } from './DateTimeFormat.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { initMetadataForInterface1egvbzx539z91 as initMetadataForInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { toString3o7ifthqydp6e as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  isInterface3d6p8outrmvmk as isInterface,
  isArray1hxjqtqy632bc as isArray,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  AlternativesParsingFormatStructure1jbxrbmj8ihe6 as AlternativesParsingFormatStructure,
  OptionalFormatStructure1lur7h5l20ekc as OptionalFormatStructure,
  ConstantFormatStructure2ckhnu4xssh81 as ConstantFormatStructure,
  CachedFormatStructurec5vu2vku3yjz as CachedFormatStructure,
  BasicFormatStructure1rp1tyv3u2fjw as BasicFormatStructure,
} from '../internal/format/FormatStructure.mjs';
import {
  FractionalSecondDirective1min2m2ag51uu as FractionalSecondDirective,
  AbstractWithTimeBuilder2vqnew72ok0ro as AbstractWithTimeBuilder,
} from './LocalTimeFormat.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function year$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.v82(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.v82.call(this, padding);
  }
  return tmp;
}
function monthNumber$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.x82(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.x82.call(this, padding);
  }
  return tmp;
}
var WithYearMonthClass;
function WithYearMonth() {
  if (WithYearMonthClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WithYearMonth');
    WithYearMonthClass = $;
  }
  return WithYearMonthClass;
}
function day$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.a83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.a83.call(this, padding);
  }
  return tmp;
}
var WithDateClass;
function WithDate() {
  if (WithDateClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WithDate', VOID, VOID, [WithYearMonth()]);
    WithDateClass = $;
  }
  return WithDateClass;
}
function hour$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.d83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.d83.call(this, padding);
  }
  return tmp;
}
function minute$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.f83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.f83.call(this, padding);
  }
  return tmp;
}
function second$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.h83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.h83.call(this, padding);
  }
  return tmp;
}
var WithTimeClass;
function WithTime() {
  if (WithTimeClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WithTime');
    WithTimeClass = $;
  }
  return WithTimeClass;
}
function offsetHours$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.l83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.l83.call(this, padding);
  }
  return tmp;
}
function offsetMinutesOfHour$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.n83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.n83.call(this, padding);
  }
  return tmp;
}
function offsetSecondsOfMinute$default(padding, $super) {
  padding = padding === VOID ? Padding_ZERO_getInstance() : padding;
  var tmp;
  if ($super === VOID) {
    this.p83(padding);
    tmp = Unit_instance;
  } else {
    tmp = $super.p83.call(this, padding);
  }
  return tmp;
}
var WithUtcOffsetClass;
function WithUtcOffset() {
  if (WithUtcOffsetClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'WithUtcOffset');
    WithUtcOffsetClass = $;
  }
  return WithUtcOffsetClass;
}
function char(_this__u8e3s4, value) {
  return _this__u8e3s4.z82(toString(value));
}
function optional(_this__u8e3s4, ifZero, format) {
  ifZero = ifZero === VOID ? '' : ifZero;
  var tmp;
  if (isInterface(_this__u8e3s4, AbstractDateTimeFormatBuilder())) {
    _this__u8e3s4.r83(ifZero, typeof format === 'function' ? format : THROW_CCE());
    tmp = Unit_instance;
  } else {
    throw IllegalStateException().o5('impossible');
  }
  return tmp;
}
function alternativeParsing(_this__u8e3s4, alternativeFormats, primaryFormat) {
  var tmp;
  if (isInterface(_this__u8e3s4, AbstractDateTimeFormatBuilder())) {
    var tmp_0 = (isArray(alternativeFormats) ? alternativeFormats : THROW_CCE()).slice();
    _this__u8e3s4.s83(tmp_0, typeof primaryFormat === 'function' ? primaryFormat : THROW_CCE());
    tmp = Unit_instance;
  } else {
    throw IllegalStateException().o5('impossible');
  }
  return tmp;
}
function appendAlternativeParsingImpl(otherFormats, mainFormat) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList().w(otherFormats.length);
  var inductionVariable = 0;
  var last = otherFormats.length;
  while (inductionVariable < last) {
    var item = otherFormats[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    // Inline function 'kotlin.also' call
    var this_0 = this.u83();
    item(this_0);
    var tmp$ret$2 = this_0.t83().r3q();
    destination.i(tmp$ret$2);
  }
  var others = destination;
  // Inline function 'kotlin.also' call
  var this_1 = this.u83();
  mainFormat(this_1);
  var main = this_1.t83().r3q();
  this.t83().w83(new (AlternativesParsingFormatStructure())(main, others));
}
function appendOptionalImpl(onZero, format) {
  var tmp = this.t83();
  // Inline function 'kotlin.also' call
  var this_0 = this.u83();
  format(this_0);
  tmp.w83(new (OptionalFormatStructure())(onZero, this_0.t83().r3q()));
}
function chars(value) {
  return this.t83().w83(new (ConstantFormatStructure())(value));
}
function build() {
  return new (CachedFormatStructure())(this.t83().r3q().x83_1);
}
var AbstractDateTimeFormatBuilderClass;
function AbstractDateTimeFormatBuilder() {
  if (AbstractDateTimeFormatBuilderClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'AbstractDateTimeFormatBuilder');
    AbstractDateTimeFormatBuilderClass = $;
  }
  return AbstractDateTimeFormatBuilderClass;
}
function secondFractionInternal(_this__u8e3s4, minLength, maxLength, grouping) {
  if (isInterface(_this__u8e3s4, AbstractWithTimeBuilder())) {
    _this__u8e3s4.y83(new (BasicFormatStructure())(new (FractionalSecondDirective())(minLength, maxLength, grouping)));
  }
}
//region block: exports
export {
  day$default as day$default3deq61pimysf5,
  hour$default as hour$default28zjolx0s9fg0,
  minute$default as minute$defaultoouhhkuji8pa,
  second$default as second$default25cj8g9tgx4nm,
  offsetHours$default as offsetHours$default2ltn8vk6i6a0z,
  offsetMinutesOfHour$default as offsetMinutesOfHour$defaultx23z50nh5v5p,
  offsetSecondsOfMinute$default as offsetSecondsOfMinute$defaultxai9ucsyqlc7,
  monthNumber$default as monthNumber$default1bvsur1nt3g2g,
  year$default as year$default2k8rt9cd4skwx,
  appendAlternativeParsingImpl as appendAlternativeParsingImpl1mug8j87kp2j3,
  appendOptionalImpl as appendOptionalImplcg29ds00y54b,
  build as build284bs2tzkjm2x,
  chars as chars1g48a4lypizqb,
  AbstractDateTimeFormatBuilder as AbstractDateTimeFormatBuilder2kkelk07l4wb,
  WithDate as WithDate2bqihss8t5xfv,
  WithTime as WithTime2lgb7k6hqa1zi,
  WithUtcOffset as WithUtcOffset30ws1ntcash0j,
  WithYearMonth as WithYearMonth35cttdg68tw6f,
  alternativeParsing as alternativeParsing1gmwubnsvpp9b,
  char as char1r4ssccmdfesy,
  optional as optional3j6ywsx1pxeh6,
  secondFractionInternal as secondFractionInternalr53tad5c19e9,
};
//endregion

//# sourceMappingURL=DateTimeFormatBuilder.mjs.map
