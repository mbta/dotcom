import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { boxApply1qmzdb3dh90hg as boxApply } from '../js/coreRuntime.mjs';
import { Char19o2r8palgjof as Char } from '../Char.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var IntIteratorClass;
function IntIterator() {
  if (IntIteratorClass === VOID) {
    class $ {
      z() {
        return this.ko();
      }
    }
    initMetadataForClass($, 'IntIterator');
    IntIteratorClass = $;
  }
  return IntIteratorClass;
}
var LongIteratorClass;
function LongIterator() {
  if (LongIteratorClass === VOID) {
    class $ {
      z() {
        return this.lo();
      }
    }
    initMetadataForClass($, 'LongIterator');
    LongIteratorClass = $;
  }
  return LongIteratorClass;
}
var DoubleIteratorClass;
function DoubleIterator() {
  if (DoubleIteratorClass === VOID) {
    class $ {
      constructor($box) {
        boxApply(this, $box);
      }
      z() {
        return this.e5();
      }
    }
    initMetadataForClass($, 'DoubleIterator');
    DoubleIteratorClass = $;
  }
  return DoubleIteratorClass;
}
var CharIteratorClass;
function CharIterator() {
  if (CharIteratorClass === VOID) {
    class $ {
      mo() {
        return this.no();
      }
      z() {
        return new (Char())(this.mo());
      }
    }
    initMetadataForClass($, 'CharIterator');
    CharIteratorClass = $;
  }
  return CharIteratorClass;
}
//region block: exports
export {
  CharIterator as CharIterator2h6gbyxoj1es2,
  DoubleIterator as DoubleIteratorpyjiqhzm6h4f,
  IntIterator as IntIteratordtlvcwxsuu5a,
  LongIterator as LongIterator6nf6jdg4ti4,
};
//endregion

//# sourceMappingURL=PrimitiveIterators.mjs.map
