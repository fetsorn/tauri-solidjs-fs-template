import { describe, test, expect, beforeEach, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { render } from "@solidjs/testing-library";
import { StoreContext, store, onHelloWorld } from "@/store/index.js";
import { setStore } from "@/store/store.js";
import { Hello } from "./components/hello/hello.jsx";
import { App, Layout } from "./layout.jsx";

vi.mock("@/store/index.js", async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    onStartup: vi.fn(),
    onHelloWorld: vi.fn(),
  };
});

vi.mock("./components/hello/hello.jsx", () => ({
  HelloWorld: vi.fn(),
}));

describe("layout", () => {
  test("", async () => {
    render(() => <LayoutOverview />);

    expect(HelloWorld).toHaveBeenCalledWith({});
  });
});

describe("App", () => {
  test("startup", async () => {
    render(() => <App />);

    expect(onStartup).toHaveBeenCalledWith({});
  });
});
