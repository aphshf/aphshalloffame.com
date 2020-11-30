import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import NProgress from 'nprogress';
import SiteContainer from 'layouts/SiteContainer';
import Header from 'components/Header';

/**
 *
 * 3rd Party Resources
 *
 * */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-lightbox/style.css';
import 'nprogress/nprogress.css';
import 'styles/styles.css';

/**
 * Bind nprogress loader to app
 * */
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const date = new Date()
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
          name="viewport"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <SiteContainer>
        <Header />
        <main className="w-100">
          <Component {...pageProps} />
        </main>
        <footer>
          <span className="d-block w-100">Asbury Park High School ©️ {date.getFullYear()}</span>
          <span className="d-block w-100">
            Designed, developed, and manged with ❤️ by
            {' '}
            <Link href="https://tumultywebservices.dev">
              <a>
                Tumulty Web Services, LLC
              </a>
            </Link>        
          </span>
        </footer>
      </SiteContainer>
    </>
  );
}
