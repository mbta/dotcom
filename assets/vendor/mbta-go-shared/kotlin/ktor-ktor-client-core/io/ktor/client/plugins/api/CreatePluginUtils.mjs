import { ClientPluginInstance3k1rpw72h98wh as ClientPluginInstance } from './ClientPluginInstance.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { PrimitiveClasses_getInstance2v63zn04dtq03 as PrimitiveClasses_getInstance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/reflect/js/internal/primitives.mjs';
import { arrayOf1akklvh2at202 as arrayOf } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import {
  createKType1lgox3mzhchp5 as createKType,
  createKTypeParameter1mb995m5oui0r as createKTypeParameter,
  createInvariantKTypeProjection3sfd0u0y62ozd as createInvariantKTypeProjection,
} from '../../../../../../kotlin-kotlin-stdlib/KTypeHelpers.mjs';
import { TypeInfo2nbxsuf4v8os2 as TypeInfo } from '../../../../../../ktor-ktor-utils/io/ktor/util/reflect/Type.mjs';
import { AttributeKey3aq8ytwgx54f7 as AttributeKey } from '../../../../../../ktor-ktor-utils/io/ktor/util/Attributes.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function createClientPlugin(name, body) {
  return createClientPlugin_0(name, createClientPlugin$lambda, body);
}
function createClientPlugin_0(name, createConfiguration, body) {
  return new (ClientPluginImpl())(name, createConfiguration, body);
}
var ClientPluginImplClass;
function ClientPluginImpl() {
  if (ClientPluginImplClass === VOID) {
    class $ {
      constructor(name, createConfiguration, body) {
        this.d5l_1 = createConfiguration;
        this.e5l_1 = body;
        var tmp = this;
        // Inline function 'io.ktor.util.AttributeKey' call
        // Inline function 'io.ktor.util.reflect.typeInfo' call
        var tmp_0 = getKClass(ClientPluginInstance());
        // Inline function 'io.ktor.util.reflect.typeOfOrNull' call
        var tmp_1;
        try {
          tmp_1 = createKType(getKClass(ClientPluginInstance()), arrayOf([createInvariantKTypeProjection(createKType(createKTypeParameter('PluginConfigT', arrayOf([createKType(PrimitiveClasses_getInstance().ci(), arrayOf([]), false)]), 'invariant', false), arrayOf([]), false))]), false);
        } catch ($p) {
          var tmp_2;
          if ($p instanceof Error) {
            var _unused_var__etf5q3 = $p;
            tmp_2 = null;
          } else {
            throw $p;
          }
          tmp_1 = tmp_2;
        }
        var tmp$ret$0 = tmp_1;
        var tmp$ret$1 = new (TypeInfo())(tmp_0, tmp$ret$0);
        tmp.f5l_1 = new (AttributeKey())(name, tmp$ret$1);
      }
      u1() {
        return this.f5l_1;
      }
      g5l(block) {
        // Inline function 'kotlin.apply' call
        var this_0 = this.d5l_1();
        block(this_0);
        var config = this_0;
        return new (ClientPluginInstance())(this.f5l_1, config, this.e5l_1);
      }
      m4r(block) {
        return this.g5l(block);
      }
      h5l(plugin, scope) {
        plugin.o4q(scope);
      }
      n4r(plugin, scope) {
        return this.h5l(plugin instanceof ClientPluginInstance() ? plugin : THROW_CCE(), scope);
      }
    }
    initMetadataForClass($, 'ClientPluginImpl');
    ClientPluginImplClass = $;
  }
  return ClientPluginImplClass;
}
function createClientPlugin$lambda() {
  return Unit_instance;
}
//region block: exports
export {
  createClientPlugin as createClientPlugin16sdkdabbewya,
  createClientPlugin_0 as createClientPluginjwpvufjows5r,
};
//endregion

//# sourceMappingURL=CreatePluginUtils.mjs.map
