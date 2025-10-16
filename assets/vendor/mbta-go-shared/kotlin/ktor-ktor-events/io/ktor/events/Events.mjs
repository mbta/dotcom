import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { LockFreeLinkedListNode1f5fxflchw0ko as LockFreeLinkedListNode } from '../../../../ktor-ktor-utils/io/ktor/util/internal/LockFreeLinkedList.mjs';
import { CopyOnWriteHashMap2wz01l72sexe7 as CopyOnWriteHashMap } from '../../../../ktor-ktor-utils/io/ktor/util/collections/CopyOnWriteHashMap.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { equals2au1ep9vhcato as equals } from '../../../../kotlin-kotlin-stdlib/kotlin/js/coreRuntime.mjs';
import { addSuppressedu5jwjfvsc039 as addSuppressed } from '../../../../kotlin-kotlin-stdlib/kotlin/throwableExtensions.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var EventDefinitionClass;
function EventDefinition() {
  if (EventDefinitionClass === VOID) {
    class $ {}
    initMetadataForClass($, 'EventDefinition', EventDefinition);
    EventDefinitionClass = $;
  }
  return EventDefinitionClass;
}
var HandlerRegistrationClass;
function HandlerRegistration() {
  if (HandlerRegistrationClass === VOID) {
    class $ extends LockFreeLinkedListNode() {}
    initMetadataForClass($, 'HandlerRegistration');
    HandlerRegistrationClass = $;
  }
  return HandlerRegistrationClass;
}
var EventsClass;
function Events() {
  if (EventsClass === VOID) {
    class $ {
      constructor() {
        this.v4n_1 = new (CopyOnWriteHashMap())();
      }
      w4n(definition, value) {
        var exception = null;
        var tmp0_safe_receiver = this.v4n_1.v3j(definition);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'io.ktor.util.internal.LockFreeLinkedListHead.forEach' call
          var tmp = tmp0_safe_receiver.j2g();
          var cur = tmp instanceof LockFreeLinkedListNode() ? tmp : THROW_CCE();
          while (!equals(cur, tmp0_safe_receiver)) {
            if (cur instanceof HandlerRegistration()) {
              var registration = cur;
              try {
                var tmp_0 = registration.y4n_1;
                (typeof tmp_0 === 'function' ? tmp_0 : THROW_CCE())(value);
              } catch ($p) {
                if ($p instanceof Error) {
                  var e = $p;
                  var tmp0_safe_receiver_0 = exception;
                  var tmp_1;
                  if (tmp0_safe_receiver_0 == null) {
                    tmp_1 = null;
                  } else {
                    addSuppressed(tmp0_safe_receiver_0, e);
                    tmp_1 = Unit_instance;
                  }
                  if (tmp_1 == null) {
                    // Inline function 'kotlin.run' call
                    exception = e;
                  }
                } else {
                  throw $p;
                }
              }
            }
            cur = cur.v3k();
          }
        }
        var tmp1_safe_receiver = exception;
        if (tmp1_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          throw tmp1_safe_receiver;
        }
      }
    }
    initMetadataForClass($, 'Events', Events);
    EventsClass = $;
  }
  return EventsClass;
}
//region block: exports
export {
  EventDefinition as EventDefinition1fymk8xrdelhn,
  Events as Events63tfxre48w4z,
};
//endregion

//# sourceMappingURL=Events.mjs.map
