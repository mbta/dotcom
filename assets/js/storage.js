let sessionStore, localStore;
try {
  sessionStore = window.sessionStorage;
  localStore = window.localStorage;
} catch (_e) {
  /*
	When cookies are blocked, sessionStorage and localStorage aren't available
	in browsers. Provide a workable alternative here to avoid triggering errors
	in Phoenix's LiveSocket.
	*/
  class InMemoryStorage {
    constructor() {
      this.storage = {};
    }
    getItem(keyName) {
      return this.storage[keyName] || null;
    }
    removeItem(keyName) {
      delete this.storage[keyName];
    }
    setItem(keyName, keyValue) {
      this.storage[keyName] = keyValue;
    }
  }

  sessionStore = new InMemoryStorage();
  localStore = new InMemoryStorage();
}

const storageOptions = {
  sessionStorage: sessionStore,
  localStorage: localStore
};

export default storageOptions;
