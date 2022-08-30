import { act, renderHook } from "@testing-library/react-hooks";
import { useProvider, Loaded } from "../use-provider";

const wait = (delay: number): Promise<void> =>
  new Promise(res => setTimeout(res, delay));

const provider = async (delay: number, data: string) => {
  await wait(delay);
  return data;
};

const render = (initialProps: { delay: number; data: string }) =>
  renderHook(
    ({ delay, data }: typeof initialProps) => {
      const [state] = useProvider(provider, [delay, data]);

      return state;
    },
    { initialProps }
  );

describe("useProvider", () => {
  it("works", async () => {
    await act(async () => {
      const { rerender, result } = render({ delay: 50, data: "hello" });
      await wait(1);

      expect(result.current).toStrictEqual({ loading: true });
      await wait(60);
      expect(result.current).toStrictEqual({ loading: false, data: "hello" });

      rerender({ delay: 60, data: "goodbye" });
      await wait(1);
      expect(result.current).toStrictEqual({ loading: true, data: "hello" });

      await wait(60);
      expect(result.current).toStrictEqual({ loading: false, data: "goodbye" });
    });
  });

  it("avoids race conditions", async () => {
    await act(async () => {
      const { rerender, result } = renderHook(
        ({ delay, data }: { delay: number; data: string }) => {
          const [state] = useProvider(provider, [delay, data]);

          return state;
        },
        { initialProps: { delay: 500, data: "slow" } }
      );

      await new Promise(res => setTimeout(res, 150));
      rerender({ data: "fast", delay: 1 });

      await new Promise(res => setTimeout(res, 150));

      expect(result.current.loading).toBe(false);
      expect((result.current as Loaded<string>).data).toBe("fast");
    });
  });
});
