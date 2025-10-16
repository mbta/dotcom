import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { createCoroutineUnintercepted3gya308dmbbtg as createCoroutineUnintercepted } from '../coroutines/intrinsics/IntrinsicsJs.mjs';
import {
  NoSuchElementException679xzhnp5bpj as NoSuchElementException,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
} from '../exceptions.mjs';
import {
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../hacks.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
} from '../Result.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../coroutines/intrinsics/Intrinsics.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from '../coroutines/CoroutineContextImpl.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from '../coroutines/Continuation.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function sequence(block) {
  // Inline function 'kotlin.sequences.Sequence' call
  return new (sequence$$inlined$Sequence$1())(block);
}
var SequenceScopeClass;
function SequenceScope() {
  if (SequenceScopeClass === VOID) {
    class $ {}
    initMetadataForClass($, 'SequenceScope', VOID, VOID, VOID, [1]);
    SequenceScopeClass = $;
  }
  return SequenceScopeClass;
}
function iterator(block) {
  var iterator = new (SequenceBuilderIterator())();
  iterator.wo_1 = createCoroutineUnintercepted(block, iterator, iterator);
  return iterator;
}
function nextNotReady($this) {
  if (!$this.y())
    throw NoSuchElementException().m1();
  else
    return $this.z();
}
function exceptionalState($this) {
  switch ($this.to_1) {
    case 4:
      return NoSuchElementException().m1();
    case 5:
      return IllegalStateException().o5('Iterator has failed.');
    default:
      return IllegalStateException().o5('Unexpected state of the iterator: ' + $this.to_1);
  }
}
var SequenceBuilderIteratorClass;
function SequenceBuilderIterator() {
  if (SequenceBuilderIteratorClass === VOID) {
    class $ extends SequenceScope() {
      constructor() {
        super();
        this.to_1 = 0;
        this.uo_1 = null;
        this.vo_1 = null;
        this.wo_1 = null;
      }
      y() {
        while (true) {
          switch (this.to_1) {
            case 0:
              break;
            case 1:
              if (ensureNotNull(this.vo_1).y()) {
                this.to_1 = 2;
                return true;
              } else {
                this.vo_1 = null;
              }

              break;
            case 4:
              return false;
            case 3:
            case 2:
              return true;
            default:
              throw exceptionalState(this);
          }
          this.to_1 = 5;
          var step = ensureNotNull(this.wo_1);
          this.wo_1 = null;
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
          step.qd(tmp$ret$0);
        }
      }
      z() {
        switch (this.to_1) {
          case 0:
          case 1:
            return nextNotReady(this);
          case 2:
            this.to_1 = 1;
            return ensureNotNull(this.vo_1).z();
          case 3:
            this.to_1 = 0;
            var tmp = this.uo_1;
            var result = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
            this.uo_1 = null;
            return result;
          default:
            throw exceptionalState(this);
        }
      }
      so(value, $completion) {
        this.uo_1 = value;
        this.to_1 = 3;
        this.wo_1 = $completion;
        return get_COROUTINE_SUSPENDED();
      }
      xo(result) {
        // Inline function 'kotlin.getOrThrow' call
        throwOnFailure(result);
        var tmp = _Result___get_value__impl__bjfvqg(result);
        if (!(tmp == null ? true : !(tmp == null)))
          THROW_CCE();
        this.to_1 = 4;
      }
      qd(result) {
        return this.xo(result);
      }
      ld() {
        return EmptyCoroutineContext_getInstance();
      }
    }
    initMetadataForClass($, 'SequenceBuilderIterator', SequenceBuilderIterator, VOID, [SequenceScope(), Continuation()], [1]);
    SequenceBuilderIteratorClass = $;
  }
  return SequenceBuilderIteratorClass;
}
var sequence$$inlined$Sequence$1Class;
function sequence$$inlined$Sequence$1() {
  if (sequence$$inlined$Sequence$1Class === VOID) {
    class $ {
      constructor($block) {
        this.yo_1 = $block;
      }
      x() {
        return iterator(this.yo_1);
      }
    }
    initMetadataForClass($);
    sequence$$inlined$Sequence$1Class = $;
  }
  return sequence$$inlined$Sequence$1Class;
}
//region block: exports
export {
  SequenceScope as SequenceScope1coiso86pqzq2,
  iterator as iterator3f5i676wpaa3g,
  sequence as sequence2vgswtrxvqoa7,
};
//endregion

//# sourceMappingURL=SequenceBuilder.mjs.map
