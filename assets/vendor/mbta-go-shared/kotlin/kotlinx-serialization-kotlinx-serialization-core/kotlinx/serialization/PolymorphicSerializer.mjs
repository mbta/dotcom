import { StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance } from '../../../kotlin-kotlin-stdlib/kotlin/js/internal/primitiveCompanionObjects.mjs';
import { serializer1x79l67jvwntn as serializer } from './builtins/BuiltinSerializers.mjs';
import {
  CONTEXTUAL_getInstance1845118lbzky0 as CONTEXTUAL_getInstance,
  OPEN_getInstance3ec6az8uwus55 as OPEN_getInstance,
} from './descriptors/SerialKinds.mjs';
import { buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor } from './descriptors/SerialDescriptors.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { withContext3ge61vpog00ae as withContext } from './descriptors/ContextAware.mjs';
import {
  AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer,
  throwSubtypeNotRegistered343gt7v9eqwun as throwSubtypeNotRegistered,
  throwSubtypeNotRegistered2cr459177l268 as throwSubtypeNotRegistered_0,
} from './internal/AbstractPolymorphicSerializer.mjs';
import { emptyList1g2z5xcrvp2zy as emptyList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
import { LazyThreadSafetyMode_PUBLICATION_getInstance3hlj875zwihx0 as LazyThreadSafetyMode_PUBLICATION_getInstance } from '../../../kotlin-kotlin-stdlib/kotlin/Lazy.mjs';
import { lazy1261dae0bgscp as lazy } from '../../../kotlin-kotlin-stdlib/kotlin/kotlin.mjs';
import { asList2ho2pewtsfvv as asList } from '../../../kotlin-kotlin-stdlib/kotlin/collections/_ArraysJs.mjs';
import { KProperty1ca4yb4wlo496 as KProperty1 } from '../../../kotlin-kotlin-stdlib/kotlin/reflect/KPropertyJs.mjs';
import { getPropertyCallableRef1ajb9in178r5r as getPropertyCallableRef } from '../../../kotlin-kotlin-stdlib/kotlin/js/reflectRuntime.mjs';
import { toString1pkumu07cwy4m as toString } from '../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { getKClassFromExpression3vpejubogshaw as getKClassFromExpression } from '../../../kotlin-kotlin-stdlib/reflection.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
  return function ($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.qz('type', serializer(StringCompanionObject_instance).fz());
    $this$buildSerialDescriptor.qz('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.rz_1.gh() + '>', CONTEXTUAL_getInstance(), []));
    $this$buildSerialDescriptor.kz_1 = this$0.sz_1;
    return Unit_instance;
  };
}
function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
  return function () {
    var tmp = OPEN_getInstance();
    return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.rz_1);
  };
}
function PolymorphicSerializer$_get_descriptor_$ref_8tw9if() {
  return function (p0) {
    return p0.fz();
  };
}
var PolymorphicSerializerClass;
function PolymorphicSerializer() {
  if (PolymorphicSerializerClass === VOID) {
    class $ extends AbstractPolymorphicSerializer() {
      static uz(baseClass) {
        var $this = this.vz();
        $this.rz_1 = baseClass;
        $this.sz_1 = emptyList();
        var tmp = $this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.tz_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda($this));
        return $this;
      }
      wz() {
        return this.rz_1;
      }
      static xz(baseClass, classAnnotations) {
        var $this = this.uz(baseClass);
        $this.sz_1 = asList(classAnnotations);
        return $this;
      }
      fz() {
        var tmp0 = this.tz_1;
        var tmp = KProperty1();
        // Inline function 'kotlin.getValue' call
        getPropertyCallableRef('descriptor', 1, tmp, PolymorphicSerializer$_get_descriptor_$ref_8tw9if(), null);
        return tmp0.v1();
      }
      toString() {
        return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + toString(this.rz_1) + ')';
      }
    }
    initMetadataForClass($, 'PolymorphicSerializer');
    PolymorphicSerializerClass = $;
  }
  return PolymorphicSerializerClass;
}
function findPolymorphicSerializer(_this__u8e3s4, encoder, value) {
  var tmp0_elvis_lhs = _this__u8e3s4.a10(encoder, value);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwSubtypeNotRegistered(getKClassFromExpression(value), _this__u8e3s4.wz());
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function findPolymorphicSerializer_0(_this__u8e3s4, decoder, klassName) {
  var tmp0_elvis_lhs = _this__u8e3s4.zz(decoder, klassName);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwSubtypeNotRegistered_0(klassName, _this__u8e3s4.wz());
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
//region block: exports
export {
  PolymorphicSerializer as PolymorphicSerializer3p3fzpdobi8hh,
  findPolymorphicSerializer_0 as findPolymorphicSerializer1nm87hvemahcj,
  findPolymorphicSerializer as findPolymorphicSerializerk638ixyjovk5,
};
//endregion

//# sourceMappingURL=PolymorphicSerializer.mjs.map
