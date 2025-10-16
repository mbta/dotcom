import {
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Long2qws0ah9gnpki as Long } from '../../../../../kotlin-kotlin-stdlib/kotlin/Primitives.mjs';
import { UnsupportedMediaTypeExceptionCIOasihkge9oc44 as UnsupportedMediaTypeExceptionCIO } from './internals/Errors.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { MultiPart_getInstance1zzge3g94afj6 as MultiPart_getInstance } from '../../../../../ktor-ktor-http/io/ktor/http/ContentTypes.mjs';
import {
  ByteString10sanmoo66key as ByteString,
  ByteString3c9fk8lsh3lvs as ByteString_0,
} from '../../../../../kotlinx-io-kotlinx-io-bytestring/kotlinx/io/bytestring/ByteString.mjs';
import {
  IOException1wyutdmfe71nu as IOException,
  EOFExceptionh831u25jcq9n as EOFException,
} from '../../../../../kotlinx-io-kotlinx-io-core/kotlinx/io/-PlatformJs.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import {
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { toString1h6jjoch8cjt8 as toString_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/numberConversions.mjs';
import {
  toByte4i43936u611k as toByte,
  toLongw1zpgk99d84b as toLong,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/numberConversion.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { copyOfRange3alro60z4hhf8 as copyOfRange } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import {
  produce1iljho2c8bp6o as produce,
  ProducerScopeb3mmhvfa6ll7 as ProducerScope,
} from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/channels/Produce.mjs';
import { startsWith641pyr7vf687 as startsWith } from '../../../../../kotlin-kotlin-stdlib/kotlin/text/Strings.mjs';
import {
  readUntil2jtfemvkt7z1f as readUntil,
  readRemaining1x8kk1vq7p6gm as readRemaining,
  skipIfFound1yms04v7e3tuk as skipIfFound,
  readPacket2q2gamtzwxjd1 as readPacket,
  copyTo2vm7vz7rr51or as copyTo,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteReadChannelOperations.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import {
  WriterScope3b0bo1enaee6b as WriterScope,
  writer1eia5its2a1fh as writer,
  close3semq7pafb42g as close,
} from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteWriteChannelOperations.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { counted3iniv3aql3f9n as counted } from '../../../../../ktor-ktor-io/io/ktor/utils/io/CountedByteReadChannel.mjs';
import { get_remaining1lapv95kcmm0y as get_remaining } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/ByteReadPacket.mjs';
import { ByteChannel3cxdguezl3lu7 as ByteChannel } from '../../../../../ktor-ktor-io/io/ktor/utils/io/ByteChannel.mjs';
import { CompletableDeferred2lnqvsbvx74d3 as CompletableDeferred } from '../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CompletableDeferred.mjs';
import { CancellationException3b36o9qz53rgr as CancellationException } from '../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/cancellation/CancellationException.mjs';
import { CharArrayBuilder1n2d9vhxvtt4u as CharArrayBuilder } from './internals/CharArrayBuilder.mjs';
import { parseHeaders2ky2i7uxplga9 as parseHeaders } from './HttpParser.mjs';
import { parseDecLongacrqck1443il as parseDecLong } from './internals/Chars.mjs';
import { toByteArray1i3ns5jnoqlv6 as toByteArray } from '../../../../../ktor-ktor-io/io/ktor/utils/io/core/Strings.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_CrLf() {
  _init_properties_Multipart_kt__ato98a();
  return CrLf;
}
var CrLf;
function get_PrefixString() {
  _init_properties_Multipart_kt__ato98a();
  return PrefixString;
}
var PrefixString;
var PreambleClass;
function Preamble() {
  if (PreambleClass === VOID) {
    class $ extends MultipartEvent() {
      constructor(body) {
        super();
        this.l45_1 = body;
      }
    }
    initMetadataForClass($, 'Preamble');
    PreambleClass = $;
  }
  return PreambleClass;
}
var MultipartPartClass;
function MultipartPart() {
  if (MultipartPartClass === VOID) {
    class $ extends MultipartEvent() {
      constructor(headers, body) {
        super();
        this.m45_1 = headers;
        this.n45_1 = body;
      }
    }
    initMetadataForClass($, 'MultipartPart');
    MultipartPartClass = $;
  }
  return MultipartPartClass;
}
var EpilogueClass;
function Epilogue() {
  if (EpilogueClass === VOID) {
    class $ extends MultipartEvent() {
      constructor(body) {
        super();
        this.o45_1 = body;
      }
    }
    initMetadataForClass($, 'Epilogue');
    EpilogueClass = $;
  }
  return EpilogueClass;
}
var MultipartEventClass;
function MultipartEvent() {
  if (MultipartEventClass === VOID) {
    class $ {}
    initMetadataForClass($, 'MultipartEvent');
    MultipartEventClass = $;
  }
  return MultipartEventClass;
}
function parseMultipart(_this__u8e3s4, input, contentType, contentLength, maxPartSize) {
  maxPartSize = maxPartSize === VOID ? new (Long())(-1, 2147483647) : maxPartSize;
  _init_properties_Multipart_kt__ato98a();
  if (!MultiPart_getInstance().n3p(contentType)) {
    throw UnsupportedMediaTypeExceptionCIO().s45('Failed to parse multipart: Content-Type should be multipart/* but it is ' + toString(contentType));
  }
  var boundaryByteBuffer = parseBoundaryInternal(contentType);
  var boundaryBytes = ByteString().g2z(boundaryByteBuffer);
  return parseMultipart_0(_this__u8e3s4, boundaryBytes, input, contentLength, maxPartSize);
}
function parseBoundaryInternal(contentType) {
  _init_properties_Multipart_kt__ato98a();
  var boundaryParameter = findBoundary(contentType);
  if (boundaryParameter === -1) {
    throw IOException().v32("Failed to parse multipart: Content-Type's boundary parameter is missing");
  }
  var boundaryStart = boundaryParameter + 9 | 0;
  var boundaryBytes = new Int8Array(74);
  var position = {_v: 0};
  parseBoundaryInternal$put(position, boundaryBytes, 13);
  parseBoundaryInternal$put(position, boundaryBytes, 10);
  parseBoundaryInternal$put(position, boundaryBytes, 45);
  parseBoundaryInternal$put(position, boundaryBytes, 45);
  var state = 0;
  var inductionVariable = boundaryStart;
  var last = charSequenceLength(contentType);
  if (inductionVariable < last)
    loop: do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var ch = charSequenceGet(contentType, i);
      // Inline function 'kotlin.code' call
      var v = Char__toInt_impl_vasixd(ch) & 65535;
      if ((v & 65535) > 127) {
        throw IOException().v32('Failed to parse multipart: wrong boundary byte 0x' + toString_0(v, 16) + ' - should be 7bit character');
      }
      switch (state) {
        case 0:
          if (ch !== _Char___init__impl__6a9atx(32))
            if (ch === _Char___init__impl__6a9atx(34)) {
              state = 2;
            } else if (ch === _Char___init__impl__6a9atx(59) || ch === _Char___init__impl__6a9atx(44)) {
              break loop;
            } else {
              state = 1;
              parseBoundaryInternal$put(position, boundaryBytes, toByte(v));
            }

          break;
        case 1:
          if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(44) || ch === _Char___init__impl__6a9atx(59)) {
            break loop;
          } else {
            parseBoundaryInternal$put(position, boundaryBytes, toByte(v));
          }

          break;
        case 2:
          if (ch === _Char___init__impl__6a9atx(92)) {
            state = 3;
          } else if (ch === _Char___init__impl__6a9atx(34)) {
            break loop;
          } else {
            parseBoundaryInternal$put(position, boundaryBytes, toByte(v));
          }

          break;
        case 3:
          parseBoundaryInternal$put(position, boundaryBytes, toByte(v));
          state = 2;
          break;
      }
    }
     while (inductionVariable < last);
  if (position._v === 4) {
    throw IOException().v32('Empty multipart boundary is not allowed');
  }
  return copyOfRange(boundaryBytes, 0, position._v);
}
function parseMultipart_0(_this__u8e3s4, boundaryPrefixed, input, totalLength, maxPartSize) {
  _init_properties_Multipart_kt__ato98a();
  return produce(_this__u8e3s4, VOID, VOID, parseMultipart$slambda_0(input, boundaryPrefixed, maxPartSize, totalLength, null));
}
function findBoundary(contentType) {
  _init_properties_Multipart_kt__ato98a();
  var state = 0;
  var paramNameCount = 0;
  var inductionVariable = 0;
  var last = charSequenceLength(contentType) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var ch = charSequenceGet(contentType, i);
      switch (state) {
        case 0:
          if (ch === _Char___init__impl__6a9atx(59)) {
            state = 1;
            paramNameCount = 0;
          }

          break;
        case 1:
          if (ch === _Char___init__impl__6a9atx(61)) {
            state = 2;
          } else if (ch === _Char___init__impl__6a9atx(59)) {
            paramNameCount = 0;
          } else if (ch === _Char___init__impl__6a9atx(44)) {
            state = 0;
          } else if (ch !== _Char___init__impl__6a9atx(32))
            if (paramNameCount === 0 && startsWith(contentType, 'boundary=', i, true)) {
              return i;
            } else {
              paramNameCount = paramNameCount + 1 | 0;
            }

          break;
        case 2:
          if (ch === _Char___init__impl__6a9atx(34))
            state = 3;
          else if (ch === _Char___init__impl__6a9atx(44))
            state = 0;
          else if (ch === _Char___init__impl__6a9atx(59)) {
            state = 1;
            paramNameCount = 0;
          }

          break;
        case 3:
          if (ch === _Char___init__impl__6a9atx(34)) {
            state = 1;
            paramNameCount = 0;
          } else if (ch === _Char___init__impl__6a9atx(92)) {
            state = 4;
          }

          break;
        case 4:
          state = 3;
          break;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function parsePreambleImpl(boundary, input, output, limit, $completion) {
  limit = limit === VOID ? new (Long())(-1, 2147483647) : limit;
  return readUntil(input, boundary, output, limit, true, $completion);
}
function parsePartHeadersImpl(input, $completion) {
  var tmp = new ($parsePartHeadersImplCOROUTINE$())(input, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function parsePartBodyImpl(boundaryPrefixed, input, output, headers, limit, $completion) {
  var tmp = new ($parsePartBodyImplCOROUTINE$())(boundaryPrefixed, input, output, headers, limit, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function skipIfFoundReadCount(_this__u8e3s4, prefix, $completion) {
  var tmp = new ($skipIfFoundReadCountCOROUTINE$())(_this__u8e3s4, prefix, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
function throwLimitExceeded(actual, limit) {
  _init_properties_Multipart_kt__ato98a();
  throw IOException().v32('Multipart content length exceeds limit ' + actual.toString() + ' > ' + limit.toString() + '; ' + "limit is defined using 'formFieldLimit' argument");
}
function parseBoundaryInternal$put(position, boundaryBytes, value) {
  if (position._v >= boundaryBytes.length) {
    throw IOException().v32("Failed to parse multipart: boundary shouldn't be longer than 70 characters");
  }
  var _unary__edvuaz = position._v;
  position._v = _unary__edvuaz + 1 | 0;
  boundaryBytes[_unary__edvuaz] = value;
}
var parseMultipart$slambda$slambdaClass;
function parseMultipart$slambda$slambda() {
  if (parseMultipart$slambda$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($firstBoundary, $countedInput, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.o47_1 = $firstBoundary;
        $box.p47_1 = $countedInput;
        super(resultContinuation, $box);
      }
      r47($this$writer, $completion) {
        var tmp = this.s47($this$writer, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.r47(p1 instanceof WriterScope() ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = parsePreambleImpl(this.o47_1, this.p47_1, this.q47_1.q3d_1, new (Long())(8193, 0), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.fd_1 = 2;
                suspendResult = this.q47_1.q3d_1.f36(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                return Unit_instance;
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
      s47($this$writer, completion) {
        var i = new (parseMultipart$slambda$slambda())(this.o47_1, this.p47_1, completion);
        i.q47_1 = $this$writer;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    parseMultipart$slambda$slambdaClass = $;
  }
  return parseMultipart$slambda$slambdaClass;
}
function parseMultipart$slambda$slambda_0($firstBoundary, $countedInput, resultContinuation) {
  var i = new (parseMultipart$slambda$slambda())($firstBoundary, $countedInput, resultContinuation);
  var l = function ($this$writer, $completion) {
    return i.r47($this$writer, $completion);
  };
  l.$arity = 1;
  return l;
}
var parseMultipart$slambdaClass;
function parseMultipart$slambda() {
  if (parseMultipart$slambdaClass === VOID) {
    class $ extends CoroutineImpl() {
      constructor($input, $boundaryPrefixed, $maxPartSize, $totalLength, resultContinuation, $box) {
        if ($box === VOID)
          $box = {};
        $box.b48_1 = $input;
        $box.c48_1 = $boundaryPrefixed;
        $box.d48_1 = $maxPartSize;
        $box.e48_1 = $totalLength;
        super(resultContinuation, $box);
      }
      w48($this$produce, $completion) {
        var tmp = this.x48($this$produce, $completion);
        tmp.hd_1 = Unit_instance;
        tmp.id_1 = null;
        return tmp.nd();
      }
      ne(p1, $completion) {
        return this.w48((!(p1 == null) ? isInterface(p1, ProducerScope()) : false) ? p1 : THROW_CCE(), $completion);
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 25;
                this.g48_1 = counted(this.b48_1);
                this.h48_1 = this.g48_1.s3f();
                this.i48_1 = this.c48_1.h2z(get_PrefixString().c1());
                this.fd_1 = 1;
                suspendResult = readRemaining(writer(this.f48_1, VOID, VOID, parseMultipart$slambda$slambda_0(this.i48_1, this.g48_1, null)).o3d_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.j48_1 = suspendResult;
                if (get_remaining(this.j48_1).d2(new (Long())(0, 0)) > 0) {
                  this.fd_1 = 2;
                  suspendResult = this.f48_1.l2l(new (Preamble())(this.j48_1), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 3;
                  continue $sm;
                }

              case 2:
                this.fd_1 = 3;
                continue $sm;
              case 3:
                this.fd_1 = 4;
                continue $sm;
              case 4:
                if (!this.g48_1.c36()) {
                  this.fd_1 = 5;
                  suspendResult = skipIfFound(this.g48_1, get_PrefixString(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.k48_1 = false;
                  this.fd_1 = 6;
                  continue $sm;
                }

              case 5:
                this.l48_1 = suspendResult;
                this.k48_1 = !this.l48_1;
                this.fd_1 = 6;
                continue $sm;
              case 6:
                if (!this.k48_1) {
                  this.fd_1 = 15;
                  continue $sm;
                }

                this.fd_1 = 7;
                suspendResult = skipIfFound(this.g48_1, get_CrLf(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 7:
                this.fd_1 = 8;
                suspendResult = skipIfFound(this.g48_1, this.i48_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 8:
                if (suspendResult) {
                  this.fd_1 = 4;
                  continue $sm;
                } else {
                  this.fd_1 = 9;
                  continue $sm;
                }

              case 9:
                this.m48_1 = new (ByteChannel())();
                this.n48_1 = CompletableDeferred();
                this.o48_1 = new (MultipartPart())(this.n48_1, this.m48_1);
                this.fd_1 = 10;
                suspendResult = this.f48_1.l2l(this.o48_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 10:
                this.p48_1 = null;
                this.gd_1 = 14;
                this.fd_1 = 11;
                suspendResult = parsePartHeadersImpl(this.g48_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 11:
                this.p48_1 = suspendResult;
                if (!this.n48_1.g28(this.p48_1)) {
                  this.p48_1.i1l();
                  throw CancellationException().he('Multipart processing has been cancelled');
                }

                this.fd_1 = 12;
                suspendResult = parsePartBodyImpl(this.c48_1, this.g48_1, this.m48_1, this.p48_1, this.d48_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 12:
                this.m48_1.v6();
                this.gd_1 = 25;
                this.fd_1 = 13;
                continue $sm;
              case 13:
                this.gd_1 = 25;
                this.fd_1 = 4;
                continue $sm;
              case 14:
                this.gd_1 = 25;
                var tmp_0 = this.id_1;
                if (tmp_0 instanceof Error) {
                  this.q48_1 = this.id_1;
                  if (this.n48_1.h28(this.q48_1)) {
                    var tmp0_safe_receiver = this.p48_1;
                    if (tmp0_safe_receiver == null)
                      null;
                    else {
                      tmp0_safe_receiver.i1l();
                    }
                  }
                  close(this.m48_1, this.q48_1);
                  throw this.q48_1;
                } else {
                  throw this.id_1;
                }

              case 15:
                this.fd_1 = 16;
                suspendResult = skipIfFound(this.g48_1, get_CrLf(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 16:
                this.fd_1 = 17;
                suspendResult = skipIfFound(this.g48_1, get_CrLf(), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 17:
                if (!(this.e48_1 == null)) {
                  this.r48_1 = this.g48_1.s3f().g4(this.h48_1);
                  this.s48_1 = this.e48_1.g4(this.r48_1);
                  if (this.s48_1.d2(new (Long())(2147483647, 0)) > 0)
                    throw IOException().v32('Failed to parse multipart: prologue is too long');
                  if (this.s48_1.d2(new (Long())(0, 0)) > 0) {
                    this.fd_1 = 21;
                    suspendResult = readPacket(this.g48_1, this.s48_1.f2(), this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.fd_1 = 23;
                    continue $sm;
                  }
                } else {
                  this.fd_1 = 18;
                  suspendResult = readRemaining(this.g48_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                }

              case 18:
                this.t48_1 = suspendResult;
                if (!this.t48_1.t2z()) {
                  this.fd_1 = 19;
                  suspendResult = this.f48_1.l2l(new (Epilogue())(this.t48_1), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.fd_1 = 20;
                  continue $sm;
                }

              case 19:
                this.fd_1 = 20;
                continue $sm;
              case 20:
                this.fd_1 = 24;
                continue $sm;
              case 21:
                this.u48_1 = suspendResult;
                this.v48_1 = new (Epilogue())(this.u48_1);
                this.fd_1 = 22;
                suspendResult = this.f48_1.l2l(this.v48_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 22:
                this.fd_1 = 23;
                continue $sm;
              case 23:
                this.fd_1 = 24;
                continue $sm;
              case 24:
                return Unit_instance;
              case 25:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 25) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
      x48($this$produce, completion) {
        var i = new (parseMultipart$slambda())(this.b48_1, this.c48_1, this.d48_1, this.e48_1, completion);
        i.f48_1 = $this$produce;
        return i;
      }
    }
    initMetadataForLambda($, VOID, VOID, [1]);
    parseMultipart$slambdaClass = $;
  }
  return parseMultipart$slambdaClass;
}
function parseMultipart$slambda_0($input, $boundaryPrefixed, $maxPartSize, $totalLength, resultContinuation) {
  var i = new (parseMultipart$slambda())($input, $boundaryPrefixed, $maxPartSize, $totalLength, resultContinuation);
  var l = function ($this$produce, $completion) {
    return i.w48($this$produce, $completion);
  };
  l.$arity = 1;
  return l;
}
var $parsePartHeadersImplCOROUTINE$Class;
function $parsePartHeadersImplCOROUTINE$() {
  if ($parsePartHeadersImplCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(input, resultContinuation) {
        super(resultContinuation);
        this.b46_1 = input;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.c46_1 = new (CharArrayBuilder())();
                this.gd_1 = 2;
                this.fd_1 = 1;
                suspendResult = parseHeaders(this.b46_1, this.c46_1, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                var tmp0_elvis_lhs = suspendResult;
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                  throw EOFException().r2z('Failed to parse multipart headers: unexpected end of stream');
                } else {
                  tmp_0 = tmp0_elvis_lhs;
                }

                return tmp_0;
              case 2:
                this.gd_1 = 3;
                var tmp_1 = this.id_1;
                if (tmp_1 instanceof Error) {
                  var t = this.id_1;
                  this.c46_1.i1l();
                  throw t;
                } else {
                  throw this.id_1;
                }

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
    }
    initMetadataForCoroutine($);
    $parsePartHeadersImplCOROUTINE$Class = $;
  }
  return $parsePartHeadersImplCOROUTINE$Class;
}
var $parsePartBodyImplCOROUTINE$Class;
function $parsePartBodyImplCOROUTINE$() {
  if ($parsePartBodyImplCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(boundaryPrefixed, input, output, headers, limit, resultContinuation) {
        super(resultContinuation);
        this.l46_1 = boundaryPrefixed;
        this.m46_1 = input;
        this.n46_1 = output;
        this.o46_1 = headers;
        this.p46_1 = limit;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 6;
                var tmp_0 = this;
                var tmp0_safe_receiver = this.o46_1.lk('Content-Length');
                tmp_0.q46_1 = tmp0_safe_receiver == null ? null : parseDecLong(tmp0_safe_receiver);
                if (this.q46_1 == null) {
                  this.fd_1 = 3;
                  suspendResult = readUntil(this.m46_1, this.l46_1, this.n46_1, this.p46_1, true, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if ((new (Long())(0, 0)).o4(this.p46_1).ps(this.q46_1)) {
                    this.fd_1 = 1;
                    suspendResult = copyTo(this.m46_1, this.n46_1, this.q46_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    var tmp_1 = this;
                    throwLimitExceeded(this.q46_1, this.p46_1);
                  }
                }

                break;
              case 1:
                this.s46_1 = suspendResult;
                this.fd_1 = 2;
                suspendResult = skipIfFoundReadCount(this.m46_1, this.l46_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 2:
                this.t46_1 = suspendResult;
                this.r46_1 = this.s46_1.f4(this.t46_1);
                this.fd_1 = 4;
                continue $sm;
              case 3:
                this.r46_1 = suspendResult;
                this.fd_1 = 4;
                continue $sm;
              case 4:
                this.u46_1 = this.r46_1;
                this.fd_1 = 5;
                suspendResult = this.n46_1.u35(this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 5:
                return this.u46_1;
              case 6:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 6) {
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
    $parsePartBodyImplCOROUTINE$Class = $;
  }
  return $parsePartBodyImplCOROUTINE$Class;
}
var $skipIfFoundReadCountCOROUTINE$Class;
function $skipIfFoundReadCountCOROUTINE$() {
  if ($skipIfFoundReadCountCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, prefix, resultContinuation) {
        super(resultContinuation);
        this.d47_1 = _this__u8e3s4;
        this.e47_1 = prefix;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 3;
                this.fd_1 = 1;
                suspendResult = skipIfFound(this.d47_1, this.e47_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                if (suspendResult) {
                  var tmp_0 = this;
                  tmp_0.f47_1 = toLong(this.e47_1.c1());
                  this.fd_1 = 2;
                  continue $sm;
                } else {
                  var tmp_1 = this;
                  tmp_1.f47_1 = new (Long())(0, 0);
                  this.fd_1 = 2;
                  continue $sm;
                }

              case 2:
                return this.f47_1;
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
    }
    initMetadataForCoroutine($);
    $skipIfFoundReadCountCOROUTINE$Class = $;
  }
  return $skipIfFoundReadCountCOROUTINE$Class;
}
var properties_initialized_Multipart_kt_wu0sh0;
function _init_properties_Multipart_kt__ato98a() {
  if (!properties_initialized_Multipart_kt_wu0sh0) {
    properties_initialized_Multipart_kt_wu0sh0 = true;
    CrLf = ByteString().g2z(toByteArray('\r\n'));
    PrefixString = ByteString_0(new Int8Array([45, 45]));
  }
}
//region block: exports
export {
  parseMultipart as parseMultipart2ddxudhdihg70,
};
//endregion

//# sourceMappingURL=Multipart.mjs.map
