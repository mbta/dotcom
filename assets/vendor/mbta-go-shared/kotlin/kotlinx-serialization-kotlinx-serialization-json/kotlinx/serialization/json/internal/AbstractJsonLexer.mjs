import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  toString3o7ifthqydp6e as toString,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  numberToChar93r9buh19yek as numberToChar,
  toLongw1zpgk99d84b as toLong,
  numberToLong1a4cndvg6c52s as numberToLong,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { JsonPath2hoqh4ysli693 as JsonPath } from './JsonPath.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString1pkumu07cwy4m as toString_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  JsonDecodingException1p97qvfqhd5n3 as JsonDecodingException,
  JsonDecodingException278mackfi1uuk as JsonDecodingException_0,
  minify1kh64osmcox7j as minify,
} from './JsonExceptions.mjs';
import { last1vo29oleiqj36 as last } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { removeLast3759euu1xvfa3 as removeLast } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/MutableCollections.mjs';
import { lastIndexOf2d52xhix5ymjr as lastIndexOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { charArray2ujmm1qusno00 as charArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/arrays.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function appendEscape($this, lastPosition, current) {
  $this.t1w(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.t1w(lastPosition, currentPosition);
  var result = $this.u1l_1.toString();
  $this.u1l_1.jj(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.t1l_1);
  $this.t1l_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.u1w(), $this.r1l_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.v1w(currentPosition);
  if (currentPosition === -1) {
    $this.j1q('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.u1w();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.u1w(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.j1q("Invalid escaped char '" + toString(currentChar) + "'");
  }
  $this.u1l_1.ic(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.r1l_1 = startPos;
    $this.w1w();
    if (($this.r1l_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.j1q('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.r1l_1);
  }
  $this.u1l_1.ic(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
  return startPos + 4 | 0;
}
function fromHexChar($this, source, currentPosition) {
  var character = charSequenceGet(source, currentPosition);
  var tmp;
  if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
    // Inline function 'kotlin.code' call
    var tmp_0 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(48);
    tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
  } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
    // Inline function 'kotlin.code' call
    var tmp_1 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(97);
    tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
  } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
    // Inline function 'kotlin.code' call
    var tmp_2 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(65);
    tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
  } else {
    $this.j1q("Invalid toHexChar char '" + toString(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.v1w(start);
  if (current >= charSequenceLength($this.u1w()) || current === -1) {
    $this.j1q('EOF');
  }
  var tmp = $this.u1w();
  var _unary__edvuaz = current;
  current = _unary__edvuaz + 1 | 0;
  // Inline function 'kotlin.code' call
  var this_0 = charSequenceGet(tmp, _unary__edvuaz);
  var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
  var tmp_0;
  // Inline function 'kotlin.code' call
  var this_1 = _Char___init__impl__6a9atx(116);
  if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
    consumeBooleanLiteral($this, 'rue', current);
    tmp_0 = true;
  } else {
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(102);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
      consumeBooleanLiteral($this, 'alse', current);
      tmp_0 = false;
    } else {
      $this.j1q("Expected valid boolean literal prefix, but had '" + $this.f1s() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.u1w()) - current | 0) < literalSuffix.length) {
    $this.j1q('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.u1w(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.j1q("Expected valid boolean literal prefix, but had '" + $this.f1s() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.r1l_1 = current + literalSuffix.length | 0;
}
function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
  var tmp;
  switch (isExponentPositive) {
    case false:
      // Inline function 'kotlin.math.pow' call

      var x = -exponentAccumulator.y4();
      tmp = Math.pow(10.0, x);
      break;
    case true:
      // Inline function 'kotlin.math.pow' call

      var x_0 = exponentAccumulator.y4();
      tmp = Math.pow(10.0, x_0);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
var AbstractJsonLexerClass;
function AbstractJsonLexer() {
  if (AbstractJsonLexerClass === VOID) {
    class $ {
      constructor() {
        this.r1l_1 = 0;
        this.s1l_1 = new (JsonPath())();
        this.t1l_1 = null;
        this.u1l_1 = StringBuilder().f();
      }
      w1w() {
      }
      r1t() {
        var current = this.x1w();
        var source = this.u1w();
        if (current >= charSequenceLength(source) || current === -1)
          return false;
        if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
          this.r1l_1 = this.r1l_1 + 1 | 0;
          return true;
        }
        return false;
      }
      y1w(c) {
        return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
      }
      v1l() {
        var nextToken = this.h1s();
        if (!(nextToken === 10)) {
          this.j1q('Expected EOF after parsing, but had ' + toString(charSequenceGet(this.u1w(), this.r1l_1 - 1 | 0)) + ' instead');
        }
      }
      b1s(expected) {
        var token = this.h1s();
        if (!(token === expected)) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
          var expected_0 = tokenDescription(expected);
          var position = true ? this.r1l_1 - 1 | 0 : this.r1l_1;
          var s = this.r1l_1 === charSequenceLength(this.u1w()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.u1w(), position));
          var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
          this.j1q(tmp$ret$0, position);
        }
        return token;
      }
      z1w(expected) {
        if (this.r1l_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
          var tmp$ret$1;
          $l$block: {
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
            var snapshot = this.r1l_1;
            try {
              this.r1l_1 = this.r1l_1 - 1 | 0;
              tmp$ret$1 = this.f1s();
              break $l$block;
            }finally {
              this.r1l_1 = snapshot;
            }
          }
          var inputLiteral = tmp$ret$1;
          if (inputLiteral === 'null') {
            this.i1q("Expected string literal but 'null' literal was found", this.r1l_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
          }
        }
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
        var expectedToken = charToTokenClass(expected);
        var expected_0 = tokenDescription(expectedToken);
        var position = true ? this.r1l_1 - 1 | 0 : this.r1l_1;
        var s = this.r1l_1 === charSequenceLength(this.u1w()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.u1w(), position));
        var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
        this.j1q(tmp$ret$2, position);
      }
      c1s() {
        var source = this.u1w();
        var cpos = this.r1l_1;
        $l$loop_0: while (true) {
          cpos = this.v1w(cpos);
          if (cpos === -1)
            break $l$loop_0;
          var ch = charSequenceGet(source, cpos);
          if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
            cpos = cpos + 1 | 0;
            continue $l$loop_0;
          }
          this.r1l_1 = cpos;
          return charToTokenClass(ch);
        }
        this.r1l_1 = cpos;
        return 10;
      }
      s1t(doConsume) {
        var current = this.x1w();
        current = this.v1w(current);
        var len = charSequenceLength(this.u1w()) - current | 0;
        if (len < 4 || current === -1)
          return false;
        var inductionVariable = 0;
        if (inductionVariable <= 3)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!(charCodeAt('null', i) === charSequenceGet(this.u1w(), current + i | 0)))
              return false;
          }
           while (inductionVariable <= 3);
        if (len > 4 && charToTokenClass(charSequenceGet(this.u1w(), current + 4 | 0)) === 0)
          return false;
        if (doConsume) {
          this.r1l_1 = current + 4 | 0;
        }
        return true;
      }
      d1u(doConsume, $super) {
        doConsume = doConsume === VOID ? true : doConsume;
        return $super === VOID ? this.s1t(doConsume) : $super.s1t.call(this, doConsume);
      }
      t1t(isLenient) {
        var token = this.c1s();
        var tmp;
        if (isLenient) {
          if (!(token === 1) && !(token === 0))
            return null;
          tmp = this.f1s();
        } else {
          if (!(token === 1))
            return null;
          tmp = this.e1s();
        }
        var string = tmp;
        this.t1l_1 = string;
        return string;
      }
      a1x() {
        this.t1l_1 = null;
      }
      b1x(startPos, endPos) {
        // Inline function 'kotlin.text.substring' call
        var this_0 = this.u1w();
        return toString_0(charSequenceSubSequence(this_0, startPos, endPos));
      }
      e1s() {
        if (!(this.t1l_1 == null)) {
          return takePeeked(this);
        }
        return this.w1t();
      }
      consumeString2(source, startPosition, current) {
        var currentPosition = current;
        var lastPosition = startPosition;
        var char = charSequenceGet(source, currentPosition);
        var usedAppend = false;
        while (!(char === _Char___init__impl__6a9atx(34))) {
          if (char === _Char___init__impl__6a9atx(92)) {
            usedAppend = true;
            currentPosition = this.v1w(appendEscape(this, lastPosition, currentPosition));
            if (currentPosition === -1) {
              this.j1q('Unexpected EOF', currentPosition);
            }
            lastPosition = currentPosition;
          } else {
            currentPosition = currentPosition + 1 | 0;
            if (currentPosition >= charSequenceLength(source)) {
              usedAppend = true;
              this.t1w(lastPosition, currentPosition);
              currentPosition = this.v1w(currentPosition);
              if (currentPosition === -1) {
                this.j1q('Unexpected EOF', currentPosition);
              }
              lastPosition = currentPosition;
            }
          }
          char = charSequenceGet(source, currentPosition);
        }
        var tmp;
        if (!usedAppend) {
          tmp = this.b1x(lastPosition, currentPosition);
        } else {
          tmp = decodedString(this, lastPosition, currentPosition);
        }
        var string = tmp;
        this.r1l_1 = currentPosition + 1 | 0;
        return string;
      }
      x1t() {
        var result = this.f1s();
        if (result === 'null' && wasUnquotedString(this)) {
          this.j1q("Unexpected 'null' value instead of string literal");
        }
        return result;
      }
      f1s() {
        if (!(this.t1l_1 == null)) {
          return takePeeked(this);
        }
        var current = this.x1w();
        if (current >= charSequenceLength(this.u1w()) || current === -1) {
          this.j1q('EOF', current);
        }
        var token = charToTokenClass(charSequenceGet(this.u1w(), current));
        if (token === 1) {
          return this.e1s();
        }
        if (!(token === 0)) {
          this.j1q('Expected beginning of the string, but got ' + toString(charSequenceGet(this.u1w(), current)));
        }
        var usedAppend = false;
        while (charToTokenClass(charSequenceGet(this.u1w(), current)) === 0) {
          current = current + 1 | 0;
          if (current >= charSequenceLength(this.u1w())) {
            usedAppend = true;
            this.t1w(this.r1l_1, current);
            var eof = this.v1w(current);
            if (eof === -1) {
              this.r1l_1 = current;
              return decodedString(this, 0, 0);
            } else {
              current = eof;
            }
          }
        }
        var tmp;
        if (!usedAppend) {
          tmp = this.b1x(this.r1l_1, current);
        } else {
          tmp = decodedString(this, this.r1l_1, current);
        }
        var result = tmp;
        this.r1l_1 = current;
        return result;
      }
      t1w(fromIndex, toIndex) {
        this.u1l_1.bj(this.u1w(), fromIndex, toIndex);
      }
      v1t(allowLenientStrings) {
        // Inline function 'kotlin.collections.mutableListOf' call
        var tokenStack = ArrayList().g1();
        var lastToken = this.c1s();
        if (!(lastToken === 8) && !(lastToken === 6)) {
          this.f1s();
          return Unit_instance;
        }
        $l$loop: while (true) {
          lastToken = this.c1s();
          if (lastToken === 1) {
            if (allowLenientStrings)
              this.f1s();
            else
              this.w1t();
            continue $l$loop;
          }
          var tmp0_subject = lastToken;
          if (tmp0_subject === 8 || tmp0_subject === 6) {
            tokenStack.i(lastToken);
          } else if (tmp0_subject === 9) {
            if (!(last(tokenStack) === 8))
              throw JsonDecodingException(this.r1l_1, 'found ] instead of } at path: ' + this.s1l_1.toString(), this.u1w());
            removeLast(tokenStack);
          } else if (tmp0_subject === 7) {
            if (!(last(tokenStack) === 6))
              throw JsonDecodingException(this.r1l_1, 'found } instead of ] at path: ' + this.s1l_1.toString(), this.u1w());
            removeLast(tokenStack);
          } else if (tmp0_subject === 10) {
            this.j1q('Unexpected end of input due to malformed JSON during ignoring unknown keys');
          }
          this.h1s();
          if (tokenStack.c1() === 0)
            return Unit_instance;
        }
      }
      toString() {
        return "JsonReader(source='" + toString_0(this.u1w()) + "', currentPosition=" + this.r1l_1 + ')';
      }
      u1t(key) {
        var processed = this.b1x(0, this.r1l_1);
        var lastIndexOf_0 = lastIndexOf(processed, key);
        throw JsonDecodingException_0().v1o("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.s1l_1.j1r() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString_0(minify(this.u1w(), lastIndexOf_0))));
      }
      i1q(message, position, hint) {
        var tmp;
        // Inline function 'kotlin.text.isEmpty' call
        if (charSequenceLength(hint) === 0) {
          tmp = '';
        } else {
          tmp = '\n' + hint;
        }
        var hintMessage = tmp;
        throw JsonDecodingException(position, message + ' at path: ' + this.s1l_1.j1r() + hintMessage, this.u1w());
      }
      j1q(message, position, hint, $super) {
        position = position === VOID ? this.r1l_1 : position;
        hint = hint === VOID ? '' : hint;
        return $super === VOID ? this.i1q(message, position, hint) : $super.i1q.call(this, message, position, hint);
      }
      f1u() {
        var current = this.x1w();
        current = this.v1w(current);
        if (current >= charSequenceLength(this.u1w()) || current === -1) {
          this.j1q('EOF');
        }
        var tmp;
        if (charSequenceGet(this.u1w(), current) === _Char___init__impl__6a9atx(34)) {
          current = current + 1 | 0;
          if (current === charSequenceLength(this.u1w())) {
            this.j1q('EOF');
          }
          tmp = true;
        } else {
          tmp = false;
        }
        var hasQuotation = tmp;
        var accumulator = new (Long())(0, 0);
        var exponentAccumulator = new (Long())(0, 0);
        var isNegative = false;
        var isExponentPositive = false;
        var hasExponent = false;
        var start = current;
        $l$loop_4: while (!(current === charSequenceLength(this.u1w()))) {
          var ch = charSequenceGet(this.u1w(), current);
          if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
            if (current === start) {
              this.j1q('Unexpected symbol ' + toString(ch) + ' in numeric literal');
            }
            isExponentPositive = true;
            hasExponent = true;
            current = current + 1 | 0;
            continue $l$loop_4;
          }
          if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
            if (current === start) {
              this.j1q("Unexpected symbol '-' in numeric literal");
            }
            isExponentPositive = false;
            current = current + 1 | 0;
            continue $l$loop_4;
          }
          if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
            if (current === start) {
              this.j1q("Unexpected symbol '+' in numeric literal");
            }
            isExponentPositive = true;
            current = current + 1 | 0;
            continue $l$loop_4;
          }
          if (ch === _Char___init__impl__6a9atx(45)) {
            if (!(current === start)) {
              this.j1q("Unexpected symbol '-' in numeric literal");
            }
            isNegative = true;
            current = current + 1 | 0;
            continue $l$loop_4;
          }
          var token = charToTokenClass(ch);
          if (!(token === 0))
            break $l$loop_4;
          current = current + 1 | 0;
          var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
          if (!(0 <= digit ? digit <= 9 : false)) {
            this.j1q("Unexpected symbol '" + toString(ch) + "' in numeric literal");
          }
          if (hasExponent) {
            // Inline function 'kotlin.Long.times' call
            // Inline function 'kotlin.Long.plus' call
            exponentAccumulator = exponentAccumulator.h4(toLong(10)).f4(toLong(digit));
            continue $l$loop_4;
          }
          // Inline function 'kotlin.Long.times' call
          // Inline function 'kotlin.Long.minus' call
          accumulator = accumulator.h4(toLong(10)).g4(toLong(digit));
          if (accumulator.d2(new (Long())(0, 0)) > 0) {
            this.j1q('Numeric value overflow');
          }
        }
        var hasChars = !(current === start);
        if (start === current || (isNegative && start === (current - 1 | 0))) {
          this.j1q('Expected numeric literal');
        }
        if (hasQuotation) {
          if (!hasChars) {
            this.j1q('EOF');
          }
          if (!(charSequenceGet(this.u1w(), current) === _Char___init__impl__6a9atx(34))) {
            this.j1q('Expected closing quotation mark');
          }
          current = current + 1 | 0;
        }
        this.r1l_1 = current;
        if (hasExponent) {
          var doubleAccumulator = accumulator.y4() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
          if (doubleAccumulator > (new (Long())(-1, 2147483647)).y4() || doubleAccumulator < (new (Long())(0, -2147483648)).y4()) {
            this.j1q('Numeric value overflow');
          }
          // Inline function 'kotlin.math.floor' call
          if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
            this.j1q("Can't convert " + doubleAccumulator + ' to Long');
          }
          accumulator = numberToLong(doubleAccumulator);
        }
        var tmp_0;
        if (isNegative) {
          tmp_0 = accumulator;
        } else if (!accumulator.equals(new (Long())(0, -2147483648))) {
          tmp_0 = accumulator.m4();
        } else {
          this.j1q('Numeric value overflow');
        }
        return tmp_0;
      }
      v1n() {
        var result = this.f1u();
        var next = this.h1s();
        if (!(next === 10)) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
          var expected = tokenDescription(10);
          var position = true ? this.r1l_1 - 1 | 0 : this.r1l_1;
          var s = this.r1l_1 === charSequenceLength(this.u1w()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.u1w(), position));
          var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
          this.j1q(tmp$ret$0, position);
        }
        return result;
      }
      e1u() {
        var current = this.x1w();
        if (current === charSequenceLength(this.u1w())) {
          this.j1q('EOF');
        }
        var tmp;
        if (charSequenceGet(this.u1w(), current) === _Char___init__impl__6a9atx(34)) {
          current = current + 1 | 0;
          tmp = true;
        } else {
          tmp = false;
        }
        var hasQuotation = tmp;
        var result = consumeBoolean2(this, current);
        if (hasQuotation) {
          if (this.r1l_1 === charSequenceLength(this.u1w())) {
            this.j1q('EOF');
          }
          if (!(charSequenceGet(this.u1w(), this.r1l_1) === _Char___init__impl__6a9atx(34))) {
            this.j1q('Expected closing quotation mark');
          }
          this.r1l_1 = this.r1l_1 + 1 | 0;
        }
        return result;
      }
    }
    initMetadataForClass($, 'AbstractJsonLexer');
    AbstractJsonLexerClass = $;
  }
  return AbstractJsonLexerClass;
}
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().d1x_1;
    // Inline function 'kotlin.code' call
    tmp = tmp_0[Char__toInt_impl_vasixd(c)];
  } else {
    tmp = 0;
  }
  return tmp;
}
function tokenDescription(token) {
  return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
}
function escapeToChar(c) {
  return c < 117 ? CharMappings_getInstance().c1x_1[c] : _Char___init__impl__6a9atx(0);
}
function initEscape($this) {
  var inductionVariable = 0;
  if (inductionVariable <= 31)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      initC2ESC($this, i, _Char___init__impl__6a9atx(117));
    }
     while (inductionVariable <= 31);
  initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
  initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
  initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
  initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
  initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
  initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
  initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
  initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
}
function initCharToToken($this) {
  var inductionVariable = 0;
  if (inductionVariable <= 32)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      initC2TC($this, i, 127);
    }
     while (inductionVariable <= 32);
  initC2TC($this, 9, 3);
  initC2TC($this, 10, 3);
  initC2TC($this, 13, 3);
  initC2TC($this, 32, 3);
  initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
  initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
  initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
  initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
  initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
  initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
  initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
  initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
}
function initC2ESC($this, c, esc) {
  if (!(esc === _Char___init__impl__6a9atx(117))) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
    $this.c1x_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.d1x_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
var CharMappingsClass;
function CharMappings() {
  if (CharMappingsClass === VOID) {
    class $ {
      constructor() {
        CharMappings_instance = this;
        this.c1x_1 = charArray(117);
        this.d1x_1 = new Int8Array(126);
        initEscape(this);
        initCharToToken(this);
      }
    }
    initMetadataForObject($, 'CharMappings');
    CharMappingsClass = $;
  }
  return CharMappingsClass;
}
var CharMappings_instance;
function CharMappings_getInstance() {
  if (CharMappings_instance === VOID)
    new (CharMappings())();
  return CharMappings_instance;
}
//region block: exports
export {
  AbstractJsonLexer as AbstractJsonLexer1em5xl1wqsdtw,
  charToTokenClass as charToTokenClass1wja4xge82waq,
  tokenDescription as tokenDescription3r6eqmtoxe76u,
};
//endregion

//# sourceMappingURL=AbstractJsonLexer.mjs.map
