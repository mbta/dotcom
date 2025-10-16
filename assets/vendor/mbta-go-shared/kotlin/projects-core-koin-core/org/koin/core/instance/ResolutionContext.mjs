import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getFullName1t9gk3djdkvl5 as getFullName } from '../../ext/KClassExt.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var ResolutionContextClass;
function ResolutionContext() {
  if (ResolutionContextClass === VOID) {
    class $ {
      constructor(logger, scope, clazz, qualifier, parameters) {
        qualifier = qualifier === VOID ? null : qualifier;
        parameters = parameters === VOID ? null : parameters;
        this.h7x_1 = logger;
        this.i7x_1 = scope;
        this.j7x_1 = clazz;
        this.k7x_1 = qualifier;
        this.l7x_1 = parameters;
        this.m7x_1 = "t:'" + getFullName(this.j7x_1) + "' - q:'" + toString(this.k7x_1) + "'";
        this.n7x_1 = null;
      }
      q7x(s) {
        var rc = new (ResolutionContext())(this.h7x_1, s, this.j7x_1, this.k7x_1, this.l7x_1);
        rc.n7x_1 = s.u7x_1;
        return rc;
      }
    }
    initMetadataForClass($, 'ResolutionContext');
    ResolutionContextClass = $;
  }
  return ResolutionContextClass;
}
var NoClassClass;
function NoClass() {
  if (NoClassClass === VOID) {
    class $ {}
    initMetadataForClass($, 'NoClass', NoClass);
    NoClassClass = $;
  }
  return NoClassClass;
}
//region block: exports
export {
  NoClass as NoClass2rdwoioezieyw,
  ResolutionContext as ResolutionContext15weqg15y4x30,
};
//endregion

//# sourceMappingURL=ResolutionContext.mjs.map
