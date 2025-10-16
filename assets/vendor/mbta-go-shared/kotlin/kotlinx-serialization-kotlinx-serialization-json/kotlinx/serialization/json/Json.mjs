import {
  JsonConfiguration2bv2x41u8reet as JsonConfiguration,
  ClassDiscriminatorMode_POLYMORPHIC_getInstance2mrsp68rtcatm as ClassDiscriminatorMode_POLYMORPHIC_getInstance,
} from './JsonConfiguration.mjs';
import { EmptySerializersModule991ju6pz9b79 as EmptySerializersModule } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/modules/SerializersModuleBuilders.mjs';
import {
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { DescriptorSchemaCache22yqwocbp420v as DescriptorSchemaCache } from './internal/SchemaCache.mjs';
import { JsonToStringWriter25agxcyem0yhk as JsonToStringWriter } from './internal/JsonToStringWriterJsWasm.mjs';
import { encodeByWriter108llwage8l5s as encodeByWriter } from './internal/JsonStreams.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { StringJsonLexer3eu6xom7mrcfu as StringJsonLexer } from './internal/StringJsonLexer.mjs';
import { WriteMode_OBJ_getInstance1vxozndswhwrl as WriteMode_OBJ_getInstance } from './internal/WriteMode.mjs';
import { StreamingJsonDecoderyo05rsghf9i6 as StreamingJsonDecoder } from './internal/StreamingJsonDecoder.mjs';
import { StringFormat2r2ka8mzcb3mi as StringFormat } from '../../../../kotlinx-serialization-kotlinx-serialization-core/kotlinx/serialization/SerialFormat.mjs';
import { IllegalArgumentException2asla15b5jaob as IllegalArgumentException } from '../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import {
  toString1pkumu07cwy4m as toString,
  equals2au1ep9vhcato as equals,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import {
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/charSequenceJs.mjs';
import { _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx } from '../../../../kotlin-kotlin-stdlib/kotlin/Char.mjs';
import { JsonSerializersModuleValidator1v682i122jgoa as JsonSerializersModuleValidator } from './internal/JsonSerializersModuleValidator.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DefaultClass;
function Default() {
  if (DefaultClass === VOID) {
    class $ extends Json() {
      constructor() {
        Default_instance = null;
        super(new (JsonConfiguration())(), EmptySerializersModule());
        Default_instance = this;
      }
    }
    initMetadataForObject($, 'Default');
    DefaultClass = $;
  }
  return DefaultClass;
}
var Default_instance;
function Default_getInstance() {
  if (Default_instance === VOID)
    new (Default())();
  return Default_instance;
}
var JsonClass;
function Json() {
  if (JsonClass === VOID) {
    class $ {
      constructor(configuration, serializersModule) {
        Default_getInstance();
        this.e1l_1 = configuration;
        this.f1l_1 = serializersModule;
        this.g1l_1 = new (DescriptorSchemaCache())();
      }
      k14() {
        return this.f1l_1;
      }
      n10(serializer, value) {
        var result = new (JsonToStringWriter())();
        try {
          encodeByWriter(this, result, serializer, value);
          return result.toString();
        }finally {
          result.i1l();
        }
      }
      o10(deserializer, string) {
        var lexer = StringJsonLexer(this, string);
        var input = new (StreamingJsonDecoder())(this, WriteMode_OBJ_getInstance(), lexer, deserializer.fz(), null);
        var result = input.u13(deserializer);
        lexer.v1l();
        return result;
      }
    }
    initMetadataForClass($, 'Json', VOID, VOID, [StringFormat()]);
    JsonClass = $;
  }
  return JsonClass;
}
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new (JsonBuilder())(from);
  builderAction(builder);
  var conf = builder.o1m();
  return new (JsonImpl())(conf, builder.n1m_1);
}
var JsonBuilderClass;
function JsonBuilder() {
  if (JsonBuilderClass === VOID) {
    class $ {
      constructor(json) {
        this.w1l_1 = json.e1l_1.p1m_1;
        this.x1l_1 = json.e1l_1.u1m_1;
        this.y1l_1 = json.e1l_1.q1m_1;
        this.z1l_1 = json.e1l_1.r1m_1;
        this.a1m_1 = json.e1l_1.t1m_1;
        this.b1m_1 = json.e1l_1.v1m_1;
        this.c1m_1 = json.e1l_1.w1m_1;
        this.d1m_1 = json.e1l_1.y1m_1;
        this.e1m_1 = json.e1l_1.f1n_1;
        this.f1m_1 = json.e1l_1.a1n_1;
        this.g1m_1 = json.e1l_1.b1n_1;
        this.h1m_1 = json.e1l_1.c1n_1;
        this.i1m_1 = json.e1l_1.d1n_1;
        this.j1m_1 = json.e1l_1.e1n_1;
        this.k1m_1 = json.e1l_1.z1m_1;
        this.l1m_1 = json.e1l_1.s1m_1;
        this.m1m_1 = json.e1l_1.x1m_1;
        this.n1m_1 = json.k14();
      }
      o1m() {
        if (this.m1m_1) {
          // Inline function 'kotlin.require' call
          if (!(this.d1m_1 === 'type')) {
            var message = 'Class discriminator should not be specified when array polymorphism is specified';
            throw IllegalArgumentException().q(toString(message));
          }
          // Inline function 'kotlin.require' call
          if (!this.e1m_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
            var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
            throw IllegalArgumentException().q(toString(message_0));
          }
        }
        if (!this.a1m_1) {
          // Inline function 'kotlin.require' call
          if (!(this.b1m_1 === '    ')) {
            var message_1 = 'Indent should not be specified when default printing mode is used';
            throw IllegalArgumentException().q(toString(message_1));
          }
        } else if (!(this.b1m_1 === '    ')) {
          var tmp0 = this.b1m_1;
          var tmp$ret$7;
          $l$block: {
            // Inline function 'kotlin.text.all' call
            var inductionVariable = 0;
            while (inductionVariable < charSequenceLength(tmp0)) {
              var element = charSequenceGet(tmp0, inductionVariable);
              inductionVariable = inductionVariable + 1 | 0;
              if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
                tmp$ret$7 = false;
                break $l$block;
              }
            }
            tmp$ret$7 = true;
          }
          var allWhitespaces = tmp$ret$7;
          // Inline function 'kotlin.require' call
          if (!allWhitespaces) {
            var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.b1m_1;
            throw IllegalArgumentException().q(toString(message_2));
          }
        }
        return new (JsonConfiguration())(this.w1l_1, this.y1l_1, this.z1l_1, this.l1m_1, this.a1m_1, this.x1l_1, this.b1m_1, this.c1m_1, this.m1m_1, this.d1m_1, this.k1m_1, this.f1m_1, this.g1m_1, this.h1m_1, this.i1m_1, this.j1m_1, this.e1m_1);
      }
    }
    initMetadataForClass($, 'JsonBuilder');
    JsonBuilderClass = $;
  }
  return JsonBuilderClass;
}
function validateConfiguration($this) {
  if (equals($this.k14(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new (JsonSerializersModuleValidator())($this.e1l_1);
  $this.k14().m1k(collector);
}
var JsonImplClass;
function JsonImpl() {
  if (JsonImplClass === VOID) {
    class $ extends Json() {
      constructor(configuration, module_0) {
        super(configuration, module_0);
        validateConfiguration(this);
      }
    }
    initMetadataForClass($, 'JsonImpl');
    JsonImplClass = $;
  }
  return JsonImplClass;
}
//region block: exports
export {
  Json_0 as Jsonsmkyu9xjl7fv,
};
//endregion

//# sourceMappingURL=Json.mjs.map
