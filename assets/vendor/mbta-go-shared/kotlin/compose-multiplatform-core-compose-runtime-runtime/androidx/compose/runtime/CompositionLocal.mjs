import { LazyValueHolderooy66hzc1nzs as LazyValueHolder } from './ValueHolders.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { structuralEqualityPolicy37napyzbio62n as structuralEqualityPolicy } from './SnapshotMutationPolicy.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var androidx_compose_runtime_CompositionLocal$stable;
var androidx_compose_runtime_ProvidableCompositionLocal$stable;
var androidx_compose_runtime_DynamicProvidableCompositionLocal$stable;
var androidx_compose_runtime_StaticProvidableCompositionLocal$stable;
var androidx_compose_runtime_ComputedProvidableCompositionLocal$stable;
var androidx_compose_runtime_CompositionLocalContext$stable;
var CompositionLocalClass;
function CompositionLocal() {
  if (CompositionLocalClass === VOID) {
    class $ {
      constructor(defaultFactory) {
        this.l72_1 = new (LazyValueHolder())(defaultFactory);
      }
      m72() {
        return this.l72_1;
      }
    }
    initMetadataForClass($, 'CompositionLocal');
    CompositionLocalClass = $;
  }
  return CompositionLocalClass;
}
var ProvidableCompositionLocalClass;
function ProvidableCompositionLocal() {
  if (ProvidableCompositionLocalClass === VOID) {
    class $ extends CompositionLocal() {}
    initMetadataForClass($, 'ProvidableCompositionLocal');
    ProvidableCompositionLocalClass = $;
  }
  return ProvidableCompositionLocalClass;
}
function staticCompositionLocalOf(defaultFactory) {
  return new (StaticProvidableCompositionLocal())(defaultFactory);
}
var StaticProvidableCompositionLocalClass;
function StaticProvidableCompositionLocal() {
  if (StaticProvidableCompositionLocalClass === VOID) {
    class $ extends ProvidableCompositionLocal() {}
    initMetadataForClass($, 'StaticProvidableCompositionLocal');
    StaticProvidableCompositionLocalClass = $;
  }
  return StaticProvidableCompositionLocalClass;
}
function compositionLocalOf(policy, defaultFactory) {
  policy = policy === VOID ? structuralEqualityPolicy() : policy;
  return new (DynamicProvidableCompositionLocal())(policy, defaultFactory);
}
var DynamicProvidableCompositionLocalClass;
function DynamicProvidableCompositionLocal() {
  if (DynamicProvidableCompositionLocalClass === VOID) {
    class $ extends ProvidableCompositionLocal() {
      constructor(policy, defaultFactory) {
        super(defaultFactory);
        this.o72_1 = policy;
      }
    }
    initMetadataForClass($, 'DynamicProvidableCompositionLocal');
    DynamicProvidableCompositionLocalClass = $;
  }
  return DynamicProvidableCompositionLocalClass;
}
//region block: init
androidx_compose_runtime_CompositionLocal$stable = 0;
androidx_compose_runtime_ProvidableCompositionLocal$stable = 0;
androidx_compose_runtime_DynamicProvidableCompositionLocal$stable = 0;
androidx_compose_runtime_StaticProvidableCompositionLocal$stable = 0;
androidx_compose_runtime_ComputedProvidableCompositionLocal$stable = 0;
androidx_compose_runtime_CompositionLocalContext$stable = 0;
//endregion
//region block: exports
export {
  CompositionLocal as CompositionLocal36jzctlu8tgcr,
  compositionLocalOf as compositionLocalOf2vv0ziv1snr2w,
  staticCompositionLocalOf as staticCompositionLocalOf2ihrh6pg2x205,
};
//endregion

//# sourceMappingURL=CompositionLocal.mjs.map
