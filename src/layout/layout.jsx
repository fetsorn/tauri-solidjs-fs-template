import history from "history/hash";
import { onMount, useContext } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import { HelloWorld } from "./components/hello/index.js";
import { StoreContext, store, onMindChange, onStartup } from "@/store/index.js";
import styles from "./layout.module.css";

export function Layout() {
  const { store } = useContext(StoreContext);

  return <Hello />;
}

export function App() {
  onMount(async () => {
    await onStartup();
  });

  return (
    <StoreContext.Provider value={{ store }}>
      <MetaProvider>
        <Title>{"tauri-solidjs-fs-template"}</Title>
      </MetaProvider>

      <main className={styles.main}>
        <Layout />
      </main>

      <span style={{ display: "none" }}>{__COMMIT_HASH__}</span>
    </StoreContext.Provider>
  );
}

export default App;
