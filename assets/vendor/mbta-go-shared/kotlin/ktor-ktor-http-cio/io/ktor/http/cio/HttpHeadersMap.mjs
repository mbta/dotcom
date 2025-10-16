import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  SequenceScope1coiso86pqzq2 as SequenceScope,
  sequence2vgswtrxvqoa7 as sequence,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/sequences/SequenceBuilder.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import {
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { ArrayList3it5z8td81qkl as ArrayList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/ArrayListJs.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  equalsLowerCase1477z9rxwgcv2 as equalsLowerCase,
  hashCodeLowerCase2r6jfpu8gi2u9 as hashCodeLowerCase,
} from './internals/Chars.mjs';
import { abs1kdzbjes1idip as abs } from '../../../../../kotlin-kotlin-stdlib/kotlin/math/math.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { DefaultPool2gb1fm4epwgu9 as DefaultPool } from '../../../../../ktor-ktor-io/io/ktor/utils/io/pool/DefaultPool.mjs';
import { fill2542d4m9l93pn as fill } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { isIntArrayeijsubfngq38 as isIntArray } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
//endregion
function get_IntArrayPool() {
  _init_properties_HttpHeadersMap_kt__hwatby();
  return IntArrayPool;
}
var IntArrayPool;
function get_HeadersDataPool() {
  _init_properties_HttpHeadersMap_kt__hwatby();
  return HeadersDataPool;
}
var HeadersDataPool;
var HeadersData$headersStarts$slambdaClass;
function HeadersData$headersStarts$slambda() {
  if (HeadersData$headersStarts$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor(this$0, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.g43_1 = this$0;
        super(resultContinuation, $box);
      }
      m43($this$sequence, $completion) {
        var tmp = this.n43($this$sequence, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.m43(p1 instanceof SequenceScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 7;
                this.i43_1 = 0;
                this.j43_1 = this.g43_1.o43_1.x();
                this.fd_1 = 1;
                continue $sm;
              case 1:
                if (!this.j43_1.y()) {
                  this.fd_1 = 6;
                  continue $sm;
                }

                this.k43_1 = this.j43_1.z();
                this.l43_1 = 0;
                this.fd_1 = 2;
                continue $sm;
              case 2:
                if (!(this.l43_1 < this.k43_1.length)) {
                  this.fd_1 = 5;
                  continue $sm;
                }

                if (!(this.g43_1.p43(this.i43_1 + 0 | 0) === -1)) {
                  this.fd_1 = 3;
                  suspendResult = this.h43_1.so(this.i43_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 4;
                  continue $sm;
                }

              case 3:
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.l43_1 = this.l43_1 + 6 | 0;
                this.i43_1 = this.i43_1 + 6 | 0;
                this.fd_1 = 2;
                continue $sm;
              case 5:
                this.fd_1 = 1;
                continue $sm;
              case 6:
                return Unit_instance;
              case 7:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 7) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      n43($this$sequence, completion) {
        var i = new (HeadersData$headersStarts$slambda())(this.g43_1, completion);
        i.h43_1 = $this$sequence;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    HeadersData$headersStarts$slambdaClass = $;
  }
  return HeadersData$headersStarts$slambdaClass;
}
function HeadersData$headersStarts$slambda_0(this$0, resultContinuation) {
  var i = new (HeadersData$headersStarts$slambda())(this$0, resultContinuation);
  var l = function ($this$sequence, $completion) {
    return i.m43($this$sequence, $completion);
  };
  l.$arity = 1;
  return l;
}
var HeadersDataClass;
function HeadersData() {
  if (HeadersDataClass === VOID) {
    class $ {
      constructor() {
        var tmp = this;
        // Inline function 'kotlin.collections.mutableListOf' call
        tmp.o43_1 = ArrayList().g1();
      }
      q43() {
        return this.o43_1.c1();
      }
      r43(subArraysCount) {
        // Inline function 'kotlin.repeat' call
        var inductionVariable = 0;
        if (inductionVariable < subArraysCount)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.o43_1.i(get_IntArrayPool().p3g());
          }
           while (inductionVariable < subArraysCount);
      }
      p43(index) {
        return this.o43_1.e1(index / 768 | 0)[index % 768 | 0];
      }
      s43(index, value) {
        this.o43_1.e1(index / 768 | 0)[index % 768 | 0] = value;
      }
      t43() {
        return sequence(HeadersData$headersStarts$slambda_0(this, null));
      }
      i1l() {
        var _iterator__ex2g4s = this.o43_1.x();
        while (_iterator__ex2g4s.y()) {
          var array = _iterator__ex2g4s.z();
          get_IntArrayPool().q3g(array);
        }
        this.o43_1.p3();
      }
    }
    initMetadataForClass($, 'HeadersData', HeadersData);
    HeadersDataClass = $;
  }
  return HeadersDataClass;
}
function thresholdReached($this) {
  return $this.v43_1 >= $this.w43_1 * 0.75;
}
function resize($this) {
  var prevSize = $this.v43_1;
  var prevData = $this.x43_1;
  $this.v43_1 = 0;
  $this.w43_1 = imul($this.w43_1, 2) | 128;
  var tmp = $this;
  // Inline function 'kotlin.apply' call
  var this_0 = get_HeadersDataPool().p3g();
  this_0.r43(imul(prevData.q43(), 2) | 1);
  tmp.x43_1 = this_0;
  var _iterator__ex2g4s = prevData.t43().x();
  while (_iterator__ex2g4s.y()) {
    var headerOffset = _iterator__ex2g4s.z();
    $this.y43(prevData.p43(headerOffset + 1 | 0), prevData.p43(headerOffset + 2 | 0), prevData.p43(headerOffset + 3 | 0), prevData.p43(headerOffset + 4 | 0));
  }
  get_HeadersDataPool().q3g(prevData);
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(prevSize === $this.v43_1)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException().q(toString(message));
  }
}
function headerHasName($this, name, headerOffset) {
  var nameStartIndex = $this.x43_1.p43(headerOffset + 1 | 0);
  var nameEndIndex = $this.x43_1.p43(headerOffset + 2 | 0);
  return equalsLowerCase($this.u43_1, nameStartIndex, nameEndIndex, name);
}
var HttpHeadersMapClass;
function HttpHeadersMap() {
  if (HttpHeadersMapClass === VOID) {
    class $ {
      constructor(builder) {
        this.u43_1 = builder;
        this.v43_1 = 0;
        this.w43_1 = 0;
        this.x43_1 = get_HeadersDataPool().p3g();
      }
      lk(name) {
        if (this.v43_1 === 0)
          return null;
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = hashCodeLowerCase(name);
        var hash = abs(this_0);
        var headerIndex = hash % this.w43_1 | 0;
        while (!(this.x43_1.p43(imul(headerIndex, 6) + 0 | 0) === -1)) {
          if (headerHasName(this, name, imul(headerIndex, 6))) {
            return this.z43(imul(headerIndex, 6));
          }
          headerIndex = (headerIndex + 1 | 0) % this.w43_1 | 0;
        }
        return null;
      }
      a44() {
        return this.x43_1.t43();
      }
      y43(nameStartIndex, nameEndIndex, valueStartIndex, valueEndIndex) {
        if (thresholdReached(this)) {
          resize(this);
        }
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = hashCodeLowerCase(this.u43_1, nameStartIndex, nameEndIndex);
        var hash = abs(this_0);
        var name = this.u43_1.c(nameStartIndex, nameEndIndex);
        var headerIndex = hash % this.w43_1 | 0;
        var sameNameHeaderIndex = -1;
        while (!(this.x43_1.p43(imul(headerIndex, 6) + 0 | 0) === -1)) {
          if (headerHasName(this, name, imul(headerIndex, 6))) {
            sameNameHeaderIndex = headerIndex;
          }
          headerIndex = (headerIndex + 1 | 0) % this.w43_1 | 0;
        }
        var headerOffset = imul(headerIndex, 6);
        this.x43_1.s43(headerOffset + 0 | 0, hash);
        this.x43_1.s43(headerOffset + 1 | 0, nameStartIndex);
        this.x43_1.s43(headerOffset + 2 | 0, nameEndIndex);
        this.x43_1.s43(headerOffset + 3 | 0, valueStartIndex);
        this.x43_1.s43(headerOffset + 4 | 0, valueEndIndex);
        this.x43_1.s43(headerOffset + 5 | 0, -1);
        if (!(sameNameHeaderIndex === -1)) {
          this.x43_1.s43(imul(sameNameHeaderIndex, 6) + 5 | 0, headerIndex);
        }
        this.v43_1 = this.v43_1 + 1 | 0;
      }
      i44(headerOffset) {
        var nameStartIndex = this.x43_1.p43(headerOffset + 1 | 0);
        var nameEndIndex = this.x43_1.p43(headerOffset + 2 | 0);
        return this.u43_1.c(nameStartIndex, nameEndIndex);
      }
      z43(headerOffset) {
        var valueStartIndex = this.x43_1.p43(headerOffset + 3 | 0);
        var valueEndIndex = this.x43_1.p43(headerOffset + 4 | 0);
        return this.u43_1.c(valueStartIndex, valueEndIndex);
      }
      i1l() {
        this.v43_1 = 0;
        this.w43_1 = 0;
        get_HeadersDataPool().q3g(this.x43_1);
        this.x43_1 = get_HeadersDataPool().p3g();
      }
      toString() {
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        dumpTo(this, '', this_0);
        return this_0.toString();
      }
    }
    initMetadataForClass($, 'HttpHeadersMap');
    HttpHeadersMapClass = $;
  }
  return HttpHeadersMapClass;
}
function dumpTo(_this__u8e3s4, indent, out) {
  _init_properties_HttpHeadersMap_kt__hwatby();
  var _iterator__ex2g4s = _this__u8e3s4.a44().x();
  while (_iterator__ex2g4s.y()) {
    var offset = _iterator__ex2g4s.z();
    out.v(indent);
    out.v(_this__u8e3s4.i44(offset));
    out.v(' => ');
    out.v(_this__u8e3s4.z43(offset));
    out.v('\n');
  }
}
var IntArrayPool$1Class;
function IntArrayPool$1() {
  if (IntArrayPool$1Class === VOID) {
    class $ extends DefaultPool() {
      constructor() {
        super(1000);
      }
      i3g() {
        var tmp = 0;
        var tmp_0 = new Int32Array(768);
        while (tmp < 768) {
          tmp_0[tmp] = -1;
          tmp = tmp + 1 | 0;
        }
        return tmp_0;
      }
      m44(instance) {
        fill(instance, -1);
        return protoOf(DefaultPool()).n3g.call(this, instance);
      }
      n3g(instance) {
        return this.m44(isIntArray(instance) ? instance : THROW_CCE());
      }
    }
    initMetadataForClass($);
    IntArrayPool$1Class = $;
  }
  return IntArrayPool$1Class;
}
var HeadersDataPool$1Class;
function HeadersDataPool$1() {
  if (HeadersDataPool$1Class === VOID) {
    class $ extends DefaultPool() {
      constructor() {
        super(1000);
      }
      i3g() {
        return new (HeadersData())();
      }
      q44(instance) {
        instance.i1l();
        return protoOf(DefaultPool()).n3g.call(this, instance);
      }
      n3g(instance) {
        return this.q44(instance instanceof HeadersData() ? instance : THROW_CCE());
      }
    }
    initMetadataForClass($);
    HeadersDataPool$1Class = $;
  }
  return HeadersDataPool$1Class;
}
var properties_initialized_HttpHeadersMap_kt_kotj4w;
function _init_properties_HttpHeadersMap_kt__hwatby() {
  if (!properties_initialized_HttpHeadersMap_kt_kotj4w) {
    properties_initialized_HttpHeadersMap_kt_kotj4w = true;
    IntArrayPool = new (IntArrayPool$1())();
    HeadersDataPool = new (HeadersDataPool$1())();
  }
}
//region block: exports
export {
  HttpHeadersMap as HttpHeadersMapp7szignu4ex,
};
//endregion

//# sourceMappingURL=HttpHeadersMap.mjs.map
