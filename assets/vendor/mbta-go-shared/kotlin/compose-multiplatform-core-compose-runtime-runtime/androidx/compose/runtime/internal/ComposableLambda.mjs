import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { RecomposeScopeImpl15912wzsvt7nn as RecomposeScopeImpl } from '../RecomposeScopeImpl.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
var lambdaKey;
var androidx_compose_runtime_internal_ComposableLambdaImpl$stable;
function composableLambdaInstance(key, tracked, block) {
  _init_properties_ComposableLambda_kt__wilkc();
  return new (ComposableLambdaImpl())(key, tracked, block);
}
function trackRead($this, composer) {
  if ($this.b7n_1) {
    var scope = composer.f6y();
    if (!(scope == null)) {
      composer.i6y(scope);
      var lastScope = $this.d7n_1;
      if (replacableWith(lastScope, scope)) {
        $this.d7n_1 = scope;
      } else {
        var lastScopes = $this.e7n_1;
        if (lastScopes == null) {
          // Inline function 'kotlin.collections.mutableListOf' call
          var newScopes = ArrayList().g1();
          $this.e7n_1 = newScopes;
          newScopes.i(scope);
        } else {
          var inductionVariable = 0;
          var last = lastScopes.c1();
          if (inductionVariable < last)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var scopeAtIndex = lastScopes.e1(index);
              if (replacableWith(scopeAtIndex, scope)) {
                lastScopes.q3(index, scope);
                return Unit_instance;
              }
            }
             while (inductionVariable < last);
          lastScopes.i(scope);
        }
      }
    }
  }
}
function ComposableLambdaImpl$invoke$ref(p0) {
  return function (receiver, p0_0) {
    p0.x6v(receiver, p0_0);
    return Unit_instance;
  };
}
var ComposableLambdaImplClass;
function ComposableLambdaImpl() {
  if (ComposableLambdaImplClass === VOID) {
    class $ {
      constructor(key, tracked, block) {
        this.a7n_1 = key;
        this.b7n_1 = tracked;
        this.c7n_1 = block;
        this.d7n_1 = null;
        this.e7n_1 = null;
      }
      x6v(c, changed) {
        var c_0 = c.n6x(this.a7n_1);
        trackRead(this, c_0);
        var dirty = changed | (c_0.s6m(this) ? differentBits(0) : sameBits(0));
        var tmp = this.c7n_1;
        var result = ((!(tmp == null) ? typeof tmp === 'function' : false) ? tmp : THROW_CCE())(c_0, dirty);
        var tmp0_safe_receiver = c_0.o6x();
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.n74(ComposableLambdaImpl$invoke$ref(this));
        }
        return result;
      }
    }
    initMetadataForClass($, 'ComposableLambdaImpl');
    ComposableLambdaImplClass = $;
  }
  return ComposableLambdaImplClass;
}
function replacableWith(_this__u8e3s4, other) {
  _init_properties_ComposableLambda_kt__wilkc();
  var tmp;
  if (_this__u8e3s4 == null) {
    tmp = true;
  } else {
    var tmp_0;
    var tmp_1;
    if (_this__u8e3s4 instanceof RecomposeScopeImpl()) {
      tmp_1 = other instanceof RecomposeScopeImpl();
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = !_this__u8e3s4.s6y() || equals(_this__u8e3s4, other) || equals(_this__u8e3s4.z6j_1, other.z6j_1);
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function differentBits(slot) {
  _init_properties_ComposableLambda_kt__wilkc();
  return bitsForSlot(2, slot);
}
function sameBits(slot) {
  _init_properties_ComposableLambda_kt__wilkc();
  return bitsForSlot(1, slot);
}
function bitsForSlot(bits, slot) {
  _init_properties_ComposableLambda_kt__wilkc();
  var realSlot = slot % 10 | 0;
  return bits << (imul(realSlot, 3) + 1 | 0);
}
var properties_initialized_ComposableLambda_kt_u87f2i;
function _init_properties_ComposableLambda_kt__wilkc() {
  if (!properties_initialized_ComposableLambda_kt_u87f2i) {
    properties_initialized_ComposableLambda_kt_u87f2i = true;
    lambdaKey = new Object();
    androidx_compose_runtime_internal_ComposableLambdaImpl$stable = 0;
  }
}
//region block: exports
export {
  composableLambdaInstance as composableLambdaInstance3tvqar9a11755,
};
//endregion

//# sourceMappingURL=ComposableLambda.mjs.map
