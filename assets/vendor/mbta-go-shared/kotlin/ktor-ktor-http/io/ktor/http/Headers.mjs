import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import {
  StringValuesBuilderImpl3ey9etj3bwnqf as StringValuesBuilderImpl,
  get3oezx9z3zutmm as get,
  forEachghjt92rkrpzo as forEach,
  StringValuesjqid5a6cuday as StringValues,
  StringValuesImpl2l95y9du7b61t as StringValuesImpl,
  StringValuesSingleImpl1uh7q2c2zm7va as StringValuesSingleImpl,
} from '../../../../ktor-ktor-utils/io/ktor/util/StringValues.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from './HttpHeaders.mjs';
import { emptySetcxexqki71qfa as emptySet } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Sets.mjs';
import {
  toString1pkumu07cwy4m as toString,
  protoOf180f3jzyo7rfj as protoOf,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { emptyMapr06gerzljqtm as emptyMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Maps.mjs';
import { listOfvhqybd2zx248 as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var CompanionClass;
function Companion() {
  if (CompanionClass === VOID) {
    class $ {
      constructor() {
        Companion_instance = this;
        this.o3q_1 = EmptyHeaders_instance;
      }
    }
    initMetadataForCompanion($);
    CompanionClass = $;
  }
  return CompanionClass;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new (Companion())();
  return Companion_instance;
}
var HeadersBuilderClass;
function HeadersBuilder() {
  if (HeadersBuilderClass === VOID) {
    class $ extends StringValuesBuilderImpl() {
      constructor(size) {
        size = size === VOID ? 8 : size;
        super(true, size);
      }
      r3q() {
        return new (HeadersImpl())(this.d3j_1);
      }
      e3j(name) {
        super.e3j(name);
        HttpHeaders_getInstance().o3u(name);
      }
      i3j(value) {
        super.i3j(value);
        HttpHeaders_getInstance().p3u(value);
      }
    }
    initMetadataForClass($, 'HeadersBuilder', HeadersBuilder);
    HeadersBuilderClass = $;
  }
  return HeadersBuilderClass;
}
var EmptyHeadersClass;
function EmptyHeaders() {
  if (EmptyHeadersClass === VOID) {
    class $ {
      x3i() {
        return true;
      }
      y3i(name) {
        return null;
      }
      z3i() {
        return emptySet();
      }
      a3j() {
        return emptySet();
      }
      toString() {
        return 'Headers ' + toString(this.a3j());
      }
    }
    protoOf($).lk = get;
    protoOf($).b3j = forEach;
    initMetadataForObject($, 'EmptyHeaders', VOID, VOID, [StringValues()]);
    EmptyHeadersClass = $;
  }
  return EmptyHeadersClass;
}
var EmptyHeaders_instance;
function EmptyHeaders_getInstance() {
  return EmptyHeaders_instance;
}
var HeadersImplClass;
function HeadersImpl() {
  if (HeadersImplClass === VOID) {
    class $ extends StringValuesImpl() {
      constructor(values) {
        values = values === VOID ? emptyMap() : values;
        super(true, values);
      }
      toString() {
        return 'Headers ' + toString(this.a3j());
      }
    }
    initMetadataForClass($, 'HeadersImpl', HeadersImpl, VOID, [StringValues(), StringValuesImpl()]);
    HeadersImplClass = $;
  }
  return HeadersImplClass;
}
function headersOf(name, value) {
  return new (HeadersSingleImpl())(name, listOf(value));
}
function headers(builder) {
  // Inline function 'io.ktor.http.Companion.build' call
  Companion_getInstance();
  // Inline function 'kotlin.apply' call
  var this_0 = new (HeadersBuilder())();
  builder(this_0);
  return this_0.r3q();
}
var HeadersSingleImplClass;
function HeadersSingleImpl() {
  if (HeadersSingleImplClass === VOID) {
    class $ extends StringValuesSingleImpl() {
      constructor(name, values) {
        super(true, name, values);
      }
      toString() {
        return 'Headers ' + toString(this.a3j());
      }
    }
    initMetadataForClass($, 'HeadersSingleImpl', VOID, VOID, [StringValues(), StringValuesSingleImpl()]);
    HeadersSingleImplClass = $;
  }
  return HeadersSingleImplClass;
}
//region block: init
EmptyHeaders_instance = new (EmptyHeaders())();
//endregion
//region block: exports
export {
  Companion_getInstance as Companion_getInstance2krh5pmq7pw0k,
  HeadersBuilder as HeadersBuilder3h7sn3kkvu98m,
  headersOf as headersOf2tgdoojg8tifn,
  headers as headers1dh5cg56ach6i,
};
//endregion

//# sourceMappingURL=Headers.mjs.map
