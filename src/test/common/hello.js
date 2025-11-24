import { click, setValue } from "./actions.js";

export function testHello() {
  it("should hello the world", async () => {
    await setValue(await $("aria/input"), "some");

    await click(await $("aria/button"));

    await (
      await $("aria/label")
    ).waitUntil(
      async function () {
        return (await this.getText()) === "hello world";
      },
      {
        timeout: 5000,
      },
    );
  });
}
