import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { toString30pk9tzaqopn as toString } from '../../../../kotlin-kotlin-stdlib/kotlin/Library.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { Enum3alwj03lh1n41 as Enum } from '../../../../kotlin-kotlin-stdlib/kotlin/Enum.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var JsonConfigurationClass;
function JsonConfiguration() {
  if (JsonConfigurationClass === VOID) {
    class $ {
      constructor(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
        encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
        ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
        isLenient = isLenient === VOID ? false : isLenient;
        allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
        prettyPrint = prettyPrint === VOID ? false : prettyPrint;
        explicitNulls = explicitNulls === VOID ? true : explicitNulls;
        prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
        coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
        useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
        classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
        allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
        useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
        namingStrategy = namingStrategy === VOID ? null : namingStrategy;
        decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
        allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
        allowComments = allowComments === VOID ? false : allowComments;
        classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
        this.p1m_1 = encodeDefaults;
        this.q1m_1 = ignoreUnknownKeys;
        this.r1m_1 = isLenient;
        this.s1m_1 = allowStructuredMapKeys;
        this.t1m_1 = prettyPrint;
        this.u1m_1 = explicitNulls;
        this.v1m_1 = prettyPrintIndent;
        this.w1m_1 = coerceInputValues;
        this.x1m_1 = useArrayPolymorphism;
        this.y1m_1 = classDiscriminator;
        this.z1m_1 = allowSpecialFloatingPointValues;
        this.a1n_1 = useAlternativeNames;
        this.b1n_1 = namingStrategy;
        this.c1n_1 = decodeEnumsCaseInsensitive;
        this.d1n_1 = allowTrailingComma;
        this.e1n_1 = allowComments;
        this.f1n_1 = classDiscriminatorMode;
      }
      toString() {
        return 'JsonConfiguration(encodeDefaults=' + this.p1m_1 + ', ignoreUnknownKeys=' + this.q1m_1 + ', isLenient=' + this.r1m_1 + ', ' + ('allowStructuredMapKeys=' + this.s1m_1 + ', prettyPrint=' + this.t1m_1 + ', explicitNulls=' + this.u1m_1 + ', ') + ("prettyPrintIndent='" + this.v1m_1 + "', coerceInputValues=" + this.w1m_1 + ', useArrayPolymorphism=' + this.x1m_1 + ', ') + ("classDiscriminator='" + this.y1m_1 + "', allowSpecialFloatingPointValues=" + this.z1m_1 + ', ') + ('useAlternativeNames=' + this.a1n_1 + ', namingStrategy=' + toString(this.b1n_1) + ', decodeEnumsCaseInsensitive=' + this.c1n_1 + ', ') + ('allowTrailingComma=' + this.d1n_1 + ', allowComments=' + this.e1n_1 + ', classDiscriminatorMode=' + this.f1n_1.toString() + ')');
      }
    }
    initMetadataForClass($, 'JsonConfiguration');
    JsonConfigurationClass = $;
  }
  return JsonConfigurationClass;
}
var ClassDiscriminatorMode_NONE_instance;
var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
var ClassDiscriminatorMode_POLYMORPHIC_instance;
var ClassDiscriminatorMode_entriesInitialized;
function ClassDiscriminatorMode_initEntries() {
  if (ClassDiscriminatorMode_entriesInitialized)
    return Unit_instance;
  ClassDiscriminatorMode_entriesInitialized = true;
  ClassDiscriminatorMode_NONE_instance = new (ClassDiscriminatorMode())('NONE', 0);
  ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new (ClassDiscriminatorMode())('ALL_JSON_OBJECTS', 1);
  ClassDiscriminatorMode_POLYMORPHIC_instance = new (ClassDiscriminatorMode())('POLYMORPHIC', 2);
}
var ClassDiscriminatorModeClass;
function ClassDiscriminatorMode() {
  if (ClassDiscriminatorModeClass === VOID) {
    class $ extends Enum() {}
    initMetadataForClass($, 'ClassDiscriminatorMode');
    ClassDiscriminatorModeClass = $;
  }
  return ClassDiscriminatorModeClass;
}
function ClassDiscriminatorMode_NONE_getInstance() {
  ClassDiscriminatorMode_initEntries();
  return ClassDiscriminatorMode_NONE_instance;
}
function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
  ClassDiscriminatorMode_initEntries();
  return ClassDiscriminatorMode_POLYMORPHIC_instance;
}
//region block: exports
export {
  ClassDiscriminatorMode_NONE_getInstance as ClassDiscriminatorMode_NONE_getInstance1g0i4x2dh4wbf,
  ClassDiscriminatorMode_POLYMORPHIC_getInstance as ClassDiscriminatorMode_POLYMORPHIC_getInstance2mrsp68rtcatm,
  JsonConfiguration as JsonConfiguration2bv2x41u8reet,
};
//endregion

//# sourceMappingURL=JsonConfiguration.mjs.map
