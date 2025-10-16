import { toString30pk9tzaqopn as toString } from '../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { None_getInstance39nj59i93bjcl as None_getInstance } from './Trace.common.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AtomicRefClass;
function AtomicRef() {
  if (AtomicRefClass === VOID) {
    class $ {
      constructor(value) {
        this.kotlinx$atomicfu$value = value;
      }
      l20(_set____db54di) {
        this.kotlinx$atomicfu$value = _set____db54di;
      }
      m20() {
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$compareAndSet(expect, update) {
        if (!(this.kotlinx$atomicfu$value === expect))
          return false;
        this.kotlinx$atomicfu$value = update;
        return true;
      }
      atomicfu$getAndSet(value) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = value;
        return oldValue;
      }
      toString() {
        return toString(this.kotlinx$atomicfu$value);
      }
    }
    initMetadataForClass($, 'AtomicRef');
    AtomicRefClass = $;
  }
  return AtomicRefClass;
}
function atomic$ref$1(initial) {
  return atomic$ref$(initial, None_getInstance());
}
var AtomicBooleanClass;
function AtomicBoolean() {
  if (AtomicBooleanClass === VOID) {
    class $ {
      constructor(value) {
        this.kotlinx$atomicfu$value = value;
      }
      n20(_set____db54di) {
        this.kotlinx$atomicfu$value = _set____db54di;
      }
      m20() {
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$compareAndSet(expect, update) {
        if (!(this.kotlinx$atomicfu$value === expect))
          return false;
        this.kotlinx$atomicfu$value = update;
        return true;
      }
      atomicfu$getAndSet(value) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = value;
        return oldValue;
      }
      toString() {
        return this.kotlinx$atomicfu$value.toString();
      }
    }
    initMetadataForClass($, 'AtomicBoolean');
    AtomicBooleanClass = $;
  }
  return AtomicBooleanClass;
}
function atomic$boolean$1(initial) {
  return atomic$boolean$(initial, None_getInstance());
}
var AtomicLongClass;
function AtomicLong() {
  if (AtomicLongClass === VOID) {
    class $ {
      constructor(value) {
        this.kotlinx$atomicfu$value = value;
      }
      o20(_set____db54di) {
        this.kotlinx$atomicfu$value = _set____db54di;
      }
      m20() {
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$compareAndSet(expect, update) {
        if (!this.kotlinx$atomicfu$value.equals(expect))
          return false;
        this.kotlinx$atomicfu$value = update;
        return true;
      }
      atomicfu$getAndSet(value) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = value;
        return oldValue;
      }
      atomicfu$getAndIncrement$long() {
        var _unary__edvuaz = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = _unary__edvuaz.k4();
        return _unary__edvuaz;
      }
      atomicfu$getAndDecrement$long() {
        var _unary__edvuaz = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = _unary__edvuaz.l4();
        return _unary__edvuaz;
      }
      atomicfu$getAndAdd$long(delta) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value.f4(delta);
        return oldValue;
      }
      atomicfu$addAndGet$long(delta) {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value.f4(delta);
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$incrementAndGet$long() {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value.k4();
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$decrementAndGet$long() {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value.l4();
        return this.kotlinx$atomicfu$value;
      }
      toString() {
        return this.kotlinx$atomicfu$value.toString();
      }
    }
    initMetadataForClass($, 'AtomicLong');
    AtomicLongClass = $;
  }
  return AtomicLongClass;
}
function atomic$long$1(initial) {
  return atomic$long$(initial, None_getInstance());
}
var AtomicIntClass;
function AtomicInt() {
  if (AtomicIntClass === VOID) {
    class $ {
      constructor(value) {
        this.kotlinx$atomicfu$value = value;
      }
      p20(_set____db54di) {
        this.kotlinx$atomicfu$value = _set____db54di;
      }
      m20() {
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$compareAndSet(expect, update) {
        if (!(this.kotlinx$atomicfu$value === expect))
          return false;
        this.kotlinx$atomicfu$value = update;
        return true;
      }
      atomicfu$getAndSet(value) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = value;
        return oldValue;
      }
      atomicfu$getAndIncrement() {
        var _unary__edvuaz = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = _unary__edvuaz + 1 | 0;
        return _unary__edvuaz;
      }
      atomicfu$getAndDecrement() {
        var _unary__edvuaz = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = _unary__edvuaz - 1 | 0;
        return _unary__edvuaz;
      }
      atomicfu$getAndAdd(delta) {
        var oldValue = this.kotlinx$atomicfu$value;
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value + delta | 0;
        return oldValue;
      }
      atomicfu$addAndGet(delta) {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value + delta | 0;
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$incrementAndGet() {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value + 1 | 0;
        return this.kotlinx$atomicfu$value;
      }
      atomicfu$decrementAndGet() {
        this.kotlinx$atomicfu$value = this.kotlinx$atomicfu$value - 1 | 0;
        return this.kotlinx$atomicfu$value;
      }
      toString() {
        return this.kotlinx$atomicfu$value.toString();
      }
    }
    initMetadataForClass($, 'AtomicInt');
    AtomicIntClass = $;
  }
  return AtomicIntClass;
}
function atomic$int$1(initial) {
  return atomic$int$(initial, None_getInstance());
}
function atomic$ref$(initial, trace) {
  trace = trace === VOID ? None_getInstance() : trace;
  return new (AtomicRef())(initial);
}
function atomic$boolean$(initial, trace) {
  trace = trace === VOID ? None_getInstance() : trace;
  return new (AtomicBoolean())(initial);
}
function atomic$long$(initial, trace) {
  trace = trace === VOID ? None_getInstance() : trace;
  return new (AtomicLong())(initial);
}
function atomic$int$(initial, trace) {
  trace = trace === VOID ? None_getInstance() : trace;
  return new (AtomicInt())(initial);
}
//region block: exports
export {
  atomic$boolean$1 as atomic$boolean$1iggki4z65a2h,
  atomic$long$1 as atomic$long$129k9zwo6n9ogd,
  atomic$ref$1 as atomic$ref$130aurmcwdfdf1,
  atomic$int$1 as atomic$int$11d5swdyn6j0pu,
};
//endregion

//# sourceMappingURL=AtomicFU.mjs.map
