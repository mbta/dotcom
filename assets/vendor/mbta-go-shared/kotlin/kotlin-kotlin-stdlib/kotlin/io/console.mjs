import { initMetadataForClassbxx6q50dy2s7 as initMetadataForClass } from '../js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../js/void.mjs';
import { toString1pkumu07cwy4m as toString } from '../js/coreRuntime.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../Unit.mjs';
import {
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
} from '../text/stringJs.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function get_output() {
  _init_properties_console_kt__rfg7jv();
  return output;
}
var output;
var BaseOutputClass;
function BaseOutput() {
  if (BaseOutputClass === VOID) {
    class $ {
      wc() {
        this.xc('\n');
      }
      yc(message) {
        this.xc(message);
        this.wc();
      }
    }
    initMetadataForClass($, 'BaseOutput');
    BaseOutputClass = $;
  }
  return BaseOutputClass;
}
var NodeJsOutputClass;
function NodeJsOutput() {
  if (NodeJsOutputClass === VOID) {
    class $ extends BaseOutput() {
      constructor(outputStream) {
        super();
        this.zc_1 = outputStream;
      }
      xc(message) {
        // Inline function 'kotlin.io.String' call
        var tmp1_elvis_lhs = message == null ? null : toString(message);
        var messageString = tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
        this.zc_1.write(messageString);
      }
    }
    initMetadataForClass($, 'NodeJsOutput');
    NodeJsOutputClass = $;
  }
  return NodeJsOutputClass;
}
var BufferedOutputToConsoleLogClass;
function BufferedOutputToConsoleLog() {
  if (BufferedOutputToConsoleLogClass === VOID) {
    class $ extends BufferedOutput() {
      xc(message) {
        // Inline function 'kotlin.io.String' call
        var tmp1_elvis_lhs = message == null ? null : toString(message);
        var s = tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
        // Inline function 'kotlin.text.nativeLastIndexOf' call
        // Inline function 'kotlin.js.asDynamic' call
        var i = s.lastIndexOf('\n', 0);
        if (i >= 0) {
          this.bd_1 = this.bd_1 + substring(s, 0, i);
          this.cd();
          s = substring_0(s, i + 1 | 0);
        }
        this.bd_1 = this.bd_1 + s;
      }
      cd() {
        console.log(this.bd_1);
        this.bd_1 = '';
      }
    }
    initMetadataForClass($, 'BufferedOutputToConsoleLog', BufferedOutputToConsoleLog);
    BufferedOutputToConsoleLogClass = $;
  }
  return BufferedOutputToConsoleLogClass;
}
var BufferedOutputClass;
function BufferedOutput() {
  if (BufferedOutputClass === VOID) {
    class $ extends BaseOutput() {
      constructor() {
        super();
        this.bd_1 = '';
      }
      xc(message) {
        var tmp = this;
        var tmp_0 = this.bd_1;
        // Inline function 'kotlin.io.String' call
        var tmp1_elvis_lhs = message == null ? null : toString(message);
        tmp.bd_1 = tmp_0 + (tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs);
      }
    }
    initMetadataForClass($, 'BufferedOutput', BufferedOutput);
    BufferedOutputClass = $;
  }
  return BufferedOutputClass;
}
function println(message) {
  _init_properties_console_kt__rfg7jv();
  get_output().yc(message);
}
function print(message) {
  _init_properties_console_kt__rfg7jv();
  get_output().xc(message);
}
var properties_initialized_console_kt_gll9dl;
function _init_properties_console_kt__rfg7jv() {
  if (!properties_initialized_console_kt_gll9dl) {
    properties_initialized_console_kt_gll9dl = true;
    // Inline function 'kotlin.run' call
    var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
    output = isNode ? new (NodeJsOutput())(process.stdout) : new (BufferedOutputToConsoleLog())();
  }
}
//region block: exports
export {
  println as println2shhhgwwt4c61,
  print as print1e1dy5saxeokj,
};
//endregion

//# sourceMappingURL=console.mjs.map
