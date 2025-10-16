import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { emptyParametersHolder267w5gujzzg9r as emptyParametersHolder } from '../parameter/ParametersHolder.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../mp/PlatformTools.mjs';
import { InstanceCreationException2qnx8u7c4m9w8 as InstanceCreationException } from '../error/InstanceCreationException.mjs';
import { Exceptiondt2hlxn7j7vw as Exception } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        this.g7x_1 = '\n\t';
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
var InstanceFactoryClass;
function InstanceFactory() {
  if (InstanceFactoryClass === VOID) {
    class $ {
      constructor(beanDefinition) {
        this.e7x_1 = beanDefinition;
      }
      f7x(context) {
        context.h7x_1.j7v("| (+) '" + this.e7x_1.toString() + "'");
        try {
          var tmp0_elvis_lhs = context.l7x_1;
          var parameters = tmp0_elvis_lhs == null ? emptyParametersHolder() : tmp0_elvis_lhs;
          return this.e7x_1.b7w_1(context.i7x_1, parameters);
        } catch ($p) {
          if ($p instanceof Exception()) {
            var e = $p;
            var stack = KoinPlatformTools_instance.o7x(e);
            context.h7x_1.p7x("* Instance creation error : could not create instance for '" + this.e7x_1.toString() + "': " + stack);
            throw InstanceCreationException().t7w("Could not create instance for '" + this.e7x_1.toString() + "'", e);
          } else {
            throw $p;
          }
        }
      }
    }
    initMetadataForClass($, 'InstanceFactory');
    InstanceFactoryClass = $;
  }
  return InstanceFactoryClass;
}
//region block: init
Companion_instance = new (Companion())();
//endregion
//region block: exports
export {
  InstanceFactory as InstanceFactory1z8ts196ubcjh,
};
//endregion

//# sourceMappingURL=InstanceFactory.mjs.map
