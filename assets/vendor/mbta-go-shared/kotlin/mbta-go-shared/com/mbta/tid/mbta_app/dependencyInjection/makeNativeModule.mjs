import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { module39wmcymxxg0fj as module_0 } from '../../../../../../projects-core-koin-core/org/koin/dsl/ModuleDSL.mjs';
import { PhoenixSocket13et8h4925i39 as PhoenixSocket } from '../network/MobilePhoenixInterfaces.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import {
  AlertsRepository30jdqpokdyh3y as AlertsRepository,
  IAlertsRepository2nltalishntbu as IAlertsRepository,
} from '../repositories/AlertsRepository.mjs';
import {
  PredictionsRepository3jvy3y42296te as PredictionsRepository,
  IPredictionsRepository2ydt6pa8vjrl3 as IPredictionsRepository,
} from '../repositories/PredictionsRepository.mjs';
import {
  TripPredictionsRepository3zbisg8rlevb as TripPredictionsRepository,
  ITripPredictionsRepository2u5evlejn4wwm as ITripPredictionsRepository,
} from '../repositories/TripPredictionsRepository.mjs';
import {
  VehicleRepository2spilqj7s4wnl as VehicleRepository,
  IVehicleRepository1sea31hkzb8vh as IVehicleRepository,
} from '../repositories/VehicleRepository.mjs';
import {
  VehiclesRepository3m770e4oxd4zi as VehiclesRepository,
  IVehiclesRepository9ibwaycj4c7r as IVehiclesRepository,
} from '../repositories/VehiclesRepository.mjs';
import { Companion_getInstance13ladrowvkk2x as Companion_getInstance } from '../../../../../../projects-core-koin-core/org/koin/core/registry/ScopeRegistry.mjs';
import {
  Kind_Singleton_getInstancexsk8x1eh18jm as Kind_Singleton_getInstance,
  BeanDefinitionhif1nxb54kgk as BeanDefinition,
  Kind_Factory_getInstancen5wx4z4o0a4j as Kind_Factory_getInstance,
} from '../../../../../../projects-core-koin-core/org/koin/core/definition/BeanDefinition.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { IAccessibilityStatusRepositoryie5hsx1kk1ap as IAccessibilityStatusRepository } from '../repositories/AccessibilityStatusRepository.mjs';
import { SingleInstanceFactoryp594z6t2b69a as SingleInstanceFactory } from '../../../../../../projects-core-koin-core/org/koin/core/instance/SingleInstanceFactory.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KoinDefinition2pr0kscd0vkk6 as KoinDefinition } from '../../../../../../projects-core-koin-core/org/koin/core/definition/KoinDefinition.mjs';
import { Analytics1mdx7nc6a8dig as Analytics } from '../analytics/Analytics.mjs';
import { ICurrentAppVersionRepository51t8w6343ztn as ICurrentAppVersionRepository } from '../repositories/CurrentAppVersionRepository.mjs';
import { FactoryInstanceFactory2tq2q9e5id3pz as FactoryInstanceFactory } from '../../../../../../projects-core-koin-core/org/koin/core/instance/FactoryInstanceFactory.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function makeNativeModule(accessibilityStatus, analytics, currentAppVersion, socket) {
  return module_0(VOID, makeNativeModule$lambda(accessibilityStatus, analytics, currentAppVersion, socket));
}
function makeNativeModule$lambda$lambda($accessibilityStatus) {
  return function ($this$single, it) {
    return $accessibilityStatus;
  };
}
function makeNativeModule$lambda$lambda_0($analytics) {
  return function ($this$single, it) {
    return $analytics;
  };
}
function makeNativeModule$lambda$lambda_1($currentAppVersion) {
  return function ($this$single, it) {
    return $currentAppVersion;
  };
}
function makeNativeModule$lambda$lambda_2($socket) {
  return function ($this$single, it) {
    return $socket;
  };
}
function makeNativeModule$lambda$lambda_3($this$factory, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$factory.n7z(getKClass(PhoenixSocket()), null, null);
  return new (AlertsRepository())(tmp$ret$0);
}
function makeNativeModule$lambda$lambda_4($this$factory, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$factory.n7z(getKClass(PhoenixSocket()), null, null);
  return new (PredictionsRepository())(tmp$ret$0);
}
function makeNativeModule$lambda$lambda_5($this$factory, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$factory.n7z(getKClass(PhoenixSocket()), null, null);
  return new (TripPredictionsRepository())(tmp$ret$0);
}
function makeNativeModule$lambda$lambda_6($this$factory, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$factory.n7z(getKClass(PhoenixSocket()), null, null);
  return new (VehicleRepository())(tmp$ret$0);
}
function makeNativeModule$lambda$lambda_7($this$factory, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$factory.n7z(getKClass(PhoenixSocket()), null, null);
  return new (VehiclesRepository())(tmp$ret$0);
}
function makeNativeModule$lambda($accessibilityStatus, $analytics, $currentAppVersion, $socket) {
  return function ($this$module) {
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition = makeNativeModule$lambda$lambda($accessibilityStatus);
    var scopeQualifier = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind = Kind_Singleton_getInstance();
    var secondaryTypes = emptyList();
    var def = new (BeanDefinition())(scopeQualifier, getKClass(IAccessibilityStatusRepository()), null, definition, kind, secondaryTypes);
    var factory = new (SingleInstanceFactory())(def);
    $this$module.o7y(factory);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory);
    }
    new (KoinDefinition())($this$module, factory);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_0 = makeNativeModule$lambda$lambda_0($analytics);
    var scopeQualifier_0 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_0 = Kind_Singleton_getInstance();
    var secondaryTypes_0 = emptyList();
    var def_0 = new (BeanDefinition())(scopeQualifier_0, getKClass(Analytics()), null, definition_0, kind_0, secondaryTypes_0);
    var factory_0 = new (SingleInstanceFactory())(def_0);
    $this$module.o7y(factory_0);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_0);
    }
    new (KoinDefinition())($this$module, factory_0);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_1 = makeNativeModule$lambda$lambda_1($currentAppVersion);
    var scopeQualifier_1 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_1 = Kind_Singleton_getInstance();
    var secondaryTypes_1 = emptyList();
    var def_1 = new (BeanDefinition())(scopeQualifier_1, getKClass(ICurrentAppVersionRepository()), null, definition_1, kind_1, secondaryTypes_1);
    var factory_1 = new (SingleInstanceFactory())(def_1);
    $this$module.o7y(factory_1);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_1);
    }
    new (KoinDefinition())($this$module, factory_1);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_2 = makeNativeModule$lambda$lambda_2($socket);
    var scopeQualifier_2 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_2 = Kind_Singleton_getInstance();
    var secondaryTypes_2 = emptyList();
    var def_2 = new (BeanDefinition())(scopeQualifier_2, getKClass(PhoenixSocket()), null, definition_2, kind_2, secondaryTypes_2);
    var factory_2 = new (SingleInstanceFactory())(def_2);
    $this$module.o7y(factory_2);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_2);
    }
    new (KoinDefinition())($this$module, factory_2);
    // Inline function 'org.koin.core.module.Module.factory' call
    var tmp4 = makeNativeModule$lambda$lambda_3;
    // Inline function 'org.koin.core.module.Module.factory' call
    // Inline function 'org.koin.core.module._factoryInstanceFactory' call
    var scopeQualifier_3 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_3 = Kind_Factory_getInstance();
    var secondaryTypes_3 = emptyList();
    var def_3 = new (BeanDefinition())(scopeQualifier_3, getKClass(IAlertsRepository()), null, tmp4, kind_3, secondaryTypes_3);
    var factory_3 = new (FactoryInstanceFactory())(def_3);
    $this$module.o7y(factory_3);
    new (KoinDefinition())($this$module, factory_3);
    // Inline function 'org.koin.core.module.Module.factory' call
    var tmp4_0 = makeNativeModule$lambda$lambda_4;
    // Inline function 'org.koin.core.module.Module.factory' call
    // Inline function 'org.koin.core.module._factoryInstanceFactory' call
    var scopeQualifier_4 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_4 = Kind_Factory_getInstance();
    var secondaryTypes_4 = emptyList();
    var def_4 = new (BeanDefinition())(scopeQualifier_4, getKClass(IPredictionsRepository()), null, tmp4_0, kind_4, secondaryTypes_4);
    var factory_4 = new (FactoryInstanceFactory())(def_4);
    $this$module.o7y(factory_4);
    new (KoinDefinition())($this$module, factory_4);
    // Inline function 'org.koin.core.module.Module.factory' call
    var tmp4_1 = makeNativeModule$lambda$lambda_5;
    // Inline function 'org.koin.core.module.Module.factory' call
    // Inline function 'org.koin.core.module._factoryInstanceFactory' call
    var scopeQualifier_5 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_5 = Kind_Factory_getInstance();
    var secondaryTypes_5 = emptyList();
    var def_5 = new (BeanDefinition())(scopeQualifier_5, getKClass(ITripPredictionsRepository()), null, tmp4_1, kind_5, secondaryTypes_5);
    var factory_5 = new (FactoryInstanceFactory())(def_5);
    $this$module.o7y(factory_5);
    new (KoinDefinition())($this$module, factory_5);
    // Inline function 'org.koin.core.module.Module.factory' call
    var tmp4_2 = makeNativeModule$lambda$lambda_6;
    // Inline function 'org.koin.core.module.Module.factory' call
    // Inline function 'org.koin.core.module._factoryInstanceFactory' call
    var scopeQualifier_6 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_6 = Kind_Factory_getInstance();
    var secondaryTypes_6 = emptyList();
    var def_6 = new (BeanDefinition())(scopeQualifier_6, getKClass(IVehicleRepository()), null, tmp4_2, kind_6, secondaryTypes_6);
    var factory_6 = new (FactoryInstanceFactory())(def_6);
    $this$module.o7y(factory_6);
    new (KoinDefinition())($this$module, factory_6);
    // Inline function 'org.koin.core.module.Module.factory' call
    var tmp4_3 = makeNativeModule$lambda$lambda_7;
    // Inline function 'org.koin.core.module.Module.factory' call
    // Inline function 'org.koin.core.module._factoryInstanceFactory' call
    var scopeQualifier_7 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_7 = Kind_Factory_getInstance();
    var secondaryTypes_7 = emptyList();
    var def_7 = new (BeanDefinition())(scopeQualifier_7, getKClass(IVehiclesRepository()), null, tmp4_3, kind_7, secondaryTypes_7);
    var factory_7 = new (FactoryInstanceFactory())(def_7);
    $this$module.o7y(factory_7);
    new (KoinDefinition())($this$module, factory_7);
    return Unit_instance;
  };
}
//region block: exports
export {
  makeNativeModule as makeNativeModule4dkmnb0mloi,
};
//endregion

//# sourceMappingURL=makeNativeModule.mjs.map
