/**
 * A simple rate limiter that allows a limited number of leases in a window of time.
 * @constructor
 * @param {number} window - The window of time in milliseconds in which to count leases.
 * @param {number} limit - The maximum number of leases in the window. Default 1.
 */
class RateLimiter {

  constructor(window, limit = 1) {
    this.window = window;
    this.limit = limit;

    this.leases = 0;

    setInterval(() => {
      this.leases = 0;
    }, window);
  }

  /**
   * Attempt to acquire a lease. Returns true if a lease was acquired, false otherwise.
   * @returns {boolean}
   */
  lease() {
    if (this.leases < this.limit) {
      this.leases += 1;
      return true;
    } else {
      return false;
    }
  }
}

module.exports = RateLimiter;
