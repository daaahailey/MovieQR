import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layouts'
import { Global } from "@emotion/react";
import reset from '../styles/reset';
import "swiper/css/bundle";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Global styles={reset} />
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default MyApp
