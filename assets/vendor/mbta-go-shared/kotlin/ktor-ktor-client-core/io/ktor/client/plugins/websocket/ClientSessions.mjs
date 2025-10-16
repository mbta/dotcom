import { WebSocketSessionzi1ianvyj32u as WebSocketSession } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/WebSocketSession.mjs';
import { DefaultWebSocketSession3h8506yqzs5fx as DefaultWebSocketSession } from '../../../../../../ktor-ktor-websockets/io/ktor/websocket/DefaultWebSocketSession.mjs';
import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DefaultClientWebSocketSessionClass;
function DefaultClientWebSocketSession() {
  if (DefaultClientWebSocketSessionClass === VOID) {
    class $ {
      constructor(call, delegate) {
        this.z5m_1 = delegate;
        this.a5n_1 = call;
      }
      b4a(frame, $completion) {
        return this.z5m_1.b4a(frame, $completion);
      }
      u35($completion) {
        return this.z5m_1.u35($completion);
      }
      x49(_set____db54di) {
        this.z5m_1.x49(_set____db54di);
      }
      y49() {
        return this.z5m_1.y49();
      }
      z49() {
        return this.z5m_1.z49();
      }
      a4a() {
        return this.z5m_1.a4a();
      }
      w20() {
        return this.z5m_1.w20();
      }
      w49(negotiatedExtensions) {
        this.z5m_1.w49(negotiatedExtensions);
      }
    }
    initMetadataForClass($, 'DefaultClientWebSocketSession', VOID, VOID, [WebSocketSession(), DefaultWebSocketSession()], [1, 0]);
    DefaultClientWebSocketSessionClass = $;
  }
  return DefaultClientWebSocketSessionClass;
}
var DelegatingClientWebSocketSessionClass;
function DelegatingClientWebSocketSession() {
  if (DelegatingClientWebSocketSessionClass === VOID) {
    class $ {
      constructor(call, session) {
        this.b5n_1 = session;
        this.c5n_1 = call;
      }
      b4a(frame, $completion) {
        return this.b5n_1.b4a(frame, $completion);
      }
      u35($completion) {
        return this.b5n_1.u35($completion);
      }
      x49(_set____db54di) {
        this.b5n_1.x49(_set____db54di);
      }
      y49() {
        return this.b5n_1.y49();
      }
      z49() {
        return this.b5n_1.z49();
      }
      a4a() {
        return this.b5n_1.a4a();
      }
      w20() {
        return this.b5n_1.w20();
      }
    }
    initMetadataForClass($, 'DelegatingClientWebSocketSession', VOID, VOID, [WebSocketSession()], [1, 0]);
    DelegatingClientWebSocketSessionClass = $;
  }
  return DelegatingClientWebSocketSessionClass;
}
//region block: exports
export {
  DefaultClientWebSocketSession as DefaultClientWebSocketSession1n8ok3lng45wy,
  DelegatingClientWebSocketSession as DelegatingClientWebSocketSessiono1sywc6weckz,
};
//endregion

//# sourceMappingURL=ClientSessions.mjs.map
