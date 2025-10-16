import { boxApply1qmzdb3dh90hg as boxApply } from '../js/coreRuntime.mjs';
import {
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
} from '../exceptions.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function tryToComputeNext($this) {
  $this.hm_1 = 3;
  $this.jm();
  return $this.hm_1 === 1;
}
var AbstractIteratorClass;
function AbstractIterator() {
  if (AbstractIteratorClass === VOID) {
    class $ {
      constructor($box) {
        boxApply(this, $box);
        this.hm_1 = 0;
        this.im_1 = null;
      }
      y() {
        var tmp;
        switch (this.hm_1) {
          case 2:
            tmp = false;
            break;
          case 1:
            tmp = true;
            break;
          case 0:
            tmp = tryToComputeNext(this);
            break;
          default:
            throw IllegalArgumentException().q('hasNext called when the iterator is in the FAILED state.');
        }
        return tmp;
      }
      z() {
        if (this.hm_1 === 1) {
          this.hm_1 = 0;
          var tmp = this.im_1;
          return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
        }
        if (this.hm_1 === 2 || !tryToComputeNext(this)) {
          throw NoSuchElementException().m1();
        }
        this.hm_1 = 0;
        var tmp_0 = this.im_1;
        return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      }
      km(value) {
        this.im_1 = value;
        this.hm_1 = 1;
      }
      lm() {
        this.hm_1 = 2;
      }
    }
    initMetadataForClass($, 'AbstractIterator');
    AbstractIteratorClass = $;
  }
  return AbstractIteratorClass;
}
//region block: exports
export {
  AbstractIterator as AbstractIterator1svf7vpi1lw8y,
};
//endregion

//# sourceMappingURL=AbstractIterator.mjs.map
