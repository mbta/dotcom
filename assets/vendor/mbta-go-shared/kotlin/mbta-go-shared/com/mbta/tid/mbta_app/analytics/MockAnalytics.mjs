import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Analytics1mdx7nc6a8dig as Analytics } from './Analytics.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var com_mbta_tid_mbta_app_analytics_MockAnalytics$stable;
function MockAnalytics$_init_$lambda_7bvx5d(_unused_var__etf5q3, _unused_var__etf5q3_0) {
  return Unit_instance;
}
function MockAnalytics$_init_$lambda_7bvx5d_0(_unused_var__etf5q3, _unused_var__etf5q3_0) {
  return Unit_instance;
}
var MockAnalyticsClass;
function MockAnalytics() {
  if (MockAnalyticsClass === VOID) {
    class $ extends Analytics() {
      constructor(onLogEvent, onSetUserProperty) {
        var tmp;
        if (onLogEvent === VOID) {
          tmp = MockAnalytics$_init_$lambda_7bvx5d;
        } else {
          tmp = onLogEvent;
        }
        onLogEvent = tmp;
        var tmp_0;
        if (onSetUserProperty === VOID) {
          tmp_0 = MockAnalytics$_init_$lambda_7bvx5d_0;
        } else {
          tmp_0 = onSetUserProperty;
        }
        onSetUserProperty = tmp_0;
        super();
        this.m8j_1 = onLogEvent;
        this.n8j_1 = onSetUserProperty;
      }
      a8j(name, parameters) {
        this.m8j_1(name, parameters);
      }
      d8j(name, value) {
        this.n8j_1(name, value);
      }
    }
    initMetadataForClass($, 'MockAnalytics', MockAnalytics);
    MockAnalyticsClass = $;
  }
  return MockAnalyticsClass;
}
//region block: init
com_mbta_tid_mbta_app_analytics_MockAnalytics$stable = 8;
//endregion
//region block: exports
export {
  MockAnalytics as MockAnalytics3jcswnj0aeadw,
};
//endregion

//# sourceMappingURL=MockAnalytics.mjs.map
