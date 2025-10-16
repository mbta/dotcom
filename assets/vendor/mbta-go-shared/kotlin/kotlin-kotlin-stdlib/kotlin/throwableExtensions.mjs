import {
  mutableListOf6oorvk2mtdmp as mutableListOf,
  emptyList1g2z5xcrvp2zy as emptyList,
} from './collections/CollectionsKt.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import {
  indexOfwa4w6635jewi as indexOf,
  lineSequencefj20mplblw0p as lineSequence,
  get_lastIndexld83bqhfgcdd as get_lastIndex,
} from './text/Strings.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from './js/charSequenceJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from './Char.mjs';
import { checkIndexOverflow3frtmheghr0th as checkIndexOverflow } from './collections/collectionJs.mjs';
import { dropLastlqc2oyv04br0 as dropLast } from './text/_Strings.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from './text/StringBuilderJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function addSuppressed(_this__u8e3s4, exception) {
  if (!(_this__u8e3s4 === exception)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var suppressed = _this__u8e3s4._suppressed;
    if (suppressed == null) {
      // Inline function 'kotlin.js.asDynamic' call
      _this__u8e3s4._suppressed = mutableListOf([exception]);
    } else {
      suppressed.i(exception);
    }
  }
}
function printStackTrace(_this__u8e3s4) {
  console.error(stackTraceToString(_this__u8e3s4));
}
function stackTraceToString(_this__u8e3s4) {
  return (new (ExceptionTraceBuilder())()).fl(_this__u8e3s4);
}
function hasSeen($this, exception) {
  var tmp0 = $this.cl_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.any' call
    var inductionVariable = 0;
    var last = tmp0.length;
    while (inductionVariable < last) {
      var element = tmp0[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (element === exception) {
        tmp$ret$1 = true;
        break $l$block;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function dumpFullTrace($this, _this__u8e3s4, indent, qualifier) {
  if (dumpSelfTrace($this, _this__u8e3s4, indent, qualifier))
    true;
  else
    return Unit_instance;
  var cause = _this__u8e3s4.cause;
  while (!(cause == null)) {
    if (dumpSelfTrace($this, cause, indent, 'Caused by: '))
      true;
    else
      return Unit_instance;
    cause = cause.cause;
  }
}
function dumpSelfTrace($this, _this__u8e3s4, indent, qualifier) {
  $this.bl_1.hc(indent).hc(qualifier);
  var shortInfo = _this__u8e3s4.toString();
  if (hasSeen($this, _this__u8e3s4)) {
    $this.bl_1.hc('[CIRCULAR REFERENCE, SEE ABOVE: ').hc(shortInfo).hc(']\n');
    return false;
  }
  // Inline function 'kotlin.js.asDynamic' call
  $this.cl_1.push(_this__u8e3s4);
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = _this__u8e3s4.stack;
  var stack = (tmp == null ? true : typeof tmp === 'string') ? tmp : THROW_CCE();
  if (!(stack == null)) {
    // Inline function 'kotlin.let' call
    var it = indexOf(stack, shortInfo);
    var stackStart = it < 0 ? 0 : it + shortInfo.length | 0;
    if (stackStart === 0) {
      $this.bl_1.hc(shortInfo).hc('\n');
    }
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = $this.dl_1;
    if (charSequenceLength(this_0) === 0) {
      $this.dl_1 = stack;
      $this.el_1 = stackStart;
    } else {
      stack = dropCommonFrames($this, stack, stackStart);
    }
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(indent) > 0) {
      var tmp_0;
      if (stackStart === 0) {
        tmp_0 = 0;
      } else {
        // Inline function 'kotlin.text.count' call
        var count = 0;
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(shortInfo)) {
          var element = charSequenceGet(shortInfo, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          if (element === _Char___init__impl__6a9atx(10)) {
            count = count + 1 | 0;
          }
        }
        tmp_0 = 1 + count | 0;
      }
      var messageLines = tmp_0;
      // Inline function 'kotlin.sequences.forEachIndexed' call
      var index = 0;
      var _iterator__ex2g4s = lineSequence(stack).x();
      while (_iterator__ex2g4s.y()) {
        var item = _iterator__ex2g4s.z();
        var _unary__edvuaz = index;
        index = _unary__edvuaz + 1 | 0;
        if (checkIndexOverflow(_unary__edvuaz) >= messageLines) {
          $this.bl_1.hc(indent);
        }
        $this.bl_1.hc(item).hc('\n');
      }
    } else {
      $this.bl_1.hc(stack).hc('\n');
    }
  } else {
    $this.bl_1.hc(shortInfo).hc('\n');
  }
  var suppressed = get_suppressedExceptions(_this__u8e3s4);
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!suppressed.h1()) {
    var suppressedIndent = indent + '    ';
    var _iterator__ex2g4s_0 = suppressed.x();
    while (_iterator__ex2g4s_0.y()) {
      var s = _iterator__ex2g4s_0.z();
      dumpFullTrace($this, s, suppressedIndent, 'Suppressed: ');
    }
  }
  return true;
}
function dropCommonFrames($this, stack, stackStart) {
  var commonFrames = 0;
  var lastBreak = 0;
  var preLastBreak = 0;
  var inductionVariable = 0;
  var tmp0 = $this.dl_1.length - $this.el_1 | 0;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = stack.length - stackStart | 0;
  var last = Math.min(tmp0, b);
  if (inductionVariable < last)
    $l$loop: do {
      var pos = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var c = charCodeAt(stack, get_lastIndex(stack) - pos | 0);
      if (!(c === charCodeAt($this.dl_1, get_lastIndex($this.dl_1) - pos | 0)))
        break $l$loop;
      if (c === _Char___init__impl__6a9atx(10)) {
        commonFrames = commonFrames + 1 | 0;
        preLastBreak = lastBreak;
        lastBreak = pos;
      }
    }
     while (inductionVariable < last);
  if (commonFrames <= 1)
    return stack;
  while (preLastBreak > 0 && charCodeAt(stack, get_lastIndex(stack) - (preLastBreak - 1 | 0) | 0) === _Char___init__impl__6a9atx(32))
    preLastBreak = preLastBreak - 1 | 0;
  return dropLast(stack, preLastBreak) + ('... and ' + (commonFrames - 1 | 0) + ' more common stack frames skipped');
}
var ExceptionTraceBuilderClass;
function ExceptionTraceBuilder() {
  if (ExceptionTraceBuilderClass === VOID) {
    class $ {
      constructor() {
        this.bl_1 = StringBuilder().f();
        var tmp = this;
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp.cl_1 = [];
        this.dl_1 = '';
        this.el_1 = 0;
      }
      fl(exception) {
        dumpFullTrace(this, exception, '', '');
        return this.bl_1.toString();
      }
    }
    initMetadataForClass($, 'ExceptionTraceBuilder', ExceptionTraceBuilder);
    ExceptionTraceBuilderClass = $;
  }
  return ExceptionTraceBuilderClass;
}
function get_suppressedExceptions(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_safe_receiver = _this__u8e3s4._suppressed;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = tmp0_safe_receiver;
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
}
//region block: exports
export {
  addSuppressed as addSuppressedu5jwjfvsc039,
  printStackTrace as printStackTrace18lnx7a39cni,
  stackTraceToString as stackTraceToString2670q6lbhdojj,
};
//endregion

//# sourceMappingURL=throwableExtensions.mjs.map
