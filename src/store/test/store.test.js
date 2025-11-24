import { describe, expect, test, afterEach, vi } from "vitest";
import { store, setStore, onHelloWorld } from "@/store/store.js";
import { helloWorld } from "@/store/hello.js";

vi.mock("@/store/hello.js", async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    helloWorld: vi.fn(),
  };
});

describe("store", () => {
  // restore after, not before
  // to keep initial state
  afterEach(() => {
    setStore(undefined);

    helloWorld.mockReset();

    setStore({
      someVariable: "some",
    });
  });

  describe("onHelloWorld", () => {
    test("", async () => {
      await onHelloWorld("a");

      expect(store.record).toStrictEqual("newVariable");
    });
  });
});
