import * as Cookies from "./cookies";

export default function fullstory() {
  const MODULO_SAMPLE = 50;
  const id = getUniqueId();

  // Only execute the fullstory code if the id is a multiple of the selected modulo
  if (id % MODULO_SAMPLE == 0) {
    fullStoryInit();
  }
}

// This is the snippet that was generqated by Full Story. No changes were made to
// this auto-generated code
function fullStoryInit() {
  window["_fs_debug"] = false;
  window["_fs_host"] = "fullstory.com";
  window["_fs_org"] = "AQKVD";
  window["_fs_namespace"] = "FS";
  (function(m, n, e, t, l, o, g, y) {
    if (e in m) {
      if (m.console && m.console.log) {
        m.console.log(
          'FullStory namespace conflict. Please set window["_fs_namespace"].'
        );
      }
      return;
    }

    g = m[e] = function(a, b) {
      g.q ? g.q.push([a, b]) : g._api(a, b);
    };
    g.q = [];
    o = n.createElement(t);
    o.async = 1;
    o.src = "https://" + _fs_host + "/s/fs.js";
    y = n.getElementsByTagName(t)[0];
    y.parentNode.insertBefore(o, y);
    g.identify = function(i, v) {
      g(l, { uid: i });
      if (v) g(l, v);
    };
    g.setUserVars = function(v) {
      g(l, v);
    };
    y = "rec";
    g.shutdown = function(i, v) {
      g(y, !1);
    };
    g.restart = function(i, v) {
      g(y, !0);
    };
    y = "consent";
    g[y] = function(a) {
      g(y, !arguments.length || a);
    };
    g.identifyAccount = function(i, v) {
      o = "account";
      v = v || {};
      v.acctId = i;
      g(o, v);
    };

    g.clearUserCookie = function() {};
  })(window, document, window["_fs_namespace"], "script", "user");
}

function getUniqueId() {
  const mbtaIdCookie = Cookies.getCookie("mbta_id");

  let id = 1;
  if (mbtaIdCookie) {
    try {
      id = parseInt(mbtaIdCookie);
    } catch (err) {
      console.error(
        "Cookies.getUniqueId: Unable to parse mbta_id cookie as integer."
      );
    }
  }

  return id;
}
