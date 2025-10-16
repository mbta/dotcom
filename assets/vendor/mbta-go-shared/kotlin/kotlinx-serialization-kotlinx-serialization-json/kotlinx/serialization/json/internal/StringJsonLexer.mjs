import {
  AbstractJsonLexer1em5xl1wqsdtw as AbstractJsonLexer,
  charToTokenClass1wja4xge82waq as charToTokenClass,
  tokenDescription3r6eqmtoxe76u as tokenDescription,
} from './AbstractJsonLexer.mjs';
import {
  charCodeAt1yspne1d8erbm as charCodeAt,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  charSequenceLength3278n89t01tmv as charSequenceLength,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  toString3o7ifthqydp6e as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { indexOf1xbs558u7wr52 as indexOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { substringiqarkczpya5m as substring } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/stringJs.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { StringJsonLexerWithComments3bzrli3gl2cah as StringJsonLexerWithComments } from './CommentLexers.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var StringJsonLexerClass;
function StringJsonLexer() {
  if (StringJsonLexerClass === VOID) {
    class $ extends AbstractJsonLexer() {
      constructor(source) {
        super();
        this.n1x_1 = source;
      }
      u1w() {
        return this.n1x_1;
      }
      v1w(position) {
        return position < this.u1w().length ? position : -1;
      }
      h1s() {
        var source = this.u1w();
        var cpos = this.r1l_1;
        $l$loop: while (!(cpos === -1) && cpos < source.length) {
          var _unary__edvuaz = cpos;
          cpos = _unary__edvuaz + 1 | 0;
          var c = charCodeAt(source, _unary__edvuaz);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
          if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
            continue $l$loop;
          this.r1l_1 = cpos;
          return charToTokenClass(c);
        }
        this.r1l_1 = source.length;
        return 10;
      }
      d1s() {
        var current = this.r1l_1;
        if (current === -1)
          return false;
        var source = this.u1w();
        $l$loop: while (current < source.length) {
          var c = charCodeAt(source, current);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
          if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
            current = current + 1 | 0;
            continue $l$loop;
          }
          this.r1l_1 = current;
          return this.y1w(c);
        }
        this.r1l_1 = current;
        return false;
      }
      x1w() {
        var current = this.r1l_1;
        if (current === -1)
          return current;
        var source = this.u1w();
        $l$loop: while (current < source.length) {
          var c = charCodeAt(source, current);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
          if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
            current = current + 1 | 0;
          } else {
            break $l$loop;
          }
        }
        this.r1l_1 = current;
        return current;
      }
      q1t(expected) {
        if (this.r1l_1 === -1) {
          this.z1w(expected);
        }
        var source = this.u1w();
        var cpos = this.r1l_1;
        $l$loop: while (cpos < source.length) {
          var _unary__edvuaz = cpos;
          cpos = _unary__edvuaz + 1 | 0;
          var c = charCodeAt(source, _unary__edvuaz);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
          if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
            continue $l$loop;
          this.r1l_1 = cpos;
          if (c === expected)
            return Unit_instance;
          this.z1w(expected);
        }
        this.r1l_1 = -1;
        this.z1w(expected);
      }
      w1t() {
        this.q1t(_Char___init__impl__6a9atx(34));
        var current = this.r1l_1;
        var closingQuote = indexOf(this.u1w(), _Char___init__impl__6a9atx(34), current);
        if (closingQuote === -1) {
          this.f1s();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
          var expected = tokenDescription(1);
          var position = false ? this.r1l_1 - 1 | 0 : this.r1l_1;
          var s = this.r1l_1 === charSequenceLength(this.u1w()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.u1w(), position));
          var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
          this.j1q(tmp$ret$0, position);
        }
        var inductionVariable = current;
        if (inductionVariable < closingQuote)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (charCodeAt(this.u1w(), i) === _Char___init__impl__6a9atx(92)) {
              return this.consumeString2(this.u1w(), this.r1l_1, i);
            }
          }
           while (inductionVariable < closingQuote);
        this.r1l_1 = closingQuote + 1 | 0;
        return substring(this.u1w(), current, closingQuote);
      }
      y1t(keyToMatch, isLenient) {
        var positionSnapshot = this.r1l_1;
        try {
          if (!(this.h1s() === 6))
            return null;
          var firstKey = this.t1t(isLenient);
          if (!(firstKey === keyToMatch))
            return null;
          this.a1x();
          if (!(this.h1s() === 5))
            return null;
          return this.t1t(isLenient);
        }finally {
          this.r1l_1 = positionSnapshot;
          this.a1x();
        }
      }
    }
    initMetadataForClass($, 'StringJsonLexer');
    StringJsonLexerClass = $;
  }
  return StringJsonLexerClass;
}
function StringJsonLexer_0(json, source) {
  return !json.e1l_1.e1n_1 ? new (StringJsonLexer())(source) : new (StringJsonLexerWithComments())(source);
}
//region block: exports
export {
  StringJsonLexer_0 as StringJsonLexer3eu6xom7mrcfu,
  StringJsonLexer as StringJsonLexervr9dj3kex5li,
};
//endregion

//# sourceMappingURL=StringJsonLexer.mjs.map
