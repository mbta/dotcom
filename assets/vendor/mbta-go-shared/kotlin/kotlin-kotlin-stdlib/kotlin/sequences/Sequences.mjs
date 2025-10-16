import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { NoSuchElementException679xzhnp5bpj as NoSuchElementException } from '../exceptions.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../hacks.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var TransformingSequence$iterator$1Class;
function TransformingSequence$iterator$1() {
  if (TransformingSequence$iterator$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.ap_1 = this$0;
        this.zo_1 = this$0.bp_1.x();
      }
      z() {
        return this.ap_1.cp_1(this.zo_1.z());
      }
      y() {
        return this.zo_1.y();
      }
    }
    initMetadataForClass($);
    TransformingSequence$iterator$1Class = $;
  }
  return TransformingSequence$iterator$1Class;
}
var TransformingSequenceClass;
function TransformingSequence() {
  if (TransformingSequenceClass === VOID) {
    class $ {
      constructor(sequence, transformer) {
        this.bp_1 = sequence;
        this.cp_1 = transformer;
      }
      x() {
        return new (TransformingSequence$iterator$1())(this);
      }
    }
    initMetadataForClass($, 'TransformingSequence');
    TransformingSequenceClass = $;
  }
  return TransformingSequenceClass;
}
function ensureItemIterator($this) {
  var itemIterator = $this.ep_1;
  if (!(itemIterator == null) && itemIterator.y()) {
    $this.fp_1 = 1;
    return true;
  }
  while ($this.dp_1.y()) {
    var element = $this.dp_1.z();
    var nextItemIterator = $this.gp_1.jp_1($this.gp_1.ip_1(element));
    if (nextItemIterator.y()) {
      $this.ep_1 = nextItemIterator;
      $this.fp_1 = 1;
      return true;
    }
  }
  $this.fp_1 = 2;
  $this.ep_1 = null;
  return false;
}
var FlatteningSequence$iterator$1Class;
function FlatteningSequence$iterator$1() {
  if (FlatteningSequence$iterator$1Class === VOID) {
    class $ {
      constructor(this$0) {
        this.gp_1 = this$0;
        this.dp_1 = this$0.hp_1.x();
        this.ep_1 = null;
        this.fp_1 = 0;
      }
      z() {
        if (this.fp_1 === 2)
          throw NoSuchElementException().m1();
        if (this.fp_1 === 0 && !ensureItemIterator(this)) {
          throw NoSuchElementException().m1();
        }
        this.fp_1 = 0;
        return ensureNotNull(this.ep_1).z();
      }
      y() {
        if (this.fp_1 === 1)
          return true;
        if (this.fp_1 === 2)
          return false;
        return ensureItemIterator(this);
      }
    }
    initMetadataForClass($);
    FlatteningSequence$iterator$1Class = $;
  }
  return FlatteningSequence$iterator$1Class;
}
var FlatteningSequenceClass;
function FlatteningSequence() {
  if (FlatteningSequenceClass === VOID) {
    class $ {
      constructor(sequence, transformer, iterator) {
        this.hp_1 = sequence;
        this.ip_1 = transformer;
        this.jp_1 = iterator;
      }
      x() {
        return new (FlatteningSequence$iterator$1())(this);
      }
    }
    initMetadataForClass($, 'FlatteningSequence');
    FlatteningSequenceClass = $;
  }
  return FlatteningSequenceClass;
}
//region block: exports
export {
  FlatteningSequence as FlatteningSequence1gb46kmahgjp0,
  TransformingSequence as TransformingSequence3gzv034v2j93f,
};
//endregion

//# sourceMappingURL=Sequences.mjs.map
