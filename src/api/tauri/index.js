import { invoke } from "@tauri-apps/api/core";

export async function helloWorld(mind, someVariable = "") {
  return invoke("hello_world", { someVariable });
}

export default {
  helloWorld,
};
