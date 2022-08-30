import { act, renderHook } from "@testing-library/react-hooks";
import { useAwaitInterval } from "../use-await-interval";

const wait = (delay: number): Promise<void> =>
  new Promise(res => setTimeout(res, delay));

describe("useAwaitInterval", () => {
  it("works", async () => {
    await act(async () => {
      type CallbackState = "not started" | "started" | "finished";
      let callbackState: CallbackState = "not started";

      const go = async () => {
        callbackState = "started";

        await wait(50);

        callbackState = "finished";
      };

      renderHook(() => {
        return useAwaitInterval(go, 50);
      });

      // give the hook a chance to settle and kick off the initial callback
      // t = 5
      await wait(5);
      expect(callbackState).toBe("started");

      await wait(55);
      // `go` should be finished
      // t = 60
      expect(callbackState).toBe("finished");

      // `go` is requeued, but not started

      await wait(30);
      // `go` should not yet have triggered
      // t = 90
      expect(callbackState).toBe("finished");

      await wait(25);
      // at this point, go should have triggered again
      // t = 115
      expect(callbackState).toBe("started");

      await wait(50);
      expect(callbackState).toBe("finished");
    });
  });

  it("gets cancelled and resumed", async () => {
    await act(async () => {
      let value: null | string = null;
      let setValueTo = "hello";
      const go = async () => {
        await wait(50);

        value = setValueTo;
      };

      const { result } = renderHook(() => {
        return useAwaitInterval(go, 50);
      });

      expect(value).toBeNull();

      await wait(70);
      expect(value).toBe("hello");

      setValueTo = "goodbye";
      await wait(180);
      expect(value).toBe("goodbye");

      const cancel = result.current;
      const resume = cancel();
      await wait(180);
      setValueTo = "missing";
      await wait(180);
      expect(value).toBe("goodbye");

      resume();
      setValueTo = "hello";
      await wait(180);
      expect(value).toBe("hello");

      cancel();
      await wait(180);
      setValueTo = "missing";
      await wait(180);
      expect(value).toBe("hello");
    });
  });
});
