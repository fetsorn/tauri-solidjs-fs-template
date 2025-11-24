import api from "@/api/index.js";

/**
 * This
 * @name helloWorld
 * @function
 * @param {String} someVariable -
 */
export async function helloWorld(someVariable) {
  return api.helloWorld(someVariable);
}
