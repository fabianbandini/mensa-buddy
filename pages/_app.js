import "../global/style.scss";
import Layout from "../components/Layout";
import GlobalContextProvider from "../store"

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    </GlobalContextProvider>
  );
}
