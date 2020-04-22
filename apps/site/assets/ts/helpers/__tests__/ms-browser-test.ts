import isMSBrowser from "../ms-browser";

// examples plucked from
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent and
// https://developers.whatismybrowser.com/useragents/explore/operating_system_name/windows/
const examples = {
  IE:
    "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
  IE11:
    "Mozilla/5.0 CK={} (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  Edge:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
  Safari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
  Opera:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41",
  Chrome:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
  Firefox:
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
};

describe("ms-browser", () => {
  it.each`
    browser      | userAgent              | bool
    ${"IE"}      | ${examples["IE"]}      | ${true}
    ${"IE11"}    | ${examples["IE11"]}    | ${true}
    ${"Edge"}    | ${examples["Edge"]}    | ${true}
    ${"Safari"}  | ${examples["Safari"]}  | ${false}
    ${"Opera"}   | ${examples["Opera"]}   | ${false}
    ${"Chrome"}  | ${examples["Chrome"]}  | ${false}
    ${"Firefox"} | ${examples["Firefox"]} | ${false}
  `("returns $bool for a $browser user agent", ({ userAgent: ua, bool }) => {
    const result = isMSBrowser(ua);
    expect(result).toBe(bool);
  });
});
