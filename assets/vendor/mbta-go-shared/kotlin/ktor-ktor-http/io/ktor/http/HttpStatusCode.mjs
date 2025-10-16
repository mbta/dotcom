import { collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/Iterables.mjs';
import { mapCapacity1h45rc3eh9p2l as mapCapacity } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/collectionJs.mjs';
import { coerceAtLeast2bkz8m9ik7hep as coerceAtLeast } from '../../../../kotlin-kotlin-stdlib/kotlin/ranges/_Ranges.mjs';
import { LinkedHashMap1zhqxkxv3xnkl as LinkedHashMap } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/LinkedHashMap.mjs';
import { Unit_instance1fbcbse1fwigr as Unit_instance } from '../../../../kotlin-kotlin-stdlib/kotlin/Unit.mjs';
import {
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
} from '../../../../kotlin-kotlin-stdlib/kotlin/js/metadataUtils.mjs';
import { VOID3gxj6tk5isa35 as VOID } from '../../../../kotlin-kotlin-stdlib/kotlin/js/void.mjs';
import { THROW_CCE2g6jy02ryeudk as THROW_CCE } from '../../../../kotlin-kotlin-stdlib/kotlin/hacks.mjs';
import { Comparable198qfk8pnblz0 as Comparable } from '../../../../kotlin-kotlin-stdlib/kotlin/Comparable.mjs';
import { listOf1jh22dvmctj1r as listOf } from '../../../../kotlin-kotlin-stdlib/kotlin/collections/CollectionsKt.mjs';
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
        this.d3w_1 = new (HttpStatusCode())(100, 'Continue');
        this.e3w_1 = new (HttpStatusCode())(101, 'Switching Protocols');
        this.f3w_1 = new (HttpStatusCode())(102, 'Processing');
        this.g3w_1 = new (HttpStatusCode())(200, 'OK');
        this.h3w_1 = new (HttpStatusCode())(201, 'Created');
        this.i3w_1 = new (HttpStatusCode())(202, 'Accepted');
        this.j3w_1 = new (HttpStatusCode())(203, 'Non-Authoritative Information');
        this.k3w_1 = new (HttpStatusCode())(204, 'No Content');
        this.l3w_1 = new (HttpStatusCode())(205, 'Reset Content');
        this.m3w_1 = new (HttpStatusCode())(206, 'Partial Content');
        this.n3w_1 = new (HttpStatusCode())(207, 'Multi-Status');
        this.o3w_1 = new (HttpStatusCode())(300, 'Multiple Choices');
        this.p3w_1 = new (HttpStatusCode())(301, 'Moved Permanently');
        this.q3w_1 = new (HttpStatusCode())(302, 'Found');
        this.r3w_1 = new (HttpStatusCode())(303, 'See Other');
        this.s3w_1 = new (HttpStatusCode())(304, 'Not Modified');
        this.t3w_1 = new (HttpStatusCode())(305, 'Use Proxy');
        this.u3w_1 = new (HttpStatusCode())(306, 'Switch Proxy');
        this.v3w_1 = new (HttpStatusCode())(307, 'Temporary Redirect');
        this.w3w_1 = new (HttpStatusCode())(308, 'Permanent Redirect');
        this.x3w_1 = new (HttpStatusCode())(400, 'Bad Request');
        this.y3w_1 = new (HttpStatusCode())(401, 'Unauthorized');
        this.z3w_1 = new (HttpStatusCode())(402, 'Payment Required');
        this.a3x_1 = new (HttpStatusCode())(403, 'Forbidden');
        this.b3x_1 = new (HttpStatusCode())(404, 'Not Found');
        this.c3x_1 = new (HttpStatusCode())(405, 'Method Not Allowed');
        this.d3x_1 = new (HttpStatusCode())(406, 'Not Acceptable');
        this.e3x_1 = new (HttpStatusCode())(407, 'Proxy Authentication Required');
        this.f3x_1 = new (HttpStatusCode())(408, 'Request Timeout');
        this.g3x_1 = new (HttpStatusCode())(409, 'Conflict');
        this.h3x_1 = new (HttpStatusCode())(410, 'Gone');
        this.i3x_1 = new (HttpStatusCode())(411, 'Length Required');
        this.j3x_1 = new (HttpStatusCode())(412, 'Precondition Failed');
        this.k3x_1 = new (HttpStatusCode())(413, 'Payload Too Large');
        this.l3x_1 = new (HttpStatusCode())(414, 'Request-URI Too Long');
        this.m3x_1 = new (HttpStatusCode())(415, 'Unsupported Media Type');
        this.n3x_1 = new (HttpStatusCode())(416, 'Requested Range Not Satisfiable');
        this.o3x_1 = new (HttpStatusCode())(417, 'Expectation Failed');
        this.p3x_1 = new (HttpStatusCode())(422, 'Unprocessable Entity');
        this.q3x_1 = new (HttpStatusCode())(423, 'Locked');
        this.r3x_1 = new (HttpStatusCode())(424, 'Failed Dependency');
        this.s3x_1 = new (HttpStatusCode())(425, 'Too Early');
        this.t3x_1 = new (HttpStatusCode())(426, 'Upgrade Required');
        this.u3x_1 = new (HttpStatusCode())(429, 'Too Many Requests');
        this.v3x_1 = new (HttpStatusCode())(431, 'Request Header Fields Too Large');
        this.w3x_1 = new (HttpStatusCode())(500, 'Internal Server Error');
        this.x3x_1 = new (HttpStatusCode())(501, 'Not Implemented');
        this.y3x_1 = new (HttpStatusCode())(502, 'Bad Gateway');
        this.z3x_1 = new (HttpStatusCode())(503, 'Service Unavailable');
        this.a3y_1 = new (HttpStatusCode())(504, 'Gateway Timeout');
        this.b3y_1 = new (HttpStatusCode())(505, 'HTTP Version Not Supported');
        this.c3y_1 = new (HttpStatusCode())(506, 'Variant Also Negotiates');
        this.d3y_1 = new (HttpStatusCode())(507, 'Insufficient Storage');
        this.e3y_1 = allStatusCodes();
        var tmp = this;
        // Inline function 'kotlin.collections.associateBy' call
        var this_0 = this.e3y_1;
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
        // Inline function 'kotlin.collections.associateByTo' call
        var destination = LinkedHashMap().tc(capacity);
        var _iterator__ex2g4s = this_0.x();
        while (_iterator__ex2g4s.y()) {
          var element = _iterator__ex2g4s.z();
          var tmp$ret$0 = element.g3y_1;
          destination.t3(tmp$ret$0, element);
        }
        tmp.f3y_1 = destination;
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
var HttpStatusCodeClass;
function HttpStatusCode() {
  if (HttpStatusCodeClass === VOID) {
    class $ {
      constructor(value, description) {
        Companion_getInstance();
        this.g3y_1 = value;
        this.h3y_1 = description;
      }
      toString() {
        return '' + this.g3y_1 + ' ' + this.h3y_1;
      }
      equals(other) {
        var tmp;
        if (other instanceof HttpStatusCode()) {
          tmp = other.g3y_1 === this.g3y_1;
        } else {
          tmp = false;
        }
        return tmp;
      }
      hashCode() {
        return this.g3y_1;
      }
      i3y(other) {
        return this.g3y_1 - other.g3y_1 | 0;
      }
      d(other) {
        return this.i3y(other instanceof HttpStatusCode() ? other : THROW_CCE());
      }
    }
    initMetadataForClass($, 'HttpStatusCode', VOID, VOID, [Comparable()]);
    HttpStatusCodeClass = $;
  }
  return HttpStatusCodeClass;
}
function allStatusCodes() {
  return listOf([Companion_getInstance().d3w_1, Companion_getInstance().e3w_1, Companion_getInstance().f3w_1, Companion_getInstance().g3w_1, Companion_getInstance().h3w_1, Companion_getInstance().i3w_1, Companion_getInstance().j3w_1, Companion_getInstance().k3w_1, Companion_getInstance().l3w_1, Companion_getInstance().m3w_1, Companion_getInstance().n3w_1, Companion_getInstance().o3w_1, Companion_getInstance().p3w_1, Companion_getInstance().q3w_1, Companion_getInstance().r3w_1, Companion_getInstance().s3w_1, Companion_getInstance().t3w_1, Companion_getInstance().u3w_1, Companion_getInstance().v3w_1, Companion_getInstance().w3w_1, Companion_getInstance().x3w_1, Companion_getInstance().y3w_1, Companion_getInstance().z3w_1, Companion_getInstance().a3x_1, Companion_getInstance().b3x_1, Companion_getInstance().c3x_1, Companion_getInstance().d3x_1, Companion_getInstance().e3x_1, Companion_getInstance().f3x_1, Companion_getInstance().g3x_1, Companion_getInstance().h3x_1, Companion_getInstance().i3x_1, Companion_getInstance().j3x_1, Companion_getInstance().k3x_1, Companion_getInstance().l3x_1, Companion_getInstance().m3x_1, Companion_getInstance().n3x_1, Companion_getInstance().o3x_1, Companion_getInstance().p3x_1, Companion_getInstance().q3x_1, Companion_getInstance().r3x_1, Companion_getInstance().s3x_1, Companion_getInstance().t3x_1, Companion_getInstance().u3x_1, Companion_getInstance().v3x_1, Companion_getInstance().w3x_1, Companion_getInstance().x3x_1, Companion_getInstance().y3x_1, Companion_getInstance().z3x_1, Companion_getInstance().a3y_1, Companion_getInstance().b3y_1, Companion_getInstance().c3y_1, Companion_getInstance().d3y_1]);
}
//region block: exports
export {
  Companion_getInstance as Companion_getInstanceud97dyzf471m,
  HttpStatusCode as HttpStatusCode3o1wkms10pg4k,
};
//endregion

//# sourceMappingURL=HttpStatusCode.mjs.map
