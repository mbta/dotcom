import { KMutableProperty11e8g1gb0ecb9j as KMutableProperty1 } from '../../../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { pipelineContextFor1bwb6ae3xig1h as pipelineContextFor } from './PipelineContext.mjs';
import { PhaseContent20yhla4zqpd2q as PhaseContent } from './PhaseContent.mjs';
import {
  Last_getInstance1ndvgpf0ogell as Last_getInstance,
  After9djz11pmyzvq as After,
  Beforeyqm571m7tesc as Before,
} from './PipelinePhaseRelation.mjs';
import {
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  emptyList1g2z5xcrvp2zy as emptyList,
  get_lastIndex1yw0x4k50k51w as get_lastIndex,
  mutableListOf6oorvk2mtdmp as mutableListOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { KtMutableList1beimitadwkna as KtMutableList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Collections.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import {
  equals2au1ep9vhcato as equals,
  anyToString3ho3k49fc56mj as anyToString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { last1vo29oleiqj36 as last } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_Collections.mjs';
import { AttributesJsFn25rjfgcprgprf as AttributesJsFn } from '../AttributesJs.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from '../../../../../kotlinx-atomicfu/kotlinx/atomicfu/AtomicFU.mjs';
import { InvalidPhaseExceptionxbo9a9gosqf3 as InvalidPhaseException } from './PipelinePhase.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function _set_interceptors__wod97b($this, _set____db54di) {
  var tmp0 = $this.j3m_1;
  var tmp = KMutableProperty1();
  var tmp_0 = Pipeline$_get_interceptors_$ref_u6zl4e_0();
  // Inline function 'kotlinx.atomicfu.AtomicRef.setValue' call
  getPropertyCallableRef('interceptors', 1, tmp, tmp_0, Pipeline$_set_interceptors_$ref_13vc1m_0());
  tmp0.kotlinx$atomicfu$value = _set____db54di;
  return Unit_instance;
}
function _get_interceptors__h4min7($this) {
  var tmp0 = $this.j3m_1;
  var tmp = KMutableProperty1();
  var tmp_0 = Pipeline$_get_interceptors_$ref_u6zl4e();
  // Inline function 'kotlinx.atomicfu.AtomicRef.getValue' call
  getPropertyCallableRef('interceptors', 1, tmp, tmp_0, Pipeline$_set_interceptors_$ref_13vc1m());
  return tmp0.kotlinx$atomicfu$value;
}
function createContext($this, context, subject, coroutineContext) {
  return pipelineContextFor(context, sharedInterceptorsList($this), subject, coroutineContext, $this.m3m());
}
function findPhase($this, phase) {
  var phasesList = $this.h3m_1;
  var inductionVariable = 0;
  var last = phasesList.c1();
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var current = phasesList.e1(index);
      if (current === phase) {
        var content = PhaseContent().z3l(phase, Last_getInstance());
        phasesList.q3(index, content);
        return content;
      }
      var tmp;
      if (current instanceof PhaseContent()) {
        tmp = current.t3l_1 === phase;
      } else {
        tmp = false;
      }
      if (tmp) {
        return current instanceof PhaseContent() ? current : THROW_CCE();
      }
    }
     while (inductionVariable < last);
  return null;
}
function findPhaseIndex($this, phase) {
  var phasesList = $this.h3m_1;
  var inductionVariable = 0;
  var last = phasesList.c1();
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var current = phasesList.e1(index);
      var tmp;
      if (current === phase) {
        tmp = true;
      } else {
        var tmp_0;
        if (current instanceof PhaseContent()) {
          tmp_0 = current.t3l_1 === phase;
        } else {
          tmp_0 = false;
        }
        tmp = tmp_0;
      }
      if (tmp) {
        return index;
      }
    }
     while (inductionVariable < last);
  return -1;
}
function hasPhase($this, phase) {
  var phasesList = $this.h3m_1;
  var inductionVariable = 0;
  var last = phasesList.c1();
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var current = phasesList.e1(index);
      var tmp;
      if (current === phase) {
        tmp = true;
      } else {
        var tmp_0;
        if (current instanceof PhaseContent()) {
          tmp_0 = current.t3l_1 === phase;
        } else {
          tmp_0 = false;
        }
        tmp = tmp_0;
      }
      if (tmp) {
        return true;
      }
    }
     while (inductionVariable < last);
  return false;
}
function cacheInterceptors($this) {
  var interceptorsQuantity = $this.i3m_1;
  if (interceptorsQuantity === 0) {
    notSharedInterceptorsList($this, emptyList());
    return emptyList();
  }
  var phases = $this.h3m_1;
  if (interceptorsQuantity === 1) {
    var inductionVariable = 0;
    var last = get_lastIndex(phases);
    if (inductionVariable <= last)
      $l$loop_0: do {
        var phaseIndex = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = phases.e1(phaseIndex);
        var tmp0_elvis_lhs = tmp instanceof PhaseContent() ? tmp : null;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          continue $l$loop_0;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var phaseContent = tmp_0;
        if (phaseContent.a3m())
          continue $l$loop_0;
        var interceptors = phaseContent.d3m();
        setInterceptorsListFromPhase($this, phaseContent);
        return interceptors;
      }
       while (!(phaseIndex === last));
  }
  // Inline function 'kotlin.collections.mutableListOf' call
  var destination = ArrayList().g1();
  var inductionVariable_0 = 0;
  var last_0 = get_lastIndex(phases);
  if (inductionVariable_0 <= last_0)
    $l$loop_1: do {
      var phaseIndex_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      var tmp_1 = phases.e1(phaseIndex_0);
      var tmp1_elvis_lhs = tmp_1 instanceof PhaseContent() ? tmp_1 : null;
      var tmp_2;
      if (tmp1_elvis_lhs == null) {
        continue $l$loop_1;
      } else {
        tmp_2 = tmp1_elvis_lhs;
      }
      var phase = tmp_2;
      phase.c3m(destination);
    }
     while (!(phaseIndex_0 === last_0));
  notSharedInterceptorsList($this, destination);
  return destination;
}
function sharedInterceptorsList($this) {
  if (_get_interceptors__h4min7($this) == null) {
    cacheInterceptors($this);
  }
  $this.k3m_1 = true;
  return ensureNotNull(_get_interceptors__h4min7($this));
}
function resetInterceptorsList($this) {
  _set_interceptors__wod97b($this, null);
  $this.k3m_1 = false;
  $this.l3m_1 = null;
}
function notSharedInterceptorsList($this, list) {
  _set_interceptors__wod97b($this, list);
  $this.k3m_1 = false;
  $this.l3m_1 = null;
}
function setInterceptorsListFromPhase($this, phaseContent) {
  _set_interceptors__wod97b($this, phaseContent.d3m());
  $this.k3m_1 = false;
  $this.l3m_1 = phaseContent.t3l_1;
}
function tryAddToPhaseFastPath($this, phase, block) {
  var currentInterceptors = _get_interceptors__h4min7($this);
  if ($this.h3m_1.h1() || currentInterceptors == null) {
    return false;
  }
  var tmp;
  if ($this.k3m_1) {
    tmp = true;
  } else {
    tmp = !(!(currentInterceptors == null) ? isInterface(currentInterceptors, KtMutableList()) : false);
  }
  if (tmp) {
    return false;
  }
  if (equals($this.l3m_1, phase)) {
    currentInterceptors.i(block);
    return true;
  }
  if (equals(phase, last($this.h3m_1)) || findPhaseIndex($this, phase) === get_lastIndex($this.h3m_1)) {
    ensureNotNull(findPhase($this, phase)).b3m(block);
    currentInterceptors.i(block);
    return true;
  }
  return false;
}
function Pipeline$_get_interceptors_$ref_u6zl4e() {
  return function (p0) {
    return _get_interceptors__h4min7(p0);
  };
}
function Pipeline$_set_interceptors_$ref_13vc1m() {
  return function (p0, p1) {
    _set_interceptors__wod97b(p0, p1);
    return Unit_instance;
  };
}
function Pipeline$_get_interceptors_$ref_u6zl4e_0() {
  return function (p0) {
    return _get_interceptors__h4min7(p0);
  };
}
function Pipeline$_set_interceptors_$ref_13vc1m_0() {
  return function (p0, p1) {
    _set_interceptors__wod97b(p0, p1);
    return Unit_instance;
  };
}
var PipelineClass;
function Pipeline() {
  if (PipelineClass === VOID) {
    class $ {
      constructor(phases) {
        this.f3m_1 = AttributesJsFn(true);
        this.g3m_1 = false;
        this.h3m_1 = mutableListOf(phases.slice());
        this.i3m_1 = 0;
        this.j3m_1 = atomic$ref$1(null);
        this.k3m_1 = false;
        this.l3m_1 = null;
      }
      m3m() {
        return this.g3m_1;
      }
      n3m(context, subject, $completion) {
        // Inline function 'kotlin.js.getCoroutineContext' call
        var tmp$ret$0 = $completion.ld();
        return createContext(this, context, subject, tmp$ret$0).s3l(subject, $completion);
      }
      p3m(reference, phase) {
        if (hasPhase(this, phase))
          return Unit_instance;
        var index = findPhaseIndex(this, reference);
        if (index === -1) {
          throw new (InvalidPhaseException())('Phase ' + reference.toString() + ' was not registered for this pipeline');
        }
        var lastRelatedPhaseIndex = index;
        var inductionVariable = index + 1 | 0;
        var last = get_lastIndex(this.h3m_1);
        if (inductionVariable <= last)
          $l$loop_0: do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = this.h3m_1.e1(i);
            var tmp0_safe_receiver = tmp instanceof PhaseContent() ? tmp : null;
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u3l_1;
            var tmp_0;
            if (tmp1_elvis_lhs == null) {
              break $l$loop_0;
            } else {
              tmp_0 = tmp1_elvis_lhs;
            }
            var relation = tmp_0;
            var tmp2_safe_receiver = relation instanceof After() ? relation : null;
            var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.q3m_1;
            var tmp_1;
            if (tmp3_elvis_lhs == null) {
              continue $l$loop_0;
            } else {
              tmp_1 = tmp3_elvis_lhs;
            }
            var relatedTo = tmp_1;
            lastRelatedPhaseIndex = equals(relatedTo, reference) ? i : lastRelatedPhaseIndex;
          }
           while (!(i === last));
        this.h3m_1.r3(lastRelatedPhaseIndex + 1 | 0, PhaseContent().z3l(phase, new (After())(reference)));
      }
      r3m(reference, phase) {
        if (hasPhase(this, phase))
          return Unit_instance;
        var index = findPhaseIndex(this, reference);
        if (index === -1) {
          throw new (InvalidPhaseException())('Phase ' + reference.toString() + ' was not registered for this pipeline');
        }
        this.h3m_1.r3(index, PhaseContent().z3l(phase, new (Before())(reference)));
      }
      s3m(phase, block) {
        var tmp0_elvis_lhs = findPhase(this, phase);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          throw new (InvalidPhaseException())('Phase ' + phase.toString() + ' was not registered for this pipeline');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var phaseContent = tmp;
        if (tryAddToPhaseFastPath(this, phase, block)) {
          this.i3m_1 = this.i3m_1 + 1 | 0;
          return Unit_instance;
        }
        phaseContent.b3m(block);
        this.i3m_1 = this.i3m_1 + 1 | 0;
        resetInterceptorsList(this);
        this.t3m();
      }
      t3m() {
      }
      toString() {
        return anyToString(this);
      }
    }
    initMetadataForClass($, 'Pipeline', VOID, VOID, VOID, [2]);
    PipelineClass = $;
  }
  return PipelineClass;
}
//region block: exports
export {
  Pipeline as Pipeline2vw6c5wpzxajt,
};
//endregion

//# sourceMappingURL=Pipeline.mjs.map
