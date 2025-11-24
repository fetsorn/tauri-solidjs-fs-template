import browser from "./browser/index.js";
import tauri from "./tauri/index.js";

// eslint-disable-next-line
const api = __BUILD_MODE__ === "browser" ? browser : tauri;

// instead of exporting the api object
// destructure and reexport each method
// to make sure public API is safe and uniform
export const { helloWorld } = api;

export default {
  helloWorld,
};
