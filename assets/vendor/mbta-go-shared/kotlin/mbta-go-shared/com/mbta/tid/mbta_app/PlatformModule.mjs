import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { module39wmcymxxg0fj as module_0 } from '../../../../../projects-core-koin-core/org/koin/dsl/ModuleDSL.mjs';
import { Companion_getInstance13ladrowvkk2x as Companion_getInstance } from '../../../../../projects-core-koin-core/org/koin/core/registry/ScopeRegistry.mjs';
import {
  Kind_Singleton_getInstancexsk8x1eh18jm as Kind_Singleton_getInstance,
  BeanDefinitionhif1nxb54kgk as BeanDefinition,
} from '../../../../../projects-core-koin-core/org/koin/core/definition/BeanDefinition.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  Clock2yl0fnip31kbe as Clock,
  System_instance15pw2079e4stg as System_instance,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/time/Clock.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SingleInstanceFactoryp594z6t2b69a as SingleInstanceFactory } from '../../../../../projects-core-koin-core/org/koin/core/instance/SingleInstanceFactory.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KoinDefinition2pr0kscd0vkk6 as KoinDefinition } from '../../../../../projects-core-koin-core/org/koin/core/definition/KoinDefinition.mjs';
import {
  SystemPaths2f59gersnjq9q as SystemPaths,
  MockSystemPaths21yqvjk9ssl7u as MockSystemPaths,
} from './utils/SystemPaths.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function platformModule() {
  return module_0(VOID, platformModule$lambda);
}
function platformModule$lambda($this$module) {
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition = platformModule$lambda$lambda;
  var scopeQualifier = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind = Kind_Singleton_getInstance();
  var secondaryTypes = emptyList();
  var def = new (BeanDefinition())(scopeQualifier, getKClass(Clock()), null, definition, kind, secondaryTypes);
  var factory = new (SingleInstanceFactory())(def);
  $this$module.o7y(factory);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory);
  }
  new (KoinDefinition())($this$module, factory);
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_0 = platformModule$lambda$lambda_0;
  var scopeQualifier_0 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_0 = Kind_Singleton_getInstance();
  var secondaryTypes_0 = emptyList();
  var def_0 = new (BeanDefinition())(scopeQualifier_0, getKClass(SystemPaths()), null, definition_0, kind_0, secondaryTypes_0);
  var factory_0 = new (SingleInstanceFactory())(def_0);
  $this$module.o7y(factory_0);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_0);
  }
  new (KoinDefinition())($this$module, factory_0);
  return Unit_instance;
}
function platformModule$lambda$lambda($this$single, it) {
  return System_instance;
}
function platformModule$lambda$lambda_0($this$single, it) {
  return MockSystemPaths().gad('/data', '/cache');
}
//region block: exports
export {
  platformModule as platformModule305lnhq4howzi,
};
//endregion

//# sourceMappingURL=PlatformModule.mjs.map
