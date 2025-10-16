import {
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
} from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import { CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/CoroutineImpl.mjs';
import { get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED } from '../../../../../../kotlin-kotlin-stdlib/kotlin/coroutines/intrinsics/Intrinsics.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
var DataStoreClass;
function DataStore() {
  if (DataStoreClass === VOID) {
    class $ {}
    initMetadataForInterface($, 'DataStore');
    DataStoreClass = $;
  }
  return DataStoreClass;
}
function edit(_this__u8e3s4, transform, $completion) {
  var tmp = new ($editCOROUTINE$())(_this__u8e3s4, transform, $completion);
  tmp.hd_1 = Unit_instance;
  tmp.id_1 = null;
  return tmp.nd();
}
var $editCOROUTINE$Class;
function $editCOROUTINE$() {
  if ($editCOROUTINE$Class === VOID) {
    class $ extends CoroutineImpl() {
      constructor(_this__u8e3s4, transform, resultContinuation) {
        super(resultContinuation);
        this.lbt_1 = _this__u8e3s4;
        this.mbt_1 = transform;
      }
      nd() {
        var suspendResult = this.hd_1;
        $sm: do
          try {
            var tmp = this.fd_1;
            switch (tmp) {
              case 0:
                this.gd_1 = 2;
                this.nbt_1 = this.lbt_1.cbt().v1().obt();
                this.fd_1 = 1;
                suspendResult = this.mbt_1(this.nbt_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }

                continue $sm;
              case 1:
                this.lbt_1.cbt().b2r(this.nbt_1);
                return this.nbt_1;
              case 2:
                throw this.id_1;
            }
          } catch ($p) {
            var e = $p;
            if (this.gd_1 === 2) {
              throw e;
            } else {
              this.fd_1 = this.gd_1;
              this.id_1 = e;
            }
          }
         while (true);
      }
    }
    initMetadataForCoroutine($);
    $editCOROUTINE$Class = $;
  }
  return $editCOROUTINE$Class;
}
//region block: exports
export {
  DataStore as DataStore1uvzeoqavnttw,
  edit as edit1exdrg3szbt8n,
};
//endregion

//# sourceMappingURL=DataStore.js.mjs.map
