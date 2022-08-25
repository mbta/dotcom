import { act, renderHook } from "@testing-library/react-hooks";
import { useAwaitInterval } from "../use-await-interval";

const wait = (delay: number): Promise<void> =>
  new Promise(res => setTimeout(res, delay));

describe("useAwaitInterval", () => {
  it("works", async () => {
    await act(async () => {
      let value: null | string = null;
      let setValueTo = "hello";
      const go = async () => {
        await wait(50);

        value = setValueTo;
      };

      renderHook(() => {
        return useAwaitInterval(go, 50);
      });

      expect(value).toBeNull();

      await wait(60);
      expect(value).toBe("hello");

      setValueTo = "goodbye";
      await wait(150);
      expect(value).toBe("goodbye");
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

      await wait(60);
      expect(value).toBe("hello");

      setValueTo = "goodbye";
      await wait(150);
      expect(value).toBe("goodbye");

      const cancel = result.current;
      const resume = cancel();
      await wait(150);
      setValueTo = "missing";
      await wait(150);
      expect(value).toBe("goodbye");

      resume();
      setValueTo = "hello";
      await wait(150);
      expect(value).toBe("hello");

      cancel();
      await wait(150);
      setValueTo = "missing";
      await wait(150);
      expect(value).toBe("hello");
    });
  });
});
