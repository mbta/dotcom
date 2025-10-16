import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
} from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../Library.mjs';
import {
  equals2au1ep9vhcato as equals,
  createThis2j2avj17cvnv2 as createThis,
  hashCodeq5arwsb9dgti as hashCode,
} from '../js/coreRuntime.mjs';
import { AbstractSet2mw1ev10zm1bz as AbstractSet } from './AbstractSet.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../hacks.mjs';
import { AbstractCollection1g9uvtcheckwb as AbstractCollection } from './AbstractCollection.mjs';
import {
  Collection1k04j3hzsbod0 as Collection,
  Entry2xmjmyutzoq3p as Entry,
  KtMap140uvy3s5zad8 as KtMap,
} from './Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../js/typeCheckUtils.mjs';
import { joinToString1cxrrlmo0chqs as joinToString } from './_Collections.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var AbstractMap$keys$1$iterator$1Class;
function AbstractMap$keys$1$iterator$1() {
  if (AbstractMap$keys$1$iterator$1Class === VOID) {
    class $ {
      constructor($entryIterator) {
        this.wm_1 = $entryIterator;
      }
      y() {
        return this.wm_1.y();
      }
      z() {
        return this.wm_1.z().u1();
      }
    }
    initMetadataForClass($);
    AbstractMap$keys$1$iterator$1Class = $;
  }
  return AbstractMap$keys$1$iterator$1Class;
}
var AbstractMap$values$1$iterator$1Class;
function AbstractMap$values$1$iterator$1() {
  if (AbstractMap$values$1$iterator$1Class === VOID) {
    class $ {
      constructor($entryIterator) {
        this.xm_1 = $entryIterator;
      }
      y() {
        return this.xm_1.y();
      }
      z() {
        return this.xm_1.z().v1();
      }
    }
    initMetadataForClass($);
    AbstractMap$values$1$iterator$1Class = $;
  }
  return AbstractMap$values$1$iterator$1Class;
}
function toString_0($this, entry) {
  return toString_1($this, entry.u1()) + '=' + toString_1($this, entry.v1());
}
function toString_1($this, o) {
  return o === $this ? '(this Map)' : toString(o);
}
function implFindEntry($this, key) {
  var tmp0 = $this.t1();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (equals(element.u1(), key)) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  return tmp$ret$1;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {}
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var AbstractMap$keys$1Class;
function AbstractMap$keys$1() {
  if (AbstractMap$keys$1Class === VOID) {
    class $ extends AbstractSet() {
      static zm(this$0, $box) {
        if ($box === VOID)
          $box = {};
        $box.ym_1 = this$0;
        return this.an($box);
      }
      r9(element) {
        return this.ym_1.h3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.r9((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        var entryIterator = this.ym_1.t1().x();
        return new (AbstractMap$keys$1$iterator$1())(entryIterator);
      }
      c1() {
        return this.ym_1.c1();
      }
    }
    initMetadataForClass($);
    AbstractMap$keys$1Class = $;
  }
  return AbstractMap$keys$1Class;
}
function AbstractMap$toString$lambda(this$0) {
  return function (it) {
    return toString_0(this$0, it);
  };
}
var AbstractMap$values$1Class;
function AbstractMap$values$1() {
  if (AbstractMap$values$1Class === VOID) {
    class $ extends AbstractCollection() {
      static cn(this$0, $box) {
        if ($box === VOID)
          $box = {};
        $box.bn_1 = this$0;
        return this.x6($box);
      }
      ba(element) {
        return this.bn_1.i3(element);
      }
      j1(element) {
        if (!(element == null ? true : !(element == null)))
          return false;
        return this.ba((element == null ? true : !(element == null)) ? element : THROW_CCE());
      }
      x() {
        var entryIterator = this.bn_1.t1().x();
        return new (AbstractMap$values$1$iterator$1())(entryIterator);
      }
      c1() {
        return this.bn_1.c1();
      }
    }
    initMetadataForClass($);
    AbstractMap$values$1Class = $;
  }
  return AbstractMap$values$1Class;
}
var AbstractMapClass;
function AbstractMap() {
  if (AbstractMapClass === VOID) {
    class $ {
      static e8() {
        var $this = createThis(this);
        $this.c8_1 = null;
        $this.d8_1 = null;
        return $this;
      }
      h3(key) {
        return !(implFindEntry(this, key) == null);
      }
      i3(value) {
        var tmp0 = this.t1();
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.any' call
          var tmp;
          if (isInterface(tmp0, Collection())) {
            tmp = tmp0.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = false;
            break $l$block_0;
          }
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (equals(element.v1(), value)) {
              tmp$ret$0 = true;
              break $l$block_0;
            }
          }
          tmp$ret$0 = false;
        }
        return tmp$ret$0;
      }
      l8(entry) {
        if (!(!(entry == null) ? isInterface(entry, Entry()) : false))
          return false;
        var key = entry.u1();
        var value = entry.v1();
        // Inline function 'kotlin.collections.get' call
        var ourValue = (isInterface(this, KtMap()) ? this : THROW_CCE()).j3(key);
        if (!equals(value, ourValue)) {
          return false;
        }
        var tmp;
        if (ourValue == null) {
          // Inline function 'kotlin.collections.containsKey' call
          tmp = !(isInterface(this, KtMap()) ? this : THROW_CCE()).h3(key);
        } else {
          tmp = false;
        }
        if (tmp) {
          return false;
        }
        return true;
      }
      equals(other) {
        if (other === this)
          return true;
        if (!(!(other == null) ? isInterface(other, KtMap()) : false))
          return false;
        if (!(this.c1() === other.c1()))
          return false;
        var tmp0 = other.t1();
        var tmp$ret$0;
        $l$block_0: {
          // Inline function 'kotlin.collections.all' call
          var tmp;
          if (isInterface(tmp0, Collection())) {
            tmp = tmp0.h1();
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$0 = true;
            break $l$block_0;
          }
          var _iterator__ex2g4s = tmp0.x();
          while (_iterator__ex2g4s.y()) {
            var element = _iterator__ex2g4s.z();
            if (!this.l8(element)) {
              tmp$ret$0 = false;
              break $l$block_0;
            }
          }
          tmp$ret$0 = true;
        }
        return tmp$ret$0;
      }
      j3(key) {
        var tmp0_safe_receiver = implFindEntry(this, key);
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v1();
      }
      hashCode() {
        return hashCode(this.t1());
      }
      h1() {
        return this.c1() === 0;
      }
      c1() {
        return this.t1().c1();
      }
      k3() {
        if (this.c8_1 == null) {
          var tmp = this;
          tmp.c8_1 = AbstractMap$keys$1().zm(this);
        }
        return ensureNotNull(this.c8_1);
      }
      toString() {
        var tmp = this.t1();
        return joinToString(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
      }
      l3() {
        if (this.d8_1 == null) {
          var tmp = this;
          tmp.d8_1 = AbstractMap$values$1().cn(this);
        }
        return ensureNotNull(this.d8_1);
      }
    }
    initMetadataForClass($, 'AbstractMap', VOID, VOID, [KtMap()]);
    AbstractMapClass = $;
  }
  return AbstractMapClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  AbstractMap as AbstractMap3sqd8xvg0030s,
};
//endregion

//# sourceMappingURL=AbstractMap.mjs.map
