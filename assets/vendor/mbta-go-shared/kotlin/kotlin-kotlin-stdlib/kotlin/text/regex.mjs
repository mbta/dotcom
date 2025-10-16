import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
} from '../js/coreRuntime.mjs';
import {
  toSet2orjxp16sotqu as toSet,
  joinToString1cxrrlmo0chqs as joinToString,
  asSequence2phdjljfh9jhx as asSequence,
} from '../collections/_Collections.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../collections/Sets.mjs';
import {
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  UnsupportedOperationException2tkumpmhredt3 as UnsupportedOperationException,
} from '../exceptions.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
} from '../js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
} from '../Char.mjs';
import {
  contains2el4s70rdq4ld as contains,
  get_lastIndexld83bqhfgcdd as get_lastIndex,
} from './Strings.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from './StringBuilderJs.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import { numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber } from '../js/rangeTo.mjs';
import { substringiqarkczpya5m as substring } from './stringJs.mjs';
import { toInt2q8uldh7sc951 as toInt } from './numberConversions.mjs';
import { MatchNamedGroupCollection2nkf1ok7z2wgd as MatchNamedGroupCollection } from './MatchResult.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from '../collections/AbstractCollection.mjs';
import { get_indices3txodfl5wuu5j as get_indices } from '../collections/CollectionsKt.mjs';
import { mapsbvh18eqox7a as map } from '../sequences/_Sequences.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.nj_1 = new RegExp('[\\\\^$*+?.()|[\\]{}]', 'g');
        this.oj_1 = new RegExp('[\\\\$]', 'g');
        this.pj_1 = new RegExp('\\$', 'g');
      }
      qj(literal) {
        // Inline function 'kotlin.text.nativeReplace' call
        var pattern = this.nj_1;
        // Inline function 'kotlin.js.asDynamic' call
        return literal.replace(pattern, '\\$&');
      }
      rj(literal) {
        // Inline function 'kotlin.text.nativeReplace' call
        var pattern = this.pj_1;
        // Inline function 'kotlin.js.asDynamic' call
        return literal.replace(pattern, '$$$$');
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
function Regex$replace$lambda($replacement) {
  return function (it) {
    return substituteGroupRefs(it, $replacement);
  };
}
var RegexClass;
function Regex() {
  if (RegexClass === VOID) {
    class $ {
      static xj(pattern, options) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.sj_1 = pattern;
        $this.tj_1 = toSet(options);
        $this.uj_1 = new RegExp(pattern, toFlags(options, 'gu'));
        $this.vj_1 = null;
        $this.wj_1 = null;
        return $this;
      }
      static yj(pattern) {
        Companion_getInstance();
        return this.xj(pattern, emptySet());
      }
      zj(input, startIndex) {
        if (startIndex < 0 || startIndex > charSequenceLength(input)) {
          throw IndexOutOfBoundsException().jg('Start index out of bounds: ' + startIndex + ', input length: ' + charSequenceLength(input));
        }
        return findNext(this.uj_1, toString(input), startIndex, this.uj_1);
      }
      ak(input, startIndex, $super) {
        startIndex = startIndex === VOID ? 0 : startIndex;
        return $super === VOID ? this.zj(input, startIndex) : $super.zj.call(this, input, startIndex);
      }
      bk(input, replacement) {
        if (!contains(replacement, _Char___init__impl__6a9atx(92)) && !contains(replacement, _Char___init__impl__6a9atx(36))) {
          var tmp0 = toString(input);
          // Inline function 'kotlin.text.nativeReplace' call
          var pattern = this.uj_1;
          // Inline function 'kotlin.js.asDynamic' call
          return tmp0.replace(pattern, replacement);
        }
        return this.ck(input, Regex$replace$lambda(replacement));
      }
      ck(input, transform) {
        var match = this.ak(input);
        if (match == null)
          return toString(input);
        var lastStart = 0;
        var length = charSequenceLength(input);
        var sb = StringBuilder().kc(length);
        do {
          var foundMatch = ensureNotNull(match);
          sb.bj(input, lastStart, foundMatch.dk().hk());
          sb.v(transform(foundMatch));
          lastStart = foundMatch.dk().ik() + 1 | 0;
          match = foundMatch.z();
        }
         while (lastStart < length && !(match == null));
        if (lastStart < length) {
          sb.bj(input, lastStart, length);
        }
        return sb.toString();
      }
      toString() {
        return this.uj_1.toString();
      }
    }
    initMetadataForClass($, 'Regex');
    RegexClass = $;
  }
  return RegexClass;
}
var MatchGroupClass;
function MatchGroup() {
  if (MatchGroupClass === VOID) {
    class $ {
      constructor(value) {
        this.jk_1 = value;
      }
      toString() {
        return 'MatchGroup(value=' + this.jk_1 + ')';
      }
      hashCode() {
        return getStringHashCode(this.jk_1);
      }
      equals(other) {
        if (this === other)
          return true;
        if (!(other instanceof MatchGroup()))
          return false;
        var tmp0_other_with_cast = other instanceof MatchGroup() ? other : THROW_CCE();
        if (!(this.jk_1 === tmp0_other_with_cast.jk_1))
          return false;
        return true;
      }
    }
    initMetadataForClass($, 'MatchGroup');
    MatchGroupClass = $;
  }
  return MatchGroupClass;
}
function toFlags(_this__u8e3s4, prepend) {
  return joinToString(_this__u8e3s4, '', prepend, VOID, VOID, VOID, toFlags$lambda);
}
function findNext(_this__u8e3s4, input, from, nextPattern) {
  _this__u8e3s4.lastIndex = from;
  var match = _this__u8e3s4.exec(input);
  if (match == null)
    return null;
  var range = numberRangeToNumber(match.index, _this__u8e3s4.lastIndex - 1 | 0);
  return new (findNext$1())(range, match, nextPattern, input);
}
function substituteGroupRefs(match, replacement) {
  var index = 0;
  var result = StringBuilder().f();
  while (index < replacement.length) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var char = charCodeAt(replacement, _unary__edvuaz);
    if (char === _Char___init__impl__6a9atx(92)) {
      if (index === replacement.length)
        throw IllegalArgumentException().q('The Char to be escaped is missing');
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      result.ic(charCodeAt(replacement, _unary__edvuaz_0));
    } else if (char === _Char___init__impl__6a9atx(36)) {
      if (index === replacement.length)
        throw IllegalArgumentException().q('Capturing group index is missing');
      if (charCodeAt(replacement, index) === _Char___init__impl__6a9atx(123)) {
        index = index + 1 | 0;
        var endIndex = readGroupName(replacement, index);
        if (index === endIndex)
          throw IllegalArgumentException().q('Named capturing group reference should have a non-empty name');
        if (endIndex === replacement.length || !(charCodeAt(replacement, endIndex) === _Char___init__impl__6a9atx(125)))
          throw IllegalArgumentException().q("Named capturing group reference is missing trailing '}'");
        var groupName = substring(replacement, index, endIndex);
        var tmp0_safe_receiver = get(match.kk(), groupName);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.jk_1;
        result.hc(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        index = endIndex + 1 | 0;
      } else {
        var containsArg = charCodeAt(replacement, index);
        if (!(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false))
          throw IllegalArgumentException().q('Invalid capturing group reference');
        var groups = match.kk();
        var endIndex_0 = readGroupIndex(replacement, index, groups.c1());
        var groupIndex = toInt(substring(replacement, index, endIndex_0));
        if (groupIndex >= groups.c1())
          throw IndexOutOfBoundsException().jg('Group with index ' + groupIndex + ' does not exist');
        var tmp2_safe_receiver = groups.e1(groupIndex);
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.jk_1;
        result.hc(tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs);
        index = endIndex_0;
      }
    } else {
      result.ic(char);
    }
  }
  return result.toString();
}
function readGroupName(_this__u8e3s4, startIndex) {
  var index = startIndex;
  $l$loop: while (index < _this__u8e3s4.length) {
    if (charCodeAt(_this__u8e3s4, index) === _Char___init__impl__6a9atx(125)) {
      break $l$loop;
    } else {
      index = index + 1 | 0;
    }
  }
  return index;
}
function get(_this__u8e3s4, name) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, MatchNamedGroupCollection()) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw UnsupportedOperationException().f6('Retrieving groups by name is not supported on this platform.');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var namedGroups = tmp;
  return namedGroups.lk(name);
}
function readGroupIndex(_this__u8e3s4, startIndex, groupCount) {
  var index = startIndex + 1 | 0;
  var groupIndex = Char__minus_impl_a2frrh(charCodeAt(_this__u8e3s4, startIndex), _Char___init__impl__6a9atx(48));
  $l$loop_0: while (true) {
    var tmp;
    if (index < _this__u8e3s4.length) {
      var containsArg = charCodeAt(_this__u8e3s4, index);
      tmp = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
    } else {
      tmp = false;
    }
    if (!tmp) {
      break $l$loop_0;
    }
    var newGroupIndex = imul(groupIndex, 10) + Char__minus_impl_a2frrh(charCodeAt(_this__u8e3s4, index), _Char___init__impl__6a9atx(48)) | 0;
    if (0 <= newGroupIndex ? newGroupIndex < groupCount : false) {
      groupIndex = newGroupIndex;
      index = index + 1 | 0;
    } else {
      break $l$loop_0;
    }
  }
  return index;
}
function toFlags$lambda(it) {
  return it.ok_1;
}
function findNext$o$groups$o$iterator$lambda(this$0) {
  return function (it) {
    return this$0.e1(it);
  };
}
function hasOwnPrototypeProperty($this, o, name) {
  // Inline function 'kotlin.js.unsafeCast' call
  return Object.prototype.hasOwnProperty.call(o, name);
}
function advanceToNextCharacter($this, index) {
  if (index < get_lastIndex($this.xk_1)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var code1 = $this.xk_1.charCodeAt(index);
    if (55296 <= code1 ? code1 <= 56319 : false) {
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var code2 = $this.xk_1.charCodeAt(index + 1 | 0);
      if (56320 <= code2 ? code2 <= 57343 : false) {
        return index + 2 | 0;
      }
    }
  }
  return index + 1 | 0;
}
var findNext$1$groups$1Class;
function findNext$1$groups$1() {
  if (findNext$1$groups$1Class === VOID) {
    class $ extends AbstractCollection() {
      static yk($match, this$0, $box) {
        if ($box === VOID)
          $box = {};
        $box.pk_1 = $match;
        $box.qk_1 = this$0;
        return this.x6($box);
      }
      c1() {
        return this.pk_1.length;
      }
      x() {
        var tmp = asSequence(get_indices(this));
        return map(tmp, findNext$o$groups$o$iterator$lambda(this)).x();
      }
      e1(index) {
        // Inline function 'kotlin.js.get' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp0_safe_receiver = this.pk_1[index];
        var tmp;
        if (tmp0_safe_receiver == null) {
          tmp = null;
        } else {
          // Inline function 'kotlin.let' call
          tmp = new (MatchGroup())(tmp0_safe_receiver);
        }
        return tmp;
      }
      lk(name) {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp0_elvis_lhs = this.pk_1.groups;
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw IllegalArgumentException().q('Capturing group with name {' + name + '} does not exist. No named capturing group was defined in Regex');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var groups = tmp;
        if (!hasOwnPrototypeProperty(this.qk_1, groups, name))
          throw IllegalArgumentException().q('Capturing group with name {' + name + '} does not exist');
        var value = groups[name];
        var tmp_0;
        if (value == undefined) {
          tmp_0 = null;
        } else {
          tmp_0 = new (MatchGroup())((!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
        }
        return tmp_0;
      }
    }
    initMetadataForClass($, VOID, VOID, VOID, [MatchNamedGroupCollection(), AbstractCollection()]);
    findNext$1$groups$1Class = $;
  }
  return findNext$1$groups$1Class;
}
var findNext$1Class;
function findNext$1() {
  if (findNext$1Class === VOID) {
    class $ {
      constructor($range, $match, $nextPattern, $input) {
        this.uk_1 = $range;
        this.vk_1 = $match;
        this.wk_1 = $nextPattern;
        this.xk_1 = $input;
        this.rk_1 = $range;
        var tmp = this;
        tmp.sk_1 = findNext$1$groups$1().yk($match, this);
        this.tk_1 = null;
      }
      dk() {
        return this.rk_1;
      }
      kk() {
        return this.sk_1;
      }
      z() {
        return findNext(this.wk_1, this.xk_1, this.uk_1.h1() ? advanceToNextCharacter(this, this.uk_1.hk()) : this.uk_1.ik() + 1 | 0, this.wk_1);
      }
    }
    initMetadataForClass($);
    findNext$1Class = $;
  }
  return findNext$1Class;
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstanceduyatss8wab7,
  Regex as Regexxgw0gjiagf4z,
};
//endregion

//# sourceMappingURL=regex.mjs.map
