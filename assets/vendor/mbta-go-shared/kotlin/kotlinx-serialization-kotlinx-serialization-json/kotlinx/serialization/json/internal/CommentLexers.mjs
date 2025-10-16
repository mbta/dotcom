import { StringJsonLexervr9dj3kex5li as StringJsonLexer } from './StringJsonLexer.mjs';
import { charCodeAt1yspne1d8erbm as charCodeAt } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { charToTokenClass1wja4xge82waq as charToTokenClass } from './AbstractJsonLexer.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import {
  indexOfwa4w6635jewi as indexOf,
  indexOf1xbs558u7wr52 as indexOf_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var StringJsonLexerWithCommentsClass;
function StringJsonLexerWithComments() {
  if (StringJsonLexerWithCommentsClass === VOID) {
    class $ extends StringJsonLexer() {
      h1s() {
        var source = this.u1w();
        var cpos = this.x1w();
        if (cpos >= source.length || cpos === -1)
          return 10;
        this.r1l_1 = cpos + 1 | 0;
        return charToTokenClass(charCodeAt(source, cpos));
      }
      d1s() {
        var current = this.x1w();
        if (current >= this.u1w().length || current === -1)
          return false;
        return this.y1w(charCodeAt(this.u1w(), current));
      }
      q1t(expected) {
        var source = this.u1w();
        var current = this.x1w();
        if (current >= source.length || current === -1) {
          this.r1l_1 = -1;
          this.z1w(expected);
        }
        var c = charCodeAt(source, current);
        this.r1l_1 = current + 1 | 0;
        if (c === expected)
          return Unit_instance;
        else {
          this.z1w(expected);
        }
      }
      c1s() {
        var source = this.u1w();
        var cpos = this.x1w();
        if (cpos >= source.length || cpos === -1)
          return 10;
        this.r1l_1 = cpos;
        return charToTokenClass(charCodeAt(source, cpos));
      }
      x1w() {
        var current = this.r1l_1;
        if (current === -1)
          return current;
        var source = this.u1w();
        $l$loop_1: while (current < source.length) {
          var c = charCodeAt(source, current);
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
          if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
            current = current + 1 | 0;
            continue $l$loop_1;
          }
          if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
            var tmp0_subject = charCodeAt(source, current + 1 | 0);
            if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
              current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
              if (current === -1) {
                current = source.length;
              } else {
                current = current + 1 | 0;
              }
              continue $l$loop_1;
            } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
              current = indexOf(source, '*/', current + 2 | 0);
              if (current === -1) {
                this.r1l_1 = source.length;
                this.j1q('Expected end of the block comment: "*/", but had EOF instead');
              } else {
                current = current + 2 | 0;
              }
              continue $l$loop_1;
            }
          }
          break $l$loop_1;
        }
        this.r1l_1 = current;
        return current;
      }
    }
    initMetadataForClass($, 'StringJsonLexerWithComments');
    StringJsonLexerWithCommentsClass = $;
  }
  return StringJsonLexerWithCommentsClass;
}
//region block: exports
export {
  StringJsonLexerWithComments as StringJsonLexerWithComments3bzrli3gl2cah,
};
//endregion

//# sourceMappingURL=CommentLexers.mjs.map
