import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from './hacks.mjs';
import {
  isSuspendFunction153vlp5l2npj9 as isSuspendFunction,
  isInterface3d6p8outrmvmk as isInterface,
} from './js/typeCheckUtils.mjs';
import { Continuation1aa2oekvx7jm7 as Continuation } from './coroutines/Continuation.mjs';
import { EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance } from './coroutines/CoroutineContextImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from './coroutines/intrinsics/Intrinsics.mjs';
import {
  Result3t1vadv16kmzk as Result,
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
} from './Result.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
import { startCoroutineUninterceptedOrReturnNonGeneratorVersioncvnobqk7h8r9 as startCoroutineUninterceptedOrReturnNonGeneratorVersion } from './coroutines/intrinsics/IntrinsicsJs.mjs';
import { equals2au1ep9vhcato as equals } from './js/coreRuntime.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_UNDEFINED_RESULT() {
  _init_properties_DeepRecursive_kt__zbwcac();
  return UNDEFINED_RESULT;
}
var UNDEFINED_RESULT;
var DeepRecursiveScopeClass;
function DeepRecursiveScope() {
  if (DeepRecursiveScopeClass === VOID) {
    class $ {}
    initMetadataForClass($, 'DeepRecursiveScope', VOID, VOID, VOID, [1, 2]);
    DeepRecursiveScopeClass = $;
  }
  return DeepRecursiveScopeClass;
}
function invoke(_this__u8e3s4, value) {
  _init_properties_DeepRecursive_kt__zbwcac();
  return (new (DeepRecursiveScopeImpl())(_this__u8e3s4.ow_1, value)).tw();
}
var DeepRecursiveFunctionClass;
function DeepRecursiveFunction() {
  if (DeepRecursiveFunctionClass === VOID) {
    class $ {
      constructor(block) {
        this.ow_1 = block;
      }
    }
    initMetadataForClass($, 'DeepRecursiveFunction');
    DeepRecursiveFunctionClass = $;
  }
  return DeepRecursiveFunctionClass;
}
var DeepRecursiveScopeImplClass;
function DeepRecursiveScopeImpl() {
  if (DeepRecursiveScopeImplClass === VOID) {
    class $ extends DeepRecursiveScope() {
      constructor(block, value) {
        super();
        var tmp = this;
        tmp.pw_1 = isSuspendFunction(block, 2) ? block : THROW_CCE();
        this.qw_1 = value;
        var tmp_0 = this;
        tmp_0.rw_1 = isInterface(this, Continuation()) ? this : THROW_CCE();
        this.sw_1 = get_UNDEFINED_RESULT();
      }
      ld() {
        return EmptyCoroutineContext_getInstance();
      }
      uw(result) {
        this.rw_1 = null;
        this.sw_1 = result;
      }
      qd(result) {
        return this.uw(result);
      }
      nw(value, $completion) {
        var tmp = this;
        tmp.rw_1 = isInterface($completion, Continuation()) ? $completion : THROW_CCE();
        this.qw_1 = value;
        return get_COROUTINE_SUSPENDED();
      }
      tw() {
        $l$loop: while (true) {
          var result = this.sw_1;
          var tmp0_elvis_lhs = this.rw_1;
          var tmp;
          if (tmp0_elvis_lhs == null) {
            // Inline function 'kotlin.getOrThrow' call
            var this_0 = new (Result())(result) instanceof Result() ? result : THROW_CCE();
            throwOnFailure(this_0);
            var tmp_0 = _Result___get_value__impl__bjfvqg(this_0);
            return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var cont = tmp;
          if (equals(get_UNDEFINED_RESULT(), result)) {
            var tmp_1;
            try {
              var tmp0 = this.pw_1;
              // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
              var param = this.qw_1;
              tmp_1 = startCoroutineUninterceptedOrReturnNonGeneratorVersion(tmp0, this, param, cont);
            } catch ($p) {
              var tmp_2;
              if ($p instanceof Error) {
                var e = $p;
                // Inline function 'kotlin.coroutines.resumeWithException' call
                // Inline function 'kotlin.Companion.failure' call
                var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(e));
                cont.qd(tmp$ret$2);
                continue $l$loop;
              } else {
                throw $p;
              }
            }
            var r = tmp_1;
            if (!(r === get_COROUTINE_SUSPENDED())) {
              // Inline function 'kotlin.coroutines.resume' call
              // Inline function 'kotlin.Companion.success' call
              var value = (r == null ? true : !(r == null)) ? r : THROW_CCE();
              var tmp$ret$4 = _Result___init__impl__xyqfz8(value);
              cont.qd(tmp$ret$4);
            }
          } else {
            this.sw_1 = get_UNDEFINED_RESULT();
            cont.qd(result);
          }
        }
      }
    }
    initMetadataForClass($, 'DeepRecursiveScopeImpl', VOID, VOID, [DeepRecursiveScope(), Continuation()], [1, 2]);
    DeepRecursiveScopeImplClass = $;
  }
  return DeepRecursiveScopeImplClass;
}
var properties_initialized_DeepRecursive_kt_5z0al2;
function _init_properties_DeepRecursive_kt__zbwcac() {
  if (!properties_initialized_DeepRecursive_kt_5z0al2) {
    properties_initialized_DeepRecursive_kt_5z0al2 = true;
    // Inline function 'kotlin.Companion.success' call
    var value = get_COROUTINE_SUSPENDED();
    UNDEFINED_RESULT = _Result___init__impl__xyqfz8(value);
  }
}
//region block: exports
export {
  DeepRecursiveFunction as DeepRecursiveFunction3r49v8igsve1g,
  DeepRecursiveScope as DeepRecursiveScope1pqaydvh4vdcu,
  invoke as invoke246lvi6tzooz1,
};
//endregion

//# sourceMappingURL=DeepRecursive.mjs.map
