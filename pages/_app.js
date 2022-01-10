import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notify from "../components/Notify";
import Head from "next/head";
import "../styles.css";
import { DataProvider } from "../store/globalState";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import axios from "../utils/axios";
import redirectUser from "../utils/redirectUser";

const progress = new ProgressBar({
  size: 3,
  color: "#ff9900",
  className: "z-90",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider {...pageProps}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Lugaaa</title>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <meta name="description" content="ecommerce clothing store" />
        <meta name="keywords" content="lugaaa,luga,nepali product" />
        <meta name="author" content="Lugaaa" />
        <meta
          name="image"
          content={`${process.env.BASE_URL}/images/lugaa.png`}
        />
        <meta property="og:title" content="Lugaaa" />
        <meta property="og:description" content="ecommerce clothing store" />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/images/lugaa.png`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lugaaa.com/" />
        <script
          src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
          defer
        ></script>
      </Head>
      <Header {...pageProps} />
      <Component {...pageProps} />
      <Notify />
      <Footer />
    </DataProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { accessToken } = parseCookies(ctx);
  const adminRoutes = [
    "/create/[[...id]]",
    "/edit_user/[id]",
    "/categories",
    "/payments",
    "/users",
  ];
  const protectedRoutes = ["/profile", "/order/[id]", "/orders"];

  const isAdminRoute = adminRoutes.some((route) => route === ctx.pathname);
  const isProtectedRoute = protectedRoutes.some(
    (route) => route === ctx.pathname
  );

  let pageProps = {};
  pageProps.user = null;

  if ((isAdminRoute || isProtectedRoute) && !accessToken) {
    redirectUser(ctx, "/login");
  } else if (
    (isAdminRoute || isProtectedRoute || ctx.pathname === "/" || ctx.pathname === "/cart" || ctx.pathname === "/product/[id]") &&
    accessToken
  ) {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const response = await axios.get("/auth", {
        headers: {
          Authorization: accessToken,
        },
      });
      const { user } = response.data;
      if (isAdminRoute && user.role !== 'admin') {
        redirectUser(ctx, "/");
      } else {
        pageProps.user = user;
      }
    } catch (err) {
      destroyCookie("accessToken");
      redirectUser(ctx, "/login");
    }
  } else if (accessToken && ctx.pathname !== '/product/[id]') {
    redirectUser(ctx, "/");
  }
  return { pageProps };
};

export default MyApp;
