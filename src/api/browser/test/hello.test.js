import { expect, test, describe, beforeEach, afterEach, vi } from "vitest";
import { helloWorld } from "@/api/browser/hello.js";
import { fs } from "@/api/browser/lightningfs.js";
import stub from "./stub.js";

describe("helloWorld", () => {
  beforeEach(() => {
    fs.init("test", { wipe: true });
  });

  afterEach(async () => {
    // for lightning fs to release mutex on indexedDB
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  test("throws if no mind", async () => {
    await expect(helloWorld("some")).rejects.toThrowError();
  });

  test("reads file", async () => {
    await fs.promises.mkdir(stub.dirpath);

    await fs.promises.writeFile(stub.filepath, stub.content);

    const content = await helloWorld("some");

    // stringify to get rmind of prototype methods on Uint8Array
    expect(JSON.stringify(content)).toEqual(JSON.stringify(stub.encoded));
  });
});
