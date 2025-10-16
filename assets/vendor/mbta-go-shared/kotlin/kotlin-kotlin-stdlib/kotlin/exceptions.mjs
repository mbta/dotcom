import {
  captureStack1fzi4aczwc4hg as captureStack,
  createExternalThis2k2orr8ix0ytc as createExternalThis,
  setPropertiesToThrowableInstance1w2jjvl9y77yc as setPropertiesToThrowableInstance,
  setupCauseParameter20kc7dphipdif as setupCauseParameter,
  toString1pkumu07cwy4m as toString,
} from './js/coreRuntime.mjs';
import { VOID3gxj6tk5isa35 as VOID } from './js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from './Unit.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from './js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function init_kotlin_Exception(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.g6_1);
}
var ExceptionClass;
function Exception() {
  if (ExceptionClass === VOID) {
    class $ extends Error {
      static tf() {
        var $this = createExternalThis(this, Error, [null]);
        setPropertiesToThrowableInstance($this);
        init_kotlin_Exception($this);
        return $this;
      }
      static h6(message) {
        var $this = createExternalThis(this, Error, [message]);
        setPropertiesToThrowableInstance($this, message);
        init_kotlin_Exception($this);
        return $this;
      }
      static uf(message, cause) {
        var $this = createExternalThis(this, Error, [message, setupCauseParameter(cause)]);
        setPropertiesToThrowableInstance($this, message, cause);
        init_kotlin_Exception($this);
        return $this;
      }
      static vf(cause) {
        var $this = createExternalThis(this, Error, [null, setupCauseParameter(cause)]);
        setPropertiesToThrowableInstance($this, VOID, cause);
        init_kotlin_Exception($this);
        return $this;
      }
    }
    initMetadataForClass($, 'Exception', $.tf);
    ExceptionClass = $;
  }
  return ExceptionClass;
}
function init_kotlin_IllegalArgumentException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.p_1);
}
var IllegalArgumentExceptionClass;
function IllegalArgumentException() {
  if (IllegalArgumentExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static wf() {
        var $this = this.o2();
        init_kotlin_IllegalArgumentException($this);
        return $this;
      }
      static q(message) {
        var $this = this.fb(message);
        init_kotlin_IllegalArgumentException($this);
        return $this;
      }
      static xf(message, cause) {
        var $this = this.yf(message, cause);
        init_kotlin_IllegalArgumentException($this);
        return $this;
      }
      static zf(cause) {
        var $this = this.ag(cause);
        init_kotlin_IllegalArgumentException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'IllegalArgumentException', $.wf);
    IllegalArgumentExceptionClass = $;
  }
  return IllegalArgumentExceptionClass;
}
function init_kotlin_IllegalStateException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.n5_1);
}
var IllegalStateExceptionClass;
function IllegalStateException() {
  if (IllegalStateExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static ge() {
        var $this = this.o2();
        init_kotlin_IllegalStateException($this);
        return $this;
      }
      static o5(message) {
        var $this = this.fb(message);
        init_kotlin_IllegalStateException($this);
        return $this;
      }
      static je(message, cause) {
        var $this = this.yf(message, cause);
        init_kotlin_IllegalStateException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'IllegalStateException', $.ge);
    IllegalStateExceptionClass = $;
  }
  return IllegalStateExceptionClass;
}
function init_kotlin_UnsupportedOperationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.h5_1);
}
var UnsupportedOperationExceptionClass;
function UnsupportedOperationException() {
  if (UnsupportedOperationExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static i5() {
        var $this = this.o2();
        init_kotlin_UnsupportedOperationException($this);
        return $this;
      }
      static f6(message) {
        var $this = this.fb(message);
        init_kotlin_UnsupportedOperationException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'UnsupportedOperationException', $.i5);
    UnsupportedOperationExceptionClass = $;
  }
  return UnsupportedOperationExceptionClass;
}
function init_kotlin_RuntimeException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.n2_1);
}
var RuntimeExceptionClass;
function RuntimeException() {
  if (RuntimeExceptionClass === VOID) {
    class $ extends Exception() {
      static o2() {
        var $this = this.tf();
        init_kotlin_RuntimeException($this);
        return $this;
      }
      static fb(message) {
        var $this = this.h6(message);
        init_kotlin_RuntimeException($this);
        return $this;
      }
      static yf(message, cause) {
        var $this = this.uf(message, cause);
        init_kotlin_RuntimeException($this);
        return $this;
      }
      static ag(cause) {
        var $this = this.vf(cause);
        init_kotlin_RuntimeException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'RuntimeException', $.o2);
    RuntimeExceptionClass = $;
  }
  return RuntimeExceptionClass;
}
function init_kotlin_NoSuchElementException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.l_1);
}
var NoSuchElementExceptionClass;
function NoSuchElementException() {
  if (NoSuchElementExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static m1() {
        var $this = this.o2();
        init_kotlin_NoSuchElementException($this);
        return $this;
      }
      static m(message) {
        var $this = this.fb(message);
        init_kotlin_NoSuchElementException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'NoSuchElementException', $.m1);
    NoSuchElementExceptionClass = $;
  }
  return NoSuchElementExceptionClass;
}
function init_kotlin_Error(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.bg_1);
}
var ErrorClass;
function Error_0() {
  if (ErrorClass === VOID) {
    class $ extends Error {
      static cg() {
        var $this = createExternalThis(this, Error, [null]);
        setPropertiesToThrowableInstance($this);
        init_kotlin_Error($this);
        return $this;
      }
      static dg(message) {
        var $this = createExternalThis(this, Error, [message]);
        setPropertiesToThrowableInstance($this, message);
        init_kotlin_Error($this);
        return $this;
      }
      static eg(message, cause) {
        var $this = createExternalThis(this, Error, [message, setupCauseParameter(cause)]);
        setPropertiesToThrowableInstance($this, message, cause);
        init_kotlin_Error($this);
        return $this;
      }
    }
    initMetadataForClass($, 'Error', $.cg);
    ErrorClass = $;
  }
  return ErrorClass;
}
function init_kotlin_IndexOutOfBoundsException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.hg_1);
}
var IndexOutOfBoundsExceptionClass;
function IndexOutOfBoundsException() {
  if (IndexOutOfBoundsExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static ig() {
        var $this = this.o2();
        init_kotlin_IndexOutOfBoundsException($this);
        return $this;
      }
      static jg(message) {
        var $this = this.fb(message);
        init_kotlin_IndexOutOfBoundsException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'IndexOutOfBoundsException', $.ig);
    IndexOutOfBoundsExceptionClass = $;
  }
  return IndexOutOfBoundsExceptionClass;
}
function init_kotlin_ConcurrentModificationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.ab_1);
}
var ConcurrentModificationExceptionClass;
function ConcurrentModificationException() {
  if (ConcurrentModificationExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static rb() {
        var $this = this.o2();
        init_kotlin_ConcurrentModificationException($this);
        return $this;
      }
      static bb(message) {
        var $this = this.fb(message);
        init_kotlin_ConcurrentModificationException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'ConcurrentModificationException', $.rb);
    ConcurrentModificationExceptionClass = $;
  }
  return ConcurrentModificationExceptionClass;
}
function init_kotlin_ArithmeticException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.mg_1);
}
var ArithmeticExceptionClass;
function ArithmeticException() {
  if (ArithmeticExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static ng() {
        var $this = this.o2();
        init_kotlin_ArithmeticException($this);
        return $this;
      }
      static og(message) {
        var $this = this.fb(message);
        init_kotlin_ArithmeticException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'ArithmeticException', $.ng);
    ArithmeticExceptionClass = $;
  }
  return ArithmeticExceptionClass;
}
function init_kotlin_AssertionError(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.qg_1);
}
var AssertionErrorClass;
function AssertionError() {
  if (AssertionErrorClass === VOID) {
    class $ extends Error_0() {
      static rg() {
        var $this = this.cg();
        init_kotlin_AssertionError($this);
        return $this;
      }
      static sg(message) {
        var tmp = message == null ? null : toString(message);
        var $this = this.eg(tmp, message instanceof Error ? message : null);
        init_kotlin_AssertionError($this);
        return $this;
      }
    }
    initMetadataForClass($, 'AssertionError', $.rg);
    AssertionErrorClass = $;
  }
  return AssertionErrorClass;
}
function init_kotlin_NumberFormatException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.wg_1);
}
var NumberFormatExceptionClass;
function NumberFormatException() {
  if (NumberFormatExceptionClass === VOID) {
    class $ extends IllegalArgumentException() {
      static xg() {
        var $this = this.wf();
        init_kotlin_NumberFormatException($this);
        return $this;
      }
      static yg(message) {
        var $this = this.q(message);
        init_kotlin_NumberFormatException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'NumberFormatException', $.xg);
    NumberFormatExceptionClass = $;
  }
  return NumberFormatExceptionClass;
}
function init_kotlin_NullPointerException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.r5_1);
}
var NullPointerExceptionClass;
function NullPointerException() {
  if (NullPointerExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static s5() {
        var $this = this.o2();
        init_kotlin_NullPointerException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'NullPointerException', $.s5);
    NullPointerExceptionClass = $;
  }
  return NullPointerExceptionClass;
}
function init_kotlin_ClassCastException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.z5_1);
}
var ClassCastExceptionClass;
function ClassCastException() {
  if (ClassCastExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static a6() {
        var $this = this.o2();
        init_kotlin_ClassCastException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'ClassCastException', $.a6);
    ClassCastExceptionClass = $;
  }
  return ClassCastExceptionClass;
}
function init_kotlin_NoWhenBranchMatchedException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.v5_1);
}
var NoWhenBranchMatchedExceptionClass;
function NoWhenBranchMatchedException() {
  if (NoWhenBranchMatchedExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static w5() {
        var $this = this.o2();
        init_kotlin_NoWhenBranchMatchedException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'NoWhenBranchMatchedException', $.w5);
    NoWhenBranchMatchedExceptionClass = $;
  }
  return NoWhenBranchMatchedExceptionClass;
}
function init_kotlin_UninitializedPropertyAccessException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.d6_1);
}
var UninitializedPropertyAccessExceptionClass;
function UninitializedPropertyAccessException() {
  if (UninitializedPropertyAccessExceptionClass === VOID) {
    class $ extends RuntimeException() {
      static zg() {
        var $this = this.o2();
        init_kotlin_UninitializedPropertyAccessException($this);
        return $this;
      }
      static e6(message) {
        var $this = this.fb(message);
        init_kotlin_UninitializedPropertyAccessException($this);
        return $this;
      }
    }
    initMetadataForClass($, 'UninitializedPropertyAccessException', $.zg);
    UninitializedPropertyAccessExceptionClass = $;
  }
  return UninitializedPropertyAccessExceptionClass;
}
//region block: exports
export {
  ArithmeticException as ArithmeticException18dajwq7kbp38,
  AssertionError as AssertionError3yq7q0knw9m5,
  ClassCastException as ClassCastException1atiay3nqgbd,
  ConcurrentModificationException as ConcurrentModificationException3974vl9oonkcj,
  Error_0 as Error3ofk6owajcepa,
  Exception as Exceptiondt2hlxn7j7vw,
  IllegalArgumentException as IllegalArgumentException2asla15b5jaob,
  IllegalStateException as IllegalStateExceptionkoljg5n0nrlr,
  IndexOutOfBoundsException as IndexOutOfBoundsException1qfr429iumro0,
  NoSuchElementException as NoSuchElementException679xzhnp5bpj,
  NoWhenBranchMatchedException as NoWhenBranchMatchedException3krrgsc7u48pz,
  NullPointerException as NullPointerException3mu0rhxjjitqq,
  NumberFormatException as NumberFormatException3bgsm2s9o4t55,
  RuntimeException as RuntimeException1r3t0zl97011n,
  UninitializedPropertyAccessException as UninitializedPropertyAccessException8qin22n38p0w,
  UnsupportedOperationException as UnsupportedOperationException2tkumpmhredt3,
};
//endregion

//# sourceMappingURL=exceptions.mjs.map
