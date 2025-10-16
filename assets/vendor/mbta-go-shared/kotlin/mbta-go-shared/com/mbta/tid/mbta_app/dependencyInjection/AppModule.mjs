import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { module39wmcymxxg0fj as module_0 } from '../../../../../../projects-core-koin-core/org/koin/dsl/ModuleDSL.mjs';
import { MobileBackendClientz9b3ukda94t9 as MobileBackendClient } from '../network/MobileBackendClient.mjs';
import { Companion_getInstance13ladrowvkk2x as Companion_getInstance } from '../../../../../../projects-core-koin-core/org/koin/core/registry/ScopeRegistry.mjs';
import {
  Kind_Singleton_getInstancexsk8x1eh18jm as Kind_Singleton_getInstance,
  BeanDefinitionhif1nxb54kgk as BeanDefinition,
  Kind_Factory_getInstancen5wx4z4o0a4j as Kind_Factory_getInstance,
} from '../../../../../../projects-core-koin-core/org/koin/core/definition/BeanDefinition.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SingleInstanceFactoryp594z6t2b69a as SingleInstanceFactory } from '../../../../../../projects-core-koin-core/org/koin/core/instance/SingleInstanceFactory.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KoinDefinition2pr0kscd0vkk6 as KoinDefinition } from '../../../../../../projects-core-koin-core/org/koin/core/definition/KoinDefinition.mjs';
import { FileSystem23s9wmosmz1qj as FileSystem } from '../fs/FileSystem.mjs';
import {
  get_fileSystem32b7xe1ofriby as get_fileSystem,
  get_ioDispatcher2k47azxnqlo9k as get_ioDispatcher,
} from './AppModule.js.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { Dispatchers_getInstanceitgtkvqfcnx3 as Dispatchers_getInstance } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/Dispatchers.mjs';
import { RealRepositories2sek6zr2ek36i as RealRepositories } from './RepositoryDI.mjs';
import { IAlertsRepository2nltalishntbu as IAlertsRepository } from '../repositories/AlertsRepository.mjs';
import { IGlobalRepository2966xpkjzgq2l as IGlobalRepository } from '../repositories/GlobalRepository.mjs';
import { AlertsUsecase1smuzc4kgc05w as AlertsUsecase } from '../usecases/AlertsUsecase.mjs';
import { IConfigRepository35mprll55mz3v as IConfigRepository } from '../repositories/ConfigRepository.mjs';
import { ISentryRepository315w00k1ryhdb as ISentryRepository } from '../repositories/SentryRepository.mjs';
import { ConfigUseCase25njxgdei3kzw as ConfigUseCase } from '../usecases/ConfigUseCase.mjs';
import { ICurrentAppVersionRepository51t8w6343ztn as ICurrentAppVersionRepository } from '../repositories/CurrentAppVersionRepository.mjs';
import { ILastLaunchedAppVersionRepository21r8qcf4x3eeq as ILastLaunchedAppVersionRepository } from '../repositories/LastLaunchedAppVersionRepository.mjs';
import {
  FeaturePromoUseCaser136xobpsuc2 as FeaturePromoUseCase,
  IFeaturePromoUseCase1m3whbdmf3u1 as IFeaturePromoUseCase,
} from '../usecases/FeaturePromoUseCase.mjs';
import { IVisitHistoryRepository38cqucadolvba as IVisitHistoryRepository } from '../repositories/VisitHistoryRepository.mjs';
import { VisitHistoryUsecase3a9kuglea7v5h as VisitHistoryUsecase } from '../usecases/VisitHistoryUsecase.mjs';
import { IFavoritesRepository1ho9a62ku2ni8 as IFavoritesRepository } from '../repositories/FavoritesRepository.mjs';
import { Analytics1mdx7nc6a8dig as Analytics } from '../analytics/Analytics.mjs';
import { FavoritesUsecases3umt3qcf03962 as FavoritesUsecases } from '../usecases/FavoritesUsecases.mjs';
import { ITabPreferencesRepositorysbncwx25ulu9 as ITabPreferencesRepository } from '../repositories/TabPreferencesRepository.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../repositories/ErrorBannerStateRepository.mjs';
import { INearbyRepositoryxu1gi8x6334m as INearbyRepository } from '../repositories/NearbyRepository.mjs';
import { IOnboardingRepository2p8jayv3sq6ok as IOnboardingRepository } from '../repositories/OnboardingRepository.mjs';
import { IPinnedRoutesRepository31ookeapudd1h as IPinnedRoutesRepository } from '../repositories/PinnedRoutesRepository.mjs';
import { IRailRouteShapeRepository1o4yk596yij09 as IRailRouteShapeRepository } from '../repositories/RailRouteShapeRepository.mjs';
import { IRouteStopsRepository31e6hyms33kh2 as IRouteStopsRepository } from '../repositories/RouteStopsRepository.mjs';
import { ISchedulesRepository3iopyft7sy2ox as ISchedulesRepository } from '../repositories/SchedulesRepository.mjs';
import { ISearchResultRepositoryukemhfr4a8v6 as ISearchResultRepository } from '../repositories/SearchResultRepository.mjs';
import { ISettingsRepositorylifn2oq7uzyc as ISettingsRepository } from '../repositories/SettingsRepository.mjs';
import { IStopRepository3lpmqknb3eoh4 as IStopRepository } from '../repositories/StopRepository.mjs';
import { ITripRepositoryrl4c5in4vd4b as ITripRepository } from '../repositories/TripRepository.mjs';
import { IAccessibilityStatusRepositoryie5hsx1kk1ap as IAccessibilityStatusRepository } from '../repositories/AccessibilityStatusRepository.mjs';
import { FactoryInstanceFactory2tq2q9e5id3pz as FactoryInstanceFactory } from '../../../../../../projects-core-koin-core/org/koin/core/instance/FactoryInstanceFactory.mjs';
import { IPredictionsRepository2ydt6pa8vjrl3 as IPredictionsRepository } from '../repositories/PredictionsRepository.mjs';
import { ITripPredictionsRepository2u5evlejn4wwm as ITripPredictionsRepository } from '../repositories/TripPredictionsRepository.mjs';
import { IVehicleRepository1sea31hkzb8vh as IVehicleRepository } from '../repositories/VehicleRepository.mjs';
import { IVehiclesRepository9ibwaycj4c7r as IVehiclesRepository } from '../repositories/VehiclesRepository.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function appModule(backendRoot) {
  return module_0(VOID, appModule$lambda(backendRoot));
}
function repositoriesModule(repositories) {
  return module_0(VOID, repositoriesModule$lambda(repositories));
}
function appModule$lambda$lambda$lambda($backendRoot) {
  return function ($this$single, it) {
    return MobileBackendClient().g8m($backendRoot);
  };
}
function appModule$lambda$lambda($backendRoot) {
  return function ($this$module) {
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition = appModule$lambda$lambda$lambda($backendRoot);
    var scopeQualifier = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind = Kind_Singleton_getInstance();
    var secondaryTypes = emptyList();
    var def = new (BeanDefinition())(scopeQualifier, getKClass(MobileBackendClient()), null, definition, kind, secondaryTypes);
    var factory = new (SingleInstanceFactory())(def);
    $this$module.o7y(factory);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory);
    }
    new (KoinDefinition())($this$module, factory);
    return Unit_instance;
  };
}
function appModule$lambda$lambda_0($this$module) {
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition = appModule$lambda$lambda$lambda_0;
  var scopeQualifier = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind = Kind_Singleton_getInstance();
  var secondaryTypes = emptyList();
  var def = new (BeanDefinition())(scopeQualifier, getKClass(FileSystem()), null, definition, kind, secondaryTypes);
  var factory = new (SingleInstanceFactory())(def);
  $this$module.o7y(factory);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory);
  }
  new (KoinDefinition())($this$module, factory);
  return Unit_instance;
}
function appModule$lambda$lambda$lambda_0($this$single, it) {
  return get_fileSystem();
}
function appModule$lambda$lambda_1($this$module) {
  var tmp2 = named('coroutineDispatcherDefault');
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition = appModule$lambda$lambda$lambda_1;
  var scopeQualifier = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind = Kind_Singleton_getInstance();
  var secondaryTypes = emptyList();
  var def = new (BeanDefinition())(scopeQualifier, getKClass(CoroutineDispatcher()), tmp2, definition, kind, secondaryTypes);
  var factory = new (SingleInstanceFactory())(def);
  $this$module.o7y(factory);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory);
  }
  new (KoinDefinition())($this$module, factory);
  return Unit_instance;
}
function appModule$lambda$lambda$lambda_1($this$single, it) {
  return Dispatchers_getInstance().u28_1;
}
function appModule$lambda$lambda_2($this$module) {
  var tmp2 = named('coroutineDispatcherIO');
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition = appModule$lambda$lambda$lambda_2;
  var scopeQualifier = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind = Kind_Singleton_getInstance();
  var secondaryTypes = emptyList();
  var def = new (BeanDefinition())(scopeQualifier, getKClass(CoroutineDispatcher()), tmp2, definition, kind, secondaryTypes);
  var factory = new (SingleInstanceFactory())(def);
  $this$module.o7y(factory);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory);
  }
  new (KoinDefinition())($this$module, factory);
  return Unit_instance;
}
function appModule$lambda$lambda$lambda_2($this$single, it) {
  return get_ioDispatcher();
}
function appModule$lambda($backendRoot) {
  return function ($this$module) {
    var tmp = module_0(VOID, appModule$lambda$lambda($backendRoot));
    var tmp_0 = module_0(VOID, appModule$lambda$lambda_0);
    var tmp_1 = module_0(VOID, appModule$lambda$lambda_1);
    $this$module.n7y([tmp, tmp_0, tmp_1, module_0(VOID, appModule$lambda$lambda_2), repositoriesModule(new (RealRepositories())())]);
    return Unit_instance;
  };
}
function repositoriesModule$lambda$lambda($repositories) {
  return function ($this$single, it) {
    return $repositories.n4q();
  };
}
function repositoriesModule$lambda$lambda_0($repositories) {
  return function ($this$single, it) {
    return $repositories.h8m();
  };
}
function repositoriesModule$lambda$lambda_1($repositories) {
  return function ($this$single, it) {
    return $repositories.i8m();
  };
}
function repositoriesModule$lambda$lambda_2($repositories) {
  return function ($this$single, it) {
    return $repositories.j8m();
  };
}
function repositoriesModule$lambda$lambda_3($repositories) {
  return function ($this$single, it) {
    return $repositories.k8m();
  };
}
function repositoriesModule$lambda$lambda_4($repositories) {
  return function ($this$single, it) {
    return $repositories.l8m();
  };
}
function repositoriesModule$lambda$lambda_5($repositories) {
  return function ($this$single, it) {
    return $repositories.m8m();
  };
}
function repositoriesModule$lambda$lambda_6($repositories) {
  return function ($this$single, it) {
    return $repositories.n8m();
  };
}
function repositoriesModule$lambda$lambda_7($repositories) {
  return function ($this$single, it) {
    return $repositories.o8m();
  };
}
function repositoriesModule$lambda$lambda_8($repositories) {
  return function ($this$single, it) {
    return $repositories.p8m();
  };
}
function repositoriesModule$lambda$lambda_9($repositories) {
  return function ($this$single, it) {
    return $repositories.q8m();
  };
}
function repositoriesModule$lambda$lambda_10($repositories) {
  return function ($this$single, it) {
    return $repositories.r8m();
  };
}
function repositoriesModule$lambda$lambda_11($repositories) {
  return function ($this$single, it) {
    return $repositories.s8m();
  };
}
function repositoriesModule$lambda$lambda_12($repositories) {
  return function ($this$single, it) {
    return $repositories.t8m();
  };
}
function repositoriesModule$lambda$lambda_13($repositories) {
  return function ($this$single, it) {
    return $repositories.u8m();
  };
}
function repositoriesModule$lambda$lambda_14($repositories) {
  return function ($this$single, it) {
    return $repositories.v8m();
  };
}
function repositoriesModule$lambda$lambda_15($accessibilityStatusRepo) {
  return function ($this$single, it) {
    return $accessibilityStatusRepo;
  };
}
function repositoriesModule$lambda$lambda_16($alertsRepo) {
  return function ($this$factory, it) {
    return $alertsRepo;
  };
}
function repositoriesModule$lambda$lambda_17($currentAppVersionRepo) {
  return function ($this$factory, it) {
    return $currentAppVersionRepo;
  };
}
function repositoriesModule$lambda$lambda_18($predictionsRepo) {
  return function ($this$factory, it) {
    return $predictionsRepo;
  };
}
function repositoriesModule$lambda$lambda_19($tripPredictionsRepo) {
  return function ($this$factory, it) {
    return $tripPredictionsRepo;
  };
}
function repositoriesModule$lambda$lambda_20($vehicleRepo) {
  return function ($this$factory, it) {
    return $vehicleRepo;
  };
}
function repositoriesModule$lambda$lambda_21($vehiclesRepo) {
  return function ($this$factory, it) {
    return $vehiclesRepo;
  };
}
function repositoriesModule$lambda$lambda_22($repositories) {
  return function ($this$single, it) {
    return $repositories.w8m();
  };
}
function repositoriesModule$lambda$lambda_23($repositories) {
  return function ($this$single, it) {
    return $repositories.x8m();
  };
}
function repositoriesModule$lambda$lambda_24($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IAlertsRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$1 = $this$single.n7z(getKClass(IGlobalRepository()), null, null);
  return new (AlertsUsecase())(tmp, tmp$ret$1);
}
function repositoriesModule$lambda$lambda_25($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IConfigRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$1 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  return new (ConfigUseCase())(tmp, tmp$ret$1);
}
function repositoriesModule$lambda$lambda_26($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(ICurrentAppVersionRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$1 = $this$single.n7z(getKClass(ILastLaunchedAppVersionRepository()), null, null);
  return new (FeaturePromoUseCase())(tmp, tmp$ret$1);
}
function repositoriesModule$lambda$lambda_27($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$0 = $this$single.n7z(getKClass(IVisitHistoryRepository()), null, null);
  return new (VisitHistoryUsecase())(tmp$ret$0);
}
function repositoriesModule$lambda$lambda_28($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IFavoritesRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$1 = $this$single.n7z(getKClass(Analytics()), null, null);
  return new (FavoritesUsecases())(tmp, tmp$ret$1);
}
function repositoriesModule$lambda($repositories) {
  return function ($this$module) {
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition = repositoriesModule$lambda$lambda($repositories);
    var scopeQualifier = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind = Kind_Singleton_getInstance();
    var secondaryTypes = emptyList();
    var def = new (BeanDefinition())(scopeQualifier, getKClass(IConfigRepository()), null, definition, kind, secondaryTypes);
    var factory = new (SingleInstanceFactory())(def);
    $this$module.o7y(factory);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory);
    }
    new (KoinDefinition())($this$module, factory);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_0 = repositoriesModule$lambda$lambda_0($repositories);
    var scopeQualifier_0 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_0 = Kind_Singleton_getInstance();
    var secondaryTypes_0 = emptyList();
    var def_0 = new (BeanDefinition())(scopeQualifier_0, getKClass(ITabPreferencesRepository()), null, definition_0, kind_0, secondaryTypes_0);
    var factory_0 = new (SingleInstanceFactory())(def_0);
    $this$module.o7y(factory_0);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_0);
    }
    new (KoinDefinition())($this$module, factory_0);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_1 = repositoriesModule$lambda$lambda_1($repositories);
    var scopeQualifier_1 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_1 = Kind_Singleton_getInstance();
    var secondaryTypes_1 = emptyList();
    var def_1 = new (BeanDefinition())(scopeQualifier_1, getKClass(IErrorBannerStateRepository()), null, definition_1, kind_1, secondaryTypes_1);
    var factory_1 = new (SingleInstanceFactory())(def_1);
    $this$module.o7y(factory_1);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_1);
    }
    new (KoinDefinition())($this$module, factory_1);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_2 = repositoriesModule$lambda$lambda_2($repositories);
    var scopeQualifier_2 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_2 = Kind_Singleton_getInstance();
    var secondaryTypes_2 = emptyList();
    var def_2 = new (BeanDefinition())(scopeQualifier_2, getKClass(IGlobalRepository()), null, definition_2, kind_2, secondaryTypes_2);
    var factory_2 = new (SingleInstanceFactory())(def_2);
    $this$module.o7y(factory_2);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_2);
    }
    new (KoinDefinition())($this$module, factory_2);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_3 = repositoriesModule$lambda$lambda_3($repositories);
    var scopeQualifier_3 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_3 = Kind_Singleton_getInstance();
    var secondaryTypes_3 = emptyList();
    var def_3 = new (BeanDefinition())(scopeQualifier_3, getKClass(ILastLaunchedAppVersionRepository()), null, definition_3, kind_3, secondaryTypes_3);
    var factory_3 = new (SingleInstanceFactory())(def_3);
    $this$module.o7y(factory_3);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_3);
    }
    new (KoinDefinition())($this$module, factory_3);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_4 = repositoriesModule$lambda$lambda_4($repositories);
    var scopeQualifier_4 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_4 = Kind_Singleton_getInstance();
    var secondaryTypes_4 = emptyList();
    var def_4 = new (BeanDefinition())(scopeQualifier_4, getKClass(INearbyRepository()), null, definition_4, kind_4, secondaryTypes_4);
    var factory_4 = new (SingleInstanceFactory())(def_4);
    $this$module.o7y(factory_4);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_4);
    }
    new (KoinDefinition())($this$module, factory_4);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_5 = repositoriesModule$lambda$lambda_5($repositories);
    var scopeQualifier_5 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_5 = Kind_Singleton_getInstance();
    var secondaryTypes_5 = emptyList();
    var def_5 = new (BeanDefinition())(scopeQualifier_5, getKClass(IOnboardingRepository()), null, definition_5, kind_5, secondaryTypes_5);
    var factory_5 = new (SingleInstanceFactory())(def_5);
    $this$module.o7y(factory_5);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_5);
    }
    new (KoinDefinition())($this$module, factory_5);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_6 = repositoriesModule$lambda$lambda_6($repositories);
    var scopeQualifier_6 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_6 = Kind_Singleton_getInstance();
    var secondaryTypes_6 = emptyList();
    var def_6 = new (BeanDefinition())(scopeQualifier_6, getKClass(IPinnedRoutesRepository()), null, definition_6, kind_6, secondaryTypes_6);
    var factory_6 = new (SingleInstanceFactory())(def_6);
    $this$module.o7y(factory_6);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_6);
    }
    new (KoinDefinition())($this$module, factory_6);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_7 = repositoriesModule$lambda$lambda_7($repositories);
    var scopeQualifier_7 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_7 = Kind_Singleton_getInstance();
    var secondaryTypes_7 = emptyList();
    var def_7 = new (BeanDefinition())(scopeQualifier_7, getKClass(IRailRouteShapeRepository()), null, definition_7, kind_7, secondaryTypes_7);
    var factory_7 = new (SingleInstanceFactory())(def_7);
    $this$module.o7y(factory_7);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_7);
    }
    new (KoinDefinition())($this$module, factory_7);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_8 = repositoriesModule$lambda$lambda_8($repositories);
    var scopeQualifier_8 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_8 = Kind_Singleton_getInstance();
    var secondaryTypes_8 = emptyList();
    var def_8 = new (BeanDefinition())(scopeQualifier_8, getKClass(IRouteStopsRepository()), null, definition_8, kind_8, secondaryTypes_8);
    var factory_8 = new (SingleInstanceFactory())(def_8);
    $this$module.o7y(factory_8);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_8);
    }
    new (KoinDefinition())($this$module, factory_8);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_9 = repositoriesModule$lambda$lambda_9($repositories);
    var scopeQualifier_9 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_9 = Kind_Singleton_getInstance();
    var secondaryTypes_9 = emptyList();
    var def_9 = new (BeanDefinition())(scopeQualifier_9, getKClass(ISchedulesRepository()), null, definition_9, kind_9, secondaryTypes_9);
    var factory_9 = new (SingleInstanceFactory())(def_9);
    $this$module.o7y(factory_9);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_9);
    }
    new (KoinDefinition())($this$module, factory_9);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_10 = repositoriesModule$lambda$lambda_10($repositories);
    var scopeQualifier_10 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_10 = Kind_Singleton_getInstance();
    var secondaryTypes_10 = emptyList();
    var def_10 = new (BeanDefinition())(scopeQualifier_10, getKClass(ISearchResultRepository()), null, definition_10, kind_10, secondaryTypes_10);
    var factory_10 = new (SingleInstanceFactory())(def_10);
    $this$module.o7y(factory_10);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_10);
    }
    new (KoinDefinition())($this$module, factory_10);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_11 = repositoriesModule$lambda$lambda_11($repositories);
    var scopeQualifier_11 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_11 = Kind_Singleton_getInstance();
    var secondaryTypes_11 = emptyList();
    var def_11 = new (BeanDefinition())(scopeQualifier_11, getKClass(ISentryRepository()), null, definition_11, kind_11, secondaryTypes_11);
    var factory_11 = new (SingleInstanceFactory())(def_11);
    $this$module.o7y(factory_11);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_11);
    }
    new (KoinDefinition())($this$module, factory_11);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_12 = repositoriesModule$lambda$lambda_12($repositories);
    var scopeQualifier_12 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_12 = Kind_Singleton_getInstance();
    var secondaryTypes_12 = emptyList();
    var def_12 = new (BeanDefinition())(scopeQualifier_12, getKClass(ISettingsRepository()), null, definition_12, kind_12, secondaryTypes_12);
    var factory_12 = new (SingleInstanceFactory())(def_12);
    $this$module.o7y(factory_12);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_12);
    }
    new (KoinDefinition())($this$module, factory_12);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_13 = repositoriesModule$lambda$lambda_13($repositories);
    var scopeQualifier_13 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_13 = Kind_Singleton_getInstance();
    var secondaryTypes_13 = emptyList();
    var def_13 = new (BeanDefinition())(scopeQualifier_13, getKClass(IStopRepository()), null, definition_13, kind_13, secondaryTypes_13);
    var factory_13 = new (SingleInstanceFactory())(def_13);
    $this$module.o7y(factory_13);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_13);
    }
    new (KoinDefinition())($this$module, factory_13);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_14 = repositoriesModule$lambda$lambda_14($repositories);
    var scopeQualifier_14 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_14 = Kind_Singleton_getInstance();
    var secondaryTypes_14 = emptyList();
    var def_14 = new (BeanDefinition())(scopeQualifier_14, getKClass(ITripRepository()), null, definition_14, kind_14, secondaryTypes_14);
    var factory_14 = new (SingleInstanceFactory())(def_14);
    $this$module.o7y(factory_14);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_14);
    }
    new (KoinDefinition())($this$module, factory_14);
    var tmp0_safe_receiver = $repositories.y8m();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.single' call
      // Inline function 'org.koin.core.module._singleInstanceFactory' call
      var definition_15 = repositoriesModule$lambda$lambda_15(tmp0_safe_receiver);
      var scopeQualifier_15 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_15 = Kind_Singleton_getInstance();
      var secondaryTypes_15 = emptyList();
      var def_15 = new (BeanDefinition())(scopeQualifier_15, getKClass(IAccessibilityStatusRepository()), null, definition_15, kind_15, secondaryTypes_15);
      var factory_15 = new (SingleInstanceFactory())(def_15);
      $this$module.o7y(factory_15);
      if (false || $this$module.h7y_1) {
        $this$module.r7y(factory_15);
      }
      new (KoinDefinition())($this$module, factory_15);
    }
    var tmp1_safe_receiver = $repositories.z8m();
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4 = repositoriesModule$lambda$lambda_16(tmp1_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_16 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_16 = Kind_Factory_getInstance();
      var secondaryTypes_16 = emptyList();
      var def_16 = new (BeanDefinition())(scopeQualifier_16, getKClass(IAlertsRepository()), null, tmp4, kind_16, secondaryTypes_16);
      var factory_16 = new (FactoryInstanceFactory())(def_16);
      $this$module.o7y(factory_16);
      new (KoinDefinition())($this$module, factory_16);
    }
    var tmp2_safe_receiver = $repositories.a8n();
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4_0 = repositoriesModule$lambda$lambda_17(tmp2_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_17 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_17 = Kind_Factory_getInstance();
      var secondaryTypes_17 = emptyList();
      var def_17 = new (BeanDefinition())(scopeQualifier_17, getKClass(ICurrentAppVersionRepository()), null, tmp4_0, kind_17, secondaryTypes_17);
      var factory_17 = new (FactoryInstanceFactory())(def_17);
      $this$module.o7y(factory_17);
      new (KoinDefinition())($this$module, factory_17);
    }
    var tmp3_safe_receiver = $repositories.b8n();
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4_1 = repositoriesModule$lambda$lambda_18(tmp3_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_18 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_18 = Kind_Factory_getInstance();
      var secondaryTypes_18 = emptyList();
      var def_18 = new (BeanDefinition())(scopeQualifier_18, getKClass(IPredictionsRepository()), null, tmp4_1, kind_18, secondaryTypes_18);
      var factory_18 = new (FactoryInstanceFactory())(def_18);
      $this$module.o7y(factory_18);
      new (KoinDefinition())($this$module, factory_18);
    }
    var tmp4_safe_receiver = $repositories.c8n();
    if (tmp4_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4_2 = repositoriesModule$lambda$lambda_19(tmp4_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_19 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_19 = Kind_Factory_getInstance();
      var secondaryTypes_19 = emptyList();
      var def_19 = new (BeanDefinition())(scopeQualifier_19, getKClass(ITripPredictionsRepository()), null, tmp4_2, kind_19, secondaryTypes_19);
      var factory_19 = new (FactoryInstanceFactory())(def_19);
      $this$module.o7y(factory_19);
      new (KoinDefinition())($this$module, factory_19);
    }
    var tmp5_safe_receiver = $repositories.d8n();
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4_3 = repositoriesModule$lambda$lambda_20(tmp5_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_20 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_20 = Kind_Factory_getInstance();
      var secondaryTypes_20 = emptyList();
      var def_20 = new (BeanDefinition())(scopeQualifier_20, getKClass(IVehicleRepository()), null, tmp4_3, kind_20, secondaryTypes_20);
      var factory_20 = new (FactoryInstanceFactory())(def_20);
      $this$module.o7y(factory_20);
      new (KoinDefinition())($this$module, factory_20);
    }
    var tmp6_safe_receiver = $repositories.e8n();
    if (tmp6_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'org.koin.core.module.Module.factory' call
      var tmp4_4 = repositoriesModule$lambda$lambda_21(tmp6_safe_receiver);
      // Inline function 'org.koin.core.module.Module.factory' call
      // Inline function 'org.koin.core.module._factoryInstanceFactory' call
      var scopeQualifier_21 = Companion_getInstance().h7w_1;
      // Inline function 'org.koin.core.definition._createDefinition' call
      var kind_21 = Kind_Factory_getInstance();
      var secondaryTypes_21 = emptyList();
      var def_21 = new (BeanDefinition())(scopeQualifier_21, getKClass(IVehiclesRepository()), null, tmp4_4, kind_21, secondaryTypes_21);
      var factory_21 = new (FactoryInstanceFactory())(def_21);
      $this$module.o7y(factory_21);
      new (KoinDefinition())($this$module, factory_21);
    }
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_16 = repositoriesModule$lambda$lambda_22($repositories);
    var scopeQualifier_22 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_22 = Kind_Singleton_getInstance();
    var secondaryTypes_22 = emptyList();
    var def_22 = new (BeanDefinition())(scopeQualifier_22, getKClass(IVisitHistoryRepository()), null, definition_16, kind_22, secondaryTypes_22);
    var factory_22 = new (SingleInstanceFactory())(def_22);
    $this$module.o7y(factory_22);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_22);
    }
    new (KoinDefinition())($this$module, factory_22);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_17 = repositoriesModule$lambda$lambda_23($repositories);
    var scopeQualifier_23 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_23 = Kind_Singleton_getInstance();
    var secondaryTypes_23 = emptyList();
    var def_23 = new (BeanDefinition())(scopeQualifier_23, getKClass(IFavoritesRepository()), null, definition_17, kind_23, secondaryTypes_23);
    var factory_23 = new (SingleInstanceFactory())(def_23);
    $this$module.o7y(factory_23);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_23);
    }
    new (KoinDefinition())($this$module, factory_23);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_18 = repositoriesModule$lambda$lambda_24;
    var scopeQualifier_24 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_24 = Kind_Singleton_getInstance();
    var secondaryTypes_24 = emptyList();
    var def_24 = new (BeanDefinition())(scopeQualifier_24, getKClass(AlertsUsecase()), null, definition_18, kind_24, secondaryTypes_24);
    var factory_24 = new (SingleInstanceFactory())(def_24);
    $this$module.o7y(factory_24);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_24);
    }
    new (KoinDefinition())($this$module, factory_24);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_19 = repositoriesModule$lambda$lambda_25;
    var scopeQualifier_25 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_25 = Kind_Singleton_getInstance();
    var secondaryTypes_25 = emptyList();
    var def_25 = new (BeanDefinition())(scopeQualifier_25, getKClass(ConfigUseCase()), null, definition_19, kind_25, secondaryTypes_25);
    var factory_25 = new (SingleInstanceFactory())(def_25);
    $this$module.o7y(factory_25);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_25);
    }
    new (KoinDefinition())($this$module, factory_25);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_20 = repositoriesModule$lambda$lambda_26;
    var scopeQualifier_26 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_26 = Kind_Singleton_getInstance();
    var secondaryTypes_26 = emptyList();
    var def_26 = new (BeanDefinition())(scopeQualifier_26, getKClass(IFeaturePromoUseCase()), null, definition_20, kind_26, secondaryTypes_26);
    var factory_26 = new (SingleInstanceFactory())(def_26);
    $this$module.o7y(factory_26);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_26);
    }
    new (KoinDefinition())($this$module, factory_26);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_21 = repositoriesModule$lambda$lambda_27;
    var scopeQualifier_27 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_27 = Kind_Singleton_getInstance();
    var secondaryTypes_27 = emptyList();
    var def_27 = new (BeanDefinition())(scopeQualifier_27, getKClass(VisitHistoryUsecase()), null, definition_21, kind_27, secondaryTypes_27);
    var factory_27 = new (SingleInstanceFactory())(def_27);
    $this$module.o7y(factory_27);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_27);
    }
    new (KoinDefinition())($this$module, factory_27);
    // Inline function 'org.koin.core.module.Module.single' call
    // Inline function 'org.koin.core.module._singleInstanceFactory' call
    var definition_22 = repositoriesModule$lambda$lambda_28;
    var scopeQualifier_28 = Companion_getInstance().h7w_1;
    // Inline function 'org.koin.core.definition._createDefinition' call
    var kind_28 = Kind_Singleton_getInstance();
    var secondaryTypes_28 = emptyList();
    var def_28 = new (BeanDefinition())(scopeQualifier_28, getKClass(FavoritesUsecases()), null, definition_22, kind_28, secondaryTypes_28);
    var factory_28 = new (SingleInstanceFactory())(def_28);
    $this$module.o7y(factory_28);
    if (false || $this$module.h7y_1) {
      $this$module.r7y(factory_28);
    }
    new (KoinDefinition())($this$module, factory_28);
    return Unit_instance;
  };
}
//region block: exports
export {
  appModule as appModule2jys7gqlxfq8j,
};
//endregion

//# sourceMappingURL=AppModule.mjs.map
