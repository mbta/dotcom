const assert = require('node:assert/strict');
const { describe, it } = require("node:test");

const RateLimiter = require("../../monitor/rate-limiter");

describe("lease()", () => {
  it("rejects a lease within the window", () => {
    const rateLimiter = new RateLimiter(1000, 1);

    assert.equal(rateLimiter.lease(), true);
    assert.equal(rateLimiter.lease(), false);
  });

  it("accepts a lease after the window", () => {
    const rateLimiter = new RateLimiter(1000, 1);

    assert.equal(rateLimiter.lease(), true);

    setTimeout(() => {
      assert.equal(rateLimiter.lease(), true);
    }, 1000);
  });
});
