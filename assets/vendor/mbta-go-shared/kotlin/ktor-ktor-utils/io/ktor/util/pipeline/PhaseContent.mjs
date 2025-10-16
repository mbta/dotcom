import { toMutableList20rdgwi7d3cwi as toMutableList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  createThis2j2avj17cvnv2 as createThis,
  toString1pkumu07cwy4m as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function copiedInterceptors($this) {
  return toMutableList($this.v3l_1);
}
function copyInterceptors($this) {
  $this.v3l_1 = copiedInterceptors($this);
  $this.w3l_1 = false;
}
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.x3l_1 = ArrayList().g1();
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var PhaseContentClass;
function PhaseContent() {
  if (PhaseContentClass === VOID) {
    class $ {
      static y3l(phase, relation, interceptors) {
        Companion_getInstance();
        var $this = createThis(this);
        $this.t3l_1 = phase;
        $this.u3l_1 = relation;
        $this.v3l_1 = interceptors;
        $this.w3l_1 = true;
        return $this;
      }
      static z3l(phase, relation) {
        Companion_getInstance();
        var tmp = Companion_getInstance().x3l_1;
        var $this = this.y3l(phase, relation, isInterface(tmp, KtMutableList()) ? tmp : THROW_CCE());
        // Inline function 'kotlin.check' call
        if (!Companion_getInstance().x3l_1.h1()) {
          var message = 'The shared empty array list has been modified';
          throw IllegalStateException().o5(toString(message));
        }
        return $this;
      }
      a3m() {
        return this.v3l_1.h1();
      }
      c1() {
        return this.v3l_1.c1();
      }
      b3m(interceptor) {
        if (this.w3l_1) {
          copyInterceptors(this);
        }
        this.v3l_1.i(interceptor);
      }
      c3m(destination) {
        var interceptors = this.v3l_1;
        if (destination instanceof ArrayList()) {
          destination.r8(destination.c1() + interceptors.c1() | 0);
        }
        var inductionVariable = 0;
        var last = interceptors.c1();
        if (inductionVariable < last)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            destination.i(interceptors.e1(index));
          }
           while (inductionVariable < last);
      }
      d3m() {
        this.w3l_1 = true;
        return this.v3l_1;
      }
      toString() {
        return 'Phase `' + this.t3l_1.e3m_1 + '`, ' + this.c1() + ' handlers';
      }
    }
    initMetadataForClass($, 'PhaseContent');
    PhaseContentClass = $;
  }
  return PhaseContentClass;
}
//region block: exports
export {
  PhaseContent as PhaseContent20yhla4zqpd2q,
};
//endregion

//# sourceMappingURL=PhaseContent.mjs.map
