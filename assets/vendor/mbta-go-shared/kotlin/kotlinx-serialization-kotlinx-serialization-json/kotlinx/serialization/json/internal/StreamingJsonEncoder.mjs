import {
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  toString3o7ifthqydp6e as toString,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { AbstractEncoder2gxtu3xmy3f8j as AbstractEncoder } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/encoding/AbstractEncoder.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  Composer1pt8hwk95abxi as Composer,
  ComposerForUnquotedLiterals3v0rwxdudtla9 as ComposerForUnquotedLiterals,
  ComposerForUnsignedNumbers2h1dv6l9z3aef as ComposerForUnsignedNumbers,
} from './Composers.mjs';
import {
  JsonObjectee06ihoeeiqj as JsonObject,
  get_jsonUnquotedLiteralDescriptors6ipxyp7dsvf as get_jsonUnquotedLiteralDescriptor,
} from '../JsonElement.mjs';
import {
  throwJsonElementPolymorphicException318k7fndarnuv as throwJsonElementPolymorphicException,
  classDiscriminator9fd3hvqsgfqq as classDiscriminator,
  access$validateIfSealed$tPolymorphicKt4rflg4qeqfyp as access$validateIfSealed$tPolymorphicKt,
  checkKind2e7hdnuk9c0tp as checkKind,
} from './Polymorphic.mjs';
import { JsonElementSerializer_getInstancewor8ypl63wny as JsonElementSerializer_getInstance } from '../JsonElementSerializers.mjs';
import { AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/internal/AbstractPolymorphicSerializer.mjs';
import {
  CLASS_getInstance14ex35co4jkrb as CLASS_getInstance,
  OBJECT_getInstance26229tfe4t547 as OBJECT_getInstance,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/descriptors/SerialKinds.mjs';
import {
  equals2au1ep9vhcato as equals,
  toString1pkumu07cwy4m as toString_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { ClassDiscriminatorMode_NONE_getInstance1g0i4x2dh4wbf as ClassDiscriminatorMode_NONE_getInstance } from '../JsonConfiguration.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { findPolymorphicSerializerk638ixyjovk5 as findPolymorphicSerializer } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/PolymorphicSerializer.mjs';
import { SerializationStrategyh6ouydnm6hci as SerializationStrategy } from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/KSerializer.mjs';
import { isInterface3d6p8outrmvmk as isInterface } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/typeCheckUtils.mjs';
import { switchMode35g725ikhjpwv as switchMode } from './WriteMode.mjs';
import { getJsonElementName36ciq3w3g8x0l as getJsonElementName } from './JsonNamesMap.mjs';
import { InvalidFloatingPointEncoded3n0aum4e9o5qi as InvalidFloatingPointEncoded } from './JsonExceptions.mjs';
import {
  isFinite1tx0gn65nl9tj as isFinite,
  isFinite2t9l5a275mxm6 as isFinite_0,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/NumbersJs.mjs';
import { JsonEncoder1qlse6simkfi1 as JsonEncoder } from '../JsonEncoder.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Companion_getInstanceuedpedmz4g65 as Companion_getInstance } from '../../../../../kotlin-kotlin-stdlib/kotlin/UInt.mjs';
import {
  serializer3ikrxnm8b29d6 as serializer,
  serializer2lw83vwvpnyms as serializer_0,
  serializer36584sjyg5661 as serializer_1,
  serializer1q7c5q67ysppr as serializer_2,
} from '../../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/builtins/BuiltinSerializers.mjs';
import { Companion_getInstance1puqqwzccfvrg as Companion_getInstance_0 } from '../../../../../kotlin-kotlin-stdlib/kotlin/ULong.mjs';
import { Companion_getInstance1trnkq9cty7vr as Companion_getInstance_1 } from '../../../../../kotlin-kotlin-stdlib/kotlin/UByte.mjs';
import { Companion_getInstance2du03jiluw9jj as Companion_getInstance_2 } from '../../../../../kotlin-kotlin-stdlib/kotlin/UShort.mjs';
import { setOf45ia9pnfhe90 as setOf } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_unsignedNumberDescriptors() {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return unsignedNumberDescriptors;
}
var unsignedNumberDescriptors;
function encodeTypeInfo($this, discriminator, serialName) {
  $this.n1r_1.d1p();
  $this.a15(discriminator);
  $this.n1r_1.g1p(_Char___init__impl__6a9atx(58));
  $this.n1r_1.f1p();
  $this.a15(serialName);
}
var StreamingJsonEncoderClass;
function StreamingJsonEncoder() {
  if (StreamingJsonEncoderClass === VOID) {
    class $ extends AbstractEncoder() {
      static i1u(composer, json, mode, modeReuseCache) {
        var $this = this.o14();
        $this.n1r_1 = composer;
        $this.o1r_1 = json;
        $this.p1r_1 = mode;
        $this.q1r_1 = modeReuseCache;
        $this.r1r_1 = $this.o1r_1.k14();
        $this.s1r_1 = $this.o1r_1.e1l_1;
        $this.t1r_1 = false;
        $this.u1r_1 = null;
        $this.v1r_1 = null;
        var i = $this.p1r_1.x3_1;
        if (!($this.q1r_1 == null)) {
          if (!($this.q1r_1[i] === null) || !($this.q1r_1[i] === $this)) {
            $this.q1r_1[i] = $this;
          }
        }
        return $this;
      }
      g1n() {
        return this.o1r_1;
      }
      static w1r(output, json, mode, modeReuseCache) {
        return this.i1u(Composer(output, json), json, mode, modeReuseCache);
      }
      k14() {
        return this.r1r_1;
      }
      y1o(element) {
        var tmp;
        if (!(this.u1r_1 == null)) {
          tmp = !(element instanceof JsonObject());
        } else {
          tmp = false;
        }
        if (tmp) {
          throwJsonElementPolymorphicException(this.v1r_1, element);
        }
        this.o15(JsonElementSerializer_getInstance(), element);
      }
      t15(descriptor, index) {
        return this.s1r_1.p1m_1;
      }
      o15(serializer, value) {
        $l$block: {
          // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
          if (this.g1n().e1l_1.x1m_1) {
            serializer.gz(this, value);
            break $l$block;
          }
          var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer();
          var tmp;
          if (isPolymorphicSerializer) {
            tmp = !this.g1n().e1l_1.f1n_1.equals(ClassDiscriminatorMode_NONE_getInstance());
          } else {
            var tmp_0;
            switch (this.g1n().e1l_1.f1n_1.x3_1) {
              case 0:
              case 2:
                tmp_0 = false;
                break;
              case 1:
                // Inline function 'kotlin.let' call

                var it = serializer.fz().x11();
                tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
                break;
              default:
                noWhenBranchMatchedException();
                break;
            }
            tmp = tmp_0;
          }
          var needDiscriminator = tmp;
          var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.fz(), this.g1n()) : null;
          var tmp_1;
          if (isPolymorphicSerializer) {
            var casted = serializer instanceof AbstractPolymorphicSerializer() ? serializer : THROW_CCE();
            $l$block_0: {
              // Inline function 'kotlin.requireNotNull' call
              if (value == null) {
                var message = 'Value for serializer ' + toString_0(serializer.fz()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
                throw IllegalArgumentException().q(toString_0(message));
              } else {
                break $l$block_0;
              }
            }
            var actual = findPolymorphicSerializer(casted, this, value);
            if (!(baseClassDiscriminator == null)) {
              access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
              checkKind(actual.fz().x11());
            }
            tmp_1 = isInterface(actual, SerializationStrategy()) ? actual : THROW_CCE();
          } else {
            tmp_1 = serializer;
          }
          var actualSerializer = tmp_1;
          if (!(baseClassDiscriminator == null)) {
            var serialName = actualSerializer.fz().j10();
            this.u1r_1 = baseClassDiscriminator;
            this.v1r_1 = serialName;
          }
          actualSerializer.gz(this, value);
        }
      }
      v13(descriptor) {
        var newMode = switchMode(this.o1r_1, descriptor);
        if (!(newMode.b1u_1 === _Char___init__impl__6a9atx(0))) {
          this.n1r_1.g1p(newMode.b1u_1);
          this.n1r_1.b1p();
        }
        var discriminator = this.u1r_1;
        if (!(discriminator == null)) {
          var tmp0_elvis_lhs = this.v1r_1;
          encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.j10() : tmp0_elvis_lhs);
          this.u1r_1 = null;
          this.v1r_1 = null;
        }
        if (this.p1r_1.equals(newMode)) {
          return this;
        }
        var tmp1_safe_receiver = this.q1r_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.x3_1];
        return tmp2_elvis_lhs == null ? StreamingJsonEncoder().i1u(this.n1r_1, this.o1r_1, newMode, this.q1r_1) : tmp2_elvis_lhs;
      }
      w13(descriptor) {
        if (!(this.p1r_1.c1u_1 === _Char___init__impl__6a9atx(0))) {
          this.n1r_1.c1p();
          this.n1r_1.e1p();
          this.n1r_1.g1p(this.p1r_1.c1u_1);
        }
      }
      p14(descriptor, index) {
        switch (this.p1r_1.x3_1) {
          case 1:
            if (!this.n1r_1.a1p_1) {
              this.n1r_1.g1p(_Char___init__impl__6a9atx(44));
            }

            this.n1r_1.d1p();
            break;
          case 2:
            if (!this.n1r_1.a1p_1) {
              var tmp = this;
              var tmp_0;
              if ((index % 2 | 0) === 0) {
                this.n1r_1.g1p(_Char___init__impl__6a9atx(44));
                this.n1r_1.d1p();
                tmp_0 = true;
              } else {
                this.n1r_1.g1p(_Char___init__impl__6a9atx(58));
                this.n1r_1.f1p();
                tmp_0 = false;
              }
              tmp.t1r_1 = tmp_0;
            } else {
              this.t1r_1 = true;
              this.n1r_1.d1p();
            }

            break;
          case 3:
            if (index === 0)
              this.t1r_1 = true;
            if (index === 1) {
              this.n1r_1.g1p(_Char___init__impl__6a9atx(44));
              this.n1r_1.f1p();
              this.t1r_1 = false;
            }

            break;
          default:
            if (!this.n1r_1.a1p_1) {
              this.n1r_1.g1p(_Char___init__impl__6a9atx(44));
            }

            this.n1r_1.d1p();
            this.a15(getJsonElementName(descriptor, this.o1r_1, index));
            this.n1r_1.g1p(_Char___init__impl__6a9atx(58));
            this.n1r_1.f1p();
            break;
        }
        return true;
      }
      p15(descriptor, index, serializer, value) {
        if (!(value == null) || this.s1r_1.u1m_1) {
          super.p15(descriptor, index, serializer, value);
        }
      }
      c15(descriptor) {
        var tmp;
        if (get_isUnsignedNumber(descriptor)) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
          var tmp_0;
          var tmp_1 = this.n1r_1;
          if (tmp_1 instanceof ComposerForUnsignedNumbers()) {
            tmp_0 = this.n1r_1;
          } else {
            var tmp0 = this.n1r_1.z1o_1;
            var p1 = this.t1r_1;
            tmp_0 = new (ComposerForUnsignedNumbers())(tmp0, p1);
          }
          var tmp$ret$1 = tmp_0;
          tmp = StreamingJsonEncoder().i1u(tmp$ret$1, this.o1r_1, this.p1r_1, null);
        } else if (get_isUnquotedLiteral(descriptor)) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
          var tmp_2;
          var tmp_3 = this.n1r_1;
          if (tmp_3 instanceof ComposerForUnquotedLiterals()) {
            tmp_2 = this.n1r_1;
          } else {
            var tmp0_0 = this.n1r_1.z1o_1;
            var p1_0 = this.t1r_1;
            tmp_2 = new (ComposerForUnquotedLiterals())(tmp0_0, p1_0);
          }
          var tmp$ret$3 = tmp_2;
          tmp = StreamingJsonEncoder().i1u(tmp$ret$3, this.o1r_1, this.p1r_1, null);
        } else if (!(this.u1r_1 == null)) {
          // Inline function 'kotlin.apply' call
          this.v1r_1 = descriptor.j10();
          tmp = this;
        } else {
          tmp = super.c15(descriptor);
        }
        return tmp;
      }
      r14() {
        this.n1r_1.i1p('null');
      }
      s14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.r1p(value);
        }
      }
      t14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.m1p(value);
        }
      }
      u14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.o1p(value);
        }
      }
      v14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.p1p(value);
        }
      }
      w14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.q1p(value);
        }
      }
      x14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.k1p(value);
        }
        if (!this.s1r_1.z1m_1 && !isFinite(value)) {
          throw InvalidFloatingPointEncoded(value, toString_0(this.n1r_1.z1o_1));
        }
      }
      y14(value) {
        if (this.t1r_1) {
          this.a15(value.toString());
        } else {
          this.n1r_1.l1p(value);
        }
        if (!this.s1r_1.z1m_1 && !isFinite_0(value)) {
          throw InvalidFloatingPointEncoded(value, toString_0(this.n1r_1.z1o_1));
        }
      }
      z14(value) {
        this.a15(toString(value));
      }
      a15(value) {
        return this.n1r_1.s1p(value);
      }
      b15(enumDescriptor, index) {
        this.a15(enumDescriptor.b12(index));
      }
    }
    initMetadataForClass($, 'StreamingJsonEncoder', VOID, VOID, [JsonEncoder(), AbstractEncoder()]);
    StreamingJsonEncoderClass = $;
  }
  return StreamingJsonEncoderClass;
}
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.y11() && get_unsignedNumberDescriptors().j1(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.y11() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer(Companion_getInstance()).fz(), serializer_0(Companion_getInstance_0()).fz(), serializer_1(Companion_getInstance_1()).fz(), serializer_2(Companion_getInstance_2()).fz()]);
  }
}
//region block: exports
export {
  StreamingJsonEncoder as StreamingJsonEncoder1wswwd0g47gwe,
  get_isUnsignedNumber as get_isUnsignedNumber3dxwaa3af8ncr,
};
//endregion

//# sourceMappingURL=StreamingJsonEncoder.mjs.map
