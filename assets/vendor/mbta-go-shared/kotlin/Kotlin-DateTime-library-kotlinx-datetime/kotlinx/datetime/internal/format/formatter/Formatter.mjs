import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char19o2r8palgjof as Char,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  equals2au1ep9vhcato as equals,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function format$default(obj, builder, minusNotRequired, $super) {
  minusNotRequired = minusNotRequired === VOID ? false : minusNotRequired;
  var tmp;
  if ($super === VOID) {
    this.x8c(obj, builder, minusNotRequired);
    tmp = Unit_instance;
  } else {
    tmp = $super.x8c.call(this, obj, builder, minusNotRequired);
  }
  return tmp;
}
var FormatterStructureClass;
function FormatterStructure() {
  if (FormatterStructureClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'FormatterStructure');
    FormatterStructureClass = $;
  }
  return FormatterStructureClass;
}
var SpacePaddedFormatterClass;
function SpacePaddedFormatter() {
  if (SpacePaddedFormatterClass === VOID) {
    class $ {
      constructor(formatter, padding) {
        this.y8c_1 = formatter;
        this.z8c_1 = padding;
      }
      x8c(obj, builder, minusNotRequired) {
        // Inline function 'kotlin.let' call
        var it = StringBuilder().f();
        this.y8c_1.x8c(obj, it, minusNotRequired);
        var string = it.toString();
        // Inline function 'kotlin.repeat' call
        var times = this.z8c_1 - string.length | 0;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            builder.ic(_Char___init__impl__6a9atx(32));
          }
           while (inductionVariable < times);
        builder.v(string);
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'SpacePaddedFormatter', VOID, VOID, [FormatterStructure()]);
    SpacePaddedFormatterClass = $;
  }
  return SpacePaddedFormatterClass;
}
var SignedFormatterClass;
function SignedFormatter() {
  if (SignedFormatterClass === VOID) {
    class $ {
      constructor(formatter, allSubFormatsNegative, alwaysOutputSign) {
        this.a8d_1 = formatter;
        this.b8d_1 = allSubFormatsNegative;
        this.c8d_1 = alwaysOutputSign;
      }
      x8c(obj, builder, minusNotRequired) {
        var tmp;
        if (!minusNotRequired && this.b8d_1(obj)) {
          tmp = _Char___init__impl__6a9atx(45);
        } else if (this.c8d_1) {
          tmp = _Char___init__impl__6a9atx(43);
        } else {
          tmp = null;
        }
        var sign = tmp;
        var tmp_0 = sign;
        if ((tmp_0 == null ? null : new (Char())(tmp_0)) == null)
          null;
        else {
          var tmp_1 = sign;
          // Inline function 'kotlin.let' call
          var it = (tmp_1 == null ? null : new (Char())(tmp_1)).r2_1;
          builder.ic(it);
        }
        var tmp_2;
        if (minusNotRequired) {
          tmp_2 = true;
        } else {
          var tmp_3 = sign;
          tmp_2 = equals(tmp_3 == null ? null : new (Char())(tmp_3), new (Char())(_Char___init__impl__6a9atx(45)));
        }
        this.a8d_1.x8c(obj, builder, tmp_2);
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'SignedFormatter', VOID, VOID, [FormatterStructure()]);
    SignedFormatterClass = $;
  }
  return SignedFormatterClass;
}
var ConditionalFormatterClass;
function ConditionalFormatter() {
  if (ConditionalFormatterClass === VOID) {
    class $ {
      constructor(formatters) {
        this.d8d_1 = formatters;
      }
      x8c(obj, builder, minusNotRequired) {
        var _iterator__ex2g4s = this.d8d_1.x();
        while (_iterator__ex2g4s.y()) {
          var _destruct__k2r9zo = _iterator__ex2g4s.z();
          var condition = _destruct__k2r9zo.ch();
          var formatter = _destruct__k2r9zo.dh();
          if (condition(obj)) {
            formatter.x8c(obj, builder, minusNotRequired);
            return Unit_instance;
          }
        }
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'ConditionalFormatter', VOID, VOID, [FormatterStructure()]);
    ConditionalFormatterClass = $;
  }
  return ConditionalFormatterClass;
}
var ConcatenatedFormatterClass;
function ConcatenatedFormatter() {
  if (ConcatenatedFormatterClass === VOID) {
    class $ {
      constructor(formatters) {
        this.e8d_1 = formatters;
      }
      x8c(obj, builder, minusNotRequired) {
        var _iterator__ex2g4s = this.e8d_1.x();
        while (_iterator__ex2g4s.y()) {
          var formatter = _iterator__ex2g4s.z();
          formatter.x8c(obj, builder, minusNotRequired);
        }
      }
    }
    protoOf($).t82 = format$default;
    initMetadataForClass($, 'ConcatenatedFormatter', VOID, VOID, [FormatterStructure()]);
    ConcatenatedFormatterClass = $;
  }
  return ConcatenatedFormatterClass;
}
//region block: exports
export {
  format$default as format$default2wn8ht1tr5xi2,
  ConcatenatedFormatter as ConcatenatedFormattergumn65iplrh1,
  ConditionalFormatter as ConditionalFormatter2qfqdnibwbifo,
  FormatterStructure as FormatterStructure1ss012tmsg37r,
  SignedFormatter as SignedFormatter14cujr8xyyuqw,
  SpacePaddedFormatter as SpacePaddedFormatter1bbtqhbgrvf8v,
};
//endregion

//# sourceMappingURL=Formatter.mjs.map
