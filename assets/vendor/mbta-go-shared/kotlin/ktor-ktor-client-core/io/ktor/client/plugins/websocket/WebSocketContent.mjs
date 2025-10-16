import { ClientUpgradeContent299vg0lx1tyfp as ClientUpgradeContent } from '../../request/ClientUpgradeContent.mjs';
import { StringBuildermazzzhj6kkai as StringBuilder } from '../../../../../../kotlin-kotlin-stdlib/kotlin/text/StringBuilderJs.mjs';
import { generateNonce3td15vdvbmmke as generateNonce } from '../../../../../../ktor-ktor-utils/io/ktor/util/Crypto.mjs';
import { encodeBase6432vm5zx1em8c4 as encodeBase64 } from '../../../../../../ktor-ktor-utils/io/ktor/util/Base64.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { HeadersBuilder3h7sn3kkvu98m as HeadersBuilder } from '../../../../../../ktor-ktor-http/io/ktor/http/Headers.mjs';
import { HttpHeaders_getInstanceelogg8fjd54u as HttpHeaders_getInstance } from '../../../../../../ktor-ktor-http/io/ktor/http/HttpHeaders.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var WebSocketContentClass;
function WebSocketContent() {
  if (WebSocketContentClass === VOID) {
    class $ extends ClientUpgradeContent() {
      constructor() {
        super();
        var tmp = this;
        // Inline function 'kotlin.text.buildString' call
        // Inline function 'kotlin.apply' call
        var this_0 = StringBuilder().f();
        var nonce = generateNonce(16);
        this_0.hc(encodeBase64(nonce));
        tmp.f5n_1 = this_0.toString();
        var tmp_0 = this;
        // Inline function 'kotlin.apply' call
        var this_1 = new (HeadersBuilder())();
        this_1.j3j(HttpHeaders_getInstance().p3t_1, 'websocket');
        this_1.j3j(HttpHeaders_getInstance().d3r_1, 'Upgrade');
        this_1.j3j(HttpHeaders_getInstance().e3t_1, this.f5n_1);
        this_1.j3j(HttpHeaders_getInstance().g3t_1, '13');
        tmp_0.g5n_1 = this_1.r3q();
      }
      l3v() {
        return this.g5n_1;
      }
      toString() {
        return 'WebSocketContent';
      }
    }
    initMetadataForClass($, 'WebSocketContent', WebSocketContent, VOID, VOID, [1]);
    WebSocketContentClass = $;
  }
  return WebSocketContentClass;
}
//region block: exports
export {
  WebSocketContent as WebSocketContentagsn4p79ffe0,
};
//endregion

//# sourceMappingURL=WebSocketContent.mjs.map
