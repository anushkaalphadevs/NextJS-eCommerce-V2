import React, { Fragment, useRef } from 'react';
import Router from 'next/router';

// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import * as gtag from './../utils/gtag';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from 'store';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));
}


const MyApp = ({ Component, pageProps }: AppProps) =>{ 
  const storeRef = useRef<AppStore>();
if (!storeRef.current) {
  storeRef.current = makeStore();
}
  return(
    <Provider store={storeRef.current}>
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  </Provider>
  

);}

export default MyApp;
