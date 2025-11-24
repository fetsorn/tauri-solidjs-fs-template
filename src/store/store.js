/* try to keep store interactions only in this file */
import { createContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { helloWorld } from "./hello.js";

export const StoreContext = createContext();

export const [store, setStore] = createStore({
  someVariable: undefined,
});

/**
 * This
 * @name getSortedRecords
 * @export function
 * @returns {Function}
 */
export async function onHelloWorld() {
  const newVariable = await helloWorld(store.someVariable);

  setStore(
    produce((state) => {
      state.someVariable = newVariable;
    }),
  );
}
