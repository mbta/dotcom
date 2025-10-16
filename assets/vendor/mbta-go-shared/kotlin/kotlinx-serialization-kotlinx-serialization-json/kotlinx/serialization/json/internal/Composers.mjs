import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { toLongw1zpgk99d84b as toLong } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  UInt__toString_impl_dbgl213fqto411a11p0 as UInt__toString_impl_dbgl21,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/UInt.mjs';
import {
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  ULong__toString_impl_f9au7kivnvhcxkib53 as ULong__toString_impl_f9au7k,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import {
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  UByte__toString_impl_v72jg2vnfngefiworp as UByte__toString_impl_v72jg,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/UByte.mjs';
import {
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
  UShort__toString_impl_edaoee3e5ovvzk9wm4f as UShort__toString_impl_edaoee,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/UShort.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ComposerClass;
function Composer() {
  if (ComposerClass === VOID) {
    class $ {
      constructor(writer) {
        this.z1o_1 = writer;
        this.a1p_1 = true;
      }
      b1p() {
        this.a1p_1 = true;
      }
      c1p() {
        return Unit_instance;
      }
      d1p() {
        this.a1p_1 = false;
      }
      e1p() {
        this.a1p_1 = false;
      }
      f1p() {
        return Unit_instance;
      }
      g1p(v) {
        return this.z1o_1.h1p(v);
      }
      i1p(v) {
        return this.z1o_1.j1p(v);
      }
      k1p(v) {
        return this.z1o_1.j1p(v.toString());
      }
      l1p(v) {
        return this.z1o_1.j1p(v.toString());
      }
      m1p(v) {
        return this.z1o_1.n1p(toLong(v));
      }
      o1p(v) {
        return this.z1o_1.n1p(toLong(v));
      }
      p1p(v) {
        return this.z1o_1.n1p(toLong(v));
      }
      q1p(v) {
        return this.z1o_1.n1p(v);
      }
      r1p(v) {
        return this.z1o_1.j1p(v.toString());
      }
      s1p(value) {
        return this.z1o_1.t1p(value);
      }
    }
    initMetadataForClass($, 'Composer');
    ComposerClass = $;
  }
  return ComposerClass;
}
function Composer_0(sb, json) {
  return json.e1l_1.t1m_1 ? new (ComposerWithPrettyPrint())(sb, json) : new (Composer())(sb);
}
var ComposerForUnsignedNumbersClass;
function ComposerForUnsignedNumbers() {
  if (ComposerForUnsignedNumbersClass === VOID) {
    class $ extends Composer() {
      constructor(writer, forceQuoting) {
        super(writer);
        this.w1p_1 = forceQuoting;
      }
      p1p(v) {
        if (this.w1p_1) {
          // Inline function 'kotlin.toUInt' call
          var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
          this.s1p(UInt__toString_impl_dbgl21(tmp$ret$0));
        } else {
          // Inline function 'kotlin.toUInt' call
          var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
          this.i1p(UInt__toString_impl_dbgl21(tmp$ret$1));
        }
      }
      q1p(v) {
        if (this.w1p_1) {
          // Inline function 'kotlin.toULong' call
          var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
          this.s1p(ULong__toString_impl_f9au7k(tmp$ret$0));
        } else {
          // Inline function 'kotlin.toULong' call
          var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
          this.i1p(ULong__toString_impl_f9au7k(tmp$ret$1));
        }
      }
      m1p(v) {
        if (this.w1p_1) {
          // Inline function 'kotlin.toUByte' call
          var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
          this.s1p(UByte__toString_impl_v72jg(tmp$ret$0));
        } else {
          // Inline function 'kotlin.toUByte' call
          var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
          this.i1p(UByte__toString_impl_v72jg(tmp$ret$1));
        }
      }
      o1p(v) {
        if (this.w1p_1) {
          // Inline function 'kotlin.toUShort' call
          var tmp$ret$0 = _UShort___init__impl__jigrne(v);
          this.s1p(UShort__toString_impl_edaoee(tmp$ret$0));
        } else {
          // Inline function 'kotlin.toUShort' call
          var tmp$ret$1 = _UShort___init__impl__jigrne(v);
          this.i1p(UShort__toString_impl_edaoee(tmp$ret$1));
        }
      }
    }
    initMetadataForClass($, 'ComposerForUnsignedNumbers');
    ComposerForUnsignedNumbersClass = $;
  }
  return ComposerForUnsignedNumbersClass;
}
var ComposerForUnquotedLiteralsClass;
function ComposerForUnquotedLiterals() {
  if (ComposerForUnquotedLiteralsClass === VOID) {
    class $ extends Composer() {
      constructor(writer, forceQuoting) {
        super(writer);
        this.z1p_1 = forceQuoting;
      }
      s1p(value) {
        if (this.z1p_1) {
          super.s1p(value);
        } else {
          super.i1p(value);
        }
      }
    }
    initMetadataForClass($, 'ComposerForUnquotedLiterals');
    ComposerForUnquotedLiteralsClass = $;
  }
  return ComposerForUnquotedLiteralsClass;
}
var ComposerWithPrettyPrintClass;
function ComposerWithPrettyPrint() {
  if (ComposerWithPrettyPrintClass === VOID) {
    class $ extends Composer() {
      constructor(writer, json) {
        super(writer);
        this.c1q_1 = json;
        this.d1q_1 = 0;
      }
      b1p() {
        this.a1p_1 = true;
        this.d1q_1 = this.d1q_1 + 1 | 0;
      }
      c1p() {
        this.d1q_1 = this.d1q_1 - 1 | 0;
      }
      d1p() {
        this.a1p_1 = false;
        this.i1p('\n');
        // Inline function 'kotlin.repeat' call
        var times = this.d1q_1;
        var inductionVariable = 0;
        if (inductionVariable < times)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.i1p(this.c1q_1.e1l_1.v1m_1);
          }
           while (inductionVariable < times);
      }
      e1p() {
        if (this.a1p_1)
          this.a1p_1 = false;
        else {
          this.d1p();
        }
      }
      f1p() {
        this.g1p(_Char___init__impl__6a9atx(32));
      }
    }
    initMetadataForClass($, 'ComposerWithPrettyPrint');
    ComposerWithPrettyPrintClass = $;
  }
  return ComposerWithPrettyPrintClass;
}
//region block: exports
export {
  ComposerForUnquotedLiterals as ComposerForUnquotedLiterals3v0rwxdudtla9,
  ComposerForUnsignedNumbers as ComposerForUnsignedNumbers2h1dv6l9z3aef,
  Composer_0 as Composer1pt8hwk95abxi,
};
//endregion

//# sourceMappingURL=Composers.mjs.map
