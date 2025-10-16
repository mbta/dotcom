import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { plus20p0vtfmu0596 as plus } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { KtList3hktaavzmj137 as KtList } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { CancellableContinuationpb2x00mxmcbt as CancellableContinuation } from '../CancellableContinuation.mjs';
import { CancelHandler3ic7xysezxbm5 as CancelHandler } from '../CancellableContinuationImpl.mjs';
import { Waiter3lxa2a79zyo0g as Waiter } from '../Waiter.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
import { Symbol17xuwzgi5g8ve as Symbol } from '../internal/Symbol.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DUMMY_PROCESS_RESULT_FUNCTION;
function get_STATE_REG() {
  _init_properties_Select_kt__zhm2jg();
  return STATE_REG;
}
var STATE_REG;
function get_STATE_COMPLETED() {
  _init_properties_Select_kt__zhm2jg();
  return STATE_COMPLETED;
}
var STATE_COMPLETED;
function get_STATE_CANCELLED() {
  _init_properties_Select_kt__zhm2jg();
  return STATE_CANCELLED;
}
var STATE_CANCELLED;
function get_NO_RESULT() {
  _init_properties_Select_kt__zhm2jg();
  return NO_RESULT;
}
var NO_RESULT;
var PARAM_CLAUSE_0;
var SelectInstanceClass;
function SelectInstance() {
  if (SelectInstanceClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'SelectInstance');
    SelectInstanceClass = $;
  }
  return SelectInstanceClass;
}
function trySelectInternal($this, clauseObject, internalResult) {
  $l$loop: while (true) {
    var curState = $this.j2i_1.kotlinx$atomicfu$value;
    if (isInterface(curState, CancellableContinuation())) {
      var tmp0_elvis_lhs = findClause($this, clauseObject);
      var tmp;
      if (tmp0_elvis_lhs == null) {
        continue $l$loop;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var clause = tmp;
      var onCancellation = clause.m2v($this, internalResult);
      if ($this.j2i_1.atomicfu$compareAndSet(curState, clause)) {
        var cont = isInterface(curState, CancellableContinuation()) ? curState : THROW_CCE();
        $this.l2i_1 = internalResult;
        if (tryResume(cont, onCancellation))
          return 0;
        $this.l2i_1 = get_NO_RESULT();
        return 2;
      }
    } else {
      var tmp_0;
      if (equals(curState, get_STATE_COMPLETED())) {
        tmp_0 = true;
      } else {
        tmp_0 = curState instanceof ClauseData();
      }
      if (tmp_0)
        return 3;
      else {
        if (equals(curState, get_STATE_CANCELLED()))
          return 2;
        else {
          if (equals(curState, get_STATE_REG())) {
            if ($this.j2i_1.atomicfu$compareAndSet(curState, listOf(clauseObject)))
              return 1;
          } else {
            if (isInterface(curState, KtList())) {
              if ($this.j2i_1.atomicfu$compareAndSet(curState, plus(curState, clauseObject)))
                return 1;
            } else {
              // Inline function 'kotlin.error' call
              var message = 'Unexpected state: ' + toString(curState);
              throw IllegalStateException().o5(toString(message));
            }
          }
        }
      }
    }
  }
}
function findClause($this, clauseObject) {
  var tmp0_elvis_lhs = $this.k2i_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var clauses = tmp;
  // Inline function 'kotlin.collections.find' call
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = clauses.x();
    while (_iterator__ex2g4s.y()) {
      var element = _iterator__ex2g4s.z();
      if (element.j2v_1 === clauseObject) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var tmp1_elvis_lhs = tmp$ret$1;
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    var message = 'Clause with object ' + toString(clauseObject) + ' is not found';
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  return tmp_0;
}
var ClauseDataClass;
function ClauseData() {
  if (ClauseDataClass === VOID) {
    class $ {
      m2v(select, internalResult) {
        var tmp0_safe_receiver = this.l2v_1;
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver(select, this.k2v_1, internalResult);
      }
    }
    initMetadataForClass($, 'ClauseData', VOID, VOID, VOID, [1]);
    ClauseDataClass = $;
  }
  return ClauseDataClass;
}
var SelectImplementationClass;
function SelectImplementation() {
  if (SelectImplementationClass === VOID) {
    class $ {
      m2i(clauseObject, result) {
        return TrySelectDetailedResult_0(trySelectInternal(this, clauseObject, result));
      }
    }
    initMetadataForClass($, 'SelectImplementation', VOID, VOID, [CancelHandler(), SelectInstance(), Waiter()], [0, 2]);
    SelectImplementationClass = $;
  }
  return SelectImplementationClass;
}
var TrySelectDetailedResult_SUCCESSFUL_instance;
var TrySelectDetailedResult_REREGISTER_instance;
var TrySelectDetailedResult_CANCELLED_instance;
var TrySelectDetailedResult_ALREADY_SELECTED_instance;
var TrySelectDetailedResult_entriesInitialized;
function TrySelectDetailedResult_initEntries() {
  if (TrySelectDetailedResult_entriesInitialized)
    return Unit_instance;
  TrySelectDetailedResult_entriesInitialized = true;
  TrySelectDetailedResult_SUCCESSFUL_instance = new (TrySelectDetailedResult())('SUCCESSFUL', 0);
  TrySelectDetailedResult_REREGISTER_instance = new (TrySelectDetailedResult())('REREGISTER', 1);
  TrySelectDetailedResult_CANCELLED_instance = new (TrySelectDetailedResult())('CANCELLED', 2);
  TrySelectDetailedResult_ALREADY_SELECTED_instance = new (TrySelectDetailedResult())('ALREADY_SELECTED', 3);
}
var TrySelectDetailedResultClass;
function TrySelectDetailedResult() {
  if (TrySelectDetailedResultClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'TrySelectDetailedResult');
    TrySelectDetailedResultClass = $;
  }
  return TrySelectDetailedResultClass;
}
function TrySelectDetailedResult_0(trySelectInternalResult) {
  _init_properties_Select_kt__zhm2jg();
  var tmp;
  switch (trySelectInternalResult) {
    case 0:
      tmp = TrySelectDetailedResult_SUCCESSFUL_getInstance();
      break;
    case 1:
      tmp = TrySelectDetailedResult_REREGISTER_getInstance();
      break;
    case 2:
      tmp = TrySelectDetailedResult_CANCELLED_getInstance();
      break;
    case 3:
      tmp = TrySelectDetailedResult_ALREADY_SELECTED_getInstance();
      break;
    default:
      var message = 'Unexpected internal result: ' + trySelectInternalResult;
      throw IllegalStateException().o5(toString(message));
  }
  return tmp;
}
function tryResume(_this__u8e3s4, onCancellation) {
  _init_properties_Select_kt__zhm2jg();
  var tmp0_elvis_lhs = _this__u8e3s4.j24(Unit_instance, null, onCancellation);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var token = tmp;
  _this__u8e3s4.k24(token);
  return true;
}
function DUMMY_PROCESS_RESULT_FUNCTION$lambda(_unused_var__etf5q3, _unused_var__etf5q3_0, _unused_var__etf5q3_1) {
  _init_properties_Select_kt__zhm2jg();
  return null;
}
function TrySelectDetailedResult_SUCCESSFUL_getInstance() {
  TrySelectDetailedResult_initEntries();
  return TrySelectDetailedResult_SUCCESSFUL_instance;
}
function TrySelectDetailedResult_REREGISTER_getInstance() {
  TrySelectDetailedResult_initEntries();
  return TrySelectDetailedResult_REREGISTER_instance;
}
function TrySelectDetailedResult_CANCELLED_getInstance() {
  TrySelectDetailedResult_initEntries();
  return TrySelectDetailedResult_CANCELLED_instance;
}
function TrySelectDetailedResult_ALREADY_SELECTED_getInstance() {
  TrySelectDetailedResult_initEntries();
  return TrySelectDetailedResult_ALREADY_SELECTED_instance;
}
var properties_initialized_Select_kt_7rpl36;
function _init_properties_Select_kt__zhm2jg() {
  if (!properties_initialized_Select_kt_7rpl36) {
    properties_initialized_Select_kt_7rpl36 = true;
    DUMMY_PROCESS_RESULT_FUNCTION = DUMMY_PROCESS_RESULT_FUNCTION$lambda;
    STATE_REG = new (Symbol())('STATE_REG');
    STATE_COMPLETED = new (Symbol())('STATE_COMPLETED');
    STATE_CANCELLED = new (Symbol())('STATE_CANCELLED');
    NO_RESULT = new (Symbol())('NO_RESULT');
    PARAM_CLAUSE_0 = new (Symbol())('PARAM_CLAUSE_0');
  }
}
//region block: exports
export {
  TrySelectDetailedResult_REREGISTER_getInstance as TrySelectDetailedResult_REREGISTER_getInstance2a0bjw99yymto,
  TrySelectDetailedResult_SUCCESSFUL_getInstance as TrySelectDetailedResult_SUCCESSFUL_getInstance2uasownw8ahu5,
  SelectImplementation as SelectImplementation59ci94k9x9wm,
  SelectInstance as SelectInstance2isepgzfsd8ur,
};
//endregion

//# sourceMappingURL=Select.mjs.map
