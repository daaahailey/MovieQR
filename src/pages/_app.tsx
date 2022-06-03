import React from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layouts'
import { Global } from "@emotion/react";
import reset from '../styles/reset';
import "swiper/css/bundle";
import { AuthProvider } from "../../context/AuthContext";




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Global styles={reset} />
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
