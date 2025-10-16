import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { ensureNotNull1e947j3ixpazm as ensureNotNull } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var NodeClass;
function Node() {
  if (NodeClass === VOID) {
    class $ {
      constructor(item, next) {
        this.j5z_1 = item;
        this.k5z_1 = next;
      }
    }
    initMetadataForClass($, 'Node');
    NodeClass = $;
  }
  return NodeClass;
}
var engines$iterator$1Class;
function engines$iterator$1() {
  if (engines$iterator$1Class === VOID) {
    class $ {
      constructor() {
        this.l5z_1 = engines_getInstance().h5u_1.kotlinx$atomicfu$value;
      }
      z() {
        var result = ensureNotNull(this.l5z_1);
        this.l5z_1 = result.k5z_1;
        return result.j5z_1;
      }
      y() {
        return !(null == this.l5z_1);
      }
    }
    initMetadataForClass($);
    engines$iterator$1Class = $;
  }
  return engines$iterator$1Class;
}
var enginesClass;
function engines() {
  if (enginesClass === VOID) {
    class $ {
      constructor() {
        engines_instance = this;
        this.h5u_1 = atomic$ref$1(null);
      }
      i5u(item) {
        $l$loop: while (true) {
          var current = this.h5u_1.kotlinx$atomicfu$value;
          var new_0 = new (Node())(item, current);
          if (this.h5u_1.atomicfu$compareAndSet(current, new_0))
            break $l$loop;
        }
      }
      x() {
        return new (engines$iterator$1())();
      }
    }
    initMetadataForObject($, 'engines');
    enginesClass = $;
  }
  return enginesClass;
}
var engines_instance;
function engines_getInstance() {
  if (engines_instance === VOID)
    new (engines())();
  return engines_instance;
}
//region block: exports
export {
  engines_getInstance as engines_getInstance22b5c23elux9m,
};
//endregion

//# sourceMappingURL=Loader.mjs.map
