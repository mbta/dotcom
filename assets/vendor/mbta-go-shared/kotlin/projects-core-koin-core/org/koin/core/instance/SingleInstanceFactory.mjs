import { IllegalStateExceptionkoljg5n0nrlr as IllegalStateException } from '../../../../../kotlin-kotlin-stdlib/kotlin/exceptions.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { InstanceFactory1z8ts196ubcjh as InstanceFactory } from './InstanceFactory.mjs';
import { KoinPlatformTools_instance10q51i7yyudwo as KoinPlatformTools_instance } from '../../mp/PlatformTools.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function getValue($this) {
  var tmp0_elvis_lhs = $this.c7y_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    var message = "Single instance created couldn't return value";
    throw IllegalStateException().o5(toString(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function SingleInstanceFactory$get$lambda(this$0, $context) {
  return function () {
    var tmp;
    if (!this$0.d7y($context)) {
      this$0.c7y_1 = this$0.f7x($context);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var SingleInstanceFactoryClass;
function SingleInstanceFactory() {
  if (SingleInstanceFactoryClass === VOID) {
    class $ extends InstanceFactory() {
      constructor(beanDefinition) {
        super(beanDefinition);
        this.c7y_1 = null;
      }
      d7y(context) {
        return !(this.c7y_1 == null);
      }
      f7x(context) {
        var tmp;
        if (this.c7y_1 == null) {
          tmp = super.f7x(context);
        } else {
          tmp = getValue(this);
        }
        return tmp;
      }
      d7x(context) {
        var tmp = KoinPlatformTools_instance;
        tmp.e7y(this, SingleInstanceFactory$get$lambda(this, context));
        return getValue(this);
      }
    }
    initMetadataForClass($, 'SingleInstanceFactory');
    SingleInstanceFactoryClass = $;
  }
  return SingleInstanceFactoryClass;
}
//region block: exports
export {
  SingleInstanceFactory as SingleInstanceFactoryp594z6t2b69a,
};
//endregion

//# sourceMappingURL=SingleInstanceFactory.mjs.map
