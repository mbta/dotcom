import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../js/charSequenceJs.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from './StringBuilderJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
} from '../Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { isLettere1qnx5bysxbd as isLetter } from './charJs.mjs';
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
        this.au_1 = new (BytesHexFormat())(2147483647, 2147483647, '  ', '', '', '');
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
var CompanionClass_0;
function Companion_0() {
  if (CompanionClass_0 === VOID) {
    class $ {
      constructor() {
        Companion_instance_0 = this;
        this.bu_1 = new (NumberHexFormat())('', '', false, 1);
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
var BytesHexFormatClass;
function BytesHexFormat() {
  if (BytesHexFormatClass === VOID) {
    class $ {
      constructor(bytesPerLine, bytesPerGroup, groupSeparator, byteSeparator, bytePrefix, byteSuffix) {
        Companion_getInstance();
        this.cu_1 = bytesPerLine;
        this.du_1 = bytesPerGroup;
        this.eu_1 = groupSeparator;
        this.fu_1 = byteSeparator;
        this.gu_1 = bytePrefix;
        this.hu_1 = byteSuffix;
        this.iu_1 = (this.cu_1 === 2147483647 && this.du_1 === 2147483647);
        var tmp = this;
        var tmp_0;
        var tmp_1;
        // Inline function 'kotlin.text.isEmpty' call
        var this_0 = this.gu_1;
        if (charSequenceLength(this_0) === 0) {
          // Inline function 'kotlin.text.isEmpty' call
          var this_1 = this.hu_1;
          tmp_1 = charSequenceLength(this_1) === 0;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp_0 = this.fu_1.length <= 1;
        } else {
          tmp_0 = false;
        }
        tmp.ju_1 = tmp_0;
        this.ku_1 = isCaseSensitive(this.eu_1) || isCaseSensitive(this.fu_1) || isCaseSensitive(this.gu_1) || isCaseSensitive(this.hu_1);
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('BytesHexFormat(').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this.lu(this_0, '    ').ic(_Char___init__impl__6a9atx(10));
        this_0.hc(')');
        return this_0.toString();
      }
      lu(sb, indent) {
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('bytesPerLine = ').ej(this.cu_1).hc(',').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('bytesPerGroup = ').ej(this.du_1).hc(',').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('groupSeparator = "').hc(this.eu_1).hc('",').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('byteSeparator = "').hc(this.fu_1).hc('",').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('bytePrefix = "').hc(this.gu_1).hc('",').ic(_Char___init__impl__6a9atx(10));
        sb.hc(indent).hc('byteSuffix = "').hc(this.hu_1).hc('"');
        return sb;
      }
    }
    initMetadataForClass($, 'BytesHexFormat');
    BytesHexFormatClass = $;
  }
  return BytesHexFormatClass;
}
var NumberHexFormatClass;
function NumberHexFormat() {
  if (NumberHexFormatClass === VOID) {
    class $ {
      constructor(prefix, suffix, removeLeadingZeros, minLength) {
        Companion_getInstance_0();
        this.tt_1 = prefix;
        this.ut_1 = suffix;
        this.vt_1 = removeLeadingZeros;
        this.wt_1 = minLength;
        var tmp = this;
        var tmp_0;
        // Inline function 'kotlin.text.isEmpty' call
        var this_0 = this.tt_1;
        if (charSequenceLength(this_0) === 0) {
          // Inline function 'kotlin.text.isEmpty' call
          var this_1 = this.ut_1;
          tmp_0 = charSequenceLength(this_1) === 0;
        } else {
          tmp_0 = false;
        }
        tmp.xt_1 = tmp_0;
        this.yt_1 = (this.xt_1 && this.wt_1 === 1);
        this.zt_1 = isCaseSensitive(this.tt_1) || isCaseSensitive(this.ut_1);
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('NumberHexFormat(').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this.lu(this_0, '    ').ic(_Char___init__impl__6a9atx(10));
        this_0.hc(')');
        return this_0.toString();
      }
      lu(sb, indent) {
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('prefix = "').hc(this.tt_1).hc('",').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        sb.hc(indent).hc('suffix = "').hc(this.ut_1).hc('",').ic(_Char___init__impl__6a9atx(10));
        var tmp0 = sb.hc(indent).hc('removeLeadingZeros = ').dj(this.vt_1);
        // Inline function 'kotlin.text.appendLine' call
        var value = _Char___init__impl__6a9atx(44);
        // Inline function 'kotlin.text.appendLine' call
        tmp0.ic(value).ic(_Char___init__impl__6a9atx(10));
        sb.hc(indent).hc('minLength = ').ej(this.wt_1);
        return sb;
      }
    }
    initMetadataForClass($, 'NumberHexFormat');
    NumberHexFormatClass = $;
  }
  return NumberHexFormatClass;
}
var CompanionClass_1;
function Companion_1() {
  if (CompanionClass_1 === VOID) {
    class $ {
      constructor() {
        Companion_instance_1 = this;
        this.ot_1 = new (HexFormat())(false, Companion_getInstance().au_1, Companion_getInstance_0().bu_1);
        this.pt_1 = new (HexFormat())(true, Companion_getInstance().au_1, Companion_getInstance_0().bu_1);
      }
    }
    initMetadataForCompanion($);
    CompanionClass_1 = $;
  }
  return CompanionClass_1;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 === VOID)
    new (Companion_1())();
  return Companion_instance_1;
}
var HexFormatClass;
function HexFormat() {
  if (HexFormatClass === VOID) {
    class $ {
      constructor(upperCase, bytes, number) {
        Companion_getInstance_1();
        this.qt_1 = upperCase;
        this.rt_1 = bytes;
        this.st_1 = number;
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('HexFormat(').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('    upperCase = ').dj(this.qt_1).hc(',').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('    bytes = BytesHexFormat(').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this.rt_1.lu(this_0, '        ').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('    ),').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('    number = NumberHexFormat(').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this.st_1.lu(this_0, '        ').ic(_Char___init__impl__6a9atx(10));
        // Inline function 'kotlin.text.appendLine' call
        this_0.hc('    )').ic(_Char___init__impl__6a9atx(10));
        this_0.hc(')');
        return this_0.toString();
      }
    }
    initMetadataForClass($, 'HexFormat');
    HexFormatClass = $;
  }
  return HexFormatClass;
}
function isCaseSensitive(_this__u8e3s4) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.any' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (Char__compareTo_impl_ypi4mb(element, _Char___init__impl__6a9atx(128)) >= 0 || isLetter(element)) {
        tmp$ret$1 = true;
        break $l$block;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
//region block: exports
export {
  Companion_getInstance_1 as Companion_getInstance2zux61tby3qbv,
};
//endregion

//# sourceMappingURL=HexFormat.mjs.map
