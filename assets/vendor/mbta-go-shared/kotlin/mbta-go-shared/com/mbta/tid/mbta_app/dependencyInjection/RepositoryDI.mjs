import { ConfigRepository3e4pitxg8by2e as ConfigRepository } from '../repositories/ConfigRepository.mjs';
import { TabPreferencesRepository23zq7s4pvu92l as TabPreferencesRepository } from '../repositories/TabPreferencesRepository.mjs';
import { ErrorBannerStateRepositoryseobm7fz1q3p as ErrorBannerStateRepository } from '../repositories/ErrorBannerStateRepository.mjs';
import { GlobalRepository13d9gx7id4cpg as GlobalRepository } from '../repositories/GlobalRepository.mjs';
import { LastLaunchedAppVersionRepositoryrht1vlekynqf as LastLaunchedAppVersionRepository } from '../repositories/LastLaunchedAppVersionRepository.mjs';
import { NearbyRepository1gd7cq4jto2un as NearbyRepository } from '../repositories/NearbyRepository.mjs';
import { OnboardingRepository3ebztiagr92ii as OnboardingRepository } from '../repositories/OnboardingRepository.mjs';
import { PinnedRoutesRepository1lyeptt18t565 as PinnedRoutesRepository } from '../repositories/PinnedRoutesRepository.mjs';
import { RailRouteShapeRepository32anjijiaqpf4 as RailRouteShapeRepository } from '../repositories/RailRouteShapeRepository.mjs';
import { RouteStopsRepository13h3yoea8tniz as RouteStopsRepository } from '../repositories/RouteStopsRepository.mjs';
import { SchedulesRepositoryj34sqgaiv4zk as SchedulesRepository } from '../repositories/SchedulesRepository.mjs';
import { SearchResultRepositorymblsp2t90rpg as SearchResultRepository } from '../repositories/SearchResultRepository.mjs';
import { SentryRepository3cyywv58qekp4 as SentryRepository } from '../repositories/SentryRepository.mjs';
import { SettingsRepository3qwnlejb4dsxo as SettingsRepository } from '../repositories/SettingsRepository.mjs';
import { StopRepository200v1cxsmvp5o as StopRepository } from '../repositories/StopRepository.mjs';
import { TripRepository2baeui5rjejuw as TripRepository } from '../repositories/TripRepository.mjs';
import { VisitHistoryRepository35gkp6h6pg1ze as VisitHistoryRepository } from '../repositories/VisitHistoryRepository.mjs';
import { FavoritesRepository2lg24e6btu7pl as FavoritesRepository } from '../repositories/FavoritesRepository.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_dependencyInjection_RepositoryDI$stable;
var com_mbta_tid_mbta_app_dependencyInjection_RealRepositories$stable;
var com_mbta_tid_mbta_app_dependencyInjection_MockRepositories$stable;
var RealRepositoriesClass;
function RealRepositories() {
  if (RealRepositoriesClass === VOID) {
    class $ {
      constructor() {
        this.f8n_1 = null;
        this.g8n_1 = null;
        this.h8n_1 = new (ConfigRepository())();
        this.i8n_1 = null;
        this.j8n_1 = new (TabPreferencesRepository())();
        this.k8n_1 = new (ErrorBannerStateRepository())();
        this.l8n_1 = new (GlobalRepository())();
        this.m8n_1 = new (LastLaunchedAppVersionRepository())();
        this.n8n_1 = new (NearbyRepository())();
        this.o8n_1 = new (OnboardingRepository())();
        this.p8n_1 = new (PinnedRoutesRepository())();
        this.q8n_1 = null;
        this.r8n_1 = new (RailRouteShapeRepository())();
        this.s8n_1 = new (RouteStopsRepository())();
        this.t8n_1 = new (SchedulesRepository())();
        this.u8n_1 = new (SearchResultRepository())();
        this.v8n_1 = new (SentryRepository())();
        this.w8n_1 = new (SettingsRepository())();
        this.x8n_1 = new (StopRepository())();
        this.y8n_1 = new (TripRepository())();
        this.z8n_1 = null;
        this.a8o_1 = null;
        this.b8o_1 = null;
        this.c8o_1 = new (VisitHistoryRepository())();
        this.d8o_1 = new (FavoritesRepository())();
      }
      y8m() {
        return this.f8n_1;
      }
      z8m() {
        return this.g8n_1;
      }
      n4q() {
        return this.h8n_1;
      }
      a8n() {
        return this.i8n_1;
      }
      h8m() {
        return this.j8n_1;
      }
      i8m() {
        return this.k8n_1;
      }
      j8m() {
        return this.l8n_1;
      }
      k8m() {
        return this.m8n_1;
      }
      l8m() {
        return this.n8n_1;
      }
      m8m() {
        return this.o8n_1;
      }
      n8m() {
        return this.p8n_1;
      }
      b8n() {
        return this.q8n_1;
      }
      o8m() {
        return this.r8n_1;
      }
      p8m() {
        return this.s8n_1;
      }
      q8m() {
        return this.t8n_1;
      }
      r8m() {
        return this.u8n_1;
      }
      s8m() {
        return this.v8n_1;
      }
      t8m() {
        return this.w8n_1;
      }
      u8m() {
        return this.x8n_1;
      }
      v8m() {
        return this.y8n_1;
      }
      c8n() {
        return this.z8n_1;
      }
      d8n() {
        return this.a8o_1;
      }
      e8n() {
        return this.b8o_1;
      }
      w8m() {
        return this.c8o_1;
      }
      x8m() {
        return this.d8o_1;
      }
    }
    initMetadataForClass($, 'RealRepositories', RealRepositories);
    RealRepositoriesClass = $;
  }
  return RealRepositoriesClass;
}
//region block: init
com_mbta_tid_mbta_app_dependencyInjection_RepositoryDI$stable = 8;
com_mbta_tid_mbta_app_dependencyInjection_RealRepositories$stable = 8;
com_mbta_tid_mbta_app_dependencyInjection_MockRepositories$stable = 8;
//endregion
//region block: exports
export {
  RealRepositories as RealRepositories2sek6zr2ek36i,
};
//endregion

//# sourceMappingURL=RepositoryDI.mjs.map
