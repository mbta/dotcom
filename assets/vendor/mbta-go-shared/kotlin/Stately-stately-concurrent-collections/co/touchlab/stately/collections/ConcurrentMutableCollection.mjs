import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  Collection1k04j3hzsbod0 as Collection,
  MutableIterablez3x4ksk1fmrm as MutableIterable,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ConcurrentMutableCollection$_get_size_$lambda_dssf9y(this$0) {
  return function () {
    return this$0.b7u_1.c1();
  };
}
function ConcurrentMutableCollection$contains$lambda(this$0, $element) {
  return function () {
    return this$0.b7u_1.j1($element);
  };
}
function ConcurrentMutableCollection$containsAll$lambda(this$0, $elements) {
  return function () {
    return this$0.b7u_1.d3($elements);
  };
}
function ConcurrentMutableCollection$isEmpty$lambda(this$0) {
  return function () {
    return this$0.b7u_1.h1();
  };
}
function ConcurrentMutableCollection$add$lambda(this$0, $element) {
  return function () {
    return this$0.b7u_1.i($element);
  };
}
function ConcurrentMutableCollection$addAll$lambda(this$0, $elements) {
  return function () {
    return this$0.b7u_1.d1($elements);
  };
}
function ConcurrentMutableCollection$clear$lambda(this$0) {
  return function () {
    this$0.b7u_1.p3();
    return Unit_instance;
  };
}
function ConcurrentMutableCollection$iterator$lambda(this$0) {
  return function () {
    return new (ConcurrentMutableIterator())(this$0.c7u_1, this$0.b7u_1.x());
  };
}
function ConcurrentMutableCollection$remove$lambda(this$0, $element) {
  return function () {
    return this$0.b7u_1.m3($element);
  };
}
function ConcurrentMutableCollection$retainAll$lambda(this$0, $elements) {
  return function () {
    return this$0.b7u_1.o3($elements);
  };
}
var ConcurrentMutableCollectionClass;
function ConcurrentMutableCollection() {
  if (ConcurrentMutableCollectionClass === VOID) {
    class $ {
      static d7u(rootArg, del) {
        rootArg = rootArg === VOID ? null : rootArg;
        var $this = createThis(this);
        $this.b7u_1 = del;
        var tmp = $this;
        tmp.c7u_1 = rootArg == null ? $this : rootArg;
        return $this;
      }
      c1() {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$_get_size_$lambda_dssf9y(this)();
      }
      j1(element) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$contains$lambda(this, element)();
      }
      d3(elements) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$containsAll$lambda(this, elements)();
      }
      h1() {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$isEmpty$lambda(this)();
      }
      i(element) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$add$lambda(this, element)();
      }
      d1(elements) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$addAll$lambda(this, elements)();
      }
      p3() {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        ConcurrentMutableCollection$clear$lambda(this)();
      }
      x() {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$iterator$lambda(this)();
      }
      m3(element) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$remove$lambda(this, element)();
      }
      o3(elements) {
        this.c7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableCollection$retainAll$lambda(this, elements)();
      }
    }
    initMetadataForClass($, 'ConcurrentMutableCollection', VOID, VOID, [Collection(), MutableIterable()]);
    ConcurrentMutableCollectionClass = $;
  }
  return ConcurrentMutableCollectionClass;
}
function ConcurrentMutableIterator$hasNext$lambda(this$0) {
  return function () {
    return this$0.f7u_1.y();
  };
}
function ConcurrentMutableIterator$next$lambda(this$0) {
  return function () {
    return this$0.f7u_1.z();
  };
}
function ConcurrentMutableIterator$remove$lambda(this$0) {
  return function () {
    this$0.f7u_1.z6();
    return Unit_instance;
  };
}
var ConcurrentMutableIteratorClass;
function ConcurrentMutableIterator() {
  if (ConcurrentMutableIteratorClass === VOID) {
    class $ {
      constructor(root, del) {
        this.e7u_1 = root;
        this.f7u_1 = del;
      }
      y() {
        this.e7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableIterator$hasNext$lambda(this)();
      }
      z() {
        this.e7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableIterator$next$lambda(this)();
      }
      z6() {
        this.e7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        ConcurrentMutableIterator$remove$lambda(this)();
      }
    }
    initMetadataForClass($, 'ConcurrentMutableIterator');
    ConcurrentMutableIteratorClass = $;
  }
  return ConcurrentMutableIteratorClass;
}
//region block: exports
export {
  ConcurrentMutableCollection as ConcurrentMutableCollection249ji20neebdi,
};
//endregion

//# sourceMappingURL=ConcurrentMutableCollection.mjs.map
