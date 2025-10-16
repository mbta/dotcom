import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  UnsignedIntFormatterStructure2iqfxgv3d2ejy as UnsignedIntFormatterStructure,
  DecimalFractionFormatterStructure2fby7dmyhkzn1 as DecimalFractionFormatterStructure,
  SignedIntFormatterStructureuogj4y4pj858 as SignedIntFormatterStructure,
} from './formatter/FormatterOperation.mjs';
import { SpacePaddedFormatter1bbtqhbgrvf8v as SpacePaddedFormatter } from './formatter/Formatter.mjs';
import {
  spaceAndZeroPaddedUnsignedInt3iec50j4qusnr as spaceAndZeroPaddedUnsignedInt,
  NumberSpanParserOperation3qyp02c4km7yu as NumberSpanParserOperation,
  SignedIntParsergn6823y2nf4q as SignedIntParser,
} from './parser/ParserOperation.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { FractionPartConsumerf0mxqojimz2s as FractionPartConsumer } from './parser/NumberConsumer.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ParserStructure2cqp7gjft5io4 as ParserStructure } from './parser/Parser.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function Accessor$getterNotNull$ref(p0) {
  var l = function (_this__u8e3s4) {
    return p0.l8b(_this__u8e3s4);
  };
  l.callableName = 'getterNotNull';
  return l;
}
var UnsignedIntFieldFormatDirectiveClass;
function UnsignedIntFieldFormatDirective() {
  if (UnsignedIntFieldFormatDirectiveClass === VOID) {
    class $ {
      constructor(field, minDigits, spacePadding) {
        this.l85_1 = field;
        this.m85_1 = minDigits;
        this.n85_1 = spacePadding;
        this.o85_1 = this.l85_1.s8b_1;
        // Inline function 'kotlin.require' call
        if (!(this.m85_1 >= 0)) {
          var message = 'The minimum number of digits (' + this.m85_1 + ') is negative';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(this.o85_1 >= this.m85_1)) {
          var message_0 = 'The maximum number of digits (' + this.o85_1 + ') is less than the minimum number of digits (' + this.m85_1 + ')';
          throw IllegalArgumentException().q(toString(message_0));
        }
        if (!(this.n85_1 == null)) {
          // Inline function 'kotlin.require' call
          if (!(this.n85_1 > this.m85_1)) {
            var message_1 = 'The space padding (' + this.n85_1 + ') should be more than the minimum number of digits (' + this.m85_1 + ')';
            throw IllegalArgumentException().q(toString(message_1));
          }
        }
      }
      p85() {
        return this.l85_1;
      }
      s82() {
        var formatter = new (UnsignedIntFormatterStructure())(Accessor$getterNotNull$ref(this.l85_1.m8b_1), this.m85_1);
        return !(this.n85_1 == null) ? new (SpacePaddedFormatter())(formatter, this.n85_1) : formatter;
      }
      u82() {
        return spaceAndZeroPaddedUnsignedInt(this.m85_1, this.o85_1, this.n85_1, this.l85_1.m8b_1, this.l85_1.p8b_1);
      }
    }
    initMetadataForClass($, 'UnsignedIntFieldFormatDirective');
    UnsignedIntFieldFormatDirectiveClass = $;
  }
  return UnsignedIntFieldFormatDirectiveClass;
}
function Accessor$getterNotNull$ref_0(p0) {
  var l = function (_this__u8e3s4) {
    return p0.l8b(_this__u8e3s4);
  };
  l.callableName = 'getterNotNull';
  return l;
}
var DecimalFractionFieldFormatDirectiveClass;
function DecimalFractionFieldFormatDirective() {
  if (DecimalFractionFieldFormatDirectiveClass === VOID) {
    class $ {
      constructor(field, minDigits, maxDigits, zerosToAdd) {
        this.n88_1 = field;
        this.o88_1 = minDigits;
        this.p88_1 = maxDigits;
        this.q88_1 = zerosToAdd;
      }
      p85() {
        return this.n88_1;
      }
      s82() {
        return new (DecimalFractionFormatterStructure())(Accessor$getterNotNull$ref_0(this.n88_1.t8b()), this.o88_1, this.p88_1, this.q88_1);
      }
      u82() {
        return new (ParserStructure())(listOf(new (NumberSpanParserOperation())(listOf(new (FractionPartConsumer())(this.o88_1, this.p88_1, this.n88_1.t8b(), this.n88_1.y3())))), emptyList());
      }
    }
    initMetadataForClass($, 'DecimalFractionFieldFormatDirective');
    DecimalFractionFieldFormatDirectiveClass = $;
  }
  return DecimalFractionFieldFormatDirectiveClass;
}
function Accessor$getterNotNull$ref_1(p0) {
  var l = function (_this__u8e3s4) {
    return p0.l8b(_this__u8e3s4);
  };
  l.callableName = 'getterNotNull';
  return l;
}
var SignedIntFieldFormatDirectiveClass;
function SignedIntFieldFormatDirective() {
  if (SignedIntFieldFormatDirectiveClass === VOID) {
    class $ {
      constructor(field, minDigits, maxDigits, spacePadding, outputPlusOnExceededWidth) {
        this.b8b_1 = field;
        this.c8b_1 = minDigits;
        this.d8b_1 = maxDigits;
        this.e8b_1 = spacePadding;
        this.f8b_1 = outputPlusOnExceededWidth;
        // Inline function 'kotlin.require' call
        if (!(this.c8b_1 == null || this.c8b_1 >= 0)) {
          var message = 'The minimum number of digits (' + this.c8b_1 + ') is negative';
          throw IllegalArgumentException().q(toString(message));
        }
        // Inline function 'kotlin.require' call
        if (!(this.d8b_1 == null || this.c8b_1 == null || this.d8b_1 >= this.c8b_1)) {
          var message_0 = 'The maximum number of digits (' + this.d8b_1 + ') is less than the minimum number of digits (' + this.c8b_1 + ')';
          throw IllegalArgumentException().q(toString(message_0));
        }
      }
      p85() {
        return this.b8b_1;
      }
      s82() {
        var tmp = Accessor$getterNotNull$ref_1(this.b8b_1.t8b());
        var tmp0_elvis_lhs = this.c8b_1;
        var formatter = new (SignedIntFormatterStructure())(tmp, tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs, this.f8b_1);
        return !(this.e8b_1 == null) ? new (SpacePaddedFormatter())(formatter, this.e8b_1) : formatter;
      }
      u82() {
        return SignedIntParser(this.c8b_1, this.d8b_1, this.e8b_1, this.b8b_1.t8b(), this.b8b_1.y3(), this.f8b_1);
      }
    }
    initMetadataForClass($, 'SignedIntFieldFormatDirective');
    SignedIntFieldFormatDirectiveClass = $;
  }
  return SignedIntFieldFormatDirectiveClass;
}
//region block: exports
export {
  DecimalFractionFieldFormatDirective as DecimalFractionFieldFormatDirective1h9sbm886izzq,
  SignedIntFieldFormatDirective as SignedIntFieldFormatDirective2ce7tjucbhgd2,
  UnsignedIntFieldFormatDirective as UnsignedIntFieldFormatDirective20kfpdbszyixg,
};
//endregion

//# sourceMappingURL=FieldFormatDirective.mjs.map
