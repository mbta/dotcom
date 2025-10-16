import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import {
  Unit_instance1fbcbse1fwigr as Unit_instance,
  Unitkvevlwgzwiuc as Unit,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { invalidTrailingComma2uwwnmbqspks2 as invalidTrailingComma } from './JsonExceptions.mjs';
import {
  JsonObjectee06ihoeeiqj as JsonObject,
  JsonArray2urf8ey7u44sd as JsonArray,
  JsonNull_getInstance2gh8fwl8w0wl7 as JsonNull_getInstance,
  JsonLiteral1u57id0qmqut7 as JsonLiteral,
} from '../JsonElement.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import {
  DeepRecursiveFunction3r49v8igsve1g as DeepRecursiveFunction,
  invoke246lvi6tzooz1 as invoke,
  DeepRecursiveScope1pqaydvh4vdcu as DeepRecursiveScope,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/DeepRecursive.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { tokenDescription3r6eqmtoxe76u as tokenDescription } from './AbstractJsonLexer.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.x1r_1.b1s(6);
  if ($this.x1r_1.c1s() === 4) {
    $this.x1r_1.j1q('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap().sc();
  $l$loop: while ($this.x1r_1.d1s()) {
    var key = $this.y1r_1 ? $this.x1r_1.f1s() : $this.x1r_1.e1s();
    $this.x1r_1.b1s(5);
    var element = $this.g1s();
    // Inline function 'kotlin.collections.set' call
    result.t3(key, element);
    lastToken = $this.x1r_1.h1s();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.x1r_1.j1q('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.x1r_1.b1s(7);
  } else if (lastToken === 4) {
    if (!$this.z1r_1) {
      invalidTrailingComma($this.x1r_1);
    }
    $this.x1r_1.b1s(7);
  }
  return new (JsonObject())(result);
}
function readObject_0($this, _this__u8e3s4, $completion) {
  var tmp = new ($readObjectCOROUTINE$())($this, _this__u8e3s4, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function readArray($this) {
  var lastToken = $this.x1r_1.h1s();
  if ($this.x1r_1.c1s() === 4) {
    $this.x1r_1.j1q('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList().g1();
  while ($this.x1r_1.d1s()) {
    var element = $this.g1s();
    result.i(element);
    lastToken = $this.x1r_1.h1s();
    if (!(lastToken === 4)) {
      var tmp0 = $this.x1r_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.r1l_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.j1q(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.x1r_1.b1s(9);
  } else if (lastToken === 4) {
    if (!$this.z1r_1) {
      invalidTrailingComma($this.x1r_1, 'array');
    }
    $this.x1r_1.b1s(9);
  }
  return new (JsonArray())(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.y1r_1 || !isString) {
    tmp = $this.x1r_1.f1s();
  } else {
    tmp = $this.x1r_1.e1s();
  }
  var string = tmp;
  if (!isString && string === 'null')
    return JsonNull_getInstance();
  return new (JsonLiteral())(string, isString);
}
function readDeepRecursive($this) {
  return invoke(new (DeepRecursiveFunction())(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
}
var JsonTreeReader$readDeepRecursive$slambdaClass;
function JsonTreeReader$readDeepRecursive$slambda() {
  if (JsonTreeReader$readDeepRecursive$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.f1t_1 = this$0;
        super(resultContinuation, $box);
      }
      k1t($this$DeepRecursiveFunction, it, $completion) {
        var tmp = this.l1t($this$DeepRecursiveFunction, it, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      oe(p1, p2, $completion) {
        var tmp = p1 instanceof DeepRecursiveScope() ? p1 : THROW_CCE();
        return this.k1t(tmp, p2 instanceof Unit() ? p2 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.i1t_1 = this.f1t_1.x1r_1.c1s();
                if (this.i1t_1 === 1) {
                  this.j1t_1 = readValue(this.f1t_1, true);
                  this.fd_1 = 2;
                  continue $sm;
                } else {
                  if (this.i1t_1 === 0) {
                    this.j1t_1 = readValue(this.f1t_1, false);
                    this.fd_1 = 2;
                    continue $sm;
                  } else {
                    if (this.i1t_1 === 6) {
                      this.fd_1 = 1;
                      suspendResult = readObject_0(this.f1t_1, this.g1t_1, this);
                      if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                      }
                      continue $sm;
                    } else {
                      if (this.i1t_1 === 8) {
                        this.j1t_1 = readArray(this.f1t_1);
                        this.fd_1 = 2;
                        continue $sm;
                      } else {
                        var tmp_0 = this;
                        this.f1t_1.x1r_1.j1q("Can't begin reading element, unexpected token");
                      }
                    }
                  }
                }

                break;
              case 1:
                this.j1t_1 = suspendResult;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                return this.j1t_1;
              case 3:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 3) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      l1t($this$DeepRecursiveFunction, it, completion) {
        var i = new (JsonTreeReader$readDeepRecursive$slambda())(this.f1t_1, completion);
        i.g1t_1 = $this$DeepRecursiveFunction;
        i.h1t_1 = it;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [2]);
    JsonTreeReader$readDeepRecursive$slambdaClass = $;
  }
  return JsonTreeReader$readDeepRecursive$slambdaClass;
}
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new (JsonTreeReader$readDeepRecursive$slambda())(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.k1t($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
var $readObjectCOROUTINE$Class;
function $readObjectCOROUTINE$() {
  if ($readObjectCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
        super(resultContinuation);
        this.q1s_1 = _this__u8e3s4;
        this.r1s_1 = _this__u8e3s4_0;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 5;
                var tmp_0 = this;
                tmp_0.s1s_1 = this.q1s_1;
                this.t1s_1 = this.s1s_1;
                this.u1s_1 = this.t1s_1.x1r_1.b1s(6);
                if (this.t1s_1.x1r_1.c1s() === 4) {
                  this.t1s_1.x1r_1.j1q('Unexpected leading comma');
                }

                var tmp_1 = this;
                tmp_1.v1s_1 = LinkedHashMap().sc();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.t1s_1.x1r_1.d1s()) {
                  this.fd_1 = 4;
                  continue $sm;
                }

                this.w1s_1 = this.t1s_1.y1r_1 ? this.t1s_1.x1r_1.f1s() : this.t1s_1.x1r_1.e1s();
                this.t1s_1.x1r_1.b1s(5);
                this.fd_1 = 2;
                suspendResult = this.r1s_1.nw(Unit_instance, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                var element = suspendResult;
                var tmp0 = this.v1s_1;
                var key = this.w1s_1;
                tmp0.t3(key, element);
                this.u1s_1 = this.t1s_1.x1r_1.h1s();
                var tmp0_subject = this.u1s_1;
                if (tmp0_subject === 4) {
                  this.fd_1 = 3;
                  continue $sm;
                } else {
                  if (tmp0_subject === 7) {
                    this.fd_1 = 4;
                    continue $sm;
                  } else {
                    this.t1s_1.x1r_1.j1q('Expected end of the object or comma');
                  }
                }

                break;
              case 3:
                this.fd_1 = 1;
                continue $sm;
              case 4:
                if (this.u1s_1 === 6) {
                  this.t1s_1.x1r_1.b1s(7);
                } else if (this.u1s_1 === 4) {
                  if (!this.t1s_1.z1r_1) {
                    invalidTrailingComma(this.t1s_1.x1r_1);
                  }
                  this.t1s_1.x1r_1.b1s(7);
                }

                return new (JsonObject())(this.v1s_1);
              case 5:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 5) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $readObjectCOROUTINE$Class = $;
  }
  return $readObjectCOROUTINE$Class;
}
var JsonTreeReaderClass;
function JsonTreeReader() {
  if (JsonTreeReaderClass === VOID) {
    class $ {
      constructor(configuration, lexer) {
        this.x1r_1 = lexer;
        this.y1r_1 = configuration.r1m_1;
        this.z1r_1 = configuration.d1n_1;
        this.a1s_1 = 0;
      }
      g1s() {
        var token = this.x1r_1.c1s();
        var tmp;
        if (token === 1) {
          tmp = readValue(this, true);
        } else if (token === 0) {
          tmp = readValue(this, false);
        } else if (token === 6) {
          var tmp_0;
          this.a1s_1 = this.a1s_1 + 1 | 0;
          if (this.a1s_1 === 200) {
            tmp_0 = readDeepRecursive(this);
          } else {
            tmp_0 = readObject(this);
          }
          var result = tmp_0;
          this.a1s_1 = this.a1s_1 - 1 | 0;
          tmp = result;
        } else if (token === 8) {
          tmp = readArray(this);
        } else {
          this.x1r_1.j1q('Cannot read Json element because of unexpected ' + tokenDescription(token));
        }
        return tmp;
      }
    }
    initMetadataForClass($, 'JsonTreeReader', VOID, VOID, VOID, [1]);
    JsonTreeReaderClass = $;
  }
  return JsonTreeReaderClass;
}
//region block: exports
export {
  JsonTreeReader as JsonTreeReader1ycreu77eikqj,
};
//endregion

//# sourceMappingURL=JsonTreeReader.mjs.map
