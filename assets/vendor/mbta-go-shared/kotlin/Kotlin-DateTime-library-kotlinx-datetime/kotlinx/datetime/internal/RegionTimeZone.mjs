import { TimeZone3oibfp0mqo4lg as TimeZone } from '../TimeZone.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var RegionTimeZoneClass;
function RegionTimeZone() {
  if (RegionTimeZoneClass === VOID) {
    class $ extends TimeZone() {
      static l8h(tzid, id) {
        var $this = this.n8h();
        $this.j8h_1 = tzid;
        $this.k8h_1 = id;
        return $this;
      }
      d8h() {
        return this.k8h_1;
      }
      o8h(instant) {
        return this.j8h_1.o8i(instant);
      }
    }
    initMetadataForClass($, 'RegionTimeZone');
    RegionTimeZoneClass = $;
  }
  return RegionTimeZoneClass;
}
//region block: exports
export {
  RegionTimeZone as RegionTimeZoneqfwrnej6ijxi,
};
//endregion

//# sourceMappingURL=RegionTimeZone.mjs.map
