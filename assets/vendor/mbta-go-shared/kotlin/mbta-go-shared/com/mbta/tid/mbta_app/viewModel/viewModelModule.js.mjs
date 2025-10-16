import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { module39wmcymxxg0fj as module_0 } from '../../../../../../projects-core-koin-core/org/koin/dsl/ModuleDSL.mjs';
import { Companion_getInstance13ladrowvkk2x as Companion_getInstance } from '../../../../../../projects-core-koin-core/org/koin/core/registry/ScopeRegistry.mjs';
import {
  Kind_Singleton_getInstancexsk8x1eh18jm as Kind_Singleton_getInstance,
  BeanDefinitionhif1nxb54kgk as BeanDefinition,
} from '../../../../../../projects-core-koin-core/org/koin/core/definition/BeanDefinition.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import {
  ErrorBannerViewModel10rnlbxctbaud as ErrorBannerViewModel,
  IErrorBannerViewModel1no2losolnp0y as IErrorBannerViewModel,
} from './ErrorBannerViewModel.mjs';
import { getKClass1s3j9wy1cofik as getKClass } from '../../../../../../kotlin-kotlin-stdlib/reflection.mjs';
import { SingleInstanceFactoryp594z6t2b69a as SingleInstanceFactory } from '../../../../../../projects-core-koin-core/org/koin/core/instance/SingleInstanceFactory.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { KoinDefinition2pr0kscd0vkk6 as KoinDefinition } from '../../../../../../projects-core-koin-core/org/koin/core/definition/KoinDefinition.mjs';
import { onOptionsoxrnzuikoevt as onOptions } from '../../../../../../projects-core-koin-core/org/koin/core/module/dsl/OptionDSL.mjs';
import { bind1gj9wgzuy31pq as bind } from '../../../../../../projects-core-koin-core/org/koin/dsl/DefinitionBinding.mjs';
import { FavoritesViewModel3nssgninhdb79 as FavoritesViewModel } from './FavoritesViewModel.mjs';
import {
  FilteredStopDetailsViewModel1jb84tisimkmc as FilteredStopDetailsViewModel,
  IFilteredStopDetailsViewModel10oi42n7av99g as IFilteredStopDetailsViewModel,
} from './FilteredStopDetailsViewModel.mjs';
import { MapViewModel207olxtzw9a90 as MapViewModel } from './MapViewModel.mjs';
import {
  RouteCardDataViewModel2iwon3anps7tc as RouteCardDataViewModel,
  IRouteCardDataViewModelhkdbe1glj9hk as IRouteCardDataViewModel,
} from './RouteCardDataViewModel.mjs';
import {
  RouteDetailsViewModel1is9wcy27mzd0 as RouteDetailsViewModel,
  IRouteDetailsViewModel333orcxbmvnvy as IRouteDetailsViewModel,
} from './RouteDetailsViewModel.mjs';
import {
  SearchRoutesViewModel21gneimimx5gk as SearchRoutesViewModel,
  ISearchRoutesViewModel37uw4krao1ma8 as ISearchRoutesViewModel,
} from './SearchRoutesViewModel.mjs';
import {
  SearchViewModel1xiszu6x5z20x as SearchViewModel,
  ISearchViewModel113rx8snnwnyf as ISearchViewModel,
} from './SearchViewModel.mjs';
import {
  StopDetailsViewModelwhynflsvucul as StopDetailsViewModel,
  IStopDetailsViewModel1mge40l63ow4k as IStopDetailsViewModel,
} from './StopDetailsViewModel.mjs';
import {
  ToastViewModel3tf5h8zv7b2z4 as ToastViewModel,
  IToastViewModel3r4s0u3ismq6q as IToastViewModel,
} from './ToastViewModel.mjs';
import {
  TripDetailsViewModel1hqsp7f1llsav as TripDetailsViewModel,
  ITripDetailsViewModel25zgdx53rhnis as ITripDetailsViewModel,
} from './TripDetailsViewModel.mjs';
import { IErrorBannerStateRepository1yho0frci5t6 as IErrorBannerStateRepository } from '../repositories/ErrorBannerStateRepository.mjs';
import { ISentryRepository315w00k1ryhdb as ISentryRepository } from '../repositories/SentryRepository.mjs';
import { Clock2yl0fnip31kbe as Clock } from '../../../../../../kotlin-kotlin-stdlib/kotlin/time/Clock.mjs';
import { FavoritesUsecases3umt3qcf03962 as FavoritesUsecases } from '../usecases/FavoritesUsecases.mjs';
import { IPinnedRoutesRepository31ookeapudd1h as IPinnedRoutesRepository } from '../repositories/PinnedRoutesRepository.mjs';
import { ITabPreferencesRepositorysbncwx25ulu9 as ITabPreferencesRepository } from '../repositories/TabPreferencesRepository.mjs';
import { named1qn5s3wnxjwbv as named } from '../../../../../../projects-core-koin-core/org/koin/core/qualifier/Qualifier.mjs';
import { CoroutineDispatcherizb7p9bijexj as CoroutineDispatcher } from '../../../../../../kotlinx-coroutines-core/kotlinx/coroutines/CoroutineDispatcher.mjs';
import { Analytics1mdx7nc6a8dig as Analytics } from '../analytics/Analytics.mjs';
import { IGlobalRepository2966xpkjzgq2l as IGlobalRepository } from '../repositories/GlobalRepository.mjs';
import { IRailRouteShapeRepository1o4yk596yij09 as IRailRouteShapeRepository } from '../repositories/RailRouteShapeRepository.mjs';
import { IStopRepository3lpmqknb3eoh4 as IStopRepository } from '../repositories/StopRepository.mjs';
import { ISearchResultRepositoryukemhfr4a8v6 as ISearchResultRepository } from '../repositories/SearchResultRepository.mjs';
import { VisitHistoryUsecase3a9kuglea7v5h as VisitHistoryUsecase } from '../usecases/VisitHistoryUsecase.mjs';
import { IPredictionsRepository2ydt6pa8vjrl3 as IPredictionsRepository } from '../repositories/PredictionsRepository.mjs';
import { ISchedulesRepository3iopyft7sy2ox as ISchedulesRepository } from '../repositories/SchedulesRepository.mjs';
import { ITripPredictionsRepository2u5evlejn4wwm as ITripPredictionsRepository } from '../repositories/TripPredictionsRepository.mjs';
import { ITripRepositoryrl4c5in4vd4b as ITripRepository } from '../repositories/TripRepository.mjs';
import { IVehicleRepository1sea31hkzb8vh as IVehicleRepository } from '../repositories/VehicleRepository.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function viewModelModule() {
  return module_0(VOID, viewModelModule$lambda);
}
function viewModelModule$lambda($this$module) {
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition = viewModelModule$lambda$lambda;
  var scopeQualifier = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind = Kind_Singleton_getInstance();
  var secondaryTypes = emptyList();
  var def = new (BeanDefinition())(scopeQualifier, getKClass(ErrorBannerViewModel()), null, definition, kind, secondaryTypes);
  var factory = new (SingleInstanceFactory())(def);
  $this$module.o7y(factory);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory);
  }
  var tmp$ret$2 = new (KoinDefinition())($this$module, factory);
  var tmp$ret$3 = onOptions(tmp$ret$2, null);
  bind(tmp$ret$3, getKClass(IErrorBannerViewModel()));
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_0 = viewModelModule$lambda$lambda_0;
  var scopeQualifier_0 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_0 = Kind_Singleton_getInstance();
  var secondaryTypes_0 = emptyList();
  var def_0 = new (BeanDefinition())(scopeQualifier_0, getKClass(FavoritesViewModel()), null, definition_0, kind_0, secondaryTypes_0);
  var factory_0 = new (SingleInstanceFactory())(def_0);
  $this$module.o7y(factory_0);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_0);
  }
  new (KoinDefinition())($this$module, factory_0);
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_1 = viewModelModule$lambda$lambda_1;
  var scopeQualifier_1 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_1 = Kind_Singleton_getInstance();
  var secondaryTypes_1 = emptyList();
  var def_1 = new (BeanDefinition())(scopeQualifier_1, getKClass(FilteredStopDetailsViewModel()), null, definition_1, kind_1, secondaryTypes_1);
  var factory_1 = new (SingleInstanceFactory())(def_1);
  $this$module.o7y(factory_1);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_1);
  }
  var tmp$ret$9 = new (KoinDefinition())($this$module, factory_1);
  var tmp$ret$10 = onOptions(tmp$ret$9, null);
  bind(tmp$ret$10, getKClass(IFilteredStopDetailsViewModel()));
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_2 = viewModelModule$lambda$lambda_2;
  var scopeQualifier_2 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_2 = Kind_Singleton_getInstance();
  var secondaryTypes_2 = emptyList();
  var def_2 = new (BeanDefinition())(scopeQualifier_2, getKClass(MapViewModel()), null, definition_2, kind_2, secondaryTypes_2);
  var factory_2 = new (SingleInstanceFactory())(def_2);
  $this$module.o7y(factory_2);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_2);
  }
  new (KoinDefinition())($this$module, factory_2);
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_3 = viewModelModule$lambda$lambda_3;
  var scopeQualifier_3 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_3 = Kind_Singleton_getInstance();
  var secondaryTypes_3 = emptyList();
  var def_3 = new (BeanDefinition())(scopeQualifier_3, getKClass(RouteCardDataViewModel()), null, definition_3, kind_3, secondaryTypes_3);
  var factory_3 = new (SingleInstanceFactory())(def_3);
  $this$module.o7y(factory_3);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_3);
  }
  var tmp$ret$16 = new (KoinDefinition())($this$module, factory_3);
  var tmp$ret$17 = onOptions(tmp$ret$16, null);
  bind(tmp$ret$17, getKClass(IRouteCardDataViewModel()));
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_4 = viewModelModule$lambda$lambda_4;
  var scopeQualifier_4 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_4 = Kind_Singleton_getInstance();
  var secondaryTypes_4 = emptyList();
  var def_4 = new (BeanDefinition())(scopeQualifier_4, getKClass(RouteDetailsViewModel()), null, definition_4, kind_4, secondaryTypes_4);
  var factory_4 = new (SingleInstanceFactory())(def_4);
  $this$module.o7y(factory_4);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_4);
  }
  var tmp$ret$20 = new (KoinDefinition())($this$module, factory_4);
  var tmp$ret$21 = onOptions(tmp$ret$20, null);
  bind(tmp$ret$21, getKClass(IRouteDetailsViewModel()));
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_5 = viewModelModule$lambda$lambda_5;
  var scopeQualifier_5 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_5 = Kind_Singleton_getInstance();
  var secondaryTypes_5 = emptyList();
  var def_5 = new (BeanDefinition())(scopeQualifier_5, getKClass(SearchRoutesViewModel()), null, definition_5, kind_5, secondaryTypes_5);
  var factory_5 = new (SingleInstanceFactory())(def_5);
  $this$module.o7y(factory_5);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_5);
  }
  var tmp$ret$24 = new (KoinDefinition())($this$module, factory_5);
  var tmp$ret$25 = onOptions(tmp$ret$24, null);
  bind(tmp$ret$25, getKClass(ISearchRoutesViewModel()));
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_6 = viewModelModule$lambda$lambda_6;
  var scopeQualifier_6 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_6 = Kind_Singleton_getInstance();
  var secondaryTypes_6 = emptyList();
  var def_6 = new (BeanDefinition())(scopeQualifier_6, getKClass(SearchViewModel()), null, definition_6, kind_6, secondaryTypes_6);
  var factory_6 = new (SingleInstanceFactory())(def_6);
  $this$module.o7y(factory_6);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_6);
  }
  var tmp$ret$28 = new (KoinDefinition())($this$module, factory_6);
  var tmp$ret$29 = onOptions(tmp$ret$28, null);
  bind(tmp$ret$29, getKClass(ISearchViewModel()));
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_7 = viewModelModule$lambda$lambda_7;
  var scopeQualifier_7 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_7 = Kind_Singleton_getInstance();
  var secondaryTypes_7 = emptyList();
  var def_7 = new (BeanDefinition())(scopeQualifier_7, getKClass(StopDetailsViewModel()), null, definition_7, kind_7, secondaryTypes_7);
  var factory_7 = new (SingleInstanceFactory())(def_7);
  $this$module.o7y(factory_7);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_7);
  }
  var tmp$ret$32 = new (KoinDefinition())($this$module, factory_7);
  bind(tmp$ret$32, getKClass(IStopDetailsViewModel()));
  // Inline function 'org.koin.core.module.dsl.singleOf' call
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_8 = viewModelModule$lambda$lambda_8;
  var scopeQualifier_8 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_8 = Kind_Singleton_getInstance();
  var secondaryTypes_8 = emptyList();
  var def_8 = new (BeanDefinition())(scopeQualifier_8, getKClass(ToastViewModel()), null, definition_8, kind_8, secondaryTypes_8);
  var factory_8 = new (SingleInstanceFactory())(def_8);
  $this$module.o7y(factory_8);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_8);
  }
  var tmp$ret$35 = new (KoinDefinition())($this$module, factory_8);
  var tmp$ret$36 = onOptions(tmp$ret$35, null);
  bind(tmp$ret$36, getKClass(IToastViewModel()));
  // Inline function 'org.koin.core.module.Module.single' call
  // Inline function 'org.koin.core.module._singleInstanceFactory' call
  var definition_9 = viewModelModule$lambda$lambda_9;
  var scopeQualifier_9 = Companion_getInstance().h7w_1;
  // Inline function 'org.koin.core.definition._createDefinition' call
  var kind_9 = Kind_Singleton_getInstance();
  var secondaryTypes_9 = emptyList();
  var def_9 = new (BeanDefinition())(scopeQualifier_9, getKClass(TripDetailsViewModel()), null, definition_9, kind_9, secondaryTypes_9);
  var factory_9 = new (SingleInstanceFactory())(def_9);
  $this$module.o7y(factory_9);
  if (false || $this$module.h7y_1) {
    $this$module.r7y(factory_9);
  }
  var tmp$ret$39 = new (KoinDefinition())($this$module, factory_9);
  bind(tmp$ret$39, getKClass(ITripDetailsViewModel()));
  return Unit_instance;
}
function viewModelModule$lambda$lambda($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp0 = $this$single.n7z(getKClass(IErrorBannerStateRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp2 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p2 = $this$single.n7z(getKClass(Clock()), null, null);
  return new (ErrorBannerViewModel())(tmp0, tmp2, p2);
}
function viewModelModule$lambda$lambda_0($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(FavoritesUsecases()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_0 = $this$single.n7z(getKClass(IPinnedRoutesRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_1 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_2 = $this$single.n7z(getKClass(ITabPreferencesRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var qualifier = named('coroutineDispatcherDefault');
  var tmp_3 = $this$single.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp$ret$5 = $this$single.n7z(getKClass(Analytics()), null, null);
  return new (FavoritesViewModel())(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp$ret$5);
}
function viewModelModule$lambda$lambda_1($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp0 = $this$single.n7z(getKClass(IStopDetailsViewModel()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p1 = $this$single.n7z(getKClass(ITripDetailsViewModel()), null, null);
  return new (FilteredStopDetailsViewModel())(tmp0, p1);
}
function viewModelModule$lambda$lambda_2($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IRouteCardDataViewModel()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_0 = $this$single.n7z(getKClass(IGlobalRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_1 = $this$single.n7z(getKClass(IRailRouteShapeRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_2 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_3 = $this$single.n7z(getKClass(IStopRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var qualifier = named('coroutineDispatcherDefault');
  var tmp_4 = $this$single.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var qualifier_0 = named('coroutineDispatcherIO');
  var tmp$ret$6 = $this$single.n7z(getKClass(CoroutineDispatcher()), qualifier_0, null);
  return new (MapViewModel())(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp$ret$6);
}
function viewModelModule$lambda$lambda_3($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p0 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  return new (RouteCardDataViewModel())(p0);
}
function viewModelModule$lambda$lambda_4($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  return new (RouteDetailsViewModel())();
}
function viewModelModule$lambda$lambda_5($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp0 = $this$single.n7z(getKClass(Analytics()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp2 = $this$single.n7z(getKClass(IGlobalRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp4 = $this$single.n7z(getKClass(ISearchResultRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp6 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p4 = $this$single.n7z(getKClass(CoroutineDispatcher()), null, null);
  return new (SearchRoutesViewModel())(tmp0, tmp2, tmp4, tmp6, p4);
}
function viewModelModule$lambda$lambda_6($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp0 = $this$single.n7z(getKClass(Analytics()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp2 = $this$single.n7z(getKClass(IGlobalRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp4 = $this$single.n7z(getKClass(ISearchResultRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp6 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp8 = $this$single.n7z(getKClass(VisitHistoryUsecase()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p5 = $this$single.n7z(getKClass(CoroutineDispatcher()), null, null);
  return new (SearchViewModel())(tmp0, tmp2, tmp4, tmp6, tmp8, p5);
}
function viewModelModule$lambda$lambda_7($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IRouteCardDataViewModel()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_0 = $this$single.n7z(getKClass(IErrorBannerStateRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_1 = $this$single.n7z(getKClass(IPredictionsRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_2 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_3 = $this$single.n7z(getKClass(ISchedulesRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var qualifier = named('coroutineDispatcherIO');
  var tmp$ret$5 = $this$single.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
  return new (StopDetailsViewModel())(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp$ret$5);
}
function viewModelModule$lambda$lambda_8($this$single, it) {
  // Inline function 'org.koin.core.module.dsl.new' call
  // Inline function 'org.koin.core.scope.Scope.get' call
  var p0 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  return new (ToastViewModel())(p0);
}
function viewModelModule$lambda$lambda_9($this$single, it) {
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp = $this$single.n7z(getKClass(IErrorBannerStateRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_0 = $this$single.n7z(getKClass(ISentryRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_1 = $this$single.n7z(getKClass(ITripPredictionsRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_2 = $this$single.n7z(getKClass(ITripRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var tmp_3 = $this$single.n7z(getKClass(IVehicleRepository()), null, null);
  // Inline function 'org.koin.core.scope.Scope.get' call
  var qualifier = named('coroutineDispatcherIO');
  var tmp$ret$5 = $this$single.n7z(getKClass(CoroutineDispatcher()), qualifier, null);
  return new (TripDetailsViewModel())(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp$ret$5);
}
//region block: exports
export {
  viewModelModule as viewModelModule22xhj245stsph,
};
//endregion

//# sourceMappingURL=viewModelModule.js.mjs.map
