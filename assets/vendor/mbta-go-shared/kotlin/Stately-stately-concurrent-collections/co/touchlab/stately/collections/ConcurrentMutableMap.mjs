import { ConcurrentMutableSet1jjjkxl24hnbl as ConcurrentMutableSet } from './ConcurrentMutableSet.mjs';
import { ConcurrentMutableCollection249ji20neebdi as ConcurrentMutableCollection } from './ConcurrentMutableCollection.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { createThis2j2avj17cvnv2 as createThis } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { KtMutableMap1kqeifoi36kpz as KtMutableMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function ConcurrentMutableMap$_get_size_$lambda_nuyc4q(this$0) {
  return function () {
    return this$0.g7u_1.c1();
  };
}
function ConcurrentMutableMap$_get_entries_$lambda_dp7xtt(this$0) {
  return function () {
    return ConcurrentMutableSet().l7u(this$0, this$0.g7u_1.t1());
  };
}
function ConcurrentMutableMap$_get_keys_$lambda_5gjoyr(this$0) {
  return function () {
    return ConcurrentMutableSet().l7u(this$0, this$0.g7u_1.k3());
  };
}
function ConcurrentMutableMap$_get_values_$lambda_tyvlyt(this$0) {
  return function () {
    return ConcurrentMutableCollection().d7u(this$0, this$0.g7u_1.l3());
  };
}
function ConcurrentMutableMap$containsKey$lambda(this$0, $key) {
  return function () {
    return this$0.g7u_1.h3($key);
  };
}
function ConcurrentMutableMap$get$lambda(this$0, $key) {
  return function () {
    return this$0.g7u_1.j3($key);
  };
}
function ConcurrentMutableMap$isEmpty$lambda(this$0) {
  return function () {
    return this$0.g7u_1.h1();
  };
}
function ConcurrentMutableMap$clear$lambda(this$0) {
  return function () {
    this$0.g7u_1.p3();
    return Unit_instance;
  };
}
function ConcurrentMutableMap$put$lambda(this$0, $key, $value) {
  return function () {
    return this$0.g7u_1.t3($key, $value);
  };
}
function ConcurrentMutableMap$putAll$lambda(this$0, $from) {
  return function () {
    this$0.g7u_1.v3($from);
    return Unit_instance;
  };
}
function ConcurrentMutableMap$remove$lambda(this$0, $key) {
  return function () {
    return this$0.g7u_1.u3($key);
  };
}
var ConcurrentMutableMapClass;
function ConcurrentMutableMap() {
  if (ConcurrentMutableMapClass === VOID) {
    class $ {
      static m7u(rootArg, del) {
        rootArg = rootArg === VOID ? null : rootArg;
        var $this = createThis(this);
        $this.g7u_1 = del;
        var tmp = $this;
        tmp.h7u_1 = rootArg == null ? $this : rootArg;
        return $this;
      }
      static n7u() {
        // Inline function 'kotlin.collections.mutableMapOf' call
        var tmp$ret$0 = LinkedHashMap().sc();
        return this.m7u(null, tmp$ret$0);
      }
      c1() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$_get_size_$lambda_nuyc4q(this)();
      }
      t1() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$_get_entries_$lambda_dp7xtt(this)();
      }
      k3() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$_get_keys_$lambda_5gjoyr(this)();
      }
      l3() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$_get_values_$lambda_tyvlyt(this)();
      }
      h3(key) {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$containsKey$lambda(this, key)();
      }
      j3(key) {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$get$lambda(this, key)();
      }
      h1() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$isEmpty$lambda(this)();
      }
      p3() {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        ConcurrentMutableMap$clear$lambda(this)();
      }
      t3(key, value) {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$put$lambda(this, key, value)();
      }
      v3(from) {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        ConcurrentMutableMap$putAll$lambda(this, from)();
      }
      u3(key) {
        this.h7u_1;
        // Inline function 'co.touchlab.stately.concurrency.synchronize' call
        return ConcurrentMutableMap$remove$lambda(this, key)();
      }
    }
    initMetadataForClass($, 'ConcurrentMutableMap', $.n7u, VOID, [KtMutableMap()]);
    ConcurrentMutableMapClass = $;
  }
  return ConcurrentMutableMapClass;
}
//region block: exports
export {
  ConcurrentMutableMap as ConcurrentMutableMap19j4cpqgqiyz3,
};
//endregion

//# sourceMappingURL=ConcurrentMutableMap.mjs.map
