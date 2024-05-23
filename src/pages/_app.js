// pages/_app.js
import '../styles/index.css'; // Adjust the path as necessary to your global CSS file

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
